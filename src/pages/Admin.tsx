import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function Admin() {
  const [status, setStatus] = useState("Startar...");

  useEffect(() => {
    async function createAdmin() {
      try {
        // Kolla om admin redan finns
        const { data: existing } = await supabase
          .from("profiles")
          .select("id")
          .eq("email", "osman@ottoman.se")
          .single();

        if (existing) {
          setStatus("Admin finns redan!");
          return;
        }

        // Skapa användare
        const { data: userData, error: signUpError } = await supabase.auth.signUp({
          email: "osman@ottoman.se",
          password: "test1234",
        });

        if (signUpError) {
          setStatus("Fel vid signup: " + signUpError.message);
          return;
        }

        // Skapa profilen
        await supabase.from("profiles").insert({
          user_id: userData.user?.id,
          email: "osman@ottoman.se",
          display_name: "Osman",
        });

        // Ge admin-roll
        await supabase.from("user_roles").insert({
          user_id: userData.user?.id,
          role: "admin",
        });

        setStatus("Admin skapad!");
      } catch (err: any) {
        console.error(err);
        setStatus("Fel: " + err.message);
      }
    }

    createAdmin();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto mt-20 text-center border rounded-lg shadow-lg bg-white">
      <h1 className="text-xl font-bold mb-4">Admin Skapare</h1>
      <p>{status}</p>
      <p className="mt-2 text-xs text-gray-500">
        OBS: Ta bort denna fil efter första körningen!
      </p>
    </div>
  );
}
