import { useState, useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Polyline, Tooltip, useMap } from "react-leaflet";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Route, Layers } from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

function MapUpdater({ center, zoom }: { center: LatLngExpression; zoom: number }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom, { animate: true }); }, [center, zoom, map]);
  return null;
}

// Period-based color shift
function getPeriodColor(baseColor: string, year: number, yearStart: number, yearEnd: number): string {
  const progress = (year - yearStart) / (yearEnd - yearStart);
  // Shift opacity based on how close we are to the period edges
  const edgeFade = Math.min(
    (year - yearStart) / 50, // fade in
    (yearEnd - year) / 50,  // fade out
    1
  );
  return baseColor;
}

function getPeriodOpacity(year: number, t: { yearStart: number; yearEnd: number }): number {
  const fadeIn = Math.min((year - t.yearStart) / 30, 1);
  const fadeOut = Math.min((t.yearEnd - year) / 30, 1);
  return Math.max(0.15, Math.min(fadeIn, fadeOut) * 0.45);
}

export default function MapPage() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();

  const yearRange = config?.yearRange || [0, 2000];
  const [year, setYear] = useState(config?.yearDefault || 0);
  const [showRoutes, setShowRoutes] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const territories = config?.territories || [];
  const tradeRoutes = config?.tradeRoutes || [];
  const mapCenter = (config?.mapCenter || [38, 32]) as LatLngExpression;
  const mapZoom = config?.mapZoom || 4;

  const visibleTerritories = useMemo(
    () => territories.filter((t) => t.yearStart <= year && t.yearEnd > year),
    [year, territories]
  );

  const visibleRoutes = useMemo(
    () => (showRoutes ? tradeRoutes.filter((r) => r.yearActive <= year) : []),
    [year, showRoutes, tradeRoutes]
  );

  // Expansion glow: territories acquired recently
  const recentlyAcquired = useMemo(
    () => visibleTerritories.filter((t) => year - t.yearStart < 50),
    [year, visibleTerritories]
  );

  const l = config?.mapTitle || { sv: "Territorium", en: "Territory", tr: "Topraklar" };
  const routeLabel = { sv: "Handelsvägar", en: "Trade Routes", tr: "Ticaret Yolları" };

  const outlineColor = empireId === "roman" ? "#dc143c" : "#daa520";
  const routeColor = empireId === "roman" ? "#ffa500" : "#ffd700";

  // Count stats
  const territoryCount = visibleTerritories.length;
  const routeCount = visibleRoutes.length;

  const handleYearChange = (newYear: number) => {
    setIsAnimating(true);
    setYear(newYear);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-background/40 backdrop-blur-sm z-[500] relative">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <h2 className="text-sm font-serif text-primary">{l[language] || l.en}</h2>
            <div className="flex-1 flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-sans">{formatYear(yearRange[0], language)}</span>
              <input type="range" min={yearRange[0]} max={yearRange[1]} value={year}
                onChange={(e) => handleYearChange(Number(e.target.value))} className="flex-1 h-1.5 accent-primary cursor-pointer" />
              <span className="text-xs text-muted-foreground font-sans">{formatYear(yearRange[1], language)}</span>
            </div>
            <span className={`text-lg font-serif text-primary font-bold min-w-[80px] text-center transition-all duration-300 ${isAnimating ? "scale-110 ottoman-glow" : ""}`}>
              {formatYear(year, language)}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-sans transition-colors ${showRoutes ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Route className="w-3 h-3" /> {routeLabel[language as keyof typeof routeLabel] || routeLabel.en}
              </button>
              {/* Stats */}
              <div className="hidden sm:flex items-center gap-2 text-[10px] font-sans text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3" /> {territoryCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative z-0">
          <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full"
            style={{ background: "#0a0a0f" }} zoomControl={false} attributionControl={false}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="" />
            {visibleTerritories.map((t, i) => {
              const isRecent = recentlyAcquired.includes(t);
              const opacity = getPeriodOpacity(year, t);
              return (
                <Polygon key={`${t.label.en}-${i}`} positions={t.polygon}
                  pathOptions={{
                    color: outlineColor,
                    fillColor: t.color,
                    fillOpacity: opacity,
                    weight: isRecent ? 2.5 : 1.5,
                    opacity: isRecent ? 0.9 : 0.6,
                  }}>
                  <Tooltip direction="top" className="ottoman-tooltip">
                    <div className="text-xs font-sans">
                      <span className="font-serif text-sm font-bold">{t.label[language] || t.label.en}</span><br />
                      {formatYear(t.yearStart, language)}–{formatYear(t.yearEnd, language)}
                      {isRecent && (
                        <span className="block text-[10px] mt-0.5 opacity-70">
                          ✦ {language === "sv" ? "Nyligen erövrad" : language === "tr" ? "Yeni fethedildi" : "Recently acquired"}
                        </span>
                      )}
                    </div>
                  </Tooltip>
                </Polygon>
              );
            })}
            {visibleRoutes.map((r) => (
              <Polyline key={r.id} positions={r.path}
                pathOptions={{ color: routeColor, weight: 2, dashArray: "8,6", opacity: 0.6 }}>
                <Tooltip direction="top">
                  <span className="text-xs font-sans">{r.name[language] || r.name.en}</span>
                </Tooltip>
              </Polyline>
            ))}
          </MapContainer>
        </div>
      </div>
    </AppLayout>
  );
}
