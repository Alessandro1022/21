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

function getPeriodOpacity(year: number, t: { yearStart: number; yearEnd: number }): number {
  const fadeIn = Math.min((year - t.yearStart) / 30, 1);
  const fadeOut = Math.min((t.yearEnd - year) / 30, 1);
  return Math.max(0.2, Math.min(fadeIn, fadeOut) * 0.5);
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

  const recentlyAcquired = useMemo(
    () => visibleTerritories.filter((t) => year - t.yearStart < 50),
    [year, visibleTerritories]
  );

  const l = config?.mapTitle || { sv: "Territorium", en: "Territory", tr: "Topraklar" };
  const routeLabel = { sv: "Handelsvägar", en: "Trade Routes", tr: "Ticaret Yolları" };

  // Empire-specific colors
  const outlineColor = empireId === "roman" ? "#8b0000" : "#b8860b";
  const fillBase = empireId === "roman" ? "#dc143c" : "#daa520";
  const routeColor = empireId === "roman" ? "#ffa500" : "#ffd700";
  // Thin internal border color (subtle, same hue but lighter)
  const internalBorderColor = empireId === "roman" ? "rgba(220,20,60,0.3)" : "rgba(218,165,32,0.3)";

  const territoryCount = visibleTerritories.length;

  const handleYearChange = (newYear: number) => {
    setIsAnimating(true);
    setYear(newYear);
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
        <div className="flex-shrink-0 px-4 py-2.5 border-b border-border bg-background/40 backdrop-blur-sm z-[500] relative">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <h2 className="text-sm font-serif text-primary">{l[language] || l.en}</h2>
            <div className="flex-1 flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">{formatYear(yearRange[0], language)}</span>
              <input type="range" min={yearRange[0]} max={yearRange[1]} value={year}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="flex-1 h-1.5 accent-primary cursor-pointer touch-none" />
              <span className="text-[10px] text-muted-foreground font-sans whitespace-nowrap">{formatYear(yearRange[1], language)}</span>
            </div>
            <span className={`text-base sm:text-lg font-serif text-primary font-bold min-w-[70px] text-center transition-all duration-300 ${isAnimating ? "scale-110 ottoman-glow" : ""}`}>
              {formatYear(year, language)}
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowRoutes(!showRoutes)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] sm:text-xs font-sans transition-colors ${showRoutes ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                <Route className="w-3 h-3" /> {routeLabel[language as keyof typeof routeLabel] || routeLabel.en}
              </button>
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
            style={{ background: "#0a0a0f" }} zoomControl={false} attributionControl={false}
            dragging={true} touchZoom={true} scrollWheelZoom={true} doubleClickZoom={true}
            minZoom={2} maxZoom={10}>
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="" />
            {visibleTerritories.map((t, i) => {
              const isRecent = recentlyAcquired.includes(t);
              const opacity = getPeriodOpacity(year, t);
              return (
                <Polygon key={`${t.label.en}-${i}`} positions={t.polygon}
                  pathOptions={{
                    color: internalBorderColor,
                    fillColor: t.color,
                    fillOpacity: opacity,
                    weight: 1,
                    opacity: 0.5,
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
