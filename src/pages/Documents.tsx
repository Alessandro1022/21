// src/pages/Documents.tsx — IMPERIAL ARCHIVE v3.0 ✦ SOVEREIGN EDITION
// ══════════════════════════════════════════════════════════════════════
// ✔ 2500+ lines of production code
// ✔ Admin-only review panel — COMPLETELY invisible to non-admins
// ✔ Image (JPG/PNG/WEBP/GIF) + PDF upload with preview, drag-drop & lightbox
// ✔ Reject with reason modal
// ✔ Admin sub-tabs: Pending / All Documents (with delete)
// ✔ 9 EXACT empires: ottoman, roman, islamic_caliphate, mongol_empire,
//   ancient_egypt, british_empire, japanese_empire, mali_empire, seljuk_empire
// ✔ Illuminated manuscript luxury aesthetic
// ✔ Mobile-first, full i18n sv/en/tr
// ✔ Sort: newest/oldest/alpha · Empire filter pills · Search
// ✔ Supabase Storage for file attachments
// ══════════════════════════════════════════════════════════════════════

import { useState, useEffect, useCallback, useRef, memo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import {
  Send, FolderOpen, Crown, Clock, CheckCircle, XCircle,
  Search, ChevronDown, Plus, Scroll, Feather, Library,
  AlertCircle, Globe, FileText, Calendar, User, Shield,
  ChevronRight, Paperclip, X, Download, ZoomIn,
  MessageSquare, Trash2, Eye, Filter, BookOpen,
} from "lucide-react";

// ══════════════════════════════════════════════════════════════════════
// TYPES
// ══════════════════════════════════════════════════════════════════════

type DocStatus  = "pending" | "approved" | "rejected";
type TabId      = "explore" | "submit" | "mine" | "admin";
type FileKind   = "image" | "pdf" | "none";
type SortOrder  = "newest" | "oldest" | "alpha";
type AdminSubTab = "pending" | "all";

interface AttachedFile {
  file:      File;
  preview:   string;    // object URL for images
  kind:      FileKind;
  sizeLabel: string;
  uploading: boolean;
  url?:      string;    // public Supabase URL after upload
  error?:    string;
}

interface EmpireDoc {
  id:                string;
  title:             string;
  content:           string;
  empire_id:         string;
  status:            DocStatus;
  user_id:           string;
  author_name?:      string;
  created_at:        string;
  reviewed_at?:      string;
  rejection_reason?: string;
  file_url?:         string;
  file_type?:        FileKind;
  file_name?:        string;
}

// ══════════════════════════════════════════════════════════════════════
// CONSTANTS — 9 EXACT EMPIRES (matching original codebase)
// ══════════════════════════════════════════════════════════════════════

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman Empire",    flag: "🕌", color: "#C8A96E" },
  { id: "roman",             label: "Roman Empire",      flag: "🏛️", color: "#D4AF37" },
  { id: "islamic_caliphate", label: "Islamic Caliphate", flag: "☪️", color: "#1D9E75" },
  { id: "mongol_empire",     label: "Mongol Empire",     flag: "⚔️", color: "#D85A30" },
  { id: "ancient_egypt",     label: "Ancient Egypt",     flag: "𓂀", color: "#E8A030" },
  { id: "british_empire",    label: "British Empire",    flag: "👑", color: "#378ADD" },
  { id: "japanese_empire",   label: "Japanese Empire",   flag: "⛩️", color: "#D4537E" },
  { id: "mali_empire",       label: "Mali Empire",       flag: "🌍", color: "#639922" },
  { id: "seljuk_empire",     label: "Seljuk Empire",     flag: "🗡️", color: "#BA7517" },
] as const;

type EmpireId = typeof ALL_EMPIRES[number]["id"] | string;

const empireInfo = (id: string) =>
  ALL_EMPIRES.find(e => e.id === id) ?? { id, label: id, flag: "🏛️", color: "#D4AF37" };

// ──────────────────────────────────────────────────────────────────────

const STATUS_CFG: Record<DocStatus, {
  labelMap: Record<string, string>;
  color: string; bg: string; border: string;
  Icon: any;
}> = {
  pending: {
    labelMap: { en: "Pending Review", sv: "Väntar på granskning", tr: "İnceleme Bekliyor" },
    color: "#E8A030", bg: "rgba(232,160,48,0.11)", border: "rgba(232,160,48,0.3)",
    Icon: Clock,
  },
  approved: {
    labelMap: { en: "Approved", sv: "Godkänd", tr: "Onaylandı" },
    color: "#1D9E75", bg: "rgba(29,158,117,0.11)", border: "rgba(29,158,117,0.3)",
    Icon: CheckCircle,
  },
  rejected: {
    labelMap: { en: "Rejected", sv: "Nekad", tr: "Reddedildi" },
    color: "#D85A30", bg: "rgba(216,90,48,0.11)", border: "rgba(216,90,48,0.3)",
    Icon: XCircle,
  },
};

// ──────────────────────────────────────────────────────────────────────

const MAX_FILE_MB    = 10;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const ACCEPT_TYPES   = "image/jpeg,image/png,image/webp,image/gif,application/pdf";

// ══════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ══════════════════════════════════════════════════════════════════════

const LANG = {
  sv: {
    heroTitle: "Det Kejserliga Arkivet",
    heroSub: "Dokumenterat av Gemenskapen",
    heroDesc: "En levande samling av historisk kunskap, skapad av historiker och entusiaster världen över.",
    statApproved: "Godkända", statEmpires: "Imperier", statContribs: "Bidragsgivare",
    // tabs
    explore: "Utforska", submit: "Bidra", mine: "Mina Dokument", adminTab: "Admin-granskning",
    // explore
    search: "Sök i arkivet...", allEmpires: "Alla Imperier",
    noApproved: "Inga godkända dokument ännu.",
    noApprovedSub: "Var den första att bidra med historisk kunskap!",
    sortNewest: "Nyast", sortOldest: "Äldst", sortAlpha: "A–Ö",
    resultsFor: "resultat för",
    // submit
    submitTitle: "Bidra med ett Dokument",
    submitSub: "Dela din historiska kunskap med gemenskapen",
    fieldTitle: "DOKUMENTETS TITEL",
    titlePlaceholder: "Ex: Osmanska rikets handelssystem...",
    fieldEmpire: "IMPERIUM",
    empirePrompt: "— Välj ett imperium —",
    fieldContent: "INNEHÅLL",
    contentPlaceholder: "Skriv ditt historiska dokument här (minst 100 tecken)...",
    fieldFile: "BIFOGA BEVIS (VALFRITT)",
    fileDesc: "Ladda upp en bild eller PDF som bevis eller källa. Max 10 MB.",
    submitBtn: "Skicka in Dokument", submitting: "Skickar...",
    submitOk: "Dokument inskickat!",
    submitOkSub: "Ditt dokument väntar på granskning av moderatorer.",
    loginRequired: "Logga in för att bidra",
    loginRequiredSub: "Skapa ett konto eller logga in för att bidra.",
    guidelines: "Riktlinjer:",
    guidelinesText: "Bidra med originalt, faktabaserat historiskt innehåll. Inga direkta kopior. Dokument granskas av moderatorer innan publicering.",
    // my docs
    myDocs: "Mina Inskickade Dokument",
    noMyDocs: "Du har inte skickat in några dokument än.",
    noMyDocsSub: "Klicka på 'Nytt Dokument' för att börja bidra.",
    newDoc: "Nytt Dokument",
    loginToSee: "Logga in för att se dina dokument",
    // admin
    adminTitle: "Admin — Väntande Granskning",
    adminSubtitle: "dokument väntar på granskning",
    noAdmin: "Alla dokument är granskade!",
    noAdminSub: "Bra jobbat — inga väntande bidrag.",
    approve: "Godkänn", reject: "Neka",
    rejectModalTitle: "Ange avslagsorsak",
    rejectPlaceholder: "Berätta varför dokumentet nekas...",
    rejectBtn: "Bekräfta Avslag", cancelBtn: "Avbryt",
    tabPending: "Väntande", tabAll: "Alla Dokument",
    deleteDoc: "Radera",
    confirmDelete: "Radera detta dokument permanent?",
    // card
    readMore: "Läs mer", collapse: "Minimera",
    viewAttachment: "Visa bilaga",
    writtenBy: "Skrivet av",
    // file
    chars: "tecken", minChars: "Minst 100 tecken krävs",
    titleRequired: "Titel krävs", empireRequired: "Välj ett imperium",
    fileTooLarge: `Filen är för stor. Max ${MAX_FILE_MB}MB.`,
    fileRemove: "Ta bort",
    fileUnsupported: "Filtyp stöds ej. Använd JPG, PNG, WEBP, GIF eller PDF.",
    dragDrop: "Dra & släpp eller klicka för att ladda upp",
    dragActive: "Släpp filen här",
  },
  en: {
    heroTitle: "The Imperial Archive",
    heroSub: "Documented by the Community",
    heroDesc: "A living collection of historical knowledge, created by historians and enthusiasts across the world.",
    statApproved: "Approved", statEmpires: "Empires", statContribs: "Contributors",
    explore: "Explore", submit: "Contribute", mine: "My Documents", adminTab: "Admin Review",
    search: "Search the archive...", allEmpires: "All Empires",
    noApproved: "No approved documents yet.",
    noApprovedSub: "Be the first to contribute historical knowledge!",
    sortNewest: "Newest", sortOldest: "Oldest", sortAlpha: "A–Z",
    resultsFor: "results for",
    submitTitle: "Contribute a Document",
    submitSub: "Share your historical knowledge with the community",
    fieldTitle: "DOCUMENT TITLE",
    titlePlaceholder: "E.g. The Ottoman trade system...",
    fieldEmpire: "EMPIRE",
    empirePrompt: "— Select an empire —",
    fieldContent: "CONTENT",
    contentPlaceholder: "Write your historical document here (minimum 100 characters)...",
    fieldFile: "ATTACH EVIDENCE (OPTIONAL)",
    fileDesc: "Upload an image or PDF as evidence or source material. Max 10 MB.",
    submitBtn: "Submit Document", submitting: "Submitting...",
    submitOk: "Document submitted!",
    submitOkSub: "Your document is awaiting review by moderators.",
    loginRequired: "Sign in to contribute",
    loginRequiredSub: "Create an account or sign in to submit your document.",
    guidelines: "Guidelines:",
    guidelinesText: "Contribute original, factual historical content. No direct copies. Documents are reviewed by moderators before publication.",
    myDocs: "My Submitted Documents",
    noMyDocs: "You haven't submitted any documents yet.",
    noMyDocsSub: "Click 'New Document' to start contributing.",
    newDoc: "New Document",
    loginToSee: "Sign in to see your documents",
    adminTitle: "Admin — Pending Review",
    adminSubtitle: "documents awaiting review",
    noAdmin: "All documents reviewed!",
    noAdminSub: "Great work — no pending contributions.",
    approve: "Approve", reject: "Reject",
    rejectModalTitle: "Enter rejection reason",
    rejectPlaceholder: "Explain why this document is being rejected...",
    rejectBtn: "Confirm Rejection", cancelBtn: "Cancel",
    tabPending: "Pending", tabAll: "All Documents",
    deleteDoc: "Delete",
    confirmDelete: "Permanently delete this document?",
    readMore: "Read more", collapse: "Collapse",
    viewAttachment: "View attachment",
    writtenBy: "Written by",
    chars: "characters", minChars: "Minimum 100 characters required",
    titleRequired: "Title required", empireRequired: "Select an empire",
    fileTooLarge: `File too large. Max ${MAX_FILE_MB}MB.`,
    fileRemove: "Remove",
    fileUnsupported: "Unsupported file type. Use JPG, PNG, WEBP, GIF or PDF.",
    dragDrop: "Drag & drop or click to upload",
    dragActive: "Drop the file here",
  },
  tr: {
    heroTitle: "İmparatorluk Arşivi",
    heroSub: "Topluluk Tarafından Belgelenmiş",
    heroDesc: "Dünya genelinde tarihçi ve meraklılar tarafından oluşturulan canlı bir tarihsel bilgi koleksiyonu.",
    statApproved: "Onaylı", statEmpires: "İmparatorluk", statContribs: "Katkıda Bulunan",
    explore: "Keşfet", submit: "Katkıda Bulun", mine: "Belgelerim", adminTab: "Admin İncelemesi",
    search: "Arşivde ara...", allEmpires: "Tüm İmparatorluklar",
    noApproved: "Henüz onaylı belge yok.",
    noApprovedSub: "Tarihsel bilgi katkısında ilk sen ol!",
    sortNewest: "En Yeni", sortOldest: "En Eski", sortAlpha: "A–Z",
    resultsFor: "sonuç için",
    submitTitle: "Belge Katkısı",
    submitSub: "Tarihsel bilginizi toplulukla paylaşın",
    fieldTitle: "BELGE BAŞLIĞI",
    titlePlaceholder: "Örn: Osmanlı ticaret sistemi...",
    fieldEmpire: "İMPARATORLUK",
    empirePrompt: "— Bir imparatorluk seçin —",
    fieldContent: "İÇERİK",
    contentPlaceholder: "Tarihsel belgenizi buraya yazın (en az 100 karakter)...",
    fieldFile: "KANIT EKLE (İSTEĞE BAĞLI)",
    fileDesc: "Kanıt veya kaynak olarak bir görsel veya PDF yükleyin. Maks 10 MB.",
    submitBtn: "Belgeyi Gönder", submitting: "Gönderiliyor...",
    submitOk: "Belge gönderildi!",
    submitOkSub: "Belgeniz moderatörler tarafından incelenmek üzere bekliyor.",
    loginRequired: "Katkıda bulunmak için giriş yapın",
    loginRequiredSub: "Belgenizi göndermek için hesap oluşturun veya giriş yapın.",
    guidelines: "Kurallar:",
    guidelinesText: "Özgün, gerçeğe dayalı tarihsel içerik katkısında bulunun. Doğrudan kopyalar kabul edilmez. Belgeler yayınlanmadan önce incelenir.",
    myDocs: "Gönderilen Belgelerim",
    noMyDocs: "Henüz belge göndermediniz.",
    noMyDocsSub: "Katkıda bulunmaya başlamak için 'Yeni Belge'ye tıklayın.",
    newDoc: "Yeni Belge",
    loginToSee: "Belgelerinizi görmek için giriş yapın",
    adminTitle: "Admin — İnceleme Bekliyor",
    adminSubtitle: "belge inceleme bekliyor",
    noAdmin: "Tüm belgeler incelendi!",
    noAdminSub: "Harika iş — bekleyen katkı yok.",
    approve: "Onayla", reject: "Reddet",
    rejectModalTitle: "Red gerekçesi girin",
    rejectPlaceholder: "Bu belgenin neden reddedildiğini açıklayın...",
    rejectBtn: "Reddi Onayla", cancelBtn: "İptal",
    tabPending: "Bekleyen", tabAll: "Tüm Belgeler",
    deleteDoc: "Sil",
    confirmDelete: "Bu belgeyi kalıcı olarak sil?",
    readMore: "Devamını oku", collapse: "Daralt",
    viewAttachment: "Eki görüntüle",
    writtenBy: "Yazan",
    chars: "karakter", minChars: "En az 100 karakter gerekli",
    titleRequired: "Başlık gerekli", empireRequired: "Bir imparatorluk seçin",
    fileTooLarge: `Dosya çok büyük. Maks ${MAX_FILE_MB}MB.`,
    fileRemove: "Kaldır",
    fileUnsupported: "Desteklenmeyen dosya türü. JPG, PNG, WEBP, GIF veya PDF kullanın.",
    dragDrop: "Sürükle & bırak veya yüklemek için tıkla",
    dragActive: "Dosyayı buraya bırak",
  },
} as const;

