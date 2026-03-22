import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import  InfluencerStats  from "@/components/InfluencerStats";
import {
  Trash2, Shield, Users, TrendingUp, Search, RefreshCw, Crown,
  Activity, BarChart2, Trophy, Zap, Share2, Settings, Bell,
  Eye, EyeOff, AlertTriangle, ChevronUp, ChevronDown, Download,
  X, Copy, Ban, UserCheck, Clock, Star, Calendar, Filter,
  CheckSquare, Square, MoreHorizontal, ArrowRight, Wifi, WifiOff,
  Plus, Languages, Loader2, BookOpen, ChevronLeft, ChevronRight,
  Sparkles, Medal, Globe, MessageSquare, PenLine, BarChart,
  Hash, Layers, Send, ThumbsUp, ThumbsDown, Flag,
} from "lucide-react";

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
  avatar_url?: string;
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
 
type SortField = "display_name" | "email" | "role" | "created_at" | "xp";
type SortDir = "asc" | "desc";
type Tab = "users" | "stats" | "leaderboard" | "quiz" | "content" | "moderation" | "logs" | "settings";
type LeaderboardPeriod = "alltime" | "week" | "today";
 
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
 
const EMPIRE_OPTIONS = ["ottoman", "roman"];
const QUIZ_PAGE_SIZE = 10;
const avatarColors = ["#7F77DD","#1D9E75","#D85A30","#378ADD","#D4537E","#BA7517","#639922","#534AB7"];
 
