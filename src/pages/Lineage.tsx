import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { LeaderDetailModal } from "@/components/LeaderDetailModal";
import { Crown, ExternalLink, Calendar, X } from "lucide-react";
 
// ── Helpers ──────────────────────────────────────────────────────────────────
 
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
    const map: Record<string, Record<string, string>> = {
      founders:  { sv: "Grundare",        en: "Founders",           tr: "Kurucular" },
      julio:     { sv: "Julio-Claudiska", en: "Julio-Claudian",     tr: "Julio-Claudian" },
      flavian:   { sv: "Flaviska",        en: "Flavian",            tr: "Flavius" },
      good:      { sv: "Fem goda kejsare",en: "Five Good Emperors", tr: "Beş İyi İmparator" },
      late:      { sv: "Senromersk",      en: "Late Empire",        tr: "Geç İmparatorluk" },
    };
    if (generation <= 2)  return map.founders[lang]  ?? map.founders.en;
    if (generation <= 6)  return map.julio[lang]     ?? map.julio.en;
    if (generation <= 8)  return map.flavian[lang]   ?? map.flavian.en;
    if (generation <= 12) return map.good[lang]      ?? map.good.en;
    return map.late[lang] ?? map.late.en;
  }
  const map: Record<string, Record<string, string>> = {
    early:          { sv: "Tidig period",      en: "Early Period",   tr: "Erken Dönem" },
    classical:      { sv: "Klassisk period",   en: "Classical",      tr: "Klasik Dönem" },
    transformation: { sv: "Omvandlingsperiod", en: "Transformation", tr: "Dönüşüm" },
    stagnation:     { sv: "Stagnationsperiod", en: "Stagnation",     tr: "Duraklama" },
    late:           { sv: "Sen period",        en: "Late Period",    tr: "Geç Dönem" },
  };
  if (generation <= 4)  return map.early[lang]          ?? map.early.en;
  if (generation <= 10) return map.classical[lang]      ?? map.classical.en;
  if (generation <= 15) return map.transformation[lang] ?? map.transformation.en;
  if (generation <= 18) return map.stagnation[lang]     ?? map.stagnation.en;
  return map.late[lang] ?? map.late.en;
}
 
/**
 * Safely read a localised field that may be a plain string
 * or an object like { sv: "...", en: "...", tr: "..." }.
 */
function localise(field: unknown, lang: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const f = field as Record<string, string>;
    return f[lang] ?? f["en"] ?? Object.values(f)[0] ?? "";
  }
  return String(field);
}
 
// ── LeaderRow ─────────────────────────────────────────────────────────────────
 
