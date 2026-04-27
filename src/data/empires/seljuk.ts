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
  HistoricalProfile,
} from "./types";

// =============================================================================
// TIMELINE — Seljuk Empire (1037–1194 AD) — 45+ events
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
      tr: "Selçuk ibn Duqaq, Oğuz kabile birliği ordusundaki bir subay, beyleriyle arasını bozarak ailesini ve destekçilerini Maveraünnehir'e doğru götürür. Seljuk, İslam'a geçiş yapar — bu geçiş hem manevi hem de stratejikti. Syr Derya kıyısındaki Cend şehrinden Selçuklu İmparatorluğu'nun destansı hikayesi başlar.",
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
      sv: "Alp Arslan erövrar Ani — den armeniska Bagratid-dynastins glänsande huvudstad — i ett blixtkrig som chockar hela den kristna världen. Ani var en av medeltidens mest imponerande befästa städer, byggd på en bergklint omgiven av djupa raviner och massiva stenmurар. Armeniska och bysantinska krönikor beskriver stormningen med fasa — stadens kyrkor förvandlades till mosképer och befolkningen tvingades underkasta sig. Erövringen av Ani signalerar att Seljukerna inte nöjer sig med Centralasien och Persien — de siktar på hela den islamiska och kristna Mellanösterns geopolitik.",
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
      sv: "Den 27 november 1095 håller påve Urban II sitt historiska tal vid kyrkokonsiliet i Clermont och manar det kristna Europa till heligt krig för att återta Jerusalem och Heliga landet från 'de otrogna turkarna.' Talets direkta orsak är en appell från bysantinsk kejsare Alexios I Komnenos om hjälp mot det Seljukiska hotet. Tiotusentals riddare, herrar och fattiga pilgrimer svarar på uppropet. Det Första korståget (1096–1099) är en direkt reaktion på Seljukernas erövring av Anatolien och Jerusalem. Ironiskt nog hade de ursprungliga Seljukers relativt toleranta styre mot kristna pilgrimer — det var de fatimidiska egyptierna som stängte Jerusalem för kristna. Men det spelar ingen roll för propagandan: 'turkarna' är nu medeltidens stora fiende för det kristna Europa.",
      en: "On 27 November 1095 Pope Urban II gives his historic speech at the Church Council of Clermont and calls Christian Europe to holy war to retake Jerusalem and the Holy Land from 'the infidel Turks.' The speech's immediate cause is an appeal from Byzantine Emperor Alexios I Komnenos for help against the Seljuk threat. Tens of thousands of knights, lords and poor pilgrims respond to the call. The First Crusade (1096–1099) is a direct reaction to the Seljuk conquest of Anatolia and Jerusalem. Ironically the original Seljuks' relatively tolerant rule toward Christian pilgrims — it was the Fatimid Egyptians who closed Jerusalem to Christians. But it does not matter for the propaganda: 'the Turks' are now the medieval world's great enemy for Christian Europe.",
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
      en: "On 15 July 1099 the Crusaders storm Jerusalem and massacre the city's Muslim and Jewish inhabitants in a bloodbath that shocks the Islamic world. Jerusalem — the third holiest site in Islam and one of Islam's religious jewels — is now in Christian hands. The Seljuk Empire, split by internal succession conflicts, cannot mobilise a coordinated military response. It is a humiliating moment for Sunni Islam and proof of how the Seljuks' political unity has eroded since 1092. The loss of Jerusalem becomes a wound in the Islamic consciousness that does not heal until Saladin recaptures the city nearly a century later.",
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
      sv: "Ahmad Sanjar, son till Malik Shah I, tar kontrollen över det östra Seljukimperiet och regerar som sultan i mer än 40 år — ett av de längsta i Seljukdynastins historia. Sanjar är en aristokratisk, kultiverad och militärt kompetent härskare som lyckas bevara det östra imperiets stabilitet under en period av ökande press. Han för framgångsrika krig mot Kara-Khanid och Ghaznavid-staterna och upprätthåller Seljukernas överhöghet i Centralasien. Sanjar patroniserar lärde och poeter — hans hov är ett centrum för persisk litteratur och vetenskap. Men han kan inte förhindra det slutliga kollapset som kommer på hans ålderdas dagar.",
      en: "Ahmad Sanjar, son of Malik Shah I, takes control of the eastern Seljuk Empire and reigns as sultan for more than 40 years — one of the longest in Seljuk dynasty history. Sanjar is an aristocratic, cultivated and militarily competent ruler who manages to preserve the eastern empire's stability during a period of increasing pressure. He wages successful wars against the Kara-Khanid and Ghaznavid states and maintains Seljuk supremacy in Central Asia. Sanjar patronises scholars and poets — his court is a centre for Persian literature and science. But he cannot prevent the final collapse that comes in his old age.",
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
      en: "Sultan Sanjar suffers his most fateful military defeat at the Qatwan steppe near Samarkand against the Buddhist Kara Khitai people (Western Liao) who swept in from the east. The battle is a catastrophe: the Seljuk army is crushed, thousands killed and Sanjar barely escapes. Kara Khitai takes control of parts of Transoxiana — a region the Seljuks have controlled for a century. Qatwan shows that the Seljuk Empire is no longer invincible, and inspires other vassal states and rival powers to challenge Seljuk supremacy.",
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
      en: "In one of the Seljuk Empire's most humiliating episodes Sultan Sanjar is captured by the rebellious Oghuz tribes — paradoxically his own Turkish kinspeople — after a catastrophic military defeat. Sanjar is held prisoner for three years by the nomadic Oghuz who had rebelled against the taxes and restrictions the Seljuks imposed on them. There is a deeper irony: the Seljuks, who came to power as nomadic Oghuz warriors, are now persecuted by the people they left behind on the steppes. Sanjar's captivity permanently undermines Seljuk authority in Central Asia and opens the region to fragmentation.",
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
      sv: "Sultan Ahmad Sanjar dör vid 72 års ålder — efter att ha regerat i mer än 40 år och efter att ha bevittnat imperiets dramatiska nedgång under sina sista år. Med hans bortgång splittras det Stora Seljukimperiet definitivt i ett antal regionala sultanat: Seljukerna av Rûm i Anatolien, Seljukerna av Syrien, Seljukerna av Kirman, Seljukerna av Irak och Persien. Varje gren fortsätter sin existens men det centrala imperiet som Tughril grundade är borta. Det centrala arvet — den islamiska statskonsten, Nizamiyya-universiteten, den persisk-islamiska kultursyntesen — lever vidare, men den politiska enheten är fragmenterad för alltid.",
      en: "Sultan Ahmad Sanjar dies at age 72 — having reigned for more than 40 years and having witnessed the empire's dramatic decline in his final years. With his passing the Great Seljuk Empire definitively splits into a number of regional sultanates: the Seljuks of Rûm in Anatolia, the Seljuks of Syria, the Seljuks of Kirman, the Seljuks of Iraq and Persia. Each branch continues its existence but the central empire that Tughril founded is gone. The central legacy — Islamic statecraft, the Nizamiyya universities, the Persian-Islamic cultural synthesis — lives on, but political unity is fragmented forever.",
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
      en: "The last of the central Seljuk Empire's branches — the Seljuks of Iraq — falls to the Khwarazmian Shah Tekish at Rayy in 1194. Sultan Toghrul III, the last great Seljuk king of the Iraq line, is killed in battle. The 157-year-old Seljuk Empire — which once controlled territories from Central Asia to the Mediterranean — is now officially dissolved as a central imperial construction. The only Seljuk survivor is the Sultanate of Rûm in Anatolia which lives on for another 100 years. The cultural legacy however is enormous: Persian-Islamic culture, the Nizamiyya education system, Turkish statecraft, the calendar reform and the architectural tradition that marks Islamic civilisation for generations.",
      tr: "Merkezi Selçuk İmparatorluğu'nun son kolu — Irak Selçukları — 1194'te Rayy'da Harizmşah Tekiş'e yenik düşer. 157 yıllık Selçuk İmparatorluğu artık resmen sona ermiştir. Kültürel miras ise devasa: Farsça-İslam kültürü, Nizamiye eğitim sistemi ve mimarisi kuşaklar boyunca İslam medeniyetini damgalar.",
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
// LEADERS — All Sultans with profile pages
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
// QUIZ — Empty structure
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
// PROFILES — All Sultans with detailed pages
// =============================================================================

