import { useState } from "react";
import { Crown, Calendar, Sword, BookOpen, Shield, TrendingUp, Scale, X, Sparkles, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatYear } from "@/data/empires";
import { leaderDetails, type LeaderDetail } from "@/data/leaderDetails";
import type { Sultan } from "@/data/sultans";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  leader: Sultan | null;
  open: boolean;
  onClose: () => void;
  language: string;
  empireId: string;
}

export function LeaderDetailModal({ leader, open, onClose, language, empireId }: Props) {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  if (!leader) return null;

  const detail = leaderDetails[leader.id];
  const reignLength = leader.reignEnd - leader.reignStart;
  const lang = language as "sv" | "en" | "tr";

  const labels = {
    sv: { reign: "Regeringstid", expansion: "Expansion", reformIndex: "Reformindex", campaigns: "Kampanjer", biography: "Biografi", reforms: "Reformer", campaignList: "Kampanjer", leadership: "Ledarstil", critical: "Kritiska perspektiv", timeline: "Tidslinje", aiAnalysis: "AI-djupanalys", loadAi: "Generera AI-analys", years: "år" },
    en: { reign: "Reign", expansion: "Expansion", reformIndex: "Reform Index", campaigns: "Campaigns", biography: "Biography", reforms: "Reforms", campaignList: "Campaigns", leadership: "Leadership Style", critical: "Critical Perspectives", timeline: "Timeline", aiAnalysis: "AI Deep Analysis", loadAi: "Generate AI Analysis", years: "years" },
    tr: { reign: "Saltanat", expansion: "Genişleme", reformIndex: "Reform Endeksi", campaigns: "Seferler", biography: "Biyografi", reforms: "Reformlar", campaignList: "Seferler", leadership: "Liderlik Tarzı", critical: "Eleştirel Perspektifler", timeline: "Zaman Çizelgesi", aiAnalysis: "AI Derin Analiz", loadAi: "AI Analiz Oluştur", years: "yıl" },
  };
  const l = labels[lang] || labels.en;

  const fetchAiAnalysis = async () => {
    setAiLoading(true);
    try {
      const empireName = empireId === "roman" ? "Roman Empire" : "Ottoman Empire";
      const { data, error } = await supabase.functions.invoke("figure-analysis", {
        body: {
          figureName: leader.name,
          empireContext: empireName,
          language: lang,
        },
      });
      if (error) throw error;
      setAiAnalysis(data?.analysis || "No analysis available.");
    } catch {
      setAiAnalysis(lang === "sv" ? "Kunde inte generera analys." : lang === "tr" ? "Analiz oluşturulamadı." : "Could not generate analysis.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto p-0 bg-card border-primary/20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-md px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-serif text-primary">{leader.name}</h2>
                <p className="text-sm font-sans text-muted-foreground">{detail?.epithet?.[lang] || leader.title[lang] || leader.title.en}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-3 text-xs font-sans text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{l.reign}: {formatYear(leader.reignStart, language)}–{formatYear(leader.reignEnd, language)} ({reignLength} {l.years})</span>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5">
          {detail && (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-4 gap-2 pt-4">
                <StatCard value={`${detail.reignYears}`} label={l.reign} />
                <StatCard value={`${detail.expansionPercent}%`} label={l.expansion} />
                <StatCard value={`${detail.reformIndex}/10`} label={l.reformIndex} />
                <StatCard value={`${detail.campaigns}`} label={l.campaigns} />
              </div>

              {/* Timeline highlight */}
              {detail.timelineHighlight && (
                <div className="bg-primary/5 rounded-xl p-3 ottoman-border">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-sans mb-1">{l.timeline}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-serif text-primary">{formatYear(detail.timelineHighlight.year, language)}</span>
                    <span className="text-xs font-sans text-foreground">{detail.timelineHighlight.label[lang] || detail.timelineHighlight.label.en}</span>
                  </div>
                </div>
              )}

              {/* Biography */}
              <Section icon={BookOpen} title={l.biography}>
                <p className="text-xs font-sans text-foreground/80 leading-relaxed">
                  {detail.biography[lang] || detail.biography.en}
                </p>
              </Section>

              {/* Reforms */}
              <Section icon={Scale} title={l.reforms}>
                <ul className="space-y-1">
                  {(detail.reforms[lang] || detail.reforms.en).map((r, i) => (
                    <li key={i} className="text-xs font-sans text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {r}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Campaigns */}
              <Section icon={Sword} title={l.campaignList}>
                <ul className="space-y-1">
                  {(detail.campaignList[lang] || detail.campaignList.en).map((c, i) => (
                    <li key={i} className="text-xs font-sans text-foreground/80">{c}</li>
                  ))}
                </ul>
              </Section>

              {/* Leadership Style */}
              <Section icon={Shield} title={l.leadership}>
                <p className="text-xs font-sans text-foreground/80 leading-relaxed italic">
                  {detail.leadershipStyle[lang] || detail.leadershipStyle.en}
                </p>
              </Section>

              {/* Critical Perspectives */}
              <Section icon={TrendingUp} title={l.critical}>
                <p className="text-xs font-sans text-foreground/80 leading-relaxed">
                  {detail.criticalPerspective[lang] || detail.criticalPerspective.en}
                </p>
              </Section>

              {/* AI Analysis */}
              <div className="bg-primary/5 rounded-xl p-4 ottoman-border">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h4 className="text-xs font-sans font-medium text-primary uppercase tracking-wider">{l.aiAnalysis}</h4>
                </div>
                {aiAnalysis ? (
                  <p className="text-xs font-sans text-foreground/80 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
                ) : (
                  <button
                    onClick={fetchAiAnalysis}
                    disabled={aiLoading}
                    className="px-4 py-2 rounded-lg gold-gradient text-primary-foreground text-xs font-sans flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    {aiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {aiLoading ? "..." : l.loadAi}
                  </button>
                )}
              </div>
            </>
          )}

          {!detail && (
            <div className="pt-4">
              <p className="text-xs font-sans text-muted-foreground">
                {lang === "sv" ? "Detaljerad information saknas för denna ledare." : lang === "tr" ? "Bu lider için ayrıntılı bilgi mevcut değil." : "Detailed information not available for this leader."}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-secondary/50 rounded-xl p-3 text-center">
      <p className="text-lg font-serif text-primary">{value}</p>
      <p className="text-[9px] font-sans text-muted-foreground uppercase tracking-wider mt-0.5 truncate">{label}</p>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <h4 className="text-xs font-sans font-medium text-foreground uppercase tracking-wider">{title}</h4>
      </div>
      {children}
    </div>
  );
}
