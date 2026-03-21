import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { LeaderDetailModal } from "@/components/LeaderDetailModal";
import { Crown, ExternalLink, Calendar, X } from "lucide-react";
 
function getDynastyColor(generation: number, empireId: string): string {
  if (empireId === "roman") {
    if (generation <= 2) return "hsl(0 62% 42%)";
    if (generation <= 6) return "hsl(0 50% 50%)";
    if (generation <= 8) return "hsl(25 60% 45%)";
    if (generation <= 12) return "hsl(40 55% 45%)";
    return "hsl(0 40% 35%)";
  }
  if (generation <= 4) return "hsl(40 70% 45%)";
  if (generation <= 10) return "hsl(40 80% 50%)";
  if (generation <= 15) return "hsl(40 60% 42%)";
  if (generation <= 18) return "hsl(40 50% 38%)";
  return "hsl(40 40% 35%)";
}
 
function getDynastyLabel(generation: number, empireId: string, lang: string): string {
  if (empireId === "roman") {
    const m: Record<string, Record<string, string>> = {
      founders: { sv: "Grundare", en: "Founders", tr: "Kurucular" },
      julio:    { sv: "Julio-Claudiska", en: "Julio-Claudian", tr: "Julio-Claudian" },
      flavian:  { sv: "Flaviska", en: "Flavian", tr: "Flavius" },
      good:     { sv: "Fem goda kejsare", en: "Five Good Emperors", tr: "Beş İyi İmparator" },
      late:     { sv: "Senromersk", en: "Late Empire", tr: "Geç İmparatorluk" },
    };
    if (generation <= 2)  return m.founders[lang] ?? m.founders.en;
    if (generation <= 6)  return m.julio[lang]    ?? m.julio.en;
    if (generation <= 8)  return m.flavian[lang]  ?? m.flavian.en;
    if (generation <= 12) return m.good[lang]     ?? m.good.en;
    return m.late[lang] ?? m.late.en;
  }
  const m: Record<string, Record<string, string>> = {
    early:          { sv: "Tidig period",      en: "Early Period",   tr: "Erken Dönem" },
    classical:      { sv: "Klassisk period",   en: "Classical",      tr: "Klasik Dönem" },
    transformation: { sv: "Omvandlingsperiod", en: "Transformation", tr: "Dönüşüm" },
    stagnation:     { sv: "Stagnationsperiod", en: "Stagnation",     tr: "Duraklama" },
    late:           { sv: "Sen period",        en: "Late Period",    tr: "Geç Dönem" },
  };
  if (generation <= 4)  return m.early[lang]          ?? m.early.en;
  if (generation <= 10) return m.classical[lang]      ?? m.classical.en;
  if (generation <= 15) return m.transformation[lang] ?? m.transformation.en;
  if (generation <= 18) return m.stagnation[lang]     ?? m.stagnation.en;
  return m.late[lang] ?? m.late.en;
}
 
function getTitle(title: unknown, lang: string): string {
  if (!title) return "";
  if (typeof title === "string") return title;
  if (typeof title === "object") {
    const t = title as Record<string, string>;
    return t[lang] ?? t["en"] ?? Object.values(t)[0] ?? "";
  }
  return String(title);
}
 
// Always return black text — Ottoman colors are gold/warm tones, needs dark text
function getTextColor(empireId: string): string {
  return empireId === "ottoman" ? "#1a1008" : "#fff";
}
 
