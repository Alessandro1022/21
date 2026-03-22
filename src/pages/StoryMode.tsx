import { useState, useRef, useEffect, useCallback, useMemo } from “react”;
import { useEmpire } from “@/contexts/EmpireContext”;
import { formatYear } from “@/data/empires”;
import { AppLayout } from “@/components/AppLayout”;
import { useChat } from “@/hooks/useChat”;
import { ChatMessage } from “@/components/ChatMessage”;
import {
BookOpen, ChevronLeft, ChevronRight, Sparkles,
Sword, Landmark, Coins, BookMarked, Crown, Globe,
ChevronDown, ChevronUp, Bookmark, BookmarkCheck,
Map, X, Loader2, RotateCcw, Zap, MessageSquare,
ArrowRight, Eye,
} from “lucide-react”;

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Lang = “sv” | “en” | “tr”;

interface StoryEvent {
year: number;
title: Record<string, string>;
summary: Record<string, string>;
figures: string[];
category?: “war” | “culture” | “economy” | “religion” | “politics” | “exploration”;
}

interface Chapter {
title: Record<string, string>;
description: Record<string, string>;
events: StoryEvent[];
era: string;
theme: {
from: string;
to: string;
accent: string;
icon: React.ReactNode;
};
}

interface ChatMsg {
role: “user” | “assistant”;
content: string;
}

// ─────────────────────────────────────────────
// Constants & helpers
// ─────────────────────────────────────────────
const CATEGORY_META = {
war:         { icon: <Sword className="w-3 h-3" />,     label: { sv: “Krig”,       en: “War”,         tr: “Savaş”     }, color: “text-rose-400 bg-rose-400/10 border-rose-400/20” },
culture:     { icon: <BookMarked className="w-3 h-3" />, label: { sv: “Kultur”,     en: “Culture”,     tr: “Kültür”    }, color: “text-violet-400 bg-violet-400/10 border-violet-400/20” },
economy:     { icon: <Coins className="w-3 h-3" />,      label: { sv: “Ekonomi”,    en: “Economy”,     tr: “Ekonomi”   }, color: “text-emerald-400 bg-emerald-400/10 border-emerald-400/20” },
religion:    { icon: <Landmark className="w-3 h-3" />,   label: { sv: “Religion”,   en: “Religion”,    tr: “Din”       }, color: “text-amber-400 bg-amber-400/10 border-amber-400/20” },
politics:    { icon: <Crown className="w-3 h-3" />,      label: { sv: “Politik”,    en: “Politics”,    tr: “Siyaset”   }, color: “text-sky-400 bg-sky-400/10 border-sky-400/20” },
exploration: { icon: <Globe className="w-3 h-3" />,      label: { sv: “Utforskning”, en: “Exploration”, tr: “Keşif”    }, color: “text-teal-400 bg-teal-400/10 border-teal-400/20” },
};

