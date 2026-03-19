import type { LatLngExpression } from "leaflet";
import type { EmpireConfig, TimelineEvent, Sultan, QuizQuestion, Badge, HistoricalProfile, TerritoryPeriod, TradeRouteGeo } from "./types";
import { romanFigures } from "@/data/figures";
import romanEagle from "@/assets/roman-eagle.jpg";
import colosseum from "@/assets/colosseum.jpg";

const romanTimeline: TimelineEvent[] = [
  // TIDIGT ROM
  {
    year: -753,
    title: { sv: "Roms grundande", en: "Founding of Rome", tr: "Roma'nın Kuruluşu" },
    summary: { sv: "Enligt legenden grundade Romulus Rom.", en: "Romulus founded Rome according to legend.", tr: "Efsaneye göre Romulus Roma'yı kurdu." },
    figures: ["Romulus", "Remus"],
  },

  {
    year: -509,
    title: { sv: "Republiken grundas", en: "Republic Founded", tr: "Cumhuriyet Kuruldu" },
    summary: { sv: "Monarkin störtas och republiken införs.", en: "Monarchy overthrown, republic established.", tr: "Monarşi yıkıldı, cumhuriyet kuruldu." },
  },

  // EXPANSION
  {
    year: -264,
    title: { sv: "Första puniska kriget", en: "First Punic War", tr: "Birinci Pön Savaşı" },
  },

  {
    year: -146,
    title: { sv: "Kartago förstörs", en: "Destruction of Carthage", tr: "Kartaca'nın Yıkımı" },
    summary: { sv: "Rom förstör Kartago och dominerar Medelhavet.", en: "Rome destroys Carthage.", tr: "Roma Kartaca'yı yok etti." },
  },

  // SLUTET AV REPUBLIKEN
  {
    year: -44,
    title: { sv: "Caesar mördas", en: "Caesar Assassinated", tr: "Caesar Öldürüldü" },
  },

  {
    year: -27,
    title: { sv: "Kejsardömet börjar", en: "Empire Begins", tr: "İmparatorluk Başladı" },
  },

  // IMPERIETS HÖJD
  {
    year: 117,
    title: { sv: "Maximal utsträckning", en: "Greatest Extent", tr: "En Geniş Sınırlar" },
  },

  // KRIS + REFORM
  {
    year: 212,
    title: { sv: "Alla blir romerska medborgare", en: "Citizenship for All", tr: "Herkese Vatandaşlık" },
    summary: { sv: "Caracalla ger medborgarskap till alla fria män.", en: "Citizenship granted to all free men.", tr: "Tüm özgür erkeklere vatandaşlık verildi." },
  },

  {
    year: 284,
    title: { sv: "Diocletianus reformer", en: "Diocletian Reforms", tr: "Diocletian Reformları" },
  },

  {
    year: 313,
    title: { sv: "Kristendom tillåts", en: "Christianity Legalized", tr: "Hristiyanlık Serbest" },
  },

  {
    year: 330,
    title: { sv: "Konstantinopel grundas", en: "Constantinople Founded", tr: "Konstantinopolis Kuruldu" },
  },

  // DELNING
  {
    year: 395,
    title: { sv: "Rom delas", en: "Empire Divided", tr: "İmparatorluk Bölündü" },
  },

  // VÄST FALLER
  {
    year: 410,
    title: { sv: "Rom plundras", en: "Sack of Rome", tr: "Roma Yağmalandı" },
    summary: { sv: "Visigoterna plundrar Rom.", en: "Visigoths sack Rome.", tr: "Vizigotlar Roma'yı yağmaladı." },
  },

  {
    year: 476,
    title: { sv: "Västrom faller", en: "Western Empire Falls", tr: "Batı Roma Çöktü" },
  },

  // ÖSTROM / BYZANTIUM (DET DU SAKNADE)
  {
    year: 527,
    title: { sv: "Justinianus blir kejsare", en: "Justinian Becomes Emperor", tr: "Justinian İmparator" },
  },

  {
    year: 537,
    title: { sv: "Hagia Sofia byggs", en: "Hagia Sophia Completed", tr: "Ayasofya Tamamlandı" },
  },

  {
    year: 565,
    title: { sv: "Rom återuppbyggs delvis", en: "Partial Roman Restoration", tr: "Roma Kısmen Geri Alındı" },
  },

  {
    year: 717,
    title: { sv: "Konstantinopel räddas", en: "Siege of Constantinople", tr: "Konstantinopolis Kuşatması" },
  },

  {
    year: 800,
    title: { sv: "Nytt romerskt rike i väst", en: "Holy Roman Empire", tr: "Kutsal Roma İmparatorluğu" },
  },

  {
    year: 1054,
    title: { sv: "Kyrkan splittras", en: "Great Schism", tr: "Büyük Ayrılık" },
  },

  {
    year: 1204,
    title: { sv: "Konstantinopel plundras", en: "Fourth Crusade", tr: "4. Haçlı Seferi" },
  },

  {
    year: 1453,
    title: { sv: "Östrom faller", en: "Fall of Constantinople", tr: "Konstantinopolis Düştü" },
  },
];

