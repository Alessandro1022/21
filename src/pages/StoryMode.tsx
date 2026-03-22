import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/components/ChatMessage";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sword,
  Landmark,
  Coins,
  BookMarked,
  Crown,
  Globe,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Map,
  X,
  Loader2,
  RotateCcw,
  Zap,
  MessageSquare,
  ArrowRight,
  Eye,
  Trophy,
  Flame,
  Shield,
  Star,
} from "lucide-react";

// =============================================================================
// TYPES
// =============================================================================

type Lang = "sv" | "en" | "tr";

type EventCategory =
  | "war"
  | "culture"
  | "economy"
  | "religion"
  | "politics"
  | "exploration";

interface StoryEvent {
  year: number;
  title: Record<string, string>;
  summary: Record<string, string>;
  figures: string[];
  category?: EventCategory;
  importance?: "low" | "medium" | "high";
}

interface ChapterTheme {
  from: string;
  to: string;
  accent: string;
  icon: ReactNode;
  badge: string;
}

interface Chapter {
  title: Record<string, string>;
  description: Record<string, string>;
  events: StoryEvent[];
  era: string;
  theme: ChapterTheme;
  index: number;
}

interface PerChapterState {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  bookmarks: string[];
  aiAnalyzed: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const CATEGORY_META: Record<
  EventCategory,
  { icon: ReactNode; label: Record<string, string>; color: string; dot: string }
> = {
  war: {
    icon: <Sword className="w-3 h-3" />,
    label: { sv: "Krig", en: "War", tr: "Savas" },
    color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
    dot: "bg-rose-400",
  },
  culture: {
    icon: <BookMarked className="w-3 h-3" />,
    label: { sv: "Kultur", en: "Culture", tr: "Kultur" },
    color: "text-violet-400 bg-violet-400/10 border-violet-400/20",
    dot: "bg-violet-400",
  },
  economy: {
    icon: <Coins className="w-3 h-3" />,
    label: { sv: "Ekonomi", en: "Economy", tr: "Ekonomi" },
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    dot: "bg-emerald-400",
  },
  religion: {
    icon: <Landmark className="w-3 h-3" />,
    label: { sv: "Religion", en: "Religion", tr: "Din" },
    color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
  },
  politics: {
    icon: <Crown className="w-3 h-3" />,
    label: { sv: "Politik", en: "Politics", tr: "Siyaset" },
    color: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    dot: "bg-sky-400",
  },
  exploration: {
    icon: <Globe className="w-3 h-3" />,
    label: { sv: "Utforskning", en: "Exploration", tr: "Kesif" },
    color: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    dot: "bg-teal-400",
  },
};

const CHAPTER_THEMES: ChapterTheme[] = [
  {
    from: "from-amber-950/70",
    to: "to-stone-950",
    accent: "#f59e0b",
    icon: <Crown className="w-5 h-5" />,
    badge: "from-amber-500 to-yellow-600",
  },
  {
    from: "from-sky-950/70",
    to: "to-stone-950",
    accent: "#38bdf8",
    icon: <Globe className="w-5 h-5" />,
    badge: "from-sky-500 to-blue-600",
  },
  {
    from: "from-yellow-950/70",
    to: "to-stone-950",
    accent: "#fbbf24",
    icon: <Star className="w-5 h-5" />,
    badge: "from-yellow-400 to-amber-500",
  },
  {
    from: "from-rose-950/70",
    to: "to-stone-950",
    accent: "#f43f5e",
    icon: <Flame className="w-5 h-5" />,
    badge: "from-rose-500 to-red-600",
  },
  {
    from: "from-violet-950/70",
    to: "to-stone-950",
    accent: "#a78bfa",
    icon: <Shield className="w-5 h-5" />,
    badge: "from-violet-500 to-purple-600",
  },
  {
    from: "from-emerald-950/70",
    to: "to-stone-950",
    accent: "#34d399",
    icon: <Trophy className="w-5 h-5" />,
    badge: "from-emerald-500 to-green-600",
  },
];

const CHAPTER_TITLES: Record<number, Record<string, string>> = {
  0: { sv: "Uppkomsten", en: "The Rise", tr: "Yukselis" },
  1: { sv: "Expansion", en: "Expansion", tr: "Genisleme" },
  2: { sv: "Guldaaldern", en: "The Golden Age", tr: "Altin Cag" },
  3: { sv: "Utmaningar", en: "Challenges", tr: "Zorluklar" },
  4: { sv: "Omvandling", en: "Transformation", tr: "Donusum" },
  5: { sv: "Arvet", en: "The Legacy", tr: "Miras" },
};

const CHAPTER_DESCRIPTIONS: Record<number, Record<string, string>> = {
  0: {
    sv: "Ur historiens dimma trader ett imperium fram. Grundarna satter sina avtryck och lagger grunden for vad som ska bli en av historiens maktigaste makter. De forsta stegen ar osäkra - men avgörande.",
    en: "From the mists of history, an empire emerges. Founders leave their mark and lay the foundation for what will become one of history's most powerful forces. The first steps are uncertain - but decisive.",
    tr: "Tarihin sisinden bir imparatorluk dogar. Kurucular izlerini birakir ve tarihin en guclu guclerinden birinin temellerini atar. Ilk adimlar belirsiz ama belirleyicidir.",
  },
  1: {
    sv: "Imperiet stracker sina granser bortom horisonten. Armeer marscherar, handelsvagar oppnas och nya folk inlemmas under kejsarens baner. Varje erövring forandrar imperiet lika mycket som det erovrade landet.",
    en: "The empire stretches its borders beyond the horizon. Armies march, trade routes open, and new peoples are brought under the emperor's banner. Every conquest changes the empire as much as the conquered land.",
    tr: "Imparatorluk sinirlarini ufkun otesine uzatiyor. Ordular yurur, ticaret yollari acilir ve yeni halklar imparatorun bayragi altina girer. Her fetih, imparatorlugu fethedilen toprak kadar degistirir.",
  },
  2: {
    sv: "Imperiet nar sin zenit. Konst, vetenskap och valstand blomstrar i en era som kommer att drommas om i tusental ar. De stora verken skapas. De stora tankarna tänks. Detta ar den era som eftervarlden minns och sorjer.",
    en: "The empire reaches its zenith. Art, science and prosperity flourish in an era that will be dreamed of for thousands of years. The great works are created. The great thoughts are thought. This is the era posterity remembers and mourns.",
    tr: "Imparatorluk zirvesine ulasir. Sanat, bilim ve refah, binlerce yil boyunca ozlemle anilacak bir cagda cicek acar. Buyuk eserler yaratilir. Buyuk dusunceler dusunulur. Bu, sonraki nesillerin hatirladigi ve ozlem duydugu cagdir.",
  },
  3: {
    sv: "Stormen nalkas. Inre konflikter, yttre hot och ekonomiska pafrestningar satter imperiet pa harda prov. Gamla allianser spricker. Nya fiender uppstar. Inte alla kommer att overleva det som komma skall.",
    en: "The storm approaches. Internal conflicts, external threats and economic strain put the empire to the test. Old alliances fracture. New enemies arise. Not all will survive what is to come.",
    tr: "Firtina yaklasir. Ic catismalar, dis tehditler ve ekonomik baskilar imparatorlugu agir sinavlardan gecirir. Eski ittifaklar catlıyor. Yeni dusmanlar ortaya cikiyor. Geleceklerden herkes saglam cikmayacak.",
  },
  4: {
    sv: "Imperiet forandras i grunden. Gamla strukturer bryts ned och nya formas i kaosens eld. Vissa kallar det forfall - andra ser fron till aterfodelse i ruinerna. Historien har inte sagt sitt sista ord annu.",
    en: "The empire transforms at its core. Old structures break down and new ones form in the fires of chaos. Some call it decline - others see seeds of rebirth in the ruins. History has not said its last word yet.",
    tr: "Imparatorluk ozunde donusur. Eski yapilar cokuyor ve kaosun ateside yenileri sekilleniyor. Bazilari buna cokus der - digerleri harabalerde yeniden dogusin tohumlarini goriyor. Tarih henuz son sozunu soylememistir.",
  },
  5: {
    sv: "Imperiet ar borta - men dess ande lever vidare. Lagar, sprak, konst och ideer fortsatter att forma varlden lange efter att de sista murarna foll. Det verkliga imperiet var aldrig stenar och jord - det var en idé.",
    en: "The empire is gone - but its spirit endures. Laws, language, art and ideas continue to shape the world long after the last walls fell. The real empire was never stone and soil - it was an idea.",
    tr: "Imparatorluk gitti - ama ruhu sureguduyor. Yasalar, dil, sanat ve fikirler, son duvarlar yikildindan cok sonra da dunyayi sekillendirmeye devam ediyor. Gercek imparatorluk hicbir zaman tas ve toprak degildi - bir fikirdi.",
  },
};

const QUICK_QUESTIONS: Record<Lang, string[]> = {
  sv: [
    "Vad var de viktigaste konsekvenserna av detta?",
    "Vilka nyckelfigurer var inblandade och varfor?",
    "Hur paverkade detta imperiet langsiktigt?",
    "Vad hande direkt efter detta?",
    "Hur upplevde vanliga manniskor detta?",
  ],
  en: [
    "What were the most important consequences of this?",
    "Which key figures were involved and why?",
    "How did this affect the empire long-term?",
    "What happened immediately after this?",
    "How did ordinary people experience this?",
  ],
  tr: [
    "Bunun en onemli sonuclari nelerdi?",
    "Hangi kilit figurler dahil oldu ve neden?",
    "Bu, imparatorlugu uzun vadede nasil etkiledi?",
    "Bundan hemen sonra ne oldu?",
    "Sıradan insanlar bunu nasil yasadi?",
  ],
};

const FIGURE_QUESTIONS: Record<Lang, (name: string) => string> = {
  sv: (name) => "Berätta om " + name + " - vem var de, vad uppnadde de och vilket arv lamnade de efter sig?",
  en: (name) => "Tell me about " + name + " - who were they, what did they achieve, and what legacy did they leave behind?",
  tr: (name) => name + " hakkinda anlat - kim olduklarini, ne basardiklarini ve ne tur bir miras biraktiklari.",
};

const L: Record<Lang, {
  title: string; chapter: string; of: string; prev: string; next: string;
  aiBtn: string; readMore: string; readLess: string; bookmark: string;
  bookmarked: string; overview: string; close: string; analyzing: string;
  resetChat: string; progress: string; noEvents: string; emptyState: string;
  swipeHint: string; askAbout: string; figures: string; events: string;
  categories: string; eraAnalysis: string; quickQ: string; jumpTo: string;
  analyzed: string; notAnalyzed: string; chapterComplete: string;
}> = {
  sv: {
    title: "Guidad Kejserlig Resa",
    chapter: "Kapitel", of: "av", prev: "Foregaende", next: "Nasta",
    aiBtn: "AI-analys av epoken", readMore: "Las mer", readLess: "Las mindre",
    bookmark: "Bokmarke", bookmarked: "Bokmarkt",
    overview: "Kapiteloversikt", close: "Stang",
    analyzing: "Analyserar epoken...",
    resetChat: "Rensa svar", progress: "utforskat",
    noEvents: "Inga handelser att visa for detta kapitel annu.",
    emptyState: "Det finns ingen tidslinje for detta imperium annu.",
    swipeHint: "Svep vänster/höger eller tryck piltangenter for att bladda",
    askAbout: "Fraga om denna handelse",
    figures: "figurer", events: "handelser", categories: "kategorier",
    eraAnalysis: "AI-analys av epoken",
    quickQ: "Snabbfragor",
    jumpTo: "Hoppa till",
    analyzed: "Analyserad",
    notAnalyzed: "Ej analyserad",
    chapterComplete: "Kapitel genomfört",
  },
  en: {
    title: "Guided Imperial Journey",
    chapter: "Chapter", of: "of", prev: "Previous", next: "Next",
    aiBtn: "AI Analysis of Era", readMore: "Read more", readLess: "Read less",
    bookmark: "Bookmark", bookmarked: "Bookmarked",
    overview: "Chapter Overview", close: "Close",
    analyzing: "Analyzing the era...",
    resetChat: "Clear answers", progress: "explored",
    noEvents: "No events to show for this chapter yet.",
    emptyState: "There is no timeline for this empire yet.",
    swipeHint: "Swipe left/right or use arrow keys to navigate",
    askAbout: "Ask about this event",
    figures: "figures", events: "events", categories: "categories",
    eraAnalysis: "Era Analysis",
    quickQ: "Quick Questions",
    jumpTo: "Jump to",
    analyzed: "Analyzed",
    notAnalyzed: "Not analyzed",
    chapterComplete: "Chapter complete",
  },
  tr: {
    title: "Rehberli Imparatorluk Yolculugu",
    chapter: "Bolum", of: "/", prev: "Onceki", next: "Sonraki",
    aiBtn: "Donem AI Analizi", readMore: "Devamini oku", readLess: "Daha az goster",
    bookmark: "Yer imi", bookmarked: "Yer imi eklendi",
    overview: "Bolum Genel Bakisi", close: "Kapat",
    analyzing: "Cag analiz ediliyor...",
    resetChat: "Yanitlari temizle", progress: "kesfedildi",
    noEvents: "Bu bolum icin henuz gosterilecek olay yok.",
    emptyState: "Bu imparatorluk icin henuz zaman cizelgesi yok.",
    swipeHint: "Kaydirin veya ok tuslarini kullanin",
    askAbout: "Bu olay hakkinda sor",
    figures: "figur", events: "olay", categories: "kategori",
    eraAnalysis: "Donem Analizi",
    quickQ: "Hizli Sorular",
    jumpTo: "Atla",
    analyzed: "Analiz edildi",
    notAnalyzed: "Analiz edilmedi",
    chapterComplete: "Bolum tamamlandi",
  },
};

// =============================================================================
// UTILS
// =============================================================================

function safeGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch {}
}

