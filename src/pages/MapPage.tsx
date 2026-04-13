import { useState, useMemo, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, Polyline, Tooltip, useMap } from "react-leaflet";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Route, Layers, Loader } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";
 
// ── GeoJSON snapshots som finns i public/geojson/ ────────────────────────────
const ALL_SNAPSHOTS = [
  -500, -400, -323, -300, -200, -100, 0,
  100, 200, 300, 400, 500,
  1500, 1600, 1700, 1800,
];
 
// ── Per-imperium config ───────────────────────────────────────────────────────
// patterns:   strängar som matchas mot NAME/name/ADMIN i GeoJSON-features (lowercase)
// snapshots:  vilka snapshot-år som är relevanta för imperiet
// color:      fill/stroke-färg på kartan
// routeColor: färg på handelsvägar
interface EmpireMapConfig {
  patterns:   string[];
  snapshots:  number[];
  color:      string;
  routeColor: string;
}
 
const EMPIRE_MAP_CONFIGS: Record<string, EmpireMapConfig> = {
  ottoman: {
    patterns:   ["ottoman", "osmanl", "türk", "turkey", "osman"],
    snapshots:  [1500, 1600, 1700, 1800],
    color:      "#daa520",
    routeColor: "#ffd700",
  },
  roman: {
    patterns:   ["roman", "rome", "roma", "italic", "latin", "republic"],
    snapshots:  [-500, -400, -323, -300, -200, -100, 0, 100, 200, 300, 400, 500],
    color:      "#dc143c",
    routeColor: "#ffa500",
  },
  britishEmpire: {
    patterns:   ["british", "england", "great britain", "united kingdom", "britain", "english"],
    snapshots:  [1500, 1600, 1700, 1800],
    color:      "#c0392b",
    routeColor: "#e74c3c",
  },
  egypt: {
    patterns:   ["egypt", "mamluk", "fatimid", "ayyubid", "ptolem", "kush", "nubia"],
    snapshots:  [-500, -400, -323, -300, -200, -100, 0, 100, 200, 300, 400, 500],
    color:      "#d4a017",
    routeColor: "#f0c040",
  },
  islamic: {
    patterns:   ["abbasid", "caliphate", "islamic", "arab", "umayyad", "rashidun", "muslim"],
    snapshots:  [100, 200, 300, 400, 500, 1500, 1600],
    color:      "#27ae60",
    routeColor: "#2ecc71",
  },
  japanese: {
    patterns:   ["japan", "yamato", "nippon", "nihon"],
    snapshots:  [100, 200, 300, 400, 500, 1500, 1600, 1700, 1800],
    color:      "#e74c3c",
    routeColor: "#c0392b",
  },
  mali: {
    patterns:   ["mali", "mansa", "songhai", "ghana", "west africa"],
    snapshots:  [1500, 1600],
    color:      "#d35400",
    routeColor: "#e67e22",
  },
  mongol: {
    patterns:   ["mongol", "yuan", "ilkhanate", "golden horde", "chagatai"],
    snapshots:  [1500, 1600],
    color:      "#8e44ad",
    routeColor: "#9b59b6",
  },
  seljuk: {
    patterns:   ["seljuk", "seljuq", "rum"],
    snapshots:  [1500, 1600],
    color:      "#16a085",
    routeColor: "#1abc9c",
  },
};
 
// Fallback om empireId inte finns i EMPIRE_MAP_CONFIGS
const DEFAULT_CONFIG: EmpireMapConfig = {
  patterns:   [],           // tomt = visa alla features
  snapshots:  ALL_SNAPSHOTS,
  color:      "#daa520",
  routeColor: "#ffd700",
};
 
// ── Hjälpfunktioner ──────────────────────────────────────────────────────────
function closestSnapshot(year: number, snapshots: number[]): number {
  if (snapshots.length === 0) return year;
  return snapshots.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
}
 
function geojsonFilename(year: number): string {
  if (year <= 0) return `/geojson/world_bc${Math.abs(year) || 1}.geojson`;
  return `/geojson/world_${year}.geojson`;
}
 
function matchesEmpire(props: any, patterns: string[]): boolean {
  if (patterns.length === 0) return true; // Inga patterns = visa allt
  const name = (
    props?.NAME       ||
    props?.name       ||
    props?.NAME_LONG  ||
    props?.ADMIN      ||
    props?.admin      ||
    props?.SOVEREIGNT ||
    ""
  ).toLowerCase();
  return patterns.some(p => name.includes(p));
}
 
function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}
 
