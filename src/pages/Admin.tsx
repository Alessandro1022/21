import { useEffect, useState, useCallback, useMemo } from "react";
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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { profiles, error } = await supabase
        .from("profiles")
        .select("id, email, display_name, created_at");

      const { roles } = await supabase
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
  }, []);

  const fetchLeaderboard = useCallback(async () => {
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
  }, []);

  useEffect(() => { fetchUsers(); fetchLeaderboard(); }, [fetchUsers, fetchLeaderboard]);

  const deleteUser = useCallback(async (id: string, email: string) => {
    if (!confirm(`Ta bort ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`);
    addLog(`Borttagen: ${email}`);
    fetchUsers();
  }, [fetchUsers, showToast, addLog]);

  const deleteBulk = useCallback(async () => {
    if (!confirm(`Ta bort ${selectedUsers.length} användare?`)) return;
    for (const id of selectedUsers) {
      await supabase.from("user_roles").delete().eq("user_id", id);
      await supabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} användare borttagna`);
    addLog(`Bulk-borttagen: ${selectedUsers.length} användare`);
    setSelectedUsers([]);
    fetchUsers();
  }, [selectedUsers, showToast, addLog, fetchUsers]);

  const toggleAdmin = useCallback(async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} är nu ${newRole}`);
    addLog(`Roll ändrad: ${user.email} → ${newRole}`);
    fetchUsers();
  }, [showToast, addLog, fetchUsers]);

  const exportCSV = useCallback(() => {
    const rows = [["ID", "Email", "Namn", "Roll", "Registrerad", "XP"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, u.created_at || "", String(u.xp || 0)]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "användare.csv"; a.click();
    addLog("Exporterade CSV");
  }, [users, addLog]);

  const shareLeaderboard = useCallback(async () => {
    const text = `🏆 Empire AI Leaderboard\n${leaderboard.slice(0, 3).map((u, i) => `${["🥇","🥈","🥉"][i]} ${u.display_name}: ${u.xp} XP`).join("\n")}\n\nempireai10.vercel.app`;
    if (navigator.share) {
      await navigator.share({ title: "Empire AI Leaderboard", text });
    } else {
      await navigator.clipboard.writeText(text);
      showToast("Kopierat till urklipp!");
    }
  }, [leaderboard, showToast]);

  const admins = useMemo(() => users.filter(u => u.role === "admin").length, [users]);
  const initials = useCallback((name: string) => name?.slice(0, 2).toUpperCase() || "??", []);
  const avatarColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E", "#BA7517", "#639922", "#534AB7"];

  const filtered = useMemo(() =>
    users
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
      }),
    [users, search, filter, sortField, sortDir]
  );

  const SortIcon = useCallback(({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1 opacity-50">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "opacity-100 text-primary" : ""}`} />
      <ChevronDown className={`w-2.5 h-2.5 ${sortField === field && sortDir === "desc" ? "opacity-100 text-primary" : ""}`} />
    </span>
  ), [sortField, sortDir]);

  const medalEmoji = useCallback((i: number) => ["🥇", "🥈", "🥉"][i] || `#${i + 1}`, []);
  const medalColor = useCallback((i: number) => [
    "from-yellow-500/20 to-yellow-600/5 border-yellow-500/30",
    "from-gray-400/20 to-gray-500/5 border-gray-400/30",
    "from-orange-600/20 to-orange-700/5 border-orange-600/30",
  ][i] || "from-transparent to-transparent border-border", []);

  return (
    <div className="min-h-screen bg-background pb-20">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm shadow-lg text-white transition-all ${toast.type === "error" ? "bg-red-500" : "bg-primary"}`}>
          {toast.msg}
        </div>
      )}

      {/* Hero header with background */}
      <div className="relative overflow-hidden">
        {/* ... (existing code) ... */}
      </div>

      <div className="px-4 md:px-10 max-w-7xl mx-auto space-y-6">
        {/* Tabs */}
        {/* ... (existing code) ... */}

        {/* STATISTIK */}
        {tab === "stats" && (
          <div className="space-y-4">
            {/* ... (existing code) ... */}
          </div>
        )}

        {/* LEADERBOARD */}
        {tab === "leaderboard" && (
          <div className="space-y-4">
            {/* ... (existing code) ... */}
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
              className="w-full py-3 rounded-2xl border border-border hover:bg-secondary transition-colors text-sm flex items-
