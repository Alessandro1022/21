import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, TrendingUp, Search, RefreshCw, Crown,
  Activity, BarChart2, Trophy, Zap, Share2, Settings, Bell,
  Eye, EyeOff, AlertTriangle, ChevronUp, ChevronDown, Download,
  X, Copy, Ban, Clock, Star, Calendar, Filter,
  CheckSquare, MoreHorizontal, ArrowRight, Wifi,
  Plus, Languages, Loader2, BookOpen, ChevronLeft, ChevronRight,
  Sparkles, Globe, MessageSquare, PenLine,
  Send, Layers, Hash,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman Empire",       flag: "🕌" },
  { id: "roman",             label: "Roman Empire",         flag: "🏛️" },
  { id: "islamic_caliphate", label: "Islamic Caliphate",    flag: "☪️" },
  { id: "mongol_empire",     label: "Mongol Empire",        flag: "⚔️" },
  { id: "ancient_egypt",     label: "Ancient Egypt",        flag: "𓂀" },
  { id: "british_empire",    label: "British Empire",       flag: "👑" },
  { id: "japanese_empire",   label: "Japanese Empire",      flag: "⛩️" },
  { id: "mali_empire",       label: "Mali Empire",          flag: "🌍" },
  { id: "seljuk_empire",     label: "Seljuk Empire",        flag: "🗡️" },
];

const QUIZ_PAGE_SIZE = 10;
const MONTHLY_PRICE = 78;
const DEFAULT_DISCOUNT = 10;
const avatarColors = ["#7F77DD","#1D9E75","#D85A30","#378ADD","#D4537E","#BA7517","#639922","#534AB7"];

type Tab = "users" | "stats" | "leaderboard" | "quiz" | "content" | "notifications" | "influencers" | "moderation" | "logs" | "settings";
type SortField = "display_name" | "email" | "role" | "created_at" | "xp";
type SortDir = "asc" | "desc";
type LeaderboardPeriod = "alltime" | "week" | "today";

// ─────────────────────────────────────────────────────────────
// INTERFACES
// ─────────────────────────────────────────────────────────────

interface UserProfile {
  id: string; email: string; display_name: string; role: string;
  created_at?: string; xp?: number; last_seen?: string;
  is_online?: boolean; questions_asked?: number; quiz_score?: number;
  is_banned?: boolean; is_premium?: boolean; avatar_url?: string;
}
interface Log { id: string; msg: string; type: "info"|"warn"|"error"|"success"; time: string; }
interface QuizQuestion {
  id?: string; empire_id: string;
  question_en: string; options_en: string[]; correct_index: number; explanation_en: string;
  question_sv?: string; options_sv?: string[]; explanation_sv?: string;
  question_tr?: string; options_tr?: string[]; explanation_tr?: string;
  translating?: boolean;
}
interface ContentItem {
  id: string; type: "announcement"|"tip"|"fact"; empire_id: string;
  text_en: string; text_sv?: string; text_tr?: string;
  active: boolean; created_at: string;
}
interface AppNotification {
  id: string; title: string; title_sv?: string; title_tr?: string;
  body: string; body_sv?: string; body_tr?: string;
  image_url?: string; created_at: string; sent_count?: number;
}
interface InfluencerLink {
  id: string; name: string; code: string; discount_percent: number;
  uses: number; conversions: number; revenue_generated: number; created_at: string;
}
interface Stats {
  total: number; today: number; thisWeek: number; thisMonth: number;
  growthPercent: number; activeToday: number; admins: number;
}

// ─────────────────────────────────────────────────────────────
// QUESTION FORM (top-level to prevent remount)
// ─────────────────────────────────────────────────────────────