function buildChapters(timeline: StoryEvent[], lang: Lang): Chapter[] {
  if (!timeline.length) return [];
  const sorted = [...timeline].sort((a, b) => a.year - b.year);
  const total = Math.min(6, sorted.length);
  const chapterSize = Math.ceil(sorted.length / total);
  return Array.from({ length: total }, (_, idx) => {
    const chunk = sorted.slice(idx * chapterSize, (idx + 1) * chapterSize);
    const first = chunk[0];
    const last = chunk[chunk.length - 1];
    return {
      index: idx,
      title: CHAPTER_TITLES[idx] || CHAPTER_TITLES[0],
      description: CHAPTER_DESCRIPTIONS[idx] || CHAPTER_DESCRIPTIONS[0],
      events: chunk,
      era: formatYear(first.year, lang) + "\u2013" + formatYear(last.year, lang),
      theme: CHAPTER_THEMES[idx] || CHAPTER_THEMES[0],
    };
  });
}

function getCategoryStats(events: StoryEvent[]): Record<string, number> {
  const stats: Record<string, number> = {};
  events.forEach((e) => {
    if (e.category) stats[e.category] = (stats[e.category] || 0) + 1;
  });
  return stats;
}

// =============================================================================
// SMALL PURE COMPONENTS
// =============================================================================

