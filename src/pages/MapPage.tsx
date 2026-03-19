import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polyline, Tooltip, useMap } from "react-leaflet";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Route, Layers, Loader } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
 
// ── Types ─────────────────────────────────────────────────────────────────────
interface CachedYear {
  year: number;
  geojson: any;
}
 
// ── Historical GeoJSON years available from aourednik/historical-basemaps ─────
// We pick the closest available snapshot year for any given slider year
const OTTOMAN_SNAPSHOTS = [1300, 1400, 1450, 1500, 1530, 1600, 1650, 1700, 1800, 1900];
const ROMAN_SNAPSHOTS  = [-500, -323, -200, -100, 1, 100, 200, 300, 400, 476];
 
// Map our slider year → closest snapshot year available
function closestSnapshot(year: number, snapshots: number[]): number {
  return snapshots.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
}
 
// CDN URL for the historical-basemaps dataset (jsDelivr mirrors GitHub)
function geojsonUrl(year: number): string {
  // Normalise: dataset uses CE years as positive integers, BCE as negative
  const y = year < 0 ? `minus${Math.abs(year)}` : String(year);
  return `https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_${y}.geojson`;
}
 
// ── Empire name matchers ───────────────────────────────────────────────────────
const OTTOMAN_NAMES = ["ottoman", "osmanl", "turkey", "türk"];
const ROMAN_NAMES   = ["roman", "rome", "roma"];
 
function matchesEmpire(name: string, patterns: string[]): boolean {
  const n = (name || "").toLowerCase();
  return patterns.some(p => n.includes(p));
}
 
// ── Map updater ───────────────────────────────────────────────────────────────
function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom, { animate: true }); }, [center, zoom, map]);
  return null;
}
 