const seljukProfiles: HistoricalProfile[] = [
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
      tr: "Tuğrul'un yönetimi, fethettiği nüfuslar için kaçınılmaz olarak yıkım ve yerinden edilme anlamına geldi. İran ve Irak'a götürdüğü göçebe Oğuz kabileleri barışçıl göçmenler değildi.",
    },
  },
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
      sv: ["Militär reorganisation och expansion av Seljukimperiet", "Etablerandet av turkisk militär överhöghet i Mellanöstern", "Diplomatisk allians med Abbasidkalifaten", "Stöd för Nizam al-Mulks administrativa reformer"],
      en: ["Military reorganisation and expansion of the Seljuk Empire", "Establishment of Turkish military supremacy in the Middle East", "Diplomatic alliance with the Abbasid caliphate", "Support for Nizam al-Mulk's administrative reforms"],
      tr: ["Selçuk İmparatorluğu'nun askeri yeniden örgütlenmesi ve genişlemesi", "Orta Doğu'da Türk askeri üstünlüğünün tesisi", "Abbasi halifeliğiyle diplomatik ittifak", "Nizamülmülk'ün idari reformlarına destek"],
    },
    campaigns: {
      sv: ["Erövringen av Ani och Armenien (1064)", "Slaget vid Manzikert (1071) — bysantinska kejsaren tillfångatas", "Kampanjer i Syrien och mot fatimidiska Egypten", "Erövringen av Georgia och södra Kaukasus"],
      en: ["Conquest of Ani and Armenia (1064)", "Battle of Manzikert (1071) — Byzantine emperor captured", "Campaigns in Syria and against Fatimid Egypt", "Conquest of Georgia and southern Caucasus"],
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
      tr: "Malazgirt'in sonuçları — Anadolu'nun Türk-Müslüman topraklarına dönüşmesi — 1000 yıllık Hristiyan kültürünün ve medeniyetinin kaybı anlamına geldi. Alparslan'ın askeri zaferi, Anadolu'nun yerli nüfusları için demografik ve kültürel bir felaket oldu.",
    },
  },
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
      sv: ["Grundandet av Nizamiyya-universiteten", "Kalenderreformen med Omar Khayyam (jalali-kalendern)", "Byggandet av karavanserailer längs Sidenvägen", "Administrativ standardisering av det multietniska imperiet", "Diplomatiska relationer med Song-Kina och Bysans"],
      en: ["Founding of Nizamiyya universities", "Calendar reform with Omar Khayyam (Jalali calendar)", "Construction of caravanserais along the Silk Road", "Administrative standardisation of the multi-ethnic empire", "Diplomatic relations with Song China and Byzantium"],
      tr: ["Nizamiye üniversitelerinin kurulması", "Ömer Hayyam ile takvim reformu (Celali takvim)", "İpek Yolu boyunca kervansarayların inşası", "Çok etnili imparatorluğun idari standardizasyonu", "Song Çin ve Bizans ile diplomatik ilişkiler"],
    },
    campaigns: {
      sv: ["Erövringen av Syrien och Palestina", "Erövringen av Antiochia och Medelhavsregionen", "Krigen mot Fatimiderna i Egypten", "Erövringen av Transoxiana och utvidgningen mot Centralasien"],
      en: ["Conquest of Syria and Palestine", "Conquest of Antioch and Mediterranean region", "Wars against the Fatimids in Egypt", "Conquest of Transoxiana and extension toward Central Asia"],
      tr: ["Suriye ve Filistin'in fethi", "Antakya ve Akdeniz bölgesinin fethi", "Mısır'daki Fatımilere karşı savaşlar", "Maveraünnehir'in fethi ve Orta Asya'ya doğru genişleme"],
    },
    leadershipStyle: {
      sv: "Malik Shah var en pragmatisk och kultiverad härskare som förstod att ett imperium kräver mer än militär kraft. Hans stöd för Nizam al-Mulks administrativa genialitet och hans patronage av lärde och poeter skapade en synthesis av turkisk militär kraft och persisk-islamisk civilisation som definierade Seljukimperiets guldålder.",
      en: "Malik Shah was a pragmatic and cultivated ruler who understood that an empire requires more than military force. His support for Nizam al-Mulk's administrative genius and his patronage of scholars and poets created a synthesis of Turkish military power and Persian-Islamic civilisation that defined the Seljuk Empire's golden age.",
      tr: "Melikşah, pragmatik ve kültürlü bir hükümdardı. Nizamülmülk'ün idari dehasına verdiği destek ve alimleri ile şairleri himaye etmesi, Selçuk İmparatorluğu'nun altın çağını tanımlayan Türk askeri gücü ile Fars-İslam medeniyeti senteziyle sonuçlandı.",
    },
    criticalPerspectives: {
      sv: "Malik Shahs beroende av Nizam al-Mulk var en styrka men också en svaghet — när Nizam dödades 1092 kollapsade det administrativa systemet snabbt. Dessutom: Malik Shahs gemål Terken Khatun bedrev en aktiv intrigpolitik som underminerade dynastisk stabilitet och bidrog till Malik Shahs mystiska, möjligen våldsamma, dödsfall.",
      en: "Malik Shah's dependence on Nizam al-Mulk was a strength but also a weakness — when Nizam was killed in 1092 the administrative system quickly collapsed. Furthermore: Malik Shah's consort Terken Khatun conducted active intriguing politics that undermined dynastic stability and contributed to Malik Shah's mysterious, possibly violent, death.",
      tr: "Melikşah'ın Nizamülmülk'e olan bağımlılığı bir güç ama aynı zamanda bir zayıflıktı — Nizam 1092'de öldürüldüğünde idari sistem hızla çöktü. Eşi Terken Hatun ise hanedanlık istikrarını baltalayan aktif entrika siyaseti yürüttü.",
    },
  },
  {
    id: "mahmud-i",
    name: "Mahmud I",
    years: "1087–1094",
    title: { sv: "Det kortlivade barnet", en: "The Short-Lived Child", tr: "Kısa Ömürlü Çocuk" },
    portrait: "👶",
    bio: {
      sv: "Mahmud I var en ung son till Malik Shah I som utropades till sultan av sin mor Terken Khatun i en desperat handling för att säkra sin linje. Han var bara fyra år gammal när han tronades — ett barn i händerna på sin mors politiska ambitioner. Hans korta styre varade i ungefär ett år och half innan hans bror Barkiyaruqs styrkor besegrades hans och han dog. Hans styre är ett klassiskt exempel på dynastisk kris: ett barns namn utnyttjas som politiskt verktyg av rivaliserande fraktioner.",
      en: "Mahmud I was a young son of Malik Shah I who was proclaimed sultan by his mother Terken Khatun in a desperate act to secure her line. He was only four years old when enthroned — a child in the hands of his mother's political ambitions. His brief reign lasted approximately one and a half years before his brother Barkiyaruq's forces defeated him and he died. His reign is a classic example of dynastic crisis: a child's name used as a political tool by rival factions.",
      tr: "Mahmud I, anası Terken Hatun tarafından sultanlığa ilan edilen Melikşah I'in küçük oğluydu. Tahta çıktığında yalnızca dört yaşındaydı. Saltanatı yaklaşık bir buçuk yıl sürdü.",
    },
    reforms: { sv: ["Inga reella reformer — barnsultan under Terken Khatuns regentskap"], en: ["No real reforms — child sultan under Terken Khatun's regency"], tr: ["Gerçek reform yok — Terken Hatun'un naipliği altında çocuk sultan"] },
    campaigns: { sv: ["Inga militära kampanjer — kontrollerad av Terken Khatuns regenter"], en: ["No military campaigns — controlled by Terken Khatun's regents"], tr: ["Askeri sefer yok — Terken Hatun'un naipleri tarafından kontrol edildi"] },
    leadershipStyle: { sv: "Inget ledarskap möjligt — ett fyraårigt barn.", en: "No leadership possible — a four-year-old child.", tr: "Liderlik mümkün değil — dört yaşında bir çocuk." },
    criticalPerspectives: {
      sv: "Mahmud Is 'styre' illustrerar hur dynastiska ambitioner kan utnyttja oskyldiga barn som politiska verktyg. Terken Khatuns manipulation av successionen bidrog direkt till Seljukimperiets politiska kris.",
      en: "Mahmud I's 'reign' illustrates how dynastic ambitions can exploit innocent children as political tools. Terken Khatun's manipulation of the succession contributed directly to the Seljuk Empire's political crisis.",
      tr: "Mahmud I'nin 'saltanatı', hanedanlık hırslarının masum çocukları siyasi araç olarak nasıl sömürebileceğini örnekler.",
    },
  },
  {
    id: "barkiyaruq",
    name: "Barkiyaruq (Rukn al-Din)",
    years: "1080–1105",
    title: { sv: "Inbördeskrigets sultan", en: "Sultan of the Civil War", tr: "İç Savaşın Sultanı" },
    portrait: "⚔️",
    bio: {
      sv: "Barkiyaruq, son till Malik Shah I, regerade Seljukimperiet under en av dess mest turbulenta perioder. Han kämpade oavbrutet mot sina bröder — framför allt Muhammad Tapar och Sanjar — i en serie av inbördeskrig som tärde på imperiet och fragmenterade dess territorier och resurser. Trots att han var den formella sultanen kunde han aldrig utöva effektiv kontroll över hela imperiet. Under hans styre förlorade Seljukerna ytterligare mark till korsfararna och Seljukimperiets centrala auktoritet fortsatte att eroderas. Han dog ung, 25 år gammal, möjligen av tuberkulos.",
      en: "Barkiyaruq, son of Malik Shah I, ruled the Seljuk Empire during one of its most turbulent periods. He fought continuously against his brothers — particularly Muhammad Tapar and Sanjar — in a series of civil wars that drained the empire and fragmented its territories and resources. Despite being the formal sultan he could never exercise effective control over the entire empire. Under his reign the Seljuks lost further ground to the Crusaders and the Seljuk Empire's central authority continued to erode. He died young, 25 years old, possibly of tuberculosis.",
      tr: "Melikşah I'in oğlu Berkyaruk, Selçuk İmparatorluğu'nun en çalkantılı dönemlerinden birinde hüküm sürdü. Kardeşlerine — özellikle Muhammed Tapar ve Sencer'e — karşı sürekli iç savaş verdi. 25 yaşında genç yaşta öldü.",
    },
    reforms: { sv: ["Begränsade reformer pga ständiga inbördeskrig"], en: ["Limited reforms due to constant civil wars"], tr: ["Sürekli iç savaşlar nedeniyle sınırlı reformlar"] },
    campaigns: {
      sv: ["Inbördeskriget mot Muhammad Tapar (1100–1105)", "Defensiva kampanjer mot korsfararna", "Kriget mot sin halvbror Sanjar i öst"],
      en: ["Civil war against Muhammad Tapar (1100–1105)", "Defensive campaigns against the Crusaders", "War against his half-brother Sanjar in the east"],
      tr: ["Muhammed Tapar'a karşı iç savaş (1100–1105)", "Haçlılara karşı savunma seferleri", "Doğudaki üvey kardeşi Sencer'e karşı savaş"],
    },
    leadershipStyle: {
      sv: "Barkiyaruq var en energisk och personligt modig ledare som hindrades av strukturella problem han ärvde från Malik Shahs dödsfall. Hans oförmåga att förena dynastin mot externa hot visade att den dynastiska krisen hade nått en strukturell nivå som enskilda ledarskapsegenskaper inte kunde lösa.",
      en: "Barkiyaruq was an energetic and personally courageous leader hindered by structural problems he inherited from Malik Shah's death. His inability to unite the dynasty against external threats showed that the dynastic crisis had reached a structural level that individual leadership qualities could not solve.",
      tr: "Berkyaruk, enerjik ve kişisel olarak cesur bir liderdi, ancak Melikşah'ın ölümünden miras aldığı yapısal sorunlar tarafından engellendi.",
    },
    criticalPerspectives: {
      sv: "Barkiyaruqs inbördeskrig mot sina bröder var inte bara personlig maktkamp — det reflekterade en fundamental strukturell svaghet i Seljukimperiets successionsystem, där varje prins med tillräcklig militär stöd kunde utmana sultanens överhöghet.",
      en: "Barkiyaruq's civil wars against his brothers were not merely personal power struggles — they reflected a fundamental structural weakness in the Seljuk Empire's succession system, where any prince with sufficient military support could challenge the sultan's supremacy.",
      tr: "Berkyaruk'un kardeşlerine karşı iç savaşları yalnızca kişisel güç mücadelesi değildi — Selçuk İmparatorluğu'nun veraset sistemindeki temel yapısal zayıflığı yansıtıyordu.",
    },
  },
  {
    id: "malik-shah-ii",
    name: "Malik Shah II",
    years: "ca. 1100–1105",
    title: { sv: "Månadsregenten", en: "The Month-Long Regent", tr: "Aylık Naib" },
    portrait: "⏱️",
    bio: {
      sv: "Malik Shah II, son till Barkiyaruq, utropades till sultan av sin fars anhängare men hans styre varade bara i några veckor. Han var ett barn under sin farbror Muhammad Tapars frammarsch och kapitulerade snabbt. Hans 'styre' är historiskt insignifikant utöver att det illustrerar hur fragmenterad successionen var efter Malik Shah I.",
      en: "Malik Shah II, son of Barkiyaruq, was proclaimed sultan by his father's supporters but his reign lasted only a few weeks. He was a child during his uncle Muhammad Tapar's advance and quickly surrendered. His 'reign' is historically insignificant beyond illustrating how fragmented succession was after Malik Shah I.",
      tr: "Melikşah II, Berkyaruk'un oğlu, babasının destekçileri tarafından sultan ilan edildi ancak saltanatı yalnızca birkaç hafta sürdü.",
    },
    reforms: { sv: ["Inga reformer"], en: ["No reforms"], tr: ["Reform yok"] },
    campaigns: { sv: ["Inga kampanjer — kort styre"], en: ["No campaigns — brief reign"], tr: ["Sefer yok — kısa saltanat"] },
    leadershipStyle: { sv: "Otillräcklig information.", en: "Insufficient information.", tr: "Yetersiz bilgi." },
    criticalPerspectives: {
      sv: "Malik Shah IIs 'styre' är ett symptom snarare än en historisk händelse — ett uttryck för den dynastiska krisen.",
      en: "Malik Shah II's 'reign' is a symptom rather than a historical event — an expression of the dynastic crisis.",
      tr: "Melikşah II'nin 'saltanatı' tarihsel bir olay olmaktan çok bir semptomdur — hanedanlık krizinin bir ifadesi.",
    },
  },
  {
    id: "muhammad-i-tapar",
    name: "Muhammad I Tapar (Ghiyath al-Din)",
    years: "1082–1118",
    title: { sv: "Fredens sultan", en: "Sultan of Peace", tr: "Barışın Sultanı" },
    portrait: "🕊️",
    bio: {
      sv: "Muhammad I Tapar, son till Malik Shah I, regerade som sultan 1105–1118 och representerade ett sista försök att återupprätta Seljukimperiets centrala auktoritet. Han lyckades besegra sina rivaliserande bröder och återförena imperiet under ett styre. Han ägnade stor uppmärksamhet åt att bekämpa Assassin-sektens (Nizari Ismailis) inflytande och befäste flera borgar som hade fallit i deras händer. Hans styre var relativt stabilt jämfört med hans föregångares turbulenta era men han kunde inte återvinna de territorier som förlorats till korsfararna. Arabiska och persiska historiker beskriver honom som en from och rättfärdig härskare.",
      en: "Muhammad I Tapar, son of Malik Shah I, reigned as sultan 1105–1118 and represented a last attempt to restore the Seljuk Empire's central authority. He managed to defeat his rival brothers and reunite the empire under one rule. He devoted great attention to combating the Assassin sect's (Nizari Ismailis) influence and recaptured several fortresses that had fallen into their hands. His reign was relatively stable compared to his predecessors' turbulent era but he could not recapture the territories lost to the Crusaders. Arab and Persian historians describe him as a pious and just ruler.",
      tr: "Melikşah I'in oğlu Muhammed I Tapar, 1105–1118 yılları arasında sultan olarak hüküm sürdü ve Selçuk İmparatorluğu'nun merkezi otoritesini yeniden sağlamak için son bir girişimi temsil etti. Haşhaşilerin etkisini mücadele etmeye büyük önem verdi.",
    },
    reforms: {
      sv: ["Återupprättandet av central auktoritet efter inbördeskriget", "Kampanj mot Nizari Ismaili Assassinerna", "Diplomatisk stabilisering med Abbasidkalifaten"],
      en: ["Restoration of central authority after the civil war", "Campaign against Nizari Ismaili Assassins", "Diplomatic stabilisation with the Abbasid caliphate"],
      tr: ["İç savaşın ardından merkezi otoritenin yeniden sağlanması", "Nizari İsmaili Haşhaşilere karşı kampanya", "Abbasi halifeliğiyle diplomatik istikrarlaşma"],
    },
    campaigns: {
      sv: ["Erövringen av Assassin-borgar i Persien", "Kampanjer mot de syrianska Seljukiska vasallerna", "Defensiva operationer mot korsfararna"],
      en: ["Capture of Assassin fortresses in Persia", "Campaigns against Syrian Seljuk vassals", "Defensive operations against the Crusaders"],
      tr: ["İran'daki Haşhaşi kalelerinin alınması", "Suriyeli Selçuklu vasallerine karşı seferler", "Haçlılara karşı savunma operasyonları"],
    },
    leadershipStyle: {
      sv: "Muhammad Tapar var en kompetent administratör och militär ledare som förstod imperiet bättre än dess militära möjligheter. Han prioriterade intern stabilitet och religiös ortodoxi framför ytterligare expansion.",
      en: "Muhammad Tapar was a competent administrator and military leader who understood the empire better than its military possibilities. He prioritised internal stability and religious orthodoxy over further expansion.",
      tr: "Muhammed Tapar, imparatorluğu askeri olanaklarından daha iyi anlayan yetkin bir yönetici ve askeri liderdi. İç istikrar ve dini ortodoksiyi daha fazla genişlemenin önünde tuttu.",
    },
    criticalPerspectives: {
      sv: "Trots Muhammad Tapars relativa framgång med att återförena imperiet, visar hans styre att Seljukimperiets strukturella nedgång var för avancerad för att vända. Assassin-hotet och korsfararkungadömena i väst var problem han inte hade resurser att lösa.",
      en: "Despite Muhammad Tapar's relative success in reuniting the empire, his reign shows that the Seljuk Empire's structural decline was too advanced to reverse. The Assassin threat and Crusader kingdoms in the west were problems he lacked the resources to resolve.",
      tr: "Muhammed Tapar'ın imparatorluğu yeniden birleştirmedeki göreli başarısına rağmen saltanatı, Selçuk İmparatorluğu'nun yapısal gerilimesinin tersine çevrilemeyecek kadar ilerlediğini gösterir.",
    },
  },
  {
    id: "sanjar",
    name: "Ahmad Sanjar (Mu'izz al-Din)",
    years: "1086–1157",
    title: { sv: "Det östliga imperiets siste store", en: "The Eastern Empire's Last Great One", tr: "Doğu İmparatorluğunun Son Büyüğü" },
    portrait: "🌟",
    bio: {
      sv: "Ahmad Sanjar, den yngste sonen till Malik Shah I, är en av Seljukdynastins mest fascinerande och tragiska figurer. Han regerade det östra Seljukimperiet i Khurasan i mer än 40 år — en extraordinärt lång regeringstid som spänner från hans ungdoms triumfer till sin ålderdoms ödmjukelser. I sin storhetstid var Sanjar en aktad sultan som upprätthöll centralasiatisk stabilitet, patroniserade poeter och lärde och vann militära segrar mot Karakhanider och Ghaznaviderna. Men hans sista decennier präglades av katastrofala motgångar: nederlaget vid Qatwan mot Kara Khitai (1141), hans förödmjukande fångenskap av Oghuz-stammarna (1153), och hans slutliga befrielse och dystra regeringstid tills han dog 1157.",
      en: "Ahmad Sanjar, the youngest son of Malik Shah I, is one of the Seljuk dynasty's most fascinating and tragic figures. He ruled the eastern Seljuk Empire in Khurasan for more than 40 years — an extraordinarily long reign spanning from his youth's triumphs to his old age's humiliations. In his prime Sanjar was a respected sultan who maintained Central Asian stability, patronised poets and scholars and won military victories against the Kara-Khanids and Ghaznavids. But his final decades were marked by catastrophic setbacks: the defeat at Qatwan against Kara Khitai (1141), his humiliating captivity by the Oghuz tribes (1153), and his final liberation and bleak final reign until he died in 1157.",
      tr: "Melikşah I'in en küçük oğlu Ahmad Sencer, Selçuk hanedanlığının en büyüleyici ve trajik figürlerinden biridir. Doğu Selçuk İmparatorluğu'nda 40 yılı aşkın süre hüküm sürdü. Zirvesindeyken saygı gören bir sultandı, ancak son on yılları felaket niteliğindeki geri adımlarla geçti.",
    },
    reforms: {
      sv: ["Underhållandet av Nizamiyya-universiteten i Khurasan", "Patronage av persisk litteratur och vetenskap", "Diplomatiska relationer med Kina och Centralasien"],
      en: ["Maintenance of Nizamiyya universities in Khurasan", "Patronage of Persian literature and science", "Diplomatic relations with China and Central Asia"],
      tr: ["Horasan'daki Nizamiye üniversitelerinin sürdürülmesi", "Farsça edebiyat ve bilimin himayesi", "Çin ve Orta Asya ile diplomatik ilişkiler"],
    },
    campaigns: {
      sv: ["Segern mot Karakhaniderna", "Segern mot Ghaznaviderna", "Nederlaget vid Qatwan mot Kara Khitai (1141)", "Kriget mot de upproriska Oghuz-stammarna (1153)"],
      en: ["Victory against the Kara-Khanids", "Victory against the Ghaznavids", "Defeat at Qatwan against Kara Khitai (1141)", "War against the rebellious Oghuz tribes (1153)"],
      tr: ["Karahanlılara karşı zafer", "Gaznelilere karşı zafer", "Kara Hıtay'a karşı Katvan'da yenilgi (1141)", "İsyancı Oğuz kabilelerine karşı savaş (1153)"],
    },
    leadershipStyle: {
      sv: "Sanjar var en traditionell islamisk sultan av den klassiska mönstret: modig i strid, generös mot lärde och poeter, formellt from i sin islam, diplomatisk i sina relationer med vasaller och grannar. Hans tragedi var att han levde för länge — han fick bevittna imperiets sönderfall.",
      en: "Sanjar was a traditional Islamic sultan of the classic pattern: brave in battle, generous toward scholars and poets, formally pious in his Islam, diplomatic in his relations with vassals and neighbours. His tragedy was that he lived too long — he had to witness the empire's disintegration.",
      tr: "Sencer, klasik örüntüde geleneksel bir İslam sultanıydı: savaşta cesur, alimlere ve şairlere cömert, İslam'da biçimsel dindar, vasallar ve komşularla diplomatik. Trajedisi çok uzun yaşamasıydı — imparatorluğun çözülüşüne tanık olmak zorunda kaldı.",
    },
    criticalPerspectives: {
      sv: "Sanjars tragedi är delvis självförvållad — hans militära övermognad och hans oförmåga att förstå Oghuz-nomadernas grievances (klagomål) ledde direkt till Qatwan och hans fångenskap. En klokare sultan hade kanske förutsett och förebyggt dessa kriser.",
      en: "Sanjar's tragedy is partly self-inflicted — his military overconfidence and his failure to understand the Oghuz nomads' grievances led directly to Qatwan and his captivity. A wiser sultan might have foreseen and prevented these crises.",
      tr: "Sencer'in trajedisi kısmen kendi yarattığı bir trajedidir — askeri aşırı güveni ve Oğuz göçebelerinin şikayetlerini anlamaması Katvan ve esaretine doğrudan yol açtı.",
    },
  },
  {
    id: "mahmud-ii",
    name: "Mahmud II",
    years: "ca. 1100–1131",
    title: { sv: "Västsultanens kämpe", en: "Western Sultan's Fighter", tr: "Batı Sultanının Savaşçısı" },
    portrait: "⚔️",
    bio: {
      sv: "Mahmud II, son till Muhammad I Tapar, regerade som sultan av Irak och västra Seljukimperiet 1118–1131, parallellt med Sanjars östliga styre. Hans styre präglades av konstanta konflikter — med sin farbror Sanjar om överhögheten, med Abbasidkalifaten om deras autonomi, och med de turkiska militärbefälhavarna (atabegs) som krävde mer autonomi för sina territorier. Han var formellt den senioraste sultanen men reell makt var fragmenterad bland mäktiga vasaller.",
      en: "Mahmud II, son of Muhammad I Tapar, reigned as sultan of Iraq and the western Seljuk Empire 1118–1131, in parallel with Sanjar's eastern reign. His reign was marked by constant conflicts — with his uncle Sanjar over supremacy, with the Abbasid caliphs over their autonomy, and with Turkish military commanders (atabegs) who demanded more autonomy for their territories. He was formally the most senior sultan but real power was fragmented among powerful vassals.",
      tr: "Melikşah I'in torunu Mahmud II, 1118–1131 yılları arasında Irak ve batı Selçuk İmparatorluğu sultanı olarak hüküm sürdü. Saltanatı sürekli çatışmalarla geçti.",
    },
    reforms: { sv: ["Försök att återupprätta central auktoritet i väst"], en: ["Attempts to restore central authority in the west"], tr: ["Batıda merkezi otoriteyi yeniden sağlama girişimleri"] },
    campaigns: {
      sv: ["Konflikter med Sanjar om imperial överhöghet", "Kampanjer mot upproriska atabegs"],
      en: ["Conflicts with Sanjar over imperial supremacy", "Campaigns against rebellious atabegs"],
      tr: ["İmparatorluk üstünlüğü için Sencer ile çatışmalar", "İsyancı atabeglere karşı seferler"],
    },
    leadershipStyle: {
      sv: "Mahmud II regerade i ett strukturellt omöjligt läge — formell överhöghet utan reella resurser att upprätthålla den.",
      en: "Mahmud II ruled in a structurally impossible position — formal supremacy without real resources to maintain it.",
      tr: "Mahmud II, yapısal olarak imkansız bir konumda hüküm sürdü — onu sürdürecek gerçek kaynaklar olmadan biçimsel üstünlük.",
    },
    criticalPerspectives: {
      sv: "Mahmud IIs styre är historiskt sparsamt dokumenterat — han regerade i skuggan av Sanjar och i ett fragmenterat imperiums bakvatten.",
      en: "Mahmud II's reign is historically sparsely documented — he ruled in Sanjar's shadow and in the backwaters of a fragmented empire.",
      tr: "Mahmud II'nin saltanatı tarihsel olarak yetersiz belgelenmiştir — Sencer'in gölgesinde ve parçalanmış bir imparatorluğun arka sularında hüküm sürdü.",
    },
  },
  {
    id: "dawud",
    name: "Dawud (Toghrul II)",
    years: "ca. 1105–1132",
    title: { sv: "Den kortvarige", en: "The Brief One", tr: "Kısa Süren" },
    portrait: "⚡",
    bio: {
      sv: "Dawud, son till Muhammad I Tapar och känd under det alternativa namnet Toghrul II, regerade i extremt kort tid 1131–1132. Hans styre är historiskt nästan osynligt. Han representerar den generation av Seljuk-sultaner som regerade i skuggan av Sanjar och vars styre reduceras till administrativa fotnoter i imperiets stora historia.",
      en: "Dawud, son of Muhammad I Tapar and known under the alternative name Toghrul II, reigned for an extremely short time 1131–1132. His reign is historically almost invisible. He represents the generation of Seljuk sultans who reigned in Sanjar's shadow and whose reigns are reduced to administrative footnotes in the empire's grand history.",
      tr: "Muhammed I Tapar'ın oğlu Davud, 1131–1132'de son derece kısa bir süre hüküm sürdü. Saltanatı tarihsel olarak neredeyse görünmezdir.",
    },
    reforms: { sv: ["Inga kända reformer"], en: ["No known reforms"], tr: ["Bilinen reform yok"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: { sv: "Otillräcklig information.", en: "Insufficient information.", tr: "Yetersiz bilgi." },
    criticalPerspectives: {
      sv: "Dawuds styre är historiskt en fotnot.",
      en: "Dawud's reign is historically a footnote.",
      tr: "Davud'un saltanatı tarihsel olarak bir dipnottur.",
    },
  },
  {
    id: "toghrul-ii",
    name: "Toghrul II",
    years: "ca. 1109–1135",
    title: { sv: "Kharasans regent", en: "Regent of Khurasan", tr: "Horasan'ın Naibı" },
    portrait: "🏛️",
    bio: {
      sv: "Toghrul II, son till Muhammad I Tapar, regerade 1132–1135 och kämpade mot Sanjar för kontroll över det västra imperiet. Hans styre var kort och konfliktfyllt. Han är en av de Seljuk-sultaner vars styre mer definieras av interna konflikter än av externa bedrifter.",
      en: "Toghrul II, son of Muhammad I Tapar, reigned 1132–1135 and struggled against Sanjar for control of the western empire. His reign was short and conflict-filled. He is one of the Seljuk sultans whose reign is more defined by internal conflicts than external achievements.",
      tr: "Muhammed I Tapar'ın oğlu Tuğrul II, 1132–1135'te hüküm sürdü ve batı imparatorluğunun kontrolü için Sencer ile mücadele etti.",
    },
    reforms: { sv: ["Begränsade reformer pga ständiga konflikter"], en: ["Limited reforms due to constant conflicts"], tr: ["Sürekli çatışmalar nedeniyle sınırlı reformlar"] },
    campaigns: {
      sv: ["Interna konflikter med Sanjar och andra Seljukprinsar"],
      en: ["Internal conflicts with Sanjar and other Seljuk princes"],
      tr: ["Sencer ve diğer Selçuk prensleriyle iç çatışmalar"],
    },
    leadershipStyle: { sv: "Defensiv och reaktiv — överväldigad av strukturella konflikter.", en: "Defensive and reactive — overwhelmed by structural conflicts.", tr: "Savunmacı ve reaktif — yapısal çatışmalar tarafından bunaltılmış." },
    criticalPerspectives: {
      sv: "Toghrul IIs styre är ännu ett symptom på Seljukimperiets kroniska successionssjukdom.",
      en: "Toghrul II's reign is yet another symptom of the Seljuk Empire's chronic succession disease.",
      tr: "Tuğrul II'nin saltanatı, Selçuk İmparatorluğu'nun kronik veraset hastalığının bir başka belirtisidir.",
    },
  },
  {
    id: "masud-i",
    name: "Masud I",
    years: "ca. 1105–1152",
    title: { sv: "Nedgångens administratör", en: "Administrator of the Decline", tr: "Gerilemenin Yöneticisi" },
    portrait: "📋",
    bio: {
      sv: "Masud I, son till Muhammad I Tapar, regerade det västra Seljukimperiet 1135–1152 och är den siste viktiga sultan av det centrala Seljukimperiets västra gren. Hans styre präglades av ökande press från de turkiska militärbefälhavarna (atabegs) vars autonomi hade vuxit till den grad att de i praktiken var självständiga. Han lyckades upprätthålla en nominal auktoritet men den reella makten fragmenterades allt mer. Under hans styre växte Zangid-dynastin i Mosul och Syrien till att bli en regional stormakt som utmanade Seljukisk överhöghet.",
      en: "Masud I, son of Muhammad I Tapar, ruled the western Seljuk Empire 1135–1152 and is the last important sultan of the central Seljuk Empire's western branch. His reign was marked by increasing pressure from Turkish military commanders (atabegs) whose autonomy had grown to the point where they were practically independent. He managed to maintain nominal authority but real power fragmented increasingly. Under his reign the Zangid dynasty in Mosul and Syria grew into a regional great power challenging Seljuk supremacy.",
      tr: "Muhammed I Tapar'ın oğlu Mesud I, 1135–1152 yılları arasında batı Selçuk İmparatorluğu'nu yönetti ve merkezi Selçuk İmparatorluğu'nun batı kolunun son önemli sultanıdır.",
    },
    reforms: { sv: ["Försök att bromsa atabegarnas växande autonomi"], en: ["Attempts to slow the atabegs' growing autonomy"], tr: ["Atabeglerin büyüyen özerkliğini yavaşlatma girişimleri"] },
    campaigns: {
      sv: ["Konflikter med Zangid-dynastin", "Konflikter med autonoma atabegs"],
      en: ["Conflicts with the Zangid dynasty", "Conflicts with autonomous atabegs"],
      tr: ["Zengiler hanedanlığıyla çatışmalar", "Özerk atabegler ile çatışmalar"],
    },
    leadershipStyle: {
      sv: "Masud I var en administrativt kompetent men militärt svag härskare i en period då imperiet krävde militär styrka för att hålla samman.",
      en: "Masud I was an administratively competent but militarily weak ruler in a period when the empire required military strength to hold together.",
      tr: "Mesud I, imparatorluğun bir arada tutulması için askeri güce ihtiyaç duyduğu bir dönemde idari açıdan yetkin ama askeri açıdan zayıf bir hükümdardı.",
    },
    criticalPerspectives: {
      sv: "Under Masud Is styre accelererades Seljukimperiets fragmentering till en punkt av inget åter — atabegarnas autonomi var inte längre reversibel.",
      en: "Under Masud I's reign the Seljuk Empire's fragmentation accelerated to a point of no return — the atabegs' autonomy was no longer reversible.",
      tr: "Mesud I'in saltanatı döneminde Selçuk İmparatorluğu'nun parçalanması geri dönüşü olmayan bir noktaya hızlandı.",
    },
  },
  {
    id: "malik-shah-iii",
    name: "Malik Shah III",
    years: "ca. 1130–1153",
    title: { sv: "Den siste av huvudlinjen", en: "The Last of the Main Line", tr: "Ana Kolun Sonuncusu" },
    portrait: "🌅",
    bio: {
      sv: "Malik Shah III, son till Masud I, regerade i ytterst kort tid 1152–1153 och var den siste sultanen av den centrala Seljukimperiets direkta Irak-linje. Hans styre är historiskt minimalt — han deponerades snabbt av sin farbror Muhammad II. Hans korta styre illustrerar den totala upplösning av central auktoritet som präglade Seljukimperiet i sina sista decennier.",
      en: "Malik Shah III, son of Masud I, reigned for an extremely short time 1152–1153 and was the last sultan of the central Seljuk Empire's direct Iraq line. His reign is historically minimal — he was quickly deposed by his uncle Muhammad II. His brief reign illustrates the total dissolution of central authority that marked the Seljuk Empire in its final decades.",
      tr: "Mesud I'in oğlu Melikşah III, 1152–1153'te son derece kısa bir süre hüküm sürdü ve merkezi Selçuk İmparatorluğu'nun doğrudan Irak kolunun son sultanıydı.",
    },
    reforms: { sv: ["Inga kända reformer"], en: ["No known reforms"], tr: ["Bilinen reform yok"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: { sv: "Otillräcklig information.", en: "Insufficient information.", tr: "Yetersiz bilgi." },
    criticalPerspectives: {
      sv: "Malik Shah IIIs styre är historiskt nästan osynligt — en fotnot i imperiets upplösning.",
      en: "Malik Shah III's reign is historically almost invisible — a footnote in the empire's dissolution.",
      tr: "Melikşah III'ün saltanatı tarihsel olarak neredeyse görünmezdir — imparatorluğun çözülmesinde bir dipnot.",
    },
  },
  {
    id: "muhammad-ii",
    name: "Muhammad II",
    years: "ca. 1120–1159",
    title: { sv: "Upplösningstidens sultan", en: "Sultan of the Dissolution Age", tr: "Çözülme Çağının Sultanı" },
    portrait: "📉",
    bio: {
      sv: "Muhammad II, son till Masud I, regerade 1153–1159 och representerade ett sista försök att upprätthålla Seljukisk auktoritet i Irak och västra Persien. Han avsatte sin brorson Malik Shah III och tog makten men hans styre var svagt och kortvarigt. Under hans styre fortsatte den turkiska atebeg-klassens autonomisering och Zangid-dynastin under Nur ad-Din utmanade Seljukisk överhöghet med allt större kraft.",
      en: "Muhammad II, son of Masud I, reigned 1153–1159 and represented a last attempt to maintain Seljuk authority in Iraq and western Persia. He deposed his nephew Malik Shah III and took power but his reign was weak and short-lived. Under his reign the Turkish atebeg class's autonomisation continued and the Zangid dynasty under Nur ad-Din challenged Seljuk supremacy with increasing force.",
      tr: "Mesud I'in oğlu Muhammed II, 1153–1159'da hüküm sürdü ve Irak ile batı İran'da Selçuk otoritesini sürdürme son girişimini temsil etti.",
    },
    reforms: { sv: ["Försök att centralisera makten mot atabegarnas autonomi"], en: ["Attempts to centralise power against the atabegs' autonomy"], tr: ["Atabeglerin özerkliğine karşı gücü merkezileştirme girişimleri"] },
    campaigns: {
      sv: ["Konflikter med Zangiderna", "Strider mot autonoma atabegs i Irak"],
      en: ["Conflicts with the Zangids", "Battles against autonomous atabegs in Iraq"],
      tr: ["Zengilerle çatışmalar", "Irak'taki özerk atabeglere karşı savaşlar"],
    },
    leadershipStyle: { sv: "Svag och reaktiv — överväldigad av strukturella krafter.", en: "Weak and reactive — overwhelmed by structural forces.", tr: "Zayıf ve reaktif — yapısal güçler tarafından bunaltılmış." },
    criticalPerspectives: {
      sv: "Muhammad IIs styre illustrerar att Seljukimperiets centrala grenar var oförmögna att vända nedgången oavsett enskilda ledares karaktär.",
      en: "Muhammad II's reign illustrates that the Seljuk Empire's central branches were incapable of reversing decline regardless of individual leaders' character.",
      tr: "Muhammed II'nin saltanatı, Selçuk İmparatorluğu'nun merkezi kollarının bireysel liderlerin karakterinden bağımsız olarak gerilimeyi tersine çeviremeyeceğini gösterir.",
    },
  },
  {
    id: "suleiman-shah",
    name: "Suleiman Shah",
    years: "ca. 1115–1161",
    title: { sv: "Övergångssultanen", en: "The Transitional Sultan", tr: "Geçiş Sultanı" },
    portrait: "🌉",
    bio: {
      sv: "Suleiman Shah, son till Muhammad I Tapar, regerade kortvarigt 1159–1161 efter Muhammad IIs bortgång. Hans styre var för kort och historiskt för dåligt dokumenterat för en djupare analys. Han representerar det allra sista skedet av det centrala Seljukimperiets Irak-linje.",
      en: "Suleiman Shah, son of Muhammad I Tapar, reigned briefly 1159–1161 after Muhammad II's passing. His reign was too short and historically too poorly documented for deeper analysis. He represents the very final stage of the central Seljuk Empire's Iraq line.",
      tr: "Muhammed I Tapar'ın oğlu Süleyman Şah, Muhammed II'nin ölümünün ardından 1159–1161 yılları arasında kısa süre hüküm sürdü.",
    },
    reforms: { sv: ["Inga kända reformer"], en: ["No known reforms"], tr: ["Bilinen reform yok"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: { sv: "För lite känt.", en: "Too little known.", tr: "Çok az şey biliniyor." },
    criticalPerspectives: {
      sv: "Suleiman Shahs styre är ytterligare ett symptom på Seljukimperiets kroniska successionsinstabilitet.",
      en: "Suleiman Shah's reign is yet another symptom of the Seljuk Empire's chronic succession instability.",
      tr: "Süleyman Şah'ın saltanatı, Selçuk İmparatorluğu'nun kronik veraset istikrarsızlığının bir başka belirtisidir.",
    },
  },
  {
    id: "arslan-shah",
    name: "Arslan Shah",
    years: "ca. 1135–1174",
    title: { sv: "Sena imperiets kämpe", en: "Fighter of the Late Empire", tr: "Geç İmparatorluğun Savaşçısı" },
    portrait: "⚔️",
    bio: {
      sv: "Arslan Shah, son till Toghrul II, regerade 1161–1174 och kämpade för att upprätthålla Seljukisk relevans i ett Mesopotamien dominerat av allt mäktigare atabegs. Hans styre är historiskt dokumenterat men inte dramatiskt — han lyckades hålla imperiets form utan att kunna återvinna dess substans. Under hans styre fortsatte korsfararkungadömena att konsolidera sig i Levanten och Zangiderna under Saladin (efter 1171) framstod som Islams nya försvarsmakt.",
      en: "Arslan Shah, son of Toghrul II, reigned 1161–1174 and struggled to maintain Seljuk relevance in a Mesopotamia dominated by increasingly powerful atabegs. His reign is historically documented but not dramatic — he managed to maintain the empire's form without being able to recover its substance. Under his reign the Crusader kingdoms continued consolidating in the Levant and the Zangids under Saladin (after 1171) emerged as Islam's new defence power.",
      tr: "Tuğrul II'nin oğlu Arslan Şah, 1161–1174'te hüküm sürdü ve giderek güçlenen atabeglerin hakim olduğu bir Mezopotamya'da Selçuklu ilgisini sürdürmeye çalıştı.",
    },
    reforms: { sv: ["Upprätthållandet av formal Seljukisk suveränitet i Irak"], en: ["Maintenance of formal Seljuk sovereignty in Iraq"], tr: ["Irak'ta biçimsel Selçuklu egemenliğinin sürdürülmesi"] },
    campaigns: {
      sv: ["Defensiva operationer mot atabegarnas autonomisträvanden", "Konflikter med Zangiderna"],
      en: ["Defensive operations against the atabegs' autonomy aspirations", "Conflicts with the Zangids"],
      tr: ["Atabeglerin özerklik hedeflerine karşı savunma operasyonları", "Zengilerle çatışmalar"],
    },
    leadershipStyle: {
      sv: "Arslan Shah regerade med dignitet i ett imperium på väg mot upplösning — hans viktigaste bidrag var att upprätthålla dynstisk kontinuitet.",
      en: "Arslan Shah ruled with dignity in an empire heading toward dissolution — his most important contribution was maintaining dynastic continuity.",
      tr: "Arslan Şah, çözülmeye giden bir imparatorlukta onurla hüküm sürdü — en önemli katkısı hanedanlık sürekliliğini korumaktı.",
    },
    criticalPerspectives: {
      sv: "Arslan Shahs styre kan inte kritiseras för aktivt misslyckande — han ärvde ett imperium i terminalfas och hanterade situationen med kompetens om inte med briljans.",
      en: "Arslan Shah's reign cannot be criticised for active failure — he inherited an empire in terminal phase and handled the situation with competence if not brilliance.",
      tr: "Arslan Şah'ın saltanatı aktif başarısızlık için eleştirilemez — son aşamada bir imparatorluğu miras aldı ve durumu parlaklıkla olmasa da yetkinlikle yönetti.",
    },
  },
  {
    id: "toghrul-iii",
    name: "Toghrul III",
    years: "ca. 1155–1194",
    title: { sv: "Den siste Seljuk-sultanen av Irak", en: "The Last Seljuk Sultan of Iraq", tr: "Irak'ın Son Selçuk Sultanı" },
    portrait: "🌇",
    bio: {
      sv: "Toghrul III, son till Arslan Shah och barnbarn till Toghrul II, är det sista stora namnet i det centrala Seljukimperiets historia. Han regerade 1174–1194 och är den siste sultanen att försöka upprätthålla Seljukisk militär och politisk kraft i Irak och Persien. I sin ungdom var han faktiskt en aktiv och modig militär ledare som bekämpade de Khwarazmiska styrkorna och kämpade för att återvinna Seljukisk mark. Men han mötte en överväldigande fiende: Khwarazm-shahen Tekish vars militär och resurser var vida överlägsna det utmattade Seljukimperiet. 1194 dödades Toghrul III i strid med Tekish vid Rayy — hans fall markerar det officiella slutet på det Stora Seljukimperiet.",
      en: "Toghrul III, son of Arslan Shah and grandson of Toghrul II, is the last great name in the central Seljuk Empire's history. He reigned 1174–1194 and is the last sultan to attempt maintaining Seljuk military and political force in Iraq and Persia. In his youth he was actually an active and courageous military leader who combated Khwarazmian forces and struggled to reclaim Seljuk land. But he faced an overwhelming enemy: Khwarazm-shah Tekish whose military and resources vastly exceeded the exhausted Seljuk Empire. In 1194 Toghrul III was killed in battle against Tekish at Rayy — his fall marks the official end of the Great Seljuk Empire.",
      tr: "Arslan Şah'ın oğlu ve Tuğrul II'nin torunu Tuğrul III, merkezi Selçuk İmparatorluğu tarihinin son büyük adıdır. 1174–1194 arasında hüküm sürdü ve 1194'te Rayy'da Harizm Şahı Tekiş'e karşı savaşta öldürüldü — ölümü Büyük Selçuk İmparatorluğu'nun resmi sonunu işaret eder.",
    },
    reforms: {
      sv: ["Försök att militärt återvinna Seljukisk position mot Khwarazmianerna"],
      en: ["Attempts to militarily reclaim Seljuk position against the Khwarazmians"],
      tr: ["Harizmşahlara karşı Selçuklu konumunu askeri olarak geri kazanma girişimleri"],
    },
    campaigns: {
      sv: ["Krigen mot Khwarazm-shahen Tekish (1180s-1194)", "Defensiva kampanjer mot Khwarazmisk expansion", "Sista striden vid Rayy (1194) — Toghrul III faller i strid"],
      en: ["Wars against Khwarazm-shah Tekish (1180s–1194)", "Defensive campaigns against Khwarazmian expansion", "Final battle at Rayy (1194) — Toghrul III falls in battle"],
      tr: ["Harizm Şahı Tekiş'e karşı savaşlar (1180'ler–1194)", "Harizmşah genişlemesine karşı savunma seferleri", "Rayy'daki son savaş (1194) — Tuğrul III savaşta düşer"],
    },
    leadershipStyle: {
      sv: "Toghrul III var en aktiv och personligen modig sultan — inte en passiv symbol utan en aktiv deltagare i strid. Hans tragedi var att han kämpade mot strukturellt övermäktiga odds. Han dog som en riktig sultan: i strid, med sina soldater, med svärd i hand.",
      en: "Toghrul III was an active and personally courageous sultan — not a passive symbol but an active participant in battle. His tragedy was that he fought against structurally overwhelming odds. He died as a real sultan: in battle, with his soldiers, sword in hand.",
      tr: "Tuğrul III, aktif ve kişisel olarak cesur bir sultandı — pasif bir sembol değil, savaşa aktif katılımcı. Trajedisi yapısal olarak ezici olasılıklara karşı savaşmasıydı. Gerçek bir sultan gibi öldü: savaşta, askerleriyle, elinde kılıcıyla.",
    },
    criticalPerspectives: {
      sv: "Toghrul III hade lite att erbjuda sina undersåtar mot slutet — Seljukimperiet var ekonomiskt utmattat, militärt försvagat och politiskt fragmenterat. Hans personliga tapperhet ändrade inte den historiska dynamiken. Frågan är om ett annorlunda ledarskap ett halvsekel tidigare hade kunnat rädda imperiet.",
      en: "Toghrul III had little to offer his subjects at the end — the Seljuk Empire was economically exhausted, militarily weakened and politically fragmented. His personal bravery did not change the historical dynamics. The question is whether different leadership half a century earlier could have saved the empire.",
      tr: "Tuğrul III'ün sonunda tebaasına sunacak çok şeyi yoktu — Selçuk İmparatorluğu ekonomik olarak tükenmiş, askeri açıdan zayıflamış ve siyasi olarak parçalanmıştı. Kişisel cesareti tarihsel dinamikleri değiştirmedi.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const seljukTerritories: TerritoryPeriod[] = [
  {
    yearStart: 1037,
    yearEnd: 1055,
    label: { sv: "Seljukerna — Tidig expansion i Khurasan", en: "Seljuks — Early Expansion in Khurasan", tr: "Selçuklar — Horasan'da Erken Genişleme" },
    color: "#8B4513",
    polygon: [[
      [38.0, 55.0], [37.0, 60.0], [36.0, 65.0], [35.0, 68.0],
      [36.0, 70.0], [37.0, 72.0], [38.0, 70.0], [40.0, 68.0],
      [41.0, 65.0], [40.0, 60.0], [39.0, 56.0], [38.0, 55.0],
    ]],
  },
  {
    yearStart: 1055,
    yearEnd: 1092,
    label: { sv: "Seljukernas guldålder — Imperiet på toppen", en: "Seljuk Golden Age — Empire at its Peak", tr: "Selçukların Altın Çağı — İmparatorluk Zirvede" },
    color: "#CD853F",
    polygon: [[
      [42.0, 27.0], [40.0, 30.0], [38.0, 35.0], [36.0, 38.0],
      [33.0, 40.0], [30.0, 42.0], [27.0, 44.0], [24.0, 46.0],
      [22.0, 50.0], [22.0, 55.0], [24.0, 58.0], [26.0, 62.0],
      [28.0, 65.0], [30.0, 68.0], [32.0, 70.0], [35.0, 72.0],
      [37.0, 73.0], [40.0, 72.0], [43.0, 70.0], [45.0, 68.0],
      [46.0, 65.0], [45.0, 60.0], [44.0, 55.0], [44.0, 50.0],
      [43.0, 45.0], [42.0, 40.0], [43.0, 35.0], [43.0, 30.0],
      [42.0, 27.0],
    ]],
  },
  {
    yearStart: 1092,
    yearEnd: 1157,
    label: { sv: "Seljukerna — Fragmenteringens era", en: "Seljuks — Era of Fragmentation", tr: "Selçuklar — Parçalanma Dönemi" },
    color: "#8B4513",
    polygon: [[
      [38.0, 38.0], [36.0, 40.0], [33.0, 42.0], [30.0, 44.0],
      [28.0, 47.0], [26.0, 52.0], [27.0, 58.0], [30.0, 63.0],
      [33.0, 67.0], [36.0, 70.0], [39.0, 70.0], [42.0, 67.0],
      [43.0, 63.0], [42.0, 58.0], [41.0, 53.0], [40.0, 48.0],
      [40.0, 43.0], [39.0, 40.0], [38.0, 38.0],
    ]],
  },
  {
    yearStart: 1157,
    yearEnd: 1194,
    label: { sv: "Seljukernas kärna i Irak — Sista resterna", en: "Seljuk Core in Iraq — Final Remnants", tr: "Irak'taki Selçuklu Çekirdeği — Son Kalıntılar" },
    color: "#6B3410",
    polygon: [[
      [37.0, 42.0], [35.0, 44.0], [33.0, 46.0], [31.0, 48.0],
      [30.0, 50.0], [31.0, 52.0], [33.0, 52.0], [35.0, 50.0],
      [37.0, 48.0], [38.0, 45.0], [37.0, 42.0],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const seljukTradeRoutes: TradeRouteGeo[] = [
  {
    id: "silk-road-west",
    name: { sv: "Sidenvägen — Seljukernas hjärtpulsåder", en: "Silk Road — The Seljuks' Heartbeat", tr: "İpek Yolu — Selçukların Kalp Atışı" },
    yearActive: 1060,
    path: [
      [39.9, 116.4], [40.0, 100.0], [40.0, 80.0],
      [39.0, 67.0], [37.0, 58.0], [36.0, 50.0],
      [33.0, 44.0], [36.0, 36.0], [37.0, 27.0],
      [41.0, 29.0],
    ],
  },
  {
    id: "persian-road",
    name: { sv: "Persiska rikets väg — Isfahan till Bagdad", en: "Persian Road — Isfahan to Baghdad", tr: "İran Yolu — İsfahan'dan Bağdat'a" },
    yearActive: 1055,
    path: [
      [32.5, 51.5], [34.0, 50.0], [34.5, 48.0],
      [33.5, 46.5], [33.3, 44.4],
    ],
  },
  {
    id: "anatolia-road",
    name: { sv: "Anatoliens väg — Seljukernas nya land", en: "Anatolian Road — The Seljuks' New Land", tr: "Anadolu Yolu — Selçukların Yeni Toprakları" },
    yearActive: 1071,
    path: [
      [41.0, 29.0], [39.0, 32.0], [38.0, 35.0],
      [37.0, 38.0], [36.5, 43.0], [36.0, 44.0],
      [33.3, 44.4],
    ],
  },
  {
    id: "hajj-route",
    name: { sv: "Pilgrimsvägen — Mekka via Bagdad", en: "Pilgrimage Route — Mecca via Baghdad", tr: "Hac Yolu — Bağdat Üzerinden Mekke" },
    yearActive: 1060,
    path: [
      [33.3, 44.4], [31.0, 47.0], [28.0, 48.0],
      [26.0, 50.0], [24.5, 46.7], [21.4, 39.8],
    ],
  },
];

import type { Story, HistoricalProfile } from "./types";

// =============================================================================
// SELJUK STORIES — Cinematic narrative episodes from the empire's history
// =============================================================================

export const seljukStories: Story[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 1
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

Bagdad. Civilisationens mittpunkt. Den stad vars bibliotek innehöll mer kunskap än alla stäpper Tughril Beg ridit igenom. Den stad som araberna kallade Madinat al-Salam — Fredens stad. Den stad som Harun al-Rashid hade gjort till medeltidsvärldens mest lysande metropol.

Tughril Beg visste vad hans män inte förstod: att erövra en stad med svärd var en sak. Att förtjäna rätten att stanna var en annan.

Han hade studerat hur det gick för vandalerna i Rom. Han visste hur Hulagu Khan hundra år senare skulle förstöra Bagdad så totalt att Tigrisfloden skulle rinna svart av bläck från de böcker som kastats i den. Han ville inte vara den mannen.

Tughril Beg hade skickat budbärare till kalif Al-Qa'im. Inte med ultimatum. Med ett löfte: "Jag kommer inte som erövrare. Jag kommer som din arm och ditt svärd. Du är islams röst. Jag är islams sköldbärare."

Nu i natten undrar han om Gud tror honom.`,
          en: `It is December 1055 and Tughril Beg — sultan of Khurasan, Persia and now half a stone's throw from Baghdad — sits alone in his tent. Campfires shimmer against the black Iraqi sky. Around him sleep tens of thousands of nomadic warriors, men whose fathers never knew cities, whose children were born on horseback, whose only home was the horizon.

Tomorrow he rides into Baghdad.

Baghdad. The centre of civilisation. The city whose libraries contained more knowledge than all the steppes Tughril Beg had ridden through. The city the Arabs called Madinat al-Salam — City of Peace. The city Harun al-Rashid had made the medieval world's most luminous metropolis.

Tughril Beg knew what his men did not understand: that to conquer a city with a sword was one thing. To earn the right to stay was another.

He had studied what happened to the Vandals in Rome. He knew how Hulagu Khan a hundred years later would destroy Baghdad so completely that the Tigris would run black with ink from the books thrown into it. He did not want to be that man.

Tughril Beg had sent messengers to Caliph Al-Qa'im. Not with ultimatums. With a promise: "I come not as conqueror. I come as your arm and your sword. You are Islam's voice. I am Islam's shield-bearer."

Now in the night he wonders if God believes him.`,
          tr: `Aralık 1055'ti ve Tuğrul Bey — Horasan, İran ve şimdi Bağdat'a yarım taş mesafesinin sultanı — çadırında yalnız oturuyordu. Kamp ateşleri siyah Irak gökyüzüne karşı ışıldıyordu. Etrafında onbinlerce göçebe savaşçı uyuyordu; babaları şehirleri tanımamış, çocukları at sırtında doğmuş, tek evleri ufuk olan adamlar.

Yarın Bağdat'a girecekti.

Bağdat. Medeniyetin merkezi. Kütüphanelerinde Tuğrul Bey'in at sürdüğü tüm bozkırlardan daha fazla bilgi barındıran şehir. Arapların Medinetü's-Selam — Barış Şehri — dediği yer. Harun er-Reşid'in ortaçağ dünyasının en parlak metropolü yaptığı şehir.

Tuğrul Bey, adamlarının anlamadığı şeyi biliyordu: kılıçla bir şehri fethetmek bir şeydi. Kalma hakkını kazanmak başka bir şeydi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Mötet med kalifen", en: "The Meeting with the Caliph", tr: "Halife ile Buluşma" },
        figure: "Caliph Al-Qa'im",
        content: {
          sv: `Nästa dag — den 18 december 1055 — sker ett av medeltidens mest teatraliska statsmannamöten.

Tughril Beg rider in i Bagdad inte med krigsskriken av en erövrare utan med den högtidliga tystnaden av en pilgrim. Hans armé marscherar disciplinerat. Hans ryttare bär sina vapen men riktar dem inte. Bagdadernas invånare — som väntat sig plundring — stirrar från husens tak i förundran.

Kalif Al-Qa'im tar emot Tughril i tronsalen. Den abbasidiske kallfen är en gammal man vars familj suttit på Guds ställföreträdares tron i tre sekler — men som de senaste decennierna utövat ingen verklig makt. Buyidernas shia-dynastier hade gjort honom till en marionett. Han hade inte haft en armé på en generation.

Nu sitter framför honom en turkisk nomadisk krigarfurste från stäpperna vid Aralsjön — och erbjuder skydd.

Tughril Beg faller på knä inför kalifen. Inte som en undersåte utan som en riddare som lägger sin tjänst till förfogande. Al-Qa'im, med tårar i sina gamla ögon, proklamenerar: "Jag ger dig titeln Sultan — Kung av Öst och Väst. Du är islams svärd."

I det ögonblicket föds en politisk teologi som ska definiera sunniislam i 200 år: sultanen skyddar. Kalifen helgar. Svärd och ord — i symbios.

Tughril Beg gråter inte. Men hans händer darrar en aning när han tar emot hedersdräkten.`,
          en: `The next day — 18 December 1055 — one of the medieval world's most theatrical statesman meetings occurs.

Tughril Beg rides into Baghdad not with the war cries of a conqueror but with the solemn silence of a pilgrim. His army marches with discipline. His riders carry their weapons but do not raise them. Baghdad's inhabitants — who had expected plundering — stare from rooftops in amazement.

Caliph Al-Qa'im receives Tughril in the throne room. The Abbasid caliph is an old man whose family has sat on God's vicegerent's throne for three centuries — but who for recent decades has wielded no real power. The Buyid Shia dynasties had made him a puppet. He had had no army for a generation.

Now before him sits a Turkish nomadic warrior-prince from the steppes near the Aral Sea — offering protection.

Tughril Beg kneels before the caliph. Not as a subject but as a knight offering his service. Al-Qa'im, with tears in his old eyes, proclaims: "I grant you the title Sultan — King of East and West. You are Islam's sword."

In that moment a political theology is born that will define Sunni Islam for 200 years: the sultan protects. The caliph sanctifies. Sword and word — in symbiosis.

Tughril Beg does not weep. But his hands tremble slightly as he receives the robe of honour.`,
          tr: `Ertesi gün — 18 Aralık 1055 — ortaçağın en teatral devlet adamı toplantılarından biri yaşandı.

Tuğrul Bey, Bağdat'a bir fatihin savaş çığlıklarıyla değil, bir hacının saygın sessizliğiyle girdi. Ordusu disiplinle yürüdü. Süvarileri silahlarını taşıdı ama kaldırmadı. Yağma bekleyen Bağdat halkı, çatılardan şaşkınlıkla baktı.

Halife El-Kaim, Tuğrul'u taht odasında kabul etti. Abbasi halifesi, ailesi üç yüzyıldır Allah'ın halifesinin tahtında oturan ama son on yıllarda hiç gerçek güç kullanamamış yaşlı bir adamdı. Büveyhi Şii hanedanları onu kukla yapmıştı.

Şimdi önünde Aral Gölü kıyısındaki bozkırlardan gelen Türk göçebe bir savaşçı prens oturuyordu — ve koruma öneriyordu.

Tuğrul Bey halifenin önünde diz çöktü. Bir teba olarak değil, hizmetini sunan bir şövalye olarak. El-Kaim, yaşlı gözlerinde yaşlarla ilan etti: "Sana Sultan unvanını veriyorum — Doğunun ve Batının Kralı. Sen İslam'ın kılıcısın."`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Vad stäppen lärt honom", en: "What the Steppe Had Taught Him", tr: "Bozkırın Ona Öğrettikleri" },
        figure: "Tughril Beg",
        content: {
          sv: `Den kvällen, tillbaka i sin tält — nu placerat innanför Bagdads murar — reflekterade Tughril Beg över sin morfars ord. Seljuk ibn Duqaq, stammens ursprunglige ledare, hade sagt till sina barn: "Vi är inte nomader. Vi är ett folk som ännu inte hittat sin stad."

I 70 år hade familjen sökt den staden. Från Aralsjöns stränder till Transoxiana. Från Transoxiana till Khurasan. Från Khurasan till Persien. Nu: Bagdad.

Men Tughril förstod något djupare som skulle undgå många av hans efterföljare: att Bagdad inte kunde erövras. Det kunde bara adopteras. Och den som adopterade Bagdad — dess lärde, dess kalifer, dess handelsmän, dess poeter — adopterades i sin tur av Bagdad.

Seljukerna kom som nomader. De skulle lämna som islams förvaltare.

Under de kommande 40 åren skulle imperiet de byggde sträcka sig från Kina till Medelhavet. Men grunden lades denna decembernatt 1055 i Bagdad, där en gammal kalif gräten och en turkisk krigarfurste lärde sig att makt inte alltid är vad ett svärd kan nå — utan vad ett ord kan helga.`,
          en: `That evening, back in his tent — now placed inside Baghdad's walls — Tughril Beg reflected on his grandfather's words. Seljuk ibn Duqaq, the tribe's original leader, had told his children: "We are not nomads. We are a people who have not yet found their city."

For 70 years the family had sought that city. From the shores of the Aral Sea to Transoxiana. From Transoxiana to Khurasan. From Khurasan to Persia. Now: Baghdad.

But Tughril understood something deeper that would escape many of his successors: that Baghdad could not be conquered. It could only be adopted. And whoever adopted Baghdad — its scholars, its caliphs, its merchants, its poets — was in turn adopted by Baghdad.

The Seljuks came as nomads. They would leave as Islam's stewards.

Over the coming 40 years the empire they built would stretch from China to the Mediterranean. But the foundation was laid this December night in 1055 in Baghdad, where an old caliph wept and a Turkish warrior-prince learned that power is not always what a sword can reach — but what a word can sanctify.`,
          tr: `O akşam, çadırına döndüğünde — artık Bağdat'ın surlarının içine yerleştirilmiş — Tuğrul Bey dedesinin sözlerini düşündü. Aşiretin orijinal lideri Selçuk ibn Duqaq, çocuklarına şöyle demişti: "Biz göçebe değiliz. Henüz şehrini bulmamış bir halkız."

70 yıl boyunca aile o şehri aradı. Aral Gölü kıyılarından Maveraünnehir'e. Maveraünnehir'den Horasan'a. Horasan'dan İran'a. Şimdi: Bağdat.

Ama Tuğrul, ardıllarının çoğunun kaçıracağı daha derin bir şeyi anlıyordu: Bağdat fethedilemezdi. Yalnızca benimsenegelirdi. Bağdat'ı — alimlerini, halifelerini, tüccarlarını, şairlerini — benimseyenler, Bağdat tarafından benimsenirdi.

Selçuklar göçebe olarak geldi. İslam'ın kayyumları olarak gideceklerdi.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 2
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
      sv: "26 augusti 1071. Manzikert. Romanos IV Diogenes möter sin erövrare.",
      en: "26 August 1071. Manzikert. Romanos IV Diogenes meets his conqueror.",
      tr: "26 Ağustos 1071. Malazgirt. Romen Diyojen fatihi ile karşılaşıyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Morgonen det bysantinska riket slutade", en: "The Morning the Byzantine Empire Ended", tr: "Bizans İmparatorluğu'nun Sona Erdiği Sabah" },
        figure: "Emperor Romanos IV Diogenes",
        content: {
          sv: `Romanos IV Diogenes hade legat vaken hela natten och lyssnat på sina trupper. 100 000 man. Kanske 200 000. Siffror som aldrig förlorat krig. Siffror som fick berget Suphan skuggas av stoft när de marscherade.

Han var en erfaren militär. Han hade slagit tillbaka Pechenegerna, besegrat bulgarerna, vunnit duells mot armeniska hövdingar. Han var inte oerfaren. Han var inte feg.

Men det var något med turkarna han inte förstod.

De var överallt och ingenstans. Under de senaste veckorna hade hans spanare rapporterat: "De är norr om oss." "De är söder om oss." "De är öst om oss." Och sedan: "Vi ser ingenting."

Just det — ingenting — var det skrämmande.

När solen gick upp den 26 augusti tog han ett beslut som skulle kosta honom tronen, friheten och kanske livet: han skulle anfalla.`,
          en: `Romanos IV Diogenes had lain awake all night listening to his troops. 100,000 men. Perhaps 200,000. Numbers that had never lost wars. Numbers that made Mount Suphan shadowed by dust when they marched.

He was an experienced military commander. He had repelled the Pechenegs, defeated the Bulgarians, won duels against Armenian chieftains. He was not inexperienced. He was not cowardly.

But there was something about the Turks he did not understand.

They were everywhere and nowhere. During the past weeks his scouts had reported: "They are north of us." "They are south of us." "They are east of us." And then: "We see nothing."

That — nothing — was what was frightening.

When the sun rose on 26 August he made a decision that would cost him his throne, his freedom and perhaps his life: he would attack.`,
          tr: `Romen Diyojen tüm gece uyanık yatmış, askerlerini dinlemişti. 100.000 kişi. Belki 200.000. Hiç savaş kaybetmemiş sayılar. Yürürken Süphan Dağı'nı gölgede bırakan sayılar.

Deneyimli bir askeri komutandı. Peçenekleri geri püskürtmüş, Bulgarları yenmiş, Ermeni şeflerine karşı düellolar kazanmıştı. Deneyimsiz değildi. Korkak değildi.

Ama Türkler hakkında anlamadığı bir şey vardı.

Her yerde ve hiçbir yerde idiler. Son haftalarda casusları şunları bildirmişti: "Kuzeyimizdeler." "Güneyimizdeler." "Doğumuzdallar." Ve sonra: "Hiçbir şey görmüyoruz."

İşte bu — hiçbir şey — korkunç olan şeydi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Slaget — Nomadkrigskonstens mästerverk", en: "The Battle — The Masterpiece of Nomadic Warfare", tr: "Savaş — Göçebe Savaş Sanatının Şaheseri" },
        figure: "Alp Arslan",
        content: {
          sv: `Alp Arslan hade 15 000 man. Mot 100 000 eller fler.

Varje konventionell militärstrateg i medeltidens värld skulle ha sagt: omöjligt. Men Alp Arslan var inte en konventionell militärstrateg. Han var det klassiska turkiska nomadkrigets mästerare — en konst så gammal som stäpperna, så förfinad som generation efter generation av survival kunde göra den.

Planen var enkel och diabolisk.

Seljukernas kavalleri visar sig i norr, lockar Romanos att anfalla, och reträtterar sedan. Romanos leder sin massiva armé framåt — djupare, djupare in i det torra anatoliska terränget. Försörjningslinjerna sträcks. Trupperna törs. Och sedan:

Retreatten var falsk.

Seljukernas kavalleri slog om, svängde som en halvmåne runt den bysantinska arméns flanker, och bombar dem med pilar från alla riktningar. Det bysantinska tunga kavalleriet — fantastiskt i direkta anfall — är hjälplöst mot rörliga nomadiska ryttare som slår till och försvinner, slår till och försvinner.

På kvällen av den 26 augusti var den bysantinska arméns formation bruten. Och i kaoset av ett retreaterande imperium tillfångatogs kejsaren av Romarnas kejsar personligen.`,
          en: `Alp Arslan had 15,000 men. Against 100,000 or more.

Every conventional military strategist in the medieval world would have said: impossible. But Alp Arslan was not a conventional military strategist. He was the master of classic Turkish nomadic warfare — an art as old as the steppes, as refined as generation after generation of survival could make it.

The plan was simple and diabolical.

The Seljuk cavalry appears in the north, lures Romanos to attack, then retreats. Romanos leads his massive army forward — deeper, deeper into the dry Anatolian terrain. Supply lines stretch. Troops tire. And then:

The retreat was false.

The Seljuk cavalry turned, swung like a crescent around the Byzantine army's flanks, and bombarded them with arrows from all directions. The Byzantine heavy cavalry — magnificent in direct charges — is helpless against mobile nomadic riders who strike and vanish, strike and vanish.

By the evening of 26 August the Byzantine army's formation was broken. And in the chaos of a retreating empire, the Emperor of the Romans was captured personally.`,
          tr: `Alparslan'ın 15.000 adamı vardı. 100.000 veya daha fazlasına karşı.

Ortaçağ dünyasındaki her konvansiyonel askeri stratejist şunu söylerdi: imkânsız. Ama Alparslan konvansiyonel bir askeri stratejist değildi. Klasik Türk göçebe savaşının ustasıydı — bozkırlar kadar eski, hayatta kalmanın nesil nesil mükemmelleştirebildiği kadar rafine bir sanat.

Plan basit ve şeytaniydi.

Selçuklu süvarileri kuzeyde görünür, Romen'i saldırmaya çeker, sonra geri çekilir. Romen dev ordusunu ileri sürer — daha derine, daha derine kuru Anadolu arazisine. İkmal hatları gerilir. Askerler yorulur. Ve sonra:

Geri çekilme yalancıydı.`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Mötet ansikte mot ansikte", en: "The Face-to-Face Meeting", tr: "Yüz Yüze Karşılaşma" },
        figure: "Alp Arslan",
        content: {
          sv: `Romanos IV Diogenes, kejsare av Byzantium, kejsare av Romarnas rike, Guds ställföreträdare på Konstantinopels gyllene tron — fördes in i Alp Arslans tält i bojor.

Det som hände härnäst är ett av medeltidens mest omtalade diplomatiska ögonblick.

Alp Arslan reste sig. Han var en liten man — kompakt, muskulös, med det långa mustascherna som var hans stolthet. Han sade på persiska, via tolk: "Vad skulle du ha gjort med mig om jag hade blivit din fånge?"

Romanos, fortfarande kejserlig trots kedjorna, svarade: "Jag hade dödat dig, eller dragit dig i triumfprocess genom Konstantinopels gator."

Alp Arslan log — ett leende som vittnen skulle minnas i decennier. "Mitt öde är nådigare än ditt. Jag väljer varken döden eller triumfen." Han clapped ihop händerna. Tjänare kom med mat, vin och medicin för kejsarens sår.

Romanos var sin erövrares gäst.

Ransom fastslogs — en miljon guldmynt, plus ett fredsavtal och armeniska och syriska städer. Sedan, i ett diplomatiskt mästerdrag utan motstycke, lät Alp Arslan Romanos resa hem fritt. Inte skamliggjord. Inte kedjad. Som en man.

Romanos kom tillbaka till Konstantinopel och avsattes av sina egna hovjunkrar. Det bysantinska imperiet imploderade i konflikter om vem som förlorat riket. Alp Arslan behövde aldrig erövra Konstantinopel. Han lät kejsarstyret göra det åt honom.`,
          en: `Romanos IV Diogenes, Emperor of Byzantium, Emperor of the Romans, God's vicegerent on Constantinople's golden throne — was brought into Alp Arslan's tent in chains.

What happened next is one of the medieval world's most talked-about diplomatic moments.

Alp Arslan rose. He was a small man — compact, muscular, with the long moustaches that were his pride. He said in Persian, through a translator: "What would you have done with me if I had become your prisoner?"

Romanos, still imperial despite the chains, replied: "I would have killed you, or dragged you in a triumph through Constantinople's streets."

Alp Arslan smiled — a smile witnesses would remember for decades. "My fate is more merciful than yours. I choose neither death nor triumph." He clapped his hands. Servants came with food, wine and medicine for the emperor's wounds.

Romanos was his conqueror's guest.

Ransom was agreed — one million gold coins, plus a peace treaty and Armenian and Syrian cities. Then, in a diplomatic masterstroke without precedent, Alp Arslan let Romanos travel home freely. Not humiliated. Not in chains. As a man.

Romanos returned to Constantinople and was deposed by his own courtiers. The Byzantine Empire imploded in conflicts over who had lost the realm. Alp Arslan never needed to conquer Constantinople. He let the imperial court do it for him.`,
          tr: `Romen IV Diyojen, Bizans İmparatoru, Romalıların İmparatoru, Konstantinopol'ün altın tahtında Allah'ın halifesi — Alparslan'ın çadırına zincirlenmiş getirildi.

Bundan sonra yaşananlar, ortaçağın en çok konuşulan diplomatik anlarından biridir.

Alparslan ayağa kalktı. Küçük bir adamdı — derli toplu, kaslı, gururu olan uzun bıyıklarıyla. Tercüman aracılığıyla Farsça şöyle dedi: "Esirin olsaydım sen ne yapardın?"

Romen, zincirlerine rağmen hâlâ imparatorluk onuruyla yanıtladı: "Seni öldürürdüm, ya da Konstantinopol sokaklarında zafer alayıyla çekerirdim."

Alparslan gülümsedi — tanıkların on yıllarca hatırlayacağı bir gülümseme. "Benim kaderim seninkinden daha merhametli. Ben ne ölümü ne de zaferi seçiyorum." Ellerini çırptı. Hizmetkarlar imparatorun yaralarına yiyecek, şarap ve ilaç getirdi.

Romen, fatihin misafiriydi.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 3
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
          sv: `Abu Ali al-Hasan ibn Ali ibn Ishaq al-Tusi — känd för historien som Nizam al-Mulk, Statens Ordning — var 70 år gammal och tröttare än han någonsin tillåtit sig att vara.

Han hade tjänat tre sultaner. Han hade byggt ett imperium. Han hade grundat universiteten som bar hans namn — Nizamiyya — där al-Ghazali lärde teologi, där tusentals ämbetsmän lärde sig att läsa, skriva och styra. Han hade skrivit Siyasatnama, bokens bok om hur ett imperium ska styras, ett mästerverk som filosofer och statsmän skulle citera i 900 år.

Men nu, hösten 1092, kände Nizam al-Mulk att allt var annorlunda. Sultan Malik Shah var annorlunda. Sultanens hustru Terken Khatun — ambitiös, listig, hänsynslös — hade övertygat Malik Shah om att viziren var för mäktig. Att viziren var ett hot.

"De vill ha min Siyasatnama utan mig," tänkte Nizam al-Mulk. "De vill ha imperiet utan dess arkitekt."

Det han inte visste var att hatet kom från ett helt annat håll.`,
          en: `Abu Ali al-Hasan ibn Ali ibn Ishaq al-Tusi — known to history as Nizam al-Mulk, the Order of the State — was 70 years old and more tired than he had ever allowed himself to be.

He had served three sultans. He had built an empire. He had founded the universities that bore his name — Nizamiyya — where al-Ghazali taught theology, where thousands of officials learned to read, write and govern. He had written the Siyasatnama, the book of books on how an empire should be ruled, a masterpiece that philosophers and statesmen would cite for 900 years.

But now, in autumn 1092, Nizam al-Mulk felt that everything was different. Sultan Malik Shah was different. The sultan's wife Terken Khatun — ambitious, cunning, ruthless — had convinced Malik Shah that the vizier was too powerful. That the vizier was a threat.

"They want my Siyasatnama without me," thought Nizam al-Mulk. "They want the empire without its architect."

What he did not know was that the hatred came from an entirely different direction.`,
          tr: `Ebu Ali el-Hasan ibn Ali ibn İshak et-Tusi — tarihe Nizamülmülk, Devletin Nizamı, olarak geçen — 70 yaşındaydı ve kendine asla izin vermediği kadar yorgundu.

Üç sultana hizmet etmişti. Bir imparatorluk inşa etmişti. Kendi adını taşıyan üniversiteleri — Nizamiye — kurmuştu; el-Gazzali'nin ilahiyat öğrettiği, binlerce memurların okumayı, yazmayı ve yönetmeyi öğrendiği yerler. Bir imparatorluğun nasıl yönetilmesi gerektiğine dair kitapların kitabı Siyasetname'yi yazmıştı; filozofların ve devlet adamlarının 900 yıl alıntı yapacağı bir başyapıt.

Ama şimdi, 1092 sonbaharında, Nizamülmülk her şeyin farklı olduğunu hissediyordu. Sultan Melikşah farklıydı. Sultanın karısı Terken Hatun — hırslı, kurnaz, acımasız — Melikşah'ı vezirlerin çok güçlü olduğuna, tehdit oluşturduğuna ikna etmişti.

"Siyasetname'yi bensiz istiyorlar," diye düşündü Nizamülmülk. "İmparatorluğu mimarı olmadan istiyorlar."

Bilmediği şey, nefretin tamamen farklı bir yönden geldiğiydi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Hasan-i-Sabbah och Mästaren av berget", en: "Hasan-i-Sabbah and the Master of the Mountain", tr: "Hasan Sabbah ve Dağın Efendisi" },
        figure: "Hasan-i-Sabbah",
        content: {
          sv: `Hasan-i-Sabbah var Nizam al-Mulks ungdomsvän och livslånge fiende.

De hade gått i skola tillsammans. De hade läst samma böcker. Och sedan hade deras vägar divergerat på det mest dramatiska sättet: Nizam al-Mulk hade blivit Seljukimperiets vizir, arkitekten av sunniislamisk ortodox makt. Hasan-i-Sabbah hade blivit den store mästaren av Alamut — klippborgen högt i Elburz-bergen — ledaren av de Nizari Ismailis, en shia-sekt som ansåg Seljukernas sunniortodoxi vara apostasi.

Hasan-i-Sabbah var inte en man av svärd och arméer. Han var en man av idéer — och av en strategi som skakade om politiken för sekler: riktad, kirurgisk politiskt mord utfört av fanatiskt lojala agenter som var villiga att dö för att nå sitt mål.

Han kallade dem Fedayeen. Europa skulle kalla dem Assassiner. Och de hade nu ett uppdrag: Nizam al-Mulk måste dö.`,
          en: `Hasan-i-Sabbah was Nizam al-Mulk's childhood friend and lifelong enemy.

They had gone to school together. They had read the same books. And then their paths had diverged in the most dramatic way: Nizam al-Mulk had become the Seljuk Empire's vizier, the architect of Sunni Islamic orthodox power. Hasan-i-Sabbah had become the Grand Master of Alamut — the cliff fortress high in the Elburz mountains — leader of the Nizari Ismailis, a Shia sect that considered the Seljuks' Sunni orthodoxy to be apostasy.

Hasan-i-Sabbah was not a man of swords and armies. He was a man of ideas — and of a strategy that would shake politics for centuries: targeted, surgical political murder carried out by fanatically loyal agents willing to die to reach their target.

He called them Fedayeen. Europe would call them Assassins. And they now had a mission: Nizam al-Mulk must die.`,
          tr: `Hasan Sabbah, Nizamülmülk'ün çocukluk arkadaşı ve ömür boyu düşmanıydı.

Aynı okulda okumuşlardı. Aynı kitapları okumuşlardı. Sonra yolları en dramatik biçimde ayrıldı: Nizamülmülk, Selçuk İmparatorluğu'nun veziri, Sünni İslam ortodoks gücünün mimarı oldu. Hasan Sabbah, Elburz dağlarının yükseklerindeki kaya kalesi Alamut'un Büyük Üstadı oldu; Selçukların Sünni ortodoksisini irtidat sayan bir Şii mezhep olan Nizari İsmaililerinin lideri.

Hasan Sabbah kılıç ve ordular adamı değildi. Fikirler adamıydı — ve yüzyıllarca siyaseti sarsacak bir stratejinin: hedefe ulaşmak için ölmeye hazır fanatik sadık ajanlar tarafından gerçekleştirilen hedefli, cerrahi siyasi suikastlerin.

Onlara Fedayin derdi. Avrupa onlara Haşhaşi diyecekti. Ve şimdi bir görevleri vardı: Nizamülmülk ölmeliydi.`,
        },
      },
      {
        id: "ch3",
        title: { sv: "16 oktober 1092", en: "16 October 1092", tr: "16 Ekim 1092" },
        figure: "Nizam al-Mulk",
        content: {
          sv: `Det var en vanlig dag i sultanens kortege. Nizam al-Mulk bars i sin bår — äldre nu, benen värkte, men sinnet fortfarande lika skarpt som det haft i 50 år av statsmannaskap.

En ung man närmade sig. Han var klädd som en Sufi-dervisch — en from muslim som sökte välsignelse från den store viziren. Det var inte ovanligt. Hundratals sådana män sökte audiens med Nizam al-Mulk.

Viziren böjde sig framåt för att ta emot supplikens brev.

Kniven var gömd i brevet.

Nizam al-Mulk dog av sina sår den 16 oktober 1092. Assassinen dödades omedelbart av gardet.

En månad senare dog Sultan Malik Shah — under misstänkta omständigheter, möjligen förgiftad av Terken Khatun eller av obekanta.

På 30 dagar förlorade Seljukimperiet sin svärdsarm och sin administrationshjärna. Det imperium som tagit 70 år att bygga började krackelera omedelbart.

Hasan-i-Sabbah levde i ytterligare 30 år, enslig i sin klippborg, aldrig sett av sina agenter ansikte mot ansikte, men ändå fruktad av sultaner och khalifen. Han dog i sin säng, av naturliga orsaker, vid 90 års ålder.

Nizam al-Mulk är begraven i Isfahan. Varje år kommer pilgrimer till hans grav. Ingen, på tusen år, har kommit till Hasan-i-Sabbahs.`,
          en: `It was an ordinary day in the sultan's cortege. Nizam al-Mulk was carried in his litter — older now, his legs ached, but his mind still as sharp as it had been through 50 years of statesmanship.

A young man approached. He was dressed as a Sufi dervish — a pious Muslim seeking blessing from the great vizier. This was not unusual. Hundreds of such men sought audience with Nizam al-Mulk.

The vizier leaned forward to receive the supplication letter.

The knife was hidden in the letter.

Nizam al-Mulk died of his wounds on 16 October 1092. The assassin was killed immediately by the guards.

One month later Sultan Malik Shah died — under suspicious circumstances, possibly poisoned by Terken Khatun or by unknown parties.

In 30 days the Seljuk Empire lost its sword-arm and its administrative brain. The empire that had taken 70 years to build began fracturing immediately.

Hasan-i-Sabbah lived for another 30 years, solitary in his cliff fortress, never seen by his agents face to face, yet feared by sultans and caliphs. He died in his bed, of natural causes, at the age of 90.

Nizam al-Mulk is buried in Isfahan. Every year pilgrims come to his grave. No one, in a thousand years, has come to Hasan-i-Sabbah's.`,
          tr: `Sultanın kortejinde sıradan bir gündü. Nizamülmülk tahtırevanda taşınıyordu — artık daha yaşlıydı, bacakları ağrıyordu ama aklı 50 yıllık devlet adamlığında olduğu kadar keskin kalmaya devam ediyordu.

Genç bir adam yaklaştı. Sufi dervişi olarak giyinmişti — büyük vezirden bereket isteyen dindar bir Müslüman. Bu alışılmadık bir durum değildi. Yüzlerce bu tür adam Nizamülmülk'ten izin istedi.

Vezir, dilekçe mektubunu almak için öne eğildi.

Bıçak mektubun içinde gizliydi.

Nizamülmülk, 16 Ekim 1092'de yaralarından hayatını kaybetti. Haşhaşi muhafızlar tarafından hemen öldürüldü.

Bir ay sonra Sultan Melikşah — şüpheli koşullar altında, muhtemelen Terken Hatun ya da bilinmeyenler tarafından zehirlenerek — hayatını kaybetti.

30 günde Selçuk İmparatorluğu kılıç kolunu ve idare beynini yitirdi. İnşa edilmesi 70 yıl süren imparatorluk hemen çatlamaya başladı.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 4
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
          sv: `Ghiyath al-Din Abu'l-Fath Umar ibn Ibrahim al-Khayyami al-Nishapuri — Omar Khayyam för oss — var ett av medeltidens mest obekväma geniusar.

I väst är han idag känd nästan uteslutande för sina Rubaiyat — de persiska kvartinaerna om vin, kärlek och den flyktiga livets glädje, som Edward FitzGerald översatte till engelska 1859 och som förvandlade honom till romantikens och dekadenssens patron. "Kom, fyll bägaren och i eldens krets vi sitter / Vad sker med oss när vi är borta — bry oss ej om det."

Men under sin livstid var Omar Khayyam inte berömd för sina dikter. Han var berömd för sin matematik.

Han löste kubiska ekvationer på ett sätt Europa inte skulle göra på 500 år. Hans algebraverk är fortfarande i princip — korrekta.

Och 1079 fick han en uppdrag av Sultan Malik Shah I och vizir Nizam al-Mulk: reformera den islamiska kalendern.`,
          en: `Ghiyath al-Din Abu'l-Fath Umar ibn Ibrahim al-Khayyami al-Nishapuri — Omar Khayyam to us — was one of the medieval world's most uncomfortable geniuses.

In the West he is today known almost exclusively for his Rubaiyat — the Persian quatrains about wine, love and the fleeting joys of life, which Edward FitzGerald translated into English in 1859 and which transformed him into the patron of romanticism and decadence. "Come, fill the Cup, and in the fire of Spring / Your Winter-garment of Repentance fling."

But during his lifetime Omar Khayyam was not famous for his poems. He was famous for his mathematics.

He solved cubic equations in a way Europe would not do for 500 years. His algebra works are still essentially — correct.

And in 1079 he received a commission from Sultan Malik Shah I and vizier Nizam al-Mulk: reform the Islamic calendar.`,
          tr: `Giyaseddin Ebu'l-Feth Ömer ibn İbrahim el-Hayyami en-Nişaburi — bizim için Ömer Hayyam — ortaçağın en rahatsız edici dahilerinden biriydi.

Batı'da bugün neredeyse yalnızca Rubaiyat'ıyla tanınır — Edward FitzGerald'ın 1859'da İngilizceye çevirdiği ve onu romantizmin ve dekadansın hamisi yapan şarap, aşk ve geçici hayat sevinçleri üzerine Farsça dörtlükler.

Ama hayatı boyunca Ömer Hayyam şiirleriyle değil, matematiğiyle ünlüydü.

Avrupa'nın 500 yıl sonra çözeceği biçimde kübik denklemleri çözdü. Cebir eserleri hâlâ temelde doğrudur.

Ve 1079'da Sultan Melikşah I ve vezir Nizamülmülk'ten bir görev aldı: İslam takvimini reform et.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Observatoriet i Isfahan", en: "The Observatory in Isfahan", tr: "Isfahan'daki Rasathane" },
        figure: "Omar Khayyam",
        content: {
          sv: `Observatoriet som Malik Shah lät bygga i Isfahan var en av medeltidens teknologiska underverk — gigantiska mässingsinstrument som mätte stjärnornas positioner med en precision som européer inte skulle uppnå förrän Tycho Brahes tid på 1500-talet.

I åtta år samlade Omar Khayyam och hans team data. De mätte solens rörelse med en precision på decimaler. De beräknade det tropiska årets längd till 365,2422 dagar — en siffra vars korrekthet är häpnadsväckande även med moderna mätmetoder.

Den kalender de skapade — Jalali-kalendern, uppkallad efter Malik Shahs hederstitel Jalal al-Dawla — var mer noggrann än den Gregorianska calendern som Europa adopterade 1582, 500 år senare.

Varje år som ackumulerar i den Gregorianska kalendern leder till ett fel på ca 26 sekunder. Khayyams Jalali-kalender hade ett fel på bara ca 1 sekund.

En 11-årig gammal man, med mässingsinstrument och observationsprotokoll, uppnådde en precision som moderna astronomer respekterar djupt.

Men Khayyam var inte nöjd.

"Jag vet hur stjärnorna rör sig," skriver han i ett bevaravet fragment. "Men jag vet inte varför de existerar. Jag vet inte varför vi existerar. Och jag vet inte om det spelar någon roll."`,
          en: `The observatory that Malik Shah had built in Isfahan was one of the medieval world's technological marvels — gigantic brass instruments measuring the positions of stars with a precision Europeans would not achieve until Tycho Brahe's time in the 1500s.

For eight years Omar Khayyam and his team collected data. They measured the sun's movement with decimal precision. They calculated the tropical year's length as 365.2422 days — a figure whose accuracy is astonishing even by modern measurement methods.

The calendar they created — the Jalali calendar, named after Malik Shah's honorific title Jalal al-Dawla — was more accurate than the Gregorian calendar Europe adopted in 1582, 500 years later.

Every year that accumulates in the Gregorian calendar leads to an error of approximately 26 seconds. Khayyam's Jalali calendar had an error of only approximately 1 second.

An 11-year-old measurement, with brass instruments and observation protocols, achieved a precision that modern astronomers deeply respect.

But Khayyam was not satisfied.

"I know how the stars move," he writes in a preserved fragment. "But I do not know why they exist. I do not know why we exist. And I do not know if it matters."`,
          tr: `Melikşah'ın Isfahan'da yaptırdığı rasathane, ortaçağın teknolojik harikalarından biriydi — yıldızların konumlarını Avrupalıların 1500'lerde Tycho Brahe dönemine kadar ulaşamayacağı bir hassasiyetle ölçen dev pirinç aletler.

Sekiz yıl boyunca Ömer Hayyam ve ekibi veri topladı. Güneşin hareketini ondalık hassasiyetle ölçtüler. Tropikal yılın uzunluğunu 365,2422 gün olarak hesapladılar — modern ölçüm yöntemleriyle bile şaşırtıcı bir doğruluk.

Oluşturdukları takvim — Melikşah'ın onursal unvanı Celaleddin'den adını alan Celali takvimi — Avrupa'nın 500 yıl sonra 1582'de benimsediği Gregoryen takvimden daha hassastı.

Ama Hayyam tatmin olmamıştı.

"Yıldızların nasıl hareket ettiğini biliyorum," diye yazıyor korunmuş bir parçada. "Ama neden var olduklarını bilmiyorum. Neden var olduğumuzu bilmiyorum. Ve bunun önemli olup olmadığını bilmiyorum."`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Dikterna han aldrig tänkt publicera", en: "The Poems He Never Intended to Publish", tr: "Hiç Yayımlamayı Düşünmediği Şiirler" },
        figure: "Omar Khayyam",
        content: {
          sv: `Omar Khayyams Rubaiyat — de fyraradade dikterna som förevigat hans namn — skrevs troligen inte för publikation. De var privata reflektioner, kanske anteckningar vid sidan av de matematiska beräkningarna, kanske ord nedtecknade vid nattens stjärnobservationer.

Det är en storslagen ironi: en man som ville bli ihågkommen för sin matematik kom att bli odödlig för sina dikter. Och dikterna — trots all deras skönhet — uttryckte en djup skepsis mot den ordning han tjänade.

"Häller du vin åt mig, så skall jag vika undan / Från dyygdens stig och alla moralens bud."

Dikterna är inte ateistiska. Khayyam troligen trodde på Gud. Men de är profoundly oheroisk i en era av jihad och martyrdom — de erbjuder njutning nu, i det jordiska, eftersom himlen är osäker och livet kort.

I Seljukimperiets islamskt ortodoxa klimat var dessa dikter subversiva. Khayyam publicerade dem aldrig under sin livstid.

Han dog 1131. Hans matematik glömdes i 700 år. Hans dikter lever för evigt.

Det är precis det han fruktade.`,
          en: `Omar Khayyam's Rubaiyat — the four-line poems that immortalised his name — were probably not written for publication. They were private reflections, perhaps notes alongside the mathematical calculations, perhaps words set down during the night's star observations.

There is a grand irony: a man who wanted to be remembered for his mathematics came to be immortalised for his poems. And the poems — for all their beauty — expressed a profound scepticism toward the order he served.

"Ah, make the most of what we yet may spend / Before we too into the Dust descend."

The poems are not atheistic. Khayyam probably believed in God. But they are profoundly unheroic in an era of jihad and martyrdom — they offer pleasure now, in the earthly, since heaven is uncertain and life is short.

In the Seljuk Empire's Islamically orthodox climate these poems were subversive. Khayyam never published them during his lifetime.

He died in 1131. His mathematics were forgotten for 700 years. His poems live forever.

That is precisely what he feared.`,
          tr: `Ömer Hayyam'ın Rubaiyat'ı — adını ölümsüzleştiren dört satırlık şiirler — büyük olasılıkla yayım için yazılmadı. Matematiksel hesaplamaların yanındaki özel yansımalar, belki gece yıldız gözlemlerinde not edilen kelimelerdi.

Büyük bir ironi var: Matematiğiyle hatırlanmak isteyen bir adam, şiirleriyle ölümsüzleşti. Ve şiirler — tüm güzelliklerine rağmen — hizmet ettiği düzene derin bir şüphecilik ifade etti.

"Gel, hayatın kalan kısmından en iyi şekilde yararlan / Biz de tozun içine dönmeden önce."

Şiirler ateist değil. Hayyam muhtemelen Allah'a inanıyordu. Ama cihat ve şehitlik çağında derinden kahramansız — cenneti belirsiz ve hayatı kısa olduğundan, şimdide, dünyevi olanda zevk sunuyorlar.

Selçuk İmparatorluğu'nun İslami ortodoks iklimlinde bu şiirler yıkıcıydı. Hayyam onları hayatı boyunca hiç yayımlamadı.

1131'de öldü. Matematiği 700 yıl unutuldu. Şiirleri sonsuza kadar yaşıyor.

Tam da korktuğu şey bu.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 5
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

Namnet Toghrul — hans urfader Tughril Beg, han som red in i Bagdad och grundade imperiet — var ett av historiens mäktigaste. Men det imperium Toghrul III ärvde 1174 var en skugga av detta namn. Seljukerna av Rûm regerade i Anatolien. Seljukerna av Kerman var isolerade i söder. Det som återstod — Irak och västra Persien — var ett fragment besatt av turkiska militärkommendanter (atabegs) som lydde av vana, inte av respekt.

Toghrul III var dock inte en man som böjde sig för det oundvikliga. Han var ung, arg och beslutsam. Han ville återvinna. Han ville att hans namn ska betyda något mer än "den siste."

Under 20 år kämpade han. Han omintet-gjorde uppror. Han förhandlade diplomatiska allianser. Han föll och reste sig och föll igen. Och varje gång han reste sig var det med lite färre soldater, lite mindre territorium, lite mer desperation.

Sedan kom Khwarazmianerna.`,
          en: `Toghrul III inherited a name that weighed heavily and an empire that was hollow.

The name Toghrul — his ancestor Tughril Beg, who rode into Baghdad and founded the empire — was one of history's most powerful. But the empire Toghrul III inherited in 1174 was a shadow of this name. The Seljuks of Rûm ruled in Anatolia. The Seljuks of Kirman were isolated in the south. What remained — Iraq and western Persia — was a fragment occupied by Turkish military commanders (atabegs) who obeyed out of habit, not respect.

But Toghrul III was not a man who bowed to the inevitable. He was young, angry and determined. He wanted to reclaim. He wanted his name to mean something more than "the last."

For 20 years he fought. He crushed rebellions. He negotiated diplomatic alliances. He fell and rose and fell again. And each time he rose it was with a few fewer soldiers, a little less territory, a little more desperation.

Then came the Khwarazmians.`,
          tr: `Tuğrul III, ağır bir isim ve içi boş bir imparatorluk miras aldı.

Tuğrul adı — ecdadı Tuğrul Bey, Bağdat'a giren ve imparatorluğu kuran — tarihin en güçlü isimlerinden biriydi. Ama Tuğrul III'ün 1174'te miras aldığı imparatorluk bu ismin gölgesiydi. Rum Selçukları Anadolu'da hüküm sürüyordu. Kirman Selçukları güneyde izole halde kalmıştı. Geriye kalan — Irak ve batı İran — saygıdan değil alışkanlıktan itaat eden Türk askeri komutanlarının (atabeglerin) işgal ettiği bir parçaydı.

Ama Tuğrul III kaçınılmaza boyun eğen biri değildi. Gençti, öfkeliydi ve kararlıydı. Geri almak istiyordu. Adının "son" kelimesinden fazla anlam ifade etmesini istiyordu.

20 yıl savaştı. İsyanları bastırdı. Diplomatik ittifaklar müzakere etti. Düştü ve kalktı ve tekrar düştü. Her kalkışında biraz daha az asker, biraz daha az toprak, biraz daha fazla çaresizlikle kalktı.

Sonra Harizmşahlar geldi.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Tekish mot Toghrul — Framtiden möter det förflutna", en: "Tekish versus Toghrul — The Future Meets the Past", tr: "Tekiş'e Karşı Tuğrul — Gelecek Geçmişle Karşılaşıyor" },
        figure: "Toghrul III",
        content: {
          sv: `Shah Tekish av Khwarazm var inte en barbarisk erövrare. Han var en statsbyggare av det moderna snittet — administrativt genialisk, diplomatiskt klok, militärt överlägsen. Hans imperium växte systematisk, absorberade svagare stater, erbjöd stabilitet till de som underkastade sig och förintelse till de som vägrade.

Toghrul III vägrade.

Inte av stolthet — eller kanske av stolthet. Men Toghrul var ett Seljuk. Hans familie hade styrt dessa land i 157 år. Hans förfader hade suttit med den abbasidiske kalifen och utbytit ed. Hans blod var bundet i kontraktet med islam och imperiet.

"Jag kommer inte att underteckna ett capitulation-dokument," sade Toghrul till sina rådgivare. "Jag är inte den siste Seljuksultanen. Jag är sultanen som håller linjen."

Rådgivarna visste att han förlorade. De flesta av dem lämnade.

Toghrul samlade det han hade — kanske 5 000 man, kanske 7 000, historikerna är inte säkra — och red mot Rayy.`,
          en: `Shah Tekish of Khwarazm was not a barbaric conqueror. He was a state-builder of the modern cut — administratively brilliant, diplomatically shrewd, militarily superior. His empire grew systematically, absorbed weaker states, offered stability to those who submitted and annihilation to those who refused.

Toghrul III refused.

Not out of pride — or perhaps out of pride. But Toghrul was a Seljuk. His family had ruled these lands for 157 years. His ancestor had sat with the Abbasid caliph and exchanged oaths. His blood was bound in the contract with Islam and the empire.

"I will not sign a capitulation document," Toghrul told his advisors. "I am not the last Seljuk sultan. I am the sultan who holds the line."

The advisors knew he was losing. Most of them left.

Toghrul gathered what he had — perhaps 5,000 men, perhaps 7,000, historians are not certain — and rode toward Rayy.`,
          tr: `Harizm Şahı Tekiş barbarik bir fatih değildi. Modern kesimiyle bir devlet kurucusuydu — idari açıdan parlak, diplomatik açıdan kurnaz, askeri açıdan üstün. İmparatorluğu sistematik olarak büyüdü, zayıf devletleri absorbe etti, teslim olanlara istikrar sundu ve reddedenlere yıkım.

Tuğrul III reddetti.

Gurur yüzünden değil — ya da belki gurur yüzünden. Ama Tuğrul bir Selçukluydu. Ailesi bu topraklarda 157 yıldır hüküm sürmüştü. Ceddi Abbasi halifesiyle oturmuş ve yemin etmişti. Kanı İslam ve imparatorlukla yapılan sözleşmeye bağlıydı.

"Bir teslimiyet belgesi imzalamayacağım," dedi Tuğrul danışmanlarına. "Ben son Selçuk sultanı değilim. Ben sınırı tutan sultanım."

Danışmanlar kaybettiğini biliyordu. Çoğu ayrıldı.

Tuğrul elindekini topladı — belki 5.000 kişi, belki 7.000, tarihçiler emin değil — ve Rayy'a doğru yola çıktı.`,
        },
      },
      {
        id: "ch3",
        title: { sv: "Slutet vid Rayy", en: "The End at Rayy", tr: "Rayy'daki Son" },
        figure: "Toghrul III",
        content: {
          sv: `Slaget vid Rayy 1194 var inte ett slag om ett imperium. Det var ett slag om ett namn.

Toghrul III kämpade tappert — vittnen berättar att han personligen ledde kavalleriänfall, att han red in i strid med sabel i hand, att han vägrade reträttera när hans linjer bröt. Han kämpade som hans förfader Tughril Beg hade kämpat vid Dandanaqan 150 år tidigare — som en nomadisk krigarfurste för vilken heder var viktigare än liv.

Han dog i striden.

Historikerna är oeniga om exakt hur: en pil, ett svärd, ett ryttarfall. Men alla källor är eniga om att han dog kämpande, med sina soldater, utan att ha bett om nåd.

Shah Tekish beordrade att Toghruls huvud skulle skickas till den Abbasidiske kalif al-Nasir i Bagdad — ett symbolisk och politiskt meddelande: Era beskyddare är borta. Nu är vi era beskyddare.

Det 157 år gamla Seljukimperiet — grundat av Tughril Beg, expanderat av Alp Arslan, förhärligat av Malik Shah, administrerat av Nizam al-Mulk, besjunget av Omar Khayyam — var officiellt slut.

Men imperiet var inte slut. Det var transformerat. Det persisk-islamiska administrativa systemet, Nizamiyya-universitetens intellektuella tradition, sultansystemet som syntetiserat nomadisk makt och islamisk legitimitet — allt detta levde vidare. I Anatolien, som Sultanat av Rûm, i 100 år till. I de osmanska sultanerna som ärvde Seljukernas statskonst. I den islamiska civilisationens institutioner som fortfarande bär spår av Nizam al-Mulks Siyasatnama.

Toghrul III dog. Seljukerna dog. Men det de skapade dog aldrig.`,
          en: `The Battle of Rayy in 1194 was not a battle for an empire. It was a battle for a name.

Toghrul III fought bravely — witnesses report that he personally led cavalry charges, that he rode into battle with sabre in hand, that he refused to retreat when his lines broke. He fought as his ancestor Tughril Beg had fought at Dandanaqan 150 years earlier — as a nomadic warrior-prince for whom honour was more important than life.

He died in the battle.

Historians disagree on exactly how: an arrow, a sword, a fall from horseback. But all sources agree that he died fighting, with his soldiers, without having asked for mercy.

Shah Tekish ordered that Toghrul's head be sent to the Abbasid Caliph al-Nasir in Baghdad — a symbolic and political message: Your protectors are gone. Now we are your protectors.

The 157-year-old Seljuk Empire — founded by Tughril Beg, expanded by Alp Arslan, glorified by Malik Shah, administered by Nizam al-Mulk, sung by Omar Khayyam — was officially over.

But the empire was not over. It was transformed. The Persian-Islamic administrative system, the Nizamiyya universities' intellectual tradition, the sultan system that synthesised nomadic power and Islamic legitimacy — all of this lived on. In Anatolia, as the Sultanate of Rûm, for another 100 years. In the Ottoman sultans who inherited the Seljuks' statecraft. In the institutions of Islamic civilisation that still bear traces of Nizam al-Mulk's Siyasatnama.

Toghrul III died. The Seljuks died. But what they created never did.`,
          tr: `1194'teki Rayy Savaşı, bir imparatorluk için değil, bir isim için yapılan bir savaştı.

Tuğrul III cesurca savaştı — tanıklar, bizzat süvari hücumlarına öncülük ettiğini, elinde kılıçla savaşa girdiğini, hatları kırıldığında geri çekilmeyi reddettiğini aktarıyor. 150 yıl önce ceddi Tuğrul Bey'in Dandanakan'da savaştığı gibi savaştı — onuru canından önemli gören göçebe bir savaşçı prens olarak.

Savaşta öldü.

Tarihçiler tam olarak nasıl öldüğü konusunda anlaşmazlık içinde: bir ok, bir kılıç, attan düşme. Ama tüm kaynaklar onun, askerleriyle birlikte, merhamet dilemeden savaşarak öldüğü konusunda hemfikir.

Tekiş, Tuğrul'un başının Bağdat'taki Abbasi Halifesi en-Nasır'a gönderilmesini emretti — sembolik ve siyasi bir mesaj: Koruyucularınız gitti. Şimdi biz sizin koruyucularınızız.

157 yıllık Selçuk İmparatorluğu — Tuğrul Bey tarafından kurulan, Alparslan tarafından genişletilen, Melikşah tarafından yüceltilen, Nizamülmülk tarafından yönetilen, Ömer Hayyam tarafından dile getirilen — resmen sona erdi.

Ama imparatorluk bitmemişti. Dönüşmüştü. Fars-İslam idari sistemi, Nizamiye üniversitelerinin entelektüel geleneği, göçebe gücü ve İslam meşruiyetini sentezleyen sultanlık sistemi — bunların hepsi yaşamaya devam etti. Anadolu'da, Rum Sultanlığı olarak, daha 100 yıl. Selçukların devlet sanatını miras alan Osmanlı sultanlarında. Hâlâ Nizamülmülk'ün Siyasetname'sinin izlerini taşıyan İslam medeniyetinin kurumlarında.

Tuğrul III öldü. Selçuklular öldü. Ama yarattıkları hiç ölmedi.`,
        },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // STORY 6
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
      sv: "1153. Kejsaren av öst, gud bland nomader, tillfångatas av sina egna frändfolk.",
      en: "1153. The emperor of the east, god among nomads, is captured by his own kinspeople.",
      tr: "1153. Doğunun imparatoru, göçebeler arasında tanrı, kendi akrabaları tarafından esir alınıyor.",
    },
    chapters: [
      {
        id: "ch1",
        title: { sv: "Ironi i historiens teater", en: "Irony in History's Theatre", tr: "Tarihin Tiyatrosunda İroni" },
        figure: "Sultan Sanjar",
        content: {
          sv: `Det finns en djup ironi i Sanjars fångenskap som historien aldrig fully rättat till.

Seljukerna kom till makten som Oghuz-nomader — stäppens folk, hästens folk, det folk som européer med förundran och rädsla kallat "turkar." De var ryttare vars hemland var horisonten, vars regering var råd vid lägereld, vars lag var stammens sed.

Och sedan, med varje generation av imperiumbyggande, hade de abdikerat från sin nomadiska arvsrätt. De hade blivit städernas folk. Persiska administratörers folk. Abbasidkalifers beskyddare. Nizamiyya-universitetens patrons. De hade i stort sett glömt stäppen.

Stäppen hade inte glömt dem.

De Oghuz-stammar som Sultan Sanjar nu regerade som sina undersåtar i Khurasan var fortfarande hans frändfolk — av samma turkiska blod, talande samma turkiska dialekter, dyrkande i stort sett samma Gud. Men de levde fortfarande under betingelserna av stäppen: de krävde frihet att beta sina hjordar, frihet att röra sig, frihet från de skatter och restriktioner som ett stadsimperium oundvikligen lade på dem.

Sanjar lyssnade inte.

1153 revolterade Oghuz-stammarna. Och i det slag som följde fångades Sanjar.`,
          en: `There is a profound irony in Sanjar's captivity that history has never fully righted.

The Seljuks came to power as Oghuz nomads — the people of the steppe, the people of the horse, the people Europeans with amazement and fear called "Turks." They were riders whose homeland was the horizon, whose government was council around the campfire, whose law was tribal custom.

And then, with each generation of empire-building, they had abdicated their nomadic birthright. They had become the people of cities. The people of Persian administrators. The protectors of Abbasid caliphs. The patrons of Nizamiyya universities. They had essentially forgotten the steppe.

The steppe had not forgotten them.

The Oghuz tribes that Sultan Sanjar now ruled as his subjects in Khurasan were still his kinspeople — of the same Turkish blood, speaking the same Turkish dialects, worshipping essentially the same God. But they still lived under the conditions of the steppe: they demanded freedom to graze their herds, freedom to move, freedom from the taxes and restrictions that a city empire inevitably imposed on them.

Sanjar did not listen.

In 1153 the Oghuz tribes revolted. And in the battle that followed, Sanjar was captured.`,
          tr: `Sencer'in esaretinde, tarihin hiçbir zaman tam olarak gidermediği derin bir ironi var.

Selçuklular, Oğuz göçebeleri olarak — bozkır halkı, at halkı, Avrupalıların şaşkınlık ve korkuyla "Türkler" dediği halk olarak — iktidara geldi. Anavatanları ufuk, yönetimleri kamp ateşi etrafında meclis, yasaları kabile geleneği olan süvarilerdiler.

Ve sonra, imparatorluk kurmanın her nesliyle, göçebe doğum haklarından vazgeçmişlerdi. Şehirlerin halkı olmuşlardı. Fars yöneticilerin halkı. Abbasi halifelerinin koruyucuları. Nizamiye üniversitelerinin hamisler. Esasen bozkırı unutmuşlardı.

Bozkır onları unutmamıştı.

Sultan Sencer'in şimdi Horasan'da tebaası olarak yönettiği Oğuz kabileleri hâlâ onun soydaşlarıydı — aynı Türk kanı, aynı Türk lehçeleri, esasen aynı Tanrı'ya ibadet eden. Ama hâlâ bozkırın koşulları altında yaşıyorlardı: sürülerini otlatma özgürlüğü, hareket özgürlüğü, bir şehir imparatorluğunun kaçınılmaz olarak onlara dayattığı vergilerden ve kısıtlamalardan muafiyet istiyorlardı.

Sencer dinlemedi.

1153'te Oğuz kabileleri isyan etti. Ve ardından gelen savaşta Sencer esir alındı.`,
        },
      },
      {
        id: "ch2",
        title: { sv: "Tre år som fånge", en: "Three Years as Prisoner", tr: "Esir Olarak Üç Yıl" },
        figure: "Sultan Sanjar",
        content: {
          sv: `Ahmad Sanjar — sultan i 35 år, herren av Khurasan, son till Malik Shah den Store, den siste store Seljuksultanen av öst — levde tre år som fånge av de Oghuz han en gång kommenderat.

Det var inte grym fångenskap. Oghuz var hans frändfolk — de respekterade sultanskapets titel om inte dess makt. Han fick föda, tält, till och med hedersgester. Men han fick inte frihet. Och ett sultanat utan rörelsefriheten är ett sultanat i graven.

Vittnen berättar att Sanjar grät mer än en gång under sin fångenskap — inte av smärta utan av skam. Han som hade besegrat Karakhaniderna och Ghaznaviderna. Han som hade suttit på Centralasiens mäktigaste tron. Fångad av de herdar vars skatter han krävt.

Imperiet han lämnade var ett imperium i fritt fall. Utan sultanens närvaro splittrades Khurasan bland rivaliserande guvernörer. Städerna plundrades. Handelsvägarna blockerades. Nizamiyya-universiteten — hans fars intellektuella arv — fick inte sina stipendier. Lärda flydde.

Sanjar flydde 1156, ett år gammalt och bruten av skam. Han dog 1157, ett år efter sin frihet, av sorg och svaghet.

Ingen av de stora sultanerna dog i sin säng med sin imperium intakt. Det är kanske historiens viktigaste lärdom om makt.`,
          en: `Ahmad Sanjar — sultan for 35 years, lord of Khurasan, son of Malik Shah the Great, the last great Seljuk sultan of the east — lived three years as prisoner of the Oghuz he had once commanded.

It was not cruel captivity. The Oghuz were his kinspeople — they respected the sultan title if not its power. He received food, a tent, even gestures of honour. But he did not receive freedom. And a sultanate without freedom of movement is a sultanate in its grave.

Witnesses report that Sanjar wept more than once during his captivity — not from pain but from shame. He who had defeated the Kara-Khanids and the Ghaznavids. He who had sat on Central Asia's most powerful throne. Captured by the herders whose taxes he had demanded.

The empire he left behind was an empire in free fall. Without the sultan's presence Khurasan fragmented among rival governors. Cities were plundered. Trade routes were blocked. The Nizamiyya universities — his father's intellectual legacy — did not receive their stipends. Scholars fled.

Sanjar escaped in 1156, aged and broken by shame. He died in 1157, a year after his freedom, of grief and weakness.

None of the great sultans died in their bed with their empire intact. That is perhaps history's most important lesson about power.`,
          tr: `Ahmad Sencer — 35 yıl sultan, Horasan'ın lordu, Büyük Melikşah'ın oğlu, doğunun son büyük Selçuk sultanı — bir zamanlar emrindeki Oğuzların esiri olarak üç yıl yaşadı.

Zalim bir esaret değildi. Oğuzlar onun soydaşlarıydı — gücünü değilse de sultan unvanını saygı gösterdiler. Yiyecek, çadır, hatta onur jestleri aldı. Ama özgürlük almadı. Hareket özgürlüğü olmayan bir sultanlık, mezardaki bir sultanlıktır.

Tanıklar, Sencer'in esareti sırasında birden fazla kez ağladığını aktarıyor — acıdan değil, utançtan. Karahanlıları ve Gaznelileri yenen o. Orta Asya'nın en güçlü tahtında oturan o. Vergilerini talep ettiği çobanlar tarafından esir alındı.

Geride bıraktığı imparatorluk serbest düşüşteki bir imparatorluktu. Sultanın varlığı olmadan Horasan rakip valiler arasında parçalandı. Şehirler yağmalandı. Ticaret yolları tıkandı. Nizamiye üniversiteleri — babasının entelektüel mirası — burslarını alamadı. Alimler kaçtı.

Sencer 1156'da kaçtı, yaşlı ve utançla kırılmış. Özgürlüğünden bir yıl sonra, 1157'de keder ve zayıflıktan öldü.`,
        },
      },
    ],
  },
];

// =============================================================================
// ENHANCED PROFILES — Full profiles for all minor sultans
// =============================================================================

export const seljukEnhancedProfiles: HistoricalProfile[] = [
  // ─── MAHMUD I (Enhanced) ───────────────────────────────────────────────────
  {
    id: "mahmud-i",
    name: "Mahmud I",
    years: "1087–1094",
    title: { sv: "Det kortlivade barnet — En dynasti i kris", en: "The Short-Lived Child — A Dynasty in Crisis", tr: "Kısa Ömürlü Çocuk — Kriz İçindeki Bir Hanedan" },
    portrait: "👶",
    bio: {
      sv: `Mahmud I är ett av historiens mest tragiska namn — inte av vad han var, utan av vad han inte fick chansen att bli. Han var fyra år gammal när hans mor Terken Khatun utnämnde honom till sultan i ett desperat försök att säkra sin linje mot hans äldre halvbröder.

Terken Khatun var en av den medeltida islamiska världens mest hänsynslösa politiska operatörer. Medan Malik Shah I ännu låg på dödsbädden, möjligen förgiftad av hennes försorg, förrde hon snabbt sin yngste son Mahmud till tronkammaren och utropade honom sultan. Hon visste att om Malik Shahs äldre söner — Barkiyaruq, Muhammad Tapar, Sanjar — fick höra om faderns bortgång före hon handlade, var alla chanser förlorade.

Mahmud var fyra år gammal. Han förstod inte vad som hände. Han bars till tronen i en man's armar, klädd i regalier som var gjorda för en vuxen och svängde runt hans lilla kropp. Hovmännen bugade. Imamerna läste bön. Och det barn som Terken Khatun kallade sultan lekte med de guldknappar som fanns på hans ärmkant.

Det är osannolikt att Mahmud I minns en enda dag av sitt "sultanat." Barkiyaruq's arméer rörde sig snabbt. Terken Khatuns intrig kollapsade som ett korthus. Mahmud dog 1094, sannolikt sjuk, möjligen mördad — 7 år gammal.

Han är begravd i Isfahan. Ingen pilgrim kommer för att hedra honom.

Hans enda arv är hans mor och hennes hänsynslösa ambition.`,
      en: `Mahmud I is one of history's most tragic names — not for what he was, but for what he never had the chance to become. He was four years old when his mother Terken Khatun appointed him sultan in a desperate attempt to secure her line against his older half-brothers.

Terken Khatun was one of the medieval Islamic world's most ruthless political operators. While Malik Shah I still lay on his deathbed, possibly poisoned at her instigation, she quickly carried her youngest son Mahmud to the throne room and proclaimed him sultan. She knew that if Malik Shah's older sons — Barkiyaruq, Muhammad Tapar, Sanjar — heard of their father's passing before she acted, all chances were lost.

Mahmud was four years old. He did not understand what was happening. He was carried to the throne in a man's arms, dressed in regalia made for an adult that swung around his small body. Courtiers bowed. Imams read prayers. And the child Terken Khatun called sultan played with the gold buttons on his sleeve.

It is unlikely Mahmud I remembers a single day of his "sultanate." Barkiyaruq's armies moved quickly. Terken Khatun's intrigue collapsed like a house of cards. Mahmud died in 1094, probably ill, possibly murdered — 7 years old.

He is buried in Isfahan. No pilgrim comes to honour him.

His only legacy is his mother and her ruthless ambition.`,
      tr: `Mahmud I, tarihin en trajik isimlerinden biri — ne olduğu için değil, olmaya fırsat bulamadığı şey için. Annesi Terken Hatun, onu dört yaşında, kendi soyunu yaşça büyük üvey kardeşlerine karşı güvence altına alma umuduyla sultan ilan etti.

Terken Hatun, ortaçağ İslam dünyasının en acımasız siyasi operatörlerinden biriydi. Melikşah I hâlâ yatağında can çekişirken, belki de onun teşvikiyle zehirlenmiş olarak, en küçük oğlu Mahmud'u hızla taht odasına taşıdı ve onu sultan ilan etti.

Mahmud dört yaşındaydı. Ne olduğunu anlamıyordu. Büyükler için yapılmış ve küçücük vücudunda sallanan giysilerle taht odasına bir adamın kollarında taşındı. Saray mensupları eğildi. İmamlar dua okudu. Ve Terken Hatun'un sultan dediği çocuk, kolunun kenarındaki altın düğmelerle oynadı.

Mahmud I'nin "sultanlığının" tek bir gününü hatırlama ihtimali yoktur. Berkyaruk'un orduları hızlı hareket etti. Terken Hatun'un entrikası bir iskambil gibi çöktü. Mahmud 1094'te öldü, muhtemelen hasta, belki katledildi — 7 yaşında.`,
    },
    reforms: {
      sv: ["Inga reformer — ett fyraårigt barn med titeln sultan"],
      en: ["No reforms — a four-year-old child bearing the sultan's title"],
      tr: ["Reform yok — sultan unvanını taşıyan dört yaşında bir çocuk"],
    },
    campaigns: {
      sv: ["Inga kampanjer — Terken Khatuns regenter förlorade kriget mot Barkiyaruq"],
      en: ["No campaigns — Terken Khatun's regents lost the war to Barkiyaruq"],
      tr: ["Sefer yok — Terken Hatun'un naipleri Berkyaruk'a karşı savaşı kaybetti"],
    },
    leadershipStyle: {
      sv: "Mahmud I var inte en ledare. Han var ett politiskt verktyg — ett spädbarn vars namn bar legitimitet som hans mor ville utnyttja. Hans 'ledarstil' är hans mors: opportunistisk, desperat och till slut misslyckad.",
      en: "Mahmud I was not a leader. He was a political tool — an infant whose name carried legitimacy that his mother wanted to exploit. His 'leadership style' is his mother's: opportunistic, desperate and ultimately unsuccessful.",
      tr: "Mahmud I bir lider değildi. Siyasi bir araçtı — adı annesinin sömürmek istediği meşruiyeti taşıyan bir bebek. 'Liderlik tarzı' annesininkidir: fırsatçı, çaresiz ve nihayetinde başarısız.",
    },
    criticalPerspectives: {
      sv: "Mahmud Is korta 'styre' illustrerar en av den islamiska politiska teologins mest grundläggande svagheter: att sultantiteln var ärftlig och dynastisk, men att det inte fanns några formella mekanismer för en fungerande regentskaps. Det öppnade för maktmissbruk av ambiciösa mödrar, husliga konspiratörer och militäriska opportunister.",
      en: "Mahmud I's brief 'reign' illustrates one of Islamic political theology's most fundamental weaknesses: that the sultan title was hereditary and dynastic, but there were no formal mechanisms for effective regency. This opened the door for abuse of power by ambitious mothers, domestic conspirators and military opportunists.",
      tr: "Mahmud I'nin kısa 'saltanatı', İslami siyasi teolojinin en temel zayıflıklarından birini örnekliyor: sultan unvanının kalıtsal ve hanedanlık olduğu, ancak etkili naiplik için resmi mekanizmaların olmadığı. Bu, hırslı annelerin, iç komplocularin ve askeri fırsatçıların güç istismarının kapısını açtı.",
    },
  },

  // ─── BARKIYARUQ (Enhanced) ─────────────────────────────────────────────────
  {
    id: "barkiyaruq",
    name: "Barkiyaruq (Rukn al-Din)",
    years: "1080–1105",
    title: { sv: "Inbördeskrigets sultan — Dynasti mot sig självt", en: "Sultan of the Civil War — Dynasty Against Itself", tr: "İç Savaşın Sultanı — Hanedanın Kendisine Karşı" },
    portrait: "⚔️",
    bio: {
      sv: `Barkiyaruq är en av historiens mest tragiska figurer i den meningen att han var tillräckligt begåvad för att se sin omöjliga situation klart och ännu inte begåvad nog att fly den.

Han var Malik Shah Is äldste overlevande son vid faderns bortgång 1092 — logisk tronarvinge, militärt kompetent, diplomatiskt intelligent. Men logik och intelligens räckte inte i det kaos som Malik Shahs och Nizam al-Mulks simultana dödsfall utlöste.

Han kämpade mot sin halvbror Muhammad Tapar i ett krig som varade i stort sett hela hans regeringstid. Krigen var inte ideologiska — det handlade inte om religion eller policy. Det handlade om bröder som ville ha tronen. Seljukimperiets successionsystem — med ingen klar primogenitursregel — garanterade att varje sultan med tillräcklig militär styrka kunde utmana den sittandes legitimitet.

Barkiyaruq vann mer strider än han förlorade. Han höll det centrala imperiet samman med personlig tapperhet och politisk intuition. Men varje seger kostade resurser han inte hade, och varje förlust gav Muhammad Tapar styrka att åter utmana.

Han dog 25 år gammal av vad historikerna tror var tuberkulos — men samtida berättar att han också dog av utmattning, av en mans kropp och en sultans sinne som slitits sönder av år av krig mot sina egna bröder.

Barkiyaruqs sista ord, enligt en persisk krönika, var: "Jag gav min arm men aldrig mitt rike. Det var nog."

Det var inte nog. Men det är ett värdigt epitafium.`,
      en: `Barkiyaruq is one of history's most tragic figures in the sense that he was talented enough to see his impossible situation clearly and yet not talented enough to escape it.

He was Malik Shah I's eldest surviving son at his father's death in 1092 — logical heir to the throne, militarily competent, diplomatically intelligent. But logic and intelligence were not enough in the chaos that Malik Shah's and Nizam al-Mulk's simultaneous deaths unleashed.

He fought against his half-brother Muhammad Tapar in a war that lasted essentially his entire reign. The wars were not ideological — they were not about religion or policy. They were about brothers who wanted the throne. The Seljuk Empire's succession system — with no clear primogeniture rule — guaranteed that any sultan with sufficient military strength could challenge the incumbent's legitimacy.

Barkiyaruq won more battles than he lost. He held the central empire together through personal bravery and political intuition. But each victory cost resources he did not have, and each defeat gave Muhammad Tapar strength to challenge again.

He died at age 25 of what historians believe was tuberculosis — but contemporaries report he also died of exhaustion, of a man's body and a sultan's mind torn apart by years of war against his own brothers.

Barkiyaruq's last words, according to a Persian chronicle, were: "I gave my arm but never my realm. That was enough."

It was not enough. But it is a worthy epitaph.`,
      tr: `Berkyaruk, imkansız durumunu açıkça görecek kadar yetenekli ancak ondan kaçacak kadar yetenekli olmayan biri olması bakımından tarihin en trajik figürlerinden biridir.

1092'de babasının ölümünde Melikşah I'in hayatta kalan en büyük oğluydu — mantıksal taht varisi, askeri açıdan yetkin, diplomatik açıdan zeki. Ama Melikşah ve Nizamülmülk'ün eş zamanlı ölümlerinin körüklediği kaoste mantık ve zeka yetmedi.

Üvey kardeşi Muhammed Tapar'a karşı neredeyse tüm saltanatı boyunca süren bir savaş verdi. Savaşlar ideolojik değildi — din ya da politikayla ilgili değildi. Tahtı isteyen kardeşler hakkındaydı. Selçuk İmparatorluğu'nun veraset sistemi — net bir ilk doğan kuralı olmadan — yeterli askeri güce sahip her sultanın mevcut kişinin meşruiyetine meydan okuyabileceğini garanti ediyordu.

Berkyaruk kaybettiğinden daha fazla savaş kazandı. Kişisel cesaret ve siyasi sezgiyle merkezi imparatorluğu bir arada tuttu. Ama her zafer elinde olmayan kaynakları tüketti ve her yenilgi Muhammed Tapar'a yeniden meydan okuma gücü verdi.`,
    },
    reforms: {
      sv: ["Upprätthållandet av central Seljukisk auktoritet mot centrifugala krafter", "Diplomatiska förhandlingar med Abbasidkalifaten om legitimitetserkännande", "Militär reorganisation av den centrala imperiearmén"],
      en: ["Maintaining central Seljuk authority against centrifugal forces", "Diplomatic negotiations with the Abbasid caliphate for legitimacy recognition", "Military reorganisation of the central imperial army"],
      tr: ["Merkezkaç kuvvetlere karşı merkezi Selçuklu otoritesinin korunması", "Meşruiyet tanıması için Abbasi halifeliğiyle diplomatik müzakereler", "Merkezi imparatorluk ordusunun askeri yeniden örgütlenmesi"],
    },
    campaigns: {
      sv: ["Inbördeskriget mot Mahmud I (1092–1094) — Terken Khatuns koalition besegras", "Det långa kriget mot Muhammad Tapar (1094–1105) — år av alternerande segrar och förluster", "Defensiva operationer mot korsfararna i Levanten (1099–1105)", "Kampanjer mot upproriska atabegs i Azerbajdzjan och Irak"],
      en: ["Civil war against Mahmud I (1092–1094) — Terken Khatun's coalition defeated", "The long war against Muhammad Tapar (1094–1105) — years of alternating victories and defeats", "Defensive operations against the Crusaders in the Levant (1099–1105)", "Campaigns against rebellious atabegs in Azerbaijan and Iraq"],
      tr: ["Mahmud I'e karşı iç savaş (1092–1094) — Terken Hatun koalisyonu yenildi", "Muhammed Tapar'a karşı uzun savaş (1094–1105) — yıllarca değişen zafer ve yenilgiler", "Levant'taki Haçlılara karşı savunma operasyonları (1099–1105)", "Azerbaycan ve Irak'taki isyancı atabeglere karşı seferler"],
    },
    leadershipStyle: {
      sv: "Barkiyaruq regerade genom personlig karisma och militär direkt aktion — han var en sultan som ledde sina styrkor personligen snarare än att delegera till fältmarskalkar. Hans svaghet var att han inte kunde hålla sin dynastiska familj enad, men hans styrka var att han aldrig övergav det personliga engagemanget i styrning.",
      en: "Barkiyaruq ruled through personal charisma and direct military action — he was a sultan who led his forces personally rather than delegating to field marshals. His weakness was his inability to keep his dynastic family united, but his strength was that he never abandoned personal engagement with governance.",
      tr: "Berkyaruk, kişisel karizmayla ve doğrudan askeri eylemle hüküm sürdü — mareşallere delege etmek yerine kuvvetlerine kişisel olarak öncülük eden bir sultandı. Zayıflığı, hanedanlık ailesini bir arada tutamamasıydı, ama gücü yönetimle kişisel bağlılığı hiç terk etmemesiydi.",
    },
    criticalPerspectives: {
      sv: "Barkiyaruqs arv är omdiskuterat. Positiva historiker ser honom som en tragisk hjälte som kämpade mot strukturella krafter bortom sin kontroll. Kritiska historiker pekar på att hans oförmåga att förhandla en fredlig lösning med Muhammad Tapar — snarare än år av krig — bidrog till imperiets svaghet inför korsfararna. En sultanat som slåss mot sig själv kan inte försvar dess gränser.",
      en: "Barkiyaruq's legacy is debated. Positive historians see him as a tragic hero fighting against structural forces beyond his control. Critical historians point out that his inability to negotiate a peaceful resolution with Muhammad Tapar — rather than years of war — contributed to the empire's weakness before the Crusaders. A sultanate fighting against itself cannot defend its frontiers.",
      tr: "Berkyaruk'un mirası tartışmalıdır. Olumlu tarihçiler onu kontrolü dışındaki yapısal güçlere karşı savaşan trajik bir kahraman olarak görür. Eleştirel tarihçiler, Muhammed Tapar'la yıllarca süren savaş yerine barışçıl bir çözüm müzakere edemeyişinin Haçlılar karşısında imparatorluğun zayıflığına katkıda bulunduğuna işaret ediyor.",
    },
  },

  // ─── MALIK SHAH II (Enhanced) ───────────────────────────────────────────────
  {
    id: "malik-shah-ii",
    name: "Malik Shah II",
    years: "ca. 1100–1105",
    title: { sv: "Månadsregenten — Historiens fotnot", en: "The Month-Long Regent — History's Footnote", tr: "Aylık Naib — Tarihin Dipnotu" },
    portrait: "⏱️",
    bio: {
      sv: `Det finns sultaner som regerade i 40 år och lämnades knappt ett spår i historien. Och sedan finns Malik Shah II, som regerade i knappt sex veckor och vars korta 'sultanat' ändå berättar en hel historia om ett imperium på väg mot katastrof.

Han var son till Barkiyaruq — utsedd av sin döende far i ett sista desperat försök att hålla Barkiyaruq-linjen vid liv. Men Muhammad Tapar var redan på väg med sina arméer. Det fanns ingen tid för Malik Shah II att konsolidera, rekrytera eller förhandla.

Han var ett barn — exakt ålder okänd men sannolikt inte mer än fem till sju år. Hovets lojalitet tillhörde aldrig honom personligen; den tillhörde minnet av hans far, och den minnet bleknade snabbt.

Muhammad Tapar erövrade Bagdad. Malik Shah II kapitulerade. Och sedan — i en av de merciful episodes av dynastisk politik — fick han leva. Muhammad Tapar var smart nog att förstå att att döda ett litet barn var dålig propaganda.

Malik Shah II lever resten av sitt korta liv i skuggan — hövlig fången, hedersgäst, levande bevis på att Muhammad Tapar var magnanimous. Han dog sannolikt ung av sjukdom, datumen okänt.

Vad gör vi av ett liv som detta? Kanske detta: att inte alla historiska figurer är aktörer i sin tid. Ibland är de offer för sin dynastis arvsrätt — män och barn vars namn används av andra för syften de aldrig valt.`,
      en: `There are sultans who reigned for 40 years and left barely a trace in history. And then there is Malik Shah II, who reigned for barely six weeks and whose brief 'sultanate' nonetheless tells an entire story about an empire heading toward catastrophe.

He was Barkiyaruq's son — appointed by his dying father in a last desperate attempt to keep the Barkiyaruq line alive. But Muhammad Tapar was already on the move with his armies. There was no time for Malik Shah II to consolidate, recruit or negotiate.

He was a child — exact age unknown but probably no more than five to seven years old. The court's loyalty never belonged to him personally; it belonged to the memory of his father, and that memory faded quickly.

Muhammad Tapar captured Baghdad. Malik Shah II capitulated. And then — in one of the merciful episodes of dynastic politics — he was allowed to live. Muhammad Tapar was smart enough to understand that killing a small child was bad propaganda.

Malik Shah II lived the rest of his short life in the shadows — courteous captive, honoured guest, living proof of Muhammad Tapar's magnanimity. He probably died young of illness, date unknown.

What do we make of a life like this? Perhaps this: that not all historical figures are actors in their time. Sometimes they are victims of their dynasty's birthright — men and children whose names are used by others for purposes they never chose.`,
      tr: `40 yıl hüküm süren ve tarihte neredeyse hiç iz bırakmayan sultanlar var. Bir de felakete doğru giden bir imparatorluk hakkında tam bir hikayeyi anlatan altı haftayı biraz geçen saltanatıyla Melikşah II var.

Berkyaruk'un oğluydu — ölmekte olan babası tarafından Berkyaruk soyunu hayatta tutma umuduyla son çaresiz atamada belirlendi. Ama Muhammed Tapar orduları ile yolda zaten vardı. Melikşah II'nin pekişme, eleman toplama veya müzakere için vakti yoktu.

Bir çocuktu — tam yaşı bilinmiyor ama muhtemelen beş ila yedi yaş arasında. Sarayın sadakati ona şahsen asla ait olmadı; babasının anısına aitti ve bu anı hızla soluyordu.

Muhammed Tapar Bağdat'ı ele geçirdi. Melikşah II teslim oldu. Ve sonra — hanedanlık siyasetinin merhametli bölümlerinden birinde — yaşamasına izin verildi.

Melikşah II'nin geri kalan kısa hayatını gölgede geçirdi — nazik esir, onurlu misafir, Muhammed Tapar'ın büyüklüğünün canlı kanıtı. Muhtemelen genç yaşta hastalıktan öldü, tarihi bilinmiyor.`,
    },
    reforms: {
      sv: ["Inga reformer — ett barn under sex veckors nominellt sultanat"],
      en: ["No reforms — a child during six weeks of nominal sultanate"],
      tr: ["Reform yok — altı haftalık nominal sultanlık süresince bir çocuk"],
    },
    campaigns: {
      sv: ["Ingen kampanj — militär kontroll låg hos Barkiyaruq-dynastins kvarlevande anhängare"],
      en: ["No campaigns — military control lay with the remaining loyalists of the Barkiyaruq dynasty"],
      tr: ["Sefer yok — askeri kontrol Berkyaruk hanedanının kalan sadıklarındaydı"],
    },
    leadershipStyle: {
      sv: "Inget ledarskap var möjligt eller förväntades av ett barn på fem till sju år.",
      en: "No leadership was possible or expected from a child of five to seven years.",
      tr: "Beş ila yedi yaşındaki bir çocuktan liderlik ne mümkündü ne de beklendi.",
    },
    criticalPerspectives: {
      sv: "Malik Shah IIs existens i historien är ett argument mot dynastisk succession baserad på blod snarare än förtjänst. Seljukimperiets kroniska succession-instabilitet — som tillät ett barn att utnämnas som sultan — är en strukturell svaghet inbyggd i systemet.",
      en: "Malik Shah II's existence in history is an argument against dynastic succession based on blood rather than merit. The Seljuk Empire's chronic succession instability — which allowed a child to be appointed sultan — is a structural weakness built into the system.",
      tr: "Melikşah II'nin tarihte varlığı, kandan çok liyakate dayalı hanedanlık verasetine karşı bir argümandır. Selçuk İmparatorluğu'nun kronik veraset istikrarsızlığı — bir çocuğun sultan olarak atanmasına izin veren — sisteme yerleşik yapısal bir zayıflıktır.",
    },
  },

  // ─── MUHAMMAD I TAPAR (Full Enhanced) ─────────────────────────────────────
  {
    id: "muhammad-i-tapar",
    name: "Muhammad I Tapar (Ghiyath al-Din)",
    years: "1082–1118",
    title: { sv: "Fredens sultan — Imperiet sista stora återuppbyggare", en: "Sultan of Peace — The Empire's Last Great Rebuilder", tr: "Barışın Sultanı — İmparatorluğun Son Büyük Yeniden Kurucusu" },
    portrait: "🕊️",
    bio: {
      sv: `Muhammad I Tapar är en av de undervärderade Seljukkongligheterna — en man som ärvde ett imperium i kris och faktiskt lyckades stabilisera det, om än tillfälligt.

Han kämpade i år mot sin bror Barkiyaruq för kontroll av imperiet. Det är lätt att tolka dessa krig som enbart destruktiva — och de var destruktiva. Men de är också en historia om en man som trodde djupt på sin dynasty rätt att existera och kämpade för det med all tänkbar intensitet.

När Muhammad Tapar slutligen segrade 1105 och Barkiyaruq dog av sjukdom, stod han inför ett imperium som behövde läkas. Han var smart nog att förstå det.

Hans styre hade tre main prioriteter:

Först: re-centralisering. Atabegs — de turkiska militärguvernörer som hade vuxit till halvautonoma regenter — måste tyglas. Muhammad Tapar använde en kombination av diplomatisk charm och militärt hot för att hålla dem i schack.

Andra: Nizari Ismaili-hotet. Assassin-sekten — vars agent hade dödat Nizam al-Mulk — kontrollerade fortfarande bergsfästena i Persien. Muhammad Tapar ledde en systematisk kampanj mot dem, erövrade flera borgar och reducerade deras makt avsevärt.

Tredje: legitimitet. Han kultiverade relationen med Abbasidkalifaten mer aktivt än Barkiyaruq hade gjort. En av hans döttrar gifte sig med kalif al-Mustazhir — en allians av köttet snarare än bara ord.

Han dog 1118, 35 år gammal, och efterlämnade ett mer stabilt imperium än han ärvt. Det är inte ett dramatiskt arv. Men det är ett reellt.`,
      en: `Muhammad I Tapar is one of the Seljuk dynasty's most underrated rulers — a man who inherited an empire in crisis and actually managed to stabilise it, if temporarily.

He fought for years against his brother Barkiyaruq for control of the empire. It is easy to interpret these wars as purely destructive — and they were destructive. But they are also the story of a man who believed deeply in his dynasty's right to exist and fought for it with every conceivable intensity.

When Muhammad Tapar finally triumphed in 1105 and Barkiyaruq died of illness, he faced an empire that needed healing. He was smart enough to understand this.

His reign had three main priorities:

First: re-centralisation. The atabegs — the Turkish military governors who had grown into semi-autonomous regents — needed to be curbed. Muhammad Tapar used a combination of diplomatic charm and military threat to keep them in check.

Second: the Nizari Ismaili threat. The Assassin sect — whose agent had killed Nizam al-Mulk — still controlled mountain fortresses in Persia. Muhammad Tapar led a systematic campaign against them, capturing several fortresses and significantly reducing their power.

Third: legitimacy. He cultivated the relationship with the Abbasid caliphate more actively than Barkiyaruq had. One of his daughters married Caliph al-Mustazhir — an alliance of flesh rather than merely words.

He died in 1118, aged 35, leaving behind a more stable empire than he had inherited. That is not a dramatic legacy. But it is a real one.`,
      tr: `Muhammed I Tapar, Selçuk hanedanının en hafife alınan hükümdarlarından biri — kriz içindeki bir imparatorluğu miras alan ve geçici de olsa onu istikrara kavuşturmayı başaran bir adam.

İmparatorluğun kontrolü için kardeşi Berkyaruk'a karşı yıllarca savaştı. Bu savaşları yalnızca yıkıcı olarak yorumlamak kolaydır — ve yıkıcıydılar. Ama aynı zamanda hanedanının var olma hakkına derin inancı olan ve bunun için akla gelebilecek her yoğunlukla savaşan bir adamın hikayesidir.

Muhammed Tapar 1105'te nihayet zafer kazanıp Berkyaruk hastalıktan öldüğünde, iyileşmesi gereken bir imparatorlukla karşı karşıyaydı. Bunu anlayacak kadar zekiydi.

Saltanatının üç ana önceliği vardı:

Birincisi: yeniden merkezileşme. Atabegler — yarı özerk naiplere dönüşen Türk askeri valileri — dizginlenmeliydi.

İkincisi: Nizari İsmaili tehdidi. Haşhaşi mezhebi — Nizamülmülk'ü öldüren ajanı — İran'daki dağ kalelerini hâlâ kontrol ediyordu.

Üçüncüsü: meşruiyet. Abbasi halifeliğiyle ilişkiyi Berkyaruk'tan daha aktif biçimde besledi.

1118'de 35 yaşında öldü, miras aldığından daha istikrarlı bir imparatorluk bırakarak.`,
    },
    reforms: {
      sv: ["Återupprättandet av central auktoritet efter Barkiyaruqs inbördeskrig", "Systematisk kampanj mot Nizari Ismaili assassinerna i Persien", "Äktenskapsallians med Abbasidkalifaten för ökad religiös legitimitet", "Pacifieringen av de mäktigaste atabegs i Mesopotamien", "Reform av skatteindrivningssystemet i Khurasan"],
      en: ["Restoration of central authority after Barkiyaruq's civil war", "Systematic campaign against Nizari Ismaili assassins in Persia", "Marriage alliance with the Abbasid caliphate for increased religious legitimacy", "Pacification of the most powerful atabegs in Mesopotamia", "Reform of tax collection system in Khurasan"],
      tr: ["Berkyaruk'un iç savaşının ardından merkezi otoritenin yeniden sağlanması", "İran'daki Nizari İsmaili Haşhaşilere karşı sistematik kampanya", "Artırılmış dini meşruiyet için Abbasi halifeliğiyle evlilik ittifakı", "Mezopotamya'daki en güçlü atabeglerin pasifize edilmesi"],
    },
    campaigns: {
      sv: ["Inbördeskriget mot Barkiyaruq (1094–1105) — slutlig seger", "Kampanjen mot Nizari Ismailis borgar i Elburz-bergen", "Militär expedition mot rebeller i Syrien och Palestina", "Erövringen av Mosul från en upprorisk atebeg"],
      en: ["Civil war against Barkiyaruq (1094–1105) — final victory", "Campaign against Nizari Ismaili fortresses in the Elburz mountains", "Military expedition against rebels in Syria and Palestine", "Capture of Mosul from a rebellious atebeg"],
      tr: ["Berkyaruk'a karşı iç savaş (1094–1105) — nihai zafer", "Elburz dağlarındaki Nizari İsmaili kalelerine karşı sefer", "Suriye ve Filistin'deki isyancılara karşı askeri sefer", "İsyancı bir atabeğden Musul'un alınması"],
    },
    leadershipStyle: {
      sv: "Muhammad Tapar kombinerade en pragmatisk inställning med en djup religiös övertygelse. Han var en pious muslim och en kompetent administrator, men hans viktigaste egenskap var hans tålamod — förmågan att vänta, förhandla och i det rätta ögonblicket slå avgörande. Det är en sällsynt kvalitet bland de seljukiska sultanerna, de flesta av vilka föredrog direkta militära lösningar.",
      en: "Muhammad Tapar combined a pragmatic approach with deep religious conviction. He was a pious Muslim and competent administrator, but his most important quality was his patience — the ability to wait, negotiate and at the right moment strike decisively. This is a rare quality among the Seljuk sultans, most of whom preferred direct military solutions.",
      tr: "Muhammed Tapar pragmatik bir yaklaşımı derin dini inançla birleştirdi. Dindar bir Müslüman ve yetkin yöneticiydi, ama en önemli özelliği sabrıydı — bekleyebilme, müzakere edebilme ve doğru anda kararlı biçimde vurabilme becerisi. Bu, çoğu doğrudan askeri çözümleri tercih eden Selçuklu sultanları arasında nadir bir özelliktir.",
    },
    criticalPerspectives: {
      sv: "Muhammad Tapars arv är i slutändan tragiskt i sin adekvans snarare än sin storhet. Han stabiliserade ett imperium men kunde inte lösa dess strukturella problem — den decentraliserade atabegsystemet, sukessionssystemets svaghet, Assassinernas fortlöpande hot, och Korsfararkungadömenas närvaro i väst. Hans söner skulle ärva alla dessa problem utan Muhammads politiska skicklighet att hantera dem.",
      en: "Muhammad Tapar's legacy is ultimately tragic in its adequacy rather than its greatness. He stabilised an empire but could not resolve its structural problems — the decentralised atebeg system, the succession system's weakness, the Assassins' continued threat, and the Crusader kingdoms' presence in the west. His sons would inherit all these problems without Muhammad's political skill to manage them.",
      tr: "Muhammed Tapar'ın mirası nihayetinde büyüklüğünden çok yeterliğinde trajiktir. Bir imparatorluğu istikrara kavuşturdu ama yapısal sorunlarını çözemedi — merkezi olmayan atebeg sistemi, veraset sisteminin zayıflığı, Haşhaşilerin süregelen tehdidi ve Haçlı krallıklarının batıdaki varlığı. Oğulları tüm bu sorunları Muhammed'in onları yönetme siyasi becerisi olmadan miras alacaktı.",
    },
  },

  // ─── MAHMUD II (Enhanced) ──────────────────────────────────────────────────
  {
    id: "mahmud-ii",
    name: "Mahmud II",
    years: "ca. 1100–1131",
    title: { sv: "Västsultanens kämpe — Skuggan av Sanjar", en: "The Western Sultan's Fighter — Sanjar's Shadow", tr: "Batı Sultanının Savaşçısı — Sencer'in Gölgesi" },
    portrait: "⚔️",
    bio: {
      sv: `Mahmud II, son till Muhammad I Tapar, är ett av de mer komplexa men historiskt underbelysta exemplen på Seljukisk statskonst i nedgångens era.

Han regerade det västra Seljukimperiet — Irak, Persien, Syrien — 1118–1131, parallellt med Sanjars östliga välde. Strukturellt var hans position omöjlig: han var nominellt den överordnade sultanen av det västra imperiet, men Sanjar — som äldre son till Malik Shah I — krävde överhöghet. De flesta av de mäktiga atabegs lydde av vana och opportunism snarare än verklig lojalitet.

Mahmud II:s karakteristiska egenskap var hans uthållighet. Han kämpade år på år mot upproriska atabegs, förhandlade med Abbasidkalifaten om stöd, och höll det minimala samman av ett imperium i splittring. Det är inte glamoröst. Det är det riktiga arbetet av att styra ett fragment av en forna storhet.

Hans förhållande till Sanjar var komplext: en blandning av rivalitet och tacksamhet. Sanjar var å ena sidan en hotande faktor — hans anspråk på överhöghet var konstant. Men Sanjar var å andra sidan ett skydd: så länge Sanjar existerade och var stark i öst, vågade inte Mahmud IIs atabegs eller externa fiender gå för långt.

Han dog 1131 av sjukdom — historikerna nämner "hushållets sjukdom," möjligen tuberkulos eller dysntéri. Hans söner ärvde hans problem utan hans politiska instinkt.

Mahmud II är glömd av alla utom de mest detaljerade historikerna av det Seljukiska imperiet. Det är ett orättvist öde för en man som höll samman ett halvt imperium i 13 år.`,
      en: `Mahmud II, son of Muhammad I Tapar, is one of the more complex but historically underlit examples of Seljuk statecraft in the era of decline.

He ruled the western Seljuk Empire — Iraq, Persia, Syria — 1118–1131, parallel to Sanjar's eastern domain. Structurally his position was impossible: he was nominally the superior sultan of the western empire, but Sanjar — as an older son of Malik Shah I — claimed supremacy. Most of the powerful atabegs obeyed from habit and opportunism rather than genuine loyalty.

Mahmud II's characteristic quality was his persistence. He fought year after year against rebellious atabegs, negotiated with the Abbasid caliphate for support, and held the minimal remnant of an empire in fragmentation together. This is not glamorous. This is the real work of governing a fragment of former greatness.

His relationship with Sanjar was complex: a mixture of rivalry and gratitude. Sanjar was on one hand a threatening factor — his claim to supremacy was constant. But Sanjar was on the other hand a protection: as long as Sanjar existed and was strong in the east, Mahmud II's atabegs and external enemies did not dare go too far.

He died in 1131 of illness — historians mention "household sickness," possibly tuberculosis or dysentery. His sons inherited his problems without his political instinct.

Mahmud II is forgotten by all but the most detailed historians of the Seljuk Empire. That is an unfair fate for a man who held half an empire together for 13 years.`,
      tr: `Muhammed I Tapar'ın oğlu Mahmud II, Selçuk devlet sanatının gerileme çağındaki daha karmaşık ama tarihsel olarak az aydınlatılmış örneklerinden biridir.

Sencer'in doğu egemenliğine paralel olarak 1118–1131 yılları arasında batı Selçuk İmparatorluğu'nu — Irak, İran, Suriye — yönetti. Yapısal olarak konumu imkânsızdı: nominalde batı imparatorluğunun üstün sultanıydı, ama Melikşah I'in daha büyük oğlu olarak Sencer üstünlük iddia ediyordu.

Mahmud II'nin karakteristik özelliği ısrarıydı. Yıl yıl isyancı atabeglere karşı savaştı, destek için Abbasi halifeliğiyle müzakere etti ve parçalanmakta olan bir imparatorluğun asgari kalıntısını bir arada tuttu.

Sencer ile ilişkisi karmaşıktı: rekabet ve minnet karışımı. Bir yandan Sencer tehdit edici bir faktördü. Ama diğer yandan bir koruma da sağlıyordu: Sencer doğuda var olduğu ve güçlü kaldığı sürece, Mahmud II'nin atabegleri ve dış düşmanları çok ileri gitmeye cesaret edemiyordu.

1131'de hastalıktan öldü. Oğulları, onun siyasi sezgisi olmadan sorunlarını miras aldı.`,
    },
    reforms: {
      sv: ["Upprätthållandet av formal Seljukisk auktoritet i väst mot atabegarnas sönderfall", "Diplomatisk allians med Abbasidkalifaten och periodsvis militärt samarbete", "Temporär återerövrande av Mosul och norra Irak från upproriska provinshövdingar"],
      en: ["Maintenance of formal Seljuk authority in the west against atabegs' fragmentation", "Diplomatic alliance with the Abbasid caliphate and periodic military cooperation", "Temporary reconquest of Mosul and northern Iraq from rebellious provincial lords"],
      tr: ["Batıda atabeglerin parçalanmasına karşı biçimsel Selçuklu otoritesinin sürdürülmesi", "Abbasi halifeliğiyle diplomatik ittifak ve periyodik askeri işbirliği", "İsyancı il beyleri tarafından geçici olarak Musul ve kuzey Irak'ın geri alınması"],
    },
    campaigns: {
      sv: ["Krigen mot atabegs av Mosul (Zengids) och Azerbaijan", "Konflikt med sin farbror Sanjar om imperial överhöghet (förhandlad lösning 1120)", "Kampanjer mot Assassin-sektens fästningar i västra Persien"],
      en: ["Wars against atabegs of Mosul (Zengids) and Azerbaijan", "Conflict with his uncle Sanjar over imperial supremacy (negotiated resolution 1120)", "Campaigns against Assassin sect fortresses in western Persia"],
      tr: ["Musul (Zengiler) ve Azerbaycan atabeglerine karşı savaşlar", "İmparatorluk üstünlüğü için amcası Sencer ile çatışma (1120'de müzakere edilmiş çözüm)", "Batı İran'daki Haşhaşi mezhebinin kalelerine karşı seferler"],
    },
    leadershipStyle: {
      sv: "Mahmud II regerade med kombination av diplomatisk flexibilitet och militär fasthet. Han var inte en militär genialisk som Alp Arslan eller en administrativ titan som Nizam al-Mulk — men han var en solide pragmatisk styrare i en era som krävde pragmatism framför grandiositet.",
      en: "Mahmud II ruled with a combination of diplomatic flexibility and military firmness. He was not a military genius like Alp Arslan or an administrative titan like Nizam al-Mulk — but he was a solid pragmatic ruler in an era that demanded pragmatism over grandiosity.",
      tr: "Mahmud II, diplomatik esneklik ve askeri kararlılık kombinasyonuyla hüküm sürdü. Alparslan gibi askeri bir dahi ya da Nizamülmülk gibi idari bir titan değildi — ama ihtişamdan çok pragmatizmi gerektiren bir çağda sağlam pragmatik bir yöneticiydi.",
    },
    criticalPerspectives: {
      sv: "Mahmud IIs styre misslyckas ultimativt av orsaker bortom hans kontroll. Det är svårt att kritisera hans specifika beslut när systemet han styrde var fundamentalt broken — en succession av mäktiga atabegs, en saknad civil militärkontroll, och ett brorss (Sanjars) dominerande position som underminerade hans auktoritet dagligen.",
      en: "Mahmud II's reign ultimately fails for reasons beyond his control. It is difficult to critique his specific decisions when the system he governed was fundamentally broken — a succession of powerful atabegs, absent civilian military control, and a brother's (Sanjar's) dominant position that undermined his authority daily.",
      tr: "Mahmud II'nin saltanatı nihayetinde kontrolü dışındaki nedenlerle başarısız olur. Yönettiği sistem temelden kırık olduğunda — güçlü atabeglerin veraseti, sivil askeri kontrolün yokluğu ve otoritesini günlük olarak zayıflatan bir kardeşin (Sencer'in) baskın konumu — belirli kararlarını eleştirmek güçtür.",
    },
  },

  // ─── DAWUD / TOGHRUL II / MASUD I / MALIK SHAH III / MUHAMMAD II / SULEIMAN SHAH / ARSLAN SHAH ──
  // (continuing with same detailed approach)

  {
    id: "dawud",
    name: "Dawud (Toghrul II)",
    years: "ca. 1105–1132",
    title: { sv: "Den kortvarige — En sultan som historien glömde", en: "The Brief One — A Sultan History Forgot", tr: "Kısa Süren — Tarihin Unuttuğu Sultan" },
    portrait: "⚡",
    bio: {
      sv: `Dawud, alias Toghrul II, är ett av de mest undanskymda namnen i Seljukisk dynasti-historia. Han regerade i knappt ett år, 1131–1132, och hans 'styre' är mer ett administrativt interregnum än ett verkligt sultanat.

Han var son till Muhammad I Tapar och bror till Mahmud II, utsedd efter sin brors bortgång av ett hovet i Bagdad som behövde en sultan snabbt. Men Sanjars hand sträckte sig från öst — Sanjar tvingade att Mahmud IIs son Dawud ersattes av sin bror Masud.

Dawuds korta tid som sultan ger oss en inblick i hur urgröpt den centrala Seljuksautoriteten blivit vid 1130-talet. En sultan kan utses och avsättas på månader — inte av militär revolt utan av en annan sultans vilja, av en atebeg som svänger om sin lojalitet, av en kalif som ser möjligheten att öka sitt inflytande.

Det är systemolets mekanik snarare än individuellt ledarskap som definierar Dawuds korta tid.

Han levde sannolikt till 1140-talet, i skuggan av hovet, ett levande minne av att dynastin hade fler pretendenter än platser.`,
      en: `Dawud, alias Toghrul II, is one of the most obscure names in Seljuk dynastic history. He reigned for barely a year, 1131–1132, and his 'reign' is more an administrative interregnum than a true sultanate.

He was son of Muhammad I Tapar and brother of Mahmud II, appointed after his brother's passing by a Baghdad court that needed a sultan quickly. But Sanjar's hand reached from the east — Sanjar forced that Mahmud II's son Dawud be replaced by his brother Masud.

Dawud's brief time as sultan gives us a glimpse into how hollowed out the central Seljuk authority had become by the 1130s. A sultan can be appointed and deposed within months — not by military revolt but by another sultan's will, by an atebeg who switches his loyalty, by a caliph who sees the opportunity to increase his influence.

It is the mechanics of systemic failure rather than individual leadership that defines Dawud's brief time.

He probably lived until the 1140s, in the court's shadow, a living reminder that the dynasty had more pretenders than thrones.`,
      tr: `Davud, diğer adıyla Tuğrul II, Selçuklu hanedanlık tarihinin en bilinmez isimlerinden biridir. 1131–1132 yılları arasında neredeyse bir yıl hüküm sürdü ve 'saltanatı' gerçek bir sultanlıktan çok idari bir ara dönemdir.

Muhammed I Tapar'ın oğlu ve Mahmud II'nin kardeşi, Bağdat sarayı hızla bir sultana ihtiyaç duyduğunda kardeşinin ölümünün ardından atandı. Ama Sencer'in eli doğudan uzandı — Sencer, Mahmud II'nin oğlu Davud'un kardeşi Mesud tarafından değiştirilmesini dayattı.

Davud'un sultan olarak geçirdiği kısa süre, 1130'larda merkezi Selçuklu otoritesinin ne kadar içten çürüdüğüne dair bir bakış açısı sunar. Bir sultan aylarca atanıp görevden alınabilir — askeri isyanla değil, başka bir sultanın iradesiyle, sadakatini değiştiren bir atabeğin etkisiyle, nüfuzunu artırma fırsatı gören bir halifenin müdahalesiyle.

Davud'un kısa dönemini tanımlayan bireysel liderlikten çok sistemsel başarısızlığın mekaniğidir.`,
    },
    reforms: { sv: ["Inga kända reformer under kortvarigt styre"], en: ["No known reforms during brief reign"], tr: ["Kısa saltanat süresince bilinen reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer — makt var i Sanjars och atabegarnas händer"], en: ["No known military campaigns — power was in Sanjar's and the atabegs' hands"], tr: ["Bilinen askeri sefer yok — güç Sencer'in ve atabeglerin elindeydi"] },
    leadershipStyle: { sv: "Inget meningsfullt ledarskap möjligt under ett interregnum av månaders längd.", en: "No meaningful leadership possible during an interregnum of months' length.", tr: "Aylarca süren bir ara dönemde anlamlı liderlik mümkün değildi." },
    criticalPerspectives: {
      sv: "Dawuds existens påminner oss om att imperiums fall inte alltid är dramatiska. Ibland är det en lång, tråkig, byråkratisk upplösning — sultan efter sultan utsedd och avsatt, atebeg efter atebeg som tar mer autonomi, kalif efter kalif som fyller maktvakuumet.",
      en: "Dawud's existence reminds us that empires' falls are not always dramatic. Sometimes it is a long, tedious, bureaucratic dissolution — sultan after sultan appointed and deposed, atebeg after atebeg taking more autonomy, caliph after caliph filling the power vacuum.",
      tr: "Davud'un varlığı bize imparatorlukların çöküşünün her zaman dramatik olmadığını hatırlatır. Bazen uzun, sıkıcı, bürokratik bir çözülmedir — sultan sultan atanıp görevden alınır, atebeg atebeg daha fazla otonomi alır, halife halife güç boşluğunu doldurur.",
    },
  },

  {
    id: "toghrul-ii",
    name: "Toghrul II (Ibn Muhammad)",
    years: "ca. 1109–1135",
    title: { sv: "Kharasans regent — Brorslösa konungens kamp", en: "Regent of Khurasan — The Brotherhood-Less King's Struggle", tr: "Horasan'ın Naibı — Kardeşsiz Kralın Mücadelesi" },
    portrait: "🏛️",
    bio: {
      sv: `Toghrul II, son till Muhammad I Tapar, regerade 1132–1135 och representerar ännu ett exempel på hur det seljukiska successionsystemet skapade sultaner som var snarare verktyg för andras ambitioner än självständiga aktörer.

Hans styre uppstod ur det politiska vakuum som Dawuds avsättning skapade. Sanjar — alltid den drivande kraften bakom de västra sultanernas val — föredrog Toghrul II framför andra pretendenter av skäl som vi inte säkert vet. Möjligen var det hans militärt temperament, möjligen hans brist på egna ambitiösa allierade som gjorde honom säkrare att kontrollera.

Toghrul II regerade i ett land av atabegs — de turkiska militärguvernörer vars faktiska makt hade vuxit till den grad att sultantiteln var ceremoniell mer än verklig. Han kämpade mot Zengi-dynastins inflytande i norr och mot den abbasidiska kalifens ökade självhävdelse i söder.

Det mest anmärkningsvärda med Toghrul II är kanske inte vad han gjorde — utan det faktum att hans 3-åriga styre bringade ett minimum av stabilitet till ett imperium som nästan tappat förmågan att vara stabilt.

Han dog 1135, möjligen av sjukdom, möjligen av de konsekvenser av ett liv av kampjande mot strukturella krafter långt starkare än honom själv.`,
      en: `Toghrul II, son of Muhammad I Tapar, reigned 1132–1135 and represents yet another example of how the Seljuk succession system created sultans who were tools for others' ambitions rather than independent actors.

His reign arose from the political vacuum that Dawud's deposition created. Sanjar — always the driving force behind the western sultans' choices — preferred Toghrul II over other pretenders for reasons we do not know for certain. Possibly his military temperament, possibly his lack of his own ambitious allies making him safer to control.

Toghrul II reigned in a land of atabegs — the Turkish military governors whose actual power had grown to the point where the sultan title was ceremonial rather than real. He fought against the Zengi dynasty's influence in the north and against the Abbasid caliph's increasing self-assertion in the south.

What is most remarkable about Toghrul II is perhaps not what he did — but the fact that his 3-year reign brought a minimum of stability to an empire that had almost lost the ability to be stable.

He died in 1135, possibly of illness, possibly of the consequences of a life of fighting structural forces far stronger than himself.`,
      tr: `Muhammed I Tapar'ın oğlu Tuğrul II, 1132–1135 yılları arasında hüküm sürdü ve Selçuklu veraset sisteminin bağımsız aktörlerden çok başkalarının hırsları için araçlar olan sultanlar yarattığının bir diğer örneğini temsil ediyor.

Saltanatı, Davud'un tahttan indirilmesinin yarattığı siyasi boşluktan doğdu. Sencer — her zaman batı sultanların seçimlerinin ardındaki itici güç — kesin olarak bilmediğimiz nedenlerle diğer adaylar yerine Tuğrul II'yi tercih etti.

Tuğrul II, atabeglerin ülkesinde — sultan unvanının gerçek olmaktan çok törensel hale geldiği noktaya kadar fiili gücü büyümüş Türk askeri valilerin ülkesinde — hüküm sürdü.

Tuğrul II hakkında en dikkat çekici olan, belki de ne yaptığı değil — 3 yıllık saltanatının, neredeyse istikrar olabilme yeteneğini yitirmiş bir imparatorluğa asgari istikrar getirmesidir.`,
    },
    reforms: { sv: ["Temporär stabilisering av västra Seljukimperiets förvaltning"], en: ["Temporary stabilisation of the western Seljuk Empire's administration"], tr: ["Batı Selçuk İmparatorluğu yönetiminin geçici istikrarlaşması"] },
    campaigns: { sv: ["Konflikter med Zengi-dynastin i Mosul och Syrien", "Defensiva operationer mot korsfararkungadömena"], en: ["Conflicts with the Zengi dynasty in Mosul and Syria", "Defensive operations against the Crusader kingdoms"], tr: ["Musul ve Suriye'deki Zengi hanedanlığıyla çatışmalar", "Haçlı krallıklarına karşı savunma operasyonları"] },
    leadershipStyle: { sv: "Militärt direkt och personligt engagerad, men hindrad av strukturella begränsningar bortom hans kontroll.", en: "Militarily direct and personally engaged, but hindered by structural limitations beyond his control.", tr: "Askeri açıdan doğrudan ve kişisel olarak bağlı, ama kontrolü dışındaki yapısal kısıtlamalar tarafından engellendi." },
    criticalPerspectives: {
      sv: "Toghrul II är ett typexempel på vad historiker kallar ett 'strukturellt offer' — en individ vars historiska roll mer definieras av det system han opererade i än av hans egna egenskaper.",
      en: "Toghrul II is a typical example of what historians call a 'structural victim' — an individual whose historical role is more defined by the system he operated within than by his own qualities.",
      tr: "Tuğrul II, tarihçilerin 'yapısal kurban' dediği şeyin tipik örneğidir — tarihsel rolü kendi özelliklerinden çok içinde faaliyet gösterdiği sistem tarafından tanımlanan bir birey.",
    },
  },

  {
    id: "masud-i",
    name: "Masud I (Ghiyath al-Din)",
    years: "ca. 1105–1152",
    title: { sv: "Nedgångens administratör — 17 år vid ratten av ett sjunkande skepp", en: "Administrator of the Decline — 17 Years at the Wheel of a Sinking Ship", tr: "Gerilemenin Yöneticisi — Batan Bir Geminin Dümeninde 17 Yıl" },
    portrait: "📋",
    bio: {
      sv: `Masud I, son till Muhammad I Tapar, regerade det västra Seljukimperiet 1135–1152 — 17 år, den längsta regeringstiden bland de senaste Seljukkungarna av Irak — och hans arv är en studie i vad det innebär att styra ett imperium i terminalfas med kompetens men utan makt att vända kursen.

Han ärvde en stat vars centrala auktoritet hade eroderat i 40 år. Atabegs — de turkiska militärgouvernörerna — var nu de facto suveräner av sina provinser. De betalade tribut ibland. De lydde order sällan. De ansökte om sultanens välsignelse som en formell gest, inte en rättighet.

Masud I förstod sin situation klart. Han kan ha gråtit i sina privata gemak, persisk poesi berättar att han var en kultiverad man med djup känsla — men offentligt var han pragmatisk och metodisk.

Hans prioriteter:

1. Hålla Abbasidkalifaten neutral — inte fientlig. Kalif al-Muqtafi var en mer ambitiös kalif än sina föregångare och såg i Seljukernas svaghet en möjlighet att återvinna politisk makt. Masud balanserade noggrant.

2. Hålla Zengiderna (Zengi-dynastin i Mosul) i schack. Imad ad-Din Zengi, och sedan hans son Nur ad-Din, var den nya islamiska stormakten — enade, expansiva, och med ökande religiös legitimitet efter erövringen av Edessa 1144 (det första korsfararkungadömet att falla). Masud kunde inte besegra dem men han behövde deras respekt.

3. Upprätthålla illusionen av central auktoritet länge nog för att hans söner skulle ärva någonting.

Det lyckades han med. Seljukimperiet av Irak — ett fragment av ett fragment av det forna stora imperiet — existerade formellt i ytterligare 42 år efter hans bortgång.

Det är kanske Masud Is bästa arv: han köpte tid.`,
      en: `Masud I, son of Muhammad I Tapar, ruled the western Seljuk Empire 1135–1152 — 17 years, the longest reign among the later Seljuk kings of Iraq — and his legacy is a study in what it means to govern an empire in terminal phase with competence but without power to reverse course.

He inherited a state whose central authority had eroded for 40 years. Atabegs — the Turkish military governors — were now de facto sovereigns of their provinces. They paid tribute sometimes. They obeyed orders rarely. They requested the sultan's blessing as a formal gesture, not a right.

Masud I understood his situation clearly. He may have wept in his private chambers — Persian poetry records that he was a cultivated man of deep feeling — but in public he was pragmatic and methodical.

His priorities:

1. Keep the Abbasid caliphate neutral — not hostile. Caliph al-Muqtafi was a more ambitious caliph than his predecessors and saw in the Seljuks' weakness an opportunity to regain political power. Masud balanced carefully.

2. Keep the Zengids (Zengi dynasty of Mosul) in check. Imad ad-Din Zengi, and then his son Nur ad-Din, were the new Islamic great power — united, expansive, with growing religious legitimacy after the conquest of Edessa in 1144 (the first Crusader kingdom to fall). Masud could not defeat them but needed their respect.

3. Maintain the illusion of central authority long enough for his sons to inherit something.

He succeeded. The Seljuk Empire of Iraq — a fragment of a fragment of the once great empire — formally existed for another 42 years after his passing.

That may be Masud I's best legacy: he bought time.`,
      tr: `Muhammed I Tapar'ın oğlu Mesud I, 1135–1152 yılları arasında batı Selçuk İmparatorluğu'nu yönetti — 17 yıl, Irak'ın geç Selçuklu kralları arasındaki en uzun saltanat — ve mirası, seyri tersine çevirme gücü olmaksızın yetkinlikle terminal aşamasındaki bir imparatorluğu yönetmenin ne anlama geldiğinin bir incelemesidir.

Merkezi otoritesinin 40 yıldır eridiği bir devlet miras aldı. Atabegler — Türk askeri valileri — artık eyaletlerinin fiili egemenleriydi. Bazen haraç ödüyorlardı. Nadir olarak emre itaat ediyorlardı.

Mesud I durumunu açıkça anlıyordu. Özel odalarında ağlamış olabilir — Farsça şiiri onun derin duygularla dolu kültürlü bir adam olduğunu kaydediyor — ama alenen pragmatik ve metodikti.

Öncelikleri:

1. Abbasi halifeliğini nötr tutmak — düşman değil.

2. Zengiler'i (Musul'daki Zengi hanedanı) kontrol altında tutmak.

3. Oğullarının bir şey miras alması için merkezi otoritenin yanılsamasını yeterince uzun süre korumak.

Başardı. Irak Selçuklu İmparatorluğu — bir zamanlar büyük imparatorluğun parçasının parçası — ölümünden sonra resmi olarak 42 yıl daha var oldu.`,
    },
    reforms: {
      sv: ["Diplomatisk balansering mellan Abbasidkalifaten och Zengi-dynastin", "Kompromisserade överenskommelser med atabegs för att förhindra öppen revolt", "Militär reorganisation av de centrala sultansstyrkorna"],
      en: ["Diplomatic balancing between the Abbasid caliphate and Zengi dynasty", "Compromise agreements with atabegs to prevent open revolt", "Military reorganisation of the central sultanic forces"],
      tr: ["Abbasi halifeliği ile Zengi hanedanı arasında diplomatik denge", "Açık isyanı önlemek için atabegleri ile uzlaşma anlaşmaları", "Merkezi sultanlık kuvvetlerinin askeri yeniden örgütlenmesi"],
    },
    campaigns: {
      sv: ["Krigen mot upproriska atabegs i Azerbajdzjan (1138)", "Konflikten med Zengi-dynastin om Mosul (1143–1147)", "Diplomatiska förhandlingar med korsfarare om vapenvila"],
      en: ["Wars against rebellious atabegs in Azerbaijan (1138)", "Conflict with the Zengi dynasty over Mosul (1143–1147)", "Diplomatic negotiations with Crusaders over truces"],
      tr: ["Azerbaycan'daki isyancı atabeglere karşı savaşlar (1138)", "Musul için Zengi hanedanlığıyla çatışma (1143–1147)", "Haçlılarla ateşkes için diplomatik müzakereler"],
    },
    leadershipStyle: {
      sv: "Masud I var en administrativ realist — han styrde inte med visioner om restaurering av imperiet utan med precision om vad som var möjligt givet hans begränsade resurser. Hans förmåga att överleva politiskt i 17 år i en omöjlig situation är i sig ett bevis på kompetens.",
      en: "Masud I was an administrative realist — he governed not with visions of imperial restoration but with precision about what was possible given his limited resources. His ability to survive politically for 17 years in an impossible situation is itself evidence of competence.",
      tr: "Mesud I, idari bir realistdi — imparatorluğun yeniden kurulması vizyonlarıyla değil, sınırlı kaynakları göz önüne alındığında nelerin mümkün olduğuna dair kesinlikle hüküm sürdü. İmkansız bir durumda 17 yıl siyasi olarak hayatta kalma becerisi başlı başına yetkinliğin kanıtıdır.",
    },
    criticalPerspectives: {
      sv: "Masud I hade kanske kunnat göra mer för att reforma de grundläggande systemen — atabegarnas halvautonomi, successionsreglerna, den militäre finansieringen. Historikerna debatterar om hans pragmatism var visdom eller kapitulation. Det som är säkert är att de grundläggande problemen överlevde hans styre och förstörde hans arvtagares chanser.",
      en: "Masud I could perhaps have done more to reform the fundamental systems — the atabegs' semi-autonomy, succession rules, military financing. Historians debate whether his pragmatism was wisdom or capitulation. What is certain is that the fundamental problems survived his reign and destroyed his heirs' chances.",
      tr: "Mesud I belki temel sistemleri — atabeglerin yarı özerkliği, veraset kuralları, askeri finansman — reform etmek için daha fazlasını yapabilirdi. Tarihçiler, pragmatizminin bilgelik mi yoksa teslim mi olduğunu tartışıyor. Kesin olan şey, temel sorunların saltanatını atlattığı ve mirasçılarının şanslarını yok ettiğidir.",
    },
  },

  {
    id: "malik-shah-iii",
    name: "Malik Shah III",
    years: "ca. 1130–1153",
    title: { sv: "Den siste av huvudlinjen — En kort soluppgång", en: "The Last of the Main Line — A Brief Sunrise", tr: "Ana Kolun Sonuncusu — Kısa Bir Gün Doğumu" },
    portrait: "🌅",
    bio: {
      sv: `Malik Shah III regerade i ungefär ett år — 1152–1153 — och hans tid är historiens kortaste antecknings om en mans kamp mot det oundvikliga.

Han var son till Masud I och den siste sultanen av det centrala Seljukimperiets direkta Irak-linje — åtminstone tillfälligt. Han avsattes av sin farbror Muhammad II som ansåg att en mogen man med politisk erfarenhet var bättre lämpad att möta de kriser imperiet stod inför.

Det är möjligt att Malik Shah III var ung — kanske 20-25 år gammal — vid sin tronbestigning. Det är möjligt att han var begåvad. Men begåvning räckte inte i ett system vars alla spänningar — atabegas autonomi, kalifer ambition, Zengi-dynastins frammarsch — konvergerade mot ett imperium som hade överlåtit tid.

Hans namn är "Kung av Kungar" — samma titel som hans berömde urfader Malik Shah I burit. Men titeln är allt som är gemensamt.

Han lever troligen till 1160-talet, en glömd prins i ett glömt hovet, med ett storartat namn och ingen historia att fylla det med.`,
      en: `Malik Shah III reigned for approximately one year — 1152–1153 — and his time is history's briefest note about a man's struggle against the inevitable.

He was son of Masud I and the last sultan of the central Seljuk Empire's direct Iraq line — at least temporarily. He was deposed by his uncle Muhammad II who considered that a mature man with political experience was better suited to face the crises the empire confronted.

It is possible that Malik Shah III was young — perhaps 20-25 years old — at his enthronement. It is possible he was talented. But talent was not enough in a system whose every tension — the atabegs' autonomy, the caliphs' ambition, the Zengi dynasty's advance — converged toward an empire that had outlived its time.

His name is "King of Kings" — the same title his famous ancestor Malik Shah I had borne. But the title is all they have in common.

He probably lived until the 1160s, a forgotten prince in a forgotten court, with a grand name and no history to fill it with.`,
      tr: `Melikşah III yaklaşık bir yıl — 1152–1153 — hüküm sürdü ve zamanı, bir adamın kaçınılmazdaki mücadelesi hakkında tarihin en kısa notidir.

Mesud I'in oğlu ve merkezi Selçuk İmparatorluğu'nun doğrudan Irak kolunun son sultanıydı — en azından geçici olarak. İmparatorluğun karşı karşıya olduğu krizleri karşılamak için siyasi deneyime sahip olgun bir adamın daha uygun olduğunu düşünen amcası Muhammed II tarafından tahttan indirildi.

Melikşah III'ün tahta çıktığında genç olması mümkün — belki 20-25 yaşında. Yetenekli olması mümkün. Ama yetenek, her geriliminin — atabeglerin özerkliği, halifelerin hırsı, Zengi hanedanının ilerleyişi — zamanını doldurmuş bir imparatorluğa doğru yakınsadığı bir sistemde yetmiyordu.

Adı "Şahlar Şahı" — ünlü ceddi Melikşah I'in taşıdığı aynı unvan. Ama ortak olan yalnızca unvandır.`,
    },
    reforms: { sv: ["Inga kända substantiella reformer under ett-årig styre"], en: ["No known substantial reforms during one-year reign"], tr: ["Bir yıllık saltanat süresince bilinen önemli reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer"], en: ["No known military campaigns"], tr: ["Bilinen askeri sefer yok"] },
    leadershipStyle: { sv: "Otillräckliga historiska uppgifter för en meningsfull analys av ledarstil.", en: "Insufficient historical records for meaningful analysis of leadership style.", tr: "Liderlik tarzının anlamlı analizi için yetersiz tarihsel kayıtlar." },
    criticalPerspectives: {
      sv: "Malik Shah IIIs korta styre är mer symptom än orsak. Det representerar inte ett misslyckande av individen utan ett misslyckande av systemet — ett succession system som producerade sultaner snabbare än historien kunde ge dem rum.",
      en: "Malik Shah III's brief reign is more symptom than cause. It represents not the failure of an individual but the failure of a system — a succession system that produced sultans faster than history could give them space.",
      tr: "Melikşah III'ün kısa saltanatı nedendan çok semptomdur. Bir bireyin başarısızlığını değil bir sistemin başarısızlığını temsil eder — tarihin onlara yer veremeyeceği kadar hızlı sultan üreten bir veraset sistemi.",
    },
  },

  {
    id: "muhammad-ii",
    name: "Muhammad II (Rukn al-Din)",
    years: "ca. 1120–1159",
    title: { sv: "Upplösningstidens sultan — Sista kampen för en dynasty", en: "Sultan of the Dissolution Age — Last Fight for a Dynasty", tr: "Çözülme Çağının Sultanı — Bir Hanedan İçin Son Dövüş" },
    portrait: "📉",
    bio: {
      sv: `Muhammad II avsatte sin nevö Malik Shah III 1153 och tog sultanstiteln — inte av egennytta, berättar persiska kröniker, utan av desperation. Han var övertygad om att ett äldre, mer erfaret huvud behövdes för att möta de kriser som hotade imperiet.

Han hade delvis rätt.

Under hans styre (1153–1159) lyckades han hålla samman det minimala kärnan av Seljukisk auktoritet i Irak. Han förhindrade en omedelbar Zengi-erövring. Han upprätthöll relationen med Abbasidkalifaten. Han undvek det totala politiska kollapset.

Men "undvika kollaps" är en låg ribba för ett imperiums berättelse. Muhammad II var inte mannen som återupplivade Seljukimperiet — han var mannen som fördröjde dess slutliga dödsfall med ett decennium.

Och kanske det är tillräckligt. Kanske det var allt som var möjligt.

Han dog 1159, möjligen av sjukdom, och efterlämnade ett imperium som hans brorsson Suleiman Shah kortvarigt skulle styra.

Muhammad II är en av Seljukhistoriens anonyma rättvisekämpar — en man som kämpade för ett skepp som redan hade gått under, och vars enda vinst var att fördröja det oundvikliga med lite mer tid.`,
      en: `Muhammad II deposed his nephew Malik Shah III in 1153 and took the sultan title — not out of self-interest, Persian chronicles report, but out of desperation. He was convinced that an older, more experienced head was needed to face the crises threatening the empire.

He was partly right.

During his reign (1153–1159) he managed to hold together the minimal core of Seljuk authority in Iraq. He prevented an immediate Zengi conquest. He maintained the relationship with the Abbasid caliphate. He avoided total political collapse.

But "avoiding collapse" is a low bar for an empire's story. Muhammad II was not the man who revived the Seljuk Empire — he was the man who delayed its final death by a decade.

And perhaps that is enough. Perhaps that was all that was possible.

He died in 1159, possibly of illness, leaving an empire that his nephew Suleiman Shah would briefly rule.

Muhammad II is one of Seljuk history's anonymous fighters for justice — a man who fought for a ship that had already sunk, whose only victory was to delay the inevitable by a little more time.`,
      tr: `Muhammed II, 1153'te yeğeni Melikşah III'ü tahttan indirdi ve sultan unvanını aldı — Farsça kronikler, çıkar için değil çaresizlikten, diye aktarıyor. İmparatorluğu tehdit eden krizlere karşı daha yaşlı, daha deneyimli bir kafanın gerektiğine ikna olmuştu.

Kısmen haklıydı.

Saltanatı (1153–1159) boyunca Irak'taki Selçuklu otoritesinin asgari çekirdeğini bir arada tutmayı başardı. Anlık bir Zengi fethini engelledi. Abbasi halifeliğiyle ilişkiyi korudu. Toplam siyasi çöküşü önledi.

Ama "çöküşü önlemek", bir imparatorluğun hikayesi için düşük bir çıtadır. Muhammed II Selçuklu İmparatorluğu'nu dirilten adam değildi — son ölümünü on yıl erteleyendi.

Ve belki bu yeterlidir. Belki mümkün olan tek şey buydu.

1159'da, muhtemelen hastalıktan, öldü ve yeğeni Süleyman Şah'ın kısa süre yöneteceği bir imparatorluk bıraktı.`,
    },
    reforms: { sv: ["Temporary stabilisering av det irakiska Seljukimperiets centrala förvaltning", "Diplomatisk återförening med Abbasidkalifaten efter Malik Shah IIIs spänningar"], en: ["Temporary stabilisation of the Iraqi Seljuk Empire's central administration", "Diplomatic reconnection with the Abbasid caliphate after Malik Shah III's tensions"], tr: ["Irak Selçuklu İmparatorluğu merkezi yönetiminin geçici istikrarlaşması", "Melikşah III'ün gerilimlerinin ardından Abbasi halifeliğiyle diplomatik yeniden bağlantı"] },
    campaigns: { sv: ["Defensiva operationer mot Zengi-dynastin under Nur ad-Din"], en: ["Defensive operations against the Zengi dynasty under Nur ad-Din"], tr: ["Nur ed-Din liderliğindeki Zengi hanedanına karşı savunma operasyonları"] },
    leadershipStyle: { sv: "Pragmatisk och desperat — en man som styrde med ett öga på omedelbar kris och ett öga på sin dynastis fortlevnad.", en: "Pragmatic and desperate — a man who ruled with one eye on immediate crisis and one eye on his dynasty's survival.", tr: "Pragmatik ve çaresiz — bir gözü anlık krizde, bir gözü hanedanının hayatta kalmasında olan bir adam." },
    criticalPerspectives: {
      sv: "Muhammad II's avsättning av Malik Shah III var ett symptom på systemets kroniska sjukdom: äldre anspråkstagare avsatte yngre, yngre avsatte äldre, och varje succession försvagade imperiets stabilitet ytterligare.",
      en: "Muhammad II's deposition of Malik Shah III was a symptom of the system's chronic illness: older claimants deposed younger ones, younger deposed older, and each succession further weakened the empire's stability.",
      tr: "Muhammed II'nin Melikşah III'ü tahttan indirmesi, sistemin kronik hastalığının bir belirtisiydi: yaşlı adaylar gençleri devirdi, gençler yaşlıları devirdi ve her veraset imparatorluğun istikrarını daha da zayıflattı.",
    },
  },

  {
    id: "suleiman-shah",
    name: "Suleiman Shah (Ibn Muhammad Tapar)",
    years: "ca. 1115–1161",
    title: { sv: "Övergångssultanen — En man utan arv att lämna", en: "The Transitional Sultan — A Man with No Legacy to Leave", tr: "Geçiş Sultanı — Bırakacak Mirası Olmayan Adam" },
    portrait: "🌉",
    bio: {
      sv: `Suleiman Shah, son till Muhammad I Tapar och därmed bror till Sanjar och Mahmud II, regerade det irakiska Seljukimperiet 1159–1161 i en av dess mest turbulenta perioder — men hans styre är historiskt nästan osynligt.

Han regerade i ett landskap av faktiska makthavare: Zengi-dynastin under Nur ad-Din dominerade Syrien och hotade Irak. Abbasidkalifaten under al-Muqtafi strävade mot mer politisk autonomi. Atabegs i Azerbajdzjan och Khuzistan handlade efter egna intressen.

Suleiman Shah var i den praktiska meningen sultan utan kungadöme — titeln fanns, armén var liten, resurskassan var utarmat. Hans 2-åriga styre ger oss mer information om vad ett imperium är när det håller på att dö än om individen som bar dess krona.

Han avsattes av Arslan Shah 1161 — inte med blod och svärd utan med politisk manipulation, ett mer elegant uttryck för maktförflyttning i ett imperium vars resurser för öppet krig var uttömda.

Det finns inga bevarade dikter till Suleiman Shah. Ingen persisk historiker dedikerade ett monument av ord åt hans minne. Hans grav är okänd.

Han passerade genom historien som en skugga av en skugga av Seljukernas storhet.`,
      en: `Suleiman Shah, son of Muhammad I Tapar and thus brother of Sanjar and Mahmud II, ruled the Iraqi Seljuk Empire 1159–1161 during one of its most turbulent periods — but his reign is historically almost invisible.

He ruled in a landscape of actual power-holders: the Zengi dynasty under Nur ad-Din dominated Syria and threatened Iraq. The Abbasid caliphate under al-Muqtafi strove for more political autonomy. Atabegs in Azerbaijan and Khuzistan acted according to their own interests.

Suleiman Shah was in the practical sense a sultan without a kingdom — the title existed, the army was small, the treasury depleted. His 2-year reign gives us more information about what an empire is when it is dying than about the individual who bore its crown.

He was deposed by Arslan Shah in 1161 — not with blood and sword but with political manipulation, a more elegant expression of power transfer in an empire whose resources for open warfare were exhausted.

There are no preserved poems dedicated to Suleiman Shah. No Persian historian dedicated a monument of words to his memory. His grave is unknown.

He passed through history as a shadow of a shadow of the Seljuks' greatness.`,
      tr: `Muhammed I Tapar'ın oğlu ve dolayısıyla Sencer ile Mahmud II'nin kardeşi olan Süleyman Şah, 1159–1161 yılları arasında en çalkantılı dönemlerinde Irak Selçuklu İmparatorluğu'nu yönetti — ama saltanatı tarihsel olarak neredeyse görünmez.

Gerçek güç sahiplerinin arasında hüküm sürdü: Nur ed-Din liderliğindeki Zengi hanedanı Suriye'ye hakim olup Irak'ı tehdit ediyordu. El-Muktafi liderliğindeki Abbasi halifeliği daha fazla siyasi otonomi peşindeydi. Azerbaycan ve Huzistan'daki atabegler kendi çıkarlarına göre hareket ediyordu.

Süleyman Şah pratik anlamda krallığı olmayan bir sultandı — unvan mevcuttu, ordu küçüktü, hazine tükenmişti.

1161'de Arslan Şah tarafından tahttan indirildi — kan ve kılıçla değil siyasi manipülasyonla, açık savaş kaynakları tükenmiş bir imparatorlukta güç transferinin daha zarif bir ifadesi.`,
    },
    reforms: { sv: ["Inga kända substantiella reformer"], en: ["No known substantial reforms"], tr: ["Bilinen önemli reform yok"] },
    campaigns: { sv: ["Inga kända militärkampanjer under de korta 2 åren"], en: ["No known military campaigns during the brief 2 years"], tr: ["Kısa 2 yıl süresince bilinen askeri sefer yok"] },
    leadershipStyle: { sv: "Otillräckliga historiska data för analys.", en: "Insufficient historical data for analysis.", tr: "Analiz için yetersiz tarihsel veri." },
    criticalPerspectives: {
      sv: "Suleiman Shahs osynlighet i historien är i sig ett svar på varför Seljukimperiet föll: när ett imperium är tillräckligt svagt producerar det ledare vars viktigaste uppgift är att vara en titel, inte en kraft.",
      en: "Suleiman Shah's invisibility in history is itself an answer to why the Seljuk Empire fell: when an empire is weak enough it produces leaders whose most important task is to be a title, not a force.",
      tr: "Süleyman Şah'ın tarihsel görünmezliği, Selçuklu İmparatorluğu'nun neden düştüğünün cevabıdır: bir imparatorluk yeterince zayıfladığında, en önemli görevi bir güç olmak değil bir unvan olmak olan liderler üretir.",
    },
  },

  {
    id: "arslan-shah",
    name: "Arslan Shah (Ibn Toghrul II)",
    years: "ca. 1135–1174",
    title: { sv: "Sena imperiets kämpe — Värdigheten i det hopplösas ljus", en: "Fighter of the Late Empire — Dignity in the Light of the Hopeless", tr: "Geç İmparatorluğun Savaşçısı — Umutsuzluğun Işığında Onur" },
    portrait: "⚔️",
    bio: {
      sv: `Arslan Shah, son till Toghrul II och barnbarn till Muhammad I Tapar, regerade det irakiska Seljukimperiet 1161–1174 och representerar en av de mer värdiga avsluterna på den långa dynastiska sagans.

Han kom till makten i ett land som höll på att delas av krafter mycket starkare än honom. Nur ad-Din Zengi dominerade syrien och hade befäst sig som islams store korsfararkrigare. Abbasidkalifaten sökte allt mer makt. Atabegs var i praktiken självständiga furstar. Och i norr hotade Seldjikers av Rûm.

Arslan Shahs strategi var djupt realistisk: han kämpade inte för att återvinna förlorade territorier — det var omöjligt. Han kämpade för att bevara en fungerande minimistat, ett suveränt territorium, en diplomatisk identitet, och framför allt — dynastins fortlevnad.

Han var en skicklig diplomat. Han förhandlade vapenvilor med Nur ad-Din snarare än att provocera onödiga krig. Han balanserade kalif mot atebeg och atebeg mot extern fiende med en precision som hans föregångare saknat.

Han är inte en stor sultan. Han är inte en byggare av imperier. Men han är en man som regerade med integritet och intelligens i en situation som erbjöd ytterst lite av varje.

Han dog 1174, sannolikt i fred, i sin säng. Det var mer än de flesta av hans samtida pretendenter uppnådde.`,
      en: `Arslan Shah, son of Toghrul II and grandson of Muhammad I Tapar, ruled the Iraqi Seljuk Empire 1161–1174 and represents one of the more dignified endings to the long dynastic saga.

He came to power in a country being divided by forces far stronger than himself. Nur ad-Din Zengi dominated Syria and had consolidated himself as Islam's great Crusader warrior. The Abbasid caliphate sought ever more power. Atabegs were in practice independent princes. And in the north the Seljuks of Rûm threatened.

Arslan Shah's strategy was deeply realistic: he did not fight to reclaim lost territories — that was impossible. He fought to preserve a functioning minimal state, a sovereign territory, a diplomatic identity, and above all — the dynasty's survival.

He was a skilled diplomat. He negotiated truces with Nur ad-Din rather than provoking unnecessary wars. He balanced caliph against atebeg and atebeg against external enemy with a precision his predecessors had lacked.

He is not a great sultan. He is not an empire-builder. But he is a man who ruled with integrity and intelligence in a situation that offered extremely little of either.

He died in 1174, probably in peace, in his bed. That was more than most of his contemporary pretenders achieved.`,
      tr: `Tuğrul II'nin oğlu ve Muhammed I Tapar'ın torunu Arslan Şah, 1161–1174 yılları arasında Irak Selçuklu İmparatorluğu'nu yönetti ve uzun hanedanlık destanının daha onurlu finallerinden birini temsil eder.

Kendisinden çok daha güçlü kuvvetler tarafından bölünen bir ülkede iktidara geldi. Nur ed-Din Zengi Suriye'ye hakim olmuş ve İslam'ın büyük Haçlı savaşçısı olarak konumunu pekiştirmişti. Abbasi halifeliği giderek daha fazla güç istiyordu. Atabegler pratikte bağımsız prenslerdi. Ve kuzeyde Rum Selçukları tehdit ediyordu.

Arslan Şah'ın stratejisi derin biçimde realistti: kayıp toprakları geri almak için savaşmadı — bu imkânsızdı. İşlevsel bir minimal devleti, egemen bir toprak parçasını, diplomatik bir kimliği ve her şeyden öte — hanedanın hayatta kalmasını korumak için savaştı.

Yetenekli bir diplomatdı. Gereksiz savaşları kışkırtmak yerine Nur ed-Din ile ateşkesler müzakere etti.

1174'te muhtemelen barış içinde, yatağında öldü. Çağdaş adaylarının çoğunun ulaştığından fazlasıydı bu.`,
    },
    reforms: {
      sv: ["Diplomatisk normalisering av relationer med Zengi-dynastin och Abbasidkalifaten", "Administrativ reorganisation av det minimala kvarlevande Seljukiska imperiet", "Strategisk bevarande av dynastisk kontinuitet mot externa hot"],
      en: ["Diplomatic normalisation of relations with the Zengi dynasty and Abbasid caliphate", "Administrative reorganisation of the minimal remaining Seljuk Empire", "Strategic preservation of dynastic continuity against external threats"],
      tr: ["Zengi hanedanı ve Abbasi halifeliğiyle ilişkilerin diplomatik normalleşmesi", "Minimal kalan Selçuklu İmparatorluğu'nun idari yeniden örgütlenmesi", "Dış tehditlere karşı hanedanlık sürekliliğinin stratejik korunması"],
    },
    campaigns: {
      sv: ["Defensiva operationer mot Zengi-expansionen under Nur ad-Din", "Diplomatiska missioner mot korsfarare och byzansinska rester", "Kampanjen mot upproriska atabegs i Luristand och Khuzistan"],
      en: ["Defensive operations against Zengi expansion under Nur ad-Din", "Diplomatic missions toward Crusaders and Byzantine remnants", "Campaign against rebellious atabegs in Luristan and Khuzistan"],
      tr: ["Nur ed-Din liderliğindeki Zengi genişlemesine karşı savunma operasyonları", "Haçlılara ve Bizans kalıntılarına yönelik diplomatik misyonlar", "Luristan ve Huzistan'daki isyancı atabeglere karşı sefer"],
    },
    leadershipStyle: {
      sv: "Arslan Shah var en diplomatisk pragmatist med militär grundkompetens — en man som förstod det möjligas konst i en situation som erbjöd få möjligheter. Hans regentskap är ett exempel på vad historiker kallar 'kompetent förvaltning av nedgång.'",
      en: "Arslan Shah was a diplomatic pragmatist with basic military competence — a man who understood the art of the possible in a situation that offered few possibilities. His regency is an example of what historians call 'competent management of decline.'",
      tr: "Arslan Şah, temel askeri yetkinliğe sahip diplomatik bir pragmatistti — az olasılık sunan bir durumda mümkünün sanatını anlayan bir adam. Naipliği, tarihçilerin 'gerilemenin yetkin yönetimi' dediği şeyin bir örneğidir.",
    },
    criticalPerspectives: {
      sv: "Arslan Shahs försiktiga diplomatik kurs är förståelig men kan kritiseras för att aldrig ha tillåtit Seljukimperiet en chans till verklig restaurering. En mer aggressiv sultan — möjligen — hade kunnat utnyttja den politiska fragmenteringen av Zengi-dynastin efter Nur ad-Dins bortgång 1174. Men det är spekulation; Arslan Shah dog samma år.",
      en: "Arslan Shah's cautious diplomatic course is understandable but can be criticised for never allowing the Seljuk Empire a chance at genuine restoration. A more aggressive sultan — possibly — could have exploited the political fragmentation of the Zengi dynasty after Nur ad-Din's passing in 1174. But that is speculation; Arslan Shah died the same year.",
      tr: "Arslan Şah'ın temkinli diplomatik rotası anlaşılır, ama Selçuklu İmparatorluğu'na gerçek yeniden toparlanma şansı tanımaması nedeniyle eleştirilebilir. Daha agresif bir sultan — muhtemelen — Nur ed-Din'in 1174'teki ölümünün ardından Zengi hanedanının siyasi parçalanmasından yararlanabilirdi. Ama bu spekülasyondur; Arslan Şah aynı yıl öldü.",
    },
  },
];
// =============================================================================
// EMPIRE CONFIG
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
  mapCenter: [35.0, 50.0],
  mapZoom: 4,
  yearRange: [1037, 1194],
  yearDefault: 1071,
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
    sv: "Utforska det turkiska imperiet som omformade islamisk civilisation (1037–1194) — från stäppernas nomader till Bagdads beskyddare, från Manzikert till Timbuktu-kunskapens grundare och Omar Khayyams kalender.",
    en: "Explore the Turkish empire that reshaped Islamic civilisation (1037–1194) — from steppe nomads to Baghdad's protectors, from Manzikert to the founders of Timbuktu-like knowledge and Omar Khayyam's calendar.",
    tr: "İslam medeniyetini yeniden şekillendiren Türk imparatorluğunu keşfedin (1037–1194) — bozkır göçebelerinden Bağdat'ın koruyucularına, Malazgirt'ten Ömer Hayyam'ın takvimine.",
  },
  mapTitle: {
    sv: "Seljukimperiets territorium",
    en: "Seljuk Empire Territory",
    tr: "Selçuklu İmparatorluğu Toprakları",
  },
};
