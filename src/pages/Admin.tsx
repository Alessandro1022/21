// src/pages/Admin.tsx
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Home, Shield, Users } from "lucide-react";
import { CSVLink } from "react-csv";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ottomanCrest from "@/assets/ottoman-crest.jpg";

interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string;
}

interface QuizResult {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  created_at: string;
}

export default function Admin() {
  const { user, isAdmin, loading, adminChecked } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [search, setSearch] = useState("");
  const [topUsers, setTopUsers] = useState<{ profile: Profile; count: number }[]>([]);
  const [activityData, setActivityData] = useState<{ date: string; quizzes: number }[]>([]);

  // Fetch all profiles
  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setProfiles(data);
    setLoadingProfiles(false);
  };

  // Fetch quiz results
  const fetchQuizResults = async () => {
    const { data } = await supabase.from("quiz_results").select("*");
    if (data) {
      setQuizResults(data);
      computeActivityGraph(data);
      computeTopUsers(data);
    }
  };

  // Compute top 10 most active users
  const computeTopUsers = (results: QuizResult[]) => {
    const counts: Record<string, number> = {};
    results.forEach((r) => (counts[r.user_id] = (counts[r.user_id] || 0) + 1));
    const top = Object.entries(counts)
      .map(([user_id, count]) => ({ profile: profiles.find((p) => p.user_id === user_id)!, count }))
      .filter((p) => p.profile) // remove undefined
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    setTopUsers(top);
  };

  // Compute quiz activity graph
  const computeActivityGraph = (results: QuizResult[]) => {
    const counts: Record<string, number> = {};
    results.forEach((r) => {
      const date = new Date(r.created_at).toLocaleDateString();
      counts[date] = (counts[date] || 0) + 1;
    });
    const chartData = Object.entries(counts).map(([date, quizzes]) => ({ date, quizzes }));
    setActivityData(chartData);
  };

  // Delete user
  const deleteUser = async (profile: Profile) => {
    if (!profile.id) return;
    await supabase.from("profiles").delete().eq("id", profile.id);
    setProfiles(profiles.filter((p) => p.id !== profile.id));
  };

  // Toggle admin role
  const toggleRole = async (profile: Profile) => {
    const newRole = profile.role === "admin" ? "user" : "admin";
    await supabase.from("profiles").update({ role: newRole }).eq("id", profile.id);
    setProfiles(profiles.map((p) => (p.id === profile.id ? { ...p, role: newRole } : p)));
  };

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles();
      fetchQuizResults();

      const subscription = supabase
        .from("quiz_results")
        .on("INSERT", (payload) => {
          setQuizResults((prev) => [...prev, payload.new]);
          computeActivityGraph([...quizResults, payload.new]);
          computeTopUsers([...quizResults, payload.new]);
        })
        .subscribe();

      return () => {
        supabase.removeSubscription(subscription);
      };
    }
  }, [isAdmin]);

  if (loading || !adminChecked)
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );

  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const filteredProfiles = profiles.filter(
    (p) =>
      (p.display_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      (p.email?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

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

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-10">
        {/* Search */}
        <input
          type="text"
          placeholder="Sök användare..."
          className="border px-3 py-2 rounded w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Users Table */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Alla användare{" "}
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-sans">
              {filteredProfiles.length}
            </span>
          </h2>
          <div className="bg-card ottoman-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">Avatar</th>
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">Användare</th>
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">E-post</th>
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">Registrerad</th>
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">Roll</th>
                  <th className="px-4 py-3 text-xs font-sans text-muted-foreground text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProfiles.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      {p.avatar_url ? (
                        <img src={p.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-sans text-secondary-foreground">
                          {(p.display_name || p.email || "?")[0].toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm font-sans text-foreground">{p.display_name || "—"}</td>
                    <td className="px-4 py-3 text-sm font-sans text-muted-foreground">{p.email || "—"}</td>
                    <td className="px-4 py-3 text-sm font-sans text-muted-foreground">
                      {new Date(p.created_at).toLocaleDateString("sv-SE")}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => toggleRole(p)}
                      >
                        {p.role || "user"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-600 hover:underline" onClick={() => deleteUser(p)}>
                        Radera
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <CSVLink
              data={filteredProfiles}
              filename="users.csv"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Export Users CSV
            </CSVLink>
          </div>
        </section>

        {/* Top 10 Active Users */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-2">Top 10 mest aktiva användare</h2>
          <ol className="list-decimal pl-6">
            {topUsers.map((u) => (
              <li key={u.profile.id}>
                {u.profile.email} - {u.count} quiz
              </li>
            ))}
          </ol>
        </section>

        {/* Quiz Activity Graph */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-4">Quiz aktivitet över tid</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="quizzes" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </main>
    </div>
  );
}
