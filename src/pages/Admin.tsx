import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Home, Shield, Users, Trash2, Search } from "lucide-react";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  role?: string;
}

export default function Admin() {
  const { user, isAdmin, loading, adminChecked } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (isAdmin) fetchProfiles();
  }, [isAdmin]);

  async function fetchProfiles() {
    setLoadingProfiles(true);
    try {
      const { data: users, error } = await supabase
        .from("profiles")
        .select("*, user_roles(role)")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const profilesWithRole = users?.map((p: any) => ({
        ...p,
        role: p.user_roles?.[0]?.role || "user",
      }));

      setProfiles(profilesWithRole || []);
    } catch (err) {
      console.error("Failed to fetch profiles:", err);
    } finally {
      setLoadingProfiles(false);
    }
  }

  async function deleteUser(userId: string) {
    if (!confirm("Vill du verkligen ta bort användaren?")) return;
    try {
      await supabase.from("profiles").delete().eq("id", userId);
      await supabase.from("user_roles").delete().eq("user_id", userId);
      setProfiles((prev) => prev.filter((p) => p.id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  }

  const filtered = profiles.filter(
    (p) =>
      p.display_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  if (loading || !adminChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Home className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div>
              <h1 className="text-lg font-serif text-primary flex items-center gap-2">
                <Shield className="w-5 h-5" /> Admin Dashboard
              </h1>
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-sans">{user.email}</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif text-foreground">Alla användare</h2>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-sans">
              {profiles.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Sök användare..."
              className="px-3 py-1 border rounded-md text-sm font-sans"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loadingProfiles ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="bg-card rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Användare</th>
                    <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">E-post</th>
                    <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Roll</th>
                    <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Registrerad</th>
                    <th className="px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Åtgärd</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.avatar_url ? (
                            <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-sans text-secondary-foreground">
                              {(p.display_name || p.email || "?")[0].toUpperCase()}
                            </div>
                          )}
                          <span className="text-sm font-sans text-foreground">{p.display_name || "—"}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{p.email || "—"}</td>
                      <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{p.role}</td>
                      <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{new Date(p.created_at).toLocaleDateString("sv-SE")}</td>
                      <td className="px-4 py-3 text-sm font-sans text-muted-foreground">
                        {p.role !== "admin" && (
                          <button
                            className="flex items-center gap-1 text-red-500 hover:underline"
                            onClick={() => deleteUser(p.id)}
                          >
                            <Trash2 className="w-4 h-4" /> Ta bort
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Föregående
              </button>
              <span className="px-2 py-1 text-sm font-sans">
                {page} / {totalPages}
              </span>
              <button
                className="px-2 py-1 border rounded disabled:opacity-50"
                disabled={page === totalPages || totalPages === 0}
                onClick={() => setPage(page + 1)}
              >
                Nästa
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
