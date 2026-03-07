import { useState } from "react";
import { Link } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { LeaderDetailModal } from "@/components/LeaderDetailModal";
import { Crown, ChevronDown, ChevronRight, ExternalLink, Calendar, Sword, BookOpen, X } from "lucide-react";

interface TreeNode {
  leader: any;
  children: TreeNode[];
}

function buildTree(leaders: any[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];
  leaders.forEach((l) => map.set(l.id, { leader: l, children: [] }));
  leaders.forEach((l) => {
    if (l.parentId && map.has(l.parentId)) {
      map.get(l.parentId)!.children.push(map.get(l.id)!);
    } else {
      roots.push(map.get(l.id)!);
    }
  });
  return roots;
}

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
    const labels: Record<string, Record<string, string>> = {
      founders: { sv: "Grundare", en: "Founders", tr: "Kurucular" },
      julio: { sv: "Julio-Claudiska", en: "Julio-Claudian", tr: "Julio-Claudian" },
      flavian: { sv: "Flaviska", en: "Flavian", tr: "Flavius" },
      good: { sv: "Fem goda kejsare", en: "Five Good Emperors", tr: "Beş İyi İmparator" },
      late: { sv: "Senromersk", en: "Late Empire", tr: "Geç İmparatorluk" },
    };
    if (generation <= 2) return labels.founders[lang] || labels.founders.en;
    if (generation <= 6) return labels.julio[lang] || labels.julio.en;
    if (generation <= 8) return labels.flavian[lang] || labels.flavian.en;
    if (generation <= 12) return labels.good[lang] || labels.good.en;
    return labels.late[lang] || labels.late.en;
  }
  const labels: Record<string, Record<string, string>> = {
    early: { sv: "Tidig period", en: "Early Period", tr: "Erken Dönem" },
    classical: { sv: "Klassisk period", en: "Classical Period", tr: "Klasik Dönem" },
    transformation: { sv: "Omvandlingsperiod", en: "Transformation", tr: "Dönüşüm Dönemi" },
    stagnation: { sv: "Stagnationsperiod", en: "Stagnation", tr: "Duraklama Dönemi" },
    late: { sv: "Sen period", en: "Late Period", tr: "Geç Dönem" },
  };
  if (generation <= 4) return labels.early[lang] || labels.early.en;
  if (generation <= 10) return labels.classical[lang] || labels.classical.en;
  if (generation <= 15) return labels.transformation[lang] || labels.transformation.en;
  if (generation <= 18) return labels.stagnation[lang] || labels.stagnation.en;
  return labels.late[lang] || labels.late.en;
}

