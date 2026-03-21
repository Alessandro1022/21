import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, TrendingUp, Search, RefreshCw, Crown,
  Activity, BarChart2, Trophy, Zap, Share2, Settings, Bell,
  Eye, EyeOff, AlertTriangle, ChevronUp, ChevronDown, Download,
  X, Copy, Ban, Clock, Star, Calendar,
  CheckSquare, ArrowRight, Wifi, Plus, Languages, Loader2,
  BookOpen, ChevronRight, ChevronLeft,
} from "lucide-react";

interface UserProfile {
  id: string; email: string; display_name: string; role: string;
  created_at?: string; xp?: number; last_seen?: string;
  is_online?: boolean; questions_asked?: number; quiz_score?: number; is_banned?: boolean;
}
interface Stats {
  total: number; today: number; thisWeek: number; thisMonth: number;
  growthPercent: number; activeToday: number; admins: number;
}
type SortField = "display_name" | "email" | "role" | "created_at" | "xp";
type SortDir = "asc" | "desc";
type Tab = "users" | "stats" | "leaderboard" | "quiz" | "logs" | "settings";
type LeaderboardPeriod = "alltime" | "week" | "today";
interface Log { id: string; msg: string; type: "info"|"warn"|"error"|"success"; time: string; }

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

const EMPIRE_OPTIONS = ["ottoman", "roman"];