type T = typeof LANG["en"];

// ══════════════════════════════════════════════════════════════════════
// MOCK DATA (fallback when Supabase table is not yet ready)
// ══════════════════════════════════════════════════════════════════════

const MOCK_APPROVED: EmpireDoc[] = [
  {
    id: "mock_1",
    title: "The Ottoman Devshirme System and Its Legacy",
    content: "The devshirme system, often called 'blood tax', was a practice of the Ottoman Empire in which boys from Christian families were taken to be trained as Ottoman soldiers and administrators. This complex institution shaped the empire for centuries, creating some of its greatest leaders including Suleiman the Magnificent's Grand Vizier Ibrahim Pasha.\n\nThe system was both a mechanism of control and an unexpected ladder of social mobility, transforming rural Christian boys into the empire's elite Janissary corps and bureaucratic class. The long-term consequences of this system reverberate through Balkan history, Ottoman administrative culture, and questions of identity and belonging that scholars continue to debate today.",
    empire_id: "ottoman", status: "approved", user_id: "u1",
    author_name: "A. Kowalski", created_at: "2025-03-15T10:30:00Z",
  },
  {
    id: "mock_2",
    title: "Roman Engineering: The Aqueduct as Political Symbol",
    content: "Roman aqueducts were more than feats of engineering — they were declarations of imperial power made tangible in stone and water. When Rome brought fresh water to a conquered city, it was simultaneously demonstrating technological superiority and asserting permanent dominion.\n\nThe 11 aqueducts serving Rome at the height of the empire delivered approximately 1.2 million cubic meters of water per day, transforming public bathing, sanitation, and urban life. Recent archaeological studies have revealed sophisticated maintenance networks that kept these systems operational for centuries. The Aqua Virgo, built by Agrippa in 19 BCE, still feeds the Trevi Fountain today — a continuity of function spanning two millennia.",
    empire_id: "roman", status: "approved", user_id: "u2",
    author_name: "M. Bernhardt", created_at: "2025-02-28T14:20:00Z",
  },
  {
    id: "mock_3",
    title: "The House of Wisdom: Translating the Ancient World",
    content: "The Bayt al-Hikmah in ninth-century Baghdad was not merely a library but a vast translation project that saved classical knowledge from oblivion. Under Caliph al-Ma'mun, scholars translated Greek, Persian, Indian, and Syriac texts into Arabic, creating a synthesis of world knowledge unprecedented in history.\n\nThe mathematician Al-Khwarizmi worked here, developing the algebra that still bears Arabic's imprint in its very name. Physicians like Hunayn ibn Ishaq translated Galen and produced original medical treatises. This accumulated knowledge would later flow back to Europe through Toledo and Palermo, seeding the European Renaissance.",
    empire_id: "islamic_caliphate", status: "approved", user_id: "u3",
    author_name: "F. Al-Rashid", created_at: "2025-04-01T09:15:00Z",
  },
  {
    id: "mock_4",
    title: "Mansa Musa's Pilgrimage: The Gold That Shocked the World",
    content: "In 1324–1325, Mansa Musa of the Mali Empire undertook a hajj to Mecca with a caravan of staggering wealth — reportedly 60,000 men and 80 to 100 camels each laden with 135 kilograms of gold dust. His passage through Cairo was so extravagant that he distributed gold freely, causing catastrophic inflation in Egypt that persisted for over a decade.\n\nThis single journey placed Mali on European maps for the first time, with cartographers depicting Mansa Musa seated on a golden throne. It remains one of history's most consequential and dramatic displays of imperial wealth and soft power.",
    empire_id: "mali_empire", status: "approved", user_id: "u4",
    author_name: "K. Diallo", created_at: "2025-04-10T11:00:00Z",
  },
  {
    id: "mock_5",
    title: "The Mongol Yam: Postal Network of an Empire",
    content: "The Mongol yam system was one of history's most sophisticated communications networks, enabling messages and intelligence to travel thousands of kilometers in days rather than weeks. Post stations were established every 25 to 35 kilometers across the vast empire, each stocked with fresh horses and provisions for riders.\n\nMongol dispatch riders could cover up to 300 kilometers per day using relay stations. This infrastructure underpinned Kublai Khan's administration of China, enabled Marco Polo's famous travels, and gave Mongol military commanders a strategic advantage in coordination that no rival could match.",
    empire_id: "mongol_empire", status: "approved", user_id: "u5",
    author_name: "B. Gantulga", created_at: "2025-03-22T08:45:00Z",
  },
  {
    id: "mock_6",
    title: "Ancient Egyptian Papyrus: The World's First Document Network",
    content: "The ancient Egyptians developed papyrus as a writing medium around 3,000 BCE, creating the world's first widespread document culture. Papyrus production became a state industry, with the Delta region supplying sheets that enabled everything from royal decrees and administrative records to private letters and religious texts.\n\nThe Edwin Smith Papyrus, dating to around 1600 BCE, contains the world's earliest known rational medical observations, describing 48 surgical cases with a systematic approach that anticipates modern medicine by over three thousand years.",
    empire_id: "ancient_egypt", status: "approved", user_id: "u6",
    author_name: "N. Hassan", created_at: "2025-03-05T16:20:00Z",
  },
  {
    id: "mock_7",
    title: "The Seljuk Caravanserai Network and Islamic Trade",
    content: "The Seljuk Empire built one of the ancient world's most sophisticated hospitality and trade infrastructure systems — the caravanserai network. These fortified roadside inns were constructed at regular intervals of approximately 30-40 kilometers across Anatolia and Central Asia, providing shelter, food, water, and security to merchants, pilgrims, and diplomats free of charge for three days.\n\nAt their peak, over 3,000 caravanserais dotted the Silk Road routes under Seljuk influence. This remarkable public works program transformed trans-Asian commerce and cemented the Seljuks' role as facilitators of one of history's great trading civilizations.",
    empire_id: "seljuk_empire", status: "approved", user_id: "u7",
    author_name: "O. Yildirim", created_at: "2025-02-14T10:00:00Z",
  },
  {
    id: "mock_8",
    title: "The British East India Company: Corporation as Empire",
    content: "The British East India Company — founded by royal charter in 1600 — became one of history's most extraordinary political entities: a trading company that raised armies, coined money, administered justice, and eventually governed over 200 million people across the Indian subcontinent.\n\nAt its zenith, the Company's private army outnumbered the British Army itself. The transition from merchant venture to colonial administration represents a unique chapter in world history, raising enduring questions about the relationship between commerce, governance, and empire that remain relevant today.",
    empire_id: "british_empire", status: "approved", user_id: "u8",
    author_name: "J. Pemberton", created_at: "2025-01-28T13:30:00Z",
  },
  {
    id: "mock_9",
    title: "Bushido and the Samurai Code in the Japanese Empire",
    content: "Bushido — 'the way of the warrior' — was the informal ethical code governing samurai behavior that evolved over centuries of Japanese feudal history. While often romanticized in later periods, its core tenets of loyalty, honor, martial skill, and acceptance of death shaped Japanese military culture profoundly through the feudal era and into the imperial period.\n\nThe Hagakure, compiled in the early 18th century from the teachings of samurai Yamamoto Tsunetomo, became one of bushido's most celebrated articulations: 'The way of the samurai is found in death.' This philosophy influenced Japanese military strategy, governance, and cultural identity for centuries.",
    empire_id: "japanese_empire", status: "approved", user_id: "u9",
    author_name: "H. Tanaka", created_at: "2025-03-01T07:00:00Z",
  },
];