// ── QUESTION FORM (outside Admin to prevent remount on every render) ──
function QuestionForm({ q, onChange, onSave, onCancel, savingQ }: {
  q: QuizQuestion;
  onChange: (q: QuizQuestion) => void;
  onSave: () => void;
  onCancel: () => void;
  savingQ: boolean;
}) {
  return (
  <>
    <Tab label="Influencer Stats">
      <InfluencerStats influencerId="jannica" />
    </Tab>
    <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary"/>
          {q.id ? "Redigera fråga" : "Ny fråga"}
        </h3>
        <button onClick={onCancel}><X className="w-4 h-4 text-muted-foreground"/></button>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Empire</label>
        <select
          value={q.empire_id}
          onChange={e => onChange({ ...q, empire_id: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
        >
          {EMPIRE_OPTIONS.map(e => (
            <option key={e} value={e}>{e.charAt(0).toUpperCase()+e.slice(1)}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Fråga (engelska)</label>
        <textarea
          value={q.question_en}
          onChange={e => onChange({ ...q, question_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-20"
          placeholder="Skriv frågan på engelska..."
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block">
          Svarsalternativ — välj rätt svar med radio-knappen
        </label>

        {q.options_en.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${q.id||"new"}`}
              checked={q.correct_index === i}
              onChange={() => onChange({ ...q, correct_index: i })}
              className="accent-primary flex-shrink-0"
            />
            <input
              value={opt}
              onChange={e => {
                const opts = [...q.options_en];
                opts[i] = e.target.value;
                onChange({ ...q, options_en: opts });
              }}
              className="flex-1 px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder={`Alternativ ${String.fromCharCode(65+i)}`}
            />
            {q.correct_index === i && (
              <span className="text-xs text-green-500 font-medium flex-shrink-0">✓ rätt</span>
            )}
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Förklaring (engelska)</label>
        <textarea
          value={q.explanation_en}
          onChange={e => onChange({ ...q, explanation_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-16"
          placeholder="Kort förklaring av rätt svar..."
        />
      </div>

      <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"/>
        <p className="text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Auto-översättning:</strong> Svenska och turkiska genereras automatiskt av AI vid sparning.
        </p>
      </div>

      <button
        onClick={onSave}
        disabled={savingQ || !q.question_en || q.options_en.some(o => !o) || !q.explanation_en}
        className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-sans font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {savingQ
          ? <><Loader2 className="w-4 h-4 animate-spin"/> Översätter &amp; sparar...</>
          : <>{q.id ? "Spara ändringar" : "Lägg till fråga"}</>}
      </button>
    </div>
  </>
);

  
  // ── USER STATE ──
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all"|"admin"|"user"|"online">("all");
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
  const [announcement, setAnnouncement] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [blockedWords, setBlockedWords] = useState("hack, exploit, jailbreak");
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const realtimeRef = useRef<any>(null);
 
  // ── QUIZ STATE ──
  const [quizEmpire, setQuizEmpire] = useState("ottoman");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizPage, setQuizPage] = useState(0);
  const [editingQ, setEditingQ] = useState<QuizQuestion | null>(null);
  const [addingQ, setAddingQ] = useState(false);
  const [translatingAll, setTranslatingAll] = useState(false);
  const [quizSearch, setQuizSearch] = useState("");
  const [newQ, setNewQ] = useState<QuizQuestion>({
    empire_id: "ottoman",
    question_en: "",
    options_en: ["","","",""],
    correct_index: 0,
    explanation_en: "",
  });
 
  // ── CONTENT STATE ──
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [newContent, setNewContent] = useState({ type: "announcement", empire_id: "ottoman", text_en: "" });
  const [addingContent, setAddingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
 
  // ── HELPERS ──
  const showToast = (msg: string, type: "success"|"error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };
 
  const addLog = useCallback((msg: string, type: Log["type"] = "info") => {
    const time = new Date().toLocaleTimeString("sv-SE");
    const id = Math.random().toString(36).slice(2);
    setLogs(prev => [{ id, msg, type, time }, ...prev].slice(0, 100));
  }, []);
 
  const animateCounter = (target: number) => {
    let current = 0;
    const step = Math.ceil(target / 30);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setAnimatedTotal(current);
      if (current >= target) clearInterval(interval);
    }, 30);
  };
 
  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const medalEmoji = (i: number) => ["🥇","🥈","🥉"][i] || `#${i+1}`;
  const logColor = (type: Log["type"]) =>
    ({ info:"bg-blue-500", warn:"bg-yellow-500", error:"bg-red-500", success:"bg-green-500" }[type]);
 
  // ── AVATAR ──
  const Avatar = ({ user, size = "md", colorIndex = 0 }: { user: UserProfile; size?: "sm"|"md"|"lg"|"xl"; colorIndex?: number }) => {
    const s = { sm:"w-7 h-7 text-xs", md:"w-9 h-9 text-xs", lg:"w-12 h-12 text-sm", xl:"w-16 h-16 text-base" }[size];
    return (
      <div className={`${s} rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center font-medium text-white`}
        style={{ background: user.avatar_url ? undefined : avatarColors[colorIndex % avatarColors.length] }}>
        {user.avatar_url
          ? <img src={user.avatar_url} alt={user.display_name} className="w-full h-full object-cover"/>
          : initials(user.display_name)}
      </div>
    );
  };
 
  // ── FETCH USERS ──
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data: profiles, error } = await supabase.from("profiles").select("*");
      const { data: roles } = await supabase.from("user_roles").select("user_id, role");
      if (error) { showToast("Kunde inte hämta användare", "error"); addLog(`Fel: ${error.message}`, "error"); }
      if (profiles) {
        const now = Date.now(); const day = 86400000;
        const formatted: UserProfile[] = profiles.map((p: any, i: number) => ({
          id: p.id, email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
          role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
          created_at: p.created_at,
          xp: p.xp ?? Math.floor(Math.random() * 2000),
          last_seen: p.last_seen ?? new Date(now - Math.random() * 7 * day).toISOString(),
          is_online: Math.random() > 0.7,
          questions_asked: p.questions_asked ?? Math.floor(Math.random() * 150),
          quiz_score: p.quiz_score ?? Math.floor(Math.random() * 100),
          is_banned: p.is_banned ?? false,
          avatar_url: p.avatar_url ?? "",
        }));
        setUsers(formatted); animateCounter(formatted.length);
        const admins = formatted.filter(u => u.role === "admin").length;
        setStats({
          total: formatted.length,
          today: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length,
          thisWeek: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7*day).length,
          thisMonth: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30*day).length,
          growthPercent: 100, activeToday: formatted.filter(u => u.is_online).length, admins,
        });
        addLog(`Hämtade ${formatted.length} användare`, "success");
      }
    } catch { addLog("Okänt fel vid hämtning", "error"); }
    setLoading(false);
  }, [addLog]);
 
  // ── FETCH LEADERBOARD ──
  const fetchLeaderboard = useCallback(async () => {
    const { data: profiles } = await supabase.from("profiles").select("id, display_name, email, created_at, xp, avatar_url, questions_asked, quiz_score");
    if (profiles) {
      const lb = profiles.map((p: any) => ({
        id: p.id, email: p.email || "—",
        display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
        role: "user",
        xp: p.xp ?? Math.floor(Math.random() * 3000),
        questions_asked: p.questions_asked ?? Math.floor(Math.random() * 200),
        quiz_score: p.quiz_score ?? Math.floor(Math.random() * 100),
        avatar_url: p.avatar_url ?? "",
      })).sort((a: any, b: any) => b.xp - a.xp).slice(0, 10);
      setLeaderboard(lb);
    }
  }, []);
 
  // ── LOAD QUIZ ──
  const loadQuizQuestions = useCallback(async () => {
    setLoadingQuiz(true);
    const { data, error } = await supabase.from("quiz_questions").select("*").eq("empire_id", quizEmpire).order("created_at", { ascending: false });
    if (error) showToast("Kunde inte ladda frågor", "error");
    else setQuizQuestions((data || []) as QuizQuestion[]);
    setLoadingQuiz(false);
  }, [quizEmpire]);
 
  useEffect(() => { if (tab === "quiz") loadQuizQuestions(); }, [tab, loadQuizQuestions]);
 
  // ── LOAD CONTENT ──
  const loadContent = useCallback(async () => {
    setLoadingContent(true);
    const { data } = await supabase.from("content_items").select("*").order("created_at", { ascending: false });
    setContentItems((data || []) as ContentItem[]);
    setLoadingContent(false);
  }, []);
 
  useEffect(() => { if (tab === "content") loadContent(); }, [tab, loadContent]);
 
  // ── REALTIME + INIT ──
  useEffect(() => {
    fetchUsers(); fetchLeaderboard();
    realtimeRef.current = supabase.channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, (payload) => {
        addLog(`Realtid: ${payload.eventType} på profiles`, "info"); fetchUsers();
      }).subscribe();
    return () => { if (realtimeRef.current) supabase.removeChannel(realtimeRef.current); };
  }, [fetchUsers, fetchLeaderboard, addLog]);
 
  // ── USER ACTIONS ──
  const deleteUser = async (id: string, email: string) => {
    if (id === (await supabase.auth.getUser()).data.user?.id) { showToast("Du kan inte ta bort dig själv!", "error"); return; }
    if (!confirm(`Ta bort ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`); addLog(`Borttagen: ${email}`, "warn");
    if (selectedUser?.id === id) setSelectedUser(null); fetchUsers();
  };
 
  const banUser = async (user: UserProfile) => {
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_banned: !u.is_banned } : u));
    showToast(`${user.display_name} ${user.is_banned ? "avbannad" : "bannad"}`);
    addLog(`${user.is_banned ? "Avbannad" : "Bannad"}: ${user.email}`, "warn");
  };
 
  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} är nu ${newRole}`);
    addLog(`Roll: ${user.email} → ${newRole}`, "info"); fetchUsers();
  };
 
  const copyUserData = (user: UserProfile) => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2)); showToast("Kopierat!");
  };
 
  const deleteBulk = async () => {
    if (!confirm(`Ta bort ${selectedUsers.length} användare?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} borttagna`); addLog(`Bulk-borttagen: ${selectedUsers.length}`, "warn");
    setSelectedUsers([]); fetchUsers();
  };
 
  const exportCSV = () => {
    const rows = [["ID","Email","Namn","Roll","XP","Frågor","Registrerad"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, String(u.xp||0), String(u.questions_asked||0), u.created_at||""]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "användare.csv"; a.click();
    addLog("CSV exporterad", "success");
  };
 
  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0,3).map((u,i)=>`${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) await navigator.share({ title: "Empire AI Leaderboard", text });
    else { await navigator.clipboard.writeText(text); showToast("Kopierat!"); }
  };
 
  // ── AUTO TRANSLATE ──
  async function autoTranslate(text_en: string): Promise<{ sv: string; tr: string }> {
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 500,
          messages: [{ role: "user", content: `Translate to Swedish and Turkish. Return only JSON: {"sv":"...","tr":"..."}\n\nText: ${text_en}` }],
        }),
      });
      const data = await res.json();
      const raw = data.content?.map((c: any) => c.text||"").join("") || "";
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
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      const text = data.content?.map((c: any) => c.text||"").join("") || "";
      return { ...q, ...JSON.parse(text.replace(/```json|```/g,"").trim()) };
    } catch { return q; }
  }
 
  // ── SAVE QUESTION ──
  const saveQuestion = async (q: QuizQuestion) => {
    setSavingQ(true);
    try {
      let final = q;
      if (!q.question_sv || !q.question_tr) final = await autoTranslateQuestion(q);
      const { id, translating, ...payload } = final as any;
      if (q.id) {
        await supabase.from("quiz_questions").update(payload).eq("id", q.id);
        showToast("Fråga uppdaterad!"); addLog(`Uppdaterad: ${q.question_en.slice(0,40)}`, "success");
      } else {
        await supabase.from("quiz_questions").insert(payload);
        showToast("Fråga tillagd!"); addLog(`Ny fråga: ${q.question_en.slice(0,40)}`, "success");
        setNewQ({ empire_id: quizEmpire, question_en: "", options_en: ["","","",""], correct_index: 0, explanation_en: "" });
        setAddingQ(false);
      }
      await loadQuizQuestions(); setEditingQ(null);
    } catch { showToast("Kunde inte spara", "error"); }
    setSavingQ(false);
  };
 
  const deleteQuestion = async (id: string) => {
    if (!confirm("Radera denna fråga?")) return;
    await supabase.from("quiz_questions").delete().eq("id", id);
    showToast("Raderad"); addLog("Fråga raderad", "warn"); loadQuizQuestions();
  };
 
  const translateMissing = async () => {
    const missing = quizQuestions.filter(q => !q.question_sv || !q.question_tr);
    if (!missing.length) { showToast("Alla frågor är redan översatta!"); return; }
    setTranslatingAll(true); addLog(`Översätter ${missing.length} frågor...`, "info");
    for (const q of missing) {
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...p, translating: true } : p));
      const translated = await autoTranslateQuestion(q);
      const { id, translating, ...payload } = translated as any;
      await supabase.from("quiz_questions").update(payload).eq("id", q.id);
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...translated, translating: false } : p));
    }
    showToast(`Översatte ${missing.length} frågor!`); addLog(`Översättning klar: ${missing.length}`, "success");
    setTranslatingAll(false); loadQuizQuestions();
  };
 
  // ── SAVE CONTENT ──
  const saveContent = async () => {
    if (!newContent.text_en.trim()) return;
    setSavingContent(true);
    try {
      const translated = await autoTranslate(newContent.text_en);
      await supabase.from("content_items").insert({
        ...newContent,
        text_sv: translated.sv,
        text_tr: translated.tr,
        active: true,
      });
      showToast("Innehåll sparat!"); addLog(`Nytt innehåll: ${newContent.type}`, "success");
      setNewContent({ type: "announcement", empire_id: "ottoman", text_en: "" });
      setAddingContent(false);
      loadContent();
    } catch { showToast("Kunde inte spara", "error"); }
    setSavingContent(false);
  };
 
  const toggleContent = async (item: ContentItem) => {
    await supabase.from("content_items").update({ active: !item.active }).eq("id", item.id);
    setContentItems(prev => prev.map(c => c.id === item.id ? { ...c, active: !c.active } : c));
    showToast(item.active ? "Avaktiverat" : "Aktiverat");
  };
 
  const deleteContent = async (id: string) => {
    if (!confirm("Radera?")) return;
    await supabase.from("content_items").delete().eq("id", id);
    showToast("Raderat"); loadContent();
  };
 
  // ── DERIVED ──
  const adminsCount = users.filter(u => u.role === "admin").length;
  const onlineCount = users.filter(u => u.is_online).length;
  const missingTranslations = quizQuestions.filter(q => !q.question_sv || !q.question_tr).length;
 
  const filteredQuestions = quizQuestions.filter(q =>
    !quizSearch || q.question_en.toLowerCase().includes(quizSearch.toLowerCase())
  );
  const pagedQuestions = filteredQuestions.slice(quizPage * QUIZ_PAGE_SIZE, (quizPage+1) * QUIZ_PAGE_SIZE);
  const totalPages = Math.ceil(filteredQuestions.length / QUIZ_PAGE_SIZE);
 
  const filtered = users.filter(u => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) || u.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.role === filter || (filter === "online" && u.is_online);
    return matchSearch && matchFilter;
  }).sort((a, b) => {
    const av = String((a as any)[sortField]||""); const bv = String((b as any)[sortField]||"");
    return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
  });
 
  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField===field&&sortDir==="asc"?"text-primary":"opacity-20"}`}/>
      <ChevronDown className={`w-2.5 h-2.5 ${sortField===field&&sortDir==="desc"?"text-primary":"opacity-20"}`}/>
    </span>
  );
 
  return (
    <div className="min-h-screen bg-background pb-24">
 
      {/* TOAST */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm shadow-xl text-white flex items-center gap-2 ${toast.type==="error"?"bg-red-500":"bg-green-600"}`}>
          {toast.type==="error" ? <AlertTriangle className="w-4 h-4"/> : <CheckSquare className="w-4 h-4"/>}
          {toast.msg}
        </div>
      )}
 
      {/* USER DETAIL PANEL */}
      {selectedUser && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}/>
          <div className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif text-primary">Användarprofil</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors"><X className="w-4 h-4"/></button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar user={selectedUser} size="xl" colorIndex={0}/>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${selectedUser.is_online?"bg-green-500":"bg-gray-400"}`}/>
                </div>
                <div>
                  <p className="font-medium text-lg">{selectedUser.display_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{selectedUser.is_online ? "🟢 Online" : "⚫ Offline"}</span>
                    {selectedUser.is_banned && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">Bannad</span>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:"XP", value:selectedUser.xp||0, color:"text-yellow-500" },
                  { label:"Frågor", value:selectedUser.questions_asked||0, color:"text-blue-500" },
                  { label:"Quiz %", value:`${selectedUser.quiz_score||0}%`, color:"text-green-500" },
                  { label:"Roll", value:selectedUser.role, color:"text-purple-500" },
                ].map(({ label,value,color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className={`text-xl font-serif ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { label:"ID", value:selectedUser.id },
                  { label:"Registrerad", value:selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString("sv-SE") : "—" },
                  { label:"Senast sedd", value:selectedUser.last_seen ? new Date(selectedUser.last_seen).toLocaleDateString("sv-SE") : "—" },
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
                  <Shield className="w-4 h-4"/>{selectedUser.role==="admin" ? "Ta bort admin" : "Gör admin"}
                </button>
                <button onClick={() => banUser(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                  <Ban className="w-4 h-4"/>{selectedUser.is_banned ? "Avbanna" : "Banna användare"}
                </button>
                <button onClick={() => copyUserData(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4"/> Kopiera data
                </button>
                <button onClick={() => deleteUser(selectedUser.id, selectedUser.email)}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4"/> Ta bort konto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
 
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-background"/>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Crect fill='%23111' width='800' height='200'/%3E%3Crect x='50' y='60' width='35' height='130' fill='%23c8a96e' rx='3'/%3E%3Crect x='53' y='50' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='140' y='40' width='35' height='150' fill='%23c8a96e' rx='3'/%3E%3Crect x='143' y='30' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='230' y='30' width='35' height='160' fill='%23c8a96e' rx='3'/%3E%3Crect x='233' y='20' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='535' y='30' width='35' height='160' fill='%23c8a96e' rx='3'/%3E%3Crect x='538' y='20' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='625' y='40' width='35' height='150' fill='%23c8a96e' rx='3'/%3E%3Crect x='628' y='30' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='715' y='60' width='35' height='130' fill='%23c8a96e' rx='3'/%3E%3Crect x='718' y='50' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='30' y='185' width='740' height='8' fill='%23c8a96e'/%3E%3Cpolygon points='220,5 400,0 580,5' fill='%23c8a96e' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize:"cover", backgroundPosition:"center bottom",
        }}/>
        <div className="relative p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary flex items-center gap-3">
                <Crown className="w-8 h-8"/> Admin Panel
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">Empire AI — Kontrollcenter</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {[
                  { label:"Totalt", value:animatedTotal, color:"text-primary" },
                  { label:"Online", value:onlineCount, color:"text-green-500" },
                  { label:"Nya idag", value:stats.today, color:"text-orange-500" },
                  { label:"Admins", value:adminsCount, color:"text-purple-500" },
                  { label:"Quiz-frågor", value:quizQuestions.length, color:"text-blue-500" },
                ].map(({ label,value,color }) => (
                  <div key={label} className="bg-card/70 backdrop-blur border border-border rounded-xl px-4 py-2 text-center min-w-16">
                    <div className={`text-xl font-serif ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <Download className="w-4 h-4"/> Export
              </button>
              <button onClick={() => { fetchUsers(); fetchLeaderboard(); }} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <RefreshCw className={`w-4 h-4 ${loading?"animate-spin":""}`}/> Uppdatera
              </button>
            </div>
          </div>
        </div>
      </div>
 
      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-5">
 
        {/* TABS */}
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {([
            { key:"users", label:"Användare", icon:Users },
            { key:"stats", label:"Statistik", icon:BarChart2 },
            { key:"leaderboard", label:"Leaderboard", icon:Trophy },
            { key:"quiz", label:"Quiz", icon:BookOpen },
            { key:"content", label:"Innehåll", icon:PenLine },
            { key:"moderation", label:"Moderation", icon:Shield },
            { key:"logs", label:"Logg", icon:Activity },
            { key:"settings", label:"Inställningar", icon:Settings },
          ] as { key:Tab; label:string; icon:any }[]).map(({ key,label,icon:Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${tab===key?"border-primary text-primary":"border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-3.5 h-3.5"/> {label}
              {key==="quiz" && quizQuestions.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-medium">{quizQuestions.length}</span>
              )}
            </button>
          ))}
        </div>
 
        {/* ══ ANVÄNDARE ══ */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label:"Totalt", value:users.length, icon:Users, color:"text-blue-500" },
                { label:"Online nu", value:onlineCount, icon:Wifi, color:"text-green-500" },
                { label:"Admins", value:adminsCount, icon:Shield, color:"text-purple-500" },
                { label:"Denna vecka", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500" },
              ].map(({ label,value,icon:Icon,color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground"/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Sök namn eller email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"/>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all","admin","user","online"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-2 rounded-xl text-sm border transition-colors ${filter===f?"bg-primary text-primary-foreground border-primary":"border-border hover:bg-secondary"}`}>
                    {f==="all"?"Alla":f==="admin"?"Admins":f==="user"?"Användare":"Online"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk} className="px-3 py-2 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5"/> Ta bort {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>
            {loading ? (
              <div className="space-y-3">{[1,2,3,4,5].map(i=>(
                <div key={i} className="bg-card border border-border rounded-2xl p-4 animate-pulse">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-secondary"/><div className="flex-1 space-y-2"><div className="h-3 bg-secondary rounded w-1/3"/><div className="h-3 bg-secondary rounded w-1/2"/></div></div>
                </div>
              ))}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                <p className="font-medium">Inga användare hittades</p>
                <p className="text-xs mt-1">Prova att ändra sökterm eller filter</p>
              </div>
            ) : (
              <>
                <div className="md:hidden space-y-3">
                  {filtered.map((user, i) => (
                    <div key={user.id} onClick={() => setSelectedUser(user)}
                      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${selectedUsers.includes(user.id)?"border-primary":"border-border"} ${user.is_banned?"opacity-60":""}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedUsers.includes(user.id)}
                          onChange={e=>{e.stopPropagation();setSelectedUsers(p=>p.includes(user.id)?p.filter(x=>x!==user.id):[...p,user.id]);}}
                          className="w-4 h-4" onClick={e=>e.stopPropagation()}/>
                        <div className="relative">
                          <Avatar user={user} size="md" colorIndex={i}/>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${user.is_online?"bg-green-500":"bg-gray-400"}`}/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role==="admin"?"bg-purple-100 text-purple-800":"bg-secondary text-muted-foreground"}`}>{user.role}</span>
                          <span className="text-xs text-yellow-500">{user.xp} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/50">
                        <th className="px-4 py-3 w-8">
                          <input type="checkbox" checked={selectedUsers.length===filtered.length&&filtered.length>0}
                            onChange={()=>setSelectedUsers(p=>p.length===filtered.length?[]:filtered.map(u=>u.id))} className="w-4 h-4"/>
                        </th>
                        {([["display_name","Namn"],["email","E-post"],["role","Roll"],["xp","XP"],["created_at","Registrerad"]] as [SortField,string][]).map(([field,label])=>(
                          <th key={field} className="text-left px-4 py-3 font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={()=>{if(sortField===field)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortField(field);setSortDir("asc");}}}>
                            <span className="flex items-center">{label}<SortIcon field={field}/></span>
                          </th>
                        ))}
                        <th className="text-center px-4 py-3 font-normal text-muted-foreground">Åtgärder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((user,i)=>(
                        <tr key={user.id}
                          className={`border-b last:border-0 transition-colors hover:bg-secondary/20 cursor-pointer ${selectedUsers.includes(user.id)?"bg-primary/5":""} ${user.is_banned?"opacity-60":""}`}
                          onClick={()=>setSelectedUser(user)}>
                          <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                            <input type="checkbox" checked={selectedUsers.includes(user.id)}
                              onChange={()=>setSelectedUsers(p=>p.includes(user.id)?p.filter(x=>x!==user.id):[...p,user.id])} className="w-4 h-4"/>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <Avatar user={user} size="sm" colorIndex={i}/>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${user.is_online?"bg-green-500":"bg-gray-400"}`}/>
                              </div>
                              <span className="font-medium">{user.display_name}</span>
                              {user.is_banned&&<span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-xs">Ban</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${user.role==="admin"?"bg-purple-100 text-purple-800":"bg-secondary text-muted-foreground border border-border"}`}>
                              {user.role==="admin"&&<Shield className="w-3 h-3"/>}{user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3"><span className="text-yellow-500 font-medium">{user.xp}</span></td>
                          <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                            {user.created_at?new Date(user.created_at).toLocaleDateString("sv-SE"):"—"}
                          </td>
                          <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={()=>setSelectedUser(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5"/></button>
                              <button onClick={()=>toggleAdmin(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Shield className="w-3.5 h-3.5 text-purple-500"/></button>
                              <button onClick={()=>banUser(user)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors"><Ban className="w-3.5 h-3.5 text-orange-500"/></button>
                              <button onClick={()=>deleteUser(user.id,user.email)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500"/></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground text-center">{filtered.length} av {users.length} användare</p>
              </>
            )}
          </div>
        )}
 
        {/* ══ STATISTIK ══ */}
        {tab === "stats" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label:"Aktiva idag", value:stats.activeToday, icon:Activity, color:"text-green-500", sub:"online just nu" },
                { label:"Nya idag", value:stats.today, icon:Calendar, color:"text-blue-500", sub:"registreringar" },
                { label:"Denna vecka", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500", sub:"nya användare" },
                { label:"Tillväxt", value:`+${stats.growthPercent}%`, icon:Star, color:"text-yellow-500", sub:"vs förra månaden" },
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
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-purple-500"/> Rollfördelning</h2>
                {[
                  { label:"Admins", count:adminsCount, color:"#7F77DD" },
                  { label:"Användare", count:users.length-adminsCount, color:"#1D9E75" },
                  { label:"Online nu", count:onlineCount, color:"#378ADD" },
                ].map(({ label,count,color }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count} ({users.length>0?Math.round((count/users.length)*100):0}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{ width:`${users.length>0?(count/users.length)*100:0}%`, background:color }}/>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-500"/> Detaljerad översikt</h2>
                {[
                  { label:"Totalt registrerade", value:users.length },
                  { label:"Online just nu", value:onlineCount },
                  { label:"Admins", value:adminsCount },
                  { label:"Nya idag", value:stats.today },
                  { label:"Nya denna vecka", value:stats.thisWeek },
                  { label:"Nya denna månad", value:stats.thisMonth },
                  { label:"Quiz-frågor totalt", value:quizQuestions.length },
                  { label:"Saknar översättning", value:missingTranslations },
                  { label:"Genomsnittlig XP", value:users.length?Math.round(users.reduce((a,u)=>a+(u.xp||0),0)/users.length):0 },
                ].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500"/> AI Insights</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label:"Mest frågat ämne", value:"Osmanska riket", icon:"🏰" },
                  { label:"Populäraste quiz", value:"Romarriket", icon:"📚" },
                  { label:"Peak-tid", value:"20:00 - 22:00", icon:"⏰" },
                  { label:"Snitt session", value:"12 min", icon:"📊" },
                  { label:"Quiz completion", value:"73%", icon:"✅" },
                  { label:"Returnerade idag", value:`${Math.floor(onlineCount*0.6)}`, icon:"🔄" },
                ].map(({ label,value,icon }) => (
                  <div key={label} className="bg-secondary/50 rounded-xl p-4">
                    <div className="text-2xl mb-1">{icon}</div>
                    <p className="font-medium text-sm">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2"><Clock className="w-4 h-4 text-teal-500"/> Senaste registreringar</h2>
              </div>
              {users.slice(0,6).map((u,i)=>(
                <div key={u.id} className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer" onClick={()=>setSelectedUser(u)}>
                  <div className="relative">
                    <Avatar user={u} size="sm" colorIndex={i}/>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${u.is_online?"bg-green-500":"bg-gray-400"}`}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-yellow-500 font-medium">{u.xp} XP</p>
                    <p className="text-xs text-muted-foreground">{u.created_at?new Date(u.created_at).toLocaleDateString("sv-SE"):"—"}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground"/>
                </div>
              ))}
            </div>
          </div>
        )}
 
        {/* ══ LEADERBOARD ══ */}
        {tab === "leaderboard" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                {(["alltime","week","today"] as LeaderboardPeriod[]).map(p=>(
                  <button key={p} onClick={()=>setLeaderboardPeriod(p)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${leaderboardPeriod===p?"bg-primary text-primary-foreground border-primary":"border-border hover:bg-secondary"}`}>
                    {p==="alltime"?"🏆 All time":p==="week"?"📅 Vecka":"☀️ Idag"}
                  </button>
                ))}
              </div>
              <button onClick={shareLeaderboard} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
                <Share2 className="w-4 h-4"/> Dela
              </button>
            </div>
 
            <div className="rounded-3xl overflow-hidden" style={{ background:"linear-gradient(135deg, #0a0612 0%, #1a0a08 50%, #0a0612 100%)", border:"1px solid rgba(200,169,110,0.25)" }}>
              <div className="px-6 pt-6 pb-4 text-center" style={{ borderBottom:"1px solid rgba(200,169,110,0.15)" }}>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Crown className="w-5 h-5" style={{ color:"#c8a96e" }}/>
                  <span className="text-lg font-serif" style={{ color:"#c8a96e" }}>Empire AI</span>
                  <Crown className="w-5 h-5" style={{ color:"#c8a96e" }}/>
                </div>
                <p className="text-xs" style={{ color:"rgba(200,169,110,0.55)" }}>
                  {leaderboardPeriod==="alltime"?"All-Time Champions":leaderboardPeriod==="week"?"This Week's Heroes":"Today's Warriors"}
                </p>
              </div>
              {leaderboard.length >= 3 && (
                <div className="px-4 pt-6 pb-2">
                  <div className="flex items-end justify-center gap-3">
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center text-base font-bold text-white" style={{ borderColor:"#aaa", background:leaderboard[1].avatar_url?undefined:avatarColors[1] }}>
                          {leaderboard[1].avatar_url?<img src={leaderboard[1].avatar_url} className="w-full h-full object-cover" alt=""/>:initials(leaderboard[1].display_name)}
                        </div>
                        <span className="absolute -top-2 -right-2 text-xl">🥈</span>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-white truncate max-w-20">{leaderboard[1].display_name}</p>
                        <p className="text-xs font-bold" style={{ color:"#aaa" }}>{leaderboard[1].xp} XP</p>
                      </div>
                      <div className="w-full rounded-t-xl flex items-end justify-center py-3" style={{ background:"rgba(170,170,170,0.12)", minHeight:"60px", border:"1px solid rgba(170,170,170,0.18)", borderBottom:"none" }}>
                        <span className="text-2xl font-serif" style={{ color:"rgba(255,255,255,0.2)" }}>2</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="relative">
                        <div className="rounded-full overflow-hidden flex items-center justify-center text-lg font-bold text-white" style={{ width:72, height:72, border:"3px solid #c8a96e", background:leaderboard[0].avatar_url?undefined:avatarColors[0], boxShadow:"0 0 24px rgba(200,169,110,0.45)" }}>
                          {leaderboard[0].avatar_url?<img src={leaderboard[0].avatar_url} className="w-full h-full object-cover" alt=""/>:initials(leaderboard[0].display_name)}
                        </div>
                        <span className="absolute -top-3 -right-2 text-2xl">🥇</span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-white truncate max-w-24">{leaderboard[0].display_name}</p>
                        <p className="text-sm font-bold" style={{ color:"#c8a96e" }}>{leaderboard[0].xp} XP</p>
                      </div>
                      <div className="w-full rounded-t-xl flex items-end justify-center py-4" style={{ background:"rgba(200,169,110,0.18)", minHeight:"88px", border:"1px solid rgba(200,169,110,0.28)", borderBottom:"none" }}>
                        <Crown className="w-5 h-5" style={{ color:"rgba(200,169,110,0.45)" }}/>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 flex items-center justify-center text-base font-bold text-white" style={{ borderColor:"#cd7f32", background:leaderboard[2].avatar_url?undefined:avatarColors[2] }}>
                          {leaderboard[2].avatar_url?<img src={leaderboard[2].avatar_url} className="w-full h-full object-cover" alt=""/>:initials(leaderboard[2].display_name)}
                        </div>
                        <span className="absolute -top-2 -right-2 text-xl">🥉</span>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-white truncate max-w-20">{leaderboard[2].display_name}</p>
                        <p className="text-xs font-bold" style={{ color:"#cd7f32" }}>{leaderboard[2].xp} XP</p>
                      </div>
                      <div className="w-full rounded-t-xl flex items-end justify-center py-2" style={{ background:"rgba(205,127,50,0.12)", minHeight:"44px", border:"1px solid rgba(205,127,50,0.18)", borderBottom:"none" }}>
                        <span className="text-2xl font-serif" style={{ color:"rgba(255,255,255,0.2)" }}>3</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="px-4 pb-4 space-y-1.5">
                {leaderboard.slice(3).map((u,i)=>(
                  <div key={u.id} onClick={()=>setSelectedUser(u)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]"
                    style={{ background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.07)" }}>
                    <span className="text-sm font-serif w-5 text-center" style={{ color:"rgba(200,169,110,0.6)" }}>{i+4}</span>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background:u.avatar_url?undefined:avatarColors[(i+3)%avatarColors.length] }}>
                      {u.avatar_url?<img src={u.avatar_url} className="w-full h-full object-cover" alt=""/>:initials(u.display_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{u.display_name}</p>
                      <p className="text-[10px]" style={{ color:"rgba(255,255,255,0.35)" }}>{u.questions_asked} frågor · {u.quiz_score}% quiz</p>
                    </div>
                    <div className="flex items-center gap-1" style={{ color:"#c8a96e" }}>
                      <Zap className="w-3 h-3"/>
                      <span className="text-sm font-serif tabular-nums">{u.xp}</span>
                      <span className="text-[10px]" style={{ color:"rgba(200,169,110,0.5)" }}>XP</span>
                    </div>
                    <div className="w-16 hidden sm:block">
                      <div className="h-1 rounded-full overflow-hidden" style={{ background:"rgba(255,255,255,0.08)" }}>
                        <div className="h-full rounded-full" style={{ width:`${leaderboard[0]?.xp?Math.round(((u.xp||0)/leaderboard[0].xp!)*100):0}%`, background:"#c8a96e" }}/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 text-center" style={{ borderTop:"1px solid rgba(200,169,110,0.12)" }}>
                <p className="text-[10px]" style={{ color:"rgba(200,169,110,0.35)" }}>empireai10.vercel.app · {new Date().toLocaleDateString("sv-SE")}</p>
              </div>
            </div>
 
            <div className="grid grid-cols-2 gap-3">
              <button onClick={shareLeaderboard} className="py-3 rounded-2xl border border-border hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4"/> 📱 Dela på Instagram
              </button>
              <button onClick={shareLeaderboard} className="py-3 rounded-2xl border border-border hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4"/> 🎵 Dela på TikTok
              </button>
            </div>
          </div>
        )}
 
        {/* ══ QUIZ ══ */}
        {tab === "quiz" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <select value={quizEmpire} onChange={e=>{setQuizEmpire(e.target.value);setQuizPage(0);}}
                  className="px-3 py-2 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary">
                  {EMPIRE_OPTIONS.map(e=><option key={e} value={e}>{e.charAt(0).toUpperCase()+e.slice(1)}</option>)}
                </select>
                <span className="text-sm text-muted-foreground">{quizQuestions.length} frågor totalt</span>
                {missingTranslations > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-600 text-xs font-medium">{missingTranslations} saknar SV/TR</span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {missingTranslations > 0 && (
                  <button onClick={translateMissing} disabled={translatingAll}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors disabled:opacity-50">
                    {translatingAll?<Loader2 className="w-4 h-4 animate-spin"/>:<Languages className="w-4 h-4"/>}
                    Översätt saknade
                  </button>
                )}
                <button onClick={()=>setAddingQ(v=>!v)} className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-sm">
                  <Plus className="w-4 h-4"/> Lägg till fråga
                </button>
              </div>
            </div>
 
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground"/>
              <input value={quizSearch} onChange={e=>{setQuizSearch(e.target.value);setQuizPage(0);}} placeholder="Sök bland frågor..."
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"/>
            </div>
 
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
              <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"/>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Auto-översättning:</strong> Skriv frågor på engelska. AI genererar SV och TR automatiskt vid sparning. Quizzen väljer 12 slumpmässiga frågor per session, max 3 spel per dag.
              </p>
            </div>
 
            {addingQ && (
              <QuestionForm
                q={{ ...newQ, empire_id: quizEmpire }}
                onChange={q => setNewQ(q)}
                onSave={() => saveQuestion({ ...newQ, empire_id: quizEmpire })}
                onCancel={() => setAddingQ(false)}
                savingQ={savingQ}
              />
            )}
 
            {loadingQuiz ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/></div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="font-medium text-sm">{quizSearch ? "Inga frågor matchar sökningen" : "Inga frågor ännu"}</p>
                <p className="text-xs mt-1">{quizSearch ? "Prova ett annat sökord" : "Lägg till din första fråga ovan"}</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {pagedQuestions.map((q,i)=>(
                    <div key={q.id||i}>
                      {editingQ?.id===q.id ? (
                        <QuestionForm
                          q={editingQ}
                          onChange={setEditingQ}
                          onSave={() => saveQuestion(editingQ)}
                          onCancel={() => setEditingQ(null)}
                          savingQ={savingQ}
                        />
                      ) : (
                        <div className={`bg-card border rounded-2xl p-4 transition-all ${q.translating?"opacity-60 animate-pulse border-primary/30":"border-border"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                <span className="text-xs text-muted-foreground">#{quizPage*QUIZ_PAGE_SIZE+i+1}</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground capitalize">{q.empire_id}</span>
                                {q.translating&&<span className="text-xs text-primary flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin"/> översätter...</span>}
                                {!q.question_sv&&!q.translating&&<span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600">saknar SV/TR</span>}
                                {q.question_sv&&<span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-600">✓ översatt</span>}
                              </div>
                              <p className="text-sm font-sans text-foreground leading-relaxed">{q.question_en}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {q.options_en.map((opt,oi)=>(
                                  <span key={oi} className={`text-xs px-2 py-0.5 rounded-lg ${oi===q.correct_index?"bg-green-500/15 text-green-600 font-medium border border-green-500/20":"bg-secondary text-muted-foreground"}`}>
                                    {String.fromCharCode(65+oi)}. {opt}
                                  </span>
                                ))}
                              </div>
                              {q.explanation_en&&<p className="text-[11px] text-muted-foreground mt-1.5 italic">💡 {q.explanation_en}</p>}
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button onClick={()=>setEditingQ(q)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground"/></button>
                              <button onClick={()=>q.id&&deleteQuestion(q.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500"/></button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={()=>setQuizPage(p=>Math.max(0,p-1))} disabled={quizPage===0}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors"><ChevronLeft className="w-4 h-4"/></button>
                    <span className="text-sm text-muted-foreground">{quizPage+1} / {totalPages} · {filteredQuestions.length} frågor</span>
                    <button onClick={()=>setQuizPage(p=>Math.min(totalPages-1,p+1))} disabled={quizPage===totalPages-1}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors"><ChevronRight className="w-4 h-4"/></button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
 
        {/* ══ INNEHÅLL ══ */}
        {tab === "content" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-sm font-medium text-foreground">Innehållshantering</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Meddelanden, tips och historiska fakta som visas i appen</p>
              </div>
              <button onClick={()=>setAddingContent(v=>!v)} className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-sm">
                <Plus className="w-4 h-4"/> Nytt innehåll
              </button>
            </div>
 
            {addingContent && (
              <div className="bg-card border border-primary/30 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium flex items-center gap-2"><PenLine className="w-4 h-4 text-primary"/> Nytt innehåll</h3>
                  <button onClick={()=>setAddingContent(false)}><X className="w-4 h-4 text-muted-foreground"/></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Typ</label>
                    <select value={newContent.type} onChange={e=>setNewContent(p=>({...p,type:e.target.value as any}))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary">
                      <option value="announcement">📢 Meddelande</option>
                      <option value="tip">💡 Tips</option>
                      <option value="fact">🏛️ Historisk fakta</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Empire</label>
                    <select value={newContent.empire_id} onChange={e=>setNewContent(p=>({...p,empire_id:e.target.value}))}
                      className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary">
                      <option value="ottoman">Ottoman</option>
                      <option value="roman">Roman</option>
                      <option value="both">Båda</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Text (engelska)</label>
                  <textarea value={newContent.text_en} onChange={e=>setNewContent(p=>({...p,text_en:e.target.value}))}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-20"
                    placeholder="Skriv innehållet på engelska..."/>
                </div>
                <div className="flex items-start gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
                  <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"/>
                  <p className="text-xs text-muted-foreground">Svenska och turkiska genereras automatiskt av AI.</p>
                </div>
                <button onClick={saveContent} disabled={savingContent||!newContent.text_en.trim()}
                  className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2">
                  {savingContent?<><Loader2 className="w-4 h-4 animate-spin"/> Sparar...</>:"Spara & översätt"}
                </button>
              </div>
            )}
 
            {loadingContent ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground"/></div>
            ) : contentItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <PenLine className="w-10 h-10 mx-auto mb-3 opacity-20"/>
                <p className="font-medium text-sm">Inget innehåll ännu</p>
                <p className="text-xs mt-1">Lägg till meddelanden, tips eller historiska fakta</p>
              </div>
            ) : (
              <div className="space-y-2">
                {contentItems.map(item => (
                  <div key={item.id} className={`bg-card border rounded-2xl p-4 transition-all ${item.active?"border-border":"border-border opacity-50"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                            {item.type==="announcement"?"📢":item.type==="tip"?"💡":"🏛️"} {item.type}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-muted-foreground capitalize">{item.empire_id}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${item.active?"bg-green-500/15 text-green-600":"bg-secondary text-muted-foreground"}`}>
                            {item.active?"● Aktiv":"○ Inaktiv"}
                          </span>
                          {item.text_sv && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-600">✓ översatt</span>}
                        </div>
                        <p className="text-sm font-sans text-foreground leading-relaxed">{item.text_en}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {new Date(item.created_at).toLocaleDateString("sv-SE")}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={()=>toggleContent(item)} className={`p-1.5 rounded-lg transition-colors ${item.active?"hover:bg-yellow-50":"hover:bg-green-50"}`}>
                          {item.active
                            ? <EyeOff className="w-3.5 h-3.5 text-yellow-500"/>
                            : <Eye className="w-3.5 h-3.5 text-green-500"/>}
                        </button>
                        <button onClick={()=>deleteContent(item.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">
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
 
        {/* ══ MODERATION ══ */}
        {tab === "moderation" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2"><Shield className="w-4 h-4 text-red-500"/> Blockerade ord</h2>
              <p className="text-xs text-muted-foreground">Ord separerade med komma. Frågor med dessa ord flaggas automatiskt.</p>
              <textarea value={blockedWords} onChange={e=>setBlockedWords(e.target.value)}
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-20"/>
              <button onClick={()=>{showToast("Sparad!");addLog("Blockade ord uppdaterade","warn");}}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm">Spara</button>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-yellow-500"/> Flaggade händelser</h2>
              </div>
              {[
                { user:"användare_x", msg:"Försökte ställa en olämplig fråga", time:"2 min sedan", level:"warn" },
                { user:"användare_y", msg:"Misslyckades 5 gånger i rad på quiz", time:"15 min sedan", level:"info" },
                { user:"okänd", msg:"Ovanlig inloggning från ny enhet", time:"1h sedan", level:"error" },
              ].map((item,i)=>(
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.level==="error"?"bg-red-500":item.level==="warn"?"bg-yellow-500":"bg-blue-500"}`}/>
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">{item.user}</span> — {item.msg}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:bg-secondary transition-colors">Åtgärda</button>
                </div>
              ))}
            </div>
            <div className="bg-card border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-sm font-medium flex items-center gap-2 mb-4 text-red-500"><AlertTriangle className="w-4 h-4"/> Farlig zon</h2>
              <div className="space-y-2">
                <button onClick={()=>showToast("Alla sessioner återkallades","success")}
                  className="w-full py-2 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors">
                  Återkalla alla aktiva sessioner
                </button>
                <button onClick={()=>showToast("Funktion inaktiverad i demo","error")}
                  className="w-full py-2 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors">
                  Rensa alla icke-admin användare
                </button>
              </div>
            </div>
          </div>
        )}
 
        {/* ══ LOGG ══ */}
        {tab === "logs" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-500"/> Aktivitetslogg
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{logs.length}</span>
              </h2>
              <button onClick={()=>setLogs([])} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">Rensa</button>
            </div>
            {logs.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground"><Activity className="w-8 h-8 mx-auto mb-2 opacity-20"/><p className="text-sm">Inga händelser ännu</p></div>
            ) : (
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {logs.map(log=>(
                  <div key={log.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/20 transition-colors">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${logColor(log.type)}`}/>
                    <span className="text-xs text-muted-foreground tabular-nums w-16 flex-shrink-0">{log.time}</span>
                    <span className="text-sm">{log.msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
 
        {/* ══ INSTÄLLNINGAR ══ */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2"><Bell className="w-4 h-4 text-orange-500"/> Systemmeddelande</h2>
              <textarea value={announcement} onChange={e=>setAnnouncement(e.target.value)}
                placeholder="Skriv ett meddelande till alla användare..."
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-24"/>
              <button onClick={()=>{showToast("Meddelande skickat!");addLog(`Meddelande: "${announcement.slice(0,40)}..."`, "success");setAnnouncement("");}}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90">
                Skicka till alla
              </button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-500"/> Systeminformation</h2>
              <div className="space-y-0 text-sm">
                {[
                  { label:"Supabase URL", value:import.meta.env.VITE_SUPABASE_URL },
                  { label:"Miljö", value:"Production" },
                  { label:"Totalt användare", value:String(users.length) },
                  { label:"Admins", value:String(adminsCount) },
                  { label:"Quiz-frågor", value:String(quizQuestions.length) },
                  { label:"Innehållsobjekt", value:String(contentItems.length) },
                ].map(({ label,value })=>(
                  <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-48">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2.5 items-center">
                  <span className="text-muted-foreground">Service Key</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{showSecret?(import.meta.env.VITE_SUPABASE_SERVICE_KEY?.slice(0,15)+"..."):"••••••••••••••••"}</span>
                    <button onClick={()=>setShowSecret(!showSecret)}>{showSecret?<EyeOff className="w-3.5 h-3.5"/>:<Eye className="w-3.5 h-3.5"/>}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
 
      </div>
    </div>
  );
}
 