const romanLeaders: Sultan[] = [
  { id: "romulus", name: "Romulus", reignStart: -753, reignEnd: -716, parentId: null, generation: 1, title: { sv: "Grundaren", en: "The Founder", tr: "Kurucu" } },
  { id: "julius-caesar", name: "Julius Caesar", reignStart: -49, reignEnd: -44, parentId: null, generation: 2, title: { sv: "Diktatorn", en: "The Dictator", tr: "Diktatör" }, profileId: "julius-caesar" },
  { id: "augustus", name: "Augustus", reignStart: -27, reignEnd: 14, parentId: "julius-caesar", generation: 3, title: { sv: "Den förste kejsaren", en: "The First Emperor", tr: "İlk İmparator" }, profileId: "augustus" },
  { id: "tiberius", name: "Tiberius", reignStart: 14, reignEnd: 37, parentId: "augustus", generation: 4, title: { sv: "Den försiktige", en: "The Cautious", tr: "Temkinli" } },
  { id: "caligula", name: "Caligula", reignStart: 37, reignEnd: 41, parentId: "tiberius", generation: 5, title: { sv: "Den galne", en: "The Mad", tr: "Deli" } },
  { id: "claudius", name: "Claudius", reignStart: 41, reignEnd: 54, parentId: "caligula", generation: 5, title: { sv: "Den lärde", en: "The Scholar", tr: "Bilgin" } },
  { id: "nero", name: "Nero", reignStart: 54, reignEnd: 68, parentId: "claudius", generation: 6, title: { sv: "Den ökände", en: "The Infamous", tr: "Kötü Şöhretli" } },
  { id: "vespasian", name: "Vespasianus", reignStart: 69, reignEnd: 79, parentId: null, generation: 7, title: { sv: "Flaviska dynastins grundare", en: "Founder of Flavian Dynasty", tr: "Flavius Hanedanı Kurucusu" } },
  { id: "titus", name: "Titus", reignStart: 79, reignEnd: 81, parentId: "vespasian", generation: 8, title: { sv: "Mänsklighetens glädje", en: "Delight of Mankind", tr: "İnsanlığın Sevinci" } },
  { id: "trajan", name: "Trajanus", reignStart: 98, reignEnd: 117, parentId: null, generation: 9, title: { sv: "Den bäste kejsaren", en: "The Best Emperor", tr: "En İyi İmparator" }, profileId: "trajan" },
  { id: "hadrian", name: "Hadrianus", reignStart: 117, reignEnd: 138, parentId: "trajan", generation: 10, title: { sv: "Resenären", en: "The Traveler", tr: "Gezgin" } },
  { id: "marcus-aurelius", name: "Marcus Aurelius", reignStart: 161, reignEnd: 180, parentId: "hadrian", generation: 11, title: { sv: "Filosofkejsaren", en: "The Philosopher Emperor", tr: "Filozof İmparator" } },
  { id: "commodus", name: "Commodus", reignStart: 180, reignEnd: 192, parentId: "marcus-aurelius", generation: 12, title: { sv: "Gladiatorn", en: "The Gladiator", tr: "Gladyatör" } },
  { id: "diocletian", name: "Diocletianus", reignStart: 284, reignEnd: 305, parentId: null, generation: 13, title: { sv: "Reformatorn", en: "The Reformer", tr: "Reformcu" } },
  { id: "constantine", name: "Konstantin I", reignStart: 306, reignEnd: 337, parentId: "diocletian", generation: 14, title: { sv: "Den store", en: "The Great", tr: "Büyük" }, profileId: "constantine" },
  { id: "theodosius", name: "Theodosius I", reignStart: 379, reignEnd: 395, parentId: "constantine", generation: 15, title: { sv: "Den siste enande kejsaren", en: "Last United Emperor", tr: "Son Birleşik İmparator" } },
  { id: "romulus-augustulus", name: "Romulus Augustulus", reignStart: 475, reignEnd: 476, parentId: "theodosius", generation: 16, title: { sv: "Den siste kejsaren", en: "The Last Emperor", tr: "Son İmparator" } },
];