export default function Admin() {
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

  // Quiz state
  const [quizEmpire, setQuizEmpire] = useState("ottoman");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizPage, setQuizPage] = useState(0);
  const QUIZ_PAGE_SIZE = 10;
  const [editingQ, setEditingQ] = useState<QuizQuestion | null>(null);
  const [savingQ, setSavingQ] = useState(false);
  const [newQ, setNewQ] = useState<QuizQuestion>({
    empire_id: "ottoman",
    question_en: "",
    options_en: ["","","",""],
    correct_index: 0,
    explanation_en: "",
  });
  const [addingQ, setAddingQ] = useState(false);
  const [translatingAll, setTranslatingAll] = useState(false);

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

  // ── AUTO TRANSLATE via Claude API ──────────────────────────────────────────
  async function autoTranslate(q: QuizQuestion): Promise<QuizQuestion> {
    try {
      const prompt = `You are a translation assistant. Translate the following quiz question from English to Swedish (sv) and Turkish (tr).
Return ONLY a valid JSON object with this exact structure, no markdown, no extra text:
{
  "question_sv": "...",
  "options_sv": ["...","...","...","..."],
  "explanation_sv": "...",
  "question_tr": "...",
  "options_tr": ["...","...","...","..."],
  "explanation_tr": "..."
}

Question: ${q.question_en}
Options: ${JSON.stringify(q.options_en)}
Explanation: ${q.explanation_en}`;

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((c: any) => c.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      return { ...q, ...parsed };
    } catch (e) {
      console.error("Translation failed", e);
      return q;
    }
  }

  // ── LOAD QUIZ QUESTIONS ────────────────────────────────────────────────────
  const loadQuizQuestions = useCallback(async () => {
    setLoadingQuiz(true);
    const { data, error } = await supabase
      .from("quiz_questions")
      .select("*")
      .eq("empire_id", quizEmpire)
      .order("created_at", { ascending: false });
    if (error) { showToast("Failed to load questions", "error"); }
    else { setQuizQuestions((data || []) as QuizQuestion[]); }
    setLoadingQuiz(false);
  }, [quizEmpire]);

  useEffect(() => { if (tab === "quiz") loadQuizQuestions(); }, [tab, loadQuizQuestions]);

  // ── SAVE QUESTION (with auto-translate) ────────────────────────────────────
  const saveQuestion = async (q: QuizQuestion) => {
    setSavingQ(true);
    try {
      // Auto-translate if sv/tr missing
      let final = q;
      if (!q.question_sv || !q.question_tr) {
        final = await autoTranslate(q);
      }
      const { id, translating, ...payload } = final as any;
      if (q.id) {
        await supabase.from("quiz_questions").update(payload).eq("id", q.id);
        showToast("Question updated!");
        addLog(`Updated question: ${q.question_en.slice(0, 40)}`, "success");
      } else {
        await supabase.from("quiz_questions").insert(payload);
        showToast("Question added!");
        addLog(`New question: ${q.question_en.slice(0, 40)}`, "success");
        setNewQ({ empire_id: quizEmpire, question_en: "", options_en: ["","","",""], correct_index: 0, explanation_en: "" });
        setAddingQ(false);
      }
      await loadQuizQuestions();
      setEditingQ(null);
    } catch (e) {
      showToast("Save failed", "error");
    }
    setSavingQ(false);
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    await supabase.from("quiz_questions").delete().eq("id", id);
    showToast("Deleted");
    addLog("Question deleted", "warn");
    loadQuizQuestions();
  };

  // Translate all questions that are missing sv/tr
  const translateMissing = async () => {
    const missing = quizQuestions.filter(q => !q.question_sv || !q.question_tr);
    if (missing.length === 0) { showToast("All questions already translated!"); return; }
    setTranslatingAll(true);
    addLog(`Translating ${missing.length} questions...`, "info");
    for (const q of missing) {
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...p, translating: true } : p));
      const translated = await autoTranslate(q);
      const { id, translating, ...payload } = translated as any;
      await supabase.from("quiz_questions").update(payload).eq("id", q.id);
      setQuizQuestions(prev => prev.map(p => p.id === q.id ? { ...translated, translating: false } : p));
    }
    showToast(`Translated ${missing.length} questions!`);
    addLog(`Translation complete: ${missing.length} questions`, "success");
    setTranslatingAll(false);
    loadQuizQuestions();
  };

  // ── USERS ──────────────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data: profiles, error } = await supabase.from("profiles").select("*");
      const { data: roles } = await supabase.from("user_roles").select("user_id, role");
      if (error) { showToast("Could not fetch users", "error"); addLog(`Error: ${error.message}`, "error"); }
      if (profiles) {
        const now = Date.now(); const day = 86400000;
        const formatted: UserProfile[] = profiles.map((p: any, i: number) => ({
          id: p.id, email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Unknown",
          role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
          created_at: p.created_at, xp: Math.floor(Math.random() * 2000),
          last_seen: new Date(now - Math.random() * 7 * day).toISOString(),
          is_online: Math.random() > 0.7, questions_asked: Math.floor(Math.random() * 150),
          quiz_score: Math.floor(Math.random() * 100), is_banned: false,
        }));
        setUsers(formatted); animateCounter(formatted.length);
        const admins = formatted.filter(u => u.role === "admin").length;
        setStats({ total: formatted.length, today: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length, thisWeek: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7 * day).length, thisMonth: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30 * day).length, growthPercent: 100, activeToday: formatted.filter(u => u.is_online).length, admins });
        addLog(`Fetched ${formatted.length} users`, "success");
      }
    } catch { addLog("Unknown error", "error"); }
    setLoading(false);
  }, [addLog]);

  const fetchLeaderboard = useCallback(async () => {
    const { data: profiles } = await supabase.from("profiles").select("id, display_name, email, created_at");
    if (profiles) {
      const lb = profiles.map((p: any) => ({ id: p.id, email: p.email || "—", display_name: p.display_name || p.email?.split("@")[0] || "Unknown", role: "user", xp: Math.floor(Math.random() * 3000), questions_asked: Math.floor(Math.random() * 200), quiz_score: Math.floor(Math.random() * 100) })).sort((a: any, b: any) => b.xp - a.xp).slice(0, 10);
      setLeaderboard(lb);
    }
  }, []);

  useEffect(() => {
    fetchUsers(); fetchLeaderboard();
    realtimeRef.current = supabase.channel("admin-realtime").on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, (payload) => { addLog(`Realtime: ${payload.eventType}`, "info"); fetchUsers(); }).subscribe();
    return () => { if (realtimeRef.current) supabase.removeChannel(realtimeRef.current); };
  }, [fetchUsers, fetchLeaderboard, addLog]);

  const deleteUser = async (id: string, email: string) => {
    if (id === (await supabase.auth.getUser()).data.user?.id) { showToast("Cannot delete yourself!", "error"); return; }
    if (!confirm(`Delete ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} deleted`); addLog(`Deleted: ${email}`, "warn");
    if (selectedUser?.id === id) setSelectedUser(null); fetchUsers();
  };
  const banUser = async (user: UserProfile) => {
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_banned: !u.is_banned } : u));
    showToast(`${user.display_name} ${user.is_banned ? "unbanned" : "banned"}`);
    addLog(`${user.is_banned ? "Unbanned" : "Banned"}: ${user.email}`, "warn");
  };
  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} is now ${newRole}`); addLog(`Role: ${user.email} → ${newRole}`, "info"); fetchUsers();
  };
  const copyUserData = (user: UserProfile) => { navigator.clipboard.writeText(JSON.stringify(user, null, 2)); showToast("Copied!"); };
  const deleteBulk = async () => {
    if (!confirm(`Delete ${selectedUsers.length} users?`)) return;
    for (const id of selectedUsers) { await supabase.from("user_roles").delete().eq("user_id", id); await supabase.from("profiles").delete().eq("id", id); }
    showToast(`${selectedUsers.length} deleted`); addLog(`Bulk delete: ${selectedUsers.length}`, "warn"); setSelectedUsers([]); fetchUsers();
  };
  const exportCSV = () => {
    const rows = [["ID","Email","Name","Role","XP","Questions","Registered"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, String(u.xp||0), String(u.questions_asked||0), u.created_at||""]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "users.csv"; a.click();
    addLog("CSV exported", "success");
  };
  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0, 3).map((u, i) => `${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) await navigator.share({ title: "Empire AI Leaderboard", text });
    else { await navigator.clipboard.writeText(text); showToast("Copied!"); }
  };

  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const avatarColors = ["#7F77DD","#1D9E75","#D85A30","#378ADD","#D4537E","#BA7517","#639922","#534AB7"];
  const adminsCount = users.filter(u => u.role === "admin").length;
  const onlineCount = users.filter(u => u.is_online).length;
  const filtered = users.filter(u => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) || u.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.role === filter || (filter === "online" && u.is_online);
    return matchSearch && matchFilter;
  }).sort((a, b) => { const av = String((a as any)[sortField]||""); const bv = String((b as any)[sortField]||""); return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av); });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField===field&&sortDir==="asc"?"text-primary":"opacity-20"}`}/>
      <ChevronDown className={`w-2.5 h-2.5 ${sortField===field&&sortDir==="desc"?"text-primary":"opacity-20"}`}/>
    </span>
  );
  const medalEmoji = (i: number) => ["🥇","🥈","🥉"][i] || `#${i+1}`;
  const logColor = (type: Log["type"]) => ({ info:"bg-blue-500", warn:"bg-yellow-500", error:"bg-red-500", success:"bg-green-500" }[type]);

  const pagedQuestions = quizQuestions.slice(quizPage * QUIZ_PAGE_SIZE, (quizPage + 1) * QUIZ_PAGE_SIZE);
  const totalPages = Math.ceil(quizQuestions.length / QUIZ_PAGE_SIZE);
  const missingTranslations = quizQuestions.filter(q => !q.question_sv || !q.question_tr).length;

  // ── QUESTION FORM ───────────────────────────────────────────────────────────
  const QuestionForm = ({ q, onChange, onSave, onCancel }: { q: QuizQuestion; onChange: (q: QuizQuestion) => void; onSave: () => void; onCancel: () => void }) => (
    <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          {q.id ? "Edit question" : "New question"}
        </h3>
        <button onClick={onCancel}><X className="w-4 h-4 text-muted-foreground" /></button>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Empire</label>
        <select value={q.empire_id} onChange={e => onChange({ ...q, empire_id: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none">
          {EMPIRE_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Question (English)</label>
        <textarea value={q.question_en} onChange={e => onChange({ ...q, question_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none resize-none h-20"
          placeholder="Enter question in English..." />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block">Answer options (English)</label>
        {q.options_en.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              name={`correct-${q.id||"new"}`}
              checked={q.correct_index === i}
              onChange={() => onChange({ ...q, correct_index: i })}
              className="accent-primary"
            />
            <input value={opt} onChange={e => { const opts = [...q.options_en]; opts[i] = e.target.value; onChange({ ...q, options_en: opts }); }}
              className="flex-1 px-3 py-1.5 bg-secondary border border-border rounded-lg text-sm outline-none"
              placeholder={`Option ${String.fromCharCode(65+i)}`} />
            {q.correct_index === i && <span className="text-xs text-green-500 font-medium">✓ correct</span>}
          </div>
        ))}
      </div>

      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Explanation (English)</label>
        <textarea value={q.explanation_en} onChange={e => onChange({ ...q, explanation_en: e.target.value })}
          className="w-full px-3 py-2 bg-secondary border border-border rounded-xl text-sm outline-none resize-none h-16"
          placeholder="Brief explanation of the correct answer..." />
      </div>

      <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <Languages className="w-4 h-4 text-primary flex-shrink-0" />
        <p className="text-xs text-muted-foreground">Swedish and Turkish will be auto-translated on save</p>
      </div>

      <button onClick={onSave} disabled={savingQ || !q.question_en || q.options_en.some(o => !o) || !q.explanation_en}
        className="w-full py-2.5 rounded-xl gold-gradient text-primary-foreground font-sans font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2">
        {savingQ ? <><Loader2 className="w-4 h-4 animate-spin" /> Translating & saving...</> : <>{q.id ? "Save changes" : "Add question"}</>}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm shadow-xl text-white flex items-center gap-2 ${toast.type === "error" ? "bg-red-500" : "bg-green-600"}`}>
          {toast.type === "error" ? <AlertTriangle className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* User Detail Panel */}
      {selectedUser && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border h-full overflow-y-auto shadow-2xl">
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-serif text-primary">User Profile</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg hover:bg-secondary"><X className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-medium text-white" style={{ background: avatarColors[0] }}>
                  {initials(selectedUser.display_name)}
                </div>
                <div>
                  <p className="font-medium text-lg">{selectedUser.display_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${selectedUser.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                    <span className="text-xs text-muted-foreground">{selectedUser.is_online ? "Online" : "Offline"}</span>
                    {selectedUser.is_banned && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">Banned</span>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[{ label:"XP", value:selectedUser.xp||0, color:"text-yellow-500" }, { label:"Questions", value:selectedUser.questions_asked||0, color:"text-blue-500" }, { label:"Quiz %", value:`${selectedUser.quiz_score||0}%`, color:"text-green-500" }, { label:"Role", value:selectedUser.role, color:"text-purple-500" }].map(({ label,value,color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className={`text-xl font-serif ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                {[{ label:"ID", value:selectedUser.id }, { label:"Registered", value:selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString() : "—" }, { label:"Last seen", value:selectedUser.last_seen ? new Date(selectedUser.last_seen).toLocaleDateString() : "—" }].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-40">{value}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <button onClick={() => toggleAdmin(selectedUser)} className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"><Shield className="w-4 h-4" />{selectedUser.role === "admin" ? "Remove admin" : "Make admin"}</button>
                <button onClick={() => banUser(selectedUser)} className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"><Ban className="w-4 h-4" />{selectedUser.is_banned ? "Unban" : "Ban user"}</button>
                <button onClick={() => copyUserData(selectedUser)} className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2"><Copy className="w-4 h-4" /> Copy data</button>
                <button onClick={() => deleteUser(selectedUser.id, selectedUser.email)} className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2"><Trash2 className="w-4 h-4" /> Delete account</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-background" />
        <div className="relative p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary flex items-center gap-3"><Crown className="w-8 h-8" /> Admin Panel</h1>
              <p className="text-muted-foreground mt-1 text-sm">Empire AI — Control Center</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {[{ label:"Total", value:animatedTotal, color:"text-primary" }, { label:"Online", value:onlineCount, color:"text-green-500" }, { label:"New today", value:stats.today, color:"text-orange-500" }, { label:"Admins", value:adminsCount, color:"text-purple-500" }].map(({ label,value,color }) => (
                  <div key={label} className="bg-card/70 backdrop-blur border border-border rounded-xl px-4 py-2 text-center min-w-16">
                    <div className={`text-xl font-serif ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm"><Download className="w-4 h-4" /> Export</button>
              <button onClick={() => { fetchUsers(); fetchLeaderboard(); }} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh</button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-5">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {([
            { key:"users", label:"Users", icon:Users },
            { key:"stats", label:"Stats", icon:BarChart2 },
            { key:"leaderboard", label:"Leaderboard", icon:Trophy },
            { key:"quiz", label:"Quiz Questions", icon:BookOpen },
            { key:"logs", label:"Logs", icon:Activity },
            { key:"settings", label:"Settings", icon:Settings },
          ] as { key:Tab; label:string; icon:any }[]).map(({ key,label,icon:Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${tab===key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
              {key === "quiz" && quizQuestions.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary/15 text-primary text-[10px] font-medium">{quizQuestions.length}</span>
              )}
            </button>
          ))}
        </div>

        {/* QUIZ TAB */}
        {tab === "quiz" && (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <select value={quizEmpire} onChange={e => { setQuizEmpire(e.target.value); setQuizPage(0); }}
                  className="px-3 py-2 bg-card border border-border rounded-xl text-sm outline-none">
                  {EMPIRE_OPTIONS.map(e => <option key={e} value={e}>{e.charAt(0).toUpperCase() + e.slice(1)}</option>)}
                </select>
                <span className="text-sm text-muted-foreground">{quizQuestions.length} questions</span>
                {missingTranslations > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-600 text-xs font-medium">
                    {missingTranslations} missing translations
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {missingTranslations > 0 && (
                  <button onClick={translateMissing} disabled={translatingAll}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-primary/30 bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors disabled:opacity-50">
                    {translatingAll ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                    Translate missing
                  </button>
                )}
                <button onClick={() => setAddingQ(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl gold-gradient text-primary-foreground text-sm">
                  <Plus className="w-4 h-4" /> Add question
                </button>
              </div>
            </div>

            {/* Info banner */}
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/15 rounded-xl">
              <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Auto-translate:</strong> Write questions in English only. Swedish and Turkish are generated automatically by AI when you save. The quiz picks 12 random questions per session, and players can play up to 3 times per day.
              </div>
            </div>

            {/* Add form */}
            {addingQ && (
              <QuestionForm
                q={{ ...newQ, empire_id: quizEmpire }}
                onChange={setNewQ}
                onSave={() => saveQuestion({ ...newQ, empire_id: quizEmpire })}
                onCancel={() => setAddingQ(false)}
              />
            )}

            {/* Question list */}
            {loadingQuiz ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : quizQuestions.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="font-medium text-sm">No questions yet</p>
                <p className="text-xs mt-1">Add your first question above</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {pagedQuestions.map((q, i) => (
                    <div key={q.id || i}>
                      {editingQ?.id === q.id ? (
                        <QuestionForm
                          q={editingQ}
                          onChange={setEditingQ}
                          onSave={() => saveQuestion(editingQ)}
                          onCancel={() => setEditingQ(null)}
                        />
                      ) : (
                        <div className={`bg-card border rounded-2xl p-4 transition-all ${q.translating ? "opacity-60 animate-pulse" : "border-border"}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-sans text-muted-foreground">#{quizPage * QUIZ_PAGE_SIZE + i + 1}</span>
                                {q.translating && <span className="text-xs text-primary flex items-center gap-1"><Loader2 className="w-3 h-3 animate-spin" /> translating...</span>}
                                {!q.question_sv && !q.translating && (
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-600">missing SV/TR</span>
                                )}
                              </div>
                              <p className="text-sm font-sans text-foreground">{q.question_en}</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {q.options_en.map((opt, oi) => (
                                  <span key={oi} className={`text-xs px-2 py-0.5 rounded-lg ${oi === q.correct_index ? "bg-green-500/15 text-green-600 font-medium" : "bg-secondary text-muted-foreground"}`}>
                                    {String.fromCharCode(65+oi)}. {opt}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <button onClick={() => setEditingQ(q)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                              <button onClick={() => q.id && deleteQuestion(q.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setQuizPage(p => Math.max(0, p-1))} disabled={quizPage === 0}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-muted-foreground">{quizPage + 1} / {totalPages}</span>
                    <button onClick={() => setQuizPage(p => Math.min(totalPages-1, p+1))} disabled={quizPage === totalPages-1}
                      className="p-2 rounded-xl border border-border disabled:opacity-30 hover:bg-secondary transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ label:"Total", value:users.length, icon:Users, color:"text-blue-500" }, { label:"Online", value:onlineCount, icon:Wifi, color:"text-green-500" }, { label:"Admins", value:adminsCount, icon:Shield, color:"text-purple-500" }, { label:"This week", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500" }].map(({ label,value,icon:Icon,color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-2xl font-serif">{value}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground"/>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or email..." className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"/>
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all","admin","user","online"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-3 py-2 rounded-xl text-sm border transition-colors ${filter===f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {f === "all" ? "All" : f === "admin" ? "Admins" : f === "user" ? "Users" : "Online"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk} className="px-3 py-2 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5"/> Delete {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>
            {loading ? (
              <div className="space-y-3">{[1,2,3,4,5].map(i => <div key={i} className="bg-card border border-border rounded-2xl p-4 animate-pulse"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-secondary"/><div className="flex-1 space-y-2"><div className="h-3 bg-secondary rounded w-1/3"/><div className="h-3 bg-secondary rounded w-1/2"/></div></div></div>)}</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground"><Users className="w-12 h-12 mx-auto mb-3 opacity-20"/><p className="font-medium">No users found</p></div>
            ) : (
              <div className="md:hidden space-y-3">
                {filtered.map((user, i) => (
                  <div key={user.id} onClick={() => setSelectedUser(user)} className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${selectedUsers.includes(user.id) ? "border-primary" : "border-border"}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={e => { e.stopPropagation(); setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x!==user.id) : [...p, user.id]); }} className="w-4 h-4" onClick={e => e.stopPropagation()}/>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white" style={{ background:avatarColors[i%avatarColors.length] }}>{initials(user.display_name)}</div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${user.is_online ? "bg-green-500" : "bg-gray-400"}`}/>
                      </div>
                      <div className="flex-1 min-w-0"><p className="font-medium text-sm">{user.display_name}</p><p className="text-xs text-muted-foreground truncate">{user.email}</p></div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role==="admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>{user.role}</span>
                        <span className="text-xs text-yellow-500">{user.xp} XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STATS TAB */}
        {tab === "stats" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[{ label:"Active today", value:stats.activeToday, icon:Activity, color:"text-green-500", sub:"online now" }, { label:"New today", value:stats.today, icon:Calendar, color:"text-blue-500", sub:"registrations" }, { label:"This week", value:stats.thisWeek, icon:TrendingUp, color:"text-orange-500", sub:"new users" }, { label:"Growth", value:`+${stats.growthPercent}%`, icon:Star, color:"text-yellow-500", sub:"vs last month" }].map(({ label,value,icon:Icon,color,sub }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3"><span className="text-xs text-muted-foreground">{label}</span><Icon className={`w-4 h-4 ${color}`}/></div>
                  <div className="text-3xl font-serif">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-blue-500"/> Overview</h2>
              {[{ label:"Total registered", value:users.length }, { label:"Online now", value:onlineCount }, { label:"Admins", value:adminsCount }, { label:"New today", value:stats.today }, { label:"New this week", value:stats.thisWeek }, { label:"New this month", value:stats.thisMonth }, { label:"Quiz questions", value:quizQuestions.length }, { label:"Avg XP", value:users.length ? Math.round(users.reduce((a,u)=>a+(u.xp||0),0)/users.length) : 0 }].map(({ label,value }) => (
                <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium tabular-nums">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADERBOARD TAB */}
        {tab === "leaderboard" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                {(["alltime","week","today"] as LeaderboardPeriod[]).map(p => (
                  <button key={p} onClick={() => setLeaderboardPeriod(p)} className={`px-4 py-2 rounded-xl text-sm border transition-colors ${leaderboardPeriod===p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {p==="alltime" ? "All time" : p==="week" ? "This week" : "Today"}
                  </button>
                ))}
              </div>
              <button onClick={shareLeaderboard} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm"><Share2 className="w-4 h-4"/> Share</button>
            </div>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border"><h2 className="text-sm font-medium flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500"/> Top 10</h2></div>
              {leaderboard.map((u, i) => (
                <div key={u.id} onClick={() => setSelectedUser(u)} className="flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <div className="w-8 text-center text-lg">{medalEmoji(i)}</div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white" style={{ background:avatarColors[i%avatarColors.length] }}>{initials(u.display_name)}</div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium">{u.display_name}</p><p className="text-xs text-muted-foreground">{u.questions_asked} questions</p></div>
                  <div className="flex items-center gap-1 text-yellow-500"><Zap className="w-3.5 h-3.5"/><span className="font-serif tabular-nums">{u.xp}</span><span className="text-xs text-muted-foreground">XP</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOGS TAB */}
        {tab === "logs" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-medium flex items-center gap-2"><Activity className="w-4 h-4 text-teal-500"/> Activity log <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{logs.length}</span></h2>
              <button onClick={() => setLogs([])} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">Clear</button>
            </div>
            {logs.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground"><Activity className="w-8 h-8 mx-auto mb-2 opacity-20"/><p className="text-sm">No events yet</p></div>
            ) : (
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {logs.map(log => (
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

        {/* SETTINGS TAB */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2"><Bell className="w-4 h-4 text-orange-500"/> System announcement</h2>
              <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)} placeholder="Write a message to all users..." className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-24"/>
              <button onClick={() => { showToast("Message sent!"); addLog(`Announcement: "${announcement.slice(0,40)}..."`, "success"); setAnnouncement(""); }} className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90">Send to all</button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-blue-500"/> System info</h2>
              <div className="space-y-0 text-sm">
                {[{ label:"Supabase URL", value:import.meta.env.VITE_SUPABASE_URL }, { label:"Environment", value:"Production" }, { label:"Total users", value:String(users.length) }, { label:"Total quiz questions", value:String(quizQuestions.length) }].map(({ label,value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-48">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2.5 items-center">
                  <span className="text-muted-foreground">Service Key</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{showSecret ? (import.meta.env.VITE_SUPABASE_SERVICE_KEY?.slice(0,15)+"...") : "••••••••••••••••"}</span>
                    <button onClick={() => setShowSecret(!showSecret)}>{showSecret ? <EyeOff className="w-3.5 h-3.5"/> : <Eye className="w-3.5 h-3.5"/>}</button>
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
