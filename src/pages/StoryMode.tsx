import { useState, useRef, useEffect } from "react";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { ChatMessage } from "@/components/ChatMessage";

function buildChapters(timeline: any[], empireId: string, lang: string) {
  if (!timeline.length) return [];

  const sorted = [...timeline].sort((a, b) => a.year - b.year);
  const chapterSize = Math.ceil(sorted.length / 6);
  const chapters: { title: Record<string, string>; events: any[]; era: string }[] = [];

  for (let i = 0; i < sorted.length; i += chapterSize) {
    const chunk = sorted.slice(i, i + chapterSize);
    const first = chunk[0];
    const last = chunk[chunk.length - 1];
    const eraLabel = `${formatYear(first.year, lang)}–${formatYear(last.year, lang)}`;

    const chapterLabels: Record<number, Record<string, string>> = {
      0: { sv: "Uppkomsten", en: "The Rise", tr: "Yükseliş" },
      1: { sv: "Expansion", en: "Expansion", tr: "Genişleme" },
      2: { sv: "Guldåldern", en: "The Golden Age", tr: "Altın Çağ" },
      3: { sv: "Utmaningar", en: "Challenges", tr: "Zorluklar" },
      4: { sv: "Omvandling", en: "Transformation", tr: "Dönüşüm" },
      5: { sv: "Arvet", en: "The Legacy", tr: "Miras" },
    };

    const idx = Math.floor(i / chapterSize);
    chapters.push({
      title: chapterLabels[idx] || chapterLabels[0],
      events: chunk,
      era: eraLabel,
    });
  }

  return chapters;
}

export default function StoryMode() {
  const { language, setLanguage, messages, isLoading, send } = useChat();
  const { config, empireId } = useEmpire();
  const [currentChapter, setCurrentChapter] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const timeline = config?.timeline || [];
  const chapters = buildChapters(timeline, empireId || "", language);
  const chapter = chapters[currentChapter];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentChapter]);

  const labels = {
    sv: { title: "Guidad kejserlig resa", chapter: "Kapitel", of: "av", prev: "Föregående", next: "Nästa", aiBtn: "AI-analys av epoken", journey: "Din resa genom historien" },
    en: { title: "Guided Imperial Journey", chapter: "Chapter", of: "of", prev: "Previous", next: "Next", aiBtn: "AI Analysis of Era", journey: "Your journey through history" },
    tr: { title: "Rehberli İmparatorluk Yolculuğu", chapter: "Bölüm", of: "/", prev: "Önceki", next: "Sonraki", aiBtn: "Dönem AI Analizi", journey: "Tarih boyunca yolculuğunuz" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  const handleAI = () => {
    if (!chapter) return;
    const events = chapter.events.map((e) => e.title[language] || e.title.en).join(", ");
    const prompt = language === "sv"
      ? `Analysera denna historiska period (${chapter.era}): ${events}. Ge en sammanhängande berättelse om denna epok.`
      : language === "tr"
      ? `Bu tarihsel dönemi analiz edin (${chapter.era}): ${events}. Bu çağ hakkında tutarlı bir anlatı sunun.`
      : `Analyze this historical period (${chapter.era}): ${events}. Provide a cohesive narrative of this era.`;
    send(prompt);
  };

  if (!chapter) return null;

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full flex flex-col">
        {/* Progress bar */}
        <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-background/40 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-serif text-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> {l.title}
              </h2>
              <span className="text-xs font-sans text-muted-foreground">
                {l.chapter} {currentChapter + 1} {l.of} {chapters.length}
              </span>
            </div>
            {/* Chapter dots */}
            <div className="flex gap-1.5">
              {chapters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentChapter(i)}
                  className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${
                    i === currentChapter ? "gold-gradient ottoman-glow" : i < currentChapter ? "bg-primary/40" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Chapter content */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-6 pt-4">
          <div className="max-w-3xl mx-auto animate-fade-in">
            {/* Chapter header */}
            <div className="text-center mb-8">
              <span className="text-xs font-sans text-muted-foreground uppercase tracking-widest">
                {l.chapter} {currentChapter + 1}
              </span>
              <h1 className="text-3xl font-serif text-primary mt-2">
                {chapter.title[language] || chapter.title.en}
              </h1>
              <p className="text-sm font-sans text-muted-foreground mt-1">{chapter.era}</p>
            </div>

            {/* Events */}
            <div className="space-y-6">
              {chapter.events.map((event, i) => (
                <div
                  key={event.year}
                  className="relative pl-8 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full gold-gradient ottoman-glow" />
                  {i < chapter.events.length - 1 && (
                    <div className="absolute left-[7px] top-5 bottom-0 w-px bg-primary/20" />
                  )}

                  <div className="bg-card/60 backdrop-blur-sm rounded-xl ottoman-border p-5 hover:bg-card/80 transition-colors duration-300">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-lg font-serif text-primary font-bold">
                        {formatYear(event.year, language)}
                      </span>
                      <h3 className="text-sm font-serif text-foreground">
                        {event.title[language] || event.title.en}
                      </h3>
                    </div>
                    <p className="text-sm font-sans text-foreground/80 leading-relaxed mb-3">
                      {event.summary[language] || event.summary.en}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {event.figures.map((f: string) => (
                        <span key={f} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-sans">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI analysis button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleAI}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient text-primary-foreground text-sm font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ottoman-glow"
              >
                <Sparkles className="w-4 h-4" /> {l.aiBtn}
              </button>
            </div>

            {messages.length > 0 && (
              <div className="mt-6 space-y-3 border-t border-border pt-4">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} isStreaming={isLoading && i === messages.length - 1} />
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
              <button
                onClick={() => setCurrentChapter((c) => Math.max(0, c - 1))}
                disabled={currentChapter === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-sans text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> {l.prev}
              </button>
              <button
                onClick={() => setCurrentChapter((c) => Math.min(chapters.length - 1, c + 1))}
                disabled={currentChapter === chapters.length - 1}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-sans gold-gradient text-primary-foreground disabled:opacity-30 transition-colors"
              >
                {l.next} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