function TreeNodeComponent({
  node, language, empireId, profiles, expanded, toggleExpand, selectedId, setSelectedId, onOpenModal,
}: {
  node: TreeNode; language: string; empireId: string; profiles: any[];
  expanded: Set<string>; toggleExpand: (id: string) => void;
  selectedId: string | null; setSelectedId: (id: string | null) => void;
  onOpenModal: (leader: any) => void;
}) {
  const l = node.leader;
  const isExpanded = expanded.has(l.id);
  const hasChildren = node.children.length > 0;
  const hasProfile = l.profileId && profiles.find((p: any) => p.id === l.profileId);
  const dynastyColor = getDynastyColor(l.generation, empireId);
  const reignLength = l.reignEnd - l.reignStart;
  const isSelected = selectedId === l.id;

  return (
    <div className="relative">
      {hasChildren && isExpanded && (
        <div className="absolute left-[19px] top-[40px] bottom-0 w-px bg-border/50" />
      )}

      <div className="relative group">
          <button
            onClick={() => {
              if (hasChildren) toggleExpand(l.id);
              setSelectedId(isSelected ? null : l.id);
            }}
          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
            isSelected ? "bg-card/80 ottoman-border ottoman-glow" : "hover:bg-card/40"
          }`}
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-background transition-transform duration-300"
            style={{ backgroundColor: dynastyColor, transform: isSelected ? "scale(1.4)" : "scale(1)" }}
          />
          <div className="w-4 flex-shrink-0">
            {hasChildren && (
              isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-primary/60" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`text-sm font-serif truncate transition-colors duration-200 ${isSelected ? "text-primary" : "text-[#111111] dark:text-foreground drop-shadow-sm"}`}>{l.name}</span>
              {hasProfile && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-sans text-muted-foreground">
              <span>{formatYear(l.reignStart, language)}–{formatYear(l.reignEnd, language)}</span>
              <span className="text-primary/40">·</span>
              <span className="truncate">{l.title[language] || l.title.en}</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (reignLength / 50) * 100)}%`, backgroundColor: dynastyColor, opacity: isSelected ? 1 : 0.6 }} />
            </div>
            <span className="text-[9px] font-sans text-muted-foreground w-6 text-right">{reignLength}y</span>
          </div>
        </button>
      </div>

      {/* Detail card on click */}
      {isSelected && (
        <div className="ml-10 mt-2 mb-2 animate-fade-in">
          <div className="bg-card/90 backdrop-blur-md rounded-xl ottoman-border p-5 max-w-md shadow-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                <h3 className="font-serif text-primary text-base">{l.name}</h3>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} className="p-1 rounded-lg hover:bg-muted text-muted-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-sans text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {formatYear(l.reignStart, language)}–{formatYear(l.reignEnd, language)} ({reignLength} {language === "sv" ? "år" : language === "tr" ? "yıl" : "years"})
              </div>
              <p className="text-xs font-sans text-foreground/80">{l.title[language] || l.title.en}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: dynastyColor }} />
                <span className="text-[10px] font-sans text-muted-foreground">{getDynastyLabel(l.generation, empireId, language)}</span>
              </div>
            </div>

            {/* Reign bar */}
            <div className="mb-3">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full gold-gradient" style={{ width: `${Math.min(100, (reignLength / 50) * 100)}%` }} />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); onOpenModal(l); }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans gold-gradient text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {language === "sv" ? "Visa detaljer" : language === "tr" ? "Detayları gör" : "View details"}
                <Crown className="w-3 h-3" />
              </button>
              {hasProfile && (
                <Link
                  to={`/profiles/${l.profileId}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-sans bg-secondary text-secondary-foreground hover:bg-muted transition-colors"
                >
                  {language === "sv" ? "Se profil" : language === "tr" ? "Profili gör" : "View profile"}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {hasChildren && isExpanded && (
        <div className="ml-6 mt-1 space-y-0.5 animate-fade-in">
          {node.children.map((child) => (
            <TreeNodeComponent
              key={child.leader.id} node={child} language={language} empireId={empireId}
              profiles={profiles} expanded={expanded} toggleExpand={toggleExpand}
              selectedId={selectedId} setSelectedId={setSelectedId} onOpenModal={onOpenModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Lineage() {
  const { language, setLanguage } = useChat();
  const { config, empireId } = useEmpire();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalLeader, setModalLeader] = useState<any>(null);

  const leaders = config?.leaders || [];
  const profiles = config?.profiles || [];
  const tree = buildTree(leaders);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpanded(new Set(leaders.map((l) => l.id)));
  const collapseAll = () => setExpanded(new Set());

  const labels = {
    sv: { title: "Kejserlig stamtavla", count: "härskare", expandAll: "Expandera alla", collapseAll: "Dölj alla" },
    en: { title: "Imperial Lineage", count: "rulers", expandAll: "Expand all", collapseAll: "Collapse all" },
    tr: { title: "İmparatorluk Soyu", count: "hükümdar", expandAll: "Tümünü aç", collapseAll: "Tümünü kapat" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4 pb-8">
        <div className="max-w-3xl mx-auto animate-fade-in">
          {/* Page title with dark overlay for readability */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-serif text-primary flex items-center gap-2">
                <Crown className="w-6 h-6" /> {l.title}
              </h2>
              <p className="text-xs font-sans text-muted-foreground mt-1">{leaders.length} {l.count}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={expandAll} className="px-3 py-1.5 rounded-lg text-xs font-sans bg-secondary text-secondary-foreground hover:bg-muted transition-colors">{l.expandAll}</button>
              <button onClick={collapseAll} className="px-3 py-1.5 rounded-lg text-xs font-sans bg-secondary text-secondary-foreground hover:bg-muted transition-colors">{l.collapseAll}</button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mb-4 px-3 py-2 bg-card/40 rounded-xl">
            {[
              ...(empireId === "roman"
                ? [{ gen: 1 }, { gen: 4 }, { gen: 7 }, { gen: 10 }, { gen: 14 }]
                : [{ gen: 1 }, { gen: 7 }, { gen: 12 }, { gen: 16 }, { gen: 20 }]),
            ].map((item) => (
              <div key={item.gen} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getDynastyColor(item.gen, empireId || "ottoman") }} />
                <span className="text-[10px] font-sans text-muted-foreground">{getDynastyLabel(item.gen, empireId || "ottoman", language)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-0.5">
            {tree.map((node) => (
              <TreeNodeComponent
                key={node.leader.id} node={node} language={language} empireId={empireId || "ottoman"}
                profiles={profiles} expanded={expanded} toggleExpand={toggleExpand}
                selectedId={selectedId} setSelectedId={setSelectedId} onOpenModal={(l) => setModalLeader(l)}
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
        empireId={empireId || "ottoman"}
      />
    </AppLayout>
  );
}
