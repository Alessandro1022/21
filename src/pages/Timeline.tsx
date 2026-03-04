import React, { useState, useRef, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { ChatMessage } from "@/components/ChatMessage";
import { Sparkles, ChevronLeft, Clock, Sword, Landmark, Palette, BookOpen, Filter, Users, Calendar, TrendingUp, Crown } from "lucide-react";

type Category = "all" | "military" | "politics" | "culture" | "religion";

function inferCategory(event: any): Category {
  const text = `${event.title.en} ${event.summary.en}`.toLowerCase();
  if (/(battle|siege|war|army|navy|conquest|campaign|defeat|military|fleet)/.test(text)) return "military";
  if (/(church|christian|islam|mosque|edict|religion|council|caliph|pope)/.test(text)) return "religion";
  if (/(art|culture|tulip|architecture|poet|library|university|print)/.test(text)) return "culture";
  return "politics";
}

const CATEGORY_ICONS: Record<Category, typeof Sword> = {
  all: Filter,
  military: Sword,
  politics: Landmark,
  culture: Palette,
  religion: BookOpen,
};

const CATEGORY_COLORS: Record<Category, string> = {
  all: "bg-primary/20 text-primary",
  military: "bg-destructive/20 text-destructive",
  politics: "bg-primary/20 text-primary",
  culture: "bg-accent/20 text-accent",
  religion: "bg-primary/20 text-primary",
};

export default function Timeline() {
  const { language, setLanguage, messages, isLoading, send } = useChat();
  const { config } = useEmpire();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [category, setCategory] = useState<Category>("all");
  const scrollRef = useRef<HTMLDivElement>(null);

  const timelineEvents = config?.timeline || [];

  const filteredEvents = useMemo(() => {
    if (category === "all") return timelineEvents;
    return timelineEvents.filter((e) => inferCategory(e) === category);
  }, [timelineEvents, category]);

  const selected = timelineEvents.find((e) => e.year === selectedYear);
  const selectedIndex = filteredEvents.findIndex((e) => e.year === selectedYear);
  const progress = filteredEvents.length > 1 ? Math.max(0, selectedIndex) / (filteredEvents.length - 1) * 100 : 0;

  const handleDeepAnalysis = () => {
    if (!selected) return;
    const prompt = language === "sv"
      ? `Ge en fördjupad analys av händelsen "${selected.title.sv}" (${formatYear(selected.year, language)}).`
      : language === "tr"
      ? `"${selected.title.tr}" (${formatYear(selected.year, language)}) olayının derinlemesine analizini yapın.`
      : `Provide an in-depth analysis of "${selected.title.en}" (${formatYear(selected.year, language)}).`;
    send(prompt);
  };

  const labels = {
    sv: { figures: "Nyckelpersoner", consequences: "Politiska konsekvenser", impact: "Långsiktigt inflytande", aiBtn: "AI-djupanalys", back: "Tillbaka", all: "Alla", military: "Militär", politics: "Politik", culture: "Kultur", religion: "Religion", select: "Välj ett år", selectDesc: "Scrolla och klicka på ett år i tidslinjen." },
    en: { figures: "Key Figures", consequences: "Political Consequences", impact: "Long-term Impact", aiBtn: "AI Deep Analysis", back: "Back", all: "All", military: "Military", politics: "Politics", culture: "Culture", religion: "Religion", select: "Select a year", selectDesc: "Scroll and click on a year in the timeline." },
    tr: { figures: "Anahtar Kişiler", consequences: "Siyasi Sonuçlar", impact: "Uzun Vadeli Etki", aiBtn: "AI Derinlemesine Analiz", back: "Geri", all: "Tümü", military: "Askeri", politics: "Siyaset", culture: "Kültür", religion: "Din", select: "Bir yıl seçin", selectDesc: "Zaman çizelgesinde kaydırın ve bir yıla tıklayın." },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  useEffect(() => {
    if (selectedYear && scrollRef.current) {
      const btn = scrollRef.current.querySelector(`[data-year="${selectedYear}"]`);
      btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [selectedYear]);

  const categoryOptions: { value: Category; label: string }[] = [
    { value: "all", label: l.all },
    { value: "military", label: l.military },
    { value: "politics", label: l.politics },
    { value: "culture", label: l.culture },
    { value: "religion", label: l.religion },
  ];

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
        {/* Filter bar */}
        <div className="flex-shrink-0 border-b border-border bg-background/40 backdrop-blur-sm">
          <div className="px-4 pt-3 pb-1">
            <div className="max-w-5xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-thin">
              {categoryOptions.map((opt) => {
                const Icon = CATEGORY_ICONS[opt.value];
                return (
                  <button
                    key={opt.value}
                    onClick={() => setCategory(opt.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans whitespace-nowrap transition-all duration-200 ${
                      category === opt.value
                        ? "bg-primary/20 text-primary ottoman-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-3 h-3" /> {opt.label}
                  </button>
                );
              })}
              <span className="text-[10px] font-sans text-muted-foreground ml-auto">
                {filteredEvents.length} {language === "sv" ? "händelser" : language === "tr" ? "olay" : "events"}
              </span>
            </div>
          </div>

          {/* Progress indicator */}
          {selectedYear !== null && (
            <div className="px-4 pb-1">
              <div className="max-w-5xl mx-auto">
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gold-gradient rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>
          )}

          {/* Timeline strip */}
          <div ref={scrollRef} className="overflow-x-auto scrollbar-thin py-4 px-4">
            <div className="flex items-end gap-0.5 min-w-max relative">
              <div className="absolute bottom-[22px] left-0 right-0 h-px bg-border" />
              {filteredEvents.map((event, idx) => {
                const active = selectedYear === event.year;
                const cat = inferCategory(event);
                const CatIcon = CATEGORY_ICONS[cat];
                return (
                  <button
                    key={event.year}
                    data-year={event.year}
                    onClick={() => setSelectedYear(active ? null : event.year)}
                    className="relative z-10 flex flex-col items-center gap-1 px-1.5 sm:px-2 transition-all duration-300 group"
                  >
                    <span className={`text-[8px] sm:text-[9px] font-sans max-w-[50px] sm:max-w-[60px] text-center leading-tight transition-all duration-300 ${active ? "text-primary opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-100"}`}>
                      {event.title[language] || event.title.en}
                    </span>
                    <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                      active
                        ? "gold-gradient text-primary-foreground ottoman-glow scale-110"
                        : "bg-secondary text-secondary-foreground hover:bg-muted border border-border hover:scale-105 group-hover:border-primary/40"
                    }`}>
                      {active ? (
                        <CatIcon className="w-3.5 h-3.5" />
                      ) : (
                        <span className="text-[9px] sm:text-[10px] font-serif font-bold">{formatYear(event.year, language)}</span>
                      )}
                    </div>
                    <span className={`text-[8px] font-sans transition-colors duration-200 ${active ? "text-primary font-medium" : "text-muted-foreground"}`}>
                      {formatYear(event.year, language)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
          {selected ? (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-primary font-serif text-3xl font-bold">{formatYear(selected.year, language)}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans ${CATEGORY_COLORS[inferCategory(selected)]}`}>
                        {React.createElement(CATEGORY_ICONS[inferCategory(selected)], { className: "w-2.5 h-2.5" })}
                        {l[inferCategory(selected) as keyof typeof l]}
                      </span>
                    </div>
                    <h2 className="text-xl font-serif text-foreground">{selected.title[language] || selected.title.en}</h2>
                  </div>
                  <button onClick={() => setSelectedYear(null)} className="text-xs text-muted-foreground hover:text-foreground font-sans flex items-center gap-1">
                    <ChevronLeft className="w-3 h-3" /> {l.back}
                  </button>
                </div>

                <p className="text-sm font-sans text-foreground/90 leading-relaxed">{selected.summary[language] || selected.summary.en}</p>

                {/* Key Figures */}
                <div className="animate-fade-in" style={{ animationDelay: "50ms" }}>
                  <h3 className="text-sm font-serif text-primary mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {l.figures}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.figures.map((f) => (
                      <span key={f} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-sans ottoman-border flex items-center gap-1.5">
                        <Crown className="w-3 h-3" /> {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Consequences */}
                <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
                  <h3 className="text-sm font-serif text-primary mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {l.consequences}
                  </h3>
                  <div className="bg-secondary/50 rounded-xl p-4 ottoman-border">
                    <p className="text-sm font-sans text-foreground/80 leading-relaxed">{selected.consequences[language] || selected.consequences.en}</p>
                  </div>
                </div>

                {/* Long-term Impact */}
                <div className="animate-fade-in" style={{ animationDelay: "250ms" }}>
                  <h3 className="text-sm font-serif text-primary mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> {l.impact}
                  </h3>
                  <div className="bg-primary/5 rounded-xl p-4 ottoman-border">
                    <p className="text-sm font-sans text-foreground/80 leading-relaxed">{selected.impact[language] || selected.impact.en}</p>
                  </div>
                </div>

                <button onClick={handleDeepAnalysis} disabled={isLoading}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ottoman-glow">
                  <Sparkles className="w-4 h-4" /> {l.aiBtn}
                </button>

                {messages.length > 0 && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4">
                    {messages.map((msg, i) => (
                      <ChatMessage key={i} message={msg} isStreaming={isLoading && i === messages.length - 1} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <Clock className="w-16 h-16 text-primary/30 mb-4" />
              <h2 className="text-xl font-serif text-primary mb-2">{l.select}</h2>
              <p className="text-muted-foreground text-sm font-sans max-w-md">{l.selectDesc}</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