const CHAPTER_THEMES = [
{ from: “from-amber-950/60”,  to: “to-stone-950”,   accent: “#f59e0b”, icon: <Crown className="w-5 h-5" /> },
{ from: “from-sky-950/60”,    to: “to-stone-950”,   accent: “#38bdf8”, icon: <Globe className="w-5 h-5" /> },
{ from: “from-amber-900/60”,  to: “to-stone-950”,   accent: “#fbbf24”, icon: <Sparkles className="w-5 h-5" /> },
{ from: “from-rose-950/60”,   to: “to-stone-950”,   accent: “#f43f5e”, icon: <Sword className="w-5 h-5" /> },
{ from: “from-violet-950/60”, to: “to-stone-950”,   accent: “#a78bfa”, icon: <BookMarked className="w-5 h-5" /> },
{ from: “from-emerald-950/60”, to: “to-stone-950”,  accent: “#34d399”, icon: <Landmark className="w-5 h-5" /> },
];

const CHAPTER_DESCRIPTIONS: Record<number, Record<string, string>> = {
0: {
sv: “Ur historiens dimma träder ett imperium fram. Grundarna sätter sina avtryck och lägger grunden för vad som ska bli en av historiens mäktigaste makter.”,
en: “From the mists of history, an empire emerges. Founders leave their mark and lay the foundation for what will become one of history’s most powerful forces.”,
tr: “Tarihin sisinden bir imparatorluk doğar. Kurucular izlerini bırakır ve tarihin en güçlü güçlerinden birinin temellerini atar.”,
},
1: {
sv: “Imperiet sträcker sina gränser. Arméer marscherar, handelsvägar öppnas och nya folk inlemmas under kejsarens baner.”,
en: “The empire stretches its borders. Armies march, trade routes open, and new peoples are brought under the emperor’s banner.”,
tr: “İmparatorluk sınırlarını genişletir. Ordular yürür, ticaret yolları açılır ve yeni halklar imparatorun bayrağı altına girer.”,
},
2: {
sv: “Imperiet når sin zenit. Konst, vetenskap och välstånd blomstrar. Detta är den era som eftervärlden minns och sörjer.”,
en: “The empire reaches its zenith. Art, science and prosperity flourish. This is the era posterity remembers and mourns.”,
tr: “İmparatorluk zirvesine ulaşır. Sanat, bilim ve refah çiçek açar. Bu, sonraki nesillerin hatırladığı ve özlem duyduğu çağdır.”,
},
3: {
sv: “Stormen nalkas. Inre konflikter, yttre hot och ekonomiska påfrestningar sätter imperiet på hårda prov. Inte alla överlever.”,
en: “The storm approaches. Internal conflicts, external threats and economic strain put the empire to the test. Not all survive.”,
tr: “Fırtına yaklaşır. İç çatışmalar, dış tehditler ve ekonomik baskılar imparatorluğu ağır sınavlardan geçirir. Herkes hayatta kalmaz.”,
},
4: {
sv: “Imperiet förändras. Gamla strukturer bryts ned och nya formas. Vissa kallar det förfall — andra ser det som återfödelse.”,
en: “The empire transforms. Old structures break down and new ones form. Some call it decline — others see it as rebirth.”,
tr: “İmparatorluk dönüşür. Eski yapılar çöker ve yenileri oluşur. Bazıları buna çöküş der — diğerleri yeniden doğuş olarak görür.”,
},
5: {
sv: “Imperiet är borta — men dess ande lever. Lagar, språk, konst och idéer fortsätter att forma världen långt efter att det sista kvarlevande fallen.”,
en: “The empire is gone — but its spirit lives on. Laws, language, art and ideas continue to shape the world long after the last walls fell.”,
tr: “İmparatorluk gitti — ama ruhu yaşıyor. Yasalar, dil, sanat ve fikirler, son duvarlar yıkıldıktan çok sonra da dünyayı şekillendirmeye devam ediyor.”,
},
};

const QUICK_QUESTIONS: Record<string, Record<Lang, string[]>> = {
default: {
sv: [“Vad var konsekvenserna av detta?”, “Vilka nyckelfigurer var inblandade?”, “Hur påverkade detta imperiet långsiktigt?”],
en: [“What were the consequences of this?”, “Which key figures were involved?”, “How did this affect the empire long-term?”],
tr: [“Bunun sonuçları nelerdi?”, “Hangi kilit figürler dahil oldu?”, “Bu, imparatorluğu uzun vadede nasıl etkiledi?”],
},
};

const LABELS = {
sv: {
title: “Guidad kejserlig resa”, chapter: “Kapitel”, of: “av”,
prev: “Föregående”, next: “Nästa”, aiBtn: “AI-analys av epoken”,
journey: “Din resa genom historien”, readMore: “Läs mer”, readLess: “Läs mindre”,
quickQ: “Snabbfrågor”, bookmark: “Bokmärke”, bookmarked: “Bokmärkt”,
overview: “Kapitelöversikt”, close: “Stäng”, analyzing: “Analyserar epoken…”,
resetChat: “Rensa svar”, progress: “utforskat”, figureQ: “Berätta om”,
noEvents: “Inga händelser att visa för detta kapitel ännu.”,
emptyState: “Det finns ingen tidslinje för detta imperium ännu.”,
stopGen: “Avbryt”, chapterJump: “Hoppa till kapitel”,
swipeHint: “Svep eller använd piltangenterna för att bläddra”,
askAbout: “Fråga om denna händelse”,
},
en: {
title: “Guided Imperial Journey”, chapter: “Chapter”, of: “of”,
prev: “Previous”, next: “Next”, aiBtn: “AI Analysis of Era”,
journey: “Your journey through history”, readMore: “Read more”, readLess: “Read less”,
quickQ: “Quick Questions”, bookmark: “Bookmark”, bookmarked: “Bookmarked”,
overview: “Chapter Overview”, close: “Close”, analyzing: “Analyzing the era…”,
resetChat: “Clear answers”, progress: “explored”, figureQ: “Tell me about”,
noEvents: “No events to show for this chapter yet.”,
emptyState: “There is no timeline for this empire yet.”,
stopGen: “Stop”, chapterJump: “Jump to chapter”,
swipeHint: “Swipe or use arrow keys to navigate”,
askAbout: “Ask about this event”,
},
tr: {
title: “Rehberli İmparatorluk Yolculuğu”, chapter: “Bölüm”, of: “/”,
prev: “Önceki”, next: “Sonraki”, aiBtn: “Dönem AI Analizi”,
journey: “Tarih boyunca yolculuğunuz”, readMore: “Devamını oku”, readLess: “Daha az göster”,
quickQ: “Hızlı Sorular”, bookmark: “Yer imi”, bookmarked: “Yer imi eklendi”,
overview: “Bölüm Genel Bakışı”, close: “Kapat”, analyzing: “Çağ analiz ediliyor…”,
resetChat: “Yanıtları temizle”, progress: “keşfedildi”, figureQ: “Hakkında anlat”,
noEvents: “Bu bölüm için henüz gösterilecek olay yok.”,
emptyState: “Bu imparatorluk için henüz zaman çizelgesi yok.”,
stopGen: “Durdur”, chapterJump: “Bölüme atla”,
swipeHint: “Kaydırın veya gezinmek için ok tuşlarını kullanın”,
askAbout: “Bu olay hakkında sor”,
},
};

function buildChapters(timeline: StoryEvent[], lang: Lang): Chapter[] {
if (!timeline.length) return [];
const sorted = […timeline].sort((a, b) => a.year - b.year);
const total = Math.min(6, sorted.length);
const chapterSize = Math.ceil(sorted.length / total);

const chapterTitles: Record<number, Record<string, string>> = {
0: { sv: “Uppkomsten”,   en: “The Rise”,         tr: “Yükseliş”  },
1: { sv: “Expansion”,    en: “Expansion”,        tr: “Genişleme” },
2: { sv: “Guldåldern”,   en: “The Golden Age”,   tr: “Altın Çağ” },
3: { sv: “Utmaningar”,   en: “Challenges”,       tr: “Zorluklar” },
4: { sv: “Omvandling”,   en: “Transformation”,   tr: “Dönüşüm”   },
5: { sv: “Arvet”,        en: “The Legacy”,       tr: “Miras”     },
};

return Array.from({ length: total }, (_, idx) => {
const chunk = sorted.slice(idx * chapterSize, (idx + 1) * chapterSize);
const first = chunk[0];
const last = chunk[chunk.length - 1];
return {
title: chapterTitles[idx] || chapterTitles[0],
description: CHAPTER_DESCRIPTIONS[idx] || CHAPTER_DESCRIPTIONS[0],
events: chunk,
era: `${formatYear(first.year, lang)}–${formatYear(last.year, lang)}`,
theme: CHAPTER_THEMES[idx] || CHAPTER_THEMES[0],
};
});
}

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function CategoryBadge({ category, lang }: { category?: string; lang: Lang }) {
if (!category || !CATEGORY_META[category as keyof typeof CATEGORY_META]) return null;
const meta = CATEGORY_META[category as keyof typeof CATEGORY_META];
return (
<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-medium ${meta.color}`}>
{meta.icon}
{meta.label[lang] || meta.label.en}
</span>
);
}

function ProgressRing({ progress, size = 36 }: { progress: number; size?: number }) {
const r = (size - 4) / 2;
const circ = 2 * Math.PI * r;
const offset = circ - (progress / 100) * circ;
return (
<svg width={size} height={size} className="rotate-[-90deg]">
<circle cx={size / 2} cy={size / 2} r={r} fill=“none” stroke=“currentColor” strokeWidth=“2” className=“text-border” />
<circle
cx={size / 2} cy={size / 2} r={r} fill=“none”
stroke=“currentColor” strokeWidth=“2”
strokeDasharray={circ} strokeDashoffset={offset}
strokeLinecap=“round”
className=“text-primary transition-all duration-700”
/>
</svg>
);
}

function StreamingDots() {
return (
<span className="inline-flex items-center gap-1 ml-1">
{[0, 1, 2].map((i) => (
<span
key={i}
className=“w-1 h-1 rounded-full bg-primary animate-bounce”
style={{ animationDelay: `${i * 150}ms`, animationDuration: “0.8s” }}
/>
))}
</span>
);
}

function EventCard({
event, index, isLast, lang, bookmarked, onBookmark, onFigureClick, onQuickQuestion, l,
}: {
event: StoryEvent;
index: number;
isLast: boolean;
lang: Lang;
bookmarked: boolean;
onBookmark: () => void;
onFigureClick: (name: string) => void;
onQuickQuestion: (q: string) => void;
l: typeof LABELS.en;
}) {
const [expanded, setExpanded] = useState(false);
const [showQuestions, setShowQuestions] = useState(false);
const summary = event.summary[lang] || event.summary.en;
const title = event.title[lang] || event.title.en;
const isTruncatable = summary.length > 180;
const displaySummary = isTruncatable && !expanded ? summary.slice(0, 180) + “…” : summary;
const questions = QUICK_QUESTIONS.default[lang];

return (
<div
className=“relative pl-10 animate-fade-in group”
style={{ animationDelay: `${index * 80}ms` }}
>
{/* Timeline line */}
{!isLast && (
<div className="absolute left-[13px] top-7 bottom-0 w-px bg-gradient-to-b from-primary/30 to-transparent" />
)}

```
  {/* Timeline dot */}
  <div className={`absolute left-0 top-2 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${bookmarked ? "gold-gradient ottoman-glow" : "bg-card border border-primary/30"}`}>
    {bookmarked
      ? <BookmarkCheck className="w-3.5 h-3.5 text-primary-foreground" />
      : <div className="w-2 h-2 rounded-full gold-gradient" />
    }
  </div>

  {/* Card */}
  <div className="bg-card/50 backdrop-blur-md rounded-2xl ottoman-border p-5 hover:bg-card/70 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">

    {/* Header row */}
    <div className="flex items-start justify-between gap-2 mb-3">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="text-base font-serif text-primary font-bold tabular-nums">
            {formatYear(event.year, lang)}
          </span>
          <CategoryBadge category={event.category} lang={lang} />
        </div>
        <h3 className="text-sm font-serif text-foreground leading-snug">{title}</h3>
      </div>

      {/* Bookmark button */}
      <button
        onClick={onBookmark}
        className={`flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 ${bookmarked ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
        title={bookmarked ? l.bookmarked : l.bookmark}
      >
        {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
      </button>
    </div>

    {/* Summary */}
    <p className="text-sm font-sans text-foreground/75 leading-relaxed mb-3">
      {displaySummary}
    </p>
    {isTruncatable && (
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 text-xs text-primary hover:opacity-80 transition-opacity mb-3"
      >
        {expanded ? <><ChevronUp className="w-3 h-3" />{l.readLess}</> : <><ChevronDown className="w-3 h-3" />{l.readMore}</>}
      </button>
    )}

    {/* Figures */}
    {event.figures.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-3">
        {event.figures.map((f) => (
          <button
            key={f}
            onClick={() => onFigureClick(f)}
            className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-sans hover:bg-primary/20 transition-colors duration-200 flex items-center gap-1"
          >
            <Crown className="w-2.5 h-2.5" />
            {f}
          </button>
        ))}
      </div>
    )}

    {/* Quick questions toggle */}
    <div className="border-t border-border/50 pt-3">
      <button
        onClick={() => setShowQuestions((s) => !s)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        {l.askAbout}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showQuestions ? "rotate-180" : ""}`} />
      </button>

      {showQuestions && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {questions.map((q) => {
            const fullQ = `${q} (${title}, ${formatYear(event.year, lang)})`;
            return (
              <button
                key={q}
                onClick={() => { onQuickQuestion(fullQ); setShowQuestions(false); }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary border border-border text-xs text-foreground/80 hover:text-foreground transition-all duration-200"
              >
                <ArrowRight className="w-3 h-3 text-primary" />
                {q}
              </button>
            );
          })}
        </div>
      )}
    </div>
  </div>
</div>
```

);
}

function ChapterOverviewModal({
chapters, currentChapter, lang, onSelect, onClose, l,
}: {
chapters: Chapter[];
currentChapter: number;
lang: Lang;
onSelect: (i: number) => void;
onClose: () => void;
l: typeof LABELS.en;
}) {
return (
<div
className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
onClick={onClose}
>
<div
className=“w-full max-w-md bg-card rounded-2xl ottoman-border shadow-2xl p-6 animate-fade-in”
onClick={(e) => e.stopPropagation()}
>
<div className="flex items-center justify-between mb-5">
<h2 className="text-lg font-serif text-primary flex items-center gap-2">
<Map className="w-5 h-5" />{l.overview}
</h2>
<button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
<X className="w-4 h-4" />
</button>
</div>
<div className="space-y-2">
{chapters.map((ch, i) => (
<button
key={i}
onClick={() => { onSelect(i); onClose(); }}
className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${ i === currentChapter ? "bg-primary/10 border border-primary/30" : "hover:bg-secondary border border-transparent" }`}
>
<div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif font-bold flex-shrink-0 ${ i === currentChapter ? "gold-gradient text-primary-foreground" : "bg-secondary text-muted-foreground" }`}>
{i + 1}
</div>
<div className="flex-1 min-w-0">
<div className="text-sm font-serif text-foreground truncate">
{ch.title[lang] || ch.title.en}
</div>
<div className="text-xs text-muted-foreground">{ch.era} · {ch.events.length} händelser</div>
</div>
{i < currentChapter && <div className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />}
{i === currentChapter && <Eye className="w-4 h-4 text-primary flex-shrink-0" />}
</button>
))}
</div>
</div>
</div>
);
}

// ─────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────
export default function StoryMode() {
const { language, setLanguage } = useChat();
const { config, empireId } = useEmpire();

// Re-use a single useChat but manage messages per chapter ourselves
const { isLoading, send, messages: rawMessages } = useChat();

const lang = (language as Lang) || “en”;
const l = LABELS[lang] || LABELS.en;

// ── State ──
const [currentChapter, setCurrentChapter] = useState(0);
const [direction, setDirection] = useState<“forward” | “back”>(“forward”);
const [isTransitioning, setIsTransitioning] = useState(false);
const [chapterMessages, setChapterMessages] = useState<Record<number, ChatMsg[]>>({});
const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
const [showOverview, setShowOverview] = useState(false);
const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
const [hasShownHint, setHasShownHint] = useState(false);

const scrollRef = useRef<HTMLDivElement>(null);
const touchStartX = useRef<number | null>(null);
const contentKey = useRef(0);

const timeline: StoryEvent[] = config?.timeline || [];
const chapters = useMemo(() => buildChapters(timeline, lang), [timeline, lang]);
const chapter = chapters[currentChapter];
const progress = chapters.length > 0 ? Math.round(((currentChapter + 1) / chapters.length) * 100) : 0;
const currentMessages = chapterMessages[currentChapter] || [];

// ── Sync rawMessages into per-chapter store ──
useEffect(() => {
if (rawMessages.length > 0) {
setChapterMessages((prev) => ({
…prev,
[currentChapter]: rawMessages as ChatMsg[],
}));
}
}, [rawMessages, currentChapter]);

// ── Persist chapter position ──
useEffect(() => {
if (!empireId) return;
const key = `story_chapter_${empireId}`;
const saved = localStorage.getItem(key);
if (saved !== null) {
const n = parseInt(saved, 10);
if (!isNaN(n) && n < chapters.length) setCurrentChapter(n);
}
}, [empireId, chapters.length]);

useEffect(() => {
if (!empireId) return;
localStorage.setItem(`story_chapter_${empireId}`, String(currentChapter));
}, [empireId, currentChapter]);

// ── Persist bookmarks ──
useEffect(() => {
if (!empireId) return;
const saved = localStorage.getItem(`story_bookmarks_${empireId}`);
if (saved) {
try { setBookmarks(JSON.parse(saved)); } catch {}
}
}, [empireId]);

const toggleBookmark = useCallback((key: string) => {
setBookmarks((prev) => {
const next = { …prev, [key]: !prev[key] };
if (empireId) localStorage.setItem(`story_bookmarks_${empireId}`, JSON.stringify(next));
return next;
});
}, [empireId]);

// ── Navigation ──
const navigate = useCallback((dir: “forward” | “back”) => {
const next = dir === “forward” ? currentChapter + 1 : currentChapter - 1;
if (next < 0 || next >= chapters.length || isTransitioning) return;
setDirection(dir);
setIsTransitioning(true);
contentKey.current += 1;
setTimeout(() => {
setCurrentChapter(next);
setIsTransitioning(false);
scrollRef.current?.scrollTo({ top: 0, behavior: “smooth” });
}, 200);
}, [currentChapter, chapters.length, isTransitioning]);

const jumpToChapter = useCallback((i: number) => {
setDirection(i > currentChapter ? “forward” : “back”);
setIsTransitioning(true);
contentKey.current += 1;
setTimeout(() => {
setCurrentChapter(i);
setIsTransitioning(false);
scrollRef.current?.scrollTo({ top: 0, behavior: “smooth” });
}, 200);
}, [currentChapter]);

// ── Keyboard ──
useEffect(() => {
const handler = (e: KeyboardEvent) => {
if (e.key === “ArrowRight”) navigate(“forward”);
if (e.key === “ArrowLeft”) navigate(“back”);
if (e.key === “Escape”) setShowOverview(false);
};
window.addEventListener(“keydown”, handler);
return () => window.removeEventListener(“keydown”, handler);
}, [navigate]);

// ── Touch / swipe ──
const onTouchStart = (e: React.TouchEvent) => {
touchStartX.current = e.touches[0].clientX;
};
const onTouchEnd = (e: React.TouchEvent) => {
if (touchStartX.current === null) return;
const dx = e.changedTouches[0].clientX - touchStartX.current;
if (Math.abs(dx) > 50) navigate(dx < 0 ? “forward” : “back”);
touchStartX.current = null;
};

// ── Show swipe hint once ──
useEffect(() => {
if (!hasShownHint) setHasShownHint(true);
}, []);

// ── AI send ──
const handleAI = useCallback(() => {
if (!chapter) return;
const events = chapter.events.map((e) => e.title[lang] || e.title.en).join(”, “);
const prompt =
lang === “sv”
? `Analysera denna historiska period "${chapter.title.sv}" (${chapter.era}): ${events}. Skriv en sammanhängande, levande berättelse om denna epok som om du vore en historiker som berättar för en intresserad publik.`
: lang === “tr”
? `"${chapter.title.tr}" (${chapter.era}) tarihsel dönemini analiz edin: ${events}. Bu çağı, ilgili bir kitleye anlatan bir tarihçi gibi tutarlı, canlı bir anlatı yazın.`
: `Analyze the historical period "${chapter.title.en}" (${chapter.era}): ${events}. Write a cohesive, vivid narrative of this era as if you were a historian addressing an engaged audience.`;
send(prompt);
}, [chapter, lang, send]);

const handleFigureClick = useCallback((name: string) => {
const prompt =
lang === “sv” ? `Berätta om ${name} och dennes roll i imperiet.`
: lang === “tr” ? `${name} ve imparatorluktaki rolü hakkında bilgi ver.`
: `Tell me about ${name} and their role in the empire.`;
send(prompt);
}, [lang, send]);

const handleQuickQuestion = useCallback((q: string) => {
send(q);
}, [send]);

const resetChapterMessages = () => {
setChapterMessages((prev) => ({ …prev, [currentChapter]: [] }));
};

// ── Empty states ──
if (!timeline.length) {
return (
<AppLayout language={language} setLanguage={setLanguage}>
<div className="h-full flex items-center justify-center p-8">
<div className="text-center space-y-3 max-w-sm">
<BookOpen className="w-12 h-12 text-muted-foreground mx-auto opacity-40" />
<p className="text-muted-foreground font-sans text-sm">{l.emptyState}</p>
</div>
</div>
</AppLayout>
);
}

if (!chapter) return null;

const theme = chapter.theme;

// ─────────────────────────────────────────────
return (
<AppLayout language={language} setLanguage={setLanguage}>
<div
className="h-full flex flex-col"
onTouchStart={onTouchStart}
onTouchEnd={onTouchEnd}
>
{/* ── Top bar ── */}
<div className="flex-shrink-0 px-4 py-3 border-b border-border bg-background/60 backdrop-blur-md z-10">
<div className="max-w-3xl mx-auto">

```
        {/* Title row */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-serif text-primary/80 flex items-center gap-1.5 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            {l.title}
          </h2>

          <div className="flex items-center gap-2">
            {/* Progress ring + percent */}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ProgressRing progress={progress} size={28} />
              <span className="tabular-nums">{progress}% {l.progress}</span>
            </div>

            {/* Overview button */}
            <button
              onClick={() => setShowOverview(true)}
              className="p-1.5 rounded-lg bg-secondary/50 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all duration-200"
              title={l.overview}
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Chapter dots */}
        <div className="flex gap-1.5 items-center">
          {chapters.map((ch, i) => (
            <button
              key={i}
              onClick={() => jumpToChapter(i)}
              title={ch.title[lang] || ch.title.en}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentChapter
                  ? "gold-gradient ottoman-glow flex-[2]"
                  : i < currentChapter
                  ? "bg-primary/40 flex-1"
                  : "bg-secondary flex-1"
              }`}
            />
          ))}
        </div>

        {/* Chapter label row */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] font-sans text-muted-foreground">
            {l.chapter} {currentChapter + 1} {l.of} {chapters.length}
          </span>
          <span className="text-[10px] font-sans text-muted-foreground">
            {chapter.title[lang] || chapter.title.en} · {chapter.era}
          </span>
        </div>
      </div>
    </div>

    {/* ── Scrollable content ── */}
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning
          ? `translateX(${direction === "forward" ? "-20px" : "20px"})`
          : "translateX(0)",
        transition: "opacity 200ms ease, transform 200ms ease",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 pb-12 pt-0">

        {/* ── Chapter hero ── */}
        <div className={`relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${theme.from} ${theme.to} border border-primary/10`}>
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, ${theme.accent}33 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${theme.accent}22 0%, transparent 50%)`,
            }}
          />
          <div className="relative px-6 py-8 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: `${theme.accent}22`, border: `1px solid ${theme.accent}44`, color: theme.accent }}
            >
              {theme.icon}
            </div>
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground mb-1 block">
              {l.chapter} {currentChapter + 1}
            </span>
            <h1 className="text-3xl font-serif text-primary mb-1">
              {chapter.title[lang] || chapter.title.en}
            </h1>
            <p className="text-xs font-sans text-muted-foreground mb-4">{chapter.era}</p>
            <p className="text-sm font-sans text-foreground/70 leading-relaxed max-w-prose mx-auto">
              {chapter.description[lang] || chapter.description.en}
            </p>

            {/* Era stats */}
            <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-primary/10">
              <div className="text-center">
                <div className="text-lg font-serif text-primary">{chapter.events.length}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {lang === "sv" ? "händelser" : lang === "tr" ? "olay" : "events"}
                </div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div className="text-center">
                <div className="text-lg font-serif text-primary">
                  {[...new Set(chapter.events.flatMap((e) => e.figures))].length}
                </div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {lang === "sv" ? "figurer" : lang === "tr" ? "figür" : "figures"}
                </div>
              </div>
              {chapter.events.some((e) => e.category) && (
                <>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="text-lg font-serif text-primary">
                      {[...new Set(chapter.events.map((e) => e.category).filter(Boolean))].length}
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {lang === "sv" ? "kategorier" : lang === "tr" ? "kategori" : "categories"}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Events ── */}
        {chapter.events.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-12">{l.noEvents}</p>
        ) : (
          <div className="space-y-5">
            {chapter.events.map((event, i) => {
              const bkey = `${empireId}_${event.year}_${(event.title.en || "").slice(0, 10)}`;
              return (
                <EventCard
                  key={`${event.year}-${i}`}
                  event={event}
                  index={i}
                  isLast={i === chapter.events.length - 1}
                  lang={lang}
                  bookmarked={!!bookmarks[bkey]}
                  onBookmark={() => toggleBookmark(bkey)}
                  onFigureClick={handleFigureClick}
                  onQuickQuestion={handleQuickQuestion}
                  l={l}
                />
              );
            })}
          </div>
        )}

        {/* ── AI section ── */}
        <div className="mt-10">
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-serif text-primary flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {lang === "sv" ? "AI-analys av epoken" : lang === "tr" ? "Dönem Analizi" : "Era Analysis"}
              </h3>
              {currentMessages.length > 0 && (
                <button
                  onClick={resetChapterMessages}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />{l.resetChat}
                </button>
              )}
            </div>

            {/* AI trigger button */}
            <div className="flex justify-center mb-6">
              <button
                onClick={handleAI}
                disabled={isLoading}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl gold-gradient text-primary-foreground text-sm font-sans font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60 ottoman-glow shadow-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {l.analyzing}
                    <StreamingDots />
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    {l.aiBtn}
                  </>
                )}
              </button>
            </div>

            {/* Messages */}
            {currentMessages.length > 0 && (
              <div className="space-y-3">
                {currentMessages.map((msg, i) => (
                  <div key={i} className="animate-fade-in">
                    <ChatMessage
                      message={msg}
                      isStreaming={isLoading && i === currentMessages.length - 1}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    {l.analyzing}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Chapter navigation ── */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border gap-3">
          <button
            onClick={() => navigate("back")}
            disabled={currentChapter === 0 || isTransitioning}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border disabled:opacity-30 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            {l.prev}
          </button>

          {/* Chapter dots (center) */}
          <div className="flex gap-1">
            {chapters.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === currentChapter ? "w-5 h-2 gold-gradient" : "w-2 h-2 bg-border"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => navigate("forward")}
            disabled={currentChapter === chapters.length - 1 || isTransitioning}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-sans gold-gradient text-primary-foreground hover:opacity-90 active:scale-95 disabled:opacity-30 transition-all duration-200 ottoman-glow"
          >
            {l.next}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Keyboard hint */}
        {hasShownHint && currentChapter === 0 && (
          <p className="text-center text-[10px] text-muted-foreground/50 mt-4 font-sans">
            {l.swipeHint}
          </p>
        )}
      </div>
    </div>

    {/* ── Overview modal ── */}
    {showOverview && (
      <ChapterOverviewModal
        chapters={chapters}
        currentChapter={currentChapter}
        lang={lang}
        onSelect={jumpToChapter}
        onClose={() => setShowOverview(false)}
        l={l}
      />
    )}
  </div>
</AppLayout>
```

);
}