// ── KOMPONENT ────────────────────────────────────────────────────────────────
export default function MapPage() {
  const { language, setLanguage } = useChat();
  const { config, empireId }      = useEmpire();
 
  // Hämta empire-specifik kartconfig
  const empireMapCfg: EmpireMapConfig =
    EMPIRE_MAP_CONFIGS[empireId ?? ""] ?? DEFAULT_CONFIG;
 
  const yearRange = config?.yearRange ?? [
    empireMapCfg.snapshots[0] ?? 0,
    empireMapCfg.snapshots[empireMapCfg.snapshots.length - 1] ?? 1800,
  ];
 
  const [year, setYear]               = useState<number>(
    config?.yearDefault ?? empireMapCfg.snapshots[0] ?? 0
  );
  const [showRoutes, setShowRoutes]   = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [loading, setLoading]         = useState(false);
  const cache = useRef<Map<string, any>>(new Map());
 
  const tradeRoutes = config?.tradeRoutes ?? [];
  const mapCenter   = (config?.mapCenter  ?? [30, 40]) as LatLngExpression;
  const mapZoom     = config?.mapZoom     ?? 4;
 
  // ── Reset år när empire byts ────────────────────────────────────────────────
  useEffect(() => {
    setYear(config?.yearDefault ?? empireMapCfg.snapshots[0] ?? 0);
    setGeojsonData(null);
  }, [empireId]);
 
  // ── Ladda GeoJSON när år eller empire ändras ────────────────────────────────
  useEffect(() => {
    const snap     = closestSnapshot(year, empireMapCfg.snapshots);
    const filename = geojsonFilename(snap);
 
    if (cache.current.has(filename)) {
      setGeojsonData(cache.current.get(filename));
      return;
    }
 
    setLoading(true);
    fetch(filename)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(data => {
        cache.current.set(filename, data);
        setGeojsonData(data);
      })
      .catch(() => setGeojsonData(null))
      .finally(() => setLoading(false));
  }, [year, empireId]);
 
  // ── Filtrera GeoJSON-features för detta imperium ────────────────────────────
  const filteredGeojson = useMemo(() => {
    if (!geojsonData?.features) return null;
    const features = geojsonData.features.filter((f: any) =>
      matchesEmpire(f.properties, empireMapCfg.patterns)
    );
    if (features.length === 0) return null;
    return { type: "FeatureCollection", features };
  }, [geojsonData, empireId]);
 
  // ── Handelsvägar ───────────────────────────────────────────────────────────
  const visibleRoutes = useMemo(
    () => showRoutes ? tradeRoutes.filter((r: any) => r.yearActive <= year) : [],
    [year, showRoutes, tradeRoutes]
  );
 
  const handleYearChange = (newYear: number) => {
    setIsAnimating(true);
    setYear(newYear);
    setTimeout(() => setIsAnimating(false), 400);
  };
 
  const l          = config?.mapTitle ?? { sv: "Territorium", en: "Territory", tr: "Topraklar" };
  const routeLabel = { sv: "Handelsvägar", en: "Trade Routes", tr: "Ticaret Yolları" };
  const noDataLabel = {
    sv: "Ingen kartdata för detta år — prova ett annat år",
    en: "No map data for this year — try another year",
    tr: "Bu yıl için harita verisi yok — başka bir yıl deneyin",
  };
 
  const geoStyle = {
    color:       empireMapCfg.color,
    fillColor:   empireMapCfg.color,
    fillOpacity: 0.45,
    weight:      1.2,
    opacity:     0.85,
  };
 
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
 
        {/* ── Controls ── */}
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-border bg-background/40 backdrop-blur-sm z-[500] relative">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <h2 className="text-sm font-serif text-primary">
              {l[language as keyof typeof l] || l.en}
            </h2>
            <div className="flex-1 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">
                {formatYear(yearRange[0], language)}
              </span>
              <input
                type="range"
                min={yearRange[0]}
                max={yearRange[1]}
                value={year}
                onChange={e => handleYearChange(Number(e.target.value))}
                className="flex-1 h-1.5 accent-primary cursor-pointer touch-none"
              />
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">
                {formatYear(yearRange[1], language)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`text-base sm:text-lg font-serif text-primary font-bold min-w-[70px] text-center transition-all duration-300 ${
                  isAnimating ? "scale-110 ottoman-glow" : ""
                }`}
              >
                {formatYear(year, language)}
              </span>
              {loading && <Loader className="w-4 h-4 text-primary animate-spin" />}
              <button
                onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-sans transition-colors ${
                  showRoutes
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Route className="w-3 h-3" />
                {routeLabel[language as keyof typeof routeLabel] || routeLabel.en}
              </button>
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-sans text-muted-foreground">
                <Layers className="w-3 h-3" />
                {filteredGeojson?.features?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
 
        {/* ── Map ── */}
        <div className="flex-1 relative z-0">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="h-full w-full"
            style={{ background: "#0a0a0f" }}
            zoomControl={false}
            attributionControl={false}
            dragging
            touchZoom
            scrollWheelZoom
            doubleClickZoom
            minZoom={2}
            maxZoom={10}
          >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <MapUpdater center={mapCenter} zoom={mapZoom} />
 
            {/* Historiska gränser */}
            {filteredGeojson && (
              <GeoJSON
                key={`${empireId}-${year}`}
                data={filteredGeojson}
                style={() => geoStyle}
                onEachFeature={(feature, layer) => {
                  const name =
                    feature.properties?.NAME  ||
                    feature.properties?.name  ||
                    feature.properties?.ADMIN || "";
                  if (name) {
                    layer.bindTooltip(name, {
                      className: "ottoman-tooltip",
                      direction: "top",
                    });
                  }
                }}
              />
            )}
 
            {/* Handelsvägar */}
            {visibleRoutes.map((r: any) => (
              <Polyline
                key={r.id}
                positions={r.path}
                pathOptions={{
                  color:     empireMapCfg.routeColor,
                  weight:    2,
                  dashArray: "8,6",
                  opacity:   0.6,
                }}
              >
                <Tooltip>
                  <span className="text-xs font-sans">
                    {r.name?.[language] || r.name?.en}
                  </span>
                </Tooltip>
              </Polyline>
            ))}
 
            {/* Ingen data */}
            {!loading && !filteredGeojson && (
              <div className="absolute inset-0 flex items-center justify-center z-[1000] pointer-events-none">
                <div className="bg-background/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-sans text-muted-foreground">
                  {noDataLabel[language as keyof typeof noDataLabel] || noDataLabel.en}
                </div>
              </div>
            )}
          </MapContainer>
        </div>
      </div>
    </AppLayout>
  );
}
 
