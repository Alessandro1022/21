// Badges.tsx — Hall of Honours v4 — Navigation + EN/SV/TR + Lighter design

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { grantAllBadgesToAdmin } from '@/services/badgeService';
import { BADGES, Badge } from '@/data/badgeDefinitions';

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&family=Raleway:wght@300;400;500;600;700&family=Cormorant+Garant:ital,wght@0,400;0,600;1,400;1,600&display=swap');
*,*::before,*::after{box-sizing:border-box;}
@keyframes badge-rise{0%{opacity:0;transform:translateY(18px) scale(0.92);filter:blur(2px);}55%{filter:blur(0);}100%{opacity:1;transform:translateY(0) scale(1);filter:blur(0);}}
@keyframes badge-rise-fast{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer-gold{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes shimmer-violet{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes shimmer-sapphire{0%{background-position:-400% center;}100%{background-position:400% center;}}
@keyframes legendary-breathe{0%,100%{box-shadow:0 0 0 1px rgba(212,175,55,0.22),0 4px 24px rgba(212,175,55,0.09);}50%{box-shadow:0 0 0 1px rgba(212,175,55,0.5),0 4px 40px rgba(212,175,55,0.22);}}
@keyframes epic-breathe{0%,100%{box-shadow:0 0 0 1px rgba(167,139,250,0.18),0 2px 18px rgba(139,92,246,0.07);}50%{box-shadow:0 0 0 1px rgba(167,139,250,0.42),0 2px 28px rgba(139,92,246,0.18);}}
@keyframes rare-breathe{0%,100%{box-shadow:0 0 0 1px rgba(96,165,250,0.14),0 2px 14px rgba(59,130,246,0.06);}50%{box-shadow:0 0 0 1px rgba(96,165,250,0.38),0 2px 22px rgba(59,130,246,0.16);}}
@keyframes rune-pulse{0%,100%{opacity:0.14;}50%{opacity:0.6;text-shadow:0 0 10px rgba(212,175,55,0.7);}}
@keyframes seal-rotate{0%{transform:scale(1) rotate(0deg);}50%{transform:scale(1.06) rotate(3deg);}100%{transform:scale(1) rotate(0deg);}}
@keyframes bar-fill{from{width:0%;opacity:0.4;}to{opacity:1;}}
@keyframes ring-fill{from{stroke-dashoffset:251;}}
@keyframes modal-in{from{opacity:0;transform:scale(0.9) translateY(20px);filter:blur(4px);}to{opacity:1;transform:scale(1) translateY(0);filter:blur(0);}}
@keyframes overlay-in{from{opacity:0;}to{opacity:1;}}
@keyframes corner-breathe{0%,100%{opacity:0.3;}50%{opacity:0.9;}}
@keyframes glow-line{0%,100%{opacity:0.28;transform:scaleX(0.8);}50%{opacity:1;transform:scaleX(1);}}
@keyframes trophy-float{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-7px) rotate(1deg);}}
@keyframes counter-up{from{transform:translateY(6px);opacity:0;}to{transform:translateY(0);opacity:1;}}
@keyframes scan-down{from{transform:translateY(-100%);opacity:0.6;}to{transform:translateY(600%);opacity:0;}}
@keyframes gradient-shift{0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;}}
@keyframes tab-underline{from{width:0%;}to{width:100%;}}
@keyframes slide-right{from{transform:translateX(-14px);opacity:0;}to{transform:translateX(0);opacity:1;}}
@keyframes lang-fade{from{opacity:0;transform:translateY(-4px);}to{opacity:1;transform:translateY(0);}}
@keyframes menu-slide{from{opacity:0;transform:translateX(16px);}to{opacity:1;transform:translateX(0);}}

