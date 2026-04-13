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