// ══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ══════════════════════════════════════════════════════════════════════

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

function detectFileKind(file: File): FileKind {
  if (file.type === "application/pdf") return "pdf";
  if (file.type.startsWith("image/")) return "image";
  return "none";
}

function formatDate(iso: string, lang: string): string {
  return new Date(iso).toLocaleDateString(
    lang === "sv" ? "sv-SE" : lang === "tr" ? "tr-TR" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

// ══════════════════════════════════════════════════════════════════════
// GLOBAL CSS
// ══════════════════════════════════════════════════════════════════════

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Cinzel:wght@400;500;600;700&family=Raleway:wght@300;400;500;600&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

/* ── Keyframes ── */
@keyframes arc-spin       { to { transform: rotate(360deg); } }
@keyframes arc-fadeup     { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes arc-shimmer    { 0%,100%{opacity:.4} 50%{opacity:.85} }
@keyframes arc-glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(212,175,55,.1)} 50%{box-shadow:0 0 52px rgba(212,175,55,.28)} }
@keyframes arc-flicker    { 0%,100%{opacity:1} 48%{opacity:.93} 50%{opacity:.86} 52%{opacity:.96} }
@keyframes arc-orbit      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes arc-pulse-out  { 0%{transform:scale(1);opacity:.4} 100%{transform:scale(2);opacity:0} }
@keyframes arc-modal-in   { from{opacity:0;transform:scale(.93) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes arc-lbox-in    { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
@keyframes arc-card-in    { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes arc-badge-pop  { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(212,175,55,.22); border-radius: 2px; }

/* ── Document card ── */
.arc-doc-card {
  animation: arc-card-in .5s ease both;
  transition: transform .32s ease, border-color .32s ease, box-shadow .32s ease;
  position: relative;
}
.arc-doc-card:hover {
  transform: translateY(-5px) scale(1.005);
  border-color: rgba(212,175,55,.42) !important;
  box-shadow: 0 28px 70px rgba(0,0,0,.58), 0 0 36px rgba(212,175,55,.1) !important;
}

/* ── Form input ── */
.arc-input {
  background: rgba(10,6,2,.78);
  border: 1px solid rgba(212,175,55,.2);
  border-radius: 14px;
  color: #EDE0C4;
  font-family: 'Raleway', sans-serif;
  font-size: .875rem;
  width: 100%;
  outline: none;
  transition: border-color .25s, box-shadow .25s;
}
.arc-input:focus {
  border-color: rgba(212,175,55,.52);
  box-shadow: 0 0 0 3px rgba(212,175,55,.09), 0 0 18px rgba(212,175,55,.07);
}
.arc-input::placeholder { color: rgba(237,224,196,.2); }
.arc-input option { background: #0c0802; color: #EDE0C4; }

/* ── Tab button ── */
.arc-tab {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 16px; border-radius: 12px;
  font-family: 'Cinzel', serif; font-size: .7rem;
  letter-spacing: .1em; transition: all .22s;
  white-space: nowrap; border: 1px solid transparent;
  cursor: pointer; background: transparent; color: rgba(237,224,196,.4);
}
.arc-tab:hover { color: rgba(237,224,196,.72); background: rgba(212,175,55,.06); }
.arc-tab.active {
  background: linear-gradient(135deg,rgba(212,175,55,.16),rgba(184,144,30,.1));
  border-color: rgba(212,175,55,.38); color: #D4AF37;
  box-shadow: 0 0 18px rgba(212,175,55,.1);
}
.arc-tab.arc-admin-tab { color: rgba(192,132,252,.45); }
.arc-tab.arc-admin-tab:hover { color: rgba(192,132,252,.75); background: rgba(168,85,247,.07); }
.arc-tab.arc-admin-tab.active {
  background: linear-gradient(135deg,rgba(168,85,247,.18),rgba(147,51,234,.1));
  border-color: rgba(168,85,247,.44); color: #c084fc;
  box-shadow: 0 0 18px rgba(168,85,247,.1);
}

/* ── Gold action button ── */
.arc-gold-btn {
  background: linear-gradient(135deg,#C9A227,#D4AF37,#EDD060,#B8901E);
  color: #08050F; font-weight: 700; border: none; border-radius: 14px;
  box-shadow: 0 4px 22px rgba(212,175,55,.38);
  transition: all .22s; cursor: pointer;
  font-family: 'Cinzel', serif; letter-spacing: .12em;
}
.arc-gold-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 38px rgba(212,175,55,.52);
  filter: brightness(1.07);
}
.arc-gold-btn:active:not(:disabled) { transform: translateY(0); }
.arc-gold-btn:disabled { opacity: .42; cursor: not-allowed; }

/* ── Approve / Reject action buttons ── */
.arc-approve-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(29,158,117,.11); border: 1px solid rgba(29,158,117,.35);
  color: #1D9E75; border-radius: 11px; padding: 9px 20px;
  font-size: .75rem; cursor: pointer; transition: all .22s;
  font-family: 'Cinzel', serif; letter-spacing: .1em;
}
.arc-approve-btn:hover:not(:disabled) {
  background: rgba(29,158,117,.24);
  box-shadow: 0 4px 18px rgba(29,158,117,.22);
  transform: translateY(-1px);
}
.arc-approve-btn:disabled { opacity: .42; cursor: not-allowed; }

.arc-reject-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(216,90,48,.1); border: 1px solid rgba(216,90,48,.32);
  color: #D85A30; border-radius: 11px; padding: 9px 20px;
  font-size: .75rem; cursor: pointer; transition: all .22s;
  font-family: 'Cinzel', serif; letter-spacing: .1em;
}
.arc-reject-btn:hover:not(:disabled) {
  background: rgba(216,90,48,.22);
  box-shadow: 0 4px 18px rgba(216,90,48,.2);
  transform: translateY(-1px);
}
.arc-reject-btn:disabled { opacity: .42; cursor: not-allowed; }

/* ── Drag-drop zone ── */
.arc-dropzone {
  border: 2px dashed rgba(212,175,55,.24);
  border-radius: 16px; cursor: pointer;
  transition: all .25s;
}
.arc-dropzone:hover, .arc-dropzone.over {
  border-color: rgba(212,175,55,.58);
  background: rgba(212,175,55,.05);
  box-shadow: 0 0 28px rgba(212,175,55,.09);
}

/* ── Empire filter pills ── */
.arc-empire-pill {
  cursor: pointer; border-radius: 20px;
  padding: 5px 13px; font-size: .7rem;
  display: inline-flex; align-items: center; gap: 5px;
  white-space: nowrap; border: 1px solid transparent;
  transition: all .2s; font-family: 'Raleway', sans-serif;
  background: none;
}
.arc-empire-pill:hover { transform: translateY(-1px); }

/* ── Skeleton ── */
.arc-skel {
  background: linear-gradient(90deg,rgba(212,175,55,.05) 25%,rgba(212,175,55,.11) 50%,rgba(212,175,55,.05) 75%);
  background-size: 200% 100%;
  animation: arc-shimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
}

/* ── Ornamental divider ── */
.arc-ornament {
  display: flex; align-items: center; gap: 12px;
  color: rgba(212,175,55,.28); font-size: .6rem;
  letter-spacing: .42em; text-transform: uppercase;
  font-family: 'Cinzel', serif;
}
.arc-ornament::before, .arc-ornament::after {
  content: ''; flex: 1; height: 1px;
  background: linear-gradient(90deg,transparent,rgba(212,175,55,.24),transparent);
}

/* ── Modal overlay ── */
.arc-modal-overlay {
  position: fixed; inset: 0; z-index: 900;
  background: rgba(0,0,0,.88);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  animation: arc-fadeup .22s ease;
}
.arc-modal-box { animation: arc-modal-in .28s ease; }

/* ── Lightbox ── */
.arc-lightbox-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,.96);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
  animation: arc-fadeup .18s ease;
}
.arc-lightbox-img {
  max-width: 100%; max-height: 88vh;
  border-radius: 12px;
  box-shadow: 0 0 90px rgba(212,175,55,.14);
  animation: arc-lbox-in .28s ease;
}

/* ── Status badge pop animation ── */
.arc-badge-pop { animation: arc-badge-pop .35s ease; }

/* ── Fade-up utility ── */
.arc-fade { animation: arc-fadeup .4s ease both; }
`;

// ══════════════════════════════════════════════════════════════════════
// ATOMIC COMPONENTS
// ══════════════════════════════════════════════════════════════════════

function Spinner({ size = 16, color = "#D4AF37" }: { size?: number; color?: string }) {
  return (
    <div
      style={{
        width: size, height: size,
        border: `2px solid ${color}28`,
        borderTopColor: color,
        borderRadius: "50%",
        animation: "arc-spin .7s linear infinite",
        flexShrink: 0,
      }}
    />
  );
}

// ──────────────────────────────────────────────────────────────────────

function StatusBadge({ status, lang }: { status: DocStatus; lang: string }) {
  const cfg = STATUS_CFG[status];
  const { Icon } = cfg;
  const label = cfg.labelMap[lang] ?? cfg.labelMap.en;
  return (
    <span
      className="arc-badge-pop"
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 11px", borderRadius: 20,
        fontSize: ".7rem", fontWeight: 500,
        color: cfg.color, background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      <Icon style={{ width: 11, height: 11 }} />
      {label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────

function EmpireBadge({ id }: { id: string }) {
  const e = empireInfo(id);
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 11px", borderRadius: 20,
        fontSize: ".7rem", fontWeight: 500,
        color: e.color, background: `${e.color}18`,
        border: `1px solid ${e.color}38`,
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      {e.flag} {e.label}
    </span>
  );
}

// ──────────────────────────────────────────────────────────────────────

function EmptyState({
  icon: Icon, title, sub,
}: { icon: any; title: string; sub?: string }) {
  return (
    <div
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "76px 24px", textAlign: "center",
      }}
    >
      <div style={{ position: "relative", marginBottom: 22 }}>
        <div
          style={{
            width: 78, height: 78, borderRadius: "50%",
            background: "radial-gradient(circle,rgba(212,175,55,.1),transparent 70%)",
            border: "1px solid rgba(212,175,55,.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "arc-glow-pulse 5s ease-in-out infinite",
          }}
        >
          <Icon style={{ width: 30, height: 30, color: "rgba(212,175,55,.44)" }} />
        </div>
        <div
          style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            border: "1px dashed rgba(212,175,55,.1)",
            animation: "arc-orbit 24s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "1px solid rgba(212,175,55,.18)",
            animation: "arc-pulse-out 4s ease-out infinite",
          }}
        />
      </div>
      <p
        style={{
          fontFamily: "'Cormorant Garant', serif",
          fontSize: "1.12rem", color: "rgba(237,224,196,.54)",
          marginBottom: 8, lineHeight: 1.4,
        }}
      >
        {title}
      </p>
      {sub && (
        <p
          style={{
            fontSize: ".78rem", color: "rgba(237,224,196,.28)",
            maxWidth: 290, lineHeight: 1.65,
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      style={{
        background: "rgba(12,8,2,.72)", border: "1px solid rgba(212,175,55,.07)",
        borderRadius: 20, padding: "22px 22px 18px",
      }}
    >
      <div className="arc-skel" style={{ height: 2.5, marginBottom: 20 }} />
      <div className="arc-skel" style={{ height: 14, width: "62%", marginBottom: 14 }} />
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <div className="arc-skel" style={{ height: 22, width: 94, borderRadius: 20 }} />
        <div className="arc-skel" style={{ height: 22, width: 72, borderRadius: 20 }} />
      </div>
      <div className="arc-skel" style={{ height: 10, marginBottom: 9 }} />
      <div className="arc-skel" style={{ height: 10, width: "82%" }} />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// LIGHTBOX
// ══════════════════════════════════════════════════════════════════════

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div className="arc-lightbox-overlay" onClick={onClose}>
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          width: 46, height: 46, borderRadius: "50%",
          background: "rgba(255,255,255,.1)",
          border: "1px solid rgba(255,255,255,.14)",
          color: "#EDE0C4", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background .2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
      >
        <X style={{ width: 18, height: 18 }} />
      </button>
      <img
        src={src}
        alt="Document attachment"
        className="arc-lightbox-img"
        onClick={e => e.stopPropagation()}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// REJECT MODAL
// ══════════════════════════════════════════════════════════════════════

function RejectModal({
  t, onConfirm, onCancel,
}: { t: T; onConfirm: (reason: string) => void; onCancel: () => void }) {
  const [reason, setReason] = useState("");

  return (
    <div className="arc-modal-overlay" onClick={onCancel}>
      <div
        className="arc-modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 520, width: "100%",
          borderRadius: 24, overflow: "hidden",
          background: "linear-gradient(150deg,#0f0a04,#1c0e05)",
          border: "1px solid rgba(216,90,48,.38)",
        }}
      >
        {/* Top bar */}
        <div style={{ height: 3, background: "linear-gradient(90deg,transparent,#D85A30,transparent)" }} />

        <div style={{ padding: "28px 28px 26px" }}>
          {/* Icon + title */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
            <div
              style={{
                width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
                background: "rgba(216,90,48,.12)", border: "1px solid rgba(216,90,48,.32)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <XCircle style={{ width: 19, height: 19, color: "#D85A30" }} />
            </div>
            <h3
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "1.18rem", color: "#EDE0C4", fontWeight: 600,
              }}
            >
              {t.rejectModalTitle}
            </h3>
          </div>

          {/* Textarea */}
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder={t.rejectPlaceholder}
            className="arc-input"
            style={{
              padding: "13px 15px", minHeight: 115,
              resize: "vertical", lineHeight: 1.68,
              marginBottom: 22,
            }}
            autoFocus
          />

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => { if (reason.trim()) onConfirm(reason); }}
              disabled={!reason.trim()}
              className="arc-reject-btn"
              style={{ flex: 1, justifyContent: "center", padding: "11px 16px", fontSize: ".78rem" }}
            >
              <XCircle style={{ width: 14, height: 14 }} />
              {t.rejectBtn}
            </button>
            <button
              onClick={onCancel}
              style={{
                padding: "11px 22px", borderRadius: 11, cursor: "pointer",
                background: "rgba(255,255,255,.05)",
                border: "1px solid rgba(255,255,255,.1)",
                color: "rgba(237,224,196,.5)", fontSize: ".78rem",
                fontFamily: "'Cinzel', serif", letterSpacing: ".08em",
                transition: "all .2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.1)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.05)")}
            >
              {t.cancelBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// FILE UPLOAD ZONE
// ══════════════════════════════════════════════════════════════════════

function FileUploadZone({
  t, attached, onAttach, onRemove,
}: {
  t: T;
  attached: AttachedFile | null;
  onAttach: (f: AttachedFile) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      if (file.size > MAX_FILE_BYTES) {
        alert(t.fileTooLarge);
        return;
      }
      const kind = detectFileKind(file);
      if (kind === "none") {
        alert(t.fileUnsupported);
        return;
      }
      const preview = kind === "image" ? URL.createObjectURL(file) : "";
      onAttach({
        file, preview, kind,
        sizeLabel: formatBytes(file.size),
        uploading: false,
      });
    },
    [onAttach, t]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Label */}
      <label
        style={{
          display: "block", fontSize: ".68rem",
          color: "rgba(212,175,55,.62)", marginBottom: 8,
          fontFamily: "'Cinzel', serif", letterSpacing: ".18em",
        }}
      >
        {t.fieldFile}
      </label>
      <p
        style={{
          fontSize: ".75rem", color: "rgba(237,224,196,.3)",
          marginBottom: 10, fontFamily: "'Raleway', sans-serif",
          lineHeight: 1.55,
        }}
      >
        {t.fileDesc}
      </p>

      {attached ? (
        /* ── Preview of attached file ── */
        <div
          style={{
            border: "1px solid rgba(212,175,55,.28)",
            borderRadius: 16, overflow: "hidden",
            background: "rgba(212,175,55,.04)",
            animation: "arc-fadeup .3s ease",
          }}
        >
          {/* Image preview */}
          {attached.kind === "image" && attached.preview && (
            <div style={{ position: "relative", maxHeight: 200, overflow: "hidden" }}>
              <img
                src={attached.preview}
                alt="Preview"
                style={{
                  width: "100%", maxHeight: 200,
                  objectFit: "cover", display: "block",
                  filter: "brightness(.88) contrast(1.07)",
                }}
              />
              <div
                style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top,rgba(10,6,2,.82),transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute", bottom: 10, left: 14,
                  fontSize: ".7rem", color: "rgba(237,224,196,.7)",
                  fontFamily: "'Cinzel', serif", letterSpacing: ".06em",
                }}
              >
                🖼 {attached.file.name}
              </div>
            </div>
          )}

          {/* PDF indicator */}
          {attached.kind === "pdf" && (
            <div
              style={{
                padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 14,
              }}
            >
              <div
                style={{
                  width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                  background: "rgba(216,90,48,.12)",
                  border: "1px solid rgba(216,90,48,.28)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <FileText style={{ width: 20, height: 20, color: "#D85A30" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: ".84rem", color: "#EDE0C4",
                    fontFamily: "'Raleway', sans-serif",
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}
                >
                  {attached.file.name}
                </p>
                <p style={{ fontSize: ".7rem", color: "rgba(237,224,196,.38)", marginTop: 2 }}>
                  PDF · {attached.sizeLabel}
                </p>
              </div>
            </div>
          )}

          {/* Meta + remove */}
          <div
            style={{
              padding: "10px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderTop: "1px solid rgba(212,175,55,.1)",
            }}
          >
            <span
              style={{
                fontSize: ".7rem", color: "rgba(237,224,196,.34)",
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              {attached.sizeLabel} · {attached.kind === "pdf" ? "PDF" : "Image"}
            </span>
            <button
              onClick={onRemove}
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                color: "rgba(216,90,48,.68)", background: "none", border: "none",
                cursor: "pointer", fontSize: ".7rem",
                fontFamily: "'Cinzel', serif", letterSpacing: ".08em",
                transition: "color .2s", padding: "3px 6px",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(216,90,48,1)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(216,90,48,.68)")}
            >
              <X style={{ width: 12, height: 12 }} />
              {t.fileRemove}
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          className={`arc-dropzone${dragOver ? " over" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{ padding: "30px 20px", textAlign: "center" }}
        >
          <div
            style={{
              width: 52, height: 52, borderRadius: "50%",
              margin: "0 auto 14px",
              background: "rgba(212,175,55,.08)",
              border: "1px solid rgba(212,175,55,.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .25s",
            }}
          >
            <Paperclip style={{ width: 22, height: 22, color: "rgba(212,175,55,.52)" }} />
          </div>
          <p
            style={{
              fontSize: ".84rem", color: "rgba(237,224,196,.48)",
              fontFamily: "'Raleway', sans-serif", marginBottom: 5,
            }}
          >
            {dragOver ? t.dragActive : t.dragDrop}
          </p>
          <p
            style={{
              fontSize: ".68rem", color: "rgba(237,224,196,.22)",
              fontFamily: "'Raleway', sans-serif",
            }}
          >
            JPG · PNG · WEBP · GIF · PDF &nbsp;·&nbsp; max {MAX_FILE_MB} MB
          </p>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT_TYPES}
            style={{ display: "none" }}
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) processFile(file);
              e.target.value = "";
            }}
          />
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// DOCUMENT CARD
// ══════════════════════════════════════════════════════════════════════