// ── Main component ────────────────────────────────────────────────────────────
export default function MapPage() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();
 
  const yearRange   = config?.yearRange   || [0, 2000];
  const [year, setYear]           = useState(config?.yearDefault || 0);
  const [showRoutes, setShowRoutes] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [loading, setLoading]         = useState(false);
  const cache = useRef<CachedYear[]>([]);
 
  const tradeRoutes = config?.tradeRoutes || [];
  const mapCenter   = (config?.mapCenter || [38, 32]) as LatLngExpression;
  const mapZoom     = config?.mapZoom || 4;
 
  const snapshots = empireId === "roman" ? ROMAN_SNAPSHOTS : OTTOMAN_SNAPSHOTS;
  const isRoman   = empireId === "roman";
 
  const empireColor   = isRoman ? "#dc143c" : "#daa520";
  const routeColor    = isRoman ? "#ffa500" : "#ffd700";
 
  // ── Load GeoJSON when year changes ─────────────────────────────────────────
  useEffect(() => {
    const snap = closestSnapshot(year, snapshots);
    const cached = cache.current.find(c => c.year === snap);
    if (cached) {
      setGeojsonData(cached.geojson);
      return;
    }
    setLoading(true);
    fetch(geojsonUrl(snap))
      .then(r => r.json())
      .then(data => {
        cache.current.push({ year: snap, geojson: data });
        setGeojsonData(data);
      })
      .catch(() => {
        // fallback: use config territories if CDN fails
        setGeojsonData(null);
      })
      .finally(() => setLoading(false));
  }, [year, snapshots]);
 
  // ── Filter features for this empire ────────────────────────────────────────
  const filteredGeojson = useMemo(() => {
    if (!geojsonData) return null;
    const patterns = isRoman ? ROMAN_NAMES : OTTOMAN_NAMES;
    const features = geojsonData.features?.filter((f: any) => {
      const name = f.properties?.NAME || f.properties?.name || "";
      return matchesEmpire(name, patterns);
    }) || [];
    return { ...geojsonData, features };
  }, [geojsonData, isRoman]);
 
  // ── Fallback: use config territories when CDN fails ────────────────────────
  const fallbackTerritories = useMemo(() => {
    const territories = config?.territories || [];
    return territories.filter((t: any) => t.yearStart <= year && t.yearEnd > year);
  }, [year, config]);
 
  const visibleRoutes = useMemo(
    () => showRoutes ? tradeRoutes.filter((r: any) => r.yearActive <= year) : [],
    [year, showRoutes, tradeRoutes]
  );
 
  const handleYearChange = (newYear: number) => {
    setIsAnimating(true);
    setYear(newYear);
    setTimeout(() => setIsAnimating(false), 400);
  };
 
  const l          = config?.mapTitle || { sv: "Territorium", en: "Territory", tr: "Topraklar" };
  const routeLabel = { sv: "Handelsvägar", en: "Trade Routes", tr: "Ticaret Yolları" };
 
  const geojsonStyle = {
    color: empireColor,
    fillColor: empireColor,
    fillOpacity: 0.4,
    weight: 1.5,
    opacity: 0.8,
  };
 
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
 
        {/* ── Controls ── */}
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-border bg-background/40 backdrop-blur-sm z-[500] relative">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <h2 className="text-sm font-serif text-primary">{l[language] || l.en}</h2>
            <div className="flex-1 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">
                {formatYear(yearRange[0], language)}
              </span>
              <input
                type="range" min={yearRange[0]} max={yearRange[1]} value={year}
                onChange={e => handleYearChange(Number(e.target.value))}
                className="flex-1 h-1.5 accent-primary cursor-pointer touch-none"
              />
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">
                {formatYear(yearRange[1], language)}
              </span>
            </div>
 
            <div className="flex items-center gap-3">
              <span className={`text-base sm:text-lg font-serif text-primary font-bold min-w-[70px] text-center transition-all duration-300 ${isAnimating ? "scale-110 ottoman-glow" : ""}`}>
                {formatYear(year, language)}
              </span>
 
              {loading && <Loader className="w-4 h-4 text-primary animate-spin" />}
 
              <button
                onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-sans transition-colors ${showRoutes ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Route className="w-3 h-3" />
                {routeLabel[language as keyof typeof routeLabel] || routeLabel.en}
              </button>
 
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-sans text-muted-foreground">
                <Layers className="w-3 h-3" />
                {filteredGeojson ? filteredGeojson.features?.length || 0 : fallbackTerritories.length}
              </div>
            </div>
          </div>
        </div>
 
        {/* ── Map ── */}
        <div className="flex-1 relative z-0">
          <MapContainer
            center={mapCenter} zoom={mapZoom}
            className="h-full w-full"
            style={{ background: "#0a0a0f" }}
            zoomControl={false} attributionControl={false}
            dragging touchZoom scrollWheelZoom doubleClickZoom
            minZoom={2} maxZoom={10}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <MapUpdater center={mapCenter} zoom={mapZoom} />
 
            {/* Historical GeoJSON from CDN */}
            {filteredGeojson && filteredGeojson.features?.length > 0 && (
              <GeoJSON
                key={`${year}-geojson`}
                data={filteredGeojson}
                style={geojsonStyle}
              />
            )}
 
            {/* Fallback polygons from config if CDN fails or returns nothing */}
            {(!filteredGeojson || filteredGeojson.features?.length === 0) &&
              fallbackTerritories.map((t: any, i: number) => {
                const { Polygon } = require("react-leaflet");
                return (
                  <Polygon key={i} positions={t.polygon}
                    pathOptions={{
                      color: empireColor,
                      fillColor: t.color || empireColor,
                      fillOpacity: 0.35,
                      weight: 1,
                    }}
                  >
                    <Tooltip>
                      <span className="text-xs font-sans">
                        {t.label?.[language] || t.label?.en}
                      </span>
                    </Tooltip>
                  </Polygon>
                );
              })
            }
 
            {/* Trade routes */}
            {visibleRoutes.map((r: any) => (
              <Polyline key={r.id} positions={r.path}
                pathOptions={{ color: routeColor, weight: 2, dashArray: "8,6", opacity: 0.6 }}
              >
                <Tooltip>
                  <span className="text-xs font-sans">{r.name?.[language] || r.name?.en}</span>
                </Tooltip>
              </Polyline>
            ))}
          </MapContainer>
        </div>
      </div>
    </AppLayout>
  );
}
