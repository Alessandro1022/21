import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Home, Shield, Users } from "lucide-react";
import ottomanCrest from "@/assets/ottoman-crest.jpg";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, loading, adminChecked } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);

  useEffect(() => {
    if (isAdmin) fetchProfiles();
  }, [isAdmin]);

  async function fetchProfiles() {
    setLoadingProfiles(true);
    const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    if (!error && data) setProfiles(data);
    setLoadingProfiles(false);
  }

  // Wait for both auth and admin check to complete
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
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Home className="w-4 h-4 text-muted-foreground" />
            </Link>
            <img src={ottomanCrest} alt="" className="w-8 h-8 rounded-lg object-cover" />
            <div>
              <h1 className="text-lg font-serif text-primary flex items-center gap-2">
                <Shield className="w-4 h-4" /> Admin Dashboard
              </h1>
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-sans">{user.email}</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-serif text-foreground">Alla användare</h2>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-sans">{profiles.length}</span>
        </div>

        {loadingProfiles ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="bg-card ottoman-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Användare</th>
                  <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">E-post</th>
                  <th className="text-left px-4 py-3 text-xs font-sans text-muted-foreground font-medium">Registrerad</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
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
                    <td className="px-4 py-3 text-sm font-sans text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString("sv-SE")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
