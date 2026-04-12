import japanBackground from "@/assets/japan.jpg";
import japanLogo from "@/assets/japan2.jpg";
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
// TIMELINE — Japanese Empire (660 BC – 1947 AD) — 50+ events
// =============================================================================

const japaneseTimeline: TimelineEvent[] = [
  {
    year: -660,
    title: {
      sv: "Kejsar Jimmu grundar Japan — Den gudomliga ursprungslegenden",
      en: "Emperor Jimmu Founds Japan — The Divine Origin Legend",
      tr: "İmparator Jimmu Japonya'yı Kuruyor — İlahi Köken Efsanesi",
    },
    summary: {
      sv: "Enligt Kojiki och Nihon Shoki grundade Jimmu — ättling till solgudinnan Amaterasu — det japanska kejsardömet den 11 februari 660 f.Kr. Han enade stammarna på Yamato-slättens och utropades till det första kejsaren. Kejsarhusets obrustna linje från Jimmu till idag gör Japan till världens äldsta ärftliga monarki.",
      en: "According to the Kojiki and Nihon Shoki, Jimmu — descendant of the sun goddess Amaterasu — founded the Japanese imperial dynasty on 11 February 660 BC. He unified the tribes of the Yamato plain and was proclaimed the first emperor. The unbroken imperial line from Jimmu to today makes Japan the world's oldest hereditary monarchy.",
      tr: "Kojiki ve Nihon Shoki'ye göre Jimmu — güneş tanrıçası Amaterasu'nun soyundan — MÖ 11 Şubat 660'ta Japon imparatorluk hanedanını kurdu. Yamato ovasının kabilelerini birleştirerek ilk imparator ilan edildi.",
    },
    figures: ["Emperor Jimmu", "Amaterasu"],
    consequences: { sv: "Det japanska kejsardömet grundas.", en: "The Japanese imperial dynasty is founded.", tr: "Japon imparatorluk hanedanı kurulur." },
    impact: { sv: "Världens äldsta obrustna monarki börjar.", en: "The world's oldest unbroken monarchy begins.", tr: "Dünyanın en eski kesintisiz monarşisi başlar." },
    category: "politics",
    importance: "high",
  },
  {
    year: 57,
    title: {
      sv: "Japan skickar sändebud till Han-Kina",
      en: "Japan Sends Envoy to Han China",
      tr: "Japonya Han Çin'e Elçi Gönderiyor",
    },
    summary: {
      sv: "Kung Na av Wa skickar ett sändebud till Han-dynastins Kina och tar emot ett guldstämpel — ett av de äldsta bevarade dokumenten om Japan. Det bekräftar japansk kontakt med och påverkan från det kinesiska fastlandet tidigt under imperiet.",
      en: "King Na of Wa sends an envoy to Han Dynasty China and receives a gold seal — one of the earliest surviving documents about Japan. It confirms Japanese contact with and influence from the Chinese mainland early in the imperial period.",
      tr: "Wa Kralı Na, Han Hanedanı Çin'e bir elçi göndererek altın bir mühür alır — Japonya hakkındaki en eski belgelerin biridir.",
    },
    figures: ["King Na of Wa", "Emperor Guangwu of Han"],
    consequences: { sv: "Diplomatiska förbindelser med Kina etableras.", en: "Diplomatic ties with China established.", tr: "Çin ile diplomatik ilişkiler kurulur." },
    impact: { sv: "Kinesisk kultur börjar påverka Japan.", en: "Chinese culture begins influencing Japan.", tr: "Çin kültürü Japonya'yı etkilemeye başlar." },
    category: "politics",
    importance: "medium",
  },
  {
    year: 300,
    title: {
      sv: "Yamato-perioden — Det centraliserade kejsardömet formas",
      en: "Yamato Period — The Centralised Imperial State Takes Shape",
      tr: "Yamato Dönemi — Merkezi İmparatorluk Devleti Şekilleniyor",
    },
    summary: {
      sv: "Yamato-klanen konsoliderar sin makt över centrala Japan och etablerar den tidiga kejsarstatens strukturer. Kofun-kulturen (gravhögsperioden) blomstrar med enorma gravhögar för hövdingar och kejsare. Kontakter med Korea och Kina intensifieras och ger Japan skrift, buddhism och statskonst.",
      en: "The Yamato clan consolidates power over central Japan and establishes the structures of the early imperial state. Kofun culture (mound tomb period) flourishes with enormous burial mounds for chiefs and emperors. Contacts with Korea and China intensify, bringing Japan writing, Buddhism and statecraft.",
      tr: "Yamato klanı merkezi Japonya üzerindeki gücünü pekiştirir ve erken imparatorluk devletinin yapılarını kurar. Kofun kültürü büyük mezar höyükleriyle gelişir.",
    },
    figures: ["Yamato Clan Leaders"],
    consequences: { sv: "En centraliserad japansk stat börjar formas.", en: "A centralised Japanese state begins forming.", tr: "Merkezi bir Japon devleti şekillenmeye başlar." },
    impact: { sv: "Grunden för japonsk statsbyggnad läggs.", en: "Foundation of Japanese statebuilding laid.", tr: "Japon devlet kurmanın temeli atılır." },
    category: "politics",
    importance: "high",
  },
  {
    year: 552,
    title: {
      sv: "Buddhismen når Japan — En civilisatorisk revolution",
      en: "Buddhism Reaches Japan — A Civilisational Revolution",
      tr: "Budizm Japonya'ya Ulaşıyor — Medeniyetsel Bir Devrim",
    },
    summary: {
      sv: "Buddhismen introduceras i Japan från Korea (Baekje-riket). Denna händelse utlöser en djup kulturell och religiös transformation som omformar japansk konst, arkitektur, filosofi och politik för evigt. Tempel byggs, skulpturer skapas och ett nytt intellektuellt liv blomstrar i det japanska hovet.",
      en: "Buddhism is introduced to Japan from Korea (the kingdom of Baekje). This event triggers a profound cultural and religious transformation that reshapes Japanese art, architecture, philosophy and politics forever. Temples are built, sculptures created and a new intellectual life flourishes at the Japanese court.",
      tr: "Budizm, Kore'den (Baekje krallığı) Japonya'ya tanıtılır. Bu olay Japon sanatını, mimarisini, felsefesini ve siyasetini sonsuza dek yeniden şekillendiren derin bir kültürel ve dini dönüşümü tetikler.",
    },
    figures: ["Emperor Kinmei", "King Seong of Baekje"],
    consequences: { sv: "Buddhismen sprids genom Japan och förändrar kulturen.", en: "Buddhism spreads through Japan transforming culture.", tr: "Budizm Japonya'ya yayılarak kültürü dönüştürür." },
    impact: { sv: "Japansk konst, tempel och filosofi blomstrar.", en: "Japanese art, temples and philosophy flourish.", tr: "Japon sanatı, tapınakları ve felsefesi gelişir." },
    category: "religion",
    importance: "high",
  },
  {
    year: 604,
    title: {
      sv: "Prins Shotokus sjutton artiklar — Japans första konstitution",
      en: "Prince Shotoku's Seventeen Articles — Japan's First Constitution",
      tr: "Prens Shotoku'nun On Yedi Maddesi — Japonya'nın İlk Anayasası",
    },
    summary: {
      sv: "Prins Shotoku, regent för kejsarinnan Suiko, utfärdar Japans första konstitution — sjutton artiklar baserade på konfuciansk och buddhistisk etik. Dokumentet betonar harmoni (wa), lojalitet mot kejsaren och respekt för buddhismen. Det är ett av de mest inflytelserika dokumenten i japansk historia och lade grunden för en centraliserad kejsarstat.",
      en: "Prince Shotoku, regent for Empress Suiko, issues Japan's first constitution — seventeen articles based on Confucian and Buddhist ethics. The document emphasises harmony (wa), loyalty to the emperor and respect for Buddhism. One of the most influential documents in Japanese history, it laid the foundation for a centralised imperial state.",
      tr: "İmparatoriçe Suiko'nun naibi Prens Shotoku, Konfüçyüs ve Budist etiğine dayanan on yedi maddeden oluşan Japonya'nın ilk anayasasını çıkarır.",
    },
    figures: ["Prince Shotoku", "Empress Suiko"],
    consequences: { sv: "En konfuciansk statsfilosofi etableras i Japan.", en: "A Confucian philosophy of state is established.", tr: "Japonya'da Konfüçyüsçü bir devlet felsefesi kurulur." },
    impact: { sv: "Japansk statsfilosofi formas för generationer.", en: "Japanese political philosophy shaped for generations.", tr: "Japon siyasi felsefesi nesiller boyu şekillenir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 645,
    title: {
      sv: "Taika-reformen — Japan centraliseras",
      en: "Taika Reform — Japan is Centralised",
      tr: "Taika Reformu — Japonya Merkezileşiyor",
    },
    summary: {
      sv: "Kejsar Kotoku genomför Taika-reformen — en radikal omstrukturering av den japanska staten inspirerad av Tang-dynastins Kina. All mark nationaliseras under kejsaren, ett centralt ämbetsmannavälde inrättas och ett nationellt skattesystem skapas. Japan omvandlas från en klanbaserad till en centraliserad kejsarstat.",
      en: "Emperor Kotoku carries out the Taika Reform — a radical restructuring of the Japanese state inspired by Tang Dynasty China. All land is nationalised under the emperor, a central bureaucracy is established and a national tax system created. Japan transforms from a clan-based to a centralised imperial state.",
      tr: "İmparator Kotoku, Tang Hanedanı Çin'den ilham alan Taika Reformu'nu gerçekleştirir. Tüm topraklar imparator altında millileştirilir, merkezi bir bürokrasi kurulur.",
    },
    figures: ["Emperor Kotoku", "Nakatomi no Kamatari"],
    consequences: { sv: "Japan omvandlas till en centraliserad stat.", en: "Japan transforms into a centralised state.", tr: "Japonya merkezi bir devlete dönüşür." },
    impact: { sv: "Den kinesiska Tang-modellen formar japanskt styre.", en: "The Chinese Tang model shapes Japanese governance.", tr: "Çin Tang modeli Japon yönetimini şekillendirir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 710,
    title: {
      sv: "Nara — Japans första permanenta huvudstad",
      en: "Nara — Japan's First Permanent Capital",
      tr: "Nara — Japonya'nın İlk Kalıcı Başkenti",
    },
    summary: {
      sv: "Nara grundas som Japans första permanenta huvudstad, modellerad efter Tang-Kinas Chang'an. Kejsarinnan Genmei beslutar om flytten. Under Nara-perioden (710–794) blomstrar buddhistisk konst och arkitektur — Todai-ji-templet med sin kolossala Buddhaskulptur byggs, och de äldsta japanska skrifterna Kojiki och Nihon Shoki nedtecknas.",
      en: "Nara is established as Japan's first permanent capital, modelled after Tang China's Chang'an. Empress Genmei orders the move. During the Nara period (710–794) Buddhist art and architecture flourish — Todai-ji temple with its colossal Buddha sculpture is built, and the oldest Japanese chronicles Kojiki and Nihon Shoki are written.",
      tr: "Nara, Tang Çin'in Chang'an şehri model alınarak Japonya'nın ilk kalıcı başkenti olarak kurulur. İmparatoriçe Genmei taşınmayı emreder.",
    },
    figures: ["Empress Genmei", "Emperor Shomu"],
    consequences: { sv: "En stabil statlig huvudstad etableras.", en: "A stable state capital is established.", tr: "İstikrarlı bir devlet başkenti kurulur." },
    impact: { sv: "Nara-perioden skapar japansk nationell litteratur och konst.", en: "Nara period creates Japanese national literature and art.", tr: "Nara dönemi Japon ulusal edebiyatı ve sanatını yaratır." },
    category: "culture",
    importance: "high",
  },
  {
    year: 794,
    title: {
      sv: "Heian-kyo (Kyoto) — Den kejserliga erans guldålder börjar",
      en: "Heian-kyo (Kyoto) — The Imperial Era's Golden Age Begins",
      tr: "Heian-kyo (Kyoto) — İmparatorluk Çağının Altın Dönemi Başlıyor",
    },
    summary: {
      sv: "Kejsar Kanmu flyttar huvudstaden till Heian-kyo — det som idag är Kyoto — och inleder Heian-perioden (794–1185). Denna era anses vara den japanska kulturens höjdpunkt: hovspoesi, romantiklitteratur (Lady Murasaki Shikibu skriver Genji Monogatari, världens första roman), kalligrafi och det refinerade livet vid det kejserliga hovet. Kana-skriften uppfinns och japansk identitet stärks.",
      en: "Emperor Kanmu moves the capital to Heian-kyo — present-day Kyoto — beginning the Heian period (794–1185). This era is considered the pinnacle of Japanese court culture: court poetry, romantic literature (Lady Murasaki Shikibu writes The Tale of Genji, the world's first novel), calligraphy and the refined life of the imperial court. The kana script is invented and Japanese identity strengthens.",
      tr: "İmparator Kanmu başkenti bugünkü Kyoto olan Heian-kyo'ya taşır ve Heian dönemini (794–1185) başlatır. Bu dönem Japon saray kültürünün zirvesi kabul edilir.",
    },
    figures: ["Emperor Kanmu", "Lady Murasaki Shikibu", "Sei Shonagon"],
    consequences: { sv: "Japansk hovkultur når sin absoluta höjdpunkt.", en: "Japanese court culture reaches its absolute peak.", tr: "Japon saray kültürü mutlak zirvesine ulaşır." },
    impact: { sv: "Genji Monogatari — världens första roman — skrivs.", en: "The Tale of Genji — the world's first novel — is written.", tr: "Genji Monogatari — dünyanın ilk romanı — yazılır." },
    category: "culture",
    importance: "high",
  },
  {
    year: 858,
    title: {
      sv: "Fujiwara-klanens dominans — Kejsarens skugga",
      en: "Fujiwara Clan Dominance — The Emperor's Shadow",
      tr: "Fujiwara Klanının Egemenliği — İmparatorun Gölgesi",
    },
    summary: {
      sv: "Fujiwara no Yoshifusa blir den förste icke-kejserlige regenten i Japan och inleder en era av Fujiwara-dominans som varar i över 200 år. Klanen kontrollerar kejsarmakten genom äktenskap och regentskap — kejsaren sitter på tronen men Fujiwara styr. Detta mönster av 'skuggmakt' bakom kejsaren ska prägla japansk politik i sekler.",
      en: "Fujiwara no Yoshifusa becomes the first non-imperial regent in Japan, beginning an era of Fujiwara dominance lasting over 200 years. The clan controls imperial power through marriage and regency — the emperor sits on the throne but the Fujiwara rule. This pattern of 'shadow power' behind the emperor would mark Japanese politics for centuries.",
      tr: "Fujiwara no Yoshifusa, Japonya'daki ilk imparatorluk dışı naip olur ve 200 yılı aşkın bir Fujiwara egemenliği dönemini başlatır.",
    },
    figures: ["Fujiwara no Yoshifusa", "Fujiwara no Michinaga"],
    consequences: { sv: "Kejsarmakten reduceras till ceremoni.", en: "Imperial power is reduced to ceremony.", tr: "İmparatorluk gücü törene indirgenir." },
    impact: { sv: "Mönstret av ceremonikejsare med verklig makt bakom tronen etableras.", en: "Pattern of ceremonial emperor with real power behind throne established.", tr: "Taht arkasında gerçek güçle törensel imparator modeli kurulur." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1185,
    title: {
      sv: "Kamakura-shogunatet — Samurajernas Japan tar form",
      en: "Kamakura Shogunate — Samurai Japan Takes Shape",
      tr: "Kamakura Şogunluğu — Samuray Japonya'sı Şekilleniyor",
    },
    summary: {
      sv: "Efter Genpei-kriget etablerar Minamoto no Yoritomo Japans första shogunat i Kamakura. Shogunen — militärdiktator — tar den verkliga makten medan kejsaren förblir en religiös och symbolisk figur i Kyoto. Samurajkulturen med bushido (krigarnas väg), lojalitet och heder institutionaliseras. Japan styrs nu av krigare, inte hovmän.",
      en: "After the Genpei War, Minamoto no Yoritomo establishes Japan's first shogunate at Kamakura. The shogun — military dictator — takes real power while the emperor remains a religious and symbolic figure in Kyoto. Samurai culture with bushido (the way of the warrior), loyalty and honour is institutionalised. Japan is now ruled by warriors, not courtiers.",
      tr: "Genpei Savaşı'nın ardından Minamoto no Yoritomo, Kamakura'da Japonya'nın ilk şogunluğunu kurar. Şogun gerçek gücü alırken imparator Kyoto'da dini ve sembolik bir figür olarak kalır.",
    },
    figures: ["Minamoto no Yoritomo", "Emperor Go-Toba"],
    consequences: { sv: "Militärt samurajstyre etableras.", en: "Military samurai rule is established.", tr: "Askeri samuray yönetimi kurulur." },
    impact: { sv: "Samurajkulturen och bushido-andan formar Japan i 700 år.", en: "Samurai culture and bushido spirit shape Japan for 700 years.", tr: "Samuray kültürü ve bushido ruhu Japonya'yı 700 yıl boyunca şekillendirir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1274,
    title: {
      sv: "Mongolernas första invasion — Kamikaze räddar Japan",
      en: "First Mongol Invasion — Divine Winds Save Japan",
      tr: "Birinci Moğol İstilası — İlahi Rüzgarlar Japonya'yı Kurtarıyor",
    },
    summary: {
      sv: "Kublai Khans mongoliska armé med 23 000 man landsätter på Kyushu. De japanska samurajerna kämpar tappert men är numerärt underlägsna och teknologiskt utmanade av mongolsk krutkrigföring. En kraftig storm — gudars vind, kamikaze — förstör mongolernas flotta och tvingar tillbakadragande. Japan undgår den enda erövringen av mongolerna.",
      en: "Kublai Khan's Mongol army of 23,000 lands on Kyushu. Japanese samurai fight bravely but are outnumbered and challenged by Mongol gunpowder warfare. A powerful storm — divine wind, kamikaze — destroys the Mongol fleet and forces retreat. Japan escapes the only Mongol conquest.",
      tr: "Kubilay Han'ın 23.000 kişilik Moğol ordusu Kyushu'ya çıkar. Japon samuraylar cesurca savaşır. Güçlü bir fırtına — ilahi rüzgar, kamikaze — Moğol donanmasını imha eder.",
    },
    figures: ["Kublai Khan", "Hojo Tokimune"],
    consequences: { sv: "Mongolerna besegras. Japan förblir oberoende.", en: "Mongols defeated. Japan remains independent.", tr: "Moğollar yenilir. Japonya bağımsız kalır." },
    impact: { sv: "Tron på gudomligt skydd förstärks. Kamikaze-myten föds.", en: "Belief in divine protection strengthened. Kamikaze myth born.", tr: "İlahi koruma inancı güçlenir. Kamikaze efsanesi doğar." },
    category: "war",
    importance: "high",
  },
  {
    year: 1281,
    title: {
      sv: "Mongolernas andra invasion — Kamikaze slår igen",
      en: "Second Mongol Invasion — Kamikaze Strikes Again",
      tr: "İkinci Moğol İstilası — Kamikaze Tekrar Vuruyor",
    },
    summary: {
      sv: "Kublai Khan skickar en ännu större armé — 140 000 man — mot Japan. Åter drabbar en kolossal tyfon mongolernas flotta och förstör den nästan fullständigt. Japanerna tolkar stormarna som gudomligt ingripande — bevis på att Japan är ett gudarnas land (shinkoku) som aldrig kan erövras. Övertygelsen om japansk gudomlig exceptionalism förstärks djupt.",
      en: "Kublai Khan sends an even larger army — 140,000 men — against Japan. Again a colossal typhoon strikes the Mongol fleet and nearly completely destroys it. The Japanese interpret the storms as divine intervention — proof that Japan is a land of the gods (shinkoku) that can never be conquered. Belief in Japanese divine exceptionalism is deeply reinforced.",
      tr: "Kubilay Han, Japonya'ya çok daha büyük bir ordu — 140.000 kişi — gönderir. Yine devasa bir tayfun Moğol donanmasına çarpar ve onu neredeyse tamamen yok eder.",
    },
    figures: ["Kublai Khan", "Hojo Tokimune"],
    consequences: { sv: "Japans självuppfattning som oberoende gudomlig nation stärks enormt.", en: "Japan's self-image as an independent divine nation enormously strengthened.", tr: "Japonya'nın bağımsız ilahi bir ulus olarak öz-imgesi büyük ölçüde güçlenir." },
    impact: { sv: "Gudomlig exceptionalism präglar japansk nationalidentitet.", en: "Divine exceptionalism marks Japanese national identity.", tr: "İlahi istisnacılık Japon ulusal kimliğini belirler." },
    category: "war",
    importance: "high",
  },
  {
    year: 1336,
    title: {
      sv: "Muromachi-shogunatet — Ashikaga-eran",
      en: "Muromachi Shogunate — The Ashikaga Era",
      tr: "Muromachi Şogunluğu — Ashikaga Dönemi",
    },
    summary: {
      sv: "Ashikaga Takauji besegrar Kamakura-shogunatet och etablerar Muromachi-shogunatet i Kyoto. Under Ashikaga-eran (1336–1573) blomstrar Noh-teatern, zenbuddhism, teceremoni (chado), ikebana och trädgårdskonst. Det är en av japansk kulturs mest raffinerade perioder. Handelskontakter med Kina och Korea intensifieras.",
      en: "Ashikaga Takauji defeats the Kamakura Shogunate and establishes the Muromachi Shogunate in Kyoto. During the Ashikaga era (1336–1573) Noh theatre, Zen Buddhism, tea ceremony (chado), ikebana and garden art flourish. One of the most refined periods of Japanese culture. Trade contacts with China and Korea intensify.",
      tr: "Ashikaga Takauji, Kamakura Şogunluğu'nu yenerek Kyoto'da Muromachi Şogunluğu'nu kurar. Ashikaga döneminde Noh tiyatrosu, Zen Budizmi, çay töreni gelişir.",
    },
    figures: ["Ashikaga Takauji", "Ashikaga Yoshimitsu"],
    consequences: { sv: "En ny era av kulturellt blomstrande under Ashikaga.", en: "A new era of cultural flowering under Ashikaga.", tr: "Ashikaga altında yeni bir kültürel çiçeklenme dönemi." },
    impact: { sv: "Japansk kultur — te, Noh, Zen — cementeras som världsarv.", en: "Japanese culture — tea, Noh, Zen — cemented as world heritage.", tr: "Japon kültürü — çay, Noh, Zen — dünya mirası olarak pekişir." },
    category: "culture",
    importance: "high",
  },
  {
    year: 1467,
    title: {
      sv: "Onin-kriget — Japan faller i kaos",
      en: "Onin War — Japan Falls into Chaos",
      tr: "Onin Savaşı — Japonya Kaosa Düşüyor",
    },
    summary: {
      sv: "Onin-kriget (1467–1477) utlöser ett sekel av inbördeskrig i Japan — Sengoku-perioden (de stridande staternas tid). Shogunnens makt kollapsar, daimyo-krigsherrar slåss om kontroll och Japan splittras i hundratals rivaliserande territorier. Kyoto bränns och landets centrum förstörs. Det är Japans mörkaste och blodigaste medeltid.",
      en: "The Onin War (1467–1477) triggers a century of civil war in Japan — the Sengoku period (Warring States period). The shogun's power collapses, daimyo warlords fight for control and Japan fragments into hundreds of rival territories. Kyoto burns and the country's centre is destroyed. Japan's darkest and bloodiest medieval age.",
      tr: "Onin Savaşı (1467–1477), Japonya'da bir asır süren iç savaşı — Sengoku dönemini — tetikler. Şogunun gücü çöker, daimyo savaş lordları kontrol için savaşır.",
    },
    figures: ["Hosokawa Katsumoto", "Yamana Sozen"],
    consequences: { sv: "Japan fragmenteras i hundratals rivaliserande feodala domäner.", en: "Japan fragments into hundreds of rival feudal domains.", tr: "Japonya yüzlerce rakip feodal alana parçalanır." },
    impact: { sv: "Sengoku-perioden formar samurajkulturen och japansk krigskonst.", en: "Sengoku period shapes samurai culture and Japanese warfare.", tr: "Sengoku dönemi samuray kültürünü ve Japon savaş sanatını şekillendirir." },
    category: "war",
    importance: "high",
  },
  {
    year: 1543,
    title: {
      sv: "Portugiserna anländer — Skjutvapen når Japan",
      en: "Portuguese Arrive — Firearms Reach Japan",
      tr: "Portekizliler Geliyor — Ateşli Silahlar Japonya'ya Ulaşıyor",
    },
    summary: {
      sv: "Portugisiska handlare landar på ön Tanegashima och introducerar skjutvapen i Japan. Denna teknologiska revolution förändrar japansk krigskonst fundamentalt. Daimyo börjar massproducera arkebuser och anlita infanterister, vilket ersätter samurajkavalleriet som slagfältets avgörande styrka. Japan är aldrig detsamma igen.",
      en: "Portuguese traders land on the island of Tanegashima and introduce firearms to Japan. This technological revolution fundamentally changes Japanese warfare. Daimyo begin mass-producing arquebuses and deploying infantry, replacing samurai cavalry as the decisive battlefield force. Japan is never the same again.",
      tr: "Portekizli tüccarlar Tanegashima adasına inerek Japonya'ya ateşli silahları tanıtır. Bu teknolojik devrim Japon savaş sanatını temelden değiştirir.",
    },
    figures: ["Francisco Zeimoto", "Oda Nobunaga (later adopter)"],
    consequences: { sv: "Skjutvapen revolutionerar japanskt krig.", en: "Firearms revolutionise Japanese warfare.", tr: "Ateşli silahlar Japon savaşını devrimleştirir." },
    impact: { sv: "Samurajkulturen anpassas till en ny militär verklighet.", en: "Samurai culture adapts to a new military reality.", tr: "Samuray kültürü yeni askeri gerçekliğe uyum sağlar." },
    category: "war",
    importance: "high",
  },
  {
    year: 1549,
    title: {
      sv: "Fransisco Xavier och kristendomen når Japan",
      en: "Francis Xavier and Christianity Reaches Japan",
      tr: "Francis Xavier ve Hristiyanlık Japonya'ya Ulaşıyor",
    },
    summary: {
      sv: "Jesuitprästen Francis Xavier anländer till Kagoshima och börjar missionera. Under de följande decennierna konverterar hundratusentals japaner till kristendomen — inklusive inflytelserika daimyo. Kristendomen ses som ett hot av shogunerna och leder till blodiga förföljelser, men lämnar spår i japansk kultur och handel med Europa.",
      en: "Jesuit priest Francis Xavier arrives at Kagoshima and begins missionary work. Over the following decades hundreds of thousands of Japanese convert to Christianity — including influential daimyo. Christianity is seen as a threat by shoguns and leads to bloody persecutions, but leaves traces in Japanese culture and trade with Europe.",
      tr: "Cizvit rahip Francis Xavier, Kagoshima'ya gelir ve misyonerlik çalışmalarına başlar. Sonraki on yıllarda yüz binlerce Japon Hristiyanlığa geçer.",
    },
    figures: ["Francis Xavier", "Oda Nobunaga", "Toyotomi Hideyoshi"],
    consequences: { sv: "Kristendomen sprids i Japan tills den förbjuds.", en: "Christianity spreads in Japan until it is banned.", tr: "Hristiyanlık yasaklanana kadar Japonya'da yayılır." },
    impact: { sv: "Europeisk-japanska kulturkontakter etableras.", en: "European-Japanese cultural contacts established.", tr: "Avrupa-Japon kültürel temasları kurulur." },
    category: "religion",
    importance: "medium",
  },
  {
    year: 1568,
    title: {
      sv: "Oda Nobunaga — Japans enande börjar",
      en: "Oda Nobunaga — Japan's Unification Begins",
      tr: "Oda Nobunaga — Japonya'nın Birleşmesi Başlıyor",
    },
    summary: {
      sv: "Oda Nobunaga intar Kyoto och inleder det enorma projektet att ena Japan efter ett sekel av inbördeskrig. Han är en brutal, genialisk militärstrateg som revolutionerar krigskonsten med massiv arkebusinfanteri. Han rivde ner buddhistiska tempel som utgjorde politiska hot och avskaffade vägtullar för att stimulera handel. En av Japans mest transformativa ledare.",
      en: "Oda Nobunaga captures Kyoto and begins the enormous project of unifying Japan after a century of civil war. A brutal, brilliant military strategist who revolutionises warfare with mass arquebus infantry. He tears down Buddhist temples posing political threats and abolishes road tolls to stimulate trade. One of Japan's most transformative leaders.",
      tr: "Oda Nobunaga, Kyoto'yu ele geçirerek bir asır süren iç savaşın ardından Japonya'yı birleştirme projesine başlar. Kitlesel arkebus piyadeleriyle savaşı devrimleştiren acımasız, parlak bir askeri stratejist.",
    },
    figures: ["Oda Nobunaga", "Toyotomi Hideyoshi", "Tokugawa Ieyasu"],
    consequences: { sv: "Japans politiska enande inleds.", en: "Japan's political unification begins.", tr: "Japonya'nın siyasi birleşmesi başlar." },
    impact: { sv: "Grunden för det enade Japan under Tokugawa läggs.", en: "Foundation for unified Japan under Tokugawa laid.", tr: "Tokugawa altında birleşik Japonya'nın temeli atılır." },
    category: "war",
    importance: "high",
  },
  {
    year: 1600,
    title: {
      sv: "Slaget vid Sekigahara — Tokugawa erövrar Japan",
      en: "Battle of Sekigahara — Tokugawa Conquers Japan",
      tr: "Sekigahara Savaşı — Tokugawa Japonya'yı Fethediyor",
    },
    summary: {
      sv: "Tokugawa Ieyasu besegrar en koalition av rivaler i det avgörande slaget vid Sekigahara den 21 oktober 1600. Med 160 000 man på vardera sida är det ett av historiens största samurajislag. Tokugawas seger cementerar hans kontroll över Japan och leder direkt till grundandet av Edo-shogunatet. En era av fred och isolering på 260 år inleds.",
      en: "Tokugawa Ieyasu defeats a coalition of rivals in the decisive Battle of Sekigahara on 21 October 1600. With 160,000 men on each side it is one of history's greatest samurai battles. Tokugawa's victory cements his control over Japan and leads directly to the founding of the Edo Shogunate. An era of peace and isolation lasting 260 years begins.",
      tr: "Tokugawa İeyasu, 21 Ekim 1600'de belirleyici Sekigahara Savaşı'nda rakip bir koalisyonu yener. Her iki tarafta 160.000 kişiyle tarihin en büyük samuray savaşlarından biridir.",
    },
    figures: ["Tokugawa Ieyasu", "Ishida Mitsunari", "Emperor Go-Yozei"],
    consequences: { sv: "Japan enat under Tokugawa-klanen.", en: "Japan unified under the Tokugawa clan.", tr: "Japonya, Tokugawa klanı altında birleşir." },
    impact: { sv: "260 år av Pax Tokugawa börjar.", en: "260 years of Pax Tokugawa begins.", tr: "260 yıllık Pax Tokugawa başlar." },
    category: "war",
    importance: "high",
  },
  {
    year: 1603,
    title: {
      sv: "Edo-shogunatet grundas — Tokugawa tar makten",
      en: "Edo Shogunate Founded — Tokugawa Takes Power",
      tr: "Edo Şogunluğu Kuruldu — Tokugawa İktidarı Alıyor",
    },
    summary: {
      sv: "Tokugawa Ieyasu utnämns till shogun och grundar Edo-shogunatet med Edo (nuvarande Tokyo) som centrum. Under Tokugawa-familjen regerar Japan i 265 år — en era av enastående stabilitet, fred och kulturell blomstring. Det feudala systemet med daimyo, samurajer och bönder kontrolleras hårt. Japan stänger sina gränser för omvärlden.",
      en: "Tokugawa Ieyasu is appointed shogun and founds the Edo Shogunate with Edo (present-day Tokyo) as its centre. Under the Tokugawa family Japan is governed for 265 years — an era of extraordinary stability, peace and cultural flowering. The feudal system of daimyo, samurai and peasants is tightly controlled. Japan closes its borders to the outside world.",
      tr: "Tokugawa İeyasu şogun atanır ve Edo'yu (günümüz Tokyo) merkez alarak Edo Şogunluğu'nu kurar. Tokugawa ailesi altında Japonya 265 yıl yönetilir.",
    },
    figures: ["Tokugawa Ieyasu", "Emperor Go-Yozei"],
    consequences: { sv: "Japan styrs av Tokugawa-familjen i 265 år.", en: "Japan governed by Tokugawa family for 265 years.", tr: "Japonya, Tokugawa ailesi tarafından 265 yıl yönetilir." },
    impact: { sv: "Japansk feodalism når sin mognad och slutliga form.", en: "Japanese feudalism reaches its maturity and final form.", tr: "Japon feodalitesi olgunluğuna ve nihai biçimine ulaşır." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1639,
    title: {
      sv: "Sakoku — Japan stänger sina gränser",
      en: "Sakoku — Japan Closes Its Borders",
      tr: "Sakoku — Japonya Sınırlarını Kapatıyor",
    },
    summary: {
      sv: "Shogun Tokugawa Iemitsu utfärdar sakoku-edikten och stänger Japan för nästan alla utlänningar. Portugiser utvisas, kristendom förbjuds och japaner förbjuds att resa utomlands under dödsstraff. Endast holländska och kinesiska handelsmän tillåts på den begränsade ön Dejima i Nagasaki. Japan lever i en unik era av självvald isolering i 200 år.",
      en: "Shogun Tokugawa Iemitsu issues the sakoku edicts and closes Japan to almost all foreigners. Portuguese are expelled, Christianity is banned and Japanese are forbidden to travel abroad on pain of death. Only Dutch and Chinese merchants are permitted at the restricted island of Dejima in Nagasaki. Japan lives in a unique era of self-chosen isolation for 200 years.",
      tr: "Şogun Tokugawa İemitsu sakoku emirnamelerini çıkararak Japonya'yı neredeyse tüm yabancılara kapatır. Portekizliler sınır dışı edilir, Hristiyanlık yasaklanır.",
    },
    figures: ["Tokugawa Iemitsu"],
    consequences: { sv: "Japan isolerar sig från världen i 200 år.", en: "Japan isolates itself from the world for 200 years.", tr: "Japonya 200 yıl boyunca dünyadan soyutlanır." },
    impact: { sv: "Unik japansk kultur och identitet fördjupas i isolering.", en: "Unique Japanese culture and identity deepened in isolation.", tr: "Benzersiz Japon kültürü ve kimliği izolasyon içinde derinleşir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1688,
    title: {
      sv: "Genroku-eran — Japansk folkkultur blomstrar",
      en: "Genroku Era — Japanese Popular Culture Flourishes",
      tr: "Genroku Dönemi — Japon Popüler Kültürü Gelişiyor",
    },
    summary: {
      sv: "Genroku-eran (1688–1704) under shogun Tokugawa Tsunayoshi är Edo-periodens kulturella höjdpunkt. Kabuki-teatern, ukiyo-e träsnittskonstenn, haiku-poesin (Matsuo Basho) och bunraku-dockteater blomstrar. En levande köpmannakultur i städerna Osaka och Edo skapar ett rikt popularkulturellt liv som kontrasterar med det aristokratiska Kyoto.",
      en: "The Genroku era (1688–1704) under Shogun Tokugawa Tsunayoshi is the Edo period's cultural peak. Kabuki theatre, ukiyo-e woodblock prints, haiku poetry (Matsuo Basho) and bunraku puppet theatre flourish. A vibrant merchant culture in the cities of Osaka and Edo creates a rich popular cultural life contrasting with aristocratic Kyoto.",
      tr: "Şogun Tokugawa Tsunayoshi dönemindeki Genroku dönemi (1688–1704), Edo döneminin kültürel zirvesidir. Kabuki tiyatrosu, ukiyo-e ahşap baskılar, haiku şiiri gelişir.",
    },
    figures: ["Matsuo Basho", "Ihara Saikaku", "Chikamatsu Monzaemon"],
    consequences: { sv: "Japansk folkkultur når en ny höjd.", en: "Japanese popular culture reaches a new peak.", tr: "Japon popüler kültürü yeni bir zirveye ulaşır." },
    impact: { sv: "Haiku, Kabuki och ukiyo-e definierar japansk estetik globalt.", en: "Haiku, Kabuki and ukiyo-e define Japanese aesthetics globally.", tr: "Haiku, Kabuki ve ukiyo-e Japon estetiğini küresel olarak tanımlar." },
    category: "culture",
    importance: "medium",
  },
  {
    year: 1853,
    title: {
      sv: "Commodore Perrys svarta skepp — Japan vaknar",
      en: "Commodore Perry's Black Ships — Japan Awakens",
      tr: "Komutan Perry'nin Siyah Gemileri — Japonya Uyanıyor",
    },
    summary: {
      sv: "Den 8 juli 1853 ankrar amerikanske commodore Matthew Perry med fyra ångdrivna örlogsfartyg — 'de svarta skeppen' — i Edo-bukten och kräver att Japan öppnar sina hamnar för handel. Japanerna är chockade av den teknologiska överlägsenhet dessa skepp representerar. Det är ett vändande ögonblick som splittrar Japan mellan dem som vill modernisera och dem som vill bevara isolationen.",
      en: "On 8 July 1853 American Commodore Matthew Perry anchors four steam-powered warships — the 'Black Ships' — in Edo Bay and demands Japan open its ports to trade. The Japanese are shocked by the technological superiority these ships represent. A turning point that splits Japan between those who want to modernise and those who want to preserve isolation.",
      tr: "8 Temmuz 1853'te Amerikalı Komutan Matthew Perry, dört buhar tahrikli savaş gemisiyle — 'Siyah Gemiler' — Edo Körfezi'ne demir atar ve Japonya'nın limanlarını ticarete açmasını talep eder.",
    },
    figures: ["Commodore Matthew Perry", "Shogun Tokugawa Ieyoshi"],
    consequences: { sv: "Japan tvingas förhandla om att öppna sina hamnar.", en: "Japan forced to negotiate opening its ports.", tr: "Japonya limanlarını açma konusunda müzakere etmeye zorlanır." },
    impact: { sv: "200 år av isolering slutar. Moderniseringsdebatten exploderar.", en: "200 years of isolation ends. Modernisation debate explodes.", tr: "200 yıllık izolasyon sona erer. Modernleşme tartışması patlak verir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1854,
    title: {
      sv: "Kanagawa-fördraget — Japan öppnar sig",
      en: "Treaty of Kanagawa — Japan Opens Up",
      tr: "Kanagawa Antlaşması — Japonya Açılıyor",
    },
    summary: {
      sv: "Under amerikanskt tryck undertecknar shogunaten Kanagawa-fördraget som öppnar hamnarna Shimoda och Hakodate för amerikansk handel. Liknande avtal följer med Ryssland, Nederlanderna och Storbritannien. Japan tvingas in i det globala handelssystemet mot sin vilja. Shogunatens oförmåga att stå emot utländskt tryck underminerar dess legitimitet.",
      en: "Under American pressure the shogunate signs the Treaty of Kanagawa, opening the ports of Shimoda and Hakodate to American trade. Similar treaties follow with Russia, the Netherlands and Britain. Japan is forced into the global trading system against its will. The shogunate's inability to resist foreign pressure undermines its legitimacy.",
      tr: "Amerikan baskısı altında şogunluk, Shimoda ve Hakodate limanlarını Amerikan ticaretine açan Kanagawa Antlaşması'nı imzalar.",
    },
    figures: ["Commodore Matthew Perry", "Shogun Tokugawa Iesada"],
    consequences: { sv: "Japan tvingas in i världshandeln.", en: "Japan forced into world trade.", tr: "Japonya dünya ticaretine zorla dahil edilir." },
    impact: { sv: "Shogunatets fall och Meiji-restaurationen accelereras.", en: "Shogunate's fall and Meiji Restoration accelerated.", tr: "Şogunluğun çöküşü ve Meiji Restorasyonu hızlanır." },
    category: "economy",
    importance: "high",
  },
  {
    year: 1868,
    title: {
      sv: "Meiji-restaurationen — Japan transformeras",
      en: "Meiji Restoration — Japan is Transformed",
      tr: "Meiji Restorasyonu — Japonya Dönüşüyor",
    },
    summary: {
      sv: "Den 3 januari 1868 störtas shogunaten och den unge kejsar Meiji återinförs i den verkliga makten. Det är en revolution i traditionell japansk form — inte demokrati utan modernisering under kejserligt styre. Japan beslutar att industrialisera, militarisera och modernisera i rasande tempo. Samurajiersklassen avskaffas, järnvägar byggs, en västerländsk-inspirerad konstitution skrivs och Japan bestämmer sig för att bli ett världsmaktsimperium.",
      en: "On 3 January 1868 the shogunate is overthrown and the young Emperor Meiji is restored to real power. A revolution in traditional Japanese form — not democracy but modernisation under imperial rule. Japan decides to industrialise, militarise and modernise at breakneck speed. The samurai class is abolished, railways built, a Western-inspired constitution written and Japan decides to become a great power empire.",
      tr: "3 Ocak 1868'de şogunluk devrilir ve genç İmparator Meiji gerçek güce geri döner. Geleneksel Japon biçiminde bir devrim — demokrasi değil imparatorluk yönetimi altında modernleşme.",
    },
    figures: ["Emperor Meiji", "Okubo Toshimichi", "Kido Takayoshi", "Saigo Takamori"],
    consequences: { sv: "Shogunatet avskaffas. Kejsaren återfår verklig makt.", en: "Shogunate abolished. Emperor regains real power.", tr: "Şogunluk kaldırılır. İmparator gerçek gücü geri kazanır." },
    impact: { sv: "Japan inleder sin transformation till modern industriell stormakt.", en: "Japan begins its transformation into a modern industrial great power.", tr: "Japonya modern endüstriyel büyük güce dönüşümüne başlar." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1872,
    title: {
      sv: "Japans första järnväg — Industrialiseringen accelererar",
      en: "Japan's First Railway — Industrialisation Accelerates",
      tr: "Japonya'nın İlk Demiryolu — Sanayileşme Hız Kazanıyor",
    },
    summary: {
      sv: "Japans första järnvägslinje öppnar mellan Tokyo och Yokohama. Det är ett symbolgripande ögonblick — Japan antar västerländsk teknik med fenomenal hastighet. Inom en generation byggs ett rikstäckande järnvägsnät, moderna fabriker, ett europeiskt-inspirerat rättssystem och ett nationellt utbildningssystem. Meiji-eran är industrialiseringens mirakel.",
      en: "Japan's first railway line opens between Tokyo and Yokohama. A symbolically charged moment — Japan adopts Western technology at phenomenal speed. Within a generation a nationwide railway network, modern factories, a European-inspired legal system and a national education system are built. The Meiji era is the miracle of industrialisation.",
      tr: "Japonya'nın ilk demiryolu hattı Tokyo ve Yokohama arasında açılır. Japonya Batı teknolojisini olağanüstü hızla benimser.",
    },
    figures: ["Emperor Meiji", "Inoue Masaru"],
    consequences: { sv: "Japansk industrialisering accelererar dramatiskt.", en: "Japanese industrialisation accelerates dramatically.", tr: "Japon sanayileşmesi çarpıcı biçimde hızlanır." },
    impact: { sv: "Japan omvandlas från feodalt till industriellt samhälle på en generation.", en: "Japan transforms from feudal to industrial society in one generation.", tr: "Japonya bir nesilde feodal toplumdan endüstriyel topluma dönüşür." },
    category: "economy",
    importance: "high",
  },
  {
    year: 1889,
    title: {
      sv: "Meiji-konstitutionen — Japan får ett parlament",
      en: "Meiji Constitution — Japan Gets a Parliament",
      tr: "Meiji Anayasası — Japonya Parlamento Alıyor",
    },
    summary: {
      sv: "Den 11 februari 1889 proklameras Meiji-konstitutionen — modellerad efter Preussens konstitution. Japan får ett tvåkammarparlament (Diet), men kejsaren behåller suverän makt. Det är ett avgörande steg mot ett modernt statsväsende men inte en liberal demokrati — kejsaren kommenderar militären, utfärdar lagar och är okränkbar. Japan presenterar sig som ett civiliserat konstitutionellt styre inför världsopinionen.",
      en: "On 11 February 1889 the Meiji Constitution is proclaimed — modelled after Prussia's constitution. Japan receives a bicameral parliament (Diet) but the emperor retains sovereign power. A decisive step toward a modern state but not liberal democracy — the emperor commands the military, issues laws and is inviolable. Japan presents itself as a civilised constitutional government to world opinion.",
      tr: "11 Şubat 1889'da Prusya anayasası model alınarak Meiji Anayasası ilan edilir. Japonya iki meclisli bir parlamento alır ancak imparator egemen gücü elinde tutar.",
    },
    figures: ["Emperor Meiji", "Ito Hirobumi", "Inoue Kowashi"],
    consequences: { sv: "Japan får ett modernt konstitutionellt styrsystem.", en: "Japan receives a modern constitutional system of governance.", tr: "Japonya modern bir anayasal yönetim sistemi alır." },
    impact: { sv: "Japan presenterar sig som jämlik med västerländska imperiemakter.", en: "Japan presents itself as equal to Western imperial powers.", tr: "Japonya kendini Batılı imparatorluk güçlerine eşit olarak sunar." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1894,
    title: {
      sv: "Första sino-japanska kriget — Japan besegrar Kina",
      en: "First Sino-Japanese War — Japan Defeats China",
      tr: "Birinci Çin-Japon Savaşı — Japonya Çin'i Yeniyor",
    },
    summary: {
      sv: "Japan och Kina kämpar om Korea i ett krig som chockar världen med sitt utfall. Den moderniserade japanska armén och flottan krossar den kinesiska totalt. Shimonoseki-fördraget 1895 ger Japan Taiwan, Pescadores och (kortvarigt) Liaodong-halvön. Det är det ögonblick världen inser att Japan är en ny asiatisk stormakt — och Kina djupt försvagad.",
      en: "Japan and China clash over Korea in a war whose outcome shocks the world. The modernised Japanese army and navy crush the Chinese completely. The Treaty of Shimonoseki 1895 gives Japan Taiwan, the Pescadores and (briefly) the Liaodong Peninsula. The moment the world realises Japan is a new Asian great power — and China profoundly weakened.",
      tr: "Japonya ve Çin, Kore üzerinde sonucu dünyayı şoke eden bir savaşta çatışır. Modernize edilmiş Japon ordusu ve donanması Çinlileri tamamen ezer.",
    },
    figures: ["Emperor Meiji", "Ito Hirobumi", "Admiral Ito Yuko"],
    consequences: { sv: "Japan vinner Taiwan. Kinas svaghet exponeras globalt.", en: "Japan wins Taiwan. China's weakness is exposed globally.", tr: "Japonya Tayvan'ı kazanır. Çin'in zayıflığı küresel olarak açığa çıkar." },
    impact: { sv: "Japan erkänns som Asiens dominerande stormakt.", en: "Japan recognised as Asia's dominant great power.", tr: "Japonya Asya'nın baskın büyük gücü olarak tanınır." },
    category: "war",
    importance: "high",
  },
  {
    year: 1902,
    title: {
      sv: "Det anglo-japanska alliansen — Japan erkänns som stormakt",
      en: "Anglo-Japanese Alliance — Japan Recognised as Great Power",
      tr: "İngiliz-Japon İttifakı — Japonya Büyük Güç Olarak Tanınıyor",
    },
    summary: {
      sv: "Britannien och Japan ingår ett militäralliansavtal — den förste alliansen på lika villkor mellan en europeisk makt och ett asiatiskt land. Det är ett diplomatiskt mästerverk av Japans utrikespolitiker och ett erkännande av Japans status som stormakt. Alliansen skyddar japanska intressen i Asien och frigör Japan att utmana Ryssland.",
      en: "Britain and Japan enter a military alliance — the first alliance on equal terms between a European power and an Asian country. A diplomatic masterpiece by Japan's foreign policy makers and recognition of Japan's great power status. The alliance protects Japanese interests in Asia and frees Japan to challenge Russia.",
      tr: "Britanya ve Japonya askeri bir ittifak kurar — Avrupalı bir güç ile Asyalı bir ülke arasındaki eşit koşullardaki ilk ittifak.",
    },
    figures: ["Emperor Meiji", "Lord Lansdowne", "Hayashi Tadasu"],
    consequences: { sv: "Japan skyddas av brittisk makt. Ryssland kan utmanas.", en: "Japan protected by British power. Russia can be challenged.", tr: "Japonya İngiliz gücüyle korunur. Rusya'ya meydan okunabilir." },
    impact: { sv: "Japan antas i de europeiska stormakternas exklusiva sällskap.", en: "Japan admitted into the exclusive company of European great powers.", tr: "Japonya, Avrupalı büyük güçlerin münhasır topluluğuna kabul edilir." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1904,
    title: {
      sv: "Rysk-japanska kriget — Asien besegrar Europa",
      en: "Russo-Japanese War — Asia Defeats Europe",
      tr: "Rus-Japon Savaşı — Asya Avrupa'yı Yeniyor",
    },
    summary: {
      sv: "Japan anfaller den ryska flottan vid Port Arthur och inleder ett krig som revolutionerar världspolitiken. Det japanska segerkoret vid Tsushima (maj 1905) förstör praktiskt taget hela den ryska östersjöflottan på ett enda slag — ett av historiens mest avgörande sjöslag. Japan besegrar en europeiisk stormakt — ett seismiskt geopolitiskt skifte som inspirerar antikoloniala rörelser världen över.",
      en: "Japan attacks the Russian fleet at Port Arthur beginning a war that revolutionises world politics. The Japanese victory at Tsushima (May 1905) virtually destroys the entire Russian Baltic Fleet in a single engagement — one of history's most decisive naval battles. Japan defeats a European great power — a seismic geopolitical shift that inspires anti-colonial movements worldwide.",
      tr: "Japonya, Port Arthur'daki Rus filosuna saldırarak dünya siyasetini devrimleştiren bir savaşı başlatır. Japonya, Avrupalı bir büyük gücü yener.",
    },
    figures: ["Emperor Meiji", "Admiral Togo Heihachiro", "Tsar Nicholas II"],
    consequences: { sv: "Ryssland besegrat. Japan tar kontroll över Korea och Manchuriet.", en: "Russia defeated. Japan takes control of Korea and Manchuria.", tr: "Rusya yenilir. Japonya Kore ve Mançurya kontrolünü alır." },
    impact: { sv: "Asien kan besegra Europa — koloniserade folk världen över inspireras.", en: "Asia can defeat Europe — colonised peoples worldwide are inspired.", tr: "Asya Avrupa'yı yenebilir — dünya genelindeki sömürgeleştirilmiş halklar ilham alır." },
    category: "war",
    importance: "high",
  },
  {
    year: 1910,
    title: {
      sv: "Japan annekterar Korea",
      en: "Japan Annexes Korea",
      tr: "Japonya Kore'yi İlhak Ediyor",
    },
    summary: {
      sv: "Japan annekterar formellt Korea och gör det till en japansk koloni. Den koreanska kejsaren tvingades underteckna avsägelsedokument. Under 35 år av japanskt styre (1910–1945) genomgår Korea en brutal assimileringspolitik — koreanska språket och namn förbjuds, kulturarv förstörs och hundratusentals koreaner tvingas till slavarbete. Det är ett av de mörkaste kapitlen i japansk imperialism.",
      en: "Japan formally annexes Korea, making it a Japanese colony. The Korean Emperor is forced to sign abdication documents. During 35 years of Japanese rule (1910–1945) Korea undergoes brutal assimilation policy — the Korean language and names are banned, cultural heritage destroyed and hundreds of thousands of Koreans forced into slave labour. One of the darkest chapters of Japanese imperialism.",
      tr: "Japonya, Kore'yi resmen ilhak ederek bir Japon kolonisi yapar. Kore İmparatoru feragat belgelerini imzalamaya zorlanır. 35 yıllık Japon yönetimi boyunca Kore, Kore dili ve isimlerinin yasaklandığı acımasız bir asimilasyon politikasına maruz kalır.",
    },
    figures: ["Emperor Meiji", "Ito Hirobumi", "Emperor Sunjong of Korea"],
    consequences: { sv: "Korea blir japansk koloni. Koreansk kultur undertrycks.", en: "Korea becomes Japanese colony. Korean culture suppressed.", tr: "Kore Japon kolonisi olur. Kore kültürü bastırılır." },
    impact: { sv: "Japansk imperialism expanderar aggressivt i Asien.", en: "Japanese imperialism expands aggressively in Asia.", tr: "Japon emperyalizmi Asya'da agresif biçimde genişler." },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1914,
    title: {
      sv: "Japan i Första världskriget — Ententen stärks i Asien",
      en: "Japan in WWI — The Entente Strengthened in Asia",
      tr: "Japonya'nın Birinci Dünya Savaşı'ndaki Rolü",
    },
    summary: {
      sv: "Japan går med i Ententen baserat på det anglo-japanska alliansen och erövrar tyska besittningar i Kina (Qingdao) och Stilla havet. Japan presenterar sedan Kina med '21 krav' som i praktiken skulle göra Kina till ett japanskt protektorat. Kinas vägran skapar spänningar. Japan expanderar sin makt i Asien medan Europa blöder.",
      en: "Japan joins the Entente based on the Anglo-Japanese Alliance and seizes German possessions in China (Qingdao) and the Pacific. Japan then presents China with '21 Demands' that would in practice make China a Japanese protectorate. China's resistance creates tensions. Japan expands its power in Asia while Europe bleeds.",
      tr: "Japonya, İngiliz-Japon İttifakına dayanarak İtilaf Devletlerine katılır ve Çin ile Pasifik'teki Alman mülklerini ele geçirir.",
    },
    figures: ["Emperor Taisho", "Prime Minister Okuma Shigenobu"],
    consequences: { sv: "Japan vinner tyska territorier i Asien och Stilla havet.", en: "Japan wins German territories in Asia and Pacific.", tr: "Japonya Asya ve Pasifik'teki Alman topraklarını kazanır." },
    impact: { sv: "Japans regionala ambitioner i Asien intensifieras.", en: "Japan's regional ambitions in Asia intensify.", tr: "Japonya'nın Asya'daki bölgesel hırsları yoğunlaşır." },
    category: "war",
    importance: "medium",
  },
  {
    year: 1923,
    title: {
      sv: "Det stora Kanto-jordskalvet — Tokyo förstörs",
      en: "Great Kanto Earthquake — Tokyo Destroyed",
      tr: "Büyük Kanto Depremi — Tokyo Yıkılıyor",
    },
    summary: {
      sv: "Den 1 september 1923 drabbar ett massivt jordskalv (magnitud 7,9) regionen Kanto och förstör Tokyo och Yokohama. Över 140 000 människor dör — de flesta i de efterföljande eldsvådorna snarare än jordskalvet självt. Katastrofen förvärras av våld mot koreanska och kinesiska minoriteter under det sociala kaos som följer. Japan återuppbyggs snabbt men traumat är djupt.",
      en: "On 1 September 1923 a massive earthquake (magnitude 7.9) strikes the Kanto region and destroys Tokyo and Yokohama. Over 140,000 people die — most in the subsequent fires rather than the earthquake itself. The disaster is worsened by violence against Korean and Chinese minorities amid the social chaos that follows. Japan rebuilds rapidly but the trauma runs deep.",
      tr: "1 Eylül 1923'te Kanto bölgesine çarpan büyük bir deprem (7.9 büyüklüğünde) Tokyo ve Yokohama'yı yıkar. 140.000'den fazla kişi hayatını kaybeder.",
    },
    figures: ["Emperor Taisho", "Prime Minister Yamamoto Gonnohyoe"],
    consequences: { sv: "Tokyo och Yokohama förstörs. 140 000 dör.", en: "Tokyo and Yokohama destroyed. 140,000 die.", tr: "Tokyo ve Yokohama yıkılır. 140.000 kişi ölür." },
    impact: { sv: "Japan återuppbyggs men ultranationalistiska rörelser stärks.", en: "Japan rebuilds but ultranationalist movements strengthen.", tr: "Japonya yeniden inşa edilir ancak aşırı milliyetçi hareketler güçlenir." },
    category: "culture",
    importance: "medium",
  },
  {
    year: 1931,
    title: {
      sv: "Manchuriet invaderas — Den militaristiska vägen börjar",
      en: "Manchuria Invaded — The Militarist Path Begins",
      tr: "Mançurya İstila Ediliyor — Militarist Yol Başlıyor",
    },
    summary: {
      sv: "Den japanska Kwantung-armén arrangerar Mukden-incidenten som förevändning och invaderar Manchuriet utan tillstånd från den civila regeringen. Världssamfundet fördömer invasionen men vidtar inga åtgärder. Japan bildar marionettsstaten Manchukuo med den avsatte kinesiske kejsaren Pu Yi. Det är startskottet för Japans imperialistiska expansionspolitik i Asien som leder till Andra världskriget.",
      en: "The Japanese Kwantung Army arranges the Mukden Incident as a pretext and invades Manchuria without authorisation from the civilian government. The international community condemns the invasion but takes no action. Japan forms the puppet state Manchukuo with the deposed Chinese emperor Pu Yi. The starting gun for Japan's imperialist expansion policy in Asia that leads to World War II.",
      tr: "Japon Kwantung Ordusu, Mukden Olayı'nı bahane olarak düzenler ve sivil hükümetin izni olmadan Mançurya'yı işgal eder.",
    },
    figures: ["Emperor Showa (Hirohito)", "Puyi", "General Itagaki Seishiro"],
    consequences: { sv: "Manchukuo bildas. Japan bryter med folkens förbund.", en: "Manchukuo formed. Japan breaks with the League of Nations.", tr: "Mançukuo kurulur. Japonya Milletler Cemiyeti ile ilişkiyi keser." },
    impact: { sv: "Japansk militarism tar kommando och leder mot Andra världskriget.", en: "Japanese militarism takes command leading toward WWII.", tr: "Japon militarizmi komutayı alır ve İkinci Dünya Savaşı'na doğru ilerler." },
    category: "war",
    importance: "high",
  },
  {
    year: 1937,
    title: {
      sv: "Andra sino-japanska kriget — Nanking-massakern",
      en: "Second Sino-Japanese War — The Nanking Massacre",
      tr: "İkinci Çin-Japon Savaşı — Nankin Katliamı",
    },
    summary: {
      sv: "Japan invaderar Kina på bred front. Nanking faller i december 1937 och det japanska militären genomför en av historiens värsta krigsförbrytelser — Nanking-massakern — där 200 000–300 000 civila och krigsfångar dödas på sex veckor. Kriget med Kina, som aldrig förklaras formellt, pågår till 1945 och kostade uppskattningsvis 14 miljoner kinesiska liv.",
      en: "Japan invades China on a broad front. Nanking falls in December 1937 and the Japanese military commits one of history's worst war crimes — the Nanking Massacre — in which 200,000–300,000 civilians and POWs are killed in six weeks. The war with China, never formally declared, continues until 1945 and cost an estimated 14 million Chinese lives.",
      tr: "Japonya geniş bir cephede Çin'i işgal eder. Nankin Aralık 1937'de düşer ve Japon ordusu 200.000-300.000 sivilin öldürüldüğü Nankin Katliamı'nı gerçekleştirir.",
    },
    figures: ["Emperor Showa (Hirohito)", "General Matsui Iwane", "Chiang Kai-shek"],
    consequences: { sv: "Kina invaderas. Nanking-massakern chockar världen.", en: "China invaded. Nanking Massacre shocks the world.", tr: "Çin işgal edilir. Nankin Katliamı dünyayı şoke eder." },
    impact: { sv: "Japansk militarism avslöjar sin brutala karaktär för världen.", en: "Japanese militarism reveals its brutal character to the world.", tr: "Japon militarizmi acımasız karakterini dünyaya gösterir." },
    category: "war",
    importance: "high",
  },
  {
    year: 1940,
    title: {
      sv: "Trepartspakten — Axelmakterna skapas",
      en: "Tripartite Pact — The Axis Powers Created",
      tr: "Üçlü Pakt — Mihver Güçler Oluşturuluyor",
    },
    summary: {
      sv: "Japan, Nazityskland och Fascist-Italien undertecknar Trepartspakten den 27 september 1940. Japan erkänner Tysklands och Italiens ledning i Europa och de erkänner Japans 'nya ordning' i Asien. Det är en strategisk allians baserad på gemensamt motstånd mot USA och Britannien snarare än gemensam ideologi.",
      en: "Japan, Nazi Germany and Fascist Italy sign the Tripartite Pact on 27 September 1940. Japan recognises Germany and Italy's leadership in Europe and they recognise Japan's 'new order' in Asia. A strategic alliance based on common opposition to the USA and Britain rather than shared ideology.",
      tr: "Japonya, Nazi Almanyası ve Faşist İtalya, 27 Eylül 1940'ta Üçlü Pakt'ı imzalar. Japonya Almanya ve İtalya'nın Avrupa'daki liderliğini tanır.",
    },
    figures: ["Emperor Showa (Hirohito)", "Adolf Hitler", "Benito Mussolini"],
    consequences: { sv: "Axelmakterna formeras. Japan allierar sig med Nazityskland.", en: "Axis powers formed. Japan allies with Nazi Germany.", tr: "Mihver güçler oluşturulur. Japonya Nazi Almanyası ile ittifak kurar." },
    impact: { sv: "Japan inleder sin väg mot katastrof i Andra världskriget.", en: "Japan begins its path toward catastrophe in WWII.", tr: "Japonya İkinci Dünya Savaşı'ndaki felakete doğru yoluna başlar." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1941,
    title: {
      sv: "Pearl Harbor — Japan anfaller USA",
      en: "Pearl Harbor — Japan Attacks the USA",
      tr: "Pearl Harbor — Japonya ABD'ye Saldırıyor",
    },
    summary: {
      sv: "Den 7 december 1941 anfaller japanska marinflyget Pearl Harbor på Hawaii i en överraskningsattack som sänker 8 amerikanska slagskepp och dödar 2 403 amerikaner. 'A date which will live in infamy' — president Roosevelt. USA och Britannien förklarar Japan krig. Japans strategi var att tillintetgöra den amerikanska Stillahavsflottan och vinna tid att befästa sitt asiatiska imperium — en kalkyl som visar sig katastrofalt felaktig.",
      en: "On 7 December 1941 the Japanese naval air force attacks Pearl Harbor in Hawaii in a surprise attack sinking 8 American battleships and killing 2,403 Americans. 'A date which will live in infamy' — President Roosevelt. The USA and Britain declare war on Japan. Japan's strategy was to destroy the American Pacific Fleet and gain time to consolidate its Asian empire — a calculation that proves catastrophically wrong.",
      tr: "7 Aralık 1941'de Japon deniz havacılığı Hawaii'deki Pearl Harbor'a baskın yapar, 8 Amerikan zırhlısını batırır ve 2.403 Amerikalıyı öldürür.",
    },
    figures: ["Emperor Showa (Hirohito)", "Admiral Yamamoto Isoroku", "President Franklin D. Roosevelt"],
    consequences: { sv: "USA och Britannien förklarar Japan krig.", en: "USA and Britain declare war on Japan.", tr: "ABD ve Britanya Japonya'ya savaş ilan eder." },
    impact: { sv: "Andra världskriget blir verkligen globalt. Japans undergång beseglas.", en: "WWII becomes truly global. Japan's fate is sealed.", tr: "İkinci Dünya Savaşı gerçekten küresel olur. Japonya'nın kaderi mühürlenir." },
    category: "war",
    importance: "high",
  },
  {
    year: 1942,
    title: {
      sv: "Japansk expansion når sin topp — Imperiet störst",
      en: "Japanese Expansion Peaks — Empire at its Largest",
      tr: "Japon Genişlemesi Zirvede — İmparatorluk En Büyük",
    },
    summary: {
      sv: "I början av 1942 kontrollerar Japan ett enormt territorium: Manchuriet, stora delar av Kina, Sydostasien (Burma, Thailand, Malaysia, Singapore, Indokina, Filippinerna, Indonesien), Pacific-öar och delar av Nya Guinea. Imperiet sträcker sig över 8 miljoner km² och 450 miljoner människor. Men vid Midway i juni 1942 förstörs japanska flottstyrkor och vändpunkten nås.",
      en: "In early 1942 Japan controls an enormous territory: Manchuria, large parts of China, Southeast Asia (Burma, Thailand, Malaysia, Singapore, Indochina, Philippines, Indonesia), Pacific islands and parts of New Guinea. The empire stretches over 8 million km² and 450 million people. But at Midway in June 1942 Japanese naval forces are destroyed and the turning point is reached.",
      tr: "1942'nin başında Japonya devasa bir toprak kontrol eder: Mançurya, Çin'in büyük bölümleri, Güneydoğu Asya, Pasifik adaları.",
    },
    figures: ["Emperor Showa (Hirohito)", "General Yamashita Tomoyuki", "Admiral Yamamoto Isoroku"],
    consequences: { sv: "Japansk imperiet på sin geografiska topp.", en: "Japanese empire at its geographic peak.", tr: "Japon imparatorluğu coğrafi zirvesinde." },
    impact: { sv: "Midway-nederlaget inleder Japans oundvikliga fall.", en: "Midway defeat begins Japan's inevitable fall.", tr: "Midway yenilgisi Japonya'nın kaçınılmaz düşüşünü başlatır." },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1944,
    title: {
      sv: "Leyte Gulf — Japanska flottan förstörs",
      en: "Battle of Leyte Gulf — Japanese Navy Destroyed",
      tr: "Leyte Körfezi Savaşı — Japon Donanması Yok Ediliyor",
    },
    summary: {
      sv: "Slaget vid Leyte Gulf (oktober 1944) är historiens största sjöslag — fyra separata engagemang med hundratals fartyg på vardera sida. Det amerikanska segern förstör praktiskt taget hela den återstående japanska flottan. Japan kan inte längre skydda sina leveranslinjer eller sina kvarvarande territorier. Kamikaze-piloter — namngivna efter de historiska stormarna som räddade Japan från mongolerna — börjar sina självmordsattacker.",
      en: "The Battle of Leyte Gulf (October 1944) is the largest naval battle in history — four separate engagements with hundreds of ships on each side. The American victory virtually destroys the entire remaining Japanese navy. Japan can no longer protect its supply lines or remaining territories. Kamikaze pilots — named after the historical storms that saved Japan from the Mongols — begin their suicide attacks.",
      tr: "Leyte Körfezi Savaşı (Ekim 1944) tarihin en büyük deniz savaşıdır. Amerikan zaferi, kalan Japon donanmasını neredeyse tamamen yok eder.",
    },
    figures: ["Admiral Halsey", "Admiral Kurita Takeo", "Emperor Showa (Hirohito)"],
    consequences: { sv: "Japansk flotta förstörd. Kamikaze-attackerna inleds.", en: "Japanese navy destroyed. Kamikaze attacks begin.", tr: "Japon donanması yok edilir. Kamikaze saldırıları başlar." },
    impact: { sv: "Japans militära kollaps accelererar. Slutstriden för Japan börjar.", en: "Japan's military collapse accelerates. The final battle for Japan begins.", tr: "Japonya'nın askeri çöküşü hızlanır. Japonya için son savaş başlar." },
    category: "war",
    importance: "high",
  },
  {
    year: 1945,
    title: {
      sv: "Hiroshima och Nagasaki — Kärnvapnens födslodag och Japans kapitulation",
      en: "Hiroshima and Nagasaki — The Birth of Nuclear War and Japan's Surrender",
      tr: "Hiroşima ve Nagasaki — Nükleer Savaşın Doğuşu ve Japonya'nın Teslimi",
    },
    summary: {
      sv: "Den 6 augusti 1945 fäller USA atombomben 'Little Boy' över Hiroshima — 70 000 dör omedelbart, totalt 140 000 av skador och strålning. Den 9 augusti kastas 'Fat Man' över Nagasaki — 40 000 dör omedelbart. Den 15 augusti tillkännager kejsar Hirohito i ett radiosänt tal Japans kapitulation — hans röst hörs av folket för första gången. Det formella kapitulaitionsdokumentet undertecknas den 2 september 1945 ombord på USS Missouri.",
      en: "On 6 August 1945 the USA drops the atomic bomb 'Little Boy' on Hiroshima — 70,000 die immediately, 140,000 total from injuries and radiation. On 9 August 'Fat Man' is dropped on Nagasaki — 40,000 die immediately. On 15 August Emperor Hirohito announces Japan's surrender in a radio broadcast — his voice heard by the people for the first time. The formal surrender document is signed on 2 September 1945 aboard USS Missouri.",
      tr: "6 Ağustos 1945'te ABD, Hiroşima'ya 'Little Boy' atom bombasını atar — 70.000 anında ölür. 9 Ağustos'ta Nagasaki'ye 'Fat Man' atılır. 15 Ağustos'ta İmparator Hirohito radyo yayınıyla Japonya'nın teslimiyetini duyurur.",
    },
    figures: ["Emperor Showa (Hirohito)", "President Harry S. Truman", "General Douglas MacArthur"],
    consequences: { sv: "Japan kapitulerar. Det kejserliga imperiets era slutar.", en: "Japan surrenders. The era of imperial empire ends.", tr: "Japonya teslim olur. İmparatorluk döneminin çağı sona erer." },
    impact: { sv: "Kärnvapnets era inleds. Japan transformeras radikalt.", en: "The nuclear age begins. Japan is radically transformed.", tr: "Nükleer çağ başlar. Japonya köklü biçimde dönüşür." },
    category: "war",
    importance: "high",
  },
  {
    year: 1947,
    title: {
      sv: "Japans nya konstitution — Fred och demokrati",
      en: "Japan's New Constitution — Peace and Democracy",
      tr: "Japonya'nın Yeni Anayasası — Barış ve Demokrasi",
    },
    summary: {
      sv: "Den 3 maj 1947 träder Japans nya konstitution — skriven under amerikanskt ockupationsstyre — i kraft. Artikel 9 förbjuder Japan att föra krig eller upprätthålla en militär för offensiva syften — ett unikt fredslöfte utan motstycke i historien. Kejsaren reduceras till 'symbol för staten och folkets enhet' utan politisk makt. Japan påbörjar sin transformation till en fredlig demokrati.",
      en: "On 3 May 1947 Japan's new constitution — written under American occupation authority — comes into force. Article 9 forbids Japan from waging war or maintaining a military for offensive purposes — a unique peace pledge without precedent in history. The emperor is reduced to 'symbol of the state and of the unity of the people' without political power. Japan begins its transformation into a peaceful democracy.",
      tr: "3 Mayıs 1947'de Amerikan işgal yönetimi altında yazılan Japonya'nın yeni anayasası yürürlüğe girer. 9. Madde, Japonya'nın savaş yürütmesini veya saldırı amaçlı ordu bulundurmasını yasaklar.",
    },
    figures: ["Emperor Showa (Hirohito)", "General Douglas MacArthur", "Prime Minister Yoshida Shigeru"],
    consequences: { sv: "Japan blir en konstitutionell demokrati. Militarism förbjuds.", en: "Japan becomes a constitutional democracy. Militarism is banned.", tr: "Japonya anayasal bir demokrasi olur. Militarizm yasaklanır." },
    impact: { sv: "Japan transformeras från militärimperium till fredsnation.", en: "Japan transforms from military empire to peace nation.", tr: "Japonya askeri imparatorluktan barış ulusuna dönüşür." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1952,
    title: {
      sv: "Japans suveränitet återupprättas — Ockupationen slutar",
      en: "Japan's Sovereignty Restored — The Occupation Ends",
      tr: "Japonya'nın Egemenliği Yeniden Sağlandı — İşgal Sona Eriyor",
    },
    summary: {
      sv: "San Francisco-fredsfördraget träder i kraft och Japan återfår sin fulla suveränitet. Den amerikanska ockupationen, som börjat 1945, avslutas. Japan inleder nu sitt ekonomiska underverk — med amerikanskt stöd och koreansk krigets stimulans växer japansk ekonomi med imponerande fart. Det ekonomiska miraklet ersätter det militära imperieprojektet.",
      en: "The San Francisco Peace Treaty comes into force and Japan regains full sovereignty. The American occupation, which began in 1945, ends. Japan now begins its economic miracle — with American support and the Korean War's stimulus the Japanese economy grows at impressive speed. The economic miracle replaces the military imperial project.",
      tr: "San Francisco Barış Antlaşması yürürlüğe girer ve Japonya tam egemenliğini geri kazanır. 1945'te başlayan Amerikan işgali sona erer.",
    },
    figures: ["Emperor Showa (Hirohito)", "Prime Minister Yoshida Shigeru", "President Harry S. Truman"],
    consequences: { sv: "Japan suveränt igen. Det ekonomiska miraklet inleds.", en: "Japan sovereign again. Economic miracle begins.", tr: "Japonya yeniden egemen. Ekonomik mucize başlar." },
    impact: { sv: "Japan tar sin plats som världens näst största ekonomi.", en: "Japan takes its place as world's second largest economy.", tr: "Japonya dünya ikinci büyük ekonomisi olarak yerini alır." },
    category: "politics",
    importance: "high",
  },
  {
    year: 1964,
    title: {
      sv: "Tokyo-OS — Japan presenterar sig för världen",
      en: "Tokyo Olympics — Japan Presents Itself to the World",
      tr: "Tokyo Olimpiyatları — Japonya Kendini Dünyaya Sunuyor",
    },
    summary: {
      sv: "Tokyo-OS 1964 är Japans triumfartade återintroduktion till världsgemenskapen. Shinkansen-snabbtåget (bultettåget) invigs precis till OS och demonstrerar japansk teknologisk kompetens. Japan visar ett modernt, fredligt och teknologiskt avancerat ansikte för världen. Det är en av de mest lyckade OS i historien och ett symbolgripande ögonblick för ett Japan som rest sig ur krigets ruiner.",
      en: "The 1964 Tokyo Olympics are Japan's triumphant reintroduction to the world community. The Shinkansen bullet train is inaugurated just before the Games, demonstrating Japanese technological competence. Japan shows a modern, peaceful and technologically advanced face to the world. One of the most successful Olympics in history and a symbolically charged moment for a Japan risen from the ruins of war.",
      tr: "1964 Tokyo Olimpiyatları, Japonya'nın dünya topluluğuna zaferle yeniden girişidir. Shinkansen süper hızlı tren tam Olimpiyat öncesinde açılır.",
    },
    figures: ["Emperor Showa (Hirohito)", "Prime Minister Ikeda Hayato"],
    consequences: { sv: "Japan presenteras som en modern demokratisk stormakt.", en: "Japan presented as a modern democratic great power.", tr: "Japonya modern demokratik büyük güç olarak sunulur." },
    impact: { sv: "Japans globala prestige återupprättas. Ekonomiskt mirakel cementeras.", en: "Japan's global prestige restored. Economic miracle cemented.", tr: "Japonya'nın küresel prestiji yeniden sağlanır. Ekonomik mucize pekişir." },
    category: "culture",
    importance: "medium",
  },
  {
    year: 1989,
    title: {
      sv: "Showa-eran slutar — Heisei-perioden börjar",
      en: "Showa Era Ends — Heisei Period Begins",
      tr: "Showa Dönemi Sona Eriyor — Heisei Dönemi Başlıyor",
    },
    summary: {
      sv: "Kejsar Hirohito (Showa) dör den 7 januari 1989 efter 62 år på tronen — den längsta regeringstiden av en japansk kejsare i modern tid. Han bevittnade Japans transformation från ett militäristiskt imperium till en fredlig demokrati. Hans son Akihito bestiger tronen och Heisei-eran ('uppnå fred') börjar. Samma år kollapsar den japanska ekonomiska bubblan och Japan inleder 'det förlorade decenniet.'",
      en: "Emperor Hirohito (Showa) dies on 7 January 1989 after 62 years on the throne — the longest reign of a Japanese emperor in modern times. He witnessed Japan's transformation from militarist empire to peaceful democracy. His son Akihito ascends the throne and the Heisei era ('achieving peace') begins. The same year the Japanese economic bubble collapses and Japan begins the 'lost decade.'",
      tr: "İmparator Hirohito (Showa), 62 yıllık tahtta kalışının ardından 7 Ocak 1989'da vefat eder. Oğlu Akihito tahta çıkar ve Heisei dönemi başlar.",
    },
    figures: ["Emperor Showa (Hirohito)", "Emperor Akihito", "Prime Minister Takeshita Noboru"],
    consequences: { sv: "Heisei-eran börjar. Ekonomisk bubbla spricker.", en: "Heisei era begins. Economic bubble bursts.", tr: "Heisei dönemi başlar. Ekonomik balon patlar." },
    impact: { sv: "Japan möter ett nytt sekel med demografiska och ekonomiska utmaningar.", en: "Japan faces a new century with demographic and economic challenges.", tr: "Japonya demografik ve ekonomik zorluklarla yeni bir yüzyıla girer." },
    category: "politics",
    importance: "high",
  },
  {
    year: 2011,
    title: {
      sv: "Tohoku-jordskalvet — Fukushima-katastrofen",
      en: "Tohoku Earthquake — Fukushima Disaster",
      tr: "Tohoku Depremi — Fukushima Felaketi",
    },
    summary: {
      sv: "Den 11 mars 2011 drabbar ett massivt jordskalv (magnitud 9,0) nordöstra Japan och utlöser en katastrofal tsunami som dödar nästan 16 000 människor och förstör Fukushima Daiichi-kärnkraftverket. Det är den värsta kärnkraftsolyckan sedan Tjernobyl. Japan visar en imponerande nationell sammanhållning och disciplin i katastrofens efterdyning men kärnkraftsindustrin skakas i grunden.",
      en: "On 11 March 2011 a massive earthquake (magnitude 9.0) strikes northeastern Japan and triggers a catastrophic tsunami that kills nearly 16,000 people and destroys the Fukushima Daiichi nuclear power plant. The worst nuclear accident since Chernobyl. Japan shows impressive national solidarity and discipline in the disaster's aftermath but the nuclear industry is shaken to its foundations.",
      tr: "11 Mart 2011'de kuzeydoğu Japonya'yı vuran devasa bir deprem (9.0 büyüklüğünde), yaklaşık 16.000 kişiyi öldüren ve Fukushima Daiichi nükleer santralini tahrip eden yıkıcı bir tsunamiyi tetikler.",
    },
    figures: ["Emperor Akihito", "Prime Minister Kan Naoto"],
    consequences: { sv: "16 000 döda. Kärnkraftsindustrin ifrågasätts.", en: "16,000 dead. Nuclear industry questioned.", tr: "16.000 ölü. Nükleer endüstri sorgulanıyor." },
    impact: { sv: "Japan omvärderar sin energipolitik och katastrofberedskap.", en: "Japan reassesses its energy policy and disaster preparedness.", tr: "Japonya enerji politikasını ve afet hazırlığını yeniden değerlendirir." },
    category: "culture",
    importance: "high",
  },
  {
    year: 2019,
    title: {
      sv: "Reiwa-eran börjar — Kejsar Naruhito bestiger tronen",
      en: "Reiwa Era Begins — Emperor Naruhito Ascends the Throne",
      tr: "Reiwa Dönemi Başlıyor — İmparator Naruhito Tahta Çıkıyor",
    },
    summary: {
      sv: "Den 1 maj 2019 abdikerar kejsar Akihito — den förste japanske kejsaren att abdikera levande på 200 år — och hans son Naruhito bestiger Krysantemumtronen. Den nya eran 'Reiwa' (vacker harmoni) börjar. Japan befinner sig vid ett vägskäl: en åldrande befolkning, ekonomisk stagnation och ökande geopolitiska spänningar med Kina. Kejsardömet är dock mer stabilt och respekterat än någonsin.",
      en: "On 1 May 2019 Emperor Akihito abdicates — the first Japanese emperor to abdicate alive in 200 years — and his son Naruhito ascends the Chrysanthemum Throne. The new era 'Reiwa' (beautiful harmony) begins. Japan stands at a crossroads: an ageing population, economic stagnation and increasing geopolitical tensions with China. The imperial house however is more stable and respected than ever.",
      tr: "1 Mayıs 2019'da İmparator Akihito — 200 yılda hayattayken tahttan çekilen ilk Japon imparatoru — tahttan çekilir ve oğlu Naruhito Krizantem Tahtına çıkar.",
    },
    figures: ["Emperor Akihito", "Emperor Naruhito", "Prime Minister Abe Shinzo"],
    consequences: { sv: "Reiwa-eran börjar. Naruhito är Japans 126:e kejsare.", en: "Reiwa era begins. Naruhito is Japan's 126th emperor.", tr: "Reiwa dönemi başlar. Naruhito Japonya'nın 126. imparatorudur." },
    impact: { sv: "Världens äldsta monarki fortsätter sin obrustna linje.", en: "The world's oldest monarchy continues its unbroken line.", tr: "Dünyanın en eski monarşisi kesintisiz çizgisini sürdürür." },
    category: "politics",
    importance: "high",
  },
];

// =============================================================================
// EMPERORS — Alla kejsare med detaljerade profiler
// =============================================================================

const japaneseLeaders: Sultan[] = [
  { id: "jimmu", name: "Emperor Jimmu", reignStart: -660, reignEnd: -585, parentId: null, generation: 1, title: { sv: "Den gudomlige grundaren", en: "The Divine Founder", tr: "İlahi Kurucu" }, profileId: "emperor-jimmu" },
  { id: "suiko", name: "Empress Suiko", reignStart: 593, reignEnd: 628, parentId: null, generation: 2, title: { sv: "Den förste regnantdrottningen", en: "First Regnant Empress", tr: "İlk Hüküm Süren İmparatoriçe" }, profileId: "empress-suiko" },
  { id: "kotoku", name: "Emperor Kotoku", reignStart: 645, reignEnd: 654, parentId: null, generation: 3, title: { sv: "Taika-reformatorn", en: "Taika Reformer", tr: "Taika Reformcusu" } },
  { id: "tenmu", name: "Emperor Tenmu", reignStart: 673, reignEnd: 686, parentId: null, generation: 4, title: { sv: "Den gudabenediktige", en: "The Divinely Blessed", tr: "İlahi Bereketli" } },
  { id: "shomu", name: "Emperor Shomu", reignStart: 724, reignEnd: 749, parentId: null, generation: 5, title: { sv: "Buddhismens beskyddare", en: "Patron of Buddhism", tr: "Budizmin Hamisi" }, profileId: "emperor-shomu" },
  { id: "kanmu", name: "Emperor Kanmu", reignStart: 781, reignEnd: 806, parentId: null, generation: 6, title: { sv: "Kyotos grundare", en: "Founder of Kyoto", tr: "Kyoto'nun Kurucusu" }, profileId: "emperor-kanmu" },
  { id: "saga", name: "Emperor Saga", reignStart: 809, reignEnd: 823, parentId: "kanmu", generation: 7, title: { sv: "Den lärde kejsaren", en: "The Learned Emperor", tr: "Bilgin İmparator" } },
  { id: "go-daigo", name: "Emperor Go-Daigo", reignStart: 1318, reignEnd: 1339, parentId: null, generation: 8, title: { sv: "Den kämpande återställaren", en: "The Fighting Restorer", tr: "Savaşan Yenileyici" }, profileId: "emperor-go-daigo" },
  { id: "meiji", name: "Emperor Meiji (Mutsuhito)", reignStart: 1867, reignEnd: 1912, parentId: null, generation: 9, title: { sv: "Moderniseringens kejsare", en: "Emperor of Modernisation", tr: "Modernleşmenin İmparatoru" }, profileId: "emperor-meiji" },
  { id: "taisho", name: "Emperor Taisho (Yoshihito)", reignStart: 1912, reignEnd: 1926, parentId: "meiji", generation: 10, title: { sv: "Den sjuke demokraten", en: "The Ailing Democrat", tr: "Hasta Demokrat" }, profileId: "emperor-taisho" },
  { id: "showa", name: "Emperor Showa (Hirohito)", reignStart: 1926, reignEnd: 1989, parentId: "taisho", generation: 11, title: { sv: "Krigets och fredens kejsare", en: "Emperor of War and Peace", tr: "Savaş ve Barış İmparatoru" }, profileId: "emperor-showa" },
  { id: "akihito", name: "Emperor Akihito (Heisei)", reignStart: 1989, reignEnd: 2019, parentId: "showa", generation: 12, title: { sv: "Försoningens kejsare", en: "Emperor of Reconciliation", tr: "Uzlaşmanın İmparatoru" }, profileId: "emperor-akihito" },
  { id: "naruhito", name: "Emperor Naruhito (Reiwa)", reignStart: 2019, reignEnd: 9999, parentId: "akihito", generation: 13, title: { sv: "Harmonins kejsare", en: "Emperor of Beautiful Harmony", tr: "Güzel Uyumun İmparatoru" }, profileId: "emperor-naruhito" },
];

// =============================================================================
// QUIZ — Structure only (questions added via Admin Dashboard)
// =============================================================================

const japaneseQuizQuestions: QuizQuestion[] = [];

// =============================================================================
// BADGES
// =============================================================================

const japaneseBadges: Badge[] = [
  {
    id: "ashigaru",
    name: { sv: "Ashigaru — Fotsoldaten", en: "Ashigaru — The Foot Soldier", tr: "Ashigaru — Piyade" },
    icon: "⚔️",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor och ta dina första steg på bushido-vägen.",
      en: "Answer 3 questions correctly and take your first steps on the bushido path.",
      tr: "3 soruyu doğru yanıtlayın ve bushido yolunda ilk adımlarınızı atın.",
    },
  },
  {
    id: "samurai",
    name: { sv: "Samurai — Krigarens anda", en: "Samurai — Spirit of the Warrior", tr: "Samuray — Savaşçı Ruhu" },
    icon: "🗡️",
    requiredScore: 5,
    description: {
      sv: "Svara rätt på 5 frågor — du bär nu katanan med heder.",
      en: "Answer 5 questions correctly — you now carry the katana with honour.",
      tr: "5 soruyu doğru yanıtlayın — artık katanayı onurla taşıyorsunuz.",
    },
  },
  {
    id: "daimyo",
    name: { sv: "Daimyo — Krigsfursten", en: "Daimyo — The Warlord", tr: "Daimyo — Savaş Lordu" },
    icon: "🏯",
    requiredScore: 8,
    description: {
      sv: "Svara rätt på 8 frågor — du styr ditt eget domän med visdom.",
      en: "Answer 8 questions correctly — you govern your own domain with wisdom.",
      tr: "8 soruyu doğru yanıtlayın — kendi alanınızı bilgelikle yönetiyorsunuz.",
    },
  },
  {
    id: "shogun",
    name: { sv: "Shogun — Militärdiktatorn", en: "Shogun — The Military Dictator", tr: "Şogun — Askeri Diktatör" },
    icon: "🌸",
    requiredScore: 12,
    description: {
      sv: "Svara rätt på 12 frågor — Japan böjer knä inför din visdom.",
      en: "Answer 12 questions correctly — Japan bows to your wisdom.",
      tr: "12 soruyu doğru yanıtlayın — Japonya bilgeliğinize boyun eğer.",
    },
  },
];

// =============================================================================
// PROFILES — Detaljerade kejsarprofiler
// =============================================================================

const japaneseProfiles: HistoricalProfile[] = [
  {
    id: "emperor-jimmu",
    name: "Emperor Jimmu",
    years: "711–585 f.Kr. (legendär)",
    title: { sv: "Den gudomlige grundaren", en: "The Divine Founder", tr: "İlahi Kurucu" },
    portrait: "🌸",
    bio: {
      sv: "Jimmu är Japans legendare förste kejsare — ättling till solgudinnan Amaterasu och havsgudens son Ugayafukiaezu. Han ledde enligt legenden en militär kampanj från Kyushu till Yamato-slättens och erövrade regionen som lade grunden för det japanska imperiet. Hans gudomliga härkomst är grunden för den japanska kejsarfamiljens anspråk på legitimitet. Den 11 februari firar Japan nationaldagen till minne av hans tronbestigning år 660 f.Kr.",
      en: "Jimmu is Japan's legendary first emperor — descendant of the sun goddess Amaterasu and son of the sea god's son Ugayafukiaezu. According to legend he led a military campaign from Kyushu to the Yamato plain and conquered the region that laid the foundation for the Japanese empire. His divine lineage is the basis for the Japanese imperial family's claim to legitimacy. 11 February Japan celebrates National Foundation Day in memory of his enthronement in 660 BC.",
      tr: "Jimmu, Japonya'nın efsanevi ilk imparatoru — güneş tanrıçası Amaterasu'nun torunu. Efsaneye göre Kyushu'dan Yamato ovasına askeri bir sefer düzenledi ve Japon imparatorluğunun temelini attı.",
    },
    reforms: {
      sv: ["Grundandet av det japanska kejsardömet", "Enandet av Yamato-klanen med omgivande stammar", "Etablerandet av den kejserliga dynastin"],
      en: ["Founding of the Japanese imperial dynasty", "Unification of Yamato clan with surrounding tribes", "Establishment of the imperial line"],
      tr: ["Japon imparatorluk hanedanının kurulması", "Yamato klanının çevre kabilelerle birleştirilmesi", "İmparatorluk soyunun tesis edilmesi"],
    },
    campaigns: {
      sv: ["Kampanjen från Kyushu till Yamato", "Erövringen av centralJapan"],
      en: ["Campaign from Kyushu to Yamato", "Conquest of central Japan"],
      tr: ["Kyushu'dan Yamato'ya sefer", "Merkezi Japonya'nın fethi"],
    },
    leadershipStyle: {
      sv: "Jimmu presenteras i Kojiki och Nihon Shoki som en gudomlig krigarkonung med strategi, visdom och gudomlig beskärm. Hans ledarstil är mytologisk och symbolisk snarare än historisk — men hans förebildliga funktion som kejsarens gudomliga förfader har påverkat japansk politisk kultur i 2600 år.",
      en: "Jimmu is presented in the Kojiki and Nihon Shoki as a divine warrior-king with strategy, wisdom and divine protection. His leadership style is mythological and symbolic rather than historical — but his exemplary function as the emperor's divine ancestor has shaped Japanese political culture for 2,600 years.",
      tr: "Jimmu, Kojiki ve Nihon Shoki'de strateji, bilgelik ve ilahi korumayla donanmış ilahi bir savaşçı-kral olarak sunulur.",
    },
    criticalPerspectives: {
      sv: "Moderna historiker betraktar Jimmu som en mytologisk figur snarare än en historisk person. Kronikorna skrevs 1300 år efter hans påstådda regeringstid och tjänade politiska syften. Den gudomliga härkomsten från Amaterasu användes för att legitimera kejsarfamiljen och underbygga japansk nationalism.",
      en: "Modern historians regard Jimmu as a mythological figure rather than a historical person. The chronicles were written 1,300 years after his alleged reign and served political purposes. The divine descent from Amaterasu was used to legitimise the imperial family and underpin Japanese nationalism.",
      tr: "Modern tarihçiler Jimmu'yu tarihsel bir kişilikten çok mitolojik bir figür olarak görür.",
    },
  },
  {
    id: "empress-suiko",
    name: "Empress Suiko",
    years: "554–628 e.Kr.",
    title: { sv: "Den förste regnantdrottningen", en: "Japan's First Regnant Empress", tr: "Japonya'nın İlk Hüküm Süren İmparatoriçesi" },
    portrait: "👑",
    bio: {
      sv: "Suiko är Japans förste bekräftade regnant-kejsarinna — en monark i sin egen rätt, inte en regent. Hon regerade 593–628 och stärkte det centrala kejsardömet avsevärt. Under hennes styre blomstrade buddhismen i Japan tack vare hennes regent, prins Shotoku, vars sjutton artiklar lade grunden för japanskt statsväsende. Japans diplomatiska relationer med Tang-Kina etablerades under hennes regim.",
      en: "Suiko is Japan's first confirmed regnant empress — a monarch in her own right, not a regent. She ruled 593–628 and significantly strengthened the central imperial state. Under her reign Buddhism flourished in Japan thanks to her regent Prince Shotoku, whose seventeen articles laid the foundation for Japanese governance. Japan's diplomatic relations with Tang China were established under her reign.",
      tr: "Suiko, Japonya'nın onaylanan ilk hüküm süren imparatoriçesidir — kendi başına bir hükümdar. 593–628 arasında hüküm sürdü ve merkezi imparatorluk devletini önemli ölçüde güçlendirdi.",
    },
    reforms: {
      sv: ["Buddhistisk sponsring och tempelbyggande", "Diplomatiska relationer med Tang-dynastins Kina", "Centralisering av kejserlig administration", "Prins Shotokus sjutton artiklar genomförda"],
      en: ["Buddhist sponsorship and temple building", "Diplomatic relations with Tang Dynasty China", "Centralisation of imperial administration", "Prince Shotoku's seventeen articles implemented"],
      tr: ["Budist desteği ve tapınak inşaatı", "Tang Hanedanı Çin ile diplomatik ilişkiler", "İmparatorluk yönetiminin merkezileştirilmesi"],
    },
    campaigns: {
      sv: ["Diplomatiska missioner till Sui-dynastins Kina"],
      en: ["Diplomatic missions to Sui Dynasty China"],
      tr: ["Sui Hanedanı Çin'e diplomatik misyonlar"],
    },
    leadershipStyle: {
      sv: "Suiko kombinerade personlig fromhet med politisk skicklighet. Hon delegerade effektivt till prins Shotoku men behöll den slutliga auktoriteten. Hennes förmåga att navigera de konkurrerande klanerna Soga och Mononobe visar på ett raffinerat politiskt intellekt.",
      en: "Suiko combined personal piety with political skill. She delegated effectively to Prince Shotoku but retained ultimate authority. Her ability to navigate the competing Soga and Mononobe clans shows a sophisticated political intellect.",
      tr: "Suiko kişisel dindarlığı siyasi beceriyle birleştirdi. Prens Shotoku'ya etkin şekilde yetki verdi ancak nihai otoriteyi elinde tuttu.",
    },
    criticalPerspectives: {
      sv: "Suikos arv är delvis skymtat av hennes regent prins Shotoku, som fått mer uppmärksamhet i japansk historieskrivning. Hennes roll som regnerande kejsarinna i en patriarkal kultur är anmärkningsvärd och utmanade traditionella könsroller vid hovet.",
      en: "Suiko's legacy is partly overshadowed by her regent Prince Shotoku, who has received more attention in Japanese historiography. Her role as a regnant empress in a patriarchal culture is remarkable and challenged traditional gender roles at court.",
      tr: "Suiko'nun mirası kısmen naib Prens Shotoku'nun gölgesinde kalmıştır.",
    },
  },
  {
    id: "emperor-kanmu",
    name: "Emperor Kanmu",
    years: "737–806 e.Kr.",
    title: { sv: "Kyotos grundare", en: "Founder of Kyoto", tr: "Kyoto'nun Kurucusu" },
    portrait: "🏯",
    bio: {
      sv: "Kanmu är en av de viktigaste kejsarna i japansk historia — han grundade Heian-kyo (Kyoto) 794, en stad som förblev Japans kejserliga huvudstad i mer än tusen år fram till 1869. Han reformerade den centrala administrationen, stärkte gränserna mot Ainu-folken i norr (med generals Sakanoue no Tamuramaro genomförda kampanjer) och reducerade buddhistskt klerikalt inflytande på kejserlig politik.",
      en: "Kanmu is one of the most important emperors in Japanese history — he founded Heian-kyo (Kyoto) in 794, a city that remained Japan's imperial capital for over a thousand years until 1869. He reformed the central administration, strengthened borders against the Ainu people in the north (with campaigns carried out by General Sakanoue no Tamuramaro) and reduced Buddhist clerical influence on imperial politics.",
      tr: "Kanmu, Japon tarihinin en önemli imparatorlarından biridir — 1869'a kadar 1000 yıldan fazla süre Japonya'nın imparatorluk başkenti olarak kalan Heian-kyo'yu (Kyoto) 794'te kurdu.",
    },
    reforms: {
      sv: ["Grundandet av Heian-kyo (Kyoto)", "Reform av kejserlig administration och skatteindrivning", "Militärkampanjer mot Ainu i nordöstra Japan", "Reducering av buddhistiskt klerikalt inflytande"],
      en: ["Founding of Heian-kyo (Kyoto)", "Reform of imperial administration and tax collection", "Military campaigns against Ainu in northeastern Japan", "Reduction of Buddhist clerical influence"],
      tr: ["Heian-kyo'nun (Kyoto) kurulması", "İmparatorluk yönetimi ve vergi tahsilat reformu", "Kuzeydoğu Japonya'da Ainu'ya karşı askeri seferler"],
    },
    campaigns: {
      sv: ["Erövringen av nordöstra Japan — pacifieringen av Emishi", "Stärkandet av norra gränsen"],
      en: ["Conquest of northeastern Japan — pacification of the Emishi", "Strengthening of northern border"],
      tr: ["Kuzeydoğu Japonya'nın fethi — Emishi'nin pasifize edilmesi"],
    },
    leadershipStyle: {
      sv: "Kanmu var energisk, reformivrig och strategisk. Han insåg att den gamla huvudstaden Nara var för tätt knutet till buddhistklerker som ingrep i kejserlig politik, och att en ny start behövdes. Hans beslut att flytta till Kyoto formade japansk historia för mer än ett millennium.",
      en: "Kanmu was energetic, reform-minded and strategic. He recognised that the old capital Nara was too closely tied to Buddhist clerics who interfered in imperial politics, and that a fresh start was needed. His decision to move to Kyoto shaped Japanese history for more than a millennium.",
      tr: "Kanmu enerjik, reforma açık ve stratejikti. Eski başkent Nara'nın imparatorluk siyasetine müdahale eden Budist din adamlarıyla fazla bağlantılı olduğunu fark etti.",
    },
    criticalPerspectives: {
      sv: "Kanmus kampanjer mot Ainu och Emishi-folken resulterade i massdödande och tvångsförflyttning av urbefolkningar i nordöstra Japan — en mörk del av hans arv som sällan uppmärksammas i japansk historieskrivning.",
      en: "Kanmu's campaigns against the Ainu and Emishi peoples resulted in mass killings and forced displacement of indigenous populations in northeastern Japan — a dark part of his legacy rarely highlighted in Japanese historiography.",
      tr: "Kanmu'nun Ainu ve Emishi halklarına karşı yürüttüğü seferler, kuzeydoğu Japonya'daki yerli nüfusların toplu öldürülmesine ve zorla yerinden edilmesine yol açtı.",
    },
  },
  {
    id: "emperor-meiji",
    name: "Emperor Meiji (Mutsuhito)",
    years: "1852–1912",
    title: { sv: "Moderniseringens store kejsare", en: "The Great Emperor of Modernisation", tr: "Modernleşmenin Büyük İmparatoru" },
    portrait: "🎌",
    bio: {
      sv: "Mutsuhito, känd som kejsar Meiji ('upplyst styre'), är den person som mer än någon annan omvandlade Japan från ett feodalt samuraisamhälle till en modern industriell stormakt. Han besteg tronen 1867 vid 15 års ålder under den enorma krisen av utländskt tryck och intern politisk splittring. Under hans 45-åriga styre industrialiserades Japan, fick en konstitution, ett parlament, ett nationellt utbildningssystem och besegrade en europeisk stormakt (Ryssland). Det japanska miraklet börjar med Meiji.",
      en: "Mutsuhito, known as Emperor Meiji ('enlightened rule'), is the person who more than any other transformed Japan from a feudal samurai society into a modern industrial great power. He ascended the throne in 1867 at age 15 amid the enormous crisis of foreign pressure and internal political split. During his 45-year reign Japan industrialised, received a constitution, a parliament, a national education system and defeated a European great power (Russia). The Japanese miracle begins with Meiji.",
      tr: "Mutsuhito, İmparator Meiji ('aydınlanmış yönetim') olarak bilinir ve Japonya'yı feodal samuray toplumundan modern endüstriyel büyük güce dönüştüren kişidir.",
    },
    reforms: {
      sv: ["Meiji-restaurationen — återinförandet av kejserlig makt", "Avskaffandet av samurajiersklassen och feodalsystemet", "Industrialisering — järnvägar, fabriker, varvsbyggande", "Meiji-konstitutionen (1889) och parlamentet (Diet)", "Nationellt utbildningssystem och värnplikt", "Juridisk modernisering efter europeisk modell"],
      en: ["Meiji Restoration — reinstatement of imperial power", "Abolition of samurai class and feudal system", "Industrialisation — railways, factories, shipbuilding", "Meiji Constitution (1889) and parliament (Diet)", "National education system and conscription", "Legal modernisation on European model"],
      tr: ["Meiji Restorasyonu — imparatorluk gücünün yeniden tesisi", "Samuray sınıfının ve feodal sistemin kaldırılması", "Sanayileşme — demiryolları, fabrikalar, tersane inşaatı", "Meiji Anayasası (1889) ve parlamento"],
    },
    campaigns: {
      sv: ["Boshin-kriget (1868–69) — shogunaten störtas", "Satsuma-revolten (1877) — sista samuraiupproret besegrat", "Sino-japanska kriget (1894–95) — Kina besegrat, Taiwan vunnet", "Rysk-japanska kriget (1904–05) — Ryssland besegrat"],
      en: ["Boshin War (1868–69) — shogunate overthrown", "Satsuma Rebellion (1877) — last samurai uprising defeated", "First Sino-Japanese War (1894–95) — China defeated, Taiwan won", "Russo-Japanese War (1904–05) — Russia defeated"],
      tr: ["Boshin Savaşı (1868–69)", "Satsuma İsyanı (1877)", "Birinci Çin-Japon Savaşı (1894–95)", "Rus-Japon Savaşı (1904–05)"],
    },
    leadershipStyle: {
      sv: "Meiji var inte en handlingskraftig militär men en skicklig symbolisk ledare som förankrade dramatiska reformer i kejserlig legitimitet. Han omgav sig med briljanta rådgivare — Okubo Toshimichi, Kido Takayoshi, Ito Hirobumi — och skapade ett effektivt system för att absorbera västerländsk kunskap medan den japanska identiteten bevarades.",
      en: "Meiji was not a hands-on military leader but a skilled symbolic figurehead who anchored dramatic reforms in imperial legitimacy. He surrounded himself with brilliant advisors — Okubo Toshimichi, Kido Takayoshi, Ito Hirobumi — and created an effective system for absorbing Western knowledge while preserving Japanese identity.",
      tr: "Meiji aktif bir askeri lider değil, dramatik reformları imparatorluk meşruiyetine bağlayan yetenekli sembolik bir figürdü.",
    },
    criticalPerspectives: {
      sv: "Meiji-erans modernisering byggde delvis på brutal undertryckning av traditionalism — Satsuma-upproret krossades med dödliga militärkampanjer. Koreas och Taiwans kolonisering under hans styre ledde till decennier av förtryck. Det nationalistiska systemet som byggdes under Meiji bar i sig fröna till den militaristiska katastrofen under Showa.",
      en: "The Meiji era's modernisation was partly built on brutal suppression of traditionalism — the Satsuma Rebellion was crushed with lethal military campaigns. The colonisation of Korea and Taiwan under his rule led to decades of oppression. The nationalist system built under Meiji carried within it the seeds of the militarist catastrophe under Showa.",
      tr: "Meiji döneminin modernleşmesi kısmen gelenekçiliğin acımasız bastırılmasına dayanıyordu. Onun yönetimi altında Kore ve Tayvan'ın sömürgeleştirilmesi on yıllarca süren baskıya yol açtı.",
    },
  },
  {
    id: "emperor-taisho",
    name: "Emperor Taisho (Yoshihito)",
    years: "1879–1926",
    title: { sv: "Demokratins sjuke kejsare", en: "The Ailing Emperor of Democracy", tr: "Demokrasinin Hasta İmparatoru" },
    portrait: "🌸",
    bio: {
      sv: "Yoshihito, känd som kejsar Taisho ('stor rättvisa'), regerade 1912–1926 under vad som kallas Taisho-demokratin — en era av liberalisering, parlamentarisk politik och kulturell blomstring. Han led dock av svår neurologisk sjukdom sedan barndomen (troligen meningit) och var ofta oförmögen att utföra kejserliga funktioner. Hans son Hirohito agerade regent från 1921. Taisho-eran var ändå Japans mest liberala period.",
      en: "Yoshihito, known as Emperor Taisho ('great justice'), reigned 1912–1926 during what is called Taisho democracy — an era of liberalisation, parliamentary politics and cultural flowering. He suffered however from severe neurological illness since childhood (likely meningitis) and was often unable to perform imperial functions. His son Hirohito acted as regent from 1921. The Taisho era was nonetheless Japan's most liberal period.",
      tr: "Yoshihito, Taisho ('büyük adalet') İmparatoru olarak bilinir, 1912–1926 arasında Taisho demokrasisi olarak adlandırılan dönemde hüküm sürdü.",
    },
    reforms: {
      sv: ["Taisho-demokratin — parlamentarisk politik stärks", "Rösträttsreformer (allmän manlig rösträtt 1925)", "Liberalisering av press och yttrandefrihet"],
      en: ["Taisho democracy — parliamentary politics strengthened", "Electoral reforms (universal male suffrage 1925)", "Liberalisation of press and freedom of speech"],
      tr: ["Taisho demokrasisi — parlamenter siyasetin güçlendirilmesi", "Seçim reformları (1925'te evrensel erkek oy hakkı)"],
    },
    campaigns: {
      sv: ["Japans deltagande i Första världskriget på Ententens sida"],
      en: ["Japan's participation in WWI on the Entente side"],
      tr: ["Japonya'nın İtilaf Devletleri tarafında Birinci Dünya Savaşı'na katılımı"],
    },
    leadershipStyle: {
      sv: "Taisho var mer av en passiv figur än en aktiv ledare — hans sjukdom förhindrade aktivt deltagande i statsaffärer. Men hans era gav ändå utrymme för en folklig demokratirörelse, liberala partier och en mer öppen politisk kultur. Hans svaghet paradoxalt nog gav mer utrymme för civilt parlamentariskt styre.",
      en: "Taisho was more a passive figure than an active leader — his illness prevented active participation in state affairs. But his era nonetheless gave space for a popular democracy movement, liberal parties and a more open political culture. His weakness paradoxically gave more room for civil parliamentary rule.",
      tr: "Taisho aktif bir liderden çok pasif bir figürdü — hastalığı devlet işlerine aktif katılımı engelledi.",
    },
    criticalPerspectives: {
      sv: "Taisho-demokratin hade allvarliga begränsningar: lantarbetare och kvinnor hade ingen rösträtt, kommunistiska partier var förbjudna och militären hade stor autonomi från civilregeringen. Trots liberaliseringen inleddes under Taisho-eran den högerextremistiska nationalism som ledde till militärismens triumf på 1930-talet.",
      en: "Taisho democracy had serious limitations: rural workers and women had no suffrage, communist parties were banned and the military had great autonomy from the civilian government. Despite liberalisation, during the Taisho era the right-wing nationalism began that led to militarism's triumph in the 1930s.",
      tr: "Taisho demokrasisinin ciddi sınırlamaları vardı: köylü işçiler ve kadınlar oy hakkına sahip değildi, komünist partiler yasaklandı.",
    },
  },
  {
    id: "emperor-showa",
    name: "Emperor Showa (Hirohito)",
    years: "1901–1989",
    title: { sv: "Krigets och fredens kejsare", en: "Emperor of War and Peace", tr: "Savaş ve Barış İmparatoru" },
    portrait: "⛩️",
    bio: {
      sv: "Hirohito, känd som kejsar Showa ('strålande fred'), är en av 1900-talets mest komplexa historiska figurer. Han regerade i 62 år — den längsta kejserliga regeringstiden i japansk modern historia — och bevittnade Japan transformeras från ett militaristiskt imperium som ockuperade halva Asien till en fredlig demokrati och världens näst största ekonomi. Hans roll under kriget är historiskt kontroversiell.",
      en: "Hirohito, known as Emperor Showa ('radiant peace'), is one of the most complex historical figures of the 20th century. He reigned for 62 years — the longest imperial reign in modern Japanese history — and witnessed Japan transform from a militarist empire occupying half of Asia to a peaceful democracy and world's second-largest economy. His role during the war is historically controversial.",
      tr: "Showa İmparatoru Hirohito, 20. yüzyılın en karmaşık tarihsel figürlerinden biridir. 62 yıl hüküm sürdü ve Japonya'nın askeri imparatorluktan barışçıl demokrasiye dönüşümüne tanıklık etti.",
    },
    reforms: {
      sv: ["Acceptans av Potsdamdeklarationen och kapitulation 1945", "Stöd för Japans demokratiska konstitution 1947", "Personlig diplomatisk turné till Europa (1971) — hälsade på europeiska monarker", "Avklingad gudsstatus — 'Ningen-Sengen' (Deklaration om humanitet) 1946"],
      en: ["Acceptance of Potsdam Declaration and surrender 1945", "Support for Japan's democratic constitution 1947", "Personal diplomatic tour to Europe (1971) — met European monarchs", "Renunciation of divine status — 'Ningen-Sengen' (Humanity Declaration) 1946"],
      tr: ["Potsdam Bildirgesi'nin kabul edilmesi ve 1945'te teslim", "1947 Japonya demokratik anayasasına destek", "İlahi statünün reddi — 1946 İnsanlık Bildirisi"],
    },
    campaigns: {
      sv: ["Manchuriet-invasionen (1931) — hans roll omdiskuteras", "Andra sino-japanska kriget (1937–45)", "Pearl Harbor och Stillahavsskriget (1941–45)", "Japans kapitulation (1945)"],
      en: ["Manchuria invasion (1931) — his role debated", "Second Sino-Japanese War (1937–45)", "Pearl Harbor and the Pacific War (1941–45)", "Japan's surrender (1945)"],
      tr: ["Mançurya işgali (1931)", "İkinci Çin-Japon Savaşı (1937–45)", "Pearl Harbor ve Pasifik Savaşı (1941–45)", "Japonya'nın teslimi (1945)"],
    },
    leadershipStyle: {
      sv: "Hirohito var mer av en zoolog och marinbiolog av passion än en krigsgivare av ambition. Hans verkliga politiska makt och ansvar under kriget är historiskt omstritt — var han en maktlös figur manipulerad av militären eller en aktiv deltagare i krigsbeslutsfattandet? De flesta historiker ser honom som en mer komplex figur än antingen ren offer eller ren skyldig.",
      en: "Hirohito was more a zoologist and marine biologist by passion than a war-giver by ambition. His actual political power and responsibility during the war is historically contested — was he a powerless figure manipulated by the military or an active participant in wartime decision-making? Most historians see him as a more complex figure than either pure victim or pure guilty party.",
      tr: "Hirohito, hırslı bir savaş vericiden çok tutkuyla bir zoolog ve deniz biyologuydu. Savaş sırasındaki gerçek siyasi gücü ve sorumluluğu tarihsel olarak tartışmalıdır.",
    },
    criticalPerspectives: {
      sv: "Hirohitos ansvar för krigsförbrytelserna i Kina, Korea och hela Stilla havet är fortfarande en brännande historisk och politisk fråga. Han undkom åtal vid Tokyorättegångarna med amerikansk inblandning. Hans förblev som kejsare efter kriget var ett pragmatiskt beslut av MacArthur — men det innebar att Japan aldrig fullt ut konfronterade sin kejserliga institutions roll i kriget.",
      en: "Hirohito's responsibility for war crimes in China, Korea and across the Pacific remains a burning historical and political question. He escaped prosecution at the Tokyo Trials with American involvement. His remaining as emperor after the war was a pragmatic decision by MacArthur — but it meant Japan never fully confronted its imperial institution's role in the war.",
      tr: "Hirohito'nun Çin, Kore ve Pasifik genelindeki savaş suçlarındaki sorumluluğu hâlâ yakıcı bir tarihsel ve siyasi sorudur.",
    },
  },
  {
    id: "emperor-akihito",
    name: "Emperor Akihito (Heisei)",
    years: "1933–",
    title: { sv: "Försoningens kejsare", en: "Emperor of Reconciliation", tr: "Uzlaşmanın İmparatoru" },
    portrait: "🕊️",
    bio: {
      sv: "Akihito, känd som Heisei-kejsaren ('uppnå fred'), regerade 1989–2019 och är känd för sin aktiva roll i att bearbeta Japans krigshistoria. Han besökte Saipan, Palau och Filippinerna — platser för blodiga Stillahavskrigsslag — för att ödmjukt hedra både japanska och motståndarsidornas döda. Hans frispråkighet om krigets tragedier var historisk för en japansk kejsare. Han gifte sig dessutom med en kvinna av vanlig börd — Michiko Shoda — en banbrytande symbolisk handling.",
      en: "Akihito, known as the Heisei Emperor ('achieving peace'), reigned 1989–2019 and is known for his active role in processing Japan's war history. He visited Saipan, Palau and the Philippines — sites of bloody Pacific War battles — to humbly honour both Japanese and enemy dead. His outspokenness about the war's tragedies was historically significant for a Japanese emperor. He also married a commoner — Michiko Shoda — a groundbreaking symbolic act.",
      tr: "Heisei İmparatoru Akihito, 1989–2019 arasında hüküm sürdü ve Japonya'nın savaş tarihini işleme konusundaki aktif rolüyle tanınır.",
    },
    reforms: {
      sv: ["Aktiv försoningspolitik mot Japans krigsoffernationer", "Äktenskap med en vanlig japonska — demokratisering av kejsarfamiljen", "Abdikation 2019 — det första levande abdikationen på 200 år", "Aktiv katastrofjour vid Kobe (1995) och Tohoku (2011)"],
      en: ["Active reconciliation policy toward Japan's war victim nations", "Marriage to a commoner — democratisation of imperial family", "Abdication 2019 — first abdication alive in 200 years", "Active disaster relief response at Kobe (1995) and Tohoku (2011)"],
      tr: ["Japonya'nın savaş kurbanı uluslarına yönelik aktif uzlaşma politikası", "Sıradan biriyle evlilik — imparatorluk ailesinin demokratikleştirilmesi", "2019'da tahttan çekilme"],
    },
    campaigns: {
      sv: ["Besök på krigsplatser i Stillahavet — Saipan, Palau, Filippinerna", "Besök på krigsoffernationer — Kina, Korea"],
      en: ["Visits to Pacific War sites — Saipan, Palau, Philippines", "Visits to war victim nations — China, Korea"],
      tr: ["Pasifik Savaşı yerlerine ziyaretler", "Savaş kurbanı uluslara ziyaretler"],
    },
    leadershipStyle: {
      sv: "Akihito definierade det moderna japanska kejsarskapet som en aktiv, engagerad och empatisk institution. Hans besök vid katastrofplatser, hans tal om krigets mänskliga kostnader och hans ödmjuka hälsning till dem Japan skadat satte en ny standard för kejserligt beteende.",
      en: "Akihito defined the modern Japanese emperorship as an active, engaged and empathetic institution. His visits to disaster sites, his speeches about the human costs of war and his humble acknowledgement of those Japan had harmed set a new standard for imperial conduct.",
      tr: "Akihito, modern Japon imparatorluğunu aktif, ilgili ve empatik bir kurum olarak tanımladı.",
    },
    criticalPerspectives: {
      sv: "Kritiker menar att Akihito, trots sina försoningsinsatser, aldrig använde de direkta ursäktsord (apologize/owabi) som Sydkorea och Kina kräver. Japans officiella förnekelse av krigsförbrytelser — framför allt systemet av 'tröstkvinnor' — kvarstår som en känslig fråga trots kejsarens personliga insatser.",
      en: "Critics argue that Akihito, despite his reconciliation efforts, never used the direct words of apology (apologize/owabi) that South Korea and China demand. Japan's official denial of war crimes — particularly the system of 'comfort women' — remains a sensitive issue despite the emperor's personal efforts.",
      tr: "Eleştirmenler, Akihito'nun uzlaşma çabalarına rağmen Güney Kore ve Çin'in talep ettiği doğrudan özür kelimelerini hiç kullanmadığını savunur.",
    },
  },
  {
    id: "emperor-naruhito",
    name: "Emperor Naruhito (Reiwa)",
    years: "1960–",
    title: { sv: "Harmonins kejsare", en: "Emperor of Beautiful Harmony", tr: "Güzel Uyumun İmparatoru" },
    portrait: "🌺",
    bio: {
      sv: "Naruhito, Japans 126:e kejsare och ledare för Reiwa-eran ('vacker harmoni'), besteg Krysantemumtronen den 1 maj 2019. Han studerade vid Oxford University (ett första för en japansk kronprins) och är känd för sina starka åsikter om vattenbrist och miljöfrågor globalt. Hans hustru, kejsarinna Masako, en före detta diplomat med doktorsexamen från Harvard, kämpar med ett psykisk hälsotillstånd som uppmärksammat stress i det kejserliga hovet.",
      en: "Naruhito, Japan's 126th emperor and leader of the Reiwa era ('beautiful harmony'), ascended the Chrysanthemum Throne on 1 May 2019. He studied at Oxford University (a first for a Japanese crown prince) and is known for his strong views on global water scarcity and environmental issues. His wife, Empress Masako, a former diplomat with a Harvard doctorate, has struggled with a psychological condition that highlighted stress within the imperial household.",
      tr: "Naruhito, Japonya'nın 126. imparatoru ve Reiwa döneminin önderi, 1 Mayıs 2019'da Krizantem Tahtına çıktı. Oxford Üniversitesi'nde okudu (Japon veliaht prensi için bir ilk).",
    },
    reforms: {
      sv: ["Global talesperson för vattenbrist och miljöfrågor", "Modernisering av det kejserliga hovet för en ny generation", "Fortsatt försoningsarbete med Japans krigsoffernationer"],
      en: ["Global spokesperson for water scarcity and environmental issues", "Modernisation of the imperial household for a new generation", "Continued reconciliation work with Japan's war victim nations"],
      tr: ["Su kıtlığı ve çevre sorunları için küresel sözcü", "İmparatorluk hanedanının yeni nesil için modernleştirilmesi"],
    },
    campaigns: {
      sv: ["Besök på platser drabbade av naturkatastrofer", "Internationella diplomatiska besök som statschef"],
      en: ["Visits to sites affected by natural disasters", "International diplomatic visits as head of state"],
      tr: ["Doğal afetlerden etkilenen yerlere ziyaretler", "Devlet başkanı olarak uluslararası diplomatik ziyaretler"],
    },
    leadershipStyle: {
      sv: "Naruhito leder ett kejsarskap i snabb förändring — digitaliseringen, japansk demografisk kris och geopolitiska spänningar i Asien präglar hans era. Han är mer öppen och kommunikativ än sina föregångare och kombinerar respekt för tradition med en tydlig förståelse för det moderna Japans utmaningar.",
      en: "Naruhito leads an emperorship in rapid change — digitalisation, Japan's demographic crisis and geopolitical tensions in Asia mark his era. He is more open and communicative than his predecessors and combines respect for tradition with a clear understanding of modern Japan's challenges.",
      tr: "Naruhito hızlı değişim içinde bir imparatorluğa önderlik ediyor — dijitalleşme, Japonya'nın demografik krizi ve Asya'daki jeopolitik gerilimler dönemini belirliyor.",
    },
    criticalPerspectives: {
      sv: "Det japanska imperiets framtid är omdiskuterad — den kejserliga familjen saknar en direkt manlig arvinge av nästföljande generation (prinsessor förlorar sin kejserliga status vid äktenskap med en icke-kejserlig person). Frågan om successionen och eventuell reform av tronföljden är kontroversiell i japansk politik.",
      en: "The future of the Japanese imperial line is debated — the imperial family lacks a direct male heir of the next generation (princesses lose their imperial status upon marrying a non-imperial person). The question of succession and possible reform of the line of succession is controversial in Japanese politics.",
      tr: "Japon imparatorluk çizgisinin geleceği tartışmalıdır — imparatorluk ailesi, bir sonraki nesilde doğrudan erkek varis yoksunluğu yaşıyor.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const japaneseTerritories: TerritoryPeriod[] = [
  {
    yearStart: -660,
    yearEnd: 300,
    label: { sv: "Yamato — Det tidiga Japan", en: "Yamato — Early Japan", tr: "Yamato — Erken Japonya" },
    color: "#BC002D",
    polygon: [[
      [34.5, 135.5], [34.0, 136.5], [33.5, 135.5], [33.0, 131.0],
      [33.5, 130.5], [34.5, 131.0], [35.5, 133.0], [35.0, 135.0],
      [34.5, 135.5],
    ]],
  },
  {
    yearStart: 700,
    yearEnd: 1600,
    label: { sv: "Japanska öarna", en: "The Japanese Islands", tr: "Japon Adaları" },
    color: "#BC002D",
    polygon: [[
      [45.5, 141.9], [43.0, 141.3], [41.5, 140.7], [40.0, 140.5],
      [38.5, 141.0], [36.5, 140.8], [35.0, 136.5], [34.0, 135.5],
      [33.5, 130.5], [31.5, 130.5], [31.0, 131.5], [32.5, 132.5],
      [33.0, 133.5], [34.0, 137.5], [35.5, 139.5], [36.0, 140.0],
      [38.0, 141.5], [39.5, 141.8], [41.0, 141.3], [42.0, 140.5],
      [43.5, 141.5], [44.5, 143.0], [45.0, 143.0], [45.5, 141.9],
    ]],
  },
  {
    yearStart: 1895,
    yearEnd: 1945,
    label: { sv: "Det japanska imperiet — Expansion", en: "Japanese Empire — Expansion", tr: "Japon İmparatorluğu — Genişleme" },
    color: "#BC002D",
    polygon: [[
      [50.0, 142.0], [46.0, 142.0], [45.5, 141.9], [43.0, 141.3],
      [41.5, 140.7], [40.0, 140.5], [38.5, 141.0], [35.0, 136.5],
      [34.0, 135.5], [33.5, 130.5], [31.0, 131.5], [34.0, 137.5],
      [35.5, 139.5], [41.0, 141.3], [45.0, 143.0], [48.0, 142.5],
      [50.5, 142.5], [50.0, 142.0],
      // Taiwan
      [25.3, 121.5], [25.0, 122.0], [24.0, 121.5], [22.5, 121.0],
      [22.0, 120.5], [23.0, 120.0], [24.5, 121.0], [25.3, 121.5],
      // Korea
      [38.0, 124.5], [37.0, 126.0], [35.0, 129.0], [35.5, 129.5],
      [37.5, 128.5], [38.5, 128.0], [40.0, 129.5], [42.0, 130.0],
      [42.5, 128.5], [41.5, 126.5], [40.0, 124.5], [38.0, 124.5],
    ]],
  },
  {
    yearStart: 1942,
    yearEnd: 1945,
    label: { sv: "Maximalt territorium 1942", en: "Maximum Territory 1942", tr: "Maksimum Toprak 1942" },
    color: "#8B0000",
    polygon: [[
      [50.0, 142.0], [45.5, 141.9], [35.0, 136.5], [33.5, 130.5],
      [31.0, 131.5], [35.5, 139.5], [45.0, 143.0], [50.5, 142.5],
      // Manchuria
      [53.0, 122.0], [50.0, 135.0], [48.0, 134.5], [46.0, 133.5],
      [44.0, 131.0], [42.0, 130.0], [40.0, 124.5], [38.0, 124.5],
      [37.0, 126.0], [35.0, 129.0], [33.5, 130.5],
      [30.0, 122.0], [27.0, 121.0], [25.3, 121.5], [22.0, 120.5],
      [20.0, 110.0], [17.0, 107.0], [10.0, 105.0], [1.0, 104.0],
      [-5.0, 105.0], [-8.0, 115.0], [-8.0, 127.0], [-5.0, 132.0],
      [0.0, 132.0], [5.0, 127.0], [7.0, 127.0], [10.0, 125.0],
      [13.0, 123.0], [15.0, 120.0], [18.0, 120.0], [20.0, 122.0],
      [22.0, 114.0], [23.0, 113.0], [24.0, 116.0], [26.0, 119.0],
      [30.0, 121.0], [33.5, 130.5],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const japaneseTradeRoutes: TradeRouteGeo[] = [
  {
    id: "silk-road-sea-japan",
    name: { sv: "Sidenvägen — Japan till Kina", en: "Silk Road Sea Route — Japan to China", tr: "İpek Yolu Deniz Yolu — Japonya'dan Çin'e" },
    yearActive: 600,
    path: [
      [34.7, 135.5], [34.0, 132.0], [33.0, 130.0],
      [32.0, 127.0], [31.0, 124.5], [30.0, 122.0],
      [29.0, 122.0], [31.2, 121.5],
    ],
  },
  {
    id: "japan-korea-route",
    name: { sv: "Japan–Korea handelsvägen", en: "Japan–Korea Trade Route", tr: "Japonya–Kore Ticaret Yolu" },
    yearActive: 400,
    path: [
      [34.7, 135.5], [34.0, 132.0], [35.5, 129.5],
      [37.0, 127.5], [37.5, 126.9],
    ],
  },
  {
    id: "nanban-trade",
    name: { sv: "Nanban-handeln — Japan till Europa via Macao", en: "Nanban Trade — Japan to Europe via Macao", tr: "Nanban Ticareti — Japonya'dan Avrupa'ya" },
    yearActive: 1550,
    path: [
      [34.7, 135.5], [32.0, 131.0], [27.0, 127.0],
      [22.5, 114.0], [20.0, 110.0], [10.0, 105.0],
      [1.0, 104.0], [-8.0, 115.0], [20.0, 57.0], [35.5, -6.0],
    ],
  },
  {
    id: "meiji-trade-route",
    name: { sv: "Meiji-handelsvägen — Tokyo till San Francisco", en: "Meiji Trade Route — Tokyo to San Francisco", tr: "Meiji Ticaret Yolu — Tokyo'dan San Francisco'ya" },
    yearActive: 1870,
    path: [
      [35.7, 139.7], [40.0, 145.0], [45.0, 155.0],
      [50.0, 170.0], [52.0, -175.0], [48.0, -150.0],
      [37.8, -122.4],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const japaneseEmpire: EmpireConfig = {
  id: "japanese_empire",
  name: {
    sv: "Japanska Imperiet",
    en: "Japanese Empire",
    tr: "Japon İmparatorluğu",
  },
  theme: "ottoman",
  appTitle: "Japanese Empire Intelligence",
  crestImage: japanLogo,
  backgroundImage: japanBackground,
  leaderTitle: { sv: "Kejsare", en: "Emperor", tr: "İmparator" },
  dynastyTitle: {
    sv: "Japansk Kejsardynasti",
    en: "Japanese Imperial Dynasty",
    tr: "Japon İmparatorluk Hanedanı",
  },
  timeline: japaneseTimeline,
  leaders: japaneseLeaders,
  profiles: japaneseProfiles,
  figures: [],
  quizQuestions: japaneseQuizQuestions,
  badges: japaneseBadges,
  territories: japaneseTerritories,
  tradeRoutes: japaneseTradeRoutes,
  mapCenter: [36.0, 138.0],
  mapZoom: 4,
  yearRange: [-660, 1947],
  yearDefault: 1900,
  chatSystemContext:
    "the Japanese Empire (660 BC–1947 AD). You are an expert on Japanese imperial history covering the legendary founding by Emperor Jimmu, the classical Nara and Heian periods, the samurai age and feudal shogunates (Kamakura, Muromachi, Edo/Tokugawa), the Meiji Restoration and rapid modernisation, the militarist expansion in Asia, World War II, and the post-war democratic transformation. Treat all emperors with historical respect and accuracy.",
  chatPlaceholders: {
    sv: "Ställ en fråga om det japanska imperiet...",
    en: "Ask a question about the Japanese Empire...",
    tr: "Japon İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Vad var Meiji-restaurationen och varför förändrade den Japan?",
      "Berätta om samurajernas roll i japansk historia",
      "Hur lyckades Japan vinna mot Ryssland 1905?",
    ],
    en: [
      "What was the Meiji Restoration and why did it transform Japan?",
      "Tell me about the role of the samurai in Japanese history",
      "How did Japan manage to defeat Russia in 1905?",
    ],
    tr: [
      "Meiji Restorasyonu neydi ve neden Japonya'yı dönüştürdü?",
      "Samurayların Japon tarihindeki rolünü anlatın",
      "Japonya 1905'te Rusya'yı nasıl yenmeyi başardı?",
    ],
  },
  homeDescription: {
    sv: "Utforska världens äldsta monarki (660 f.Kr.–1947 e.Kr.) — från Jimmu och samuraiernas Japan till Meiji-miraklet, Pearl Harbor och det moderna Japan.",
    en: "Explore the world's oldest monarchy (660 BC–1947 AD) — from Jimmu and samurai Japan to the Meiji miracle, Pearl Harbor and modern Japan.",
    tr: "Dünyanın en eski monarşisini (MÖ 660–MS 1947) keşfedin — Jimmu ve samuray Japonya'sından Meiji mucizesine, Pearl Harbor'dan modern Japonya'ya.",
  },
  mapTitle: {
    sv: "Japanska imperiets territorium",
    en: "Japanese Empire Territory",
    tr: "Japon İmparatorluğu Toprakları",
  },
};