const DocCard = memo(function DocCard({
  doc, lang, t, showStatus = false,
  adminActions, expanded, onToggle,
}: {
  doc: EmpireDoc;
  lang: string;
  t: T;
  showStatus?: boolean;
  adminActions?: React.ReactNode;
  expanded?: boolean;
  onToggle?: () => void;
}) {
  const e = empireInfo(doc.empire_id);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const PREVIEW_LEN = 250;
  const preview = doc.content.slice(0, PREVIEW_LEN);
  const hasMore  = doc.content.length > PREVIEW_LEN;
  const dateStr  = formatDate(doc.created_at, lang);

  return (
    <>
      {lightboxSrc && (
        <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      )}

      <div
        className="arc-doc-card"
        style={{
          background: "linear-gradient(155deg,rgba(13,8,3,.96),rgba(20,13,5,.92))",
          border: "1px solid rgba(212,175,55,.16)",
          borderRadius: 22, overflow: "hidden",
          boxShadow: "0 4px 32px rgba(0,0,0,.48)",
        }}
      >
        {/* Empire color accent line */}
        <div
          style={{
            height: 2.5,
            background: `linear-gradient(90deg,transparent,${e.color}92,transparent)`,
          }}
        />

        {/* Watermark flag */}
        <div
          style={{
            position: "absolute", top: 14, right: 16,
            fontSize: "1.7rem", opacity: .065,
            pointerEvents: "none", userSelect: "none",
          }}
        >
          {e.flag}
        </div>

        {/* ── Image attachment thumbnail ── */}
        {doc.file_url && doc.file_type === "image" && (
          <div
            style={{
              position: "relative", height: 130, overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => setLightboxSrc(doc.file_url!)}
          >
            <img
              src={doc.file_url}
              alt="Attachment"
              style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "brightness(.72) contrast(1.09) sepia(14%)",
                transition: "filter .3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.filter = "brightness(.88) contrast(1.1) sepia(6%)")}
              onMouseLeave={e => (e.currentTarget.style.filter = "brightness(.72) contrast(1.09) sepia(14%)")}
            />
            <div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top,rgba(13,8,3,.92) 0%,rgba(13,8,3,.18) 52%,transparent 100%)",
              }}
            />
            <div
              style={{
                position: "absolute", top: 10, right: 10,
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(0,0,0,.52)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ZoomIn style={{ width: 13, height: 13, color: "rgba(237,224,196,.82)" }} />
            </div>
          </div>
        )}

        {/* ── PDF attachment strip ── */}
        {doc.file_url && doc.file_type === "pdf" && (
          <a
            href={doc.file_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 18px",
              background: "rgba(216,90,48,.05)",
              borderBottom: "1px solid rgba(216,90,48,.14)",
              textDecoration: "none",
              transition: "background .2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(216,90,48,.12)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(216,90,48,.05)")}
          >
            <div
              style={{
                width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                background: "rgba(216,90,48,.12)",
                border: "1px solid rgba(216,90,48,.28)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <FileText style={{ width: 13, height: 13, color: "#D85A30" }} />
            </div>
            <span
              style={{
                flex: 1, fontSize: ".7rem", color: "#D85A30",
                fontFamily: "'Cinzel', serif", letterSpacing: ".06em",
              }}
            >
              {t.viewAttachment}
            </span>
            <Download style={{ width: 13, height: 13, color: "rgba(216,90,48,.55)", flexShrink: 0 }} />
          </a>
        )}

        {/* ── Body ── */}
        <div style={{ padding: "18px 20px 16px" }}>
          {/* Title */}
          <h3
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "1.06rem", fontWeight: 600,
              color: "#EDE0C4", lineHeight: 1.32, marginBottom: 10,
            }}
          >
            {doc.title}
          </h3>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
            <EmpireBadge id={doc.empire_id} />
            {showStatus && <StatusBadge status={doc.status} lang={lang} />}
            {doc.status === "rejected" && doc.rejection_reason && (
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: ".68rem", color: "rgba(216,90,48,.6)",
                  fontFamily: "'Raleway', sans-serif", fontStyle: "italic",
                }}
              >
                <MessageSquare style={{ width: 10, height: 10 }} />
                {doc.rejection_reason.slice(0, 58)}
                {doc.rejection_reason.length > 58 ? "…" : ""}
              </span>
            )}
          </div>

          {/* Content preview */}
          <p
            style={{
              fontSize: ".83rem", color: "rgba(237,224,196,.5)",
              lineHeight: 1.78, letterSpacing: ".01em",
              fontFamily: "'Raleway', sans-serif",
              whiteSpace: "pre-line",
            }}
          >
            {expanded ? doc.content : preview}
            {!expanded && hasMore && "…"}
          </p>

          {/* Expand/collapse */}
          {hasMore && (
            <button
              onClick={onToggle}
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                marginTop: 9, background: "none", border: "none",
                color: "rgba(212,175,55,.5)", cursor: "pointer",
                fontSize: ".7rem", fontFamily: "'Cinzel', serif",
                letterSpacing: ".1em", transition: "color .2s", padding: 0,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(212,175,55,.92)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(212,175,55,.5)")}
            >
              {expanded
                ? <><ChevronDown style={{ width: 12, height: 12, transform: "rotate(180deg)" }} />{t.collapse}</>
                : <><ChevronRight style={{ width: 12, height: 12 }} />{t.readMore}</>}
            </button>
          )}

          {/* Meta footer */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: 14, paddingTop: 12,
              borderTop: "1px solid rgba(212,175,55,.08)",
              flexWrap: "wrap", gap: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              {doc.author_name && (
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: ".69rem", color: "rgba(237,224,196,.28)",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  <User style={{ width: 10, height: 10 }} />
                  {doc.author_name}
                </span>
              )}
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: 4,
                  fontSize: ".69rem", color: "rgba(237,224,196,.23)",
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                <Calendar style={{ width: 10, height: 10 }} />
                {dateStr}
              </span>
            </div>
            {adminActions}
          </div>
        </div>
      </div>
    </>
  );
});

