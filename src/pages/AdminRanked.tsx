// src/pages/AdminRanked.tsx — ADMIN TOURNAMENT CONTROL PANEL ✦ v1.0
// ══════════════════════════════════════════════════════════════════════
// ✔ Create / activate / deactivate events
// ✔ Add / edit / delete questions (with empire tag + difficulty)
// ✔ Configure 3-tier rewards
// ✔ View live results + leaderboard
// ✔ Export top-3 emails for reward distribution
// ✔ Matches Empire AI design system exactly
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import {
  Calendar, Plus, Trash2, Edit3, CheckCircle, XCircle,
  Trophy, Award, Sword, Crown, ChevronDown, AlertCircle,
  Download, RefreshCw, Eye, Shield, Flame, Clock, Star,
  Users, ToggleLeft, ToggleRight, Save, X,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

type AnswerKey = "A" | "B" | "C" | "D";
type AdminTab  = "events" | "questions" | "rewards" | "results";

interface RankedEvent {
  id:         string;
  title:      string;
  start_time: string;
  end_time:   string;
  is_active:  boolean;
  created_at: string;
}

interface RankedQuestion {
  id:             string;
  event_id:       string;
  question:       string;
  option_a:       string;
  option_b:       string;
  option_c:       string;
  option_d:       string;
  correct_answer: AnswerKey;
  empire_tag:     string;
  difficulty:     "easy" | "medium" | "hard";
  sort_order:     number;
}

interface RankedReward {
  id:          string;
  event_id:    string;
  rank:        number;
  reward_text: string;
}

interface LeaderboardEntry {
  id:            string;
  user_id:       string;
  event_id:      string;
  score:         number;
  correct_count: number;
  total_count:   number;
  submitted_at:  string;
  time_taken_s?: number;
  display_name?: string;
  rank:          number;
}

interface TopEmail {
  rank:         number;
  display_name: string;
  email:        string;
  score:        number;
}

// ══════════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════════

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman Empire",    flag: "🕌" },
  { id: "roman",             label: "Roman Empire",      flag: "🏛️" },
  { id: "islamic_caliphate", label: "Islamic Caliphate", flag: "☪️" },
  { id: "mongol_empire",     label: "Mongol Empire",     flag: "⚔️" },
  { id: "ancient_egypt",     label: "Ancient Egypt",     flag: "𓂀" },
  { id: "british_empire",    label: "British Empire",    flag: "👑" },
  { id: "japanese_empire",   label: "Japanese Empire",   flag: "⛩️" },
  { id: "mali_empire",       label: "Mali Empire",       flag: "🌍" },
  { id: "seljuk_empire",     label: "Seljuk Empire",     flag: "🗡️" },
] as const;

