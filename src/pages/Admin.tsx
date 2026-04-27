import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { grantAllBadgesToAdmin } from "@/services/badgeService";

import {
  Trash2, Shield, Users, TrendingUp, Search, RefreshCw, Crown,
  Activity, BarChart2, Trophy, Zap, Share2, Settings, Bell,
  Eye, EyeOff, AlertTriangle, ChevronUp, ChevronDown, Download,
  X, Copy, Ban, Star, Calendar, Filter,
  MoreHorizontal, Wifi, Plus, Languages, Loader2, BookOpen,
  ChevronLeft, ChevronRight, Globe, MessageSquare, PenLine,
  Send, Hash, Check, Info, Clock, UserCheck, UserX,
  BarChart, Layers, Sparkles, Target, Award, Lock, Unlock,
  CheckCircle, XCircle, AlertCircle, Flame, Package, ArrowUp,
  ArrowDown, Minus, Swords, Map, BookMarked, Video, Image,
  Link, ExternalLink, RotateCcw, Save, Edit3, ChevronRight as CR,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman Empire",       labelSV: "Osmanska riket",     flag: "🕌", color: "#c8a96e" },
  { id: "roman",             label: "Roman Empire",         labelSV: "Romerska riket",      flag: "🏛️", color: "#cc4444" },
  { id: "islamic_caliphate", label: "Islamic Caliphate",    labelSV: "Islamiska kalifatet",  flag: "☪️", color: "#2e8b57" },
  { id: "mongol_empire",     label: "Mongol Empire",        labelSV: "Mongoliska riket",     flag: "⚔️", color: "#8b6914" },
  { id: "ancient_egypt",     label: "Ancient Egypt",        labelSV: "Forntida Egypten",     flag: "𓂀", color: "#d4a017" },
  { id: "british_empire",    label: "British Empire",       labelSV: "Brittiska imperiet",   flag: "👑", color: "#4169e1" },
  { id: "japanese_empire",   label: "Japanese Empire",      labelSV: "Japanska imperiet",    flag: "⛩️", color: "#dc143c" },
  { id: "mali_empire",       label: "Mali Empire",          labelSV: "Mali-riket",           flag: "🌍", color: "#228b22" },
  { id: "seljuk_empire",     label: "Seljuk Empire",        labelSV: "Seljukiska riket",     flag: "🗡️", color: "#8b4513" },
];

const QUIZ_PAGE_SIZE = 10;
const MONTHLY_PRICE = 78;
const DEFAULT_DISCOUNT = 10;
const avatarColors = [
  "#7F77DD","#1D9E75","#D85A30","#378ADD",
  "#D4537E","#BA7517","#639922","#534AB7",
  "#2D9CDB","#F2994A","#27AE60","#9B51E0",
];

type Tab =
  | "users" | "stats" | "leaderboard" | "quiz"
  | "content" | "notifications" | "influencers"
  | "moderation" | "logs" | "settings";

type SortField = "display_name" | "email" | "role" | "created_at" | "xp";
type SortDir = "asc" | "desc";
type LeaderboardPeriod = "alltime" | "week" | "today";
type UserFilter = "all" | "admin" | "user" | "online" | "premium" | "banned";

// ─────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at?: string;
  xp?: number;
  last_seen?: string;
  is_online?: boolean;
  questions_asked?: number;
  quiz_score?: number;
  is_banned?: boolean;
  is_premium?: boolean;
  avatar_url?: string;
}

interface Log {
  id: string;
  msg: string;
  type: "info" | "warn" | "error" | "success";
  time: string;
}

interface QuizQuestion {
  id?: string;
  empire_id: string;
  question_en: string;
  options_en: string[];
  correct_index: number;
  explanation_en: string;
  question_sv?: string;
  options_sv?: string[];
  explanation_sv?: string;
  question_tr?: string;
  options_tr?: string[];
  explanation_tr?: string;
  active?: boolean;
  translating?: boolean;
}

interface ContentItem {
  id: string;
  type: "announcement" | "tip" | "fact";
  empire_id: string;
  text_en: string;
  text_sv?: string;
  text_tr?: string;
  active: boolean;
  created_at: string;
}

interface AppNotification {
  id: string;
  title: string;
  title_sv?: string;
  title_tr?: string;
  body: string;
  body_sv?: string;
  body_tr?: string;
  image_url?: string;
  created_at: string;
  sent_count?: number;
}

interface InfluencerLink {
  id: string;
  name: string;
  code: string;
  discount_percent: number;
  uses: number;
  conversions: number;
  revenue_generated: number;
  created_at: string;
}

interface Stats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  growthPercent: number;
  activeToday: number;
  admins: number;
}

// ─────────────────────────────────────────────────────────────
// QUESTION FORM — top-level to prevent remount on keystroke
// ─────────────────────────────────────────────────────────────