const romanQuizQuestions: QuizQuestion[] = [
  {
    id: "rq1", topic: "expansion", difficulty: "easy",
    question: { sv: "Vem grundade enligt legenden staden Rom?", en: "Who, according to legend, founded the city of Rome?", tr: "Efsaneye göre Roma şehrini kim kurdu?" },
    options: { sv: ["Remus", "Romulus", "Augustus", "Caesar"], en: ["Remus", "Romulus", "Augustus", "Caesar"], tr: ["Remus", "Romulus", "Augustus", "Caesar"] },
    correctIndex: 1,
    explanation: { sv: "Romulus grundade Rom 753 f.Kr. efter att ha dödat sin tvilllingbror Remus.", en: "Romulus founded Rome in 753 BC after killing his twin brother Remus.", tr: "Romulus, ikiz kardeşi Remus'u öldürdükten sonra MÖ 753'te Roma'yı kurdu." },
  },
  {
    id: "rq2", topic: "administration", difficulty: "easy",
    question: { sv: "Vem var Roms förste kejsare?", en: "Who was Rome's first emperor?", tr: "Roma'nın ilk imparatoru kimdi?" },
    options: { sv: ["Julius Caesar", "Augustus", "Nero", "Tiberius"], en: ["Julius Caesar", "Augustus", "Nero", "Tiberius"], tr: ["Julius Caesar", "Augustus", "Nero", "Tiberius"] },
    correctIndex: 1,
    explanation: { sv: "Augustus (Octavianus) blev Roms förste kejsare 27 f.Kr. och inledde Pax Romana.", en: "Augustus (Octavian) became Rome's first emperor in 27 BC and began the Pax Romana.", tr: "Augustus (Octavianus) MÖ 27'de Roma'nın ilk imparatoru oldu ve Pax Romana'yı başlattı." },
  },
  {
    id: "rq3", topic: "military", difficulty: "medium",
    question: { sv: "Vilken kejsare erövrade Dacien och förde Romarriket till sin maximala utsträckning?", en: "Which emperor conquered Dacia and brought the Roman Empire to its maximum extent?", tr: "Hangi imparator Dacia'yı fethetti ve Roma İmparatorluğu'nu en geniş sınırlarına ulaştırdı?" },
    options: { sv: ["Hadrianus", "Trajanus", "Augustus", "Diocletianus"], en: ["Hadrian", "Trajan", "Augustus", "Diocletian"], tr: ["Hadrianus", "Traianus", "Augustus", "Diocletianus"] },
    correctIndex: 1,
    explanation: { sv: "Trajanus (98–117 e.Kr.) utvidgade riket till sin största utsträckning med erövringen av Dacien och Mesopotamien.", en: "Trajan (98–117 AD) expanded the empire to its greatest extent with the conquest of Dacia and Mesopotamia.", tr: "Traianus (MS 98-117), Dacia ve Mezopotamya'nın fethiyle imparatorluğu en geniş sınırlarına ulaştırdı." },
  },
  {
    id: "rq4", topic: "decline", difficulty: "medium",
    question: { sv: "Vilket år föll Västromska riket?", en: "In what year did the Western Roman Empire fall?", tr: "Batı Roma İmparatorluğu hangi yıl düştü?" },
    options: { sv: ["410", "453", "476", "395"], en: ["410", "453", "476", "395"], tr: ["410", "453", "476", "395"] },
    correctIndex: 2,
    explanation: { sv: "476 e.Kr. avsatte Odoaker den siste västromerske kejsaren Romulus Augustulus.", en: "In 476 AD, Odoacer deposed the last Western Roman emperor Romulus Augustulus.", tr: "MS 476'da Odoaker, son Batı Roma imparatoru Romulus Augustulus'u tahttan indirdi." },
  },
  {
    id: "rq5", topic: "expansion", difficulty: "easy",
    question: { sv: "Mot vilken stad förde Rom de puniska krigen?", en: "Against which city did Rome fight the Punic Wars?", tr: "Roma Pön Savaşlarını hangi şehre karşı yaptı?" },
    options: { sv: ["Aten", "Kartago", "Alexandria", "Persepolis"], en: ["Athens", "Carthage", "Alexandria", "Persepolis"], tr: ["Atina", "Kartaca", "İskenderiye", "Persepolis"] },
    correctIndex: 1,
    explanation: { sv: "De tre puniska krigen (264–146 f.Kr.) utkämpades mellan Rom och Kartago.", en: "The three Punic Wars (264–146 BC) were fought between Rome and Carthage.", tr: "Üç Pön Savaşı (MÖ 264-146) Roma ve Kartaca arasında yapıldı." },
  },
  {
    id: "rq6", topic: "administration", difficulty: "advanced",
    question: { sv: "Vad var Ediktet i Milano (313 e.Kr.)?", en: "What was the Edict of Milan (313 AD)?", tr: "Milano Fermanı (MS 313) neydi?" },
    options: { sv: ["Kristendomens förbud", "Religionsfrihet för alla", "Roms delning", "Slaveriets avskaffande"], en: ["Ban on Christianity", "Religious freedom for all", "Division of Rome", "Abolition of slavery"], tr: ["Hristiyanlığın yasaklanması", "Herkes için din özgürlüğü", "Roma'nın bölünmesi", "Köleliğin kaldırılması"] },
    correctIndex: 1,
    explanation: { sv: "Ediktet i Milano garanterade religionsfrihet i hela Romerska riket, vilket de facto legaliserade kristendomen.", en: "The Edict of Milan guaranteed religious freedom throughout the Roman Empire, de facto legalizing Christianity.", tr: "Milano Fermanı, Roma İmparatorluğu genelinde din özgürlüğünü garanti ederek Hristiyanlığı fiilen yasallaştırdı." },
  },
  {
    id: "rq7", topic: "military", difficulty: "easy",
    question: { sv: "Vilken berömda byggnad i Rom användes för gladiatorspel?", en: "Which famous building in Rome was used for gladiator games?", tr: "Roma'da gladyatör oyunları için hangi ünlü yapı kullanıldı?" },
    options: { sv: ["Pantheon", "Colosseum", "Forum Romanum", "Circus Maximus"], en: ["Pantheon", "Colosseum", "Forum Romanum", "Circus Maximus"], tr: ["Pantheon", "Kolezyum", "Forum Romanum", "Circus Maximus"] },
    correctIndex: 1,
    explanation: { sv: "Colosseum (Amfiteatrum Flavium) byggdes 70–80 e.Kr. och rymde upp till 50 000 åskådare.", en: "The Colosseum (Amphitheatrum Flavium) was built 70–80 AD and held up to 50,000 spectators.", tr: "Kolezyum (Amphitheatrum Flavium) MS 70-80 yıllarında inşa edildi ve 50.000 seyirciye kadar barındırıyordu." },
  },
  {
    id: "rq8", topic: "decline", difficulty: "advanced",
    question: { sv: "Vilken kejsare delade riket i Tetrarkiet?", en: "Which emperor divided the empire into the Tetrarchy?", tr: "Hangi imparator imparatorluğu Tetrarşi'ye böldü?" },
    options: { sv: ["Konstantin I", "Diocletianus", "Theodosius I", "Trajanus"], en: ["Constantine I", "Diocletian", "Theodosius I", "Trajan"], tr: ["I. Konstantin", "Diocletianus", "I. Theodosius", "Traianus"] },
    correctIndex: 1,
    explanation: { sv: "Diocletianus skapade Tetrarkiet 293 e.Kr. och delade makten mellan fyra kejsare för att bättre styra det enorma riket.", en: "Diocletian created the Tetrarchy in 293 AD, dividing power among four emperors to better govern the vast empire.", tr: "Diocletianus MS 293'te Tetrarşi'yi kurarak gücü dört imparator arasında böldü." },
  },
];

const romanBadges: Badge[] = [
  { id: "legionary", name: { sv: "Legionär", en: "Legionary", tr: "Lejyoner" }, icon: "🛡️", requiredScore: 3, description: { sv: "Klara 3 frågor rätt", en: "Answer 3 questions correctly", tr: "3 soruyu doğru cevaplayın" } },
  { id: "centurion", name: { sv: "Centurion", en: "Centurion", tr: "Centurion" }, icon: "⚔️", requiredScore: 5, description: { sv: "Klara 5 frågor rätt", en: "Answer 5 questions correctly", tr: "5 soruyu doğru cevaplayın" } },
  { id: "caesar", name: { sv: "Caesar", en: "Caesar", tr: "Sezar" }, icon: "👑", requiredScore: 8, description: { sv: "Klara 8 frågor rätt", en: "Answer 8 questions correctly", tr: "8 soruyu doğru cevaplayın" } },
];

