import { useEffect, useState } from "react";
import { supabase, adminSupabase } from "@/integrations/supabase/client";
import {
  Trash2, Shield, Users, UserCheck, TrendingUp, Search,
  RefreshCw, Crown, Activity, Calendar, BarChart2, Star,
  Bell, Settings, Download, Eye, EyeOff, Ban, CheckCircle,
  Mail, Key, AlertTriangle, ChevronUp, ChevronDown
} from "lucide-react";


interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at?: string;
  banned?: boolean;
}

interface Stats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  growthPercent: number;
}

type SortField = "display_name" | "email" | "role" | "created_at";
type SortDir = "asc" | "desc";

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "admin" | "user">("all");
  const [tab, setTab] = useState<"users" | "stats" | "settings" | "logs">("users");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [stats, setStats] = useState<Stats>({ today: 0, thisWeek: 0, thisMonth: 0, growthPercent: 0 });
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [showSecret, setShowSecret] = useState(false);
  const [announcement, setAnnouncement] = useState("");

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
    const { data, error } = await supabase.rpc("get_all_users");
    if (error) { showToast("Kunde inte hämta användare", "error"); console.error(error); }
    if (data) {
      setUsers(data);
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      const todayCount = data.filter((u: any) => u.created_at && now - new Date(u.created_at).getTime() < day).length;
      const weekCount = data.filter((u: any) => u.created_at && now - new Date(u.created_at).getTime() < 7 * day).length;
      const monthCount = data.filter((u: any) => u.created_at && now - new Date(u.created_at).getTime() < 30 * day).length;
      const prevMonth = data.filter((u: any) => {
        if (!u.created_at) return false;
        const diff = now - new Date(u.created_at).getTime();
        return diff >= 30 * day && diff < 60 * day;
      }).length;
      const growth = prevMonth > 0 ? Math.round(((monthCount - prevMonth) / prevMonth) * 100) : 100;
      setStats({ today: todayCount, thisWeek: weekCount, thisMonth: monthCount, growthPercent: growth });
      addLog(`Hämtade ${data.length} användare`);
    }
  } catch (err) { console.error(err); }
  setLoading(false);
};

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id: string, email: string) => {
    if (!confirm(`Ta bort ${email}? Detta kan inte ångras.`)) return;
    await adminSupabase.from("user_roles").delete().eq("user_id", id);
    await adminSupabase.from("profiles").delete().eq("id", id);
    showToast(`${email} borttagen`);
    addLog(`Borttagen: ${email}`);
    fetchUsers();
  };

  const deleteBulk = async () => {
    if (!confirm(`Ta bort ${selectedUsers.length} användare?`)) return;
    for (const id of selectedUsers) {
      await adminSupabase.from("user_roles").delete().eq("user_id", id);
      await adminSupabase.from("profiles").delete().eq("id", id);
    }
    showToast(`${selectedUsers.length} användare borttagna`);
    addLog(`Bulk-borttagen: ${selectedUsers.length} användare`);
    setSelectedUsers([]);
    fetchUsers();
  };

  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await adminSupabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    showToast(`${user.display_name} är nu ${newRole}`);
    addLog(`Roll ändrad: ${user.email} → ${newRole}`);
    fetchUsers();
  };

  const exportCSV = () => {
    const rows = [["ID", "Email", "Namn", "Roll", "Registrerad"]];
    users.forEach(u => rows.push([u.id, u.email, u.display_name, u.role, u.created_at || ""]));
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "användare.csv";
    a.click();
    addLog("Exporterade användare som CSV");
  };

  const toggleSelect = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedUsers(prev => prev.length === filtered.length ? [] : filtered.map(u => u.id));
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortField(field); setSortDir("asc"); }
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
      const av = a[sortField] || "";
      const bv = b[sortField] || "";
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const SortIcon = ({ field }: { field: SortField }) => (
    <span className="inline-flex flex-col ml-1">
      <ChevronUp className={`w-2.5 h-2.5 ${sortField === field && sortDir === "asc" ? "text-primary" : "text-muted-foreground/30"}`} />
      <ChevronDown className={`w-2.5 h-2.5 ${sortField === field && sortDir === "desc" ? "text-primary" : "text-muted-foreground/30"}`} />
    </span>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2.5 rounded-xl text-sm shadow-lg text-white ${toast.type === "error" ? "bg-red-500" : "bg-primary"}`}>
          {toast.msg}
        </div>
      )}

      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif text-primary flex items-center gap-2">
              <Crown className="w-6 h-6" /> Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Empire AI — Kontrollcenter</p>
          </div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
              <Download className="w-4 h-4" /> Exportera
            </button>
            <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-secondary transition-colors text-sm">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Uppdatera
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border overflow-x-auto">
          {[
            { key: "users", label: "Användare", icon: Users },
            { key: "stats", label: "Statistik", icon: BarChart2 },
            { key: "logs", label: "Aktivitetslogg", icon: Activity },
            { key: "settings", label: "Inställningar", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setTab(key as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 transition-colors -mb-px whitespace-nowrap ${
                tab === key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* STATISTIK TAB */}
        {tab === "stats" && (
          <div className="space-y-6">
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" /> Rollfördelning
                </h2>
                {[
                  { label: "Admins", count: admins, total: users.length, color: "#7F77DD" },
                  { label: "Vanliga användare", count: users.length - admins, total: users.length, color: "#1D9E75" },
                ].map(({ label, count, total, color }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium">{count} ({total > 0 ? Math.round((count / total) * 100) : 0}%)</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${total > 0 ? (count / total) * 100 : 0}%`, background: color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h2 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-500" /> Översikt
                </h2>
                {[
                  { label: "Totalt registrerade", value: users.length },
                  { label: "Admins", value: admins },
                  { label: "Vanliga användare", value: users.length - admins },
                  { label: "Nya idag", value: stats.today },
                  { label: "Nya denna vecka", value: stats.thisWeek },
                  { label: "Nya denna månad", value: stats.thisMonth },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-1.5 border-b border-border last:border-0 text-sm">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-3 border-b border-border">
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
                  <div className="text-xs text-muted-foreground">
                    {u.created_at ? new Date(u.created_at).toLocaleDateString("sv-SE") : "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AKTIVITETSLOGG TAB */}
        {tab === "logs" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-500" /> Aktivitetslogg
              </h2>
              <button onClick={() => setLogs([])} className="text-xs text-muted-foreground hover:text-foreground">Rensa</button>
            </div>
            {logs.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">Inga händelser ännu</div>
            ) : (
              <div className="divide-y divide-border">
                {logs.map((log, i) => (
                  <div key={i} className="px-5 py-2.5 text-sm font-mono text-muted-foreground hover:bg-secondary/20">
                    {log}
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
                <Bell className="w-4 h-4 text-orange-500" /> Meddelande till alla användare
              </h2>
              <textarea
                value={announcement}
                onChange={e => setAnnouncement(e.target.value)}
                placeholder="Skriv ett meddelande som visas för alla användare..."
                className="w-full p-3 bg-secondary border border-border rounded-xl text-sm outline-none focus:ring-1 focus:ring-primary resize-none h-24"
              />
              <button
                onClick={() => { showToast("Meddelande skickat!"); addLog(`Meddelande skickat: "${announcement}"`); setAnnouncement(""); }}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm hover:opacity-90 transition-opacity"
              >
                Skicka meddelande
              </button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-medium flex items-center gap-2">
                <Key className="w-4 h-4 text-yellow-500" /> API-nycklar
              </h2>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Supabase URL</p>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl text-xs font-mono">
                  {import.meta.env.VITE_SUPABASE_URL}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Service Key</p>
                <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl text-xs font-mono">
                  <span className="flex-1 truncate">
                    {showSecret ? import.meta.env.VITE_SUPABASE_SERVICE_KEY : "••••••••••••••••••••••••••••••"}
                  </span>
                  <button onClick={() => setShowSecret(!showSecret)}>
                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-medium flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Farlig zon
              </h2>
              <button
                onClick={() => { if (confirm("Rensa ALLA användare utom admins?")) { showToast("Funktion ej aktiverad i demo", "error"); } }}
                className="px-4 py-2 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 transition-colors"
              >
                Rensa alla icke-admin användare
              </button>
            </div>
          </div>
        )}

        {/* ANVÄNDARE TAB */}
        {tab === "users" && (
          <div className="space-y-4">
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
                    className={`px-4 py-2.5 rounded-xl text-sm border transition-colors ${
                      filter === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"
                    }`}>
                    {f === "all" ? "Alla" : f === "admin" ? "Admins" : "Användare"}
                  </button>
                ))}
                {selectedUsers.length > 0 && (
                  <button onClick={deleteBulk}
                    className="px-4 py-2.5 rounded-xl text-sm border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex items-center gap-1">
                    <Trash2 className="w-3.5 h-3.5" /> Ta bort {selectedUsers.length} valda
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
                    <div key={user.id} className={`bg-card border rounded-2xl p-4 space-y-3 transition-colors ${selectedUsers.includes(user.id) ? "border-primary" : "border-border"}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelect(user.id)} className="w-4 h-4" />
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white flex-shrink-0"
                          style={{ background: avatarColors[i % avatarColors.length] }}>
                          {initials(user.display_name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{user.display_name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground"}`}>
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

                {/* Desktop */}
                <div className="hidden md:block border border-border rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-secondary/50">
                        <th className="px-4 py-3 w-8">
                          <input type="checkbox" checked={selectedUsers.length === filtered.length && filtered.length > 0}
                            onChange={toggleSelectAll} className="w-4 h-4" />
                        </th>
                        {([["display_name", "Namn"], ["email", "E-post"], ["role", "Roll"], ["created_at", "Registrerad"]] as [SortField, string][]).map(([field, label]) => (
                          <th key={field} className="text-left px-4 py-3 font-normal text-muted-foreground cursor-pointer hover:text-foreground"
                            onClick={() => handleSort(field)}>
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
                            <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => toggleSelect(user.id)} className="w-4 h-4" />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                                style={{ background: avatarColors[i % avatarColors.length] }}>
                                {initials(user.display_name)}
                              </div>
                              <span className="font-medium">{user.display_name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${user.role === "admin" ? "bg-purple-100 text-purple-800" : "bg-secondary text-muted-foreground border border-border"}`}>
                              {user.role === "admin" && <Shield className="w-3 h-3" />}
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                          </td>
                          <td className="px-4 py-3">
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
