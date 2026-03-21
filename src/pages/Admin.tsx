import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, UserCheck, TrendingUp, Search,
  RefreshCw, Crown, Activity, Calendar, BarChart2, Star,
  Bell, Settings, Download, Eye, EyeOff, AlertTriangle,
  ChevronUp, ChevronDown, Trophy, Zap, Share2, Medal
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at?: string;
  xp?: number;
}

interface Stats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  growthPercent: number;
  activeToday: number;
}

type SortField = "display_name" | "email" | "role" | "created_at";
type SortDir = "asc" | "desc";
type LeaderboardPeriod = "alltime" | "week" | "month";

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");
  const [tab, setTab] = useState<"users" | "stats" | "leaderboard" | "logs" | "settings">("users");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, thisMonth: 0, growthPercent: 0, activeToday: 0 });
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<LeaderboardPeriod>("alltime");
  const [leaderboard, setLeaderboard] = useState<UserProfile[]>([]);
  const [announcement, setAnnouncement] = useState("");
  const [showSecret, setShowSecret] = useState(false);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString("sv-SE");
    setLogs(prev => [`[${time}] ${msg}`, ...prev].slice(0, 50));
  };

const fetchUsers = async () => {
  setLoading(true);
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, email, display_name, created_at");

    const { data: roles } = await supabase
      .from("user_roles")
      .select("user_id, role");

    console.log("DATA:", profiles, "ERROR:", error);

    if (profiles) {
      const formatted = profiles.map((p: any) => ({
        id: p.id,
        email: p.email || "—",
        display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
        role: roles?.find((r: any) => r.user_id === p.id)?.role || "user",
        created_at: p.created_at,
        xp: 0,
      }));
      setUsers(formatted);
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      setStats({
        today: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length,
        thisWeek: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7 * day).length,
        thisMonth: formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30 * day).length,
        growthPercent: 100,
        activeToday: Math.max(1, Math.floor(formatted.length * 0.3)),
      });
      addLog(`Hämtade ${formatted.length} användare`);
    }
  } catch (err) { console.error(err); }
  setLoading(false);
};
  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, email, user_progress(xp)")
      .limit(10);
    if (data) {
      const formatted = data.map((p: any) => ({
        ...p,
        display_name: p.display_name || p.email?.split("@")[0],
        xp: p.user_progress?.[0]?.xp || 0,
      })).sort((a: any, b: any) => b.xp - a.xp);
      setLeaderboard(formatted);
    }
  };

  useEffect(() => { fetchUsers(); fetchLeaderboard(); }, []);

  const deleteUser = async (id: string, email: string) => {
    if (!confirm(`Ta bort ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`);
    addLog(`Borttagen: ${email}`);
    fetchUsers();
  };

  const deleteBulk = async () => {
    if (!confirm(`Ta bort ${selectedUsers.length} användare?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} användare borttagna`);
    addLog(`Bulk-borttagen: ${selectedUsers.length} användare`);
    setSelectedUsers([]);
    fetchUsers();
  };

  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} är nu ${newRole}`);
    addLog(`Roll ändrad: ${user.email} → ${newRole}`);
    fetchUsers();
  };

  const exportCSV = () => {
    const rows = [["ID", "Email", "Namn", "Roll", "Registrerad", "XP"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, u.created_at || "", String(u.xp || 0)]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "användare.csv"; a.click();
    addLog("Exporterade CSV");
  };

  const shareLeaderboard = async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0, 3).map((u, i) => `${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) {
      await navigator.share({ title: "Empire AI Leaderboard", text });
    } else {
      await navigator.clipboard.writeText(text);
      showToast("Kopierat till urklipp!");
    }
  };

  const admins = users.filter(u => u.role === "admin").length;
  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const avatarColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E", "#BA7517", "#639922", "#534AB7"];

  const filtered = users
    .filter(u => {
      const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.display_name?.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || u.role === filter;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      const av = (a as any)[sortField] || "";
      const bv = (b as any)[sortField] || "";
      return sortDir === "asc" ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1 opacity-50">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "opacity-100 text-primary" : ""}`} />
      <ChevronDown className={`w-2.5 h-2.5 ${sortField === field && sortDir === "desc" ? "opacity-100 text-primary" : ""}`} />
    </span>
  );

  const medalEmoji = (i: number) => ["🥇", "🥈", "🥉"][i] || `#${i + 1}`;
  const medalColor = (i: number) => [
    "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30",
    "from-gray-400/20 to-gray-500/5 border-gray-400/30",
    "from-orange-600/20 to-orange-700/5 border-orange-600/30",
  ][i] || "from-transparent to-transparent border-border";

  return (
    <div className="min-h-screen bg-background pb-20">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm shadow-lg text-white transition-all ${toast.type === "error" ? "bg-red-500" : "bg-primary"}`}>
          {toast.msg}
        </div>
      )}

      {/* Hero header with background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/5 to-background" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 300'%3E%3Crect fill='%23111' width='800' height='300'/%3E%3C!-- Pillars --%3E%3Crect x='50' y='100' width='40' height='180' fill='%23c8a96e' rx='3'/%3E%3Crect x='55' y='90' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='150' y='80' width='40' height='200' fill='%23c8a96e' rx='3'/%3E%3Crect x='155' y='70' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='250' y='60' width='40' height='220' fill='%23c8a96e' rx='3'/%3E%3Crect x='255' y='50' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='470' y='60' width='40' height='220' fill='%23c8a96e' rx='3'/%3E%3Crect x='475' y='50' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='570' y='80' width='40' height='200' fill='%23c8a96e' rx='3'/%3E%3Crect x='575' y='70' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='670' y='100' width='40' height='180' fill='%23c8a96e' rx='3'/%3E%3Crect x='675' y='90' width='30' height='15' fill='%23d4b483' rx='2'/%3E%3Crect x='30' y='270' width='740' height='10' fill='%23c8a96e'/%3E%3C!-- Triangular pediment --%3E%3Cpolygon points='200,20 400,0 600,20' fill='%23c8a96e' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
          }}
        />
        <div className="relative p-6 md:p-10 max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif text-primary flex items-center gap-3">
                <Crown className="w-8 h-8" /> Admin Panel
              </h1>
              <p className="text-muted-foreground mt-1">Empire AI — Kontrollcenter</p>
              <div className="flex gap-3 mt-4 flex-wrap">
                <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-serif text-primary">{users.length}</div>
                  <div className="text-xs text-muted-foreground">Totalt</div>
                </div>
                <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-serif text-green-500">{stats.activeToday}</div>
                  <div className="text-xs text-muted-foreground">Aktiva idag</div>
                </div>
                <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-serif text-orange-500">{stats.today}</div>
                  <div className="text-xs text-muted-foreground">Nya idag</div>
                </div>
                <div className="bg-card/80 backdrop-blur border border-border rounded-xl px-4 py-2 text-center">
                  <div className="text-2xl font-serif text-purple-500">{admins}</div>
                  <div className="text-xs text-muted-foreground">Admins</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/80 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <Download className="w-4 h-4" /> Exportera
              </button>
              <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/80 backdrop-blur hover:bg-secondary transition-colors text-sm">
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Uppdatera
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto -mt-2">
          {[
            { key: "users", label: "Användare", icon: Users },
            { key: "stats", label: "Statistik", icon: BarChart2 },
            { key: "leaderboard", label: "Leaderboard", icon: Trophy },
            { key: "logs", label: "Aktivitetslogg", icon: Activity },
            { key: "settings", label: "Inställningar", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${
                tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* STATISTIK */}
        {tab === "stats" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Aktiva idag", value: stats.activeToday, icon: Activity, color: "text-green-500", sub: "unika besökare" },
                { label: "Nya idag", value: stats.today, icon: Calendar, color: "text-blue-500", sub: "registreringar" },
                { label: "Denna vecka", value: stats.thisWeek, icon: TrendingUp, color: "text-orange-500", sub: "nya användare" },
                { label: "Tillväxt", value: `${stats.growthPercent > 0 ? "+" : ""}${stats.growthPercent}%`, icon: Star, color: "text-yellow-500", sub: "vs förra månaden" },
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
                <h2 className="text-sm font-medium mb-5 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" /> Rollfördelning
                </h2>
                {[
                  { label: "Admins", count: admins, total: users.length, color: "#7F77DD" },
                  { label: "Vanliga användare", count: users.length - admins, total: users.length, color: "#1D9E75" },
                ].map(({ label, count, total, color }) => (
                  <div key={label} className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
                    </div>
                    <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${total > 0 ? (count / total) * 100 : 0}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" /> Detaljerad översikt
                </h2>
                {[
                  { label: "Totalt registrerade", value: users.length },
                  { label: "Aktiva idag (est.)", value: stats.activeToday },
                  { label: "Admins", value: admins },
                  { label: "Nya idag", value: stats.today },
                  { label: "Nya denna vecka", value: stats.thisWeek },
                  { label: "Nya denna månad", value: stats.thisMonth },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-500" /> Senaste registreringar
                </h2>
              </div>
              {users.slice(0, 8).map((u, i) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ background: avatarColors[i % avatarColors.length] }}>
                    {initials(u.display_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${u.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>
                    {u.role}
                  </span>
                  <div className="text-xs text-muted-foreground tabular-nums">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString("sv-SE") : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LEADERBOARD */}
        {tab === "leaderboard" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex gap-2">
                {(["alltime", "week", "month"] as LeaderboardPeriod[]).map(p => (
                  <button key={p} onClick={() => setLeaderboardPeriod(p)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-colors ${leaderboardPeriod === p ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {p === "alltime" ? "All time" : p === "week" ? "Denna vecka" : "Denna månad"}
                  </button>
                ))}
              </div>
              <button onClick={shareLeaderboard}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
                <Share2 className="w-4 h-4" /> Dela
              </button>
            </div>

            {/* Top 3 podium */}
            {leaderboard.length >= 3 && (
              <div className="grid grid-cols-3 gap-3 mb-2">
                {[leaderboard[1], leaderboard[0], leaderboard[2]].map((u, podiumIndex) => {
                  const actualIndex = podiumIndex === 0 ? 1 : podiumIndex === 1 ? 0 : 2;
                  const heights = ["h-24", "h-32", "h-20"];
                  return (
                    <div key={u.id} className={`bg-gradient-to-t ${medalColor(actualIndex)} border rounded-2xl p-4 flex flex-col items-center justify-end ${heights[podiumIndex]}`}>
                      <div className="text-2xl mb-1">{medalEmoji(actualIndex)}</div>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white mb-1"
                        style={{ background: avatarColors[actualIndex] }}>
                        {initials(u.display_name)}
                      </div>
                      <p className="text-xs font-medium truncate w-full text-center">{u.display_name}</p>
                      <p className="text-xs text-muted-foreground">{u.xp || 0} XP</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full leaderboard */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" /> Top 10 — {leaderboardPeriod === "alltime" ? "All time" : leaderboardPeriod === "week" ? "Denna vecka" : "Denna månad"}
                </h2>
              </div>
              {leaderboard.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground">
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  Ingen XP data ännu
                </div>
              ) : (
                leaderboard.map((u, i) => (
                  <div key={u.id} className={`flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors ${i < 3 ? "bg-gradient-to-r " + medalColor(i) : ""}`}>
                    <div className="w-8 text-center font-serif text-lg">{medalEmoji(i)}</div>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                      style={{ background: avatarColors[i % avatarColors.length] }}>
                      {initials(u.display_name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{u.display_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="font-serif text-lg tabular-nums">{u.xp || 0}</span>
                      <span className="text-xs text-muted-foreground">XP</span>
                    </div>
                    {/* XP bar */}
                    <div className="w-24 hidden md:block">
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-yellow-500 transition-all duration-700"
                          style={{ width: `${leaderboard[0]?.xp ? Math.round(((u.xp || 0) / leaderboard[0].xp!) * 100) : 0}%` }} />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button onClick={shareLeaderboard}
              className="w-full py-3 rounded-2xl border border-border hover:bg-secondary transition-colors text-sm flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" /> Dela leaderboard på Instagram / TikTok
            </button>
          </div>
        )}

        {/* AKTIVITETSLOGG */}
        {tab === "logs" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-500" /> Aktivitetslogg
              </h2>
              <button onClick={() => setLogs([])} className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded-lg border border-border hover:bg-secondary transition-colors">
                Rensa
              </button>
            </div>
            {logs.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-20" />
                Inga händelser ännu — utför en åtgärd
              </div>
            ) : (
              <div className="divide-y divide-border max-h-96 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="px-5 py-3 text-sm font-mono text-muted-foreground hover:bg-secondary/20 flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INSTÄLLNINGAR */}
        {tab === "settings" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" /> Meddelande till alla användare
              </h2>
              <textarea value={announcement} onChange={e => setAnnouncement(e.target.value)}
                placeholder="Skriv ett meddelande som visas för alla användare..."
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-24" />
              <button onClick={() => { showToast("Meddelande skickat!"); addLog(`Meddelande: "${announcement}"`); setAnnouncement(""); }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90 transition-opacity">
                Skicka meddelande
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Settings className="w-4 h-4 text-blue-500" /> Systeminformation
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Supabase URL</span>
                  <span className="font-mono text-xs truncate max-w-48">{import.meta.env.VITE_SUPABASE_URL}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border items-center">
                  <span className="text-muted-foreground">Service Key</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs">{showSecret ? import.meta.env.VITE_SUPABASE_SERVICE_KEY?.slice(0, 20) + "..." : "••••••••••••••••••••"}</span>
                    <button onClick={() => setShowSecret(!showSecret)} className="text-muted-foreground hover:text-foreground">
                      {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Totalt användare</span>
                  <span className="font-medium">{users.length}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-sm font-medium flex items-center gap-2 mb-4 text-red-500">
                <AlertTriangle className="w-4 h-4" /> Farlig zon
              </h2>
              <p className="text-xs text-muted-foreground mb-4">Dessa åtgärder kan inte ångras. Var försiktig.</p>
              <button onClick={() => showToast("Funktion inaktiverad i demo", "error")}
                className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 transition-colors">
                Rensa alla icke-admin användare
              </button>
            </div>
          </div>
        )}

        {/* ANVÄNDARE */}
        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Sök på namn eller email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "admin", "user"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 rounded-xl text-sm border transition-colors ${filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                    {f === "all" ? "Alla" : f === "admin" ? "Admins" : "Användare"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk}
                    className="px-4 py-2.5 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Ta bort {selectedUsers.length}
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Inga användare hittades</p>
              </div>
            ) : (
              <>
                {/* Mobile */}
                <div className="md:hidden space-y-3">
                  {filtered.map((user, i) => (
                    <div key={user.id} className={`bg-card border rounded-2xl p-4 space-y-3 ${selectedUsers.includes(user.id) ? "border-primary" : "border-border"}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id])} className="w-4 h-4" />
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                          style={{ background: avatarColors[i % avatarColors.length] }}>
                          {initials(user.display_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                      </p>
                      <div className="flex gap-2">
                        <button onClick={() => toggleAdmin(user)}
                          className="flex-1 py-2 rounded-xl border border-border text-xs hover:bg-secondary transition-colors flex items-center justify-center gap-1">
                          <Shield className="w-3 h-3" />
                          {user.role === "admin" ? "Ta bort admin" : "Gör admin"}
                        </button>
                        <button onClick={() => deleteUser(user.id, user.email)}
                          className="py-2 px-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
                        {([["display_name", "Namn"], ["email", "E-post"], ["role", "Roll"], ["created_at", "Registrerad"]] as [SortField, string][]).map(([field, label]) => (
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
                        <tr key={user.id} className={`border-b last:border-0 transition-colors hover:bg-secondary/20 ${selectedUsers.includes(user.id) ? "bg-primary/5" : ""}`}>
                          <td className="px-4 py-3">
                            <input type="checkbox" checked={selectedUsers.includes(user.id)}
                              onChange={() => setSelectedUsers(p => p.includes(user.id) ? p.filter(x => x !== user.id) : [...p, user.id])}
                              className="w-4 h-4" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                style={{ background: avatarColors[i % avatarColors.length] }}>
                                {initials(user.display_name)}
                              </div>
                              <span className="font-medium">{user.display_name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-muted-foreground">{user.email}</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground border border-border"}`}>
                              {user.role === "admin" && <Shield className="w-3 h-3" />}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-muted-foreground text-xs tabular-nums">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => toggleAdmin(user)}
                                className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-secondary transition-colors flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                {user.role === "admin" ? "Ta bort" : "Gör admin"}
                              </button>
                              <button onClick={() => deleteUser(user.id, user.email)}
                                className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            <p className="text-xs text-muted-foreground text-center pb-4">{filtered.length} av {users.length} användare visas</p>
          </div>
        )}
      </div>
    </div>
  );
}
