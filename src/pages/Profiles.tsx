import { useState, useMemo } from "react";
import { useEmpire } from "@/contexts/EmpireContext";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Search, Filter, X, Sparkles, Crown, Sword, BookOpen, Users, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import type { HistoricalFigure, FigureCategory, Gender } from "@/data/figures/types";

const ANALYSIS_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/figure-analysis`;

export default function Profiles() {
  const { language, setLanguage, level } = useChat();
  const { config, empireId } = useEmpire();
  const figures: HistoricalFigure[] = config?.figures || [];

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [selectedFigure, setSelectedFigure] = useState<HistoricalFigure | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(figures.map(f => f.category));
    return Array.from(cats).sort();
  }, [figures]);

  const filtered = useMemo(() => {
    return figures.filter(f => {
      if (search && !f.name.toLowerCase().includes(search.toLowerCase()) && !(f.title[language] || f.title.en).toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
      if (genderFilter !== "all" && f.gender !== genderFilter) return false;
      return true;
    });
  }, [figures, search, categoryFilter, genderFilter, language]);

  const runAiAnalysis = async (figure: HistoricalFigure) => {
    setAiAnalysis("");
    setAiLoading(true);
    try {
      const resp = await fetch(ANALYSIS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ figure: { name: figure.name, period: figure.period, title: figure.title, category: figure.category }, empire: empireId, language, level }),
      });
      if (!resp.ok || !resp.body) { setAiLoading(false); return; }
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "", result = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx); buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try { const c = JSON.parse(json).choices?.[0]?.delta?.content; if (c) { result += c; setAiAnalysis(result); } } catch {}
        }
      }
    } catch (e) { console.error(e); }
    setAiLoading(false);
  };

  const labels = {
    sv: { title: "Historiska Figurer", subtitle: "Utforska inflytelserika personer", search: "Sök...", all: "Alla", male: "Män", female: "Kvinnor", filter: "Filter", achievements: "Bedrifter", political: "Politisk påverkan", military: "Militärt inflytande", cultural: "Kulturellt inflytande", leadership: "Ledarstil", controversies: "Kontroverser", significance: "Historisk betydelse", aiBtn: "AI Djupanalys", overview: "Översikt" },
    en: { title: "Historical Figures", subtitle: "Explore influential personalities", search: "Search...", all: "All", male: "Male", female: "Female", filter: "Filters", achievements: "Achievements", political: "Political Impact", military: "Military Influence", cultural: "Cultural Influence", leadership: "Leadership Style", controversies: "Controversies", significance: "Historical Significance", aiBtn: "AI Deep Analysis", overview: "Overview" },
    tr: { title: "Tarihsel Figürler", subtitle: "Etkili kişilikleri keşfedin", search: "Ara...", all: "Tümü", male: "Erkek", female: "Kadın", filter: "Filtreler", achievements: "Başarılar", political: "Siyasi Etki", military: "Askeri Etki", cultural: "Kültürel Etki", leadership: "Liderlik Tarzı", controversies: "Tartışmalar", significance: "Tarihsel Önem", aiBtn: "AI Derinlemesine Analiz", overview: "Genel Bakış" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 animate-fade-in">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif text-primary">{l.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{l.subtitle} · {filtered.length} / {figures.length}</p>
          </div>

          {/* Search & Filters */}
          <div className="mb-6 space-y-3 animate-fade-in" style={{ animationDelay: "50ms" }}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder={l.search}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-card/70 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-2 bg-card/70 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Filter className="w-4 h-4" /> <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
            </div>
            {showFilters && (
              <div className="flex flex-wrap gap-2 animate-fade-in">
                <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-card/70 border border-border rounded-lg text-foreground">
                  <option value="all">{l.all}</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <select value={genderFilter} onChange={e => setGenderFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-card/70 border border-border rounded-lg text-foreground">
                  <option value="all">{l.all}</option>
                  <option value="male">{l.male}</option>
                  <option value="female">{l.female}</option>
                </select>
                {(categoryFilter !== "all" || genderFilter !== "all") && (
                  <button onClick={() => { setCategoryFilter("all"); setGenderFilter("all"); }} className="px-2 py-1 text-xs text-destructive hover:text-destructive/80">
                    <X className="w-3 h-3 inline mr-1" />Clear
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filtered.map((fig, i) => (
              <button key={fig.id} onClick={() => { setSelectedFigure(fig); setAiAnalysis(""); }}
                className="bg-card/70 backdrop-blur-sm rounded-xl ottoman-border p-4 text-left hover:bg-card/90 transition-all group animate-fade-in hover:ottoman-glow"
                style={{ animationDelay: `${Math.min(i * 30, 300)}ms` }}>
                <div className="text-3xl mb-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {fig.portrait}
                </div>
                <h3 className="text-sm font-serif text-primary truncate group-hover:gold-text">{fig.name}</h3>
                <p className="text-[10px] text-muted-foreground truncate">{fig.title[language] || fig.title.en}</p>
                <p className="text-[10px] text-muted-foreground/70">{fig.period}</p>
                <span className="inline-block mt-1.5 px-1.5 py-0.5 text-[9px] rounded bg-primary/10 text-primary/80">{fig.category}</span>
                {/* Significance dots */}
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div key={j} className={`w-1.5 h-1.5 rounded-full ${j < fig.significanceScore ? "bg-primary" : "bg-border"}`} />
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Detail Modal */}
          <Dialog open={!!selectedFigure} onOpenChange={open => { if (!open) setSelectedFigure(null); }}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 bg-card border-primary/20">
              {selectedFigure && (
                <ScrollArea className="max-h-[90vh]">
                  <div className="p-6 space-y-5">
                    <DialogHeader>
                      <div className="flex items-center gap-4">
                        <div className="text-5xl w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center ottoman-glow">
                          {selectedFigure.portrait}
                        </div>
                        <div>
                          <DialogTitle className="text-xl font-serif text-primary">{selectedFigure.name}</DialogTitle>
                          <p className="text-sm text-muted-foreground">{selectedFigure.title[language] || selectedFigure.title.en}</p>
                          <p className="text-xs text-muted-foreground/70">{selectedFigure.period} · {selectedFigure.category}</p>
                        </div>
                      </div>
                    </DialogHeader>

                    {/* Significance */}
                    <div>
                      <p className="text-[10px] text-muted-foreground mb-1">{l.significance}</p>
                      <div className="flex items-center gap-1">
                        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full gold-gradient rounded-full transition-all duration-700" style={{ width: `${selectedFigure.significanceScore * 10}%` }} />
                        </div>
                        <span className="text-xs font-serif text-primary">{selectedFigure.significanceScore}/10</span>
                      </div>
                    </div>

                    {/* Overview */}
                    <section>
                      <h3 className="text-xs font-serif text-primary mb-1.5 flex items-center gap-1"><BookOpen className="w-3 h-3" /> {l.overview}</h3>
                      <p className="text-sm text-foreground/85 leading-relaxed">{selectedFigure.overview[language] || selectedFigure.overview.en}</p>
                    </section>

                    {/* Achievements */}
                    <section>
                      <h3 className="text-xs font-serif text-primary mb-1.5 flex items-center gap-1"><Crown className="w-3 h-3" /> {l.achievements}</h3>
                      <ul className="space-y-1">
                        {(selectedFigure.achievements[language] || selectedFigure.achievements.en).map((a, i) => (
                          <li key={i} className="text-xs text-foreground/80 flex items-start gap-2"><span className="text-primary mt-0.5">•</span>{a}</li>
                        ))}
                      </ul>
                    </section>

                    {/* Impact sections */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { key: "politicalImpact", label: l.political, icon: "🏛️" },
                        { key: "militaryImpact", label: l.military, icon: "⚔️" },
                        { key: "culturalImpact", label: l.cultural, icon: "🎭" },
                      ].map(sec => (
                        <div key={sec.key} className="bg-secondary/30 rounded-lg p-3">
                          <h4 className="text-[10px] font-serif text-primary mb-1">{sec.icon} {sec.label}</h4>
                          <p className="text-xs text-foreground/75 leading-relaxed">
                            {(selectedFigure as any)[sec.key]?.[language] || (selectedFigure as any)[sec.key]?.en}
                          </p>
                        </div>
                      ))}
                      <div className="bg-secondary/30 rounded-lg p-3">
                        <h4 className="text-[10px] font-serif text-primary mb-1">👤 {l.leadership}</h4>
                        <p className="text-xs text-foreground/75 leading-relaxed">{selectedFigure.leadershipStyle[language] || selectedFigure.leadershipStyle.en}</p>
                      </div>
                    </div>

                    {/* Controversies */}
                    <section className="bg-destructive/5 border border-destructive/10 rounded-lg p-3">
                      <h3 className="text-[10px] font-serif text-destructive mb-1">⚠️ {l.controversies}</h3>
                      <p className="text-xs text-foreground/75 leading-relaxed">{selectedFigure.controversies[language] || selectedFigure.controversies.en}</p>
                    </section>

                    {/* AI Deep Analysis */}
                    <div className="border-t border-border pt-4">
                      <button onClick={() => runAiAnalysis(selectedFigure)} disabled={aiLoading}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ottoman-glow w-full justify-center">
                        <Sparkles className="w-4 h-4" /> {l.aiBtn}
                      </button>
                      {(aiAnalysis || aiLoading) && (
                        <div className="mt-4 bg-secondary/20 rounded-lg p-4 prose prose-sm prose-invert max-w-none">
                          {aiLoading && !aiAnalysis && <div className="flex items-center gap-2 text-xs text-muted-foreground"><div className="w-2 h-2 bg-primary rounded-full animate-pulse" /> Analyzing...</div>}
                          <div className="text-xs text-foreground/85 leading-relaxed [&_h1]:text-sm [&_h1]:font-serif [&_h1]:text-primary [&_h2]:text-xs [&_h2]:font-serif [&_h2]:text-primary [&_h3]:text-xs [&_h3]:text-primary [&_p]:mb-2 [&_ul]:space-y-1 [&_ol]:space-y-1 [&_li]:text-xs [&_strong]:text-primary/90">
                            <ReactMarkdown>{aiAnalysis}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollArea>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AppLayout>
  );
}