export default function Lineage() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalLeader, setModalLeader] = useState<any>(null);
 
  const empire = empireId ?? "ottoman";
  const leaders: any[] = (config?.leaders ?? []).filter((l: any) => l?.id && l?.name);
  const profiles: any[] = config?.profiles ?? [];
 
  const pageTitle  = { sv: "Kejserlig stamtavla", en: "Imperial Lineage",  tr: "İmparatorluk Soyu" }[language] ?? "Imperial Lineage";
  const countLabel = { sv: "härskare",            en: "rulers",            tr: "hükümdar"           }[language] ?? "rulers";
  const emptyMsg   = { sv: "Inga härskare.",      en: "No rulers found.",  tr: "Hükümdar yok."      }[language] ?? "No rulers found.";
  const yearWord   = { sv: "år",                  en: "years",             tr: "yıl"                }[language] ?? "years";
 
  const legendGens = empire === "roman" ? [1, 4, 7, 10, 14] : [1, 7, 12, 16, 20];
 
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4 pb-8">
        <div className="max-w-3xl mx-auto animate-fade-in">
 
          <div className="mb-4">
            <h2 className="text-2xl font-serif text-primary flex items-center gap-2">
              <Crown className="w-6 h-6" /> {pageTitle}
            </h2>
            <p className="text-xs font-sans text-muted-foreground mt-0.5">
              {leaders.length} {countLabel}
            </p>
          </div>
 
          {/* Legend */}
          {leaders.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4 px-3 py-2 bg-card/40 rounded-xl">
              {legendGens.map((gen) => {
                const color = getDynastyColor(gen, empire);
                const textColor = getTextColor(empire);
                return (
                  <div key={gen} className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-[10px] font-sans text-muted-foreground">
                      {getDynastyLabel(gen, empire, language)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
 
          {leaders.length === 0 && (
            <p className="text-center py-16 text-muted-foreground font-sans text-sm">{emptyMsg}</p>
          )}
 
          <div className="space-y-0.5">
            {leaders.map((l) => {
              const isSelected   = selectedId === l.id;
              const color        = getDynastyColor(l.generation ?? 1, empire);
              const textColor    = getTextColor(empire);
              const reignStart   = Number(l.reignStart) || 0;
              const reignEnd     = Number(l.reignEnd)   || 0;
              const reignLength  = Math.max(0, reignEnd - reignStart);
              const title        = getTitle(l.title, language);
              const barWidth     = Math.min(100, (reignLength / 50) * 100);
              const hasProfile   = l.profileId && profiles.some((p: any) => p?.id === l.profileId);
 
              return (
                <div key={l.id}>
                  <button
                    onClick={() => setSelectedId(isSelected ? null : l.id)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                      isSelected ? "bg-card/80 ottoman-border ottoman-glow" : "hover:bg-card/40"
                    }`}
                  >
                    {/* Dynasty color dot */}
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-background transition-transform duration-200"
                      style={{
                        backgroundColor: color,
                        transform: isSelected ? "scale(1.4)" : "scale(1)",
                      }}
                    />
 
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {/* NAME — always dark on Ottoman, follows theme on Roman */}
                        <span
                          className={`text-sm font-serif truncate transition-colors duration-200 ${
                            empire === "ottoman"
                              ? "text-foreground"
                              : isSelected
                              ? "text-primary"
                              : "text-foreground"
                          }`}
                          style={empire === "ottoman" ? { color: isSelected ? "var(--color-primary, #c8a96e)" : "inherit" } : {}}
                        >
                          {l.name}
                        </span>
                        {hasProfile && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-sans text-muted-foreground">
                        <span>{formatYear(reignStart, language)}–{formatYear(reignEnd, language)}</span>
                        {title && (
                          <>
                            <span className="text-primary/40">·</span>
                            <span className="truncate">{title}</span>
                          </>
                        )}
                      </div>
                    </div>
 
                    {/* Reign bar */}
                    <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${barWidth}%`,
                            backgroundColor: color,
                            opacity: isSelected ? 1 : 0.6,
                          }}
                        />
                      </div>
                      <span className="text-[9px] font-sans text-muted-foreground w-6 text-right">
                        {reignLength}y
                      </span>
                    </div>
                  </button>
 
                  {/* Detail card */}
                  {isSelected && (
                    <div className="mt-1 mb-2 animate-fade-in">
                      <div className="bg-card/90 backdrop-blur-md rounded-xl ottoman-border p-4 shadow-xl">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                            <h3 className="font-serif text-primary text-sm">{l.name}</h3>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                            className="p-1 rounded-lg hover:bg-muted text-muted-foreground"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
 
                        <div className="space-y-1.5 mb-3">
                          <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            {formatYear(reignStart, language)}–{formatYear(reignEnd, language)}
                            {reignLength > 0 && ` (${reignLength} ${yearWord})`}
                          </div>
                          {title && (
                            <p className="text-xs font-sans text-foreground/80">{title}</p>
                          )}
 
                          {/* Dynasty badge with correct text color */}
                          <div
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-sans font-medium"
                            style={{
                              backgroundColor: color,
                              color: empire === "ottoman" ? "#1a1008" : "#fff",
                            }}
                          >
                            {getDynastyLabel(l.generation ?? 1, empire, language)}
                          </div>
                        </div>
 
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-4">
                          <div
                            className="h-full rounded-full gold-gradient"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
 
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setModalLeader(l); }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans gold-gradient text-primary-foreground hover:opacity-90 transition-opacity"
                          >
                            {language === "sv" ? "Visa detaljer" : language === "tr" ? "Detayları gör" : "View details"}
                            <Crown className="w-3 h-3" />
                          </button>
                          {hasProfile && (
                            <Link
                              to={`/profiles/${l.profileId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                            >
                              {language === "sv" ? "Se profil" : language === "tr" ? "Profili gör" : "View profile"}
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
 
      <LeaderDetailModal
        leader={modalLeader}
        open={!!modalLeader}
        onClose={() => setModalLeader(null)}
        language={language}
        empireId={empire}
      />
    </AppLayout>
  );
}
 