.bc-base{animation:badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both;transition:transform 0.25s cubic-bezier(0.22,1.2,0.58,1),box-shadow 0.25s ease!important;}
.bc-base:hover{transform:translateY(-5px) scale(1.022)!important;}
.bc-legendary{animation:badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,legendary-breathe 3.2s ease-in-out infinite 0.8s!important;}
.bc-legendary:hover{transform:translateY(-7px) scale(1.03)!important;}
.bc-epic{animation:badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,epic-breathe 3.5s ease-in-out infinite 0.5s!important;}
.bc-epic:hover{transform:translateY(-6px) scale(1.025)!important;}
.bc-rare{animation:badge-rise 0.45s cubic-bezier(0.22,1.2,0.58,1) both,rare-breathe 4s ease-in-out infinite 0.3s!important;}
.bc-rare:hover{transform:translateY(-5px) scale(1.02)!important;}
.shimmer-gold{background:linear-gradient(90deg,#8a6200 0%,#C49A00 15%,#D4AF37 30%,#F5E078 45%,#D4AF37 60%,#C49A00 75%,#8a6200 90%,#C49A00 100%);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer-gold 4s linear infinite;}
.shimmer-violet{background:linear-gradient(90deg,#4c1d95 0%,#7c3aed 20%,#a78bfa 40%,#ddd6fe 50%,#a78bfa 60%,#7c3aed 80%,#4c1d95 100%);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer-violet 3.5s linear infinite;}
.shimmer-sapphire{background:linear-gradient(90deg,#1e3a5f 0%,#2563eb 20%,#60a5fa 40%,#bae6fd 50%,#60a5fa 60%,#2563eb 80%,#1e3a5f 100%);background-size:400% auto;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:shimmer-sapphire 4.5s linear infinite;}
.rune{animation:rune-pulse 2.8s ease-in-out infinite;}
.hscroll::-webkit-scrollbar{height:3px;}.hscroll::-webkit-scrollbar-track{background:transparent;}.hscroll::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.22);border-radius:99px;}
.main-scroll::-webkit-scrollbar{width:4px;}.main-scroll::-webkit-scrollbar-track{background:transparent;}.main-scroll::-webkit-scrollbar-thumb{background:rgba(212,175,55,0.16);border-radius:99px;}
.glow-line{animation:glow-line 3.2s ease-in-out infinite;}
.trophy-float{animation:trophy-float 4s ease-in-out infinite;}
.corner-dec{animation:corner-breathe 3.2s ease-in-out infinite;}
.seal-anim{animation:seal-rotate 3.5s ease-in-out infinite;}
.search-input:focus{outline:none;border-color:rgba(212,175,55,0.5)!important;box-shadow:0 0 0 3px rgba(212,175,55,0.07)!important;}
.fpill{transition:all 0.15s ease;}.fpill:hover{border-color:rgba(212,175,55,0.35)!important;color:rgba(245,237,213,0.85)!important;background:rgba(212,175,55,0.05)!important;}
.nav-btn:hover{background:rgba(212,175,55,0.07)!important;border-color:rgba(212,175,55,0.35)!important;}
.lang-btn:hover{background:rgba(212,175,55,0.1)!important;}
.close-btn:hover{background:rgba(212,175,55,0.07)!important;border-color:rgba(212,175,55,0.5)!important;color:#D4AF37!important;}
.menu-item:hover{background:rgba(245,237,213,0.05)!important;}
`;

function injectCSS() {
  if (document.getElementById('hon-v4-css')) return;
  const s = document.createElement('style');
  s.id = 'hon-v4-css';
  s.textContent = GLOBAL_CSS;
  document.head.appendChild(s);
}

type Lang = 'en' | 'sv' | 'tr';

const TR = {
  en: {
    archiveLabel:'Imperial Archive',pageTitle:'Hall of Honours',
    pageSubtitle:'Your deeds etched into the annals of empire',
    back:'Back',menu:'Menu',honoursEarned:'Honours Earned',totalXP:'Total XP',complete:'Complete',
    overallConquest:'Overall Conquest',badgeGrid:'Badge Grid',empireView:'Empire View',
    distinguishedHonours:'Distinguished Honours',distinguishedSub:'Your highest-tier distinctions',
    recentUnlocks:'Recent Unlocks',recentSub:'Your most recently acquired honours',
    empireBreakdown:'Empire Breakdown',empireSub:'Conquest progress across all civilisations',
    yourProgress:'Your Progress',searchPlaceholder:'Search records…',
    allRarities:'All Rarities',legendary:'Legendary',epic:'Epic',rare:'Rare',common:'Common',
    earned:'Earned',concealed:'Concealed',records:'Records',clearFilters:'Clear filters',
    allEmpires:'All Empires',all:'All',chat:'Chat',quiz:'Quiz',timeline:'Timeline',map:'Map',
    profiles:'Profiles',lineage:'Lineage',story:'Story',ranked:'Ranked',archives:'Archives',mastery:'Mastery',
    earnedLabel:'Earned',sealedRecord:'Sealed Record',
    sealedDesc:'This record lies sealed within the Imperial Archive. Continue your conquest to reveal its secrets.',
    progressToUnlock:'Progress to Unlock',achieved:'achieved',required:'required',
    honourBestowed:'Honour Bestowed',dismiss:'Dismiss',
    noRecordsFound:'No Records Found',adjustFilters:'Adjust your filters to uncover more records.',
    archiveEmpty:'The Archive is empty. Begin your conquest to earn Honours.',clearFiltersBtn:'Clear Filters',
    initiate:'Initiate',apprentice:'Apprentice',chronicler:'Chronicler',legionnaire:'Legionnaire',
    grandVizier:'Grand Vizier',masteryRank:'Mastery Rank',
    finisCoronat:'Finis Coronat Opus',finisLatina:'The end crowns the work',
    mastered:'Mastered',badgesLabel:'badges',percentComplete:'% complete',concealed_card:'Concealed',
    today:'Today',yesterday:'Yesterday',daysAgo:'days ago',weeksAgo:'weeks ago',monthsAgo:'months ago',yearsAgo:'years ago',
  },
  sv: {
    archiveLabel:'Imperialt Arkiv',pageTitle:'Hedrarnas Sal',
    pageSubtitle:'Dina bedrifter inristade i imperiets annaler',
    back:'Tillbaka',menu:'Meny',honoursEarned:'Hedringar Erhållna',totalXP:'Total XP',complete:'Avklarat',
    overallConquest:'Total Erövring',badgeGrid:'Märkesrutnät',empireView:'Imperievy',
    distinguishedHonours:'Framstående Hedringar',distinguishedSub:'Dina högstnivå-utmärkelser',
    recentUnlocks:'Senaste Upplåsningar',recentSub:'Dina senast förvärvade hedringar',
    empireBreakdown:'Imperieöversikt',empireSub:'Erövringsstatus för alla civilisationer',
    yourProgress:'Din Framsteg',searchPlaceholder:'Sök poster…',
    allRarities:'Alla Sällsyntheter',legendary:'Legendarisk',epic:'Episk',rare:'Sällsynt',common:'Vanlig',
    earned:'Intjänad',concealed:'Dold',records:'Poster',clearFilters:'Rensa filter',
    allEmpires:'Alla Imperier',all:'Alla',chat:'Chatt',quiz:'Quiz',timeline:'Tidslinje',map:'Karta',
    profiles:'Profiler',lineage:'Härkomst',story:'Berättelse',ranked:'Rankad',archives:'Arkiv',mastery:'Mästerskap',
    earnedLabel:'Erhållen',sealedRecord:'Förseglat Rekord',
    sealedDesc:'Denna post är förseglad i det Imperiala Arkivet. Fortsätt din erövring för att avslöja dess hemligheter.',
    progressToUnlock:'Framsteg mot Upplåsning',achieved:'uppnått',required:'krävs',
    honourBestowed:'Heder Skänkt',dismiss:'Stäng',
    noRecordsFound:'Inga Poster Hittades',adjustFilters:'Justera dina filter för att hitta fler poster.',
    archiveEmpty:'Arkivet är tomt. Påbörja din erövring för att förtjäna hedringar.',clearFiltersBtn:'Rensa Filter',
    initiate:'Novis',apprentice:'Lärling',chronicler:'Krönikör',legionnaire:'Legionär',
    grandVizier:'Storvezir',masteryRank:'Mästerskapsrang',
    finisCoronat:'Finis Coronat Opus',finisLatina:'Slutet kröner verket',
    mastered:'Bemästrad',badgesLabel:'märken',percentComplete:'% klart',concealed_card:'Dold',
    today:'Idag',yesterday:'Igår',daysAgo:'dagar sedan',weeksAgo:'veckor sedan',monthsAgo:'månader sedan',yearsAgo:'år sedan',
  },
  tr: {
    archiveLabel:'İmparatorluk Arşivi',pageTitle:'Onurlar Salonu',
    pageSubtitle:'İmparatorluğun yıllıklarına kazınan kahramanlıkların',
    back:'Geri',menu:'Menü',honoursEarned:'Kazanılan Onurlar',totalXP:'Toplam XP',complete:'Tamamlandı',
    overallConquest:'Genel Fetih',badgeGrid:'Rozet Izgarası',empireView:'İmparatorluk Görünümü',
    distinguishedHonours:'Seçkin Onurlar',distinguishedSub:'En yüksek seviye unvanlarınız',
    recentUnlocks:'Son Açılanlar',recentSub:'En son kazanılan onurlarınız',
    empireBreakdown:'İmparatorluk Dökümü',empireSub:'Tüm medeniyetlerdeki fetih ilerlemesi',
    yourProgress:'İlerlemen',searchPlaceholder:'Kayıtlarda ara…',
    allRarities:'Tüm Nadirlikleri',legendary:'Efsanevi',epic:'Destansı',rare:'Nadir',common:'Yaygın',
    earned:'Kazanıldı',concealed:'Gizli',records:'Kayıtlar',clearFilters:'Filtreleri temizle',
    allEmpires:'Tüm İmparatorluklar',all:'Tümü',chat:'Sohbet',quiz:'Quiz',timeline:'Zaman Çizelgesi',map:'Harita',
    profiles:'Profiller',lineage:'Soy',story:'Hikaye',ranked:'Sıralı',archives:'Arşivler',mastery:'Ustalık',
    earnedLabel:'Kazanıldı',sealedRecord:'Mühürlü Kayıt',
    sealedDesc:'Bu kayıt İmparatorluk Arşivi içinde mühürlüdür. Sırlarını ortaya çıkarmak için fetihlere devam et.',
    progressToUnlock:'Kilit Açma İlerlemesi',achieved:'ulaşıldı',required:'gerekli',
    honourBestowed:'Onur Bahşedildi',dismiss:'Kapat',
    noRecordsFound:'Kayıt Bulunamadı',adjustFilters:'Daha fazla kayıt bulmak için filtrelerini ayarla.',
    archiveEmpty:'Arşiv boş. Onur kazanmak için fetihlere başla.',clearFiltersBtn:'Filtreleri Temizle',
    initiate:'Acemi',apprentice:'Çırak',chronicler:'Vakanüvis',legionnaire:'Lejyoner',
    grandVizier:'Sadrazam',masteryRank:'Ustalık Sırası',
    finisCoronat:'Finis Coronat Opus',finisLatina:'Sonu eseri taçlandırır',
    mastered:'Ustalık Sağlandı',badgesLabel:'rozet',percentComplete:'% tamamlandı',concealed_card:'Gizli',
    today:'Bugün',yesterday:'Dün',daysAgo:'gün önce',weeksAgo:'hafta önce',monthsAgo:'ay önce',yearsAgo:'yıl önce',
  },
} as const;
type T = typeof TR['en'];

const C = {
  bg:'#1c1710',panel:'#272018',panel2:'#302819',panel3:'#3c301e',panel4:'#473a25',
  rim:'#4a3e28',rimL:'#5e5035',
  gold:'#D4AF37',goldL:'#ECC84A',goldD:'#9a7b10',amber:'#c9941a',
  cream:'#F5EDD5',cream2:'#E2D4B0',
  muted:'rgba(245,237,213,0.7)',dim:'rgba(245,237,213,0.42)',
  faint:'rgba(245,237,213,0.18)',ghost:'rgba(245,237,213,0.08)',
  green:'#34d399',greenDim:'rgba(52,211,153,0.1)',
} as const;

const R = {
  legendary:{accent:'#D4AF37',accentL:'#F5E07A',accentD:'#8a6200',glow:'212,175,55',text:'#EACE60',bg:'rgba(212,175,55,0.08)',bgL:'rgba(212,175,55,0.16)',border:'rgba(212,175,55,0.32)',borderL:'rgba(212,175,55,0.58)',label:'Legendary',cls:'bc-legendary',shimmer:'shimmer-gold',order:4,star:'★★★★'},
  epic:{accent:'#a78bfa',accentL:'#ddd6fe',accentD:'#6d28d9',glow:'167,139,250',text:'#c4b5fd',bg:'rgba(167,139,250,0.08)',bgL:'rgba(167,139,250,0.14)',border:'rgba(167,139,250,0.28)',borderL:'rgba(167,139,250,0.52)',label:'Epic',cls:'bc-epic',shimmer:'shimmer-violet',order:3,star:'★★★'},
  rare:{accent:'#60a5fa',accentL:'#bae6fd',accentD:'#1d4ed8',glow:'96,165,250',text:'#93c5fd',bg:'rgba(96,165,250,0.07)',bgL:'rgba(96,165,250,0.13)',border:'rgba(96,165,250,0.25)',borderL:'rgba(96,165,250,0.48)',label:'Rare',cls:'bc-rare',shimmer:'shimmer-sapphire',order:2,star:'★★'},
  common:{accent:'#a8a49a',accentL:'#d0ccc3',accentD:'#6a655b',glow:'168,164,154',text:'#c5c1b8',bg:'rgba(168,164,154,0.07)',bgL:'rgba(168,164,154,0.12)',border:'rgba(168,164,154,0.22)',borderL:'rgba(168,164,154,0.4)',label:'Common',cls:'bc-base',shimmer:'',order:1,star:'★'},
} as const;
type RarityKey = keyof typeof R;

const EMPIRES = [
  {id:'ottoman',label:'Ottoman',flag:'🌙',color:'#ef4444',colorDim:'rgba(239,68,68,0.1)'},
  {id:'roman',label:'Roman',flag:'🦅',color:'#d4af37',colorDim:'rgba(212,175,55,0.1)'},
  {id:'mongol',label:'Mongol',flag:'🐎',color:'#b45309',colorDim:'rgba(180,83,9,0.1)'},
  {id:'egypt',label:'Egypt',flag:'𓂀',color:'#ca8a04',colorDim:'rgba(202,138,4,0.1)'},
  {id:'british',label:'British',flag:'🦁',color:'#3b82f6',colorDim:'rgba(59,130,246,0.1)'},
  {id:'islamic',label:'Islamic',flag:'🌟',color:'#22c55e',colorDim:'rgba(34,197,94,0.1)'},
  {id:'seljuk',label:'Seljuk',flag:'🏹',color:'#f59e0b',colorDim:'rgba(245,158,11,0.1)'},
  {id:'japanese',label:'Japanese',flag:'⛩️',color:'#f43f5e',colorDim:'rgba(244,63,94,0.1)'},
  {id:'mali',label:'Mali',flag:'🌍',color:'#f97316',colorDim:'rgba(249,115,22,0.1)'},
] as const;

const CATS = [
  {id:'chat',icon:'💬'},{id:'quiz',icon:'🎯'},{id:'timeline',icon:'📅'},
  {id:'map',icon:'🗺️'},{id:'profiles',icon:'👤'},{id:'lineage',icon:'🌳'},
  {id:'story',icon:'📖'},{id:'ranked',icon:'⚔️'},{id:'archives',icon:'📜'},{id:'mastery',icon:'🏆'},
] as const;

const MASTERY = [
  {min:0,max:10,key:'initiate',icon:'🪨',color:'#a8a49a'},
  {min:10,max:25,key:'apprentice',icon:'⚔️',color:'#60a5fa'},
  {min:25,max:50,key:'chronicler',icon:'📜',color:'#a78bfa'},
  {min:50,max:75,key:'legionnaire',icon:'🛡️',color:'#D4AF37'},
  {min:75,max:101,key:'grandVizier',icon:'👑',color:'#f59e0b'},
] as const;

const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];

const NAV = [
  {id:'home',label:'Home',icon:'🏛️',path:'/'},
  {id:'chat',label:'Chat',icon:'💬',path:'/chat'},
  {id:'timeline',label:'Timeline',icon:'📅',path:'/timeline'},
  {id:'quiz',label:'Quiz',icon:'🎯',path:'/quiz'},
  {id:'map',label:'Map',icon:'🗺️',path:'/map'},
  {id:'profiles',label:'Profiles',icon:'👤',path:'/profiles'},
  {id:'lineage',label:'Lineage',icon:'🌳',path:'/lineage'},
  {id:'story',label:'Story',icon:'📖',path:'/story'},
  {id:'ranked',label:'Ranked',icon:'⚔️',path:'/ranked'},
  {id:'badges',label:'Badges',icon:'🏅',path:'/badges'},
] as const;

// ── UTILS ──────────────────────────────────────────────────────────────
function getMastery(pct: number) { return MASTERY.find(m=>pct>=m.min&&pct<m.max)??MASTERY[MASTERY.length-1]; }
function cloak(id: string, hidden: boolean): boolean {
  if (hidden) return true;
  let h=0; for(let i=0;i<id.length;i++) h=(h*31+id.charCodeAt(i))>>>0; return h%5<=1;
}
function runes(seed: string, n=8): string[] {
  let h=0; for(let i=0;i<seed.length;i++) h=(h*31+seed.charCodeAt(i))>>>0;
  return Array.from({length:n},(_,i)=>RUNES[(h+i*7)%RUNES.length]);
}
function fmtDate(iso: string, lang: Lang) {
  return new Date(iso).toLocaleDateString(lang==='sv'?'sv-SE':lang==='tr'?'tr-TR':'en-GB',{day:'numeric',month:'long',year:'numeric'});
}
function fmtRel(iso: string, lang: Lang) {
  const l=TR[lang]; const d=Math.floor((Date.now()-new Date(iso).getTime())/86400000);
  if(d===0)return l.today; if(d===1)return l.yesterday; if(d<7)return`${d} ${l.daysAgo}`;
  if(d<30)return`${Math.floor(d/7)} ${l.weeksAgo}`; if(d<365)return`${Math.floor(d/30)} ${l.monthsAgo}`;
  return`${Math.floor(d/365)} ${l.yearsAgo}`;
}

// ── NAV BAR ────────────────────────────────────────────────────────────
function NavBar({lang,setLang,t}:{lang:Lang;setLang:(l:Lang)=>void;t:T}) {
  const navigate=useNavigate();
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!open)return;
    const h=(e:MouseEvent)=>{if(ref.current&&!ref.current.contains(e.target as Node))setOpen(false);};
    document.addEventListener('mousedown',h);
    return()=>document.removeEventListener('mousedown',h);
  },[open]);
  return (
    <nav style={{position:'sticky',top:0,zIndex:100,background:`${C.bg}ee`,backdropFilter:'blur(16px)',borderBottom:`0.5px solid ${C.rim}`,padding:'0 20px',height:58,display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
      <button className="nav-btn" onClick={()=>navigate(-1)} style={{display:'flex',alignItems:'center',gap:7,background:'transparent',border:`0.5px solid ${C.rim}`,borderRadius:9,padding:'6px 14px',color:C.muted,fontSize:11,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.06em',cursor:'pointer',transition:'all 0.18s',whiteSpace:'nowrap',flexShrink:0}}>
        <span style={{fontSize:14}}>←</span><span>{t.back}</span>
      </button>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:13,letterSpacing:'0.15em',textTransform:'uppercase',color:C.gold,opacity:0.8,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',textAlign:'center'}}>{t.archiveLabel}</div>
      <div style={{display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
        <div style={{display:'flex',gap:2,background:C.panel2,borderRadius:8,padding:'3px'}}>
          {(['en','sv','tr'] as Lang[]).map(l=>(
            <button key={l} className="lang-btn" onClick={()=>setLang(l)} style={{background:lang===l?'rgba(212,175,55,0.14)':'transparent',border:lang===l?'0.5px solid rgba(212,175,55,0.48)':'0.5px solid transparent',borderRadius:6,padding:'4px 9px',color:lang===l?C.gold:C.dim,fontSize:9.5,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.08em',textTransform:'uppercase',cursor:'pointer',fontWeight:lang===l?600:400,transition:'all 0.15s'}}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{position:'relative'}} ref={ref}>
          <button className="nav-btn" onClick={()=>setOpen(v=>!v)} style={{display:'flex',alignItems:'center',gap:6,background:open?C.panel3:'transparent',border:open?`0.5px solid ${C.rimL}`:`0.5px solid ${C.rim}`,borderRadius:9,padding:'6px 14px',color:C.muted,fontSize:11,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.06em',cursor:'pointer',transition:'all 0.18s'}}>
            <span style={{fontSize:15}}>☰</span><span>{t.menu}</span>
          </button>
          {open&&(
            <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:C.panel,border:`0.5px solid ${C.rim}`,borderRadius:14,boxShadow:'0 20px 60px rgba(0,0,0,0.65)',overflow:'hidden',minWidth:200,zIndex:200,animation:'menu-slide 0.22s cubic-bezier(0.22,1,0.58,1)'}}>
              <div style={{height:'2px',background:`linear-gradient(90deg,transparent,${C.gold}55,transparent)`}}/>
              {NAV.map((p,i)=>{
                const active=p.id==='badges';
                return(
                  <button key={p.id} className="menu-item" onClick={()=>{navigate(p.path);setOpen(false);}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px 18px',background:active?C.panel3:'transparent',borderBottom:i<NAV.length-1?`0.5px solid ${C.ghost}`:'none',border:'none',cursor:'pointer',textAlign:'left',animation:`slide-right 0.25s ${i*0.04}s both`}}>
                    <span style={{fontSize:16,width:24,textAlign:'center'}}>{p.icon}</span>
                    <span style={{fontFamily:"'Raleway',sans-serif",fontSize:11.5,letterSpacing:'0.04em',color:active?C.gold:C.muted,fontWeight:active?600:400}}>{p.label}</span>
                    {active&&<span style={{marginLeft:'auto',fontSize:9,color:C.gold}}>◈</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// ── PRIMITIVES ─────────────────────────────────────────────────────────
function Ring({value,max,size=56,stroke=3,color=C.gold,trackColor}:{value:number;max:number;size?:number;stroke?:number;color?:string;trackColor?:string}) {
  const r=(size-stroke*2)/2,circ=2*Math.PI*r,pct=max>0?Math.min(1,value/max):0;
  const cx=size/2,endX=cx+r*Math.cos(-Math.PI/2+pct*2*Math.PI),endY=cx+r*Math.sin(-Math.PI/2+pct*2*Math.PI);
  return(
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow:'visible'}}>
      <defs><filter id="rg"><feGaussianBlur stdDeviation="1.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke={trackColor??'rgba(255,255,255,0.07)'} strokeWidth={stroke}/>
      {pct>0&&<circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${pct*circ} ${circ}`} transform={`rotate(-90 ${cx} ${cx})`} style={{animation:'ring-fill 1.2s cubic-bezier(0.4,0,0.2,1) both'}}/>}
      {pct>0.02&&<circle cx={endX} cy={endY} r={stroke*1.4} fill={color} filter="url(#rg)"/>}
    </svg>
  );
}

function Bar({value,max,color=C.gold,h=4}:{value:number;max:number;color?:string;h?:number}) {
  const pct=max>0?Math.min(100,(value/max)*100):0;
  return(<div style={{height:h,background:'rgba(255,255,255,0.07)',borderRadius:99,overflow:'hidden'}}><div style={{height:'100%',width:`${pct}%`,background:color,borderRadius:99,animation:'bar-fill 1s cubic-bezier(0.4,0,0.2,1) both',boxShadow:`0 0 5px ${color}40`}}/></div>);
}

function Pill({rarity,size='md'}:{rarity:RarityKey;size?:'sm'|'md'}) {
  const cfg=R[rarity];
  return(<span style={{display:'inline-block',fontSize:size==='sm'?8.5:9.5,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.1em',textTransform:'uppercase',padding:size==='sm'?'1.5px 7px':'2.5px 10px',borderRadius:99,background:cfg.bg,border:`0.5px solid ${cfg.border}`,color:cfg.text}}>{cfg.shimmer?<span className={cfg.shimmer}>{cfg.label}</span>:cfg.label}</span>);
}

function Corner({color,flip=false,size=20}:{color:string;flip?:boolean;size?:number}) {
  return(<svg className="corner-dec" width={size} height={size} viewBox="0 0 20 20" style={{position:'absolute',pointerEvents:'none',...(flip?{bottom:7,right:7,transform:'rotate(180deg)'}:{top:7,left:7})}}><path d="M3 3 L3 9 M3 3 L9 3" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/><circle cx="3" cy="3" r="1.5" fill={color}/></svg>);
}

function SecLabel({children,sub}:{children:React.ReactNode;sub?:string}) {
  return(<div style={{marginBottom:16}}><div style={{display:'flex',alignItems:'center',gap:12}}><span style={{fontFamily:"'Cinzel',serif",fontSize:9.5,letterSpacing:'0.22em',textTransform:'uppercase',color:C.gold,opacity:0.78}}>{children}</span><div className="glow-line" style={{flex:1,height:'0.5px',background:`linear-gradient(90deg,${C.dim},transparent)`}}/></div>{sub&&<p style={{fontFamily:"'Cormorant Garant',serif",fontSize:12.5,color:C.dim,fontStyle:'italic',margin:'3px 0 0'}}>{sub}</p>}</div>);
}

function Divider({symbol='⚜',opacity=0.28}:{symbol?:string;opacity?:number}) {
  return(<div style={{display:'flex',alignItems:'center',gap:14,margin:'2rem 0'}}><div style={{flex:1,height:'0.5px',background:`linear-gradient(90deg,transparent,${C.faint} 40%,${C.dim} 80%)`}}/><span style={{fontSize:13,opacity,color:C.gold}}>{symbol}</span><div style={{flex:1,height:'0.5px',background:`linear-gradient(90deg,${C.dim} 20%,${C.faint} 60%,transparent)`}}/></div>);
}

function StatCard({value,label,icon,accent=C.gold}:{value:string|number;label:string;icon:string;accent?:string}) {
  return(<div style={{background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:14,padding:'16px 20px',minWidth:110,textAlign:'center',position:'relative',overflow:'hidden',flexShrink:0}}><div style={{position:'absolute',top:0,left:'12%',right:'12%',height:'1.5px',background:`linear-gradient(90deg,transparent,${accent}60,transparent)`}}/><div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 0%,${accent}07 0%,transparent 70%)`,pointerEvents:'none'}}/><div style={{fontSize:22,marginBottom:6,lineHeight:1}}>{icon}</div><div style={{fontFamily:"'Cinzel',serif",fontSize:22,fontWeight:700,color:accent,lineHeight:1,marginBottom:5,animation:'counter-up 0.5s ease both'}}>{value}</div><div style={{fontFamily:"'Raleway',sans-serif",fontSize:9,letterSpacing:'0.14em',textTransform:'uppercase',color:C.muted}}>{label}</div></div>);
}

function MasteryChip({pct,t}:{pct:number;t:T}) {
  const m=getMastery(pct);
  return(<div style={{display:'flex',alignItems:'center',gap:10,background:C.panel2,border:`0.5px solid ${m.color}28`,borderRadius:12,padding:'10px 16px',position:'relative',overflow:'hidden',flexShrink:0}}><div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 0% 50%,${m.color}08 0%,transparent 70%)`,pointerEvents:'none'}}/><span style={{fontSize:20}}>{m.icon}</span><div><div style={{fontFamily:"'Cinzel',serif",fontSize:11.5,fontWeight:600,color:m.color,letterSpacing:'0.06em'}}>{(t as Record<string,string>)[m.key]}</div><div style={{fontFamily:"'Raleway',sans-serif",fontSize:9,color:C.dim,letterSpacing:'0.1em',textTransform:'uppercase'}}>{t.masteryRank}</div></div></div>);
}

// ── BADGE CARDS ────────────────────────────────────────────────────────
function BadgeCard({badge,unlocked,progress,delay,onClick}:{badge:Badge;unlocked:boolean;progress:number;delay:number;onClick:()=>void}) {
  const cfg=R[badge.rarity as RarityKey];
  return(
    <button className={unlocked?cfg.cls:'bc-base'} onClick={onClick} style={{animationDelay:`${delay}s`,background:C.panel,border:unlocked?`0.5px solid ${cfg.border}`:`0.5px solid ${C.rim}`,borderRadius:16,padding:'20px 14px 16px',cursor:'pointer',textAlign:'center',opacity:unlocked?1:0.52,position:'relative',overflow:'hidden',minHeight:180,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',width:'100%'}}>
      {unlocked&&<div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 20%,${cfg.bg} 0%,transparent 65%)`,pointerEvents:'none'}}/>}
      {unlocked&&<div style={{position:'absolute',top:0,left:0,right:0,height:'2.5px',background:`linear-gradient(90deg,transparent,${cfg.accent} 40%,${cfg.accentL} 50%,${cfg.accent} 60%,transparent)`}}/>}
      {unlocked&&<Corner color={cfg.accent} size={16}/>}
      {unlocked&&<Corner color={cfg.accent} size={16} flip/>}
      {unlocked&&<div style={{position:'absolute',top:10,left:10,width:17,height:17,borderRadius:'50%',background:'linear-gradient(135deg,#22c55e,#16a34a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:8,color:'#fff',fontWeight:800,boxShadow:'0 2px 6px rgba(34,197,94,0.35)'}}>✓</div>}
      {badge.xp_reward>0&&<div style={{position:'absolute',top:10,right:10,fontSize:8,fontFamily:"'Raleway',sans-serif",color:unlocked?C.gold:C.dim,fontWeight:600}}>+{badge.xp_reward}&thinsp;XP</div>}
      <div style={{position:'relative',margin:'8px 0 12px'}}>
        {!unlocked&&badge.condition_value>0&&<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}><Ring value={progress} max={badge.condition_value} size={56} stroke={2.5} color={cfg.accent}/></div>}
        <div style={{width:56,height:56,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,lineHeight:1,position:'relative',zIndex:1,filter:unlocked?`drop-shadow(0 2px 8px rgba(${cfg.glow},0.4))`:'grayscale(1) brightness(0.5)'}}>{badge.icon}</div>
      </div>
      <div style={{fontSize:10.5,fontFamily:"'Cinzel',serif",fontWeight:600,color:unlocked?C.cream:C.muted,lineHeight:1.45,marginBottom:9,letterSpacing:'0.03em',flex:1,display:'flex',alignItems:'center',textAlign:'center'}}>{badge.name}</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,width:'100%'}}>
        <Pill rarity={badge.rarity as RarityKey} size="sm"/>
        {!unlocked&&badge.condition_value>0&&<div style={{fontSize:9,color:C.dim,fontFamily:"'Raleway',sans-serif"}}>{progress}&thinsp;/&thinsp;{badge.condition_value}</div>}
        {unlocked&&<div style={{fontSize:8,color:cfg.accent,opacity:0.7}}>{cfg.star}</div>}
      </div>
    </button>
  );
}

function CloakedCard({badgeId,delay,t,onClick}:{badgeId:string;delay:number;t:T;onClick:()=>void}) {
  const rns=useMemo(()=>runes(badgeId,8),[badgeId]);
  return(
    <button className="bc-base" onClick={onClick} style={{animationDelay:`${delay}s`,background:C.panel,border:'0.5px solid rgba(120,85,10,0.2)',borderRadius:16,cursor:'pointer',textAlign:'center',minHeight:180,width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8,position:'relative',overflow:'hidden',opacity:0.72}}>
      <div style={{position:'absolute',left:0,right:0,height:'0.5px',background:'linear-gradient(90deg,transparent,rgba(212,175,55,0.35),transparent)',animation:'scan-down 7s linear infinite',pointerEvents:'none'}}/>
      <div className="seal-anim" style={{fontSize:26,filter:'sepia(1) brightness(0.55)'}}>🔒</div>
      <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:3,maxWidth:90}}>
        {rns.map((r,i)=><span key={i} className="rune" style={{fontFamily:'serif',fontSize:13,color:C.amber,animationDelay:`${i*0.3}s`}}>{r}</span>)}
      </div>
      <div style={{fontFamily:"'Cinzel',serif",fontSize:8.5,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(160,110,20,0.5)'}}>{t.concealed_card}</div>
    </button>
  );
}

function LegendaryShowcase({badge,unlockedAt,lang,t,onClick}:{badge:Badge;unlockedAt:string;lang:Lang;t:T;onClick:()=>void}) {
  const cfg=R.legendary;
  return(
    <button className="bc-legendary" onClick={onClick} style={{gridColumn:'span 2',background:`linear-gradient(140deg,${C.panel} 0%,${C.panel2} 60%,${C.panel3} 100%)`,border:`0.5px solid ${cfg.border}`,borderRadius:18,padding:'24px 28px',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:22,position:'relative',overflow:'hidden',width:'100%'}}>
      <div style={{position:'absolute',left:0,top:0,bottom:0,width:'45%',background:`radial-gradient(ellipse at 20% 50%,${cfg.bgL} 0%,transparent 75%)`,pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:`linear-gradient(90deg,${cfg.accentD},${cfg.accentL},${cfg.accent},${cfg.accentL},${cfg.accentD})`}}/>
      <Corner color={cfg.accent} size={22}/><Corner color={cfg.accent} size={22} flip/>
      <div className="trophy-float" style={{fontSize:52,lineHeight:1,flexShrink:0,filter:`drop-shadow(0 0 18px rgba(${cfg.glow},0.6))`,position:'relative',zIndex:1}}>{badge.icon}</div>
      <div style={{flex:1,minWidth:0,position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6,flexWrap:'wrap'}}>
          <Pill rarity="legendary"/>
          {badge.xp_reward>0&&<span style={{fontSize:8.5,color:C.green,fontFamily:"'Raleway',sans-serif"}}>+{badge.xp_reward} XP</span>}
        </div>
        <h3 style={{fontFamily:"'Cinzel',serif",fontSize:16,fontWeight:700,color:C.cream,letterSpacing:'0.05em',margin:'0 0 6px',lineHeight:1.2}}><span className="shimmer-gold">{badge.name}</span></h3>
        <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:13,color:C.muted,margin:'0 0 10px',lineHeight:1.7,fontStyle:'italic',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{badge.description}</p>
        <div style={{display:'flex',alignItems:'center',gap:6,fontSize:10.5,fontFamily:"'Raleway',sans-serif",color:C.green}}><span>✓</span><span>{t.earnedLabel} — {fmtDate(unlockedAt,lang)}</span><span style={{color:C.dim,fontStyle:'italic'}}>({fmtRel(unlockedAt,lang)})</span></div>
      </div>
    </button>
  );
}

function EpicShowcase({badge,unlockedAt,lang,t,onClick}:{badge:Badge;unlockedAt:string;lang:Lang;t:T;onClick:()=>void}) {
  const cfg=R.epic;
  return(
    <button className="bc-epic" onClick={onClick} style={{gridColumn:'span 2',background:`linear-gradient(140deg,${C.panel} 0%,${C.panel2} 100%)`,border:`0.5px solid ${cfg.border}`,borderRadius:18,padding:'20px 22px',cursor:'pointer',textAlign:'left',display:'flex',alignItems:'center',gap:18,position:'relative',overflow:'hidden',width:'100%'}}>
      <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 15% 50%,${cfg.bgL} 0%,transparent 70%)`,pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:`linear-gradient(90deg,${cfg.accentD},${cfg.accentL},${cfg.accentD})`}}/>
      <Corner color={cfg.accent} size={18}/><Corner color={cfg.accent} size={18} flip/>
      <div style={{fontSize:40,lineHeight:1,flexShrink:0,filter:`drop-shadow(0 0 12px rgba(${cfg.glow},0.45))`,position:'relative',zIndex:1}}>{badge.icon}</div>
      <div style={{flex:1,minWidth:0,position:'relative',zIndex:1}}>
        <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:5}}><Pill rarity="epic"/>{badge.xp_reward>0&&<span style={{fontSize:8.5,color:C.green,fontFamily:"'Raleway',sans-serif"}}>+{badge.xp_reward} XP</span>}</div>
        <h3 style={{fontFamily:"'Cinzel',serif",fontSize:14,fontWeight:600,color:C.cream,margin:'0 0 5px',letterSpacing:'0.04em'}}><span className="shimmer-violet">{badge.name}</span></h3>
        <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:12,color:C.muted,margin:'0 0 8px',lineHeight:1.65,fontStyle:'italic',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{badge.description}</p>
        <div style={{fontSize:10,color:C.green,fontFamily:"'Raleway',sans-serif"}}>✓ {fmtRel(unlockedAt,lang)}</div>
      </div>
    </button>
  );
}

