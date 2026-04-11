import mongolBackground from "@/assets/mongolBackground.jpg";
import mongolCrest from "@/assets/mongolCrest.jpg";
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
// TIMELINE
// =============================================================================

const mongolTimeline: TimelineEvent[] = [
  {
    year: 1162,
    title: {
      sv: "Temüjins födelse — En ledargestalt föds på stäppen",
      en: "Birth of Temüjin — A Leader Born on the Steppe",
      tr: "Temüjin'in Doğuşu — Bozkırda Bir Lider Doğuyor",
    },
    summary: {
      sv: "Temüjin föds vid floden Onon i nuvarande Mongolia. Enligt legenden kom han till världen med en blodpropp i handen — ett tecken som mongolerna tolkade som att han var förutbestämd att bli en stor krigare och härskare. Hans far Yesügei var en liten stamhövding av Kiyat-klanen. Från sina allra första år präglades Temüjins liv av hård kamp, överlevnad och en oböjlig vilja att ena de splittrade mongolstammarna under ett enda banér.",
      en: "Temüjin is born near the Onon River in present-day Mongolia. According to legend, he came into the world clutching a blood clot in his hand — a sign the Mongols interpreted as his destiny to become a great warrior and ruler. His father Yesügei was a minor tribal chief of the Kiyat clan. From his earliest years, Temüjin's life was marked by harsh struggle, survival, and an unyielding will to unite the scattered Mongol tribes under a single banner.",
      tr: "Temüjin, bugünkü Moğolistan'da Onon Nehri yakınında doğdu. Efsaneye göre elinde bir kan pıhtısıyla dünyaya geldi — Moğolların büyük bir savaşçı ve hükümdar olma kaderinin işareti olarak yorumladığı bir belirti. Babası Yesügei, Kiyat klanının küçük bir kabile reisiydi.",
    },
    figures: ["Temüjin", "Yesügei", "Hoelun"],
    consequences: {
      sv: "En av historiens mest transformativa ledare sätter sina första steg i världen.",
      en: "One of history's most transformative leaders takes his first steps in the world.",
      tr: "Tarihin en dönüştürücü liderlerinden biri dünyaya ilk adımını atıyor.",
    },
    impact: {
      sv: "Mongoliska stäppens öde förändras för alltid.",
      en: "The fate of the Mongolian steppe is forever changed.",
      tr: "Moğol bozkırının kaderi sonsuza dek değişiyor.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: 1171,
    title: {
      sv: "Yesügeis förgiftning — Temüjin lämnas ensam",
      en: "Yesügei's Poisoning — Temüjin Left Alone",
      tr: "Yesügei'nin Zehirlenmesi — Temüjin Yalnız Bırakıldı",
    },
    summary: {
      sv: "Temüjins far Yesügei förgiftas av tatarerna på hemvägen efter att ha arrangerat sin sons trolovning med Börte. Klanmedlemmarna överger familjen och lämnar den unge Temüjin, hans mor Hoelun och hans syskon att klara sig ensamma på de hårda mongoliska stäpperna. Denna traumatiska händelse härdar Temüjin och ger honom en oförstörbar inre styrka. Hoelun uppfostrar sina barn med järnvilja och lär dem att överleva mot alla odds.",
      en: "Temüjin's father Yesügei is poisoned by Tatars on his way home after arranging his son's betrothal to Börte. Clan members abandon the family, leaving young Temüjin, his mother Hoelun, and his siblings to survive alone on the harsh Mongolian steppes. This traumatic event hardens Temüjin and gives him an indestructible inner strength. Hoelun raises her children with an iron will, teaching them to survive against all odds.",
      tr: "Temüjin'in babası Yesügei, oğlunun Börte ile nişanını ayarladıktan sonra eve dönerken Tatarlar tarafından zehirlendi. Klan üyeleri aileyi terk etti ve genç Temüjin'i, annesi Hoelun'u ve kardeşlerini sert Moğol bozkırlarında yalnız bıraktı.",
    },
    figures: ["Temüjin", "Hoelun", "Yesügei"],
    consequences: {
      sv: "Familjen övergiven och utfattig — Temüjins härdning börjar.",
      en: "Family abandoned and destitute — Temüjin's hardening begins.",
      tr: "Aile terk edildi ve yoksul — Temüjin'in sertleşmesi başlıyor.",
    },
    impact: {
      sv: "Fattigdom och kamp formar en framtida världserövrare.",
      en: "Poverty and struggle shape a future world conqueror.",
      tr: "Yoksulluk ve mücadele gelecekteki bir dünya fatihi şekillendiriyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1178,
    title: {
      sv: "Temüjin gifter sig med Börte — Alliansen stärks",
      en: "Temüjin Marries Börte — The Alliance Strengthens",
      tr: "Temüjin Börte ile Evleniyor — İttifak Güçleniyor",
    },
    summary: {
      sv: "Temüjin gifter sig med Börte från Onggirat-klanen — ett äktenskap som hans far hade arrangerat innan sin död. Börte medför en dyrbar hermelin-pels som brudgåva, vilken Temüjin klokt ger till Toghrul Khan av Kerait som ett tecken på allians. Denna politiska manöver ger honom en mäktig beskyddare. Börte visar sig vara mer än bara en hustru — hon är hans klokaste rådgivare, politiska partner och livslånga stöd. Hennes bortförande av Merkiterna och efterföljande räddning utlöser Temüjins första stora militära kampanj.",
      en: "Temüjin marries Börte of the Onggirat clan — a marriage his father had arranged before his death. Börte brings a precious sable fur coat as a wedding gift, which Temüjin wisely gives to Toghrul Khan of the Keraits as a token of alliance. This political maneuver gains him a powerful protector. Börte proves to be more than just a wife — she is his wisest counselor, political partner, and lifelong support. Her abduction by the Merkits and subsequent rescue triggers Temüjin's first major military campaign.",
      tr: "Temüjin, Onggirat klanından Börte ile evlendi — babasının ölümünden önce ayarladığı bir evlilik. Börte, düğün hediyesi olarak değerli bir kürk getirdi ve Temüjin bunu akıllıca ittifak belirtisi olarak Kerait'lerin Toghrul Han'ına verdi.",
    },
    figures: ["Temüjin", "Börte", "Toghrul Khan"],
    consequences: {
      sv: "Temüjin får sin första mäktiga allierade.",
      en: "Temüjin gains his first powerful ally.",
      tr: "Temüjin ilk güçlü müttefikini kazanıyor.",
    },
    impact: {
      sv: "Grunden för det mongoliska imperiets politiska nätverk läggs.",
      en: "The foundation of the Mongolian Empire's political network is laid.",
      tr: "Moğol İmparatorluğu'nun siyasi ağının temeli atılıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1189,
    title: {
      sv: "Temüjin utropas till Khan — Erövraren vaknar",
      en: "Temüjin Proclaimed Khan — The Conqueror Awakens",
      tr: "Temüjin Han İlan Edildi — Fatih Uyanıyor",
    },
    summary: {
      sv: "Efter år av strid, allianser och strategisk brillians väljer en grupp mongolstammar Temüjin till sin Khan. Det är fortfarande en blygsam titel — han kontrollerar ännu inte alla mongoler — men det markerar den avgörande vändpunkten i hans uppgång. Han inför sina revolutionära principer om meritokrati: befordran baseras på förmåga och lojalitet, inte på börd. Han delar ut bytet rättvist bland sina krigare, tar hand om fattiga och äldre, och skapar en djup lojalitet som inga pengar kan köpa.",
      en: "After years of battle, alliances, and strategic brilliance, a group of Mongol tribes elect Temüjin as their Khan. It is still a modest title — he does not yet control all Mongols — but it marks the decisive turning point in his rise. He introduces his revolutionary principles of meritocracy: promotion based on ability and loyalty, not birth. He distributes plunder fairly among his warriors, cares for the poor and elderly, and creates a deep loyalty that no money can buy.",
      tr: "Yıllar süren savaş, ittifaklar ve stratejik zekanın ardından bir grup Moğol kabilesi Temüjin'i Han seçti. Henüz mütevazı bir unvan — tüm Moğolları kontrol etmiyor — ama bu onun yükselişindeki belirleyici dönüm noktasını işaret ediyor.",
    },
    figures: ["Temüjin", "Jamukha", "Toghrul Khan"],
    consequences: {
      sv: "Mongolisk enande process påbörjas på allvar.",
      en: "The Mongolian unification process begins in earnest.",
      tr: "Moğol birleşme süreci ciddiyetle başlıyor.",
    },
    impact: {
      sv: "En ny typ av ledarskap föds på stäppen — meritokrati ersätter aristokrati.",
      en: "A new type of leadership is born on the steppe — meritocracy replaces aristocracy.",
      tr: "Bozkırda yeni bir liderlik türü doğuyor — liyakat aristokrasinin yerini alıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1206,
    title: {
      sv: "Kurultai — Djingis Khan utropas som universell härskare",
      en: "The Kurultai — Genghis Khan Proclaimed Universal Ruler",
      tr: "Kurultay — Cengiz Han Evrensel Hükümdar İlan Edildi",
    },
    summary: {
      sv: "Vid den stora kurultai-församlingen vid floden Onon samlas alla mongolstammar för att formellt utse Temüjin till Djingis Khan — 'Universell härskare' eller 'Härskare över haven'. Han har nu enat alla mongolska, turkiska och tungusiska stammar under sin befäl. Han inrättar Yasa — den mongoliska lagkoden — som garanterar religionsfrihet, skyddar handelsmän, befriar religiösa ledare från skatter, och förbjuder stöld och kidnappning. Han skapar också det mongoliska alfabetet och ett revolutionärt postsystem — Yam — som håller samman imperiet.",
      en: "At the great kurultai assembly at the Onon River, all Mongol tribes gather to formally declare Temüjin as Genghis Khan — 'Universal Ruler' or 'Ruler of the Oceans'. He has now united all Mongol, Turkic, and Tungusic tribes under his command. He establishes the Yasa — the Mongol legal code — which guarantees religious freedom, protects merchants, exempts religious leaders from taxes, and forbids theft and kidnapping. He also creates the Mongolian alphabet and a revolutionary postal system — the Yam — that holds the empire together.",
      tr: "Onon Nehri'ndeki büyük kurultay meclisinde tüm Moğol kabileleri, Temüjin'i resmi olarak Cengiz Han — 'Evrensel Hükümdar' — ilan etmek için toplandı. Artık tüm Moğol, Türk ve Tunguz kabilelerini komutası altında birleştirdi.",
    },
    figures: ["Genghis Khan", "Börte", "Jebe", "Subutai", "Mukhali", "Jochi", "Chagatai", "Ögedei", "Tolui"],
    consequences: {
      sv: "Det Mongoliska imperiet föds officiellt.",
      en: "The Mongol Empire is officially born.",
      tr: "Moğol İmparatorluğu resmi olarak doğdu.",
    },
    impact: {
      sv: "Världen kommer aldrig att bli densamma igen — den största landmakten i historien börjar sin resa.",
      en: "The world will never be the same again — the greatest land power in history begins its journey.",
      tr: "Dünya artık hiçbir zaman aynı olmayacak — tarihin en büyük kara gücü yolculuğuna başlıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1211,
    title: {
      sv: "Invasionen av Kina — Den kinesiska muren korsas",
      en: "Invasion of China — The Great Wall Crossed",
      tr: "Çin'in İstilası — Çin Seddi Aşıldı",
    },
    summary: {
      sv: "Djingis Khan leder sina arméer söderut mot det mäktiga Jin-dynastin i norra Kina. Den mongoliska kavalleritaktiken — snabb rörlighet, falska reträtter och omringningsmanövrar — visar sig överlägsen den kinesiska infanterin. Mongolerna lär sig snabbt att belägra befästa städer, och tar kinesiska ingenjörer till hjälp för att bygga belägringsmaskiner. År 1215 faller Zhongdu (nuvarande Beijing) — en av världens största städer. Djingis Khan visar ett unikt drag: han rekryterar kinesiska administratörer, ingenjörer och lärda för att styra erövrade territorier.",
      en: "Genghis Khan leads his armies southward against the powerful Jin dynasty in northern China. The Mongolian cavalry tactics — rapid mobility, feigned retreats, and encirclement maneuvers — prove superior to Chinese infantry. The Mongols quickly learn to besiege fortified cities, employing Chinese engineers to build siege machines. By 1215, Zhongdu (present-day Beijing) falls — one of the world's greatest cities. Genghis Khan shows a unique trait: he recruits Chinese administrators, engineers, and scholars to govern conquered territories.",
      tr: "Cengiz Han, ordularını güneyde güçlü Çin Jin hanedanına karşı yönlendirdi. Moğol süvari taktikleri — hızlı hareket, sahte geri çekilmeler ve kuşatma manevraları — Çin piyadesine üstün geldi.",
    },
    figures: ["Genghis Khan", "Mukhali", "Jebe", "Subutai"],
    consequences: {
      sv: "Norra Kina faller under mongolisk kontroll.",
      en: "Northern China falls under Mongol control.",
      tr: "Kuzey Çin Moğol kontrolüne geçiyor.",
    },
    impact: {
      sv: "Mongolerna lär sig stadsbelägring och administration — nyckeln till framtida imperium.",
      en: "The Mongols learn siege warfare and administration — the key to future empire.",
      tr: "Moğollar kuşatma savaşı ve yönetimi öğreniyor — gelecekteki imparatorluğun anahtarı.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1218,
    title: {
      sv: "Khwarezmiska provokationen — En handelskatastrof utlöser ett krig",
      en: "The Khwarezm Provocation — A Trade Disaster Triggers War",
      tr: "Harezmşah Provokasyonu — Bir Ticaret Felaketi Savaşı Tetikliyor",
    },
    summary: {
      sv: "Djingis Khan sänder en handelsdelegation med 450 män och en formell ambassad till Shah Muhammad II av Khwarezmimperiet — ett av dåtidens mäktigaste riken, sträckande sig över Persien och Centralasien. Shah Muhammad låter guvernören i Otrar avrättа hela handelskaravanen och beslagta varorna. När Djingis Khans diplomatiska ambassad skickas för att kräva kompensation låter Shahen avrätta ambassadörerna och skicka tillbaka de överlevandes rakade huvuden. Detta var ett oförlåtligt brott mot den mongoliska ehreskodexen. Djingis Khan sade: 'Jag är fredens man, men krig har påtvingats mig.'",
      en: "Genghis Khan sends a trade delegation of 450 men and a formal embassy to Shah Muhammad II of the Khwarezm Empire — one of the most powerful realms of the time, stretching across Persia and Central Asia. Shah Muhammad allows the governor of Otrar to execute the entire trade caravan and seize the goods. When Genghis Khan's diplomatic embassy is sent to demand compensation, the Shah has the ambassadors executed and sends back the survivors' shaved heads. This was an unforgivable breach of the Mongolian honor code. Genghis Khan said: 'I am the man of peace, but war has been forced upon me.'",
      tr: "Cengiz Han, o dönemin en güçlü devletlerinden biri olan Harezmşah İmparatorluğu'nun Sultanı II. Muhammed'e 450 kişilik bir ticaret heyeti ve resmi bir elçilik gönderdi.",
    },
    figures: ["Genghis Khan", "Shah Muhammad II", "Jebe", "Subutai"],
    consequences: {
      sv: "Khwarezmimperiet döms till undergång.",
      en: "The Khwarezm Empire is doomed.",
      tr: "Harezmşah İmparatorluğu mahkûm edildi.",
    },
    impact: {
      sv: "En av historiens mest förödande militära kampanjer inleds.",
      en: "One of history's most devastating military campaigns begins.",
      tr: "Tarihin en yıkıcı askeri kampanyalarından biri başlıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1219,
    title: {
      sv: "Mongolernas stormning av Centralasien — Samarkand och Bukhara faller",
      en: "The Mongol Storm of Central Asia — Samarkand and Bukhara Fall",
      tr: "Orta Asya'nın Moğol Fırtınası — Semerkant ve Buhara Düşüyor",
    },
    summary: {
      sv: "Djingis Khan leder 100 000–200 000 krigare in i Khwarezmimperiet i en av historiens mest välplanerade militära kampanjer. Generalerna Jebe och Subutai kringgår Shah Muhammads arméer medan Djingis Khan anfaller från en oväntad riktning. Bukhara — ett av islamvärldens mest strålande kulturcentra — faller efter kort motstånd. Djingis Khan rider in i den stora moskén och förklarar: 'Jag är Guds gissel. Om ni inte hade begått stora synder, hade Gud inte sänt ett straff som mig.' Samarkand, imperiet kronjuvel, faller sedan. Hundratusentals flyr, dör eller tas som slavar.",
      en: "Genghis Khan leads 100,000–200,000 warriors into the Khwarezm Empire in one of history's most well-planned military campaigns. Generals Jebe and Subutai bypass Shah Muhammad's armies while Genghis Khan attacks from an unexpected direction. Bukhara — one of the Islamic world's most brilliant cultural centers — falls after brief resistance. Genghis Khan rides into the great mosque and declares: 'I am the scourge of God. If you had not committed great sins, God would not have sent a punishment like me.' Samarkand, the empire's crown jewel, then falls. Hundreds of thousands flee, die, or are taken as slaves.",
      tr: "Cengiz Han, tarihin en iyi planlanmış askeri kampanyalarından birinde 100.000-200.000 savaşçıyla Harezmşah İmparatorluğu'na girdi.",
    },
    figures: ["Genghis Khan", "Jebe", "Subutai", "Chagatai", "Ögedei", "Jochi"],
    consequences: {
      sv: "Khwarezmimperiet utplånas. Centralasien förvandlas för alltid.",
      en: "The Khwarezm Empire is obliterated. Central Asia is transformed forever.",
      tr: "Harezmşah İmparatorluğu yok edildi. Orta Asya sonsuza dek dönüştürüldü.",
    },
    impact: {
      sv: "Den muslimska världens hjärta krossas — en civilisatorisk katastrof utan like.",
      en: "The heart of the Muslim world is shattered — a civilizational catastrophe without parallel.",
      tr: "Müslüman dünyasının kalbi parçalandı — eşsiz bir medeniyet felaketi.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1221,
    title: {
      sv: "Jebe och Subutais stora ritt — Världens mest djärva rekognosering",
      en: "The Great Ride of Jebe and Subutai — History's Boldest Reconnaissance",
      tr: "Jebe ve Subutay'ın Büyük Sürüşü — Tarihin En Cesur Keşif Gezisi",
    },
    summary: {
      sv: "Generalerna Jebe och Subutai begär tillstånd av Djingis Khan att genomföra en rekognosceringsexpedition runt Kaspiska havet. Med 20 000 ryttare rider de runt hela Kaspiska havet, genom Persien, Kaukasus, in i Ryssland och slår tillbaka mot stäppen — en resa på över 6 400 kilometer på tre år. De besegrar georgier, armenier, Rus-furstar vid floden Kalka, och kuman-stammar. De samlar intelligence om alla riken de passerar. Denna expedition är militärhistoriens mest ambitiösa rekognosceringsoperation och banar väg för de kommande invasionerna av Europa.",
      en: "Generals Jebe and Subutai request permission from Genghis Khan to conduct a reconnaissance expedition around the Caspian Sea. With 20,000 riders they circle the entire Caspian Sea, through Persia, the Caucasus, into Russia and back across the steppe — a journey of over 6,400 kilometers in three years. They defeat Georgians, Armenians, Rus princes at the Kalka River, and Cuman tribes. They gather intelligence on all kingdoms they pass through. This expedition is the most ambitious reconnaissance operation in military history and paves the way for the coming invasions of Europe.",
      tr: "Generaller Jebe ve Subutay, Cengiz Han'dan Hazar Denizi çevresinde bir keşif seferi yapma izni istedi. 20.000 atlıyla Hazar Denizi'ni çevrelediler, Pers'ten, Kafkasya'dan, Rusya'ya girdiler.",
    },
    figures: ["Jebe", "Subutai", "Mstislav of Kiev"],
    consequences: {
      sv: "Europa och Mellanöstern kartläggs för framtida invasion.",
      en: "Europe and the Middle East are mapped for future invasion.",
      tr: "Avrupa ve Orta Doğu gelecekteki istila için haritalandı.",
    },
    impact: {
      sv: "Militärhistoriens mest djärva rekognosceringsoperation förändrar strategin för decennier framåt.",
      en: "Military history's boldest reconnaissance changes strategy for decades to come.",
      tr: "Askeri tarihin en cesur keşif operasyonu on yıllar boyunca stratejiyi değiştiriyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1227,
    title: {
      sv: "Djingis Khans bortgång — En erövrare lämnar scenen",
      en: "Death of Genghis Khan — A Conqueror Leaves the Stage",
      tr: "Cengiz Han'ın Ölümü — Bir Fatih Sahneden Ayrılıyor",
    },
    summary: {
      sv: "Djingis Khan dör under kampanjen mot Xi Xia-riket, troligtvis av sjukdom eller skador efter ett fall från hästen. Han var runt 65 år gammal. Hans sista önskan är att hans dödsplats hålls hemlig — enligt legenden begravdes han i en okänd grav och alla som bevittnade begravningsprocessionen dödades för att hemligheten skulle bevaras. Vid sin död styrde han ett imperium som sträckte sig från Stilla havet till Kaspiska havet — och han hade ännu inte erövrat Europa, Persien, södra Kina eller Mellanöstern. Han lämnar ett imperium till sina söner med instruktioner om fortsatt expansion.",
      en: "Genghis Khan dies during the campaign against the Xi Xia kingdom, likely from illness or injuries after a fall from his horse. He was approximately 65 years old. His final wish is that his death site remain secret — according to legend, he was buried in an unknown grave and all who witnessed the burial procession were killed to preserve the secret. At his death, he ruled an empire stretching from the Pacific to the Caspian Sea — and he had yet to conquer Europe, Persia, southern China, or the Middle East. He leaves an empire to his sons with instructions for continued expansion.",
      tr: "Cengiz Han, Xi Xia krallığına karşı yürütülen sefer sırasında, muhtemelen hastalıktan veya atından düşme yaralanmalarından öldü. Yaklaşık 65 yaşındaydı.",
    },
    figures: ["Genghis Khan", "Ögedei Khan", "Tolui", "Chagatai", "Jochi"],
    consequences: {
      sv: "Imperiet delas mellan hans söner — men expansionen fortsätter.",
      en: "The empire is divided among his sons — but expansion continues.",
      tr: "İmparatorluk oğulları arasında paylaşıldı — ancak genişleme devam ediyor.",
    },
    impact: {
      sv: "Världens dittills störste erövrare lämnar ett arv som fortfarande diskuteras idag.",
      en: "History's greatest conqueror leaves a legacy still debated today.",
      tr: "Tarihin en büyük fatihi bugün hâlâ tartışılan bir miras bırakıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1229,
    title: {
      sv: "Ögedei Khan — Imperiets byggare",
      en: "Ögedei Khan — Builder of the Empire",
      tr: "Ögedey Han — İmparatorluğun İnşaatçısı",
    },
    summary: {
      sv: "Ögedei, Djingis Khans tredje son och utsedde efterföljare, väljs formellt till Stor-Khan vid kurultaien. Ögedei är en mästerlig administratör och diplomat — mer karismatisk och tillgänglig än sin far. Han bygger Karakorum som imperiets magnifika huvudstad, inrättar det revolutionära Yam-postsystemet med stationsvägar tvärs över hela imperiet, och standardiserar skattesystemet. Under hans styre expanderar imperiet dramatiskt: Nordkina erövras fullständigt, Persien läggs under kontroll, och den stora invasionen av Europa planläggs. Hans generaler Batu och Subutai förbereder en av historiens mest avancerade militäroperationer.",
      en: "Ögedei, Genghis Khan's third son and designated successor, is formally elected as Great Khan at the kurultai. Ögedei is a masterful administrator and diplomat — more charismatic and approachable than his father. He builds Karakorum as the empire's magnificent capital, establishes the revolutionary Yam postal system with station roads across the entire empire, and standardizes the taxation system. Under his rule the empire expands dramatically: northern China is fully conquered, Persia is brought under control, and the great invasion of Europe is planned. His generals Batu and Subutai prepare one of history's most advanced military operations.",
      tr: "Cengiz Han'ın üçüncü oğlu ve belirlenmiş halefi Ögedey, kurultayda resmi olarak Büyük Han seçildi.",
    },
    figures: ["Ögedei Khan", "Batu Khan", "Subutai", "Mukhali"],
    consequences: {
      sv: "Mongoliska imperiet institutionaliseras och professionaliseras.",
      en: "The Mongol Empire is institutionalized and professionalized.",
      tr: "Moğol İmparatorluğu kurumsallaştırıldı ve profesyonelleştirildi.",
    },
    impact: {
      sv: "Karakorum blir världens mest kosmopolitiska stad — ett centrum för handel och diplomati.",
      en: "Karakorum becomes the world's most cosmopolitan city — a center of trade and diplomacy.",
      tr: "Karakurum dünyanın en kozmopolit şehri haline geldi — ticaret ve diplomasinin merkezi.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1237,
    title: {
      sv: "Invasionen av Rus — Europa skälver",
      en: "Invasion of Rus — Europe Trembles",
      tr: "Rus'un İstilası — Avrupa Titriyor",
    },
    summary: {
      sv: "Batu Khan och Subutai leder en armé på uppskattningsvis 130 000–150 000 man in i Ryssland under vintern — en tid när floderna frusit till och ger de mongoliska hästarna solida vägar att rida på. Deras strategi är briljant: de anfaller i mitten av vintern när östeuropéerna minst anar det. Ryazan faller först — Ryazans furste avslog Mongolernas krav på underkastelse, ett ödesdigert beslut. Vladimir, Suzdal, Moskva och Kyiv faller en efter en. Kyiv, dåtidens mest prunkande stad i Östeuropa, läggs i ruiner. Subutais taktik inkluderar psykologisk krigföring, desinfomation och falska reträtter — europeiska riddare kan inte förstå eller matcha denna krigföring.",
      en: "Batu Khan and Subutai lead an army of an estimated 130,000–150,000 men into Russia during winter — a time when frozen rivers provide the Mongolian horses with solid roads to ride on. Their strategy is brilliant: they attack in the middle of winter when Eastern Europeans least expect it. Ryazan falls first — its prince refused the Mongols' demands for submission, a fatal decision. Vladimir, Suzdal, Moscow, and Kyiv fall one by one. Kyiv, then the most splendid city in Eastern Europe, is reduced to ruins. Subutai's tactics include psychological warfare, disinformation, and feigned retreats — European knights cannot understand or match this style of warfare.",
      tr: "Batu Han ve Subutay, kışın tahminen 130.000-150.000 kişilik bir orduyla Rusya'ya girdi — nehirlerin donduğu ve Moğol atlarına sağlam yollar sağladığı bir dönem.",
    },
    figures: ["Batu Khan", "Subutai", "Möngke Khan", "Güyük Khan"],
    consequences: {
      sv: "Ryssland läggs under mongoliskt styre i över 200 år — 'Det Tatariska oket'.",
      en: "Russia is placed under Mongol rule for over 200 years — the 'Tatar Yoke'.",
      tr: "Rusya 200 yılı aşkın süre Moğol yönetimi altına girdi — 'Tatar Boyunduruğu'.",
    },
    impact: {
      sv: "Rysslands historia och politiska kultur formas för sekler av mongolisk dominans.",
      en: "Russia's history and political culture is shaped for centuries by Mongolian dominance.",
      tr: "Rusya'nın tarihi ve siyasi kültürü Moğol hâkimiyetiyle yüzyıllarca şekillendi.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1241,
    title: {
      sv: "Slagen vid Legnica och Mohi — Europa vid avgrunden",
      en: "Battles of Legnica and Mohi — Europe at the Abyss",
      tr: "Legnica ve Mohi Muharebeleri — Avrupa Uçurumun Kenarında",
    },
    summary: {
      sv: "Mongolerna genomför en tvådelad invasion av Europa med förbluffande koordination. Den nordliga styrkan under Baidar och Kaidu besegrar den kombinerade polsk-tyska riddararméen vid Legnica (Wahlstatt) den 9 april. Den södra styrkan under Batu och Subutai besegrar den ungerska armén under kung Béla IV vid floden Mohi den 11 april — bara två dagar senare. Subutais taktik vid Mohi är ett mästerverk: han låter ungrarna tro att de har mongolerna instängda, men lämnar en öppning i cirkeln — ungrarna flyr in i denna korridor och slaktas medan de flyr. Hela Ungern och delar av Polen och Kroatien faller. Mongolerna når Adriatiska havet. Europa har aldrig sett ett militärt hot av denna kaliber.",
      en: "The Mongols execute a two-pronged invasion of Europe with astonishing coordination. The northern force under Baidar and Kaidu defeats the combined Polish-German knight army at Legnica (Wahlstatt) on April 9. The southern force under Batu and Subutai defeats the Hungarian army under King Béla IV at the Mohi River on April 11 — just two days later. Subutai's tactics at Mohi are a masterpiece: he lets the Hungarians believe they have the Mongols surrounded, but leaves an opening in the circle — the Hungarians flee into this corridor and are slaughtered as they run. All of Hungary and parts of Poland and Croatia fall. The Mongols reach the Adriatic Sea. Europe has never seen a military threat of this caliber.",
      tr: "Moğollar, şaşırtıcı koordinasyonla Avrupa'ya iki yönlü bir istila gerçekleştirdi. Kuzey kuvvetleri 9 Nisan'da Legnica'da birleşik Polonya-Alman şövalye ordusunu yendi.",
    },
    figures: ["Batu Khan", "Subutai", "Baidar", "Kaidu", "King Béla IV"],
    consequences: {
      sv: "Europa öppnas för mongolisk erövring — men Ögedeis död räddar kontinenten.",
      en: "Europe is opened for Mongol conquest — but Ögedei's death saves the continent.",
      tr: "Avrupa Moğol fethine açıldı — ancak Ögedey'in ölümü kıtayı kurtardı.",
    },
    impact: {
      sv: "Europas militära tänkande revolutioneras — riddarväldet är inte osårbart.",
      en: "Europe's military thinking is revolutionized — chivalric dominance is not invulnerable.",
      tr: "Avrupa'nın askeri düşüncesi devrimleşiyor — şövalye hâkimiyeti yenilmez değil.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1241,
    title: {
      sv: "Ögedeis död räddar Europa",
      en: "Ögedei's Death Saves Europe",
      tr: "Ögedey'in Ölümü Avrupa'yı Kurtardı",
    },
    summary: {
      sv: "Stor-Khan Ögedei dör oväntat i december 1241. Mongoliska traditioner kräver att alla prinsar och generaler återvänder till Karakorum för att delta i valet av ny Khan. Batu Khan och Subutai, som stod på tröskeln till att erövra Västeuropa, tvingas avbryta sin kampanj och rida tillbaka till Mongolia. Europa andas ut. Historiker har frågat: om Ögedei hade levt ytterligare ett år — skulle Paris och Rom ha fallit? Subutais reträtt är inte en militär förlust utan en politisk nödvändighet. Europa hade inga arméer kvar som kunde ha motstått en fortsatt mongolisk offensiv.",
      en: "Great Khan Ögedei dies unexpectedly in December 1241. Mongol traditions require all princes and generals to return to Karakorum to participate in the election of a new Khan. Batu Khan and Subutai, who stood on the threshold of conquering Western Europe, are forced to abandon their campaign and ride back to Mongolia. Europe breathes a sigh of relief. Historians have asked: if Ögedei had lived one more year — would Paris and Rome have fallen? Subutai's retreat is not a military defeat but a political necessity. Europe had no armies left capable of resisting a continued Mongol offensive.",
      tr: "Büyük Han Ögedey, Aralık 1241'de beklenmedik şekilde öldü. Moğol gelenekleri tüm prenslerin ve generallerin yeni Han seçimine katılmak üzere Karakurum'a dönmesini gerektiriyordu.",
    },
    figures: ["Ögedei Khan", "Batu Khan", "Subutai"],
    consequences: {
      sv: "Västeuropa räddas av slumpen — inte av militär styrka.",
      en: "Western Europe is saved by chance — not by military strength.",
      tr: "Batı Avrupa tesadüfen kurtuldu — askeri güçle değil.",
    },
    impact: {
      sv: "Historiens mest dramatiska 'vad om' — ett dödsfall som förändrade världen.",
      en: "History's most dramatic 'what if' — a death that changed the world.",
      tr: "Tarihin en dramatik 'ya olsaydı' — dünyayı değiştiren bir ölüm.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1251,
    title: {
      sv: "Möngke Khan — Reformatorn på tronen",
      en: "Möngke Khan — The Reformer on the Throne",
      tr: "Möngke Han — Tahtın Reformcusu",
    },
    summary: {
      sv: "Möngke, Tolujs son och Djingis Khans barnbarn, väljs till Stor-Khan efter en period av intern maktkamp. Han är en av de mest kompetenta av Djingis Khans efterföljare. Han inför ett revolutionärt skattereformsystem, bekämpar korruptionen, och skickar sina bröder Hülegü och Kublai ut på stora erövringskampanjer. Hülegü skickas västerut mot Abbasidkalifatet i Bagdad, medan Kublai skickas söderut mot Songdynastin i södra Kina. Under Möngkes styre når det mongoliska imperiet sin maximala geografiska utbredning.",
      en: "Möngke, son of Tolui and grandson of Genghis Khan, is elected Great Khan after a period of internal power struggle. He is one of the most capable of Genghis Khan's successors. He introduces a revolutionary tax reform system, fights corruption, and sends his brothers Hülegü and Kublai on great conquest campaigns. Hülegü is sent westward against the Abbasid Caliphate in Baghdad, while Kublai is sent southward against the Song dynasty in southern China. Under Möngke's rule the Mongol Empire reaches its maximum geographical extent.",
      tr: "Tolui'nin oğlu ve Cengiz Han'ın torunu Möngke, iç iktidar mücadelesinin ardından Büyük Han seçildi.",
    },
    figures: ["Möngke Khan", "Hülegü Khan", "Kublai Khan", "Ariq Böke"],
    consequences: {
      sv: "Imperiet konsolideras och förbereds för sista expansionsfasen.",
      en: "The empire is consolidated and prepared for its final expansion phase.",
      tr: "İmparatorluk son genişleme aşaması için pekiştirildi ve hazırlandı.",
    },
    impact: {
      sv: "Mongolisk administration når sin höjdpunkt under Möngkes styre.",
      en: "Mongol administration reaches its peak under Möngke's rule.",
      tr: "Moğol yönetimi Möngke'nin hükümranlığında zirvesine ulaşıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1258,
    title: {
      sv: "Bagdads fall — Abbasidkalifatets undergång",
      en: "Fall of Baghdad — End of the Abbasid Caliphate",
      tr: "Bağdat'ın Düşüşü — Abbasi Halifeliğinin Sonu",
    },
    summary: {
      sv: "Hülegü Khan leder en enorm mongolisk armé mot Bagdad — dåtidens intellektuella och kulturella centrum för den islamiska världen. Kalif Al-Mustasim vägrar kapitulera trots Mongolernas överväldigande styrka. Bagdad belägras och faller den 10 februari 1258. Det som följer är en av historiens mest förödande kulturella katastrofer: Visdomens hus bränns ner, bibliotek förstörs, kanaler saboteras. Tigrisflodens vatten sägs ha färgats svart av bläck från förstörda böcker och rött av blod. Kalif Al-Mustasim rullas in i en matta och trampas ihjäl av hästar — mongolisk tradition förbjöd att rojalt blod rann på marken. Hundratusentals dödas.",
      en: "Hülegü Khan leads a massive Mongol army against Baghdad — the intellectual and cultural center of the Islamic world at the time. Caliph Al-Mustasim refuses to surrender despite the Mongols' overwhelming force. Baghdad is besieged and falls on February 10, 1258. What follows is one of history's most devastating cultural catastrophes: the House of Wisdom is burned down, libraries are destroyed, canals are sabotaged. The Tigris River's waters are said to have turned black from the ink of destroyed books and red from blood. Caliph Al-Mustasim is rolled in a carpet and trampled to death by horses — Mongol tradition forbade royal blood from flowing on the ground. Hundreds of thousands are killed.",
      tr: "Hülegü Han, o dönemin İslam dünyasının entelektüel ve kültürel merkezi Bağdat'a karşı büyük bir Moğol ordusu yönlendirdi.",
    },
    figures: ["Hülegü Khan", "Al-Mustasim", "Kitbuqa", "Doquz Khatun"],
    consequences: {
      sv: "Abbasidkalifatet utplånas. Islams guldålder avslutas.",
      en: "The Abbasid Caliphate is obliterated. Islam's Golden Age ends.",
      tr: "Abbasi Halifeliği yok edildi. İslam'ın Altın Çağı sona erdi.",
    },
    impact: {
      sv: "En av historiens mest förödande kulturella katastrofer — jahrhunderts av kunskap förstörs.",
      en: "One of history's most devastating cultural catastrophes — centuries of knowledge destroyed.",
      tr: "Tarihin en yıkıcı kültürel felaketlerinden biri — yüzyıllık bilgi yok edildi.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1260,
    title: {
      sv: "Slaget vid Ain Jalut — Mongolerna besegras för första gången",
      en: "Battle of Ain Jalut — The Mongols Defeated for the First Time",
      tr: "Ayn Calut Muharebesi — Moğollar İlk Kez Yenildi",
    },
    summary: {
      sv: "Vid källan Ain Jalut i Palestina möter den mamlukiska armén under sultan Qutuz och den briljante generalen Baybars den mongoliska armén under Kitbuqa. Det är den 3 september 1260. Baybars använder mongolernas egna taktik mot dem: falsk reträtt, bakhåll och omringning. Den mongoliska armén förintas och Kitbuqa dödas. Det är första gången en mongolisk armé besegras avgörande i öppen strid. Segern är av oerhörd psykologisk betydelse — myten om mongolisk osårbarhet krossas. Levanten räddas och Egypt förblir utanför mongolisk kontroll. Mamluker etablerar sig som den ledande makten i den islamiska världen.",
      en: "At the spring of Ain Jalut in Palestine, the Mamluk army under Sultan Qutuz and the brilliant general Baybars meets the Mongol army under Kitbuqa. It is September 3, 1260. Baybars uses the Mongols' own tactics against them: feigned retreat, ambush, and encirclement. The Mongol army is annihilated and Kitbuqa is killed. It is the first time a Mongol army is decisively defeated in open battle. The victory is of enormous psychological significance — the myth of Mongol invincibility is shattered. The Levant is saved and Egypt remains outside Mongol control. The Mamluks establish themselves as the leading power in the Islamic world.",
      tr: "Filistin'deki Ayn Calut pınarında Sultan Kutuz ve parlak general Baybars komutasındaki Memlük ordusu, Kitbuqa komutasındaki Moğol ordusuyla karşılaştı.",
    },
    figures: ["Baybars", "Qutuz", "Kitbuqa", "Hülegü Khan"],
    consequences: {
      sv: "Mongolisk expansion västerut stoppas permanent.",
      en: "Mongol western expansion is permanently halted.",
      tr: "Moğolların batıya doğru genişlemesi kalıcı olarak durduruldu.",
    },
    impact: {
      sv: "Myten om mongolisk osårbarhet krossas — imperiet har nått sin gräns.",
      en: "The myth of Mongol invincibility is shattered — the empire has reached its limit.",
      tr: "Moğol yenilmezliği efsanesi çöküyor — imparatorluk sınırına ulaştı.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1260,
    title: {
      sv: "Kublai Khan — Imperiets sista store härskare",
      en: "Kublai Khan — The Empire's Last Great Ruler",
      tr: "Kubilay Han — İmparatorluğun Son Büyük Hükümdarı",
    },
    summary: {
      sv: "Kublai Khan, Djingis Khans barnbarn, väljs till Stor-Khan och grundar Yuandynastin i Kina. Han bygger den magnifika nya huvudstaden Khanbaliq (nutidens Beijing) och skapar ett av historiens mest sofistikerade administrativa system. Hans hov lockar besökare från hela världen — däribland Marco Polo, som spenderar 17 år vid Kublais hov och vars resebeskrivningar revolutionerar europeisk kunskap om Asien. Kublai är djupt fascinerad av kinesisk kultur och tar gradvis till sig kinesiska seder, vilket alienerar många traditionella mongoler. Han försöker invadera Japan 1274 och 1281 — båda gångerna förstörs hans flottor av stormar som japanerna kallar 'kamikaze' — gudomlig vind.",
      en: "Kublai Khan, grandson of Genghis Khan, is elected Great Khan and founds the Yuan dynasty in China. He builds the magnificent new capital Khanbaliq (modern Beijing) and creates one of history's most sophisticated administrative systems. His court attracts visitors from across the world — including Marco Polo, who spends 17 years at Kublai's court and whose travel accounts revolutionize European knowledge of Asia. Kublai is deeply fascinated by Chinese culture and gradually adopts Chinese customs, alienating many traditional Mongols. He attempts to invade Japan in 1274 and 1281 — both times his fleets are destroyed by storms the Japanese call 'kamikaze' — divine wind.",
      tr: "Cengiz Han'ın torunu Kubilay Han, Büyük Han seçildi ve Çin'de Yuan hanedanını kurdu.",
    },
    figures: ["Kublai Khan", "Marco Polo", "Ariq Böke", "Phags-pa"],
    consequences: {
      sv: "Mongolerna assimileras gradvis i kinesisk kultur.",
      en: "The Mongols gradually assimilate into Chinese culture.",
      tr: "Moğollar giderek Çin kültürüne asimile oluyor.",
    },
    impact: {
      sv: "Pax Mongolica — fredlig handel och kulturutbyte längs sidenvägen — når sin höjdpunkt.",
      en: "Pax Mongolica — peaceful trade and cultural exchange along the Silk Road — reaches its peak.",
      tr: "Pax Mongolica — İpek Yolu boyunca barışçıl ticaret ve kültürel alışveriş — zirvesine ulaşıyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1271,
    title: {
      sv: "Marco Polos resa — Väst möter Öst",
      en: "Marco Polo's Journey — West Meets East",
      tr: "Marco Polo'nun Yolculuğu — Batı Doğuyla Buluşuyor",
    },
    summary: {
      sv: "Den venetianske köpmannen Marco Polo, tillsammans med sin far och farbror, reser längs Sidenvägen till Kublai Khans hov i Khanbaliq. Han spenderar 17 år i Mongolernas tjänst, reser genom Kina, Burma, Indien och Persien. Hans detaljerade observationer av mongolisk och kinesisk civilisation — pappersmynt, kol som bränsle, det effektiva postsystemet — chockar och fascinerar europeiska läsare. Hans bok 'Il Milione' (Miljonernas bok) blir dåtidens bästa säljare och inspirerar generationer av utforskare, däribland Christofer Columbus som hade ett exemplar av boken med sig på sin historiska resa 1492.",
      en: "Venetian merchant Marco Polo, along with his father and uncle, travels along the Silk Road to Kublai Khan's court in Khanbaliq. He spends 17 years in Mongol service, traveling through China, Burma, India, and Persia. His detailed observations of Mongolian and Chinese civilization — paper money, coal as fuel, the efficient postal system — shock and fascinate European readers. His book 'Il Milione' (The Million) becomes the bestseller of its time and inspires generations of explorers, including Christopher Columbus who carried a copy on his historic 1492 voyage.",
      tr: "Venedikli tüccar Marco Polo, babası ve amcasıyla birlikte İpek Yolu boyunca Kubilay Han'ın Khanbaliq'teki sarayına seyahat etti.",
    },
    figures: ["Marco Polo", "Kublai Khan", "Niccolò Polo", "Maffeo Polo"],
    consequences: {
      sv: "Europa öppnar ögonen för Asiens rikedomar och civilisation.",
      en: "Europe opens its eyes to Asia's riches and civilization.",
      tr: "Avrupa, Asya'nın zenginliklerine ve medeniyetine gözlerini açıyor.",
    },
    impact: {
      sv: "Mongolernas Pax Mongolica möjliggör historiens största öst-väst kulturutbyte.",
      en: "The Mongols' Pax Mongolica enables history's greatest East-West cultural exchange.",
      tr: "Moğolların Pax Mongolica'sı tarihin en büyük Doğu-Batı kültürel alışverişini mümkün kılıyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1274,
    title: {
      sv: "Invasionen av Japan — Kamikaze räddar öriket",
      en: "Invasion of Japan — Kamikaze Saves the Island Nation",
      tr: "Japonya'nın İstilası — Kamikaze Ada Ülkesini Kurtardı",
    },
    summary: {
      sv: "Kublai Khan skickar en flotta på 900 skepp med 40 000 man mot Japan efter att japanerna vägrat underkasta sig mongolisk överhöghet. Den mongoliska armén landar och initial intar japanskt territorium. Men en kraftig storm — som japanerna kallar 'kamikaze' (gudomlig vind) — förstör mycket av flottan. Mongolerna tvingas dra sig tillbaka. 1281 försöker Kublai igen med 4 400 skepp och 140 000 man — en av historiens största amfibieoperation. En ännu kraftigare tyfon förstör den mesta av flottan och 100 000 mongoliska soldater drunknar. Japan räddas av naturens krafter, inte av militär styrka. Denna misslyckade invasion stärker japansk nationalism och tron på gudomligt skydd.",
      en: "Kublai Khan sends a fleet of 900 ships with 40,000 men against Japan after the Japanese refuse to submit to Mongol suzerainty. The Mongol army lands and initially takes Japanese territory. But a powerful storm — which the Japanese call 'kamikaze' (divine wind) — destroys much of the fleet. The Mongols are forced to retreat. In 1281 Kublai tries again with 4,400 ships and 140,000 men — one of history's largest amphibious operations. An even stronger typhoon destroys most of the fleet and 100,000 Mongolian soldiers drown. Japan is saved by the forces of nature, not by military strength. This failed invasion strengthens Japanese nationalism and belief in divine protection.",
      tr: "Kubilay Han, Japonların Moğol egemenliğine boyun eğmeyi reddetmesinin ardından 40.000 askerle 900 gemiden oluşan bir donanma gönderdi.",
    },
    figures: ["Kublai Khan", "Hojo Tokimune", "Fan Wenhu"],
    consequences: {
      sv: "Japan förblir det enda landet i Asien som aldrig erövrats av mongolerna.",
      en: "Japan remains the only country in Asia never conquered by the Mongols.",
      tr: "Japonya, Asya'da Moğollar tarafından hiç fethedilmemiş tek ülke olmaya devam ediyor.",
    },
    impact: {
      sv: "Myten om mongolisk ointaglighet tar ytterligare en törn — imperiet har sina gränser.",
      en: "The myth of Mongol invincibility takes another blow — the empire has its limits.",
      tr: "Moğol yenilmezliği efsanesi bir darbe daha aldı — imparatorluğun sınırları var.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1294,
    title: {
      sv: "Kublai Khans död — Imperiets splittring accelererar",
      en: "Death of Kublai Khan — The Empire's Fragmentation Accelerates",
      tr: "Kubilay Han'ın Ölümü — İmparatorluğun Parçalanması Hızlanıyor",
    },
    summary: {
      sv: "Kublai Khan dör 1294, kraftigt överviktig och deprimerad efter sin älskade hustru Chabi och sin favoritsons för tidiga död. Han hade på senare år lidit av gikt och alkoholism. Med hans bortgång splittras det mongoliska imperiet definitivt i fyra separata khanaten: Yuandynastin i Kina, Ilkhanatet i Persien, Chagataikhanatet i Centralasien och Gyllene Horden i Ryssland. Dessa khanater går allt oftare i krig med varandra. Utan en stark central ledare börjar det enorma imperiet oundvikligen sönderfalla.",
      en: "Kublai Khan dies in 1294, severely overweight and depressed following the premature deaths of his beloved wife Chabi and his favorite son. In his later years he had suffered from gout and alcoholism. With his passing, the Mongol Empire definitively splits into four separate khanates: the Yuan dynasty in China, the Ilkhanate in Persia, the Chagatai Khanate in Central Asia, and the Golden Horde in Russia. These khanates increasingly go to war with each other. Without strong central leadership the enormous empire inevitably begins to disintegrate.",
      tr: "Kubilay Han 1294'te hayatını kaybetti, sevgili eşi Chabi ve sevdiği oğlunun erken ölümlerinin ardından aşırı kilolu ve depresyonda.",
    },
    figures: ["Kublai Khan", "Temür Khan", "Chabi"],
    consequences: {
      sv: "Det mongoliska imperiet splittras i fyra khanaten som bekämpar varandra.",
      en: "The Mongol Empire splits into four khanates that fight each other.",
      tr: "Moğol İmparatorluğu birbiriyle savaşan dört hanlığa bölündü.",
    },
    impact: {
      sv: "Imperiets undergång börjar — från världserövrare till lokala makter.",
      en: "The empire's decline begins — from world conquerors to local powers.",
      tr: "İmparatorluğun çöküşü başlıyor — dünya fatihleri yerel güçlere dönüşüyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1368,
    title: {
      sv: "Mongolerna fördrivs från Kina — Mingdynastin tar makten",
      en: "Mongols Expelled from China — Ming Dynasty Takes Power",
      tr: "Moğollar Çin'den Sürüldü — Ming Hanedanı İktidara Geçti",
    },
    summary: {
      sv: "Zhu Yuanzhang, en före detta tiggarmunk och bonderevolverledare, leder en massiv uppror mot den mongoliska Yuandynastin. År 1368 tar han Beijing och utropar Mingdynastin. Den siste Yuan-kejsaren Toghon Temür flyr norrut tillbaka till mongoliska stäppen. Mongolerna har styrt Kina i 89 år. Deras arv i Kina är blandat: de förde med sig katastrofal förödelse men också Pax Mongolica och handel. Mingdynastin bygger om och förstärker den kinesiska muren massivt som ett skydd mot framtida mongoliska invasioner — den mur som vi idag associerar med det kinesiska kulturarvet.",
      en: "Zhu Yuanzhang, a former beggar monk and peasant rebel leader, leads a massive uprising against the Mongol Yuan dynasty. In 1368 he takes Beijing and proclaims the Ming dynasty. The last Yuan emperor Toghon Temür flees northward back to the Mongolian steppe. The Mongols have ruled China for 89 years. Their legacy in China is mixed: they brought catastrophic devastation but also Pax Mongolica and trade. The Ming dynasty massively rebuilds and reinforces the Great Wall of China as protection against future Mongol invasions — the wall we today associate with Chinese cultural heritage.",
      tr: "Eski bir dilenci keşiş ve köylü isyan lideri olan Zhu Yuanzhang, Moğol Yuan hanedanına karşı büyük bir isyana öncülük etti.",
    },
    figures: ["Zhu Yuanzhang", "Toghon Temür", "Xu Da"],
    consequences: {
      sv: "Det mongoliska imperiets kinesiska del avslutas. Mongolerna återvänder till stäppen.",
      en: "The Mongol Empire's Chinese chapter ends. The Mongols return to the steppe.",
      tr: "Moğol İmparatorluğu'nun Çin bölümü sona eriyor. Moğollar bozkıra dönüyor.",
    },
    impact: {
      sv: "Kinas stora mur byggs om som ett monument över mongolernas förmåga att hota stater.",
      en: "China's Great Wall is rebuilt as a monument to the Mongols' ability to threaten states.",
      tr: "Çin'in Büyük Seddi, Moğolların devletleri tehdit etme kapasitesinin anıtı olarak yeniden inşa edildi.",
    },
    category: "war",
    importance: "high",
  },
];

// =============================================================================
// LEADERS
// =============================================================================

const mongolLeaders: Sultan[] = [
  {
    id: "genghis",
    name: "Genghis Khan (Temüjin)",
    reignStart: 1206,
    reignEnd: 1227,
    parentId: null,
    generation: 1,
    title: {
      sv: "Universell Khan, Världserövraren",
      en: "Universal Khan, Conqueror of the World",
      tr: "Evrensel Han, Dünyanın Fatihi",
    },
    profileId: "genghis-khan",
  },
  {
    id: "ogedei",
    name: "Ögedei Khan",
    reignStart: 1229,
    reignEnd: 1241,
    parentId: "genghis",
    generation: 2,
    title: {
      sv: "Imperiets byggare, Karakorums grundare",
      en: "Builder of the Empire, Founder of Karakorum",
      tr: "İmparatorluğun İnşaatçısı, Karakurum'un Kurucusu",
    },
    profileId: "ogedei-khan",
  },
  {
    id: "guyuk",
    name: "Güyük Khan",
    reignStart: 1246,
    reignEnd: 1248,
    parentId: "ogedei",
    generation: 3,
    title: {
      sv: "Den kortlivade Khan",
      en: "The Short-Lived Khan",
      tr: "Kısa Ömürlü Han",
    },
  },
  {
    id: "mongke",
    name: "Möngke Khan",
    reignStart: 1251,
    reignEnd: 1259,
    parentId: "genghis",
    generation: 3,
    title: {
      sv: "Reformatorn, den store administratören",
      en: "The Reformer, the Great Administrator",
      tr: "Reformcu, Büyük Yönetici",
    },
    profileId: "mongke-khan",
  },
  {
    id: "kublai",
    name: "Kublai Khan",
    reignStart: 1260,
    reignEnd: 1294,
    parentId: "mongke",
    generation: 4,
    title: {
      sv: "Kinas kejsare, Yuandynastins grundare",
      en: "Emperor of China, Founder of Yuan Dynasty",
      tr: "Çin İmparatoru, Yuan Hanedanının Kurucusu",
    },
    profileId: "kublai-khan",
  },
  {
    id: "batu",
    name: "Batu Khan",
    reignStart: 1227,
    reignEnd: 1255,
    parentId: "genghis",
    generation: 2,
    title: {
      sv: "Khan av Gyllene Horden, Rysslands erövrare",
      en: "Khan of the Golden Horde, Conqueror of Russia",
      tr: "Altın Orda Hanı, Rusya'nın Fatihi",
    },
    profileId: "batu-khan",
  },
  {
    id: "hulegu",
    name: "Hülegü Khan",
    reignStart: 1256,
    reignEnd: 1265,
    parentId: "mongke",
    generation: 4,
    title: {
      sv: "Ilkhanatets grundare, Bagdads förstörare",
      en: "Founder of the Ilkhanate, Destroyer of Baghdad",
      tr: "İlhanlı'nın Kurucusu, Bağdat'ın Yıkıcısı",
    },
  },
  {
    id: "jochi",
    name: "Jochi Khan",
    reignStart: 1207,
    reignEnd: 1225,
    parentId: "genghis",
    generation: 2,
    title: {
      sv: "Djingis Khans förste son, Stäppens prins",
      en: "Genghis Khan's First Son, Prince of the Steppe",
      tr: "Cengiz Han'ın Büyük Oğlu, Bozkırın Prensi",
    },
  },
  {
    id: "chagatai",
    name: "Chagatai Khan",
    reignStart: 1227,
    reignEnd: 1242,
    parentId: "genghis",
    generation: 2,
    title: {
      sv: "Chagataikhanatets grundare, Lagens väktare",
      en: "Founder of Chagatai Khanate, Guardian of the Law",
      tr: "Çağatay Hanlığı'nın Kurucusu, Yasanın Koruyucusu",
    },
  },
  {
    id: "tolui",
    name: "Tolui Khan",
    reignStart: 1227,
    reignEnd: 1232,
    parentId: "genghis",
    generation: 2,
    title: {
      sv: "Regent, Djingis Khans yngste och favoritson",
      en: "Regent, Genghis Khan's Youngest and Favorite Son",
      tr: "Naip, Cengiz Han'ın En Küçük ve En Sevgili Oğlu",
    },
  },
];

// =============================================================================
// QUIZ QUESTIONS
// =============================================================================

const mongolQuizQuestions: QuizQuestion[] = [
  {
    id: "mq1",
    topic: "religion",
    difficulty: "easy",
    question: {
      sv: "Vad hette Djingis Khan vid födseln?",
      en: "What was Genghis Khan's name at birth?",
      tr: "Cengiz Han'ın doğumda adı neydi?",
    },
    options: {
      sv: ["Ögedei", "Temüjin", "Batu", "Subutai"],
      en: ["Ögedei", "Temüjin", "Batu", "Subutai"],
      tr: ["Ögedey", "Temüjin", "Batu", "Subutay"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Djingis Khan föddes som Temüjin år 1162 vid floden Onon i nuvarande Mongolia. Han fick titeln 'Djingis Khan' vid kurultaien år 1206 när han utropades till universell härskare.",
      en: "Genghis Khan was born as Temüjin in 1162 near the Onon River in present-day Mongolia. He received the title 'Genghis Khan' at the kurultai of 1206 when he was proclaimed universal ruler.",
      tr: "Cengiz Han, 1162'de bugünkü Moğolistan'da Onon Nehri yakınında Temüjin olarak doğdu. 'Cengiz Han' unvanını 1206 kurultayında evrensel hükümdar ilan edildiğinde aldı.",
    },
  },
  {
    id: "mq2",
    topic: "military",
    difficulty: "easy",
    question: {
      sv: "Vilket år grundades det Mongoliska imperiet officiellt?",
      en: "In what year was the Mongol Empire officially founded?",
      tr: "Moğol İmparatorluğu resmi olarak hangi yılda kuruldu?",
    },
    options: {
      sv: ["1189", "1206", "1215", "1227"],
      en: ["1189", "1206", "1215", "1227"],
      tr: ["1189", "1206", "1215", "1227"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Det Mongoliska imperiet grundades officiellt vid kurultaien år 1206 vid floden Onon, när Temüjin utropades till Djingis Khan och enat alla mongolstammar.",
      en: "The Mongol Empire was officially founded at the kurultai of 1206 at the Onon River, when Temüjin was proclaimed Genghis Khan and had united all Mongol tribes.",
      tr: "Moğol İmparatorluğu, Temüjin'in Cengiz Han ilan edildiği ve tüm Moğol kabilelerini birleştirdiği 1206 yılındaki Onon Nehri kurultayında resmi olarak kuruldu.",
    },
  },
  {
    id: "mq3",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Vilken mongolisk general ledde den legendariska rekognosceringsritten runt Kaspiska havet?",
      en: "Which Mongol general led the legendary reconnaissance ride around the Caspian Sea?",
      tr: "Hangi Moğol generali Hazar Denizi çevresindeki efsanevi keşif yolculuğuna liderlik etti?",
    },
    options: {
      sv: ["Batu Khan", "Mukhali", "Jebe och Subutai", "Hülegü Khan"],
      en: ["Batu Khan", "Mukhali", "Jebe and Subutai", "Hülegü Khan"],
      tr: ["Batu Han", "Mukhali", "Jebe ve Subutay", "Hülegü Han"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Generalerna Jebe och Subutai genomförde den episka rekognosceringsritten 1221–1224, med 20 000 ryttare runt hela Kaspiska havet, genom Ryssland och tillbaka — en resa på över 6 400 kilometer.",
      en: "Generals Jebe and Subutai conducted the epic reconnaissance ride of 1221–1224, with 20,000 riders circling the entire Caspian Sea, through Russia and back — a journey of over 6,400 kilometers.",
      tr: "Generaller Jebe ve Subutay, 1221-1224 yıllarında 20.000 atlıyla Hazar Denizi'ni çevreleyerek Rusya'dan geçip geri dönen epik keşif yolculuğunu gerçekleştirdi.",
    },
  },
  {
    id: "mq4",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vad kallades den mongoliska lagkoden som Djingis Khan instiftade?",
      en: "What was the Mongol legal code established by Genghis Khan called?",
      tr: "Cengiz Han tarafından kurulan Moğol hukuk kanununun adı neydi?",
    },
    options: {
      sv: ["Kurultai", "Yam", "Yasa", "Tumen"],
      en: ["Kurultai", "Yam", "Yasa", "Tumen"],
      tr: ["Kurultay", "Yam", "Yasa", "Tümen"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Yasa (eller Jasagh) var Djingis Khans mongoliska lagkod, som garanterade religionsfrihet, skyddade handelsmän, förbjöd stöld och kidnappning, och befriade religiösa ledare från skatter.",
      en: "The Yasa (or Jasagh) was Genghis Khan's Mongol legal code, which guaranteed religious freedom, protected merchants, forbade theft and kidnapping, and exempted religious leaders from taxes.",
      tr: "Yasa (veya Jasagh), Cengiz Han'ın din özgürlüğünü güvence altına alan, tüccarları koruyan, hırsızlık ve adam kaçırmayı yasaklayan ve dini liderleri vergiden muaf tutan Moğol hukuk kanunuydu.",
    },
  },
  {
    id: "mq5",
    topic: "expansion",
    difficulty: "medium",
    question: {
      sv: "Vilket slag 1260 stoppade den mongoliska expansionen mot väst permanent?",
      en: "Which battle of 1260 permanently halted Mongol western expansion?",
      tr: "1260'daki hangi savaş Moğolların batıya doğru genişlemesini kalıcı olarak durdurdu?",
    },
    options: {
      sv: ["Slaget vid Legnica", "Slaget vid Mohi", "Slaget vid Ain Jalut", "Slaget vid Kalka"],
      en: ["Battle of Legnica", "Battle of Mohi", "Battle of Ain Jalut", "Battle of Kalka"],
      tr: ["Legnica Muharebesi", "Mohi Muharebesi", "Ayn Calut Muharebesi", "Kalka Muharebesi"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Slaget vid Ain Jalut den 3 september 1260 i Palestina var det första gången en mongolisk armé besegrades avgörande i öppen strid. Den mamlukiska armén under general Baybars använde mongolernas egna taktik mot dem.",
      en: "The Battle of Ain Jalut on September 3, 1260 in Palestine was the first time a Mongol army was decisively defeated in open battle. The Mamluk army under General Baybars used the Mongols' own tactics against them.",
      tr: "3 Eylül 1260'ta Filistin'deki Ayn Calut Muharebesi, bir Moğol ordusunun açık savaşta kesin olarak ilk yenilgiye uğratıldığı andı.",
    },
  },
  {
    id: "mq6",
    topic: "culture",
    difficulty: "easy",
    question: {
      sv: "Vilken europeisk resande spenderade 17 år vid Kublai Khans hov och skrev en berömd reseberättelse?",
      en: "Which European traveler spent 17 years at Kublai Khan's court and wrote a famous travel account?",
      tr: "Hangi Avrupalı gezgin Kubilay Han'ın sarayında 17 yıl geçirdi ve ünlü bir seyahat anlatısı yazdı?",
    },
    options: {
      sv: ["Ibn Battuta", "Marco Polo", "Vasco da Gama", "William of Rubruck"],
      en: ["Ibn Battuta", "Marco Polo", "Vasco da Gama", "William of Rubruck"],
      tr: ["İbn Battuta", "Marco Polo", "Vasco da Gama", "Rubruck'lu William"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Marco Polo (1254–1324) från Venedig reste till Kublai Khans hov och spenderade 17 år i mongolisk tjänst. Hans bok 'Il Milione' beskrev Kina och Asien för europeiska läsare och inspirerade Christopher Columbus.",
      en: "Marco Polo (1254–1324) from Venice traveled to Kublai Khan's court and spent 17 years in Mongol service. His book 'Il Milione' described China and Asia for European readers and inspired Christopher Columbus.",
      tr: "Venedikli Marco Polo (1254-1324), Kubilay Han'ın sarayına giderek 17 yıl Moğol hizmetinde geçirdi. Kitabı 'Il Milione', Çin ve Asya'yı Avrupalı okuyuculara anlattı ve Kristof Kolomb'u etkiledi.",
    },
  },
  {
    id: "mq7",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Varför räddades Västeuropa från mongolisk invasion 1241?",
      en: "Why was Western Europe saved from Mongol invasion in 1241?",
      tr: "Batı Avrupa 1241'de Moğol istilasından neden kurtuldu?",
    },
    options: {
      sv: ["Europeiska riddare besegrade mongolerna", "Stor-Khan Ögedei dog oväntat", "Mongolerna fick slut på hästar", "Påven exkommunicerade mongolerna"],
      en: ["European knights defeated the Mongols", "Great Khan Ögedei died unexpectedly", "The Mongols ran out of horses", "The Pope excommunicated the Mongols"],
      tr: ["Avrupalı şövalyeler Moğolları yendi", "Büyük Han Ögedey beklenmedik şekilde öldü", "Moğolların atları tükendi", "Papa Moğolları aforoz etti"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Stor-Khan Ögedei dog oväntat i december 1241 precis när Batu Khan och Subutai stod på tröskeln till att invadera Västeuropa. Mongolisk tradition krävde att alla prinsar återvände till Karakorum för att välja ny Khan.",
      en: "Great Khan Ögedei died unexpectedly in December 1241 just as Batu Khan and Subutai stood on the threshold of invading Western Europe. Mongol tradition required all princes to return to Karakorum to elect a new Khan.",
      tr: "Büyük Han Ögedey, Batu Han ve Subutay'ın Batı Avrupa'yı istila etmek üzere olduğu sırada Aralık 1241'de beklenmedik şekilde öldü.",
    },
  },
  {
    id: "mq8",
    topic: "military",
    difficulty: "advanced",
    question: {
      sv: "Vilken storm förstörde den mongoliska invasionsflottan mot Japan 1281?",
      en: "What storm destroyed the Mongol invasion fleet against Japan in 1281?",
      tr: "1281'de Japonya'ya karşı Moğol istila donanmasını hangi fırtına yok etti?",
    },
    options: {
      sv: ["Tyfonen Hagupit", "Kamikaze", "Taifun Yagi", "Orkanen Nida"],
      en: ["Typhoon Hagupit", "Kamikaze", "Typhoon Yagi", "Hurricane Nida"],
      tr: ["Tayfun Hagupit", "Kamikaze", "Tayfun Yagi", "Kasırga Nida"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Japanerna kallade den frälsande tyfonen 'kamikaze' — gudomlig vind. 1281 förstörde denna storm den mongoliska flottan på 4 400 skepp och dödade 100 000 soldater. Termen 'kamikaze' återupplivades under andra världskriget för japanska självmordspiloter.",
      en: "The Japanese called the saving typhoon 'kamikaze' — divine wind. In 1281 this storm destroyed the Mongol fleet of 4,400 ships and killed 100,000 soldiers. The term 'kamikaze' was revived during World War II for Japanese suicide pilots.",
      tr: "Japonlar kurtarıcı tayfunu 'kamikaze' — ilahi rüzgar — olarak adlandırdı. 1281'de bu fırtına 4.400 gemiden oluşan Moğol donanmasını yok etti ve 100.000 askeri öldürdü.",
    },
  },
  {
    id: "mq9",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vad hette det mongoliska postsystemet som Ögedei Khan etablerade?",
      en: "What was the Mongolian postal system established by Ögedei Khan called?",
      tr: "Ögedey Han tarafından kurulan Moğol posta sisteminin adı neydi?",
    },
    options: {
      sv: ["Kurultai", "Yasa", "Yam", "Tumen"],
      en: ["Kurultai", "Yasa", "Yam", "Tumen"],
      tr: ["Kurultay", "Yasa", "Yam", "Tümen"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Yam-systemet var ett revolutionärt postsystem med relay-stationer (örtöö) med färska hästar utplacerade var 25-40 kilometer. Det möjliggjorde kommunikation och förflyttning av meddelanden med oerhörd hastighet tvärs över hela det enorma imperiet.",
      en: "The Yam system was a revolutionary postal system with relay stations (örtöö) with fresh horses placed every 25-40 kilometers. It enabled communication and movement of messages at extraordinary speed across the entire enormous empire.",
      tr: "Yam sistemi, her 25-40 kilometrede bir taze atlarla donatılmış aktarma istasyonlarına (örtöö) sahip devrimci bir posta sistemiydi.",
    },
  },
  {
    id: "mq10",
    topic: "expansion",
    difficulty: "advanced",
    question: {
      sv: "Vilken händelse utlöste Djingis Khans invasion av Khwarezmimperiet?",
      en: "What event triggered Genghis Khan's invasion of the Khwarezm Empire?",
      tr: "Cengiz Han'ın Harezmşah İmparatorluğu'nu işgalini tetikleyen olay neydi?",
    },
    options: {
      sv: ["Shah vägrade betala tribut", "Shah avrättade mongoliska handelsmän och ambassadörer", "Shah invaderade mongoliska territorium", "Shah vägrade erkänna Djingis Khan som härskare"],
      en: ["The Shah refused to pay tribute", "The Shah executed Mongol merchants and ambassadors", "The Shah invaded Mongol territory", "The Shah refused to recognize Genghis Khan as ruler"],
      tr: ["Sultan haraç ödemeyi reddetti", "Sultan Moğol tüccarları ve elçileri idam etti", "Sultan Moğol topraklarını işgal etti", "Sultan Cengiz Han'ı hükümdar olarak tanımayı reddetti"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Shah Muhammad II av Khwarezmimperiet lät avrätta Djingis Khans handelsdelegation på 450 man och sedan avrättа de mongoliska ambassadörerna som sändes för att kräva kompensation. Detta var ett oförlåtligt brott mot mongolisk hederscode.",
      en: "Shah Muhammad II of the Khwarezm Empire had Genghis Khan's trade delegation of 450 men executed and then had the Mongol ambassadors sent to demand compensation executed as well. This was an unforgivable breach of the Mongol honor code.",
      tr: "Harezmşah II. Muhammed, Cengiz Han'ın 450 kişilik ticaret heyetini idam ettirdi ve ardından tazminat talep etmek için gönderilen Moğol elçilerini de idam etti.",
    },
  },
  {
    id: "mq11",
    topic: "military",
    difficulty: "advanced",
    question: {
      sv: "Vad hette den mongoliska militärenheten bestående av 10 000 man?",
      en: "What was the Mongol military unit consisting of 10,000 men called?",
      tr: "10.000 kişiden oluşan Moğol askeri birliğinin adı neydi?",
    },
    options: {
      sv: ["Arban", "Zuun", "Mingan", "Tumen"],
      en: ["Arban", "Zuun", "Mingan", "Tumen"],
      tr: ["Arban", "Zuun", "Mingan", "Tümen"],
    },
    correctIndex: 3,
    explanation: {
      sv: "Tumen var den mongoliska militärenheten på 10 000 man. Mongolerna organiserade sin armé i decimalsystemet: arban (10 man), zuun (100 man), mingan (1 000 man) och tumen (10 000 man). Denna organisation möjliggjorde exceptionell koordination och flexibilitet.",
      en: "The tumen was the Mongol military unit of 10,000 men. The Mongols organized their army in the decimal system: arban (10 men), zuun (100 men), mingan (1,000 men), and tumen (10,000 men). This organization enabled exceptional coordination and flexibility.",
      tr: "Tümen, 10.000 kişilik Moğol askeri birliğiydi. Moğollar ordularını ondalık sistemde organize etti: arban (10 kişi), zuun (100 kişi), mingan (1.000 kişi) ve tümen (10.000 kişi).",
    },
  },
  {
    id: "mq12",
    topic: "culture",
    difficulty: "easy",
    question: {
      sv: "Vad hette den mongoliska imperiets första permanenta huvudstad som Ögedei Khan byggde?",
      en: "What was the name of the Mongol Empire's first permanent capital built by Ögedei Khan?",
      tr: "Ögedey Han tarafından inşa edilen Moğol İmparatorluğu'nun ilk kalıcı başkentinin adı neydi?",
    },
    options: {
      sv: ["Khanbaliq", "Samarkand", "Karakorum", "Merv"],
      en: ["Khanbaliq", "Samarkand", "Karakorum", "Merv"],
      tr: ["Khanbaliq", "Semerkant", "Karakurum", "Merv"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Karakorum byggdes av Ögedei Khan som det mongoliska imperiets magnifika huvudstad på mongoliska stäppen. Det var ett kosmopolitiskt centrum med kyrkor, moskéer, buddhisttempel och ett konfucianskt tempel — en symbol för mongolisk religionsfrihet.",
      en: "Karakorum was built by Ögedei Khan as the Mongol Empire's magnificent capital on the Mongolian steppe. It was a cosmopolitan center with churches, mosques, Buddhist temples, and a Confucian temple — a symbol of Mongol religious freedom.",
      tr: "Karakurum, Ögedey Han tarafından Moğol bozkırında Moğol İmparatorluğu'nun muhteşem başkenti olarak inşa edildi.",
    },
  },
  {
    id: "mq13",
    topic: "expansion",
    difficulty: "medium",
    question: {
      sv: "Vilken mongolisk prins ledde invasionen av Europa 1237–1242?",
      en: "Which Mongol prince led the invasion of Europe in 1237–1242?",
      tr: "1237-1242 yıllarında Avrupa'nın istilasına hangi Moğol prensi liderlik etti?",
    },
    options: {
      sv: ["Ögedei Khan", "Möngke Khan", "Batu Khan", "Hülegü Khan"],
      en: ["Ögedei Khan", "Möngke Khan", "Batu Khan", "Hülegü Khan"],
      tr: ["Ögedey Han", "Möngke Han", "Batu Han", "Hülegü Han"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Batu Khan, son till Jochi och barnbarn till Djingis Khan, ledde den europeiska invasionskampanjen med sin briljante general Subutai. Batu grundade sedan Gyllene Horden som styrde Ryssland i över 200 år.",
      en: "Batu Khan, son of Jochi and grandson of Genghis Khan, led the European invasion campaign with his brilliant general Subutai. Batu then founded the Golden Horde which ruled Russia for over 200 years.",
      tr: "Jochi'nin oğlu ve Cengiz Han'ın torunu Batu Han, parlak generali Subutay ile birlikte Avrupa istila kampanyasına liderlik etti.",
    },
  },
  {
    id: "mq14",
    topic: "religion",
    difficulty: "advanced",
    question: {
      sv: "Vilken religion praktiserade Djingis Khan?",
      en: "What religion did Genghis Khan practice?",
      tr: "Cengiz Han hangi dini pratik etti?",
    },
    options: {
      sv: ["Islam", "Buddhismen", "Tengrianism (himmeldyrkan)", "Kristendom"],
      en: ["Islam", "Buddhism", "Tengrianism (sky worship)", "Christianity"],
      tr: ["İslam", "Budizm", "Tengricilik (gökyüzü tapınması)", "Hristiyanlık"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Djingis Khan var tengrianist — han dyrkade den eviga blå himlen (Tengri) som den högste guden. Han var dock känd för sin exceptionella religiösa tolerans: han befriade religiösa ledare från skatter och respekterade alla religioner inom sitt imperium.",
      en: "Genghis Khan was a Tengrist — he worshipped the eternal blue sky (Tengri) as the supreme god. However, he was known for his exceptional religious tolerance: he exempted religious leaders from taxes and respected all religions within his empire.",
      tr: "Cengiz Han bir Tengrist'ti — Tengri olarak bilinen sonsuz mavi gökyüzünü yüce tanrı olarak tapardı. Ancak istisnai dini hoşgörüsüyle tanınırdı.",
    },
  },
  {
    id: "mq15",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas den period av relativ fred och säkerhet längs Sidenvägen under mongoliskt välde?",
      en: "What is the period of relative peace and safety along the Silk Road under Mongol rule called?",
      tr: "Moğol yönetimi altında İpek Yolu boyunca görece barış ve güvenlik dönemine ne denir?",
    },
    options: {
      sv: ["Pax Romana", "Pax Mongolica", "Pax Ottomana", "Pax Islamica"],
      en: ["Pax Romana", "Pax Mongolica", "Pax Ottomana", "Pax Islamica"],
      tr: ["Pax Romana", "Pax Mongolica", "Pax Ottomana", "Pax Islamica"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Pax Mongolica (mongolisk fred) var perioden ca 1250–1350 då mongolisk kontroll över Sidenvägen möjliggjorde säker handel och resor från Europa till Kina. Detta möjliggjorde Marco Polos resa och spridningen av teknologier, sjukdomar och idéer.",
      en: "Pax Mongolica (Mongol peace) was the period c. 1250–1350 when Mongol control over the Silk Road enabled safe trade and travel from Europe to China. This enabled Marco Polo's journey and the spread of technologies, diseases, and ideas.",
      tr: "Pax Mongolica (Moğol barışı), yaklaşık 1250-1350 yılları arasında Moğolların İpek Yolu üzerindeki kontrolünün Avrupa'dan Çin'e güvenli ticaret ve seyahati mümkün kıldığı dönemdi.",
    },
  },
  {
    id: "mq16",
    topic: "military",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas den mongoliska taktiken att låtsas retirera för att locka fienden in i ett bakhåll?",
      en: "What is the Mongol tactic of pretending to retreat to lure the enemy into an ambush called?",
      tr: "Düşmanı pusuya çekmek için geri çekiliyormuş gibi yapmayı içeren Moğol taktiğine ne denir?",
    },
    options: {
      sv: ["Tumen-manövern", "Mangudai — den falska reträtten", "Kurultai-attacken", "Yam-taktiken"],
      en: ["Tumen maneuver", "Mangudai — the feigned retreat", "Kurultai attack", "Yam tactic"],
      tr: ["Tümen manevrasİ", "Mangudai — sahte geri çekilme", "Kurultay saldırısı", "Yam taktiği"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Mangudai var en mongolisk elitkavallerienhet specialiserad på den falska reträtten. De lockade fienden att bryta sina linjer i jakt, varefter den verkliga mongoliska armén omringade och förintade dem. Denna taktik besegrade europeiska riddare vid Legnica och Mohi.",
      en: "The Mangudai was a Mongol elite cavalry unit specialized in the feigned retreat. They lured enemies into breaking their lines in pursuit, whereupon the actual Mongol army surrounded and annihilated them. This tactic defeated European knights at Legnica and Mohi.",
      tr: "Mangudai, sahte geri çekilmede uzmanlaşmış bir Moğol seçkin süvari birliğiydi.",
    },
  },
];

// =============================================================================
// BADGES
// =============================================================================

const mongolBadges: Badge[] = [
  {
    id: "steppe-rider",
    name: {
      sv: "Stäppryttaren",
      en: "Steppe Rider",
      tr: "Bozkır Süvarisi",
    },
    icon: "🏹",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor — som en mongolisk budbärare på Yam-vägen.",
      en: "Answer 3 questions correctly — like a Mongolian courier on the Yam road.",
      tr: "3 soruyu doğru yanıtlayın — Yam yolundaki Moğol bir haberci gibi.",
    },
  },
  {
    id: "noyan",
    name: {
      sv: "Noyanen — Befälhavaren",
      en: "The Noyan — The Commander",
      tr: "Noyan — Komutan",
    },
    icon: "⚔️",
    requiredScore: 6,
    description: {
      sv: "Svara rätt på 6 frågor — som en mongolisk noyan som leder sina tumen i strid.",
      en: "Answer 6 questions correctly — like a Mongol noyan leading his tumen into battle.",
      tr: "6 soruyu doğru yanıtlayın — tümenini savaşa götüren bir Moğol noyanı gibi.",
    },
  },
  {
    id: "great-khan",
    name: {
      sv: "Stor-Khan",
      en: "Great Khan",
      tr: "Büyük Han",
    },
    icon: "👑",
    requiredScore: 10,
    description: {
      sv: "Svara rätt på 10 frågor — som Djingis Khan själv, erövraren av halva världen.",
      en: "Answer 10 questions correctly — like Genghis Khan himself, conqueror of half the world.",
      tr: "10 soruyu doğru yanıtlayın — dünyanın yarısının fatihi Cengiz Han'ın kendisi gibi.",
    },
  },
  {
    id: "subutai-genius",
    name: {
      sv: "Subutais geni",
      en: "Subutai's Genius",
      tr: "Subutay'ın Dehası",
    },
    icon: "🌟",
    requiredScore: 14,
    description: {
      sv: "Svara rätt på alla 14 frågor — som den legendariske generalen Subutai, som aldrig förlorade ett slag.",
      en: "Answer all 14 questions correctly — like the legendary General Subutai, who never lost a battle.",
      tr: "Tüm 14 soruyu doğru yanıtlayın — hiç savaş kaybetmemiş efsanevi General Subutay gibi.",
    },
  },
];

// =============================================================================
// PROFILES
// =============================================================================

const mongolProfiles: HistoricalProfile[] = [
  {
    id: "genghis-khan",
    name: "Genghis Khan (Temüjin)",
    years: "ca 1162–1227",
    title: {
      sv: "Universell Khan — Världserövraren",
      en: "Universal Khan — Conqueror of the World",
      tr: "Evrensel Han — Dünyanın Fatihi",
    },
    portrait: "⚔️",
    bio: {
      sv: "Temüjin — senare Djingis Khan — är en av historiens mest fascinerande och kontroversiella figurer. Han föddes i fattigdom, förlorade sin far tidigt, kidnappades av rivalklan, och levde som flykting och fånge. Från dessa förödmjukande början reste han sig till att bli ledare för det största landimperiet i historien. Hans militära geni var enastående: han kombinerade absolut brutalitet med exceptionell strategisk tänkande, religiös tolerans, och en förmåga att absorbera och använda besegrades teknologi och kompetens. Han var analfabet men skapade ett skriftspråk för mongoler. Han förstörde civilisationer men uppmuntrade handel, meritokrati och rättvisa.",
      en: "Temüjin — later Genghis Khan — is one of history's most fascinating and controversial figures. He was born into poverty, lost his father early, was kidnapped by a rival clan, and lived as a fugitive and captive. From these humiliating beginnings he rose to become the leader of the largest land empire in history. His military genius was exceptional: he combined absolute brutality with exceptional strategic thinking, religious tolerance, and an ability to absorb and use the technology and skills of those he conquered. He was illiterate but created a written language for the Mongols. He destroyed civilizations but encouraged trade, meritocracy, and justice.",
      tr: "Temüjin — sonradan Cengiz Han — tarihin en büyüleyici ve tartışmalı figürlerinden biridir.",
    },
    reforms: {
      sv: [
        "Skapade Yasa — mongolisk lagkod med religionsfrihet och handelsskydd",
        "Instiftade det revolutionära Yam-postsystemet",
        "Meritokrati ersatte aristocratisk börd i befordringar",
        "Skapade det mongoliska alfabetet (Uyghur-baserat)",
        "Förbjöd slaveri av mongoler",
        "Skyddade religiösa ledare från skatt",
        "Standardiserade vikter och mått för handel",
        "Förbjöd kidnappning och stöld",
      ],
      en: [
        "Created the Yasa — Mongol legal code with religious freedom and trade protection",
        "Established the revolutionary Yam postal system",
        "Meritocracy replaced aristocratic birth in promotions",
        "Created the Mongolian alphabet (Uyghur-based)",
        "Banned slavery of Mongols",
        "Protected religious leaders from taxation",
        "Standardized weights and measures for trade",
        "Forbade kidnapping and theft",
      ],
      tr: [
        "Din özgürlüğü ve ticaret koruması içeren Moğol hukuk kanunu Yasa'yı oluşturdu",
        "Devrimci Yam posta sistemini kurdu",
        "Terfide aristokratik soy yerini liyakate bıraktı",
        "Moğol alfabesini (Uygur tabanlı) oluşturdu",
        "Moğolların köleleştirilmesini yasakladı",
        "Dini liderleri vergiden muaf tuttu",
      ],
    },
    campaigns: {
      sv: [
        "Enade mongoliska stammar (1185–1206)",
        "Kampanjen mot Xi Xia (1205–1209, 1226–1227)",
        "Invasion av Jin-dynastin i Kina (1211–1215)",
        "Erövringen av Khwarezmimperiet (1219–1221)",
        "Invasionen av Persien och Kaukasus",
        "Kampanjen mot Kipchak-turkarna",
      ],
      en: [
        "Unification of Mongol tribes (1185–1206)",
        "Campaign against Xi Xia (1205–1209, 1226–1227)",
        "Invasion of the Jin dynasty in China (1211–1215)",
        "Conquest of the Khwarezm Empire (1219–1221)",
        "Invasion of Persia and the Caucasus",
        "Campaign against the Kipchak Turks",
      ],
      tr: [
        "Moğol kabilelerinin birleştirilmesi (1185-1206)",
        "Xi Xia'ya karşı sefer (1205-1209, 1226-1227)",
        "Çin Jin hanedanının işgali (1211-1215)",
        "Harezmşah İmparatorluğu'nun fethi (1219-1221)",
        "Pers ve Kafkasya'nın işgali",
      ],
    },
    leadershipStyle: {
      sv: "Djingis Khan kombinerade absolut auktoritet med en remarkabel förmåga att delegera till betrodda generaler. Han var känd för sin personliga mod — han ledde alltid från fronten och delade sina soldaters umbäranden. Han var exceptionellt lojal mot dem som tjänade honom väl och lika exceptionellt hänsynslös mot dem som förrådde hans förtroende. Han befordrade på förtjänst, inte börd, och rekryterade talanger från besegrat folk — kinesiska ingenjörer, persiska administratörer, turkiska hästeridare.",
      en: "Genghis Khan combined absolute authority with a remarkable ability to delegate to trusted generals. He was known for his personal courage — he always led from the front and shared his soldiers' hardships. He was exceptionally loyal to those who served him well and equally ruthless to those who betrayed his trust. He promoted on merit, not birth, and recruited talent from conquered peoples — Chinese engineers, Persian administrators, Turkish horsemen.",
      tr: "Cengiz Han, mutlak otoriteyi güvenilen generallere delege etme konusundaki olağanüstü yeteneğiyle birleştirdi.",
    },
    criticalPerspectives: {
      sv: "Djingis Khans arv är djupt kontroversiellt. Hans kampanjer orsakade massiva civila förluster — uppskattningsvis 40 miljoner döda i hans krig, vilket kan ha representerat 10% av dåtidens världsbefolkning. Khwarezmimperiets och Bagdads förstörelse utplånade sekel av islamisk lärdom och civilisation. Hans ättlingars kampanjer orsakade den Svarta Döden att spridas längs Sidenvägen. Och ändå: han skapade den längsta perioden av fred och handel längs Sidenvägen i historien, garanterade religionsfrihet, och hans meritokratiska principer var revolutionära för sin tid.",
      en: "Genghis Khan's legacy is deeply controversial. His campaigns caused massive civilian casualties — an estimated 40 million dead in his wars, which may have represented 10% of the world's population at the time. The destruction of the Khwarezm Empire and Baghdad obliterated centuries of Islamic scholarship and civilization. His descendants' campaigns caused the Black Death to spread along the Silk Road. And yet: he created the longest period of peace and trade along the Silk Road in history, guaranteed religious freedom, and his meritocratic principles were revolutionary for his time.",
      tr: "Cengiz Han'ın mirası derin biçimde tartışmalıdır.",
    },
  },
  {
    id: "subutai",
    name: "Subutai Baghatur",
    years: "ca 1175–1248",
    title: {
      sv: "Guds pil — Historiens mest framgångsrike general",
      en: "Arrow of God — History's Most Successful General",
      tr: "Tanrı'nın Oku — Tarihin En Başarılı Generali",
    },
    portrait: "🏹",
    bio: {
      sv: "Subutai är av många militärhistoriker betraktad som historiens mest briljante taktiker. Han tjänade under Djingis Khan och hans efterföljare i över 40 år och ledde mer än 20 kampanjer. Han vann mer än 65 avgörande slag — aldrig utan ett enda förlust i öppen strid. Han var son till en smed och inte av mongolisk adelsbörde, men befordrades på ren förtjänst till den högsta militära rangen. Hans rekognosering runt Kaspiska havet var militärhistoriens mest ambitiösa underrättelseuppdrag. Hans invasion av Europa visade en strategi och koordination som Europa inte stötte på igen förrän Napoleon.",
      en: "Subutai is considered by many military historians to be history's most brilliant tactician. He served under Genghis Khan and his successors for over 40 years and led more than 20 campaigns. He won more than 65 decisive battles — never losing a single one in open combat. He was the son of a blacksmith and not of Mongol noble birth, but was promoted on pure merit to the highest military rank. His reconnaissance around the Caspian Sea was the most ambitious intelligence mission in military history. His invasion of Europe displayed a strategy and coordination that Europe would not encounter again until Napoleon.",
      tr: "Subutay, birçok askeri tarihçi tarafından tarihin en parlak taktikçisi olarak kabul edilir.",
    },
    reforms: {
      sv: [
        "Revolutionerade mongolisk militär taktik med koordinerade flankangrepp",
        "Utvecklade avancerad underrättelse- och spionageteknik",
        "Introducerade psykologisk krigföring som systematisk taktik",
        "Perfektionerade den falska reträttmanövern",
        "Koordinerade angrepp på separata fronter med precision",
      ],
      en: [
        "Revolutionized Mongol military tactics with coordinated flank attacks",
        "Developed advanced intelligence and espionage techniques",
        "Introduced psychological warfare as a systematic tactic",
        "Perfected the feigned retreat maneuver",
        "Coordinated attacks on separate fronts with precision",
      ],
      tr: [
        "Koordineli kanat saldırılarıyla Moğol askeri taktiklerini devrimleştirdi",
        "Gelişmiş istihbarat ve casusluk teknikleri geliştirdi",
        "Psikolojik savaşı sistematik bir taktik olarak tanıttı",
        "Sahte geri çekilme manevralarını mükemmelleştirdi",
      ],
    },
    campaigns: {
      sv: [
        "Rekognosering runt Kaspiska havet (1221–1224)",
        "Invasionen av Ryssland (1237–1238)",
        "Invasionen av Europa — Legnica och Mohi (1241)",
        "Kampanjen mot Khwarezmimperiet",
        "Invasionen av Kina mot Jin-dynastin",
        "Kampanjen mot Bulgarien och Serbien",
      ],
      en: [
        "Reconnaissance around the Caspian Sea (1221–1224)",
        "Invasion of Russia (1237–1238)",
        "Invasion of Europe — Legnica and Mohi (1241)",
        "Campaign against the Khwarezm Empire",
        "Invasion of China against the Jin dynasty",
        "Campaign against Bulgaria and Serbia",
      ],
      tr: [
        "Hazar Denizi çevresinde keşif (1221-1224)",
        "Rusya'nın işgali (1237-1238)",
        "Avrupa'nın istilası — Legnica ve Mohi (1241)",
        "Harezmşah İmparatorluğu'na karşı sefer",
      ],
    },
    leadershipStyle: {
      sv: "Subutai var känd för sin extraordinära förmåga att planera på lång sikt — han planerade kampanjer år i förväg, samlade intelligence om fienders svaga punkter, och koordinerade arméer som opererade hundratals kilometer från varandra. Han var aldrig dogmatisk i sin taktik utan anpassade sig till varje situation. Han var en mästare på psykologisk krigföring: han spred rykten, använde spioner och sabotörer, och skapade panik hos sina fiender innan ett enda svärd drogs.",
      en: "Subutai was known for his extraordinary ability to plan for the long term — he planned campaigns years in advance, gathered intelligence about enemies' weaknesses, and coordinated armies operating hundreds of kilometers apart. He was never dogmatic in his tactics but adapted to each situation. He was a master of psychological warfare: he spread rumors, used spies and saboteurs, and created panic in his enemies before a single sword was drawn.",
      tr: "Subutay, uzun vadeli planlama konusundaki olağanüstü yeteneğiyle tanınırdı.",
    },
    criticalPerspectives: {
      sv: "Subutais kampanjer lämnade ett fruktansvärt spår av förstörelse. Städer som Ryazan, Vladimir och Kyiv förintades fullständigt. Hans strategi inkluderade avsiktligt terrorisering av civilbefolkning som ett vapen för att bryta motståndet. Och ändå: hans militära geni är obestridligt, och hans taktiska innovationer studeras fortfarande vid militärakademier världen över.",
      en: "Subutai's campaigns left a terrible trail of destruction. Cities like Ryazan, Vladimir, and Kyiv were completely annihilated. His strategy included the deliberate terrorization of civilian populations as a weapon to break resistance. And yet: his military genius is undeniable, and his tactical innovations are still studied at military academies worldwide.",
      tr: "Subutay'ın kampanyaları korkunç bir yıkım izi bıraktı.",
    },
  },
  {
    id: "kublai-khan",
    name: "Kublai Khan",
    years: "1215–1294",
    title: {
      sv: "Himmelens son — Kinas Stor-Khan",
      en: "Son of Heaven — Great Khan of China",
      tr: "Göğün Oğlu — Çin'in Büyük Hanı",
    },
    portrait: "🐉",
    bio: {
      sv: "Kublai Khan var Djingis Khans barnbarn och den siste av de store mongoliska härskarna. Han grundade Yuandynastin i Kina och byggde Khanbaliq (nutidens Beijing) som sin magnifika huvudstad. Kublai var djupt fascinerad av kinesisk kultur och buddbhism, och absorberade gradvis kinesisk administration och ceremoniell tradition. Hans hov var det mest kosmopolitiska i världen — han välkomnade kristna, muslimer, buddister, konfucianer och folk från Europa, Arabien, Persien och Indien. Marco Polo tjänade i hans hov i 17 år. Kublai skapade pappersmynt, byggde kanaler och förbättrade infrastruktur.",
      en: "Kublai Khan was Genghis Khan's grandson and the last of the great Mongol rulers. He founded the Yuan dynasty in China and built Khanbaliq (modern Beijing) as his magnificent capital. Kublai was deeply fascinated by Chinese culture and Buddhism, and gradually absorbed Chinese administration and ceremonial tradition. His court was the most cosmopolitan in the world — he welcomed Christians, Muslims, Buddhists, Confucians, and people from Europe, Arabia, Persia, and India. Marco Polo served in his court for 17 years. Kublai created paper money, built canals, and improved infrastructure.",
      tr: "Kubilay Han, Cengiz Han'ın torunu ve büyük Moğol hükümdarlarının sonuncusuydu.",
    },
    reforms: {
      sv: [
        "Grundade Yuandynastin och förenade Kina under mongoliskt styre",
        "Byggde Khanbaliq (Beijing) som ny magnifik huvudstad",
        "Introducerade pappersmynt i stor skala",
        "Utvidgade och förbättrade Kinesiska kanalsystemet",
        "Stödde handel längs Sidenvägen — Pax Mongolica",
        "Välkomnade utlänningar vid hovet — Marco Polo, muslimska handelsmän",
        "Skapade det 'Phags-pa' skriftsystemet för mongoler",
        "Etablerade poststationer och vägar tvärs Kina",
      ],
      en: [
        "Founded the Yuan dynasty and united China under Mongol rule",
        "Built Khanbaliq (Beijing) as the new magnificent capital",
        "Introduced paper money on a large scale",
        "Expanded and improved the Chinese canal system",
        "Supported trade along the Silk Road — Pax Mongolica",
        "Welcomed foreigners at court — Marco Polo, Muslim merchants",
        "Created the 'Phags-pa' script system for Mongols",
        "Established postal stations and roads across China",
      ],
      tr: [
        "Yuan hanedanını kurdu ve Çin'i Moğol yönetimi altında birleştirdi",
        "Yeni muhteşem başkent olarak Khanbaliq'i (Pekin) inşa etti",
        "Büyük ölçekte kağıt para tanıttı",
        "Çin kanal sistemini genişletti ve iyileştirdi",
        "İpek Yolu'nda ticareti destekledi — Pax Mongolica",
      ],
    },
    campaigns: {
      sv: [
        "Erövringen av södra Kina (Song-dynastin) (1267–1279)",
        "Misslyckad invasion av Japan (1274 och 1281)",
        "Invasionen av Burma (1277–1287)",
        "Invasionen av Vietnam (1257, 1284, 1287)",
        "Misslyckad invasion av Java (1293)",
      ],
      en: [
        "Conquest of southern China (Song dynasty) (1267–1279)",
        "Failed invasion of Japan (1274 and 1281)",
        "Invasion of Burma (1277–1287)",
        "Invasion of Vietnam (1257, 1284, 1287)",
        "Failed invasion of Java (1293)",
      ],
      tr: [
        "Güney Çin'in fethi (Song hanedanı) (1267-1279)",
        "Japonya'ya başarısız istila (1274 ve 1281)",
        "Burma'nın işgali (1277-1287)",
        "Vietnam'ın işgali (1257, 1284, 1287)",
        "Java'ya başarısız istila (1293)",
      ],
    },
    leadershipStyle: {
      sv: "Kublai Khan var mer en statsbyggare än en militär befälhavare. Han delegerade militära kampanjer till sina generaler och fokuserade på administration, handel och kultur. Han var en pragmatisk härskare som förstod att ett land av Kinas storlek och komplexitet krävde integration av inhemsk expertis. Hans beslut att anta kinesisk administrativ praxis var pragmatisk — men det alienerade traditionella mongoler som såg det som ett svek mot deras nomadiska identitet.",
      en: "Kublai Khan was more a state builder than a military commander. He delegated military campaigns to his generals and focused on administration, trade, and culture. He was a pragmatic ruler who understood that a country of China's size and complexity required the integration of indigenous expertise. His decision to adopt Chinese administrative practices was pragmatic — but it alienated traditional Mongols who saw it as a betrayal of their nomadic identity.",
      tr: "Kubilay Han, askeri komutandan çok bir devlet inşacısıydı.",
    },
    criticalPerspectives: {
      sv: "Kublai Khans styre var djupt splittrad i sin natur: han var en mongolisk Khan som regerade som kinesisk kejsare, och varken sida var helt nöjd. Hans kostsamma misslyckanden i Japan, Java och Vietnam tärde på imperiets resurser. Hans övervikt och alkoholproblem på hans äldre dagar reflekterar en man som hanterade förluster av älskade och en känsla av misslyckande. Och ändå: under hans styre nådde handel och kulturutbyte längs Sidenvägen historiska höjder.",
      en: "Kublai Khan's rule was deeply divided in nature: he was a Mongol Khan ruling as a Chinese emperor, and neither side was fully satisfied. His costly failures in Japan, Java, and Vietnam drained imperial resources. His obesity and drinking problem in his later years reflect a man coping with the losses of loved ones and a sense of failure. And yet: under his rule, trade and cultural exchange along the Silk Road reached historic heights.",
      tr: "Kubilay Han'ın yönetimi doğası gereği derin biçimde bölünmüştü.",
    },
  },
  {
    id: "batu-khan",
    name: "Batu Khan",
    years: "ca 1207–1255",
    title: {
      sv: "Khan av Gyllene Horden — Europas skräck",
      en: "Khan of the Golden Horde — Terror of Europe",
      tr: "Altın Orda Hanı — Avrupa'nın Korkusu",
    },
    portrait: "🌊",
    bio: {
      sv: "Batu Khan, Jochis son och Djingis Khans barnbarn, var den mongoliske prins som ledde den stora invasionen av Europa 1237–1242. Tillsammans med sin oöverträffade general Subutai ledde han arméer som besegrade Polen, Ungern och hotade hela Västeuropa. Han grundade sedan Gyllene Horden — det khanate som styrde Ryssland och Osteuropa i över 250 år. Hans namnlivet i mongolisk historia är 'Sain Khan' — den gode Khan — känd för sin rättvisa och generositet mot sina egna folk. Hans khanate var religiöst tolerant och tillät ryska furstar att regera som vasaller.",
      en: "Batu Khan, son of Jochi and grandson of Genghis Khan, was the Mongol prince who led the great invasion of Europe in 1237–1242. Together with his incomparable general Subutai he led armies that defeated Poland, Hungary, and threatened all of Western Europe. He then founded the Golden Horde — the khanate that ruled Russia and Eastern Europe for over 250 years. His nickname in Mongol history is 'Sain Khan' — the Good Khan — known for his justice and generosity toward his own people. His khanate was religiously tolerant and allowed Russian princes to rule as vassals.",
      tr: "Jochi'nin oğlu ve Cengiz Han'ın torunu Batu Han, 1237-1242 yıllarında büyük Avrupa istilasına liderlik eden Moğol prensiydi.",
    },
    reforms: {
      sv: [
        "Grundade Gyllene Horden som ett stabilt khanate",
        "Etablerade Sarai som prunkande hauptstadt vid Volga",
        "Tillät ryska furstar att behålla sin autonomi som vasaller",
        "Garanterade religionsfrihet i sitt khanate",
        "Skapade effektiva skatteuppbördssystem i Ryssland",
      ],
      en: [
        "Founded the Golden Horde as a stable khanate",
        "Established Sarai as a splendid capital on the Volga",
        "Allowed Russian princes to retain their autonomy as vassals",
        "Guaranteed religious freedom in his khanate",
        "Created effective tax collection systems in Russia",
      ],
      tr: [
        "Altın Orda'yı istikrarlı bir hanlık olarak kurdu",
        "Volga üzerinde Sarai'yi muhteşem başkent olarak kurdu",
        "Rus prenslerinin vasal olarak özerkliklerini korumalarına izin verdi",
        "Hanlığında din özgürlüğünü güvence altına aldı",
      ],
    },
    campaigns: {
      sv: [
        "Invasion av Bulgarien (1237)",
        "Invasion av Ryssland (1237–1238, 1239–1240)",
        "Förstörelsen av Kyiv (1240)",
        "Invasionen av Polen — Legnica (1241)",
        "Invasionen av Ungern — Mohi (1241)",
        "Invasionen av Kroatien och Dalmatien (1241–1242)",
      ],
      en: [
        "Invasion of Bulgaria (1237)",
        "Invasion of Russia (1237–1238, 1239–1240)",
        "Destruction of Kyiv (1240)",
        "Invasion of Poland — Legnica (1241)",
        "Invasion of Hungary — Mohi (1241)",
        "Invasion of Croatia and Dalmatia (1241–1242)",
      ],
      tr: [
        "Bulgaristan'ın işgali (1237)",
        "Rusya'nın işgali (1237-1238, 1239-1240)",
        "Kyiv'in yıkılması (1240)",
        "Polonya'nın işgali — Legnica (1241)",
        "Macaristan'ın işgali — Mohi (1241)",
      ],
    },
    leadershipStyle: {
      sv: "Batu Khan var känd för sin taktfullhet och diplomatiska förmåga inom det mongoliska imperiets politiska struktur. Han var skicklig på att balansera interna maktstrukturer och upprätthålla lojaliteten hos sina vasaller. I kontrast till hans kampanjer var hans styre av Gyllene Horden relativt moderat — han förstod värdet av stabila handelsnätverk och administrativa system.",
      en: "Batu Khan was known for his tact and diplomatic ability within the Mongol Empire's political structure. He was skilled at balancing internal power structures and maintaining the loyalty of his vassals. In contrast to his campaigns, his rule of the Golden Horde was relatively moderate — he understood the value of stable trading networks and administrative systems.",
      tr: "Batu Han, Moğol İmparatorluğu'nun siyasi yapısındaki zarafeti ve diplomatik yeteneğiyle tanınırdı.",
    },
    criticalPerspectives: {
      sv: "Batu Khans kampanjer i Östeuropa och Ryssland var förödande för civilbefolkningarna. Städer som Ryazan, Vladimir och Kyiv förintades. Rysslands befolkning kan ha minskat med en tredjedel under mongolernas invasioner. Det 'Tatariska oket' — mongolisk dominans över Ryssland i över 200 år — formar fortfarande den ryska politiska kulturen och den ryska identitetens relation till 'Öst' och 'Väst'.",
      en: "Batu Khan's campaigns in Eastern Europe and Russia were devastating for civilian populations. Cities like Ryazan, Vladimir, and Kyiv were annihilated. Russia's population may have declined by a third during the Mongol invasions. The 'Tatar Yoke' — Mongol dominance over Russia for over 200 years — still shapes Russian political culture and the Russian identity's relationship to 'East' and 'West'.",
      tr: "Batu Han'ın Doğu Avrupa ve Rusya'daki kampanyaları sivil halk için yıkıcıydı.",
    },
  },
  {
    id: "ogedei-khan",
    name: "Ögedei Khan",
    years: "1186–1241",
    title: {
      sv: "Imperiets arkitekt — Karakorums grundare",
      en: "Architect of the Empire — Founder of Karakorum",
      tr: "İmparatorluğun Mimarı — Karakurum'un Kurucusu",
    },
    portrait: "🏛️",
    bio: {
      sv: "Ögedei Khan, Djingis Khans tredje son och hans personligt utsedde efterföljare, var på många sätt den person som konsoliderade och institutionaliserade det mongoliska imperiets storhet. Han byggde Karakorum — en magnifik och kosmopolitisk stad mitt i mongoliska stäppen — som imperiets permanenta huvudstad. Han etablerade Yam-postsystemet, standardiserade skatteuppbörden, och skapade en central administration. Under hans styre erövrades norra Kina fullständigt, och det var han som planerade och organiserade invasionen av Europa.",
      en: "Ögedei Khan, Genghis Khan's third son and his personally designated successor, was in many ways the person who consolidated and institutionalized the greatness of the Mongol Empire. He built Karakorum — a magnificent and cosmopolitan city in the middle of the Mongolian steppe — as the empire's permanent capital. He established the Yam postal system, standardized tax collection, and created a central administration. Under his rule northern China was completely conquered, and it was he who planned and organized the invasion of Europe.",
      tr: "Ögedey Han, Cengiz Han'ın üçüncü oğlu ve kişisel olarak belirlediği halefi, pek çok açıdan Moğol İmparatorluğu'nun büyüklüğünü pekiştiren ve kurumsallaştıran kişiydi.",
    },
    reforms: {
      sv: [
        "Byggde Karakorum som imperiets permanenta magnifika huvudstad",
        "Etablerade Yam-postsystemet med relay-stationer",
        "Standardiserade skatteuppbörden i hela imperiet",
        "Skapade en permanent central administration",
        "Inrättade ett officiellt skrivarsystem för mongoliska dokument",
        "Finansierade imperiets enorma expansion med effektiv ekonomi",
      ],
      en: [
        "Built Karakorum as the empire's permanent magnificent capital",
        "Established the Yam postal system with relay stations",
        "Standardized tax collection across the entire empire",
        "Created a permanent central administration",
        "Established an official scribal system for Mongolian documents",
        "Financed the empire's enormous expansion with efficient economy",
      ],
      tr: [
        "İmparatorluğun kalıcı muhteşem başkenti olarak Karakurum'u inşa etti",
        "Aktarma istasyonlarıyla Yam posta sistemini kurdu",
        "Tüm imparatorlukta vergi tahsilatını standartlaştırdı",
        "Kalıcı merkezi bir yönetim kurdu",
      ],
    },
    campaigns: {
      sv: [
        "Erövringen av norra Kina (Jin-dynastin) (1231–1234)",
        "Kampanjen mot Goryeo (Korea) (1231)",
        "Planlade och finansierade invasionen av Europa",
        "Kampanjen mot Persien och Georgien",
      ],
      en: [
        "Conquest of northern China (Jin dynasty) (1231–1234)",
        "Campaign against Goryeo (Korea) (1231)",
        "Planned and financed the invasion of Europe",
        "Campaign against Persia and Georgia",
      ],
      tr: [
        "Kuzey Çin'in fethi (Jin hanedanı) (1231-1234)",
        "Goryeo'ya (Kore) karşı sefer (1231)",
        "Avrupa istilasını planlayıp finanse etti",
        "Pers ve Gürcistan'a karşı sefer",
      ],
    },
    leadershipStyle: {
      sv: "Ögedei Khan var mer diplomatisk och karismatisk än sin far. Han var känd för sin generositet — ibland till excessiva nivåer — och sin förmåga att skapa konsensus bland de rivaliserande mongoliska prinsarna. Han drack mycket, vilket bidrog till hans tidiga död vid 56 år. Hans viktigaste egenskap var förmågan att se imperiets administrativa behov och agera för att möta dem.",
      en: "Ögedei Khan was more diplomatic and charismatic than his father. He was known for his generosity — sometimes to excessive levels — and his ability to create consensus among the rivaling Mongol princes. He drank heavily, which contributed to his early death at 56. His most important quality was the ability to see the empire's administrative needs and act to meet them.",
      tr: "Ögedey Han, babasından daha diplomatik ve karizmatikti.",
    },
    criticalPerspectives: {
      sv: "Ögedeis alkoholism — ett problem han delade med flera av Djingis Khans söner — var en strukturell svaghet i det mongoliska ledarskapet. Hans tidiga död vid 56 år räddade troligen Västeuropa från mongolisk erövring. Och ändå: hans administrativa reformer var imperiets ryggrad och möjliggjorde dess enorma geografiska räckvidd.",
      en: "Ögedei's alcoholism — a problem he shared with several of Genghis Khan's sons — was a structural weakness in Mongol leadership. His early death at 56 likely saved Western Europe from Mongol conquest. And yet: his administrative reforms were the empire's backbone and enabled its enormous geographical reach.",
      tr: "Ögedey'in alkolizmi — Cengiz Han'ın birkaç oğluyla paylaştığı bir sorun — Moğol liderliğindeki yapısal bir zayıflıktı.",
    },
  },
  {
    id: "mongke-khan",
    name: "Möngke Khan",
    years: "1209–1259",
    title: {
      sv: "Den store reformatorn — Imperiets konsolidator",
      en: "The Great Reformer — Consolidator of the Empire",
      tr: "Büyük Reformcu — İmparatorluğun Pekiştiricisi",
    },
    portrait: "📜",
    bio: {
      sv: "Möngke Khan, son till Tolui och barnbarn till Djingis Khan, var den siste av de riktigt store mongoliska Stor-Khanerna. Han var känd för sin personliga ärlighet, asketiska levnadssätt och administrativa kompetens. Han bekämpade korruption med järnhand, genomförde en generell folkräkning i hela imperiet, och reformerade skattesystemet. Under hans styre skickade han sina bröder Hülegü och Kublai ut på de sista stora erövringskampanjerna — Hülegü mot Mellanöstern och Bagdad, Kublai mot södra Kina. Möngke dog under belägringen av den kinesiska staden Diaoyu i 1259.",
      en: "Möngke Khan, son of Tolui and grandson of Genghis Khan, was the last of the truly great Mongol Great Khans. He was known for his personal honesty, ascetic lifestyle, and administrative competence. He fought corruption with an iron hand, conducted a general census of the entire empire, and reformed the tax system. Under his rule he sent his brothers Hülegü and Kublai on the last great conquest campaigns — Hülegü against the Middle East and Baghdad, Kublai against southern China. Möngke died during the siege of the Chinese city of Diaoyu in 1259.",
      tr: "Tolui'nin oğlu ve Cengiz Han'ın torunu Möngke Han, gerçek anlamda büyük Moğol Büyük Hanlarının sonuncusuydu.",
    },
    reforms: {
      sv: [
        "Genomförde den första generella folkräkningen i det mongoliska imperiet",
        "Reformerade skattesystemet för rättvisa och effektivitet",
        "Bekämpade systematisk korruption bland mongoliska ämbetsmän",
        "Stärkte den centrala administrationen",
        "Garanterade handelsmäns rättigheter och säkerhet",
        "Organiserade de sista stora erövringskampanjerna",
      ],
      en: [
        "Conducted the first general census of the Mongol Empire",
        "Reformed the tax system for fairness and efficiency",
        "Systematically fought corruption among Mongol officials",
        "Strengthened the central administration",
        "Guaranteed merchants' rights and safety",
        "Organized the last great conquest campaigns",
      ],
      tr: [
        "Moğol İmparatorluğu'nun ilk genel nüfus sayımını yaptı",
        "Adalet ve verimlilik için vergi sistemini reform etti",
        "Moğol yetkililer arasındaki yolsuzlukla sistematik olarak mücadele etti",
        "Merkezi yönetimi güçlendirdi",
      ],
    },
    campaigns: {
      sv: [
        "Skickade Hülegü att erövra Mellanöstern och förstöra Bagdad (1258)",
        "Skickade Kublai att erövra södra Kina (Song-dynastin)",
        "Kampanjer mot rebellerande grupper i Centralasien",
        "Belägringen av Diaoyu — Möngkes sista kampanj (1259)",
      ],
      en: [
        "Sent Hülegü to conquer the Middle East and destroy Baghdad (1258)",
        "Sent Kublai to conquer southern China (Song dynasty)",
        "Campaigns against rebellious groups in Central Asia",
        "Siege of Diaoyu — Möngke's last campaign (1259)",
      ],
      tr: [
        "Hülegü'yü Orta Doğu'yu fethetmeye ve Bağdat'ı yok etmeye gönderdi (1258)",
        "Kubilay'ı güney Çin'i fethetmeye gönderdi (Song hanedanı)",
        "Orta Asya'daki isyancı gruplara karşı seferler",
      ],
    },
    leadershipStyle: {
      sv: "Möngke Khan var känd för sin personliga asketism och integritet i en period när andra mongoliska prinsar levde i överflöd och lyx. Han föregick med gott exempel och förväntade sig samma standard av sina administratörer. Han var en effektiv och rättvis ledare vars styre präglades av ordning och rättvisa — en stark kontrast till den instabila perioden efter Ögedeis och Güyüks mort.",
      en: "Möngke Khan was known for his personal asceticism and integrity in a period when other Mongol princes lived in abundance and luxury. He led by example and expected the same standards from his administrators. He was an effective and just leader whose rule was characterized by order and justice — a strong contrast to the unstable period after the deaths of Ögedei and Güyük.",
      tr: "Möngke Han, diğer Moğol prenslerinin bolluk ve lüks içinde yaşadığı bir dönemde kişisel çileciliği ve dürüstlüğüyle tanınırdı.",
    },
    criticalPerspectives: {
      sv: "Möngkes beslut att skicka Hülegü mot Bagdad resulterade i en av historiens mest förödande kulturella katastrofer. Hans styre var effektivt men kortlivat — hans plötsliga död 1259 utlöste en ny successionskonflikt som permanent splittrade imperiet.",
      en: "Möngke's decision to send Hülegü against Baghdad resulted in one of history's most devastating cultural catastrophes. His rule was effective but short-lived — his sudden death in 1259 triggered a new succession conflict that permanently split the empire.",
      tr: "Möngke'nin Hülegü'yü Bağdat'a göndermesi, tarihin en yıkıcı kültürel felaketlerinden biriyle sonuçlandı.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const mongolTerritories: TerritoryPeriod[] = [
  {
    yearStart: 1206,
    yearEnd: 1227,
    label: {
      sv: "Djingis Khans enade Mongolia",
      en: "Genghis Khan's United Mongolia",
      tr: "Cengiz Han'ın Birleşik Moğolistan'ı",
    },
    color: "#8B0000",
    polygon: [[
      [42.0, 87.0], [48.0, 87.0], [52.0, 95.0], [52.0, 105.0],
      [50.0, 115.0], [47.0, 120.0], [44.0, 120.0], [40.0, 115.0],
      [38.0, 108.0], [38.0, 97.0], [40.0, 90.0], [42.0, 87.0],
    ]],
  },
  {
    yearStart: 1227,
    yearEnd: 1260,
    label: {
      sv: "Mongoliska imperiet på höjdpunkten",
      en: "Mongol Empire at its Peak",
      tr: "Zirvedeki Moğol İmparatorluğu",
    },
    color: "#A0001A",
    polygon: [[
      [50.0, 25.0], [55.0, 35.0], [55.0, 45.0], [50.0, 55.0],
      [45.0, 60.0], [42.0, 68.0], [40.0, 75.0], [38.0, 80.0],
      [35.0, 85.0], [30.0, 88.0], [25.0, 88.0], [20.0, 85.0],
      [15.0, 80.0], [18.0, 75.0], [20.0, 70.0], [22.0, 65.0],
      [25.0, 60.0], [28.0, 55.0], [30.0, 50.0], [32.0, 45.0],
      [35.0, 42.0], [38.0, 40.0], [40.0, 35.0], [40.0, 30.0],
      [42.0, 25.0], [45.0, 22.0], [50.0, 22.0], [52.0, 25.0],
      [55.0, 28.0], [56.0, 32.0], [55.0, 38.0], [52.0, 42.0],
      [50.0, 48.0], [48.0, 55.0], [46.0, 62.0], [44.0, 68.0],
      [42.0, 75.0], [40.0, 80.0], [38.0, 85.0], [35.0, 88.0],
      [32.0, 90.0], [28.0, 92.0], [24.0, 92.0], [20.0, 90.0],
      [18.0, 85.0], [20.0, 80.0], [22.0, 75.0], [25.0, 70.0],
      [28.0, 65.0], [30.0, 60.0], [32.0, 55.0], [35.0, 50.0],
      [38.0, 45.0], [40.0, 40.0], [42.0, 35.0], [44.0, 30.0],
      [46.0, 25.0], [50.0, 25.0],
    ]],
  },
  {
    yearStart: 1260,
    yearEnd: 1368,
    label: {
      sv: "Det splittrade mongoliska imperiet — fyra khanaten",
      en: "The Fragmented Mongol Empire — Four Khanates",
      tr: "Parçalanmış Moğol İmparatorluğu — Dört Hanlık",
    },
    color: "#CC2200",
    polygon: [[
      [50.0, 87.0], [55.0, 95.0], [55.0, 105.0], [52.0, 115.0],
      [48.0, 122.0], [42.0, 125.0], [35.0, 122.0], [28.0, 118.0],
      [22.0, 112.0], [18.0, 105.0], [16.0, 98.0], [17.0, 90.0],
      [20.0, 85.0], [24.0, 82.0], [28.0, 80.0], [32.0, 80.0],
      [36.0, 82.0], [40.0, 85.0], [44.0, 87.0], [48.0, 87.0],
      [50.0, 87.0],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const mongolTradeRoutes: TradeRouteGeo[] = [
  {
    id: "silk-road-mongol",
    name: {
      sv: "Sidenvägen under Pax Mongolica",
      en: "The Silk Road under Pax Mongolica",
      tr: "Pax Mongolica altında İpek Yolu",
    },
    yearActive: 1250,
    path: [
      [41.0, 29.0], [40.0, 40.0], [38.0, 50.0],
      [38.0, 60.0], [38.0, 70.0], [39.0, 80.0],
      [40.0, 90.0], [42.0, 100.0], [40.0, 110.0],
      [35.0, 116.0],
    ],
  },
  {
    id: "steppe-road",
    name: {
      sv: "Stäppvägen — Karakorum till Europa",
      en: "Steppe Road — Karakorum to Europe",
      tr: "Bozkır Yolu — Karakurum'dan Avrupa'ya",
    },
    yearActive: 1230,
    path: [
      [47.0, 102.0], [48.0, 90.0], [49.0, 78.0],
      [50.0, 65.0], [50.0, 52.0], [48.0, 40.0],
      [48.0, 30.0], [52.0, 24.0],
    ],
  },
  {
    id: "yam-postal-network",
    name: {
      sv: "Yam-nätverket — Imperiets nervbanor",
      en: "Yam Network — Empire's Neural Pathways",
      tr: "Yam Ağı — İmparatorluğun Sinir Yolları",
    },
    yearActive: 1235,
    path: [
      [47.0, 102.0], [45.0, 90.0], [42.0, 80.0],
      [40.0, 70.0], [38.0, 60.0], [36.0, 50.0],
      [34.0, 44.0], [33.0, 36.0],
    ],
  },
  {
    id: "china-persia-route",
    name: {
      sv: "Kina-Persien handelsnätverk",
      en: "China-Persia Trade Network",
      tr: "Çin-Pers Ticaret Ağı",
    },
    yearActive: 1260,
    path: [
      [35.0, 116.0], [36.0, 104.0], [38.0, 95.0],
      [37.0, 85.0], [35.0, 75.0], [33.0, 65.0],
      [33.0, 55.0], [35.0, 51.0],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const mongolEmpire: EmpireConfig = {
  id: "mongol_empire",
  name: {
    sv: "Mongoliska Imperiet",
    en: "Mongol Empire",
    tr: "Moğol İmparatorluğu",
  },
  theme: "mongol",
  appTitle: "Mongol Empire Intelligence",
  crestImage: mongolCrest,
  backgroundImage: mongolBackground,
  leaderTitle: { sv: "Khan", en: "Khan", tr: "Han" },
  dynastyTitle: {
    sv: "Mongolisk Dynasti",
    en: "Mongol Dynasty",
    tr: "Moğol Hanedanı",
  },
  timeline: mongolTimeline,
  leaders: mongolLeaders,
  profiles: mongolProfiles,
  figures: [],
  quizQuestions: mongolQuizQuestions,
  badges: mongolBadges,
  territories: mongolTerritories,
  tradeRoutes: mongolTradeRoutes,
  mapCenter: [45, 80],
  mapZoom: 3,
  yearRange: [1162, 1368],
  yearDefault: 1240,
  chatSystemContext:
    "the Mongol Empire (1206–1368 AD). You are an expert on Mongol history covering Genghis Khan's rise from poverty to world conqueror, the great generals Subutai and Jebe, the invasions of China, Central Asia, Persia and Europe, the Pax Mongolica and Silk Road trade, Kublai Khan and the Yuan dynasty, and the legacy and eventual fragmentation of the greatest land empire in history. Treat this history with depth, nuance, and respect for the complexity of the Mongol legacy.",
  chatPlaceholders: {
    sv: "Ställ en fråga om det Mongoliska imperiet...",
    en: "Ask a question about the Mongol Empire...",
    tr: "Moğol İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Hur reste sig Temüjin från fattigdom till världserövrare?",
      "Vad var Subutais mest briljanta militära taktik?",
      "Hur påverkade mongolerna den globala handeln längs Sidenvägen?",
    ],
    en: [
      "How did Temüjin rise from poverty to world conqueror?",
      "What was Subutai's most brilliant military tactic?",
      "How did the Mongols affect global trade along the Silk Road?",
    ],
    tr: [
      "Temüjin yoksulluktan dünya fatihi olmaya nasıl yükseldi?",
      "Subutay'ın en parlak askeri taktiği neydi?",
      "Moğollar İpek Yolu'ndaki küresel ticareti nasıl etkiledi?",
    ],
  },
  homeDescription: {
    sv: "Utforska det Mongoliska imperiets historia (1162–1368 e.Kr.) — från Temüjins mirakulösa uppgång på stäppen till den största landmakten i historien — med AI-driven analys, tidslinje, kartor och quiz.",
    en: "Explore Mongol Empire history (1162–1368 AD) — from Temüjin's miraculous rise on the steppe to the greatest land power in history — with AI-driven analysis, timeline, maps and quiz.",
    tr: "Moğol İmparatorluğu tarihini (MS 1162–1368) — Temüjin'in bozkırdaki mucizevi yükselişinden tarihin en büyük kara gücüne kadar — AI destekli analiz ile keşfedin.",
  },
  mapTitle: {
    sv: "Mongoliska imperiets territorium",
    en: "Mongol Empire Territory",
    tr: "Moğol İmparatorluğu Toprakları",
  },
};