// ══════════════════════════════════════════════════════════════════════
// HERO SECTION
// ══════════════════════════════════════════════════════════════════════

function HeroSection({
  t, lang, approved,
}: { t: T; lang: string; approved: EmpireDoc[] }) {
  const contribs = new Set(approved.map(d => d.user_id)).size;

  return (
    <div
      style={{
        position: "relative", overflow: "hidden",
        padding: "46px 20px 0",
        background: "radial-gradient(ellipse 90% 58% at 50% 0%,rgba(212,175,55,.09),transparent 72%)",
      }}
    >
      {/* Decorative top line */}
      <div
        style={{
          position: "absolute", top: 22, left: "50%", transform: "translateX(-50%)",
          width: 240, height: 1,
          background: "linear-gradient(90deg,transparent,rgba(212,175,55,.46),transparent)",
        }}
      />
      {/* Corner flourishes */}
      <div style={{ position: "absolute", top: 26, left: 22, opacity: .1, fontSize: "2rem" }}>❧</div>
      <div style={{ position: "absolute", top: 26, right: 22, opacity: .1, fontSize: "2rem", transform: "scaleX(-1)" }}>❧</div>

      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", paddingBottom: 34 }}>
        {/* Animated scroll icon */}
        <div style={{ position: "relative", width: 62, height: 62, margin: "0 auto 20px" }}>
          <div
            style={{
              width: 62, height: 62, borderRadius: "50%",
              background: "rgba(212,175,55,.1)",
              border: "1px solid rgba(212,175,55,.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "arc-glow-pulse 5s ease-in-out infinite",
            }}
          >
            <Scroll style={{ width: 26, height: 26, color: "#D4AF37" }} />
          </div>
          <div
            style={{
              position: "absolute", inset: -9, borderRadius: "50%",
              border: "1px dashed rgba(212,175,55,.15)",
              animation: "arc-orbit 22s linear infinite",
            }}
          />
          <div
            style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              border: "1px solid rgba(212,175,55,.28)",
              animation: "arc-pulse-out 3.5s ease-out infinite",
            }}
          />
        </div>

        {/* Main title */}
        <h1
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(1.95rem,5.8vw,3.4rem)",
            fontWeight: 600, lineHeight: 1.07,
            background: "linear-gradient(135deg,#F5DC68,#D4AF37,#AE7D18,#ECCC52,#D4AF37)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: 11,
            animation: "arc-flicker 9s ease-in-out infinite",
          }}
        >
          {t.heroTitle}
        </h1>

        {/* Subtitle ornament */}
        <div className="arc-ornament" style={{ maxWidth: 340, margin: "0 auto 10px" }}>
          ✦ {t.heroSub} ✦
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: ".83rem", color: "rgba(237,224,196,.36)",
            lineHeight: 1.7, maxWidth: 390, margin: "0 auto 24px",
            fontFamily: "'Raleway', sans-serif",
          }}
        >
          {t.heroDesc}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "center", gap: 10, flexWrap: "wrap",
          }}
        >
          {[
            { label: t.statApproved, value: approved.length, color: "#D4AF37" },
            { label: t.statEmpires,  value: ALL_EMPIRES.length, color: "#C8A96E" },
            { label: t.statContribs, value: contribs || "—", color: "#1D9E75" },
          ].map(({ label, value, color }, i) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {i > 0 && (
                <span style={{ color: "rgba(212,175,55,.14)", fontSize: "1.3rem" }}>·</span>
              )}
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: "1.65rem", color, lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: ".58rem", letterSpacing: ".18em",
                    textTransform: "uppercase", color: "rgba(237,224,196,.28)",
                    fontFamily: "'Cinzel', serif", marginTop: 2,
                  }}
                >
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div
        style={{
          height: 1,
          background: "linear-gradient(90deg,transparent,rgba(212,175,55,.18),transparent)",
        }}
      />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// EXPLORE TAB
// ══════════════════════════════════════════════════════════════════════

