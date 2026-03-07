import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { empire_id = "ottoman", count = 5 } = await req.json();

    // Count existing active questions
    const { count: existingCount } = await supabase
      .from("quiz_questions")
      .select("*", { count: "exact", head: true })
      .eq("empire_id", empire_id)
      .eq("active", true);

    const empireName = empire_id === "roman" ? "Roman Empire" : "Ottoman Empire";

    const prompt = `Generate ${count} unique historical quiz questions about the ${empireName}. 
Each question must have exactly 4 options with one correct answer.
Cover topics: expansion, administration, military, decline.
Mix difficulties: easy, medium, advanced.

Return ONLY a JSON array with this exact structure:
[{
  "topic": "expansion|administration|military|decline",
  "difficulty": "easy|medium|advanced",
  "question_en": "English question?",
  "question_sv": "Swedish question?",
  "question_tr": "Turkish question?",
  "options_en": ["opt1","opt2","opt3","opt4"],
  "options_sv": ["opt1","opt2","opt3","opt4"],
  "options_tr": ["opt1","opt2","opt3","opt4"],
  "correct_index": 0,
  "explanation_en": "English explanation",
  "explanation_sv": "Swedish explanation",
  "explanation_tr": "Turkish explanation"
}]

Make questions historically accurate and educational. Do not repeat common questions about Constantinople's fall or Janissaries.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a historian generating quiz questions. Return ONLY valid JSON arrays, no markdown." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const status = aiResponse.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${status}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "";
    
    // Parse JSON from response (handle markdown code blocks)
    let questions;
    try {
      const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      questions = JSON.parse(jsonStr);
    } catch {
      throw new Error("Failed to parse AI response as JSON");
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("No questions generated");
    }

    // If over 100 questions, deactivate oldest ones
    const totalAfter = (existingCount || 0) + questions.length;
    if (totalAfter > 100) {
      const toDeactivate = totalAfter - 100;
      const { data: oldest } = await supabase
        .from("quiz_questions")
        .select("id")
        .eq("empire_id", empire_id)
        .eq("active", true)
        .order("created_at", { ascending: true })
        .limit(toDeactivate);

      if (oldest && oldest.length > 0) {
        const ids = oldest.map((q: any) => q.id);
        await supabase.from("quiz_questions").update({ active: false }).in("id", ids);
      }
    }

    // Insert new questions
    const rows = questions.map((q: any) => ({
      empire_id,
      topic: q.topic || "expansion",
      difficulty: q.difficulty || "easy",
      question_sv: q.question_sv,
      question_en: q.question_en,
      question_tr: q.question_tr || "",
      options_sv: q.options_sv,
      options_en: q.options_en,
      options_tr: q.options_tr || [],
      correct_index: q.correct_index,
      explanation_sv: q.explanation_sv || "",
      explanation_en: q.explanation_en || "",
      explanation_tr: q.explanation_tr || "",
      active: true,
    }));

    const { error: insertError } = await supabase.from("quiz_questions").insert(rows);
    if (insertError) throw insertError;

    return new Response(JSON.stringify({ success: true, generated: questions.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-questions error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});