function QuestionForm({ q, onChange, onSave, onCancel, savingQ }: {
  q: QuizQuestion; onChange: (q: QuizQuestion) => void;
  onSave: () => void; onCancel: () => void; savingQ: boolean;
}) {
  const isValid = q.question_en.trim() && !q.options_en.some(o => !o.trim()) && q.explanation_en.trim();
  return (
    <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-primary">
          <BookOpen className="w-4 h-4"/>
          {q.id ? "Edit Question" : "New Question"}
        </h3>
        <button onClick={onCancel} className="p-1 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-4 h-4 text-muted-foreground"/>
        </button>
      </div>

      {/* Empire */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Empire</label>
        <select value={q.empire_id} onChange={e => onChange({ ...q, empire_id: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40">
          {ALL_EMPIRES.map(e => (
            <option key={e.id} value={e.id}>{e.flag} {e.label}</option>
          ))}
        </select>
      </div>

      {/* Question */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Question (English)</label>
        <textarea value={q.question_en} onChange={e => onChange({ ...q, question_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-20"
          placeholder="Write the question in English..."/>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block font-medium">
          Answer Options — select the correct answer with the radio button
        </label>
        {q.options_en.map((opt, i) => (
          <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-colors ${q.correct_index === i ? "border-green-500/40 bg-green-500/5" : "border-border bg-secondary/50"}`}>
            <input type="radio" name={`correct-${q.id || "new"}`} checked={q.correct_index === i}
              onChange={() => onChange({ ...q, correct_index: i })}
              className="accent-green-500 w-4 h-4 flex-shrink-0"/>
            <span className="text-xs font-mono text-muted-foreground w-5">{String.fromCharCode(65 + i)}.</span>
            <input value={opt}
              onChange={e => { const opts = [...q.options_en]; opts[i] = e.target.value; onChange({ ...q, options_en: opts }); }}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
              placeholder={`Option ${String.fromCharCode(65 + i)}`}/>
            {q.correct_index === i && (
              <span className="text-xs text-green-500 font-medium flex-shrink-0">✓ correct</span>
            )}
          </div>
        ))}
      </div>

      {/* Explanation */}
      <div>
        <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Explanation (English)</label>
        <textarea value={q.explanation_en} onChange={e => onChange({ ...q, explanation_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-16"
          placeholder="Brief explanation of the correct answer..."/>
      </div>

      {/* AI note */}
      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/15 rounded-xl">
        <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"/>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Auto-translation:</strong> Swedish and Turkish are generated by AI when saving.
        </p>
      </div>

      <button onClick={onSave} disabled={savingQ || !isValid}
        className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-2 transition-opacity hover:opacity-90">
        {savingQ
          ? <><Loader2 className="w-4 h-4 animate-spin"/> Translating & saving...</>
          : <>{q.id ? "Save Changes" : "Add Question"}</>}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN ADMIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function Admin() {
  // Core state
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"|"admin"|"user"|"online"|"premium">("all");
  const [tab, setTab] = useState<Tab>("users");
  const [toast, setToast] = useState<{ msg: string; type: "success"|"error" } | null>(null);
  const [stats, setStats] = useState<Stats>({ total:0,today:0,thisWeek:0,thisMonth:0,growthPercent:0,activeToday:0,admins:0 });
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [logs, setLogs] = useState<Log[]>([]);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>("alltime");
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const realtimeRef = useRef<any>(null);

  // Quiz state
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
  const [newQ, setNewQ] = useState<QuizQuestion>({
    empire_id: "ottoman", question_en: "", options_en: ["","","",""], correct_index: 0, explanation_en: "",
  });

  // Content state
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [newContent, setNewContent] = useState({ type: "announcement", empire_id: "ottoman", text_en: "" });
  const [addingContent, setAddingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [newNotif, setNewNotif] = useState({ title: "", body: "", image_url: "" });
  const [sendingNotif, setSendingNotif] = useState(false);
  const [translatingNotif, setTranslatingNotif] = useState(false);

  // Influencer state
  const [influencers, setInfluencers] = useState<InfluencerLink[]>([]);
  const [loadingInfluencers, setLoadingInfluencers] = useState(false);
  const [newInfluencer, setNewInfluencer] = useState({ name: "", code: "", discount_percent: DEFAULT_DISCOUNT });
  const [addingInfluencer, setAddingInfluencer] = useState(false);
  const [savingInfluencer, setSavingInfluencer] = useState(false);

  // ── HELPERS ──────────────────────────────────────────────
  const showToast = (msg: string, type: "success"|"error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };
  const addLog = useCallback((msg: string, type: Log["type"] = "info") => {
    const time = new Date().toLocaleTimeString("sv-SE");
    const id = Math.random().toString(36).slice(2);
    setLogs(prev => [{ id, msg, type, time }, ...prev].slice(0, 100));
  }, []);
  const animateCounter = (target: number) => {
    let cur = 0; const step = Math.ceil(target / 30);
    const iv = setInterval(() => { cur = Math.min(cur + step, target); setAnimatedTotal(cur); if (cur >= target) clearInterval(iv); }, 30);
  };
  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const empireLabel = (id: string) => ALL_EMPIRES.find(e => e.id === id)?.label || id;
  const empireFlag = (id: string) => ALL_EMPIRES.find(e => e.id === id)?.flag || "🏛️";

  // ── AVATAR ──────────────────────────────────────────────
  const Avatar = ({ user, size = "md", ci = 0 }: { user: UserProfile; size?: "sm"|"md"|"lg"|"xl"; ci?: number }) => {
    const sz = { sm:"w-8 h-8 text-xs", md:"w-10 h-10 text-sm", lg:"w-12 h-12 text-sm", xl:"w-16 h-16 text-base" }[size];
    return (
      <div className={`${sz} rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-semibold text-white`}
        style={{ background: user.avatar_url ? undefined : avatarColors[ci % avatarColors.length] }}>
        {user.avatar_url ? <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover"/> : initials(user.display_name)}
      </div>
    );
  };

  // ── FETCH USERS ──────────────────────────────────────────
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

      const now = Date.now(); const day = 86400000;
      const xpMap: Record<string, number> = {};
      (progress || []).forEach((p: any) => { xpMap[p.user_id] = p.xp ?? 0; });
      const quizMap: Record<string, { count: number; totalScore: number; totalQ: number }> = {};
      (quizResults || []).forEach((r: any) => {
        if (!quizMap[r.user_id]) quizMap[r.user_id] = { count: 0, totalScore: 0, totalQ: 0 };
        quizMap[r.user_id].count += 1;
        quizMap[r.user_id].totalScore += r.score ?? 0;
        quizMap[r.user_id].totalQ += r.total_questions ?? 12;
      });

      const formatted: UserProfile[] = profiles.map((p: any, i: number) => {
        const qStats = quizMap[p.id];
        const quizPct = qStats?.totalQ > 0 ? Math.round((qStats.totalScore / qStats.totalQ) * 100) : 0;
        return {
          id: p.id, email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Unknown",
          role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
          created_at: p.created_at,
          xp: xpMap[p.id] ?? p.xp ?? 0,
          last_seen: p.last_seen ?? null,
          is_online: p.last_seen ? (now - new Date(p.last_seen).getTime()) < 5 * 60 * 1000 : false,
          questions_asked: qStats?.count ?? p.questions_asked ?? 0,
          quiz_score: quizPct || (p.quiz_score ?? 0),
          is_banned: p.is_banned ?? false,
          is_premium: p.is_premium ?? false,
          avatar_url: p.avatar_url ?? "",
        };
      });

      setUsers(formatted);
      animateCounter(formatted.length);
      setStats({
        total: formatted.length,
        today: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length,
        thisWeek: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7*day).length,
        thisMonth: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30*day).length,
        growthPercent: 100,
        activeToday: formatted.filter(u => u.is_online).length,
        admins: formatted.filter(u => u.role === "admin").length,
      });
      addLog(`Loaded ${formatted.length} users`, "success");
    } catch (e: any) { addLog(`Error: ${e?.message}`, "error"); }
    setLoading(false);
  }, [addLog]);

  // ── FETCH LEADERBOARD ────────────────────────────────────
  const fetchLeaderboard = useCallback(async () => {
    const [{ data: profiles }, { data: progress }, { data: quizResults }] = await Promise.all([
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
    const lb = profiles.map((p: any) => {
      const qStats = quizMap[p.id];
      return {
        id: p.id, email: p.email || "—",
        display_name: p.display_name || p.email?.split("@")[0] || "Unknown",
        role: "user", xp: xpMap[p.id] ?? 0,
        questions_asked: qStats?.count ?? 0,
        quiz_score: qStats?.totalQ > 0 ? Math.round((qStats.totalScore / qStats.totalQ) * 100) : 0,
        avatar_url: p.avatar_url ?? "",
      };
    }).sort((a: any, b: any) => b.xp - a.xp).slice(0, 10);
    setLeaderboard(lb);
  }, []);

  // ── FETCH QUIZ QUESTION COUNTS PER EMPIRE ───────────────
  const fetchQuizCounts = useCallback(async () => {
    const counts: Record<string, number> = {};
    await Promise.all(ALL_EMPIRES.map(async (e) => {
      const { count } = await supabase.from("quiz_questions").select("*", { count: "exact", head: true }).eq("empire_id", e.id);
      counts[e.id] = count ?? 0;
    }));
    setAllQuizCount(counts);
  }, []);

  // ── LOAD QUIZ ────────────────────────────────────────────
  const loadQuizQuestions = useCallback(async () => {
    setLoadingQuiz(true);
    const { data, error } = await supabase.from("quiz_questions").select("*")
      .eq("empire_id", quizEmpire).order("created_at", { ascending: false });
    if (error) showToast("Failed to load questions", "error");
    else setQuizQuestions((data || []) as QuizQuestion[]);
    setLoadingQuiz(false);
  }, [quizEmpire]);

  useEffect(() => { if (tab === "quiz") { loadQuizQuestions(); fetchQuizCounts(); } }, [tab, loadQuizQuestions, fetchQuizCounts]);
  useEffect(() => { if (tab === "content") loadContent(); }, [tab]);
  useEffect(() => { if (tab === "notifications") loadNotifications(); }, [tab]);
  useEffect(() => { if (tab === "influencers") loadInfluencers(); }, [tab]);

  // ── INIT ─────────────────────────────────────────────────
  useEffect(() => {
    fetchUsers(); fetchLeaderboard();
    realtimeRef.current = supabase.channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        addLog("Realtime: profiles updated", "info"); fetchUsers();
      }).subscribe();
    return () => { if (realtimeRef.current) supabase.removeChannel(realtimeRef.current); };
  }, [fetchUsers, fetchLeaderboard, addLog]);

  // ── USER ACTIONS ─────────────────────────────────────────
  const deleteUser = async (id: string, email: string) => {
    const me = (await supabase.auth.getUser()).data.user?.id;
    if (id === me) { showToast("Cannot delete yourself!", "error"); return; }
    if (!confirm(`Delete ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} deleted`);
    addLog(`Deleted: ${email}`, "warn");
    if (selectedUser?.id === id) setSelectedUser(null);
    fetchUsers();
  };

  const toggleBan = async (user: UserProfile) => {
    const newVal = !user.is_banned;
    await supabase.from("profiles").update({ is_banned: newVal }).eq("id", user.id);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_banned: newVal } : u));
    if (selectedUser?.id === user.id) setSelectedUser(prev => prev ? { ...prev, is_banned: newVal } : null);
    showToast(`${user.display_name} ${newVal ? "banned" : "unbanned"}`);
    addLog(`${newVal ? "Banned" : "Unbanned"}: ${user.email}`, "warn");
  };

  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, role: newRole } : u));
    if (selectedUser?.id === user.id) setSelectedUser(prev => prev ? { ...prev, role: newRole } : null);
    showToast(`${user.display_name} is now ${newRole}`);
    addLog(`Role: ${user.email} → ${newRole}`, "info");
    fetchUsers();
  };

  const togglePremium = async (user: UserProfile) => {
    const newVal = !user.is_premium;
    await supabase.from("profiles").update({ is_premium: newVal }).eq("id", user.id);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_premium: newVal } : u));
    if (selectedUser?.id === user.id) setSelectedUser(prev => prev ? { ...prev, is_premium: newVal } : null);
    showToast(`${user.display_name} is now ${newVal ? "Premium ⭐" : "Free"}`);
    addLog(`Premium: ${user.email} → ${newVal ? "premium" : "free"}`, "info");
  };

  const copyUserData = (user: UserProfile) => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    showToast("Copied to clipboard!");
  };

  const deleteBulk = async () => {
    if (!confirm(`Delete ${selectedUsers.length} users?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} deleted`);
    addLog(`Bulk deleted: ${selectedUsers.length}`, "warn");
    setSelectedUsers([]); fetchUsers();
  };

  const exportCSV = () => {
    const rows = [["ID","Email","Name","Role","XP","Questions","Premium","Registered"]];
    users.forEach(u => rows.push([u.id,u.email,u.display_name,u.role,String(u.xp||0),String(u.questions_asked||0),String(u.is_premium),u.created_at||""]));
    const csv = rows.map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv],{type:"text/csv"}));
    a.download = "users.csv"; a.click();
    addLog("CSV exported", "success");
  };

  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0,3).map((u,i)=>`${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) await navigator.share({ title:"Empire AI Leaderboard", text });
    else { await navigator.clipboard.writeText(text); showToast("Copied!"); }
  };

  // ── AI TRANSLATE ─────────────────────────────────────────
  const EDGE_FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-translate`;

  async function callAI(prompt: string, max_tokens = 1000): Promise<string> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(EDGE_FN_URL, {
        method: "POST",
        headers: { "Content-Type":"application/json", "Authorization":`Bearer ${session?.access_token}`, "apikey":import.meta.env.VITE_SUPABASE_ANON_KEY },
        body: JSON.stringify({ prompt, max_tokens }),
      });
      const data = await res.json();
      return data.text || "";
    } catch { return ""; }
  }

  async function autoTranslate(text_en: string): Promise<{ sv: string; tr: string }> {
    try {
      const raw = await callAI(`Translate to Swedish and Turkish. Return ONLY JSON: {"sv":"...","tr":"..."}\n\nText: ${text_en}`, 500);
      return JSON.parse(raw.replace(/```json|```/g,"").trim());
    } catch { return { sv: "", tr: "" }; }
  }

  async function autoTranslateQuestion(q: QuizQuestion): Promise<QuizQuestion> {
    try {
      const prompt = `Translate this quiz question from English to Swedish and Turkish. Return ONLY JSON:
{"question_sv":"...","options_sv":["...","...","...","..."],"explanation_sv":"...","question_tr":"...","options_tr":["...","...","...","..."],"explanation_tr":"..."}
Question: ${q.question_en}
Options: ${JSON.stringify(q.options_en)}
Explanation: ${q.explanation_en}`;
      const raw = await callAI(prompt, 1000);
      return { ...q, ...JSON.parse(raw.replace(/```json|```/g,"").trim()) };
    } catch { return q; }
  }

  // ── SAVE QUESTION ────────────────────────────────────────
  const saveQuestion = async (q: QuizQuestion) => {
    if (!q.question_en.trim() || q.options_en.some(o => !o.trim()) || !q.explanation_en.trim()) {
      showToast("Fill in all fields", "error"); return;
    }
    setSavingQ(true);
    try {
      const payload: any = {
        empire_id: q.empire_id,
        question_en: q.question_en, question_sv: q.question_sv || q.question_en, question_tr: q.question_tr || q.question_en,
        options_en: q.options_en, options_sv: q.options_sv?.length ? q.options_sv : q.options_en, options_tr: q.options_tr?.length ? q.options_tr : q.options_en,
        correct_index: q.correct_index,
        explanation_en: q.explanation_en, explanation_sv: q.explanation_sv || q.explanation_en, explanation_tr: q.explanation_tr || q.explanation_en,
        active: true,
      };
      const { error } = q.id
        ? await supabase.from("quiz_questions").update(payload).eq("id", q.id)
        : await supabase.from("quiz_questions").insert(payload);
      if (error) throw error;
      showToast(q.id ? "Question updated!" : "Question added!");
      addLog(`${q.id ? "Updated" : "Added"}: ${q.question_en.slice(0,50)}`, "success");
      if (!q.id) { setNewQ({ empire_id: quizEmpire, question_en: "", options_en: ["","","",""], correct_index: 0, explanation_en: "" }); setAddingQ(false); }
      setEditingQ(null);
      setQuizPage(0);
      await loadQuizQuestions();
      fetchQuizCounts();
    } catch (e: any) { showToast(`Error: ${e?.message}`, "error"); addLog(`Save error: ${e?.message}`, "error"); }
    setSavingQ(false);
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    await supabase.from("quiz_questions").delete().eq("id", id);
    showToast("Deleted"); addLog("Question deleted", "warn");
    loadQuizQuestions(); fetchQuizCounts();
  };

  const translateMissing = async () => {
    const missing = quizQuestions.filter(q => !q.question_sv || !q.question_tr);
    if (!missing.length) { showToast("All questions already translated!"); return; }
    setTranslatingAll(true);
    addLog(`Translating ${missing.length} questions...`, "info");
    for (const q of missing) {
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...p, translating: true } : p));
      const translated = await autoTranslateQuestion(q);
      const { id, translating, ...payload } = translated as any;
      await supabase.from("quiz_questions").update(payload).eq("id", q.id);
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...translated, translating: false } : p));
    }
    showToast(`Translated ${missing.length} questions!`);
    addLog(`Translation done: ${missing.length}`, "success");
    setTranslatingAll(false);
    loadQuizQuestions();
  };

  // ── CONTENT ──────────────────────────────────────────────
  const loadContent = async () => {
    setLoadingContent(true);
    const { data } = await supabase.from("content_items").select("*").order("created_at", { ascending: false });
    setContentItems((data || []) as ContentItem[]);
    setLoadingContent(false);
  };

  const saveContent = async () => {
    if (!newContent.text_en.trim()) return;
    setSavingContent(true);
    try {
      const t = await autoTranslate(newContent.text_en);
      await supabase.from("content_items").insert({ ...newContent, text_sv: t.sv, text_tr: t.tr, active: true });
      showToast("Content saved!"); addLog(`New content: ${newContent.type}`, "success");
      setNewContent({ type: "announcement", empire_id: "ottoman", text_en: "" });
      setAddingContent(false); loadContent();
    } catch { showToast("Failed to save", "error"); }
    setSavingContent(false);
  };

  const toggleContent = async (item: ContentItem) => {
    await supabase.from("content_items").update({ active: !item.active }).eq("id", item.id);
    setContentItems(prev => prev.map(c => c.id === item.id ? { ...c, active: !c.active } : c));
  };

  const deleteContent = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("content_items").delete().eq("id", id);
    showToast("Deleted"); loadContent();
  };

  // ── NOTIFICATIONS ────────────────────────────────────────
  const loadNotifications = async () => {
    setLoadingNotifs(true);
    const { data } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
    setNotifications((data || []) as AppNotification[]);
    setLoadingNotifs(false);
  };

  const sendNotification = async () => {
    if (!newNotif.title.trim() || !newNotif.body.trim()) return;
    setSendingNotif(true);
    try {
      setTranslatingNotif(true);
      const [titleT, bodyT] = await Promise.all([autoTranslate(newNotif.title), autoTranslate(newNotif.body)]);
      setTranslatingNotif(false);
      await supabase.from("notifications").insert({
        title: newNotif.title, title_sv: titleT.sv, title_tr: titleT.tr,
        body: newNotif.body, body_sv: bodyT.sv, body_tr: bodyT.tr,
        image_url: newNotif.image_url.trim() || null, sent_count: users.length,
      });
      showToast(`Notification sent to ${users.length} users!`);
      addLog(`Notification: "${newNotif.title}" → ${users.length} users`, "success");
      setNewNotif({ title: "", body: "", image_url: "" });
      loadNotifications();
    } catch (e: any) { setTranslatingNotif(false); showToast("Failed to send", "error"); }
    setSendingNotif(false);
  };

  const deleteNotification = async (id: string) => {
    if (!confirm("Delete this notification?")) return;
    await supabase.from("notifications").delete().eq("id", id);
    showToast("Deleted"); loadNotifications();
  };

  // ── INFLUENCERS ──────────────────────────────────────────
  const loadInfluencers = async () => {
    setLoadingInfluencers(true);
    const { data } = await supabase.from("influencer_links").select("*").order("created_at", { ascending: false });
    setInfluencers((data || []) as InfluencerLink[]);
    setLoadingInfluencers(false);
  };

  const generateCode = (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
    return `${slug}${Math.random().toString(36).slice(2,5)}`.toUpperCase();
  };

  const saveInfluencer = async () => {
    if (!newInfluencer.name.trim()) { showToast("Enter a name", "error"); return; }
    setSavingInfluencer(true);
    try {
      const code = newInfluencer.code.trim() || generateCode(newInfluencer.name);
      const { error } = await supabase.from("influencer_links").insert({
        name: newInfluencer.name.trim(), code: code.toUpperCase(),
        discount_percent: newInfluencer.discount_percent, uses: 0, conversions: 0, revenue_generated: 0,
      });
      if (error) throw error;
      showToast(`Influencer link created: ${code.toUpperCase()}`);
      addLog(`New influencer: ${newInfluencer.name}`, "success");
      setNewInfluencer({ name: "", code: "", discount_percent: DEFAULT_DISCOUNT });
      setAddingInfluencer(false); loadInfluencers();
    } catch (e: any) { showToast("Code might already exist", "error"); }
    setSavingInfluencer(false);
  };

  const deleteInfluencer = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}?`)) return;
    await supabase.from("influencer_links").delete().eq("id", id);
    showToast(`${name} deleted`); loadInfluencers();
  };

  // ── DERIVED ──────────────────────────────────────────────
  const missingTranslations = quizQuestions.filter(q => !q.question_sv || !q.question_tr).length;
  const filteredQ = quizQuestions.filter(q => !quizSearch || q.question_en.toLowerCase().includes(quizSearch.toLowerCase()));
  const pagedQ = filteredQ.slice(quizPage * QUIZ_PAGE_SIZE, (quizPage+1) * QUIZ_PAGE_SIZE);
  const totalPages = Math.ceil(filteredQ.length / QUIZ_PAGE_SIZE);
  const totalQuizQuestions = Object.values(allQuizCount).reduce((a, b) => a + b, 0);

  const filteredUsers = users.filter(u => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) || u.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ? true :
      filter === "online" ? !!u.is_online :
      filter === "premium" ? !!u.is_premium :
      u.role === filter;
    return matchSearch && matchFilter;
  }).sort((a, b) => {
    const av = String((a as any)[sortField] || "");
    const bv = String((b as any)[sortField] || "");
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });

  const SortBtn = ({ field }: { field: SortField }) => (
    <button onClick={() => { if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortField(field); setSortDir("asc"); } }}
      className="inline-flex flex-col ml-1 opacity-60 hover:opacity-100">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "text-primary opacity-100" : ""}`}/>
      <ChevronDown className={`w-2.5 h-2.5 -mt-0.5 ${sortField === field && sortDir === "desc" ? "text-primary opacity-100" : ""}`}/>
    </button>
  );

  // ── TABS CONFIG ──────────────────────────────────────────
  const TABS: { key: Tab; label: string; icon: any; badge?: number }[] = [
    { key:"users",         label:"Users",         icon: Users,       badge: users.length },
    { key:"stats",         label:"Stats",         icon: BarChart2 },
    { key:"leaderboard",   label:"Leaderboard",   icon: Trophy },
    { key:"quiz",          label:"Quiz",          icon: BookOpen,    badge: totalQuizQuestions },
    { key:"content",       label:"Content",       icon: PenLine,     badge: contentItems.length },
    { key:"notifications", label:"Notifications", icon: Bell,        badge: notifications.length },
    { key:"influencers",   label:"Influencers",   icon: Share2,      badge: influencers.length },
    { key:"moderation",    label:"Moderation",    icon: Shield },
    { key:"logs",          label:"Logs",          icon: Activity,    badge: logs.length },
    { key:"settings",      label:"Settings",      icon: Settings },
  ];

  // ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pb-24">

      {/* TOAST */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm shadow-2xl text-white flex items-center gap-2.5 transition-all ${toast.type === "error" ? "bg-red-500" : "bg-green-600"}`}>
          {toast.type === "error" ? <AlertTriangle className="w-4 h-4 flex-shrink-0"/> : <CheckSquare className="w-4 h-4 flex-shrink-0"/>}
          {toast.msg}
        </div>
      )}

      {/* USER DETAIL DRAWER */}
      {selectedUser && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedUser(null)}/>
          <div className="relative w-full max-w-sm bg-card border-l border-border h-full overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-primary">User Profile</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><X className="w-4 h-4"/></button>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar user={selectedUser} size="xl" ci={0}/>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${selectedUser.is_online ? "bg-green-500" : "bg-gray-400"}`}/>
                </div>
                <div>
                  <p className="font-semibold text-lg">{selectedUser.display_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs">{selectedUser.is_online ? "🟢 Online" : "⚫ Offline"}</span>
                    {selectedUser.is_banned && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-medium">Banned</span>}
                    {selectedUser.is_premium && <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">⭐ Premium</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { label:"XP", value:selectedUser.xp||0, color:"text-yellow-500" },
                  { label:"Questions", value:selectedUser.questions_asked||0, color:"text-blue-500" },
                  { label:"Quiz %", value:`${selectedUser.quiz_score||0}%`, color:"text-green-500" },
                  { label:"Role", value:selectedUser.role, color:"text-purple-500" },
                ].map(({ label,value,color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className={`text-xl font-serif ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-sm">
                {[
                  { label:"ID", value:selectedUser.id.slice(0,12)+"..." },
                  { label:"Registered", value:selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString("sv-SE") : "—" },
                  { label:"Last seen", value:selectedUser.last_seen ? new Date(selectedUser.last_seen).toLocaleDateString("sv-SE") : "—" },
                ].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-40">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button onClick={() => toggleAdmin(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500"/>
                  {selectedUser.role === "admin" ? "Remove admin" : "Make admin"}
                </button>
                <button onClick={() => togglePremium(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-yellow-200 text-yellow-600 text-sm hover:bg-yellow-50 transition-colors flex items-center justify-center gap-2">
                  <Star className="w-4 h-4"/>
                  {selectedUser.is_premium ? "Remove Premium" : "Grant Premium"}
                </button>
                <button onClick={() => toggleBan(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                  <Ban className="w-4 h-4"/>
                  {selectedUser.is_banned ? "Unban" : "Ban user"}
                </button>
                <button onClick={() => copyUserData(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4"/> Copy data
                </button>
                <button onClick={() => deleteUser(selectedUser.id, selectedUser.email)}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4"/> Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"/>
        <div className="relative px-6 py-6 max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-serif text-primary flex items-center gap-2.5">
                <Crown className="w-6 h-6"/> Empire AI Admin
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Control Center</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {[
                  { label:"Total", value:animatedTotal, color:"text-primary" },
                  { label:"Online", value:users.filter(u=>u.is_online).length, color:"text-green-500" },
                  { label:"Premium", value:users.filter(u=>u.is_premium).length, color:"text-yellow-500" },
                  { label:"Admins", value:stats.admins, color:"text-purple-500" },
                  { label:"Questions", value:totalQuizQuestions, color:"text-blue-500" },
                  { label:"New today", value:stats.today, color:"text-orange-500" },
                ].map(({ label,value,color }) => (
                  <div key={label} className="bg-card/80 backdrop-blur border border-border rounded-xl px-3 py-1.5 text-center min-w-14">
                    <div className={`text-lg font-serif ${color}`}>{value}</div>
                    <div className="text-[10px] text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-xs">
                <Download className="w-3.5 h-3.5"/> Export CSV
              </button>
              <button onClick={() => { fetchUsers(); fetchLeaderboard(); }} className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card hover:bg-secondary transition-colors text-xs">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}/> Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-6 max-w-7xl mx-auto">

        {/* TABS */}
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {TABS.map(({ key,label,icon:Icon,badge }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-xs border-b-2 transition-colors -mb-px whitespace-nowrap ${tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-3.5 h-3.5"/>
              {label}
              {badge !== undefined && badge > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${tab === key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
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
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label:"Total users", value:users.length, icon:Users, color:"text-blue-500" },
                { label:"Online now", value:users.filter(u=>u.is_online).length, icon:Wifi, color:"text-green-500" },
                { label:"Premium", value:users.filter(u=>u.is_premium).length, icon:Star, color:"text-yellow-500" },
                { label:"This week", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500" },
              ].map(({ label,value,icon:Icon,color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>

            {/* Search & filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground"/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all","admin","user","online","premium"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-2 rounded-xl text-xs border transition-colors ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {f === "all" ? "All" : f === "admin" ? "Admins" : f === "user" ? "Users" : f === "online" ? "Online" : "⭐ Premium"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk} className="px-3 py-2 rounded-xl text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3 h-3"/> Delete {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>

            {/* User list */}
            {loading ? (
              <div className="space-y-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="bg-card border border-border rounded-2xl p-4 animate-pulse">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-secondary"/><div className="flex-1 space-y-2"><div className="h-3 bg-secondary rounded w-1/3"/><div className="h-3 bg-secondary rounded w-1/2"/></div></div>
                  </div>
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="text-sm font-medium">No users found</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/40">
                        <th className="px-4 py-3 w-8">
                          <input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={() => setSelectedUsers(p => p.length === filteredUsers.length ? [] : filteredUsers.map(u => u.id))}
                            className="w-4 h-4"/>
                        </th>
                        {[["display_name","Name"],["email","Email"],["role","Role"],["xp","XP"],["created_at","Registered"]] .map(([field,label]) => (
                          <th key={field} className="text-left px-4 py-3 font-normal text-muted-foreground text-xs">
                            <span className="flex items-center gap-1">{label}<SortBtn field={field as SortField}/></span>
                          </th>
                        ))}
                        <th className="px-4 py-3 text-xs text-muted-foreground font-normal">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredUsers.map((user, i) => (
                        <tr key={user.id} onClick={() => setSelectedUser(user)}
                          className={`transition-colors hover:bg-secondary/20 cursor-pointer ${selectedUsers.includes(user.id) ? "bg-primary/5" : ""} ${user.is_banned ? "opacity-50" : ""}`}>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <input type="checkbox" checked={selectedUsers.includes(user.id)}
                              onChange={() => setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id])}
                              className="w-4 h-4"/>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar user={user} size="sm" ci={i}/>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${user.is_online ? "bg-green-500" : "bg-gray-400"}`}/>
                              </div>
                              <div>
                                <span className="font-medium text-sm">{user.display_name}</span>
                                <div className="flex items-center gap-1 mt-0.5">
                                  {user.is_banned && <span className="px-1 rounded text-[10px] bg-red-100 text-red-700">Banned</span>}
                                  {user.is_premium && <span className="px-1 rounded text-[10px] bg-yellow-100 text-yellow-700">⭐</span>}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground border border-border"}`}>
                              {user.role === "admin" && <Shield className="w-2.5 h-2.5"/>}{user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3"><span className="text-yellow-500 font-medium text-sm">{user.xp}</span></td>
                          <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                          </td>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              <button onClick={() => setSelectedUser(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="View">
                                <Eye className="w-3.5 h-3.5"/>
                              </button>
                              <button onClick={() => toggleAdmin(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Toggle admin">
                                <Shield className="w-3.5 h-3.5 text-purple-500"/>
                              </button>
                              <button onClick={() => togglePremium(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Toggle premium">
                                <Star className="w-3.5 h-3.5 text-yellow-500"/>
                              </button>
                              <button onClick={() => toggleBan(user)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" title="Toggle ban">
                                <Ban className="w-3.5 h-3.5 text-orange-500"/>
                              </button>
                              <button onClick={() => deleteUser(user.id, user.email)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-red-500"/>
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
                  {filteredUsers.map((user, i) => (
                    <div key={user.id} onClick={() => setSelectedUser(user)}
                      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all ${selectedUsers.includes(user.id) ? "border-primary" : "border-border"} ${user.is_banned ? "opacity-50" : ""}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedUsers.includes(user.id)}
                          onChange={e => { e.stopPropagation(); setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id]); }}
                          onClick={e => e.stopPropagation()} className="w-4 h-4"/>
                        <div className="relative">
                          <Avatar user={user} size="md" ci={i}/>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${user.is_online ? "bg-green-500" : "bg-gray-400"}`}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>{user.role}</span>
                          <span className="text-xs text-yellow-500">{user.xp} XP</span>
                          {user.is_premium && <span className="text-xs text-yellow-600">⭐ Premium</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">{filteredUsers.length} of {users.length} users</p>
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            STATS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "stats" && (
          <div className="py-5 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label:"Active now", value:users.filter(u=>u.is_online).length, icon:Activity, color:"text-green-500", sub:"online" },
                { label:"New today", value:stats.today, icon:Calendar, color:"text-blue-500", sub:"registrations" },
                { label:"This week", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500", sub:"new users" },
                { label:"Premium users", value:users.filter(u=>u.is_premium).length, icon:Star, color:"text-yellow-500", sub:"paid subscribers" },
              ].map(({ label,value,icon:Icon,color,sub }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-3xl font-serif">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-500"/> Overview</h3>
                {[
                  { label:"Total registered", value:users.length },
                  { label:"Online now", value:users.filter(u=>u.is_online).length },
                  { label:"Premium users", value:users.filter(u=>u.is_premium).length },
                  { label:"Admins", value:stats.admins },
                  { label:"Banned users", value:users.filter(u=>u.is_banned).length },
                  { label:"New today", value:stats.today },
                  { label:"New this week", value:stats.thisWeek },
                  { label:"New this month", value:stats.thisMonth },
                  { label:"Quiz questions total", value:totalQuizQuestions },
                  { label:"Missing translations", value:missingTranslations },
                  { label:"Average XP", value:users.length ? Math.round(users.reduce((a,u)=>a+(u.xp||0),0)/users.length) : 0 },
                ].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4 text-green-500"/> Quiz Questions by Empire</h3>
                <div className="space-y-3">
                  {ALL_EMPIRES.map(e => {
                    const count = allQuizCount[e.id] || 0;
                    const max = Math.max(...Object.values(allQuizCount), 1);
                    return (
                      <div key={e.id}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="flex items-center gap-1.5">{e.flag} <span className="text-muted-foreground">{e.label}</span></span>
                          <span className={`font-medium tabular-nums ${count === 0 ? "text-muted-foreground" : "text-foreground"}`}>{count}</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full gold-gradient rounded-full transition-all duration-700" style={{ width:`${(count/max)*100}%` }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                {(["alltime","week","today"] as LeaderboardPeriod[]).map(p => (
                  <button key={p} onClick={() => setLeaderboardPeriod(p)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${leaderboardPeriod === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {p === "alltime" ? "🏆 All Time" : p === "week" ? "📅 Week" : "☀️ Today"}
                  </button>
                ))}
              </div>
              <button onClick={shareLeaderboard} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
                <Share2 className="w-4 h-4"/> Share
              </button>
            </div>

            {/* Podium */}
            <div className="rounded-3xl overflow-hidden" style={{ background:"linear-gradient(135deg,#0a0612,#1a0a08,#0a0612)", border:"1px solid rgba(200,169,110,0.25)" }}>
              <div className="px-6 pt-5 pb-3 text-center border-b border-primary/10">
                <div className="flex items-center justify-center gap-2">
                  <Crown className="w-5 h-5 text-primary"/> <span className="font-serif text-primary">Empire AI Leaderboard</span> <Crown className="w-5 h-5 text-primary"/>
                </div>
              </div>

              {leaderboard.length >= 3 && (
                <div className="px-4 pt-5 pb-2">
                  <div className="flex items-end justify-center gap-3">
                    {[1,0,2].map((pos) => {
                      const u = leaderboard[pos];
                      const medals = ["🥇","🥈","🥉"];
                      const heights = [88, 60, 44];
                      const sizes = [72, 56, 56];
                      const borders = ["#c8a96e","#aaa","#cd7f32"];
                      return (
                        <div key={pos} className="flex flex-col items-center gap-2 flex-1">
                          <div className="relative">
                            <div className="rounded-full overflow-hidden flex items-center justify-center font-bold text-white"
                              style={{ width:sizes[pos], height:sizes[pos], border:`${pos===0?3:2}px solid ${borders[pos]}`, background:u.avatar_url?undefined:avatarColors[pos], boxShadow:pos===0?"0 0 24px rgba(200,169,110,0.4)":undefined }}>
                              {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full object-cover" alt=""/> : initials(u.display_name)}
                            </div>
                            <span className="absolute -top-2 -right-2 text-xl">{medals[pos]}</span>
                          </div>
                          <div className="text-center">
                            <p className={`font-medium text-white truncate max-w-20 ${pos===0?"text-sm":"text-xs"}`}>{u.display_name}</p>
                            <p className={`font-bold ${pos===0?"text-sm":"text-xs"}`} style={{ color:borders[pos] }}>{u.xp} XP</p>
                          </div>
                          <div className="w-full rounded-t-xl flex items-end justify-center py-2"
                            style={{ background:`rgba(${pos===0?"200,169,110":"pos===1?170,170,170:205,127,50"},0.12)`, minHeight:heights[pos], border:`1px solid ${borders[pos]}33`, borderBottom:"none" }}>
                            {pos === 0 && <Crown className="w-4 h-4 opacity-40" style={{ color:borders[0] }}/>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="px-4 pb-4 space-y-1.5">
                {leaderboard.slice(3).map((u,i) => (
                  <div key={u.id} onClick={() => setSelectedUser(u)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-transform"
                    style={{ background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-serif w-5 text-center text-primary/50">{i+4}</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background:u.avatar_url?undefined:avatarColors[(i+3)%avatarColors.length] }}>
                      {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full object-cover" alt=""/> : initials(u.display_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.display_name}</p>
                      <p className="text-[10px] text-white/30">{u.questions_asked} questions · {u.quiz_score}% quiz</p>
                    </div>
                    <div className="flex items-center gap-1 text-primary">
                      <Zap className="w-3 h-3"/><span className="text-sm font-serif">{u.xp}</span><span className="text-[10px] text-primary/50">XP</span>
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
            {/* Empire selector — all 9 */}
            <div className="bg-card border border-border rounded-2xl p-4">
              <p className="text-xs text-muted-foreground mb-3 font-medium">Select Empire</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {ALL_EMPIRES.map(e => {
                  const count = allQuizCount[e.id] || 0;
                  return (
                    <button key={e.id} onClick={() => { setQuizEmpire(e.id); setQuizPage(0); setAddingQ(false); setEditingQ(null); setQuizSearch(""); }}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all ${quizEmpire === e.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/40 hover:bg-secondary"}`}>
                      <span className="text-xl">{e.flag}</span>
                      <span className="text-[10px] text-center font-medium leading-tight line-clamp-2">{e.label}</span>
                      <span className={`text-[10px] tabular-nums font-mono ${count === 0 ? "text-muted-foreground" : "text-primary"}`}>
                        {count} {count === 1 ? "q" : "qs"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions row */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium flex items-center gap-2">
                  {empireFlag(quizEmpire)} {empireLabel(quizEmpire)}
                </span>
                <span className="text-xs text-muted-foreground">{quizQuestions.length} questions</span>
                {missingTranslations > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-600 text-xs font-medium">{missingTranslations} missing SV/TR</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {missingTranslations > 0 && (
                  <button onClick={translateMissing} disabled={translatingAll}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs hover:bg-primary/20 disabled:opacity-50 transition-colors">
                    {translatingAll ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Languages className="w-3.5 h-3.5"/>}
                    Translate missing
                  </button>
                )}
                <button onClick={() => { setAddingQ(v => !v); setEditingQ(null); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs">
                  <Plus className="w-3.5 h-3.5"/> Add Question
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground"/>
              <input value={quizSearch} onChange={e => { setQuizSearch(e.target.value); setQuizPage(0); }} placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 p-3.5 bg-primary/5 border border-primary/15 rounded-xl">
              <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"/>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Auto-translation:</strong> Write questions in English. AI generates Swedish and Turkish automatically when saving. Quiz picks 12 random questions per session, max 3 plays per day.
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
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/>
              </div>
            ) : filteredQ.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="font-medium text-sm">{quizSearch ? "No questions match" : `No questions for ${empireLabel(quizEmpire)} yet`}</p>
                <p className="text-xs mt-1">{quizSearch ? "Try a different keyword" : "Click 'Add Question' above"}</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {pagedQ.map((q, i) => (
                    <div key={q.id || i}>
                      {editingQ?.id === q.id ? (
                        <QuestionForm q={editingQ} onChange={setEditingQ} onSave={() => saveQuestion(editingQ)} onCancel={() => setEditingQ(null)} savingQ={savingQ}/>
                      ) : (
                        <div className={`bg-card border rounded-2xl p-4 transition-all ${q.translating ? "opacity-60 animate-pulse border-primary/30" : "border-border hover:border-primary/30"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs text-muted-foreground tabular-nums">#{quizPage * QUIZ_PAGE_SIZE + i + 1}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{empireFlag(q.empire_id)} {empireLabel(q.empire_id)}</span>
                                {q.translating && <span className="text-xs text-primary flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> translating...</span>}
                                {!q.question_sv && !q.translating && <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600">missing SV/TR</span>}
                                {q.question_sv && <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-600">✓ translated</span>}
                              </div>
                              <p className="text-sm font-medium leading-relaxed">{q.question_en}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {q.options_en.map((opt, oi) => (
                                  <span key={oi} className={`text-xs px-2 py-0.5 rounded-lg ${oi === q.correct_index ? "bg-green-500/15 text-green-600 font-medium border border-green-500/20" : "bg-secondary text-muted-foreground"}`}>
                                    {String.fromCharCode(65+oi)}. {opt}
                                  </span>
                                ))}
                              </div>
                              {q.explanation_en && <p className="text-[11px] text-muted-foreground mt-1.5 italic leading-relaxed">💡 {q.explanation_en}</p>}
                            </div>
                            <div className="flex flex-col gap-1 flex-shrink-0">
                              <button onClick={() => setEditingQ(q)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Edit">
                                <PenLine className="w-3.5 h-3.5 text-muted-foreground"/>
                              </button>
                              <button onClick={() => q.id && deleteQuestion(q.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-red-500"/>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button onClick={() => setQuizPage(p => Math.max(0,p-1))} disabled={quizPage === 0}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors">
                      <ChevronLeft className="w-4 h-4"/>
                    </button>
                    <span className="text-sm text-muted-foreground">{quizPage+1} / {totalPages} · {filteredQ.length} questions</span>
                    <button onClick={() => setQuizPage(p => Math.min(totalPages-1,p+1))} disabled={quizPage === totalPages-1}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors">
                      <ChevronRight className="w-4 h-4"/>
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
                <p className="text-xs text-muted-foreground mt-0.5">Announcements, tips and historical facts shown in the app</p>
              </div>
              <button onClick={() => setAddingContent(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs">
                <Plus className="w-3.5 h-3.5"/> New Content
              </button>
            </div>

            {addingContent && (
              <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-primary"><PenLine className="w-4 h-4"/> New Content</h3>
                  <button onClick={() => setAddingContent(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Type</label>
                    <select value={newContent.type} onChange={e => setNewContent(p => ({ ...p, type: e.target.value as any }))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40">
                      <option value="announcement">📢 Announcement</option>
                      <option value="tip">💡 Tip</option>
                      <option value="fact">🏛️ Historical Fact</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Empire</label>
                    <select value={newContent.empire_id} onChange={e => setNewContent(p => ({ ...p, empire_id: e.target.value }))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40">
                      {ALL_EMPIRES.map(e => <option key={e.id} value={e.id}>{e.flag} {e.label}</option>)}
                      <option value="all">🌍 All Empires</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Text (English)</label>
                  <textarea value={newContent.text_en} onChange={e => setNewContent(p => ({ ...p, text_en: e.target.value }))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-20"
                    placeholder="Write the content in English..."/>
                </div>
                <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/15 rounded-xl">
                  <Languages className="w-4 h-4 text-primary flex-shrink-0"/>
                  <p className="text-xs text-muted-foreground">Swedish and Turkish are auto-generated by AI.</p>
                </div>
                <button onClick={saveContent} disabled={savingContent || !newContent.text_en.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  {savingContent ? <><Loader2 className="w-4 h-4 animate-spin"/> Saving...</> : "Save & Translate"}
                </button>
              </div>
            )}

            {loadingContent ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/></div>
            ) : contentItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <PenLine className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="text-sm font-medium">No content yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {contentItems.map(item => (
                  <div key={item.id} className={`bg-card border rounded-2xl p-4 ${item.active ? "border-border" : "border-border opacity-50"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {item.type === "announcement" ? "📢" : item.type === "tip" ? "💡" : "🏛️"} {item.type}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">{empireFlag(item.empire_id)} {item.empire_id}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.active ? "bg-green-500/15 text-green-600" : "bg-secondary text-muted-foreground"}`}>
                            {item.active ? "● Active" : "○ Inactive"}
                          </span>
                          {item.text_sv && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600">✓ translated</span>}
                        </div>
                        <p className="text-sm leading-relaxed">{item.text_en}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{new Date(item.created_at).toLocaleDateString("sv-SE")}</p>
                      </div>
                      <div className="flex flex-col gap-1 flex-shrink-0">
                        <button onClick={() => toggleContent(item)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                          {item.active ? <EyeOff className="w-3.5 h-3.5 text-yellow-500"/> : <Eye className="w-3.5 h-3.5 text-green-500"/>}
                        </button>
                        <button onClick={() => deleteContent(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-red-500"/>
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
            <div className="bg-card border border-primary/30 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2 text-primary"><Bell className="w-4 h-4"/> Create & Send Notification</h2>
              <p className="text-xs text-muted-foreground">Saved and shown to all users in the app's notification center. Auto-translated to Swedish and Turkish.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Title (English)</label>
                  <input value={newNotif.title} onChange={e => setNewNotif(p => ({ ...p, title: e.target.value }))}
                    placeholder="E.g. New feature available!"
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Image URL (optional)</label>
                  <input value={newNotif.image_url} onChange={e => setNewNotif(p => ({ ...p, image_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Message (English)</label>
                <textarea value={newNotif.body} onChange={e => setNewNotif(p => ({ ...p, body: e.target.value }))}
                  placeholder="Write your message to all users..."
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40 resize-none h-24"/>
              </div>
              <button onClick={sendNotification} disabled={sendingNotif || !newNotif.title.trim() || !newNotif.body.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50">
                {translatingNotif ? <><Loader2 className="w-4 h-4 animate-spin"/> Translating...</>
                  : sendingNotif ? <><Loader2 className="w-4 h-4 animate-spin"/> Saving...</>
                  : <><Send className="w-4 h-4"/> Send to {users.length} users</>}
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-muted-foreground"/> Sent Notifications
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{notifications.length}</span>
                </h2>
                <button onClick={loadNotifications} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingNotifs ? "animate-spin" : ""}`}/>
                </button>
              </div>
              {notifications.length === 0 ? (
                <div className="p-12 text-center text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-20"/><p className="text-sm">No notifications sent yet</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map(n => (
                    <div key={n.id} className="flex items-start gap-4 px-5 py-4 hover:bg-secondary/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                        <Bell className="w-4 h-4 text-primary"/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</p>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(n.created_at).toLocaleDateString("sv-SE")}
                          </span>
                          {n.sent_count !== undefined && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                              Sent to {n.sent_count} users
                            </span>
                          )}
                          {n.title_sv && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600">✓ SV+TR</span>}
                        </div>
                      </div>
                      <button onClick={() => deleteNotification(n.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                        <Trash2 className="w-3.5 h-3.5 text-red-500"/>
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label:"Influencers", value:influencers.length, icon:Users, color:"text-primary" },
                { label:"Total clicks", value:influencers.reduce((a,i)=>a+i.uses,0), icon:TrendingUp, color:"text-blue-500" },
                { label:"Conversions", value:influencers.reduce((a,i)=>a+i.conversions,0), icon:Star, color:"text-green-500" },
                { label:"Revenue", value:`${influencers.reduce((a,i)=>a+i.revenue_generated,0)} kr`, icon:Zap, color:"text-yellow-500" },
              ].map(({ label,value,icon:Icon,color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-semibold">Influencer Links</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Unique discount codes. Base price: {MONTHLY_PRICE} kr/month.</p>
              </div>
              <button onClick={() => setAddingInfluencer(v => !v)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-xs">
                <Plus className="w-3.5 h-3.5"/> New Influencer
              </button>
            </div>

            {addingInfluencer && (
              <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold flex items-center gap-2 text-primary"><Share2 className="w-4 h-4"/> New Influencer Link</h3>
                  <button onClick={() => setAddingInfluencer(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Name</label>
                    <input value={newInfluencer.name} onChange={e => setNewInfluencer(p => ({ ...p, name: e.target.value }))}
                      placeholder="Ahmed Influencer"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Code (leave empty for auto)</label>
                    <input value={newInfluencer.code} onChange={e => setNewInfluencer(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                      placeholder="AHMED10"
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm font-mono outline-none focus:ring-2 focus:ring-primary/40"/>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block font-medium">Discount (%)</label>
                    <input type="number" min="1" max="80" value={newInfluencer.discount_percent}
                      onChange={e => setNewInfluencer(p => ({ ...p, discount_percent: parseInt(e.target.value) || DEFAULT_DISCOUNT }))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/40"/>
                    <p className="text-[10px] text-muted-foreground mt-1">Final price: {Math.round(MONTHLY_PRICE * (1 - newInfluencer.discount_percent/100))} kr/mo</p>
                  </div>
                </div>
                <button onClick={saveInfluencer} disabled={savingInfluencer || !newInfluencer.name.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  {savingInfluencer ? <><Loader2 className="w-4 h-4 animate-spin"/> Creating...</> : "Create Link"}
                </button>
              </div>
            )}

            {loadingInfluencers ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/></div>
            ) : influencers.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Share2 className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="text-sm font-medium">No influencer links yet</p>
              </div>
            ) : (
              <div className="space-y-2">
                {influencers.map(inf => (
                  <div key={inf.id} className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-semibold text-sm">{inf.name}</span>
                          <code className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-mono border border-primary/20">{inf.code}</code>
                          <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">-{inf.discount_percent}%</span>
                          <span className="text-xs text-muted-foreground">{Math.round(MONTHLY_PRICE*(1-inf.discount_percent/100))} kr/mo</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span>👆 {inf.uses} clicks</span>
                          <span>✅ {inf.conversions} conversions</span>
                          <span>💰 {inf.revenue_generated} kr</span>
                          <span>📅 {new Date(inf.created_at).toLocaleDateString("sv-SE")}</span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}?ref=${inf.code}`); showToast("Link copied!"); }}
                          className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Copy link">
                          <Copy className="w-3.5 h-3.5"/>
                        </button>
                        <button onClick={() => deleteInfluencer(inf.id, inf.name)}
                          className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5 text-red-500"/>
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
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2"><Shield className="w-4 h-4 text-primary"/> Banned Users</h2>
              {users.filter(u => u.is_banned).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No banned users</p>
              ) : (
                <div className="space-y-2">
                  {users.filter(u => u.is_banned).map((user, i) => (
                    <div key={user.id} className="flex items-center gap-3 p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
                      <Avatar user={user} size="sm" ci={i}/>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{user.display_name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <button onClick={() => toggleBan(user)} className="px-3 py-1.5 rounded-lg border border-orange-200 text-orange-500 text-xs hover:bg-orange-50 transition-colors">
                        Unban
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500"/> Moderation Overview</h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label:"Banned", value:users.filter(u=>u.is_banned).length, color:"text-red-500" },
                  { label:"Admins", value:stats.admins, color:"text-purple-500" },
                  { label:"Premium", value:users.filter(u=>u.is_premium).length, color:"text-yellow-500" },
                ].map(({ label,value,color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-4">
                    <div className={`text-2xl font-serif ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════
            LOGS TAB
        ══════════════════════════════════════════════════ */}
        {tab === "logs" && (
          <div className="py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold flex items-center gap-2"><Activity className="w-4 h-4 text-primary"/> Activity Logs</h2>
              <button onClick={() => setLogs([])} className="text-xs text-muted-foreground hover:text-destructive transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-red-200">
                Clear
              </button>
            </div>
            {logs.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Activity className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="text-sm">No activity yet</p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {logs.map(log => (
                  <div key={log.id} className="flex items-start gap-3 px-4 py-2.5 bg-card border border-border rounded-xl text-xs">
                    <div className={`w-2 h-2 rounded-full mt-0.5 flex-shrink-0 ${
                      log.type === "info" ? "bg-blue-500" :
                      log.type === "warn" ? "bg-yellow-500" :
                      log.type === "error" ? "bg-red-500" : "bg-green-500"
                    }`}/>
                    <span className="flex-1 text-foreground">{log.msg}</span>
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
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2"><Settings className="w-4 h-4 text-primary"/> App Settings</h2>
              <div className="space-y-3">
                {[
                  { label:"App Name", value:"Empire AI" },
                  { label:"Version", value:"2.0.0" },
                  { label:"Environment", value:"Production" },
                  { label:"Total Empires", value:String(ALL_EMPIRES.length) },
                  { label:"Total Users", value:String(users.length) },
                  { label:"Total Quiz Questions", value:String(totalQuizQuestions) },
                ].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-semibold flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500"/> Supported Empires</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {ALL_EMPIRES.map(e => (
                  <div key={e.id} className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
                    <span className="text-lg">{e.flag}</span>
                    <div>
                      <p className="text-xs font-medium leading-tight">{e.label}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">{allQuizCount[e.id] || 0} questions</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// ── missing import ──
function CheckSquare({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  );
}
