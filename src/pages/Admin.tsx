import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, User, Shield } from "lucide-react";

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: string;
}

export default function Admin() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  // Hämta alla användare + deras roller
  const fetchUsers = async () => {
    setLoading(true);
    const { data: profiles } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        display_name,
        user_roles!inner(role)
      `);

    if (profiles) {
      const formatted = profiles.map((p: any) => ({
        id: p.id,
        email: p.email,
        display_name: p.display_name,
        role: p.user_roles.role
      }));
      setUsers(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Ta bort användare
  const deleteUser = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort denna användare?")) return;

    await supabase.from("profiles").delete().eq("id", id);
    await supabase.from("user_roles").delete().eq("user_id", id);
    await supabase.auth.admin.deleteUser(id); // OBS: Endast admin auth key fungerar
    fetchUsers();
  };

  // Byt roll
  const toggleAdmin = async (user: UserProfile) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    await supabase.from("user_roles").upsert({
      user_id: user.id,
      role: newRole
    });
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🌟 Admin Panel</h1>
      {loading ? (
        <p>Laddar användare...</p>
      ) : (
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Namn</th>
              <th className="p-3 text-left">E-mail</th>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3 flex items-center gap-2"><User className="w-5 h-5" /> {user.display_name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  {user.role}
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => toggleAdmin(user)}
                    className="px-3 py-1 rounded bg-yellow-300 text-black text-sm"
                  >
                    Byt roll
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                  >
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
