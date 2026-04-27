
import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { BADGES, Badge } from "@/data/badgeDefinitions";
import { grantAllBadgesToAdmin } from "@/services/badgeService";

// ── CSS (animationer) ─────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=Raleway:wght@400;500;600;700&family=Cormorant+Garant:ital,wght@0,400;1,400&display=swap');
@keyframes bg-rise{0%{opacity:0;transform:translateY(14px) scale(0.94);}100%{opacity:1;transform:translateY(0) scale(1);}}
@keyframes bg-sg{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes bg-sv{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes bg-ss{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes bg-lg{0%,100%{box-shadow:0 0 0 1px rgba(212,175,55,0.25),0 4px 24px rgba(212,175,55,0.1);}50%{box-shadow:0 0 0 1px rgba(212,175,55,0.55),0 4px 40px rgba(212,175,55,0.25);}}
@keyframes bg-ev{0%,100%{box-shadow:0 0 0 1px rgba(167,139,250,0.2);}50%{box-shadow:0 0 0 1px rgba(167,139,250,0.45),0 2px 28px rgba(139,92,246,0.2);}}
@keyframes bg-rb{0%,100%{box-shadow:0 0 0 1px rgba(96,165,250,0.18);}50%{box-shadow:0 0 0 1px rgba(96,165,250,0.4),0 2px 22px rgba(59,130,246,0.18);}}
@keyframes bg-rune{0%,100%{opacity:0.15;}50%{opacity:0.65;text-shadow:0 0 10px rgba(212,175,55,0.7);}}
@keyframes bg-scan{from{transform:translateY(-100%);}to{transform:translateY(500%);}}
@keyframes bg-bar{from{width:0%;}}
@keyframes bg-modal{from{opacity:0;transform:scale(0.93) translateY(16px);}to{opacity:1;transform:scale(1) translateY(0);}}
@keyframes bg-tfloat{0%,100%{transform:translateY(0);}50%{transform:translateY(-5px);}}
.bgl{animation:bg-rise .4s cubic-bezier(.22,1.2,.58,1) both,bg-lg 3s ease-in-out infinite .8s!important;transition:transform .22s ease!important;}
.bgl:hover{transform:translateY(-6px) scale(1.025)!important;}
.bge{animation:bg-rise .4s cubic-bezier(.22,1.2,.58,1) both,bg-ev 3.5s ease-in-out infinite!important;transition:transform .22s ease!important;}
.bge:hover{transform:translateY(-5px) scale(1.02)!important;}
.bgr{animation:bg-rise .4s cubic-bezier(.22,1.2,.58,1) both,bg-rb 4s ease-in-out infinite!important;transition:transform .22s ease!important;}
.bgr:hover{transform:translateY(-4px) scale(1.018)!important;}
.bgc{animation:bg-rise .4s cubic-bezier(.22,1.2,.58,1) both;transition:transform .22s ease!important;}
.bgc:hover{transform:translateY(-4px) scale(1.015)!important;}
.sg{background:linear-gradient(90deg,#8a6200,#D4AF37,#F5E078,#D4AF37,#8a6200);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:bg-sg 4s linear infinite;}
.sv{background:linear-gradient(90deg,#4c1d95,#a78bfa,#ddd6fe,#a78bfa,#4c1d95);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:bg-sv 3.5s linear infinite;}
.ss{background:linear-gradient(90deg,#1e3a5f,#60a5fa,#bae6fd,#60a5fa,#1e3a5f);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:bg-ss 4.5s linear infinite;}
.rune-a{animation:bg-rune 2.8s ease-in-out infinite;}
.tfloat{animation:bg-tfloat 3.5s ease-in-out infinite;}
.hsc::-webkit-scrollbar{height:3px;}.hsc::-webkit-scrollbar-thumb{background:rgba(200,169,110,0.25);border-radius:99px;}
.msc::-webkit-scrollbar{width:3px;}.msc::-webkit-scrollbar-thumb{background:rgba(200,169,110,0.2);border-radius:99px;}
`;
function injectCSS(){if(document.getElementById("bg-v6"))return;const s=document.createElement("style");s.id="bg-v6";s.textContent=CSS;document.head.appendChild(s);}

// ── Tokens (matchar Leaderboard-paletten) ────────────────────────────
const GOLD   = "#c8a96e";
const GOLD2  = "#e8c98e";
const CREAM  = "#f0e6d0";
const MUTED  = "rgba(240,230,208,0.68)";
const DIM    = "rgba(240,230,208,0.38)";
const FAINT  = "rgba(240,230,208,0.14)";
const RIM    = "rgba(200,169,110,0.2)";
const glass  = (a=0.72) => `rgba(6,3,15,${a})`;

// ── Rarity ────────────────────────────────────────────────────────────
const R = {
  legendary:{accent:"#D4AF37",accentL:"#F5E07A",accentD:"#8a6200",glow:"212,175,55",text:"#EACE60",bg:"rgba(212,175,55,0.12)",border:"rgba(212,175,55,0.4)",cls:"bgl",shimmer:"sg",order:4,star:"★★★★"},
  epic:     {accent:"#a78bfa",accentL:"#ddd6fe",accentD:"#6d28d9",glow:"167,139,250",text:"#c4b5fd",bg:"rgba(167,139,250,0.12)",border:"rgba(167,139,250,0.38)",cls:"bge",shimmer:"sv",order:3,star:"★★★"},
  rare:     {accent:"#60a5fa",accentL:"#bae6fd",accentD:"#1d4ed8",glow:"96,165,250", text:"#93c5fd",bg:"rgba(96,165,250,0.1)", border:"rgba(96,165,250,0.33)", cls:"bgr",shimmer:"ss",order:2,star:"★★"},
  common:   {accent:"#b0aa9e",accentL:"#d4cfc6",accentD:"#6a655b",glow:"176,170,158",text:"#c8c3ba",bg:"rgba(176,170,158,0.1)",border:"rgba(176,170,158,0.28)",cls:"bgc",shimmer:"",  order:1,star:"★"},
} as const;
type RK = keyof typeof R;

// ── Empires ───────────────────────────────────────────────────────────
const EMPIRES=[
  {id:"ottoman", label:"Ottoman", flag:"🌙",color:"#ef4444",dim:"rgba(239,68,68,0.15)"},
  {id:"roman",   label:"Roman",   flag:"🦅",color:"#d4af37",dim:"rgba(212,175,55,0.15)"},
  {id:"mongol",  label:"Mongol",  flag:"🐎",color:"#b45309",dim:"rgba(180,83,9,0.15)"},
  {id:"egypt",   label:"Egypt",   flag:"𓂀", color:"#ca8a04",dim:"rgba(202,138,4,0.15)"},
  {id:"british", label:"British", flag:"🦁",color:"#3b82f6",dim:"rgba(59,130,246,0.15)"},
  {id:"islamic", label:"Islamic", flag:"🌟",color:"#22c55e",dim:"rgba(34,197,94,0.15)"},
  {id:"seljuk",  label:"Seljuk",  flag:"🏹",color:"#f59e0b",dim:"rgba(245,158,11,0.15)"},
  {id:"japanese",label:"Japanese",flag:"⛩️",color:"#f43f5e",dim:"rgba(244,63,94,0.15)"},
  {id:"mali",    label:"Mali",    flag:"🌍",color:"#f97316",dim:"rgba(249,115,22,0.15)"},
] as const;

const RUNES=["ᚠ","ᚢ","ᚦ","ᚨ","ᚱ","ᚲ","ᚷ","ᚹ","ᚺ","ᚾ","ᛁ","ᛃ","ᛈ","ᛉ","ᛊ","ᛏ","ᛒ","ᛖ","ᛗ","ᛚ","ᛜ","ᛞ","ᛟ"];

// ── Translations ──────────────────────────────────────────────────────
const TR={
  en:{title:"Hall of Honours",sub:"Your imperial achievements",earned:"Earned",concealed:"Concealed",
    allRarities:"All Rarities",legendary:"Legendary",epic:"Epic",rare:"Rare",common:"Common",
    search:"Search badges…",noResults:"No badges found",allEmpires:"All Empires",
    progress:"Progress",dismiss:"Close",honourBestowed:"Honour Bestowed",
    sealedRecord:"Sealed Record",sealedDesc:"This honour is concealed. Continue your conquest.",
    records:"badges",clearFilters:"Clear",today:"Today",yesterday:"Yesterday",
    daysAgo:"days ago",weeksAgo:"weeks ago",monthsAgo:"months ago",complete:"complete",mastered:"Mastered",
    overallConquest:"Overall Conquest",honoursEarned:"Earned",totalXP:"Total XP",
    distinguishedHonours:"Distinguished Honours",recentUnlocks:"Recent Unlocks"},
  sv:{title:"Hedrarnas Sal",sub:"Dina imperiala prestationer",earned:"Intjänad",concealed:"Dold",
    allRarities:"Alla Sällsyntheter",legendary:"Legendarisk",epic:"Episk",rare:"Sällsynt",common:"Vanlig",
    search:"Sök märken…",noResults:"Inga märken hittades",allEmpires:"Alla Imperier",
    progress:"Framsteg",dismiss:"Stäng",honourBestowed:"Heder Skänkt",
    sealedRecord:"Förseglat",sealedDesc:"Denna heder är dold. Fortsätt din erövring.",
    records:"märken",clearFilters:"Rensa",today:"Idag",yesterday:"Igår",
    daysAgo:"dagar sedan",weeksAgo:"veckor sedan",monthsAgo:"månader sedan",complete:"klart",mastered:"Bemästrad",
    overallConquest:"Total Erövring",honoursEarned:"Intjänade",totalXP:"Total XP",
    distinguishedHonours:"Framstående Hedringar",recentUnlocks:"Senaste Upplåsningar"},
  tr:{title:"Onurlar Salonu",sub:"İmparatorluk başarılarınız",earned:"Kazanıldı",concealed:"Gizli",
    allRarities:"Tüm Nadirlikleri",legendary:"Efsanevi",epic:"Destansı",rare:"Nadir",common:"Yaygın",
    search:"Rozet ara…",noResults:"Rozet bulunamadı",allEmpires:"Tüm İmparatorluklar",
    progress:"İlerleme",dismiss:"Kapat",honourBestowed:"Onur Bahşedildi",
    sealedRecord:"Mühürlü",sealedDesc:"Bu onur gizlidir. Fetihlere devam et.",
    records:"rozet",clearFilters:"Temizle",today:"Bugün",yesterday:"Dün",
    daysAgo:"gün önce",weeksAgo:"hafta önce",monthsAgo:"ay önce",complete:"tamamlandı",mastered:"Ustalık",
    overallConquest:"Genel Fetih",honoursEarned:"Kazanılan",totalXP:"Toplam XP",
    distinguishedHonours:"Seçkin Onurlar",recentUnlocks:"Son Açılanlar"},
} as const;
type T=typeof TR["en"];
type Lang="en"|"sv"|"tr";

// ── Utils ─────────────────────────────────────────────────────────────
function cloak(id:string,hidden:boolean):boolean{
  if(hidden)return true;
  let h=0;for(let i=0;i<id.length;i++)h=(h*31+id.charCodeAt(i))>>>0;return h%5<=1;
}
function seededRunes(seed:string,n=7):string[]{
  let h=0;for(let i=0;i<seed.length;i++)h=(h*31+seed.charCodeAt(i))>>>0;
  return Array.from({length:n},(_,i)=>RUNES[(h+i*7)%RUNES.length]);
}
function fmtRel(iso:string,t:T):string{
  const d=Math.floor((Date.now()-new Date(iso).getTime())/86400000);
  if(d===0)return t.today;if(d===1)return t.yesterday;
  if(d<7)return`${d} ${t.daysAgo}`;if(d<30)return`${Math.floor(d/7)} ${t.weeksAgo}`;
  return`${Math.floor(d/30)} ${t.monthsAgo}`;
}
function fmtDate(iso:string):string{return new Date(iso).toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}

// ── Pill ─────────────────────────────────────────────────────────────
function Pill({rarity,sm}:{rarity:RK;sm?:boolean}){
  const cfg=R[rarity];
  return(
    <span style={{display:"inline-block",fontSize:sm?8:9,fontFamily:"'Raleway',sans-serif",letterSpacing:"0.1em",textTransform:"uppercase",padding:sm?"1.5px 7px":"2.5px 10px",borderRadius:99,background:cfg.bg,border:`0.5px solid ${cfg.border}`,color:cfg.text}}>
      {cfg.shimmer?<span className={cfg.shimmer}>{cfg.label??rarity}</span>:(cfg.label??rarity)}
    </span>
  );
}

// ── Badge Card ────────────────────────────────────────────────────────
function BadgeCard({badge,unlocked,progress,delay,onClick}:{badge:Badge;unlocked:boolean;progress:number;delay:number;onClick:()=>void}){
  const cfg=R[badge.rarity as RK];
  const pct=badge.condition_value>0?Math.min(100,Math.round((progress/badge.condition_value)*100)):0;
  return(
    <button className={cfg.cls} onClick={onClick} style={{
      animationDelay:`${delay}s`,
      background:glass(0.7),backdropFilter:"blur(12px)",
      border:`0.5px solid ${unlocked?cfg.border:RIM}`,
      borderRadius:14,padding:"16px 12px 13px",
      cursor:"pointer",textAlign:"center",
      opacity:unlocked?1:0.52,
      position:"relative",overflow:"hidden",
      minHeight:168,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"flex-start",width:"100%",
    }}>
      {unlocked&&<div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:`linear-gradient(90deg,transparent,${cfg.accent},${cfg.accentL},${cfg.accent},transparent)`}}/>}
      {unlocked&&<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 0%,${cfg.bg} 0%,transparent 65%)`,pointerEvents:"none"}}/>}
      {unlocked&&<div style={{position:"absolute",top:8,left:8,width:15,height:15,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,color:"#fff",fontWeight:800,boxShadow:"0 2px 6px rgba(34,197,94,0.4)"}}>✓</div>}
      {badge.xp_reward>0&&<div style={{position:"absolute",top:8,right:8,fontSize:7.5,fontFamily:"'Raleway',sans-serif",color:unlocked?GOLD:DIM,fontWeight:600}}>+{badge.xp_reward} XP</div>}

      <div style={{position:"relative",margin:"6px 0 10px"}}>
        {!unlocked&&badge.condition_value>0&&(
          <svg width={50} height={50} viewBox="0 0 50 50" style={{position:"absolute",inset:0,overflow:"visible"}}>
            <circle cx={25} cy={25} r={21} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2.5}/>
            {pct>0&&<circle cx={25} cy={25} r={21} fill="none" stroke={cfg.accent} strokeWidth={2.5} strokeLinecap="round"
              strokeDasharray={`${pct/100*131.9} 131.9`} transform="rotate(-90 25 25)"
              style={{animation:"bg-bar 1.2s ease both"}}/>}
          </svg>
        )}
        <div style={{width:50,height:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,lineHeight:1,position:"relative",zIndex:1,filter:unlocked?`drop-shadow(0 2px 8px rgba(${cfg.glow},0.45))`:"grayscale(1) brightness(0.45)"}}>{badge.icon}</div>
      </div>

      <div style={{fontSize:10,fontFamily:"'Cinzel',serif",fontWeight:600,color:unlocked?CREAM:MUTED,lineHeight:1.4,marginBottom:8,letterSpacing:"0.03em",flex:1,display:"flex",alignItems:"center",textAlign:"center"}}>{badge.name}</div>

      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,width:"100%"}}>
        <Pill rarity={badge.rarity as RK} sm/>
        {!unlocked&&badge.condition_value>0&&<div style={{fontSize:8,color:DIM,fontFamily:"'Raleway',sans-serif"}}>{progress}/{badge.condition_value}</div>}
        {unlocked&&<div style={{fontSize:8,color:cfg.accent,opacity:0.75}}>{cfg.star}</div>}
      </div>
    </button>
  );
}

// ── Cloaked Card ──────────────────────────────────────────────────────
function CloakedCard({badgeId,delay,t,onClick}:{badgeId:string;delay:number;t:T;onClick:()=>void}){
  const rns=useMemo(()=>seededRunes(badgeId,7),[badgeId]);
  return(
    <button className="bgc" onClick={onClick} style={{
      animationDelay:`${delay}s`,
      background:glass(0.62),backdropFilter:"blur(10px)",
      border:`0.5px solid rgba(160,120,20,0.2)`,
      borderRadius:14,cursor:"pointer",textAlign:"center",
      minHeight:168,width:"100%",
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:7,
      position:"relative",overflow:"hidden",opacity:0.68,
    }}>
      <div style={{position:"absolute",left:0,right:0,height:"0.5px",background:"linear-gradient(90deg,transparent,rgba(200,169,110,0.3),transparent)",animation:"bg-scan 7s linear infinite",pointerEvents:"none"}}/>
      <div style={{fontSize:22,filter:"sepia(1) brightness(0.5)"}}>🔒</div>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:2,maxWidth:78}}>
        {rns.map((r,i)=><span key={i} className="rune-a" style={{fontFamily:"serif",fontSize:11,color:GOLD,animationDelay:`${i*0.3}s`}}>{r}</span>)}
      </div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:8,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(200,169,110,0.4)"}}>{t.concealed}</div>
    </button>
  );
}