function QuestionForm({
  q, onChange, onSave, onCancel, savingQ,
}: {
  q: QuizQuestion;
  onChange: (q: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
  savingQ: boolean;
}) {
  const isValid =
    q.question_en.trim() &&
    !q.options_en.some(o => !o.trim()) &&
    q.explanation_en.trim();

  const empire = ALL_EMPIRES.find(e => e.id === q.empire_id);

  return (
    <div className="bg-card border border-primary/40 rounded-2xl p-5 space-y-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
          <BookOpen className="w-4 h-4" />
          {q.id ? "Edit Question" : "New Question"}
          {empire && (
            <span className="text-base">{empire.flag}</span>
          )}
        </h3>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Empire selector */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Empire</label>
        <select
          value={q.empire_id}
          onChange={e => onChange({ ...q, empire_id: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
        >
          {ALL_EMPIRES.map(e => (
            <option key={e.id} value={e.id}>{e.flag} {e.label}</option>
          ))}
        </select>
      </div>

      {/* Question */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          Question (English) <span className="text-red-500">*</span>
        </label>
        <textarea
          value={q.question_en}
          onChange={e => onChange({ ...q, question_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-24"
          placeholder="Write the question in English..."
        />
      </div>

      {/* Options */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block font-medium">
          Answer Options — select the correct one with the radio button
        </label>
        {q.options_en.map((opt, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all ${
              q.correct_index === i
                ? "border-green-500/50 bg-green-500/8"
                : "border-border bg-secondary/50"
            }`}
          >
            <input
              type="radio"
              name={`correct-${q.id || "new"}`}
              checked={q.correct_index === i}
              onChange={() => onChange({ ...q, correct_index: i })}
              className="accent-green-500 w-4 h-4 flex-shrink-0"
            />
            <span className="text-xs font-mono text-muted-foreground w-5">
              {String.fromCharCode(65 + i)}.
            </span>
            <input
              value={opt}
              onChange={e => {
                const opts = [...q.options_en];
                opts[i] = e.target.value;
                onChange({ ...q, options_en: opts });
              }}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
              placeholder={`Option ${String.fromCharCode(65 + i)}`}
            />
            {q.correct_index === i && (
              <span className="text-xs text-green-500 font-medium flex-shrink-0 flex items-center gap-1">
                <Check className="w-3 h-3" /> correct
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
          Explanation (English) <span className="text-red-500">*</span>
        </label>
        <textarea
          value={q.explanation_en}
          onChange={e => onChange({ ...q, explanation_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-16"
          placeholder="Brief explanation of the correct answer..."
        />
      </div>

      {/* Existing translations preview */}
      {(q.question_sv || q.question_tr) && (
        <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl space-y-1.5">
          <p className="text-xs font-medium text-blue-500 flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5" /> Existing translations
          </p>
          {q.question_sv && (
            <p className="text-xs text-muted-foreground">
              🇸🇪 <span className="text-foreground/70">{q.question_sv.slice(0, 80)}...</span>
            </p>
          )}
          {q.question_tr && (
            <p className="text-xs text-muted-foreground">
              🇹🇷 <span className="text-foreground/70">{q.question_tr.slice(0, 80)}...</span>
            </p>
          )}
        </div>
      )}

      {/* AI note */}
      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/15 rounded-xl">
        <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Auto-translation:</strong> Swedish and Turkish are
          generated by AI automatically when saving.
        </p>
      </div>

      <button
        onClick={onSave}
        disabled={savingQ || !isValid}
        className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
      >
        {savingQ ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Translating & saving...
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            {q.id ? "Save Changes" : "Add Question"}
          </>
        )}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN ADMIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Admin() {
  const { user, isAdmin } = useAuth();

  // ── Core state ────────────────────────────────────────────
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<UserFilter>("all");
  const [tab, setTab] = useState<Tab>("users");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);
  const [stats, setStats] = useState<Stats>({
    total: 0, today: 0, thisWeek: 0, thisMonth: 0,
    growthPercent: 0, activeToday: 0, admins: 0,
  });
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>("alltime");
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const realtimeRef = useRef<any>(null);

  // ── Quiz state ────────────────────────────────────────────
  const [quizEmpire, setQuizEmpire] = useState("ottoman");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [allQuizCount, setAllQuizCount] = useState<Record<string, number>>({});
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizPage, setQuizPage] = useState(0);
  const [editingQ, setEditingQ] = useState<QuizQuestion | null>(null);
  const [savingQ, setSavingQ] = useState(false);
  const [addingQ, setAddingQ] = useState(false);
  const [translatingAll, setTranslatingAll] = useState(false);
  const [quizSearch, setQuizSearch] = useState("");
  const [quizFilter, setQuizFilter] = useState<"all" | "translated" | "missing">("all");
  const [newQ, setNewQ] = useState<QuizQuestion>({
    empire_id: "ottoman",
    question_en: "",
    options_en: ["", "", "", ""],
    correct_index: 0,
    explanation_en: "",
  });

  // ── Content state ─────────────────────────────────────────
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [newContent, setNewContent] = useState({
    type: "announcement" as "announcement" | "tip" | "fact",
    empire_id: "ottoman",
    text_en: "",
  });
  const [addingContent, setAddingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);

  // ── Notification state ────────────────────────────────────
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [newNotif, setNewNotif] = useState({ title: "", body: "", image_url: "" });
  const [sendingNotif, setSendingNotif] = useState(false);
  const [translatingNotif, setTranslatingNotif] = useState(false);

  // ── Influencer state ──────────────────────────────────────
  const [influencers, setInfluencers] = useState<InfluencerLink[]>([]);
  const [loadingInfluencers, setLoadingInfluencers] = useState(false);
  const [newInfluencer, setNewInfluencer] = useState({
    name: "", code: "", discount_percent: DEFAULT_DISCOUNT,
  });
  const [addingInfluencer, setAddingInfluencer] = useState(false);
  const [savingInfluencer, setSavingInfluencer] = useState(false);

  // ── HELPERS ───────────────────────────────────────────────
  const showToast = useCallback((
    msg: string,
    type: "success" | "error" | "info" = "success",
  ) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const addLog = useCallback((msg: string, type: Log["type"] = "info") => {
    const time = new Date().toLocaleTimeString("sv-SE");
    const id = Math.random().toString(36).slice(2);
    setLogs(prev => [{ id, msg, type, time }, ...prev].slice(0, 100));
  }, []);

  const animateCounter = (target: number) => {
    let cur = 0;
    const step = Math.ceil(target / 40);
    const iv = setInterval(() => {
      cur = Math.min(cur + step, target);
      setAnimatedTotal(cur);
      if (cur >= target) clearInterval(iv);
    }, 25);
  };

  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const empireLabel = (id: string) => ALL_EMPIRES.find(e => e.id === id)?.label || id;
  const empireFlag = (id: string) => ALL_EMPIRES.find(e => e.id === id)?.flag || "🏛️";
  const empireColor = (id: string) => ALL_EMPIRES.find(e => e.id === id)?.color || "#c8a96e";

  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString("sv-SE") : "—";

  const formatRelative = (d?: string) => {
    if (!d) return "Never";
    const diff = Date.now() - new Date(d).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  // ── AVATAR ────────────────────────────────────────────────
  const Avatar = ({
    user, size = "md", ci = 0,
  }: {
    user: UserProfile; size?: "sm" | "md" | "lg" | "xl"; ci?: number;
  }) => {
    const sz = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-sm",
      xl: "w-16 h-16 text-base",
    }[size];
    return (
      <div
        className={`${sz} rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-semibold text-white`}
        style={{
          background: user.avatar_url
            ? undefined
            : avatarColors[ci % avatarColors.length],
        }}
      >
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.display_name}
            className="w-full h-full object-cover"
          />
        ) : (
          initials(user.display_name)
        )}
      </div>
    );
  };

  // ── FETCH USERS ───────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const [
        { data: profiles },
        { data: roles },
        { data: progress },
        { data: quizResults },
      ] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("user_roles").select("user_id, role"),
        supabase.from("user_progress").select("user_id, xp"),
        supabase.from("quiz_results").select("user_id, score, total_questions"),
      ]);

      if (!profiles) { setLoading(false); return; }

      const now = Date.now();
      const day = 86400000;

      const xpMap: Record<string, number> = {};
      (progress || []).forEach((p: any) => { xpMap[p.user_id] = p.xp ?? 0; });

      const quizMap: Record<string, { count: number; totalScore: number; totalQ: number }> = {};
      (quizResults || []).forEach((r: any) => {
        if (!quizMap[r.user_id]) quizMap[r.user_id] = { count: 0, totalScore: 0, totalQ: 0 };
        quizMap[r.user_id].count += 1;
        quizMap[r.user_id].totalScore += r.score ?? 0;
        quizMap[r.user_id].totalQ += r.total_questions ?? 12;
      });

      const formatted: UserProfile[] = profiles.map((p: any) => {
        const qStats = quizMap[p.id];
        const quizPct = qStats?.totalQ > 0
          ? Math.round((qStats.totalScore / qStats.totalQ) * 100)
          : 0;
        return {
          id: p.id,
          email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Unknown",
          role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
          created_at: p.created_at,
          xp: xpMap[p.id] ?? p.xp ?? 0,
          last_seen: p.last_seen ?? null,
          is_online: p.last_seen
            ? now - new Date(p.last_seen).getTime() < 5 * 60 * 1000
            : false,
          questions_asked: qStats?.count ?? p.questions_asked ?? 0,
          quiz_score: quizPct || (p.quiz_score ?? 0),
          is_banned: p.is_banned ?? false,
          is_premium: p.is_premium ?? false,
          avatar_url: p.avatar_url ?? "",
        };
      });

      setUsers(formatted);
      animateCounter(formatted.length);

      const adminCount = formatted.filter(u => {
        const roleEntry = roles?.find((r: any) => r.user_id === u.id);
        return roleEntry?.role === "admin";
      }).length;

      setStats({
        total: formatted.length,
        today: formatted.filter(
          u => u.created_at && now - new Date(u.created_at).getTime() < day,
        ).length,
        thisWeek: formatted.filter(
          u => u.created_at && now - new Date(u.created_at).getTime() < 7 * day,
        ).length,
        thisMonth: formatted.filter(
          u => u.created_at && now - new Date(u.created_at).getTime() < 30 * day,
        ).length,
        growthPercent: 100,
        activeToday: formatted.filter(u => u.is_online).length,
        admins: adminCount,
      });
      addLog(`Loaded ${formatted.length} users`, "success");
    } catch (e: any) {
      addLog(`Error: ${e?.message}`, "error");
    }
    setLoading(false);
  }, [addLog]);

  // ── FETCH LEADERBOARD ─────────────────────────────────────
  const fetchLeaderboard = useCallback(async () => {
    const [{ data: profiles }, { data: progress }, { data: quizResults }] =
      await Promise.all([
        supabase.from("profiles").select("id, display_name, email, avatar_url"),
        supabase.from("user_progress").select("user_id, xp"),
        supabase.from("quiz_results").select("user_id, score, total_questions"),
      ]);
    if (!profiles) return;

    const xpMap: Record<string, number> = {};
    (progress || []).forEach((p: any) => { xpMap[p.user_id] = p.xp ?? 0; });

    const quizMap: Record<string, { count: number; totalScore: number; totalQ: number }> = {};
    (quizResults || []).forEach((r: any) => {
      if (!quizMap[r.user_id]) quizMap[r.user_id] = { count: 0, totalScore: 0, totalQ: 0 };
      quizMap[r.user_id].count += 1;
      quizMap[r.user_id].totalScore += r.score ?? 0;
      quizMap[r.user_id].totalQ += r.total_questions ?? 12;
    });

    const lb = profiles
      .map((p: any) => {
        const qStats = quizMap[p.id];
        return {
          id: p.id,
          email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Unknown",
          role: "user",
          xp: xpMap[p.id] ?? 0,
          questions_asked: qStats?.count ?? 0,
          quiz_score:
            qStats?.totalQ > 0
              ? Math.round((qStats.totalScore / qStats.totalQ) * 100)
              : 0,
          avatar_url: p.avatar_url ?? "",
        };
      })
      .sort((a: any, b: any) => b.xp - a.xp)
      .slice(0, 10);
    setLeaderboard(lb);
  }, []);

  // ── FETCH QUIZ COUNTS PER EMPIRE ──────────────────────────
  const fetchQuizCounts = useCallback(async () => {
    const counts: Record<string, number> = {};
    await Promise.all(
      ALL_EMPIRES.map(async e => {
        const { count } = await supabase
          .from("quiz_questions")
          .select("*", { count: "exact", head: true })
          .eq("empire_id", e.id);
        counts[e.id] = count ?? 0;
      }),
    );
    setAllQuizCount(counts);
  }, []);

  // ── LOAD QUIZ QUESTIONS ───────────────────────────────────
  const loadQuizQuestions = useCallback(async () => {
    setLoadingQuiz(true);
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("empire_id", quizEmpire)
      .order("created_at", { ascending: false });
    if (error) showToast("Failed to load questions", "error");
    else setQuizQuestions((data || []) as QuizQuestion[]);
    setLoadingQuiz(false);
  }, [quizEmpire, showToast]);

  // ── EFFECTS ───────────────────────────────────────────────
  useEffect(() => {
    if (tab === "quiz") { loadQuizQuestions(); fetchQuizCounts(); }
  }, [tab, loadQuizQuestions, fetchQuizCounts]);

  useEffect(() => { if (tab === "content") loadContent(); }, [tab]);
  useEffect(() => { if (tab === "notifications") loadNotifications(); }, [tab]);
  useEffect(() => { if (tab === "influencers") loadInfluencers(); }, [tab]);
  useEffect(() => { if (tab === "leaderboard") fetchLeaderboard(); }, [tab, fetchLeaderboard]);

  // ── INIT ──────────────────────────────────────────────────
  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchQuizCounts();
    realtimeRef.current = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        addLog("Realtime: profiles updated", "info");
        fetchUsers();
      })
      .subscribe();
    return () => {
      if (realtimeRef.current) supabase.removeChannel(realtimeRef.current);
    };
  }, [fetchUsers, fetchLeaderboard, fetchQuizCounts, addLog]);

  // ── GRANT BADGES TO ADMIN ─────────────────────────────────
  useEffect(() => {
    if (!user?.id || !isAdmin) return;
    const unlockAll = async () => {
      await grantAllBadgesToAdmin(user.id);
    };
    unlockAll();
  }, [user?.id, isAdmin]);

  // ── RELOAD QUIZ WHEN EMPIRE CHANGES ──────────────────────
  useEffect(() => {
    if (tab === "quiz") loadQuizQuestions();
  }, [quizEmpire]);

  // ── USER ACTIONS ──────────────────────────────────────────
  const deleteUser = async (id: string, email: string) => {
    const me = (await supabase.auth.getUser()).data.user?.id;
    if (id === me) { showToast("Cannot delete yourself!", "error"); return; }
    if (!confirm(`Delete ${email}? This is permanent.`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} deleted`);
    addLog(`Deleted: ${email}`, "warn");
    if (selectedUser?.id === id) setSelectedUser(null);
    fetchUsers();
  };

  const toggleBan = async (u: UserProfile) => {
    const newVal = !u.is_banned;
    await supabase.from("profiles").update({ is_banned: newVal }).eq("id", u.id);
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, is_banned: newVal } : x));
    if (selectedUser?.id === u.id)
      setSelectedUser(prev => prev ? { ...prev, is_banned: newVal } : null);
    showToast(`${u.display_name} ${newVal ? "banned" : "unbanned"}`);
    addLog(`${newVal ? "Banned" : "Unbanned"}: ${u.email}`, "warn");
  };

  const toggleAdmin = async (u: UserProfile) => {
    const newRole = u.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: u.id, role: newRole });
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: newRole } : x));
    if (selectedUser?.id === u.id)
      setSelectedUser(prev => prev ? { ...prev, role: newRole } : null);
    showToast(`${u.display_name} is now ${newRole}`);
    addLog(`Role: ${u.email} → ${newRole}`, "info");
    fetchUsers();
  };

  const togglePremium = async (u: UserProfile) => {
    const newVal = !u.is_premium;
    await supabase.from("profiles").update({ is_premium: newVal }).eq("id", u.id);
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, is_premium: newVal } : x));
    if (selectedUser?.id === u.id)
      setSelectedUser(prev => prev ? { ...prev, is_premium: newVal } : null);
    showToast(`${u.display_name} is now ${newVal ? "Premium ⭐" : "Free"}`);
    addLog(`Premium: ${u.email} → ${newVal ? "premium" : "free"}`, "info");
  };

  const copyUserData = (u: UserProfile) => {
    navigator.clipboard.writeText(JSON.stringify(u, null, 2));
    showToast("Copied to clipboard!");
  };

  const deleteBulk = async () => {
    if (!confirm(`Permanently delete ${selectedUsers.length} users?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} users deleted`);
    addLog(`Bulk deleted: ${selectedUsers.length}`, "warn");
    setSelectedUsers([]);
    fetchUsers();
  };

  const exportCSV = () => {
    const rows = [["ID", "Email", "Name", "Role", "XP", "Questions", "Premium", "Banned", "Registered"]];
    users.forEach(u =>
      rows.push([
        u.id, u.email, u.display_name, u.role,
        String(u.xp || 0), String(u.questions_asked || 0),
        String(u.is_premium), String(u.is_banned),
        u.created_at || "",
      ]),
    );
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = `empire-ai-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    addLog("CSV exported", "success");
  };

  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard
      .slice(0, 3)
      .map((u, i) => `${["🥇", "🥈", "🥉"][i]} ${u.display_name}: ${u.xp} XP`)
      .join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) await navigator.share({ title: "Empire AI Leaderboard", text });
    else { await navigator.clipboard.writeText(text); showToast("Leaderboard copied!"); }
  };

  // ── AI TRANSLATE ──────────────────────────────────────────
  const EDGE_FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-translate`;

  async function callAI(prompt: string, max_tokens = 1000): Promise<string> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(EDGE_FN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({ prompt, max_tokens }),
      });
      const data = await res.json();
      return data.text || "";
    } catch {
      return "";
    }
  }

  async function autoTranslate(text_en: string): Promise<{ sv: string; tr: string }> {
    try {
      const raw = await callAI(
        `Translate to Swedish and Turkish. Return ONLY valid JSON: {"sv":"...","tr":"..."}\n\nText: ${text_en}`,
        500,
      );
      return JSON.parse(raw.replace(/```json|```/g, "").trim());
    } catch {
      return { sv: "", tr: "" };
    }
  }

  async function autoTranslateQuestion(q: QuizQuestion): Promise<QuizQuestion> {
    try {
      const prompt = `Translate this quiz question from English to Swedish and Turkish.
Return ONLY valid JSON (no markdown, no backticks):
{"question_sv":"...","options_sv":["...","...","...","..."],"explanation_sv":"...","question_tr":"...","options_tr":["...","...","...","..."],"explanation_tr":"..."}

Question: ${q.question_en}
Options: ${JSON.stringify(q.options_en)}
Explanation: ${q.explanation_en}`;
      const raw = await callAI(prompt, 1000);
      return { ...q, ...JSON.parse(raw.replace(/```json|```/g, "").trim()) };
    } catch {
      return q;
    }
  }

  // ── SAVE QUESTION ─────────────────────────────────────────
  const saveQuestion = async (q: QuizQuestion) => {
    if (
      !q.question_en.trim() ||
      q.options_en.some(o => !o.trim()) ||
      !q.explanation_en.trim()
    ) {
      showToast("Fill in all fields", "error");
      return;
    }
    setSavingQ(true);
    try {
      const translated = await autoTranslateQuestion(q);
      const payload: any = {
        empire_id: translated.empire_id,
        question_en: translated.question_en,
        question_sv: translated.question_sv || translated.question_en,
        question_tr: translated.question_tr || translated.question_en,
        options_en: translated.options_en,
        options_sv: translated.options_sv?.length ? translated.options_sv : translated.options_en,
        options_tr: translated.options_tr?.length ? translated.options_tr : translated.options_en,
        correct_index: translated.correct_index,
        explanation_en: translated.explanation_en,
        explanation_sv: translated.explanation_sv || translated.explanation_en,
        explanation_tr: translated.explanation_tr || translated.explanation_en,
        active: true,
      };

      const { error } = q.id
        ? await supabase.from("quiz_questions").update(payload).eq("id", q.id)
        : await supabase.from("quiz_questions").insert(payload);

      if (error) throw error;

      showToast(q.id ? "Question updated & translated! ✓" : "Question added & translated! ✓");
      addLog(`${q.id ? "Updated" : "Added"}: ${q.question_en.slice(0, 50)}`, "success");

      if (!q.id) {
        setNewQ({
          empire_id: quizEmpire,
          question_en: "",
          options_en: ["", "", "", ""],
          correct_index: 0,
          explanation_en: "",
        });
        setAddingQ(false);
      }
      setEditingQ(null);
      setQuizPage(0);
      await loadQuizQuestions();
      fetchQuizCounts();
    } catch (e: any) {
      showToast(`Error: ${e?.message}`, "error");
      addLog(`Save error: ${e?.message}`, "error");
    }
    setSavingQ(false);
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm("Delete this question permanently?")) return;
    await supabase.from("quiz_questions").delete().eq("id", id);
    showToast("Question deleted");
    addLog("Question deleted", "warn");
    loadQuizQuestions();
    fetchQuizCounts();
  };

  const toggleQuestionActive = async (q: QuizQuestion) => {
    const newVal = !q.active;
    await supabase.from("quiz_questions").update({ active: newVal }).eq("id", q.id);
    setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...p, active: newVal } : p));
    showToast(newVal ? "Question activated" : "Question paused");
  };

  const translateMissing = async () => {
    const missing = quizQuestions.filter(q => !q.question_sv || !q.question_tr);
    if (!missing.length) { showToast("All questions already translated!"); return; }
    setTranslatingAll(true);
    addLog(`Translating ${missing.length} questions...`, "info");
    for (const q of missing) {
      setQuizQuestions(prev =>
        prev.map(p => p.id === q.id ? { ...p, translating: true } : p),
      );
      const translated = await autoTranslateQuestion(q);
      const { id, translating, ...payload } = translated as any;
      await supabase.from("quiz_questions").update(payload).eq("id", q.id);
      setQuizQuestions(prev =>
        prev.map(p => p.id === q.id ? { ...translated, translating: false } : p),
      );
    }
    showToast(`Translated ${missing.length} questions!`);
    addLog(`Translation done: ${missing.length}`, "success");
    setTranslatingAll(false);
    loadQuizQuestions();
  };

  const translateSingleQuestion = async (q: QuizQuestion) => {
    setQuizQuestions(prev =>
      prev.map(p => p.id === q.id ? { ...p, translating: true } : p),
    );
    const translated = await autoTranslateQuestion(q);
    const { id, translating, ...payload } = translated as any;
    await supabase.from("quiz_questions").update(payload).eq("id", q.id);
    setQuizQuestions(prev =>
      prev.map(p => p.id === q.id ? { ...translated, translating: false } : p),
    );
    showToast("Question translated!");
  };

  // ── CONTENT ───────────────────────────────────────────────
  const loadContent = async () => {
    setLoadingContent(true);
    const { data } = await supabase
      .from("content_items")
      .select("*")
      .order("created_at", { ascending: false });
    setContentItems((data || []) as ContentItem[]);
    setLoadingContent(false);
  };

  const saveContent = async () => {
    if (!newContent.text_en.trim()) return;
    setSavingContent(true);
    try {
      const t = await autoTranslate(newContent.text_en);
      await supabase.from("content_items").insert({
        ...newContent,
        text_sv: t.sv,
        text_tr: t.tr,
        active: true,
      });
      showToast("Content saved & translated!");
      addLog(`New content: ${newContent.type}`, "success");
      setNewContent({ type: "announcement", empire_id: "ottoman", text_en: "" });
      setAddingContent(false);
      loadContent();
    } catch {
      showToast("Failed to save", "error");
    }
    setSavingContent(false);
  };

  const toggleContent = async (item: ContentItem) => {
    await supabase.from("content_items").update({ active: !item.active }).eq("id", item.id);
    setContentItems(prev =>
      prev.map(c => c.id === item.id ? { ...c, active: !c.active } : c),
    );
    showToast(item.active ? "Content paused" : "Content activated");
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Delete this content?")) return;
    await supabase.from("content_items").delete().eq("id", id);
    showToast("Deleted");
    loadContent();
  };

  const retranslateContent = async (item: ContentItem) => {
    const t = await autoTranslate(item.text_en);
    await supabase.from("content_items").update({ text_sv: t.sv, text_tr: t.tr }).eq("id", item.id);
    setContentItems(prev =>
      prev.map(c => c.id === item.id ? { ...c, text_sv: t.sv, text_tr: t.tr } : c),
    );
    showToast("Re-translated!");
  };

  // ── NOTIFICATIONS ─────────────────────────────────────────
  const loadNotifications = async () => {
    setLoadingNotifs(true);
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });
    setNotifications((data || []) as AppNotification[]);
    setLoadingNotifs(false);
  };

  const sendNotification = async () => {
    if (!newNotif.title.trim() || !newNotif.body.trim()) return;
    setSendingNotif(true);
    try {
      setTranslatingNotif(true);
      const [titleT, bodyT] = await Promise.all([
        autoTranslate(newNotif.title),
        autoTranslate(newNotif.body),
      ]);
      setTranslatingNotif(false);
      await supabase.from("notifications").insert({
        title: newNotif.title,
        title_sv: titleT.sv,
        title_tr: titleT.tr,
        body: newNotif.body,
        body_sv: bodyT.sv,
        body_tr: bodyT.tr,
        image_url: newNotif.image_url.trim() || null,
        sent_count: users.length,
      });
      showToast(`Notification sent to ${users.length} users!`);
      addLog(`Notification: "${newNotif.title}" → ${users.length} users`, "success");
      setNewNotif({ title: "", body: "", image_url: "" });
      loadNotifications();
    } catch (e: any) {
      setTranslatingNotif(false);
      showToast("Failed to send", "error");
    }
    setSendingNotif(false);
  };

  const deleteNotification = async (id: string) => {
    if (!confirm("Delete this notification?")) return;
    await supabase.from("notifications").delete().eq("id", id);
    showToast("Deleted");
    loadNotifications();
  };

  // ── INFLUENCERS ───────────────────────────────────────────
  const loadInfluencers = async () => {
    setLoadingInfluencers(true);
    const { data } = await supabase
      .from("influencer_links")
      .select("*")
      .order("created_at", { ascending: false });
    setInfluencers((data || []) as InfluencerLink[]);
    setLoadingInfluencers(false);
  };

  const generateCode = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
    return `${slug}${Math.random().toString(36).slice(2, 5)}`.toUpperCase();
  };

  const saveInfluencer = async () => {
    if (!newInfluencer.name.trim()) { showToast("Enter a name", "error"); return; }
    setSavingInfluencer(true);
    try {
      const code = newInfluencer.code.trim() || generateCode(newInfluencer.name);
      const { error } = await supabase.from("influencer_links").insert({
        name: newInfluencer.name.trim(),
        code: code.toUpperCase(),
        discount_percent: newInfluencer.discount_percent,
        uses: 0,
        conversions: 0,
        revenue_generated: 0,
      });
      if (error) throw error;
      showToast(`Influencer link created: ${code.toUpperCase()}`);
      addLog(`New influencer: ${newInfluencer.name}`, "success");
      setNewInfluencer({ name: "", code: "", discount_percent: DEFAULT_DISCOUNT });
      setAddingInfluencer(false);
      loadInfluencers();
    } catch {
      showToast("Code might already exist", "error");
    }
    setSavingInfluencer(false);
  };

  const deleteInfluencer = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    await supabase.from("influencer_links").delete().eq("id", id);
    showToast(`${name} deleted`);
    loadInfluencers();
  };

  // ── DERIVED ───────────────────────────────────────────────
  const missingTranslations = quizQuestions.filter(
    q => !q.question_sv || !q.question_tr,
  ).length;

  const filteredQ = quizQuestions.filter(q => {
    const matchSearch = !quizSearch ||
      q.question_en.toLowerCase().includes(quizSearch.toLowerCase());
    const matchFilter =
      quizFilter === "all" ? true :
      quizFilter === "translated" ? (!!q.question_sv && !!q.question_tr) :
      (!q.question_sv || !q.question_tr);
    return matchSearch && matchFilter;
  });

  const pagedQ = filteredQ.slice(
    quizPage * QUIZ_PAGE_SIZE,
    (quizPage + 1) * QUIZ_PAGE_SIZE,
  );
  const totalPages = Math.ceil(filteredQ.length / QUIZ_PAGE_SIZE);
  const totalQuizQuestions = Object.values(allQuizCount).reduce((a, b) => a + b, 0);

  const filteredUsers = users
    .filter(u => {
      const matchSearch =
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.display_name?.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ? true :
        filter === "online" ? !!u.is_online :
        filter === "premium" ? !!u.is_premium :
        filter === "banned" ? !!u.is_banned :
        u.role === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const av = String((a as any)[sortField] || "");
      const bv = String((b as any)[sortField] || "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const SortBtn = ({ field }: { field: SortField }) => (
    <button
      onClick={() => {
        if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
        else { setSortField(field); setSortDir("asc"); }
      }}
      className="inline-flex flex-col ml-1 opacity-50 hover:opacity-100"
    >
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "text-primary opacity-100" : ""}`} />
      <ChevronDown className={`w-2.5 h-2.5 -mt-0.5 ${sortField === field && sortDir === "desc" ? "text-primary opacity-100" : ""}`} />
    </button>
  );

  // ── TABS CONFIG ───────────────────────────────────────────
  const TABS: { key: Tab; label: string; icon: any; badge?: number }[] = [
    { key: "users",         label: "Users",         icon: Users,       badge: users.length },
    { key: "stats",         label: "Stats",         icon: BarChart2 },
    { key: "leaderboard",   label: "Leaderboard",   icon: Trophy },
    { key: "quiz",          label: "Quiz",          icon: BookOpen,    badge: totalQuizQuestions },
    { key: "content",       label: "Content",       icon: PenLine,     badge: contentItems.length },
    { key: "notifications", label: "Notiser",       icon: Bell,        badge: notifications.length },
    { key: "influencers",   label: "Influencers",   icon: Share2,      badge: influencers.length },
    { key: "moderation",    label: "Moderation",    icon: Shield },
    { key: "logs",          label: "Logs",          icon: Activity,    badge: logs.length },
    { key: "settings",      label: "Settings",      icon: Settings },
  ];

  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pb-24">

      {/* ── TOAST ─────────────────────────────────────────── */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm shadow-2xl text-white flex items-center gap-2.5 transition-all animate-in slide-in-from-top-2 ${
            toast.type === "error"
              ? "bg-red-500"
              : toast.type === "info"
              ? "bg-blue-500"
              : "bg-green-600"
          }`}
        >
          {toast.type === "error" ? (
            <XCircle className="w-4 h-4 flex-shrink-0" />
          ) : toast.type === "info" ? (
            <Info className="w-4 h-4 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          )}
          {toast.msg}
        </div>
      )}

      {/* ── USER DETAIL DRAWER ────────────────────────────── */}
      {selectedUser && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedUser(null)}
          />
          <div className="relative w-full max-w-sm bg-card border-l border-border h-full overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-5">

              {/* Drawer header */}
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-primary text-lg">User Profile</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar + info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar user={selectedUser} size="xl" ci={0} />
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                      selectedUser.is_online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg leading-tight">{selectedUser.display_name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${selectedUser.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                      {selectedUser.is_online ? "Online" : "Offline"}
                    </span>
                    {selectedUser.is_banned && (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                        Banned
                      </span>
                    )}
                    {selectedUser.is_premium && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                        ⭐ Premium
                      </span>
                    )}
                    {selectedUser.role === "admin" && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "XP", value: selectedUser.xp || 0, color: "text-yellow-500" },
                  { label: "Questions", value: selectedUser.questions_asked || 0, color: "text-blue-500" },
                  { label: "Quiz %", value: `${selectedUser.quiz_score || 0}%`, color: "text-green-500" },
                  { label: "Role", value: selectedUser.role, color: "text-purple-500" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className={`text-xl font-serif ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Details list */}
              <div className="space-y-0 text-sm border border-border rounded-xl overflow-hidden">
                {[
                  { label: "User ID", value: selectedUser.id.slice(0, 16) + "..." },
                  { label: "Registered", value: formatDate(selectedUser.created_at) },
                  { label: "Last seen", value: formatRelative(selectedUser.last_seen) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 px-3 border-b border-border last:border-0 bg-card">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs text-right max-w-44 truncate">{value}</span>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => toggleAdmin(selectedUser)}
                  className={`w-full py-2.5 rounded-xl border text-sm transition-colors flex items-center justify-center gap-2 ${
                    selectedUser.role === "admin"
                      ? "border-purple-300 text-purple-700 hover:bg-purple-50 bg-purple-50/50"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  <Shield className="w-4 h-4 text-purple-500" />
                  {selectedUser.role === "admin" ? "Remove admin" : "Make admin"}
                </button>

                <button
                  onClick={() => togglePremium(selectedUser)}
                  className={`w-full py-2.5 rounded-xl border text-sm transition-colors flex items-center justify-center gap-2 ${
                    selectedUser.is_premium
                      ? "border-yellow-300 text-yellow-700 hover:bg-yellow-50 bg-yellow-50/50"
                      : "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                  }`}
                >
                  <Star className="w-4 h-4" />
                  {selectedUser.is_premium ? "Remove Premium" : "Grant Premium ⭐"}
                </button>

                <button
                  onClick={() => toggleBan(selectedUser)}
                  className={`w-full py-2.5 rounded-xl border text-sm transition-colors flex items-center justify-center gap-2 ${
                    selectedUser.is_banned
                      ? "border-orange-300 text-orange-700 hover:bg-orange-50 bg-orange-50/50"
                      : "border-orange-200 text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <Ban className="w-4 h-4" />
                  {selectedUser.is_banned ? "Unban user" : "Ban user"}
                </button>

                <button
                  onClick={() => copyUserData(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" /> Copy user data
                </button>

                <button
                  onClick={() => deleteUser(selectedUser.id, selectedUser.email)}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" /> Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER ────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent" />
        <div className="relative px-4 md:px-6 py-5 max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-serif text-primary flex items-center gap-2.5">
                <Crown className="w-6 h-6" /> Empire AI Admin
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Control Center · {user?.email}
              </p>

              {/* Summary counters */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {[
                  { label: "Total", value: animatedTotal, color: "text-primary" },
                  { label: "Online", value: users.filter(u => u.is_online).length, color: "text-green-500" },
                  { label: "Premium", value: users.filter(u => u.is_premium).length, color: "text-yellow-500" },
                  { label: "Admins", value: stats.admins, color: "text-purple-500" },
                  { label: "Quiz Qs", value: totalQuizQuestions, color: "text-blue-500" },
                  { label: "New today", value: stats.today, color: "text-orange-500" },
                  { label: "Banned", value: users.filter(u => u.is_banned).length, color: "text-red-500" },
                ].map(({ label, value, color }) => (
                  <div
                    key={label}
                    className="bg-card/80 backdrop-blur border border-border rounded-xl px-3 py-1.5 text-center min-w-14"
                  >
                    <div className={`text-base font-serif ${color}`}>{value}</div>
                    <div className="text-[10px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 flex-wrap items-start">
              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-xs"
              >
                <Download className="w-3.5 h-3.5" /> Export CSV
              </button>
              <button
                onClick={() => { fetchUsers(); fetchLeaderboard(); fetchQuizCounts(); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 max-w-7xl mx-auto">

        {/* ── TABS ──────────────────────────────────────────── */}
        <div className="flex gap-0 border-b border-border overflow-x-auto scrollbar-hide">
          {TABS.map(({ key, label, icon: Icon, badge }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-3 py-3 text-xs border-b-2 transition-colors -mb-px whitespace-nowrap ${
                tab === key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
              {badge !== undefined && badge > 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                    tab === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {badge > 999 ? "999+" : badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════
            USERS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "users" && (
          <div className="py-5 space-y-4">

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Total users",   value: users.length,                                    icon: Users,     color: "text-blue-500" },
                { label: "Online now",    value: users.filter(u => u.is_online).length,            icon: Wifi,      color: "text-green-500" },
                { label: "Premium",       value: users.filter(u => u.is_premium).length,           icon: Star,      color: "text-yellow-500" },
                { label: "This week",     value: stats.thisWeek,                                   icon: TrendingUp, color: "text-orange-500" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>

            {/* Search + filter row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "admin", "user", "online", "premium", "banned"] as UserFilter[]).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-2 rounded-xl text-xs border transition-colors ${
                      filter === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {f === "all"     ? "All"
                     : f === "admin"   ? "👑 Admins"
                     : f === "user"    ? "Users"
                     : f === "online"  ? "🟢 Online"
                     : f === "premium" ? "⭐ Premium"
                     : "🚫 Banned"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button
                    onClick={deleteBulk}
                    className="px-3 py-2 rounded-xl text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Delete {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>

            {/* User list */}
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-secondary rounded w-1/3" />
                        <div className="h-3 bg-secondary rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No users found</p>
                <p className="text-xs mt-1 opacity-60">Try adjusting your search or filter</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/40">
                        <th className="px-4 py-3 w-8">
                          <input
                            type="checkbox"
                            checked={
                              selectedUsers.length === filteredUsers.length &&
                              filteredUsers.length > 0
                            }
                            onChange={() =>
                              setSelectedUsers(p =>
                                p.length === filteredUsers.length
                                  ? []
                                  : filteredUsers.map(u => u.id),
                              )
                            }
                            className="w-4 h-4"
                          />
                        </th>
                        {[
                          ["display_name", "Name"],
                          ["email", "Email"],
                          ["role", "Role"],
                          ["xp", "XP"],
                          ["created_at", "Registered"],
                        ].map(([field, label]) => (
                          <th
                            key={field}
                            className="text-left px-4 py-3 font-normal text-muted-foreground text-xs"
                          >
                            <span className="flex items-center gap-1">
                              {label}
                              <SortBtn field={field as SortField} />
                            </span>
                          </th>
                        ))}
                        <th className="px-4 py-3 text-xs text-muted-foreground font-normal text-left">
                          Status
                        </th>
                        <th className="px-4 py-3 text-xs text-muted-foreground font-normal text-left">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredUsers.map((u, i) => (
                        <tr
                          key={u.id}
                          onClick={() => setSelectedUser(u)}
                          className={`transition-colors hover:bg-secondary/20 cursor-pointer ${
                            selectedUsers.includes(u.id) ? "bg-primary/5" : ""
                          } ${u.is_banned ? "opacity-40" : ""}`}
                        >
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(u.id)}
                              onChange={() =>
                                setSelectedUsers(p =>
                                  p.includes(u.id)
                                    ? p.filter(x => x !== u.id)
                                    : [...p, u.id],
                                )
                              }
                              className="w-4 h-4"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar user={u} size="sm" ci={i} />
                                <div
                                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${
                                    u.is_online ? "bg-green-500" : "bg-gray-400"
                                  }`}
                                />
                              </div>
                              <div>
                                <span className="font-medium text-sm">{u.display_name}</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                  {u.is_premium && (
                                    <span className="px-1 rounded text-[10px] bg-yellow-100 text-yellow-700">⭐</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{u.email}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                                u.role === "admin"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-secondary text-muted-foreground border border-border"
                              }`}
                            >
                              {u.role === "admin" && <Shield className="w-2.5 h-2.5" />}
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-yellow-500 font-medium text-sm tabular-nums">
                              {u.xp}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                            {formatDate(u.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1 text-[10px] flex-wrap">
                              {u.is_banned && (
                                <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700">Banned</span>
                              )}
                              {!u.is_banned && u.is_online && (
                                <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700">Online</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-0.5">
                              <button
                                onClick={() => setSelectedUser(u)}
                                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                                title="View"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleAdmin(u)}
                                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                                title="Toggle admin"
                              >
                                <Shield className="w-3.5 h-3.5 text-purple-500" />
                              </button>
                              <button
                                onClick={() => togglePremium(u)}
                                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                                title="Toggle premium"
                              >
                                <Star className="w-3.5 h-3.5 text-yellow-500" />
                              </button>
                              <button
                                onClick={() => toggleBan(u)}
                                className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"
                                title="Toggle ban"
                              >
                                <Ban className="w-3.5 h-3.5 text-orange-500" />
                              </button>
                              <button
                                onClick={() => deleteUser(u.id, u.email)}
                                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="md:hidden space-y-2">
                  {filteredUsers.map((u, i) => (
                    <div
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all ${
                        selectedUsers.includes(u.id) ? "border-primary" : "border-border"
                      } ${u.is_banned ? "opacity-50" : ""}`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(u.id)}
                          onChange={e => {
                            e.stopPropagation();
                            setSelectedUsers(p =>
                              p.includes(u.id) ? p.filter(x => x !== u.id) : [...p, u.id],
                            );
                          }}
                          onClick={e => e.stopPropagation()}
                          className="w-4 h-4"
                        />
                        <div className="relative">
                          <Avatar user={u} size="md" ci={i} />
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                              u.is_online ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{u.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              u.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {u.role}
                          </span>
                          <span className="text-xs text-yellow-500">{u.xp} XP</span>
                          {u.is_premium && (
                            <span className="text-xs text-yellow-600">⭐ Premium</span>
                          )}
                          {u.is_banned && (
                            <span className="text-xs text-red-600">🚫 Banned</span>
                          )}
                        </div>
                      </div>

                      {/* Mobile quick actions */}
                      <div
                        className="flex gap-1.5 mt-3 pt-3 border-t border-border"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => toggleAdmin(u)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${
                            u.role === "admin"
                              ? "border-purple-200 text-purple-700 bg-purple-50"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          <Shield className="w-3 h-3 inline mr-1" />
                          {u.role === "admin" ? "Demote" : "Admin"}
                        </button>
                        <button
                          onClick={() => togglePremium(u)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${
                            u.is_premium
                              ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          <Star className="w-3 h-3 inline mr-1" />
                          {u.is_premium ? "Remove" : "Premium"}
                        </button>
                        <button
                          onClick={() => toggleBan(u)}
                          className={`flex-1 py-1.5 rounded-lg border text-xs transition-colors ${
                            u.is_banned
                              ? "border-orange-200 text-orange-700 bg-orange-50"
                              : "border-border hover:bg-secondary"
                          }`}
                        >
                          <Ban className="w-3 h-3 inline mr-1" />
                          {u.is_banned ? "Unban" : "Ban"}
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.email)}
                          className="px-2.5 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  {filteredUsers.length} of {users.length} users shown
                </p>
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STATS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "stats" && (
          <div className="py-5 space-y-4">

            {/* Top metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Active now",    value: users.filter(u => u.is_online).length, icon: Activity, color: "text-green-500",  sub: "online users" },
                { label: "New today",     value: stats.today,                           icon: Calendar,  color: "text-blue-500",   sub: "registrations" },
                { label: "This week",     value: stats.thisWeek,                        icon: TrendingUp, color: "text-orange-500", sub: "new users" },
                { label: "Premium users", value: users.filter(u => u.is_premium).length, icon: Star,     color: "text-yellow-500", sub: "paid subscribers" },
              ].map(({ label, value, icon: Icon, color, sub }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-3xl font-serif">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              {/* User overview */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-500" /> User Overview
                </h3>
                {[
                  { label: "Total registered",      value: users.length },
                  { label: "Online now",             value: users.filter(u => u.is_online).length },
                  { label: "Premium users",          value: users.filter(u => u.is_premium).length },
                  { label: "Admins",                 value: stats.admins },
                  { label: "Banned users",           value: users.filter(u => u.is_banned).length },
                  { label: "New today",              value: stats.today },
                  { label: "New this week",          value: stats.thisWeek },
                  { label: "New this month",         value: stats.thisMonth },
                  { label: "Total quiz questions",   value: totalQuizQuestions },
                  { label: "Missing translations",   value: missingTranslations },
                  { label: "Average XP",             value: users.length ? Math.round(users.reduce((a, u) => a + (u.xp || 0), 0) / users.length) : 0 },
                  { label: "Total XP in system",     value: users.reduce((a, u) => a + (u.xp || 0), 0) },
                  { label: "Content items",          value: contentItems.length },
                  { label: "Notifications sent",     value: notifications.length },
                  { label: "Influencer links",       value: influencers.length },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between py-2 border-b border-border last:border-0 text-sm"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>

              {/* Quiz questions by empire */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-green-500" /> Quiz Questions per Empire
                </h3>
                <div className="space-y-3">
                  {ALL_EMPIRES.map(e => {
                    const count = allQuizCount[e.id] || 0;
                    const max = Math.max(...Object.values(allQuizCount), 1);
                    const pct = Math.round((count / max) * 100);
                    return (
                      <div key={e.id}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="flex items-center gap-1.5">
                            <span>{e.flag}</span>
                            <span className="text-muted-foreground">{e.label}</span>
                          </span>
                          <span
                            className={`font-medium tabular-nums ${
                              count === 0 ? "text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {count}
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: e.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Totals */}
                <div className="mt-5 pt-4 border-t border-border flex justify-between text-sm">
                  <span className="text-muted-foreground">Total questions</span>
                  <span className="font-serif text-primary text-lg">{totalQuizQuestions}</span>
                </div>
              </div>
            </div>

            {/* XP distribution */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> XP Distribution (Top 10 Users)
              </h3>
              <div className="space-y-2">
                {users
                  .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                  .slice(0, 10)
                  .map((u, i) => {
                    const maxXP = users[0]?.xp || 1;
                    const pct = Math.round(((u.xp || 0) / Math.max(...users.map(x => x.xp || 0), 1)) * 100);
                    return (
                      <div key={u.id} className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground w-5 tabular-nums text-right">{i + 1}</span>
                        <Avatar user={u} size="sm" ci={i} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-medium truncate">{u.display_name}</span>
                            <span className="text-xs text-yellow-500 font-medium tabular-nums ml-2">{u.xp} XP</span>
                          </div>
                          <div className="h-1 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: avatarColors[i % avatarColors.length] }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            LEADERBOARD TAB
        ══════════════════════════════════════════════════ */}
        {tab === "leaderboard" && (
          <div className="py-5 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                {(["alltime", "week", "today"] as LeaderboardPeriod[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setLeaderboardPeriod(p)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${
                      leaderboardPeriod === p
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {p === "alltime" ? "🏆 All Time" : p === "week" ? "📅 Week" : "☀️ Today"}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchLeaderboard}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border text-sm hover:bg-secondary transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Refresh
                </button>
                <button
                  onClick={shareLeaderboard}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Leaderboard card */}
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#0a0612,#1a0a08,#0a0612)",
                border: "1px solid rgba(200,169,110,0.25)",
              }}
            >
              {/* Header */}
              <div
                className="px-6 pt-5 pb-3 text-center border-b border-primary/10"
              >
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span className="font-serif text-primary text-lg">Empire AI Leaderboard</span>
                  <Crown className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs text-primary/40 mt-1">
                  {leaderboardPeriod === "alltime" ? "All-time rankings" :
                   leaderboardPeriod === "week" ? "This week's champions" : "Today's warriors"}
                </p>
              </div>

              {/* Podium top 3 */}
              {leaderboard.length >= 3 && (
                <div className="px-4 pt-6 pb-2">
                  <div className="flex items-end justify-center gap-4">
                    {[1, 0, 2].map(pos => {
                      const u = leaderboard[pos];
                      const medals = ["🥇", "🥈", "🥉"];
                      const podiumHeights = [96, 64, 48];
                      const avatarSizes = [76, 60, 56];
                      const borderColors = ["#c8a96e", "#aaaaaa", "#cd7f32"];
                      const glowColors = ["rgba(200,169,110,0.4)", "rgba(170,170,170,0.2)", "rgba(205,127,50,0.2)"];
                      return (
                        <div key={pos} className="flex flex-col items-center gap-2 flex-1">
                          <div className="relative">
                            <div
                              className="rounded-full overflow-hidden flex items-center justify-center font-bold text-white flex-shrink-0"
                              style={{
                                width: avatarSizes[pos],
                                height: avatarSizes[pos],
                                border: `${pos === 0 ? 3 : 2}px solid ${borderColors[pos]}`,
                                background: u.avatar_url ? undefined : avatarColors[pos],
                                boxShadow: `0 0 24px ${glowColors[pos]}`,
                              }}
                            >
                              {u.avatar_url ? (
                                <img src={u.avatar_url} className="w-full h-full object-cover" alt="" />
                              ) : (
                                initials(u.display_name)
                              )}
                            </div>
                            <span className="absolute -top-3 -right-2 text-2xl">
                              {medals[pos]}
                            </span>
                          </div>
                          <div className="text-center">
                            <p
                              className={`font-medium text-white truncate max-w-24 ${
                                pos === 0 ? "text-sm" : "text-xs"
                              }`}
                            >
                              {u.display_name}
                            </p>
                            <p
                              className={`font-bold tabular-nums ${pos === 0 ? "text-sm" : "text-xs"}`}
                              style={{ color: borderColors[pos] }}
                            >
                              {u.xp} XP
                            </p>
                            <p className="text-[10px] text-white/30 mt-0.5">
                              {u.quiz_score}% quiz
                            </p>
                          </div>
                          <div
                            className="w-full rounded-t-2xl flex items-end justify-center pb-2"
                            style={{
                              minHeight: podiumHeights[pos],
                              background: `linear-gradient(to top, ${borderColors[pos]}18, transparent)`,
                              border: `1px solid ${borderColors[pos]}25`,
                              borderBottom: "none",
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Ranks 4–10 */}
              <div className="px-4 pb-4 space-y-1.5">
                {leaderboard.slice(3).map((u, i) => (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-transform"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "0.5px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span className="text-sm font-serif w-5 text-center text-primary/50">
                      {i + 4}
                    </span>
                    <div
                      className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{
                        background: u.avatar_url
                          ? undefined
                          : avatarColors[(i + 3) % avatarColors.length],
                      }}
                    >
                      {u.avatar_url ? (
                        <img src={u.avatar_url} className="w-full h-full object-cover" alt="" />
                      ) : (
                        initials(u.display_name)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.display_name}</p>
                      <p className="text-[10px] text-white/30">
                        {u.questions_asked} questions · {u.quiz_score}% quiz
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Zap className="w-3 h-3" />
                      <span className="text-sm font-serif tabular-nums">{u.xp}</span>
                      <span className="text-[10px] text-primary/50">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            QUIZ TAB — ALL 9 EMPIRES
        ══════════════════════════════════════════════════ */}
        {tab === "quiz" && (
          <div className="py-5 space-y-4">

            {/* Empire grid */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-3 font-medium">
                Select Empire to manage questions
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {ALL_EMPIRES.map(e => {
                  const count = allQuizCount[e.id] || 0;
                  const isSelected = quizEmpire === e.id;
                  return (
                    <button
                      key={e.id}
                      onClick={() => {
                        setQuizEmpire(e.id);
                        setQuizPage(0);
                        setAddingQ(false);
                        setEditingQ(null);
                        setQuizSearch("");
                        setQuizFilter("all");
                      }}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/40 hover:bg-secondary"
                      }`}
                    >
                      <span className="text-2xl">{e.flag}</span>
                      <span className="text-[10px] text-center font-medium leading-tight line-clamp-2">
                        {e.label}
                      </span>
                      <span
                        className={`text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded ${
                          count === 0
                            ? "text-muted-foreground bg-secondary"
                            : isSelected
                            ? "text-primary bg-primary/20"
                            : "text-foreground bg-secondary"
                        }`}
                      >
                        {count} {count === 1 ? "q" : "qs"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action row */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium flex items-center gap-2">
                  {empireFlag(quizEmpire)} {empireLabel(quizEmpire)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {quizQuestions.length} questions
                </span>
                {missingTranslations > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-600 text-xs font-medium">
                    ⚠ {missingTranslations} missing translations
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {missingTranslations > 0 && (
                  <button
                    onClick={translateMissing}
                    disabled={translatingAll}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs hover:bg-primary/20 disabled:opacity-50 transition-colors"
                  >
                    {translatingAll ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Languages className="w-3.5 h-3.5" />
                    )}
                    Translate all missing
                  </button>
                )}
                <button
                  onClick={() => { setAddingQ(v => !v); setEditingQ(null); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {addingQ ? "Cancel" : "Add Question"}
                </button>
              </div>
            </div>

            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  value={quizSearch}
                  onChange={e => { setQuizSearch(e.target.value); setQuizPage(0); }}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "translated", "missing"] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setQuizFilter(f)}
                    className={`px-3 py-2 rounded-xl text-xs border transition-colors ${
                      quizFilter === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    {f === "all" ? "All" : f === "translated" ? "✓ Translated" : "⚠ Missing"}
                  </button>
                ))}
              </div>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 p-3.5 bg-primary/5 border border-primary/15 rounded-xl">
              <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">AI Auto-translation:</strong> Write questions in
                English — Swedish and Turkish are generated automatically when saving. Quiz picks 12
                random questions per session, max 3 plays per day per user.
              </p>
            </div>

            {/* Add question form */}
            {addingQ && (
              <QuestionForm
                q={{ ...newQ, empire_id: quizEmpire }}
                onChange={q => setNewQ(q)}
                onSave={() => saveQuestion({ ...newQ, empire_id: quizEmpire })}
                onCancel={() => setAddingQ(false)}
                savingQ={savingQ}
              />
            )}

            {/* Questions list */}
            {loadingQuiz ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filteredQ.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="font-medium text-sm">
                  {quizSearch
                    ? "No questions match your search"
                    : `No questions for ${empireLabel(quizEmpire)} yet`}
                </p>
                <p className="text-xs mt-1 opacity-60">
                  {quizSearch ? "Try a different keyword" : "Click 'Add Question' to get started"}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {pagedQ.map((q, i) => (
                    <div key={q.id || i}>
                      {editingQ?.id === q.id ? (
                        <QuestionForm
                          q={editingQ}
                          onChange={setEditingQ}
                          onSave={() => saveQuestion(editingQ)}
                          onCancel={() => setEditingQ(null)}
                          savingQ={savingQ}
                        />
                      ) : (
                        <div
                          className={`bg-card border rounded-2xl p-4 transition-all ${
                            q.translating
                              ? "opacity-60 animate-pulse border-primary/30"
                              : q.active === false
                              ? "border-border opacity-50"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">

                              {/* Question meta badges */}
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs text-muted-foreground tabular-nums">
                                  #{quizPage * QUIZ_PAGE_SIZE + i + 1}
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                  {empireFlag(q.empire_id)} {empireLabel(q.empire_id)}
                                </span>
                                {q.translating && (
                                  <span className="text-xs text-primary flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" /> translating...
                                  </span>
                                )}
                                {!q.question_sv && !q.translating && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600">
                                    missing SV/TR
                                  </span>
                                )}
                                {q.question_sv && q.question_tr && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-600">
                                    ✓ SV+TR
                                  </span>
                                )}
                                {q.active === false && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                                    ○ Paused
                                  </span>
                                )}
                              </div>

                              {/* Question text */}
                              <p className="text-sm font-medium leading-relaxed">{q.question_en}</p>

                              {/* Answer options */}
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {q.options_en.map((opt, oi) => (
                                  <span
                                    key={oi}
                                    className={`text-xs px-2 py-0.5 rounded-lg ${
                                      oi === q.correct_index
                                        ? "bg-green-500/15 text-green-600 font-medium border border-green-500/20"
                                        : "bg-secondary text-muted-foreground"
                                    }`}
                                  >
                                    {String.fromCharCode(65 + oi)}. {opt}
                                  </span>
                                ))}
                              </div>

                              {/* Explanation */}
                              {q.explanation_en && (
                                <p className="text-[11px] text-muted-foreground mt-1.5 italic leading-relaxed">
                                  💡 {q.explanation_en}
                                </p>
                              )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              <button
                                onClick={() => setEditingQ(q)}
                                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                                title="Edit"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-blue-500" />
                              </button>
                              {!q.question_sv && !q.translating && (
                                <button
                                  onClick={() => translateSingleQuestion(q)}
                                  className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                                  title="Translate"
                                >
                                  <Languages className="w-3.5 h-3.5 text-primary" />
                                </button>
                              )}
                              <button
                                onClick={() => toggleQuestionActive(q)}
                                className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                                title={q.active === false ? "Activate" : "Pause"}
                              >
                                {q.active === false ? (
                                  <Eye className="w-3.5 h-3.5 text-green-500" />
                                ) : (
                                  <EyeOff className="w-3.5 h-3.5 text-yellow-500" />
                                )}
                              </button>
                              <button
                                onClick={() => q.id && deleteQuestion(q.id)}
                                className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => setQuizPage(p => Math.max(0, p - 1))}
                      disabled={quizPage === 0}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {quizPage + 1} / {totalPages} · {filteredQ.length} questions
                    </span>
                    <button
                      onClick={() => setQuizPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={quizPage === totalPages - 1}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            CONTENT TAB
        ══════════════════════════════════════════════════ */}
        {tab === "content" && (
          <div className="py-5 space-y-4">

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-semibold">Content Management</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Announcements, tips, and historical facts shown in the app
                </p>
              </div>
              <button
                onClick={() => setAddingContent(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                {addingContent ? "Cancel" : "New Content"}
              </button>
            </div>

            {/* Add content form */}
            {addingContent && (
              <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <PenLine className="w-4 h-4" /> New Content
                  </h3>
                  <button onClick={() => setAddingContent(false)}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Type
                    </label>
                    <select
                      value={newContent.type}
                      onChange={e =>
                        setNewContent(p => ({
                          ...p,
                          type: e.target.value as "announcement" | "tip" | "fact",
                        }))
                      }
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      <option value="announcement">📢 Announcement</option>
                      <option value="tip">💡 Tip</option>
                      <option value="fact">🏛️ Historical Fact</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Empire
                    </label>
                    <select
                      value={newContent.empire_id}
                      onChange={e => setNewContent(p => ({ ...p, empire_id: e.target.value }))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    >
                      {ALL_EMPIRES.map(e => (
                        <option key={e.id} value={e.id}>{e.flag} {e.label}</option>
                      ))}
                      <option value="all">🌍 All Empires</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                    Text (English)
                  </label>
                  <textarea
                    value={newContent.text_en}
                    onChange={e => setNewContent(p => ({ ...p, text_en: e.target.value }))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-24"
                    placeholder="Write the content in English..."
                  />
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/15 rounded-xl">
                  <Languages className="w-4 h-4 text-primary flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Swedish and Turkish are auto-generated by AI when saving.
                  </p>
                </div>
                <button
                  onClick={saveContent}
                  disabled={savingContent || !newContent.text_en.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {savingContent ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving & Translating...</>
                  ) : (
                    <><Save className="w-4 h-4" /> Save & Translate</>
                  )}
                </button>
              </div>
            )}

            {loadingContent ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : contentItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <PenLine className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No content yet</p>
                <p className="text-xs mt-1 opacity-60">Add announcements, tips or historical facts</p>
              </div>
            ) : (
              <div className="space-y-2">
                {contentItems.map(item => (
                  <div
                    key={item.id}
                    className={`bg-card border rounded-2xl p-4 transition-all ${
                      item.active ? "border-border" : "border-border opacity-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {item.type === "announcement" ? "📢" : item.type === "tip" ? "💡" : "🏛️"}{" "}
                            {item.type}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {empireFlag(item.empire_id)} {item.empire_id}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              item.active
                                ? "bg-green-500/15 text-green-600"
                                : "bg-secondary text-muted-foreground"
                            }`}
                          >
                            {item.active ? "● Active" : "○ Paused"}
                          </span>
                          {item.text_sv && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600">
                              ✓ SV+TR
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{item.text_en}</p>
                        {item.text_sv && (
                          <p className="text-xs text-muted-foreground mt-1">
                            🇸🇪 {item.text_sv.slice(0, 80)}...
                          </p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-1.5">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button
                          onClick={() => toggleContent(item)}
                          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                          title={item.active ? "Pause" : "Activate"}
                        >
                          {item.active ? (
                            <EyeOff className="w-3.5 h-3.5 text-yellow-500" />
                          ) : (
                            <Eye className="w-3.5 h-3.5 text-green-500" />
                          )}
                        </button>
                        {!item.text_sv && (
                          <button
                            onClick={() => retranslateContent(item)}
                            className="p-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                            title="Translate"
                          >
                            <Languages className="w-3.5 h-3.5 text-primary" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteContent(item.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            NOTIFICATIONS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "notifications" && (
          <div className="py-5 space-y-5">

            {/* Compose form */}
            <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
              <div>
                <h2 className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <Bell className="w-4 h-4" /> Create & Send Notification
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Saved and shown to all {users.length} users. Auto-translated to Swedish and Turkish.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                    Title (English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={newNotif.title}
                    onChange={e => setNewNotif(p => ({ ...p, title: e.target.value }))}
                    placeholder="E.g. New feature available!"
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                    Image URL (optional)
                  </label>
                  <input
                    value={newNotif.image_url}
                    onChange={e => setNewNotif(p => ({ ...p, image_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                  Message (English) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newNotif.body}
                  onChange={e => setNewNotif(p => ({ ...p, body: e.target.value }))}
                  placeholder="Write your message to all users..."
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-24"
                />
              </div>

              <button
                onClick={sendNotification}
                disabled={sendingNotif || !newNotif.title.trim() || !newNotif.body.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50"
              >
                {translatingNotif ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Translating...</>
                ) : sendingNotif ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                ) : (
                  <><Send className="w-4 h-4" /> Send to {users.length} users</>
                )}
              </button>
            </div>

            {/* Sent notifications list */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-muted-foreground" /> Sent Notifications
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                    {notifications.length}
                  </span>
                </h2>
                <button
                  onClick={loadNotifications}
                  className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingNotifs ? "animate-spin" : ""}`} />
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">No notifications sent yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      className="flex items-start gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        {n.image_url ? (
                          <img
                            src={n.image_url}
                            className="w-10 h-10 rounded-full object-cover"
                            alt=""
                          />
                        ) : (
                          <Bell className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                          {n.body}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-muted-foreground">
                            {formatDate(n.created_at)}
                          </span>
                          {n.sent_count !== undefined && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                              → {n.sent_count} users
                            </span>
                          )}
                          {n.title_sv && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600">
                              ✓ SV+TR
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteNotification(n.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            INFLUENCERS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "influencers" && (
          <div className="py-5 space-y-5">

            {/* Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {
                  label: "Influencers",
                  value: influencers.length,
                  icon: Users,
                  color: "text-primary",
                },
                {
                  label: "Total clicks",
                  value: influencers.reduce((a, i) => a + i.uses, 0),
                  icon: TrendingUp,
                  color: "text-blue-500",
                },
                {
                  label: "Conversions",
                  value: influencers.reduce((a, i) => a + i.conversions, 0),
                  icon: Star,
                  color: "text-green-500",
                },
                {
                  label: "Revenue",
                  value: `${influencers.reduce((a, i) => a + i.revenue_generated, 0)} kr`,
                  icon: Zap,
                  color: "text-yellow-500",
                },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-semibold">Influencer Links</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unique discount codes. Base price: {MONTHLY_PRICE} kr/month.
                </p>
              </div>
              <button
                onClick={() => setAddingInfluencer(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                {addingInfluencer ? "Cancel" : "New Influencer"}
              </button>
            </div>

            {/* Add influencer form */}
            {addingInfluencer && (
              <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
                    <Share2 className="w-4 h-4" /> New Influencer Link
                  </h3>
                  <button onClick={() => setAddingInfluencer(false)}>
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      value={newInfluencer.name}
                      onChange={e => setNewInfluencer(p => ({ ...p, name: e.target.value }))}
                      placeholder="Ahmed Influencer"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Code (empty = auto-generate)
                    </label>
                    <input
                      value={newInfluencer.code}
                      onChange={e =>
                        setNewInfluencer(p => ({ ...p, code: e.target.value.toUpperCase() }))
                      }
                      placeholder="AHMED10"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="80"
                      value={newInfluencer.discount_percent}
                      onChange={e =>
                        setNewInfluencer(p => ({
                          ...p,
                          discount_percent: parseInt(e.target.value) || DEFAULT_DISCOUNT,
                        }))
                      }
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"
                    />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Final price:{" "}
                      {Math.round(MONTHLY_PRICE * (1 - newInfluencer.discount_percent / 100))} kr/mo
                    </p>
                  </div>
                </div>
                <button
                  onClick={saveInfluencer}
                  disabled={savingInfluencer || !newInfluencer.name.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {savingInfluencer ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Creating...</>
                  ) : (
                    <><Link className="w-4 h-4" /> Create Link</>
                  )}
                </button>
              </div>
            )}

            {loadingInfluencers ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : influencers.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Share2 className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">No influencer links yet</p>
                <p className="text-xs mt-1 opacity-60">Create links to track referrals & conversions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {influencers.map(inf => (
                  <div key={inf.id} className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-semibold text-sm">{inf.name}</span>
                          <code className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono border border-primary/20">
                            {inf.code}
                          </code>
                          <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                            -{inf.discount_percent}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(MONTHLY_PRICE * (1 - inf.discount_percent / 100))} kr/mo
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span>👆 {inf.uses} clicks</span>
                          <span>✅ {inf.conversions} conversions</span>
                          <span>💰 {inf.revenue_generated} kr</span>
                          <span>📅 {formatDate(inf.created_at)}</span>
                        </div>
                        {/* Conversion bar */}
                        {inf.uses > 0 && (
                          <div className="mt-2">
                            <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
                              <span>Conversion rate</span>
                              <span>{Math.round((inf.conversions / inf.uses) * 100)}%</span>
                            </div>
                            <div className="h-1 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full transition-all"
                                style={{
                                  width: `${Math.round((inf.conversions / inf.uses) * 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}?ref=${inf.code}`,
                            );
                            showToast("Link copied!");
                          }}
                          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                          title="Copy referral link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteInfluencer(inf.id, inf.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            MODERATION TAB
        ══════════════════════════════════════════════════ */}
        {tab === "moderation" && (
          <div className="py-5 space-y-4">

            {/* Overview grid */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {[
                { label: "Banned",   value: users.filter(u => u.is_banned).length,  color: "text-red-500",    bg: "bg-red-500/10" },
                { label: "Premium",  value: users.filter(u => u.is_premium).length, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                { label: "Admins",   value: stats.admins,                           color: "text-purple-500", bg: "bg-purple-500/10" },
                { label: "Online",   value: users.filter(u => u.is_online).length,  color: "text-green-500",  bg: "bg-green-500/10" },
                { label: "Total",    value: users.length,                           color: "text-primary",    bg: "bg-primary/10" },
              ].map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} border border-border rounded-2xl p-4 text-center`}>
                  <div className={`text-2xl font-serif ${color}`}>{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Banned users */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" /> Banned Users
                <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-500 text-xs">
                  {users.filter(u => u.is_banned).length}
                </span>
              </h2>
              {users.filter(u => u.is_banned).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-20 text-green-500" />
                  <p className="text-sm">No banned users</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.is_banned).map((u, i) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl"
                    >
                      <Avatar user={u} size="sm" ci={i} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{u.display_name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedUser(u)}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-secondary transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => toggleBan(u)}
                          className="px-3 py-1.5 rounded-lg border border-orange-200 text-orange-500 text-xs hover:bg-orange-50 transition-colors"
                        >
                          Unban
                        </button>
                        <button
                          onClick={() => deleteUser(u.id, u.email)}
                          className="px-3 py-1.5 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium users */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" /> Premium Users
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 text-xs">
                  {users.filter(u => u.is_premium).length}
                </span>
              </h2>
              {users.filter(u => u.is_premium).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No premium users yet</p>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.is_premium).map((u, i) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl"
                    >
                      <Avatar user={u} size="sm" ci={i} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium flex items-center gap-1">
                          {u.display_name} <span className="text-yellow-500">⭐</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => togglePremium(u)}
                          className="px-3 py-1.5 rounded-lg border border-yellow-200 text-yellow-600 text-xs hover:bg-yellow-50 transition-colors"
                        >
                          Remove Premium
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Admin users */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-500" /> Admin Users
              </h2>
              {users.filter(u => u.role === "admin").length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-6">No admins</p>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.role === "admin").map((u, i) => (
                    <div
                      key={u.id}
                      className="flex items-center gap-3 p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl"
                    >
                      <Avatar user={u} size="sm" ci={i} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium flex items-center gap-1">
                          <Shield className="w-3 h-3 text-purple-500" /> {u.display_name}
                        </p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      <button
                        onClick={() => toggleAdmin(u)}
                        className="px-3 py-1.5 rounded-lg border border-purple-200 text-purple-600 text-xs hover:bg-purple-50 transition-colors"
                      >
                        Remove Admin
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            LOGS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "logs" && (
          <div className="py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Activity Logs
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">
                  {logs.length}
                </span>
              </h2>
              <button
                onClick={() => setLogs([])}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-red-200 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Clear all
              </button>
            </div>

            {/* Log type legend */}
            <div className="flex gap-3 text-[10px] text-muted-foreground flex-wrap">
              {[
                { type: "info",    color: "bg-blue-500",   label: "Info" },
                { type: "success", color: "bg-green-500",  label: "Success" },
                { type: "warn",    color: "bg-yellow-500", label: "Warning" },
                { type: "error",   color: "bg-red-500",    label: "Error" },
              ].map(({ type, color, label }) => (
                <span key={type} className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </span>
              ))}
            </div>

            {logs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Activity className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="text-sm">No activity yet</p>
                <p className="text-xs mt-1 opacity-60">Actions will appear here in real-time</p>
              </div>
            ) : (
              <div className="space-y-1">
                {logs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 px-4 py-2.5 bg-card border border-border rounded-xl text-xs"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                        log.type === "info"    ? "bg-blue-500" :
                        log.type === "warn"    ? "bg-yellow-500" :
                        log.type === "error"   ? "bg-red-500" :
                        "bg-green-500"
                      }`}
                    />
                    <span className="flex-1 text-foreground leading-relaxed">{log.msg}</span>
                    <span className="text-muted-foreground font-mono flex-shrink-0">{log.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            SETTINGS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "settings" && (
          <div className="py-5 space-y-4">

            {/* App info */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" /> App Settings
              </h2>
              <div className="space-y-0 border border-border rounded-xl overflow-hidden">
                {[
                  { label: "App Name",             value: "Empire AI" },
                  { label: "Version",              value: "2.0.0" },
                  { label: "Environment",          value: "Production" },
                  { label: "Total Empires",        value: String(ALL_EMPIRES.length) },
                  { label: "Supabase URL",         value: import.meta.env.VITE_SUPABASE_URL?.slice(0, 30) + "..." },
                  { label: "Total Users",          value: String(users.length) },
                  { label: "Total Quiz Questions", value: String(totalQuizQuestions) },
                  { label: "Total Content Items",  value: String(contentItems.length) },
                  { label: "Notifications Sent",   value: String(notifications.length) },
                  { label: "Influencer Links",     value: String(influencers.length) },
                  { label: "Active Admin",         value: user?.email || "—" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex justify-between py-3 px-4 border-b border-border last:border-0 text-sm bg-card hover:bg-secondary/30 transition-colors"
                  >
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium font-mono text-xs text-right max-w-52 truncate">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supported empires */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" /> Supported Empires & Quiz Coverage
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {ALL_EMPIRES.map(e => {
                  const count = allQuizCount[e.id] || 0;
                  const max = Math.max(...Object.values(allQuizCount), 1);
                  const pct = Math.round((count / max) * 100);
                  return (
                    <div
                      key={e.id}
                      className="flex items-center gap-3 p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors cursor-pointer"
                      onClick={() => { setTab("quiz"); setQuizEmpire(e.id); }}
                    >
                      <span className="text-2xl">{e.flag}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium leading-tight">{e.label}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{ width: `${pct}%`, background: e.color }}
                            />
                          </div>
                          <span
                            className={`text-[10px] tabular-nums font-mono ${
                              count === 0 ? "text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {count}q
                          </span>
                        </div>
                      </div>
                      <CR className="w-3 h-3 text-muted-foreground" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-lg font-serif text-primary">{totalQuizQuestions}</div>
                  <div className="text-xs text-muted-foreground">Total Questions</div>
                </div>
                <div>
                  <div className="text-lg font-serif text-yellow-500">
                    {ALL_EMPIRES.filter(e => (allQuizCount[e.id] || 0) > 0).length}
                  </div>
                  <div className="text-xs text-muted-foreground">Empires Active</div>
                </div>
                <div>
                  <div className="text-lg font-serif text-blue-500">
                    {missingTranslations}
                  </div>
                  <div className="text-xs text-muted-foreground">Missing Translations</div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: "Export Users CSV",
                    icon: Download,
                    color: "text-blue-500",
                    action: exportCSV,
                  },
                  {
                    label: "Refresh All Data",
                    icon: RefreshCw,
                    color: "text-green-500",
                    action: () => { fetchUsers(); fetchLeaderboard(); fetchQuizCounts(); },
                  },
                  {
                    label: "Translate Missing",
                    icon: Languages,
                    color: "text-primary",
                    action: () => { setTab("quiz"); },
                  },
                  {
                    label: "View Leaderboard",
                    icon: Trophy,
                    color: "text-yellow-500",
                    action: () => setTab("leaderboard"),
                  },
                  {
                    label: "Send Notification",
                    icon: Bell,
                    color: "text-orange-500",
                    action: () => setTab("notifications"),
                  },
                  {
                    label: "Add Quiz Question",
                    icon: Plus,
                    color: "text-purple-500",
                    action: () => { setTab("quiz"); setAddingQ(true); },
                  },
                ].map(({ label, icon: Icon, color, action }) => (
                  <button
                    key={label}
                    onClick={action}
                    className="flex flex-col items-center gap-2 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors text-center"
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                    <span className="text-xs font-medium leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
