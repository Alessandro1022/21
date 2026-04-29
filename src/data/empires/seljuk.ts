import seljukBg from "@/assets/seljuk.jpg";
import seljukLogo from "@/assets/seljuk2.jpg";
import type {
  EmpireConfig,
  TimelineEvent,
  Sultan,
  QuizQuestion,
  Badge,
  HistoricalProfile,
  TerritoryPeriod,
  TradeRouteGeo,
  Story,
} from "./types";

// =============================================================================
// TIMELINE — Seljuk Empire (1037–1194 AD) — 21 major events
// =============================================================================

const seljukTimeline: TimelineEvent[] = [
  {
    year: 985,
    title: {
      sv: "Seljuk ibn Duqaq — Stammens grundare leder folket till nya marker",
      en: "Seljuk ibn Duqaq — The Tribe's Founder Leads the People to New Lands",
      tr: "Selçuk ibn Duqaq — Aşiretin Kurucusu Halkı Yeni Topraklara Götürüyor",
    },
    summary: {
      sv: "Seljuk ibn Duqaq, en officer i Oghuz-stamförbundets armé under Khazarernas välde vid Aralsjöns strand, bryter med sin herre och leder sin familj och anhängare söderut mot Transoxiana — det land mellan Amu Darya och Syr Darya som araberna kallade Ma Wara al-Nahr. Legenden berättar att Seljuk omvände sig till islam efter att ha haft visioner och djupa andliga upplevelser — en konversion som var strategisk lika mycket som andlig: den öppnade dörrarna till de välmående islamiska städerna och legitimerade hans ledarskap bland muslimska undersåtar. I Jend, en stad vid Syr Daryas strand, etablerar Seljuk sin stam och tar kontakt med det islamiska lärdomscentrat. Härifrån börjar den episka berättelsen om hur en nomadisk herdestam från de centralasiatiska stäpperna skulle transformeras till härskare över ett av medeltidens mäktigaste imperier.",
      en: "Seljuk ibn Duqaq, an officer in the Oghuz tribal confederation's army under the Khazars near the Aral Sea shore, breaks with his lord and leads his family and followers southward toward Transoxiana — the land between the Amu Darya and Syr Darya rivers that the Arabs called Ma Wara al-Nahr. Legend tells that Seljuk converted to Islam after visions and deep spiritual experiences — a conversion that was as strategic as it was spiritual: it opened the doors to the prosperous Islamic cities and legitimised his leadership among Muslim subjects. In Jend, a city on the Syr Darya's bank, Seljuk establishes his tribe and makes contact with the Islamic centre of learning. From here begins the epic story of how a nomadic herding tribe from the Central Asian steppes would transform into rulers of one of the medieval world's most powerful empires.",
      tr: "Selçuk ibn Duqaq, Oğuz kabile birliği ordusundaki bir subay, beyleriyle arasını bozarak ailesini ve destekçilerini Maveraünnehir'e doğru götürür. Selçuk, İslam'a geçiş yapar — bu geçiş hem manevi hem de stratejikti. Syr Derya kıyısındaki Cend şehrinden Selçuklu İmparatorluğu'nun destansı hikayesi başlar.",
    },
    figures: ["Seljuk ibn Duqaq", "Arslan Isra'il", "Mikail ibn Seljuk"],
    consequences: {
      sv: "Seljuk-stammen etableras i Transoxiana och konverterar till sunnitisk islam.",
      en: "The Seljuk tribe establishes itself in Transoxiana and converts to Sunni Islam.",
      tr: "Selçuk aşireti Maveraünnehir'e yerleşir ve Sünni İslam'a geçer.",
    },
    impact: {
      sv: "Grunden för Seljuk-dynastins kommande storhet läggs.",
      en: "The foundation for the Seljuk dynasty's coming greatness is laid.",
      tr: "Selçuk hanedanının gelecekteki büyüklüğünün temeli atılır.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1025,
    title: {
      sv: "Seljukernas tjänst under Ghaznavid-imperiet — Kraften samlas",
      en: "Seljuks Serve the Ghaznavid Empire — The Power Gathers",
      tr: "Selçuklar Gazneli İmparatorluğu'na Hizmet Ediyor — Güç Biriktirilir",
    },
    summary: {
      sv: "Sultan Mahmud av Ghazna — en av medeltidens mäktigaste härskare och den man som erövrade nordvästra Indien 17 gånger — tillåter Seljukernas Arslan Isra'il och hans stammar att bosätta sig i Khurasan som federerade allierade. Det är ett fatalt misstag. Seljukerna är inte lydiga undersåtar — de är en hungrig militärmakt i väntan på sin chans. Snart börjar de plundra och expandera långt utöver de gränser Mahmud satt. Han svarar med att fängsla Arslan Isra'il, men Seljukerna slutar inte. Under Tugrils och Chagrys ledarskap samlar stammen styrka, allierar sig med missnöjda element och väntar på rätt ögonblick att utmana Ghaznavid-väldet och skapa sitt eget imperium.",
      en: "Sultan Mahmud of Ghazna — one of the medieval world's most powerful rulers and the man who conquered northwestern India 17 times — allows the Seljuks' Arslan Isra'il and his tribes to settle in Khurasan as federated allies. It is a fatal mistake. The Seljuks are not obedient subjects — they are a hungry military power waiting for their chance. Soon they begin raiding and expanding far beyond the limits Mahmud set. He responds by imprisoning Arslan Isra'il, but the Seljuks do not stop. Under Tughril's and Chaghry's leadership the tribe gathers strength, allies with discontented elements and waits for the right moment to challenge Ghaznavid rule and create their own empire.",
      tr: "Gazne Sultanı Mahmud, Selçukların Horasan'a yerleşmesine izin verir. Bu ölümcül bir hata olur. Selçuklar itaatkar tebaalar değil, fırsatlarını bekleyen aç bir askeri güçtür. Tuğrul ve Çağrı'nın önderliğinde aşiret güç toplar.",
    },
    figures: ["Sultan Mahmud of Ghazna", "Arslan Isra'il", "Tughril Beg", "Chaghry Beg"],
    consequences: {
      sv: "Seljukerna etableras i Khurasan men friktioner med Ghaznaviderna ökar.",
      en: "Seljuks establish themselves in Khurasan but frictions with Ghaznavids increase.",
      tr: "Selçuklar Horasan'a yerleşir ancak Gaznelilerle sürtüşmeler artar.",
    },
    impact: {
      sv: "Konfrontationen med Ghaznaviderna är oundviklig.",
      en: "Confrontation with the Ghaznavids is inevitable.",
      tr: "Gaznelilerle çatışma kaçınılmazdır.",
    },
    category: "politics",
    importance: "medium",
  },
  {
    year: 1037,
    title: {
      sv: "Seljukernas självständighetsförklaring — Imperiet föds",
      en: "Seljuk Declaration of Independence — The Empire is Born",
      tr: "Selçukların Bağımsızlık İlanı — İmparatorluk Doğuyor",
    },
    summary: {
      sv: "Tughril Beg och hans bror Chaghry Beg utropar sin självständighet från Ghaznavid-imperiet och tar kontroll över Merv och Nishapur — två av Khurasans viktigaste städer. Detta är en revolutionär handling. Inte sedan arabernas ursprungliga erövring av Centralasien har en icke-arabisk makt erövrat dessa städer. Seljukerna tar inte bara territorium — de tar städerna med dess lärda, bibliotek, mosképredikanter och administratörer. De förstår att imperiebyggande kräver mer än militär kraft: det kräver att man absorberar den civilisation man erövrar. Tughril och Chaghry delar strategiskt imperiet mellan sig: Tughril i väster mot Persien och Irak, Chaghry i öster mot Centralasien och Afghanistan. Det seljukiska imperiet är officiellt fött.",
      en: "Tughril Beg and his brother Chaghry Beg declare independence from the Ghaznavid Empire and take control of Merv and Nishapur — two of Khurasan's most important cities. This is a revolutionary act. Not since the Arabs' original conquest of Central Asia has a non-Arab power captured these cities. The Seljuks do not merely take territory — they take the cities with their scholars, libraries, mosque preachers and administrators. They understand that empire-building requires more than military force: it requires absorbing the civilisation one conquers. Tughril and Chaghry strategically divide the empire between them: Tughril in the west toward Persia and Iraq, Chaghry in the east toward Central Asia and Afghanistan. The Seljuk Empire is officially born.",
      tr: "Tuğrul Bey ve kardeşi Çağrı Bey, Gazneli İmparatorluğu'ndan bağımsızlıklarını ilan ederek Merv ve Nişabur'un kontrolünü alır. Selçuk İmparatorluğu resmen doğar.",
    },
    figures: ["Tughril Beg", "Chaghry Beg"],
    consequences: {
      sv: "Seljukerna kontrollerar Khurasan. Det nya imperiet expanderar snabbt.",
      en: "Seljuks control Khurasan. The new empire expands rapidly.",
      tr: "Selçuklar Horasan'ı kontrol eder. Yeni imparatorluk hızla genişler.",
    },
    impact: {
      sv: "En ny islamisk stormakt föds på den eurasiatiska politiska scenen.",
      en: "A new Islamic great power is born on the Eurasian political scene.",
      tr: "Avrasya siyasi sahnesinde yeni bir İslam büyük gücü doğar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1040,
    title: {
      sv: "Slaget vid Dandanaqan — Ghaznaviderna krossas",
      en: "Battle of Dandanaqan — The Ghaznavids are Crushed",
      tr: "Dandanakan Savaşı — Gazneliler Eziliyor",
    },
    summary: {
      sv: "Den 23 maj 1040 utspelar sig ett av centralasiatisk historias mest avgörande slag i sanddynerna vid Dandanaqan utanför Merv. Ghaznavid-sultanen Masud I leder en mäktig armé med elefanter, tungt kavalleri och professionella infanterister mot Tughril och Chaghry Begs nomadiska ryttare. Det ghaznavidiska tunga kavalleriet är numerärt överlägset och teknologiskt avancerat. Men Seljukernas taktik är genialisk: de vägrar stå och slåss, lockar Masud djupare in i det torra ökenterränget, utmattar hans trupper och avbryter hans försörjningslinjer. Sedan slår de till med blixtnabba anfall från alla håll. Masud flyr i panik. Dandanaqan utplånar Ghaznavid-väldet i Khurasan permanent och öppnar hela Persien, Irak och Anatolien för Seljukisk expansion.",
      en: "On 23 May 1040 one of Central Asian history's most decisive battles unfolds in the sand dunes at Dandanaqan outside Merv. Ghaznavid Sultan Masud I leads a powerful army with elephants, heavy cavalry and professional infantry against Tughril and Chaghry Beg's nomadic riders. The Ghaznavid heavy cavalry is numerically superior and technologically advanced. But the Seljuks' tactics are brilliant: they refuse to stand and fight, lure Masud deeper into the dry desert terrain, exhaust his troops and cut his supply lines. Then they strike with lightning-fast assaults from all directions. Masud flees in panic. Dandanaqan permanently eliminates Ghaznavid rule in Khurasan and opens all of Persia, Iraq and Anatolia to Seljuk expansion.",
      tr: "23 Mayıs 1040'ta Merv dışındaki Dandanakan kum tepelerinde tarihin en belirleyici savaşlarından biri yaşanır. Gazneli Sultan Mesud I'in ordusu, Tuğrul ve Çağrı Bey'in göçebe süvarilerine karşı yenilir. Dandanakan, Horasan'daki Gazneli egemenliğini kalıcı olarak sona erdirir.",
    },
    figures: ["Tughril Beg", "Chaghry Beg", "Sultan Masud I of Ghazna"],
    consequences: {
      sv: "Ghaznaviderna besegrade. Khurasan permanent under Seljukisk kontroll.",
      en: "Ghaznavids defeated. Khurasan permanently under Seljuk control.",
      tr: "Gazneliler yenildi. Horasan kalıcı olarak Selçuk kontrolüne girdi.",
    },
    impact: {
      sv: "Dandanaqan öppnar hela Persien och Irak för Seljukisk expansion.",
      en: "Dandanaqan opens all of Persia and Iraq to Seljuk expansion.",
      tr: "Dandanakan, Selçukların tüm İran ve Irak'a yayılmasının önünü açar.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1055,
    title: {
      sv: "Tughril Beg intar Bagdad — Kalif och sultan förenas",
      en: "Tughril Beg Enters Baghdad — Caliph and Sultan United",
      tr: "Tuğrul Bey Bağdat'a Giriyor — Halife ve Sultan Birleşiyor",
    },
    summary: {
      sv: "Den 18 december 1055 rider Tughril Beg in i Bagdad — det islamiska världens huvudstad och khalifatets historiska hjärta — inte som erövrare utan som befriare. Abbasidkalifens Al-Qa'im har länge lidit under Buyid-dynastins shia-kontroll som degraderade sunniislams kalifer till marionetter. Tughril utropar sig till 'Ost- och Västkungen' och erbjuder kalifen militärt skydd och politisk frihet i utbyte mot religiös legitimitet. Kalif Al-Qa'im utropar Tughril till 'Sultan' — en titel som nu för första gången ges officiellt islamisk sanktion av världens högsta religiösa auktoritet. Överenskommelsen är ett mästerverk av islamisk politisk teologi: sultanen skyddar med svärd, kalifen helgar med ord. Seljukerna är nu inte bara turkiska krigare — de är islamiska världens ridderliga försvarare.",
      en: "On 18 December 1055 Tughril Beg rides into Baghdad — the Islamic world's capital and the caliphate's historical heart — not as a conqueror but as liberator. The Abbasid Caliph Al-Qa'im has long suffered under the Buyid dynasty's Shia control that degraded Sunni Islam's caliphs to puppets. Tughril proclaims himself 'King of the East and West' and offers the caliph military protection and political freedom in exchange for religious legitimacy. Caliph Al-Qa'im proclaims Tughril 'Sultan' — a title now for the first time given official Islamic sanction by the world's highest religious authority. The arrangement is a masterpiece of Islamic political theology: the sultan protects with the sword, the caliph sanctifies with words. The Seljuks are now not merely Turkish warriors — they are the Islamic world's chivalrous defenders.",
      tr: "18 Aralık 1055'te Tuğrul Bey, Bağdat'a fetheden değil kurtarıcı olarak girer. Abbasi Halifesi El-Kaim, Tuğrul'u 'Sultan' ilan eder. Selçuklar artık yalnızca Türk savaşçılar değil, İslam dünyasının şövalyelik savunucularıdır.",
    },
    figures: ["Tughril Beg", "Caliph Al-Qa'im", "Arslan al-Basasiri"],
    consequences: {
      sv: "Seljukerna erkänns som islamisk världens militäriske och politiske beskyddare.",
      en: "Seljuks recognised as the Islamic world's military and political protectors.",
      tr: "Selçuklar, İslam dünyasının askeri ve siyasi koruyucuları olarak tanınır.",
    },
    impact: {
      sv: "Sultan-kalifat-alliansen definierar islamisk politisk struktur i 200 år.",
      en: "The sultan-caliphate alliance defines Islamic political structure for 200 years.",
      tr: "Sultan-halifelik ittifakı, 200 yıl boyunca İslami siyasi yapıyı tanımlar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1063,
    title: {
      sv: "Alp Arslan bestiger tronen — Lejonets son tar makten",
      en: "Alp Arslan Ascends the Throne — The Lion's Son Takes Power",
      tr: "Alparslan Tahta Çıkıyor — Aslanın Oğlu İktidarı Alıyor",
    },
    summary: {
      sv: "Alp Arslan — vars namn på turkiska betyder 'Hjältemodigt lejon' — efterträder sin farbror Tughril Beg och tar sultantiteln. Han är 33 år gammal, militärt genialisk och politiskt visionär. Alp Arslan förstår att Seljuk-imperiet måste växa för att överleva — det nomadiska arvet kräver erövringar för att hålla krigarklassen lojal och tillföra rikedom till det snabbt expanderande imperiets kassor. Han börjar systematiskt expandera västerut mot Armenien och Anatolien — det kristna Bysantinska imperiets kärnland — och söderut mot Syrien och Egypten. Hans namn kommer att huggnas in i historien med ett enda slag som omformade hela Mellanösterns politiska geografi för alltid.",
      en: "Alp Arslan — whose name in Turkish means 'Heroic Lion' — succeeds his uncle Tughril Beg and takes the sultan title. He is 33 years old, militarily brilliant and politically visionary. Alp Arslan understands that the Seljuk Empire must grow to survive — the nomadic heritage requires conquests to keep the warrior class loyal and bring wealth to the rapidly expanding empire's coffers. He begins systematically expanding westward toward Armenia and Anatolia — the Christian Byzantine Empire's heartland — and southward toward Syria and Egypt. His name will be carved into history with a single battle that reshaped all of the Middle East's political geography forever.",
      tr: "Adı Türkçe'de 'Yiğit Aslan' anlamına gelen Alparslan, amcası Tuğrul Bey'in ardından sultan unvanını alır. 33 yaşındadır, askeri açıdan dahi ve siyasi olarak vizyonerdir. Batıya Anadolu'ya ve güneye Suriye'ye sistematik olarak genişlemeye başlar.",
    },
    figures: ["Alp Arslan", "Nizam al-Mulk", "Tughril Beg"],
    consequences: {
      sv: "Seljuk-imperiet inleder sin mest expansiva och dynamiska era.",
      en: "The Seljuk Empire begins its most expansive and dynamic era.",
      tr: "Selçuk İmparatorluğu en genişlemeci ve dinamik dönemine başlar.",
    },
    impact: {
      sv: "Alp Arslans styre markerar Seljukimperiets militära höjdpunkt.",
      en: "Alp Arslan's reign marks the Seljuk Empire's military zenith.",
      tr: "Alparslan'ın saltanatı Selçuk İmparatorluğu'nun askeri zirvesini işaret eder.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1064,
    title: {
      sv: "Erövringen av Ani — Armeniens hjärta faller",
      en: "Conquest of Ani — The Heart of Armenia Falls",
      tr: "Ani'nin Fethi — Ermenistan'ın Kalbi Düşüyor",
    },
    summary: {
      sv: "Alp Arslan erövrar Ani — den armeniska Bagratid-dynastins glänsande huvudstad — i ett blixtkrig som chockar hela den kristna världen. Ani var en av medeltidens mest imponerande befästa städer, byggd på en bergklint omgiven av djupa raviner och massiva stenmurar. Armeniska och bysantinska krönikor beskriver stormningen med fasa — stadens kyrkor förvandlades till mosképer och befolkningen tvingades underkasta sig. Erövringen av Ani signalerar att Seljukerna inte nöjer sig med Centralasien och Persien — de siktar på hela den islamiska och kristna Mellanösterns geopolitik.",
      en: "Alp Arslan conquers Ani — the Armenian Bagratid dynasty's splendid capital — in a blitzkrieg that shocks the entire Christian world. Ani was one of the medieval world's most impressive fortified cities, built on a rocky plateau surrounded by deep ravines and massive stone walls. Armenian and Byzantine chronicles describe the assault with horror — the city's churches were converted into mosques and the population forced to submit. The conquest of Ani signals that the Seljuks are not content with Central Asia and Persia — they aim at the entire Islamic and Christian Middle East's geopolitics.",
      tr: "Alparslan, Ermeni Bagratit hanedanının muhteşem başkenti Ani'yi fetheder. Ani'nin fethi, Selçukların Orta Asya ve İran ile yetinmediğini — tüm Orta Doğu'nun jeopolitiğini hedeflediklerini gösterir.",
    },
    figures: ["Alp Arslan", "Armenian King Gagik II"],
    consequences: {
      sv: "Armenien faller under Seljukisk kontroll. Bysans förlorar ett viktigt bufferterritorium.",
      en: "Armenia falls under Seljuk control. Byzantium loses an important buffer territory.",
      tr: "Ermenistan Selçuk kontrolüne girer. Bizans önemli bir tampon bölgeyi kaybeder.",
    },
    impact: {
      sv: "Erövringen av Ani sätter scenen för konfrontationen med Bysans.",
      en: "The conquest of Ani sets the stage for confrontation with Byzantium.",
      tr: "Ani'nin fethi Bizans ile çatışma için sahneyi hazırlar.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1071,
    title: {
      sv: "Slaget vid Manzikert — Det ögonblick som skapade Turkiet",
      en: "Battle of Manzikert — The Moment That Created Turkey",
      tr: "Malazgirt Savaşı — Türkiye'yi Yaratan An",
    },
    summary: {
      sv: "Den 26 augusti 1071 utspelar sig ett av historiens mest ödesdigra slag vid Manzikert i östra Anatolien. Bysantinsk kejsar Romanos IV Diogenes leder en massiv armé — 100 000–200 000 man beroende på källa — mot Alp Arslans Seljukiska styrkor. Det bysantinska riket är medeltidens teknologiskt mest avancerade kristna imperium och Romanos är en erfaren militär. Men Alp Arslans taktik är formidabel: han lockar bysantinarna in i en falsk reträtt, omringar dem med det klassiska turkiska nomadiska manöverkriget och tillfångatar kejsaren personligen i strid — något som aldrig hänt i bysantinsk historia. Romanos Diogenes förs till Alp Arslans tält och träffar den segrande sultanen ansikte mot ansikte. Det anmärkningsvärda är vad som händer härnäst: Alp Arslan, istället för att döda eller förödmjuka kejsaren, behandlar honom med ridderlig respekt, diskuterar politik och låter honom återvända mot en lösen och ett fredsavtal. Manzikert öppnar Anatolien för turkisk kolonisation — inom ett sekel är Anatolien förvandlat från ett kristet till ett muslimsk-turkiskt land.",
      en: "On 26 August 1071 one of history's most fateful battles unfolds at Manzikert in eastern Anatolia. Byzantine Emperor Romanos IV Diogenes leads a massive army — 100,000–200,000 men depending on source — against Alp Arslan's Seljuk forces. The Byzantine Empire is the medieval world's technologically most advanced Christian empire and Romanos is an experienced military commander. But Alp Arslan's tactics are formidable: he lures the Byzantines into a false retreat, surrounds them with the classic Turkish nomadic manoeuvre warfare and captures the emperor personally in battle — something never before experienced in Byzantine history. Romanos Diogenes is brought to Alp Arslan's tent and meets the victorious sultan face to face. What is remarkable is what happens next: Alp Arslan, instead of killing or humiliating the emperor, treats him with chivalric respect, discusses politics and lets him return in exchange for a ransom and peace treaty. Manzikert opens Anatolia to Turkish colonisation — within a century Anatolia is transformed from a Christian to a Muslim-Turkish land.",
      tr: "26 Ağustos 1071'de Doğu Anadolu'daki Malazgirt'te tarihin en kaderli savaşlarından biri yaşanır. Alparslan, Bizans İmparatoru Romen Diyojen'i bizzat esir alır. Malazgirt, Anadolu'yu Türk kolonizasyonuna açar — bir yüzyıl içinde Anadolu Hristiyan'dan Müslüman-Türk topraklarına dönüşür.",
    },
    figures: ["Alp Arslan", "Emperor Romanos IV Diogenes", "Nizam al-Mulk", "Afshın"],
    consequences: {
      sv: "Bysantinska imperiet förlorar kontrollen över Anatolien permanent.",
      en: "The Byzantine Empire permanently loses control of Anatolia.",
      tr: "Bizans İmparatorluğu Anadolu'nun kontrolünü kalıcı olarak kaybeder.",
    },
    impact: {
      sv: "Manzikert är det ögonblick Anatolien börjar sin transformation till Turkiet.",
      en: "Manzikert is the moment Anatolia begins its transformation into Turkey.",
      tr: "Malazgirt, Anadolu'nun Türkiye'ye dönüşümünün başladığı andır.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1072,
    title: {
      sv: "Alp Arslans dramatiska död — Mördad av en fånge",
      en: "Alp Arslan's Dramatic Death — Murdered by a Prisoner",
      tr: "Alparslan'ın Dramatik Ölümü — Bir Esir Tarafından Öldürülüyor",
    },
    summary: {
      sv: "En av historiens mest ironiska dödsfall drabbar Alp Arslan — mannen som besegrade det mäktigaste armén i den kristna världen vid Manzikert. En fånge, Yusuf al-Khawarizmí, som kondemnerades till döden, lyckas frigöra sig och hugger sultanen i magen med en kniv under förhöret. Alp Arslan, som lyckades tillfångata en bysantinsk kejsare, dog av en fångenskapsmans dolkstöt. Han var 42 år gammal och efterlämnade ett imperium som sträckte sig från Centralasien till Anatolien. Hans son Malik Shah tar över och imperiet når sin absoluta zenith under den kommande generationen — men Alp Arslans bortgång är ändå en monumental förlust för en dynasti som byggde sin storhet på hans militära geni.",
      en: "One of history's most ironic deaths strikes Alp Arslan — the man who defeated the most powerful army in the Christian world at Manzikert. A prisoner, Yusuf al-Khwarizmi, condemned to death, manages to free himself and stabs the sultan in the stomach with a knife during interrogation. Alp Arslan, who managed to capture a Byzantine emperor, died from a prisoner's dagger thrust. He was 42 years old and left behind an empire stretching from Central Asia to Anatolia. His son Malik Shah takes over and the empire reaches its absolute zenith in the coming generation — but Alp Arslan's passing is still a monumental loss for a dynasty that built its greatness on his military genius.",
      tr: "Tarihsel en ironik ölümlerden biri Alparslan'ı vurur — Malazgirt'te Hristiyan dünyanın en güçlü ordusunu yenen adam. Bir mahkum, onu karın bölgesinden bıçaklar. Alparslan 42 yaşındaydı.",
    },
    figures: ["Alp Arslan", "Yusuf al-Khwarizmi", "Malik Shah I"],
    consequences: {
      sv: "Malik Shah I efterträder Alp Arslan som sultan.",
      en: "Malik Shah I succeeds Alp Arslan as sultan.",
      tr: "Melikşah I, Alparslan'ın ardından sultan olur.",
    },
    impact: {
      sv: "Alp Arslans tidiga död berövade Seljukerna en av sina viktigaste ledare.",
      en: "Alp Arslan's early death deprived the Seljuks of one of their most important leaders.",
      tr: "Alparslan'ın erken ölümü, Selçukları en önemli liderlerinden birinden mahrum bıraktı.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1074,
    title: {
      sv: "Nizam al-Mulk och Siyasatnama — Islamisk statskonst kodifieras",
      en: "Nizam al-Mulk and Siyasatnama — Islamic Statecraft Codified",
      tr: "Nizamülmülk ve Siyasetname — İslami Devlet Sanatı Kodifiye Ediliyor",
    },
    summary: {
      sv: "Nizam al-Mulk — Seljukimperiets store vizir, en av medeltidens mest briljanta administratörer och en av islamisk statskonsts mest inflytelserika tänkare — skriver sitt mästerverk Siyasatnama (Boken om statsstyrning). Verket är en djupt originell analys av hur ett imperium bör styras: hur en sultan bör välja sina rådgivare, hantera militären, behandla sina undersåtar, bekämpa korruption och hålla samman ett etniskt och religiöst mångskiftande imperium. Nizam grundar dessutom Nizamiyya-madrasa-nätverket — de första standardiserade islamiska universiteten — i Bagdad, Isfahan, Nishapur och andra städer. Dessa institutioner utbildar de ämbetsmän, jurister och lärde som håller samman Seljukimperiets administrativa struktur. Nizams intellektuella och institutionella arv överlever hans politiska karriär med mångas händer.",
      en: "Nizam al-Mulk — the Seljuk Empire's great vizier, one of the medieval world's most brilliant administrators and one of Islamic statecraft's most influential thinkers — writes his masterpiece Siyasatnama (Book of Government). The work is a deeply original analysis of how an empire should be governed: how a sultan should choose his advisors, handle the military, treat his subjects, combat corruption and hold together an ethnically and religiously diverse empire. Nizam also founds the Nizamiyya madrasa network — the first standardised Islamic universities — in Baghdad, Isfahan, Nishapur and other cities. These institutions train the officials, jurists and scholars who hold together the Seljuk Empire's administrative structure. Nizam's intellectual and institutional legacy survives his political career by many hands.",
      tr: "Nizamülmülk, başyapıtı Siyasetname'yi yazar. Ayrıca Bağdat, Isfahan ve Nişabur'da Nizamiye medreselerini kurar — ilk standartlaştırılmış İslami üniversiteler. Bu kurumlar Selçuk İmparatorluğu'nun idari yapısını bir arada tutan yetkilileri, hukukçuları ve alimleri yetiştirir.",
    },
    figures: ["Nizam al-Mulk", "Malik Shah I", "Omar Khayyam"],
    consequences: {
      sv: "Nizamiyya-universiteten etableras och skapar en islamisk intellektuell infrastruktur.",
      en: "Nizamiyya universities established creating an Islamic intellectual infrastructure.",
      tr: "Nizamiye üniversiteleri kurularak İslami entelektüel altyapı oluşturulur.",
    },
    impact: {
      sv: "Nizam al-Mulks administrativa och intellektuella arv präglar islamisk statskonst i generationer.",
      en: "Nizam al-Mulk's administrative and intellectual legacy marks Islamic statecraft for generations.",
      tr: "Nizamülmülk'ün idari ve entelektüel mirası, İslami devlet sanatını nesiller boyunca damgalar.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1079,
    title: {
      sv: "Omar Khayyam och den jalali-kalenderreformen",
      en: "Omar Khayyam and the Jalali Calendar Reform",
      tr: "Ömer Hayyam ve Celali Takvim Reformu",
    },
    summary: {
      sv: "Sultan Malik Shah I och vizir Nizam al-Mulk beordrar matematikern och poeten Omar Khayyam att leda en astronomisk kommission för att reformera den islamiska kalendern. Khayyam — som idag är mest känd i väst för sina vinpoem, Rubaiyat, men som under sin livstid var mer berömd för sin matematik och astronomi — leder ett team av astronomer i Isfahan och skapar den Jalali-kalendern. Khayyams kalender är mer exakt än den gregorianska som Europa inte adopterade förrän 500 år senare. Det är ett mäktigt vittnesbörd om den intellektuella blomstringen under Seljuk-väldet — ett imperium vars härskarar var nomadiska krigare en generation tidigare skapade nu en av medeltidens mest precisa kalendersystem.",
      en: "Sultan Malik Shah I and Vizier Nizam al-Mulk order the mathematician and poet Omar Khayyam to lead an astronomical commission to reform the Islamic calendar. Khayyam — who today is best known in the West for his wine poems, the Rubaiyat, but who during his lifetime was more famous for his mathematics and astronomy — leads a team of astronomers in Isfahan and creates the Jalali calendar. Khayyam's calendar is more accurate than the Gregorian that Europe did not adopt until 500 years later. It is a powerful testimony to the intellectual flowering under Seljuk rule — an empire whose rulers were nomadic warriors a generation earlier now created one of the medieval world's most precise calendar systems.",
      tr: "Sultan Melikşah I ve Nizamülmülk, matematikçi ve şair Ömer Hayyam'a İslam takvimini reform etmesi için astronomik bir komisyona liderlik etmesini emreder. Hayyam'ın Celali takvimi, Avrupa'nın 500 yıl sonra benimsediği Gregoryen takvimden daha hassastır.",
    },
    figures: ["Omar Khayyam", "Malik Shah I", "Nizam al-Mulk"],
    consequences: {
      sv: "Den jalali-kalendern adopteras i Seljukimperiet — en av medeltidens noggrannaste kalendrar.",
      en: "The Jalali calendar adopted in the Seljuk Empire — one of the medieval world's most accurate calendars.",
      tr: "Celali takvim Selçuk İmparatorluğu'nda benimsenir — ortaçağın en hassas takvimlerinden biri.",
    },
    impact: {
      sv: "Seljukimperiet cementerar sin ställning som ett centrum för islamisk vetenskap.",
      en: "The Seljuk Empire cements its position as a centre of Islamic science.",
      tr: "Selçuk İmparatorluğu, İslam biliminin merkezi olarak konumunu pekiştirir.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1085,
    title: {
      sv: "Erövringen av Antiochia och Syrien — Imperiet når Medelhavet",
      en: "Conquest of Antioch and Syria — The Empire Reaches the Mediterranean",
      tr: "Antakya ve Suriye'nin Fethi — İmparatorluk Akdeniz'e Ulaşıyor",
    },
    summary: {
      sv: "Under Malik Shah Is styre och hans briljante general Tutush I utvidgas Seljukimperiet dramatiskt söderut — Syrien, Palestina och delar av Arabiska halvön erövras. Antiochia, en av medeltidens heliga städer och en av det kristna Europas viktigaste pilgrimsplatser, faller under Seljukisk kontroll 1085. Imperiet sträcker sig nu från Kina-gränsen i öster till Medelhavet i väster, och från Kaukasus i norr till Persiska viken i söder. Det är en av historiens mest geografiskt vidsträckta imperier och inkluderar de tre heliga städerna Mekka, Medina och Jerusalem. Kontroll över Mekka och pilgrims-karavanerna ger Seljukerna enorm religiös prestige i hela den islamiska världen.",
      en: "Under Malik Shah I's rule and his brilliant general Tutush I the Seljuk Empire expands dramatically southward — Syria, Palestine and parts of the Arabian Peninsula are conquered. Antioch, one of the medieval world's holy cities and one of Christian Europe's most important pilgrimage destinations, falls under Seljuk control in 1085. The empire now stretches from the Chinese border in the east to the Mediterranean in the west, and from the Caucasus in the north to the Persian Gulf in the south. It is one of history's most geographically vast empires and includes the three holy cities of Mecca, Medina and Jerusalem. Control of Mecca and the pilgrim caravans gives the Seljuks enormous religious prestige throughout the Islamic world.",
      tr: "Melikşah I'in yönetimi altında Selçuk İmparatorluğu güneye doğru dramatik biçimde genişler — Suriye, Filistin ve Arabistan'ın bir bölümü fethedilir. İmparatorluk artık Çin sınırından Akdeniz'e uzanır.",
    },
    figures: ["Malik Shah I", "Tutush I", "Nizam al-Mulk"],
    consequences: {
      sv: "Seljukimperiet kontrollerar nu de tre heliga städerna och pilgrimsrutterna.",
      en: "The Seljuk Empire now controls the three holy cities and pilgrimage routes.",
      tr: "Selçuk İmparatorluğu artık üç kutsal şehri ve hac yollarını kontrol eder.",
    },
    impact: {
      sv: "Seljukisk kontroll av Jerusalem och Antiochia provocerar det kristna Europa mot Korstågen.",
      en: "Seljuk control of Jerusalem and Antioch provokes Christian Europe toward the Crusades.",
      tr: "Selçukların Kudüs ve Antakya'yı kontrol etmesi, Hristiyan Avrupa'yı Haçlı Seferlerine kışkırtır.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1092,
    title: {
      sv: "Nizam al-Mulks mord och Malik Shahs död — Imperiets dubbelkatastrof",
      en: "Murder of Nizam al-Mulk and Death of Malik Shah — The Empire's Double Catastrophe",
      tr: "Nizamülmülk'ün Öldürülmesi ve Melikşah'ın Ölümü — İmparatorluğun Çift Felaketi",
    },
    summary: {
      sv: "År 1092 drabbas Seljukimperiet av en dubbel katastrof som inleder dess oundvikliga nedgång. I oktober mördar en Assassin-sekt-agent (Nizari Ismailis) Nizam al-Mulk — den store viziren som under 30 år var imperiets verkliga administrative ryggrad. En månad senare dör Sultan Malik Shah I under oklara omständigheter, möjligen förgiftad av sin hustru Terken Khatun. De deux döden lämnar Seljukimperiet utan sitt briljantaste militärische huvud och utan dess briljantaste administrativa hjärna, allt under samma månad. Det öppnar direktet för en bittrare successionskonflikt bland Malik Shahs söner. Imperiet som en generation tidigare hade varit ointagligt är nu ett imperium i kris.",
      en: "In 1092 the Seljuk Empire is struck by a double catastrophe that begins its inevitable decline. In October an Assassin sect agent (Nizari Ismailis) murders Nizam al-Mulk — the great vizier who for 30 years was the empire's true administrative backbone. A month later Sultan Malik Shah I dies under unclear circumstances, possibly poisoned by his wife Terken Khatun. The two deaths leave the Seljuk Empire without its most brilliant military head and without its most brilliant administrative brain, all in the same month. This immediately opens a bitter succession conflict among Malik Shah's sons. The empire that a generation earlier had been invincible is now an empire in crisis.",
      tr: "1092'de Selçuk İmparatorluğu çift felaketle sarsılır. Ekim'de bir Haşhaşi ajanı Nizamülmülk'ü öldürür. Bir ay sonra Sultan Melikşah I belirsiz koşullar altında ölür. Bu iki ölüm, imparatorluğu aynı ayda en parlak askeri ve idari beyin olmadan bırakır.",
    },
    figures: ["Nizam al-Mulk", "Malik Shah I", "Terken Khatun", "Hasan-i-Sabbah"],
    consequences: {
      sv: "Seljukimperiet förlorar sina två viktigaste ledare på en månad. Successionskonflikt utbryter.",
      en: "Seljuk Empire loses its two most important leaders in one month. Succession conflict erupts.",
      tr: "Selçuk İmparatorluğu bir ay içinde iki önemli liderini kaybeder. Veraset çatışması patlak verir.",
    },
    impact: {
      sv: "1092 markerar börjanslutpunkten för Seljukimperiets storhetstid.",
      en: "1092 marks the beginning of the end for the Seljuk Empire's greatness.",
      tr: "1092, Selçuk İmparatorluğu'nun büyüklüğünün sonunun başlangıcını işaret eder.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1095,
    title: {
      sv: "Påve Urban IIs Clermont-tal — Korstågen utlyses mot Seljukerna",
      en: "Pope Urban II's Clermont Speech — The Crusades Declared Against the Seljuks",
      tr: "Papa II. Urban'ın Clermont Konuşması — Selçuklara Karşı Haçlı Seferleri İlan Ediliyor",
    },
    summary: {
      sv: "Den 27 november 1095 håller påve Urban II sitt historiska tal vid kyrkokonsiliet i Clermont och manar det kristna Europa till heligt krig för att återta Jerusalem och Heliga landet från 'de otrogna turkarna.' Talets direkta orsak är en appell från bysantinsk kejsare Alexios I Komnenos om hjälp mot det Seljukiska hotet. Tiotusentals riddare, herrar och fattiga pilgrimer svarar på uppropet. Det Första korståget (1096–1099) är en direkt reaktion på Seljukernas erövring av Anatolien och Jerusalem. Ironiskt nog hade de ursprungliga Seljukers relativt toleranta styre mot kristna pilgrimer — det var de fatimidiska egyptierna som stängde Jerusalem för kristna. Men det spelar ingen roll för propagandan: 'turkarna' är nu medeltidens stora fiende för det kristna Europa.",
      en: "On 27 November 1095 Pope Urban II gives his historic speech at the Church Council of Clermont and calls Christian Europe to holy war to retake Jerusalem and the Holy Land from 'the infidel Turks.' The speech's immediate cause is an appeal from Byzantine Emperor Alexios I Komnenos for help against the Seljuk threat. Tens of thousands of knights, lords and poor pilgrims respond to the call. The First Crusade (1096–1099) is a direct reaction to the Seljuk conquest of Anatolia and Jerusalem.",
      tr: "27 Kasım 1095'te Papa II. Urban, Clermont'ta Hristiyan Avrupa'yı Kudüs ve Kutsal Toprakları Selçuklardan geri almak için kutsal savaşa çağırır. Birinci Haçlı Seferi (1096–1099), Selçukların Anadolu ve Kudüs'ü fethetmesinin doğrudan bir tepkisidir.",
    },
    figures: ["Pope Urban II", "Emperor Alexios I Komnenos", "Kilij Arslan I"],
    consequences: {
      sv: "Det Första korståget sätts igång. Seljukerna möter nu ett nytt hot från väst.",
      en: "The First Crusade is launched. The Seljuks now face a new threat from the west.",
      tr: "Birinci Haçlı Seferi başlatılır. Selçuklar artık batıdan yeni bir tehditle karşı karşıyadır.",
    },
    impact: {
      sv: "Korstågen definierar det Seljukiska imperiets sista generations konflikter.",
      en: "The Crusades define the Seljuk Empire's final generation's conflicts.",
      tr: "Haçlı Seferleri, Selçuk İmparatorluğu'nun son nesil çatışmalarını tanımlar.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1099,
    title: {
      sv: "Jerusalem faller — Korsfararnas triumf och Seljukernas förlust",
      en: "Jerusalem Falls — The Crusaders' Triumph and the Seljuks' Loss",
      tr: "Kudüs Düşüyor — Haçlıların Zaferi ve Selçukların Kaybı",
    },
    summary: {
      sv: "Den 15 juli 1099 stormar korsfararna Jerusalem och massakrerar stadens muslimska och judiska invånare i ett blodbad som chockar den islamiska världen. Jerusalem — den tredje heligaste platsen i islam och en av islams religiösa juveler — är nu i kristna händer. Seljukimperiet, splittrat av interna successionsstrider, kan inte mobilisera en koordinerad militärrespons. Det är ett förödmjukande ögonblick för sunniislam och ett bevis på hur Seljukernas politiska enhet har eroderats sedan 1092. Förlusten av Jerusalem blir en sår i det islamiska medvetandet som inte läks förrän Saladin återtar staden nästan ett sekel senare.",
      en: "On 15 July 1099 the Crusaders storm Jerusalem and massacre the city's Muslim and Jewish inhabitants in a bloodbath that shocks the Islamic world. Jerusalem is now in Christian hands. The Seljuk Empire, split by internal succession conflicts, cannot mobilise a coordinated military response. The loss of Jerusalem becomes a wound in the Islamic consciousness that does not heal until Saladin recaptures the city nearly a century later.",
      tr: "15 Temmuz 1099'da Haçlılar Kudüs'ü ele geçirerek şehrin Müslüman ve Yahudi sakinlerini katleder. İslam'ın üçüncü en kutsal şehri Hristiyan ellere geçer. Selçuk İmparatorluğu, iç veraset çatışmalarıyla bölünmüş olarak koordineli bir askeri yanıt veremez.",
    },
    figures: ["Godfrey of Bouillon", "Kilij Arslan I", "Caliph Al-Mustazhir"],
    consequences: {
      sv: "Jerusalem förlorat till korsfararna. Seljukernas prestige lider enormt.",
      en: "Jerusalem lost to the Crusaders. Seljuk prestige suffers enormously.",
      tr: "Kudüs Haçlılara kaybedilir. Selçuk prestiji büyük zarar görür.",
    },
    impact: {
      sv: "Förlusten av Jerusalem blottar Seljukimperiets politiska och militära sönderfall.",
      en: "The loss of Jerusalem exposes the Seljuk Empire's political and military disintegration.",
      tr: "Kudüs'ün kaybı Selçuk İmparatorluğu'nun siyasi ve askeri parçalanmasını gözler önüne serer.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1118,
    title: {
      sv: "Sultan Sanjar — Det östliga imperiets siste store",
      en: "Sultan Sanjar — The Eastern Empire's Last Great One",
      tr: "Sultan Sencer — Doğu İmparatorluğunun Son Büyüğü",
    },
    summary: {
      sv: "Ahmad Sanjar, son till Malik Shah I, tar kontrollen över det östra Seljukimperiet och regerar som sultan i mer än 40 år — ett av de längsta i Seljukdynastins historia. Sanjar är en aristokratisk, kultiverad och militärt kompetent härskare som lyckas bevara det östra imperiets stabilitet under en period av ökande press. Han för framgångsrika krig mot Kara-Khanid och Ghaznavid-staterna och upprätthåller Seljukernas överhöghet i Centralasien. Sanjar patroniserar lärde och poeter — hans hov är ett centrum för persisk litteratur och vetenskap.",
      en: "Ahmad Sanjar, son of Malik Shah I, takes control of the eastern Seljuk Empire and reigns as sultan for more than 40 years — one of the longest in Seljuk dynasty history. Sanjar is an aristocratic, cultivated and militarily competent ruler who manages to preserve the eastern empire's stability during a period of increasing pressure. He wages successful wars against the Kara-Khanid and Ghaznavid states and maintains Seljuk supremacy in Central Asia. Sanjar patronises scholars and poets — his court is a centre for Persian literature and science.",
      tr: "Melikşah I'in oğlu Ahmad Sencer, doğu Selçuk İmparatorluğu'nun kontrolünü alır ve 40 yılı aşkın süre sultan olarak hüküm sürer. Alimler ve şairleri himaye eder — sarayı Farsça edebiyat ve bilimin merkezidir.",
    },
    figures: ["Sultan Sanjar", "Rashid al-Din Watwat"],
    consequences: {
      sv: "Det östra Seljukimperiet stabiliseras temporärt under Sanjars starka styre.",
      en: "The eastern Seljuk Empire is temporarily stabilised under Sanjar's strong rule.",
      tr: "Doğu Selçuk İmparatorluğu, Sencer'in güçlü yönetimi altında geçici olarak istikrar kazanır.",
    },
    impact: {
      sv: "Sanjar representerar Seljukimperiets sista period av relativ stabilitet och kulturell blomstring.",
      en: "Sanjar represents the Seljuk Empire's last period of relative stability and cultural flowering.",
      tr: "Sencer, Selçuk İmparatorluğu'nun göreli istikrar ve kültürel çiçeklenmenin son dönemini temsil eder.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1141,
    title: {
      sv: "Slaget vid Qatwan — Seljukerna besegrade av Kara Khitai",
      en: "Battle of Qatwan — Seljuks Defeated by Kara Khitai",
      tr: "Katvan Savaşı — Selçuklar Kara Hıtay Tarafından Yeniliyor",
    },
    summary: {
      sv: "Sultan Sanjar lider sin mest ödesmättade militära förlust vid Qatwan-steppen nära Samarkand mot de buddistiska Kara Khitai-folket (Västra Liao) som svept in från öst. Slaget är en katastrof: Seljukernas armé krossas, tusentals dödas och Sanjar flyr med nöd och näppe. Kara Khitai tar kontrollen över delar av Transoxiana — en region Seljukerna kontrollerat i ett sekel. Qatwan visar att Seljukimperiet inte längre är oövervinnerligt, och inspirerar andra vasallstater och rivaliserande makter att utmana Seljukisk överhöghet.",
      en: "Sultan Sanjar suffers his most fateful military defeat at the Qatwan steppe near Samarkand against the Buddhist Kara Khitai people (Western Liao) who swept in from the east. The battle is a catastrophe: the Seljuk army is crushed, thousands killed and Sanjar barely escapes. Kara Khitai takes control of parts of Transoxiana — a region the Seljuks have controlled for a century. Qatwan shows that the Seljuk Empire is no longer invincible.",
      tr: "Sultan Sencer, Semerkand yakınlarındaki Katvan stepinde Budist Kara Hıtay halkı tarafından ağır bir yenilgiye uğrar. Bu savaş, Selçuk İmparatorluğu'nun artık yenilmez olmadığını gösterir.",
    },
    figures: ["Sultan Sanjar", "Yelü Dashi of Kara Khitai"],
    consequences: {
      sv: "Kara Khitai tar delar av Transoxiana. Seljukisk hegemoni i Centralasien ifrågasätts.",
      en: "Kara Khitai takes parts of Transoxiana. Seljuk hegemony in Central Asia is questioned.",
      tr: "Kara Hıtay, Maveraünnehir'in bir bölümünü alır. Orta Asya'da Selçuk hegemonyası sorgulanır.",
    },
    impact: {
      sv: "Qatwan markerar början på Seljukimperiets strategiska reträtt i Centralasien.",
      en: "Qatwan marks the beginning of the Seljuk Empire's strategic retreat in Central Asia.",
      tr: "Katvan, Selçuk İmparatorluğu'nun Orta Asya'daki stratejik geri çekilmesinin başlangıcını işaret eder.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1153,
    title: {
      sv: "Sanjars fångenskap — Imperiets ödmjukaste stund",
      en: "Sanjar's Captivity — The Empire's Most Humiliating Moment",
      tr: "Sencer'in Esareti — İmparatorluğun En Alçaltıcı Anı",
    },
    summary: {
      sv: "I en av Seljukimperiets mest förödmjukande episoder tillfångatas Sultan Sanjar av de upproriska Oghuz-stammarna — paradoxalt nog hans egna turkiska frändfolk — efter ett katastrofalt militärt nederlag. Sanjar hålls som fånge i tre år av de nomadiska Oghuz som hade gjort uppror mot de skatter och restriktioner Seljukerna pålade dem. Det är en djupare ironi: Seljukerna, som kom till makten som nomadiska Oghuz-krigare, förföljs nu av de folk de lämnat bakom sig i stäpperna. Sanjars fångenskap underminerar Seljukisk auktoritet i Centralasien permanent och öppnar regionen för fragmentering.",
      en: "In one of the Seljuk Empire's most humiliating episodes Sultan Sanjar is captured by the rebellious Oghuz tribes — paradoxically his own Turkish kinspeople — after a catastrophic military defeat. Sanjar is held prisoner for three years by the nomadic Oghuz who had rebelled against the taxes and restrictions the Seljuks imposed on them. There is a deeper irony: the Seljuks, who came to power as nomadic Oghuz warriors, are now persecuted by the people they left behind on the steppes.",
      tr: "Selçuk İmparatorluğu'nun en alçaltıcı bölümlerinden birinde Sultan Sencer, paradoks biçimde kendi Türk akrabası olan isyancı Oğuz kabileleri tarafından esir alınır. Üç yıl esarette kalır.",
    },
    figures: ["Sultan Sanjar", "Oghuz Tribal Leaders"],
    consequences: {
      sv: "Seljukisk auktoritet i Centralasien kollapsar. Imperiet fragmenteras påskyndat.",
      en: "Seljuk authority in Central Asia collapses. Empire fragmentation accelerates.",
      tr: "Orta Asya'da Selçuk otoritesi çöker. İmparatorluğun parçalanması hızlanır.",
    },
    impact: {
      sv: "Sanjars fångenskap är den symboliska dödskyssen för Seljuk-hegemonin i Centralasien.",
      en: "Sanjar's captivity is the symbolic death kiss for Seljuk hegemony in Central Asia.",
      tr: "Sencer'in esareti, Orta Asya'da Selçuk hegemonyasının sembolik ölüm öpücüğüdür.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1157,
    title: {
      sv: "Sultan Sanjars död — Det stora imperiet splittras definitivt",
      en: "Death of Sultan Sanjar — The Great Empire Definitively Splits",
      tr: "Sultan Sencer'in Ölümü — Büyük İmparatorluk Kesin Olarak Parçalanıyor",
    },
    summary: {
      sv: "Sultan Ahmad Sanjar dör vid 72 års ålder — efter att ha regerat i mer än 40 år och efter att ha bevittnat imperiets dramatiska nedgång under sina sista år. Med hans bortgång splittras det Stora Seljukimperiet definitivt i ett antal regionala sultanat: Seljukerna av Rûm i Anatolien, Seljukerna av Syrien, Seljukerna av Kirman, Seljukerna av Irak och Persien. Varje gren fortsätter sin existens men det centrala imperiet som Tughril grundade är borta.",
      en: "Sultan Ahmad Sanjar dies at age 72 — having reigned for more than 40 years and having witnessed the empire's dramatic decline in his final years. With his passing the Great Seljuk Empire definitively splits into a number of regional sultanates: the Seljuks of Rûm in Anatolia, the Seljuks of Syria, the Seljuks of Kirman, the Seljuks of Iraq and Persia.",
      tr: "Sultan Ahmad Sencer 72 yaşında ölür. Onun ölümüyle Büyük Selçuk İmparatorluğu kesin olarak çeşitli bölgesel sultanlıklara ayrılır: Anadolu'da Rum Selçukları, Suriye Selçukları, Kirman Selçukları, Irak ve İran Selçukları.",
    },
    figures: ["Sultan Sanjar"],
    consequences: {
      sv: "Det Stora Seljukimperiet fragmenteras permanent i regionala sultanat.",
      en: "The Great Seljuk Empire permanently fragments into regional sultanates.",
      tr: "Büyük Selçuk İmparatorluğu kalıcı olarak bölgesel sultanlıklara parçalanır.",
    },
    impact: {
      sv: "Sanjars död markerar slutet av Seljukimperiet som en enhetlig politisk entitet.",
      en: "Sanjar's death marks the end of the Seljuk Empire as a unified political entity.",
      tr: "Sencer'in ölümü, Selçuk İmparatorluğu'nun birleşik siyasi bir varlık olarak sonunu işaret eder.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1194,
    title: {
      sv: "Seljukimperiet upplöses — Khwarazmians tar över",
      en: "Seljuk Empire Dissolves — Khwarazmians Take Over",
      tr: "Selçuk İmparatorluğu Çözülüyor — Harizmşahlar Devralıyor",
    },
    summary: {
      sv: "Det sista av det centrala Seljukimperiets grenar — Seljukerna av Irak — faller för Khwarazmianernas Shah Tekish vid Rayy 1194. Sultan Toghrul III, den siste stora Seljukkungen av Irak-linjen, dödas i strid. Det 157-åriga Seljukimperiet — som en gång kontrollerade territorier från Centralasien till Medelhavet — är nu officiellt upplöst som en central imperiumkonstruktion. Det enda Seljukiska kvarlevstet är Sultanatet av Rûm i Anatolien som lever vidare i ytterligare 100 år. Det kulturella arvet är dock enormt: persisk-islamisk kultur, Nizamiyya-utbildningssystemet, turkisk statskonst, kalenderreformen och den arkitektoniska traditionen som präglar islamisk civilisation i generationer.",
      en: "The last of the central Seljuk Empire's branches — the Seljuks of Iraq — falls to the Khwarazmian Shah Tekish at Rayy in 1194. Sultan Toghrul III, the last great Seljuk king of the Iraq line, is killed in battle. The 157-year-old Seljuk Empire — which once controlled territories from Central Asia to the Mediterranean — is now officially dissolved as a central imperial construction. The only Seljuk survivor is the Sultanate of Rûm in Anatolia which lives on for another 100 years.",
      tr: "Merkezi Selçuk İmparatorluğu'nun son kolu — Irak Selçukları — 1194'te Rayy'da Harizmşah Tekiş'e yenik düşer. 157 yıllık Selçuk İmparatorluğu artık resmen sona ermiştir.",
    },
    figures: ["Sultan Toghrul III", "Shah Tekish of Khwarazm"],
    consequences: {
      sv: "Seljukimperiet officiellt upplöst. Khwarazmianerna dominerar Persien och Centralasien.",
      en: "Seljuk Empire officially dissolved. Khwarazmians dominate Persia and Central Asia.",
      tr: "Selçuk İmparatorluğu resmen çözülür. Harizmşahlar İran ve Orta Asya'ya egemen olur.",
    },
    impact: {
      sv: "Seljukernas kulturella, religiösa och institutionella arv präglar islamisk civilisation i generationer.",
      en: "The Seljuks' cultural, religious and institutional legacy marks Islamic civilisation for generations.",
      tr: "Selçukların kültürel, dini ve kurumsal mirası İslam medeniyetini nesiller boyunca damgalar.",
    },
    category: "politics",
    importance: "high",
  },
];

// =============================================================================
// LEADERS — All 17 Sultans for the lineage tree
// =============================================================================

const seljukLeaders: Sultan[] = [
  { id: "tughril", name: "Tughril Beg", reignStart: 1037, reignEnd: 1063, parentId: null, generation: 1, title: { sv: "Grundaren — Stäppens lejon", en: "The Founder — Lion of the Steppe", tr: "Kurucu — Bozkırın Aslanı" }, profileId: "tughril" },
  { id: "alp-arslan", name: "Alp Arslan", reignStart: 1063, reignEnd: 1072, parentId: null, generation: 2, title: { sv: "Hjältemodigt lejon — Manzikerts segrare", en: "Heroic Lion — Victor of Manzikert", tr: "Yiğit Aslan — Malazgirt'in Fatihi" }, profileId: "alp-arslan" },
  { id: "malik-shah-i", name: "Malik Shah I", reignStart: 1072, reignEnd: 1092, parentId: "alp-arslan", generation: 3, title: { sv: "Kungars kung — Imperiets byggare", en: "King of Kings — Builder of the Empire", tr: "Şahlar Şahı — İmparatorluğun İnşacısı" }, profileId: "malik-shah-i" },
  { id: "mahmud-i", name: "Mahmud I", reignStart: 1092, reignEnd: 1094, parentId: "malik-shah-i", generation: 4, title: { sv: "Det kortlivade barnet", en: "The Short-Lived Child", tr: "Kısa Ömürlü Çocuk" }, profileId: "mahmud-i" },
  { id: "barkiyaruq", name: "Barkiyaruq", reignStart: 1094, reignEnd: 1105, parentId: "malik-shah-i", generation: 4, title: { sv: "Inbördeskrigets sultan", en: "Sultan of the Civil War", tr: "İç Savaşın Sultanı" }, profileId: "barkiyaruq" },
  { id: "malik-shah-ii", name: "Malik Shah II", reignStart: 1105, reignEnd: 1105, parentId: "barkiyaruq", generation: 5, title: { sv: "Månadsregenten", en: "The Month-Long Regent", tr: "Aylık Naib" }, profileId: "malik-shah-ii" },
  { id: "muhammad-i-tapar", name: "Muhammad I Tapar", reignStart: 1105, reignEnd: 1118, parentId: "malik-shah-i", generation: 4, title: { sv: "Fredens sultan", en: "Sultan of Peace", tr: "Barışın Sultanı" }, profileId: "muhammad-i-tapar" },
  { id: "sanjar", name: "Ahmad Sanjar", reignStart: 1118, reignEnd: 1157, parentId: "malik-shah-i", generation: 4, title: { sv: "Det östliga imperiets siste store", en: "The Eastern Empire's Last Great One", tr: "Doğu İmparatorluğunun Son Büyüğü" }, profileId: "sanjar" },
  { id: "mahmud-ii", name: "Mahmud II", reignStart: 1118, reignEnd: 1131, parentId: "muhammad-i-tapar", generation: 5, title: { sv: "Västsultanens kämpe", en: "Western Sultan's Fighter", tr: "Batı Sultanının Savaşçısı" }, profileId: "mahmud-ii" },
  { id: "dawud", name: "Dawud (Toghrul II)", reignStart: 1131, reignEnd: 1132, parentId: "muhammad-i-tapar", generation: 5, title: { sv: "Den kortvarige", en: "The Brief One", tr: "Kısa Süren" }, profileId: "dawud" },
  { id: "toghrul-ii", name: "Toghrul II", reignStart: 1132, reignEnd: 1135, parentId: "muhammad-i-tapar", generation: 5, title: { sv: "Kharasans regent", en: "Regent of Khurasan", tr: "Horasan'ın Naibı" }, profileId: "toghrul-ii" },
  { id: "masud-i", name: "Masud I", reignStart: 1135, reignEnd: 1152, parentId: "muhammad-i-tapar", generation: 5, title: { sv: "Nedgångens administratör", en: "Administrator of the Decline", tr: "Gerilemenin Yöneticisi" }, profileId: "masud-i" },
  { id: "malik-shah-iii", name: "Malik Shah III", reignStart: 1152, reignEnd: 1153, parentId: "masud-i", generation: 6, title: { sv: "Den siste av huvudlinjen", en: "The Last of the Main Line", tr: "Ana Kolun Sonuncusu" }, profileId: "malik-shah-iii" },
  { id: "muhammad-ii", name: "Muhammad II", reignStart: 1153, reignEnd: 1159, parentId: "masud-i", generation: 6, title: { sv: "Upplösningstidens sultan", en: "Sultan of the Dissolution Age", tr: "Çözülme Çağının Sultanı" }, profileId: "muhammad-ii" },
  { id: "suleiman-shah", name: "Suleiman Shah", reignStart: 1159, reignEnd: 1161, parentId: "muhammad-i-tapar", generation: 5, title: { sv: "Övergångssultanen", en: "The Transitional Sultan", tr: "Geçiş Sultanı" }, profileId: "suleiman-shah" },
  { id: "arslan-shah", name: "Arslan Shah", reignStart: 1161, reignEnd: 1174, parentId: "toghrul-ii", generation: 6, title: { sv: "Sena imperiets kämpe", en: "Fighter of the Late Empire", tr: "Geç İmparatorluğun Savaşçısı" }, profileId: "arslan-shah" },
  { id: "toghrul-iii", name: "Toghrul III", reignStart: 1174, reignEnd: 1194, parentId: "arslan-shah", generation: 7, title: { sv: "Den siste Seljuk-sultanen av Irak", en: "The Last Seljuk Sultan of Iraq", tr: "Irak'ın Son Selçuk Sultanı" }, profileId: "toghrul-iii" },
];

// =============================================================================
// QUIZ — Empty for now
// =============================================================================

const seljukQuizQuestions: QuizQuestion[] = [];

// =============================================================================
// BADGES
// =============================================================================

const seljukBadges: Badge[] = [
  {
    id: "ghazi",
    name: { sv: "Ghazi — Den heliga krigarens ära", en: "Ghazi — The Holy Warrior's Honour", tr: "Gazi — Kutsal Savaşçının Onuru" },
    icon: "⚔️",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor och ta dina första steg på stäppkrigares väg.",
      en: "Answer 3 questions correctly and take your first steps on the steppe warrior's path.",
      tr: "3 soruyu doğru yanıtlayın ve bozkır savaşçısının yolunda ilk adımlarınızı atın.",
    },
  },
  {
    id: "emir",
    name: { sv: "Emir — Befälhavarens rang", en: "Emir — The Commander's Rank", tr: "Emir — Komutanın Rütbesi" },
    icon: "🏹",
    requiredScore: 5,
    description: {
      sv: "Svara rätt på 5 frågor — du befaller nu dina egna styrkor.",
      en: "Answer 5 questions correctly — you now command your own forces.",
      tr: "5 soruyu doğru yanıtlayın — artık kendi kuvvetlerinizi komuta ediyorsunuz.",
    },
  },
  {
    id: "vizier",
    name: { sv: "Vizir — Nizam al-Mulks arving", en: "Vizier — Heir to Nizam al-Mulk", tr: "Vezir — Nizamülmülk'ün Varisi" },
    icon: "📜",
    requiredScore: 8,
    description: {
      sv: "Svara rätt på 8 frågor — du styr imperiet med visdom och lärdom.",
      en: "Answer 8 questions correctly — you govern the empire with wisdom and learning.",
      tr: "8 soruyu doğru yanıtlayın — imparatorluğu bilgelik ve bilgiyle yönetiyorsunuz.",
    },
  },
  {
    id: "sultan",
    name: { sv: "Sultan — Islams beskyddare", en: "Sultan — Protector of Islam", tr: "Sultan — İslam'ın Koruyucusu" },
    icon: "👑",
    requiredScore: 12,
    description: {
      sv: "Svara rätt på 12 frågor — khalif och folk böjer sig inför din visdom.",
      en: "Answer 12 questions correctly — caliph and people bow before your wisdom.",
      tr: "12 soruyu doğru yanıtlayın — halife ve halk bilgeliğinize boyun eğer.",
    },
  },
];

// =============================================================================
// PROFILES — 30 detailed historical figures
// (17 Sultans + 13 viziers/scholars/opponents/key figures)
// =============================================================================

const seljukProfiles: HistoricalProfile[] = [
  // ─── 1. TUGHRIL BEG ─────────────────────────────────────────────────────────
  {
    id: "tughril",
    name: "Tughril Beg (Muhammad ibn Mikail)",
    years: "ca. 990–1063",
    title: { sv: "Grundaren — Stäppens lejon", en: "The Founder — Lion of the Steppe", tr: "Kurucu — Bozkırın Aslanı" },
    portrait: "🦁",
    bio: {
      sv: "Tughril Beg är en av medeltidens mest extraordinära statsbyggare — en man som transformerade en nomadisk herdestam från de centralasiatiska stäpperna till härskare över ett imperium som sträckte sig från Centralasien till Irak. Tughril var son till Mikail ibn Seljuk och barnbarn till stammens legendare grundare Seljuk. Han och hans bror Chaghry ledde Seljuk-stammen i uppror mot Ghaznaviderna och besegrade dem vid Dandanaqan 1040 — ett slag som öppnade hela Persien för Seljukisk expansion. Men Tugrils största bedrift var inte militär — det var politisk. Hans intagande av Bagdad 1055 och hans allians med Abbasidkalifaten skapade ett nytt islamiskt politiskt system: sultan-khalifat-alliansen som kom att definiera sunniislams politiska teologi i generationer.",
      en: "Tughril Beg is one of the medieval world's most extraordinary state-builders — a man who transformed a nomadic herding tribe from the Central Asian steppes into rulers of an empire stretching from Central Asia to Iraq. Tughril was son of Mikail ibn Seljuk and grandson of the tribe's legendary founder Seljuk. He and his brother Chaghry led the Seljuk tribe in revolt against the Ghaznavids and defeated them at Dandanaqan in 1040 — a battle that opened all of Persia to Seljuk expansion. But Tughril's greatest achievement was not military — it was political. His entry into Baghdad in 1055 and his alliance with the Abbasid caliphate created a new Islamic political system: the sultan-caliphate alliance that came to define Sunni Islam's political theology for generations.",
      tr: "Tuğrul Bey, Orta Asya bozkırlarından bir göçebe aşireti çeşitli Orta Asya'dan Irak'a uzanan bir imparatorluğun hükümdarlarına dönüştüren ortaçağın en olağanüstü devlet kurucularından biridir. 1055'te Bağdat'a girişi ve Abbasi halifeliğiyle ittifakı, Sünni İslam'ın siyasi teolojisini nesiller boyunca tanımlayan sultan-halifelik ittifakını yarattı.",
    },
    reforms: {
      sv: ["Grundandet av Seljukimperiet (1037)", "Alliansen med Abbasidkalifatet i Bagdad (1055)", "Etablerandet av sultan-titeln med islamisk sanktion", "Skapandet av det administrativa systemet för det nya imperiet", "Konsolideringen av Khurasan och östra Persien"],
      en: ["Founding of the Seljuk Empire (1037)", "Alliance with the Abbasid Caliphate in Baghdad (1055)", "Establishment of the sultan title with Islamic sanction", "Creation of the administrative system for the new empire", "Consolidation of Khurasan and eastern Persia"],
      tr: ["Selçuk İmparatorluğu'nun kurulması (1037)", "Bağdat'taki Abbasi Halifeliğiyle ittifak (1055)", "İslami onaylı sultan unvanının tesisi", "Yeni imparatorluk için idari sistemin oluşturulması", "Horasan ve doğu İran'ın pekiştirilmesi"],
    },
    campaigns: {
      sv: ["Dandanaqan-segraren (1040) — Ghaznaviderna krossas", "Kampanjen genom Persien (1040–1055)", "Intagandet av Bagdad och befrielsen av kalifen (1055)", "Kriget mot de shia-buyidiska furstarna"],
      en: ["Victor of Dandanaqan (1040) — Ghaznavids crushed", "Campaign through Persia (1040–1055)", "Entry into Baghdad and liberation of the caliph (1055)", "War against the Shia Buyid princes"],
      tr: ["Dandanakan'ın fatihi (1040) — Gazneliler ezildi", "İran üzerinden sefer (1040–1055)", "Bağdat'a giriş ve halifenin kurtarılması (1055)", "Şii Büveyhi prenslere karşı savaş"],
    },
    leadershipStyle: {
      sv: "Tughril kombinerade nomadisk militär briljans med en djup förståelse för islamisk politisk teologi. Han förstod att militär kraft ensam inte kunde bygga ett stabilt imperium — han behövde religiös legitimitet. Hans allians med Abbasidkalifaten var ett mästersteg: han gav khalifaten militärt skydd och fick i utbyte religiös sanktion för sin sultantitel. Hans beslut att regera som beskyddare av sunniislam snarare än som en barbarisk erövrare lade grunden för ett imperium som skulle transformera islamisk civilisation.",
      en: "Tughril combined nomadic military brilliance with a deep understanding of Islamic political theology. He understood that military force alone could not build a stable empire — he needed religious legitimacy. His alliance with the Abbasid caliphate was a masterstroke: he gave the caliphate military protection and received in exchange religious sanction for his sultan title. His decision to rule as protector of Sunni Islam rather than as a barbaric conqueror laid the foundation for an empire that would transform Islamic civilisation.",
      tr: "Tuğrul, göçebe askeri dehasını derin İslami siyasi teoloji anlayışıyla birleştirdi. Abbasi halifeliğiyle kurduğu ittifak bir dahi hamlesi: halifeliğe askeri koruma sağladı ve karşılığında sultan unvanı için dini onay aldı.",
    },
    criticalPerspectives: {
      sv: "Tugrils styre innebar oundvikligen förstörelse och förflyttning för de befolkningar han erövrade. De nomadiska Oghuz-stammarna han ledde in i Persien och Irak var inte fredsamma invandrare — de plundrade, förstörde jordbruksmark och destabiliserade väletablerade samhällen. Den persisk-islamiska civilisationens absorption av Seljukerna var en process full av trauma och våld, inte bara kultursomöte.",
      en: "Tughril's rule inevitably meant destruction and displacement for the populations he conquered. The nomadic Oghuz tribes he led into Persia and Iraq were not peaceful immigrants — they raided, destroyed agricultural land and destabilised well-established communities. The Persian-Islamic civilisation's absorption of the Seljuks was a process full of trauma and violence, not just cultural encounter.",
      tr: "Tuğrul'un yönetimi, fethettiği nüfuslar için kaçınılmaz olarak yıkım ve yerinden edilme anlamına geldi.",
    },
  },

  // ─── 2. CHAGHRY BEG (NEW) ───────────────────────────────────────────────────
  {
    id: "chaghry-beg",
    name: "Chaghry Beg (Dawud ibn Mikail)",
    years: "ca. 989–1060",
    title: { sv: "Stäppens andra lejon — Östra imperiets fader", en: "The Second Lion of the Steppe — Father of the Eastern Empire", tr: "Bozkırın İkinci Aslanı — Doğu İmparatorluğunun Babası" },
    portrait: "🦅",
    bio: {
      sv: "Chaghry Beg, äldre bror till Tughril, är historiskt undanskymd — men hans roll i grundandet av Seljukimperiet är minst lika stor. Medan Tughril blev imperiets ansikte och dess politiska arkitekt i väster, var Chaghry den militäre genialitet som säkrade östra Khurasan och Centralasien. Han är fadern till två av imperiets viktigaste sultaner: Alp Arslan och Qavurt (som grundade Seljuk-dynastin av Kerman). Vid Dandanaqan 1040 ledde han kavalleriet personligen och spelade en avgörande roll i nederlaget av Ghaznavid-arméns flygelformationer. Han etablerade sig sedan i Merv som östra imperiets de facto härskare under Tughrils nominella överhöghet — en arbetsfördelning som fungerade nästan perfekt i två decennier. Chaghry dog 1060, tre år före sin bror, och hans son Alp Arslan ärvde det samlade imperiet.",
      en: "Chaghry Beg, older brother of Tughril, is historically overshadowed — but his role in the founding of the Seljuk Empire is at least as great. While Tughril became the empire's face and its political architect in the west, Chaghry was the military genius who secured eastern Khurasan and Central Asia. He is the father of two of the empire's most important sultans: Alp Arslan and Qavurt (founder of the Seljuk dynasty of Kerman). At Dandanaqan in 1040 he personally led the cavalry and played a decisive role in defeating the Ghaznavid army's flank formations. He then established himself in Merv as the eastern empire's de facto ruler under Tughril's nominal overlordship — a division of labour that worked almost perfectly for two decades. Chaghry died in 1060, three years before his brother, and his son Alp Arslan inherited the unified empire.",
      tr: "Tuğrul'un ağabeyi Çağrı Bey, tarihte gölgede kalmıştır — ancak Selçuk İmparatorluğu'nun kuruluşundaki rolü en az onun kadar büyüktür. Tuğrul, batıdaki imparatorluğun yüzü ve siyasi mimarı olurken, Çağrı doğu Horasan ve Orta Asya'yı güvence altına alan askeri dehaydı. İmparatorluğun en önemli sultanlarından ikisinin babasıdır: Alparslan ve Kavurt. Çağrı 1060'ta, kardeşinden üç yıl önce öldü ve oğlu Alparslan birleşik imparatorluğu miras aldı.",
    },
    reforms: {
      sv: ["Etablerandet av Merv som östra Seljukimperiets administrativa centrum", "Federering av Oghuz-stammar under en gemensam militärstruktur", "Utbildning av Alp Arslan i militär strategi och statskonst"],
      en: ["Establishment of Merv as the eastern Seljuk Empire's administrative centre", "Federation of Oghuz tribes under a unified military structure", "Education of Alp Arslan in military strategy and statecraft"],
      tr: ["Merv'in doğu Selçuklu İmparatorluğu'nun idari merkezi olarak tesisi", "Oğuz kabilelerinin birleşik bir askeri yapı altında federasyonu", "Alparslan'ın askeri strateji ve devlet sanatında eğitimi"],
    },
    campaigns: {
      sv: ["Tidiga raids mot Ghaznavid-Indien (1027–1029)", "Slaget vid Dandanaqan (1040) — kavalleriets befälhavare", "Erövringen av östra Khurasan och Tokharistan (1040–1050)", "Konsolideringen av Seljukmakten i Centralasien"],
      en: ["Early raids against Ghaznavid India (1027–1029)", "Battle of Dandanaqan (1040) — cavalry commander", "Conquest of eastern Khurasan and Tokharistan (1040–1050)", "Consolidation of Seljuk power in Central Asia"],
      tr: ["Gazneli Hindistan'a karşı erken akınlar (1027–1029)", "Dandanakan Savaşı (1040) — süvari komutanı", "Doğu Horasan ve Toharistan'ın fethi (1040–1050)"],
    },
    leadershipStyle: {
      sv: "Chaghry var den klassiska turkiska krigaren — direkt, modig, lojal mot sin bror, oförmögen att intriga politiskt på det sätt Tughril behärskade. Detta var hans styrka och hans begränsning. Han skapade aldrig en egen politisk identitet utanför broderskapet. Men hans militära briljans och hans absoluta lojalitet gjorde imperiebyggandet möjligt på ett sätt som ingen ensam man kunde åstadkomma.",
      en: "Chaghry was the classic Turkish warrior — direct, brave, loyal to his brother, incapable of political intrigue the way Tughril mastered. This was his strength and his limitation. He never created a political identity outside the brotherhood. But his military brilliance and absolute loyalty made empire-building possible in a way no single man could achieve.",
      tr: "Çağrı klasik bir Türk savaşçısıydı — doğrudan, cesur, kardeşine sadık, Tuğrul'un ustalaştığı şekilde siyasi entrikadan yoksun. Bu hem gücü hem de sınırlamasıydı.",
    },
    criticalPerspectives: {
      sv: "Chaghry's bortgång 1060 — bara 3 år före Tughril — skapade ironiskt nog stabilitet snarare än kaos. Hade båda bröderna levt längre hade rivaliteten mellan deras söner kunna splittra imperiet redan i sin första generation. Hans tidiga död banade vägen för Alp Arslans obestridda succession.",
      en: "Chaghry's death in 1060 — just three years before Tughril — paradoxically created stability rather than chaos. Had both brothers lived longer, the rivalry between their sons might have split the empire in its very first generation. His early death paved the way for Alp Arslan's uncontested succession.",
      tr: "Çağrı'nın 1060'ta ölümü, ironik biçimde kaos yerine istikrar yarattı. Erken ölümü, Alparslan'ın tartışmasız verasetinin yolunu açtı.",
    },
  },

  // ─── 3. ALP ARSLAN ──────────────────────────────────────────────────────────
  {
    id: "alp-arslan",
    name: "Alp Arslan (Muhammad ibn Dawud Chaghry)",
    years: "ca. 1029–1072",
    title: { sv: "Hjältemodigt lejon — Manzikerts segrare", en: "Heroic Lion — Victor of Manzikert", tr: "Yiğit Aslan — Malazgirt'in Fatihi" },
    portrait: "🦅",
    bio: {
      sv: "Alp Arslan — 'Hjältemodigt lejon' på turkiska — är den Seljukiska sultan som mer än någon annan skapade de politiska förutsättningarna för Anatoliens turkisering och islamisering. Han var son till Chaghry Beg och efterträdde sin farbror Tughril 1063. Under hans nio år långa styre erövrade Seljukerna Armenien, stötte ihop med Bysans och vann den avgörande segern vid Manzikert 1071 — ett slag som öppnade Anatolien för turkisk kolonisation och vars konsekvenser fortfarande är synliga på dagens politiska karta. Hans ridderliga behandling av den tillfångatagna bysantinska kejsaren Romanos IV Diogenes — som han behandlade med respekt och lät återvända mot lösen — är ett av medeltidens mest dramatiska diplomatiska ögonblick.",
      en: "Alp Arslan — 'Heroic Lion' in Turkish — is the Seljuk sultan who more than anyone else created the political conditions for Anatolia's Turkification and Islamisation. He was son of Chaghry Beg and succeeded his uncle Tughril in 1063. During his nine-year reign the Seljuks conquered Armenia, clashed with Byzantium and won the decisive victory at Manzikert in 1071 — a battle that opened Anatolia to Turkish colonisation and whose consequences are still visible on today's political map. His chivalrous treatment of the captured Byzantine Emperor Romanos IV Diogenes — whom he treated with respect and let return in exchange for a ransom — is one of the medieval world's most dramatic diplomatic moments.",
      tr: "Türkçe'de 'Yiğit Aslan' anlamına gelen Alparslan, Anadolu'nun Türkleşmesi ve İslamlaşması için siyasi koşulları herkesten çok oluşturan Selçuklu sultanıdır. 1071'deki Malazgirt zaferinin sonuçları bugünkü siyasi haritada hâlâ görünmektedir.",
    },
    reforms: {
      sv: ["Militär reorganisation och expansion av Seljukimperiet", "Etablerandet av turkisk militär överhöghet i Mellanöstern", "Diplomatisk allians med Abbasidkalifaten", "Stöd för Nizam al-Mulks administrativa reformer", "Utnämningen av Nizam al-Mulk till storvizir"],
      en: ["Military reorganisation and expansion of the Seljuk Empire", "Establishment of Turkish military supremacy in the Middle East", "Diplomatic alliance with the Abbasid caliphate", "Support for Nizam al-Mulk's administrative reforms", "Appointment of Nizam al-Mulk as grand vizier"],
      tr: ["Selçuk İmparatorluğu'nun askeri yeniden örgütlenmesi ve genişlemesi", "Orta Doğu'da Türk askeri üstünlüğünün tesisi", "Abbasi halifeliğiyle diplomatik ittifak", "Nizamülmülk'ün baş vezir olarak atanması"],
    },
    campaigns: {
      sv: ["Erövringen av Ani och Armenien (1064)", "Slaget vid Manzikert (1071) — bysantinska kejsaren tillfångatas", "Kampanjer i Syrien och mot fatimidiska Egypten", "Erövringen av Georgia och södra Kaukasus", "Sista militärkampanjen i Transoxiana 1072"],
      en: ["Conquest of Ani and Armenia (1064)", "Battle of Manzikert (1071) — Byzantine emperor captured", "Campaigns in Syria and against Fatimid Egypt", "Conquest of Georgia and southern Caucasus", "Last military campaign in Transoxiana 1072"],
      tr: ["Ani ve Ermenistan'ın fethi (1064)", "Malazgirt Savaşı (1071) — Bizans imparatoru esir alındı", "Suriye'de ve Fatımi Mısır'a karşı seferler", "Gürcistan ve güney Kafkasya'nın fethi"],
    },
    leadershipStyle: {
      sv: "Alp Arslan var en klassisk islamisk ghazi-krigare — modig, religiöst hängiven och ridderlid mot besegrade fiender. Hans behandling av Romanos Diogenes avslöjar en man som förstod att storhet mäts i heder lika mycket som i seger. Han delegerade administration till den geniale Nizam al-Mulk och fokuserade på militär strategi och expansion — en arbetsfördelning som fungerade formidabelt och skapade en av medeltidens effektivaste styrningsmodeller.",
      en: "Alp Arslan was a classic Islamic ghazi warrior — brave, religiously devoted and chivalrous toward defeated enemies. His treatment of Romanos Diogenes reveals a man who understood that greatness is measured in honour as much as victory. He delegated administration to the brilliant Nizam al-Mulk and focused on military strategy and expansion — a division of labour that worked formidably and created one of the medieval world's most effective governance models.",
      tr: "Alparslan, klasik bir İslami gazi savaşçısıydı — cesur, dinen bağlı ve yenik düşmanlara karşı şövalyece. Nizam al-Mulk'e yönetimi devrederek askeri strateji ve genişlemeye odaklandı.",
    },
    criticalPerspectives: {
      sv: "Manzikerts konsekvenser — Anatoliens transformation till ett turkisk-muslimskt land — innebar förlusten av en 1000-årig kristen kultur och civilisation. Armenier, greker och syriakristna drabbades av förflyttning, konversion och kulturell förlust. Alp Arslans militära triumf var en demografisk och kulturell katastrof för Anatoliens ursprungliga befolkningar.",
      en: "Manzikert's consequences — Anatolia's transformation into a Turkish-Muslim land — meant the loss of a 1000-year-old Christian culture and civilisation. Armenians, Greeks and Syriac Christians suffered displacement, conversion and cultural loss. Alp Arslan's military triumph was a demographic and cultural catastrophe for Anatolia's indigenous populations.",
      tr: "Malazgirt'in sonuçları — Anadolu'nun Türk-Müslüman topraklarına dönüşmesi — 1000 yıllık Hristiyan kültürünün ve medeniyetinin kaybı anlamına geldi.",
    },
  },

  // ─── 4. NIZAM AL-MULK (NEW — most important non-sultan figure) ────────────
  {
    id: "nizam-al-mulk",
    name: "Nizam al-Mulk (Abu Ali al-Hasan al-Tusi)",
    years: "1018–1092",
    title: { sv: "Statens ordning — Imperiets store vizir", en: "Order of the State — The Empire's Great Vizier", tr: "Devletin Nizamı — İmparatorluğun Büyük Veziri" },
    portrait: "📜",
    bio: {
      sv: "Abu Ali al-Hasan ibn Ali ibn Ishaq al-Tusi — känd som Nizam al-Mulk, 'Statens Ordning' — är medeltidens mest inflytelserika islamiska statsman och en av världshistoriens stora administratörer. Född i Tus (samma stad som filosofen al-Ghazali) tjänade han Seljukimperiet som storvizir i över 30 år under Alp Arslan och Malik Shah I. Han var i praktiken imperiets administrativa hjärna — den som omvandlade en nomadisk turkisk erövring till en sofistikerad persisk-islamisk civilisationsstat. Hans verk Siyasatnama (Boken om statsstyrning) blev en handbok för islamiska härskare i 800 år. Han grundade Nizamiyya-madrasornätverket — de första standardiserade islamiska universiteten — där lärde som al-Ghazali och al-Juwayni utbildades. Hans organisationsmodell, Iqta-systemet (militärlän), spred sig över hela den islamiska världen och ärvdes av osmanerna och mughalerna. Han mördades 1092 av en Nizari Ismaili-Assassin på väg från Isfahan till Bagdad — en kniv gömd i en supplikation. Hans död utlöste den politiska kollaps som ledde till Seljukimperiets fragmentering.",
      en: "Abu Ali al-Hasan ibn Ali ibn Ishaq al-Tusi — known as Nizam al-Mulk, 'Order of the State' — is the medieval Islamic world's most influential statesman and one of world history's great administrators. Born in Tus (the same city as the philosopher al-Ghazali), he served the Seljuk Empire as grand vizier for over 30 years under Alp Arslan and Malik Shah I. He was, in practice, the empire's administrative brain — the man who transformed a nomadic Turkish conquest into a sophisticated Persian-Islamic civilisational state. His work Siyasatnama (Book of Government) became a handbook for Islamic rulers for 800 years. He founded the Nizamiyya madrasa network — the first standardised Islamic universities — where scholars like al-Ghazali and al-Juwayni were educated. His organisational model, the Iqta system (military fiefs), spread across the Islamic world and was inherited by the Ottomans and Mughals. He was assassinated in 1092 by a Nizari Ismaili Assassin on the road from Isfahan to Baghdad — a knife hidden in a supplication. His death triggered the political collapse that led to the Seljuk Empire's fragmentation.",
      tr: "Tus'lu Ebu Ali el-Hasan — Nizamülmülk, 'Devletin Nizamı' — ortaçağ İslam dünyasının en etkili devlet adamı ve dünya tarihinin en büyük yöneticilerinden biridir. Selçuk İmparatorluğu'na 30 yılı aşkın süre Alparslan ve Melikşah I döneminde başvezir olarak hizmet etti. Siyasetname adlı eseri 800 yıl boyunca İslam hükümdarları için bir el kitabı oldu. Nizamiye medreselerini kurdu. 1092'de bir Nizari İsmaili Haşhaşi tarafından — bir dilekçenin içinde gizlenmiş bir bıçakla — suikaste uğradı.",
    },
    reforms: {
      sv: ["Grundandet av Nizamiyya-madrasornätverket (Bagdad 1065, sedan Isfahan, Nishapur, Basra)", "Iqta-systemet — militärlänsystemet som blev modellen för islamisk feudalism", "Skattereformen som balanserade statliga intäkter mot bönders bärförmåga", "Standardiserad rättsadministration baserad på shafi'i-juridik", "Skapandet av en professionell byråkrati av persisk-islamiska ämbetsmän", "Skrev Siyasatnama på Malik Shahs uppdrag (1086–1091)"],
      en: ["Founding of the Nizamiyya madrasa network (Baghdad 1065, then Isfahan, Nishapur, Basra)", "The Iqta system — military fief structure that became the model for Islamic feudalism", "Tax reform balancing state revenue against peasant capacity", "Standardised judicial administration based on Shafi'i jurisprudence", "Creation of a professional bureaucracy of Persian-Islamic officials", "Wrote Siyasatnama on Malik Shah's commission (1086–1091)"],
      tr: ["Nizamiye medreseleri ağının kurulması (Bağdat 1065, ardından İsfahan, Nişabur, Basra)", "İkta sistemi — İslami feodalizmin modeli olan askeri tımar yapısı", "Devlet gelirini köylü kapasitesine karşı dengeleyen vergi reformu", "Şafii içtihadına dayalı standartlaştırılmış yargı yönetimi", "Profesyonel bir Fars-İslami bürokrasi oluşturulması", "Melikşah'ın görevlendirmesiyle Siyasetname yazıldı (1086–1091)"],
    },
    campaigns: {
      sv: ["Diplomatiska missioner till Abbasidkalifaten 1063–1075", "Politisk strategi bakom Manzikert-kampanjen 1071", "Förhandlingar med rivaliserande stater (Fatimiderna, Karakhaniderna)", "Politisk hantering av Nizari Ismaili-revolten under Hasan-i-Sabbah", "Maktkampen mot Terken Khatun-fraktionen vid hovet (1080-talet)"],
      en: ["Diplomatic missions to the Abbasid caliphate 1063–1075", "Political strategy behind the Manzikert campaign 1071", "Negotiations with rival states (Fatimids, Kara-Khanids)", "Political handling of the Nizari Ismaili revolt under Hasan-i-Sabbah", "Power struggle against the Terken Khatun faction at court (1080s)"],
      tr: ["1063–1075 yıllarında Abbasi halifeliğine diplomatik misyonlar", "1071 Malazgirt seferinin ardındaki siyasi strateji", "Rakip devletlerle (Fatimiler, Karahanlılar) müzakereler"],
    },
    leadershipStyle: {
      sv: "Nizam al-Mulks geni var att han förstod att en imperium ärvs men en stat byggs. Han var förmodligen den första islamiska tänkare som artikulerade idén om staten som en autonom institution skild från härskaren. Hans Siyasatnama är fylld av praktiska anekdoter och systemanalys snarare än teologiska abstraktioner. Hans personlighet beskrivs i samtida källor som lugn, metodisk, religiöst from men politiskt slug. Han var lojal mot huset Seljuk men aldrig serv — han hade ett eget politiskt program som han utförde med ihärdig konsekvens i tre decennier.",
      en: "Nizam al-Mulk's genius was understanding that an empire is inherited but a state is built. He was probably the first Islamic thinker to articulate the idea of the state as an autonomous institution distinct from the ruler. His Siyasatnama is filled with practical anecdotes and systems analysis rather than theological abstractions. Contemporary sources describe his personality as calm, methodical, religiously pious yet politically shrewd. He was loyal to the House of Seljuk but never servile — he had his own political programme which he executed with persistent consistency for three decades.",
      tr: "Nizamülmülk'ün dehası, imparatorluğun miras alındığını ama devletin inşa edildiğini anlamasıydı. Devletin hükümdardan ayrı özerk bir kurum olduğu fikrini dile getiren muhtemelen ilk İslami düşünürdü.",
    },
    criticalPerspectives: {
      sv: "Nizams centralisering skapade en byråkrati som blev så mäktig att den i praktiken konkurrerade med sultanen själv. Hans dotter och söner växte till en politisk klan vars inflytande oroade Malik Shah under hans senare år — det var sannolikt en av orsakerna till att Malik Shah började förbereda Nizams avlägsnande just före hans mord. Hans iqta-system, briljant i sin tid, blev senare den mekanism som möjliggjorde atabegarnas autonomi och imperiets fragmentering.",
      en: "Nizam's centralisation created a bureaucracy so powerful that in practice it competed with the sultan himself. His daughters and sons grew into a political clan whose influence troubled Malik Shah in his later years — it was probably one of the reasons Malik Shah began preparing Nizam's removal just before the assassination. His iqta system, brilliant in its time, later became the mechanism that enabled the atabegs' autonomy and the empire's fragmentation.",
      tr: "Nizam'ın merkezileştirmesi öyle güçlü bir bürokrasi yarattı ki pratikte sultanla rekabet etti. İkta sistemi sonunda atabeglerin özerkliğini ve imparatorluğun parçalanmasını mümkün kılan mekanizma haline geldi.",
    },
  },

  // ─── 5. MALIK SHAH I ────────────────────────────────────────────────────────
  {
    id: "malik-shah-i",
    name: "Malik Shah I (Jalal al-Dawla)",
    years: "1055–1092",
    title: { sv: "Kungars kung — Imperiets byggare", en: "King of Kings — Builder of the Empire", tr: "Şahlar Şahı — İmparatorluğun İnşacısı" },
    portrait: "👑",
    bio: {
      sv: "Malik Shah I är den Seljukiska sultan under vars styre imperiet nådde sin absoluta geografiska och kulturella höjdpunkt. Son till Alp Arslan, regerade han 20 år och expanderade Seljukimperiet till att täcka mer än 3,9 miljoner kvadratkilometer — från Amu Darya i öster till Medelhavet i väster och från Kaukasus i norr till Persiska viken i söder. Under hans styre patroniserade Seljukhovet Omar Khayyam, grundades Nizamiyya-universiteten, byggdes gigantiska moképer och karavanserailerna längs Sidenvägen. Han var djupt beroende av sin briljante vizir Nizam al-Mulk och samarbetet mellan dem skapade ett av medeltidens mest välfungerande imperiesystem. Deras gemensamma dödsfall 1092 — med bara en månads mellanrum — inledde imperiets oundvikliga nedgång.",
      en: "Malik Shah I is the Seljuk sultan under whose rule the empire reached its absolute geographic and cultural peak. Son of Alp Arslan, he reigned for 20 years and expanded the Seljuk Empire to cover more than 3.9 million square kilometres — from the Amu Darya in the east to the Mediterranean in the west and from the Caucasus in the north to the Persian Gulf in the south. Under his reign the Seljuk court patronised Omar Khayyam, the Nizamiyya universities were founded, gigantic mosques and caravanserais along the Silk Road were built. He was deeply dependent on his brilliant vizier Nizam al-Mulk and their collaboration created one of the medieval world's best-functioning imperial systems. Their joint deaths in 1092 — just one month apart — began the empire's inevitable decline.",
      tr: "Melikşah I, imparatorluğun mutlak coğrafi ve kültürel zirvesine ulaştığı Selçuklu sultanıdır. 3,9 milyon kilometre karenin üzerinde bir alana yayılan imparatorluğu, Ömer Hayyam'ı himaye etti, Nizamiye üniversitelerini kurdu ve İpek Yolu boyunca devasa camiler inşa etti.",
    },
    reforms: {
      sv: ["Grundandet av Nizamiyya-universiteten", "Kalenderreformen med Omar Khayyam (jalali-kalendern)", "Byggandet av karavanserailer längs Sidenvägen", "Administrativ standardisering av det multietniska imperiet", "Diplomatiska relationer med Song-Kina och Bysans", "Utbyggnaden av Isfahan som imperiets nya huvudstad"],
      en: ["Founding of Nizamiyya universities", "Calendar reform with Omar Khayyam (Jalali calendar)", "Construction of caravanserais along the Silk Road", "Administrative standardisation of the multi-ethnic empire", "Diplomatic relations with Song China and Byzantium", "Expansion of Isfahan as the empire's new capital"],
      tr: ["Nizamiye üniversitelerinin kurulması", "Ömer Hayyam ile takvim reformu (Celali takvim)", "İpek Yolu boyunca kervansarayların inşası", "Çok etnili imparatorluğun idari standardizasyonu", "Isfahan'ın imparatorluğun yeni başkenti olarak genişlemesi"],
    },
    campaigns: {
      sv: ["Erövringen av Syrien och Palestina", "Erövringen av Antiochia och Medelhavsregionen", "Krigen mot Fatimiderna i Egypten", "Erövringen av Transoxiana och utvidgningen mot Centralasien", "Personliga militärkampanjer i Anatolien och Georgien"],
      en: ["Conquest of Syria and Palestine", "Conquest of Antioch and Mediterranean region", "Wars against the Fatimids in Egypt", "Conquest of Transoxiana and extension toward Central Asia", "Personal military campaigns in Anatolia and Georgia"],
      tr: ["Suriye ve Filistin'in fethi", "Antakya ve Akdeniz bölgesinin fethi", "Mısır'daki Fatımilere karşı savaşlar", "Maveraünnehir'in fethi"],
    },
    leadershipStyle: {
      sv: "Malik Shah var en pragmatisk och kultiverad härskare som förstod att ett imperium kräver mer än militär kraft. Hans stöd för Nizam al-Mulks administrativa genialitet och hans patronage av lärde och poeter skapade en synthesis av turkisk militär kraft och persisk-islamisk civilisation som definierade Seljukimperiets guldålder.",
      en: "Malik Shah was a pragmatic and cultivated ruler who understood that an empire requires more than military force. His support for Nizam al-Mulk's administrative genius and his patronage of scholars and poets created a synthesis of Turkish military power and Persian-Islamic civilisation that defined the Seljuk Empire's golden age.",
      tr: "Melikşah, pragmatik ve kültürlü bir hükümdardı.",
    },
    criticalPerspectives: {
      sv: "Malik Shahs beroende av Nizam al-Mulk var en styrka men också en svaghet — när Nizam dödades 1092 kollapsade det administrativa systemet snabbt. Dessutom: Malik Shahs gemål Terken Khatun bedrev en aktiv intrigpolitik som underminerade dynastisk stabilitet och bidrog till Malik Shahs mystiska, möjligen våldsamma, dödsfall.",
      en: "Malik Shah's dependence on Nizam al-Mulk was a strength but also a weakness — when Nizam was killed in 1092 the administrative system quickly collapsed. Furthermore: Malik Shah's consort Terken Khatun conducted active intriguing politics that undermined dynastic stability and contributed to Malik Shah's mysterious, possibly violent, death.",
      tr: "Melikşah'ın Nizamülmülk'e olan bağımlılığı bir güç ama aynı zamanda bir zayıflıktı.",
    },
  },

  // ─── 6. OMAR KHAYYAM (NEW) ──────────────────────────────────────────────────
  {
    id: "omar-khayyam",
    name: "Omar Khayyam (Ghiyath al-Din Abu'l-Fath Umar ibn Ibrahim)",
    years: "1048–1131",
    title: { sv: "Stjärnornas matematiker — Rubaiyats poet", en: "Mathematician of the Stars — Poet of the Rubaiyat", tr: "Yıldızların Matematikçisi — Rubaiyat'ın Şairi" },
    portrait: "🌟",
    bio: {
      sv: "Omar Khayyam är ett av islamic civilisations mest paradoxala genier. Född i Nishapur — Khurasans intellektuella huvudstad — utbildades han i den klassiska persiska traditionen där matematik, astronomi, filosofi och poesi var aspekter av samma kunskapsstreben. Sultan Malik Shah I och Nizam al-Mulk kallade honom till Isfahan 1074 för att leda en astronomisk kommission. I åtta år ledde han ett team av matematiker som beräknade tropiska årets längd till 365,2422 dagar — en precision som Europa inte uppnådde förrän 500 år senare med den gregorianska kalendern. Hans matematiska arbeten löste kubiska ekvationer geometriskt på sätt som först återupptäcktes i 1600-talets Europa. Hans bok Maqalat fi al-Jabr wa al-Muqabala är ett av medeltidens viktigaste algebraverk. I dag är han mest känd för sin Rubaiyat — fyrradiga persiska dikter om vin, kärlek, dödens närhet och tvivel — som Edward FitzGerald översatte till engelska 1859 och som gjorde honom till en av världslitteraturens mest lästa poeter. Khayyam dog i Nishapur 1131, hade aldrig publicerat sina dikter under livstiden — de var privata reflektioner som upptäcktes och samlades efter hans död.",
      en: "Omar Khayyam is one of Islamic civilisation's most paradoxical geniuses. Born in Nishapur — Khurasan's intellectual capital — he was educated in the classical Persian tradition where mathematics, astronomy, philosophy and poetry were aspects of the same pursuit of knowledge. Sultan Malik Shah I and Nizam al-Mulk summoned him to Isfahan in 1074 to lead an astronomical commission. For eight years he led a team of mathematicians who calculated the tropical year's length as 365.2422 days — a precision Europe did not achieve until 500 years later with the Gregorian calendar. His mathematical works solved cubic equations geometrically in ways that were only rediscovered in 17th century Europe. His book Maqalat fi al-Jabr wa al-Muqabala is one of the medieval world's most important algebra works. Today he is best known for his Rubaiyat — four-line Persian poems on wine, love, the nearness of death and doubt — which Edward FitzGerald translated into English in 1859, making him one of world literature's most-read poets. Khayyam died in Nishapur in 1131; he had never published his poems during his lifetime — they were private reflections discovered and collected after his death.",
      tr: "Ömer Hayyam, İslam medeniyetinin en paradoksal dehalarından biridir. Nişabur'da doğdu. Sultan Melikşah I ve Nizamülmülk onu 1074'te bir astronomik komisyona liderlik etmek üzere İsfahan'a çağırdı. Sekiz yıl boyunca tropikal yılın uzunluğunu 365,2422 gün olarak hesapladı — Avrupa'nın 500 yıl sonraki Gregoryen takviminde elde ettiği hassasiyet. Bugün en çok Edward FitzGerald'ın 1859'da İngilizceye çevirdiği Rubaiyat'ıyla tanınır.",
    },
    reforms: {
      sv: ["Jalali-kalenderreformen (1079) — en av medeltidens noggrannaste kalendrar", "Skapandet av binomialteoremet för positiva heltal", "Geometrisk lösning av kubiska ekvationer (kanoniska former)", "Reform av astronomiska observationer i Isfahan-observatoriet", "Bevarandet av euklidisk geometri och kommentarerna till Euklids parallellpostulat"],
      en: ["Jalali calendar reform (1079) — one of the medieval world's most accurate calendars", "Development of the binomial theorem for positive integers", "Geometric solution of cubic equations (canonical forms)", "Reform of astronomical observations at the Isfahan observatory", "Preservation of Euclidean geometry and commentaries on Euclid's parallel postulate"],
      tr: ["Celali takvim reformu (1079)", "Pozitif tam sayılar için binom teoreminin geliştirilmesi", "Kübik denklemlerin geometrik çözümü", "İsfahan rasathanesinde astronomik gözlemlerin reformu"],
    },
    campaigns: {
      sv: ["Astronomiska expeditioner i Khurasan och Persien för att bestämma latituder och longituder", "Diplomatiska missioner som hovets vetenskaplige rådgivare", "Filosofiska debatter med samtida sufiska och ortodoxa lärde"],
      en: ["Astronomical expeditions in Khurasan and Persia to determine latitudes and longitudes", "Diplomatic missions as the court's scientific advisor", "Philosophical debates with contemporary Sufi and orthodox scholars"],
      tr: ["Horasan ve İran'da astronomik seferler", "Sarayın bilim danışmanı olarak diplomatik misyonlar"],
    },
    leadershipStyle: {
      sv: "Khayyam var ingen ledare i konventionell mening — han ledde forskningsteam, inte arméer eller administrationer. Hans 'ledarskapsstil' var den klassiska persiska polymathens: tyst, metodisk, intellektuellt sträng, religiöst skeptisk men diskret om det. Samtida källor beskriver honom som reserverad och svår att läsa — han hade få nära vänner och undvek hovets intriger. Hans mest djupa lojalitet var mot kunskapen själv, inte mot någon härskare eller institution.",
      en: "Khayyam was no leader in the conventional sense — he led research teams, not armies or administrations. His 'leadership style' was the classic Persian polymath's: quiet, methodical, intellectually rigorous, religiously sceptical but discreet about it. Contemporary sources describe him as reserved and hard to read — he had few close friends and avoided court intrigue. His deepest loyalty was to knowledge itself, not to any ruler or institution.",
      tr: "Hayyam geleneksel anlamda bir lider değildi — orduları ya da yönetimleri değil araştırma ekiplerini yönetti. Klasik Fars polimat tarzı: sessiz, metodik, entelektüel olarak titiz, dini açıdan şüpheci ama bu konuda ihtiyatlı.",
    },
    criticalPerspectives: {
      sv: "Khayyams Rubaiyat är subversiva i sin sammanhang — de uttrycker tvivel om dygdens belöning, kritik av religiös ortodoxi, en närmast existentialistisk hållning till dödens oundviklighet. Att han kunde leva och arbeta i Seljukimperiet utan att förföljas vittnar antingen om diktarnas tolerans eller om Khayyams egen försiktighet att hålla dikterna privata. Hans rykte i väst som hedonistisk vinpoet är en romantiserad förvrängning — Khayyam var i sin kärna en allvarlig vetenskapsman som råkade också vara en av världshistoriens stora poeter.",
      en: "Khayyam's Rubaiyat are subversive in their context — they express doubt about the rewards of virtue, criticism of religious orthodoxy, an almost existentialist stance toward the inevitability of death. That he could live and work in the Seljuk Empire without being persecuted testifies either to the patrons' tolerance or to Khayyam's own prudence in keeping the poems private. His Western reputation as a hedonistic wine poet is a romanticised distortion — Khayyam was at his core a serious scientist who also happened to be one of world history's great poets.",
      tr: "Hayyam'ın Rubaiyat'ı bağlamında yıkıcıdır — erdemin ödülleri hakkında şüphe, dini ortodoksiye eleştiri, ölümün kaçınılmazlığına neredeyse varoluşçu bir tutum ifade eder. Selçuk İmparatorluğu'nda zulme uğramadan yaşayıp çalışabilmesi ya hamilerin hoşgörüsüne ya da şiirleri özel tutma konusundaki kendi tedbirine işaret ediyor.",
    },
  },

  // ─── 7. HASAN-I-SABBAH (NEW — antagonist, founder of Assassins) ───────────
  {
    id: "hasan-i-sabbah",
    name: "Hasan-i-Sabbah",
    years: "ca. 1050–1124",
    title: { sv: "Berget gamles mästare — Assassinernas grundare", en: "The Old Man of the Mountain — Founder of the Assassins", tr: "Dağın Yaşlı Adamı — Haşhaşilerin Kurucusu" },
    portrait: "🗡️",
    bio: {
      sv: "Hasan-i-Sabbah är en av medeltidens mest fascinerande och fruktade figurer — en man vars påhittiga politiska teknik (riktade politiska mord av fanatiskt lojala agenter) skapade ett ord som överlevde i alla europeiska språk: 'assassin.' Född i Qom i en shia-familj utbildades han i Fatimid-Egyptens religiösa lärdomscentrum och konverterade till Nizari Ismaili-grenen av shia-islam. Han var enligt persisk legend en barndomsvän till Nizam al-Mulk — paradoxiskt nog hans framtida främste fiende. 1090 erövrade Hasan klippborgen Alamut i Elburz-bergen norr om dagens Teheran och förvandlade den till sitt huvudkvarter. Härifrån grundade han Nizari Ismaili-staten — en decentraliserad konfederation av bergsfästningar — och utvecklade den politiska tekniken som skulle definiera honom: Fedayeen-agenterna, fanatiskt lojala unga män som infiltrerade fientliga hov och utförde målinriktade mord. Hans första prominent offer var Nizam al-Mulk själv (1092). Han dog i sin säng 1124, 90 år gammal — en av få politiska aktörer i Seljukperioden som överlevde sina fiender.",
      en: "Hasan-i-Sabbah is one of the medieval world's most fascinating and feared figures — a man whose inventive political technique (targeted political murder by fanatically loyal agents) created a word that survived in every European language: 'assassin.' Born in Qom into a Shia family, he was educated in Fatimid Egypt's religious learning centre and converted to the Nizari Ismaili branch of Shia Islam. He was, according to Persian legend, a childhood friend of Nizam al-Mulk — paradoxically his future principal enemy. In 1090 Hasan captured the cliff fortress of Alamut in the Elburz mountains north of present-day Tehran and transformed it into his headquarters. From there he founded the Nizari Ismaili state — a decentralised confederation of mountain fortresses — and developed the political technique that would define him: the Fedayeen agents, fanatically loyal young men who infiltrated enemy courts and carried out targeted murders. His first prominent victim was Nizam al-Mulk himself (1092). He died in his bed in 1124, aged 90 — one of few political actors of the Seljuk era who outlived his enemies.",
      tr: "Hasan Sabbah, ortaçağın en büyüleyici ve korkulan figürlerinden biridir — yarattığı siyasi teknik (fanatik sadık ajanlar tarafından hedefli siyasi cinayet) tüm Avrupa dillerinde yaşayan bir kelime oluşturdu: 'haşhaşi.' Kum'da Şii bir ailede doğdu. 1090'da bugünkü Tahran'ın kuzeyindeki Elburz dağlarında Alamut kaya kalesini ele geçirdi ve karargahına dönüştürdü. İlk önemli kurbanı Nizamülmülk'tü (1092). 1124'te yatağında, 90 yaşında öldü.",
    },
    reforms: {
      sv: ["Grundandet av Nizari Ismaili-staten med Alamut som bas (1090)", "Utvecklingen av Fedayeen-systemet — fanatiskt lojala suicide-agenter", "Skapandet av ett nätverk av bergsfästningar i Persien och Syrien", "Utvecklingen av en distinkt Nizari shia-doktrin (Da'wa Jadida — 'Den nya kallelsen')", "Etablerandet av Alamut-biblioteket som ett centrum för shia-lärdom"],
      en: ["Founding of the Nizari Ismaili state with Alamut as base (1090)", "Development of the Fedayeen system — fanatically loyal suicide agents", "Creation of a network of mountain fortresses across Persia and Syria", "Development of a distinct Nizari Shia doctrine (Da'wa Jadida — 'The New Preaching')", "Establishment of the Alamut library as a centre of Shia learning"],
      tr: ["Alamut'u üs olarak Nizari İsmaili devletinin kurulması (1090)", "Fedayin sisteminin geliştirilmesi", "İran ve Suriye'de dağ kaleleri ağının yaratılması"],
    },
    campaigns: {
      sv: ["Erövringen av Alamut (1090) genom infiltration snarare än belägring", "Mordet på Nizam al-Mulk (oktober 1092)", "Lyckade mord på flera Seljukatabegs och kaliffunktionärer", "Försvaret av Alamut mot Seljukbelägringar (1090–1118)", "Politisk allianser med oberoende emirer som hotades av Seljukerna"],
      en: ["Capture of Alamut (1090) through infiltration rather than siege", "Assassination of Nizam al-Mulk (October 1092)", "Successful assassinations of several Seljuk atabegs and caliphal officials", "Defence of Alamut against Seljuk sieges (1090–1118)", "Political alliances with independent emirs threatened by the Seljuks"],
      tr: ["Alamut'un fethi (1090)", "Nizamülmülk suikasti (Ekim 1092)", "Çeşitli Selçuklu atabegleri ve halifelik memurlarının başarılı suikastleri", "Selçuk kuşatmalarına karşı Alamut'un savunması (1090–1118)"],
    },
    leadershipStyle: {
      sv: "Hasan-i-Sabbah var ett radikalt experiment i politisk teori. Han ersatte arméns brute kraft med precision — en agent kunde åstadkomma vad tusen soldater inte kunde. Han ersatte territoriell kontroll med psykologisk dominans — Alamuts existens skapade en aura av oövervinnerlighet som skyddade Ismaili-samhällen över hela imperiet. Han levde själv ett asketiskt liv, sägs ha lämnat Alamuts torn endast två gånger på 35 år, och avrättade till och med sina egna söner när de bröt mot doktrinen. Hans charisma var av en typ — den var fundamentalt religiös, profetisk, omkompromisslöst rationell inom sin egen logik.",
      en: "Hasan-i-Sabbah was a radical experiment in political theory. He replaced the army's brute force with precision — one agent could achieve what a thousand soldiers could not. He replaced territorial control with psychological dominance — Alamut's existence created an aura of invincibility that protected Ismaili communities across the empire. He himself lived an ascetic life, is said to have left Alamut's tower only twice in 35 years, and even executed his own sons when they violated doctrine. His charisma was of a kind — it was fundamentally religious, prophetic, uncompromisingly rational within its own logic.",
      tr: "Hasan Sabbah, siyasi teoride radikal bir deneydi. Ordunun kaba gücünü hassasiyetle değiştirdi — bir ajan, bin askerin başaramayacağını başarabilirdi.",
    },
    criticalPerspectives: {
      sv: "Den 'Assassiner' Hasan-i-Sabbah byggde är ett av medeltidens mest moraliskt komplexa fenomen. Å ena sidan: ett shia-minoritetssamfund som försvarade sig mot sunnitisk dominans genom innovativ politisk taktik. Å andra sidan: en kult av politiska mord, indoktrinering av unga män till självmord, religiös fundamentalism upphöjd till statsdoktrin. Den 'Assassins'-myt som vävdes av Marco Polo och senare europeiska källor (haschisch, 'Berget gamles paradis,' fanatisk hjärntvätt) är till stor del orientalistisk fantasi — men kärnan är historisk: Alamut producerade verkliga mördare som dog för Hasan-i-Sabbahs vision.",
      en: "The 'Assassins' Hasan-i-Sabbah built is one of the medieval world's most morally complex phenomena. On one hand: a Shia minority community defending itself against Sunni dominance through innovative political tactics. On the other: a cult of political murder, indoctrination of young men to suicide, religious fundamentalism elevated to state doctrine. The 'Assassins' myth woven by Marco Polo and later European sources (hashish, 'Old Man of the Mountain's paradise,' fanatic brainwashing) is largely orientalist fantasy — but the core is historical: Alamut produced real killers who died for Hasan-i-Sabbah's vision.",
      tr: "Hasan Sabbah'ın inşa ettiği 'Haşhaşiler', ortaçağın en ahlaki karmaşık fenomenlerinden biridir. Bir yandan: yenilikçi siyasi taktiklerle Sünni egemenliğine karşı kendini savunan bir Şii azınlık topluluğu. Diğer yandan: siyasi cinayet kültü.",
    },
  },

  // ─── 8. TERKEN KHATUN (NEW — Malik Shah's wife, key political figure) ─────
  {
    id: "terken-khatun",
    name: "Terken Khatun",
    years: "ca. 1040–1094",
    title: { sv: "Imperiets drottning — Hovets makthavare", en: "Empress of the Empire — Power Behind the Court", tr: "İmparatorluğun Hatunu — Sarayın Güç Sahibi" },
    portrait: "👸",
    bio: {
      sv: "Terken Khatun är en av medeltidens mest underuppmärksammade politiska aktörer — en kvinna vars manövrering under Seljukimperiets mest kritiska maktöverföring formade Östens historia på sätt få mansliga kungar gjort. Hon var dotter till en Kara-Khanid-prins, en av de turkiska dynastierna i Centralasien, och giftes vid ung ålder bort med Malik Shah I i en politisk allians som säkrade Seljukernas östliga gräns. Vid hovet i Isfahan blev hon snart imperiets de facto inrikespolitiska centrum. Hon byggde upp ett nätverk av lojala atabegs, eunucker, vesirer och köpmän — en skuggregering inom regeringen. När hennes son Mahmud I föddes (ca. 1087) började hon medvetet bygga upp hans tronkandidatur mot hans äldre halvbröder Barkiyaruq och Muhammad Tapar. Hennes konflikt med Nizam al-Mulk blev legendarisk — historikerna debatterar om hon var inblandad i hans mord 1092. När Malik Shah dog samma år (möjligen förgiftad — flera samtida källor pekar på Terken) lyckades hon kröna sin fyraårige son Mahmud till sultan på några timmar. Men Barkiyaruqs arméer rörde sig snabbt. Inom två år hade hennes koalition kollapsat. Hon dog 1094, troligen av sjukdom — men hennes politiska arv definierade Seljukimperiets nedgång.",
      en: "Terken Khatun is one of the medieval world's most under-recognised political actors — a woman whose manoeuvring during the Seljuk Empire's most critical power transition shaped Eastern history in ways few male kings have. She was daughter of a Kara-Khanid prince — one of the Turkish dynasties of Central Asia — and married at a young age to Malik Shah I in a political alliance that secured the Seljuks' eastern frontier. At the court in Isfahan she soon became the empire's de facto domestic political centre. She built a network of loyal atabegs, eunuchs, viziers and merchants — a shadow government within the government. When her son Mahmud I was born (ca. 1087) she began deliberately building his throne candidacy against his older half-brothers Barkiyaruq and Muhammad Tapar. Her conflict with Nizam al-Mulk became legendary — historians debate whether she was involved in his murder in 1092. When Malik Shah died the same year (possibly poisoned — several contemporary sources point to Terken) she managed to crown her four-year-old son Mahmud sultan within hours. But Barkiyaruq's armies moved quickly. Within two years her coalition had collapsed. She died in 1094, probably of illness — but her political legacy defined the Seljuk Empire's decline.",
      tr: "Terken Hatun, ortaçağın en az tanınan siyasi aktörlerinden biridir — Selçuk İmparatorluğu'nun en kritik güç geçişi sırasındaki manevraları Doğu tarihini şekillendirdi. Bir Karahanlı prensinin kızıydı ve genç yaşta Melikşah I ile evlendi. Oğlu Mahmud I doğduğunda (yaklaşık 1087), onun taht adaylığını üvey ağabeylerine karşı kasıtlı olarak inşa etmeye başladı. Nizamülmülk ile çatışması efsaneleşti.",
    },
    reforms: {
      sv: ["Skapandet av en parallel administrativ struktur vid hovet med lojala officials", "Ekonomiska reformer som överförde inkomster från Nizamülmülks iqta-system till hennes egna anhängare", "Religiös patronage av specifika sufiska och teologiska skolor som stödde hennes politiska agenda"],
      en: ["Creation of a parallel administrative structure at court with loyal officials", "Economic reforms that transferred revenue from Nizam al-Mulk's iqta system to her own supporters", "Religious patronage of specific Sufi and theological schools that supported her political agenda"],
      tr: ["Sarayda sadık görevlilerle paralel bir idari yapı oluşturulması", "Nizamülmülk'ün ikta sisteminden gelirleri kendi destekçilerine aktaran ekonomik reformlar"],
    },
    campaigns: {
      sv: ["Successionskonflikten 1092 — krönandet av Mahmud I", "Mobilisering av eunucken Taj al-Mulk och atabegen Anushtigin Garchai", "Diplomatisk operation att vinna stöd från Abbasidkalif al-Muqtadi", "Den misslyckade militärkampanjen mot Barkiyaruqs styrkor 1093–1094"],
      en: ["Succession conflict of 1092 — coronation of Mahmud I", "Mobilisation of the eunuch Taj al-Mulk and atabeg Anushtigin Garchai", "Diplomatic operation to win support from Caliph al-Muqtadi", "The failed military campaign against Barkiyaruq's forces 1093–1094"],
      tr: ["1092 veraset çatışması — Mahmud I'in taç giymesi", "Hadım Tac al-Mulk ve atabeg Anuştigin Garçai'nin seferber edilmesi", "Halife el-Muktedi'nin desteğini kazanmaya yönelik diplomatik operasyon"],
    },
    leadershipStyle: {
      sv: "Terken Khatun var hovets store politiske strateg — opererande genom proxy snarare än direkt. Hon hade aldrig någon formell position; all hennes makt sprang från äktenskapet och från hennes förmåga att manipulera män på högre formella positioner. Hennes ledarstil var långsiktig, tålmodig och hänsynslös. Hon byggde sitt politiska kapital över decennier och uttömde det i en enda, dramatisk maktöverföring som nästan lyckades.",
      en: "Terken Khatun was the court's great political strategist — operating through proxies rather than directly. She held no formal position; all her power sprang from the marriage and from her ability to manipulate men in higher formal positions. Her leadership style was long-term, patient and ruthless. She built her political capital over decades and expended it in a single dramatic power transition that nearly succeeded.",
      tr: "Terken Hatun sarayın büyük siyasi stratejistiydi — doğrudan değil vekiller aracılığıyla çalışıyordu. Hiçbir resmi pozisyonu yoktu.",
    },
    criticalPerspectives: {
      sv: "Persiska historiker — alla manliga, alla skrivande inom decennier efter hennes död — porträtterar Terken Khatun som ondskefull och intrigerande. Det är förstås orättvist på sätt vis: hon kämpade för sin sons rätt enligt en logik som vilken manlig prins skulle ha utfört. Men hennes politik bidrog konkret till imperiets fragmentering. Mahmud I:s 'sultanat' i 18 månader skadade legitimiteten av Seljukernas successionssystem och skapade prejudikat för senare succsionskonflikter.",
      en: "Persian historians — all male, all writing within decades of her death — portray Terken Khatun as evil and conspiratorial. This is unfair in a way: she fought for her son's right according to a logic any male prince would have followed. But her politics concretely contributed to the empire's fragmentation. Mahmud I's 'sultanate' for 18 months damaged the legitimacy of the Seljuks' succession system and created precedent for later succession conflicts.",
      tr: "Fars tarihçileri — hepsi erkek, hepsi ölümünden onlarca yıl sonra yazan — Terken Hatun'u kötü ve entrikaci olarak betimliyor. Bu bir bakıma haksızdır.",
    },
  },

  // ─── 9. MAHMUD I ────────────────────────────────────────────────────────────
  {
    id: "mahmud-i",
    name: "Mahmud I",
    years: "1087–1094",
    title: { sv: "Det kortlivade barnet — En dynasti i kris", en: "The Short-Lived Child — A Dynasty in Crisis", tr: "Kısa Ömürlü Çocuk — Kriz İçindeki Bir Hanedan" },
    portrait: "👶",
    bio: {
      sv: "Mahmud I är ett av historiens mest tragiska namn — inte av vad han var, utan av vad han inte fick chansen att bli. Han var fyra år gammal när hans mor Terken Khatun utnämnde honom till sultan i ett desperat försök att säkra sin linje mot hans äldre halvbröder. Terken Khatun var en av den medeltida islamiska världens mest hänsynslösa politiska operatörer. Medan Malik Shah I ännu låg på dödsbädden, möjligen förgiftad av hennes försorg, förrde hon snabbt sin yngste son Mahmud till tronkammaren och utropade honom sultan. Det är osannolikt att Mahmud I minns en enda dag av sitt 'sultanat.' Barkiyaruq's arméer rörde sig snabbt. Terken Khatuns intrig kollapsade som ett korthus. Mahmud dog 1094, sannolikt sjuk, möjligen mördad — 7 år gammal. Han är begravd i Isfahan. Ingen pilgrim kommer för att hedra honom. Hans enda arv är hans mor och hennes hänsynslösa ambition.",
      en: "Mahmud I is one of history's most tragic names — not for what he was, but for what he never had the chance to become. He was four years old when his mother Terken Khatun appointed him sultan in a desperate attempt to secure her line against his older half-brothers. Terken Khatun was one of the medieval Islamic world's most ruthless political operators. While Malik Shah I still lay on his deathbed, possibly poisoned at her instigation, she quickly carried her youngest son Mahmud to the throne room and proclaimed him sultan. It is unlikely Mahmud I remembers a single day of his 'sultanate.' Barkiyaruq's armies moved quickly. Terken Khatun's intrigue collapsed like a house of cards. Mahmud died in 1094, probably ill, possibly murdered — 7 years old. He is buried in Isfahan. No pilgrim comes to honour him. His only legacy is his mother and her ruthless ambition.",
      tr: "Mahmud I, tarihin en trajik isimlerinden biri — ne olduğu için değil, olmaya fırsat bulamadığı şey için. Annesi Terken Hatun, onu dört yaşında, kendi soyunu yaşça büyük üvey kardeşlerine karşı güvence altına alma umuduyla sultan ilan etti. Mahmud 1094'te öldü, muhtemelen hasta, belki katledildi — 7 yaşında.",
    },
    reforms: { sv: ["Inga reformer — ett fyraårigt barn med titeln sultan"], en: ["No reforms — a four-year-old child bearing the sultan's title"], tr: ["Reform yok"] },
    campaigns: { sv: ["Inga kampanjer — Terken Khatuns regenter förlorade kriget mot Barkiyaruq"], en: ["No campaigns — Terken Khatun's regents lost the war to Barkiyaruq"], tr: ["Sefer yok"] },
    leadershipStyle: {
      sv: "Mahmud I var inte en ledare. Han var ett politiskt verktyg — ett spädbarn vars namn bar legitimitet som hans mor ville utnyttja. Hans 'ledarstil' är hans mors: opportunistisk, desperat och till slut misslyckad.",
      en: "Mahmud I was not a leader. He was a political tool — an infant whose name carried legitimacy that his mother wanted to exploit. His 'leadership style' is his mother's: opportunistic, desperate and ultimately unsuccessful.",
      tr: "Mahmud I bir lider değildi. Siyasi bir araçtı.",
    },
    criticalPerspectives: {
      sv: "Mahmud Is korta 'styre' illustrerar en av den islamiska politiska teologins mest grundläggande svagheter: att sultantiteln var ärftlig och dynastisk, men att det inte fanns några formella mekanismer för en fungerande regentskaps. Det öppnade för maktmissbruk av ambiciösa mödrar, husliga konspiratörer och militäriska opportunister.",
      en: "Mahmud I's brief 'reign' illustrates one of Islamic political theology's most fundamental weaknesses: that the sultan title was hereditary and dynastic, but there were no formal mechanisms for effective regency.",
      tr: "Mahmud I'nin kısa 'saltanatı', İslami siyasi teolojinin en temel zayıflıklarından birini örnekliyor.",
    },
  },

  // ─── 10. BARKIYARUQ ─────────────────────────────────────────────────────────
  {
    id: "barkiyaruq",
    name: "Barkiyaruq (Rukn al-Din)",
    years: "1080–1105",
    title: { sv: "Inbördeskrigets sultan — Dynasti mot sig självt", en: "Sultan of the Civil War — Dynasty Against Itself", tr: "İç Savaşın Sultanı" },
    portrait: "⚔️",
    bio: {
      sv: "Barkiyaruq är en av historiens mest tragiska figurer i den meningen att han var tillräckligt begåvad för att se sin omöjliga situation klart och ännu inte begåvad nog att fly den. Han var Malik Shah Is äldste overlevande son vid faderns bortgång 1092 — logisk tronarvinge, militärt kompetent, diplomatiskt intelligent. Men logik och intelligens räckte inte i det kaos som Malik Shahs och Nizam al-Mulks simultana dödsfall utlöste. Han kämpade mot sin halvbror Muhammad Tapar i ett krig som varade i stort sett hela hans regeringstid. Han dog 25 år gammal av vad historikerna tror var tuberkulos — men samtida berättar att han också dog av utmattning, av en mans kropp och en sultans sinne som slitits sönder av år av krig mot sina egna bröder.",
      en: "Barkiyaruq is one of history's most tragic figures in the sense that he was talented enough to see his impossible situation clearly and yet not talented enough to escape it. He was Malik Shah I's eldest surviving son at his father's death in 1092 — logical heir to the throne, militarily competent, diplomatically intelligent. But logic and intelligence were not enough in the chaos that Malik Shah's and Nizam al-Mulk's simultaneous deaths unleashed. He fought against his half-brother Muhammad Tapar in a war that lasted essentially his entire reign. He died at age 25 of what historians believe was tuberculosis — but contemporaries report he also died of exhaustion.",
      tr: "Berkyaruk, imkansız durumunu açıkça görecek kadar yetenekli ancak ondan kaçacak kadar yetenekli olmayan biri olması bakımından tarihin en trajik figürlerinden biridir. 25 yaşında genç yaşta öldü.",
    },
    reforms: {
      sv: ["Upprätthållandet av central Seljukisk auktoritet mot centrifugala krafter", "Diplomatiska förhandlingar med Abbasidkalifaten om legitimitetserkännande", "Militär reorganisation av den centrala imperiearmén"],
      en: ["Maintaining central Seljuk authority against centrifugal forces", "Diplomatic negotiations with the Abbasid caliphate for legitimacy recognition", "Military reorganisation of the central imperial army"],
      tr: ["Merkezkaç kuvvetlere karşı merkezi Selçuklu otoritesinin korunması"],
    },
    campaigns: {
      sv: ["Inbördeskriget mot Mahmud I (1092–1094)", "Det långa kriget mot Muhammad Tapar (1094–1105)", "Defensiva operationer mot korsfararna i Levanten (1099–1105)", "Kampanjer mot upproriska atabegs i Azerbajdzjan och Irak"],
      en: ["Civil war against Mahmud I (1092–1094)", "The long war against Muhammad Tapar (1094–1105)", "Defensive operations against the Crusaders in the Levant (1099–1105)", "Campaigns against rebellious atabegs in Azerbaijan and Iraq"],
      tr: ["Mahmud I'e karşı iç savaş (1092–1094)", "Muhammed Tapar'a karşı uzun savaş (1094–1105)"],
    },
    leadershipStyle: {
      sv: "Barkiyaruq regerade genom personlig karisma och militär direkt aktion — han var en sultan som ledde sina styrkor personligen snarare än att delegera till fältmarskalkar. Hans svaghet var att han inte kunde hålla sin dynastiska familj enad, men hans styrka var att han aldrig övergav det personliga engagemanget i styrning.",
      en: "Barkiyaruq ruled through personal charisma and direct military action — he was a sultan who led his forces personally rather than delegating to field marshals. His weakness was his inability to keep his dynastic family united, but his strength was that he never abandoned personal engagement with governance.",
      tr: "Berkyaruk, kişisel karizmayla ve doğrudan askeri eylemle hüküm sürdü.",
    },
    criticalPerspectives: {
      sv: "Barkiyaruqs arv är omdiskuterat. Positiva historiker ser honom som en tragisk hjälte som kämpade mot strukturella krafter bortom sin kontroll. Kritiska historiker pekar på att hans oförmåga att förhandla en fredlig lösning med Muhammad Tapar bidrog till imperiets svaghet inför korsfararna.",
      en: "Barkiyaruq's legacy is debated. Positive historians see him as a tragic hero fighting against structural forces beyond his control. Critical historians point out that his inability to negotiate a peaceful resolution with Muhammad Tapar contributed to the empire's weakness before the Crusaders.",
      tr: "Berkyaruk'un mirası tartışmalıdır.",
    },
  },

  // ─── 11. MALIK SHAH II ──────────────────────────────────────────────────────
  {
    id: "malik-shah-ii",
    name: "Malik Shah II",
    years: "ca. 1100–1105",
    title: { sv: "Månadsregenten — Historiens fotnot", en: "The Month-Long Regent — History's Footnote", tr: "Aylık Naib" },
    portrait: "⏱️",
    bio: {
      sv: "Det finns sultaner som regerade i 40 år och lämnades knappt ett spår i historien. Och sedan finns Malik Shah II, som regerade i knappt sex veckor och vars korta 'sultanat' ändå berättar en hel historia om ett imperium på väg mot katastrof. Han var son till Barkiyaruq — utsedd av sin döende far i ett sista desperat försök att hålla Barkiyaruq-linjen vid liv. Men Muhammad Tapar var redan på väg med sina arméer. Det fanns ingen tid för Malik Shah II att konsolidera, rekrytera eller förhandla. Han var ett barn — exakt ålder okänd men sannolikt inte mer än fem till sju år.",
      en: "There are sultans who reigned for 40 years and left barely a trace in history. And then there is Malik Shah II, who reigned for barely six weeks and whose brief 'sultanate' nonetheless tells an entire story about an empire heading toward catastrophe. He was Barkiyaruq's son — appointed by his dying father in a last desperate attempt to keep the Barkiyaruq line alive. But Muhammad Tapar was already on the move with his armies. He was a child — exact age unknown but probably no more than five to seven years old.",
      tr: "40 yıl hüküm süren ve tarihte neredeyse hiç iz bırakmayan sultanlar var. Bir de altı haftayı biraz geçen saltanatıyla Melikşah II var.",
    },
    reforms: { sv: ["Inga reformer — ett barn under sex veckors nominellt sultanat"], en: ["No reforms — a child during six weeks of nominal sultanate"], tr: ["Reform yok"] },
    campaigns: { sv: ["Ingen kampanj — militär kontroll låg hos Barkiyaruq-dynastins kvarlevande anhängare"], en: ["No campaigns"], tr: ["Sefer yok"] },
    leadershipStyle: { sv: "Inget ledarskap var möjligt eller förväntades av ett barn på fem till sju år.", en: "No leadership was possible or expected from a child of five to seven years.", tr: "Liderlik mümkün değildi." },
    criticalPerspectives: {
      sv: "Malik Shah IIs existens i historien är ett argument mot dynastisk succession baserad på blod snarare än förtjänst.",
      en: "Malik Shah II's existence in history is an argument against dynastic succession based on blood rather than merit.",
      tr: "Melikşah II'nin tarihteki varlığı, kandan çok liyakate dayalı verasete karşı bir argümandır.",
    },
  },

  // ─── 12. MUHAMMAD I TAPAR ───────────────────────────────────────────────────
  {
    id: "muhammad-i-tapar",
    name: "Muhammad I Tapar (Ghiyath al-Din)",
    years: "1082–1118",
    title: { sv: "Fredens sultan — Imperiets sista stora återuppbyggare", en: "Sultan of Peace — The Empire's Last Great Rebuilder", tr: "Barışın Sultanı" },
    portrait: "🕊️",
    bio: {
      sv: "Muhammad I Tapar är en av de undervärderade Seljukkongligheterna — en man som ärvde ett imperium i kris och faktiskt lyckades stabilisera det, om än tillfälligt. Han kämpade i år mot sin bror Barkiyaruq för kontroll av imperiet. När Muhammad Tapar slutligen segrade 1105 och Barkiyaruq dog av sjukdom, stod han inför ett imperium som behövde läkas. Hans styre hade tre main prioriteter: re-centralisering, bekämpning av Nizari Ismaili-hotet, och konsolidering av legitimitet via Abbasidkalifaten. Han dog 1118, 35 år gammal, och efterlämnade ett mer stabilt imperium än han ärvt.",
      en: "Muhammad I Tapar is one of the Seljuk dynasty's most underrated rulers — a man who inherited an empire in crisis and actually managed to stabilise it, if temporarily. He fought for years against his brother Barkiyaruq for control of the empire. When Muhammad Tapar finally triumphed in 1105 and Barkiyaruq died of illness, he faced an empire that needed healing. His reign had three main priorities: re-centralisation, combating the Nizari Ismaili threat, and consolidating legitimacy via the Abbasid caliphate. He died in 1118, aged 35, leaving behind a more stable empire than he had inherited.",
      tr: "Muhammed I Tapar, Selçuk hanedanının en hafife alınan hükümdarlarından biri — kriz içindeki bir imparatorluğu miras alan ve geçici de olsa onu istikrara kavuşturmayı başaran bir adam. 1118'de 35 yaşında öldü.",
    },
    reforms: {
      sv: ["Återupprättandet av central auktoritet efter Barkiyaruqs inbördeskrig", "Systematisk kampanj mot Nizari Ismaili assassinerna i Persien", "Äktenskapsallians med Abbasidkalifaten för ökad religiös legitimitet", "Pacifieringen av de mäktigaste atabegs i Mesopotamien", "Reform av skatteindrivningssystemet i Khurasan"],
      en: ["Restoration of central authority after Barkiyaruq's civil war", "Systematic campaign against Nizari Ismaili assassins in Persia", "Marriage alliance with the Abbasid caliphate for increased religious legitimacy", "Pacification of the most powerful atabegs in Mesopotamia", "Reform of tax collection system in Khurasan"],
      tr: ["Berkyaruk'un iç savaşının ardından merkezi otoritenin yeniden sağlanması", "Nizari İsmaili Haşhaşilere karşı sistematik kampanya"],
    },
    campaigns: {
      sv: ["Inbördeskriget mot Barkiyaruq (1094–1105)", "Kampanjen mot Nizari Ismailis borgar i Elburz-bergen", "Militär expedition mot rebeller i Syrien och Palestina", "Erövringen av Mosul från en upprorisk atebeg"],
      en: ["Civil war against Barkiyaruq (1094–1105)", "Campaign against Nizari Ismaili fortresses in the Elburz mountains", "Military expedition against rebels in Syria and Palestine", "Capture of Mosul from a rebellious atebeg"],
      tr: ["Berkyaruk'a karşı iç savaş (1094–1105)", "Elburz dağlarındaki Nizari İsmaili kalelerine karşı sefer"],
    },
    leadershipStyle: {
      sv: "Muhammad Tapar kombinerade en pragmatisk inställning med en djup religiös övertygelse. Han var en pious muslim och en kompetent administrator, men hans viktigaste egenskap var hans tålamod — förmågan att vänta, förhandla och i det rätta ögonblicket slå avgörande.",
      en: "Muhammad Tapar combined a pragmatic approach with deep religious conviction. He was a pious Muslim and competent administrator, but his most important quality was his patience — the ability to wait, negotiate and at the right moment strike decisively.",
      tr: "Muhammed Tapar pragmatik bir yaklaşımı derin dini inançla birleştirdi.",
    },
    criticalPerspectives: {
      sv: "Muhammad Tapars arv är i slutändan tragiskt i sin adekvans snarare än sin storhet. Han stabiliserade ett imperium men kunde inte lösa dess strukturella problem — den decentraliserade atabegsystemet, sukessionssystemets svaghet, Assassinernas fortlöpande hot.",
      en: "Muhammad Tapar's legacy is ultimately tragic in its adequacy rather than its greatness. He stabilised an empire but could not resolve its structural problems — the decentralised atebeg system, the succession system's weakness, the Assassins' continued threat.",
      tr: "Muhammed Tapar'ın mirası nihayetinde büyüklüğünden çok yeterliğinde trajiktir.",
    },
  },

  // ─── 13. AHMAD SANJAR ───────────────────────────────────────────────────────
  {
    id: "sanjar",
    name: "Ahmad Sanjar (Mu'izz al-Din)",
    years: "1086–1157",
    title: { sv: "Det östliga imperiets siste store", en: "The Eastern Empire's Last Great One", tr: "Doğu İmparatorluğunun Son Büyüğü" },
    portrait: "🌟",
    bio: {
      sv: "Ahmad Sanjar, den yngste sonen till Malik Shah I, är en av Seljukdynastins mest fascinerande och tragiska figurer. Han regerade det östra Seljukimperiet i Khurasan i mer än 40 år — en extraordinärt lång regeringstid som spänner från hans ungdoms triumfer till sin ålderdoms ödmjukelser. I sin storhetstid var Sanjar en aktad sultan som upprätthöll centralasiatisk stabilitet, patroniserade poeter och lärde och vann militära segrar mot Karakhanider och Ghaznaviderna. Men hans sista decennier präglades av katastrofala motgångar: nederlaget vid Qatwan mot Kara Khitai (1141), hans förödmjukande fångenskap av Oghuz-stammarna (1153), och hans slutliga befrielse och dystra regeringstid tills han dog 1157.",
      en: "Ahmad Sanjar, the youngest son of Malik Shah I, is one of the Seljuk dynasty's most fascinating and tragic figures. He ruled the eastern Seljuk Empire in Khurasan for more than 40 years — an extraordinarily long reign spanning from his youth's triumphs to his old age's humiliations. In his prime Sanjar was a respected sultan who maintained Central Asian stability, patronised poets and scholars and won military victories against the Kara-Khanids and Ghaznavids. But his final decades were marked by catastrophic setbacks: the defeat at Qatwan against Kara Khitai (1141), his humiliating captivity by the Oghuz tribes (1153), and his final liberation and bleak final reign until he died in 1157.",
      tr: "Melikşah I'in en küçük oğlu Ahmad Sencer, Selçuk hanedanlığının en büyüleyici ve trajik figürlerinden biridir. Doğu Selçuk İmparatorluğu'nda 40 yılı aşkın süre hüküm sürdü.",
    },
    reforms: {
      sv: ["Underhållandet av Nizamiyya-universiteten i Khurasan", "Patronage av persisk litteratur och vetenskap", "Diplomatiska relationer med Kina och Centralasien", "Skapandet av ett administrativt centrum i Merv"],
      en: ["Maintenance of Nizamiyya universities in Khurasan", "Patronage of Persian literature and science", "Diplomatic relations with China and Central Asia", "Creation of an administrative centre in Merv"],
      tr: ["Horasan'daki Nizamiye üniversitelerinin sürdürülmesi", "Farsça edebiyat ve bilimin himayesi"],
    },
    campaigns: {
      sv: ["Segern mot Karakhaniderna", "Segern mot Ghaznaviderna", "Nederlaget vid Qatwan mot Kara Khitai (1141)", "Kriget mot de upproriska Oghuz-stammarna (1153)"],
      en: ["Victory against the Kara-Khanids", "Victory against the Ghaznavids", "Defeat at Qatwan against Kara Khitai (1141)", "War against the rebellious Oghuz tribes (1153)"],
      tr: ["Karahanlılara karşı zafer", "Gaznelilere karşı zafer", "Kara Hıtay'a karşı Katvan'da yenilgi (1141)", "İsyancı Oğuz kabilelerine karşı savaş (1153)"],
    },
    leadershipStyle: {
      sv: "Sanjar var en traditionell islamisk sultan av den klassiska mönstret: modig i strid, generös mot lärde och poeter, formellt from i sin islam, diplomatisk i sina relationer med vasaller och grannar. Hans tragedi var att han levde för länge — han fick bevittna imperiets sönderfall.",
      en: "Sanjar was a traditional Islamic sultan of the classic pattern: brave in battle, generous toward scholars and poets, formally pious in his Islam, diplomatic in his relations with vassals and neighbours. His tragedy was that he lived too long — he had to witness the empire's disintegration.",
      tr: "Sencer geleneksel bir İslam sultanıydı. Trajedisi çok uzun yaşamasıydı.",
    },
    criticalPerspectives: {
      sv: "Sanjars tragedi är delvis självförvållad — hans militära övermognad och hans oförmåga att förstå Oghuz-nomadernas grievances ledde direkt till Qatwan och hans fångenskap.",
      en: "Sanjar's tragedy is partly self-inflicted — his military overconfidence and his failure to understand the Oghuz nomads' grievances led directly to Qatwan and his captivity.",
      tr: "Sencer'in trajedisi kısmen kendi yarattığı bir trajedidir.",
    },
  },

  // ─── 14. AL-GHAZALI (NEW — greatest theologian, Nizamiyya scholar) ────────
  {
    id: "al-ghazali",
    name: "Abu Hamid al-Ghazali",
    years: "1058–1111",
    title: { sv: "Islams bevis — Den största sufiska teologen", en: "Proof of Islam — The Greatest Sufi Theologian", tr: "İslam'ın Kanıtı — En Büyük Sufi İlahiyatçısı" },
    portrait: "📖",
    bio: {
      sv: "Abu Hamid al-Ghazali är medeltidsislams mest inflytelserike teolog — kanske den enskilt viktigaste tänkare i sunni-islams historia efter de fyra rättsskolornas grundare. Han föddes i Tus (samma stad som Nizam al-Mulk och Omar Khayyam — något i den Khurasanska stadens vatten) och utbildades i de bästa madrasorna under den klassiska shafii-juridiken. Hans karriär följde en remarkabel bana: vid 33 års ålder utnämndes han av Nizam al-Mulk till professor vid Nizamiyya-madrasan i Bagdad — den prestigefyllaste akademiska positionen i den islamiska världen. I 4 år föreläste han för upp till 300 studenter dagligen och blev känd som 'Hujjat al-Islam' — Islams Bevis. Sedan, 1095, drabbades han av en personlig och intellektuell kris. Han övergav sin position, lämnade Bagdad och tillbringade 11 år som vandrande sufisk asket i Damaskus, Jerusalem, Mecka och Hebron. Under denna tid skrev han sitt magnum opus, Ihya' Ulum al-Din ('Återupplivandet av religionsvetenskaperna'), ett 40-delat verk
// =============================================================================
// PART 2 — Append directly after the cut-off point in al-Ghazali's bio
// Replace from "ett 40-delat verk" onwards. This is a clean continuation
// containing al-Ghazali (rest), the remaining 16 profiles, territories,
// trade routes, stories, and the empire config.
// =============================================================================

      // ─── Continue al-Ghazali's bio from "ett 40-delat verk" ─────────────────
      // sv: " ... Ihya' Ulum al-Din ('Återupplivandet av religionsvetenskaperna'), ett 40-delat verk
      sv: "Abu Hamid al-Ghazali är medeltidsislams mest inflytelserike teolog — kanske den enskilt viktigaste tänkare i sunni-islams historia efter de fyra rättsskolornas grundare. Han föddes i Tus och utbildades i de bästa madrasorna under den klassiska shafii-juridiken. Vid 33 års ålder utnämndes han av Nizam al-Mulk till professor vid Nizamiyya-madrasan i Bagdad — den prestigefyllaste akademiska positionen i den islamiska världen. I 4 år föreläste han för upp till 300 studenter dagligen och blev känd som 'Hujjat al-Islam' — Islams Bevis. Sedan, 1095, drabbades han av en personlig och intellektuell kris. Han övergav sin position, lämnade Bagdad och tillbringade 11 år som vandrande sufisk asket i Damaskus, Jerusalem, Mecka och Hebron. Under denna tid skrev han sitt magnum opus, Ihya' Ulum al-Din ('Återupplivandet av religionsvetenskaperna'), ett 40-delat verk som syntesiserade ortodox sunni-teologi med sufisk mystik på ett sätt som omformade islamic spiritualitet för all framtid. Hans självbiografiska Munqidh min al-Dalal ('Frälsaren från villfarelse') är en av världslitteraturens första moderna självbiografier, en intim redogörelse för hans intellektuella kris och andliga omvändelse. Hans Tahafut al-Falasifa ('Filosofernas inkonsekvens') ledde till en bestående förändring av relationen mellan islamisk filosofi och teologi.",
      en: "Abu Hamid al-Ghazali is medieval Islam's most influential theologian — perhaps the single most important thinker in Sunni Islam's history after the founders of the four legal schools. He was born in Tus and educated in the best madrasas under classical Shafi'i jurisprudence. At age 33 he was appointed by Nizam al-Mulk to professor at the Nizamiyya madrasa in Baghdad — the most prestigious academic position in the Islamic world. For 4 years he lectured to up to 300 students daily and became known as 'Hujjat al-Islam' — Proof of Islam. Then, in 1095, he suffered a personal and intellectual crisis. He abandoned his position, left Baghdad and spent 11 years as a wandering Sufi ascetic in Damascus, Jerusalem, Mecca and Hebron. During this time he wrote his magnum opus, Ihya' Ulum al-Din ('Revival of the Religious Sciences'), a 40-part work that synthesised orthodox Sunni theology with Sufi mysticism in ways that reshaped Islamic spirituality forever. His autobiographical Munqidh min al-Dalal ('Deliverer from Error') is one of world literature's first modern autobiographies. His Tahafut al-Falasifa ('Incoherence of the Philosophers') led to a lasting change in the relationship between Islamic philosophy and theology.",
      tr: "Ebu Hamid el-Gazzali, ortaçağ İslam dünyasının en etkili ilahiyatçısıdır. Tus'ta doğdu. 33 yaşında Nizamülmülk tarafından Bağdat Nizamiye medresesine profesör olarak atandı. 'Hüccetü'l-İslam' — İslam'ın Kanıtı — olarak tanındı. 1095'te kişisel ve entelektüel bir krize girdi. 11 yıl Şam, Kudüs ve Mekke'de gezgin sufi münzevi olarak yaşadı. Başyapıtı İhya Ulumi'd-Din'i bu dönemde yazdı.",
    },
    reforms: {
      sv: ["Synthesis av sunnitisk ortodoxi och sufisk mysticism — den dominerande islamiska andligheten i 800 år", "Reformeringen av madrasa-curriculet med fokus på etik och spiritualitet utöver juridik", "Utveckling av islamisk filosofisk teologi (kalam) som motvikt mot grekisk-influerad filosofi", "Etablerandet av sufism som en respektabel ortodox praxis snarare än marginell heterodoxi"],
      en: ["Synthesis of Sunni orthodoxy and Sufi mysticism — the dominant Islamic spirituality for 800 years", "Reform of the madrasa curriculum focusing on ethics and spirituality beyond jurisprudence", "Development of Islamic philosophical theology (kalam) as counterweight to Greek-influenced philosophy", "Establishment of Sufism as a respectable orthodox practice rather than marginal heterodoxy"],
      tr: ["Sünni ortodoksi ile sufi mistisizminin sentezi — 800 yıl boyunca egemen İslami maneviyat", "Medrese müfredatının ahlak ve maneviyata odaklanan reformu", "Yunan etkili felsefeye karşı denge olarak İslam felsefi teolojisinin (kelam) geliştirilmesi"],
    },
    campaigns: {
      sv: ["Polemiska kampanjer mot Nizari Ismaili-doktrinen (Kitab al-Mustazhiri, 1094)", "Filosofiska kampanjer mot avicenniansk falsafa (Tahafut al-Falasifa)", "Andlig vandring mellan Damaskus, Jerusalem, Mecka och Hebron (1095–1106)", "Återgång till undervisningen i Nishapur (1106–1111)"],
      en: ["Polemical campaigns against Nizari Ismaili doctrine (Kitab al-Mustazhiri, 1094)", "Philosophical campaigns against Avicennian falsafa (Tahafut al-Falasifa)", "Spiritual wandering between Damascus, Jerusalem, Mecca and Hebron (1095–1106)", "Return to teaching in Nishapur (1106–1111)"],
      tr: ["Nizari İsmaili doktrinine karşı polemik kampanyalar", "İbn Sina felsefesine karşı felsefi kampanyalar (Tahâfütü'l-Felâsife)", "Şam, Kudüs, Mekke ve Hebron arasında manevi gezginlik (1095–1106)"],
    },
    leadershipStyle: {
      sv: "Al-Ghazalis ledarskap var rent intellektuellt och andligt. Han ledde inte arméer eller administrationer — han ledde sinnen. Hans pedagogik kombinerade sträng logik med personlig berättelse, juridisk precision med poetisk inlevelse. Det som gjorde honom unik var hans förmåga att vara samtidigt en ortodox jurist, en filosofisk skeptiker, en sufisk mystiker och en självkritisk autobiograf — fyra roller som vanligtvis exkluderade varandra i medeltidens islamiska tradition.",
      en: "Al-Ghazali's leadership was purely intellectual and spiritual. He led not armies or administrations — he led minds. His pedagogy combined rigorous logic with personal narrative, legal precision with poetic empathy. What made him unique was his ability to be simultaneously an orthodox jurist, a philosophical sceptic, a Sufi mystic and a self-critical autobiographer — four roles that usually excluded one another in the medieval Islamic tradition.",
      tr: "Gazzali'nin liderliği tamamen entelektüel ve manevidir. Orduları ya da yönetimleri değil — zihinleri yönetti.",
    },
    criticalPerspectives: {
      sv: "Al-Ghazalis kritiska arv är komplex. Vissa moderna historiker (notably Ibn Rushd själv och senare Marshall Hodgson) har anklagat honom för att ha 'dödat' den islamiska filosofin genom Tahafut al-Falasifa — för att ha legitimerat anti-rationalism och därigenom indirekt orsakat den islamiska civilisationens vetenskapliga stagnation efter 1100-talet. Denna tes är överdriven — Ghazali själv var en mästare i logik och respekterade Aristoteles. Men hans inflytande gjorde det mer riskfyllt för senare tänkare att engagera sig öppet med grekisk filosofi, vilket bidrog till en gradvis förskjutning från fri filosofisk spekulation mot juridisk och teologisk konformism i den sunnitiska världen.",
      en: "Al-Ghazali's critical legacy is complex. Some modern historians (notably Ibn Rushd himself and later Marshall Hodgson) have accused him of having 'killed' Islamic philosophy through Tahafut al-Falasifa — of having legitimised anti-rationalism and thereby indirectly causing the Islamic civilisation's scientific stagnation after the 1100s. This thesis is overstated — Ghazali himself was a master of logic and respected Aristotle. But his influence made it riskier for later thinkers to engage openly with Greek philosophy, contributing to a gradual shift from free philosophical speculation toward legal and theological conformism in the Sunni world.",
      tr: "Gazzali'nin eleştirel mirası karmaşıktır. Bazı modern tarihçiler onu Tahâfütü'l-Felâsife aracılığıyla İslam felsefesini 'öldürmekle' suçlamıştır — bu tez abartılıdır ama tartışmalıdır.",
    },
  },

  // ─── 15. MAHMUD II ──────────────────────────────────────────────────────────
  {
    id: "mahmud-ii",
    name: "Mahmud II",
    years: "ca. 1100–1131",
    title: { sv: "Västsultanens kämpe — Skuggan av Sanjar", en: "Western Sultan's Fighter — Sanjar's Shadow", tr: "Batı Sultanının Savaşçısı" },
    portrait: "⚔️",
    bio: {
      sv: "Mahmud II, son till Muhammad I Tapar, regerade det västra Seljukimperiet 1118–1131, parallellt med sin farbror Sanjars östliga välde. Strukturellt var hans position omöjlig: han var nominellt den överordnade sultanen av det västra imperiet, men Sanjar — som äldre son till Malik Shah I — krävde överhöghet. De flesta av de mäktiga atabegs lydde av vana och opportunism snarare än verklig lojalitet. Mahmud II:s karakteristiska egenskap var hans uthållighet. Han kämpade år på år mot upproriska atabegs, förhandlade med Abbasidkalifaten om stöd, och höll det minimala samman av ett imperium i splittring. Han dog 1131 av sjukdom — historikerna nämner 'hushållets sjukdom,' möjligen tuberkulos eller dysenteri. Hans söner ärvde hans problem utan hans politiska instinkt.",
      en: "Mahmud II, son of Muhammad I Tapar, ruled the western Seljuk Empire 1118–1131, parallel to his uncle Sanjar's eastern domain. Structurally his position was impossible: he was nominally the superior sultan of the western empire, but Sanjar — as an older son of Malik Shah I — claimed supremacy. Most of the powerful atabegs obeyed from habit and opportunism rather than genuine loyalty. Mahmud II's characteristic quality was his persistence. He fought year after year against rebellious atabegs, negotiated with the Abbasid caliphate for support, and held together the minimal remnant of an empire in fragmentation. He died in 1131 of illness — historians mention 'household sickness,' possibly tuberculosis or dysentery. His sons inherited his problems without his political instinct.",
      tr: "Muhammed I Tapar'ın oğlu Mahmud II, Sencer'in doğu egemenliğine paralel olarak 1118–1131 yılları arasında batı Selçuk İmparatorluğu'nu yönetti. Yapısal olarak konumu imkânsızdı. 1131'de hastalıktan öldü.",
    },
    reforms: {
      sv: ["Upprätthållandet av formal Seljukisk auktoritet i väst mot atabegarnas sönderfall", "Diplomatisk allians med Abbasidkalifaten och periodsvis militärt samarbete", "Temporär återerövrande av Mosul och norra Irak från upproriska provinshövdingar"],
      en: ["Maintenance of formal Seljuk authority in the west against atabegs' fragmentation", "Diplomatic alliance with the Abbasid caliphate and periodic military cooperation", "Temporary reconquest of Mosul and northern Iraq from rebellious provincial lords"],
      tr: ["Batıda atabeglerin parçalanmasına karşı biçimsel Selçuklu otoritesinin sürdürülmesi", "Abbasi halifeliğiyle diplomatik ittifak"],
    },
    campaigns: {
      sv: ["Krigen mot atabegs av Mosul (Zengids) och Azerbaijan", "Konflikt med sin farbror Sanjar om imperial överhöghet (förhandlad lösning 1120)", "Kampanjer mot Assassin-sektens fästningar i västra Persien"],
      en: ["Wars against atabegs of Mosul (Zengids) and Azerbaijan", "Conflict with his uncle Sanjar over imperial supremacy (negotiated resolution 1120)", "Campaigns against Assassin sect fortresses in western Persia"],
      tr: ["Musul (Zengiler) ve Azerbaycan atabeglerine karşı savaşlar", "Amcası Sencer ile imparatorluk üstünlüğü için çatışma (1120'de müzakere edilmiş çözüm)"],
    },
    leadershipStyle: {
      sv: "Mahmud II regerade med en kombination av diplomatisk flexibilitet och militär fasthet. Han var inte en militär genialisk som Alp Arslan eller en administrativ titan som Nizam al-Mulk — men han var en solide pragmatisk styrare i en era som krävde pragmatism framför grandiositet.",
      en: "Mahmud II ruled with a combination of diplomatic flexibility and military firmness. He was not a military genius like Alp Arslan or an administrative titan like Nizam al-Mulk — but he was a solid pragmatic ruler in an era that demanded pragmatism over grandiosity.",
      tr: "Mahmud II diplomatik esneklik ve askeri kararlılık kombinasyonuyla hüküm sürdü.",
    },
    criticalPerspectives: {
      sv: "Mahmud IIs styre misslyckas ultimativt av orsaker bortom hans kontroll. Det är svårt att kritisera hans specifika beslut när systemet han styrde var fundamentalt broken — en succession av mäktiga atabegs, en saknad civil militärkontroll, och en bror (Sanjars) dominerande position som underminerade hans auktoritet dagligen.",
      en: "Mahmud II's reign ultimately fails for reasons beyond his control. It is difficult to critique his specific decisions when the system he governed was fundamentally broken — a succession of powerful atabegs, absent civilian military control, and a brother's (Sanjar's) dominant position that undermined his authority daily.",
      tr: "Mahmud II'nin saltanatı nihayetinde kontrolü dışındaki nedenlerle başarısız olur.",
    },
  },

  // ─── 16. DAWUD (TOGHRUL II) ─────────────────────────────────────────────────
  {
    id: "dawud",
    name: "Dawud (Toghrul II)",
    years: "ca. 1105–1132",
    title: { sv: "Den kortvarige — En sultan som historien glömde", en: "The Brief One — A Sultan History Forgot", tr: "Kısa Süren — Tarihin Unuttuğu Sultan" },
    portrait: "⚡",
    bio: {
      sv: "Dawud, alias Toghrul II, är ett av de mest undanskymda namnen i Seljukisk dynasti-historia. Han regerade i knappt ett år, 1131–1132, och hans 'styre' är mer ett administrativt interregnum än ett verkligt sultanat. Han var son till Muhammad I Tapar och bror till Mahmud II, utsedd efter sin brors bortgång av ett hovet i Bagdad som behövde en sultan snabbt. Men Sanjars hand sträckte sig från öst — Sanjar tvingade att Mahmud IIs son Dawud ersattes av sin bror Masud. Dawuds korta tid som sultan ger oss en inblick i hur urgröpt den centrala Seljuksautoriteten blivit vid 1130-talet.",
      en: "Dawud, alias Toghrul II, is one of the most obscure names in Seljuk dynastic history. He reigned for barely a year, 1131–1132, and his 'reign' is more an administrative interregnum than a true sultanate. He was son of Muhammad I Tapar and brother of Mahmud II, appointed after his brother's passing by a Baghdad court that needed a sultan quickly. But Sanjar's hand reached from the east — Sanjar forced that Mahmud II's son Dawud be replaced by his brother Masud. Dawud's brief time as sultan gives us a glimpse into how hollowed out the central Seljuk authority had become by the 1130s.",
      tr: "Davud, diğer adıyla Tuğrul II, Selçuklu hanedanlık tarihinin en bilinmez isimlerinden biridir. 1131–1132 yılları arasında neredeyse bir yıl hüküm sürdü.",
    },
    reforms: { sv: ["Inga kända reformer under kortvarigt styre"], en: ["No known reforms during brief reign"], tr: ["Kısa saltanat süresince bilinen reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer — makt var i Sanjars och atabegarnas händer"], en: ["No known military campaigns — power was in Sanjar's and the atabegs' hands"], tr: ["Bilinen askeri sefer yok"] },
    leadershipStyle: { sv: "Inget meningsfullt ledarskap möjligt under ett interregnum av månaders längd.", en: "No meaningful leadership possible during an interregnum of months' length.", tr: "Aylarca süren bir ara dönemde anlamlı liderlik mümkün değildi." },
    criticalPerspectives: {
      sv: "Dawuds existens påminner oss om att imperiums fall inte alltid är dramatiska. Ibland är det en lång, tråkig, byråkratisk upplösning — sultan efter sultan utsedd och avsatt.",
      en: "Dawud's existence reminds us that empires' falls are not always dramatic. Sometimes it is a long, tedious, bureaucratic dissolution — sultan after sultan appointed and deposed.",
      tr: "Davud'un varlığı bize imparatorlukların çöküşünün her zaman dramatik olmadığını hatırlatır.",
    },
  },

  // ─── 17. TOGHRUL II ─────────────────────────────────────────────────────────
  {
    id: "toghrul-ii",
    name: "Toghrul II (Ibn Muhammad)",
    years: "ca. 1109–1135",
    title: { sv: "Kharasans regent — Brorslösa konungens kamp", en: "Regent of Khurasan — The Brotherhood-Less King's Struggle", tr: "Horasan'ın Naibı — Kardeşsiz Kralın Mücadelesi" },
    portrait: "🏛️",
    bio: {
      sv: "Toghrul II, son till Muhammad I Tapar, regerade 1132–1135 och representerar ännu ett exempel på hur det seljukiska successionsystemet skapade sultaner som var snarare verktyg för andras ambitioner än självständiga aktörer. Hans styre uppstod ur det politiska vakuum som Dawuds avsättning skapade. Sanjar — alltid den drivande kraften bakom de västra sultanernas val — föredrog Toghrul II framför andra pretendenter. Toghrul II regerade i ett land av atabegs vars faktiska makt hade vuxit till den grad att sultantiteln var ceremoniell mer än verklig.",
      en: "Toghrul II, son of Muhammad I Tapar, reigned 1132–1135 and represents yet another example of how the Seljuk succession system created sultans who were tools for others' ambitions rather than independent actors. His reign arose from the political vacuum that Dawud's deposition created. Sanjar — always the driving force behind the western sultans' choices — preferred Toghrul II over other pretenders. Toghrul II reigned in a land of atabegs whose actual power had grown to the point where the sultan title was ceremonial rather than real.",
      tr: "Muhammed I Tapar'ın oğlu Tuğrul II, 1132–1135 yılları arasında hüküm sürdü.",
    },
    reforms: { sv: ["Temporär stabilisering av västra Seljukimperiets förvaltning"], en: ["Temporary stabilisation of the western Seljuk Empire's administration"], tr: ["Batı Selçuk İmparatorluğu yönetiminin geçici istikrarlaşması"] },
    campaigns: {
      sv: ["Konflikter med Zengi-dynastin i Mosul och Syrien", "Defensiva operationer mot korsfararkungadömena"],
      en: ["Conflicts with the Zengi dynasty in Mosul and Syria", "Defensive operations against the Crusader kingdoms"],
      tr: ["Musul ve Suriye'deki Zengi hanedanlığıyla çatışmalar", "Haçlı krallıklarına karşı savunma operasyonları"],
    },
    leadershipStyle: { sv: "Militärt direkt och personligt engagerad, men hindrad av strukturella begränsningar bortom hans kontroll.", en: "Militarily direct and personally engaged, but hindered by structural limitations beyond his control.", tr: "Askeri açıdan doğrudan ve kişisel olarak bağlı, ama kontrolü dışındaki yapısal kısıtlamalar tarafından engellendi." },
    criticalPerspectives: {
      sv: "Toghrul II är ett typexempel på vad historiker kallar ett 'strukturellt offer' — en individ vars historiska roll mer definieras av det system han opererade i än av hans egna egenskaper.",
      en: "Toghrul II is a typical example of what historians call a 'structural victim' — an individual whose historical role is more defined by the system he operated within than by his own qualities.",
      tr: "Tuğrul II, tarihçilerin 'yapısal kurban' dediği şeyin tipik örneğidir.",
    },
  },

  // ─── 18. MASUD I ────────────────────────────────────────────────────────────
  {
    id: "masud-i",
    name: "Masud I (Ghiyath al-Din)",
    years: "ca. 1105–1152",
    title: { sv: "Nedgångens administratör — 17 år vid ratten av ett sjunkande skepp", en: "Administrator of the Decline — 17 Years at the Wheel of a Sinking Ship", tr: "Gerilemenin Yöneticisi" },
    portrait: "📋",
    bio: {
      sv: "Masud I, son till Muhammad I Tapar, regerade det västra Seljukimperiet 1135–1152 — 17 år, den längsta regeringstiden bland de senaste Seljukkungarna av Irak — och hans arv är en studie i vad det innebär att styra ett imperium i terminalfas med kompetens men utan makt att vända kursen. Han ärvde en stat vars centrala auktoritet hade eroderat i 40 år. Atabegs var nu de facto suveräner av sina provinser. Hans prioriteter: hålla Abbasidkalifaten neutral, hålla Zengiderna i schack, upprätthålla illusionen av central auktoritet länge nog för att hans söner skulle ärva någonting. Det lyckades han med. Seljukimperiet av Irak existerade formellt i ytterligare 42 år efter hans bortgång.",
      en: "Masud I, son of Muhammad I Tapar, ruled the western Seljuk Empire 1135–1152 — 17 years, the longest reign among the later Seljuk kings of Iraq — and his legacy is a study in what it means to govern an empire in terminal phase with competence but without power to reverse course. He inherited a state whose central authority had eroded for 40 years. Atabegs were now de facto sovereigns of their provinces. His priorities: keep the Abbasid caliphate neutral, keep the Zengids in check, maintain the illusion of central authority long enough for his sons to inherit something. He succeeded. The Seljuk Empire of Iraq formally existed for another 42 years after his passing.",
      tr: "Muhammed I Tapar'ın oğlu Mesud I, 1135–1152 yılları arasında batı Selçuk İmparatorluğu'nu yönetti — 17 yıl, Irak'ın geç Selçuklu kralları arasındaki en uzun saltanat.",
    },
    reforms: {
      sv: ["Diplomatisk balansering mellan Abbasidkalifaten och Zengi-dynastin", "Kompromisserade överenskommelser med atabegs för att förhindra öppen revolt", "Militär reorganisation av de centrala sultansstyrkorna"],
      en: ["Diplomatic balancing between the Abbasid caliphate and Zengi dynasty", "Compromise agreements with atabegs to prevent open revolt", "Military reorganisation of the central sultanic forces"],
      tr: ["Abbasi halifeliği ile Zengi hanedanı arasında diplomatik denge"],
    },
    campaigns: {
      sv: ["Krigen mot upproriska atabegs i Azerbajdzjan (1138)", "Konflikten med Zengi-dynastin om Mosul (1143–1147)", "Diplomatiska förhandlingar med korsfarare om vapenvila"],
      en: ["Wars against rebellious atabegs in Azerbaijan (1138)", "Conflict with the Zengi dynasty over Mosul (1143–1147)", "Diplomatic negotiations with Crusaders over truces"],
      tr: ["Azerbaycan'daki isyancı atabeglere karşı savaşlar (1138)", "Musul için Zengi hanedanlığıyla çatışma (1143–1147)"],
    },
    leadershipStyle: {
      sv: "Masud I var en administrativ realist — han styrde inte med visioner om restaurering av imperiet utan med precision om vad som var möjligt givet hans begränsade resurser. Hans förmåga att överleva politiskt i 17 år i en omöjlig situation är i sig ett bevis på kompetens.",
      en: "Masud I was an administrative realist — he governed not with visions of imperial restoration but with precision about what was possible given his limited resources. His ability to survive politically for 17 years in an impossible situation is itself evidence of competence.",
      tr: "Mesud I, idari bir realistdi.",
    },
    criticalPerspectives: {
      sv: "Masud I hade kanske kunnat göra mer för att reforma de grundläggande systemen — atabegarnas halvautonomi, successionsreglerna, den militäre finansieringen.",
      en: "Masud I could perhaps have done more to reform the fundamental systems — the atabegs' semi-autonomy, succession rules, military financing.",
      tr: "Mesud I belki temel sistemleri reform etmek için daha fazlasını yapabilirdi.",
    },
  },

  // ─── 19. MALIK SHAH III ─────────────────────────────────────────────────────
  {
    id: "malik-shah-iii",
    name: "Malik Shah III",
    years: "ca. 1130–1153",
    title: { sv: "Den siste av huvudlinjen — En kort soluppgång", en: "The Last of the Main Line — A Brief Sunrise", tr: "Ana Kolun Sonuncusu" },
    portrait: "🌅",
    bio: {
      sv: "Malik Shah III regerade i ungefär ett år — 1152–1153 — och hans tid är historiens kortaste anteckning om en mans kamp mot det oundvikliga. Han var son till Masud I och den siste sultanen av det centrala Seljukimperiets direkta Irak-linje. Han avsattes av sin farbror Muhammad II som ansåg att en mogen man med politisk erfarenhet var bättre lämpad att möta de kriser imperiet stod inför. Hans namn är 'Kung av Kungar' — samma titel som hans berömde urfader Malik Shah I burit. Men titeln är allt som är gemensamt.",
      en: "Malik Shah III reigned for approximately one year — 1152–1153 — and his time is history's briefest note about a man's struggle against the inevitable. He was son of Masud I and the last sultan of the central Seljuk Empire's direct Iraq line. He was deposed by his uncle Muhammad II who considered that a mature man with political experience was better suited to face the crises the empire confronted. His name is 'King of Kings' — the same title his famous ancestor Malik Shah I had borne. But the title is all they have in common.",
      tr: "Melikşah III yaklaşık bir yıl — 1152–1153 — hüküm sürdü.",
    },
    reforms: { sv: ["Inga kända substantiella reformer under ett-årig styre"], en: ["No known substantial reforms during one-year reign"], tr: ["Bir yıllık saltanat süresince bilinen önemli reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer"], en: ["No known military campaigns"], tr: ["Bilinen askeri sefer yok"] },
    leadershipStyle: { sv: "Otillräckliga historiska uppgifter för en meningsfull analys av ledarstil.", en: "Insufficient historical records for meaningful analysis of leadership style.", tr: "Liderlik tarzının anlamlı analizi için yetersiz tarihsel kayıtlar." },
    criticalPerspectives: {
      sv: "Malik Shah IIIs korta styre är mer symptom än orsak. Det representerar inte ett misslyckande av individen utan ett misslyckande av systemet.",
      en: "Malik Shah III's brief reign is more symptom than cause. It represents not the failure of an individual but the failure of a system.",
      tr: "Melikşah III'ün kısa saltanatı nedendan çok semptomdur.",
    },
  },

  // ─── 20. MUHAMMAD II ────────────────────────────────────────────────────────
  {
    id: "muhammad-ii",
    name: "Muhammad II (Rukn al-Din)",
    years: "ca. 1120–1159",
    title: { sv: "Upplösningstidens sultan — Sista kampen för en dynasty", en: "Sultan of the Dissolution Age — Last Fight for a Dynasty", tr: "Çözülme Çağının Sultanı" },
    portrait: "📉",
    bio: {
      sv: "Muhammad II avsatte sin nevö Malik Shah III 1153 och tog sultanstiteln — inte av egennytta utan av desperation. Han var övertygad om att ett äldre, mer erfaret huvud behövdes för att möta de kriser som hotade imperiet. Han hade delvis rätt. Under hans styre (1153–1159) lyckades han hålla samman det minimala kärnan av Seljukisk auktoritet i Irak. Han förhindrade en omedelbar Zengi-erövring. Han upprätthöll relationen med Abbasidkalifaten. Han undvek det totala politiska kollapset. Men 'undvika kollaps' är en låg ribba för ett imperiums berättelse.",
      en: "Muhammad II deposed his nephew Malik Shah III in 1153 and took the sultan title — not out of self-interest but out of desperation. He was convinced that an older, more experienced head was needed to face the crises threatening the empire. He was partly right. During his reign (1153–1159) he managed to hold together the minimal core of Seljuk authority in Iraq. He prevented an immediate Zengi conquest. He maintained the relationship with the Abbasid caliphate. He avoided total political collapse. But 'avoiding collapse' is a low bar for an empire's story.",
      tr: "Muhammed II, 1153'te yeğeni Melikşah III'ü tahttan indirdi ve sultan unvanını aldı.",
    },
    reforms: { sv: ["Temporary stabilisering av det irakiska Seljukimperiets centrala förvaltning", "Diplomatisk återförening med Abbasidkalifaten efter Malik Shah IIIs spänningar"], en: ["Temporary stabilisation of the Iraqi Seljuk Empire's central administration", "Diplomatic reconnection with the Abbasid caliphate after Malik Shah III's tensions"], tr: ["Irak Selçuklu İmparatorluğu merkezi yönetiminin geçici istikrarlaşması"] },
    campaigns: { sv: ["Defensiva operationer mot Zengi-dynastin under Nur ad-Din"], en: ["Defensive operations against the Zengi dynasty under Nur ad-Din"], tr: ["Nur ed-Din liderliğindeki Zengi hanedanına karşı savunma operasyonları"] },
    leadershipStyle: { sv: "Pragmatisk och desperat — en man som styrde med ett öga på omedelbar kris och ett öga på sin dynastis fortlevnad.", en: "Pragmatic and desperate — a man who ruled with one eye on immediate crisis and one eye on his dynasty's survival.", tr: "Pragmatik ve çaresiz." },
    criticalPerspectives: {
      sv: "Muhammad II's avsättning av Malik Shah III var ett symptom på systemets kroniska sjukdom: äldre anspråkstagare avsatte yngre, yngre avsatte äldre.",
      en: "Muhammad II's deposition of Malik Shah III was a symptom of the system's chronic illness: older claimants deposed younger ones, younger deposed older.",
      tr: "Muhammed II'nin Melikşah III'ü tahttan indirmesi, sistemin kronik hastalığının bir belirtisiydi.",
    },
  },

  // ─── 21. SULEIMAN SHAH ──────────────────────────────────────────────────────
  {
    id: "suleiman-shah",
    name: "Suleiman Shah (Ibn Muhammad Tapar)",
    years: "ca. 1115–1161",
    title: { sv: "Övergångssultanen — En man utan arv att lämna", en: "The Transitional Sultan — A Man with No Legacy to Leave", tr: "Geçiş Sultanı" },
    portrait: "🌉",
    bio: {
      sv: "Suleiman Shah, son till Muhammad I Tapar och därmed bror till Sanjar och Mahmud II, regerade det irakiska Seljukimperiet 1159–1161 i en av dess mest turbulenta perioder — men hans styre är historiskt nästan osynligt. Han regerade i ett landskap av faktiska makthavare: Zengi-dynastin under Nur ad-Din dominerade Syrien och hotade Irak. Suleiman Shah var i den praktiska meningen sultan utan kungadöme — titeln fanns, armén var liten, resurskassan var utarmat. Han avsattes av Arslan Shah 1161 — inte med blod och svärd utan med politisk manipulation.",
      en: "Suleiman Shah, son of Muhammad I Tapar and thus brother of Sanjar and Mahmud II, ruled the Iraqi Seljuk Empire 1159–1161 during one of its most turbulent periods — but his reign is historically almost invisible. He ruled in a landscape of actual power-holders: the Zengi dynasty under Nur ad-Din dominated Syria and threatened Iraq. Suleiman Shah was in the practical sense a sultan without a kingdom — the title existed, the army was small, the treasury depleted. He was deposed by Arslan Shah in 1161 — not with blood and sword but with political manipulation.",
      tr: "Süleyman Şah, 1159–1161 yılları arasında Irak Selçuklu İmparatorluğu'nu yönetti.",
    },
    reforms: { sv: ["Inga kända substantiella reformer"], en: ["No known substantial reforms"], tr: ["Bilinen önemli reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer under de korta 2 åren"], en: ["No known military campaigns during the brief 2 years"], tr: ["Kısa 2 yıl süresince bilinen askeri sefer yok"] },
    leadershipStyle: { sv: "Otillräckliga historiska data för analys.", en: "Insufficient historical data for analysis.", tr: "Analiz için yetersiz tarihsel veri." },
    criticalPerspectives: {
      sv: "Suleiman Shahs osynlighet i historien är i sig ett svar på varför Seljukimperiet föll: när ett imperium är tillräckligt svagt producerar det ledare vars viktigaste uppgift är att vara en titel, inte en kraft.",
      en: "Suleiman Shah's invisibility in history is itself an answer to why the Seljuk Empire fell: when an empire is weak enough it produces leaders whose most important task is to be a title, not a force.",
      tr: "Süleyman Şah'ın tarihsel görünmezliği, Selçuklu İmparatorluğu'nun neden düştüğünün cevabıdır.",
    },
  },

  // ─── 22. ARSLAN SHAH ────────────────────────────────────────────────────────
  {
    id: "arslan-shah",
    name: "Arslan Shah (Ibn Toghrul II)",
    years: "ca. 1135–1174",
    title: { sv: "Sena imperiets kämpe — Värdigheten i det hopplösas ljus", en: "Fighter of the Late Empire — Dignity in the Light of the Hopeless", tr: "Geç İmparatorluğun Savaşçısı" },
    portrait: "⚔️",
    bio: {
      sv: "Arslan Shah, son till Toghrul II och barnbarn till Muhammad I Tapar, regerade det irakiska Seljukimperiet 1161–1174 och representerar en av de mer värdiga avsluterna på den långa dynastiska sagan. Han kom till makten i ett land som höll på att delas av krafter mycket starkare än honom. Arslan Shahs strategi var djupt realistisk: han kämpade inte för att återvinna förlorade territorier — det var omöjligt. Han kämpade för att bevara en fungerande minimistat, ett suveränt territorium, en diplomatisk identitet, och framför allt — dynastins fortlevnad. Han dog 1174, sannolikt i fred, i sin säng. Det var mer än de flesta av hans samtida pretendenter uppnådde.",
      en: "Arslan Shah, son of Toghrul II and grandson of Muhammad I Tapar, ruled the Iraqi Seljuk Empire 1161–1174 and represents one of the more dignified endings to the long dynastic saga. He came to power in a country being divided by forces far stronger than himself. Arslan Shah's strategy was deeply realistic: he did not fight to reclaim lost territories — that was impossible. He fought to preserve a functioning minimal state, a sovereign territory, a diplomatic identity, and above all — the dynasty's survival. He died in 1174, probably in peace, in his bed. That was more than most of his contemporary pretenders achieved.",
      tr: "Arslan Şah, 1161–1174 yılları arasında Irak Selçuklu İmparatorluğu'nu yönetti. 1174'te muhtemelen barış içinde, yatağında öldü.",
    },
    reforms: {
      sv: ["Diplomatisk normalisering av relationer med Zengi-dynastin och Abbasidkalifaten", "Administrativ reorganisation av det minimala kvarlevande Seljukiska imperiet", "Strategisk bevarande av dynastisk kontinuitet mot externa hot"],
      en: ["Diplomatic normalisation of relations with the Zengi dynasty and Abbasid caliphate", "Administrative reorganisation of the minimal remaining Seljuk Empire", "Strategic preservation of dynastic continuity against external threats"],
      tr: ["Zengi hanedanı ve Abbasi halifeliğiyle ilişkilerin diplomatik normalleşmesi"],
    },
    campaigns: {
      sv: ["Defensiva operationer mot Zengi-expansionen under Nur ad-Din", "Diplomatiska missioner mot korsfarare och byzansinska rester", "Kampanjen mot upproriska atabegs i Luristand och Khuzistan"],
      en: ["Defensive operations against Zengi expansion under Nur ad-Din", "Diplomatic missions toward Crusaders and Byzantine remnants", "Campaign against rebellious atabegs in Luristan and Khuzistan"],
      tr: ["Nur ed-Din liderliğindeki Zengi genişlemesine karşı savunma operasyonları"],
    },
    leadershipStyle: {
      sv: "Arslan Shah var en diplomatisk pragmatist med militär grundkompetens — en man som förstod det möjligas konst i en situation som erbjöd få möjligheter.",
      en: "Arslan Shah was a diplomatic pragmatist with basic military competence — a man who understood the art of the possible in a situation that offered few possibilities.",
      tr: "Arslan Şah, temel askeri yetkinliğe sahip diplomatik bir pragmatistti.",
    },
    criticalPerspectives: {
      sv: "Arslan Shahs försiktiga diplomatik kurs är förståelig men kan kritiseras för att aldrig ha tillåtit Seljukimperiet en chans till verklig restaurering.",
      en: "Arslan Shah's cautious diplomatic course is understandable but can be criticised for never allowing the Seljuk Empire a chance at genuine restoration.",
      tr: "Arslan Şah'ın temkinli diplomatik rotası anlaşılır, ama eleştirilebilir.",
    },
  },

  // ─── 23. TOGHRUL III ────────────────────────────────────────────────────────
  {
    id: "toghrul-iii",
    name: "Toghrul III (Ibn Arslan Shah)",
    years: "ca. 1155–1194",
    title: { sv: "Den siste Seljuk-sultanen av Irak", en: "The Last Seljuk Sultan of Iraq", tr: "Irak'ın Son Selçuk Sultanı" },
    portrait: "🌇",
    bio: {
      sv: "Toghrul III, son till Arslan Shah och barnbarn till Toghrul II, är det sista stora namnet i det centrala Seljukimperiets historia. Han regerade 1174–1194 och är den siste sultanen att försöka upprätthålla Seljukisk militär och politisk kraft i Irak och Persien. I sin ungdom var han faktiskt en aktiv och modig militär ledare som bekämpade de Khwarazmiska styrkorna och kämpade för att återvinna Seljukisk mark. Men han mötte en överväldigande fiende: Khwarazm-shahen Tekish vars militär och resurser var vida överlägsna det utmattade Seljukimperiet. 1194 dödades Toghrul III i strid med Tekish vid Rayy — hans fall markerar det officiella slutet på det Stora Seljukimperiet.",
      en: "Toghrul III, son of Arslan Shah and grandson of Toghrul II, is the last great name in the central Seljuk Empire's history. He reigned 1174–1194 and is the last sultan to attempt maintaining Seljuk military and political force in Iraq and Persia. In his youth he was actually an active and courageous military leader who combated Khwarazmian forces and struggled to reclaim Seljuk land. But he faced an overwhelming enemy: Khwarazm-shah Tekish whose military and resources vastly exceeded the exhausted Seljuk Empire. In 1194 Toghrul III was killed in battle against Tekish at Rayy — his fall marks the official end of the Great Seljuk Empire.",
      tr: "Tuğrul III, merkezi Selçuk İmparatorluğu tarihinin son büyük adıdır. 1174–1194 arasında hüküm sürdü ve 1194'te Rayy'da Harizm Şahı Tekiş'e karşı savaşta öldürüldü.",
    },
    reforms: {
      sv: ["Försök att militärt återvinna Seljukisk position mot Khwarazmianerna"],
      en: ["Attempts to militarily reclaim Seljuk position against the Khwarazmians"],
      tr: ["Harizmşahlara karşı Selçuklu konumunu askeri olarak geri kazanma girişimleri"],
    },
    campaigns: {
      sv: ["Krigen mot Khwarazm-shahen Tekish (1180s-1194)", "Defensiva kampanjer mot Khwarazmisk expansion", "Sista striden vid Rayy (1194) — Toghrul III faller i strid"],
      en: ["Wars against Khwarazm-shah Tekish (1180s–1194)", "Defensive campaigns against Khwarazmian expansion", "Final battle at Rayy (1194) — Toghrul III falls in battle"],
      tr: ["Harizm Şahı Tekiş'e karşı savaşlar (1180'ler–1194)", "Rayy'daki son savaş (1194)"],
    },
    leadershipStyle: {
      sv: "Toghrul III var en aktiv och personligen modig sultan — inte en passiv symbol utan en aktiv deltagare i strid. Hans tragedi var att han kämpade mot strukturellt övermäktiga odds. Han dog som en riktig sultan: i strid, med sina soldater, med svärd i hand.",
      en: "Toghrul III was an active and personally courageous sultan — not a passive symbol but an active participant in battle. His tragedy was that he fought against structurally overwhelming odds. He died as a real sultan: in battle, with his soldiers, sword in hand.",
      tr: "Tuğrul III, aktif ve kişisel olarak cesur bir sultandı. Gerçek bir sultan gibi öldü: savaşta, askerleriyle, elinde kılıcıyla.",
    },
    criticalPerspectives: {
      sv: "Toghrul III hade lite att erbjuda sina undersåtar mot slutet — Seljukimperiet var ekonomiskt utmattat, militärt försvagat och politiskt fragmenterat. Hans personliga tapperhet ändrade inte den historiska dynamiken.",
      en: "Toghrul III had little to offer his subjects at the end — the Seljuk Empire was economically exhausted, militarily weakened and politically fragmented. His personal bravery did not change the historical dynamics.",
      tr: "Tuğrul III'ün sonunda tebaasına sunacak çok şeyi yoktu.",
    },
  },

  // ─── 24. TUTUSH I (NEW — Malik Shah's brother, Sultan of Syria) ───────────
  {
    id: "tutush-i",
    name: "Tutush I",
    years: "ca. 1066–1095",
    title: { sv: "Syriens sultan — Den stridslystne brodern", en: "Sultan of Syria — The Combative Brother", tr: "Suriye Sultanı — Kavgacı Kardeş" },
    portrait: "🗡️",
    bio: {
      sv: "Tutush I är en av Seljukhistoriens mest färgstarka figurer — bror till Malik Shah I och grundare av den syriska Seljuk-grenen. När Malik Shah expanderade söderut på 1080-talet skickade han Tutush att erövra och styra Syrien. Tutush erövrade Damaskus 1078 och Antiochia 1085 i en serie blixtkampanjer mot Fatimiderna och Bysans. Han etablerade Aleppo och Damaskus som sin maktbas och styrde Syrien som en nästan självständig sultan under sin brors nominella överhöghet. När Malik Shah dog 1092 bröt Tutush den dynastiska freden och försökte själv ta hela Seljukimperiets tron. Han mobiliserade en armé och marscherade österut för att utmana sin brorson Barkiyaruq. De möttes vid slaget vid Rayy 1095 — Tutush dödades i strid, hans armé krossades och syriska Seljuk-grenen skadades permanent. Hans söner Ridwan av Aleppo och Duqaq av Damaskus delade arvet och deras splittring underlättade korsfararnas erövring av Antiochia 1098.",
      en: "Tutush I is one of Seljuk history's most colourful figures — brother of Malik Shah I and founder of the Syrian Seljuk branch. When Malik Shah expanded southward in the 1080s he sent Tutush to conquer and rule Syria. Tutush captured Damascus in 1078 and Antioch in 1085 in a series of lightning campaigns against the Fatimids and Byzantium. He established Aleppo and Damascus as his power base and ruled Syria as an almost independent sultan under his brother's nominal overlordship. When Malik Shah died in 1092 Tutush broke the dynastic peace and attempted to take the entire Seljuk Empire's throne for himself. He mobilised an army and marched east to challenge his nephew Barkiyaruq. They met at the Battle of Rayy in 1095 — Tutush was killed in battle, his army crushed and the Syrian Seljuk branch permanently damaged. His sons Ridwan of Aleppo and Duqaq of Damascus divided the inheritance and their split facilitated the Crusaders' conquest of Antioch in 1098.",
      tr: "Tutuş I, Selçuk tarihinin en renkli figürlerinden biridir — Melikşah I'in kardeşi ve Suriye Selçuklu kolunun kurucusu. 1078'de Şam'ı, 1085'te Antakya'yı fethetti. 1092'de Melikşah öldüğünde tüm Selçuk İmparatorluğu tahtını almaya çalıştı. 1095'te Rayy Savaşı'nda öldürüldü.",
    },
    reforms: {
      sv: ["Etablerandet av Seljukisk administration i Syrien och Palestina", "Skapandet av en distinkt syrisk-Seljukisk militärtradition", "Patronage av sunni-revival i Damaskus mot Fatimid-shia"],
      en: ["Establishment of Seljuk administration in Syria and Palestine", "Creation of a distinct Syrian-Seljuk military tradition", "Patronage of Sunni revival in Damascus against Fatimid Shia"],
      tr: ["Suriye ve Filistin'de Selçuklu yönetiminin tesisi", "Suriye-Selçuklu askeri geleneğinin yaratılması"],
    },
    campaigns: {
      sv: ["Erövringen av Damaskus (1078) från Fatimiderna", "Erövringen av Antiochia (1085) från Bysans", "Krigen mot beduinemirer i Palestina och Syrien", "Den fatala kampanjen mot Barkiyaruq och slaget vid Rayy (1095)"],
      en: ["Conquest of Damascus (1078) from the Fatimids", "Conquest of Antioch (1085) from Byzantium", "Wars against Bedouin emirs in Palestine and Syria", "The fatal campaign against Barkiyaruq and the Battle of Rayy (1095)"],
      tr: ["Şam'ın Fatımilerden fethi (1078)", "Antakya'nın Bizans'tan fethi (1085)", "Berkyaruk'a karşı ölümcül sefer ve Rayy Savaşı (1095)"],
    },
    leadershipStyle: {
      sv: "Tutush var den klassiska militära äventyraren — modig, ambitiös, förmåga att inspirera lojalitet bland sina trupper, men oförmögen till politisk självkontroll. Hans beslut att utmana sin brorson om hela imperiets tron var en spelbet om allt eller intet — och han förlorade.",
      en: "Tutush was the classic military adventurer — brave, ambitious, capable of inspiring loyalty among his troops, but incapable of political self-restraint. His decision to challenge his nephew for the entire empire's throne was a gamble of all or nothing — and he lost.",
      tr: "Tutuş klasik bir askeri maceracıydı — cesur, hırslı, ama siyasi öz denetimden yoksun.",
    },
    criticalPerspectives: {
      sv: "Tutush's ambition var Seljukimperiets förbannelse i miniatyr — varje prins av blod ansåg sig ha rätt till tronen, varje strid om tronen försvagade imperiet. Hans personliga tragedi var också den dynastiska tragedin: ett system där bröder och farbröder och brorsöner kämpade till döds över ett arv som ingen kunde behålla intakt.",
      en: "Tutush's ambition was the Seljuk Empire's curse in miniature — every prince of blood considered himself entitled to the throne, every battle over the throne weakened the empire. His personal tragedy was also the dynastic tragedy: a system where brothers and uncles and nephews fought to the death over an inheritance none could keep intact.",
      tr: "Tutuş'un hırsı, küçük ölçekte Selçuk İmparatorluğu'nun lanetiydi.",
    },
  },

  // ─── 25. ROMANOS IV DIOGENES (NEW — Byzantine Emperor at Manzikert) ──────
  {
    id: "romanos-iv-diogenes",
    name: "Romanos IV Diogenes",
    years: "ca. 1030–1072",
    title: { sv: "Romarnas kejsare — Manzikerts förlorare", en: "Emperor of the Romans — Loser of Manzikert", tr: "Romalıların İmparatoru — Malazgirt'in Kaybedeni" },
    portrait: "👑",
    bio: {
      sv: "Romanos IV Diogenes är den bysantinske kejsare vars tragedi vid Manzikert 1071 förändrade världshistorien. Han kom från en anatolisk militäraristokratisk familj och steg till tronen 1068 genom att gifta sig med kejsarinnan Eudokia, änkan efter Constantin X. Han ärvde ett bysantinskt imperium i kris — ekonomiskt försvagat av decennier av civil-militär konflikt mellan Konstantinopels byråkrater och de anatoliska militära aristokraterna, och alltmer hotat av Seljukernas raids in i Anatolien. Han mobiliserade den största bysantinska armén på ett sekel — 70 000–100 000 man enligt försiktiga uppskattningar — för att en gång för alla krossa det Seljukiska hotet. Det resulterade i den största militära katastrofen i bysantinsk historia. Vid Manzikert blev han personligen tillfångatagen, behandlades med oväntad ridderlighet av Alp Arslan, och släpptes mot lösen. Men hans politiska fiender i Konstantinopel utnyttjade nederlaget för att avsätta honom. När han återvände till imperiet möttes han av en ny kejsare (Mikael VII Doukas), tillfångatogs, blindades brutalt och dog kort därefter av sina sår. Hans tragedi är personlig och historisk: en man som försökte rädda Bysans förlorade Anatolien för alltid.",
      en: "Romanos IV Diogenes is the Byzantine emperor whose tragedy at Manzikert in 1071 changed world history. He came from an Anatolian military aristocratic family and rose to the throne in 1068 by marrying Empress Eudokia, widow of Constantine X. He inherited a Byzantine Empire in crisis — economically weakened by decades of civil-military conflict between Constantinople's bureaucrats and the Anatolian military aristocrats, and increasingly threatened by Seljuk raids into Anatolia. He mobilised the largest Byzantine army in a century — 70,000–100,000 men by conservative estimates — to once and for all crush the Seljuk threat. It resulted in the largest military catastrophe in Byzantine history. At Manzikert he was personally captured, treated with unexpected chivalry by Alp Arslan, and released for ransom. But his political enemies in Constantinople used the defeat to depose him. When he returned to the empire he met a new emperor (Michael VII Doukas), was captured, brutally blinded and died shortly afterwards of his wounds. His tragedy is personal and historical: a man who tried to save Byzantium lost Anatolia forever.",
      tr: "Romen IV Diyojen, 1071'deki Malazgirt trajedisi dünya tarihini değiştiren Bizans imparatorudur. Anadolu askeri aristokrat bir aileden geldi ve 1068'de İmparatoriçe Eudokia ile evlenerek tahta çıktı. Bir yüzyıldır görülmemiş büyüklükteki Bizans ordusunu — 70.000–100.000 adam — Selçuk tehdidini bir kez ve sonsuza dek ezmek için seferber etti. Malazgirt'te bizzat esir alındı, Alparslan tarafından beklenmedik bir şövalyelikle muamele gördü ve fidye karşılığında serbest bırakıldı. Konstantinopol'daki siyasi düşmanları yenilgiyi onu tahttan indirmek için kullandı. İmparatorluğa döndüğünde yeni bir imparatorla karşılaştı, esir alındı, vahşice kör edildi ve kısa süre sonra yaralarından öldü.",
    },
    reforms: {
      sv: ["Återupplivning av den anatoliska militära themasystemet (provinsarmé)", "Reformer av den bysantinska kavalleritaktiken för att bekämpa nomader", "Försök att återintegrera anatoliska aristokrater i Konstantinopels administration"],
      en: ["Revival of the Anatolian military thema system (provincial army)", "Reforms of Byzantine cavalry tactics to combat nomads", "Attempts to reintegrate Anatolian aristocrats into Constantinople's administration"],
      tr: ["Anadolu askeri thema sisteminin yeniden canlandırılması", "Göçebelere karşı Bizans süvari taktiğinin reformları"],
    },
    campaigns: {
      sv: ["Tre kampanjer i Anatolien mot Seljuk-raids (1068, 1069, 1070)", "Den fatala Manzikert-kampanjen (1071)", "Försök att återvinna Antiochia från Seljukisk kontroll"],
      en: ["Three campaigns in Anatolia against Seljuk raids (1068, 1069, 1070)", "The fatal Manzikert campaign (1071)", "Attempts to recover Antioch from Seljuk control"],
      tr: ["Selçuk akınlarına karşı Anadolu'da üç sefer (1068, 1069, 1070)", "Ölümcül Malazgirt seferi (1071)"],
    },
    leadershipStyle: {
      sv: "Romanos var en militär aristokrat först och politiker andra — han hade inga av de byråkratiska och intrigeringsförmågor som Konstantinopels hov krävde. Hans personliga mod var oomtvistat — han kämpade i frontlinjen vid Manzikert och vägrade fly även när hans armé bröts. Men hans politiska naivitet kostade honom tronen och slutligen livet.",
      en: "Romanos was a military aristocrat first and politician second — he had none of the bureaucratic and intriguing skills Constantinople's court required. His personal courage was undisputed — he fought in the front line at Manzikert and refused to flee even when his army broke. But his political naivety cost him the throne and ultimately his life.",
      tr: "Romen önce askeri aristokrat, sonra siyasetçiydi. Kişisel cesareti tartışmasızdı — Malazgirt'te ön cephede savaştı ve ordusu kırıldığında bile kaçmayı reddetti.",
    },
    criticalPerspectives: {
      sv: "Manzikert kunde ha varit en mindre dramatisk händelse om bysantinerna hade reagerat strategiskt och systematiskt efter slaget. Det som verkligen förlorade Anatolien var inte det enskilda nederlaget — det var det därpå följande inbördeskriget i Konstantinopel som lämnade hela det östra Anatolien utan försvar i ett decennium medan Seljuker, turkiska stammar och armeniska aktörer fyllde maktvakuumet. Romanos tragedi var att han gav sina politiska fiender ammunitionen att förstöra honom — och därigenom också Anatolien.",
      en: "Manzikert could have been a less dramatic event if the Byzantines had reacted strategically and systematically after the battle. What truly lost Anatolia was not the single defeat — it was the subsequent civil war in Constantinople that left all of eastern Anatolia undefended for a decade while Seljuks, Turkish tribes and Armenian actors filled the power vacuum. Romanos's tragedy was that he gave his political enemies the ammunition to destroy him — and thereby also Anatolia.",
      tr: "Malazgirt, Bizanslılar savaşın ardından stratejik ve sistematik tepki vermiş olsalardı daha az dramatik bir olay olabilirdi.",
    },
  },

  // ─── 26. CALIPH AL-QA'IM (NEW — legitimised the Sultan title) ─────────────
  {
    id: "caliph-al-qaim",
    name: "Caliph Al-Qa'im bi-Amr Allah",
    years: "1001–1075",
    title: { sv: "Profetens efterträdare — Sultan-titelns helgare", en: "Successor of the Prophet — Sanctifier of the Sultan Title", tr: "Peygamberin Halifesi — Sultan Unvanının Kutsallaştırıcısı" },
    portrait: "📿",
    bio: {
      sv: "Al-Qa'im bi-Amr Allah är den abbasidiske kalif som regerade i 44 år och vars långa, lidsamma och ändå politiskt avgörande styre formade den Seljukisk-abbasidiska politiska teologin. Han ärvde kalifatet 1031 vid en tidpunkt då dess politiska makt var nästan utplånad — Buyid-dynastins shia-furstar i Bagdad hade gjort honom till en marionett, och han kunde inte ens utse sina egna ministrar utan deras godkännande. I tre decennier led han denna förödmjukelse i tystnad, opererande genom religiös diplomati och korrespondens med oberoende sunni-emirer. När Tughril Beg närmade sig Bagdad 1055 såg al-Qa'im sin chans. Han öppnade staden för Seljukerna utan motstånd och förhandlade en revolutionär politisk teori med dem: kalifen behöll religiös auktoritet och titel som 'Profetens efterträdare,' medan sultanen tog all temporal politisk och militär makt. Det var en pragmatisk kompromiss som räddade kalifatet från utplåning men reducerade det till en ceremoniell roll. Al-Qa'im dog 1075 efter att ha regerat genom Tughril Beg, Alp Arslan och första delarna av Malik Shahs styre — han bevittnade Seljukimperiets uppstigning från grundläggande nivå till dess geografiska zenith.",
      en: "Al-Qa'im bi-Amr Allah is the Abbasid caliph who reigned for 44 years and whose long, suffering yet politically decisive rule shaped the Seljuk-Abbasid political theology. He inherited the caliphate in 1031 at a time when its political power was nearly extinguished — the Buyid dynasty's Shia princes in Baghdad had made him a puppet, and he could not even appoint his own ministers without their approval. For three decades he endured this humiliation in silence, operating through religious diplomacy and correspondence with independent Sunni emirs. When Tughril Beg approached Baghdad in 1055, al-Qa'im saw his chance. He opened the city to the Seljuks without resistance and negotiated a revolutionary political theory with them: the caliph retained religious authority and the title 'Successor of the Prophet,' while the sultan took all temporal political and military power. It was a pragmatic compromise that saved the caliphate from extinction but reduced it to a ceremonial role. Al-Qa'im died in 1075 after having reigned through Tughril Beg, Alp Arslan and the early years of Malik Shah's rule — he witnessed the Seljuk Empire's ascent from basic level to its geographic zenith.",
      tr: "El-Kaim bi-Emrillah, 44 yıl hüküm süren Abbasi halifesidir. 1031'de halifelliği siyasi gücü neredeyse tükenmiş bir dönemde devraldı — Bağdat'taki Büveyhi Şii prensleri onu kuklaya dönüştürmüştü. 1055'te Tuğrul Bey Bağdat'a yaklaştığında fırsatını gördü. Devrimsel bir siyasi teori müzakere etti: halife dini otoriteyi korurken, sultan tüm dünyevi siyasi ve askeri gücü aldı. 1075'te öldü.",
    },
    reforms: {
      sv: ["Förhandlingen om sultan-kalifat-alliansen (1055) — den islamiska politiska teologins fundament i 200 år", "Återställande av sunni-religiösa institutioner i Bagdad efter Buyid-dominansen", "Etablerande av kalifatet som en religiös auktoritet skild från politisk makt"],
      en: ["Negotiation of the sultan-caliphate alliance (1055) — the foundation of Islamic political theology for 200 years", "Restoration of Sunni religious institutions in Baghdad after Buyid dominance", "Establishment of the caliphate as a religious authority distinct from political power"],
      tr: ["Sultan-halifelik ittifakının müzakeresi (1055) — 200 yıl boyunca İslam siyasi teolojisinin temeli", "Büveyhi egemenliğinin ardından Bağdat'taki Sünni dini kurumların restorasyonu"],
    },
    campaigns: {
      sv: ["Diplomatisk kampanj mot Buyid-dynastin (1031–1055)", "Korrespondens och allianser med oberoende sunni-emirer", "Förhandling med Tughril Beg om Bagdads överlämning (1055)", "Religiösa proklamationer som legitimerade Seljukisk expansion"],
      en: ["Diplomatic campaign against the Buyid dynasty (1031–1055)", "Correspondence and alliances with independent Sunni emirs", "Negotiation with Tughril Beg over Baghdad's surrender (1055)", "Religious proclamations legitimising Seljuk expansion"],
      tr: ["Büveyhi hanedanına karşı diplomatik kampanya (1031–1055)", "Bağımsız Sünni emirlerle yazışma ve ittifaklar", "Tuğrul Bey ile Bağdat'ın teslimi konusunda müzakere (1055)"],
    },
    leadershipStyle: {
      sv: "Al-Qa'im var en mästare av politisk uthållighet och religiös symbolik. Han hade ingen militär makt, ingen ekonomisk kontroll, ingen administrativ apparat — bara titeln 'Profetens efterträdare' och den medeltida islamiska världens djupa respekt för religiös auktoritet. Hans skicklighet var att veta exakt hur långt han kunde böja titel utan att bryta den, och hur länge han kunde vänta innan rätt ögonblick kom.",
      en: "Al-Qa'im was a master of political patience and religious symbolism. He had no military power, no economic control, no administrative apparatus — only the title 'Successor of the Prophet' and the medieval Islamic world's deep respect for religious authority. His skill was knowing exactly how far he could bend the title without breaking it, and how long he could wait until the right moment came.",
      tr: "El-Kaim, siyasi sabır ve dini sembolizm ustasıydı. Askeri gücü, ekonomik kontrolü, idari aygıtı yoktu — yalnızca 'Peygamberin Halifesi' unvanı ve ortaçağ İslam dünyasının dini otoriteye duyduğu derin saygı vardı.",
    },
    criticalPerspectives: {
      sv: "Al-Qa'ims kompromiss med Tughril räddade kalifatets institution men reducerade kalifernas politiska relevans permanent. Efter 1055 kunde ingen kalif någonsin återvinna substantiell politisk makt — kalifatet blev en symbol, inte en institution. Vissa historiker (notably Marshall Hodgson) argumenterar att detta var oundvikligt — kalifatet var politiskt dött i praktiken sedan 945. Andra menar att al-Qa'im accepterade en alltför svag kompromiss och att en mer aggressiv kalif hade kunnat förhandla bättre villkor.",
      en: "Al-Qa'im's compromise with Tughril saved the institution of the caliphate but permanently reduced the caliphs' political relevance. After 1055 no caliph could ever recover substantial political power — the caliphate became a symbol, not an institution. Some historians (notably Marshall Hodgson) argue this was inevitable — the caliphate was politically dead in practice since 945. Others maintain that al-Qa'im accepted too weak a compromise and that a more aggressive caliph could have negotiated better terms.",
      tr: "El-Kaim'in Tuğrul ile uzlaşması halifelik kurumunu kurtardı ama halifelerin siyasi önemini kalıcı olarak azalttı.",
    },
  },

  // ─── 27. SULEIMAN IBN QUTALMISH (NEW — Founder of Sultanate of Rum) ──────
  {
    id: "suleiman-ibn-qutalmish",
    name: "Suleiman ibn Qutalmish",
    years: "ca. 1040–1086",
    title: { sv: "Rûms grundare — Anatoliens första sultan", en: "Founder of Rûm — Anatolia's First Sultan", tr: "Rum'un Kurucusu — Anadolu'nun İlk Sultanı" },
    portrait: "🏰",
    bio: {
      sv: "Suleiman ibn Qutalmish är den Seljukiske prins som grundade Sultanatet av Rûm — den anatoliska Seljuk-grenen som överlevde det centrala imperiets fall med 100 år och som direkt föregick det osmanska imperiet. Han var son till Qutalmish, en kusin till Tughril Beg som hade förlorat ett tronkampskrig mot Alp Arslan och dödats. Suleiman, son till en förlorare, fick inget arv i det centrala imperiet — han blev ledaren för nomadiska turkmenska stammar som strömmade in i Anatolien efter Manzikert. 1077 erövrade han Nicaea (dagens İznik) — den bysantinska kejsarstadens närmaste sista bastion — och utropade sig till sultan av Rûm ('Rom,' som muslimerna kallade Bysans). Hans territorium expanderade snabbt västerut nästan till Bosporen och söderut till Cilicien. Han dödades 1086 i strid mot sin kusin Tutush I om kontrollen av Antiochia. Hans son Kilij Arslan I ärvde Rûm-sultanatet och lyckades försvara det mot det Första korståget.",
      en: "Suleiman ibn Qutalmish is the Seljuk prince who founded the Sultanate of Rûm — the Anatolian Seljuk branch that survived the central empire's fall by 100 years and directly preceded the Ottoman Empire. He was son of Qutalmish, a cousin of Tughril Beg who had lost a throne struggle against Alp Arslan and was killed. Suleiman, son of a loser, received no inheritance in the central empire — he became the leader of nomadic Turkmen tribes pouring into Anatolia after Manzikert. In 1077 he captured Nicaea (modern İznik) — the Byzantine imperial city's closest remaining bastion — and proclaimed himself sultan of Rûm ('Rome,' as Muslims called Byzantium). His territory expanded rapidly westward almost to the Bosporus and southward to Cilicia. He was killed in 1086 in battle against his cousin Tutush I over control of Antioch. His son Kilij Arslan I inherited the Rûm Sultanate and managed to defend it against the First Crusade.",
      tr: "Süleyman ibn Kutalmış, Rum Sultanlığı'nın kurucusudur — merkezi imparatorluğun çöküşünden 100 yıl sonra hayatta kalan ve doğrudan Osmanlı İmparatorluğu'ndan önce gelen Anadolu Selçuklu kolu. Malazgirt'in ardından Anadolu'ya akın eden göçebe Türkmen kabilelerinin lideri oldu. 1077'de İznik'i ele geçirdi ve kendini Rum sultanı ilan etti. 1086'da kuzeni Tutuş I ile yapılan savaşta öldürüldü.",
    },
    reforms: {
      sv: ["Grundandet av Sultanatet av Rûm med Nicaea som första huvudstad (1077)", "Etablerandet av en Seljukisk administration över anatoliska turkmenska stammar", "Diplomatiska relationer med både Bysans och fragmenterade armeniska furstar"],
      en: ["Founding of the Sultanate of Rûm with Nicaea as first capital (1077)", "Establishment of a Seljuk administration over Anatolian Turkmen tribes", "Diplomatic relations with both Byzantium and fragmented Armenian princes"],
      tr: ["Rum Sultanlığı'nın kurulması (1077)", "Anadolu Türkmen kabilelerinin Selçuklu yönetimi altında örgütlenmesi"],
    },
    campaigns: {
      sv: ["Erövringen av Nicaea (1077)", "Erövringen av Konya (1080-talet)", "Expansion söderut mot Cilicien och Antiochia (1080-talet)", "Den fatala konflikten med Tutush I om Antiochia (1086)"],
      en: ["Conquest of Nicaea (1077)", "Conquest of Konya (1080s)", "Expansion southward toward Cilicia and Antioch (1080s)", "The fatal conflict with Tutush I over Antioch (1086)"],
      tr: ["İznik'in fethi (1077)", "Konya'nın fethi (1080'ler)", "Antakya için Tutuş I ile ölümcül çatışma (1086)"],
    },
    leadershipStyle: {
      sv: "Suleiman var en pragmatisk och opportunistisk ledare — utan dynastisk arvsrätt i det centrala imperiet skapade han sin egen suveränitet ur kaoset av det postManzikert-Anatolien. Han ledde inte armeer i traditionell mening — han ledde ett konstellation av turkmenska stammar genom personlig auktoritet, äktenskapsallianser och religiös karisma.",
      en: "Suleiman was a pragmatic and opportunistic leader — without dynastic birthright in the central empire he created his own sovereignty out of the chaos of post-Manzikert Anatolia. He did not lead armies in the traditional sense — he led a constellation of Turkmen tribes through personal authority, marriage alliances and religious charisma.",
      tr: "Süleyman pragmatik ve fırsatçı bir liderdi — merkezi imparatorlukta hanedanlık doğum hakkı olmadan, Malazgirt sonrası Anadolu kaosundan kendi egemenliğini yarattı.",
    },
    criticalPerspectives: {
      sv: "Suleimans grundande av Sultanatet av Rûm var den första permanenta turkiska politiska entiteten i Anatolien — det är den direkta föregångaren till osmanerna och till det moderna Turkiet. Hans territorium kostade kristna anatoliska samhällen sina hem, kyrkor och kulturella institutioner. Den demografiska transformationen av Anatolien från grek-kristen till turkisk-muslimsk pågick i 200 år och var en av medeltidens mest dramatiska kulturella förändringar.",
      en: "Suleiman's founding of the Sultanate of Rûm was the first permanent Turkish political entity in Anatolia — it is the direct predecessor of the Ottomans and of modern Turkey. His territory cost Christian Anatolian communities their homes, churches and cultural institutions. The demographic transformation of Anatolia from Greek-Christian to Turkish-Muslim took 200 years and was one of the medieval world's most dramatic cultural changes.",
      tr: "Süleyman'ın Rum Sultanlığı'nı kurması, Anadolu'daki ilk kalıcı Türk siyasi varlığıydı — Osmanlıların ve modern Türkiye'nin doğrudan öncülüdür.",
    },
  },

  // ─── 28. KILIJ ARSLAN I (NEW — Sultan of Rum vs First Crusade) ───────────
  {
    id: "kilij-arslan-i",
    name: "Kilij Arslan I",
    years: "ca. 1079–1107",
    title: { sv: "Rûms försvarare — Korsfararnas första motståndare", en: "Defender of Rûm — First Opponent of the Crusaders", tr: "Rum'un Savunucusu — Haçlıların İlk Rakibi" },
    portrait: "🛡️",
    bio: {
      sv: "Kilij Arslan I — 'Sword Lion' på turkiska — är den Seljukiske sultan av Rûm vars styre sammanföll med och definierades av det Första korståget (1096–1099). Son till Suleiman ibn Qutalmish, ärvde han Rûm-sultanatet vid 13 års ålder 1092 men hölls fången av Malik Shah I i Isfahan tills den senares död samma år. Han återvände till Anatolien och började konsolidera sitt fragmenterade territorium. Sedan kom 1096: tiotusentals västeuropeiska korsfarare strömmade in i Anatolien. Kilij Arslans första militära framgång var spektakulär — han krossade Folkets korståg under Peter Eremiten vid slaget vid Civetot 1096 och slaktade nästan alla. Men nästa år kom det riddarbaserade Furstarnas korståg, och Kilij Arslans armé krossades vid Dorylaeum 1097. Han förlorade Nicaea till bysantinerna och tvingades flytta sin huvudstad till Konya. Trots detta nederlag konsoliderade han Rûm i de inre delarna av Anatolien och lade grunden för den 200-åriga Rûm-sultanatet. Han dödades 1107 i strid mot atebeg Chavli av Mosul i en oväntad konflikt — drunknade i floden Khabur när hans häst snubblade.",
      en: "Kilij Arslan I — 'Sword Lion' in Turkish — is the Seljuk sultan of Rûm whose reign coincided with and was defined by the First Crusade (1096–1099). Son of Suleiman ibn Qutalmish, he inherited the Rûm Sultanate at age 13 in 1092 but was held captive by Malik Shah I in Isfahan until the latter's death the same year. He returned to Anatolia and began consolidating his fragmented territory. Then came 1096: tens of thousands of Western European Crusaders poured into Anatolia. Kilij Arslan's first military success was spectacular — he crushed the People's Crusade under Peter the Hermit at the Battle of Civetot in 1096 and slaughtered nearly all. But the next year came the knight-led Princes' Crusade, and Kilij Arslan's army was crushed at Dorylaeum in 1097. He lost Nicaea to the Byzantines and was forced to move his capital to Konya. Despite this defeat he consolidated Rûm in the interior of Anatolia and laid the foundation for the 200-year Rûm Sultanate. He died in 1107 in battle against atebeg Chavli of Mosul in an unexpected conflict — drowned in the Khabur river when his horse stumbled.",
      tr: "Kılıç Arslan I — Türkçe 'Kılıç Aslan' — saltanatı Birinci Haçlı Seferi (1096–1099) ile çakışan Rum Selçuklu sultanıdır. Süleyman ibn Kutalmış'ın oğlu, 13 yaşında Rum Sultanlığı'nı miras aldı. 1096'da Pierre l'Ermite önderliğindeki Halk Haçlı Seferini Civetot Savaşı'nda ezdi. Ama ertesi yıl şövalye önderliğindeki Prensler Haçlı Seferi tarafından Dorylaeum'da yenildi. 1107'de atı tökezlediğinde Habur nehrinde boğularak öldü.",
    },
    reforms: {
      sv: ["Konsolidering av Rûm-sultanatet efter förlusten av kustlandet", "Etablerandet av Konya som ny huvudstad och kulturellt centrum", "Reorganisering av den anatoliska turkmenska militära strukturen", "Diplomatiska relationer med Bysans (alternerande mellan krig och vapenvilor)"],
      en: ["Consolidation of the Rûm Sultanate after the loss of coastal lands", "Establishment of Konya as new capital and cultural centre", "Reorganisation of the Anatolian Turkmen military structure", "Diplomatic relations with Byzantium (alternating between war and truces)"],
      tr: ["Sahil topraklarının kaybının ardından Rum Sultanlığı'nın pekiştirilmesi", "Konya'nın yeni başkent ve kültürel merkez olarak tesisi"],
    },
    campaigns: {
      sv: ["Slaget vid Civetot (1096) — Folkets korståg krossas", "Slaget vid Dorylaeum (1097) — nederlag mot Furstarnas korståg", "Förlusten av Nicaea till bysantinska styrkor (1097)", "Erövringen av Mosul (1107) och den fatala striden mot Chavli"],
      en: ["Battle of Civetot (1096) — People's Crusade crushed", "Battle of Dorylaeum (1097) — defeat against the Princes' Crusade", "Loss of Nicaea to Byzantine forces (1097)", "Conquest of Mosul (1107) and the fatal battle against Chavli"],
      tr: ["Civetot Savaşı (1096) — Halk Haçlı Seferi ezildi", "Dorylaeum Savaşı (1097) — Prensler Haçlı Seferine karşı yenilgi", "Musul'un fethi (1107) ve Çavlı'ya karşı ölümcül savaş"],
    },
    leadershipStyle: {
      sv: "Kilij Arslan var en talangfull militär ledare med klassisk turkisk nomadkrigartaktik — använde rörlig kavalleri, falska reträtter och miljöutnyttjande. Hans framgång mot Folkets korståg visade hans skicklighet. Hans nederlag vid Dorylaeum visade hans begränsningar — det europeiska riddarkavalleriet med sin tunga rustning och disciplinerade chocktaktik var en motståndare han inte hade förberetts för.",
      en: "Kilij Arslan was a talented military leader with classic Turkish nomadic warrior tactics — using mobile cavalry, feigned retreats and environmental exploitation. His success against the People's Crusade demonstrated his skill. His defeat at Dorylaeum revealed his limitations — the European knight cavalry with its heavy armour and disciplined shock tactics was an opponent he had not been prepared for.",
      tr: "Kılıç Arslan klasik Türk göçebe savaşçı taktikleriyle yetenekli bir askeri liderdi — hareketli süvari, sahte geri çekilmeler ve çevre kullanımı.",
    },
    criticalPerspectives: {
      sv: "Kilij Arslans hantering av korsfararna debatteras: hans seger vid Civetot kan ha varit för triumfartad — det stärkte hans förtroende inför mötet med det riktiga riddarkorståget året därpå, vilket bidrog till nederlaget vid Dorylaeum. Han underskattade europeiska militära kapabiliteter på ett sätt som kostade Rûm dess kustprovinser permanent.",
      en: "Kilij Arslan's handling of the Crusaders is debated: his victory at Civetot may have been too triumphant — it strengthened his confidence ahead of meeting the real knight Crusade the following year, contributing to the defeat at Dorylaeum. He underestimated European military capabilities in ways that cost Rûm its coastal provinces permanently.",
      tr: "Kılıç Arslan'ın Haçlılarla başa çıkışı tartışmalıdır.",
    },
  },

  // ─── 29. NUR AD-DIN ZENGI (NEW — challenged late Seljuks, jihad leader) ──
  {
    id: "nur-ad-din-zengi",
    name: "Nur ad-Din Zengi",
    years: "1118–1174",
    title: { sv: "Den Rättfärdige — Saladins läromästare", en: "The Just — Teacher of Saladin", tr: "Adaletli — Selahaddin'in Üstadı" },
    portrait: "🌙",
    bio: {
      sv: "Nur ad-Din Zengi — 'Religionens Ljus' — är den islamiska härskare som mer än någon annan utmanade och i praktiken ersatte de senare Seljukerna som det islamiska världens ledande kraft mot korsfararna. Han var son till Imad ad-Din Zengi, atebeg av Mosul, och ärvde Aleppo 1146. Under hans 28-åriga styre förvandlade han Zengi-dynastin från en regional Seljuk-vasall till en pan-islamisk stormakt som dominerade Syrien, norra Irak och slutligen Egypten. Han erövrade Damaskus 1154 från Seljukernas Burid-vasaller. Han ledde det första organiserade islamiska motangreppet mot korsfararna sedan 1099 — återerövringen av Edessa 1144 (som hans far inledde) chockade Europa och utlöste det Andra korståget. Han skickade sin general Shirkuh och Shirkuhs nevö Saladin till Egypten 1163, vilket ledde till Fatimid-kalifatets fall och Saladins uppkomst. Nur ad-Din var känd för sin religiösa from, sitt jihad-uppropande och sin personliga asketism — han bar enkla kläder, åt simpel mat och tillbringade timmar dagligen i bön. Han dog 1174 av halsinflammation, just som han förberedde att rycka in mot Saladin för att stävja hans växande oavhängighet i Egypten.",
      en: "Nur ad-Din Zengi — 'Light of Religion' — is the Islamic ruler who more than any other challenged and in practice replaced the later Seljuks as the Islamic world's leading force against the Crusaders. He was son of Imad ad-Din Zengi, atebeg of Mosul, and inherited Aleppo in 1146. During his 28-year reign he transformed the Zengi dynasty from a regional Seljuk vassal to a pan-Islamic great power dominating Syria, northern Iraq and eventually Egypt. He captured Damascus in 1154 from the Seljuks' Burid vassals. He led the first organised Islamic counter-attack against the Crusaders since 1099 — the reconquest of Edessa in 1144 (which his father initiated) shocked Europe and triggered the Second Crusade. He sent his general Shirkuh and Shirkuh's nephew Saladin to Egypt in 1163, leading to the fall of the Fatimid caliphate and Saladin's rise. Nur ad-Din was known for his religious piety, his jihad-calling and his personal asceticism — he wore simple clothes, ate simple food and spent hours daily in prayer. He died in 1174 of throat inflammation, just as he was preparing to march against Saladin to curb his growing independence in Egypt.",
      tr: "Nur ed-Din Zengi — 'Dinin Nuru' — geç Selçukluları İslam dünyasının Haçlılara karşı önde gelen gücü olarak meydan okuyan ve pratikte değiştiren İslam hükümdarıdır. Mesul atabeği İmad ed-Din Zengi'nin oğluydu ve 1146'da Halep'i miras aldı. 28 yıllık saltanatı sırasında Zengi hanedanlığını Selçuklu bölgesel vasalından Suriye, kuzey Irak ve sonunda Mısır'a egemen olan pan-İslami büyük güce dönüştürdü. 1154'te Selçukluların Buri vasallarından Şam'ı aldı. 1144'te Urfa'nın geri alınması Avrupa'yı şok etti ve İkinci Haçlı Seferini tetikledi. 1163'te generali Şirkuh'u ve Şirkuh'un yeğeni Selahaddin'i Mısır'a gönderdi. 1174'te boğaz iltihabından öldü.",
    },
    reforms: {
      sv: ["Skapande av en pan-islamisk jihad-ideologi mot korsfararna", "Etablering av Nur ad-Din-madrasor för religiös och juridisk utbildning", "Reform av syriska stadsförvaltning och rättssystemet enligt shafii och hanafi-juridik", "Utvecklingen av en disciplinerad islamisk armé som kunde stå emot tunga riddare"],
      en: ["Creation of a pan-Islamic jihad ideology against the Crusaders", "Establishment of Nur ad-Din madrasas for religious and legal education", "Reform of Syrian urban administration and legal system according to Shafi'i and Hanafi jurisprudence", "Development of a disciplined Islamic army capable of standing against heavy knights"],
      tr: ["Haçlılara karşı pan-İslami cihat ideolojisinin yaratılması", "Dini ve hukuki eğitim için Nureddin medreselerinin kurulması"],
    },
    campaigns: {
      sv: ["Återerövringen av Edessa (1144 under hans fars ledning)", "Erövringen av Damaskus (1154)", "Andra korståget besegrat (1148)", "Egyptiska kampanjer (1163–1169) — Fatimid-kalifatets fall", "Förberedelse för krig mot Saladin (1174 — avbruten av hans död)"],
      en: ["Reconquest of Edessa (1144 under his father's leadership)", "Conquest of Damascus (1154)", "Second Crusade defeated (1148)", "Egyptian campaigns (1163–1169) — fall of Fatimid caliphate", "Preparation for war against Saladin (1174 — interrupted by his death)"],
      tr: ["Urfa'nın geri alınması (1144)", "Şam'ın fethi (1154)", "İkinci Haçlı Seferinin yenilgisi (1148)", "Mısır seferleri (1163–1169) — Fatımi halifeliğinin düşüşü"],
    },
    leadershipStyle: {
      sv: "Nur ad-Din kombinerade tre kvaliteter som var sällsynta i kombination: militär kompetens, administrativ briljans och religiös trovärdighet. Han var en pioniarbete för det som senare blev känt som 'mujahid-monarken' — den islamiska härskaren vars legitimitet baserades inte bara på blodlinje eller militär framgång utan på personlig religiös fromhet och engagemang i jihad mot icke-muslimska fiender. Detta blev modellen för Saladin och senare för osmanerna.",
      en: "Nur ad-Din combined three qualities that were rare in combination: military competence, administrative brilliance and religious credibility. He was a pioneer of what later became known as the 'mujahid-monarch' — the Islamic ruler whose legitimacy was based not just on bloodline or military success but on personal religious piety and engagement in jihad against non-Muslim enemies. This became the model for Saladin and later for the Ottomans.",
      tr: "Nur ed-Din nadir bir kombinasyonda üç niteliği birleştirdi: askeri yetkinlik, idari parlaklık ve dini güvenilirlik. Daha sonra 'mücahid-monark' olarak bilinen şeyin öncüsüydü.",
    },
    criticalPerspectives: {
      sv: "Nur ad-Dins jihad-retorik var politiskt funktionell — den legitimerade hans expansion på bekostnad av muslimska rivaler (Seljukerna, Burids, Fatimiderna) lika mycket som av korsfararna. Hans 'kamp för islam' resulterade i flera krig mot andra muslimska härskare. Detta är inte unikt för honom — det var den islamiska medeltidens politiska realitet. Men det är värt att notera att hans dynastis arv (genom Saladin) baserades lika mycket på imperialistisk expansion bland muslimer som på försvar av islam mot kristna.",
      en: "Nur ad-Din's jihad rhetoric was politically functional — it legitimised his expansion at the expense of Muslim rivals (Seljuks, Burids, Fatimids) as much as Crusaders. His 'struggle for Islam' resulted in several wars against other Muslim rulers. This is not unique to him — it was the Islamic medieval political reality. But it is worth noting that his dynasty's legacy (through Saladin) was based as much on imperialist expansion among Muslims as on defending Islam against Christians.",
      tr: "Nur ed-Din'in cihat söylemi siyasi olarak işlevseldi — Müslüman rakipleri (Selçuklar, Buriler, Fatımiler) pahasına genişlemesini meşrulaştırdı.",
    },
  },

  // ─── 30. SULTAN MAHMUD OF GHAZNA (NEW — defeated at Dandanaqan) ───────────
  {
    id: "mahmud-of-ghazna",
    name: "Sultan Mahmud of Ghazna",
    years: "971–1030",
    title: { sv: "Indiens hammare — Seljukernas första patron", en: "Hammer of India — First Patron of the Seljuks", tr: "Hindistan'ın Çekici — Selçukların İlk Hamisi" },
    portrait: "⚒️",
    bio: {
      sv: "Sultan Mahmud av Ghazna är ironiskt nog en av de viktigaste figurerna i Seljukhistorien — inte för att han var en Seljuk, utan för att han var den man som tillät Seljukerna att etablera sig i Khurasan, vilket möjliggjorde imperiebyggandet senare. Han var grundaren av Ghaznavid-imperiets storhetstid (997–1030) och en av medeltidens mest fruktade militära ledare. Han genomförde 17 plundringskampanjer in i nordvästra Indien, varifrån han hämtade enorma mängder guld, silver och slavar — tillräckligt för att bygga Ghazna till en av medeltidens rikaste städer. Han var en patron av lärde och poeter — den persiske poeten Firdawsi skrev sitt epos Shahnameh ('Kungaboken') vid hans hov. Men han gjorde ett ödesdigert misstag: han tillät Seljuk-stammarna att bosätta sig i Khurasan som federerade allierade. När han insåg sitt misstag och försökte begränsa dem var det för sent. Hans son Masud I förlorade Khurasan permanent vid Dandanaqan 1040 — bara 10 år efter Mahmuds död. Mahmud själv dog 1030, vid 59 års ålder, från malaria, utan att ha förutspått sin dynastis snabba sönderfall.",
      en: "Sultan Mahmud of Ghazna is ironically one of the most important figures in Seljuk history — not because he was a Seljuk, but because he was the man who allowed the Seljuks to establish themselves in Khurasan, enabling the empire-building later. He was the founder of the Ghaznavid Empire's greatness (997–1030) and one of the medieval world's most feared military leaders. He conducted 17 raiding campaigns into northwestern India, from which he extracted enormous quantities of gold, silver and slaves — enough to build Ghazna into one of the medieval world's richest cities. He was a patron of scholars and poets — the Persian poet Firdawsi wrote his epic Shahnameh ('Book of Kings') at his court. But he made a fatal mistake: he allowed the Seljuk tribes to settle in Khurasan as federated allies. When he realised his mistake and tried to restrict them it was too late. His son Masud I permanently lost Khurasan at Dandanaqan in 1040 — just 10 years after Mahmud's death. Mahmud himself died in 1030, aged 59, from malaria, without having foreseen his dynasty's rapid disintegration.",
      tr: "Gazne Sultanı Mahmud, ironik biçimde Selçuk tarihinin en önemli figürlerinden biridir — çünkü Selçukların Horasan'a yerleşmesine izin veren adamdı. Gazneli İmparatorluğu'nun büyüklüğünün kurucusuydu (997–1030). Kuzeybatı Hindistan'a 17 yağma seferi düzenledi. Saraylarında Firdevsi gibi şair ve bilim insanlarını himaye etti. Selçuk kabilelerinin Horasan'a federal müttefik olarak yerleşmesine izin vererek ölümcül bir hata yaptı. 1030'da sıtmadan öldü.",
    },
    reforms: {
      sv: ["Etablerandet av Ghazna som ortodox sunni-islamisk huvudstad", "Skapandet av den ghaznavidiska kavallerirmodellen baserad på turkiska slaver-soldater (gholam)", "Patronage av persisk litteratur (Firdawsis Shahnameh)", "Ekonomisk transformation av Khurasan genom indiskt plundringsguld"],
      en: ["Establishment of Ghazna as an orthodox Sunni Islamic capital", "Creation of the Ghaznavid cavalry model based on Turkish slave-soldiers (gholam)", "Patronage of Persian literature (Firdawsi's Shahnameh)", "Economic transformation of Khurasan through Indian raiding gold"],
      tr: ["Gazne'nin ortodoks Sünni İslam başkenti olarak tesisi", "Türk köle askerlere (gulam) dayalı Gazneli süvari modelinin yaratılması", "Fars edebiyatının himayesi (Firdevsi'nin Şahname'si)"],
    },
    campaigns: {
      sv: ["17 plundringskampanjer in i Indien (1000–1027), inklusive Somnath-templets förstörelse 1025", "Erövringen av Sind, Multan och Punjab", "Erövringen av Ray och Hamadan från Buyiderna 1029", "Toleransen mot — och slutligen försöket att begränsa — Seljuk-bosättningen i Khurasan"],
      en: ["17 raiding campaigns into India (1000–1027), including the destruction of the Somnath temple in 1025", "Conquest of Sindh, Multan and Punjab", "Capture of Ray and Hamadan from the Buyids in 1029", "Tolerance of — and finally attempt to restrict — Seljuk settlement in Khurasan"],
      tr: ["Hindistan'a 17 yağma seferi (1000–1027), 1025'te Somnath tapınağının yıkımı dahil", "Sind, Multan ve Pencap'ın fethi", "1029'da Büveyhilerden Rey ve Hemedan'ın alınması"],
    },
    leadershipStyle: {
      sv: "Mahmud var en militärt orienterad härskare med en ortodox-religiös retorik som legitimerade hans plundringar i Indien som 'jihad mot avgudadyrkare.' Han var personligen modig, militärt kompetent och politiskt orubblig. Men han var också grym — hans plundringar i Indien resulterade i förstörelse av tempel, slaktning av civila och slavhandel i en skala som chockerar moderna historiker. Hans patronage av lärde var genuin men selektiv — han pressade Firdawsi och andra poeter att glorifiera hans expansion.",
      en: "Mahmud was a militarily oriented ruler with an orthodox-religious rhetoric that legitimised his raids in India as 'jihad against idolaters.' He was personally brave, militarily competent and politically unyielding. But he was also cruel — his raids in India resulted in destruction of temples, slaughter of civilians and slave-trading on a scale that shocks modern historians. His patronage of scholars was genuine but selective — he pressured Firdawsi and other poets to glorify his expansion.",
      tr: "Mahmud askeri yönelimli bir hükümdardı. Kişisel olarak cesur, askeri açıdan yetkin ve siyasi açıdan ödün vermezdi. Ama aynı zamanda zalimdi — Hindistan'daki yağmaları tapınakların yıkımı, sivillerin katledilmesi ve modern tarihçileri şoke eden ölçekte köle ticaretiyle sonuçlandı.",
    },
    criticalPerspectives: {
      sv: "Mahmud lämnade ett tvetydigt arv. För muslimska historiker är han en stor jihad-krigare och beskyddare av islam. För hinduistiska historiker är han 'Hammer of India' — en folkmördare vars förstörelse av Somnath-templet och andra heliga platser var en kulturell katastrof för Indiens hinduiska civilisation. Båda perspektiven är historiskt giltiga. Hans politiska geni — att ha skapat ett av medeltidens mest mäktiga imperier ur ingenting — kan inte separeras från det faktum att hans rikedomar baserades på ett systematiskt utnyttjande av Indien.",
      en: "Mahmud left an ambiguous legacy. For Muslim historians he is a great jihad-warrior and protector of Islam. For Hindu historians he is the 'Hammer of India' — a destroyer whose demolition of the Somnath temple and other sacred sites was a cultural catastrophe for India's Hindu civilisation. Both perspectives are historically valid. His political genius — having created one of the medieval world's most powerful empires from nothing — cannot be separated from the fact that his wealth was based on systematic exploitation of India.",
      tr: "Mahmud belirsiz bir miras bıraktı. Müslüman tarihçiler için büyük bir cihat savaşçısı ve İslam'ın koruyucusudur. Hindu tarihçileri için ise 'Hindistan'ın Çekici'dir — Somnath tapınağı ve diğer kutsal yerlerin yıkımı Hindistan'ın Hindu medeniyeti için kültürel bir felaketti.",
    },
  },
];

// =============================================================================
// TERRITORIES — Improved historically accurate polygons
// Format: [latitude, longitude] pairs
// =============================================================================

const seljukTerritories: TerritoryPeriod[] = [
  // Early period — Seljuks consolidate Khurasan after Dandanaqan
  {
    yearStart: 1037,
    yearEnd: 1055,
    label: { sv: "Seljukerna — Tidig expansion i Khurasan (1037–1055)", en: "Seljuks — Early Expansion in Khurasan (1037–1055)", tr: "Selçuklar — Horasan'da Erken Genişleme (1037–1055)" },
    color: "#8B4513",
    polygon: [[
      [42.0, 53.0],   // NW: Caspian shore near Gurgan
      [42.5, 58.0],   // N: north of Khwarazm
      [42.0, 63.0],   // NE: Aral steppes
      [40.0, 67.0],   // E: Bukhara region
      [38.0, 68.0],   // E: south of Samarkand
      [36.0, 64.0],   // SE: Balkh / Bactria
      [33.0, 61.0],   // S: Herat region
      [33.0, 56.0],   // SW: Nishapur
      [35.0, 53.0],   // W: Damghan
      [37.0, 51.0],   // NW: Ray / south Caspian
      [40.0, 51.0],   // NW: south Caspian shore
      [42.0, 53.0],   // close
    ]],
  },
  // Peak — under Malik Shah I, the empire spans from Mediterranean to Central Asia
  {
    yearStart: 1055,
    yearEnd: 1092,
    label: { sv: "Seljukernas guldålder — Imperiet på toppen (1055–1092)", en: "Seljuk Golden Age — Empire at its Peak (1055–1092)", tr: "Selçukların Altın Çağı — İmparatorluk Zirvede (1055–1092)" },
    color: "#CD853F",
    polygon: [[
      // Western edge — Anatolia and Mediterranean
      [40.0, 28.0],   // NW: western Anatolia (post-Manzikert)
      [38.0, 28.5],   // W: Aegean coast border
      [36.5, 30.5],   // SW: south Anatolia (Antalya region)
      [36.2, 36.0],   // S: Antioch
      [35.5, 36.5],   // S: Latakia coast
      [34.5, 36.0],   // S: Tripoli area
      [33.5, 35.5],   // S: Beirut area
      [32.5, 35.0],   // S: northern Palestine
      [31.5, 35.5],   // S: Jerusalem area
      [30.0, 35.0],   // S: south Jordan
      // Southern edge — Arabian peninsula edge, Persian Gulf
      [28.0, 38.0],   // S: northern Hejaz (Mecca via vassals)
      [25.5, 40.0],   // S: Medina (vassal)
      [24.0, 39.5],   // S: Mecca (vassal)
      [25.0, 45.0],   // S: Najd region edge
      [27.0, 49.0],   // S: Persian Gulf coast
      [29.0, 51.0],   // S: Bushehr region
      [27.0, 54.0],   // S: Bandar Abbas region
      [26.0, 58.0],   // S: Makran coast
      [26.0, 62.0],   // SE: southeast Iran
      [29.0, 65.0],   // SE: Sistan
      // Eastern edge — Khurasan, Transoxiana
      [33.0, 67.0],   // E: Kabul region (vassal)
      [36.0, 68.0],   // E: Bactria
      [38.0, 67.0],   // E: south of Samarkand
      [40.0, 65.0],   // E: Bukhara
      [41.5, 62.0],   // NE: Khwarazm (vassal)
      [42.5, 60.0],   // NE: Aral Sea region
      [43.0, 56.0],   // N: north Caspian
      // Northern edge — Caucasus, Anatolia
      [42.0, 50.0],   // N: south Caspian
      [42.5, 47.0],   // N: Derbent area
      [41.5, 44.0],   // N: Tbilisi region (vassal)
      [40.5, 41.0],   // NW: Erzurum / east Anatolia
      [40.5, 35.0],   // NW: Sivas
      [40.5, 32.0],   // NW: Ankara region
      [40.0, 28.0],   // close
    ]],
  },
  // Post-1092 fragmentation — Sanjar's eastern empire + Iraqi branch
  {
    yearStart: 1092,
    yearEnd: 1157,
    label: { sv: "Seljukerna — Fragmenteringens era (1092–1157)", en: "Seljuks — Era of Fragmentation (1092–1157)", tr: "Selçuklar — Parçalanma Dönemi (1092–1157)" },
    color: "#A0522D",
    polygon: [[
      [40.5, 41.0],   // NW: Erzurum
      [38.0, 41.5],   // W: Lake Van
      [36.0, 42.5],   // S: northern Syria
      [34.0, 41.0],   // S: north of Baghdad
      [33.0, 44.0],   // S: Baghdad
      [31.5, 47.0],   // S: Basra
      [29.0, 50.0],   // S: Persian Gulf
      [28.0, 54.0],   // S: south Iran
      [29.0, 60.0],   // SE: Kerman region
      [33.0, 64.0],   // E: Herat
      [36.0, 67.0],   // E: Bactria
      [38.0, 67.0],   // E: south of Samarkand
      [40.0, 65.0],   // E: Bukhara
      [41.0, 60.0],   // NE: Khwarazm
      [42.0, 55.0],   // N: Caspian
      [40.0, 50.0],   // N: south Caspian
      [40.5, 45.0],   // N: Azerbaijan
      [40.5, 41.0],   // close
    ]],
  },
  // Final — only the Iraqi Seljuks remain
  {
    yearStart: 1157,
    yearEnd: 1194,
    label: { sv: "Seljukerna av Irak — Sista resterna (1157–1194)", en: "Seljuks of Iraq — Final Remnants (1157–1194)", tr: "Irak Selçukları — Son Kalıntılar (1157–1194)" },
    color: "#6B3410",
    polygon: [[
      [37.0, 43.0],   // N: Lake Urmia area
      [36.0, 46.0],   // NE: Tabriz
      [35.5, 49.0],   // E: Hamadan
      [34.0, 51.5],   // E: Isfahan
      [32.0, 52.5],   // SE: Yazd region
      [30.0, 51.5],   // S: Shiraz region
      [30.5, 48.0],   // S: Khuzistan
      [31.5, 47.0],   // S: Basra area
      [32.0, 45.0],   // S: south Iraq
      [33.0, 44.0],   // S: Baghdad
      [34.0, 42.5],   // W: Mosul (intermittently held)
      [35.5, 43.0],   // NW: Mosul region
      [37.0, 43.0],   // close
    ]],
  },
];

// =============================================================================
// TRADE ROUTES — Major routes through Seljuk territory
// =============================================================================

const seljukTradeRoutes: TradeRouteGeo[] = [
  {
    id: "silk-road-west",
    name: { sv: "Sidenvägen — Seljukernas hjärtpulsåder", en: "Silk Road — The Seljuks' Heartbeat", tr: "İpek Yolu — Selçukların Kalp Atışı" },
    yearActive: 1080,
    path: [
      [39.9, 116.4],  // Beijing
      [40.5, 110.0],  // Inner Mongolia
      [40.5, 100.0],  // Dunhuang
      [40.5, 95.0],   // Hami
      [42.0, 87.0],   // Turpan
      [43.0, 76.0],   // Almaty region
      [40.0, 68.0],   // Samarkand
      [39.7, 64.4],   // Bukhara
      [37.6, 58.3],   // Merv
      [36.3, 59.5],   // Nishapur
      [35.7, 51.4],   // Tehran/Ray
      [36.3, 48.1],   // Hamadan area
      [33.3, 44.4],   // Baghdad
      [36.2, 36.2],   // Antioch
      [37.0, 27.1],   // Aegean coast (export to Constantinople)
    ],
  },
  {
    id: "persian-royal-road",
    name: { sv: "Persiska kungavägen — Isfahan till Bagdad", en: "Persian Royal Road — Isfahan to Baghdad", tr: "İran Kraliyet Yolu — İsfahan'dan Bağdat'a" },
    yearActive: 1075,
    path: [
      [32.65, 51.67],  // Isfahan (Seljuk capital)
      [33.6, 50.1],    // Hamedan via Saveh
      [34.8, 48.5],    // Hamadan
      [34.5, 45.7],    // Kermanshah
      [33.3, 44.4],    // Baghdad
    ],
  },
  {
    id: "anatolia-road",
    name: { sv: "Anatoliens väg — Erövringens väg", en: "Anatolian Road — Path of Conquest", tr: "Anadolu Yolu — Fethin Yolu" },
    yearActive: 1075,
    path: [
      [33.3, 44.4],    // Baghdad
      [36.3, 43.1],    // Mosul
      [37.5, 42.0],    // Diyarbakır
      [39.0, 41.3],    // Manzikert / Ahlat
      [39.9, 41.3],    // Erzurum
      [40.0, 38.0],    // Erzincan
      [39.7, 35.5],    // Sivas
      [39.9, 32.9],    // Ankara
      [37.9, 32.5],    // Konya (Sultanate of Rûm capital)
      [38.4, 27.1],    // Smyrna/Izmir
    ],
  },
  {
    id: "hajj-route",
    name: { sv: "Pilgrimsvägen — Mekka via Bagdad", en: "Pilgrimage Route — Mecca via Baghdad", tr: "Hac Yolu — Bağdat Üzerinden Mekke" },
    yearActive: 1080,
    path: [
      [33.3, 44.4],    // Baghdad (start of Hajj caravan)
      [32.5, 44.4],    // Karbala
      [31.6, 44.6],    // Najaf
      [30.5, 41.0],    // Hail (north Arabia)
      [27.5, 41.7],    // Hail region
      [25.4, 39.6],    // Medina
      [21.4, 39.8],    // Mecca
    ],
  },
  {
    id: "trans-caucasus",
    name: { sv: "Trans-Kaukasiska vägen — Genom bergen till Svarta havet", en: "Trans-Caucasus Road — Through the Mountains to the Black Sea", tr: "Trans-Kafkasya Yolu — Dağlardan Karadeniz'e" },
    yearActive: 1085,
    path: [
      [38.1, 46.3],    // Tabriz
      [40.4, 49.9],    // Baku region
      [41.7, 44.8],    // Tbilisi
      [42.0, 41.6],    // Batumi
      [41.0, 39.7],    // Trabzon (Black Sea port)
    ],
  },
];

// =============================================================================
// STORIES — Cinematic narrative episodes (6 stories)
// =============================================================================

export const seljukStories: Story[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 1 — Tughril enters Baghdad (1055)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "the-night-before-baghdad",
    relatedYear: 1055,
    category: "politics",
    title: {
      sv: "Natten innan Bagdad — Stäppens lejon vid civilisationens port",
      en: "The Night Before Baghdad — The Lion of the Steppe at Civilisation's Gate",
      tr: "Bağdat'tan Önceki Gece — Bozkırın Aslanı Medeniyetin Kapısında",
    },
    subtitle: {
      sv: "December 1055. Tughril Beg sover inte.",
      en: "December 1055. Tughril Beg does not sleep.",
      tr: "Aralık 1055. Tuğrul Bey uyumuyordu.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Lägret utanför murarna", en: "The Camp Outside the Walls", tr: "Surların Dışındaki Kamp" },
        figure: "Tughril Beg",
        content: {
          sv: `Det är december 1055 och Tughril Beg — sultan av Khurasan, Persien och nu halvstens avstånd från Bagdad — sitter ensam i sitt tält. Lägereldarna skimrar mot det svarta Iraqs himmel. Runt honom sover tiotusentals nomadiska krigare, män vars fäder inte kände städer, vars barn fötts på hästryggen, vars enda hem var horisonten.

Imorgon rider han in i Bagdad.

Bagdad. Civilisationens mittpunkt. Den stad vars bibliotek innehöll mer kunskap än alla stäpper Tughril Beg ridit igenom. Den stad som araberna kallade Madinat al-Salam — Fredens stad.

Tughril Beg visste vad hans män inte förstod: att erövra en stad med svärd var en sak. Att förtjäna rätten att stanna var en annan. Han hade studerat hur det gick för vandalerna i Rom. Han ville inte vara den mannen.

Tughril Beg hade skickat budbärare till kalif Al-Qa'im. Inte med ultimatum. Med ett löfte: "Jag kommer inte som erövrare. Jag kommer som din arm och ditt svärd. Du är islams röst. Jag är islams sköldbärare."

Nu i natten undrar han om Gud tror honom.`,
          en: `It is December 1055 and Tughril Beg — sultan of Khurasan, Persia and now half a stone's throw from Baghdad — sits alone in his tent. Campfires shimmer against the black Iraqi sky. Around him sleep tens of thousands of nomadic warriors, men whose fathers never knew cities, whose children were born on horseback, whose only home was the horizon.

Tomorrow he rides into Baghdad.

Baghdad. The centre of civilisation. The city whose libraries contained more knowledge than all the steppes Tughril Beg had ridden through. The city the Arabs called Madinat al-Salam — City of Peace.

Tughril Beg knew what his men did not understand: that to conquer a city with a sword was one thing. To earn the right to stay was another. He had studied what happened to the Vandals in Rome. He did not want to be that man.

Tughril Beg had sent messengers to Caliph Al-Qa'im. Not with ultimatums. With a promise: "I come not as conqueror. I come as your arm and your sword. You are Islam's voice. I am Islam's shield-bearer."

Now in the night he wonders if God believes him.`,
          tr: `Aralık 1055'ti ve Tuğrul Bey çadırında yalnız oturuyordu. Yarın Bağdat'a girecekti. Bağdat — medeniyetin merkezi. Tuğrul Bey, adamlarının anlamadığı şeyi biliyordu: kılıçla bir şehri fethetmek bir şeydi. Kalma hakkını kazanmak başka bir şeydi.

Tuğrul Bey, Halife El-Kaim'e elçiler göndermişti. Ultimatomlarla değil. Bir vaatle: "Fatih olarak değil, kolun ve kılıcın olarak geliyorum. Sen İslam'ın sesisin. Ben İslam'ın kalkan taşıyıcısıyım."`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Mötet med kalifen", en: "The Meeting with the Caliph", tr: "Halife ile Buluşma" },
        figure: "Caliph Al-Qa'im",
        content: {
          sv: `Nästa dag — den 18 december 1055 — sker ett av medeltidens mest teatraliska statsmannamöten.

Tughril Beg rider in i Bagdad inte med krigsskriken av en erövrare utan med den högtidliga tystnaden av en pilgrim. Hans armé marscherar disciplinerat. Bagdadernas invånare — som väntat sig plundring — stirrar från husens tak i förundran.

Kalif Al-Qa'im tar emot Tughril i tronsalen. Den abbasidiske kalifen är en gammal man vars familj suttit på Guds ställföreträdares tron i tre sekler — men som de senaste decennierna utövat ingen verklig makt. Buyidernas shia-dynastier hade gjort honom till en marionett.

Nu sitter framför honom en turkisk nomadisk krigarfurste från stäpperna — och erbjuder skydd.

Tughril Beg faller på knä inför kalifen. Inte som en undersåte utan som en riddare som lägger sin tjänst till förfogande. Al-Qa'im, med tårar i sina gamla ögon, proklamenerar: "Jag ger dig titeln Sultan — Kung av Öst och Väst. Du är islams svärd."

I det ögonblicket föds en politisk teologi som ska definiera sunniislam i 200 år: sultanen skyddar. Kalifen helgar. Svärd och ord — i symbios.`,
          en: `The next day — 18 December 1055 — one of the medieval world's most theatrical statesman meetings occurs.

Tughril Beg rides into Baghdad not with the war cries of a conqueror but with the solemn silence of a pilgrim. His army marches with discipline. Baghdad's inhabitants — who had expected plundering — stare from rooftops in amazement.

Caliph Al-Qa'im receives Tughril in the throne room. The Abbasid caliph is an old man whose family has sat on God's vicegerent's throne for three centuries — but who for recent decades has wielded no real power. The Buyid Shia dynasties had made him a puppet.

Now before him sits a Turkish nomadic warrior-prince from the steppes — offering protection.

Tughril Beg kneels before the caliph. Not as a subject but as a knight offering his service. Al-Qa'im, with tears in his old eyes, proclaims: "I grant you the title Sultan — King of East and West. You are Islam's sword."

In that moment a political theology is born that will define Sunni Islam for 200 years: the sultan protects. The caliph sanctifies. Sword and word — in symbiosis.`,
          tr: `18 Aralık 1055'te ortaçağın en teatral devlet adamı toplantılarından biri yaşandı. Tuğrul Bey, Bağdat'a fatihin savaş çığlıklarıyla değil, hacının saygın sessizliğiyle girdi.

Halife El-Kaim, Tuğrul'u taht odasında kabul etti. Tuğrul Bey halifenin önünde diz çöktü. Bir teba olarak değil, hizmetini sunan bir şövalye olarak. El-Kaim, yaşlı gözlerinde yaşlarla ilan etti: "Sana Sultan unvanını veriyorum — Doğunun ve Batının Kralı."`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Vad stäppen lärt honom", en: "What the Steppe Had Taught Him", tr: "Bozkırın Ona Öğrettikleri" },
        figure: "Tughril Beg",
        content: {
          sv: `Den kvällen, tillbaka i sin tält reflekterade Tughril Beg över sin morfars ord. Seljuk ibn Duqaq, stammens ursprunglige ledare, hade sagt till sina barn: "Vi är inte nomader. Vi är ett folk som ännu inte hittat sin stad."

I 70 år hade familjen sökt den staden. Från Aralsjöns stränder till Transoxiana. Från Transoxiana till Khurasan. Från Khurasan till Persien. Nu: Bagdad.

Men Tughril förstod något djupare som skulle undgå många av hans efterföljare: att Bagdad inte kunde erövras. Det kunde bara adopteras. Och den som adopterade Bagdad — dess lärde, dess kalifer, dess handelsmän, dess poeter — adopterades i sin tur av Bagdad.

Seljukerna kom som nomader. De skulle lämna som islams förvaltare.`,
          en: `That evening, back in his tent, Tughril Beg reflected on his grandfather's words. Seljuk ibn Duqaq, the tribe's original leader, had told his children: "We are not nomads. We are a people who have not yet found their city."

For 70 years the family had sought that city. From the shores of the Aral Sea to Transoxiana. From Transoxiana to Khurasan. From Khurasan to Persia. Now: Baghdad.

But Tughril understood something deeper that would escape many of his successors: that Baghdad could not be conquered. It could only be adopted. And whoever adopted Baghdad — its scholars, its caliphs, its merchants, its poets — was in turn adopted by Baghdad.

The Seljuks came as nomads. They would leave as Islam's stewards.`,
          tr: `O akşam Tuğrul Bey dedesinin sözlerini düşündü. Selçuk ibn Duqaq şöyle demişti: "Biz göçebe değiliz. Henüz şehrini bulmamış bir halkız." 70 yıl boyunca aile o şehri aradı. Şimdi: Bağdat. Selçuklar göçebe olarak geldi. İslam'ın kayyumları olarak gideceklerdi.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 2 — Manzikert (1071)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "the-emperor-in-the-tent",
    relatedYear: 1071,
    category: "war",
    title: {
      sv: "Kejsaren i tältet — Den dag historien bytte riktning",
      en: "The Emperor in the Tent — The Day History Changed Direction",
      tr: "Çadırdaki İmparator — Tarihin Yönünü Değiştirdiği Gün",
    },
    subtitle: {
      sv: "26 augusti 1071. Romanos IV Diogenes möter sin erövrare.",
      en: "26 August 1071. Romanos IV Diogenes meets his conqueror.",
      tr: "26 Ağustos 1071. Romen Diyojen fatihi ile karşılaşıyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Morgonen det bysantinska riket slutade", en: "The Morning the Byzantine Empire Ended", tr: "Bizans İmparatorluğu'nun Sona Erdiği Sabah" },
        figure: "Emperor Romanos IV Diogenes",
        content: {
          sv: `Romanos IV Diogenes hade legat vaken hela natten och lyssnat på sina trupper. 100 000 man. Kanske 200 000. Siffror som aldrig förlorat krig.

Han var en erfaren militär. Han hade slagit tillbaka Pechenegerna, besegrat bulgarerna. Han var inte oerfaren. Han var inte feg.

Men det var något med turkarna han inte förstod. De var överallt och ingenstans. Under de senaste veckorna hade hans spanare rapporterat: "De är norr om oss." "De är söder om oss." "De är öst om oss." Och sedan: "Vi ser ingenting."

Just det — ingenting — var det skrämmande.

När solen gick upp den 26 augusti tog han ett beslut som skulle kosta honom tronen, friheten och kanske livet: han skulle anfalla.`,
          en: `Romanos IV Diogenes had lain awake all night listening to his troops. 100,000 men. Perhaps 200,000. Numbers that had never lost wars.

He was an experienced military commander. He had repelled the Pechenegs, defeated the Bulgarians. He was not inexperienced. He was not cowardly.

But there was something about the Turks he did not understand. They were everywhere and nowhere. During the past weeks his scouts had reported: "They are north of us." "They are south of us." "They are east of us." And then: "We see nothing."

That — nothing — was what was frightening.

When the sun rose on 26 August he made a decision that would cost him his throne, his freedom and perhaps his life: he would attack.`,
          tr: `Romen Diyojen tüm gece uyanık yatmış, askerlerini dinlemişti. 100.000 kişi. Belki 200.000.

Deneyimli bir askeri komutandı. Ama Türkler hakkında anlamadığı bir şey vardı. Her yerde ve hiçbir yerde idiler.

26 Ağustos sabahı saldırma kararı verdi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Slaget — Nomadkrigskonstens mästerverk", en: "The Battle — The Masterpiece of Nomadic Warfare", tr: "Savaş — Göçebe Savaş Sanatının Şaheseri" },
        figure: "Alp Arslan",
        content: {
          sv: `Alp Arslan hade 15 000 man. Mot 100 000 eller fler.

Varje konventionell militärstrateg i medeltidens värld skulle ha sagt: omöjligt. Men Alp Arslan var inte en konventionell militärstrateg. Han var det klassiska turkiska nomadkrigets mästare.

Planen var enkel och diabolisk. Seljukernas kavalleri visar sig i norr, lockar Romanos att anfalla, och reträtterar sedan. Romanos leder sin massiva armé framåt — djupare, djupare in i det torra anatoliska terränget. Försörjningslinjerna sträcks. Trupperna törs. Och sedan:

Retreatten var falsk.

Seljukernas kavalleri slog om, svängde som en halvmåne runt den bysantinska arméns flanker, och bombar dem med pilar från alla riktningar. Det bysantinska tunga kavalleriet — fantastiskt i direkta anfall — är hjälplöst mot rörliga nomadiska ryttare.

På kvällen var den bysantinska arméns formation bruten. Och i kaoset tillfångatogs kejsaren personligen.`,
          en: `Alp Arslan had 15,000 men. Against 100,000 or more.

Every conventional military strategist in the medieval world would have said: impossible. But Alp Arslan was not a conventional military strategist. He was the master of classic Turkish nomadic warfare.

The plan was simple and diabolical. The Seljuk cavalry appears in the north, lures Romanos to attack, then retreats. Romanos leads his massive army forward — deeper, deeper into the dry Anatolian terrain. Supply lines stretch. Troops tire. And then:

The retreat was false.

The Seljuk cavalry turned, swung like a crescent around the Byzantine army's flanks, and bombarded them with arrows from all directions. The Byzantine heavy cavalry — magnificent in direct charges — is helpless against mobile nomadic riders.

By the evening the Byzantine army's formation was broken. And in the chaos, the Emperor was captured personally.`,
          tr: `Alparslan'ın 15.000 adamı vardı. 100.000 veya daha fazlasına karşı. Plan basit ve şeytaniydi: göçebe savaş sanatının ustası klasik sahte geri çekilme. Akşam Bizans formasyonu kırıldı ve kaos içinde imparator bizzat esir alındı.`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Mötet ansikte mot ansikte", en: "The Face-to-Face Meeting", tr: "Yüz Yüze Karşılaşma" },
        figure: "Alp Arslan",
        content: {
          sv: `Romanos IV Diogenes fördes in i Alp Arslans tält i bojor.

Alp Arslan reste sig. Han var en liten man — kompakt, muskulös. Han sade på persiska, via tolk: "Vad skulle du ha gjort med mig om jag hade blivit din fånge?"

Romanos, fortfarande kejserlig trots kedjorna, svarade: "Jag hade dödat dig, eller dragit dig i triumfprocess genom Konstantinopels gator."

Alp Arslan log. "Mitt öde är nådigare än ditt. Jag väljer varken döden eller triumfen." Han clapped ihop händerna. Tjänare kom med mat, vin och medicin för kejsarens sår.

Romanos var sin erövrares gäst.

Ransom fastslogs. Alp Arslan lät Romanos resa hem fritt. Inte skamliggjord. Inte kedjad. Som en man.

Romanos kom tillbaka till Konstantinopel och avsattes av sina egna hovjunkrar. Det bysantinska imperiet imploderade. Alp Arslan behövde aldrig erövra Konstantinopel. Han lät kejsarstyret göra det åt honom.`,
          en: `Romanos IV Diogenes was brought into Alp Arslan's tent in chains.

Alp Arslan rose. He was a small man — compact, muscular. He said in Persian, through a translator: "What would you have done with me if I had become your prisoner?"

Romanos, still imperial despite the chains, replied: "I would have killed you, or dragged you in a triumph through Constantinople's streets."

Alp Arslan smiled. "My fate is more merciful than yours. I choose neither death nor triumph." He clapped his hands. Servants came with food, wine and medicine for the emperor's wounds.

Romanos was his conqueror's guest.

Ransom was agreed. Alp Arslan let Romanos travel home freely. Not humiliated. Not in chains. As a man.

Romanos returned to Constantinople and was deposed by his own courtiers. The Byzantine Empire imploded. Alp Arslan never needed to conquer Constantinople. He let the imperial court do it for him.`,
          tr: `Romen IV Diyojen, Alparslan'ın çadırına zincirlenmiş getirildi. Alparslan ayağa kalktı. Tercüman aracılığıyla Farsça şöyle dedi: "Esirin olsaydım sen ne yapardın?"

Romen yanıtladı: "Seni öldürürdüm." Alparslan gülümsedi. "Benim kaderim seninkinden daha merhametli." Romen, fatihin misafiriydi. Fidye karşılığında serbest bırakıldı.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 3 — The Assassin's Knife (1092)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "the-assassins-knife",
    relatedYear: 1092,
    category: "politics",
    title: {
      sv: "Assassinens kniv — Seljukimperiets mörkaste kväll",
      en: "The Assassin's Knife — The Seljuk Empire's Darkest Evening",
      tr: "Haşhaşinin Bıçağı — Selçuk İmparatorluğu'nun En Karanlık Akşamı",
    },
    subtitle: {
      sv: "Oktober 1092. Nizam al-Mulk har 70 år och ett imperium att försvara.",
      en: "October 1092. Nizam al-Mulk is 70 years old and has an empire to defend.",
      tr: "Ekim 1092. Nizamülmülk 70 yaşındadır ve savunacak bir imparatorluğu vardır.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Den siste store viziren", en: "The Last Great Vizier", tr: "Son Büyük Vezir" },
        figure: "Nizam al-Mulk",
        content: {
          sv: `Abu Ali al-Hasan al-Tusi — känd för historien som Nizam al-Mulk — var 70 år gammal och tröttare än han någonsin tillåtit sig att vara.

Han hade tjänat tre sultaner. Han hade byggt ett imperium. Han hade grundat universiteten som bar hans namn. Han hade skrivit Siyasatnama.

Men nu, hösten 1092, kände Nizam al-Mulk att allt var annorlunda. Sultan Malik Shahs hustru Terken Khatun hade övertygat Malik Shah om att viziren var för mäktig. Att viziren var ett hot.

"De vill ha min Siyasatnama utan mig," tänkte Nizam al-Mulk. "De vill ha imperiet utan dess arkitekt."

Det han inte visste var att hatet kom från ett helt annat håll.`,
          en: `Abu Ali al-Hasan al-Tusi — known to history as Nizam al-Mulk — was 70 years old and more tired than he had ever allowed himself to be.

He had served three sultans. He had built an empire. He had founded the universities that bore his name. He had written the Siyasatnama.

But now, in autumn 1092, Nizam al-Mulk felt that everything was different. Sultan Malik Shah's wife Terken Khatun had convinced Malik Shah that the vizier was too powerful. That the vizier was a threat.

"They want my Siyasatnama without me," thought Nizam al-Mulk. "They want the empire without its architect."

What he did not know was that the hatred came from an entirely different direction.`,
          tr: `Nizamülmülk 70 yaşındaydı. Üç sultana hizmet etmişti. Bir imparatorluk inşa etmişti. Ama 1092 sonbaharında her şeyin farklı olduğunu hissediyordu. Bilmediği şey, nefretin tamamen farklı bir yönden geldiğiydi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Hasan-i-Sabbah och Mästaren av berget", en: "Hasan-i-Sabbah and the Master of the Mountain", tr: "Hasan Sabbah ve Dağın Efendisi" },
        figure: "Hasan-i-Sabbah",
        content: {
          sv: `Hasan-i-Sabbah var Nizam al-Mulks ungdomsvän och livslånge fiende.

De hade gått i skola tillsammans. Och sedan hade deras vägar divergerat: Nizam al-Mulk hade blivit Seljukimperiets vizir. Hasan-i-Sabbah hade blivit den store mästaren av Alamut — klippborgen högt i Elburz-bergen — ledaren av de Nizari Ismailis.

Hasan-i-Sabbah var inte en man av svärd och arméer. Han var en man av idéer — och av en strategi som skakade om politiken för sekler: riktad, kirurgisk politiskt mord utfört av fanatiskt lojala agenter.

Han kallade dem Fedayeen. Europa skulle kalla dem Assassiner. Och de hade nu ett uppdrag: Nizam al-Mulk måste dö.`,
          en: `Hasan-i-Sabbah was Nizam al-Mulk's childhood friend and lifelong enemy.

They had gone to school together. And then their paths had diverged: Nizam al-Mulk had become the Seljuk Empire's vizier. Hasan-i-Sabbah had become the Grand Master of Alamut — the cliff fortress high in the Elburz mountains — leader of the Nizari Ismailis.

Hasan-i-Sabbah was not a man of swords and armies. He was a man of ideas — and of a strategy that would shake politics for centuries: targeted, surgical political murder by fanatically loyal agents.

He called them Fedayeen. Europe would call them Assassins. And they now had a mission: Nizam al-Mulk must die.`,
          tr: `Hasan Sabbah, Nizamülmülk'ün çocukluk arkadaşı ve ömür boyu düşmanıydı. Yolları ayrılmıştı. Hasan Sabbah, hedefli siyasi cinayet stratejisi geliştirdi. Onlara Fedayin denirdi. Şimdi bir görevleri vardı: Nizamülmülk ölmeliydi.`,
        },
      },
      {
        id: "ch3",
        title: { sv: "16 oktober 1092", en: "16 October 1092", tr: "16 Ekim 1092" },
        figure: "Nizam al-Mulk",
        content: {
          sv: `Det var en vanlig dag i sultanens kortege. Nizam al-Mulk bars i sin bår.

En ung man närmade sig. Han var klädd som en Sufi-dervisch — en from muslim som sökte välsignelse från den store viziren.

Viziren böjde sig framåt för att ta emot supplikens brev.

Kniven var gömd i brevet.

Nizam al-Mulk dog av sina sår den 16 oktober 1092. Assassinen dödades omedelbart av gardet.

En månad senare dog Sultan Malik Shah — under misstänkta omständigheter, möjligen förgiftad.

På 30 dagar förlorade Seljukimperiet sin svärdsarm och sin administrationshjärna. Det imperium som tagit 70 år att bygga började krackelera omedelbart.

Hasan-i-Sabbah levde i ytterligare 30 år, dog i sin säng vid 90 års ålder. Nizam al-Mulk är begraven i Isfahan. Varje år kommer pilgrimer till hans grav. Ingen, på tusen år, har kommit till Hasan-i-Sabbahs.`,
          en: `It was an ordinary day in the sultan's cortege. Nizam al-Mulk was carried in his litter.

A young man approached. He was dressed as a Sufi dervish — a pious Muslim seeking blessing from the great vizier.

The vizier leaned forward to receive the supplication letter.

The knife was hidden in the letter.

Nizam al-Mulk died of his wounds on 16 October 1092. The assassin was killed immediately by the guards.

One month later Sultan Malik Shah died — under suspicious circumstances, possibly poisoned.

In 30 days the Seljuk Empire lost its sword-arm and its administrative brain. The empire that had taken 70 years to build began fracturing immediately.

Hasan-i-Sabbah lived for another 30 years, died in his bed aged 90. Nizam al-Mulk is buried in Isfahan. Every year pilgrims come to his grave. No one, in a thousand years, has come to Hasan-i-Sabbah's.`,
          tr: `Sıradan bir gündü. Genç bir adam yaklaştı, Sufi dervişi gibi giyinmişti. Bıçak mektubun içinde gizliydi. Nizamülmülk 16 Ekim 1092'de öldü. Bir ay sonra Sultan Melikşah öldü. 30 günde Selçuk İmparatorluğu kılıç kolunu ve idare beynini yitirdi.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 4 — Omar Khayyam's Stars (1079)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "omar-khayyam-stars",
    relatedYear: 1079,
    category: "culture",
    title: {
      sv: "Omar Khayyams stjärnor — Natten vetenskapen besegrade himlen",
      en: "Omar Khayyam's Stars — The Night Science Conquered Heaven",
      tr: "Ömer Hayyam'ın Yıldızları — Bilimin Gökyüzünü Fethettiği Gece",
    },
    subtitle: {
      sv: "Isfahan, 1079. En matematiker och en poet blickar mot stjärnorna.",
      en: "Isfahan, 1079. A mathematician and a poet gazes at the stars.",
      tr: "Isfahan, 1079. Bir matematikçi ve şair yıldızlara bakıyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Mannen som träffades av två världar", en: "The Man Who Was Struck by Two Worlds", tr: "İki Dünyadan Etkilenen Adam" },
        figure: "Omar Khayyam",
        content: {
          sv: `Ghiyath al-Din Abu'l-Fath Umar — Omar Khayyam för oss — var ett av medeltidens mest obekväma genier.

I väst är han idag känd nästan uteslutande för sina Rubaiyat. Men under sin livstid var Omar Khayyam inte berömd för sina dikter. Han var berömd för sin matematik.

Han löste kubiska ekvationer på ett sätt Europa inte skulle göra på 500 år.

Och 1079 fick han en uppdrag av Sultan Malik Shah I och vizir Nizam al-Mulk: reformera den islamiska kalendern.`,
          en: `Ghiyath al-Din Abu'l-Fath Umar — Omar Khayyam to us — was one of the medieval world's most uncomfortable geniuses.

In the West he is today known almost exclusively for his Rubaiyat. But during his lifetime Omar Khayyam was not famous for his poems. He was famous for his mathematics.

He solved cubic equations in a way Europe would not do for 500 years.

And in 1079 he received a commission from Sultan Malik Shah I and vizier Nizam al-Mulk: reform the Islamic calendar.`,
          tr: `Ömer Hayyam'ın Batı'da Rubaiyat'ıyla tanınmasına rağmen, hayatı boyunca matematiğiyle ünlüydü. 1079'da Sultan Melikşah I ve vezir Nizamülmülk'ten İslam takvimini reform etmek için bir görev aldı.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Observatoriet i Isfahan", en: "The Observatory in Isfahan", tr: "Isfahan'daki Rasathane" },
        figure: "Omar Khayyam",
        content: {
          sv: `Observatoriet som Malik Shah lät bygga i Isfahan var en av medeltidens teknologiska underverk.

I åtta år samlade Omar Khayyam och hans team data. De beräknade det tropiska årets längd till 365,2422 dagar — en siffra vars korrekthet är häpnadsväckande.

Den kalender de skapade — Jalali-kalendern — var mer noggrann än den Gregorianska som Europa adopterade 500 år senare.

Men Khayyam var inte nöjd. "Jag vet hur stjärnorna rör sig," skriver han i ett bevarat fragment. "Men jag vet inte varför de existerar. Jag vet inte varför vi existerar. Och jag vet inte om det spelar någon roll."`,
          en: `The observatory that Malik Shah had built in Isfahan was one of the medieval world's technological marvels.

For eight years Omar Khayyam and his team collected data. They calculated the tropical year's length as 365.2422 days — a figure whose accuracy is astonishing.

The calendar they created — the Jalali calendar — was more accurate than the Gregorian calendar Europe adopted 500 years later.

But Khayyam was not satisfied. "I know how the stars move," he writes in a preserved fragment. "But I do not know why they exist. I do not know why we exist. And I do not know if it matters."`,
          tr: `Sekiz yıl boyunca Ömer Hayyam ve ekibi tropikal yılın uzunluğunu 365,2422 gün olarak hesapladılar. Yarattıkları Celali takvimi Avrupa'nın 500 yıl sonra benimsediği Gregoryen takvimden daha hassastı.

Ama Hayyam tatmin olmamıştı. "Yıldızların nasıl hareket ettiğini biliyorum, ama neden var olduklarını bilmiyorum."`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Dikterna han aldrig tänkt publicera", en: "The Poems He Never Intended to Publish", tr: "Hiç Yayımlamayı Düşünmediği Şiirler" },
        figure: "Omar Khayyam",
        content: {
          sv: `Omar Khayyams Rubaiyat skrevs troligen inte för publikation. De var privata reflektioner.

Det är en storslagen ironi: en man som ville bli ihågkommen för sin matematik kom att bli odödlig för sina dikter. Och dikterna — trots all deras skönhet — uttryckte en djup skepsis mot den ordning han tjänade.

I Seljukimperiets islamskt ortodoxa klimat var dessa dikter subversiva. Khayyam publicerade dem aldrig under sin livstid.

Han dog 1131. Hans matematik glömdes i 700 år. Hans dikter lever för evigt.

Det är precis det han fruktade.`,
          en: `Omar Khayyam's Rubaiyat were probably not written for publication. They were private reflections.

There is a grand irony: a man who wanted to be remembered for his mathematics came to be immortalised for his poems. And the poems expressed a profound scepticism toward the order he served.

In the Seljuk Empire's Islamically orthodox climate these poems were subversive. Khayyam never published them during his lifetime.

He died in 1131. His mathematics were forgotten for 700 years. His poems live forever.

That is precisely what he feared.`,
          tr: `Hayyam'ın Rubaiyat'ı muhtemelen yayım için yazılmadı. Matematiğiyle hatırlanmak isteyen bir adam, şiirleriyle ölümsüzleşti. 1131'de öldü. Matematiği 700 yıl unutuldu. Şiirleri sonsuza kadar yaşıyor. Tam da korktuğu şey bu.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 5 — Toghrul III's Last Battle (1194)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "the-last-sultan-at-rayy",
    relatedYear: 1194,
    category: "war",
    title: {
      sv: "Toghrul IIIs sista strid — Imperiet dör vid Rayy",
      en: "Toghrul III's Last Battle — The Empire Dies at Rayy",
      tr: "Tuğrul III'ün Son Savaşı — İmparatorluk Rayy'da Ölüyor",
    },
    subtitle: {
      sv: "1194. Den siste Seljuksultanen väljer döden framför underkastelse.",
      en: "1194. The last Seljuk sultan chooses death over submission.",
      tr: "1194. Son Selçuk sultanı teslim olmak yerine ölümü seçiyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Arvingen till ett halvtomt imperium", en: "The Heir to a Half-Empty Empire", tr: "Yarı Boşalmış Bir İmparatorluğun Varisi" },
        figure: "Toghrul III",
        content: {
          sv: `Toghrul III ärvde ett namn som vägde tungt och ett imperium som var tomt.

Namnet Toghrul — hans urfader Tughril Beg, han som red in i Bagdad — var ett av historiens mäktigaste. Men det imperium Toghrul III ärvde 1174 var en skugga av detta namn.

Toghrul III var inte en man som böjde sig för det oundvikliga. Han var ung, arg och beslutsam. Han ville återvinna. Han ville att hans namn ska betyda något mer än "den siste."

Under 20 år kämpade han. Sedan kom Khwarazmianerna.`,
          en: `Toghrul III inherited a name that weighed heavily and an empire that was hollow.

The name Toghrul — his ancestor Tughril Beg, who rode into Baghdad — was one of history's most powerful. But the empire Toghrul III inherited in 1174 was a shadow of this name.

But Toghrul III was not a man who bowed to the inevitable. He was young, angry and determined. He wanted his name to mean something more than "the last."

For 20 years he fought. Then came the Khwarazmians.`,
          tr: `Tuğrul III, ağır bir isim ve içi boş bir imparatorluk miras aldı. Ama kaçınılmaza boyun eğen biri değildi. 20 yıl savaştı. Sonra Harizmşahlar geldi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Tekish mot Toghrul", en: "Tekish versus Toghrul", tr: "Tekiş'e Karşı Tuğrul" },
        figure: "Toghrul III",
        content: {
          sv: `Shah Tekish av Khwarazm var en statsbyggare av modernt snitt — administrativt genialisk, militärt överlägsen.

Toghrul III vägrade att underkasta sig.

"Jag kommer inte att underteckna ett capitulation-dokument," sade Toghrul. "Jag är inte den siste Seljuksultanen. Jag är sultanen som håller linjen."

Rådgivarna visste att han förlorade. De flesta av dem lämnade.

Toghrul samlade det han hade och red mot Rayy.`,
          en: `Shah Tekish of Khwarazm was a state-builder of the modern cut — administratively brilliant, militarily superior.

Toghrul III refused to submit.

"I will not sign a capitulation document," Toghrul said. "I am not the last Seljuk sultan. I am the sultan who holds the line."

The advisors knew he was losing. Most of them left.

Toghrul gathered what he had and rode toward Rayy.`,
          tr: `Harizm Şahı Tekiş'in askeri ve kaynakları üstündü. Tuğrul III reddetti. "Teslim belgesi imzalamayacağım. Ben son Selçuk sultanı değilim. Ben sınırı tutan sultanım."`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Slutet vid Rayy", en: "The End at Rayy", tr: "Rayy'daki Son" },
        figure: "Toghrul III",
        content: {
          sv: `Slaget vid Rayy 1194 var inte ett slag om ett imperium. Det var ett slag om ett namn.

Toghrul III kämpade tappert — vittnen berättar att han personligen ledde kavalleriänfall, att han red in i strid med sabel i hand. Han kämpade som hans förfader Tughril Beg hade kämpat vid Dandanaqan 150 år tidigare.

Han dog i striden.

Det 157 år gamla Seljukimperiet var officiellt slut.

Men imperiet var inte slut. Det var transformerat. Det persisk-islamiska administrativa systemet, Nizamiyya-universitetens intellektuella tradition, sultansystemet — allt detta levde vidare. I Anatolien, som Sultanat av Rûm, i 100 år till. I de osmanska sultanerna som ärvde Seljukernas statskonst.

Toghrul III dog. Seljukerna dog. Men det de skapade dog aldrig.`,
          en: `The Battle of Rayy in 1194 was not a battle for an empire. It was a battle for a name.

Toghrul III fought bravely — witnesses report that he personally led cavalry charges, that he rode into battle with sabre in hand. He fought as his ancestor Tughril Beg had fought at Dandanaqan 150 years earlier.

He died in the battle.

The 157-year-old Seljuk Empire was officially over.

But the empire was not over. It was transformed. The Persian-Islamic administrative system, the Nizamiyya universities' intellectual tradition, the sultan system — all of this lived on. In Anatolia, as the Sultanate of Rûm, for another 100 years. In the Ottoman sultans who inherited the Seljuks' statecraft.

Toghrul III died. The Seljuks died. But what they created never did.`,
          tr: `1194 Rayy Savaşı bir imparatorluk için değil, bir isim için yapıldı. Tuğrul III cesurca savaştı. Savaşta öldü. 157 yıllık Selçuk İmparatorluğu resmen sona erdi. Ama yarattıkları Anadolu'da Rum Sultanlığı ve Osmanlı sultanları aracılığıyla yaşamaya devam etti.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 6 — Sanjar's Captivity (1153)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: "sanjar-prisoner-of-the-steppe",
    relatedYear: 1153,
    category: "war",
    title: {
      sv: "Stäppens fånge — Sanjars ödmjukelse",
      en: "Prisoner of the Steppe — Sanjar's Humiliation",
      tr: "Bozkırın Esiri — Sencer'in Alçaltılması",
    },
    subtitle: {
      sv: "1153. Kejsaren av öst tillfångatas av sina egna frändfolk.",
      en: "1153. The emperor of the east is captured by his own kinspeople.",
      tr: "1153. Doğunun imparatoru kendi akrabaları tarafından esir alınıyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Ironi i historiens teater", en: "Irony in History's Theatre", tr: "Tarihin Tiyatrosunda İroni" },
        figure: "Sultan Sanjar",
        content: {
          sv: `Det finns en djup ironi i Sanjars fångenskap. Seljukerna kom till makten som Oghuz-nomader — stäppens folk.

Och sedan, med varje generation av imperiumbyggande, hade de abdikerat från sin nomadiska arvsrätt. De hade blivit städernas folk. Persiska administratörers folk. De hade i stort sett glömt stäppen.

Stäppen hade inte glömt dem.

De Oghuz-stammar som Sultan Sanjar nu regerade krävde frihet att beta sina hjordar, frihet att röra sig.

Sanjar lyssnade inte. 1153 revolterade Oghuz-stammarna. Och i det slag som följde fångades Sanjar.`,
          en: `There is a profound irony in Sanjar's captivity. The Seljuks came to power as Oghuz nomads — the people of the steppe.

And then, with each generation of empire-building, they had abdicated their nomadic birthright. They had become the people of cities. They had essentially forgotten the steppe.

The steppe had not forgotten them.

The Oghuz tribes that Sultan Sanjar now ruled demanded freedom to graze their herds, freedom to move.

Sanjar did not listen. In 1153 the Oghuz tribes revolted. And in the battle that followed, Sanjar was captured.`,
          tr: `Sencer'in esaretinde derin bir ironi var. Selçuklular Oğuz göçebeleri olarak iktidara geldi. Sonra şehirlerin halkı oldu. Bozkırı unuttular. Bozkır onları unutmamıştı. 1153'te Oğuz kabileleri isyan etti ve Sencer esir alındı.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Tre år som fånge", en: "Three Years as Prisoner", tr: "Esir Olarak Üç Yıl" },
        figure: "Sultan Sanjar",
        content: {
          sv: `Ahmad Sanjar — sultan i 35 år — levde tre år som fånge av de Oghuz han en gång kommenderat.

Det var inte grym fångenskap. Han fick föda, tält, till och med hedersgester. Men han fick inte frihet. Och ett sultanat utan rörelsefriheten är ett sultanat i graven.

Vittnen berättar att Sanjar grät mer än en gång under sin fångenskap — inte av smärta utan av skam. Han som hade besegrat Karakhaniderna och Ghaznaviderna. Fångad av de herdar vars skatter han krävt.

Imperiet han lämnade var ett imperium i fritt fall. Sanjar flydde 1156 och dog 1157, av sorg och svaghet.

Ingen av de stora sultanerna dog i sin säng med sin imperium intakt. Det är kanske historiens viktigaste lärdom om makt.`,
          en: `Ahmad Sanjar — sultan for 35 years — lived three years as prisoner of the Oghuz he had once commanded.

It was not cruel captivity. He received food, a tent, even gestures of honour. But he did not receive freedom. And a sultanate without freedom of movement is a sultanate in its grave.

Witnesses report that Sanjar wept more than once during his captivity — not from pain but from shame. He who had defeated the Kara-Khanids and the Ghaznavids. Captured by the herders whose taxes he had demanded.

The empire he left behind was an empire in free fall. Sanjar escaped in 1156 and died in 1157, of grief and weakness.

None of the great sultans died in their bed with their empire intact. That is perhaps history's most important lesson about power.`,
          tr: `Ahmad Sencer 35 yıl sultandı, üç yıl Oğuzların esiri olarak yaşadı. Yiyecek, çadır, hatta onur jestleri aldı. Ama özgürlük almadı. Sencer'in geride bıraktığı imparatorluk serbest düşüşteydi. 1156'da kaçtı, 1157'de keder ve zayıflıktan öldü.`,
        },
      },
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG — with stories integrated
// =============================================================================

export const seljukEmpire: EmpireConfig = {
  id: "seljuk_empire",
  name: {
    sv: "Seljukimperiet",
    en: "Seljuk Empire",
    tr: "Selçuklu İmparatorluğu",
  },
  theme: "ottoman",
  appTitle: "Seljuk Empire Intelligence",
  crestImage: seljukLogo,
  backgroundImage: seljukBg,
  leaderTitle: { sv: "Sultan", en: "Sultan", tr: "Sultan" },
  dynastyTitle: {
    sv: "Seljukdynastin",
    en: "Seljuk Dynasty",
    tr: "Selçuklu Hanedanı",
  },
  timeline: seljukTimeline,
  leaders: seljukLeaders,
  profiles: seljukProfiles,
  figures: [],
  quizQuestions: seljukQuizQuestions,
  badges: seljukBadges,
  territories: seljukTerritories,
  tradeRoutes: seljukTradeRoutes,
  stories: seljukStories,                    // ← STORY MODE INTEGRATION
  mapCenter: [37.0, 50.0],                   // Centered between Iran and Iraq
  mapZoom: 4,
  yearRange: [1037, 1194],
  yearDefault: 1071,                         // Default to year of Manzikert
  chatSystemContext:
    "the Seljuk Empire (1037–1194 AD). You are an expert on Seljuk imperial history covering the founding by Tughril Beg and the defeat of the Ghaznavids at Dandanaqan (1040), the entry into Baghdad and alliance with the Abbasid caliphate (1055), the military zenith under Alp Arslan and the historic Battle of Manzikert (1071) that opened Anatolia to Turkish colonisation, the cultural golden age under Malik Shah I and the brilliant vizier Nizam al-Mulk who wrote the Siyasatnama and founded the Nizamiyya universities, the calendar reform by Omar Khayyam, the catastrophic double death of 1092, the civil wars among Malik Shah's sons, the rise of the Crusades as a response to Seljuk expansion, Sultan Sanjar's long and tragic reign in the east, and the final dissolution of the empire in 1194. Draw on Persian chronicles, Arab sources, and Byzantine accounts.",
  chatPlaceholders: {
    sv: "Ställ en fråga om Seljukimperiet...",
    en: "Ask a question about the Seljuk Empire...",
    tr: "Selçuklu İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Vad hände vid slaget vid Manzikert och varför var det så avgörande?",
      "Vem var Nizam al-Mulk och vilket var hans arv?",
      "Hur omformade Seljukerna islamisk civilisation?",
    ],
    en: [
      "What happened at the Battle of Manzikert and why was it so decisive?",
      "Who was Nizam al-Mulk and what was his legacy?",
      "How did the Seljuks reshape Islamic civilisation?",
    ],
    tr: [
      "Malazgirt Savaşı'nda ne oldu ve neden bu kadar belirleyiciydi?",
      "Nizamülmülk kimdi ve mirası neydi?",
      "Selçuklar İslam medeniyetini nasıl yeniden şekillendirdi?",
    ],
  },
  homeDescription: {
    sv: "Utforska det turkiska imperiet som omformade islamisk civilisation (1037–1194) — från stäppernas nomader till Bagdads beskyddare, från Manzikert till Omar Khayyams kalender.",
    en: "Explore the Turkish empire that reshaped Islamic civilisation (1037–1194) — from steppe nomads to Baghdad's protectors, from Manzikert to Omar Khayyam's calendar.",
    tr: "İslam medeniyetini yeniden şekillendiren Türk imparatorluğunu keşfedin (1037–1194) — bozkır göçebelerinden Bağdat'ın koruyucularına, Malazgirt'ten Ömer Hayyam'ın takvimine.",
  },
  mapTitle: {
    sv: "Seljukimperiets territorium",
    en: "Seljuk Empire Territory",
    tr: "Selçuklu İmparatorluğu Toprakları",
  },
};