function ExploreTab({
  t, lang, approved, loading,
}: { t: T; lang: string; approved: EmpireDoc[]; loading: boolean }) {
  const [empire,  setEmpire]  = useState("all");
  const [query,   setQuery]   = useState("");
  const [sort,    setSort]    = useState<SortOrder>("newest");
  const [expId,   setExpId]   = useState<string | null>(null);

  const filtered = approved
    .filter(d => {
      const matchEmp = empire === "all" || d.empire_id === empire;
      const q = query.toLowerCase();
      const matchQ  = !q || d.title.toLowerCase().includes(q) || d.content.toLowerCase().includes(q);
      return matchEmp && matchQ;
    })
    .sort((a, b) => {
      if (sort === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (sort === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      return a.title.localeCompare(b.title);
    });

  const countFor = (id: string) => approved.filter(d => d.empire_id === id).length;

  return (
    <div className="arc-fade">
      {/* ── Search + Sort ── */}
      <div
        style={{
          display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap",
        }}
      >
        {/* Search box */}
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search
            style={{
              position: "absolute", left: 13,
              top: "50%", transform: "translateY(-50%)",
              width: 15, height: 15,
              color: "rgba(212,175,55,.38)", pointerEvents: "none",
            }}
          />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t.search}
            className="arc-input"
            style={{ padding: "10px 14px 10px 38px" }}
          />
        </div>

        {/* Sort buttons */}
        <div style={{ display: "flex", gap: 5 }}>
          {(["newest", "oldest", "alpha"] as SortOrder[]).map(s => (
            <button
              key={s}
              onClick={() => setSort(s)}
              style={{
                padding: "8px 13px", borderRadius: 11, cursor: "pointer",
                fontSize: ".68rem", fontFamily: "'Cinzel', serif",
                letterSpacing: ".08em", border: "1px solid",
                borderColor: sort === s ? "rgba(212,175,55,.42)" : "rgba(212,175,55,.14)",
                background: sort === s ? "rgba(212,175,55,.12)" : "rgba(212,175,55,.04)",
                color: sort === s ? "#D4AF37" : "rgba(237,224,196,.36)",
                transition: "all .2s", whiteSpace: "nowrap",
              }}
            >
              {s === "newest" ? t.sortNewest : s === "oldest" ? t.sortOldest : t.sortAlpha}
            </button>
          ))}
        </div>
      </div>

      {/* ── Empire filter pills ── */}
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 22 }}>
        {/* All empires pill */}
        <button
          onClick={() => setEmpire("all")}
          className="arc-empire-pill"
          style={{
            background: empire === "all" ? "rgba(212,175,55,.16)" : "rgba(255,255,255,.03)",
            borderColor: empire === "all" ? "rgba(212,175,55,.46)" : "rgba(255,255,255,.07)",
            color: empire === "all" ? "#D4AF37" : "rgba(237,224,196,.37)",
          }}
        >
          <Globe style={{ width: 11, height: 11 }} />
          {t.allEmpires}
          <span style={{ fontSize: ".58rem", opacity: .62 }}>({approved.length})</span>
        </button>

        {/* Individual empire pills */}
        {ALL_EMPIRES.map(emp => {
          const cnt = countFor(emp.id);
          const active = empire === emp.id;
          return (
            <button
              key={emp.id}
              onClick={() => setEmpire(emp.id)}
              className="arc-empire-pill"
              style={{
                background: active ? `${emp.color}18` : "rgba(255,255,255,.03)",
                borderColor: active ? `${emp.color}58` : "rgba(255,255,255,.07)",
                color: active ? emp.color : "rgba(237,224,196,.34)",
              }}
            >
              {emp.flag}
              {emp.label.split(" ")[0]}
              {cnt > 0 && (
                <span style={{ fontSize: ".58rem", opacity: .6 }}>({cnt})</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Query result count */}
      {!loading && query && (
        <p
          style={{
            fontSize: ".72rem", color: "rgba(237,224,196,.28)",
            fontFamily: "'Raleway', sans-serif", marginBottom: 14,
            animation: "arc-fadeup .3s ease",
          }}
        >
          {filtered.length} {t.resultsFor} "{query}"
        </p>
      )}

      {/* ── Document grid ── */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 16,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState icon={Library} title={t.noApproved} sub={t.noApprovedSub} />
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: 16,
          }}
        >
          {filtered.map((doc, i) => (
            <div key={doc.id} style={{ animationDelay: `${i * 52}ms` }}>
              <DocCard
                doc={doc} lang={lang} t={t}
                expanded={expId === doc.id}
                onToggle={() => setExpId(expId === doc.id ? null : doc.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// SUBMIT TAB
// ══════════════════════════════════════════════════════════════════════

function SubmitTab({ t, lang, user }: { t: T; lang: string; user: any }) {
  const [form, setForm]         = useState({ title: "", content: "", empire_id: "" });
  const [errors, setErrors]     = useState<Record<string, string>>({});
  const [attached, setAttached] = useState<AttachedFile | null>(null);
  const [busy, setBusy]         = useState(false);
  const [success, setSuccess]   = useState(false);

  // Validation
  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = t.titleRequired;
    if (form.content.trim().length < 100) e.content = t.minChars;
    if (!form.empire_id) e.empire_id = t.empireRequired;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Upload attached file to Supabase Storage
  const uploadFile = async (): Promise<{ url: string; type: FileKind; name: string } | null> => {
    if (!attached) return null;
    const ext  = attached.file.name.split(".").pop() ?? "bin";
    const path = `documents/${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("document-attachments")
      .upload(path, attached.file, { upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("document-attachments").getPublicUrl(path);
    return { url: data.publicUrl, type: attached.kind, name: attached.file.name };
  };

  // Submit
  const handleSubmit = async () => {
    if (!validate()) return;
    setBusy(true);
    try {
      const { data: profile } = await supabase
        .from("profiles").select("display_name").eq("id", user.id).single();

      let fileData: { url: string; type: FileKind; name: string } | null = null;
      try { fileData = await uploadFile(); } catch { /* optional */ }

const handleSubmit = async () => {
  if (!validate()) return;
  setBusy(true);
  try {
    const { data: profile } = await supabase
      .from("profiles").select("display_name").eq("id", user.id).single();

    let fileData: { url: string; type: FileKind; name: string } | null = null;
    try { fileData = await uploadFile(); } catch (fileErr) {
      console.error("File upload error:", fileErr);
    }

    const insertPayload = {
      title:       form.title.trim(),
      content:     form.content.trim(),
      empire_id:   form.empire_id,
      user_id:     user.id,
      author_name: profile?.display_name ?? user.email?.split("@")[0] ?? "Anonymous",
      status:      "pending" as const,
      file_url:    fileData?.url  ?? null,
      file_type:   fileData?.type ?? null,
      file_name:   fileData?.name ?? null,
    };

    console.log("Inserting:", insertPayload);
    console.log("Auth user id:", user.id);

    const { data, error } = await supabase
      .from("documents")
      .insert(insertPayload)
      .select();

    console.log("Insert result:", data, "Error:", error);

    if (error) {
      alert("Fel: " + error.message + " | Code: " + error.code);
      setBusy(false);
      return;
    }

    setSuccess(true);
    setForm({ title: "", content: "", empire_id: "" });
    setErrors({});
    setAttached(null);
    setTimeout(() => setSuccess(false), 8000);
  } catch (err) {
    console.error("Submit error:", err);
    alert("Oväntat fel: " + JSON.stringify(err));
  }
  setBusy(false);
};

  /* ── Not signed in ── */
  if (!user) {
    return (
      <div
        style={{
          maxWidth: 560, margin: "0 auto", textAlign: "center",
          padding: "58px 28px",
          background: "linear-gradient(150deg,rgba(13,8,3,.92),rgba(20,13,5,.88))",
          border: "1px solid rgba(212,175,55,.14)", borderRadius: 24,
          animation: "arc-fadeup .4s ease",
        }}
      >
        <div
          style={{
            width: 58, height: 58, borderRadius: "50%", margin: "0 auto 18px",
            background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <AlertCircle style={{ width: 24, height: 24, color: "rgba(212,175,55,.46)" }} />
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "1.22rem", color: "rgba(237,224,196,.7)", marginBottom: 9,
          }}
        >
          {t.loginRequired}
        </h3>
        <p
          style={{
            fontSize: ".78rem", color: "rgba(237,224,196,.32)",
            lineHeight: 1.65, fontFamily: "'Raleway', sans-serif",
          }}
        >
          {t.loginRequiredSub}
        </p>
      </div>
    );
  }

  /* ── Success ── */
  if (success) {
    return (
      <div
        style={{
          maxWidth: 560, margin: "0 auto", textAlign: "center",
          padding: "58px 28px",
          background: "rgba(29,158,117,.06)", border: "1px solid rgba(29,158,117,.3)",
          borderRadius: 24, animation: "arc-fadeup .4s ease",
        }}
      >
        <div
          style={{
            width: 62, height: 62, borderRadius: "50%", margin: "0 auto 18px",
            background: "rgba(29,158,117,.1)", border: "1px solid rgba(29,158,117,.32)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <CheckCircle style={{ width: 28, height: 28, color: "#1D9E75" }} />
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "1.38rem", color: "#1D9E75", marginBottom: 11,
          }}
        >
          {t.submitOk}
        </h3>
        <p
          style={{
            fontSize: ".82rem", color: "rgba(237,224,196,.44)",
            lineHeight: 1.65, fontFamily: "'Raleway', sans-serif",
          }}
        >
          {t.submitOkSub}
        </p>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", animation: "arc-fadeup .4s ease" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <div
          style={{
            width: 54, height: 54, borderRadius: "50%", margin: "0 auto 15px",
            background: "rgba(212,175,55,.08)", border: "1px solid rgba(212,175,55,.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Feather style={{ width: 21, height: 21, color: "#D4AF37" }} />
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "1.72rem", color: "#EDE0C4", marginBottom: 7,
          }}
        >
          {t.submitTitle}
        </h2>
        <p
          style={{
            fontSize: ".8rem", color: "rgba(237,224,196,.36)",
            lineHeight: 1.65, fontFamily: "'Raleway', sans-serif",
          }}
        >
          {t.submitSub}
        </p>
      </div>

      {/* Form card */}
      <div
        style={{
          background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.94))",
          border: "1px solid rgba(212,175,55,.18)", borderRadius: 24, overflow: "hidden",
        }}
      >
        <div style={{ height: 2.5, background: "linear-gradient(90deg,transparent,rgba(212,175,55,.52),transparent)" }} />
        <div style={{ padding: "28px 26px 26px" }}>

          {/* ── Title field ── */}
          <div style={{ marginBottom: 19 }}>
            <label
              style={{
                display: "block", fontSize: ".68rem",
                color: "rgba(212,175,55,.62)", marginBottom: 9,
                fontFamily: "'Cinzel', serif", letterSpacing: ".18em",
              }}
            >
              {t.fieldTitle}
            </label>
            <input
              value={form.title}
              onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setErrors(p => ({ ...p, title: "" })); }}
              placeholder={t.titlePlaceholder}
              className="arc-input"
              style={{ padding: "12px 15px" }}
            />
            {errors.title && (
              <p
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: ".7rem", color: "#D85A30", marginTop: 5,
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                <AlertCircle style={{ width: 11, height: 11 }} />
                {errors.title}
              </p>
            )}
          </div>

          {/* ── Empire select ── */}
          <div style={{ marginBottom: 19 }}>
            <label
              style={{
                display: "block", fontSize: ".68rem",
                color: "rgba(212,175,55,.62)", marginBottom: 9,
                fontFamily: "'Cinzel', serif", letterSpacing: ".18em",
              }}
            >
              {t.fieldEmpire}
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={form.empire_id}
                onChange={e => { setForm(p => ({ ...p, empire_id: e.target.value })); setErrors(p => ({ ...p, empire_id: "" })); }}
                className="arc-input"
                style={{ padding: "12px 36px 12px 15px", appearance: "none", cursor: "pointer" }}
              >
                <option value="">{t.empirePrompt}</option>
                {ALL_EMPIRES.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.flag} {emp.label}</option>
                ))}
              </select>
              <ChevronDown
                style={{
                  position: "absolute", right: 13, top: "50%",
                  transform: "translateY(-50%)",
                  width: 14, height: 14,
                  color: "rgba(212,175,55,.38)", pointerEvents: "none",
                }}
              />
            </div>
            {errors.empire_id && (
              <p
                style={{
                  display: "flex", alignItems: "center", gap: 5,
                  fontSize: ".7rem", color: "#D85A30", marginTop: 5,
                  fontFamily: "'Raleway', sans-serif",
                }}
              >
                <AlertCircle style={{ width: 11, height: 11 }} />
                {errors.empire_id}
              </p>
            )}
          </div>

          {/* ── Content textarea ── */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block", fontSize: ".68rem",
                color: "rgba(212,175,55,.62)", marginBottom: 9,
                fontFamily: "'Cinzel', serif", letterSpacing: ".18em",
              }}
            >
              {t.fieldContent}
            </label>
            <textarea
              value={form.content}
              onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setErrors(p => ({ ...p, content: "" })); }}
              placeholder={t.contentPlaceholder}
              className="arc-input"
              style={{ padding: "13px 15px", minHeight: 195, resize: "vertical", lineHeight: 1.73 }}
            />
            <div
              style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginTop: 5,
              }}
            >
              {errors.content
                ? (
                  <p
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      fontSize: ".7rem", color: "#D85A30",
                      fontFamily: "'Raleway', sans-serif",
                    }}
                  >
                    <AlertCircle style={{ width: 11, height: 11 }} />
                    {errors.content}
                  </p>
                )
                : <div />}
              <span
                style={{
                  fontSize: ".68rem", fontFamily: "'Raleway', sans-serif",
                  color: form.content.length < 100
                    ? "rgba(216,90,48,.62)"
                    : "rgba(29,158,117,.62)",
                }}
              >
                {form.content.length} {t.chars}
              </span>
            </div>
          </div>

          {/* ── File upload ── */}
          <FileUploadZone
            t={t}
            attached={attached}
            onAttach={setAttached}
            onRemove={() => setAttached(null)}
          />

          {/* ── Guidelines ── */}
          <div
            style={{
              padding: "13px 16px", borderRadius: 12, marginBottom: 24,
              background: "rgba(212,175,55,.04)", border: "1px solid rgba(212,175,55,.1)",
            }}
          >
            <p
              style={{
                fontSize: ".72rem", color: "rgba(237,224,196,.4)",
                lineHeight: 1.68, fontFamily: "'Raleway', sans-serif",
              }}
            >
              <span
                style={{
                  color: "rgba(212,175,55,.68)",
                  fontFamily: "'Cinzel', serif", letterSpacing: ".09em",
                }}
              >
                {t.guidelines}{" "}
              </span>
              {t.guidelinesText}
            </p>
          </div>

          {/* ── Submit button ── */}
          <button
            onClick={handleSubmit}
            disabled={busy}
            className="arc-gold-btn"
            style={{
              width: "100%", padding: "14px 20px",
              fontSize: ".82rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
            }}
          >
            {busy
              ? <><Spinner size={15} color="#08050F" />{t.submitting}</>
              : <><Send style={{ width: 15, height: 15 }} />{t.submitBtn}</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MY DOCUMENTS TAB
// ══════════════════════════════════════════════════════════════════════

function MyDocsTab({
  t, lang, user, onGoSubmit,
}: { t: T; lang: string; user: any; onGoSubmit: () => void }) {
  const [docs, setDocs]   = useState<EmpireDoc[]>([]);
  const [loading, setLd]  = useState(false);
  const [expId, setExpId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLd(true);
    supabase
      .from("documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => { setDocs((data ?? []) as EmpireDoc[]); setLd(false); })
      .catch(() => { setDocs([]); setLd(false); });
  }, [user]);

  if (!user) {
    return <EmptyState icon={FolderOpen} title={t.loginToSee} />;
  }

  return (
    <div className="arc-fade">
      {/* Header */}
      <div
        style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", marginBottom: 22,
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "1.42rem", color: "#EDE0C4",
          }}
        >
          {t.myDocs}
        </h2>
        <button
          onClick={onGoSubmit}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 17px", borderRadius: 11, cursor: "pointer",
            background: "rgba(212,175,55,.08)",
            border: "1px solid rgba(212,175,55,.26)",
            color: "#D4AF37", fontSize: ".72rem",
            fontFamily: "'Cinzel', serif", letterSpacing: ".1em",
            transition: "all .22s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,.16)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,175,55,.08)")}
        >
          <Plus style={{ width: 13, height: 13 }} />
          {t.newDoc}
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : docs.length === 0 ? (
        <EmptyState icon={FolderOpen} title={t.noMyDocs} sub={t.noMyDocsSub} />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
          {docs.map((doc, i) => (
            <div key={doc.id} style={{ animationDelay: `${i * 52}ms` }}>
              <DocCard
                doc={doc} lang={lang} t={t}
                showStatus
                expanded={expId === doc.id}
                onToggle={() => setExpId(expId === doc.id ? null : doc.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ADMIN TAB — COMPLETELY HIDDEN FROM NON-ADMINS (rendered only when isAdmin=true)
// ══════════════════════════════════════════════════════════════════════

function AdminTab({ t, lang }: { t: T; lang: string }) {
  const [subTab,     setSubTab]  = useState<AdminSubTab>("pending");
  const [pending,    setPending] = useState<EmpireDoc[]>([]);
  const [allDocs,    setAllDocs] = useState<EmpireDoc[]>([]);
  const [loadingP,   setLoadP]   = useState(false);
  const [loadingA,   setLoadA]   = useState(false);
  const [procId,     setProcId]  = useState<string | null>(null);
  const [rejectTgt,  setRejTgt]  = useState<string | null>(null);
  const [expId,      setExpId]   = useState<string | null>(null);
  const [allSearch,  setAllSrch] = useState("");
  const [allEmpFlt,  setAllEFlt] = useState("all");

  /* ── Load pending ── */
  const loadPending = useCallback(async () => {
    setLoadP(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*, profiles(display_name)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      setPending(
        (data ?? []).map((d: any) => ({ ...d, author_name: d.profiles?.display_name }))
      );
    } catch { setPending([]); }
    setLoadP(false);
  }, []);

  /* ── Load all ── */
  const loadAll = useCallback(async () => {
    setLoadA(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*, profiles(display_name)")
        .order("created_at", { ascending: false })
        .limit(100);
      setAllDocs(
        (data ?? []).map((d: any) => ({ ...d, author_name: d.profiles?.display_name }))
      );
    } catch { setAllDocs([]); }
    setLoadA(false);
  }, []);

  useEffect(() => { loadPending(); }, [loadPending]);
  useEffect(() => { if (subTab === "all") loadAll(); }, [subTab, loadAll]);

  /* ── Approve ── */
  const doApprove = async (id: string) => {
    setProcId(id);
    await supabase.from("documents").update({
      status: "approved",
      reviewed_at: new Date().toISOString(),
    }).eq("id", id);
    setPending(p => p.filter(d => d.id !== id));
    setProcId(null);
  };

  /* ── Reject (with reason) ── */
  const doReject = async (id: string, reason: string) => {
    setProcId(id);
    setRejTgt(null);
    await supabase.from("documents").update({
      status: "rejected",
      reviewed_at: new Date().toISOString(),
      rejection_reason: reason || null,
    }).eq("id", id);
    setPending(p => p.filter(d => d.id !== id));
    setProcId(null);
  };

  /* ── Delete (from All tab) ── */
  const doDelete = async (id: string) => {
    if (!confirm(t.confirmDelete)) return;
    await supabase.from("documents").delete().eq("id", id);
    setAllDocs(p => p.filter(d => d.id !== id));
    setPending(p => p.filter(d => d.id !== id));
  };

  /* ── Filtered all-docs ── */
  const filteredAll = allDocs.filter(d => {
    const matchE = allEmpFlt === "all" || d.empire_id === allEmpFlt;
    const q = allSearch.toLowerCase();
    const matchQ = !q || d.title.toLowerCase().includes(q);
    return matchE && matchQ;
  });

  return (
    <div className="arc-fade">
      {/* Reject modal */}
      {rejectTgt && (
        <RejectModal
          t={t}
          onConfirm={reason => doReject(rejectTgt, reason)}
          onCancel={() => setRejTgt(null)}
        />
      )}

      {/* ── Admin header banner ── */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 14, marginBottom: 22,
          padding: "16px 20px", borderRadius: 18,
          background: "linear-gradient(135deg,rgba(168,85,247,.1),rgba(147,51,234,.06))",
          border: "1px solid rgba(168,85,247,.3)",
        }}
      >
        <div
          style={{
            width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
            background: "rgba(168,85,247,.14)", border: "1px solid rgba(168,85,247,.36)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "arc-glow-pulse 4s ease-in-out infinite",
          }}
        >
          <Crown style={{ width: 18, height: 18, color: "#a855f7" }} />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif", fontSize: ".76rem",
              color: "#c084fc", letterSpacing: ".14em",
            }}
          >
            {t.adminTitle.toUpperCase()}
          </p>
          <p
            style={{
              fontSize: ".72rem", color: "rgba(237,224,196,.36)",
              marginTop: 2, fontFamily: "'Raleway', sans-serif",
            }}
          >
            {pending.length} {t.adminSubtitle}
          </p>
        </div>
        {/* Sub-tab switcher */}
        <div style={{ display: "flex", gap: 7 }}>
          {(["pending", "all"] as AdminSubTab[]).map(s => (
            <button
              key={s}
              onClick={() => setSubTab(s)}
              style={{
                padding: "7px 15px", borderRadius: 10, cursor: "pointer",
                fontSize: ".68rem", fontFamily: "'Cinzel', serif",
                letterSpacing: ".08em", border: "1px solid",
                borderColor: subTab === s ? "rgba(168,85,247,.52)" : "rgba(168,85,247,.18)",
                background: subTab === s ? "rgba(168,85,247,.17)" : "rgba(168,85,247,.05)",
                color: subTab === s ? "#c084fc" : "rgba(192,132,252,.42)",
                transition: "all .2s", position: "relative",
              }}
            >
              {s === "pending" ? t.tabPending : t.tabAll}
              {s === "pending" && pending.length > 0 && (
                <span
                  style={{
                    marginLeft: 5,
                    background: "rgba(168,85,247,.3)", color: "#c084fc",
                    borderRadius: 8, padding: "0 6px", fontSize: ".6rem",
                  }}
                >
                  {pending.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PENDING SUB-TAB
      ══════════════════════════════════════════════ */}
      {subTab === "pending" && (
        <>
          {loadingP ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : pending.length === 0 ? (
            <EmptyState icon={Shield} title={t.noAdmin} sub={t.noAdminSub} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {pending.map((doc, i) => {
                const emp = empireInfo(doc.empire_id);
                const isProc = procId === doc.id;

                return (
                  <div
                    key={doc.id}
                    style={{
                      animationDelay: `${i * 58}ms`,
                      animation: "arc-card-in .45s ease both",
                      background: "linear-gradient(155deg,rgba(13,8,3,.97),rgba(20,13,5,.93))",
                      border: "1px solid rgba(168,85,247,.24)",
                      borderRadius: 22, overflow: "hidden",
                      opacity: isProc ? .52 : 1,
                      transition: "opacity .3s",
                    }}
                  >
                    {/* Empire color top bar */}
                    <div
                      style={{
                        height: 2.5,
                        background: `linear-gradient(90deg,transparent,${emp.color}84,transparent)`,
                      }}
                    />

                    {/* Image attachment thumbnail */}
                    {doc.file_url && doc.file_type === "image" && (
                      <div style={{ height: 110, overflow: "hidden", position: "relative" }}>
                        <img
                          src={doc.file_url}
                          alt=""
                          style={{
                            width: "100%", height: "100%", objectFit: "cover",
                            filter: "brightness(.62) sepia(18%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to top,rgba(13,8,3,.92),transparent 60%)",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute", bottom: 9, left: 14,
                            fontSize: ".65rem", color: "rgba(237,224,196,.55)",
                            fontFamily: "'Cinzel', serif", letterSpacing: ".06em",
                          }}
                        >
                          📎 Image evidence attached
                        </div>
                      </div>
                    )}

                    {/* PDF strip */}
                    {doc.file_url && doc.file_type === "pdf" && (
                      <div
                        style={{
                          padding: "9px 16px",
                          display: "flex", alignItems: "center", gap: 10,
                          background: "rgba(216,90,48,.05)",
                          borderBottom: "1px solid rgba(216,90,48,.14)",
                        }}
                      >
                        <FileText style={{ width: 14, height: 14, color: "#D85A30", flexShrink: 0 }} />
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: ".7rem", color: "#D85A30",
                            fontFamily: "'Cinzel', serif", letterSpacing: ".06em",
                            textDecoration: "none",
                          }}
                        >
                          {t.viewAttachment} ↗
                        </a>
                      </div>
                    )}

                    <div style={{ padding: "18px 20px 16px" }}>
                      {/* Title */}
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garant', serif",
                          fontSize: "1.06rem", color: "#EDE0C4",
                          lineHeight: 1.3, marginBottom: 10, fontWeight: 600,
                        }}
                      >
                        {doc.title}
                      </h3>

                      {/* Badges */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>
                        <EmpireBadge id={doc.empire_id} />
                        {doc.author_name && (
                          <span
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              fontSize: ".7rem", color: "rgba(237,224,196,.32)",
                              fontFamily: "'Raleway', sans-serif",
                            }}
                          >
                            <User style={{ width: 11, height: 11 }} />
                            {doc.author_name}
                          </span>
                        )}
                        <span
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            fontSize: ".7rem", color: "rgba(237,224,196,.27)",
                            fontFamily: "'Raleway', sans-serif",
                          }}
                        >
                          <Calendar style={{ width: 11, height: 11 }} />
                          {formatDate(doc.created_at, lang)}
                        </span>
                      </div>

                      {/* Content preview */}
                      <p
                        style={{
                          fontSize: ".82rem", color: "rgba(237,224,196,.47)",
                          lineHeight: 1.76, fontFamily: "'Raleway', sans-serif",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {expId === doc.id ? doc.content : doc.content.slice(0, 340)}
                        {doc.content.length > 340 && expId !== doc.id && "…"}
                      </p>
                      {doc.content.length > 340 && (
                        <button
                          onClick={() => setExpId(expId === doc.id ? null : doc.id)}
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            marginTop: 7, background: "none", border: "none",
                            color: "rgba(168,85,247,.52)", cursor: "pointer",
                            fontSize: ".68rem", fontFamily: "'Cinzel', serif",
                            letterSpacing: ".08em", padding: 0, transition: "color .2s",
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = "rgba(168,85,247,.9)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "rgba(168,85,247,.52)")}
                        >
                          {expId === doc.id
                            ? <><ChevronDown style={{ width: 11, height: 11, transform: "rotate(180deg)" }} />{t.collapse}</>
                            : <><ChevronRight style={{ width: 11, height: 11 }} />{t.readMore}</>}
                        </button>
                      )}

                      {/* Review action buttons */}
                      <div
                        style={{
                          display: "flex", gap: 10, flexWrap: "wrap",
                          marginTop: 17, paddingTop: 14,
                          borderTop: "1px solid rgba(168,85,247,.1)",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => doApprove(doc.id)}
                          disabled={isProc}
                          className="arc-approve-btn"
                        >
                          {isProc
                            ? <Spinner size={13} color="#1D9E75" />
                            : <CheckCircle style={{ width: 14, height: 14 }} />}
                          {t.approve}
                        </button>

                        <button
                          onClick={() => setRejTgt(doc.id)}
                          disabled={isProc}
                          className="arc-reject-btn"
                        >
                          <XCircle style={{ width: 14, height: 14 }} />
                          {t.reject}
                        </button>

                        <div style={{ flex: 1 }} />

                        <span
                          style={{
                            display: "inline-flex", alignItems: "center", gap: 4,
                            fontSize: ".66rem", color: "rgba(168,85,247,.55)",
                            background: "rgba(168,85,247,.07)",
                            border: "1px solid rgba(168,85,247,.16)",
                            borderRadius: 8, padding: "4px 11px",
                            fontFamily: "'Cinzel', serif", letterSpacing: ".06em",
                          }}
                        >
                          <Clock style={{ width: 10, height: 10 }} />
                          {lang === "sv" ? "Väntar" : lang === "tr" ? "Bekliyor" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ══════════════════════════════════════════════
          ALL DOCUMENTS SUB-TAB
      ══════════════════════════════════════════════ */}
      {subTab === "all" && (
        <>
          {/* Search + empire filter */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 180 }}>
              <Search
                style={{
                  position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)",
                  width: 14, height: 14, color: "rgba(168,85,247,.38)", pointerEvents: "none",
                }}
              />
              <input
                value={allSearch}
                onChange={e => setAllSrch(e.target.value)}
                placeholder={lang === "sv" ? "Sök dokument..." : lang === "tr" ? "Ara..." : "Search..."}
                className="arc-input"
                style={{ padding: "9px 14px 9px 36px" }}
              />
            </div>
            <div style={{ position: "relative" }}>
              <select
                value={allEmpFlt}
                onChange={e => setAllEFlt(e.target.value)}
                className="arc-input"
                style={{ padding: "9px 34px 9px 14px", appearance: "none", cursor: "pointer", minWidth: 160 }}
              >
                <option value="all">{t.allEmpires}</option>
                {ALL_EMPIRES.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.flag} {emp.label}</option>
                ))}
              </select>
              <ChevronDown
                style={{
                  position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)",
                  width: 13, height: 13, color: "rgba(168,85,247,.38)", pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Counts by status */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {(["approved", "pending", "rejected"] as DocStatus[]).map(s => {
              const cnt = allDocs.filter(d => d.status === s).length;
              const cfg = STATUS_CFG[s];
              return (
                <span
                  key={s}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    padding: "4px 13px", borderRadius: 20,
                    fontSize: ".7rem", color: cfg.color,
                    background: cfg.bg, border: `1px solid ${cfg.border}`,
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  {cnt} {cfg.labelMap[lang] ?? cfg.labelMap.en}
                </span>
              );
            })}
          </div>

          {loadingA ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filteredAll.length === 0 ? (
            <EmptyState icon={Library} title={lang === "sv" ? "Inga dokument hittades" : "No documents found"} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filteredAll.map((doc, i) => (
                <div key={doc.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <DocCard
                    doc={doc} lang={lang} t={t}
                    showStatus
                    expanded={expId === doc.id}
                    onToggle={() => setExpId(expId === doc.id ? null : doc.id)}
                    adminActions={
                      <button
                        onClick={() => doDelete(doc.id)}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          padding: "4px 11px", borderRadius: 8, cursor: "pointer",
                          background: "rgba(216,90,48,.08)",
                          border: "1px solid rgba(216,90,48,.22)",
                          color: "rgba(216,90,48,.65)",
                          fontSize: ".65rem", fontFamily: "'Cinzel', serif",
                          letterSpacing: ".06em", transition: "all .2s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(216,90,48,.2)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "rgba(216,90,48,.08)")}
                      >
                        <Trash2 style={{ width: 11, height: 11 }} />
                        {t.deleteDoc}
                      </button>
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════
// ROOT PAGE COMPONENT
// ══════════════════════════════════════════════════════════════════════

export default function Documents() {
  const { language, setLanguage } = useChat();
  const { user, isAdmin }         = useAuth();

  const lang = (language as keyof typeof LANG) in LANG
    ? (language as keyof typeof LANG)
    : "en";
  const t = LANG[lang];

  const [activeTab,    setActiveTab]  = useState<TabId>("explore");
  const [approved,     setApproved]   = useState<EmpireDoc[]>(MOCK_APPROVED);
  const [loadingApprv, setLoadingAp]  = useState(false);

  /* ── Load approved documents ── */
  const loadApproved = useCallback(async () => {
    setLoadingAp(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*, profiles(display_name)")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setApproved(
          data.map((d: any) => ({ ...d, author_name: d.profiles?.display_name }))
        );
      }
      // If no real data yet, keep the mock data
    } catch {
      // Keep mock data on error
    }
    setLoadingAp(false);
  }, []);

  useEffect(() => { loadApproved(); }, [loadApproved]);

  /* ── Build tab list — admin tab ONLY when isAdmin ── */
  const TABS: { id: TabId; label: string; Icon: any; isAdmin?: boolean }[] = [
    { id: "explore", label: t.explore, Icon: Library },
    { id: "submit",  label: t.submit,  Icon: Feather },
    { id: "mine",    label: t.mine,    Icon: FolderOpen },
    ...(isAdmin
      ? [{ id: "admin" as TabId, label: t.adminTab, Icon: Crown, isAdmin: true }]
      : []
    ),
  ];

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <style>{GLOBAL_CSS}</style>

      <div style={{ minHeight: "100vh", color: "#EDE0C4" }}>

        {/* ── Hero ── */}
        <HeroSection t={t} lang={lang} approved={approved} />

        {/* ── Tab navigation ── */}
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "15px 16px 0" }}>
          <div
            style={{
              display: "flex", gap: 6,
              overflowX: "auto", paddingBottom: 4,
              scrollbarWidth: "none",
            }}
          >
            {TABS.map(({ id, label, Icon, isAdmin: adm }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`arc-tab${activeTab === id ? " active" : ""}${adm ? " arc-admin-tab" : ""}`}
              >
                <Icon style={{ width: 13, height: 13 }} />
                {label}
              </button>
            ))}
          </div>

          {/* Tab underline */}
          <div
            style={{
              height: 1, marginTop: 7,
              background: "linear-gradient(90deg,transparent,rgba(212,175,55,.14),transparent)",
            }}
          />
        </div>

        {/* ── Tab content ── */}
        <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px 80px" }}>

          {activeTab === "explore" && (
            <ExploreTab
              t={t} lang={lang}
              approved={approved}
              loading={loadingApprv}
            />
          )}

          {activeTab === "submit" && (
            <SubmitTab t={t} lang={lang} user={user} />
          )}

          {activeTab === "mine" && (
            <MyDocsTab
              t={t} lang={lang} user={user}
              onGoSubmit={() => setActiveTab("submit")}
            />
          )}

          {/* Admin tab: only rendered if isAdmin is true */}
          {activeTab === "admin" && isAdmin && (
            <AdminTab t={t} lang={lang} />
          )}

        </div>
      </div>
    </AppLayout>
  );
}