interface LeaderRowProps {
  leader: any;
  language: string;
  empireId: string;
  profiles: any[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onOpenModal: (leader: any) => void;
}
 
function LeaderRow({
  leader: l,
  language,
  empireId,
  profiles,
  selectedId,
  setSelectedId,
  onOpenModal,
}: LeaderRowProps) {
  // Skip malformed entries so one bad leader can't crash the whole list
  if (!l?.id) return null;
 
  const isSelected   = selectedId === l.id;
  const hasProfile   = Boolean(l.profileId && profiles.some((p: any) => p?.id === l.profileId));
  const dynastyColor = getDynastyColor(l.generation ?? 1, empireId);
  const reignStart   = Number(l.reignStart) || 0;
  const reignEnd     = Number(l.reignEnd)   || 0;
  const reignLength  = Math.max(0, reignEnd - reignStart);
  const title        = localise(l.title, language);
  const barWidth     = Math.min(100, (reignLength / 50) * 100);
  const yearLabel    = language === "sv" ? "år" : language === "tr" ? "yıl" : "years";
 
  return (
    <div className="relative">
      {/* ── Row button ── */}
      <button
        onClick={() => setSelectedId(isSelected ? null : l.id)}
        className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
          isSelected ? "bg-card/80 ottoman-border ottoman-glow" : "hover:bg-card/40"
        }`}
      >
        {/* Period colour dot */}
        <div
          className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-background transition-transform duration-200"
          style={{
            backgroundColor: dynastyColor,
            transform: isSelected ? "scale(1.4)" : "scale(1)",
          }}
        />
 
        {/* Name + subtitle */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-serif truncate transition-colors duration-200 ${
                isSelected ? "text-primary" : "text-foreground"
              }`}
            >
              {l.name ?? "—"}
            </span>
            {hasProfile && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-sans text-muted-foreground">
            <span>
              {formatYear(reignStart, language)}–{formatYear(reignEnd, language)}
            </span>
            {title && (
              <>
                <span className="text-primary/40">·</span>
                <span className="truncate">{title}</span>
              </>
            )}
          </div>
        </div>
 
        {/* Reign-length bar (desktop only) */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${barWidth}%`,
                backgroundColor: dynastyColor,
                opacity: isSelected ? 1 : 0.6,
              }}
            />
          </div>
          <span className="text-[9px] font-sans text-muted-foreground w-6 text-right">
            {reignLength}y
          </span>
        </div>
      </button>
 
      {/* ── Expanded detail card ── */}
      {isSelected && (
        <div className="mt-1 mb-2 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-md rounded-xl ottoman-border p-4 shadow-xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-serif text-primary text-sm leading-tight">{l.name}</h3>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="p-1 rounded-lg hover:bg-muted text-muted-foreground flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
 
            {/* Meta info */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>
                  {formatYear(reignStart, language)}–{formatYear(reignEnd, language)}
                  {reignLength > 0 && ` (${reignLength} ${yearLabel})`}
                </span>
              </div>
              {title && (
                <p className="text-xs font-sans text-foreground/80">{title}</p>
              )}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: dynastyColor }}
                />
                <span className="text-[10px] font-sans text-muted-foreground">
                  {getDynastyLabel(l.generation ?? 1, empireId, language)}
                </span>
              </div>
            </div>
 
            {/* Reign bar */}
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full gold-gradient"
                style={{ width: `${barWidth}%` }}
              />
            </div>
 
            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onOpenModal(l); }}
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
}
 
// ── Page ──────────────────────────────────────────────────────────────────────
 
export default function Lineage() {
  const { language, setLanguage } = useChat();
  const { config, empireId }      = useEmpire();
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [modalLeader, setModalLeader] = useState<any>(null);
 
  const empire   = empireId ?? "ottoman";
 
  // Filter out any malformed leader objects so they never reach LeaderRow
  const leaders: any[] = (config?.leaders ?? []).filter(
    (l: any) => l && l.id && l.name
  );
  const profiles: any[] = config?.profiles ?? [];
 
  const pageTitle  = { sv: "Kejserlig stamtavla", en: "Imperial Lineage",   tr: "İmparatorluk Soyu" }[language] ?? "Imperial Lineage";
  const countLabel = { sv: "härskare",            en: "rulers",             tr: "hükümdar"           }[language] ?? "rulers";
  const emptyMsg   = { sv: "Inga härskare hittades.", en: "No rulers found.", tr: "Hükümdar bulunamadı." }[language] ?? "No rulers found.";
 
  const legendGens = empire === "roman" ? [1, 4, 7, 10, 14] : [1, 7, 12, 16, 20];
 
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4 pb-8">
        <div className="max-w-3xl mx-auto animate-fade-in">
 
          {/* Title */}
          <div className="mb-4">
            <h2 className="text-2xl font-serif text-primary flex items-center gap-2">
              <Crown className="w-6 h-6" />
              {pageTitle}
            </h2>
            <p className="text-xs font-sans text-muted-foreground mt-0.5">
              {leaders.length} {countLabel}
            </p>
          </div>
 
          {/* Period legend */}
          {leaders.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4 px-3 py-2 bg-card/40 rounded-xl">
              {legendGens.map((gen) => (
                <div key={gen} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getDynastyColor(gen, empire) }}
                  />
                  <span className="text-[10px] font-sans text-muted-foreground">
                    {getDynastyLabel(gen, empire, language)}
                  </span>
                </div>
              ))}
            </div>
          )}
 
          {/* Empty state */}
          {leaders.length === 0 && (
            <p className="text-center py-16 text-muted-foreground font-sans text-sm">
              {emptyMsg}
            </p>
          )}
 
          {/* Flat, indentation-free list */}
          <div className="space-y-0.5">
            {leaders.map((leader) => (
              <LeaderRow
                key={leader.id}
                leader={leader}
                language={language}
                empireId={empire}
                profiles={profiles}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                onOpenModal={setModalLeader}
              />
            ))}
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