const romanProfiles: HistoricalProfile[] = [
  {
    id: "augustus", name: "Augustus", years: "63 f.Kr.–14 e.Kr.",
    title: { sv: "Den förste kejsaren", en: "The First Emperor", tr: "İlk İmparator" },
    portrait: "🏛️",
    bio: {
      sv: "Augustus, född Gaius Octavius, var Roms förste kejsare. Som Julius Caesars adoptivson besegrade han Antonius och Kleopatra vid Actium 31 f.Kr. och etablerade Principatet. Under hans styre inleddes Pax Romana.",
      en: "Augustus, born Gaius Octavius, was Rome's first emperor. As Julius Caesar's adopted son, he defeated Antony and Cleopatra at Actium in 31 BC and established the Principate. Under his rule, the Pax Romana began.",
      tr: "Augustus, Gaius Octavius olarak doğdu ve Roma'nın ilk imparatoruydu. Julius Caesar'ın evlat edindiği oğlu olarak MÖ 31'de Actium'da Antonius ve Kleopatra'yı yendi ve Prensipat'ı kurdu.",
    },
    reforms: {
      sv: ["Principatets etablering", "Praetorian-gardet grundat", "Omfattande väg- och infrastrukturprogram", "Reform av provinsadministrationen"],
      en: ["Establishment of the Principate", "Praetorian Guard founded", "Extensive road and infrastructure program", "Reform of provincial administration"],
      tr: ["Prensipat'ın kurulması", "Praetorya Muhafızları'nın kurulması", "Kapsamlı yol ve altyapı programı", "Eyalet yönetiminin reformu"],
    },
    campaigns: {
      sv: ["Slaget vid Actium (31 f.Kr.)", "Erövringen av Egypten (30 f.Kr.)", "Kampanjer i Hispanien", "Misslyckandet i Teutoburgerskogen (9 e.Kr.)"],
      en: ["Battle of Actium (31 BC)", "Conquest of Egypt (30 BC)", "Campaigns in Hispania", "Disaster at Teutoburg Forest (9 AD)"],
      tr: ["Actium Muharebesi (MÖ 31)", "Mısır'ın Fethi (MÖ 30)", "Hispanya Seferleri", "Teutoburg Ormanı Felaketi (MS 9)"],
    },
    leadershipStyle: {
      sv: "Augustus var en mästare av politisk pragmatism. Han behöll republikens fasad medan han koncentrerade makten. Hans ledarskap präglades av strategisk tålamod och institutionsbyggande snarare än militär briljans.",
      en: "Augustus was a master of political pragmatism. He maintained the facade of the Republic while concentrating power. His leadership was characterized by strategic patience and institution-building rather than military brilliance.",
      tr: "Augustus siyasi pragmatizmin ustasıydı. Gücü yoğunlaştırırken Cumhuriyet cephesini korudu. Liderliği askeri dehadan çok stratejik sabır ve kurum inşası ile karakterize edildi.",
    },
    criticalPerspectives: {
      sv: "Kritiker framhåller att Augustus i praktiken avskaffade den romerska demokratin och etablerade en autokratisk stat. Hans proskriptioner under triumviratet ledde till tusentals dödsfall bland politiska motståndare.",
      en: "Critics highlight that Augustus effectively abolished Roman democracy and established an autocratic state. His proscriptions during the triumvirate led to thousands of deaths among political opponents.",
      tr: "Eleştirmenler Augustus'un Roma demokrasisini fiilen ortadan kaldırdığını ve otokratik bir devlet kurduğunu vurgular. Triumvirat dönemindeki proskrüpsiyonları siyasi muhaliflerin binlercesinin ölümüne yol açtı.",
    },
  },
  {
    id: "constantine", name: "Konstantin I", years: "272–337 e.Kr.",
    title: { sv: "Den store", en: "The Great", tr: "Büyük" },
    portrait: "✝️",
    bio: {
      sv: "Konstantin I var den förste kristne kejsaren och grundade Konstantinopel. Han legaliserade kristendomen genom Ediktet i Milano (313) och sammankallade det första konciliet i Nicaea (325).",
      en: "Constantine I was the first Christian emperor and founded Constantinople. He legalized Christianity through the Edict of Milan (313) and convened the First Council of Nicaea (325).",
      tr: "I. Konstantin, ilk Hristiyan imparator ve Konstantinopolis'in kurucusuydu. Milano Fermanı (313) ile Hristiyanlığı yasallaştırdı ve İznik Konsili'ni (325) topladı.",
    },
    reforms: {
      sv: ["Kristendomens legalisering", "Grundandet av Konstantinopel", "Solidus-guldmyntets införande", "Reorganisering av militären"],
      en: ["Legalization of Christianity", "Founding of Constantinople", "Introduction of the Solidus gold coin", "Military reorganization"],
      tr: ["Hristiyanlığın yasallaştırılması", "Konstantinopolis'in kurulması", "Solidus altın parasının tanıtılması", "Askeri reorganizasyon"],
    },
    campaigns: {
      sv: ["Slaget vid Milviska bron (312)", "Enandet av riket (324)", "Kampanjer mot goterna"],
      en: ["Battle of the Milvian Bridge (312)", "Unification of the empire (324)", "Campaigns against the Goths"],
      tr: ["Milvian Köprüsü Muharebesi (312)", "İmparatorluğun birleştirilmesi (324)", "Gotlara karşı seferler"],
    },
    leadershipStyle: {
      sv: "Konstantin kombinerade militär styrka med religiös vision. Han använde kristendomen strategiskt för att ena riket under en gemensam identitet. En pragmatisk reformator som inte tvekade att eliminera rivaler.",
      en: "Constantine combined military strength with religious vision. He strategically used Christianity to unite the empire under a common identity. A pragmatic reformer who did not hesitate to eliminate rivals.",
      tr: "Konstantin askeri gücü dini vizyonla birleştirdi. İmparatorluğu ortak bir kimlik altında birleştirmek için Hristiyanlığı stratejik olarak kullandı.",
    },
    criticalPerspectives: {
      sv: "Historiker debatterar om Konstantins omvändelse var äkta eller politisk. Han lät döpa sig först på dödsbädden. Hans handlingar — inklusive mordet på sin son Crispus — stod i kontrast till kristna ideal.",
      en: "Historians debate whether Constantine's conversion was genuine or political. He was only baptized on his deathbed. His actions — including the murder of his son Crispus — contrasted with Christian ideals.",
      tr: "Tarihçiler Konstantin'in din değiştirmesinin gerçek mi yoksa siyasi mi olduğunu tartışır. Sadece ölüm döşeğinde vaftiz edildi.",
    },
  },
];