// ══════════════════════════════════════════════════════════════════════
// GLOBAL CSS
// ══════════════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}
@keyframes adm-spin     { to{transform:rotate(360deg)} }
@keyframes adm-fadeup   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes adm-shimmer  { 0%,100%{opacity:.35} 50%{opacity:.7} }
@keyframes adm-glow     { 0%,100%{box-shadow:0 0 18px rgba(212,175,55,.1)} 50%{box-shadow:0 0 46px rgba(212,175,55,.3)} }
@keyframes adm-modal-in { from{opacity:0;transform:scale(.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(212,175,55,.22);border-radius:2px;}
.adm-input {
  background:rgba(10,6,2,.78); border:1px solid rgba(212,175,55,.2); border-radius:12px;
  color:#EDE0C4; font-family:'Raleway',sans-serif; font-size:.875rem;
  width:100%; outline:none; transition:border-color .25s, box-shadow .25s;
}
.adm-input:focus {
  border-color:rgba(212,175,55,.52);
  box-shadow:0 0 0 3px rgba(212,175,55,.08), 0 0 16px rgba(212,175,55,.06);
}
.adm-input::placeholder{color:rgba(237,224,196,.2);}
.adm-input option{background:#0c0802;color:#EDE0C4;}
.adm-gold-btn {
  background:linear-gradient(135deg,#C9A227,#D4AF37,#EDD060,#B8901E);
  color:#08050F; font-weight:700; border:none; border-radius:12px;
  box-shadow:0 4px 22px rgba(212,175,55,.35);
  transition:all .22s; cursor:pointer;
  font-family:'Cinzel',serif; letter-spacing:.12em;
}
.adm-gold-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 10px 36px rgba(212,175,55,.5);filter:brightness(1.07);}
.adm-gold-btn:disabled{opacity:.42;cursor:not-allowed;}
.adm-tab {
  display:inline-flex;align-items:center;gap:6px;
  padding:9px 16px;border-radius:12px;
  font-family:'Cinzel',serif;font-size:.68rem;letter-spacing:.1em;
  transition:all .22s;white-space:nowrap;
  border:1px solid transparent;cursor:pointer;
  background:transparent;color:rgba(237,224,196,.38);
}
.adm-tab:hover{color:rgba(237,224,196,.7);background:rgba(212,175,55,.06);}
.adm-tab.active{
  background:linear-gradient(135deg,rgba(168,85,247,.16),rgba(147,51,234,.1));
  border-color:rgba(168,85,247,.44);color:#c084fc;
  box-shadow:0 0 18px rgba(168,85,247,.1);
}
.adm-danger-btn {
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(216,90,48,.08);border:1px solid rgba(216,90,48,.24);
  color:rgba(216,90,48,.7);border-radius:9px;padding:7px 14px;
  font-size:.68rem;cursor:pointer;transition:all .2s;
  font-family:'Cinzel',serif;letter-spacing:.08em;
}
.adm-danger-btn:hover{background:rgba(216,90,48,.2);color:#D85A30;transform:translateY(-1px);}
.adm-success-btn {
  display:inline-flex;align-items:center;gap:5px;
  background:rgba(29,158,117,.1);border:1px solid rgba(29,158,117,.3);
  color:#1D9E75;border-radius:9px;padding:7px 14px;
  font-size:.68rem;cursor:pointer;transition:all .2s;
  font-family:'Cinzel',serif;letter-spacing:.08em;
}
.adm-success-btn:hover{background:rgba(29,158,117,.22);transform:translateY(-1px);}
.adm-skel{
  background:linear-gradient(90deg,rgba(168,85,247,.04) 25%,rgba(168,85,247,.1) 50%,rgba(168,85,247,.04) 75%);
  background-size:200% 100%;animation:adm-shimmer 1.9s ease-in-out infinite;border-radius:8px;
}
.adm-fade{animation:adm-fadeup .4s ease both;}
`;

// ══════════════════════════════════════════════════════════════════════
// UTILITIES
// ══════════════════════════════════════════════════════════════════════

function Spinner({ size = 15, color = "#D4AF37" }: { size?: number; color?: string }) {
  return (
    <div style={{
      width: size, height: size,
      border: `2px solid ${color}28`, borderTopColor: color,
      borderRadius: "50%", animation: "adm-spin .7s linear infinite", flexShrink: 0,
    }} />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block", fontSize: ".64rem",
      color: "rgba(212,175,55,.6)", marginBottom: 8,
      fontFamily: "'Cinzel',serif", letterSpacing: ".18em",
    }}>
      {children}
    </label>
  );
}

function FieldGroup({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ marginBottom: 18, ...style }}>{children}</div>;
}

function SectionCard({ children, accent = "#c084fc" }: { children: React.ReactNode; accent?: string }) {
  return (
    <div style={{
      background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.93))",
      border: "1px solid rgba(168,85,247,.18)", borderRadius: 20, overflow: "hidden",
      boxShadow: "0 4px 28px rgba(0,0,0,.42)",
    }}>
      <div style={{ height: 2.5, background: `linear-gradient(90deg,transparent,${accent}88,transparent)` }} />
      {children}
    </div>
  );
}

function toDatetimeLocal(iso: string) {
  if (!iso) return "";
  return iso.slice(0, 16);
}

function fromDatetimeLocal(local: string): string {
  if (!local) return "";
  return new Date(local).toISOString();
}

// ══════════════════════════════════════════════════════════════════════
// EVENTS TAB
// ══════════════════════════════════════════════════════════════════════

function EventsTab() {
  const NEXT_SAT_10 = (() => {
    const d = new Date();
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    d.setHours(10, 0, 0, 0);
    return toDatetimeLocal(d.toISOString());
  })();

  const [events,  setEvents]  = useState<RankedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({
    title:      "Weekly Empire Tournament",
    start_time: NEXT_SAT_10,
    end_time:   NEXT_SAT_10.replace("T10:00", "T20:00"),
    is_active:  true,
  });

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("ranked_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20);
    setEvents((data ?? []) as RankedEvent[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleCreate = async () => {
    if (!form.title || !form.start_time || !form.end_time) return;
    setSaving(true);

    // Deactivate others if this will be active
    if (form.is_active) {
      await supabase.from("ranked_events")
        .update({ is_active: false })
        .eq("is_active", true);
    }

    await supabase.from("ranked_events").insert({
      title:      form.title,
      start_time: fromDatetimeLocal(form.start_time),
      end_time:   fromDatetimeLocal(form.end_time),
      is_active:  form.is_active,
    });

    await load();
    setSaving(false);
  };

  const toggleActive = async (event: RankedEvent) => {
    if (!event.is_active) {
      // Deactivate all first
      await supabase.from("ranked_events").update({ is_active: false }).eq("is_active", true);
    }
    await supabase.from("ranked_events")
      .update({ is_active: !event.is_active })
      .eq("id", event.id);
    await load();
  };

  const deleteEvent = async (id: string) => {
    if (!confirm("Delete this event and ALL its questions, submissions and rewards?")) return;
    await supabase.from("ranked_events").delete().eq("id", id);
    await load();
  };

  return (
    <div className="adm-fade">
      {/* Create form */}
      <SectionCard accent="#D4AF37">
        <div style={{ padding: "22px 22px 20px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 20,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Plus style={{ width: 15, height: 15, color: "#D4AF37" }} />
            </div>
            <span style={{
              fontFamily: "'Cinzel',serif", fontSize: ".78rem",
              letterSpacing: ".14em", color: "#D4AF37",
            }}>
              CREATE EVENT
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FieldGroup style={{ gridColumn: "1 / -1" }}>
              <Label>EVENT TITLE</Label>
              <input
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="adm-input"
                style={{ padding: "11px 14px" }}
                placeholder="Weekly Empire Tournament"
              />
            </FieldGroup>

            <FieldGroup>
              <Label>START TIME</Label>
              <input
                type="datetime-local"
                value={form.start_time}
                onChange={e => setForm(p => ({ ...p, start_time: e.target.value }))}
                className="adm-input"
                style={{ padding: "11px 14px", colorScheme: "dark" }}
              />
            </FieldGroup>

            <FieldGroup>
              <Label>END TIME</Label>
              <input
                type="datetime-local"
                value={form.end_time}
                onChange={e => setForm(p => ({ ...p, end_time: e.target.value }))}
                className="adm-input"
                style={{ padding: "11px 14px", colorScheme: "dark" }}
              />
            </FieldGroup>
          </div>

          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", marginTop: 4,
          }}>
            <button
              onClick={() => setForm(p => ({ ...p, is_active: !p.is_active }))}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              {form.is_active
                ? <ToggleRight style={{ width: 26, height: 26, color: "#1D9E75" }} />
                : <ToggleLeft  style={{ width: 26, height: 26, color: "rgba(237,224,196,.3)" }} />}
              <span style={{
                fontSize: ".74rem", fontFamily: "'Raleway',sans-serif",
                color: form.is_active ? "#1D9E75" : "rgba(237,224,196,.38)",
              }}>
                {form.is_active ? "Active (live)" : "Inactive (draft)"}
              </span>
            </button>

            <button
              onClick={handleCreate}
              disabled={saving || !form.title || !form.start_time || !form.end_time}
              className="adm-gold-btn"
              style={{ padding: "11px 22px", fontSize: ".74rem" }}
            >
              {saving
                ? <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Spinner size={13} color="#08050F" /> Creating…</span>
                : <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Plus style={{ width: 13, height: 13 }} /> Create Event</span>
              }
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Events list */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        {loading ? (
          [1, 2].map(i => <div key={i} className="adm-skel" style={{ height: 80, borderRadius: 16 }} />)
        ) : events.length === 0 ? (
          <div style={{
            padding: "42px 20px", textAlign: "center",
            fontSize: ".8rem", color: "rgba(237,224,196,.26)",
            fontFamily: "'Raleway',sans-serif", fontStyle: "italic",
          }}>
            No events created yet.
          </div>
        ) : (
          events.map(ev => {
            const now   = Date.now();
            const start = new Date(ev.start_time).getTime();
            const end   = new Date(ev.end_time).getTime();
            const state = now < start ? "upcoming" : now < end ? "live" : "ended";
            const stateColor = state === "live" ? "#1D9E75" : state === "upcoming" ? "#D4AF37" : "rgba(237,224,196,.3)";

            return (
              <div key={ev.id} style={{
                background: "rgba(212,175,55,.04)",
                border: ev.is_active ? "1px solid rgba(29,158,117,.28)" : "1px solid rgba(212,175,55,.1)",
                borderRadius: 16, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
              }}>
                {ev.is_active && (
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#1D9E75", flexShrink: 0,
                    boxShadow: "0 0 8px #1D9E75",
                    animation: "adm-glow 2s ease-in-out infinite",
                  }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: ".98rem", color: "#EDE0C4",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {ev.title}
                  </p>
                  <p style={{
                    fontSize: ".68rem", color: "rgba(237,224,196,.28)",
                    fontFamily: "'Raleway',sans-serif", marginTop: 2,
                  }}>
                    {new Date(ev.start_time).toLocaleString()} → {new Date(ev.end_time).toLocaleString()}
                  </p>
                </div>
                <span style={{
                  fontSize: ".62rem", letterSpacing: ".14em",
                  padding: "2px 10px", borderRadius: 10,
                  background: `${stateColor}18`,
                  border: `1px solid ${stateColor}38`,
                  color: stateColor, fontFamily: "'Cinzel',serif",
                  flexShrink: 0,
                }}>
                  {state}
                </span>
                <button onClick={() => toggleActive(ev)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center",
                }}>
                  {ev.is_active
                    ? <ToggleRight style={{ width: 22, height: 22, color: "#1D9E75" }} />
                    : <ToggleLeft  style={{ width: 22, height: 22, color: "rgba(237,224,196,.26)" }} />}
                </button>
                <button onClick={() => deleteEvent(ev.id)} className="adm-danger-btn" style={{ padding: "5px 10px" }}>
                  <Trash2 style={{ width: 12, height: 12 }} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// QUESTIONS TAB
// ══════════════════════════════════════════════════════════════════════

function QuestionsTab() {
  const [events,    setEvents]    = useState<RankedEvent[]>([]);
  const [selEvent,  setSelEvent]  = useState("");
  const [questions, setQuestions] = useState<RankedQuestion[]>([]);
  const [loading,   setLoading]   = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [editId,    setEditId]    = useState<string | null>(null);

  const blankForm = {
    question: "", option_a: "", option_b: "", option_c: "", option_d: "",
    correct_answer: "A" as AnswerKey,
    empire_tag: "ottoman", difficulty: "medium" as "easy" | "medium" | "hard",
    sort_order: 0,
  };
  const [form, setForm] = useState(blankForm);

  useEffect(() => {
    supabase.from("ranked_events").select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setEvents((data ?? []) as RankedEvent[]);
        if (data && data.length > 0) setSelEvent(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!selEvent) return;
    setLoading(true);
    supabase.from("ranked_questions").select("*")
      .eq("event_id", selEvent)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setQuestions((data ?? []) as RankedQuestion[]);
        setLoading(false);
      });
  }, [selEvent]);

  const upsert = async () => {
    if (!selEvent || !form.question || !form.option_a || !form.option_b || !form.option_c || !form.option_d) return;
    setSaving(true);

    if (editId) {
      await supabase.from("ranked_questions").update({ ...form }).eq("id", editId);
    } else {
      await supabase.from("ranked_questions").insert({ ...form, event_id: selEvent });
    }

    // Reload
    const { data } = await supabase.from("ranked_questions").select("*")
      .eq("event_id", selEvent).order("sort_order", { ascending: true });
    setQuestions((data ?? []) as RankedQuestion[]);
    setForm(blankForm);
    setEditId(null);
    setSaving(false);
  };

  const startEdit = (q: RankedQuestion) => {
    setForm({
      question: q.question, option_a: q.option_a, option_b: q.option_b,
      option_c: q.option_c, option_d: q.option_d,
      correct_answer: q.correct_answer, empire_tag: q.empire_tag,
      difficulty: q.difficulty, sort_order: q.sort_order,
    });
    setEditId(q.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteQ = async (id: string) => {
    if (!confirm("Delete this question?")) return;
    await supabase.from("ranked_questions").delete().eq("id", id);
    setQuestions(p => p.filter(q => q.id !== id));
  };

  const DIFF_COLORS = { easy: "#1D9E75", medium: "#D4AF37", hard: "#D85A30" };

  return (
    <div className="adm-fade">
      {/* Event selector */}
      <div style={{ marginBottom: 18, position: "relative" }}>
        <Label>SELECT EVENT</Label>
        <select
          value={selEvent}
          onChange={e => setSelEvent(e.target.value)}
          className="adm-input"
          style={{ padding: "11px 34px 11px 14px", appearance: "none" }}
        >
          {events.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title} — {new Date(ev.start_time).toLocaleDateString()}</option>
          ))}
        </select>
        <ChevronDown style={{
          position: "absolute", right: 12, top: "calc(50% + 10px)",
          transform: "translateY(-50%)",
          width: 14, height: 14, color: "rgba(212,175,55,.38)", pointerEvents: "none",
        }} />
      </div>

      {/* Question count */}
      {selEvent && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          marginBottom: 18,
        }}>
          <span style={{
            fontSize: ".7rem", fontFamily: "'Cinzel',serif",
            letterSpacing: ".14em", color: "rgba(168,85,247,.72)",
          }}>
            {questions.length} QUESTIONS
          </span>
          <div style={{
            flex: 1, height: 1,
            background: "linear-gradient(90deg,rgba(168,85,247,.18),transparent)",
          }} />
          <span style={{
            fontSize: ".65rem", color: "rgba(237,224,196,.24)",
            fontFamily: "'Raleway',sans-serif",
          }}>
            Recommended: 20–30
          </span>
        </div>
      )}

      {/* Form */}
      <SectionCard accent={editId ? "#E8A030" : "#c084fc"}>
        <div style={{ padding: "20px 20px 18px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 8, marginBottom: 18,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
              background: editId ? "rgba(232,160,48,.12)" : "rgba(168,85,247,.12)",
              border: `1px solid ${editId ? "rgba(232,160,48,.3)" : "rgba(168,85,247,.3)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {editId
                ? <Edit3 style={{ width: 13, height: 13, color: "#E8A030" }} />
                : <Plus  style={{ width: 13, height: 13, color: "#c084fc" }} />}
            </div>
            <span style={{
              fontFamily: "'Cinzel',serif", fontSize: ".72rem", letterSpacing: ".14em",
              color: editId ? "#E8A030" : "#c084fc",
            }}>
              {editId ? "EDIT QUESTION" : "ADD QUESTION"}
            </span>
            {editId && (
              <button
                onClick={() => { setForm(blankForm); setEditId(null); }}
                style={{
                  marginLeft: "auto", background: "none", border: "none",
                  cursor: "pointer", color: "rgba(237,224,196,.35)",
                  display: "flex", alignItems: "center",
                }}
              >
                <X style={{ width: 15, height: 15 }} />
              </button>
            )}
          </div>

          <FieldGroup>
            <Label>QUESTION TEXT</Label>
            <textarea
              value={form.question}
              onChange={e => setForm(p => ({ ...p, question: e.target.value }))}
              placeholder="Enter the question..."
              className="adm-input"
              style={{ padding: "11px 13px", minHeight: 80, resize: "vertical", lineHeight: 1.6 }}
            />
          </FieldGroup>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["A","B","C","D"] as AnswerKey[]).map(key => (
              <FieldGroup key={key}>
                <Label>OPTION {key}</Label>
                <input
                  value={(form as any)[`option_${key.toLowerCase()}`]}
                  onChange={e => setForm(p => ({ ...p, [`option_${key.toLowerCase()}`]: e.target.value }))}
                  placeholder={`Option ${key}`}
                  className="adm-input"
                  style={{
                    padding: "10px 13px",
                    borderColor: form.correct_answer === key ? "rgba(29,158,117,.44)" : undefined,
                    background: form.correct_answer === key ? "rgba(29,158,117,.06)" : undefined,
                  }}
                />
              </FieldGroup>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 4 }}>
            <FieldGroup>
              <Label>CORRECT ANSWER</Label>
              <div style={{ position: "relative" }}>
                <select
                  value={form.correct_answer}
                  onChange={e => setForm(p => ({ ...p, correct_answer: e.target.value as AnswerKey }))}
                  className="adm-input"
                  style={{ padding: "10px 32px 10px 13px", appearance: "none" }}
                >
                  {["A","B","C","D"].map(k => <option key={k} value={k}>Option {k}</option>)}
                </select>
                <ChevronDown style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  width: 13, height: 13, color: "rgba(29,158,117,.5)", pointerEvents: "none",
                }} />
              </div>
            </FieldGroup>

            <FieldGroup>
              <Label>EMPIRE TAG</Label>
              <div style={{ position: "relative" }}>
                <select
                  value={form.empire_tag}
                  onChange={e => setForm(p => ({ ...p, empire_tag: e.target.value }))}
                  className="adm-input"
                  style={{ padding: "10px 32px 10px 13px", appearance: "none" }}
                >
                  {ALL_EMPIRES.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.flag} {emp.label}</option>
                  ))}
                </select>
                <ChevronDown style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  width: 13, height: 13, color: "rgba(212,175,55,.38)", pointerEvents: "none",
                }} />
              </div>
            </FieldGroup>

            <FieldGroup>
              <Label>DIFFICULTY</Label>
              <div style={{ position: "relative" }}>
                <select
                  value={form.difficulty}
                  onChange={e => setForm(p => ({ ...p, difficulty: e.target.value as any }))}
                  className="adm-input"
                  style={{ padding: "10px 32px 10px 13px", appearance: "none" }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <ChevronDown style={{
                  position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                  width: 13, height: 13, color: `${(DIFF_COLORS as any)[form.difficulty]}88`, pointerEvents: "none",
                }} />
              </div>
            </FieldGroup>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
            <button
              onClick={upsert}
              disabled={saving || !form.question}
              className="adm-gold-btn"
              style={{ padding: "10px 22px", fontSize: ".74rem" }}
            >
              {saving
                ? <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Spinner size={12} color="#08050F" /> Saving…</span>
                : <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Save style={{ width: 13, height: 13 }} /> {editId ? "Update Question" : "Add Question"}</span>
              }
            </button>
          </div>
        </div>
      </SectionCard>

      {/* Questions list */}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        {loading ? (
          [1,2,3].map(i => <div key={i} className="adm-skel" style={{ height: 74, borderRadius: 13 }} />)
        ) : questions.map((q, i) => {
          const dc = (DIFF_COLORS as any)[q.difficulty] ?? "#D4AF37";
          const emp = ALL_EMPIRES.find(e => e.id === q.empire_tag);
          return (
            <div
              key={q.id}
              style={{
                background: editId === q.id ? "rgba(232,160,48,.06)" : "rgba(212,175,55,.03)",
                border: `1px solid ${editId === q.id ? "rgba(232,160,48,.3)" : "rgba(212,175,55,.1)"}`,
                borderRadius: 13, padding: "12px 14px",
                display: "flex", alignItems: "flex-start", gap: 12,
                animation: "adm-fadeup .35s ease both",
                animationDelay: `${i * 35}ms`,
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: "50%",
                background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.24)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: ".58rem", fontFamily: "'Cinzel',serif",
                color: "#c084fc", flexShrink: 0,
              }}>
                {i + 1}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: ".82rem", color: "#EDE0C4",
                  fontFamily: "'Raleway',sans-serif", lineHeight: 1.4,
                  overflow: "hidden", textOverflow: "ellipsis",
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}>
                  {q.question}
                </p>
                <div style={{ display: "flex", gap: 6, marginTop: 5, flexWrap: "wrap" }}>
                  <span style={{
                    fontSize: ".62rem", padding: "1px 8px", borderRadius: 8,
                    background: `${dc}14`, border: `1px solid ${dc}2e`, color: dc,
                    fontFamily: "'Cinzel',serif",
                  }}>
                    {q.difficulty}
                  </span>
                  {emp && (
                    <span style={{
                      fontSize: ".62rem", padding: "1px 8px", borderRadius: 8,
                      background: "rgba(212,175,55,.06)",
                      border: "1px solid rgba(212,175,55,.14)", color: "rgba(212,175,55,.6)",
                      fontFamily: "'Raleway',sans-serif",
                    }}>
                      {emp.flag} {emp.label.split(" ")[0]}
                    </span>
                  )}
                  <span style={{
                    fontSize: ".62rem", padding: "1px 8px", borderRadius: 8,
                    background: "rgba(29,158,117,.08)",
                    border: "1px solid rgba(29,158,117,.2)",
                    color: "#1D9E75", fontFamily: "'Cinzel',serif",
                  }}>
                    ✓ {q.correct_answer}
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => startEdit(q)} className="adm-success-btn" style={{ padding: "5px 10px" }}>
                  <Edit3 style={{ width: 11, height: 11 }} />
                </button>
                <button onClick={() => deleteQ(q.id)} className="adm-danger-btn" style={{ padding: "5px 10px" }}>
                  <Trash2 style={{ width: 11, height: 11 }} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// REWARDS TAB
// ══════════════════════════════════════════════════════════════════════

function RewardsTab() {
  const [events,  setEvents]  = useState<RankedEvent[]>([]);
  const [selEvent,setSelEvent]= useState("");
  const [rewards, setRewards] = useState<Record<number, string>>({ 1: "", 2: "", 3: "" });
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);

  useEffect(() => {
    supabase.from("ranked_events").select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setEvents((data ?? []) as RankedEvent[]);
        if (data && data.length > 0) setSelEvent(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!selEvent) return;
    supabase.from("ranked_rewards").select("*").eq("event_id", selEvent)
      .then(({ data }) => {
        const map: Record<number, string> = { 1: "", 2: "", 3: "" };
        (data ?? []).forEach((r: RankedReward) => { map[r.rank] = r.reward_text; });
        setRewards(map);
      });
  }, [selEvent]);

  const save = async () => {
    if (!selEvent) return;
    setSaving(true);
    // Upsert all 3 ranks
    for (const rank of [1, 2, 3]) {
      if (rewards[rank]) {
        await supabase.from("ranked_rewards").upsert(
          { event_id: selEvent, rank, reward_text: rewards[rank] },
          { onConflict: "event_id,rank" }
        );
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const REWARD_CFG = [
    { rank: 1, label: "🥇 1ST PLACE",  color: "#D4AF37", bg: "rgba(212,175,55,.08)", border: "rgba(212,175,55,.26)", ph: "e.g. Premium 7 days + Crown badge" },
    { rank: 2, label: "🥈 2ND PLACE",  color: "#C0C0C0", bg: "rgba(192,192,192,.06)", border: "rgba(192,192,192,.2)", ph: "e.g. 3-day XP Boost" },
    { rank: 3, label: "🥉 3RD PLACE",  color: "#CD7F32", bg: "rgba(205,127,50,.06)", border: "rgba(205,127,50,.2)", ph: "e.g. Special Title: Conqueror" },
  ];

  return (
    <div className="adm-fade">
      <div style={{ marginBottom: 18, position: "relative" }}>
        <Label>SELECT EVENT</Label>
        <select
          value={selEvent}
          onChange={e => setSelEvent(e.target.value)}
          className="adm-input"
          style={{ padding: "11px 34px 11px 14px", appearance: "none" }}
        >
          {events.map(ev => (
            <option key={ev.id} value={ev.id}>{ev.title}</option>
          ))}
        </select>
        <ChevronDown style={{
          position: "absolute", right: 12, top: "calc(50% + 10px)",
          transform: "translateY(-50%)",
          width: 14, height: 14, color: "rgba(212,175,55,.38)", pointerEvents: "none",
        }} />
      </div>

      <SectionCard accent="#D4AF37">
        <div style={{ padding: "22px 22px 20px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 22,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(212,175,55,.1)", border: "1px solid rgba(212,175,55,.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "adm-glow 5s ease-in-out infinite",
            }}>
              <Trophy style={{ width: 15, height: 15, color: "#D4AF37" }} />
            </div>
            <span style={{ fontFamily: "'Cinzel',serif", fontSize: ".76rem", letterSpacing: ".14em", color: "#D4AF37" }}>
              CONFIGURE PRIZES
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {REWARD_CFG.map(({ rank, label, color, bg, border, ph }) => (
              <div key={rank} style={{
                padding: "14px 16px", borderRadius: 14,
                background: bg, border: `1px solid ${border}`,
              }}>
                <label style={{
                  display: "block", fontSize: ".64rem", letterSpacing: ".16em",
                  color, fontFamily: "'Cinzel',serif", marginBottom: 8,
                }}>
                  {label}
                </label>
                <input
                  value={rewards[rank] ?? ""}
                  onChange={e => setRewards(p => ({ ...p, [rank]: e.target.value }))}
                  placeholder={ph}
                  className="adm-input"
                  style={{
                    padding: "10px 13px",
                    borderColor: `${color}2a`,
                    background: "rgba(10,6,2,.5)",
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
            <button
              onClick={save}
              disabled={saving}
              className="adm-gold-btn"
              style={{ padding: "11px 24px", fontSize: ".76rem" }}
            >
              {saving ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Spinner size={13} color="#08050F" /> Saving…
                </span>
              ) : saved ? (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle style={{ width: 13, height: 13 }} /> Saved!
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Save style={{ width: 13, height: 13 }} /> Save Prizes
                </span>
              )}
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// RESULTS TAB
// ══════════════════════════════════════════════════════════════════════

function ResultsTab() {
  const [events,   setEvents]   = useState<RankedEvent[]>([]);
  const [selEvent, setSelEvent] = useState("");
  const [entries,  setEntries]  = useState<LeaderboardEntry[]>([]);
  const [emails,   setEmails]   = useState<TopEmail[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [loadingE, setLoadingE] = useState(false);
  const [showEmails, setShowEmails] = useState(false);

  useEffect(() => {
    supabase.from("ranked_events").select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setEvents((data ?? []) as RankedEvent[]);
        if (data && data.length > 0) setSelEvent(data[0].id);
      });
  }, []);

  useEffect(() => {
    if (!selEvent) return;
    setLoading(true);
    supabase.from("ranked_leaderboard").select("*")
      .eq("event_id", selEvent)
      .order("rank", { ascending: true })
      .limit(100)
      .then(({ data }) => {
        setEntries((data ?? []) as LeaderboardEntry[]);
        setLoading(false);
      });
  }, [selEvent]);

  const fetchEmails = async () => {
    if (!selEvent) return;
    setLoadingE(true);
    try {
      const { data, error } = await supabase.rpc("get_ranked_top3_emails", { p_event_id: selEvent });
      if (!error && data) setEmails(data as TopEmail[]);
    } catch (e) { console.error(e); }
    setLoadingE(false);
    setShowEmails(true);
  };

  const exportCSV = () => {
    if (entries.length === 0) return;
    const rows = [
      ["Rank", "Player", "Score", "Correct", "Total", "Time (s)", "Submitted At"].join(","),
      ...entries.map(e => [
        e.rank, `"${e.display_name ?? "Anonymous"}"`,
        e.score, e.correct_count, e.total_count,
        e.time_taken_s ?? "", new Date(e.submitted_at).toISOString(),
      ].join(","))
    ].join("\n");
    const blob = new Blob([rows], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `ranked_results_${selEvent.slice(0,8)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const MEDALS = ["🥇","🥈","🥉"];

  return (
    <div className="adm-fade">
      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "flex-end", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Label>SELECT EVENT</Label>
          <div style={{ position: "relative" }}>
            <select
              value={selEvent}
              onChange={e => setSelEvent(e.target.value)}
              className="adm-input"
              style={{ padding: "11px 34px 11px 14px", appearance: "none" }}
            >
              {events.map(ev => (
                <option key={ev.id} value={ev.id}>{ev.title} — {new Date(ev.start_time).toLocaleDateString()}</option>
              ))}
            </select>
            <ChevronDown style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              width: 13, height: 13, color: "rgba(212,175,55,.38)", pointerEvents: "none",
            }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={fetchEmails} disabled={loadingE} className="adm-success-btn" style={{ height: 42 }}>
            {loadingE ? <Spinner size={12} color="#1D9E75" /> : <Eye style={{ width: 13, height: 13 }} />}
            Top 3 Emails
          </button>
          <button onClick={exportCSV} className="adm-success-btn" style={{ height: 42 }}>
            <Download style={{ width: 13, height: 13 }} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Top 3 emails modal */}
      {showEmails && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 900,
          background: "rgba(0,0,0,.88)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20, animation: "adm-fadeup .2s ease",
        }} onClick={() => setShowEmails(false)}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 480, width: "100%",
              background: "linear-gradient(150deg,#0f0a04,#1c0e05)",
              border: "1px solid rgba(212,175,55,.32)", borderRadius: 22,
              overflow: "hidden", animation: "adm-modal-in .28s ease",
            }}
          >
            <div style={{ height: 2.5, background: "linear-gradient(90deg,transparent,rgba(212,175,55,.55),transparent)" }} />
            <div style={{ padding: "24px 24px 22px" }}>
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginBottom: 20,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Crown style={{ width: 18, height: 18, color: "#D4AF37" }} />
                  <h3 style={{
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: "1.18rem", color: "#EDE0C4", fontWeight: 600,
                  }}>
                    Top 3 Winners
                  </h3>
                </div>
                <button
                  onClick={() => setShowEmails(false)}
                  style={{
                    background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
                    borderRadius: "50%", width: 30, height: 30, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(237,224,196,.5)",
                  }}
                >
                  <X style={{ width: 13, height: 13 }} />
                </button>
              </div>

              {emails.length === 0 ? (
                <p style={{
                  fontSize: ".8rem", color: "rgba(237,224,196,.32)",
                  fontFamily: "'Raleway',sans-serif", textAlign: "center",
                  padding: "20px 0",
                }}>
                  No submissions yet.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {emails.map((e, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 14px", borderRadius: 12,
                      background: "rgba(212,175,55,.05)",
                      border: "1px solid rgba(212,175,55,.14)",
                    }}>
                      <span style={{ fontSize: "1.3rem" }}>{MEDALS[i] ?? `#${e.rank}`}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontSize: ".82rem", color: "#EDE0C4",
                          fontFamily: "'Raleway',sans-serif", fontWeight: 500,
                        }}>
                          {e.display_name ?? "Anonymous"}
                        </p>
                        <p style={{
                          fontSize: ".72rem", color: "rgba(212,175,55,.6)",
                          fontFamily: "'Raleway',sans-serif",
                        }}>
                          {e.email}
                        </p>
                      </div>
                      <span style={{
                        fontFamily: "'Cormorant Garant',serif",
                        fontSize: "1.08rem", color: "#D4AF37",
                      }}>
                        {e.score} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {emails.length > 0 && (
                <button
                  onClick={() => {
                    const text = emails.map(e => `${e.rank}. ${e.display_name} — ${e.email} (${e.score} pts)`).join("\n");
                    navigator.clipboard.writeText(text);
                  }}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 7, width: "100%", marginTop: 16,
                    padding: "10px 16px", borderRadius: 11, cursor: "pointer",
                    background: "rgba(212,175,55,.07)", border: "1px solid rgba(212,175,55,.22)",
                    color: "#D4AF37", fontSize: ".72rem",
                    fontFamily: "'Cinzel',serif", letterSpacing: ".1em",
                    transition: "all .2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,175,55,.07)")}
                >
                  <Download style={{ width: 13, height: 13 }} />
                  Copy to clipboard
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats summary */}
      {entries.length > 0 && (
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
          gap: 10, marginBottom: 18,
        }}>
          {[
            { label: "ENTRANTS", value: entries.length, icon: Users, color: "#D4AF37" },
            { label: "TOP SCORE", value: entries[0]?.score ?? 0, icon: Trophy, color: "#D4AF37" },
            { label: "AVG SCORE",
              value: Math.round(entries.reduce((a,e) => a + e.score, 0) / entries.length),
              icon: Star, color: "#C8A96E" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{
              padding: "14px 12px", borderRadius: 14, textAlign: "center",
              background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.1)",
            }}>
              <Icon style={{ width: 16, height: 16, color, margin: "0 auto 8px" }} />
              <div style={{
                fontFamily: "'Cormorant Garant',serif",
                fontSize: "1.4rem", color, lineHeight: 1,
              }}>
                {value}
              </div>
              <div style={{
                fontSize: ".56rem", letterSpacing: ".16em",
                color: "rgba(237,224,196,.28)", fontFamily: "'Cinzel',serif",
                marginTop: 4,
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results table */}
      <SectionCard accent="#c084fc">
        <div style={{ padding: "16px" }}>
          <div style={{
            display: "grid", gridTemplateColumns: "42px 1fr 70px 80px 70px",
            gap: 10, padding: "6px 12px 10px",
            fontSize: ".58rem", letterSpacing: ".18em",
            color: "rgba(237,224,196,.22)", fontFamily: "'Cinzel',serif",
            borderBottom: "1px solid rgba(168,85,247,.1)",
          }}>
            <span>RANK</span>
            <span>PLAYER</span>
            <span>SCORE</span>
            <span>CORRECT</span>
            <span>TIME</span>
          </div>

          {loading ? (
            <div style={{ padding: "20px 0" }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} className="adm-skel" style={{ height: 40, borderRadius: 8, margin: "8px 0" }} />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div style={{
              padding: "36px 16px", textAlign: "center",
              fontSize: ".8rem", color: "rgba(237,224,196,.24)",
              fontFamily: "'Raleway',sans-serif", fontStyle: "italic",
            }}>
              No submissions for this event yet.
            </div>
          ) : (
            <div style={{ maxHeight: 480, overflowY: "auto" }}>
              {entries.map((entry, i) => (
                <div
                  key={entry.id}
                  style={{
                    display: "grid", gridTemplateColumns: "42px 1fr 70px 80px 70px",
                    gap: 10, padding: "10px 12px", alignItems: "center",
                    borderBottom: "1px solid rgba(212,175,55,.05)",
                    animation: "adm-fadeup .3s ease both",
                    animationDelay: `${i * 28}ms`,
                    background: i < 3 ? [
                      "rgba(212,175,55,.06)","rgba(192,192,192,.04)","rgba(205,127,50,.04)"
                    ][i] : undefined,
                  }}
                >
                  <span style={{
                    fontSize: i < 3 ? "1.1rem" : ".72rem",
                    color: i === 0 ? "#D4AF37" : i === 1 ? "#C0C0C0" : i === 2 ? "#CD7F32" : "rgba(237,224,196,.3)",
                    textAlign: "center", fontFamily: "'Cormorant Garant',serif",
                  }}>
                    {MEDALS[i] ?? `#${entry.rank}`}
                  </span>
                  <span style={{
                    fontSize: ".8rem", color: "#EDE0C4",
                    fontFamily: "'Raleway',sans-serif",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {entry.display_name ?? "Anonymous"}
                  </span>
                  <span style={{
                    fontFamily: "'Cormorant Garant',serif",
                    fontSize: "1.02rem", color: "#D4AF37",
                  }}>
                    {entry.score}
                  </span>
                  <span style={{
                    fontSize: ".75rem", color: "rgba(237,224,196,.42)",
                    fontFamily: "'Raleway',sans-serif",
                  }}>
                    {entry.correct_count}/{entry.total_count}
                  </span>
                  <span style={{
                    fontSize: ".72rem", color: "rgba(237,224,196,.32)",
                    fontFamily: "'Raleway',sans-serif",
                  }}>
                    {entry.time_taken_s ? `${entry.time_taken_s}s` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ══════════════════════════════════════════════════════════════════════

export default function AdminRanked() {
  const { language, setLanguage } = useChat();
  const { user, isAdmin }         = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("events");

  if (!isAdmin) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div style={{
          minHeight: "100vh", display: "flex",
          alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 14, padding: 24,
        }}>
          <Shield style={{ width: 44, height: 44, color: "rgba(212,175,55,.3)" }} />
          <p style={{
            fontFamily: "'Cormorant Garant',serif",
            fontSize: "1.4rem", color: "rgba(237,224,196,.44)",
            textAlign: "center",
          }}>
            Admin access required.
          </p>
        </div>
      </AppLayout>
    );
  }

  const TABS: { id: AdminTab; label: string; Icon: any }[] = [
    { id: "events",    label: "Events",    Icon: Calendar },
    { id: "questions", label: "Questions", Icon: Sword    },
    { id: "rewards",   label: "Prizes",    Icon: Trophy   },
    { id: "results",   label: "Results",   Icon: Award    },
  ];

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ minHeight: "100vh", color: "#EDE0C4" }}>
        {/* ── Header ── */}
        <div style={{
          position: "relative", overflow: "hidden",
          padding: "36px 20px 24px",
          borderBottom: "1px solid rgba(168,85,247,.14)",
          background: "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(168,85,247,.08),transparent 70%)",
        }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(168,85,247,.12)", border: "1px solid rgba(168,85,247,.32)",
                display: "flex", alignItems: "center", justifyContent: "center",
                animation: "adm-glow 5s ease-in-out infinite",
              }}>
                <Crown style={{ width: 20, height: 20, color: "#c084fc" }} />
              </div>
              <div>
                <h1 style={{
                  fontFamily: "'Cormorant Garant',serif",
                  fontSize: "clamp(1.5rem,4vw,2.1rem)",
                  background: "linear-gradient(135deg,#e879f9,#c084fc,#a855f7)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontWeight: 600, lineHeight: 1.1,
                }}>
                  Tournament Admin
                </h1>
                <p style={{
                  fontSize: ".72rem", color: "rgba(192,132,252,.5)",
                  fontFamily: "'Cinzel',serif", letterSpacing: ".14em", marginTop: 4,
                }}>
                  RANKED WEEKLY QUIZ CONTROL PANEL
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 16px 0" }}>
          <div style={{
            display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4,
            scrollbarWidth: "none",
          }}>
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`adm-tab${activeTab === id ? " active" : ""}`}
              >
                <Icon style={{ width: 13, height: 13 }} />
                {label}
              </button>
            ))}
          </div>
          <div style={{
            height: 1, marginTop: 7,
            background: "linear-gradient(90deg,transparent,rgba(168,85,247,.18),transparent)",
          }} />
        </div>

        {/* ── Tab content ── */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "22px 16px 80px" }}>
          {activeTab === "events"    && <EventsTab    />}
          {activeTab === "questions" && <QuestionsTab />}
          {activeTab === "rewards"   && <RewardsTab   />}
          {activeTab === "results"   && <ResultsTab   />}
        </div>
      </div>
    </AppLayout>
  );
}
