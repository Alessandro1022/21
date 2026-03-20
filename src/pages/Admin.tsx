import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Shield, Users, UserCheck, Activity, TrendingUp, Search } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at?: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles } = await supabase
      .from("profiles")
      .select(`id, email, display_name, created_at, user_roles(role)`);
    if (profiles) {
      const formatted = profiles.map((p: any) => ({
        id: p.id,
        email: p.email,
        display_name: p.display_name || p.email?.split("@")[0],
        role: p.user_roles?.[0]?.role || "user",
        created_at: p.created_at,
      }));
      setUsers(formatted);
    }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id: string) => {
    if (!confirm("Är du säker?")) return;
    await supabase.from("profiles").delete().eq("id", id);
    await supabase.from("user_roles").delete().eq("user_id", id);
    fetchUsers();
  };

  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({ user_id: user.id, role: newRole });
    fetchUsers();
  };

  const filtered = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter(u => u.role === "admin").length;
  const initials = (name: string) => name?.slice(0, 2).toUpperCase() || "??";

  const avatarColors = [
    "bg-purple-100 text-purple-800",
    "bg-teal-100 text-teal-800",
    "bg-orange-100 text-orange-800",
    "bg-blue-100 text-blue-800",
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Översikt och användarhantering</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Totalt användare", value: users.length, sub: "Registrerade", icon: Users },
          { label: "Admins", value: admins, sub: "Aktiva roller", icon: Shield },
          { label: "Vanliga användare", value: users.length - admins, sub: "Standard roll", icon: UserCheck },
          { label: "Senaste 30 dagar", value: users.filter(u => {
            if (!u.created_at) return false;
            const d = new Date(u.created_at);
            return (Date.now() - d.getTime()) < 30 * 24 * 60 * 60 * 1000;
          }).length, sub: "Nya konton", icon: TrendingUp },
        ].map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="bg-secondary rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">{label}</span>
              <Icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-semibold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* User table */}
      <div className="border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b flex items-center justify-between bg-secondary/50">
          <span className="text-sm font-medium flex items-center gap-2">
            <Users className="w-4 h-4" /> Användare
          </span>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Sök..."
              className="pl-8 pr-3 py-1.5 text-sm bg-background border rounded-lg outline-none w-48"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Laddar användare...</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-secondary/30">
                <th className="text-left px-4 py-2.5 font-normal text-muted-foreground">Namn</th>
                <th className="text-left px-4 py-2.5 font-normal text-muted-foreground">E-post</th>
                <th className="text-left px-4 py-2.5 font-normal text-muted-foreground">Roll</th>
                <th className="text-left px-4 py-2.5 font-normal text-muted-foreground">Skapad</th>
                <th className="text-center px-4 py-2.5 font-normal text-muted-foreground">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} className="border-b last:border-0 hover:bg-secondary/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${avatarColors[i % avatarColors.length]}`}>
                        {initials(user.display_name)}
                      </div>
                      {user.display_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-secondary text-muted-foreground border"
                    }`}>
                      {user.role === "admin" && <Shield className="w-3 h-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString("sv-SE") : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => toggleAdmin(user)}
                        className="px-3 py-1 rounded-lg border text-xs hover:bg-secondary transition-colors"
                      >
                        {user.role === "admin" ? "Ta bort admin" : "Gör admin"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground text-sm">Inga användare hittades</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