// ===========================================
// ROMAN TERRITORIES – Förbättrade polygoner
// Ersätt hela romanTerritories i roman.ts
// ===========================================
 
const romanTerritories: TerritoryPeriod[] = [
  // ── ITALIA ──────────────────────────────────────────────────────────────
  {
    yearStart: -753, yearEnd: 476,
    label: { sv: "Italia", en: "Italia", tr: "İtalya" },
    color: "#8b0000",
    polygon: [[
      // Norra gränsen (Alperna)
      [44.4, 8.9],  [44.7, 8.2],  [45.0, 7.5],  [45.5, 7.0],  [45.9, 6.9],
      [46.2, 7.5],  [46.5, 8.2],  [46.5, 9.0],  [46.2, 9.5],  [46.0, 10.0],
      [46.5, 10.5], [46.5, 11.5], [46.8, 12.0], [46.6, 13.0], [46.0, 13.5],
      [45.8, 13.8], [45.5, 13.5], [45.2, 13.9], [44.9, 14.0],
      // Adriatiska kusten söderut
      [44.5, 14.5], [44.1, 15.1], [43.7, 16.2], [43.5, 16.5], [43.0, 17.5],
      [42.5, 18.0], [41.9, 18.5], [41.5, 19.5], [41.3, 19.5],
      // Vänder vid Dyrrachium-sidan och går söderut längs klacken
      [40.6, 17.9], [40.3, 17.5], [39.8, 18.5], [39.5, 16.5],
      [38.9, 16.5], [38.5, 15.9], [38.1, 15.6], [37.9, 15.7],
      // Toe of Italy
      [37.5, 15.1], [37.9, 15.2], [38.4, 15.6],
      // Tyrrenska kusten norrut
      [38.0, 13.0], [37.5, 13.5], [38.0, 12.5], [38.5, 12.5],
      [39.0, 12.0], [40.0, 12.0], [40.7, 12.0], [41.0, 12.1],
      [41.5, 11.8], [41.9, 12.5], [42.4, 11.2], [42.8, 10.9],
      [43.2, 10.5], [43.8, 10.2], [44.1, 9.4],  [44.4, 8.9],
    ]],
  },
 
  // ── SICILIA ──────────────────────────────────────────────────────────────
  {
    yearStart: -241, yearEnd: 476,
    label: { sv: "Sicilien", en: "Sicily", tr: "Sicilya" },
    color: "#a52a2a",
    polygon: [[
      [38.3, 12.3], [38.2, 12.8], [38.0, 13.3], [37.9, 13.8], [38.1, 14.3],
      [38.2, 14.8], [38.1, 15.2], [37.7, 15.6], [37.5, 15.1], [37.1, 15.1],
      [36.8, 15.0], [36.7, 14.5], [36.7, 13.5], [37.0, 12.8], [37.3, 12.3],
      [37.6, 12.0], [37.9, 12.0], [38.1, 12.1], [38.3, 12.3],
    ]],
  },
 
  // ── SARDINIA ─────────────────────────────────────────────────────────────
  {
    yearStart: -238, yearEnd: 476,
    label: { sv: "Sardinien", en: "Sardinia", tr: "Sardunya" },
    color: "#9b2222",
    polygon: [[
      [41.2, 9.6],  [40.9, 9.8],  [40.5, 9.8],  [40.0, 9.7],  [39.5, 9.6],
      [39.0, 9.3],  [38.8, 9.0],  [38.8, 8.5],  [39.0, 8.3],  [39.5, 8.2],
      [40.0, 8.2],  [40.5, 8.4],  [40.9, 8.7],  [41.1, 9.0],  [41.2, 9.4],
      [41.2, 9.6],
    ]],
  },
 
  // ── CORSICA ──────────────────────────────────────────────────────────────
  {
    yearStart: -238, yearEnd: 476,
    label: { sv: "Korsika", en: "Corsica", tr: "Korsika" },
    color: "#9b2222",
    polygon: [[
      [43.0, 9.3],  [42.7, 9.6],  [42.4, 9.5],  [42.0, 9.4],  [41.8, 9.1],
      [41.6, 8.8],  [41.8, 8.5],  [42.1, 8.5],  [42.5, 8.6],  [42.9, 9.0],
      [43.0, 9.3],
    ]],
  },
 
  // ── HISPANIA ─────────────────────────────────────────────────────────────
  {
    yearStart: -206, yearEnd: 476,
    label: { sv: "Hispanien", en: "Hispania", tr: "Hispanya" },
    color: "#a52a2a",
    polygon: [[
      // Pyrenéerna öst till väst
      [43.3, 3.2],  [43.1, 2.5],  [42.8, 1.8],  [42.7, 1.0],  [43.0, 0.0],
      [43.2, -0.8], [43.4, -1.8], [43.5, -2.5], [43.5, -3.5], [43.6, -4.5],
      [43.6, -5.5], [43.6, -6.5], [43.7, -7.5], [43.8, -7.9], [43.6, -8.2],
      // Atlantkusten söderut
      [42.8, -9.0], [42.0, -8.8], [41.5, -8.9], [41.0, -8.8],
      [40.5, -8.7], [40.0, -8.9], [39.5, -9.1], [38.7, -9.1],
      [38.0, -8.9], [37.5, -8.8], [37.0, -7.9], [36.8, -7.0],
      // Gibraltarsundet
      [36.4, -6.3], [36.0, -5.8], [36.0, -5.3], [36.1, -4.8],
      [36.3, -4.0], [36.5, -3.5], [36.7, -2.8], [36.8, -2.0],
      // Medelhavskysten norrut
      [37.3, -1.5], [37.6, -0.9], [38.0, -0.3], [38.5, 0.1],
      [39.0, 0.1],  [39.5, 0.4],  [40.0, 0.2],  [40.5, 0.6],
      [40.8, 0.9],  [41.1, 1.2],  [41.5, 1.7],  [41.8, 2.2],
      [42.1, 3.0],  [42.5, 3.2],  [43.0, 3.2],  [43.3, 3.2],
    ]],
  },
 
  // ── GALLIA ───────────────────────────────────────────────────────────────
  {
    yearStart: -50, yearEnd: 476,
    label: { sv: "Gallien", en: "Gallia", tr: "Galya" },
    color: "#cd5c5c",
    polygon: [[
      // Pyrenéerna och Medelhavet
      [43.3, 3.2],  [43.2, 4.0],  [43.3, 5.0],  [43.3, 5.4],  [43.5, 6.0],
      [43.7, 7.0],  [43.7, 7.3],  [44.0, 8.0],  [44.4, 8.9],
      // Alperna norrut
      [44.7, 8.2],  [45.0, 7.5],  [45.5, 7.0],  [45.9, 6.9],  [46.2, 7.5],
      [46.5, 8.2],  [47.0, 7.6],  [47.5, 7.6],  [47.8, 7.9],  [48.0, 8.2],
      // Rhenfloden söderut till Nordsjön
      [48.5, 9.5],  [49.0, 8.5],  [49.5, 8.0],  [50.0, 7.5],  [50.5, 6.8],
      [50.9, 6.9],  [51.2, 6.4],  [51.4, 5.5],  [51.5, 4.5],
      // Belgien och nordfrankrikes kust
      [51.2, 3.5],  [51.0, 2.8],  [50.8, 2.2],  [50.5, 1.5],  [50.2, 1.5],
      [49.8, 1.0],  [49.5, 0.5],  [49.0, -0.5], [48.5, -1.5], [48.2, -1.8],
      // Atlantkusten söderut
      [47.8, -2.2], [47.5, -2.5], [47.0, -2.8], [46.5, -2.0], [46.2, -1.8],
      [46.0, -1.5], [45.5, -1.0], [45.0, -0.8], [44.8, -1.2], [44.5, -1.5],
      [44.0, -1.5], [43.6, -1.8], [43.4, -1.8],
      // Pyrenéerna tillbaka
      [43.5, -1.0], [43.3, 0.0],  [43.1, 0.8],  [43.0, 1.5],  [43.3, 2.5],
      [43.3, 3.2],
    ]],
  },
 
  // ── BRITANNIA ────────────────────────────────────────────────────────────
  {
    yearStart: 43, yearEnd: 410,
    label: { sv: "Britannien", en: "Britannia", tr: "Britanya" },
    color: "#b22222",
    polygon: [[
      // Sydöst
      [51.1, 1.3],  [51.4, 1.4],  [51.8, 1.3],  [52.0, 1.7],  [52.5, 1.8],
      [52.9, 1.7],  [53.3, 0.5],  [53.7, 0.0],  [54.0, -1.1], [54.5, -1.5],
      // Hadrians mur (nordgräns ca 55°N)
      [55.0, -1.8], [55.2, -2.0], [55.0, -2.5], [54.8, -3.0], [54.5, -3.5],
      // Västkust söderut
      [54.0, -4.0], [53.5, -4.3], [53.3, -4.6], [52.8, -4.8], [52.5, -5.0],
      [52.0, -5.1], [51.6, -5.1], [51.4, -5.0], [51.0, -4.5], [50.7, -4.0],
      // Sydkusten
      [50.5, -4.8], [50.3, -5.3], [50.1, -5.7], [50.1, -5.0], [50.2, -4.2],
      [50.5, -3.5], [50.7, -2.5], [50.8, -1.5], [50.8, -0.5], [51.0, 0.5],
      [51.1, 1.3],
    ]],
  },
 
  // ── GRAECIA & ILLYRICUM ──────────────────────────────────────────────────
  {
    yearStart: -146, yearEnd: 476,
    label: { sv: "Grekland & Illyrien", en: "Graecia & Illyricum", tr: "Yunanistan & İllirya" },
    color: "#dc143c",
    polygon: [[
      // Norr från Trieste längs Adriatiska kusten
      [45.8, 13.8], [45.5, 14.5], [45.0, 15.0], [44.5, 15.5], [44.0, 16.0],
      [43.5, 17.0], [43.0, 17.5], [42.5, 18.2], [42.1, 18.5], [41.5, 19.5],
      [41.1, 19.8], [40.5, 20.0], [40.0, 20.0], [39.5, 20.5],
      // Epirus och Peloponnesos
      [39.0, 21.0], [38.5, 21.0], [38.0, 21.5], [37.8, 21.0], [37.3, 21.5],
      [36.9, 22.0], [36.6, 22.5], [36.4, 22.8],
      // Peloponnesos östra sida
      [37.0, 22.5], [37.5, 22.8], [37.9, 22.9], [38.0, 23.5], [38.0, 23.7],
      [38.3, 24.0], [38.7, 24.5], [39.0, 25.0], [39.5, 25.5],
      // Norra Egeiska kusten
      [40.0, 25.0], [40.5, 24.0], [40.6, 22.9], [41.0, 23.0],
      // Bulgarien/Makedonien
      [41.5, 23.5], [42.0, 23.0], [42.5, 23.5], [43.0, 23.0],
      [43.5, 22.5], [44.0, 22.5], [44.5, 22.0], [44.8, 20.5],
      // Serbien och Kroatien norrut
      [45.0, 19.5], [45.3, 18.5], [45.5, 17.5], [45.8, 16.5],
      [46.0, 15.5], [46.0, 14.5], [45.8, 13.8],
    ]],
  },
 
  // ── ASIA MINOR ───────────────────────────────────────────────────────────
  {
    yearStart: -133, yearEnd: 476,
    label: { sv: "Mindre Asien", en: "Asia Minor", tr: "Küçük Asya" },
    color: "#a52a2a",
    polygon: [[
      // Thrakien/Bosporus
      [41.7, 26.6], [41.2, 27.5], [40.5, 27.0], [40.2, 26.4],
      // Egeiska västkusten söderut
      [39.8, 26.0], [39.5, 26.5], [39.0, 26.7], [38.4, 27.0],
      [37.8, 27.2], [37.3, 27.0], [37.0, 27.3],
      // Sydkusten västerut
      [36.8, 28.0], [36.5, 28.5], [36.2, 29.5], [36.3, 30.0],
      [36.8, 30.5], [36.5, 31.5], [36.2, 32.5], [36.2, 33.5],
      [36.3, 34.5], [36.5, 35.5], [36.8, 36.2],
      // Östgränsen mot Syrien/Armenien
      [37.0, 36.5], [37.5, 37.0], [38.0, 37.5], [38.5, 38.0],
      [39.0, 38.5], [39.5, 38.0], [39.7, 37.0], [40.0, 36.5],
      [40.5, 37.0], [41.0, 37.5], [41.0, 39.5],
      // Svarta havskusten västerut
      [41.3, 39.0], [41.5, 38.0], [41.8, 37.0], [42.0, 36.0],
      [42.0, 35.0], [41.8, 34.0], [42.0, 33.0], [41.5, 32.0],
      [41.2, 31.0], [41.0, 30.0], [41.0, 29.0],
      // Tillbaka via Istanbul
      [41.3, 28.5], [41.5, 27.5], [41.7, 26.6],
    ]],
  },
 
  // ── SYRIA & JUDEA ────────────────────────────────────────────────────────
  {
    yearStart: -63, yearEnd: 476,
    label: { sv: "Syrien & Judéen", en: "Syria & Judea", tr: "Suriye & Yahudiye" },
    color: "#cd5c5c",
    polygon: [[
      // Antakya norrut längs Eufrat
      [36.8, 36.2], [36.5, 36.8], [36.2, 37.2], [36.0, 37.8],
      [35.5, 38.5], [35.0, 39.0], [34.5, 39.5], [34.0, 39.8],
      [33.5, 40.0], [33.0, 39.5], [32.5, 38.5], [32.0, 37.5],
      // Damaskus och söderut
      [33.5, 36.3], [33.2, 35.8], [32.5, 35.5], [31.8, 35.2],
      [31.5, 35.0], [30.8, 35.0], [30.0, 35.0], [29.5, 35.0],
      // Sinaihalvön
      [28.5, 34.5], [28.0, 33.8], [28.5, 33.0],
      [29.5, 32.5], [30.0, 32.5],
      // Medelhavskysten norrut
      [31.0, 33.5], [31.5, 34.0], [32.0, 34.5], [32.5, 34.5],
      [33.0, 35.0], [33.5, 35.5], [34.0, 35.8], [34.5, 36.0],
      [35.0, 36.2], [35.5, 36.2], [36.2, 36.2],
      [36.5, 36.5], [36.8, 36.2],
    ]],
  },
 
  // ── AEGYPTUS ─────────────────────────────────────────────────────────────
  {
    yearStart: -30, yearEnd: 476,
    label: { sv: "Egypten", en: "Aegyptus", tr: "Mısır" },
    color: "#8b0000",
    polygon: [[
      // Nil-delta och Alexandria
      [31.2, 29.9], [30.9, 30.5], [30.6, 31.0], [30.2, 31.5],
      [30.0, 32.5], [29.5, 32.8],
      // Sinai östsida
      [28.5, 33.5], [27.5, 34.0], [26.5, 34.5], [25.0, 35.0],
      [24.0, 35.5], [23.5, 35.0], [23.0, 34.0], [22.5, 33.0],
      // Nubisk gräns
      [22.0, 32.0], [22.0, 31.0], [22.0, 29.0], [22.0, 27.0],
      [22.0, 25.0],
      // Libyska gränsen norrut
      [24.0, 25.0], [26.0, 25.0], [28.0, 25.0], [30.0, 25.0],
      [31.5, 25.0], [31.2, 27.0], [31.2, 29.0], [31.2, 29.9],
    ]],
  },
 
  // ── AFRICA PROCONSULARIS ─────────────────────────────────────────────────
  {
    yearStart: -146, yearEnd: 439,
    label: { sv: "Afrika", en: "Africa", tr: "Afrika" },
    color: "#b22222",
    polygon: [[
      // Medelhavskysten från väst
      [36.8, -1.5], [36.8, 0.0],  [36.9, 2.0],  [36.8, 4.0],
      [36.5, 6.5],  [36.8, 8.0],  [36.8, 9.0],  [36.9, 10.2],
      [37.2, 10.5], [37.5, 11.0], [37.3, 12.0], [37.0, 13.0],
      [36.5, 13.5], [36.0, 14.5],
      // Leptis Magna och östkusten
      [32.6, 14.3], [32.1, 15.2], [32.0, 13.0], [31.5, 11.5],
      [31.0, 10.5], [30.5, 9.5],  [30.0, 9.0],  [29.5, 8.5],
      [29.0, 7.5],  [28.5, 7.0],  [28.5, 6.0],  [28.5, 5.0],
      // Saharavästgräns
      [29.0, 4.0],  [30.0, 3.0],  [31.0, 2.0],  [32.0, 1.0],
      [33.0, 0.5],  [34.0, 0.0],  [35.0, 0.5],  [36.0, 1.0],
      [36.5, 2.0],  [36.8, 3.5],  [36.8, -1.5],
    ]],
  },
 
  // ── DACIA ────────────────────────────────────────────────────────────────
  {
    yearStart: 106, yearEnd: 275,
    label: { sv: "Dacien", en: "Dacia", tr: "Dacia" },
    color: "#dc143c",
    polygon: [[
      [44.8, 20.5], [45.0, 21.0], [45.3, 21.5], [45.5, 22.0],
      [45.8, 22.5], [46.0, 23.0], [46.3, 23.5], [46.5, 24.0],
      [46.8, 24.5], [47.0, 25.0], [47.2, 25.5], [47.5, 26.0],
      [47.8, 26.5], [48.0, 26.0], [47.8, 25.0], [47.7, 24.0],
      [47.5, 23.0], [47.5, 22.0], [47.2, 21.5], [47.0, 21.0],
      [46.5, 20.5], [46.0, 20.0], [45.5, 20.0], [45.0, 20.0],
      [44.8, 20.5],
    ]],
  },
 
  // ── MESOPOTAMIA (kortvarig erövring 116–118 e.Kr.) ───────────────────────
  {
    yearStart: 116, yearEnd: 118,
    label: { sv: "Mesopotamien", en: "Mesopotamia", tr: "Mezopotamya" },
    color: "#8b0000",
    polygon: [[
      [36.8, 36.2], [36.5, 38.0], [36.0, 39.0], [35.5, 40.0],
      [35.0, 41.0], [34.5, 41.5], [34.0, 42.0], [33.5, 43.0],
      [33.3, 44.4], [32.5, 44.5], [31.5, 44.0], [31.0, 47.5],
      [30.5, 47.8], [31.0, 47.0], [31.5, 46.0], [32.0, 45.0],
      [32.5, 44.5], [33.0, 44.0], [33.5, 43.5], [34.0, 42.5],
      [34.5, 42.0], [35.0, 41.5], [35.5, 40.5], [36.0, 39.5],
      [36.5, 37.5], [36.8, 37.0], [36.8, 36.2],
    ]],
  },
];
 
