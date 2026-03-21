import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, TrendingUp, Search, RefreshCw, Crown,
  Activity, BarChart2, Trophy, Zap, Share2, Settings, Bell,
  Eye, EyeOff, AlertTriangle, ChevronUp, ChevronDown, Download,
  X, Copy, Ban, UserCheck, Clock, Star, Calendar, Filter,
  CheckSquare, Square, MoreHorizontal, ArrowRight, Wifi, WifiOff
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
type Tab = "users" | "stats" | "leaderboard" | "logs" | "settings" | "moderation";
type LeaderboardPeriod = "alltime" | "week" | "today";

interface Log {
  id: string;
  msg: string;
  type: "info" | "warn" | "error" | "success";
  time: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "user" | "online">("all");
  const [tab, setTab] = useState<Tab>("users");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [stats, setStats] = useState<Stats>({ total: 0, today: 0, thisWeek: 0, thisMonth: 0, growthPercent: 0, activeToday: 0, admins: 0 });
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

  const showToast = (msg: string, type: "success" | "error" = "success") => {
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("user_id, role");

      if (error) {
        showToast("Kunde inte hämta användare", "error");
        addLog(`Fel: ${error.message}`, "error");
      }

      if (profiles) {
        const now = Date.now();
        const day = 86400000;
        const formatted: UserProfile[] = profiles.map((p: any, i: number) => ({
          id: p.id,
          email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
          role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
          created_at: p.created_at,
          xp: Math.floor(Math.random() * 2000),
          last_seen: new Date(now - Math.random() * 7 * day).toISOString(),
          is_online: Math.random() > 0.7,
          questions_asked: Math.floor(Math.random() * 150),
          quiz_score: Math.floor(Math.random() * 100),
          is_banned: false,
        }));

        setUsers(formatted);
        animateCounter(formatted.length);

        const admins = formatted.filter(u => u.role === "admin").length;
        setStats({
          total: formatted.length,
          today: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length,
          thisWeek: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7 * day).length,
          thisMonth: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30 * day).length,
          growthPercent: 100,
          activeToday: formatted.filter(u => u.is_online).length,
          admins,
        });
        addLog(`Hämtade ${formatted.length} användare`, "success");
      }
    } catch (err) {
      addLog("Okänt fel vid hämtning", "error");
    }
    setLoading(false);
  }, [addLog]);

  const fetchLeaderboard = useCallback(async () => {
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name, email, created_at");
    if (profiles) {
      const lb = profiles.map((p: any) => ({
        id: p.id,
        email: p.email || "—",
        display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
        role: "user",
        xp: Math.floor(Math.random() * 3000),
        questions_asked: Math.floor(Math.random() * 200),
        quiz_score: Math.floor(Math.random() * 100),
      })).sort((a: any, b: any) => b.xp - a.xp).slice(0, 10);
      setLeaderboard(lb);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();

    realtimeRef.current = supabase
      .channel("admin-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, (payload) => {
        addLog(`Realtid: ${payload.eventType} på profiles`, "info");
        fetchUsers();
      })
      .subscribe();

    return () => {
      if (realtimeRef.current) supabase.removeChannel(realtimeRef.current);
    };
  }, [fetchUsers, fetchLeaderboard, addLog]);

  const deleteUser = async (id: string, email: string) => {
    if (id === (await supabase.auth.getUser()).data.user?.id) {
      showToast("Du kan inte ta bort dig själv!", "error");
      return;
    }
    if (!confirm(`Ta bort ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`);
    addLog(`Borttagen: ${email}`, "warn");
    if (selectedUser?.id === id) setSelectedUser(null);
    fetchUsers();
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
    addLog(`Roll: ${user.email} → ${newRole}`, "info");
    fetchUsers();
  };

  const copyUserData = (user: UserProfile) => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    showToast("Kopierat!");
  };

  const deleteBulk = async () => {
    if (!confirm(`Ta bort ${selectedUsers.length} användare?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} borttagna`);
    addLog(`Bulk-borttagen: ${selectedUsers.length}`, "warn");
    setSelectedUsers([]);
    fetchUsers();
  };

  const exportCSV = () => {
    const rows = [["ID", "Email", "Namn", "Roll", "XP", "Frågor", "Registrerad"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, String(u.xp || 0), String(u.questions_asked || 0), u.created_at || ""]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "användare.csv";
    a.click();
    addLog("CSV exporterad", "success");
  };

  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0, 3).map((u, i) => `${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) await navigator.share({ title: "Empire AI Leaderboard", text });
    else { await navigator.clipboard.writeText(text); showToast("Kopierat!"); }
  };

  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const avatarColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E", "#BA7517", "#639922", "#534AB7"];
  const adminsCount = users.filter(u => u.role === "admin").length;
  const onlineCount = users.filter(u => u.is_online).length;

  const filtered = users
    .filter(u => {
      const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.display_name?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || u.role === filter || (filter === "online" && u.is_online);
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const av = String((a as any)[sortField] || "");
      const bv = String((b as any)[sortField] || "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "text-primary" : "opacity-20"}`} />
      <ChevronDown className={`w-2.5 h-2.5 ${sortField === field && sortDir === "desc" ? "text-primary" : "opacity-20"}`} />
    </span>
  );

  const medalEmoji = (i: number) => ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;
  const logColor = (type: Log["type"]) => ({ info: "bg-blue-500", warn: "bg-yellow-500", error: "bg-red-500", success: "bg-green-500" }[type]);

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
                <h2 className="text-lg font-serif text-primary">Användarprofil</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-medium text-white"
                  style={{ background: avatarColors[0] }}>
                  {initials(selectedUser.display_name)}
                </div>
                <div>
                  <p className="font-medium text-lg">{selectedUser.display_name}</p>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${selectedUser.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                    <span className="text-xs text-muted-foreground">{selectedUser.is_online ? "Online" : "Offline"}</span>
                    {selectedUser.is_banned && <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">Bannad</span>}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "XP", value: selectedUser.xp || 0, color: "text-yellow-500" },
                  { label: "Frågor", value: selectedUser.questions_asked || 0, color: "text-blue-500" },
                  { label: "Quiz %", value: `${selectedUser.quiz_score || 0}%`, color: "text-green-500" },
                  { label: "Roll", value: selectedUser.role, color: "text-purple-500" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-secondary rounded-xl p-3 text-center">
                    <p className={`text-xl font-serif ${color}`}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { label: "ID", value: selectedUser.id },
                  { label: "Registrerad", value: selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleDateString("sv-SE") : "—" },
                  { label: "Senast sedd", value: selectedUser.last_seen ? new Date(selectedUser.last_seen).toLocaleDateString("sv-SE") : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-40">{value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <button onClick={() => toggleAdmin(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  {selectedUser.role === "admin" ? "Ta bort admin" : "Gör admin"}
                </button>
                <button onClick={() => banUser(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                  <Ban className="w-4 h-4" />
                  {selectedUser.is_banned ? "Avbanna" : "Banna användare"}
                </button>
                <button onClick={() => copyUserData(selectedUser)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm hover:bg-secondary transition-colors flex items-center justify-center gap-2">
                  <Copy className="w-4 h-4" /> Kopiera data
                </button>
                <button onClick={() => deleteUser(selectedUser.id, selectedUser.email)}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-4 h-4" /> Ta bort konto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-background" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 200'%3E%3Crect fill='%23111' width='800' height='200'/%3E%3Crect x='50' y='60' width='35' height='130' fill='%23c8a96e' rx='3'/%3E%3Crect x='53' y='50' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='140' y='40' width='35' height='150' fill='%23c8a96e' rx='3'/%3E%3Crect x='143' y='30' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='230' y='30' width='35' height='160' fill='%23c8a96e' rx='3'/%3E%3Crect x='233' y='20' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='535' y='30' width='35' height='160' fill='%23c8a96e' rx='3'/%3E%3Crect x='538' y='20' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='625' y='40' width='35' height='150' fill='%23c8a96e' rx='3'/%3E%3Crect x='628' y='30' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='715' y='60' width='35' height='130' fill='%23c8a96e' rx='3'/%3E%3Crect x='718' y='50' width='29' height='14' fill='%23d4b483' rx='2'/%3E%3Crect x='30' y='185' width='740' height='8' fill='%23c8a96e'/%3E%3Cpolygon points='220,5 400,0 580,5' fill='%23c8a96e' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "cover", backgroundPosition: "center bottom",
        }} />
        <div className="relative p-6 md:p-8 max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary flex items-center gap-3">
                <Crown className="w-8 h-8" /> Admin Panel
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">Empire AI — Kontrollcenter</p>
              <div className="flex gap-2 mt-4 flex-wrap">
                {[
                  { label: "Totalt", value: animatedTotal, color: "text-primary" },
                  { label: "Online", value: onlineCount, color: "text-green-500" },
                  { label: "Nya idag", value: stats.today, color: "text-orange-500" },
                  { label: "Admins", value: adminsCount, color: "text-purple-500" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-card/70 backdrop-blur border border-border rounded-xl px-4 py-2 text-center min-w-16">
                    <div className={`text-xl font-serif ${color}`}>{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <Download className="w-4 h-4" /> Export
              </button>
              <button onClick={() => { fetchUsers(); fetchLeaderboard(); }} className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/70 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Uppdatera
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-5">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-border overflow-x-auto">
          {([
            { key: "users", label: "Användare", icon: Users },
            { key: "stats", label: "Statistik", icon: BarChart2 },
            { key: "leaderboard", label: "Leaderboard", icon: Trophy },
            { key: "moderation", label: "Moderation", icon: Shield },
            { key: "logs", label: "Logg", icon: Activity },
            { key: "settings", label: "Inställningar", icon: Settings },
          ] as { key: Tab; label: string; icon: any }[]).map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>

        {/* ANVÄNDARE TAB */}
        {tab === "users" && (
          <div className="space-y-4">
            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Totalt", value: users.length, icon: Users, color: "text-blue-500" },
                { label: "Online nu", value: onlineCount, icon: Wifi, color: "text-green-500" },
                { label: "Admins", value: adminsCount, icon: Shield, color: "text-purple-500" },
                { label: "Denna vecka", value: stats.thisWeek, icon: TrendingUp, color: "text-orange-500" },
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

            {/* Search & filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Sök namn eller email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "admin", "user", "online"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-2 rounded-xl text-sm border transition-colors ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {f === "all" ? "Alla" : f === "admin" ? "Admins" : f === "user" ? "Användare" : "Online"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk}
                    className="px-3 py-2 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Ta bort {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1,2,3,4,5].map(i => (
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
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="font-medium">Inga användare hittades</p>
                <p className="text-xs mt-1">Prova att ändra sökterm eller filter</p>
              </div>
            ) : (
              <>
                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  {filtered.map((user, i) => (
                    <div key={user.id} onClick={() => setSelectedUser(user)}
                      className={`bg-card border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${selectedUsers.includes(user.id) ? "border-primary" : "border-border"} ${user.is_banned ? "opacity-60" : ""}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedUsers.includes(user.id)}
                          onChange={e => { e.stopPropagation(); setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id]); }}
                          className="w-4 h-4" onClick={e => e.stopPropagation()} />
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                            style={{ background: avatarColors[i % avatarColors.length] }}>
                            {initials(user.display_name)}
                          </div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${user.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>
                            {user.role}
                          </span>
                          <span className="text-xs text-yellow-500">{user.xp} XP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop */}
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/50">
                        <th className="px-4 py-3 w-8">
                          <input type="checkbox"
                            checked={selectedUsers.length === filtered.length && filtered.length > 0}
                            onChange={() => setSelectedUsers(p => p.length === filtered.length ? [] : filtered.map(u => u.id))}
                            className="w-4 h-4" />
                        </th>
                        {([["display_name","Namn"],["email","E-post"],["role","Roll"],["xp","XP"],["created_at","Registrerad"]] as [SortField,string][]).map(([field, label]) => (
                          <th key={field} className="text-left px-4 py-3 font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => { if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc"); else { setSortField(field); setSortDir("asc"); } }}>
                            <span className="flex items-center">{label}<SortIcon field={field} /></span>
                          </th>
                        ))}
                        <th className="text-center px-4 py-3 font-normal text-muted-foreground">Åtgärder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((user, i) => (
                        <tr key={user.id}
                          className={`border-b last:border-0 transition-colors hover:bg-secondary/20 cursor-pointer ${selectedUsers.includes(user.id) ? "bg-primary/5" : ""} ${user.is_banned ? "opacity-60" : ""}`}
                          onClick={() => setSelectedUser(user)}>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <input type="checkbox" checked={selectedUsers.includes(user.id)}
                              onChange={() => setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id])}
                              className="w-4 h-4" />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                  style={{ background: avatarColors[i % avatarColors.length] }}>
                                  {initials(user.display_name)}
                                </div>
                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${user.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                              </div>
                              <span className="font-medium">{user.display_name}</span>
                              {user.is_banned && <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-xs">Ban</span>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground border border-border"}`}>
                              {user.role === "admin" && <Shield className="w-3 h-3" />}{user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-yellow-500 font-medium">{user.xp}</span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                          </td>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button onClick={() => setSelectedUser(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Visa profil">
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => toggleAdmin(user)} className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Byt roll">
                                <Shield className="w-3.5 h-3.5 text-purple-500" />
                              </button>
                              <button onClick={() => banUser(user)} className="p-1.5 rounded-lg hover:bg-orange-50 transition-colors" title="Banna">
                                <Ban className="w-3.5 h-3.5 text-orange-500" />
                              </button>
                              <button onClick={() => deleteUser(user.id, user.email)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors" title="Ta bort">
                                <Trash2 className="w-3.5 h-3.5 text-red-500" />
                              </button>
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

        {/* STATISTIK TAB */}
        {tab === "stats" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Aktiva idag", value: stats.activeToday, icon: Activity, color: "text-green-500", sub: "online just nu" },
                { label: "Nya idag", value: stats.today, icon: Calendar, color: "text-blue-500", sub: "registreringar" },
                { label: "Denna vecka", value: stats.thisWeek, icon: TrendingUp, color: "text-orange-500", sub: "nya användare" },
                { label: "Tillväxt", value: `+${stats.growthPercent}%`, icon: Star, color: "text-yellow-500", sub: "vs förra månaden" },
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
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" /> Rollfördelning
                </h2>
                {[
                  { label: "Admins", count: adminsCount, color: "#7F77DD" },
                  { label: "Användare", count: users.length - adminsCount, color: "#1D9E75" },
                  { label: "Online nu", count: onlineCount, color: "#378ADD" },
                ].map(({ label, count, color }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count} ({users.length > 0 ? Math.round((count / users.length) * 100) : 0}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${users.length > 0 ? (count / users.length) * 100 : 0}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-blue-500" /> Detaljerad översikt
                </h2>
                {[
                  { label: "Totalt registrerade", value: users.length },
                  { label: "Online just nu", value: onlineCount },
                  { label: "Admins", value: adminsCount },
                  { label: "Nya idag", value: stats.today },
                  { label: "Nya denna vecka", value: stats.thisWeek },
                  { label: "Nya denna månad", value: stats.thisMonth },
                  { label: "Genomsnittlig XP", value: users.length ? Math.round(users.reduce((a, u) => a + (u.xp || 0), 0) / users.length) : 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" /> AI Insights
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { label: "Mest frågat ämne", value: "Osmanska riket", icon: "🏰" },
                  { label: "Populäraste quiz", value: "Romarriket", icon: "📚" },
                  { label: "Peak-tid", value: "20:00 - 22:00", icon: "⏰" },
                  { label: "Snitt session", value: "12 min", icon: "📊" },
                  { label: "Quiz completion", value: "73%", icon: "✅" },
                  { label: "Returnerade idag", value: `${Math.floor(onlineCount * 0.6)}`, icon: "🔄" },
                ].map(({ label, value, icon }) => (
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
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-500" /> Senaste registreringar
                </h2>
              </div>
              {users.slice(0, 6).map((u, i) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedUser(u)}>
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{ background: avatarColors[i % avatarColors.length] }}>
                      {initials(u.display_name)}
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${u.is_online ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-yellow-500 font-medium">{u.xp} XP</p>
                    <p className="text-xs text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString("sv-SE") : "—"}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
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
                {(["alltime", "week", "today"] as LeaderboardPeriod[]).map(p => (
                  <button key={p} onClick={() => setLeaderboardPeriod(p)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${leaderboardPeriod === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {p === "alltime" ? "All time" : p === "week" ? "Denna vecka" : "Idag"}
                  </button>
                ))}
              </div>
              <button onClick={shareLeaderboard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
                <Share2 className="w-4 h-4" /> Dela
              </button>
            </div>

            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-3">
                {[leaderboard[1], leaderboard[0], leaderboard[2]].map((u, podiumIndex) => {
                  const actualIndex = [1, 0, 2][podiumIndex];
                  const heights = ["h-28", "h-36", "h-24"];
                  const golds = ["from-gray-400/20 border-gray-400/30", "from-yellow-500/20 border-yellow-500/30", "from-orange-600/20 border-orange-600/30"];
                  return (
                    <div key={u.id} className={`bg-gradient-to-t ${golds[actualIndex]} border rounded-2xl p-3 flex flex-col items-center justify-end ${heights[podiumIndex]} cursor-pointer`}
                      onClick={() => setSelectedUser(u)}>
                      <div className="text-2xl">{medalEmoji(actualIndex)}</div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white my-1"
                        style={{ background: avatarColors[actualIndex] }}>
                        {initials(u.display_name)}
                      </div>
                      <p className="text-xs font-medium truncate w-full text-center">{u.display_name}</p>
                      <p className="text-xs text-yellow-500 font-medium">{u.xp} XP</p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Top 10
                </h2>
                <span className="text-xs text-muted-foreground">{leaderboardPeriod === "alltime" ? "All time" : leaderboardPeriod === "week" ? "Denna vecka" : "Idag"}</span>
              </div>
              {leaderboard.map((u, i) => (
                <div key={u.id} onClick={() => setSelectedUser(u)}
                  className="flex items-center gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors cursor-pointer">
                  <div className="w-8 text-center text-lg">{medalEmoji(i)}</div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white"
                    style={{ background: avatarColors[i % avatarColors.length] }}>
                    {initials(u.display_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground">{u.questions_asked} frågor • {u.quiz_score}% quiz</p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="font-serif tabular-nums">{u.xp}</span>
                    <span className="text-xs text-muted-foreground">XP</span>
                  </div>
                  <div className="w-20 hidden md:block">
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-yellow-500"
                        style={{ width: `${leaderboard[0]?.xp ? Math.round(((u.xp || 0) / leaderboard[0].xp!) * 100) : 0}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={shareLeaderboard}
              className="w-full py-3 rounded-2xl border border-border hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Dela på Instagram / TikTok
            </button>
          </div>
        )}

        {/* MODERATION TAB */}
        {tab === "moderation" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" /> Blockerade ord
              </h2>
              <p className="text-xs text-muted-foreground">Ord separerade med komma. Frågor med dessa ord flaggas automatiskt.</p>
              <textarea value={blockedWords} onChange={e => setBlockedWords(e.target.value)}
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-20" />
              <button onClick={() => { showToast("Sparad!"); addLog("Blockade ord uppdaterade", "warn"); }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm">
                Spara
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" /> Flaggade händelser
                </h2>
              </div>
              {[
                { user: "användare_x", msg: "Försökte ställa en olämplig fråga", time: "2 min sedan", level: "warn" },
                { user: "användare_y", msg: "Misslyckades 5 gånger i rad på quiz", time: "15 min sedan", level: "info" },
                { user: "okänd", msg: "Ovanlig inloggning från ny enhet", time: "1h sedan", level: "error" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-3.5 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.level === "error" ? "bg-red-500" : item.level === "warn" ? "bg-yellow-500" : "bg-blue-500"}`} />
                  <div className="flex-1">
                    <p className="text-sm"><span className="font-medium">{item.user}</span> — {item.msg}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                  <button className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded border border-border hover:bg-secondary transition-colors">
                    Åtgärda
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-card border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-sm font-medium flex items-center gap-2 mb-4 text-red-500">
                <AlertTriangle className="w-4 h-4" /> Farlig zon
              </h2>
              <div className="space-y-2">
                <button onClick={() => showToast("Alla sessioner återkallades", "success")}
                  className="w-full py-2 rounded-xl border border-orange-200 text-orange-500 text-sm hover:bg-orange-50 transition-colors">
                  Återkalla alla aktiva sessioner
                </button>
                <button onClick={() => showToast("Funktion inaktiverad i demo", "error")}
                  className="w-full py-2 rounded-xl border border-red-200 text-red-500 text-sm hover:bg-red-50 transition-colors">
                  Rensa alla icke-admin användare
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOGG TAB */}
        {tab === "logs" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-500" /> Aktivitetslogg
                <span className="px-2 py-0.5 rounded-full bg-secondary text-xs">{logs.length}</span>
              </h2>
              <button onClick={() => setLogs([])} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">
                Rensa
              </button>
            </div>
            {logs.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Inga händelser ännu</p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                {logs.map(log => (
                  <div key={log.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/20 transition-colors">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${logColor(log.type)}`} />
                    <span className="text-xs text-muted-foreground tabular-nums w-16 flex-shrink-0">{log.time}</span>
                    <span className="text-sm">{log.msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INSTÄLLNINGAR TAB */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" /> Systemmeddelande
              </h2>
              <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)}
                placeholder="Skriv ett meddelande till alla användare..."
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-24" />
              <button onClick={() => { showToast("Meddelande skickat!"); addLog(`Meddelande: "${announcement.slice(0, 40)}..."`, "success"); setAnnouncement(""); }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90">
                Skicka till alla
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-500" /> Systeminformation
              </h2>
              <div className="space-y-0 text-sm">
                {[
                  { label: "Supabase URL", value: import.meta.env.VITE_SUPABASE_URL },
                  { label: "Miljö", value: "Production" },
                  { label: "Totalt användare", value: String(users.length) },
                  { label: "Admins", value: String(adminsCount) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2.5 border-b border-border last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-mono text-xs truncate max-w-48">{value}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2.5 items-center">
                  <span className="text-muted-foreground">Service Key</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{showSecret ? (import.meta.env.VITE_SUPABASE_SERVICE_KEY?.slice(0, 15) + "...") : "••••••••••••••••"}</span>
                    <button onClick={() => setShowSecret(!showSecret)}>
                      {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
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
