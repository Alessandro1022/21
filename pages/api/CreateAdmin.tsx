import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function CreateAdmin() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function createAdmin() {
      try {
        // Kolla om admin redan finns
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("*")
          .eq("email", "osman@ottoman.se")
          .single();

        if (existingUser) {
          setStatus("Admin finns redan!");
          return;
        }

        // Skapa användaren
        const { data: newUser, error: signUpError } = await supabase.auth.signUp({
          email: "osman@ottoman.se",
          password: "test1234",
        });

        if (signUpError) {
          setStatus("Fel vid skapande: " + signUpError.message);
          return;
        }

        // Skapa profil
        await supabase.from("profiles").insert({
          user_id: newUser.user?.id,
          email: "osman@ottoman.se",
          display_name: "Osman",
        });

        // Sätt admin-roll
        await supabase.from("user_roles").insert({
          user_id: newUser.user?.id,
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

  return <div className="p-6 text-center">{status}</div>;
}
