import type { LatLngExpression } from "leaflet";
import type { EmpireConfig, TimelineEvent, Sultan, QuizQuestion, Badge, HistoricalProfile, TerritoryPeriod, TradeRouteGeo } from "./types";
import { romanFigures } from "@/data/figures";
import romanEagle from "@/assets/roman-eagle.jpg";
import colosseum from "@/assets/colosseum.jpg";

const romanTimeline: TimelineEvent[] = [
  {
    year: -753, title: { sv: "Roms grundande", en: "Founding of Rome", tr: "Roma'nın Kuruluşu" },
    summary: { sv: "Enligt legenden grundade Romulus staden Rom på Palatinen efter att ha dödat sin bror Remus.", en: "According to legend, Romulus founded the city of Rome on the Palatine Hill after killing his brother Remus.", tr: "Efsaneye göre Romulus, kardeşi Remus'u öldürdükten sonra Palatin Tepesi'nde Roma şehrini kurdu." },
    figures: ["Romulus", "Remus"], consequences: { sv: "En ny stadsstat etablerades vid Tibern.", en: "A new city-state was established on the Tiber.", tr: "Tiber Nehri kıyısında yeni bir şehir devleti kuruldu." },
    impact: { sv: "Lade grunden för världens mest inflytelserika civilisation.", en: "Laid the foundation for the world's most influential civilization.", tr: "Dünyanın en etkili uygarlığının temelini attı." },
  },
  {
    year: -509, title: { sv: "Republikens grundande", en: "Founding of the Republic", tr: "Cumhuriyetin Kuruluşu" },
    summary: { sv: "Romarna störtade den siste kungen Tarquinius Superbus och inrättade den Romerska republiken med valda konsuler.", en: "The Romans overthrew the last king Tarquinius Superbus and established the Roman Republic with elected consuls.", tr: "Romalılar son kral Tarquinius Superbus'u devirdi ve seçilmiş konsüllerle Roma Cumhuriyeti'ni kurdu." },
    figures: ["Lucius Junius Brutus", "Tarquinius Superbus"], consequences: { sv: "Monarkin ersattes av ett komplext republikanskt system.", en: "Monarchy was replaced by a complex republican system.", tr: "Monarşi karmaşık bir cumhuriyet sistemiyle değiştirildi." },
    impact: { sv: "Skapade modellen för västerländsk demokrati och konstitutionalism.", en: "Created the model for Western democracy and constitutionalism.", tr: "Batı demokrasisi ve anayasacılık modeli yarattı." },
  },
  {
    year: -264, title: { sv: "Första puniska kriget", en: "First Punic War", tr: "Birinci Pön Savaşı" },
    summary: { sv: "Rom inledde den första av tre stora konflikter med Kartago om kontrollen över västra Medelhavet.", en: "Rome began the first of three major conflicts with Carthage over control of the western Mediterranean.", tr: "Roma, batı Akdeniz kontrolü için Kartaca ile üç büyük çatışmanın ilkini başlattı." },
    figures: ["Gaius Duilius", "Hamilcar Barca"], consequences: { sv: "Rom vann Sicilien, sin första provins utanför Italien.", en: "Rome won Sicily, its first province outside Italy.", tr: "Roma, İtalya dışındaki ilk eyaleti Sicilya'yı kazandı." },
    impact: { sv: "Förvandlade Rom från en landmakt till en sjömakt.", en: "Transformed Rome from a land power into a naval power.", tr: "Roma'yı kara gücünden deniz gücüne dönüştürdü." },
  },
  {
    year: -44, title: { sv: "Julius Caesars mord", en: "Assassination of Julius Caesar", tr: "Julius Caesar'ın Öldürülmesi" },
    summary: { sv: "Julius Caesar, diktator på livstid, mördades av en grupp senatorer på Idus Martiae (15 mars) i Pompejusteatern.", en: "Julius Caesar, dictator for life, was assassinated by a group of senators on the Ides of March (March 15) in the Theatre of Pompey.", tr: "Ömür boyu diktatör Julius Caesar, Mart'ın İdleri'nde (15 Mart) Pompeius Tiyatrosu'nda bir grup senatör tarafından öldürüldü." },
    figures: ["Julius Caesar", "Marcus Brutus", "Gaius Cassius"], consequences: { sv: "Utlöste ett inbördeskrig som slutligen avslutade republiken.", en: "Triggered a civil war that ultimately ended the Republic.", tr: "Sonuçta Cumhuriyeti sona erdiren bir iç savaşı tetikledi." },
    impact: { sv: "Markerade övergången från republik till kejsardöme.", en: "Marked the transition from Republic to Empire.", tr: "Cumhuriyetten İmparatorluğa geçişi işaret etti." },
  },
  {
    year: -27, title: { sv: "Augustus blir kejsare", en: "Augustus Becomes Emperor", tr: "Augustus İmparator Olur" },
    summary: { sv: "Octavianus tog titeln Augustus och blev Roms förste kejsare, vilket inledde Pax Romana — en 200-årig period av fred och stabilitet.", en: "Octavian took the title Augustus and became Rome's first emperor, beginning the Pax Romana — a 200-year period of peace and stability.", tr: "Octavianus, Augustus unvanını aldı ve Roma'nın ilk imparatoru oldu; 200 yıllık barış ve istikrar dönemi Pax Romana'yı başlattı." },
    figures: ["Augustus", "Marcus Agrippa"], consequences: { sv: "Principatet etablerades som styrelsesystem.", en: "The Principate was established as the system of government.", tr: "Prensipat yönetim sistemi olarak kuruldu." },
    impact: { sv: "Inledde Roms guldålder och imperiets största expansion.", en: "Began Rome's golden age and the empire's greatest expansion.", tr: "Roma'nın altın çağını ve imparatorluğun en büyük genişlemesini başlattı." },
  },
  {
    year: 79, title: { sv: "Vesuvius utbrott", en: "Eruption of Vesuvius", tr: "Vezüv Yanardağı Patlaması" },
    summary: { sv: "Vesuvius vulkanutbrott begravde städerna Pompeji och Herculaneum under aska och lava.", en: "The eruption of Mount Vesuvius buried the cities of Pompeii and Herculaneum under ash and lava.", tr: "Vezüv Yanardağı'nın patlaması Pompeii ve Herculaneum şehirlerini kül ve lav altında gömdü." },
    figures: ["Plinius den äldre", "Titus"], consequences: { sv: "Två blomstrande städer förstördes fullständigt.", en: "Two thriving cities were completely destroyed.", tr: "İki gelişen şehir tamamen yok edildi." },
    impact: { sv: "Bevarade en unik bild av romerskt vardagsliv för eftervärlden.", en: "Preserved a unique snapshot of Roman daily life for posterity.", tr: "Roma günlük yaşamının eşsiz bir kesitini gelecek nesiller için korudu." },
  },
  {
    year: 117, title: { sv: "Rikets maximala utsträckning", en: "Empire at Maximum Extent", tr: "İmparatorluğun En Geniş Sınırları" },
    summary: { sv: "Under kejsar Trajanus nådde Romerska riket sin maximala geografiska utsträckning, från Britannien till Mesopotamien.", en: "Under Emperor Trajan, the Roman Empire reached its maximum geographical extent, from Britain to Mesopotamia.", tr: "İmparator Traianus döneminde Roma İmparatorluğu, Britanya'dan Mezopotamya'ya en geniş coğrafi sınırlarına ulaştı." },
    figures: ["Trajanus"], consequences: { sv: "Riket sträckte sig över tre kontinenter.", en: "The empire spanned three continents.", tr: "İmparatorluk üç kıtaya yayıldı." },
    impact: { sv: "Definierade gränserna som efterföljande kejsare försökte försvara.", en: "Defined the borders that subsequent emperors tried to defend.", tr: "Sonraki imparatorların savunmaya çalıştığı sınırları belirledi." },
  },
  {
    year: 284, title: { sv: "Diocletianus reformer", en: "Diocletian's Reforms", tr: "Diocletianus Reformları" },
    summary: { sv: "Diocletianus reformerade rikets administration genom att skapa Tetrarkiet — delningen av makten mellan fyra kejsare.", en: "Diocletian reformed the empire's administration by creating the Tetrarchy — dividing power among four emperors.", tr: "Diocletianus, Tetrarşi'yi kurarak imparatorluğun yönetimini reform etti — gücü dört imparator arasında böldü." },
    figures: ["Diocletianus"], consequences: { sv: "Riket delades i administrativa regioner.", en: "The empire was divided into administrative regions.", tr: "İmparatorluk idari bölgelere ayrıldı." },
    impact: { sv: "Lade grunden för den slutliga delningen i Väst- och Östrom.", en: "Laid the groundwork for the eventual East-West split.", tr: "Doğu-Batı ayrılığının temelini attı." },
  },
  {
    year: 313, title: { sv: "Ediktet i Milano", en: "Edict of Milan", tr: "Milano Fermanı" },
    summary: { sv: "Konstantin I och Licinius utfärdade Ediktet i Milano som garanterade religionsfrihet i hela riket, vilket legaliserade kristendomen.", en: "Constantine I and Licinius issued the Edict of Milan guaranteeing religious freedom throughout the empire, legalizing Christianity.", tr: "I. Konstantin ve Licinius, imparatorluk genelinde din özgürlüğünü garanti eden ve Hristiyanlığı yasallaştıran Milano Fermanı'nı yayınladı." },
    figures: ["Konstantin I", "Licinius"], consequences: { sv: "Kristendomen gick från förföljd religion till statsreligion.", en: "Christianity went from persecuted religion to state religion.", tr: "Hristiyanlık zulüm gören dinden devlet dinine geçti." },
    impact: { sv: "Förändrade Europas religiösa och kulturella landskap permanent.", en: "Permanently changed Europe's religious and cultural landscape.", tr: "Avrupa'nın dini ve kültürel manzarasını kalıcı olarak değiştirdi." },
  },
  {
    year: 330, title: { sv: "Konstantinopels grundande", en: "Founding of Constantinople", tr: "Konstantinopolis'in Kuruluşu" },
    summary: { sv: "Konstantin I grundade den nya huvudstaden Konstantinopel (det forna Byzantion) som östra rikets centrum.", en: "Constantine I founded the new capital Constantinople (formerly Byzantium) as the center of the eastern empire.", tr: "I. Konstantin, doğu imparatorluğunun merkezi olarak yeni başkent Konstantinopolis'i (eski Byzantion) kurdu." },
    figures: ["Konstantin I"], consequences: { sv: "Maktens centrum flyttades österut.", en: "The center of power shifted eastward.", tr: "Güç merkezi doğuya kaydı." },
    impact: { sv: "Konstantinopel överlevde Västrom med tusen år.", en: "Constantinople outlasted the Western Empire by a thousand years.", tr: "Konstantinopolis, Batı Roma'dan bin yıl daha uzun yaşadı." },
  },
  {
    year: 395, title: { sv: "Rikets delning", en: "Division of the Empire", tr: "İmparatorluğun Bölünmesi" },
    summary: { sv: "Efter Theodosius I:s död delades Romerska riket permanent i Västromska riket och Östromska riket (Bysans).", en: "After the death of Theodosius I, the Roman Empire was permanently divided into the Western and Eastern (Byzantine) Roman Empires.", tr: "I. Theodosius'un ölümünden sonra Roma İmparatorluğu kalıcı olarak Batı ve Doğu (Bizans) Roma İmparatorluklarına bölündü." },
    figures: ["Theodosius I", "Honorius", "Arcadius"], consequences: { sv: "Två separata kejsardömen med egna arméer och administration.", en: "Two separate empires with their own armies and administration.", tr: "Kendi orduları ve yönetimleriyle iki ayrı imparatorluk." },
    impact: { sv: "Västrom föll inom ett sekel; Östrom varade till 1453.", en: "The Western Empire fell within a century; the Eastern lasted until 1453.", tr: "Batı Roma bir yüzyıl içinde düştü; Doğu Roma 1453'e kadar sürdü." },
  },
  {
    year: 476, title: { sv: "Västromska rikets fall", en: "Fall of the Western Roman Empire", tr: "Batı Roma İmparatorluğu'nun Çöküşü" },
    summary: { sv: "Den germanske ledaren Odoaker avsatte den siste västromerske kejsaren Romulus Augustulus, vilket markerade slutet på antiken.", en: "The Germanic leader Odoacer deposed the last Western Roman emperor Romulus Augustulus, marking the end of antiquity.", tr: "Germen lider Odoaker, son Batı Roma imparatoru Romulus Augustulus'u tahttan indirdi ve antik çağın sonunu işaret etti." },
    figures: ["Romulus Augustulus", "Odoaker"], consequences: { sv: "Västeuropa fragmenterades i germanska kungariken.", en: "Western Europe fragmented into Germanic kingdoms.", tr: "Batı Avrupa Germen krallıklarına parçalandı." },
    impact: { sv: "Inledde tidig medeltid i Europa. Romerskt arv levde vidare i lag, språk och kultur.", en: "Began the Early Middle Ages in Europe. Roman legacy lived on in law, language, and culture.", tr: "Avrupa'da Erken Orta Çağ'ı başlattı. Roma mirası hukuk, dil ve kültürde yaşamaya devam etti." },
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
// ROMAN TERRITORIES – Shared border vertices
// Adjacent provinces share exact coordinates
// ===========================================

// Shared border points
const ROME: LatLngExpression = [41.9, 12.5];
const NAPLES: LatLngExpression = [40.8, 14.3];
const BRINDISI: LatLngExpression = [40.6, 17.9];
const RIMINI: LatLngExpression = [44.1, 12.6];
const GENOA: LatLngExpression = [44.4, 8.9];
const NICE: LatLngExpression = [43.7, 7.3];
const MASSILIA: LatLngExpression = [43.3, 5.4];
const NARBONNE: LatLngExpression = [43.2, 3.0];
const LUGDUNUM: LatLngExpression = [45.8, 4.8];
const LUTETIA: LatLngExpression = [48.9, 2.3];
const COLONIA: LatLngExpression = [50.9, 6.9];
const LONDINIUM: LatLngExpression = [51.5, -0.1];
const EBURACUM: LatLngExpression = [53.9, -1.1];
const TARRACO: LatLngExpression = [41.1, 1.2];
const CARTHAGO_NOVA: LatLngExpression = [37.6, -1.0];
const GADES: LatLngExpression = [36.5, -6.3];
const EMERITA: LatLngExpression = [38.9, -6.3];
const OLISIPO: LatLngExpression = [38.7, -9.1];
const R_THESSALONIKI: LatLngExpression = [40.6, 22.9];
const R_ATHENS: LatLngExpression = [38.0, 23.7];
const CORINTH: LatLngExpression = [37.9, 22.9];
const DYRRACHIUM: LatLngExpression = [41.3, 19.5];
const EPHESUS: LatLngExpression = [38.0, 27.3];
const ANCYRA: LatLngExpression = [39.9, 32.9];
const ANTIOCH: LatLngExpression = [36.2, 36.2];
const TARSUS: LatLngExpression = [37.0, 34.9];
const R_DAMASCUS: LatLngExpression = [33.5, 36.3];
const R_JERUSALEM: LatLngExpression = [31.8, 35.2];
const PETRA: LatLngExpression = [30.3, 35.5];
const ALEXANDRIA: LatLngExpression = [31.2, 29.9];
const MEMPHIS: LatLngExpression = [29.9, 31.2];
const R_ASWAN: LatLngExpression = [24.0, 32.9];
const CARTHAGE: LatLngExpression = [36.9, 10.3];
const LEPTIS: LatLngExpression = [32.6, 14.3];
const SARMIZEGETUSA: LatLngExpression = [45.5, 23.3];
const SINGIDUNUM: LatLngExpression = [44.8, 20.5];
const AQUINCUM: LatLngExpression = [47.5, 19.0];

const romanTerritories: TerritoryPeriod[] = [
  // Italia – connects to Gallia at Nice/Genoa, to Graecia via Adriatic coast
  {
    yearStart: -753, yearEnd: 476, label: { sv: "Italia", en: "Italia", tr: "İtalya" }, color: "#8b0000",
    polygon: [[
      GENOA, NICE, [44.0, 8.0], RIMINI,
      [43.5, 13.6], [42.5, 14.0], NAPLES, [39.5, 16.5],
      [38.1, 15.6], [37.5, 15.1], [38.0, 13.0],
      [38.5, 12.5], [40.0, 12.0], ROME, [43.0, 10.0],
    ]],
  },
  // Hispania – connects to Gallia at Narbonne/Pyrenees
  {
    yearStart: -218, yearEnd: 476, label: { sv: "Hispanien", en: "Hispania", tr: "Hispanya" }, color: "#a52a2a",
    polygon: [[
      NARBONNE, TARRACO, [41.5, 2.0], [42.8, 3.0],
      [43.3, 0.0], [43.5, -1.8], [43.3, -3.5], [43.5, -8.0],
      OLISIPO, [37.0, -9.0], GADES,
      [36.0, -5.5], [36.7, -2.5], CARTHAGO_NOVA,
      [38.0, 0.0], [39.5, 0.0],
    ]],
  },
  // Gallia – connects to Italia at Nice, to Hispania at Narbonne, to Britannia via channel
  {
    yearStart: -50, yearEnd: 476, label: { sv: "Gallien", en: "Gallia", tr: "Galya" }, color: "#cd5c5c",
    polygon: [[
      NARBONNE, MASSILIA, NICE, GENOA,
      [46.0, 6.5], [47.0, 7.5], COLONIA,
      [50.5, 4.0], [50.0, 1.5], [48.5, -1.5],
      [47.5, -3.0], [46.0, -1.5], [45.0, -1.0],
      [43.3, -1.8], [43.3, 0.0], [42.8, 3.0],
    ]],
  },
  // Britannia – island
  {
    yearStart: 43, yearEnd: 410, label: { sv: "Britannien", en: "Britannia", tr: "Britanya" }, color: "#b22222",
    polygon: [[
      LONDINIUM, [51.0, 1.3], [52.5, 1.7], [53.0, 0.0],
      EBURACUM, [55.0, -2.0], [55.5, -4.5],
      [54.0, -5.5], [53.0, -4.5], [52.0, -5.0],
      [51.5, -5.0], [51.0, -3.5], [50.5, -1.5], [50.8, 0.0],
    ]],
  },
  // Graecia – connects to Asia Minor at Bosporus area, to Dacia at north, to Italia via Adriatic
  {
    yearStart: -146, yearEnd: 476, label: { sv: "Grekland & Illyrien", en: "Graecia & Illyricum", tr: "Yunanistan & İllirya" }, color: "#dc143c",
    polygon: [[
      DYRRACHIUM, SINGIDUNUM, [44.5, 22.0],
      [43.5, 23.5], R_THESSALONIKI, [40.5, 24.0],
      [39.5, 25.5], R_ATHENS, CORINTH,
      [36.4, 22.8], [37.8, 21.0], [38.5, 20.5],
      [40.0, 19.0],
    ]],
  },
  // Asia Minor – connects to Graecia at Aegean, to Syria at Antioch
  {
    yearStart: -133, yearEnd: 476, label: { sv: "Mindre Asien", en: "Asia Minor", tr: "Küçük Asya" }, color: "#a52a2a",
    polygon: [[
      [40.5, 24.0], [41.0, 27.0], [41.5, 29.0],
      [42.0, 31.0], [42.0, 35.0], [41.0, 39.5],
      [40.0, 40.0], ANCYRA, TARSUS, ANTIOCH,
      [36.2, 34.0], [36.8, 30.5], EPHESUS, [39.5, 25.5],
    ]],
  },
  // Syria & Judea – connects to Asia Minor at Antioch, to Egypt at Sinai
  {
    yearStart: -63, yearEnd: 476, label: { sv: "Syrien & Judéen", en: "Syria & Judea", tr: "Suriye & Yahudiye" }, color: "#cd5c5c",
    polygon: [[
      ANTIOCH, [36.5, 38.0], [35.5, 40.0],
      [34.5, 40.5], [33.0, 38.0], R_DAMASCUS,
      R_JERUSALEM, PETRA, [29.5, 35.0],
      [28.0, 33.8], [30.0, 32.5], [31.5, 34.0],
      [32.5, 34.5], [34.0, 35.0], TARSUS, [36.2, 34.0],
    ]],
  },
  // Aegyptus – connects to Syria at Sinai
  {
    yearStart: -30, yearEnd: 476, label: { sv: "Egypten", en: "Aegyptus", tr: "Mısır" }, color: "#8b0000",
    polygon: [[
      [30.0, 32.5], [28.0, 33.8],
      [27.0, 34.5], [25.0, 35.0], R_ASWAN, [22.0, 36.5],
      [22.0, 31.0], [24.5, 29.0], [27.0, 26.0],
      [29.5, 25.0], [31.5, 25.0], ALEXANDRIA, MEMPHIS,
    ]],
  },
  // Africa – connects to nothing directly (separated by sea), but close to Italia
  {
    yearStart: -146, yearEnd: 439, label: { sv: "Afrika", en: "Africa", tr: "Afrika" }, color: "#b22222",
    polygon: [[
      CARTHAGE, [37.0, 10.0], [36.5, 8.5],
      [35.0, 8.0], [33.0, 8.0], [32.0, 9.5],
      [31.5, 11.0], LEPTIS, [33.0, 16.0],
      [33.5, 12.0], [34.5, 11.0], [35.5, 10.5],
    ]],
  },
  // Dacia – connects to Graecia/Illyricum at Singidunum
  {
    yearStart: 106, yearEnd: 275, label: { sv: "Dacien", en: "Dacia", tr: "Dacia" }, color: "#dc143c",
    polygon: [[
      SINGIDUNUM, [44.5, 22.0], [43.5, 23.5],
      [44.0, 25.0], [45.0, 26.5], SARMIZEGETUSA,
      [46.5, 25.0], [47.0, 23.0], [46.5, 21.0],
      AQUINCUM,
    ]],
  },
];

const romanTradeRoutes: TradeRouteGeo[] = [
  {
    id: "via-appia", name: { sv: "Via Appia", en: "Via Appia", tr: "Via Appia" }, yearActive: -312,
    path: [[41.9, 12.5], [41.0, 14.3], [40.6, 15.0], [40.3, 16.0], [40.0, 17.0]],
  },
  {
    id: "grain-route", name: { sv: "Spannmålsrutten", en: "Grain Route", tr: "Tahıl Yolu" }, yearActive: -30,
    path: [[30.0, 31.0], [33.0, 28.0], [35.0, 24.0], [38.0, 16.0], [41.9, 12.5]],
  },
  {
    id: "silk-road-roman", name: { sv: "Sidenvägen (väst)", en: "Silk Road (West)", tr: "İpek Yolu (Batı)" }, yearActive: -50,
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