const romanTradeRoutes: TradeRouteGeo[] = [
  {
    id: "via-appia",
    name: { sv: "Via Appia", en: "Via Appia", tr: "Via Appia" },
    yearActive: -312,
    path: [[41.9, 12.5], [41.0, 14.3], [40.6, 15.0], [40.3, 16.0], [40.0, 17.0]],
  },
  {
    id: "grain-route",
    name: { sv: "Spannmålsrutten", en: "Grain Route", tr: "Tahıl Yolu" },
    yearActive: -30,
    path: [[30.0, 31.0], [33.0, 28.0], [35.0, 24.0], [38.0, 16.0], [41.9, 12.5]],
  },
  {
    id: "silk-road-roman",
    name: { sv: "Sidenvägen (väst)", en: "Silk Road (West)", tr: "İpek Yolu (Batı)" },
    yearActive: -50,
    path: [[38.5, 36.0], [37.0, 40.0], [35.0, 44.0], [33.0, 48.0]],
  },
];

export const romanEmpire: EmpireConfig = {
  id: "roman",
  name: { sv: "Romerska riket", en: "Roman Empire", tr: "Roma İmparatorluğu" },
  theme: "roman",
  appTitle: "Roman Intelligence",
  crestImage: romanEagle,
  backgroundImage: colosseum,
  leaderTitle: { sv: "Kejsare", en: "Emperor", tr: "İmparator" },
  dynastyTitle: { sv: "Romersk Dynasti", en: "Roman Dynasty", tr: "Roma Hanedanı" },
  timeline: romanTimeline,
  leaders: romanLeaders,
  profiles: romanProfiles,
  figures: romanFigures,
  quizQuestions: romanQuizQuestions,
  badges: romanBadges,
  territories: romanTerritories,
  tradeRoutes: romanTradeRoutes,
  mapCenter: [41, 15],
  mapZoom: 4,
  yearRange: [-753, 476],
  yearDefault: 117,
  chatSystemContext: "the Roman Empire (753 BC – 476 AD). You are an expert on Roman history, the Republic, the Principate, military campaigns, culture, law, and the fall of the Western Empire.",
  chatPlaceholders: {
    sv: "Ställ en fråga om Romerska riket...",
    en: "Ask a question about the Roman Empire...",
    tr: "Roma İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: ["Varför föll Västromska riket?", "Berätta om Augustus och Pax Romana", "Hur fungerade det romerska senatssystemet?"],
    en: ["Why did the Western Roman Empire fall?", "Tell me about Augustus and the Pax Romana", "How did the Roman Senate system work?"],
    tr: ["Batı Roma İmparatorluğu neden çöktü?", "Augustus ve Pax Romana hakkında bilgi verin", "Roma Senatosu sistemi nasıl işliyordu?"],
  },
  homeDescription: {
    sv: "Utforska Romerska rikets historia (753 f.Kr.–476 e.Kr.) med AI-driven analys, tidslinje, kartor och quiz.",
    en: "Explore Roman Empire history (753 BC–476 AD) with AI-driven analysis, timeline, maps and quiz.",
    tr: "Roma İmparatorluğu tarihini (MÖ 753–MS 476) AI destekli analiz ile keşfedin.",
  },
  mapTitle: { sv: "Romerska rikets territorium", en: "Roman Empire Territory", tr: "Roma İmparatorluğu Toprakları" },
};
