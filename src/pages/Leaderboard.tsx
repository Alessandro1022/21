import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { getLevelInfo } from "@/hooks/useProgress";
import { Crown, Share2, Zap, RefreshCw, Loader2, AlertCircle } from "lucide-react";

type Period = "alltime" | "month" | "week";

interface Leader {
  id: string;
  display_name: string;
  avatar_url: string;
  country: string;
  country_code: string;
  xp: number;
  level: number;
}

const FLAG_MAP: Record<string, string> = {
  AF:"🇦🇫",AL:"🇦🇱",DZ:"🇩🇿",AD:"🇦🇩",AO:"🇦🇴",AG:"🇦🇬",AR:"🇦🇷",AM:"🇦🇲",AU:"🇦🇺",AT:"🇦🇹",
  AZ:"🇦🇿",BS:"🇧🇸",BH:"🇧🇭",BD:"🇧🇩",BB:"🇧🇧",BY:"🇧🇾",BE:"🇧🇪",BZ:"🇧🇿",BJ:"🇧🇯",BT:"🇧🇹",
  BO:"🇧🇴",BA:"🇧🇦",BW:"🇧🇼",BR:"🇧🇷",BN:"🇧🇳",BG:"🇧🇬",BF:"🇧🇫",BI:"🇧🇮",CV:"🇨🇻",KH:"🇰🇭",
  CM:"🇨🇲",CA:"🇨🇦",CF:"🇨🇫",TD:"🇹🇩",CL:"🇨🇱",CN:"🇨🇳",CO:"🇨🇴",KM:"🇰🇲",CG:"🇨🇬",CR:"🇨🇷",
  HR:"🇭🇷",CU:"🇨🇺",CY:"🇨🇾",CZ:"🇨🇿",DK:"🇩🇰",DJ:"🇩🇯",DM:"🇩🇲",DO:"🇩🇴",EC:"🇪🇨",EG:"🇪🇬",
  SV:"🇸🇻",GQ:"🇬🇶",ER:"🇪🇷",EE:"🇪🇪",SZ:"🇸🇿",ET:"🇪🇹",FJ:"🇫🇯",FI:"🇫🇮",FR:"🇫🇷",GA:"🇬🇦",
  GM:"🇬🇲",GE:"🇬🇪",DE:"🇩🇪",GH:"🇬🇭",GR:"🇬🇷",GD:"🇬🇩",GT:"🇬🇹",GN:"🇬🇳",GW:"🇬🇼",GY:"🇬🇾",
  HT:"🇭🇹",HN:"🇭🇳",HU:"🇭🇺",IS:"🇮🇸",IN:"🇮🇳",ID:"🇮🇩",IR:"🇮🇷",IQ:"🇮🇶",IE:"🇮🇪",IL:"🇮🇱",
  IT:"🇮🇹",JM:"🇯🇲",JP:"🇯🇵",JO:"🇯🇴",KZ:"🇰🇿",KE:"🇰🇪",KI:"🇰🇮",KW:"🇰🇼",KG:"🇰🇬",LA:"🇱🇦",
  LV:"🇱🇻",LB:"🇱🇧",LS:"🇱🇸",LR:"🇱🇷",LY:"🇱🇾",LI:"🇱🇮",LT:"🇱🇹",LU:"🇱🇺",MG:"🇲🇬",MW:"🇲🇼",
  MY:"🇲🇾",MV:"🇲🇻",ML:"🇲🇱",MT:"🇲🇹",MH:"🇲🇭",MR:"🇲🇷",MU:"🇲🇺",MX:"🇲🇽",FM:"🇫🇲",MD:"🇲🇩",
  MC:"🇲🇨",MN:"🇲🇳",ME:"🇲🇪",MA:"🇲🇦",MZ:"🇲🇿",MM:"🇲🇲",NA:"🇳🇦",NR:"🇳🇷",NP:"🇳🇵",NL:"🇳🇱",
  NZ:"🇳🇿",NI:"🇳🇮",NE:"🇳🇪",NG:"🇳🇬",NO:"🇳🇴",OM:"🇴🇲",PK:"🇵🇰",PW:"🇵🇼",PA:"🇵🇦",PG:"🇵🇬",
  PY:"🇵🇾",PE:"🇵🇪",PH:"🇵🇭",PL:"🇵🇱",PT:"🇵🇹",QA:"🇶🇦",RO:"🇷🇴",RU:"🇷🇺",RW:"🇷🇼",KN:"🇰🇳",
  LC:"🇱🇨",VC:"🇻🇨",WS:"🇼🇸",SM:"🇸🇲",ST:"🇸🇹",SA:"🇸🇦",SN:"🇸🇳",RS:"🇷🇸",SC:"🇸🇨",SL:"🇸🇱",
  SG:"🇸🇬",SK:"🇸🇰",SI:"🇸🇮",SB:"🇸🇧",SO:"🇸🇴",ZA:"🇿🇦",SS:"🇸🇸",ES:"🇪🇸",LK:"🇱🇰",SD:"🇸🇩",
  SR:"🇸🇷",SE:"🇸🇪",CH:"🇨🇭",SY:"🇸🇾",TW:"🇹🇼",TJ:"🇹🇯",TZ:"🇹🇿",TH:"🇹🇭",TL:"🇹🇱",TG:"🇹🇬",
  TO:"🇹🇴",TT:"🇹🇹",TN:"🇹🇳",TR:"🇹🇷",TM:"🇹🇲",TV:"🇹🇻",UG:"🇺🇬",UA:"🇺🇦",AE:"🇦🇪",GB:"🇬🇧",
  US:"🇺🇸",UY:"🇺🇾",UZ:"🇺🇿",VU:"🇻🇺",VE:"🇻🇪",VN:"🇻🇳",YE:"🇾🇪",ZM:"🇿🇲",ZW:"🇿🇼",
};