// ── Legendary Card (full-width) ───────────────────────────────────────
function LegCard({badge,unlockedAt,t,onClick}:{badge:Badge;unlockedAt:string;t:T;onClick:()=>void}){
  const cfg=R.legendary;
  return(
    <button className="bgl" onClick={onClick} style={{
      gridColumn:"span 2",
      background:glass(0.78),backdropFilter:"blur(14px)",
      border:`0.5px solid ${cfg.border}`,borderRadius:16,
      padding:"20px 22px",cursor:"pointer",textAlign:"left",
      display:"flex",alignItems:"center",gap:18,
      position:"relative",overflow:"hidden",width:"100%",
    }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:"2.5px",background:`linear-gradient(90deg,transparent,${cfg.accentD},${cfg.accentL},${cfg.accent},${cfg.accentL},${cfg.accentD},transparent)`}}/>
      <div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 20% 50%,rgba(212,175,55,0.08) 0%,transparent 65%)`,pointerEvents:"none"}}/>
      <div className="tfloat" style={{fontSize:44,lineHeight:1,flexShrink:0,filter:`drop-shadow(0 0 16px rgba(${cfg.glow},0.55))`,position:"relative",zIndex:1}}>{badge.icon}</div>
      <div style={{flex:1,minWidth:0,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5,flexWrap:"wrap"}}>
          <Pill rarity="legendary"/>
          {badge.xp_reward>0&&<span style={{fontSize:8.5,color:"#34d399",fontFamily:"'Raleway',sans-serif"}}>+{badge.xp_reward} XP</span>}
        </div>
        <h3 style={{fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:700,color:CREAM,margin:"0 0 4px",lineHeight:1.2}}><span className="sg">{badge.name}</span></h3>
        <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:12,color:MUTED,margin:"0 0 7px",lineHeight:1.6,fontStyle:"italic",overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{badge.description}</p>
        <div style={{fontSize:9.5,color:"#34d399",fontFamily:"'Raleway',sans-serif",display:"flex",gap:5,alignItems:"center"}}>
          <span>✓</span><span>{t.honourBestowed} — {fmtDate(unlockedAt)}</span>
          <span style={{color:DIM,fontStyle:"italic"}}>({fmtRel(unlockedAt,t)})</span>
        </div>
      </div>
    </button>
  );
}

// ── Detail Modal ──────────────────────────────────────────────────────
function Modal({badge,isUnlocked,unlockedAt,progress,cloaked,t,onClose}:{badge:Badge|null;isUnlocked:boolean;unlockedAt?:string;progress:number;cloaked:boolean;t:T;onClose:()=>void}){
  useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();};document.addEventListener("keydown",h);return()=>document.removeEventListener("keydown",h);},[onClose]);
  if(!badge)return null;
  const cfg=R[badge.rarity as RK];
  const pct=badge.condition_value>0?Math.min(100,Math.round((progress/badge.condition_value)*100)):0;
  const empire=EMPIRES.find(e=>e.id===badge.empire_id);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(4,2,12,0.92)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:glass(0.92),backdropFilter:"blur(20px)",
        border:`0.5px solid ${cfg.border}`,borderRadius:22,
        maxWidth:440,width:"100%",textAlign:"center",
        position:"relative",overflow:"hidden",
        animation:"bg-modal 0.3s cubic-bezier(.22,1.2,.58,1)",
        boxShadow:`0 40px 100px rgba(0,0,0,0.8),0 0 0 1px ${cfg.border}`,
      }}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:`linear-gradient(90deg,transparent,${cfg.accentD},${cfg.accentL},${cfg.accentD},transparent)`}}/>
        <div style={{padding:"36px 28px 28px",position:"relative",zIndex:1}}>
          <div style={{fontSize:66,lineHeight:1,marginBottom:14,filter:isUnlocked?`drop-shadow(0 0 20px rgba(${cfg.glow},0.65))`:cloaked?"grayscale(1) opacity(0.2)":"grayscale(0.85) brightness(0.45)"}}>{cloaked?"🔒":badge.icon}</div>
          <div style={{marginBottom:5,fontSize:9,color:cfg.accent,letterSpacing:1}}>{R[badge.rarity as RK].star}</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:18,fontWeight:700,color:isUnlocked?CREAM:MUTED,margin:"0 0 4px",lineHeight:1.2}}>
            {cloaked?<span style={{color:"rgba(200,169,110,0.4)"}}>{t.sealedRecord}</span>
              :badge.rarity==="legendary"?<span className="sg">{badge.name}</span>
              :badge.rarity==="epic"?<span className="sv">{badge.name}</span>
              :badge.name}
          </h2>
          <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:14,color:MUTED,margin:"12px 0 20px",lineHeight:1.75,fontStyle:"italic"}}>{cloaked?t.sealedDesc:(badge.description??"")}</p>

          <div style={{display:"flex",justifyContent:"center",gap:5,flexWrap:"wrap",marginBottom:20}}>
            <Pill rarity={badge.rarity as RK}/>
            {empire&&!cloaked&&<span style={{fontSize:8.5,padding:"2.5px 10px",borderRadius:99,background:empire.dim,color:empire.color,fontFamily:"'Raleway',sans-serif",letterSpacing:"0.08em",textTransform:"uppercase",border:`0.5px solid ${empire.color}44`}}>{empire.flag} {empire.label}</span>}
            {badge.xp_reward>0&&!cloaked&&<span style={{fontSize:8.5,padding:"2.5px 10px",borderRadius:99,background:"rgba(52,211,153,0.1)",color:"#34d399",fontFamily:"'Raleway',sans-serif",border:"0.5px solid rgba(52,211,153,0.25)"}}>+{badge.xp_reward} XP</span>}
          </div>

          {!isUnlocked&&!cloaked&&badge.condition_value>0&&(
            <div style={{marginBottom:20,background:"rgba(255,255,255,0.04)",border:`0.5px solid ${RIM}`,borderRadius:10,padding:"12px 14px",textAlign:"left"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontSize:8.5,color:MUTED,fontFamily:"'Raleway',sans-serif",letterSpacing:"0.1em",textTransform:"uppercase"}}>{t.progress}</span>
                <span style={{fontSize:11,color:cfg.accent,fontFamily:"'Cinzel',serif"}}>{pct}%</span>
              </div>
              <div style={{height:5,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden",marginBottom:5}}>
                <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${cfg.accentD},${cfg.accentL})`,borderRadius:99,animation:"bg-bar 1s ease both",boxShadow:`0 0 8px ${cfg.accent}44`}}/>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:DIM,fontFamily:"'Raleway',sans-serif"}}>
                <span>{progress.toLocaleString()}</span><span>{badge.condition_value.toLocaleString()}</span>
              </div>
            </div>
          )}

          {isUnlocked&&unlockedAt&&(
            <div style={{marginBottom:20,background:"rgba(52,211,153,0.07)",border:"0.5px solid rgba(52,211,153,0.2)",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontSize:16}}>🏆</span>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:10.5,color:"#34d399",fontFamily:"'Cinzel',serif",fontWeight:600,marginBottom:1}}>{t.honourBestowed}</div>
                <div style={{fontSize:11,color:MUTED,fontFamily:"'Cormorant Garant',serif",fontStyle:"italic"}}>{fmtDate(unlockedAt)} · {fmtRel(unlockedAt,t)}</div>
              </div>
            </div>
          )}

          <button onClick={onClose}
            style={{background:"rgba(255,255,255,0.06)",border:`0.5px solid ${RIM}`,borderRadius:9,padding:"9px 42px",color:MUTED,fontSize:11,fontFamily:"'Raleway',sans-serif",letterSpacing:"0.12em",textTransform:"uppercase",cursor:"pointer",transition:"all 0.18s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=GOLD+"66";e.currentTarget.style.color=GOLD;}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=RIM;e.currentTarget.style.color=MUTED;}}>
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}

interface UB{badge_id:string;unlocked_at:string;}
interface BP{badge_id:string;current_value:number;}

// ── MAIN ──────────────────────────────────────────────────────────────
export default function Badges(){
  const {language,setLanguage}=useChat();
  const {user,isAdmin}=useAuth() as any;
  const lang=(["en","sv","tr"].includes(language)?language:"en") as Lang;
  const t=TR[lang];

  const [unlMap,setUnlMap]=useState<Record<string,string>>({});
  const [prgMap,setPrgMap]=useState<Record<string,number>>({});
  const [loading,setLoading]=useState(true);

  const [empFilter,setEmpFilter]=useState("all");
  const [rarFilter,setRarFilter]=useState<RK|"all">("all");
  const [search,setSearch]=useState("");
  const [unlOnly,setUnlOnly]=useState(false);
  const [clkOnly,setClkOnly]=useState(false);

  const [modal,setModal]=useState<Badge|null>(null);
  const [modalClk,setModalClk]=useState(false);

  useEffect(()=>{injectCSS();},[]);

  // Fetch badges + progress
  const fetchData=useCallback(async()=>{
    if(!user){setLoading(false);return;}
    const [r1,r2]=await Promise.all([
      supabase.from("user_badges").select("badge_id,unlocked_at").eq("user_id",user.id),
      supabase.from("badge_progress").select("badge_id,current_value").eq("user_id",user.id),
    ]);
    const um:Record<string,string>={};
    (r1.data as UB[]??[]).forEach(r=>{um[r.badge_id]=r.unlocked_at;});
    setUnlMap(um);
    const pm:Record<string,number>={};
    (r2.data as BP[]??[]).forEach(r=>{pm[r.badge_id]=r.current_value;});
    setPrgMap(pm);
    setLoading(false);
  },[user]);

  useEffect(()=>{fetchData();},[fetchData]);

  // Admin: auto-unlock ALL badges immediately on mount
  useEffect(()=>{
    if(!user?.id||!isAdmin)return;
    grantAllBadgesToAdmin(user.id).then(()=>fetchData());
  },[user?.id,isAdmin]);

  const openModal=useCallback((b:Badge,c:boolean)=>{setModal(b);setModalClk(c);},[]);
  const closeModal=useCallback(()=>{setModal(null);setModalClk(false);},[]);

  // Stats
  const unlCount=Object.keys(unlMap).length;
  const total=BADGES.length;
  const globalPct=total>0?Math.round((unlCount/total)*100):0;
  const totalXP=useMemo(()=>BADGES.filter(b=>unlMap[b.id]&&b.xp_reward).reduce((s,b)=>s+b.xp_reward,0),[unlMap]);

  const empireData=useMemo(()=>EMPIRES.map(e=>({
    ...e,
    total:BADGES.filter(b=>b.empire_id===e.id).length,
    unlocked:BADGES.filter(b=>b.empire_id===e.id&&unlMap[b.id]).length,
  })),[unlMap]);

  const featured=useMemo(()=>BADGES
    .filter(b=>unlMap[b.id]&&b.rarity==="legendary")
    .sort((a,b)=>new Date(unlMap[b.id]).getTime()-new Date(unlMap[a.id]).getTime())
    .slice(0,4),[unlMap]);

  const recent=useMemo(()=>BADGES
    .filter(b=>unlMap[b.id])
    .sort((a,b)=>new Date(unlMap[b.id]).getTime()-new Date(unlMap[a.id]).getTime())
    .slice(0,8),[unlMap]);

  const grid=useMemo(()=>BADGES.filter(b=>{
    const u=!!unlMap[b.id],c=!u&&cloak(b.id,b.is_hidden??false);
    if(unlOnly&&!u)return false;
    if(clkOnly&&(!c||u))return false;
    if(empFilter!=="all"&&b.empire_id!==empFilter)return false;
    if(rarFilter!=="all"&&b.rarity!==rarFilter)return false;
    if(search){const q=search.toLowerCase();if(!b.name.toLowerCase().includes(q)&&!(b.description??"").toLowerCase().includes(q))return false;}
    return true;
  }).sort((a,b)=>{
    const au=!!unlMap[a.id],bu=!!unlMap[b.id];if(au!==bu)return au?-1:1;
    return(R[b.rarity as RK]?.order??0)-(R[a.rarity as RK]?.order??0);
  }),[unlMap,unlOnly,clkOnly,empFilter,rarFilter,search]);

  const hasF=search!==""||empFilter!=="all"||rarFilter!=="all"||unlOnly||clkOnly;

  // ── RENDER ───────────────────────────────────────────────────────────
  return(
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="msc h-full overflow-y-auto" style={{position:"relative"}}>

        {/* Same bg overlay as Leaderboard */}
        <div style={{position:"fixed",top:0,right:0,width:280,height:280,pointerEvents:"none",opacity:0.18,zIndex:0,background:"radial-gradient(circle,#c8a96e 0%,transparent 65%)",transform:"translate(35%,-35%)"}}/>
        <div style={{position:"fixed",bottom:80,left:0,width:200,height:200,pointerEvents:"none",opacity:0.1,zIndex:0,background:"radial-gradient(circle,#8B1a1a 0%,transparent 65%)",transform:"translate(-35%,0)"}}/>

        <div style={{position:"relative",zIndex:10,maxWidth:680,margin:"0 auto",padding:"20px 16px 100px"}}>

          {/* ── HEADER ── */}
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
              <h1 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:22,fontWeight:700,color:GOLD,margin:0,letterSpacing:"0.03em"}}>{t.title}</h1>
            </div>
            <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:13,color:DIM,fontStyle:"italic",margin:0}}>{t.sub}</p>
          </div>

          {/* ── STATS ROW — same card style as Leaderboard ── */}
          <div style={{display:"flex",gap:10,marginBottom:18,flexWrap:"wrap"}}>
            {[
              {icon:"🏅",v:unlCount,l:t.honoursEarned,c:GOLD},
              {icon:"📜",v:`${globalPct}%`,l:t.complete,c:GOLD},
              {icon:"⚡",v:totalXP.toLocaleString(),l:t.totalXP,c:"#34d399"},
            ].map(({icon,v,l,c})=>(
              <div key={l} style={{flex:"1 1 90px",textAlign:"center",background:glass(0.65),backdropFilter:"blur(10px)",border:`0.5px solid ${RIM}`,borderRadius:14,padding:"12px 10px"}}>
                <div style={{fontSize:20,marginBottom:4}}>{icon}</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:700,color:c,lineHeight:1,marginBottom:3}}>{v}</div>
                <div style={{fontFamily:"'Raleway',sans-serif",fontSize:8.5,letterSpacing:"0.12em",textTransform:"uppercase",color:DIM}}>{l}</div>
              </div>
            ))}
          </div>

          {/* ── OVERALL BAR ── */}
          <div style={{background:glass(0.65),backdropFilter:"blur(10px)",border:`0.5px solid ${RIM}`,borderRadius:14,padding:"14px 16px",marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:"0.16em",textTransform:"uppercase",color:GOLD,opacity:0.7}}>{t.overallConquest}</span>
              <span style={{fontSize:10,color:GOLD,fontFamily:"'Cinzel',serif"}}>{unlCount} / {total}</span>
            </div>
            <div style={{height:7,background:"rgba(255,255,255,0.07)",borderRadius:99,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${globalPct}%`,background:`linear-gradient(90deg,#8a6200,${GOLD},${GOLD2},${GOLD},#8a6200)`,backgroundSize:"200% 100%",borderRadius:99,animation:"bg-bar 1.5s ease both",boxShadow:`0 0 12px ${GOLD}40`}}/>
            </div>
          </div>

          {/* ── EMPIRE SCROLL — same pill style as Leaderboard period tabs ── */}
          <div className="hsc" style={{display:"flex",gap:6,overflowX:"auto",paddingBottom:4,marginBottom:14}}>
            <button onClick={()=>setEmpFilter("all")} style={{
              flexShrink:0,padding:"7px 15px",borderRadius:20,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",fontFamily:"'Raleway',sans-serif",fontSize:10,
              background:empFilter==="all"?`linear-gradient(135deg,${GOLD},#a07040)`:"rgba(255,255,255,0.06)",
              color:empFilter==="all"?"#000":"rgba(255,255,255,0.5)",
              border:`0.5px solid ${empFilter==="all"?GOLD:"rgba(255,255,255,0.1)"}`,
              boxShadow:empFilter==="all"?`0 2px 12px ${GOLD}30`:"none",
            }}>🌐 {t.allEmpires}</button>
            {empireData.map(emp=>{
              const sel=empFilter===emp.id;const pct=emp.total>0?Math.round((emp.unlocked/emp.total)*100):0;
              return(
                <button key={emp.id} onClick={()=>setEmpFilter(sel?"all":emp.id)} style={{
                  flexShrink:0,padding:"7px 13px",borderRadius:20,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap",fontFamily:"'Raleway',sans-serif",fontSize:10,
                  background:sel?emp.dim:"rgba(255,255,255,0.06)",
                  color:sel?emp.color:"rgba(255,255,255,0.5)",
                  border:`0.5px solid ${sel?emp.color+"55":"rgba(255,255,255,0.1)"}`,
                  display:"flex",alignItems:"center",gap:4,
                }}>
                  <span>{emp.flag}</span><span>{emp.label}</span>
                  {pct===100&&<span style={{fontSize:7,opacity:0.8}}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* ── FILTER BAR ── */}
          <div style={{background:glass(0.68),backdropFilter:"blur(12px)",border:`0.5px solid ${RIM}`,borderRadius:14,padding:"12px 14px",marginBottom:14}}>
            {/* Search */}
            <div style={{position:"relative",marginBottom:10}}>
              <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:13,color:DIM,pointerEvents:"none"}}>⌕</span>
              <input type="text" placeholder={t.search} value={search} onChange={e=>setSearch(e.target.value)}
                style={{width:"100%",background:"rgba(255,255,255,0.06)",border:`0.5px solid ${RIM}`,borderRadius:9,padding:"7px 12px 7px 28px",fontSize:11,color:CREAM,outline:"none",fontFamily:"'Raleway',sans-serif",letterSpacing:"0.03em",boxSizing:"border-box"}}
                onFocus={e=>e.currentTarget.style.borderColor=GOLD+"55"}
                onBlur={e=>e.currentTarget.style.borderColor=RIM}/>
            </div>

            {/* Rarity + status pills */}
            <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
              {([["all",t.allRarities,GOLD],[...(["legendary","epic","rare","common"] as RK[]).map(r=>[r,t[r],R[r].accent])]] as [string,string,string][]).map(([k,lbl,ac])=>{
                const active=rarFilter===k;
                return(
                  <button key={k} onClick={()=>setRarFilter(k as any)} style={{fontSize:9.5,fontFamily:"'Raleway',sans-serif",padding:"4px 11px",borderRadius:99,border:`0.5px solid ${active?ac+"55":FAINT}`,background:active?`${ac}18`:"transparent",color:active?ac:DIM,cursor:"pointer",transition:"all 0.15s",whiteSpace:"nowrap"}}>
                    {lbl}
                  </button>
                );
              })}
              <div style={{marginLeft:"auto",display:"flex",gap:5}}>
                <button onClick={()=>{setUnlOnly(!unlOnly);if(clkOnly)setClkOnly(false);}} style={{fontSize:9.5,fontFamily:"'Raleway',sans-serif",padding:"4px 11px",borderRadius:99,border:`0.5px solid ${unlOnly?"#34d399"+"55":FAINT}`,background:unlOnly?"rgba(52,211,153,0.12)":"transparent",color:unlOnly?"#34d399":DIM,cursor:"pointer",transition:"all 0.15s"}}>✓ {t.earned}</button>
                <button onClick={()=>{setClkOnly(!clkOnly);if(unlOnly)setUnlOnly(false);}} style={{fontSize:9.5,fontFamily:"'Raleway',sans-serif",padding:"4px 11px",borderRadius:99,border:`0.5px solid ${clkOnly?GOLD+"55":FAINT}`,background:clkOnly?"rgba(200,169,110,0.12)":"transparent",color:clkOnly?GOLD:DIM,cursor:"pointer",transition:"all 0.15s"}}>🔒 {t.concealed}</button>
              </div>
            </div>

            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:10}}>
              <span style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:"0.14em",textTransform:"uppercase",color:GOLD,opacity:0.5}}>{grid.length} {t.records}</span>
              <div style={{flex:1,height:"0.5px",background:FAINT}}/>
              {hasF&&<button onClick={()=>{setSearch("");setEmpFilter("all");setRarFilter("all");setUnlOnly(false);setClkOnly(false);}} style={{fontSize:8.5,color:DIM,background:"transparent",border:"none",cursor:"pointer",textDecoration:"underline",fontFamily:"'Raleway',sans-serif"}}>{t.clearFilters}</button>}
            </div>
          </div>

          {/* ── RECENT UNLOCKS ── */}
          {recent.length>0&&!hasF&&(
            <div style={{marginBottom:18}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:GOLD,opacity:0.65,marginBottom:10}}>◈ {t.recentUnlocks}</div>
              <div className="hsc" style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {recent.map((b,i)=>{const cfg=R[b.rarity as RK];return(
                  <button key={b.id} onClick={()=>openModal(b,false)} style={{flexShrink:0,width:105,background:glass(0.65),backdropFilter:"blur(10px)",border:`0.5px solid ${cfg.border}`,borderRadius:12,padding:"11px 9px",cursor:"pointer",textAlign:"center",position:"relative",overflow:"hidden",animation:`bg-rise 0.3s ${i*0.06}s both`}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:cfg.accent,opacity:0.5}}/>
                    <div style={{fontSize:20,marginBottom:5}}>{b.icon}</div>
                    <div style={{fontSize:8.5,fontFamily:"'Cinzel',serif",color:CREAM,lineHeight:1.3,marginBottom:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{b.name}</div>
                    <div style={{fontSize:7.5,color:DIM,fontFamily:"'Raleway',sans-serif"}}>{fmtRel(unlMap[b.id],t)}</div>
                  </button>
                );})}
              </div>
            </div>
          )}

          {/* ── FEATURED LEGENDARY ── */}
          {featured.length>0&&!hasF&&(
            <div style={{marginBottom:16}}>
              <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:"0.2em",textTransform:"uppercase",color:GOLD,opacity:0.65,marginBottom:10}}>◈ {t.distinguishedHonours}</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:9}}>
                {featured.map(b=><LegCard key={b.id} badge={b} unlockedAt={unlMap[b.id]} t={t} onClick={()=>openModal(b,false)}/>)}
              </div>
            </div>
          )}

          {/* ── BADGE GRID ── */}
          {loading?(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(142px,1fr))",gap:9}}>
              {Array.from({length:12}).map((_,i)=>(
                <div key={i} style={{height:168,borderRadius:14,background:glass(0.45),backdropFilter:"blur(8px)",border:`0.5px solid ${RIM}`,opacity:0.3+i%4*0.1,animation:`bg-rise 0.4s ${i*0.04}s both`}}/>
              ))}
            </div>
          ):grid.length===0?(
            <div style={{textAlign:"center",padding:"3.5rem 1rem",background:glass(0.5),backdropFilter:"blur(10px)",border:`0.5px solid ${RIM}`,borderRadius:14}}>
              <div style={{fontSize:38,marginBottom:12,opacity:0.3}}>⚔</div>
              <p style={{fontFamily:"'Cinzel',serif",fontSize:13,color:DIM,letterSpacing:"0.1em"}}>{t.noResults}</p>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(142px,1fr))",gap:9}}>
              {grid.map((badge,i)=>{
                const u=!!unlMap[badge.id],prog=prgMap[badge.id]??0;
                const c=!u&&cloak(badge.id,badge.is_hidden??false);
                const delay=Math.min(i*0.025,0.55);
                if(u&&badge.rarity==="legendary"&&!clkOnly)return(
                  <div key={badge.id} style={{gridColumn:"span 2"}}><LegCard badge={badge} unlockedAt={unlMap[badge.id]} t={t} onClick={()=>openModal(badge,false)}/></div>
                );
                if(c)return<CloakedCard key={badge.id} badgeId={badge.id} delay={delay} t={t} onClick={()=>openModal(badge,true)}/>;
                return<BadgeCard key={badge.id} badge={badge} unlocked={u} progress={prog} delay={delay} onClick={()=>openModal(badge,false)}/>;
              })}
            </div>
          )}

          <div style={{textAlign:"center",marginTop:"2rem",opacity:0.25}}>
            <p style={{fontFamily:"'Cinzel Decorative',serif",fontSize:8.5,letterSpacing:"0.28em",textTransform:"uppercase",color:GOLD}}>Finis Coronat Opus</p>
          </div>
        </div>

        <Modal badge={modal} isUnlocked={modal?!!unlMap[modal.id]:false} unlockedAt={modal?unlMap[modal.id]:undefined} progress={modal?(prgMap[modal.id]??0):0} cloaked={modalClk} t={t} onClose={closeModal}/>
      </div>
    </AppLayout>
  );
}
