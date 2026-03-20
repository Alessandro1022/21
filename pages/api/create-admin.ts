import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Supabase URL + service key (lägg i Vercel Environment Variables)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_EMAIL = "osman@ottoman.se";
const ADMIN_PASSWORD = "test1234";

type ResponseData = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    // Kolla om användaren redan finns
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", ADMIN_EMAIL)
      .single();

    let userId: string;

    if (!existingUser) {
      // Skapa användaren via Supabase Admin API
      const { data: newUser, error } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
      });

      if (error) throw error;
      if (!newUser) throw new Error("Could not create admin user");

      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    // Lägg till admin-roll i user_roles
    await supabase.from("user_roles").upsert({
      user_id: userId,
      role: "admin",
    });

    res.status(200).json({ message: "Admin user created / updated successfully!" });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