function ProgressRing({ pct, size = 32 }: { pct: number; size?: number }) {
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="currentColor" strokeWidth="2.5"
        className="text-border"
      />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="currentColor" strokeWidth="2.5"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        className="text-primary"
        style={{ transition: "stroke-dashoffset 600ms ease" }}
      />
    </svg>
  );
}

function CategoryBadge({ category, lang }: { category?: EventCategory; lang: Lang }) {
  if (!category || !CATEGORY_META[category]) return null;
  const m = CATEGORY_META[category];
  return (
    <span className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-sans font-medium " + m.color}>
      {m.icon}
      {m.label[lang] || m.label.en}
    </span>
  );
}

function StreamingDots() {
  return (
    <span className="inline-flex items-center gap-0.5 ml-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-bounce"
          style={{ animationDelay: i * 160 + "ms", animationDuration: "0.9s" }}
        />
      ))}
    </span>
  );
}

function ImportanceDot({ importance }: { importance?: string }) {
  if (!importance || importance === "low") return null;
  return (
    <span
      className={"inline-block w-2 h-2 rounded-full ml-1 " + (importance === "high" ? "bg-amber-400" : "bg-primary/40")}
      title={importance === "high" ? "High importance" : "Medium importance"}
    />
  );
}

function CategoryBreakdown({ events, lang }: { events: StoryEvent[]; lang: Lang }) {
  const stats = getCategoryStats(events);
  const entries = Object.entries(stats);
  if (!entries.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-primary/10">
      {entries.map(([cat, count]) => {
        const m = CATEGORY_META[cat as EventCategory];
        if (!m) return null;
        return (
          <span key={cat} className={"inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-sans " + m.color}>
            {m.icon}
            {m.label[lang] || m.label.en}
            <span className="opacity-60 font-normal ml-0.5">{count}</span>
          </span>
        );
      })}
    </div>
  );
}