function Avatar({ u, size = 56 }: { u: Leader; size?: number }) {
  const [imgError, setImgError] = useState(false);
  const code = u.country_code?.toUpperCase();
  const flag = code ? FLAG_MAP[code] : null;
  const badgeSize = Math.round(size * 0.42);
  const initials = (u.display_name || "?").slice(0, 2).toUpperCase();
  const showImg = !!u.avatar_url && !imgError;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <div
        className="w-full h-full rounded-full overflow-hidden flex items-center justify-center font-bold text-white select-none"
        style={{
          background: showImg ? "#000" : "linear-gradient(135deg,#c8a96e,#8B4513)",
          fontSize: size * 0.32,
        }}
      >
        {showImg ? (
          <img
            src={u.avatar_url}
            alt={initials}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : initials}
      </div>

      {flag && (
        <div
          className="absolute -bottom-0.5 -right-0.5 rounded-full flex items-center justify-center"
          style={{
            width: badgeSize,
            height: badgeSize,
            background: "rgba(0,0,0,0.8)",
            border: "2px solid rgba(0,0,0,0.9)",
            fontSize: badgeSize * 0.72,
            lineHeight: 1,
          }}
        >
          {flag}
        </div>
      )}
    </div>
  );
}

export default function Leaderboard() {
  const { language, setLanguage } = useChat();
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>("alltime");
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [myRank, setMyRank] = useState<number | null>(null);
  // Debug state — sätt till false i produktion
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [showDebug, setShowDebug] = useState(false);

  const strings: Record<string, any> = {
    sv: { alltime:"All tid", month:"Månad", week:"Vecka", share:"Dela", title:"Topplista", sub:"Vem samlar mest XP?" },
    en: { alltime:"All time", month:"Month", week:"Week", share:"Share", title:"Leaderboard", sub:"Who collects the most XP?" },
    tr: { alltime:"Tüm zamanlar", month:"Ay", week:"Hafta", share:"Paylaş", title:"Liderlik Tablosu", sub:"En çok XP kim topluyor?" },
  };
  const l = strings[language] || strings["en"];

  const load = async () => {
    setLoading(true);
    const logs: string[] = [];

    try {
      // ── STEG 1: Hämta XP ──────────────────────────────────────────
      let xpMap: Record<string, number> = {};

      if (period === "alltime") {
        const { data, error } = await supabase
          .from("user_progress")
          .select("user_id, xp");
        logs.push(`user_progress → ${data?.length ?? 0} rader, fel: ${error?.message ?? "inget"}`);
        (data || []).forEach((p: any) => { xpMap[p.user_id] = p.xp || 0; });
      } else {
        const from = new Date();
        if (period === "week")  from.setDate(from.getDate() - 7);
        if (period === "month") from.setDate(from.getDate() - 30);
        const { data, error } = await supabase
          .from("quiz_results")
          .select("user_id, xp_earned")
          .gte("created_at", from.toISOString());
        logs.push(`quiz_results → ${data?.length ?? 0} rader, fel: ${error?.message ?? "inget"}`);
        (data || []).forEach((r: any) => {
          xpMap[r.user_id] = (xpMap[r.user_id] || 0) + (r.xp_earned || 0);
        });
      }

      const userIds = Object.keys(xpMap);
      logs.push(`Unika user-IDs med XP: ${userIds.length}`);

      // ── STEG 2: Hämta profiler ────────────────────────────────────
      const profileMap: Record<string, any> = {};

      if (userIds.length > 0) {
        // Dela upp i batchar om 50 (Supabase .in() har begränsning)
        const BATCH = 50;
        for (let i = 0; i < userIds.length; i += BATCH) {
          const batch = userIds.slice(i, i + BATCH);
          const { data, error } = await supabase
            .from("profiles")
            .select("id, display_name, avatar_url, country, country_code")
            .in("id", batch);

          logs.push(`profiles batch ${Math.floor(i/BATCH)+1} → ${data?.length ?? 0} rader, fel: ${error?.message ?? "inget"}`);

          if (data && data.length > 0) {
            logs.push(`Exempel profil: ${JSON.stringify(data[0])}`);
          }

          (data || []).forEach((p: any) => { profileMap[p.id] = p; });
        }
      }

      logs.push(`Profiler hittade: ${Object.keys(profileMap).length} av ${userIds.length}`);

      // ── STEG 3: Bygg leaderboard ──────────────────────────────────
      const lb: Leader[] = userIds
        .map((uid) => {
          const p = profileMap[uid];
          const name = p?.display_name?.trim();
          return {
            id: uid,
            display_name: name && name.length > 0 ? name : `Anonym_${uid.slice(0, 4)}`,
            avatar_url:   p?.avatar_url   || "",
            country:      p?.country      || "",
            country_code: p?.country_code ? p.country_code.toUpperCase() : "",
            xp:           xpMap[uid],
            level:        getLevelInfo(xpMap[uid]).level,
          };
        })
        .sort((a, b) => b.xp - a.xp)
        .slice(0, 50);

      setLeaders(lb);

      if (user) {
        const rank = lb.findIndex((e) => e.id === user.id);
        setMyRank(rank >= 0 ? rank + 1 : null);
      }

    } catch (err: any) {
      logs.push(`EXCEPTION: ${err?.message}`);
    }

    setDebugInfo(logs.join("\n"));
    setLoading(false);
  };

  useEffect(() => { load(); }, [period]);

  const share = async () => {
    const getFlag = (u: Leader) => u.country_code ? (FLAG_MAP[u.country_code] || "") : "";
    const text = [
      `🏆 Empire AI ${l.title}`,
      ...leaders.slice(0, 3).map((u, i) =>
        `${["🥇","🥈","🥉"][i]} ${u.display_name} ${getFlag(u)} — ${u.xp} XP`
      ),
      "",
      "empireai10.vercel.app",
    ].join("\n");
    if (navigator.share) await navigator.share({ title: "Empire AI Leaderboard", text });
    else await navigator.clipboard.writeText(text);
  };

  const top3 = leaders.slice(0, 3);
  const rest  = leaders.slice(3);
  const maxXp = leaders[0]?.xp || 1;

  const podiumOrder =
    top3.length >= 3 ? [top3[1], top3[0], top3[2]] :
    top3.length === 2 ? [top3[1], top3[0]] : top3;

  const podiumMeta = [
    { medal:"🥈", border:"#C0C0C0", glow:"rgba(192,192,192,0.4)", bg:"rgba(192,192,192,0.1)", h:"64px", size:56, origRank:1 },
    { medal:"🥇", border:"#FFD700", glow:"rgba(255,215,0,0.5)",    bg:"rgba(255,215,0,0.15)",  h:"96px", size:72, origRank:0 },
    { medal:"🥉", border:"#CD7F32", glow:"rgba(205,127,50,0.4)",   bg:"rgba(205,127,50,0.1)",  h:"48px", size:56, origRank:2 },
  ];

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto"
        style={{ background: "linear-gradient(180deg,#06030f 0%,#0d0608 100%)" }}>

        {/* BG-glöd */}
        <div className="fixed top-0 right-0 w-72 h-72 pointer-events-none opacity-20 -z-0"
          style={{ background: "radial-gradient(circle,#c8a96e 0%,transparent 65%)", transform:"translate(35%,-35%)" }} />
        <div className="fixed bottom-20 left-0 w-56 h-56 pointer-events-none opacity-10 -z-0"
          style={{ background: "radial-gradient(circle,#8B1a1a 0%,transparent 65%)", transform:"translate(-35%,0)" }} />

        <div className="relative z-10 max-w-lg mx-auto px-4 pt-5 pb-24">

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h1 className="text-2xl font-serif flex items-center gap-2" style={{ color:"#c8a96e" }}>
                <Crown className="w-6 h-6" /> {l.title}
              </h1>
              <p className="text-xs mt-0.5" style={{ color:"rgba(200,169,110,0.45)" }}>{l.sub}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowDebug(!showDebug)} className="p-2 rounded-xl"
                style={{ background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.08)" }}>
                <AlertCircle className="w-4 h-4" style={{ color:"rgba(255,100,100,0.6)" }} />
              </button>
              <button onClick={load} className="p-2 rounded-xl"
                style={{ background:"rgba(255,255,255,0.06)", border:"0.5px solid rgba(255,255,255,0.1)" }}>
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  style={{ color:"rgba(255,255,255,0.5)" }} />
              </button>
              <button onClick={share}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-sans font-medium text-black"
                style={{ background:"linear-gradient(135deg,#c8a96e,#e8c98e)" }}>
                <Share2 className="w-3.5 h-3.5" /> {l.share}
              </button>
            </div>
          </div>

          {/* ── Debug-panel (tryck på ⚠️-ikonen) ── */}
          {showDebug && debugInfo && (
            <div className="mb-4 p-3 rounded-xl text-[10px] font-mono whitespace-pre-wrap break-all"
              style={{ background:"rgba(255,50,50,0.08)", border:"0.5px solid rgba(255,50,50,0.2)", color:"rgba(255,180,180,0.8)" }}>
              {debugInfo}
            </div>
          )}

          {/* ── Periodväljare ── */}
          <div className="flex gap-1 p-1 rounded-2xl mb-6"
            style={{ background:"rgba(255,255,255,0.05)", border:"0.5px solid rgba(255,255,255,0.08)" }}>
            {(["alltime","month","week"] as Period[]).map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className="flex-1 py-2.5 rounded-xl text-sm font-sans font-medium transition-all"
                style={{
                  background: period===p ? "linear-gradient(135deg,#c8a96e,#a07040)" : "transparent",
                  color:      period===p ? "#000" : "rgba(255,255,255,0.45)",
                  boxShadow:  period===p ? "0 2px 12px rgba(200,169,110,0.3)" : "none",
                }}>
                {p==="alltime" ? l.alltime : p==="month" ? l.month : l.week}
              </button>
            ))}
          </div>

          {/* ── Innehåll ── */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color:"#c8a96e" }} />
            </div>
          ) : leaders.length === 0 ? (
            <div className="text-center py-24" style={{ color:"rgba(255,255,255,0.3)" }}>
              <Crown className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-sans text-sm">Inga spelare för denna period</p>
            </div>
          ) : (
            <>
              {/* ── PODIUM ── */}
              {top3.length >= 1 && (
                <div className="flex items-end justify-center gap-2 mb-6 px-2">
                  {podiumOrder.map((u, displayIdx) => {
                    const meta = podiumMeta[displayIdx];
                    const isFirst = meta.origRank === 0;
                    if (!u) return <div key={displayIdx} className="flex-1" />;
                    return (
                      <div key={u.id} className="flex flex-col items-center gap-2 flex-1">
                        {isFirst && (
                          <Crown className="w-5 h-5 mb-0.5"
                            style={{ color:"#FFD700", filter:"drop-shadow(0 0 6px rgba(255,215,0,0.6))" }} />
                        )}
                        <div className="relative">
                          <div className="rounded-full p-[2px]"
                            style={{ background:meta.border, boxShadow:`0 0 ${isFirst?"24px":"16px"} ${meta.glow}` }}>
                            <Avatar u={u} size={meta.size} />
                          </div>
                          <span className="absolute -top-2 -right-1"
                            style={{ fontSize: isFirst ? "22px" : "18px" }}>{meta.medal}</span>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-white truncate"
                            style={{ fontSize: isFirst?13:11, maxWidth: isFirst?90:76 }}>
                            {u.display_name}
                          </p>
                          {u.country ? (
                            <p className="truncate"
                              style={{ fontSize: isFirst?10:9, color:"rgba(255,255,255,0.4)", maxWidth: isFirst?90:76 }}>
                              {u.country}
                            </p>
                          ) : null}
                          <p style={{ fontSize: isFirst?12:10, color:meta.border, fontWeight:700 }}>
                            {u.xp} XP
                          </p>
                        </div>
                        <div className="w-full rounded-t-2xl flex items-end justify-center"
                          style={{ background:meta.bg, minHeight:meta.h,
                            border:`0.5px solid ${meta.border}25`, borderBottom:"none", paddingBottom:10 }}>
                          {isFirst
                            ? <Crown className="w-5 h-5" style={{ color:`${meta.border}50` }} />
                            : <span className="text-xl font-serif" style={{ color:"rgba(255,255,255,0.15)" }}>
                                {meta.origRank+1}
                              </span>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── LISTA plats 4–50 ── */}
              <div className="space-y-2">
                {rest.map((u, i) => {
                  const isMe  = user?.id === u.id;
                  const rank  = i + 4;
                  const li    = getLevelInfo(u.xp);
                  const bar   = Math.round((u.xp / maxXp) * 100);
                  const flag  = u.country_code ? FLAG_MAP[u.country_code] : null;

                  return (
                    <div key={u.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
                      style={{
                        background: isMe
                          ? "linear-gradient(135deg,rgba(200,169,110,0.18),rgba(200,169,110,0.06))"
                          : "rgba(255,255,255,0.04)",
                        border:`0.5px solid ${isMe?"rgba(200,169,110,0.4)":"rgba(255,255,255,0.07)"}`,
                      }}>

                      <span className="text-sm font-serif w-6 text-center flex-shrink-0"
                        style={{ color:"rgba(200,169,110,0.55)" }}>{rank}</span>

                      <Avatar u={u} size={44} />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-sm font-medium text-white truncate">{u.display_name}</p>
                          {flag && <span style={{ fontSize:14, lineHeight:1 }}>{flag}</span>}
                          {u.country && (
                            <span className="text-[9px]" style={{ color:"rgba(255,255,255,0.3)" }}>
                              {u.country}
                            </span>
                          )}
                          {isMe && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-sans font-medium flex-shrink-0"
                              style={{ background:"rgba(200,169,110,0.2)", color:"#c8a96e" }}>YOU</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1 rounded-full overflow-hidden flex-1"
                            style={{ background:"rgba(255,255,255,0.07)" }}>
                            <div className="h-full rounded-full"
                              style={{ width:`${bar}%`, background:"linear-gradient(90deg,#c8a96e,#e8c98e)" }} />
                          </div>
                          <span className="text-[9px] flex-shrink-0" style={{ color:"rgba(255,255,255,0.3)" }}>
                            Lv.{li.level}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0" style={{ color:"#c8a96e" }}>
                        <Zap className="w-3 h-3" />
                        <span className="text-sm font-serif tabular-nums font-medium">{u.xp}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {myRank && myRank > 50 && (
                <div className="mt-3 py-3 rounded-2xl text-center"
                  style={{ background:"rgba(200,169,110,0.08)", border:"0.5px solid rgba(200,169,110,0.25)" }}>
                  <p className="text-sm font-sans" style={{ color:"rgba(255,255,255,0.5)" }}>
                    Din rank: <span style={{ color:"#c8a96e", fontWeight:600 }}>#{myRank}</span>
                  </p>
                </div>
              )}

              <div className="text-center mt-5">
                <p className="text-[10px]" style={{ color:"rgba(200,169,110,0.25)" }}>Empire Ai</p>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
