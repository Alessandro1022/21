import React, { useState, useRef, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { ChatMessage } from "@/components/ChatMessage";
import { Sparkles, ChevronLeft, Clock, Sword, Landmark, Palette, BookOpen, Filter, Users, Calendar, TrendingUp, Crown, ChevronDown } from "lucide-react";

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
    sv: { figures: "Nyckelpersoner", consequences: "Politiska konsekvenser", impact: "Långsiktigt inflytande", aiBtn: "AI-djupanalys", back: "Tillbaka", all: "Alla", military: "Militär", politics: "Politik", culture: "Kultur", religion: "Religion", select: "Välj en händelse", selectDesc: "Scrolla och klicka på en händelse i tidslinjen." },
    en: { figures: "Key Figures", consequences: "Political Consequences", impact: "Long-term Impact", aiBtn: "AI Deep Analysis", back: "Back", all: "All", military: "Military", politics: "Politics", culture: "Culture", religion: "Religion", select: "Select an event", selectDesc: "Scroll and tap on an event in the timeline." },
    tr: { figures: "Anahtar Kişiler", consequences: "Siyasi Sonuçlar", impact: "Uzun Vadeli Etki", aiBtn: "AI Derinlemesine Analiz", back: "Geri", all: "Tümü", military: "Askeri", politics: "Siyaset", culture: "Kültür", religion: "Din", select: "Bir olay seçin", selectDesc: "Zaman çizelgesinde kaydırın ve bir olaya tıklayın." },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

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
        <div className="flex-shrink-0 border-b border-border bg-background/40 backdrop-blur-sm px-4 py-2.5">
          <div className="max-w-3xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-thin">
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
            <span className="text-[10px] font-sans text-muted-foreground ml-auto whitespace-nowrap">
              {filteredEvents.length} {language === "sv" ? "händelser" : language === "tr" ? "olay" : "events"}
            </span>
          </div>

          {/* Progress indicator */}
          {selectedYear !== null && (
            <div className="max-w-3xl mx-auto mt-2">
              <div className="h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gold-gradient rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}
        </div>

        {/* Vertical timeline */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
          {selected ? (
            /* Detail view */
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-5 sm:p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-primary font-serif text-2xl sm:text-3xl font-bold">{formatYear(selected.year, language)}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-sans ${CATEGORY_COLORS[inferCategory(selected)]}`}>
                        {React.createElement(CATEGORY_ICONS[inferCategory(selected)], { className: "w-2.5 h-2.5" })}
                        {l[inferCategory(selected) as keyof typeof l]}
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-serif text-[#111111] dark:text-foreground">{selected.title[language] || selected.title.en}</h2>
                  </div>
                  <button onClick={() => setSelectedYear(null)} className="text-xs text-muted-foreground hover:text-foreground font-sans flex items-center gap-1 flex-shrink-0">
                    <ChevronLeft className="w-3 h-3" /> {l.back}
                  </button>
                </div>

                <p className="text-sm font-sans text-[#222222] dark:text-foreground/90 leading-relaxed">{selected.summary[language] || selected.summary.en}</p>

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

                <div className="animate-fade-in" style={{ animationDelay: "150ms" }}>
                  <h3 className="text-sm font-serif text-primary mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {l.consequences}
                  </h3>
                  <div className="bg-secondary/50 rounded-xl p-4 ottoman-border">
                    <p className="text-sm font-sans text-[#222222] dark:text-foreground/80 leading-relaxed">{selected.consequences[language] || selected.consequences.en}</p>
                  </div>
                </div>

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
            /* Vertical timeline list */
            <div className="max-w-3xl mx-auto">
              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 py-20">
                  <Clock className="w-16 h-16 text-primary/30 mb-4" />
                  <h2 className="text-xl font-serif text-primary mb-2">{l.select}</h2>
                  <p className="text-muted-foreground text-sm font-sans max-w-md">{l.selectDesc}</p>
                </div>
              ) : (
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />

                  <div className="space-y-1">
                    {filteredEvents.map((event, idx) => {
                      const cat = inferCategory(event);
                      const CatIcon = CATEGORY_ICONS[cat];
                      const isActive = selectedYear === event.year;

                      return (
                        <button
                          key={event.year}
                          onClick={() => setSelectedYear(event.year)}
                          className="relative w-full text-left pl-10 sm:pl-14 pr-3 py-3 rounded-xl hover:bg-card/60 transition-all duration-200 group animate-fade-in"
                          style={{ animationDelay: `${Math.min(idx * 30, 500)}ms` }}
                        >
                          {/* Timeline dot */}
                          <div className={`absolute left-2.5 sm:left-4.5 top-4 w-3 h-3 rounded-full ring-2 ring-background transition-all duration-300 ${
                            isActive ? "gold-gradient scale-125 ottoman-glow" : "bg-secondary group-hover:bg-primary/50"
                          }`} style={{ left: "calc(1rem - 6px)" }} />

                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-serif text-primary font-bold">{formatYear(event.year, language)}</span>
                                <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-sans ${CATEGORY_COLORS[cat]}`}>
                                  <CatIcon className="w-2.5 h-2.5" />
                                </span>
                              </div>
                              <h3 className="text-sm font-serif text-foreground group-hover:text-primary transition-colors truncate">
                                {event.title[language] || event.title.en}
                              </h3>
                              <p className="text-xs font-sans text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                                {event.summary[language] || event.summary.en}
                              </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1 -rotate-90 group-hover:text-primary transition-colors" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