// =============================================================================
// EVENT CARD
// =============================================================================

interface EventCardProps {
  event: StoryEvent;
  index: number;
  isLast: boolean;
  lang: Lang;
  bookmarked: boolean;
  onBookmark: () => void;
  onFigureClick: (name: string) => void;
  onQuickQuestion: (q: string) => void;
  l: typeof L.en;
}

function EventCard({
  event, index, isLast, lang, bookmarked, onBookmark, onFigureClick, onQuickQuestion, l,
}: EventCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showFigures, setShowFigures] = useState(false);

  const summary = event.summary[lang] || event.summary.en || "";
  const title = event.title[lang] || event.title.en || "";
  const TRUNC = 200;
  const isTruncatable = summary.length > TRUNC;
  const displaySummary = isTruncatable && !expanded ? summary.slice(0, TRUNC) + "..." : summary;
  const questions = QUICK_QUESTIONS[lang];
  const hasFigures = event.figures && event.figures.length > 0;

  return (
    <div
      className="relative pl-11 group"
      style={{ animation: "fadeSlideIn 400ms ease both", animationDelay: index * 70 + "ms" }}
    >
      {/* Vertical timeline line */}
      {!isLast && (
        <div className="absolute left-[14px] top-8 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, hsl(var(--primary) / 0.25), transparent)" }} />
      )}

      {/* Timeline node */}
      <div
        className={"absolute left-0 top-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 " +
          (bookmarked ? "gold-gradient ottoman-glow" : "bg-card border border-primary/30")}
      >
        {bookmarked
          ? <BookmarkCheck className="w-3.5 h-3.5 text-primary-foreground" />
          : <div className="w-2 h-2 rounded-full gold-gradient" />}
      </div>

      {/* Main card */}
      <div className="bg-card/50 backdrop-blur-md rounded-2xl ottoman-border p-5 hover:bg-card/75 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5">

        {/* Top row: year + category + bookmark */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className="text-base font-serif text-primary font-bold tabular-nums">
                {formatYear(event.year, lang)}
              </span>
              <CategoryBadge category={event.category} lang={lang} />
              <ImportanceDot importance={event.importance} />
            </div>
            <h3 className="text-sm font-serif text-foreground leading-snug font-medium">{title}</h3>
          </div>
          <button
            onClick={onBookmark}
            className={"flex-shrink-0 p-1.5 rounded-lg transition-all duration-200 " +
              (bookmarked ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5")}
            title={bookmarked ? l.bookmarked : l.bookmark}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Summary text */}
        <p className="text-sm font-sans text-foreground/70 leading-relaxed mb-3">
          {displaySummary}
        </p>

        {/* Read more/less */}
        {isTruncatable && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1 text-xs text-primary hover:opacity-75 transition-opacity mb-3 font-sans"
          >
            {expanded
              ? <><ChevronUp className="w-3 h-3" />{l.readLess}</>
              : <><ChevronDown className="w-3 h-3" />{l.readMore}</>}
          </button>
        )}

        {/* Divider */}
        <div className="border-t border-border/40 pt-3 space-y-2">

          {/* Figures section */}
          {hasFigures && (
            <div>
              <button
                onClick={() => setShowFigures((s) => !s)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-1.5 font-sans"
              >
                <Crown className="w-3.5 h-3.5" />
                {event.figures.length} {lang === "sv" ? "nyckelfigurer" : lang === "tr" ? "kilit figur" : "key figures"}
                <ChevronDown className={"w-3 h-3 transition-transform duration-200 " + (showFigures ? "rotate-180" : "")} />
              </button>
              {showFigures && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {event.figures.map((f) => (
                    <button
                      key={f}
                      onClick={() => onFigureClick(f)}
                      className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-sans hover:bg-primary/20 hover:scale-105 transition-all duration-200 flex items-center gap-1"
                    >
                      <Crown className="w-2.5 h-2.5" />
                      {f}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Quick questions */}
          <div>
            <button
              onClick={() => setShowQuestions((s) => !s)}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 font-sans"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {l.askAbout}
              <ChevronDown className={"w-3 h-3 transition-transform duration-200 " + (showQuestions ? "rotate-180" : "")} />
            </button>

            {showQuestions && (
              <div className="mt-2 flex flex-col gap-1.5">
                {questions.map((q) => {
                  const fullQ = q + " (" + title + ", " + formatYear(event.year, lang) + ")";
                  return (
                    <button
                      key={q}
                      onClick={() => { onQuickQuestion(fullQ); setShowQuestions(false); }}
                      className="flex items-start gap-2 px-3 py-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-border text-xs text-foreground/80 hover:text-foreground transition-all duration-200 text-left font-sans"
                    >
                      <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                      {q}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CHAPTER OVERVIEW MODAL
// =============================================================================

interface OverviewModalProps {
  chapters: Chapter[];
  current: number;
  lang: Lang;
  analyzed: Record<number, boolean>;
  bookmarkCounts: Record<number, number>;
  onSelect: (i: number) => void;
  onClose: () => void;
  l: typeof L.en;
}

function ChapterOverviewModal({
  chapters, current, lang, analyzed, bookmarkCounts, onSelect, onClose, l,
}: OverviewModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-card rounded-2xl ottoman-border shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
        style={{ animation: "fadeSlideIn 250ms ease both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-serif text-primary flex items-center gap-2">
            <Map className="w-5 h-5" />
            {l.overview}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {chapters.map((ch, i) => {
            const isCurrent = i === current;
            const isDone = i < current;
            const bCount = bookmarkCounts[i] || 0;
            const isAnalyzed = analyzed[i] || false;
            return (
              <button
                key={i}
                onClick={() => { onSelect(i); onClose(); }}
                className={"w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left " +
                  (isCurrent
                    ? "bg-primary/10 border border-primary/30"
                    : "hover:bg-secondary border border-transparent hover:border-border")}
              >
                {/* Number badge */}
                <div
                  className={"w-9 h-9 rounded-full flex items-center justify-center text-sm font-serif font-bold flex-shrink-0 bg-gradient-to-br " +
                    (isCurrent ? ch.theme.badge + " text-white shadow-md" : isDone ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground")}
                >
                  {isDone ? <Trophy className="w-4 h-4" /> : i + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-serif text-foreground truncate">
                      {ch.title[lang] || ch.title.en}
                    </span>
                    {isAnalyzed && <Zap className="w-3 h-3 text-primary flex-shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                    <span>{ch.era}</span>
                    <span className="opacity-40">|</span>
                    <span>{ch.events.length} {l.events}</span>
                    {bCount > 0 && (
                      <>
                        <span className="opacity-40">|</span>
                        <span className="flex items-center gap-0.5">
                          <Bookmark className="w-3 h-3" />{bCount}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Right indicator */}
                {isCurrent && <Eye className="w-4 h-4 text-primary flex-shrink-0" />}
                {isDone && !isCurrent && (
                  <div className="w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground font-sans">
          <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-primary" /> {l.analyzed}</span>
          <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {l.chapterComplete}</span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {lang === "sv" ? "Nu" : lang === "tr" ? "Simdi" : "Current"}</span>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// AI SECTION
// =============================================================================

interface AISectionProps {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isLoading: boolean;
  hasBeenAnalyzed: boolean;
  lang: Lang;
  l: typeof L.en;
  onAnalyze: () => void;
  onReset: () => void;
}

function AISection({ messages, isLoading, hasBeenAnalyzed, lang, l, onAnalyze, onReset }: AISectionProps) {
  return (
    <div className="mt-10 border-t border-border pt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-serif text-primary flex items-center gap-2">
          <Zap className="w-4 h-4" />
          {l.eraAnalysis}
          {hasBeenAnalyzed && (
            <span className="text-[10px] font-sans bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full">
              {l.analyzed}
            </span>
          )}
        </h3>
        {messages.length > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-sans"
          >
            <RotateCcw className="w-3 h-3" />
            {l.resetChat}
          </button>
        )}
      </div>

      {/* Trigger button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={onAnalyze}
          disabled={isLoading}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl gold-gradient text-primary-foreground text-sm font-sans font-semibold hover:opacity-90 active:scale-95 transition-all duration-200 disabled:opacity-60 ottoman-glow shadow-lg"
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

      {/* Message thread */}
      {messages.length > 0 && (
        <div className="space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{ animation: "fadeSlideIn 300ms ease both", animationDelay: i * 50 + "ms" }}
            >
              <ChatMessage
                message={msg}
                isStreaming={isLoading && i === messages.length - 1}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground pl-2 font-sans">
              <Loader2 className="w-3 h-3 animate-spin" />
              {l.analyzing}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CHAPTER HERO
// =============================================================================

function ChapterHero({
  chapter, chapterIndex, totalChapters, lang, l,
}: {
  chapter: Chapter;
  chapterIndex: number;
  totalChapters: number;
  lang: Lang;
  l: typeof L.en;
}) {
  const theme = chapter.theme;
  const uniqueFigures = [...new Set(chapter.events.flatMap((e) => e.figures))].length;
  const uniqueCategories = [...new Set(chapter.events.map((e) => e.category).filter(Boolean))].length;

  return (
    <div
      className={"relative rounded-2xl overflow-hidden mb-8 bg-gradient-to-br " + theme.from + " " + theme.to + " border border-primary/10"}
    >
      {/* Ambient glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 50%, " + theme.accent + "18 0%, transparent 55%), " +
            "radial-gradient(ellipse at 85% 50%, " + theme.accent + "0f 0%, transparent 55%)",
        }}
      />

      {/* Chapter number badge top-right */}
      <div
        className={"absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br " + theme.badge + " flex items-center justify-center text-xs font-serif font-bold text-white shadow-lg"}
      >
        {chapterIndex + 1}
      </div>

      <div className="relative px-6 py-8 text-center">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{
            backgroundColor: theme.accent + "22",
            border: "1px solid " + theme.accent + "44",
            color: theme.accent,
          }}
        >
          {theme.icon}
        </div>

        {/* Label */}
        <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-muted-foreground mb-1 block">
          {l.chapter} {chapterIndex + 1} {l.of} {totalChapters}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-serif text-primary mb-1 leading-tight">
          {chapter.title[lang] || chapter.title.en}
        </h1>

        {/* Era */}
        <p className="text-xs font-sans text-muted-foreground mb-5">{chapter.era}</p>

        {/* Description */}
        <p className="text-sm font-sans text-foreground/65 leading-relaxed max-w-prose mx-auto">
          {chapter.description[lang] || chapter.description.en}
        </p>

        {/* Stats row */}
        <div className="flex items-stretch justify-center gap-0 mt-6 pt-5 border-t border-primary/10">
          <div className="flex-1 text-center px-3">
            <div className="text-xl font-serif text-primary">{chapter.events.length}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{l.events}</div>
          </div>
          <div className="w-px bg-primary/10" />
          <div className="flex-1 text-center px-3">
            <div className="text-xl font-serif text-primary">{uniqueFigures}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{l.figures}</div>
          </div>
          {uniqueCategories > 0 && (
            <>
              <div className="w-px bg-primary/10" />
              <div className="flex-1 text-center px-3">
                <div className="text-xl font-serif text-primary">{uniqueCategories}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{l.categories}</div>
              </div>
            </>
          )}
        </div>

        {/* Category breakdown pills */}
        <CategoryBreakdown events={chapter.events} lang={lang} />
      </div>
    </div>
  );
}

// =============================================================================
// TOP NAVIGATION BAR
// =============================================================================

function TopBar({
  chapters, current, lang, progress, l, onDotClick, onOpenOverview,
}: {
  chapters: Chapter[];
  current: number;
  lang: Lang;
  progress: number;
  l: typeof L.en;
  onDotClick: (i: number) => void;
  onOpenOverview: () => void;
}) {
  const chapter = chapters[current];
  return (
    <div className="flex-shrink-0 px-4 py-3 border-b border-border bg-background/60 backdrop-blur-md z-10">
      <div className="max-w-3xl mx-auto">
        {/* Row 1: title + ring + map button */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-serif text-primary/75 flex items-center gap-1.5 uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" />
            {l.title}
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-sans">
              <ProgressRing pct={progress} size={26} />
              <span className="tabular-nums">{progress}%</span>
            </div>
            <button
              onClick={onOpenOverview}
              className="p-1.5 rounded-lg bg-secondary/60 hover:bg-secondary border border-border text-muted-foreground hover:text-foreground transition-all duration-200"
              title={l.overview}
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Row 2: chapter progress bar */}
        <div className="flex gap-1.5 items-center">
          {chapters.map((ch, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              title={(ch.title[lang] || ch.title.en) + " - " + ch.era}
              className={"h-1.5 rounded-full transition-all duration-500 " + (
                i === current
                  ? "gold-gradient ottoman-glow flex-[2.5]"
                  : i < current
                  ? "bg-primary/40 flex-1 hover:bg-primary/60"
                  : "bg-secondary flex-1 hover:bg-secondary/80"
              )}
            />
          ))}
        </div>

        {/* Row 3: chapter info */}
        {chapter && (
          <div className="flex items-center justify-between mt-1.5">
            <span className="text-[10px] font-sans text-muted-foreground">
              {l.chapter} {current + 1} {l.of} {chapters.length}
            </span>
            <span className="text-[10px] font-sans text-muted-foreground truncate max-w-[55%] text-right">
              {chapter.title[lang] || chapter.title.en}
              {" \u00b7 "}
              {chapter.era}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// BOTTOM NAVIGATION
// =============================================================================

function BottomNav({
  current, total, isTransitioning, l, onPrev, onNext,
}: {
  current: number; total: number; isTransitioning: boolean;
  l: typeof L.en; onPrev: () => void; onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-10 pt-6 border-t border-border gap-3">
      <button
        onClick={onPrev}
        disabled={current === 0 || isTransitioning}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-sans text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent hover:border-border disabled:opacity-25 transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4" />
        {l.prev}
      </button>

      {/* Dot indicators */}
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={"rounded-full transition-all duration-300 " + (
              i === current ? "w-5 h-2 gold-gradient" : "w-2 h-2 bg-border"
            )}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={current === total - 1 || isTransitioning}
        className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-sans gold-gradient text-primary-foreground hover:opacity-90 active:scale-95 disabled:opacity-25 transition-all duration-200 ottoman-glow"
      >
        {l.next}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function StoryMode() {
  // Hooks
  const chatHook = useChat();
  const { language, setLanguage, isLoading, send, messages: rawMessages } = chatHook;
  const { config, empireId } = useEmpire();

  const lang: Lang = (language as Lang) || "en";
  const l = L[lang] || L.en;

  // State
  const [currentChapter, setCurrentChapter] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  // Per-chapter data stored locally so switching chapters preserves AI history
  const [perChapter, setPerChapter] = useState<Record<number, PerChapterState>>({});

  // Global bookmarks keyed by empireId+year+titleslug
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Derived
  const timeline: StoryEvent[] = (config as any)?.timeline || [];
  const chapters = useMemo(() => buildChapters(timeline, lang), [timeline, lang]);
  const chapter = chapters[currentChapter];
  const totalChapters = chapters.length;
  const progress = totalChapters > 0 ? Math.round(((currentChapter + 1) / totalChapters) * 100) : 0;
  const currentState: PerChapterState = perChapter[currentChapter] || { messages: [], bookmarks: [], aiAnalyzed: false };
  const currentMessages = currentState.messages;

  // Sync rawMessages from useChat into per-chapter store whenever they change
  useEffect(() => {
    if (!rawMessages || rawMessages.length === 0) return;
    setPerChapter((prev) => {
      const existing = prev[currentChapter] || { messages: [], bookmarks: [], aiAnalyzed: false };
      return {
        ...prev,
        [currentChapter]: {
          ...existing,
          messages: rawMessages as Array<{ role: "user" | "assistant"; content: string }>,
          aiAnalyzed: true,
        },
      };
    });
  }, [rawMessages, currentChapter]);

  // Restore chapter position from localStorage
  useEffect(() => {
    if (!empireId || !totalChapters) return;
    const saved = safeGet("story_ch_" + empireId);
    if (saved !== null) {
      const n = parseInt(saved, 10);
      if (!isNaN(n) && n >= 0 && n < totalChapters) {
        setCurrentChapter(n);
      }
    }
  }, [empireId, totalChapters]);

  // Restore bookmarks
  useEffect(() => {
    if (!empireId) return;
    try {
      const raw = safeGet("story_bm_" + empireId);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch {}
  }, [empireId]);

  // Persist chapter position
  const persistChapter = useCallback((n: number) => {
    if (empireId) safeSet("story_ch_" + empireId, String(n));
  }, [empireId]);

  // Toggle bookmark
  const toggleBookmark = useCallback((key: string) => {
    setBookmarks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (empireId) safeSet("story_bm_" + empireId, JSON.stringify(next));
      return next;
    });
  }, [empireId]);

  // Bookmark key generator
  const bKey = useCallback((event: StoryEvent) => {
    return (empireId || "x") + "_" + event.year + "_" + (event.title.en || "").slice(0, 12).replace(/\s/g, "_");
  }, [empireId]);

  // Bookmark counts per chapter (for overview modal)
  const bookmarkCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    chapters.forEach((ch, idx) => {
      counts[idx] = ch.events.filter((e) => bookmarks[bKey(e)]).length;
    });
    return counts;
  }, [chapters, bookmarks, bKey]);

  // Which chapters have been AI-analyzed
  const analyzedMap = useMemo(() => {
    const m: Record<number, boolean> = {};
    Object.entries(perChapter).forEach(([k, v]) => {
      m[Number(k)] = v.aiAnalyzed;
    });
    return m;
  }, [perChapter]);

  // Navigation helper
  const doNavigate = useCallback((next: number, dir: "forward" | "back") => {
    if (next < 0 || next >= totalChapters || isTransitioning) return;
    setDirection(dir);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentChapter(next);
      persistChapter(next);
      setIsTransitioning(false);
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 220);
  }, [totalChapters, isTransitioning, persistChapter]);

  const navigatePrev = useCallback(() => doNavigate(currentChapter - 1, "back"), [currentChapter, doNavigate]);
  const navigateNext = useCallback(() => doNavigate(currentChapter + 1, "forward"), [currentChapter, doNavigate]);
  const jumpToChapter = useCallback((i: number) => {
    doNavigate(i, i >= currentChapter ? "forward" : "back");
  }, [currentChapter, doNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") navigateNext();
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") navigatePrev();
      else if (e.key === "Escape") setShowOverview(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [navigateNext, navigatePrev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 55) {
      if (dx < 0) navigateNext();
      else navigatePrev();
    }
    touchStartX.current = null;
  };

  // AI analysis
  const handleAI = useCallback(() => {
    if (!chapter || isLoading) return;
    const eventsList = chapter.events.map((e) => e.title[lang] || e.title.en).join(", ");
    const prompt =
      lang === "sv"
        ? "Analysera den historiska perioden \"" + (chapter.title.sv || chapter.title.en) + "\" (" + chapter.era + "): " + eventsList + ". Skriv en sammanhangande, levande berattelse om denna epok som om du vore en historiker som talar for en intresserad publik. Inkludera orsaker, konsekvenser och manskliga dimensioner."
        : lang === "tr"
        ? "\"" + (chapter.title.tr || chapter.title.en) + "\" (" + chapter.era + ") tarihsel donemini analiz edin: " + eventsList + ". Bu cagi, ilgili bir kitleye anlatan bir tarihci gibi tutarli, canli bir anlati yazin. Nedenleri, sonuclari ve insani boyutlari ekleyin."
        : "Analyze the historical period \"" + chapter.title.en + "\" (" + chapter.era + "): " + eventsList + ". Write a cohesive, vivid narrative of this era as if you were a historian addressing an engaged audience. Include causes, consequences, and human dimensions.";
    send(prompt);
  }, [chapter, lang, isLoading, send]);

  const handleFigureClick = useCallback((name: string) => {
    if (isLoading) return;
    send(FIGURE_QUESTIONS[lang](name));
  }, [lang, isLoading, send]);

  const handleQuickQuestion = useCallback((q: string) => {
    if (isLoading) return;
    send(q);
  }, [isLoading, send]);

  const resetChapterMessages = useCallback(() => {
    setPerChapter((prev) => ({
      ...prev,
      [currentChapter]: { messages: [], bookmarks: [], aiAnalyzed: false },
    }));
  }, [currentChapter]);

  // ==========================================================================
  // RENDER - EMPTY STATE
  // ==========================================================================

  if (!timeline.length) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full flex items-center justify-center p-8">
          <div className="text-center space-y-4 max-w-sm">
            <div className="w-16 h-16 rounded-full bg-secondary/60 flex items-center justify-center mx-auto">
              <BookOpen className="w-8 h-8 text-muted-foreground opacity-50" />
            </div>
            <p className="text-muted-foreground font-sans text-sm leading-relaxed">{l.emptyState}</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!chapter) return null;

  // ==========================================================================
  // RENDER - MAIN
  // ==========================================================================

  const transitionStyle = {
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning
      ? "translateX(" + (direction === "forward" ? "-24px" : "24px") + ")"
      : "translateX(0px)",
    transition: "opacity 220ms ease, transform 220ms ease",
  };

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="h-full flex flex-col select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* ── TOP BAR ── */}
        <TopBar
          chapters={chapters}
          current={currentChapter}
          lang={lang}
          progress={progress}
          l={l}
          onDotClick={jumpToChapter}
          onOpenOverview={() => setShowOverview(true)}
        />

        {/* ── SCROLLABLE BODY ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto" style={transitionStyle}>
          <div className="max-w-3xl mx-auto px-4 pb-16 pt-2">

            {/* Chapter hero card */}
            <ChapterHero
              chapter={chapter}
              chapterIndex={currentChapter}
              totalChapters={totalChapters}
              lang={lang}
              l={l}
            />

            {/* Events list */}
            {chapter.events.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-16 font-sans">{l.noEvents}</p>
            ) : (
              <div className="space-y-5">
                {chapter.events.map((event, i) => (
                  <EventCard
                    key={event.year + "-" + i}
                    event={event}
                    index={i}
                    isLast={i === chapter.events.length - 1}
                    lang={lang}
                    bookmarked={!!bookmarks[bKey(event)]}
                    onBookmark={() => toggleBookmark(bKey(event))}
                    onFigureClick={handleFigureClick}
                    onQuickQuestion={handleQuickQuestion}
                    l={l}
                  />
                ))}
              </div>
            )}

            {/* AI analysis section */}
            <AISection
              messages={currentMessages}
              isLoading={isLoading}
              hasBeenAnalyzed={currentState.aiAnalyzed}
              lang={lang}
              l={l}
              onAnalyze={handleAI}
              onReset={resetChapterMessages}
            />

            {/* Bottom navigation */}
            <BottomNav
              current={currentChapter}
              total={totalChapters}
              isTransitioning={isTransitioning}
              l={l}
              onPrev={navigatePrev}
              onNext={navigateNext}
            />

            {/* Swipe / keyboard hint - only on first chapter */}
            {currentChapter === 0 && (
              <p className="text-center text-[10px] text-muted-foreground/40 mt-5 font-sans">
                {l.swipeHint}
              </p>
            )}
          </div>
        </div>

        {/* ── OVERVIEW MODAL ── */}
        {showOverview && (
          <ChapterOverviewModal
            chapters={chapters}
            current={currentChapter}
            lang={lang}
            analyzed={analyzedMap}
            bookmarkCounts={bookmarkCounts}
            onSelect={jumpToChapter}
            onClose={() => setShowOverview(false)}
            l={l}
          />
        )}
      </div>
    </AppLayout>
  );
}
