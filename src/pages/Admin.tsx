import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, UserCheck, TrendingUp, Search,
  RefreshCw, Crown, Activity, Calendar, BarChart2, Star
} from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at?: string;
}

interface Stats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  growthPercent: number;
}

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");
  const [tab, setTab] = useState<"users" | "stats">("users");
  const [toast, setToast] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, thisMonth: 0, growthPercent: 0 });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data: profiles } = await supabase
        .from("profiles")
        .select(`id, email, display_name, created_at, user_roles(role)`)
        .order("created_at", { ascending: false });

      if (profiles) {
        const formatted = profiles.map((p: any) => ({
          id: p.id,
          email: p.email || "—",
          display_name: p.display_name || p.email?.split("@")[0] || "Okänd",
          role: p.user_roles?.[0]?.role || "user",
          created_at: p.created_at,
        }));
        setUsers(formatted);

        const now = Date.now();
        const day = 24 * 60 * 60 * 1000;
        const todayCount = formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < day).length;
        const weekCount = formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 7 * day).length;
        const monthCount = formatted.filter(u => u.created_at && now - new Date(u.created_at).getTime() < 30 * day).length;
        const prevMonth = formatted.filter(u => {
          if (!u.created_at) return false;
          const diff = now - new Date(u.created_at).getTime();
          return diff >= 30 * day && diff < 60 * day;
        }).length;
        const growth = prevMonth > 0 ? Math.round(((monthCount - prevMonth) / prevMonth) * 100) : 100;
        setStats({ today: todayCount, thisWeek: weekCount, thisMonth: monthCount, growthPercent: growth });
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id: string, email: string) => {
    if (!confirm(`Ta bort ${email}?`)) return;
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`);
    fetchUsers();
  };

  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} är nu ${newRole}`);
    fetchUsers();
  };

  const admins = users.filter(u => u.role === "admin").length;
  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";
  const avatarColors = ["#7F77DD", "#1D9E75", "#D85A30", "#378ADD", "#D4537E", "#BA7517", "#639922", "#534AB7"];

  const filtered = users.filter(u => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.display_name?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || u.role === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm shadow-lg">
          {toast}
        </div>
      )}

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-primary flex items-center gap-2">
              <Crown className="w-6 h-6" /> Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Empire AI — Kontrollcenter</p>
          </div>
          <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Uppdatera
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border">
          {[
            { key: "users", label: "Användare", icon: Users },
            { key: "stats", label: "Statistik", icon: BarChart2 },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors -mb-px ${
                tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "stats" && (
          <div className="space-y-6">
            {/* Growth stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Idag", value: stats.today, icon: Activity, color: "text-blue-500", sub: "nya användare" },
                { label: "Denna vecka", value: stats.thisWeek, icon: Calendar, color: "text-teal-500", sub: "nya användare" },
                { label: "Denna månad", value: stats.thisMonth, icon: TrendingUp, color: "text-orange-500", sub: "nya användare" },
                { label: "Tillväxt", value: `${stats.growthPercent > 0 ? "+" : ""}${stats.growthPercent}%`, icon: Star, color: "text-yellow-500", sub: "vs förra månaden" },
              ].map(({ label, value, icon: Icon, color, sub }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-3xl font-serif text-foreground">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Role distribution */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" /> Rollfördelning
              </h2>
              <div className="space-y-3">
                {[
                  { label: "Admins", count: admins, total: users.length, color: "#7F77DD" },
                  { label: "Vanliga användare", count: users.length - admins, total: users.length, color: "#1D9E75" },
                ].map(({ label, count, total, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${total > 0 ? (count / total) * 100 : 0}%`, background: color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent registrations */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
                <h2 className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-500" /> Senaste registreringar
                </h2>
              </div>
              {users.slice(0, 5).map((u, i) => (
                <div key={u.id} className="flex items-center gap-3 px-5 py-3 border-b border-border last:border-0 hover:bg-secondary/20 transition-colors">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0"
                    style={{ background: avatarColors[i % avatarColors.length] }}>
                    {initials(u.display_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.display_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{u.email}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString("sv-SE") : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-4">
            {/* Overview stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Totalt", value: users.length, sub: "användare", icon: Users, color: "text-blue-500" },
                { label: "Admins", value: admins, sub: "aktiva roller", icon: Shield, color: "text-purple-500" },
                { label: "Användare", value: users.length - admins, sub: "standard roll", icon: UserCheck, color: "text-teal-500" },
                { label: "Nya", value: stats.thisMonth, sub: "denna månad", icon: TrendingUp, color: "text-orange-500" },
              ].map(({ label, value, sub, icon: Icon, color }) => (
                <div key={label} className="bg-card border border-border rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div className="text-3xl font-serif">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Search & filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Sök på namn eller email..."
                  className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "admin", "user"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-4 py-2.5 rounded-xl text-sm border transition-colors ${
                      filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"
                    }`}>
                    {f === "all" ? "Alla" : f === "admin" ? "Admins" : "Användare"}
                  </button>
                ))}
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
                {/* Mobile cards */}
                <div className="md:hidden space-y-3">
                  {filtered.map((user, i) => (
                    <div key={user.id} className="bg-card border border-border rounded-2xl p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0"
                          style={{ background: avatarColors[i % avatarColors.length] }}>
                          {initials(user.display_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                          user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"
                        }`}>
                          {user.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Registrerad: {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
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

                {/* Desktop table */}
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/50">
                        <th className="text-left px-5 py-3 font-normal text-muted-foreground">Användare</th>
                        <th className="text-left px-5 py-3 font-normal text-muted-foreground">E-post</th>
                        <th className="text-left px-5 py-3 font-normal text-muted-foreground">Roll</th>
                        <th className="text-left px-5 py-3 font-normal text-muted-foreground">Registrerad</th>
                        <th className="text-center px-5 py-3 font-normal text-muted-foreground">Åtgärder</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((user, i) => (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-secondary/20 transition-colors">
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                style={{ background: avatarColors[i % avatarColors.length] }}>
                                {initials(user.display_name)}
                              </div>
                              <span className="font-medium">{user.display_name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground">{user.email}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground border border-border"
                            }`}>
                              {user.role === "admin" && <Shield className="w-3 h-3" />}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-muted-foreground text-xs">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => toggleAdmin(user)}
                                className="px-3 py-1.5 rounded-lg border border-border text-xs hover:bg-secondary transition-colors flex items-center gap-1">
                                <Shield className="w-3 h-3" />
                                {user.role === "admin" ? "Ta bort admin" : "Gör admin"}
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
            <p className="text-xs text-muted-foreground text-center">{filtered.length} av {users.length} användare visas</p>
          </div>
        )}
      </div>
    </div>
  );
}