// ── SIDE PANEL ─────────────────────────────────────────────────────────
function SidePanel({empireData,sel,setSel,totalXP,unlocked,total,t}:{empireData:any[];sel:string;setSel:(v:string)=>void;totalXP:number;unlocked:number;total:number;t:T}) {
  return(
    <div style={{width:240,flexShrink:0,display:'flex',flexDirection:'column',gap:12}}>
      <div style={{background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:14,padding:'16px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:'10%',right:'10%',height:'1.5px',background:`linear-gradient(90deg,transparent,${C.gold}50,transparent)`}}/>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,opacity:0.68,marginBottom:12}}>{t.yourProgress}</div>
        {[{l:t.honoursEarned,v:`${unlocked} / ${total}`,c:C.gold},{l:t.totalXP,v:`${totalXP.toLocaleString()} XP`,c:C.green}].map(({l,v,c})=>(
          <div key={l} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}}>
            <span style={{fontSize:9.5,color:C.muted,fontFamily:"'Raleway',sans-serif"}}>{l}</span>
            <span style={{fontSize:11,color:c,fontFamily:"'Cinzel',serif",fontWeight:600}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:14,padding:'16px',flex:1}}>
        <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,opacity:0.68,marginBottom:12}}>{t.allEmpires}</div>
        <button onClick={()=>setSel('all')} style={{width:'100%',display:'flex',alignItems:'center',gap:10,background:sel==='all'?C.panel3:'transparent',border:sel==='all'?`0.5px solid ${C.rim}`:'0.5px solid transparent',borderRadius:9,padding:'9px 10px',cursor:'pointer',marginBottom:4,transition:'all 0.15s'}}>
          <span style={{fontSize:16}}>🌐</span>
          <span style={{flex:1,textAlign:'left',fontSize:10,color:sel==='all'?C.cream:C.muted,fontFamily:"'Raleway',sans-serif"}}>{t.allEmpires}</span>
          <span style={{fontSize:9,color:C.dim,fontFamily:"'Cinzel',serif"}}>{total}</span>
        </button>
        {empireData.map((emp:any)=>{
          const pct=emp.total>0?Math.round((emp.unlocked/emp.total)*100):0;
          const s=sel===emp.id;
          return(
            <button key={emp.id} onClick={()=>setSel(s?'all':emp.id)} style={{width:'100%',display:'flex',alignItems:'center',gap:9,background:s?emp.colorDim:'transparent',border:s?`0.5px solid ${emp.color}38`:'0.5px solid transparent',borderRadius:9,padding:'9px 10px',cursor:'pointer',marginBottom:3,transition:'all 0.15s'}}>
              <span style={{fontSize:14}}>{emp.flag}</span>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
                  <span style={{fontSize:9.5,color:s?C.cream2:C.muted,fontFamily:"'Raleway',sans-serif",fontWeight:s?600:400}}>{emp.label}</span>
                  <span style={{fontSize:9,color:pct===100?C.gold:C.dim,fontFamily:"'Cinzel',serif"}}>{pct}%</span>
                </div>
                <div style={{height:2,background:'rgba(255,255,255,0.06)',borderRadius:99,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${pct}%`,background:s?emp.color:'rgba(255,255,255,0.15)',borderRadius:99}}/>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── RECENT STRIP ───────────────────────────────────────────────────────
function RecentStrip({badges,unlMap,lang,t,onClick}:{badges:Badge[];unlMap:Record<string,string>;lang:Lang;t:T;onClick:(b:Badge)=>void}) {
  const recent=useMemo(()=>badges.filter(b=>unlMap[b.id]).sort((a,b)=>new Date(unlMap[b.id]).getTime()-new Date(unlMap[a.id]).getTime()).slice(0,10),[badges,unlMap]);
  if(!recent.length)return null;
  return(
    <section style={{marginBottom:'2.5rem'}}>
      <SecLabel sub={t.recentSub}>◈ {t.recentUnlocks}</SecLabel>
      <div className="hscroll" style={{display:'flex',gap:10,overflowX:'auto',paddingBottom:6}}>
        {recent.map((b,i)=>{const cfg=R[b.rarity as RarityKey];return(
          <button key={b.id} onClick={()=>onClick(b)} style={{flexShrink:0,width:115,background:C.panel2,border:`0.5px solid ${cfg.border}`,borderRadius:12,padding:'12px 10px',cursor:'pointer',textAlign:'center',position:'relative',overflow:'hidden',animation:`badge-rise-fast 0.3s ${i*0.06}s both`}}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:cfg.accent,opacity:0.55}}/>
            <div style={{fontSize:22,marginBottom:6}}>{b.icon}</div>
            <div style={{fontSize:9,fontFamily:"'Cinzel',serif",color:C.cream,lineHeight:1.3,marginBottom:4,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>{b.name}</div>
            <div style={{fontSize:8,color:C.dim,fontFamily:"'Raleway',sans-serif"}}>{fmtRel(unlMap[b.id],lang)}</div>
          </button>
        );})}
      </div>
    </section>
  );
}

// ── EMPIRE PANEL ───────────────────────────────────────────────────────
function EmpirePanel({empireData,t}:{empireData:any[];t:T}) {
  return(
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(170px,1fr))',gap:10}}>
      {empireData.map((emp:any)=>{const pct=emp.total>0?Math.round((emp.unlocked/emp.total)*100):0;const done=pct===100;return(
        <div key={emp.id} style={{background:C.panel2,border:`0.5px solid ${done?emp.color+'50':C.rim}`,borderRadius:14,padding:'16px',position:'relative',overflow:'hidden'}}>
          {done&&<div style={{position:'absolute',top:0,left:0,right:0,height:'2px',background:emp.color}}/>}
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
            <span style={{fontSize:22}}>{emp.flag}</span>
            <div><div style={{fontFamily:"'Cinzel',serif",fontSize:11,fontWeight:600,color:done?emp.color:C.cream2}}>{emp.label}</div><div style={{fontSize:9,color:C.dim,fontFamily:"'Raleway',sans-serif"}}>{emp.unlocked} / {emp.total} {t.badgesLabel}</div></div>
          </div>
          <Bar value={emp.unlocked} max={emp.total} color={emp.color} h={3}/>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:5,fontSize:9,fontFamily:"'Cinzel',serif"}}>
            <span style={{color:C.dim}}>{pct}{t.percentComplete}</span>
            {done&&<span style={{color:emp.color}}>✓ {t.mastered}</span>}
          </div>
        </div>
      );})}
    </div>
  );
}

// ── FILTER BAR ─────────────────────────────────────────────────────────
function FilterBar({searchQuery,setSearchQuery,catFilter,setCatFilter,rarityFilter,setRarityFilter,unlockedOnly,setUnlockedOnly,cloakedOnly,setCloakedOnly,resultCount,allBadges,t}:{
  searchQuery:string;setSearchQuery:(v:string)=>void;catFilter:string;setCatFilter:(v:string)=>void;
  rarityFilter:RarityKey|'all';setRarityFilter:(v:RarityKey|'all')=>void;
  unlockedOnly:boolean;setUnlockedOnly:(v:boolean)=>void;cloakedOnly:boolean;setCloakedOnly:(v:boolean)=>void;
  resultCount:number;allBadges:Badge[];t:T;
}) {
  const catCounts=useMemo(()=>{const m:Record<string,number>={};allBadges.forEach(b=>{m[b.category]=(m[b.category]??0)+1;});return m;},[allBadges]);
  const gl=(id:string)=>(t as Record<string,string>)[id]??id;
  const FPill=({active,onClick,children,ac,ab}:{active:boolean;onClick:()=>void;children:React.ReactNode;ac?:string;ab?:string})=>(
    <button className="fpill" onClick={onClick} style={{fontSize:10,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.06em',textTransform:'capitalize',padding:'5px 13px',borderRadius:99,whiteSpace:'nowrap',border:`0.5px solid ${active?(ac??C.gold)+'55':C.faint}`,background:active?(ab??`${ac??C.gold}11`):'transparent',color:active?(ac??C.gold):C.muted,cursor:'pointer'}}>{children}</button>
  );
  return(
    <div style={{background:`${C.panel}ec`,backdropFilter:'blur(14px)',border:`0.5px solid ${C.rim}`,borderRadius:16,padding:'16px 18px',marginBottom:'1.75rem',position:'relative',zIndex:2}}>
      <div style={{display:'flex',gap:10,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
        <div style={{position:'relative'}}>
          <span style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',fontSize:13,color:C.dim,pointerEvents:'none'}}>⌕</span>
          <input className="search-input" type="text" placeholder={t.searchPlaceholder} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} style={{background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:9,padding:'7px 14px 7px 28px',fontSize:11,color:C.cream,outline:'none',fontFamily:"'Raleway',sans-serif",width:175,letterSpacing:'0.04em',transition:'border-color 0.2s,box-shadow 0.2s'}}/>
        </div>
        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
          <FPill active={rarityFilter==='all'} onClick={()=>setRarityFilter('all')}>{t.allRarities}</FPill>
          {(['legendary','epic','rare','common'] as const).map(r=>(
            <FPill key={r} active={rarityFilter===r} onClick={()=>setRarityFilter(r)} ac={R[r].accent} ab={R[r].bgL}>
              {rarityFilter===r&&r==='legendary'?<span className="shimmer-gold">{t[r]}</span>:t[r]}
            </FPill>
          ))}
        </div>
        <div style={{display:'flex',gap:6,marginLeft:'auto'}}>
          <FPill active={unlockedOnly} onClick={()=>{setUnlockedOnly(!unlockedOnly);if(cloakedOnly)setCloakedOnly(false);}} ac={C.green} ab={C.greenDim}>✓ {t.earned}</FPill>
          <FPill active={cloakedOnly} onClick={()=>{setCloakedOnly(!cloakedOnly);if(unlockedOnly)setUnlockedOnly(false);}} ac={C.amber} ab="rgba(201,148,26,0.1)">🔒 {t.concealed}</FPill>
        </div>
      </div>
      <div className="hscroll" style={{display:'flex',gap:4,overflowX:'auto',paddingBottom:4}}>
        {[{id:'all',icon:'🌐'},...CATS].map(cat=>{
          const active=catFilter===cat.id;const count=cat.id==='all'?allBadges.length:(catCounts[cat.id]??0);
          if(cat.id!=='all'&&!count)return null;
          return(
            <button key={cat.id} onClick={()=>setCatFilter(cat.id)} style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'center',gap:3,padding:'10px 14px',background:active?C.panel3:'transparent',border:active?`0.5px solid ${C.rim}`:'0.5px solid transparent',borderRadius:10,cursor:'pointer',transition:'all 0.2s',minWidth:62,position:'relative'}}>
              {active&&<div style={{position:'absolute',bottom:0,left:'15%',right:'15%',height:'1.5px',background:C.gold,animation:'tab-underline 0.2s ease both'}}/>}
              <span style={{fontSize:16}}>{cat.icon}</span>
              <span style={{fontSize:9,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.07em',textTransform:'uppercase',color:active?C.cream:C.dim,fontWeight:active?600:400}}>{gl(cat.id)}</span>
              <span style={{fontSize:8,color:active?C.gold:C.faint,fontFamily:"'Cinzel',serif"}}>{count}</span>
            </button>
          );
        })}
      </div>
      <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'0.18em',textTransform:'uppercase',color:C.gold,opacity:0.55}}>{resultCount} {t.records}</span>
        <div style={{flex:1,height:'0.5px',background:C.faint}}/>
        {(searchQuery||catFilter!=='all'||rarityFilter!=='all'||unlockedOnly||cloakedOnly)&&(
          <button onClick={()=>{setSearchQuery('');setCatFilter('all');setRarityFilter('all');setUnlockedOnly(false);setCloakedOnly(false);}} style={{fontSize:9,color:C.dim,fontFamily:"'Raleway',sans-serif",background:'transparent',border:'none',cursor:'pointer',textDecoration:'underline'}}>{t.clearFilters}</button>
        )}
      </div>
    </div>
  );
}

// ── SKELETON + EMPTY ───────────────────────────────────────────────────
function Skeleton() {
  return(<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:10}}>{Array.from({length:18}).map((_,i)=><div key={i} style={{height:180,borderRadius:16,background:`linear-gradient(135deg,${C.panel} 0%,${C.panel2} 100%)`,opacity:0.22+(i%5)*0.08,animation:`badge-rise 0.4s ${i*0.03}s both`}}/>)}</div>);
}

function Empty({hasF,onClear,t}:{hasF:boolean;onClear:()=>void;t:T}) {
  return(<div style={{textAlign:'center',padding:'5rem 1rem'}}><div style={{fontSize:46,marginBottom:20,opacity:0.35}}>⚔</div><h3 style={{fontFamily:"'Cinzel',serif",fontSize:16,letterSpacing:'0.12em',color:C.dim,marginBottom:10}}>{t.noRecordsFound}</h3><p style={{fontFamily:"'Cormorant Garant',serif",fontSize:15,fontStyle:'italic',color:C.faint,marginBottom:20,lineHeight:1.7}}>{hasF?t.adjustFilters:t.archiveEmpty}</p>{hasF&&<button onClick={onClear} style={{background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:9,padding:'9px 24px',color:C.muted,fontSize:11,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.1em',textTransform:'uppercase',cursor:'pointer'}}>{t.clearFiltersBtn}</button>}</div>);
}

// ── HEADER ─────────────────────────────────────────────────────────────
function Header({unlockedCount,totalCount,globalPct,totalXP,lang,t}:{unlockedCount:number;totalCount:number;globalPct:number;totalXP:number;lang:Lang;t:T}) {
  return(
    <header style={{marginBottom:'2.5rem',position:'relative',zIndex:1}}>
      <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:22}}>
        <div style={{flex:1,height:'0.5px',background:`linear-gradient(90deg,transparent,${C.faint} 50%,${C.dim})`}}/>
        <span style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'0.26em',textTransform:'uppercase',color:C.gold,opacity:0.62}}>✦ {t.archiveLabel} ✦</span>
        <div style={{flex:1,height:'0.5px',background:`linear-gradient(90deg,${C.dim},${C.faint} 50%,transparent)`}}/>
      </div>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
        <div style={{flex:1,minWidth:200}}>
          <h1 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:38,fontWeight:700,margin:0,letterSpacing:'0.04em',lineHeight:1.05,color:C.cream}}>{t.pageTitle}</h1>
          <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:16,color:C.muted,fontStyle:'italic',margin:'8px 0 0',lineHeight:1.5}}>{t.pageSubtitle}</p>
          <div style={{marginTop:16,display:'flex',alignItems:'center',gap:12}}><MasteryChip pct={globalPct} t={t}/><div style={{fontSize:10,color:C.dim,fontFamily:"'Raleway',sans-serif"}}>{unlockedCount} {t.honoursEarned.toLowerCase()} / {totalCount}</div></div>
        </div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap',flexShrink:0}}>
          <StatCard value={unlockedCount} label={t.honoursEarned} icon="🏅" accent={C.gold}/>
          <StatCard value={`${globalPct}%`} label={t.complete} icon="📜" accent={C.gold}/>
          <StatCard value={totalXP.toLocaleString()} label={t.totalXP} icon="⚡" accent={C.green}/>
        </div>
      </div>
      <div style={{marginTop:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <span style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,opacity:0.72}}>{t.overallConquest}</span>
          <span style={{fontSize:11,color:C.gold,fontFamily:"'Cinzel',serif"}}>{unlockedCount}&thinsp;/&thinsp;{totalCount}</span>
        </div>
        <div style={{height:9,background:C.panel3,borderRadius:99,overflow:'hidden',boxShadow:'inset 0 2px 4px rgba(0,0,0,0.4)',position:'relative'}}>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.025) 50%,transparent 100%)',backgroundSize:'200% 100%',animation:'gradient-shift 4s ease infinite'}}/>
          <div style={{height:'100%',width:`${globalPct}%`,background:`linear-gradient(90deg,${C.goldD} 0%,${C.gold} 40%,${C.goldL} 55%,${C.gold} 70%,${C.goldD} 100%)`,backgroundSize:'200% 100%',animation:'bar-fill 1.6s cubic-bezier(0.4,0,0.2,1) both,gradient-shift 4s ease infinite 1.6s',borderRadius:99,boxShadow:`0 0 14px ${C.gold}42`,position:'relative',zIndex:1}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:5}}>{[0,25,50,75,100].map(m=><span key={m} style={{fontSize:8.5,color:globalPct>=m?C.goldD:C.faint,fontFamily:"'Cinzel',serif"}}>{m}%</span>)}</div>
      </div>
    </header>
  );
}

// ── MODAL ──────────────────────────────────────────────────────────────
function Modal({badge,isUnlocked,unlockedAt,progress,cloaked,lang,t,onClose}:{badge:Badge|null;isUnlocked:boolean;unlockedAt?:string;progress:number;cloaked:boolean;lang:Lang;t:T;onClose:()=>void}) {
  useEffect(()=>{const h=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose();};document.addEventListener('keydown',h);return()=>document.removeEventListener('keydown',h);},[onClose]);
  if(!badge)return null;
  const cfg=R[badge.rarity as RarityKey];
  const empire=EMPIRES.find(e=>e.id===badge.empire_id);
  const pct=badge.condition_value>0?Math.min(100,Math.round((progress/badge.condition_value)*100)):0;
  return(
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(6,4,2,0.9)',backdropFilter:'blur(10px)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:500,padding:20,animation:'overlay-in 0.22s ease'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:C.panel,border:`0.5px solid ${cfg.borderL}`,borderRadius:22,maxWidth:460,width:'100%',textAlign:'center',position:'relative',overflow:'hidden',animation:'modal-in 0.32s cubic-bezier(0.22,1.2,0.58,1)',boxShadow:`0 40px 100px rgba(0,0,0,0.75),0 0 0 1px ${cfg.border}`}}>
        <div style={{position:'absolute',inset:0,background:`radial-gradient(ellipse at 50% 0%,${cfg.bgL} 0%,transparent 55%)`,pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:0,left:0,right:0,height:'4px',background:`linear-gradient(90deg,transparent,${cfg.accentD} 20%,${cfg.accentL} 50%,${cfg.accentD} 80%,transparent)`}}/>
        <Corner color={cfg.accent} size={24}/><Corner color={cfg.accent} size={24} flip/>
        <div style={{padding:'38px 32px 32px',position:'relative',zIndex:1}}>
          <div style={{fontSize:72,lineHeight:1,marginBottom:20,filter:isUnlocked?`drop-shadow(0 0 22px rgba(${cfg.glow},0.65))`:cloaked?'grayscale(1) opacity(0.22)':'grayscale(0.85) brightness(0.48)'}}>{cloaked?'🔒':badge.icon}</div>
          <div style={{marginBottom:8,fontSize:10,color:cfg.accent,letterSpacing:1}}>{R[badge.rarity as RarityKey].star}</div>
          <h2 style={{fontFamily:"'Cinzel Decorative',serif",fontSize:20,fontWeight:700,letterSpacing:'0.05em',color:isUnlocked?C.cream:C.muted,margin:'0 0 4px',lineHeight:1.2}}>
            {cloaked?<span style={{color:'rgba(160,110,20,0.45)'}}>{t.sealedRecord}</span>:badge.rarity==='legendary'?<span className="shimmer-gold">{badge.name}</span>:badge.rarity==='epic'?<span className="shimmer-violet">{badge.name}</span>:badge.name}
          </h2>
          <p style={{fontFamily:"'Cormorant Garant',serif",fontSize:15.5,color:C.muted,margin:'14px 0 22px',lineHeight:1.8,fontStyle:'italic'}}>{cloaked?t.sealedDesc:(badge.description??'')}</p>
          <div style={{display:'flex',justifyContent:'center',gap:6,flexWrap:'wrap',marginBottom:24}}>
            <Pill rarity={badge.rarity as RarityKey}/>
            {!cloaked&&badge.category&&<span style={{fontSize:9,padding:'2.5px 10px',borderRadius:99,background:C.ghost,color:C.muted,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.1em',textTransform:'uppercase',border:`0.5px solid ${C.faint}`}}>{(t as Record<string,string>)[badge.category]??badge.category}</span>}
            {empire&&!cloaked&&<span style={{fontSize:9,padding:'2.5px 10px',borderRadius:99,background:empire.colorDim,color:empire.color,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.08em',textTransform:'uppercase',border:`0.5px solid ${empire.color}38`}}>{empire.flag}&nbsp;{empire.label}</span>}
            {badge.xp_reward>0&&!cloaked&&<span style={{fontSize:9,padding:'2.5px 10px',borderRadius:99,background:C.greenDim,color:C.green,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.08em',textTransform:'uppercase',border:'0.5px solid rgba(52,211,153,0.26)'}}>+{badge.xp_reward} XP</span>}
          </div>
          {!isUnlocked&&!cloaked&&badge.condition_value>0&&(
            <div style={{marginBottom:24,background:C.panel2,border:`0.5px solid ${C.rim}`,borderRadius:12,padding:'14px 16px',textAlign:'left'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                <span style={{fontSize:9,color:C.muted,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.12em',textTransform:'uppercase'}}>{t.progressToUnlock}</span>
                <span style={{fontSize:11,color:cfg.accent,fontFamily:"'Cinzel',serif"}}>{pct}%</span>
              </div>
              <div style={{height:6,background:C.bg,borderRadius:99,overflow:'hidden',marginBottom:6}}><div style={{height:'100%',width:`${pct}%`,background:`linear-gradient(90deg,${cfg.accentD},${cfg.accentL})`,borderRadius:99,animation:'bar-fill 1s ease both',boxShadow:`0 0 8px ${cfg.accent}45`}}/></div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:C.dim,fontFamily:"'Raleway',sans-serif"}}><span>{progress.toLocaleString()} {t.achieved}</span><span>{badge.condition_value.toLocaleString()} {t.required}</span></div>
            </div>
          )}
          {isUnlocked&&unlockedAt&&(
            <div style={{marginBottom:24,background:C.greenDim,border:'0.5px solid rgba(52,211,153,0.2)',borderRadius:12,padding:'12px 16px',display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:18}}>🏆</span>
              <div style={{textAlign:'left'}}><div style={{fontSize:11,color:C.green,fontFamily:"'Cinzel',serif",fontWeight:600,marginBottom:2}}>{t.honourBestowed}</div><div style={{fontSize:12,color:C.muted,fontFamily:"'Cormorant Garant',serif",fontStyle:'italic'}}>{fmtDate(unlockedAt,lang)} · {fmtRel(unlockedAt,lang)}</div></div>
            </div>
          )}
          <button className="close-btn" onClick={onClose} style={{background:'transparent',border:`0.5px solid ${C.rim}`,borderRadius:10,padding:'10px 42px',color:C.muted,fontSize:11,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.14em',textTransform:'uppercase',cursor:'pointer',transition:'all 0.18s'}}>{t.dismiss}</button>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ───────────────────────────────────────────────────────────────
interface UB{badge_id:string;unlocked_at:string;}
interface BP{badge_id:string;current_value:number;}

export default function Badges() {
  const {user, isAdmin}=useAuth();
  const navigate=useNavigate();

  const [lang,setLangState]=useState<Lang>(()=>{const s=localStorage.getItem('empire_ai_lang') as Lang|null;return s&&['en','sv','tr'].includes(s)?s:'en';});
  const t=TR[lang];
  const setLang=(l:Lang)=>{setLangState(l);localStorage.setItem('empire_ai_lang',l);};

  const [unlMap,setUnlMap]=useState<Record<string,string>>({});
  const [prgMap,setPrgMap]=useState<Record<string,number>>({});
  const [loading,setLoading]=useState(true);
  const [view,setView]=useState<'grid'|'empires'>('grid');
  const [empSel,setEmpSel]=useState('all');
  const [catFilter,setCatFilter]=useState('all');
  const [rarFilter,setRarFilter]=useState<RarityKey|'all'>('all');
  const [unlOnly,setUnlOnly]=useState(false);
  const [clkOnly,setClkOnly]=useState(false);
  const [search,setSearch]=useState('');
  const [modal,setModal]=useState<Badge|null>(null);
  const [modalClk,setModalClk]=useState(false);

  useEffect(()=>{injectCSS();},[]);

  useEffect(()=>{
    if(!user){setLoading(false);return;}
    Promise.all([
      supabase.from('user_badges').select('badge_id,unlocked_at').eq('user_id',user.id),
      supabase.from('badge_progress').select('badge_id,current_value').eq('user_id',user.id),
    ]).then(([{data:ub},{data:bp}])=>{
      const um:Record<string,string>={};(ub as UB[]??[]).forEach(r=>{um[r.badge_id]=r.unlocked_at;});setUnlMap(um);
      const pm:Record<string,number>={};(bp as BP[]??[]).forEach(r=>{pm[r.badge_id]=r.current_value;});setPrgMap(pm);
      setLoading(false);
    });
  },[user]);

  // Admin: auto-grant all badges
  useEffect(()=>{
    if(!user?.id||!isAdmin)return;
    grantAllBadgesToAdmin(user.id).then(()=>{
      // Reload unlocked map after granting
      supabase.from('user_badges').select('badge_id,unlocked_at').eq('user_id',user.id)
        .then(({data})=>{
          const um:Record<string,string>={};
          (data as UB[]??[]).forEach(r=>{um[r.badge_id]=r.unlocked_at;});
          setUnlMap(um);
        });
    });
  },[user?.id,isAdmin]);

  const openModal=useCallback((b:Badge,c:boolean)=>{setModal(b);setModalClk(c);},[]);
  const closeModal=useCallback(()=>{setModal(null);setModalClk(false);},[]);
  const clearF=useCallback(()=>{setSearch('');setCatFilter('all');setRarFilter('all');setUnlOnly(false);setClkOnly(false);},[]);

  const unlCount=Object.keys(unlMap).length;
  const total=BADGES.length;
  const pct=total>0?Math.round((unlCount/total)*100):0;
  const totalXP=useMemo(()=>BADGES.filter(b=>unlMap[b.id]&&b.xp_reward).reduce((s,b)=>s+b.xp_reward,0),[unlMap]);

  const empireData=useMemo(()=>EMPIRES.map(e=>({...e,total:BADGES.filter(b=>b.empire_id===e.id).length,unlocked:BADGES.filter(b=>b.empire_id===e.id&&unlMap[b.id]).length})),[unlMap]);

  const featured=useMemo(()=>BADGES.filter(b=>unlMap[b.id]&&(b.rarity==='legendary'||b.rarity==='epic')).sort((a,b)=>new Date(unlMap[b.id]).getTime()-new Date(unlMap[a.id]).getTime()).slice(0,6),[unlMap]);

  const grid=useMemo(()=>BADGES.filter(b=>{
    const u=!!unlMap[b.id],c=!u&&cloak(b.id,b.is_hidden??false);
    if(unlOnly&&!u)return false;if(clkOnly&&(!c||u))return false;
    if(empSel!=='all'&&b.empire_id!==empSel)return false;
    if(catFilter!=='all'&&b.category!==catFilter)return false;
    if(rarFilter!=='all'&&b.rarity!==rarFilter)return false;
    if(search){const q=search.toLowerCase();if(!b.name.toLowerCase().includes(q)&&!(b.description??'').toLowerCase().includes(q)&&!b.category.toLowerCase().includes(q))return false;}
    return true;
  }).sort((a,b)=>{
    const au=!!unlMap[a.id],bu=!!unlMap[b.id];if(au!==bu)return au?-1:1;
    const rd=(R[b.rarity as RarityKey]?.order??0)-(R[a.rarity as RarityKey]?.order??0);if(rd!==0)return rd;
    return a.name.localeCompare(b.name);
  }),[unlMap,unlOnly,clkOnly,empSel,catFilter,rarFilter,search]);

  const hasF=search!==''||catFilter!=='all'||rarFilter!=='all'||unlOnly||clkOnly;

  return(
    <div className="main-scroll" style={{minHeight:'100vh',background:C.bg,paddingBottom:'80px',fontFamily:"'Raleway',sans-serif",color:C.cream,position:'relative'}}>
      <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:0,background:'radial-gradient(ellipse at 20% 15%,rgba(212,175,55,0.03) 0%,transparent 45%),radial-gradient(ellipse at 80% 85%,rgba(130,80,10,0.025) 0%,transparent 45%)'}}/>

      <NavBar lang={lang} setLang={setLang} t={t}/>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'2.5rem 1.5rem 6rem',position:'relative',zIndex:1}}>
        <Header unlockedCount={unlCount} totalCount={total} globalPct={pct} totalXP={totalXP} lang={lang} t={t}/>

        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:'2rem'}}>
          {[{k:'grid',i:'⊞',l:t.badgeGrid},{k:'empires',i:'🌍',l:t.empireView}].map(v=>(
            <button key={v.k} onClick={()=>setView(v.k as any)} style={{display:'flex',alignItems:'center',gap:6,padding:'8px 18px',borderRadius:9,background:view===v.k?C.panel3:'transparent',border:view===v.k?`0.5px solid ${C.rim}`:'0.5px solid transparent',color:view===v.k?C.cream:C.muted,fontSize:10.5,fontFamily:"'Raleway',sans-serif",letterSpacing:'0.05em',cursor:'pointer',transition:'all 0.2s'}}>
              <span>{v.i}</span><span>{v.l}</span>
            </button>
          ))}
        </div>

        <Divider symbol="✦" opacity={0.22}/>

        {view==='empires'?(
          <section><SecLabel sub={t.empireSub}>◈ {t.empireBreakdown}</SecLabel><EmpirePanel empireData={empireData} t={t}/></section>
        ):(
          <div style={{display:'flex',gap:20,alignItems:'flex-start'}}>
            <SidePanel empireData={empireData} sel={empSel} setSel={setEmpSel} totalXP={totalXP} unlocked={unlCount} total={total} t={t}/>
            <div style={{flex:1,minWidth:0}}>
              <RecentStrip badges={BADGES} unlMap={unlMap} lang={lang} t={t} onClick={b=>openModal(b,false)}/>
              {featured.length>0&&!hasF&&(
                <section style={{marginBottom:'2.5rem'}}>
                  <SecLabel sub={t.distinguishedSub}>◈ {t.distinguishedHonours}</SecLabel>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
                    {featured.map(b=>b.rarity==='legendary'?<LegendaryShowcase key={b.id} badge={b} unlockedAt={unlMap[b.id]} lang={lang} t={t} onClick={()=>openModal(b,false)}/>:<EpicShowcase key={b.id} badge={b} unlockedAt={unlMap[b.id]} lang={lang} t={t} onClick={()=>openModal(b,false)}/>)}
                  </div>
                </section>
              )}
              <Divider symbol="⚜" opacity={0.18}/>
              <FilterBar searchQuery={search} setSearchQuery={setSearch} catFilter={catFilter} setCatFilter={setCatFilter} rarityFilter={rarFilter} setRarityFilter={setRarFilter} unlockedOnly={unlOnly} setUnlockedOnly={setUnlOnly} cloakedOnly={clkOnly} setCloakedOnly={setClkOnly} resultCount={grid.length} allBadges={BADGES} t={t}/>
              {loading?<Skeleton/>:grid.length===0?<Empty hasF={hasF} onClear={clearF} t={t}/>:(
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(155px,1fr))',gap:10}}>
                  {grid.map((badge,i)=>{
                    const u=!!unlMap[badge.id],prog=prgMap[badge.id]??0;
                    const c=!u&&cloak(badge.id,badge.is_hidden??false);
                    const delay=Math.min(i*0.022,0.5);
                    if(u&&badge.rarity==='legendary'&&!clkOnly)return(<div key={badge.id} style={{gridColumn:'span 2'}}><LegendaryShowcase badge={badge} unlockedAt={unlMap[badge.id]} lang={lang} t={t} onClick={()=>openModal(badge,false)}/></div>);
                    if(c)return(<CloakedCard key={badge.id} badgeId={badge.id} delay={delay} t={t} onClick={()=>openModal(badge,true)}/>);
                    return(<BadgeCard key={badge.id} badge={badge} unlocked={u} progress={prog} delay={delay} onClick={()=>openModal(badge,false)}/>);
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        <footer style={{marginTop:'4rem',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:16}}>
            <div style={{width:80,height:'0.5px',background:C.faint}}/>
            <div style={{textAlign:'center'}}>
              <div style={{fontFamily:"'Cinzel Decorative',serif",fontSize:9.5,letterSpacing:'0.3em',textTransform:'uppercase',color:C.gold,opacity:0.28}}>{t.finisCoronat}</div>
              <div style={{fontFamily:"'Cormorant Garant',serif",fontSize:11,color:C.faint,fontStyle:'italic',marginTop:3}}>{t.finisLatina}</div>
            </div>
            <div style={{width:80,height:'0.5px',background:C.faint}}/>
          </div>
        </footer>
      </div>

      <Modal badge={modal} isUnlocked={modal?!!unlMap[modal.id]:false} unlockedAt={modal?unlMap[modal.id]:undefined} progress={modal?(prgMap[modal.id]??0):0} cloaked={modalClk} lang={lang} t={t} onClose={closeModal}/>
    </div>
  );
}
