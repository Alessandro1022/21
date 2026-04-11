import egyptBackground from "@/assets/egypt.jpg";
import egyptLogo from "@/assets/kairo.jpg";
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
// TIMELINE — Ancient Egyptian Civilization
// =============================================================================

const egyptTimeline: TimelineEvent[] = [
  {
    year: -3100,
    title: {
      sv: "Egyptens enande — Den första faraon kröns",
      en: "Unification of Egypt — The First Pharaoh is Crowned",
      tr: "Mısır'ın Birleşmesi — İlk Firavun Taçlandırılıyor",
    },
    summary: {
      sv: "Narmer (även känd som Menes) enar Övre och Nedre Egypten under ett enda välde och grundar den 1:a dynastin. Han är den förste som bär den dubbla kronan — Pschent — som symboliserar herraväldet över hela Nilens land. Narmers paletten, en ceremoniell skiffer hittad i Hierakonpolis, skildrar erövrandet med exceptionell konstnärlig och historisk detalj. Denna händelse markerar övergången från forntida stamkulturer till en av historiens mest stabila och varaktiga civilisationer. Huvudstaden Memphis grundas nära Nilens delta, strategiskt placerad för att kontrollera handelsvägar från söder till norr. Med enheten föds också en unik statsapparat: ett hierarkiskt byråkratiskt system med faraon som gudomlig kung i toppen.",
      en: "Narmer (also known as Menes) unites Upper and Lower Egypt under a single dominion and founds the 1st dynasty. He is the first to wear the double crown — the Pschent — symbolizing dominion over all of the land of the Nile. The Narmer Palette, a ceremonial schist found at Hierakonpolis, depicts the conquest with exceptional artistic and historical detail. This event marks the transition from ancient tribal cultures to one of history's most stable and enduring civilizations. The capital Memphis is founded near the Nile Delta, strategically placed to control trade routes from south to north. With unification also comes a unique state apparatus: a hierarchical bureaucratic system with the pharaoh as divine king at its apex.",
      tr: "Narmer (Menes olarak da bilinir), Yukarı ve Aşağı Mısır'ı tek bir egemenlik altında birleştirerek 1. hanedan'ı kurar. Tüm Nil toprakları üzerindeki hâkimiyetin sembolü olan çift taç — Pschent — ilk kez giyilir.",
    },
    figures: ["Narmer", "Menes"],
    consequences: {
      sv: "En av historiens längst varaktiga civilisationer föds — 3 000 år av kontinuitet.",
      en: "One of history's longest-lasting civilizations is born — 3,000 years of continuity.",
      tr: "Tarihin en uzun soluklu uygarlıklarından biri doğuyor — 3.000 yıllık süreklilik.",
    },
    impact: {
      sv: "Nilens gåva blir mänsklighetens vagga för konst, arkitektur, religion och statsstyre.",
      en: "The gift of the Nile becomes humanity's cradle for art, architecture, religion, and statecraft.",
      tr: "Nil'in armağanı, sanat, mimari, din ve devlet yönetimi için insanlığın beşiği olur.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -2686,
    title: {
      sv: "Det Gamla Riket börjar — Pyramidernas tidsålder gryr",
      en: "The Old Kingdom Begins — The Age of Pyramids Dawns",
      tr: "Eski Krallık Başlıyor — Piramitler Çağı Şafağı",
    },
    summary: {
      sv: "Den 3:e dynastin inleder det Gamla Riket — en period av extraordinär kulturell, arkitektonisk och administrativ blomstring. Djoser, den förste kungen av den 3:e dynastin, uppför med sin geniala arkitekt Imhotep det första stenmonumentet i historien: Stegpyramiden i Saqqara. Imhotep är inte bara arkitekt utan en polyhistor — han är läkare, poet, matematiker och statsmannen. Hans verk revolutionerar mänsklig byggnadskonst. Konsten att hugga sten och stapla block till himlen inspireras av djup religiös övertygelse: pyramiderna är inte bara gravar utan kosmiska maskiner som ska hjälpa faraons ba (själ) att stiga upp till solguden Ra. Byråkratin expanderar, kanalsystem anläggs, och Egypten börjar exploatera Sinaihalvöns turkosvärden och Nubiens guldgruvor.",
      en: "The 3rd dynasty initiates the Old Kingdom — a period of extraordinary cultural, architectural, and administrative flourishing. Djoser, the first king of the 3rd dynasty, erects with his brilliant architect Imhotep the first stone monument in history: the Step Pyramid at Saqqara. Imhotep is not just an architect but a polymath — he is a physician, poet, mathematician, and statesman. His work revolutionizes human construction. The art of cutting stone and stacking blocks toward the sky is inspired by deep religious conviction: pyramids are not just tombs but cosmic machines meant to help the pharaoh's ba (soul) ascend to the sun god Ra. The bureaucracy expands, canal systems are laid, and Egypt begins exploiting the Sinai Peninsula's turquoise mines and Nubia's gold mines.",
      tr: "3. hanedan, Eski Krallık'ı başlatır — olağanüstü kültürel, mimari ve idari bir çiçeklenme dönemi. Djoser, parlak mimar İmhotep ile tarihin ilk taş anıtını inşa eder: Saqqara'daki Basamaklı Piramit.",
    },
    figures: ["Djoser", "Imhotep", "Sneferu"],
    consequences: {
      sv: "Stenarkitektur revolutioneras — mänskligheten lär sig bygga för evigheten.",
      en: "Stone architecture is revolutionized — humanity learns to build for eternity.",
      tr: "Taş mimari devrimleşiyor — insanlık ebediyet için inşa etmeyi öğreniyor.",
    },
    impact: {
      sv: "Imhoteps genius inspirerar 4 500 år av arkitektonisk ambition.",
      en: "Imhotep's genius inspires 4,500 years of architectural ambition.",
      tr: "İmhotep'in dehası 4.500 yıllık mimari hırsı besler.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: -2560,
    title: {
      sv: "Khufus stora pyramid — Mänsklighetens mest ambitiösa byggnadsverk",
      en: "Khufu's Great Pyramid — Humanity's Most Ambitious Construction",
      tr: "Keops'un Büyük Piramidi — İnsanlığın En Hırslı İnşaatı",
    },
    summary: {
      sv: "Farao Khufu (Cheops) uppför den Stora Pyramiden i Giza — ett av de sju underverken i antiken och det enda som fortfarande existerar. Med sina ursprungliga 146,5 meter höjd och 2,3 miljoner stenblock, varje vägande mellan 2,5 och 80 ton, förblir det ett ingenjörsmässigt under även efter 4 500 år. Forskning visar att pyramidbyggarna inte var slavar utan organiserade hantverkare med egna läkare, bryggerier och begravningsseder. Papyrusdokument hittade 2013 — de äldsta kända papyrusrullarna — skildrar en officer vid namn Merer som transporterade kalksten till Giza. Det hieroglyfiska och logistiska systems precision — anpassning mot polstjärnan med 0,05 graders noggrannhet — vittnar om ett samhälle med sofistikerade astronomiska och matematiska kunskaper.",
      en: "Pharaoh Khufu (Cheops) erects the Great Pyramid at Giza — one of the Seven Wonders of the Ancient World and the only one still existing. With its original height of 146.5 meters and 2.3 million stone blocks, each weighing between 2.5 and 80 tons, it remains an engineering marvel after 4,500 years. Research shows that pyramid builders were not slaves but organized craftsmen with their own physicians, breweries, and burial customs. Papyrus documents found in 2013 — the oldest known papyrus scrolls — depict an officer named Merer transporting limestone to Giza. The precision of the hieroglyphic and logistical systems — alignment to the pole star with 0.05-degree accuracy — testifies to a society with sophisticated astronomical and mathematical knowledge.",
      tr: "Firavun Keops (Khufu), Giza'daki Büyük Piramidi inşa eder — Antik Dünyanın Yedi Harikasından biri ve hâlâ var olan tek harika. 146,5 metre yüksekliği ve her biri 2,5 ila 80 ton ağırlığında 2,3 milyon taş bloğuyla 4.500 yıl sonra hâlâ mühendislik harikasıdır.",
    },
    figures: ["Khufu", "Hemiunu", "Merer"],
    consequences: {
      sv: "Giza-platån blir världens mest ikoniska arkitektoniska landskap.",
      en: "The Giza plateau becomes the world's most iconic architectural landscape.",
      tr: "Giza platosu dünyanın en ikonik mimari manzarası haline geliyor.",
    },
    impact: {
      sv: "Den Stora Pyramiden förblir mänsklighetens mest imponerande enskilda byggnadsverk.",
      en: "The Great Pyramid remains humanity's most impressive single construction achievement.",
      tr: "Büyük Piramit, insanlığın en etkileyici tek yapı başarısı olmaya devam ediyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: -2530,
    title: {
      sv: "Khafre och Sfinxen — Det gudomliga blickar mot horisonten",
      en: "Khafre and the Sphinx — The Divine Gazes Toward the Horizon",
      tr: "Kefren ve Sfenks — İlahi Olan Ufka Bakıyor",
    },
    summary: {
      sv: "Farao Khafre uppför den näst största pyramiden i Giza och beordrar sannolikt skapandet av den Stora Sfinxen — en kolossal skulptur med ett lejonkropp och ett mänskligt huvud som bär hans drag. Sfinxen mäter 73 meter i längd och 20 meter i höjd och är skuren direkt ur det underliggande berget. Den vaktar Khafrés gravkomplex och representerar kungen som en gudomlig beskyddare, i harmoni med solguden Ra-Horachty. Khafres pyramid har den brantaste lutningsvinkeln och behåller sin ursprungliga polerade kalkstensbeläggning i toppen — en påminnelse om hur blänkande och hisnande dessa monument ursprungligen måste ha sett ut under Egyptens sol. Granitstatyer av Khafre, bland världens mest fulländade skulpturer, vittnar om den konstnärliga nivå egyptierna uppnått.",
      en: "Pharaoh Khafre erects the second largest pyramid at Giza and likely orders the creation of the Great Sphinx — a colossal sculpture with a lion's body and a human head bearing his features. The Sphinx measures 73 meters in length and 20 meters in height and is carved directly from the underlying bedrock. It guards Khafre's mortuary complex and represents the king as a divine protector, in harmony with the sun god Ra-Horachty. Khafre's pyramid has the steepest angle and retains its original polished limestone casing at the top — a reminder of how gleaming and breathtaking these monuments must have originally appeared under Egypt's sun. Granite statues of Khafre, among the world's most perfect sculptures, testify to the artistic level the Egyptians had achieved.",
      tr: "Firavun Kefren, Giza'daki ikinci büyük piramidi inşa eder ve muhtemelen Büyük Sfenks'i sipariş eder — aslan gövdeli ve onun özelliklerini taşıyan insan başlı devasa bir heykel.",
    },
    figures: ["Khafre", "Menkaure"],
    consequences: {
      sv: "Giza-komplexet fullbordas som ett av antikens mest magnifika religiösa monument.",
      en: "The Giza complex is completed as one of antiquity's most magnificent religious monuments.",
      tr: "Giza kompleksi antik çağın en muhteşem dini anıtlarından biri olarak tamamlanıyor.",
    },
    impact: {
      sv: "Sfinxen blir symbolen för mystik och tidlöst visdom i den kollektiva mänskliga fantasin.",
      en: "The Sphinx becomes the symbol of mystery and timeless wisdom in the collective human imagination.",
      tr: "Sfenks, kolektif insan hayal gücünde gizem ve zamansız bilgeliğin sembolü haline geliyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: -2181,
    title: {
      sv: "Det Gamla Rikets fall — Kaos och hunger",
      en: "Fall of the Old Kingdom — Chaos and Famine",
      tr: "Eski Krallığın Çöküşü — Kaos ve Kıtlık",
    },
    summary: {
      sv: "Det Gamla Riket kollapsar under en kombination av klimatförändringar, torka och politisk fragmentering. Nilens flöden minskar dramatiskt, vilket leder till missväxt och hungersnöd. Regionala herrar — nomarcherna — utnyttjar det centrala styrets svaghet och etablerar oberoende furstendömen. Pepi II, som regerade i 94 år (en av historiens längsta regeringstider), efterlämnar ett splittrat och utarmat rike. Den s.k. Första Mellantiden präglas av inbördeskrig, plundring av gravar och kollaps av den komplexa statsstrukturen. Texter från perioden — som Ipuwers klagon — skildrar ett samhälle upp och ner: 'Den som inte hade säng har nu en bädd; den som aldrig åt nu slukar andras mat.' Denna kris är djupt formande för egyptiernas teologiska och filosofiska tänkande.",
      en: "The Old Kingdom collapses under a combination of climate change, drought, and political fragmentation. The Nile's flows decrease dramatically, leading to crop failure and famine. Regional lords — the nomarchs — exploit the central government's weakness and establish independent principalities. Pepi II, who ruled for 94 years (one of history's longest reigns), leaves behind a fragmented and impoverished kingdom. The so-called First Intermediate Period is characterized by civil wars, tomb robbing, and collapse of the complex state structure. Texts from the period — such as the Admonitions of Ipuwer — depict a society turned upside down: 'He who had no bed now has a bedstead; he who never ate now devours another's food.' This crisis profoundly shapes Egyptian theological and philosophical thought.",
      tr: "Eski Krallık, iklim değişikliği, kuraklık ve siyasi parçalanmanın bir arada etkisiyle çöküyor. Nil'in akışları dramatik biçimde azalarak mahsul başarısızlığına ve kıtlığa yol açıyor.",
    },
    figures: ["Pepi II", "Ipuwer"],
    consequences: {
      sv: "Egypten splittras i regionala makter — en 150-årig period av instabilitet börjar.",
      en: "Egypt fragments into regional powers — a 150-year period of instability begins.",
      tr: "Mısır bölgesel güçlere bölünüyor — 150 yıllık bir istikrarsızlık dönemi başlıyor.",
    },
    impact: {
      sv: "Krisen föder ny religiös och filosofisk reflektion om makt, rättvisa och det gudomligas natur.",
      en: "The crisis gives birth to new religious and philosophical reflection on power, justice, and the nature of the divine.",
      tr: "Kriz, güç, adalet ve ilahinin doğası üzerine yeni dini ve felsefi düşüncelere zemin hazırlıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -2055,
    title: {
      sv: "Det Mellersta Riket — Egyptens renässans",
      en: "The Middle Kingdom — Egypt's Renaissance",
      tr: "Orta Krallık — Mısır'ın Rönesansı",
    },
    summary: {
      sv: "Mentuhotep II från Thebe enar Egypten och grundar det Mellersta Riket. Det är en period av kulturell och litterär blomstring som egyptologer betraktar som den egyptiska civilisationens 'klassiska period'. Litteraturen når sin höjdpunkt: Sinuhets berättelse, en av världens äldsta äventyrsberättelser, beskriver en egyptisk ämbetsmans flykt och återkomst med psykologisk rikedom. De poetiska kärlekslyrikerna från perioden är skrivna med en nästan modern känsla. Expeditioner till Nubien, Levanten och Punt (troligen dagens Somalia/Eritrea) expanderar Egyptens ekonomiska räckvidd. Konstens kanon — den stiliserade proportionsfiguren som visar kroppen framifrån och ansiktet från sidan — kodifieras och förblir oförändrande i 2 000 år. En ny teologi uppstår: Osiris-kulten demokratiseras — inte bara faraoner kan uppnå evigt liv, utan alla som lever rättfärdigt.",
      en: "Mentuhotep II from Thebes unites Egypt and founds the Middle Kingdom. It is a period of cultural and literary flourishing that Egyptologists regard as the 'classical period' of Egyptian civilization. Literature reaches its peak: the Tale of Sinuhe, one of the world's oldest adventure stories, describes an Egyptian official's flight and return with psychological richness. The poetic love lyrics of the period are written with an almost modern sensibility. Expeditions to Nubia, the Levant, and Punt (likely modern Somalia/Eritrea) expand Egypt's economic reach. The canon of art — the stylized proportional figure showing the body from the front and the face from the side — is codified and remains unchanged for 2,000 years. A new theology emerges: the Osiris cult is democratized — not only pharaohs can achieve eternal life, but anyone who lives righteously.",
      tr: "Thebli Mentuhotep II, Mısır'ı birleştirir ve Orta Krallık'ı kurar. Mısırbilimcilerin Mısır uygarlığının 'klasik dönemi' olarak nitelendirdiği kültürel ve edebi bir çiçeklenme dönemi başlar.",
    },
    figures: ["Mentuhotep II", "Amenemhat I", "Senusret III", "Amenemhat III"],
    consequences: {
      sv: "Egypten återfödds starkare — konst, litteratur och teologi når nya höjder.",
      en: "Egypt is reborn stronger — art, literature, and theology reach new heights.",
      tr: "Mısır daha güçlü yeniden doğuyor — sanat, edebiyat ve teoloji yeni zirvelere ulaşıyor.",
    },
    impact: {
      sv: "Mellersta Rikets kulturella arv präglar egyptisk identitet i tusentals år framöver.",
      en: "The Middle Kingdom's cultural heritage shapes Egyptian identity for thousands of years.",
      tr: "Orta Krallık'ın kültürel mirası, Mısır kimliğini binlerce yıl boyunca şekillendirir.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: -1650,
    title: {
      sv: "Hyksos-invasionen — Asiatiska erövrare tar makten",
      en: "The Hyksos Invasion — Asiatic Conquerors Seize Power",
      tr: "Hiksosların İstilası — Asyalı Fatihler İktidara El Koyuyor",
    },
    summary: {
      sv: "Hyksos — ett folk av semitiskt ursprung från Levanten — utnyttjar Egyptens svaghet under den Andra Mellantiden och etablerar kontroll över norra Egypten med Avaris som sin huvudstad. Det är en traumatisk händelse för egyptierna, som betraktar sig själva som den gudomliga civilisationens centrum. Hyksos för med sig revolutionerande militärteknologi: hästar och stridsvagnar, kompositbågar, bronsvapen. Ironiskt nog är det den teknologi de för med sig som kommer att möjliggöra Egyptens senare militära dominans. Hyksos var inte barbariska förstörare — de adopterade egyptisk kultur, religion och hieroglyfer — men deras närvaro utlöser ett djupt nationalistiskt uppvaknande i Thebe. Farao Seqenenre Tao dör i strid mot hyksos med djupa yxhuggar i huvudet — hans mumie vittnar om frontlinjestrider.",
      en: "The Hyksos — a people of Semitic origin from the Levant — exploit Egypt's weakness during the Second Intermediate Period and establish control over northern Egypt with Avaris as their capital. It is a traumatic event for the Egyptians, who regard themselves as the center of divine civilization. The Hyksos bring revolutionary military technology: horses and chariots, composite bows, bronze weapons. Ironically, the technology they bring will enable Egypt's later military dominance. The Hyksos were not barbaric destroyers — they adopted Egyptian culture, religion, and hieroglyphs — but their presence triggers a deep nationalist awakening in Thebes. Pharaoh Seqenenre Tao dies in battle against the Hyksos with deep axe wounds in his head — his mummy testifies to frontline combat.",
      tr: "Hiksos'lar — Levant'tan Sami kökenli bir halk — Mısır'ın İkinci Ara Dönem'deki zayıflığını fırsat bilerek başkenti Avaris olan kuzey Mısır üzerinde kontrol kurar.",
    },
    figures: ["Seqenenre Tao", "Kamose", "Ahmose I"],
    consequences: {
      sv: "Egypten traumatiseras men lär sig av inkräktarna — en militär revolution föds.",
      en: "Egypt is traumatized but learns from the invaders — a military revolution is born.",
      tr: "Mısır travma yaşar ama işgalcilerden öğrenir — askeri bir devrim doğar.",
    },
    impact: {
      sv: "Hyksos-erfarenheten förvandlar Egypten från en fredlig civilisation till en militär stormakt.",
      en: "The Hyksos experience transforms Egypt from a peaceful civilization into a military superpower.",
      tr: "Hiksos deneyimi Mısır'ı barışçıl bir uygarlıktan askeri bir süper güce dönüştürür.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: -1550,
    title: {
      sv: "Det Nya Riket börjar — Imperiumets guldålder",
      en: "The New Kingdom Begins — The Golden Age of Empire",
      tr: "Yeni Krallık Başlıyor — İmparatorluğun Altın Çağı",
    },
    summary: {
      sv: "Ahmose I fördrivet hyksos och grundar det Nya Riket och den 18:e dynastin — Egyptens mest lysande period. Han befriar inte bara Egypten från utländsk dominans utan skapar grunden för ett expansionistiskt imperium. Det Nya Rikets faraoner — Thutmosis III, Hatshepsut, Amenhotep III, Akhenaten, Tutankhamun, Ramesses II — är de mest kända namnen i egyptisk historia. Tempel av enorm storhet uppförs: Karnak-komplexet expanderas under generation efter generation och blir det största religiösa byggnadskomplexet i världen. Den professionella armén med stridsvagnar moderniseras. Internationell diplomati blomstrar — brev på lertavlor från Amarna-arkivet visar kontakter med Babylonien, Mitanni, Assyrien och Hethiterna. Egypten är nu en världsmakt i ordets fullaste mening.",
      en: "Ahmose I expels the Hyksos and founds the New Kingdom and the 18th dynasty — Egypt's most brilliant period. He not only liberates Egypt from foreign domination but creates the foundation for an expansionist empire. The New Kingdom's pharaohs — Thutmose III, Hatshepsut, Amenhotep III, Akhenaten, Tutankhamun, Ramesses II — are the most famous names in Egyptian history. Temples of enormous grandeur are erected: the Karnak complex is expanded generation after generation and becomes the largest religious building complex in the world. The professional army with chariots is modernized. International diplomacy flourishes — letters on clay tablets from the Amarna archive show contacts with Babylon, Mitanni, Assyria, and the Hittites. Egypt is now a world power in the fullest sense.",
      tr: "Ahmose I, Hiksos'ları kovar ve Yeni Krallık ile 18. hanedanı kurar — Mısır'ın en parlak dönemi. Dünyanın en büyük dini yapı kompleksi haline gelen Karnak kompleksi nesil nesil genişletilir.",
    },
    figures: ["Ahmose I", "Thutmose I", "Hatshepsut", "Thutmose III"],
    consequences: {
      sv: "Egypten förvandlas från regional makt till ett expansivt imperium som sträcker sig från Nubien till Syrien.",
      en: "Egypt transforms from regional power to an expansive empire stretching from Nubia to Syria.",
      tr: "Mısır, Nubya'dan Suriye'ye uzanan geniş bir imparatorluğa dönüşüyor.",
    },
    impact: {
      sv: "Det Nya Rikets arv — Karnak, Luxortemplet, Abu Simbel — är de monument som idag definierar forntida Egypten.",
      en: "The New Kingdom's legacy — Karnak, Luxor Temple, Abu Simbel — are the monuments that today define ancient Egypt.",
      tr: "Yeni Krallık'ın mirası — Karnak, Luxor Tapınağı, Abu Simbel — bugün antik Mısır'ı tanımlayan anıtlardır.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -1479,
    title: {
      sv: "Hatshepsut — Faraon som var kvinna",
      en: "Hatshepsut — The Pharaoh Who Was a Woman",
      tr: "Hatşepsut — Firavun Olan Kadın",
    },
    summary: {
      sv: "Hatshepsut, änka till Thutmosis II, tar makten som regent för den unge Thutmosis III och kröner sig till fullständig farao — en av historiens mest extraordinära politiska handlingar. Hon regerar i mer än 20 år och är en av Egyptens mest framgångsrika monarker. Hennes handelssexpeditioner till Punt — skildrade i detaljerade reliefer på hennes mortuarietempel i Deir el-Bahari — hemtar exotiska varor: myrra, ebenholz, elefantben, guld och levande myrraträd. Hon beordrar uppförandet av 200 byggnader, inklusive det magnifika mortuarietemplet. Hon framställs i konst med falsk skägg — det traditionella kungliga attributet — men källorna visar att hon ofta beskrivs och representeras som kvinna. Hennes namn och bilder raderas systematiskt av Thutmosis III och hans son Amenhotep II efter hennes död — ett kolossalt försök att utplåna hennes minne.",
      en: "Hatshepsut, widow of Thutmose II, seizes power as regent for the young Thutmose III and crowns herself as full pharaoh — one of history's most extraordinary political acts. She rules for more than 20 years and is one of Egypt's most successful monarchs. Her trading expeditions to Punt — depicted in detailed reliefs on her mortuary temple at Deir el-Bahari — bring back exotic goods: myrrh, ebony, ivory, gold, and living myrrh trees. She orders the construction of 200 buildings, including the magnificent mortuary temple. She is depicted in art with a false beard — the traditional royal attribute — but sources show she was often described and represented as a woman. Her name and images are systematically erased by Thutmose III and his son Amenhotep II after her death — a colossal attempt to obliterate her memory.",
      tr: "II. Thutmose'nin dul eşi Hatşepsut, genç III. Thutmose için naip olarak iktidara el koyar ve kendini tam firavun ilan eder — tarihin en olağanüstü siyasi eylemlerinden biri.",
    },
    figures: ["Hatshepsut", "Thutmose III", "Senenmut"],
    consequences: {
      sv: "Egypten blomstrar under en kvinnlig faraons styre — handel, arkitektur och fred dominerar.",
      en: "Egypt flourishes under a female pharaoh's rule — trade, architecture, and peace dominate.",
      tr: "Mısır, bir kadın firavunun yönetimi altında çiçekleniyor — ticaret, mimari ve barış öne çıkıyor.",
    },
    impact: {
      sv: "Hatshepsut visar att en kvinna kan vara en av historiens mest effektiva härskare — hennes tempel är ett av världens vackraste.",
      en: "Hatshepsut demonstrates that a woman can be one of history's most effective rulers — her temple is one of the world's most beautiful.",
      tr: "Hatşepsut, bir kadının tarihin en etkili hükümdarlarından biri olabileceğini kanıtlıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -1457,
    title: {
      sv: "Thutmosis III — Egyptens Napoleon",
      en: "Thutmose III — Egypt's Napoleon",
      tr: "III. Thutmose — Mısır'ın Napolyonu",
    },
    summary: {
      sv: "Thutmosis III, often kallad 'Egyptens Napoleon', leder 17 militära kampanjer under sina 54 regeringsår och skapar det egyptiska imperiets maximala expansion. Slaget vid Megiddo (ca 1457 f.Kr.) är det första slag i historien som dokumenterats i detalj — hans annaler på Karnaks tempelmurar beskriver taktik, truppstyrkor och resultat med häpnadsväckande precision. Han väljer den djärva vägen genom Aruna-passet mot rådgivarnas vilja och lyckas omringa den kanaaneiska koalitionen. Han expanderar riket norrut till Eufrat och söderut djupt in i Nubien. Han är inte bara en militär strateg utan också en konstnär, botaniker och naturvetare — hans tempel i Karnak innehåller unika botaniska och zoologiska register från hans kampanjer. Hans grav i Konungarnas dal innehåller en av de mest vackert illustrerade religiösa texterna — Amduat.",
      en: "Thutmose III, often called 'Egypt's Napoleon', leads 17 military campaigns during his 54-year reign and creates the Egyptian Empire's maximum expansion. The Battle of Megiddo (c. 1457 BC) is the first battle in history to be documented in detail — his annals on Karnak's temple walls describe tactics, troop strengths, and results with astonishing precision. He chooses the bold route through the Aruna Pass against his advisors' wishes and manages to encircle the Canaanite coalition. He expands the empire north to the Euphrates and south deep into Nubia. He is not just a military strategist but also an artist, botanist, and natural scientist — his temple at Karnak contains unique botanical and zoological records from his campaigns. His tomb in the Valley of the Kings contains one of the most beautifully illustrated religious texts — the Amduat.",
      tr: "Sık sık 'Mısır'ın Napolyonu' olarak adlandırılan III. Thutmose, 54 yıllık saltanatı boyunca 17 askeri sefer yürütür ve Mısır İmparatorluğu'nun maksimum genişlemesini sağlar.",
    },
    figures: ["Thutmose III", "Amenhotep II"],
    consequences: {
      sv: "Egyptens imperium når sin maximala utbredning — från Sudan till norra Syrien.",
      en: "Egypt's empire reaches its maximum extent — from Sudan to northern Syria.",
      tr: "Mısır İmparatorluğu maksimum genişliğine ulaşıyor — Sudan'dan kuzey Suriye'ye.",
    },
    impact: {
      sv: "Megiddo-slaget introducerar strategisk militär dokumentation — ett skifte i hur krig förs och analyseras.",
      en: "The Battle of Megiddo introduces strategic military documentation — a shift in how wars are fought and analyzed.",
      tr: "Megiddo Muharebesi, stratejik askeri belgelemeyi tanıtır — savaşların nasıl yürütüldüğünü ve analiz edildiğini dönüştürür.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: -1352,
    title: {
      sv: "Akhenaten — Faraonen som uppfann monoteismen",
      en: "Akhenaten — The Pharaoh Who Invented Monotheism",
      tr: "Akhenaten — Tektanrıcılığı İcat Eden Firavun",
    },
    summary: {
      sv: "Amenhotep IV ändrar sitt namn till Akhenaten ('Han som tjänar Aten') och genomför en religiös revolution utan motstycke i antiken: han avskaffar Egyptens månggudatro och ersätter den med dyrkan av en enda gud — Aten, solskivan. Han stänger Amuns och alla andra gudars tempel, konfiskerar deras rikedomar, och beordrar gudarnas namn att utplånas ur monument. Han grundar en helt ny huvudstad, Akhetaten (idag Tell el-Amarna), och beordrar en ny konstnärlig stil som skildrar hans familj i ovanlig intimitet och naturalism — ett radikalt brott mot 1 500 års konstnärliga kanon. Nefertiti, hans älskade hustru, verkar ha haft enorm politisk makt. Akhenatens revolution kollapsar vid hans död — hans son Tutankhamun (ursprungligen Tutankhaten) återupprättar de gamla gudarna och dömer ut Akhenatens religiösa experiment.",
      en: "Amenhotep IV changes his name to Akhenaten ('He who serves Aten') and carries out a religious revolution without precedent in antiquity: he abolishes Egypt's polytheism and replaces it with worship of a single god — Aten, the sun disk. He closes the temples of Amun and all other gods, confiscates their wealth, and orders the gods' names to be erased from monuments. He founds an entirely new capital, Akhetaten (today Tell el-Amarna), and orders a new artistic style depicting his family with unusual intimacy and naturalism — a radical break from 1,500 years of artistic canon. Nefertiti, his beloved wife, appears to have held enormous political power. Akhenaten's revolution collapses at his death — his son Tutankhamun (originally Tutankhaten) restores the old gods and condemns Akhenaten's religious experiment.",
      tr: "Amenhotep IV, adını Akhenaten olarak değiştirir ve antik çağda eşi görülmemiş bir dini devrim gerçekleştirir: Mısır'ın çok tanrıcılığını kaldırarak yerini tek bir tanrıya — güneş diski Aten'e — bırakır.",
    },
    figures: ["Akhenaten", "Nefertiti", "Tutankhamun", "Ay"],
    consequences: {
      sv: "Egyptens religiösa revolution misslyckas — de gamla gudarna återupprättas.",
      en: "Egypt's religious revolution fails — the old gods are restored.",
      tr: "Mısır'ın dini devrimi başarısız olur — eski tanrılar yeniden kurulur.",
    },
    impact: {
      sv: "Akhenatens monoteism kan ha influerat israelitisk och abrahamitisk religion — en av historiens mest omdebatterade teser.",
      en: "Akhenaten's monotheism may have influenced Israelite and Abrahamic religion — one of history's most debated theses.",
      tr: "Akhenaten'in tektanrıcılığı İsrailce ve Abrahamik dini etkilemiş olabilir — tarihin en tartışmalı tezlerinden biri.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: -1332,
    title: {
      sv: "Tutankhamun — Den gyllene pojkfaraon",
      en: "Tutankhamun — The Golden Boy Pharaoh",
      tr: "Tutankhamun — Altın Çocuk Firavun",
    },
    summary: {
      sv: "Tutankhamun bestiger tronen vid ca 9 års ålder och regerar i bara 10 år innan han dör vid ca 19 år. Under sin korta regeringstid — troligen dominerad av rådgivarna Ay och Horemheb — återupprättar han Amun-kulten och lämnar Akhenatens stad Akhetaten. Hans historiska betydelse är paradoxal: under sin livstid var han en relativt obetydlig farao; hans odödlighet skapades av Howard Carters arkeologiska fynd 1922 — hans orörda grav i Konungarnas dal, fylld med 5 000 föremål av osurpassabel skönhet och konsthantverk. Den gyllene dödmasken, den innersta guldkistan, tronens ryggstöd med Tutankhamun och Ankhesenamun i intim närkontakt — dessa föremål är bland de vackraste artefakter mänskligheten skapat. DNA-analys visar att han var resultatet av incestuöst äktenskap och led av multipla sjukdomar.",
      en: "Tutankhamun ascends the throne at approximately 9 years of age and rules for only 10 years before dying at approximately 19. During his short reign — likely dominated by his advisors Ay and Horemheb — he restores the Amun cult and abandons Akhenaten's city of Akhetaten. His historical significance is paradoxical: during his lifetime he was a relatively insignificant pharaoh; his immortality was created by Howard Carter's archaeological discovery in 1922 — his untouched tomb in the Valley of the Kings, filled with 5,000 objects of unsurpassable beauty and craftsmanship. The golden death mask, the innermost gold coffin, the throne's backrest showing Tutankhamun and Ankhesenamun in intimate closeness — these objects are among the most beautiful artifacts humanity has created. DNA analysis shows he was the result of incestuous marriage and suffered from multiple diseases.",
      tr: "Tutankhamun, yaklaşık 9 yaşında tahta çıkar ve yaklaşık 19 yaşında ölmeden önce yalnızca 10 yıl hüküm sürer. Tarihi önemi paradoksal bir nitelik taşır.",
    },
    figures: ["Tutankhamun", "Ankhesenamun", "Ay", "Horemheb", "Howard Carter"],
    consequences: {
      sv: "Akhenatens religiösa revolution utplånas officiellt — normaliteten återupprättas.",
      en: "Akhenaten's religious revolution is officially obliterated — normalcy is restored.",
      tr: "Akhenaten'in dini devrimi resmi olarak siliniyor — normallik yeniden sağlanıyor.",
    },
    impact: {
      sv: "Tutankhamuns gravfynd 1922 väcker världens fascination för forntida Egypten och skapar modern egyptologi.",
      en: "The discovery of Tutankhamun's tomb in 1922 awakens the world's fascination with ancient Egypt and creates modern Egyptology.",
      tr: "1922'de Tutankhamun'un mezarının keşfi, dünyanın antik Mısır'a olan ilgisini uyandırır ve modern Mısırbilimi yaratır.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: -1279,
    title: {
      sv: "Ramesses den store — Egyptens evige farao",
      en: "Ramesses the Great — Egypt's Eternal Pharaoh",
      tr: "Büyük Ramses — Mısır'ın Ebedi Firavunu",
    },
    summary: {
      sv: "Ramesses II bestiger tronen vid 25 års ålder och regerar i 66 år — en av antikens längsta regeringstider. Han är den mest dokumenterade faraonen i historien och betraktas av många egyptologer som det Nya Rikets höjdpunkt. Hans militära kampanjer är episka: han leder personligen ett anfall vid Kadeshslaget (ca 1274 f.Kr.) mot den hettitiske kungen Muwatalli II — troligen historiens första stora batalj mellan supermakter. Händelseförloppet propaganderas på tempelväggar i hela Egypten som en heroisk seger; i verkligheten slutar det i oavgjort. Hans fredsavtal med hethiterna — det äldsta bevarade fredsavtalet i världen — visar diplomatisk mognad. Han uppför Abu Simbels massiva klippempel med fyra 20-meter höga kolossstatyer av sig själv vid nilen nubiska del. Hans mumie — återfunnen 1881 — visar tydliga spår av artrit, tandproblem och rödaktigt hår.",
      en: "Ramesses II ascends the throne at age 25 and rules for 66 years — one of antiquity's longest reigns. He is the most documented pharaoh in history and is considered by many Egyptologists as the peak of the New Kingdom. His military campaigns are epic: he personally leads a charge at the Battle of Kadesh (c. 1274 BC) against the Hittite king Muwatalli II — likely history's first great battle between superpowers. The course of events is propagandized on temple walls across Egypt as a heroic victory; in reality it ends in a draw. His peace treaty with the Hittites — the oldest surviving peace treaty in the world — shows diplomatic maturity. He erects Abu Simbel's massive rock temple with four 20-meter-high colossal statues of himself on the Nubian Nile. His mummy — rediscovered in 1881 — shows clear signs of arthritis, dental problems, and reddish hair.",
      tr: "Ramses II, 25 yaşında tahta çıkar ve 66 yıl hüküm sürer — antik çağın en uzun saltanatlarından biri. Tarihin en belgelenmiş firavunudur ve birçok Mısırbilimci tarafından Yeni Krallık'ın zirvesi olarak kabul edilir.",
    },
    figures: ["Ramesses II", "Nefertari", "Muwatalli II", "Khaemwaset"],
    consequences: {
      sv: "Kadesh-fredsavtalet skapar ett av antikens mest stabila diplomatiska arrangemang.",
      en: "The Kadesh peace treaty creates one of antiquity's most stable diplomatic arrangements.",
      tr: "Kadeş barış antlaşması, antik çağın en istikrarlı diplomatik düzenlemelerinden birini yaratır.",
    },
    impact: {
      sv: "Ramesses II:s monument — Abu Simbel, Ramesseum, Pi-Ramesses — definierar den egyptiska imperieestetiken.",
      en: "Ramesses II's monuments — Abu Simbel, the Ramesseum, Pi-Ramesses — define the Egyptian imperial aesthetic.",
      tr: "Ramses II'nin anıtları — Abu Simbel, Ramesseum, Pi-Ramesses — Mısır imparatorluk estetiğini tanımlar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -1274,
    title: {
      sv: "Slaget vid Kades — Världens första dokumenterade slag mellan supermakter",
      en: "Battle of Kadesh — World's First Documented Battle Between Superpowers",
      tr: "Kadeş Muharebesi — Süper Güçler Arasındaki Dünyada Belgelenen İlk Savaş",
    },
    summary: {
      sv: "Ramesses II leder sin armé norrut mot den hettitiske kungen Muwatalli II i ett slag vid floden Orontes i nuvarande Syrien. Egyptisk propaganda framstår Ramesses som en ensam hjälte som vänder ett bakfall till seger. Modern analys visar att Ramesses faktiskt gick i en fälla: hethitiska spioner vilseledde honom om fiendens position. En hethitisk striidsvagnsrörelse klyver hans armé och nästan fångar honom. Hans personliga mod och hans livgards ingripande (Nearen) räddar situationen. Ingen av sidorna uppnår ett avgörande resultat. Men propagandavärdets enorma: i Egypten pryds tempelmurar från Thebe till Abu Simbel med scener av Ramesses ridandes ensam mot tusentals fiender. Fredsavtalet som följer 16 år senare — det Kadesh-fördraget — är det äldsta kända internationella fredsavtalet och finns idag i FN:s högkvarter.",
      en: "Ramesses II leads his army northward against the Hittite king Muwatalli II in a battle at the Orontes River in present-day Syria. Egyptian propaganda portrays Ramesses as a lone hero turning an ambush into victory. Modern analysis shows that Ramesses actually fell into a trap: Hittite spies misled him about the enemy's position. A Hittite chariot assault splits his army and nearly captures him. His personal courage and the intervention of his guard (the Nearen) saves the situation. Neither side achieves a decisive result. But the propaganda value is enormous: in Egypt, temple walls from Thebes to Abu Simbel are adorned with scenes of Ramesses riding alone against thousands of enemies. The peace treaty that follows 16 years later — the Treaty of Kadesh — is the oldest known international peace treaty and is displayed today in the UN headquarters.",
      tr: "Ramses II, ordusunu bugünkü Suriye'deki Orontes Nehri'ndeki bir savaşta Hitit Kralı II. Muwatalli'ye karşı kuzeye yönlendirir.",
    },
    figures: ["Ramesses II", "Muwatalli II"],
    consequences: {
      sv: "Ingen sida vinner — men Egyptens propagandamaskin förvandlar oavgjort till legendseger.",
      en: "Neither side wins — but Egypt's propaganda machine transforms a draw into legendary victory.",
      tr: "Hiçbir taraf kazanmıyor — ama Mısır'ın propaganda makinesi beraberliği efsanevi zafere dönüştürüyor.",
    },
    impact: {
      sv: "Kadesh-fördraget är världens äldsta bevarade fredsavtal — ett monument för diplomati.",
      en: "The Treaty of Kadesh is the world's oldest surviving peace treaty — a monument to diplomacy.",
      tr: "Kadeş Antlaşması, dünyada varlığını koruyan en eski barış antlaşmasıdır — diplomasinin anıtı.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: -1069,
    title: {
      sv: "Det Nya Rikets fall — Egyptens sista storhetstid ebbar ut",
      en: "Fall of the New Kingdom — Egypt's Last Era of Greatness Ebbs Away",
      tr: "Yeni Krallığın Çöküşü — Mısır'ın Son Büyüklük Dönemi Sona Eriyor",
    },
    summary: {
      sv: "Det Nya Riket kollapsar under trycket av invandring av sjöfolken (Sea Peoples) — mystiska invasionsstyrkor som terroriserar hela det östra Medelhavsområdet och förstör Mykene, Hethiterriket och Ugarit. Ramesses III slår tillbaka sjöfolken i två stora slag (ca 1175 f.Kr.) men vid ett högt pris. Egyptens ekonomi utarmas. Korruptionsskandaler i hoven. Konungagravarna i Konungarnas dal plundras. Präster av Amun i Thebe börjar konkurrera med faraonerna om makten. Den Tredje Mellantiden präglas av delade dynastier och utländska härskare — libyer, nubier (25:e dynastin), och till sist assyrier. Det är slutet på Egyptens imperial status — men inte på dess civilisation.",
      en: "The New Kingdom collapses under the pressure of migrations of the Sea Peoples — mysterious invasion forces that terrorize the entire eastern Mediterranean and destroy Mycenae, the Hittite Empire, and Ugarit. Ramesses III repels the Sea Peoples in two major battles (c. 1175 BC) but at a high cost. Egypt's economy is drained. Corruption scandals at court. The royal tombs in the Valley of the Kings are plundered. Amun's priests in Thebes begin competing with the pharaohs for power. The Third Intermediate Period is characterized by divided dynasties and foreign rulers — Libyans, Nubians (25th dynasty), and finally Assyrians. It is the end of Egypt's imperial status — but not of its civilization.",
      tr: "Yeni Krallık, tüm doğu Akdeniz'i terörize eden ve Miken, Hitit İmparatorluğu ile Ugarit'i yok eden gizemli işgal güçleri olan Deniz Kavimleri'nin göçlerinin baskısı altında çöker.",
    },
    figures: ["Ramesses III", "Herihor"],
    consequences: {
      sv: "Egypten fragmenteras och faller under utländskt styre för första gången sedan hyksostiden.",
      en: "Egypt fragments and falls under foreign rule for the first time since the Hyksos period.",
      tr: "Mısır, Hiksos döneminden bu yana ilk kez parçalanıp yabancı yönetime düşüyor.",
    },
    impact: {
      sv: "Den bronsålderskollaps som drabbar hela Medelhavsvärlden förändrar civilisationens historia.",
      en: "The Bronze Age collapse that strikes the entire Mediterranean world changes the history of civilization.",
      tr: "Tüm Akdeniz dünyasını etkileyen Bronz Çağı çöküşü, uygarlığın tarihini değiştiriyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: -747,
    title: {
      sv: "Nubiska faraoner — Afrika tar tillbaka Egypten",
      en: "Nubian Pharaohs — Africa Reclaims Egypt",
      tr: "Nubian Firavunlar — Afrika Mısır'ı Geri Alıyor",
    },
    summary: {
      sv: "Farao Piye från Nubias rike Kush marscherar norrut och erövrar Egypten, grundar den 25:e dynastin. Ironiskt nog är det nubier — länge under egyptisk dominans — som nu räddar och 'rengör' en korrumperad egyptisk civilisation. De nubiska faraonerna är djupt respektfulla för egyptisk tradition: de bygger pyramider (faktiskt fler pyramider än egyptierna någonsin byggde), stöder konstens och religionens renässans, och kämpar aktivt mot det assyriska hotet. Taharqa, den mäktigaste av de nubiska faraonerna, nämns i Bibeln (2 Kungaboken 19:9) som en konung från Etiopien. Han förstärker Karnak-templet och beordrar en av forntidens mest extraordinära byggnadsprojekt. Denna period visar en av historiens mest extraordinära kulturella reversioner: de erövrade tar på sig den förre härskarens kulturella mantel och konserverar den.",
      en: "Pharaoh Piye from the Nubian kingdom of Kush marches north and conquers Egypt, founding the 25th dynasty. Ironically, it is the Nubians — long under Egyptian dominance — who now rescue and 'cleanse' a corrupted Egyptian civilization. The Nubian pharaohs are deeply respectful of Egyptian tradition: they build pyramids (in fact more pyramids than the Egyptians ever built), support a renaissance of art and religion, and fight actively against the Assyrian threat. Taharqa, the most powerful of the Nubian pharaohs, is mentioned in the Bible (2 Kings 19:9) as a king from Ethiopia. He reinforces the Karnak temple and orders one of antiquity's most extraordinary building projects. This period demonstrates one of history's most extraordinary cultural reversions: the conquered take on the former ruler's cultural mantle and preserve it.",
      tr: "Nubia'nın Kuş krallığından Firavun Piye, kuzeye doğru yürüyerek Mısır'ı fetheder ve 25. hanedanı kurar.",
    },
    figures: ["Piye", "Taharqa", "Shabaka"],
    consequences: {
      sv: "Egypten räddas kulturellt av sina tidigare vasaller — ett av historiens mest ironiska vändningar.",
      en: "Egypt is culturally saved by its former vassals — one of history's most ironic reversals.",
      tr: "Mısır, eski vasalları tarafından kültürel olarak kurtarılıyor — tarihin en ironik dönüşlerinden biri.",
    },
    impact: {
      sv: "Den nubiska 25:e dynastin bygger fler pyramider än alla egyptiska dynastier kombinerat.",
      en: "The Nubian 25th dynasty builds more pyramids than all Egyptian dynasties combined.",
      tr: "Nubian 25. hanedan, tüm Mısır hanedanlarının toplamından daha fazla piramit inşa eder.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -525,
    title: {
      sv: "Persisk erövring — Kambyses II tar Egypten",
      en: "Persian Conquest — Cambyses II Takes Egypt",
      tr: "Pers Fethi — II. Kambyses Mısır'ı Alıyor",
    },
    summary: {
      sv: "Den akemenidiske kungen Kambyses II besegrar den egyptiske faraon Psamtik III vid Pelusium och inkorporerar Egypten i det persiska imperiet som den 1:a persiska perioden (27:e dynastin) börjar. Den egyptiska civilisationen överlever i en ny form under persisk suzeränitet. Egyptierna accepterar i viss mån persisk styre, som anpassar sig till egyptisk religiös praxis. Men perioden präglas av motstånd och periodiska uppror. Egypten återvinner tillfälligt sin oberoende under den 28:e–30:e dynastin (404–343 f.Kr.) — den sista fasen av inhemsk egyptisk styre. Den siste inhemske egyptiske faraon, Nectanebo II, flyr inför en persisk invasion 343 f.Kr. — slutet på 3 000 år av faraonisk kontinuitet.",
      en: "The Achaemenid king Cambyses II defeats the Egyptian pharaoh Psamtik III at Pelusium and incorporates Egypt into the Persian Empire as the 1st Persian Period (27th dynasty) begins. Egyptian civilization survives in a new form under Persian suzerainty. The Egyptians accept Persian rule to some extent, as it adapts to Egyptian religious practices. But the period is marked by resistance and periodic uprisings. Egypt temporarily regains independence during the 28th–30th dynasties (404–343 BC) — the last phase of native Egyptian rule. The last native Egyptian pharaoh, Nectanebo II, flees before a Persian invasion in 343 BC — the end of 3,000 years of pharaonic continuity.",
      tr: "Ahameniş Kralı II. Kambyses, Mısır Firavunu III. Psamtik'i Pelusium'da yenerek Mısır'ı Pers İmparatorluğu'na katar.",
    },
    figures: ["Cambyses II", "Psamtik III", "Nectanebo II"],
    consequences: {
      sv: "Egypten förlorar sin oberoende för första gången — men civilisationen fortsätter.",
      en: "Egypt loses its independence for the first time — but the civilization continues.",
      tr: "Mısır ilk kez bağımsızlığını kaybediyor — ancak uygarlık devam ediyor.",
    },
    impact: {
      sv: "3 000 år av faraonisk kontinuitet avslutas — men egyptisk kultur överlever under nya herrar.",
      en: "3,000 years of pharaonic continuity ends — but Egyptian culture survives under new masters.",
      tr: "3.000 yıllık firavunsal süreklilik sona eriyor — ancak Mısır kültürü yeni efendiler altında varlığını sürdürüyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: -332,
    title: {
      sv: "Alexander den stores ankomst — Egypten välkomnar sin befriare",
      en: "Alexander the Great Arrives — Egypt Welcomes Its Liberator",
      tr: "Büyük İskender Geliyor — Mısır Kurtarıcısını Karşılıyor",
    },
    summary: {
      sv: "Alexander den store marscherar in i Egypten och hälsas välkommen som en befriare från det hatade persiska styret. Han offrar till egyptiska gudar och besöker Amuns orakel i Siwa-oasen, där han förklaras vara gudens son — ett anspråk som legitimerar hans herravälde i egyptiska ögon. Han grundar Alexandria vid Nilens delta, en stad som han planerar som en kosmopolitisk hamn som förenar Medelhavshandeln. Alexandria blir under de efterföljande ptolemaiska dynastierna en av antikens mest lysande kulturella och intellektuella centra: Biblioteket i Alexandria, Museion, Farosen vid Pharos. Med Alexanders ankomst börjar Egyptens hellenistiska period — en djup fusioner av egyptisk och grekisk civilisation.",
      en: "Alexander the Great marches into Egypt and is welcomed as a liberator from the hated Persian rule. He sacrifices to Egyptian gods and visits the oracle of Amun at the Siwa Oasis, where he is declared the son of the god — a claim that legitimizes his dominion in Egyptian eyes. He founds Alexandria at the Nile Delta, a city he plans as a cosmopolitan port connecting Mediterranean trade. Alexandria becomes under the subsequent Ptolemaic dynasties one of antiquity's most brilliant cultural and intellectual centers: the Library of Alexandria, the Mouseion, the Lighthouse at Pharos. With Alexander's arrival begins Egypt's Hellenistic period — a profound fusion of Egyptian and Greek civilization.",
      tr: "Büyük İskender, Mısır'a yürür ve nefret edilen Pers yönetiminden kurtarıcı olarak karşılanır. Amun'un oraklına danışır ve tanrının oğlu ilan edilir.",
    },
    figures: ["Alexander the Great", "Ptolemy I"],
    consequences: {
      sv: "Egypten helleniseras — en djup kulturell syntes av egyptisk och grekisk civilisation börjar.",
      en: "Egypt is Hellenized — a profound cultural synthesis of Egyptian and Greek civilization begins.",
      tr: "Mısır Helenleşiyor — Mısır ve Yunan uygarlığının derin bir kültürel sentezi başlıyor.",
    },
    impact: {
      sv: "Alexandria blir antikens intellektuella huvudstad — hem för Euklides, Arkimedes och Eratosthenes.",
      en: "Alexandria becomes antiquity's intellectual capital — home to Euclid, Archimedes, and Eratosthenes.",
      tr: "İskenderiye, antik çağın entelektüel başkenti haline geliyor — Euklides, Arşimet ve Eratostenes'in yurdu.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -51,
    title: {
      sv: "Kleopatra VII — Egyptens siste farao",
      en: "Cleopatra VII — Egypt's Last Pharaoh",
      tr: "VII. Kleopatra — Mısır'ın Son Firavunu",
    },
    summary: {
      sv: "Kleopatra VII bestiger tronen vid 18 års ålder och är den siste aktiva monarken av det ptolemaiska kungahuset. Hennes legend är djupare och mer komplex än populärkulturen antyder. Hon var den första ptolemaiska monarken som faktiskt lärde sig egyptiska — hon talade sammanlagt nio språk. Hon presenterade sig för sina egyptiska undersåtar som gudinnans Isis inkarnation och för sina hellenistiska undersåtar som drottning och filosof. Hennes allianser med Julius Caesar och Marcus Antonius var inte bara romantiska utan strategiska försök att använda romersk militärmakt för att bevara Egyptens oberoende. Hennes dramatiska dödsfall — troligen ett självvalt döende av ormbett 30 f.Kr. efter Antonius självmord — markerar slutet på det självständiga Egypten. Octavianus (Augustus) inkorporerar Egypten som en provinz av Romarriket.",
      en: "Cleopatra VII ascends the throne at age 18 and is the last active monarch of the Ptolemaic royal house. Her legend is deeper and more complex than popular culture suggests. She was the first Ptolemaic monarch to actually learn Egyptian — she spoke nine languages in total. She presented herself to her Egyptian subjects as the incarnation of the goddess Isis and to her Hellenistic subjects as queen and philosopher. Her alliances with Julius Caesar and Marcus Antonius were not merely romantic but strategic attempts to use Roman military power to preserve Egypt's independence. Her dramatic death — likely a self-chosen death by snakebite in 30 BC following Antony's suicide — marks the end of independent Egypt. Octavian (Augustus) incorporates Egypt as a province of the Roman Empire.",
      tr: "VII. Kleopatra, 18 yaşında tahta çıkar ve Ptolemaios hanedanının son aktif hükümdarıdır. Efsanesi, popüler kültürün öne sürdüğünden daha derin ve karmaşıktır.",
    },
    figures: ["Cleopatra VII", "Julius Caesar", "Mark Antony", "Octavian"],
    consequences: {
      sv: "Egyptens 3 000-åriga oberoende avslutas — landet blir en romersk provins.",
      en: "Egypt's 3,000-year independence ends — the country becomes a Roman province.",
      tr: "Mısır'ın 3.000 yıllık bağımsızlığı sona eriyor — ülke bir Roma eyaletine dönüşüyor.",
    },
    impact: {
      sv: "Kleopatra VII är den siste representanten för en av historiens mest lysande civilisationer.",
      en: "Cleopatra VII is the last representative of one of history's most brilliant civilizations.",
      tr: "VII. Kleopatra, tarihin en parlak uygarlıklarından birinin son temsilcisidir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: -30,
    title: {
      sv: "Egypten blir romersk provins — En civilisations sista andetag",
      en: "Egypt Becomes a Roman Province — A Civilization's Last Breath",
      tr: "Mısır Roma Eyaleti Oluyor — Bir Uygarlığın Son Nefesi",
    },
    summary: {
      sv: "Octavianus (Augustus) erövrar Egypten efter Kleopatras och Antonius' död och inkorporerar det som en speciell kejserlig provins. Egypten är för romarna inte bara en provins utan Roms spannmålskammare — Nilens svarta bördiga mark föder en tredjedel av imperiet. Egyptisk religion, konst och filosofi absorberas gradvis i det romerska och senare byzantinska kulturell sfär. Templet i Dendera, med sin magnifika zodiakfris, uppförs faktiskt under den ptolemaisk-romerska perioden. Hieroglyfernas dekryptering glöms bort — den siste kände hieroglyfklassern dör ca 394 e.Kr. Med arabernas erövring 641 e.Kr. islamiseras Egypten och dess faraoniska arv begravs under sand och glömska — tills Napoleons expedition 1798 och Champollions dechiffrering av Rosettastenen 1822 öppnar portarna till en förlorad civilisation.",
      en: "Octavian (Augustus) conquers Egypt after Cleopatra's and Antony's deaths and incorporates it as a special imperial province. Egypt for the Romans is not just a province but Rome's granary — the Nile's black fertile soil feeds a third of the empire. Egyptian religion, art, and philosophy are gradually absorbed into the Roman and later Byzantine cultural sphere. The Temple of Dendera, with its magnificent zodiac frieze, is actually erected during the Ptolemaic-Roman period. Knowledge of hieroglyphics is forgotten — the last known hieroglyph carver dies c. 394 AD. With the Arab conquest in 641 AD Egypt is Islamized and its pharaonic heritage is buried under sand and oblivion — until Napoleon's expedition in 1798 and Champollion's decipherment of the Rosetta Stone in 1822 opens the doors to a lost civilization.",
      tr: "Oktavianus (Augustus), Kleopatra ve Antonius'un ölümünün ardından Mısır'ı fetheder ve özel bir imparatorluk eyaleti olarak bünyesine katar.",
    },
    figures: ["Octavian Augustus", "Cleopatra VII"],
    consequences: {
      sv: "Den faraoniska civilisationen slutar formellt — men egyptisk kultur överlever i omvandlad form.",
      en: "The pharaonic civilization formally ends — but Egyptian culture survives in transformed form.",
      tr: "Firavunsal uygarlık resmi olarak sona eriyor — ancak Mısır kültürü dönüşmüş biçimde varlığını sürdürüyor.",
    },
    impact: {
      sv: "Egyptens 3 000-åriga arv kapslar in sig och väntar i mörkret tills modern arkeologi återupptäcker det.",
      en: "Egypt's 3,000-year heritage encapsulates itself and waits in darkness until modern archaeology rediscovers it.",
      tr: "Mısır'ın 3.000 yıllık mirası modern arkeoloji onu yeniden keşfedene kadar karanlıkta bekliyor.",
    },
    category: "politics",
    importance: "high",
  },
];

// =============================================================================
// LEADERS — Pharaohs of Ancient Egypt
// =============================================================================

const egyptLeaders: Sultan[] = [
  {
    id: "narmer",
    name: "Narmer (Menes)",
    reignStart: -3100,
    reignEnd: -3050,
    parentId: null,
    generation: 1,
    title: {
      sv: "Förste Farao, Egyptens Enare",
      en: "First Pharaoh, Unifier of Egypt",
      tr: "İlk Firavun, Mısır'ın Birleştiricisi",
    },
    profileId: "narmer",
  },
  {
    id: "djoser",
    name: "Djoser",
    reignStart: -2686,
    reignEnd: -2648,
    parentId: null,
    generation: 3,
    title: {
      sv: "Stegpyramidens farao, Imhoteps beskyddare",
      en: "Pharaoh of the Step Pyramid, Patron of Imhotep",
      tr: "Basamaklı Piramit Firavunu, İmhotep'in Hamisi",
    },
    profileId: "djoser",
  },
  {
    id: "khufu",
    name: "Khufu (Cheops)",
    reignStart: -2589,
    reignEnd: -2566,
    parentId: null,
    generation: 4,
    title: {
      sv: "Den Store Pyramidens byggare",
      en: "Builder of the Great Pyramid",
      tr: "Büyük Piramit'in İnşaatçısı",
    },
    profileId: "khufu",
  },
  {
    id: "khafre",
    name: "Khafre (Chephren)",
    reignStart: -2558,
    reignEnd: -2532,
    parentId: "khufu",
    generation: 5,
    title: {
      sv: "Sfinxens farao",
      en: "Pharaoh of the Sphinx",
      tr: "Sfenks'in Firavunu",
    },
  },
  {
    id: "menkaure",
    name: "Menkaure (Mycerinus)",
    reignStart: -2532,
    reignEnd: -2503,
    parentId: "khafre",
    generation: 6,
    title: {
      sv: "Den tredje pyramidens byggare",
      en: "Builder of the Third Pyramid",
      tr: "Üçüncü Piramit'in İnşaatçısı",
    },
  },
  {
    id: "mentuhotep2",
    name: "Mentuhotep II",
    reignStart: -2055,
    reignEnd: -2004,
    parentId: null,
    generation: 11,
    title: {
      sv: "Egyptens återenare, Mellersta Rikets grundare",
      en: "Reunifier of Egypt, Founder of the Middle Kingdom",
      tr: "Mısır'ın Yeniden Birleştiricisi, Orta Krallık'ın Kurucusu",
    },
    profileId: "mentuhotep2",
  },
  {
    id: "senusret3",
    name: "Senusret III",
    reignStart: -1878,
    reignEnd: -1839,
    parentId: null,
    generation: 12,
    title: {
      sv: "Nubiens erövrare, Egyptens reformator",
      en: "Conqueror of Nubia, Reformer of Egypt",
      tr: "Nubya'nın Fatihi, Mısır'ın Reformcusu",
    },
  },
  {
    id: "ahmose1",
    name: "Ahmose I",
    reignStart: -1550,
    reignEnd: -1525,
    parentId: null,
    generation: 18,
    title: {
      sv: "Hyksos fördrivare, Nya Rikets grundare",
      en: "Expeller of the Hyksos, Founder of the New Kingdom",
      tr: "Hiksos'ları Kovalayanlar, Yeni Krallık'ın Kurucusu",
    },
    profileId: "ahmose1",
  },
  {
    id: "hatshepsut",
    name: "Hatshepsut",
    reignStart: -1479,
    reignEnd: -1458,
    parentId: null,
    generation: 18,
    title: {
      sv: "Egyptens mäktigaste kvinnliga farao",
      en: "Egypt's Most Powerful Female Pharaoh",
      tr: "Mısır'ın En Güçlü Kadın Firavunu",
    },
    profileId: "hatshepsut",
  },
  {
    id: "thutmose3",
    name: "Thutmose III",
    reignStart: -1479,
    reignEnd: -1425,
    parentId: null,
    generation: 18,
    title: {
      sv: "Egyptens Napoleon, den störste militärfaraon",
      en: "Egypt's Napoleon, the Greatest Military Pharaoh",
      tr: "Mısır'ın Napolyonu, En Büyük Askeri Firavun",
    },
    profileId: "thutmose3",
  },
  {
    id: "amenhotep3",
    name: "Amenhotep III",
    reignStart: -1388,
    reignEnd: -1351,
    parentId: null,
    generation: 18,
    title: {
      sv: "Den strålande solen, Egyptens mest lysande diplomat",
      en: "The Dazzling Sun, Egypt's Most Brilliant Diplomat",
      tr: "Göz Kamaştırıcı Güneş, Mısır'ın En Parlak Diplomatı",
    },
  },
  {
    id: "akhenaten",
    name: "Akhenaten (Amenhotep IV)",
    reignStart: -1353,
    reignEnd: -1336,
    parentId: "amenhotep3",
    generation: 18,
    title: {
      sv: "Kätterfaraon, Atens tjänare",
      en: "Heretic Pharaoh, Servant of Aten",
      tr: "Kafir Firavun, Aten'in Hizmetçisi",
    },
    profileId: "akhenaten",
  },
  {
    id: "tutankhamun",
    name: "Tutankhamun",
    reignStart: -1332,
    reignEnd: -1323,
    parentId: "akhenaten",
    generation: 18,
    title: {
      sv: "Den gyllene pojkfaraon",
      en: "The Golden Boy Pharaoh",
      tr: "Altın Çocuk Firavun",
    },
    profileId: "tutankhamun",
  },
  {
    id: "ramesses2",
    name: "Ramesses II (Ramesses den store)",
    reignStart: -1279,
    reignEnd: -1213,
    parentId: null,
    generation: 19,
    title: {
      sv: "Den store, Egyptens evige farao",
      en: "The Great, Egypt's Eternal Pharaoh",
      tr: "Büyük, Mısır'ın Ebedi Firavunu",
    },
    profileId: "ramesses2",
  },
  {
    id: "ramesses3",
    name: "Ramesses III",
    reignStart: -1186,
    reignEnd: -1155,
    parentId: null,
    generation: 20,
    title: {
      sv: "Sjöfolkens besegrare, Egyptens siste store krigarkung",
      en: "Defeater of the Sea Peoples, Egypt's Last Great Warrior King",
      tr: "Deniz Kavimlerinin Yenilgiye Uğratanı, Mısır'ın Son Büyük Savaşçı Kralı",
    },
  },
  {
    id: "taharqa",
    name: "Taharqa",
    reignStart: -690,
    reignEnd: -664,
    parentId: null,
    generation: 25,
    title: {
      sv: "Nubisk farao, Kush-imperiets störste kung",
      en: "Nubian Pharaoh, Greatest King of the Kushite Empire",
      tr: "Nubian Firavun, Kuş İmparatorluğu'nun En Büyük Kralı",
    },
    profileId: "taharqa",
  },
  {
    id: "cleopatra7",
    name: "Cleopatra VII",
    reignStart: -51,
    reignEnd: -30,
    parentId: null,
    generation: 33,
    title: {
      sv: "Egyptens siste farao, Isis inkarnation",
      en: "Egypt's Last Pharaoh, Incarnation of Isis",
      tr: "Mısır'ın Son Firavunu, İsis'in Enkarnasyonu",
    },
    profileId: "cleopatra7",
  },
];

// =============================================================================
// HISTORICAL PROFILES
// =============================================================================

const egyptProfiles: HistoricalProfile[] = [
  {
    id: "khufu",
    name: "Khufu (Cheops)",
    years: "ca 2589–2566 f.Kr.",
    title: {
      sv: "Den Store Pyramidens byggare — Farao av Guds hus",
      en: "Builder of the Great Pyramid — Pharaoh of the House of God",
      tr: "Büyük Piramit'in İnşaatçısı — Tanrı'nın Evi Firavunu",
    },
    portrait: "🔺",
    bio: {
      sv: "Khufu (Cheops) är en av historiens mest inflytelserika och mystiska gestalter. Han uppförde det enda av de sju antikens underverk som fortfarande existerar — den Stora Pyramiden i Giza. Ändå vet vi förvånansvärt lite om mannen själv: det enda kända porträttet är en liten elfenbensstatyett av 7,5 cm, den minsta representation av den person som beordrade den mäktigaste byggnaden i historien. Herodotus beskriver honom som en tyrann som tvingade sitt folk till slavarbete, men moderna arkeologiska fynd berättar en annan historia: de välnärda arbetarna fick lön, medicin och begravdes med heder. Papyrusdokumenten från Wadi el-Jarf visar ett enormt logistiskt maskineri av professionella hantverkare, tekniker och administratörer.",
      en: "Khufu (Cheops) is one of history's most influential and mysterious figures. He erected the only one of the Seven Wonders of the Ancient World that still exists — the Great Pyramid at Giza. Yet we know surprisingly little about the man himself: the only known portrait is a small 7.5 cm ivory statuette, the smallest representation of the person who ordered the mightiest building in history. Herodotus describes him as a tyrant who forced his people into slave labor, but modern archaeological findings tell a different story: the well-nourished workers received pay, medical care, and were buried with honor. The papyrus documents from Wadi el-Jarf reveal an enormous logistical machinery of professional craftsmen, technicians, and administrators.",
      tr: "Keops, tarihin en etkili ve gizemli figürlerinden biridir. Antik Dünyanın Yedi Harikasından hâlâ var olan tek harikayı — Giza'daki Büyük Piramit'i inşa etti.",
    },
    reforms: {
      sv: [
        "Skapade det mest ambitiösa statliga byggprojektet i historien",
        "Organiserade en professionell kår av hantverkare och ingenjörer",
        "Etablerade astronomisk precision i arkitekturen",
        "Standardiserade mätenheter för byggnation",
        "Skapade ett avancerat logistiksystem för stentransport",
        "Etablerade Giza som ett religiöst och ceremonielt centrum",
      ],
      en: [
        "Created the most ambitious state construction project in history",
        "Organized a professional corps of craftsmen and engineers",
        "Established astronomical precision in architecture",
        "Standardized measurement units for construction",
        "Created an advanced logistics system for stone transport",
        "Established Giza as a religious and ceremonial center",
      ],
      tr: [
        "Tarihin en hırslı devlet inşaat projesini yarattı",
        "Profesyonel bir usta ve mühendis kolordusu organize etti",
        "Mimaride astronomik hassasiyeti yerleştirdi",
        "İnşaat için ölçüm birimlerini standartlaştırdı",
        "Taş taşımacılığı için gelişmiş bir lojistik sistemi oluşturdu",
      ],
    },
    campaigns: {
      sv: [
        "Gruvdrift i Sinaihalvön (turkos och kopparmalmbrytning)",
        "Handelsexpeditioner till Libanon för cedarträ",
        "Militärkampanjer mot nubierna i söder",
        "Konsolidering av egyptisk kontroll i Deltaregionen",
      ],
      en: [
        "Mining in the Sinai Peninsula (turquoise and copper ore extraction)",
        "Trading expeditions to Lebanon for cedar wood",
        "Military campaigns against the Nubians in the south",
        "Consolidation of Egyptian control in the Delta region",
      ],
      tr: [
        "Sina Yarımadası'nda madencilik (turkuaz ve bakır cevheri çıkarımı)",
        "Sedir ağacı için Lübnan'a ticaret seferleri",
        "Güneyde Nubian'lara karşı askeri seferler",
      ],
    },
    leadershipStyle: {
      sv: "Khufu var en absolut monark vars makt var lika fullständig som hans pyramid. Han förenade religiös auktoritet (som Ra:s son och levande gud) med politisk och militär makt. Hans förmåga att mobilisera tusentals människors arbete under decennier vittnar om en exceptionell administrativ och karismatisk begåvning. Herodotus' bild av honom som tyrann kontrasteras av arkeologiska bevis om ett välorganiserat och respekterat byggarsamhälle.",
      en: "Khufu was an absolute monarch whose power was as complete as his pyramid. He united religious authority (as son of Ra and living god) with political and military power. His ability to mobilize thousands of people's labor over decades testifies to exceptional administrative and charismatic gifting. Herodotus' image of him as a tyrant is contrasted by archaeological evidence of a well-organized and respected builder community.",
      tr: "Keops, iktidarı piramidi kadar tam olan mutlak bir hükümdardı.",
    },
    criticalPerspectives: {
      sv: "Khufus arv är paradoxalt: han beordrade det mest formidabla byggnadsverk i historien, men vi vet nästan ingenting om honom som person. Hans monument överlever hans namn — pyramiden är odödlig, faraon är ett medium för vår föreställning. Den moderna debatten om pyramidarbetarnas status — slavar vs fria hantverkare — speglar vår tids diskurs om makt och exploatering.",
      en: "Khufu's legacy is paradoxical: he ordered the most formidable construction in history, but we know almost nothing about him as a person. His monument outlives his name — the pyramid is immortal, the pharaoh is a medium for our imagination. The modern debate about pyramid workers' status — slaves vs free craftsmen — reflects our era's discourse on power and exploitation.",
      tr: "Keops'un mirası paradoksal bir nitelik taşır: tarihin en görkemli yapısını emretti, ancak insan olarak onun hakkında neredeyse hiçbir şey bilmiyoruz.",
    },
  },
  {
    id: "hatshepsut",
    name: "Hatshepsut",
    years: "ca 1507–1458 f.Kr.",
    title: {
      sv: "Farao — Egyptens store kvinna",
      en: "Pharaoh — Egypt's Great Woman",
      tr: "Firavun — Mısır'ın Büyük Kadını",
    },
    portrait: "👑",
    bio: {
      sv: "Hatshepsut är en av forntida historiens mest fascinerande och kraftfulla figurer — en kvinna som regerade som farao i mer än 20 år, förklädde sig som man i offentliga ceremonier, och uppförde en av antikens skönaste monument. Dotter till Thutmosis I, blev hon änka till Thutmosis II och antog rollen som regent för sin styvson Thutmosis III. Men Hatshepsut nöjde sig inte med att vara regent — hon kröntes till fullständig farao, med alla ceremonier och rättigheter som titeln innebar. Hennes diplomatiska och ekonomiska framgångar är enastående: hennes expeditioner till Punt förde med sig rikedomar som expanderade Egyptens handel enormt. Hennes handelsnätverk sträckte sig från Somalia till Mesopotamien.",
      en: "Hatshepsut is one of ancient history's most fascinating and powerful figures — a woman who ruled as pharaoh for more than 20 years, dressed as a man in public ceremonies, and erected one of antiquity's most beautiful monuments. Daughter of Thutmose I, she became the widow of Thutmose II and assumed the role of regent for her stepson Thutmose III. But Hatshepsut was not satisfied with being regent — she crowned herself as full pharaoh, with all ceremonies and rights the title entailed. Her diplomatic and economic achievements are outstanding: her expeditions to Punt brought riches that enormously expanded Egypt's trade. Her trade network stretched from Somalia to Mesopotamia.",
      tr: "Hatşepsut, antik tarihin en büyüleyici ve güçlü figürlerinden biridir — 20 yıldan fazla firavun olarak hüküm süren, kamusal törenlerde erkek kıyafeti giyen ve antik çağın en güzel anıtlarından birini inşa ettiren bir kadın.",
    },
    reforms: {
      sv: [
        "Ledde de mest framgångsrika handelsexpeditionerna i egyptisk historia till Punt",
        "Uppförde det magnifika mortuarietemplet i Deir el-Bahari",
        "Beordrade uppförandet av de högsta obeliskerna i Karnak",
        "Expanderade egyptisk handel till Syrien, Kush och Punt",
        "Skapade fred och välstånd under hela sin regeringstid",
        "Sponsrade konsthantverk av exceptionell kvalitet",
        "Etablerade Punt-expeditionen som en regelbunden handelsrutt",
        "Moderniserade Karnaks tempelkomplex",
      ],
      en: [
        "Led the most successful trading expeditions in Egyptian history to Punt",
        "Erected the magnificent mortuary temple at Deir el-Bahari",
        "Ordered the erection of the tallest obelisks in Karnak",
        "Expanded Egyptian trade to Syria, Kush, and Punt",
        "Created peace and prosperity throughout her reign",
        "Sponsored craftsmanship of exceptional quality",
        "Established the Punt expedition as a regular trade route",
        "Modernized the Karnak temple complex",
      ],
      tr: [
        "Mısır tarihinde Punt'a en başarılı ticaret seferlerini düzenledi",
        "Deir el-Bahari'de muhteşem cenaze tapınağını inşa etti",
        "Karnak'ın en uzun dikilitaşlarının dikilmesini emretti",
        "Suriye, Kuş ve Punt'a Mısır ticaretini genişletti",
        "Tüm saltanatı boyunca barış ve refah yarattı",
      ],
    },
    campaigns: {
      sv: [
        "Handelssexpedition till Punt (ca 1493 f.Kr.)",
        "Militärkampanj mot Nubien",
        "Kampanj i Levanten",
        "Handelsuppdrag till Syrien och Mesopotamien",
      ],
      en: [
        "Trading expedition to Punt (c. 1493 BC)",
        "Military campaign against Nubia",
        "Campaign in the Levant",
        "Trade missions to Syria and Mesopotamia",
      ],
      tr: [
        "Punt'a ticaret seferi (yaklaşık MÖ 1493)",
        "Nubya'ya askeri sefer",
        "Levant'ta sefer",
        "Suriye ve Mezopotamya'ya ticaret misyonları",
      ],
    },
    leadershipStyle: {
      sv: "Hatshepsut ledde med en sällan skådad kombination av diplomatisk skicklighet, ekonomisk vision och konstnärligt stöd. Hon var inte en krigarkung — hennes arv är monument, handel och fred. Hennes förmåga att manövrera i ett system designat för män, att legitimera sin makt genom religiös propaganda och att uppnå enastående resultat, vittnar om en exceptionell politisk och intellektuell kapacitet.",
      en: "Hatshepsut led with a rarely seen combination of diplomatic skill, economic vision, and artistic patronage. She was not a warrior king — her legacy is monuments, trade, and peace. Her ability to maneuver in a system designed for men, to legitimize her power through religious propaganda, and to achieve outstanding results, testifies to exceptional political and intellectual capacity.",
      tr: "Hatşepsut, nadiren görülen bir diplomatik beceri, ekonomik vizyon ve sanatsal himaye kombinasyonuyla yönetim yürüttü.",
    },
    criticalPerspectives: {
      sv: "Det mest provocerande aspekten av Hatshepsuts arv är inte hennes bedrifter under livet utan deras nästan fullständiga utplåning efter hennes död. Thutmosis III och Amenhotep II lät systematiskt hugga ut hennes namn och bilder från monument. Men de förstörde inte hennes tempel — de gömde det bakom murar. Varför? Historikerna debatterar: politisk konkurrens, regimlegitimitet, eller rent praktiska skäl. Det ironiska är att just dessa försök att utplåna henne innebär att vi idag kan rekonstruera henne — de inskriptioner som doldes bevarades och hittas idag under murar och sand.",
      en: "The most provocative aspect of Hatshepsut's legacy is not her achievements during life but their near-complete obliteration after her death. Thutmose III and Amenhotep II had her name and images systematically chiseled out from monuments. But they did not destroy her temple — they hid it behind walls. Why? Historians debate: political competition, regime legitimacy, or purely practical reasons. The irony is that precisely these attempts to obliterate her mean that we can today reconstruct her — the inscriptions that were hidden were preserved and are today found under walls and sand.",
      tr: "Hatşepsut'un mirasının en kışkırtıcı yönü, yaşamındaki başarıları değil, ölümünden sonra neredeyse tamamen silinmesidir.",
    },
  },
  {
    id: "ramesses2",
    name: "Ramesses II",
    years: "ca 1303–1213 f.Kr.",
    title: {
      sv: "Den store — Egyptens evige farao",
      en: "The Great — Egypt's Eternal Pharaoh",
      tr: "Büyük — Mısır'ın Ebedi Firavunu",
    },
    portrait: "⚡",
    bio: {
      sv: "Ramesses II är det namn som nästan alla associerar med 'farao' — en titan i antik historia vars monument, krigsberättelser och dynastiska arv dominerar det kollektiva minnet av forntida Egypten. Han regerade i 66 år, hade mer än 100 barn, och lät uppföra monument från Aswan till Abu Simbel till Pi-Ramesses i deltaregionen. Hans propaganda var lika formidabel som hans monument: han lät skriva om Kadesh-slagets historia som en total egyptisk seger, trots att det i verkligheten var oavgjort. Abu Simbels fyra kolossstatyer — vardera ca 20 meter höga — är bland antikens mest imponerande konstruktioner. Hans kärlek till sin första hustru Nefertari är dokumenterad i exceptionell poesi och i hennes vackra grav.",
      en: "Ramesses II is the name almost everyone associates with 'pharaoh' — a titan of ancient history whose monuments, war narratives, and dynastic legacy dominate the collective memory of ancient Egypt. He ruled for 66 years, had more than 100 children, and had monuments erected from Aswan to Abu Simbel to Pi-Ramesses in the Delta region. His propaganda was as formidable as his monuments: he had the history of the Battle of Kadesh rewritten as a total Egyptian victory, despite it being a draw in reality. Abu Simbel's four colossal statues — each approximately 20 meters tall — are among antiquity's most impressive constructions. His love for his first wife Nefertari is documented in exceptional poetry and in her beautiful tomb.",
      tr: "Ramses II, neredeyse herkesin 'firavun' ile özdeşleştirdiği isimdir — anıtları, savaş anlatıları ve hanedanlık mirası antik Mısır'ın kolektif belleğine hâkim olan antik tarihin bir titanı.",
    },
    reforms: {
      sv: [
        "Uppförde Abu Simbel — ett av antikens mest imponerande monument",
        "Signerade världens äldsta kända fredsavtal (Kadesh-fördraget)",
        "Byggde Pi-Ramesses — en av antikens störste städer",
        "Expanderade Karnak och Luxortemplet",
        "Skapade det mest omfattande propagandaprogrammet i egyptisk historia",
        "Standardiserade egyptisk administrativ praxis i riket",
        "Utexaminerade tusentals hantverkare och konstnärer",
        "Säkerställde Egyptens gränser mot libyer och nubier",
      ],
      en: [
        "Erected Abu Simbel — one of antiquity's most impressive monuments",
        "Signed the world's oldest known peace treaty (the Treaty of Kadesh)",
        "Built Pi-Ramesses — one of antiquity's greatest cities",
        "Expanded Karnak and Luxor Temple",
        "Created the most extensive propaganda program in Egyptian history",
        "Standardized Egyptian administrative practices across the empire",
        "Trained thousands of craftsmen and artists",
        "Secured Egypt's borders against Libyans and Nubians",
      ],
      tr: [
        "Abu Simbel'i inşa etti — antik çağın en etkileyici anıtlarından biri",
        "Dünyanın bilinen en eski barış antlaşmasını imzaladı (Kadeş Antlaşması)",
        "Pi-Ramesses'i inşa etti — antik çağın en büyük şehirlerinden biri",
        "Karnak ve Luxor Tapınağı'nı genişletti",
        "Mısır tarihindeki en kapsamlı propaganda programını yarattı",
      ],
    },
    campaigns: {
      sv: [
        "Kadesh-kampanjen mot hethiterna (ca 1274 f.Kr.)",
        "Kampanjer mot libyer i väster",
        "Nubiska kampanjer i söder",
        "Kampanjer i Kanaan (nuv. Israel/Palestina)",
        "Försvaret av Egyptens gränser mot sjöfolk",
      ],
      en: [
        "The Kadesh campaign against the Hittites (c. 1274 BC)",
        "Campaigns against Libyans in the west",
        "Nubian campaigns in the south",
        "Campaigns in Canaan (modern Israel/Palestine)",
        "Defense of Egypt's borders against Sea Peoples",
      ],
      tr: [
        "Hititler'e karşı Kadeş kampanyası (yaklaşık MÖ 1274)",
        "Batıda Libyalılara karşı seferler",
        "Güneyde Nubian seferleri",
        "Kenan'da seferler (modern İsrail/Filistin)",
      ],
    },
    leadershipStyle: {
      sv: "Ramesses II kombinerade personlig tapperhet (han ledde charger i Kadesh-slagets värsta stund) med diplomatisk intelligens (Kadesh-fredsavtalet är ett mästerverk av statskraft) och propagandistisk briljans. Han förstod att en faraons makt är lika mycket symbolisk som militär. Varje tempel han uppförde var en propagandamaskin, varje kolossal staty en visuell manifestation av makt. Hans 66-åriga regering skapade en egyptisk imperial identitet som överlever i årtusenden.",
      en: "Ramesses II combined personal bravery (he led charges at the worst moment of the Battle of Kadesh) with diplomatic intelligence (the Kadesh peace treaty is a masterpiece of statecraft) and propagandistic brilliance. He understood that a pharaoh's power is as much symbolic as military. Every temple he erected was a propaganda machine, every colossal statue a visual manifestation of power. His 66-year reign created an Egyptian imperial identity that survives for millennia.",
      tr: "Ramses II, kişisel cesareti (Kadeş Muharebesi'nin en kötü anında saldırıya öncülük etti) diplomatik zekâyla (Kadeş barış antlaşması devlet yönetiminin şaheseridir) ve propaganda dehası ile birleştirdi.",
    },
    criticalPerspectives: {
      sv: "Ramesses II är ett mästerverk i självmarknadsföring. Hans propaganda var så effektiv att vi i 3 000 år betraktade Kadesh som en stor egyptisk seger — det var det inte. Hethitiska källor visar tydligt att ingen sida vann. Ramesses usurperade också monument av tidigare faraoner och lät rista in sitt eget namn — en form av antik 'kulturell appropriation'. Och ändå: hans faktiska prestationer är verkliga. Abu Simbel är verklig. Kadesh-fredsavtalet är verkligt. Nefertaris grav är verklig. Han var en extraordinär härskare — men också historiens skickligaste publicist.",
      en: "Ramesses II is a masterpiece in self-marketing. His propaganda was so effective that for 3,000 years we regarded Kadesh as a great Egyptian victory — it was not. Hittite sources clearly show that neither side won. Ramesses also usurped monuments of earlier pharaohs and had his own name inscribed — a form of ancient 'cultural appropriation'. And yet: his actual achievements are real. Abu Simbel is real. The Kadesh peace treaty is real. Nefertari's tomb is real. He was an extraordinary ruler — but also history's most skilled publicist.",
      tr: "Ramses II, öz pazarlamada bir şaheserdir. Propaganda makinesi o kadar etkiliydi ki 3.000 yıl boyunca Kadeş'i büyük bir Mısır zaferi olarak değerlendirdik — öyle değildi.",
    },
  },
  {
    id: "akhenaten",
    name: "Akhenaten",
    years: "ca 1380–1336 f.Kr.",
    title: {
      sv: "Kätterfaraon — Atens profet",
      en: "Heretic Pharaoh — Prophet of Aten",
      tr: "Kafir Firavun — Aten'in Peygamberi",
    },
    portrait: "☀️",
    bio: {
      sv: "Akhenaten är en av antikens mest provocerande och gåtfulla figurer. Han genomförde en religiös revolution som inte har sin like i den antika världen: han avskaffade ett flerguderi med tusenåriga rötter och ersatte det med ett monoteistiskt system centrerat kring Aten — den abstrakta solskivan. Detta var inte bara en religiös förändring utan ett totalt omvälvande av egyptisk samhällsstruktur: prästernas makt, tempelskatterna, de traditionella festernas politiska funktion — allt kollapsade eller omformades. Hans konstrevolution är lika radikal: amarna-stilen skildrar kroppen i ett naturalistiskt, nästan expressionistiskt sätt — buklor, ovanligt tunna lemmar, erotisk intimitet mellan kungen och drottningen — en total brytning med 1 500 år av stilisering.",
      en: "Akhenaten is one of antiquity's most provocative and enigmatic figures. He carried out a religious revolution without parallel in the ancient world: he abolished a polytheism with millennium-old roots and replaced it with a monotheistic system centered on Aten — the abstract sun disk. This was not merely a religious change but a complete overturning of Egyptian social structure: the priests' power, the temple treasuries, the traditional festivals' political function — all collapsed or were reformed. His artistic revolution is equally radical: the Amarna style depicts the body in a naturalistic, almost expressionistic way — swollen bellies, unusually thin limbs, erotic intimacy between king and queen — a total break with 1,500 years of stylization.",
      tr: "Akhenaten, antik çağın en kışkırtıcı ve gizemli figürlerinden biridir. Antik dünyada eşi görülmemiş bir dini devrim gerçekleştirdi.",
    },
    reforms: {
      sv: [
        "Avskaffade det egyptiska polyteistiska systemet",
        "Instiftade Aten-monoteism — den äldsta kända monoteistiska statsreligionen",
        "Grundade den nya huvudstaden Akhetaten (Amarna)",
        "Stängde Amuns och alla andra gudars tempel",
        "Revolutionerade egyptisk konstnärlig stil — Amarna-stilen",
        "Omorganiserade egyptisk administration kring solkulten",
        "Skapade ny religiös poesi — det stora Aten-hymnen",
        "Konfiskerade tempelskatterna och centraliserade välståndet",
      ],
      en: [
        "Abolished the Egyptian polytheistic system",
        "Instituted Aten monotheism — the oldest known monotheistic state religion",
        "Founded the new capital Akhetaten (Amarna)",
        "Closed the temples of Amun and all other gods",
        "Revolutionized Egyptian artistic style — the Amarna style",
        "Reorganized Egyptian administration around the solar cult",
        "Created new religious poetry — the Great Hymn to Aten",
        "Confiscated temple treasuries and centralized wealth",
      ],
      tr: [
        "Mısır'ın çok tanrıcı sistemini kaldırdı",
        "Bilinen en eski tek tanrıcı devlet dini Aten monoteizmini kurdu",
        "Yeni başkent Akhetaten'i (Amarna) kurdu",
        "Amun ve diğer tüm tanrıların tapınaklarını kapattı",
        "Mısır sanat stilini devrimleştirdi — Amarna stili",
      ],
    },
    campaigns: {
      sv: [
        "Administrativa kampanjer mot Amun-prästerskapet",
        "Militärt försvar av Egyptens gränser (med oklar framgång)",
        "Ekonomisk expansion kring Aten-templet i Akhetaten",
      ],
      en: [
        "Administrative campaigns against the Amun priesthood",
        "Military defense of Egypt's borders (with unclear success)",
        "Economic expansion around the Aten temple in Akhetaten",
      ],
      tr: [
        "Amun rahipliğine karşı idari kampanyalar",
        "Mısır sınırlarının askeri savunması (belirsiz başarıyla)",
      ],
    },
    leadershipStyle: {
      sv: "Akhenaten var en visionär med absolut övertygelse om sin religiösa sanning. Han var inte intresserad av militär makt för sin egen skull — han förlorade egyptiska besittningar i Levanten till Hethiterna på grund av sin ointresse för utrikespolitik. Hans vision var total och utan kompromisser — men också djupt persönlig: det stora Aten-hymnen är ett av forntida litteraturens vackraste poetiska uttryck, ett kärleksupprop till solens andes skapelseläge.",
      en: "Akhenaten was a visionary with absolute conviction in his religious truth. He was not interested in military power for its own sake — he lost Egyptian possessions in the Levant to the Hittites due to his disinterest in foreign policy. His vision was total and uncompromising — but also deeply personal: the Great Hymn to Aten is one of the most beautiful poetic expressions in ancient literature, a love letter to the sun spirit's act of creation.",
      tr: "Akhenaten, dini gerçeğine mutlak bir inançla bağlı bir vizyonerdı.",
    },
    criticalPerspectives: {
      sv: "Akhenatens monoteism är en av historiens mest debatterade ämnen. Sigmund Freud argumenterade att Moses var en egyptisk präst influerad av Akhenatens revolution. Modern egyptologi är mer skeptisk till direkta samband, men inflytandets möjlighet utforskas fortfarande. Vad vi vet säkert: Akhenatens experiment kollapsade nästan omedelbart vid hans död. Men hans religiösa idéer — ett osynlig, universell Gud manifesterad i ljuset — kan ha levt kvar i marginalen av den levantinska religiösa världen och bidragit till framväxten av judisk monoteism.",
      en: "Akhenaten's monotheism is one of history's most debated topics. Sigmund Freud argued that Moses was an Egyptian priest influenced by Akhenaten's revolution. Modern Egyptology is more skeptical of direct connections, but the possibility of influence is still explored. What we know for certain: Akhenaten's experiment collapsed almost immediately at his death. But his religious ideas — an invisible, universal God manifested in light — may have lived on in the margins of the Levantine religious world and contributed to the emergence of Jewish monotheism.",
      tr: "Akhenaten'in tektanrıcılığı tarihin en tartışmalı konularından biridir. Sigmund Freud, Musa'nın Akhenaten'in devriminden etkilenen bir Mısır rahibi olduğunu savundu.",
    },
  },
  {
    id: "tutankhamun",
    name: "Tutankhamun",
    years: "ca 1341–1323 f.Kr.",
    title: {
      sv: "Den levande bilden av Amun — Egyptens evige pojkkung",
      en: "The Living Image of Amun — Egypt's Eternal Boy King",
      tr: "Amun'un Yaşayan İmgesi — Mısır'ın Ebedi Çocuk Kralı",
    },
    portrait: "🌟",
    bio: {
      sv: "Tutankhamun är historiens mest kände farao — inte på grund av sina bedrifter under livet utan på grund av den orörd gravkammare som Howard Carter öppnade den 4 november 1922. Han steg upp på tronen vid ca 9 år, regerade i 10 år och dog vid ca 19 — troligen av en kombination av malaria, skelettssjukdomar och möjligen ett benbrott. Hans grav i Konungarnas dal, KV62, var den enda kungliga graven från Nya Riket som hittades i princip orört, med sina 5 398 gravgåvor intakta. Den gyllene dödsmasken — 11 kg solid guld, dekorerad med lapis lazuli, karneol och turkos — är forntida konsthantverts absoluta mästerverk. Men det är inte det vackraste föremålet: tronens ryggstöd, som skildrar honom och Ankhesenamun i solen Atens strålar, är ett av historiens mest rörande bilder av äktenskap och intimitet.",
      en: "Tutankhamun is history's most famous pharaoh — not because of his deeds during life but because of the untouched burial chamber that Howard Carter opened on November 4, 1922. He ascended the throne at approximately 9 years, ruled for 10 years, and died at approximately 19 — likely from a combination of malaria, skeletal diseases, and possibly a bone fracture. His tomb in the Valley of the Kings, KV62, was the only royal tomb from the New Kingdom found essentially intact, with its 5,398 grave goods untouched. The golden death mask — 11 kg of solid gold, decorated with lapis lazuli, carnelian, and turquoise — is antiquity's absolute masterpiece of craftsmanship. But it is not the most beautiful object: the throne's backrest, depicting him and Ankhesenamun in the rays of the sun Aten, is one of history's most moving images of marriage and intimacy.",
      tr: "Tutankhamun, tarihin en ünlü firavunudur — yaşamındaki başarıları nedeniyle değil, Howard Carter'ın 4 Kasım 1922'de açtığı dokunulmamış mezar odası nedeniyle.",
    },
    reforms: {
      sv: [
        "Återupprättade Amun-kulten och den traditionella polyteismen",
        "Övergav Akhetaten och återvände till Memphis och Thebe",
        "Återöppnade stängda tempel och återinsatte prästerskapet",
        "Återupprättade traditionell egyptisk konst och arkitektur",
        "Utfärdade ett edikt om att återupprätta fallen gudsstatyer och templar",
      ],
      en: [
        "Restored the Amun cult and traditional polytheism",
        "Abandoned Akhetaten and returned to Memphis and Thebes",
        "Reopened closed temples and reinstated the priesthood",
        "Restored traditional Egyptian art and architecture",
        "Issued an edict to restore fallen divine statues and temples",
      ],
      tr: [
        "Amun kültünü ve geleneksel çok tanrıcılığı yeniden kurdu",
        "Akhetaten'i terk ederek Memphis ve Thebe'ye döndü",
        "Kapalı tapınakları yeniden açtı ve rahipliği yeniden kurdu",
        "Geleneksel Mısır sanatı ve mimarisini yeniden canlandırdı",
      ],
    },
    campaigns: {
      sv: [
        "Begränsade militäroperationer i Nubia och Syrien (troligen ledda av generaler)",
      ],
      en: [
        "Limited military operations in Nubia and Syria (likely led by generals)",
      ],
      tr: [
        "Nubya ve Suriye'de sınırlı askeri operasyonlar (muhtemelen generaller tarafından yürütüldü)",
      ],
    },
    leadershipStyle: {
      sv: "Tutankhamun var sannolikt en marionettkung dominerad av sina rådgivare Ay och Horemheb. Hans ungdom och hälsoproblem (DNA-analys avslöjar multipla sjukdomar och incestuösa föräldrar) begränsade hans handlingsutrymme. Men hans edikt om att återupprätta de gamla gudarna var ett politisk nödvändigt beslut som räddade Egyptens enhet efter Akhenatens splittrade experiment.",
      en: "Tutankhamun was likely a puppet king dominated by his advisors Ay and Horemheb. His youth and health problems (DNA analysis reveals multiple diseases and incestuous parents) limited his room for action. But his edict restoring the old gods was a politically necessary decision that saved Egypt's unity after Akhenaten's divisive experiment.",
      tr: "Tutankhamun muhtemelen danışmanları Ay ve Horemheb tarafından yönetilen bir kukla kraldı.",
    },
    criticalPerspectives: {
      sv: "Tutankhamuns historiska paradox är komplett: han är den mest kände faraonen men en av de minst viktiga under sin livstid. Hans grav, som Howard Carter öppnade efter år av grävande, är det rikaste arkeologiska fynd i historien — men den är rik på grund av att han dog ung och begravdes hastigt. Hans 'Faraonens förbannelse' — den mediekaraktärisering av dödsfallen bland Carters grävlag — är ett av journalistikens mest berömda myter: en vetenskaplig undersökning 2002 fann inga ökade dödsrisker bland dem som deltog i grävningen.",
      en: "Tutankhamun's historical paradox is complete: he is the most famous pharaoh but one of the least important during his lifetime. His tomb, which Howard Carter opened after years of excavation, is the richest archaeological find in history — but it is rich because he died young and was buried hastily. The 'Pharaoh's Curse' — the media characterization of deaths among Carter's excavation team — is one of journalism's most famous myths: a scientific study in 2002 found no increased mortality risks among those who participated in the excavation.",
      tr: "Tutankhamun'un tarihsel paradoksu tamdır: en ünlü firavun ama yaşamı boyunca en az önemli olanlardan biri.",
    },
  },
  {
    id: "cleopatra7",
    name: "Cleopatra VII",
    years: "69–30 f.Kr.",
    title: {
      sv: "Egyptens siste farao — Drottning av kungar",
      en: "Egypt's Last Pharaoh — Queen of Kings",
      tr: "Mısır'ın Son Firavunu — Kralların Kraliçesi",
    },
    portrait: "🐍",
    bio: {
      sv: "Kleopatra VII är en av historiens mest missrepresenterade historiska figurer. Populärkultur har reducerat henne till ett romantiskt objekt — Elisabeths Taylors kohl-ögon och sensuella skönhet. Sanningen är mer komplex och mer imponerande. Kleopatra var en skarpsinning politisk strateg, en kunnig lingvist (hon talade nio språk, inklusive egyptiska — den förste ptolemaiska monarken att göra det), och en filosof utbildad i Alexandria. Hennes allianser med Caesar och Antonius var inte kärlek — de var politiska kalkyler i ett desperat spel för att bevara Egyptens oberoende mot Roms allt överskuggande makt. Hon försökte använda Roms militärmakt för att göra Egypten till den dominerande makten i det östra Medelhavsområdet. Det misslyckades — men det var ett audacious försök.",
      en: "Cleopatra VII is one of history's most misrepresented historical figures. Popular culture has reduced her to a romantic object — Elizabeth Taylor's kohl eyes and sensual beauty. The truth is more complex and more impressive. Cleopatra was a sharp political strategist, a knowledgeable linguist (she spoke nine languages, including Egyptian — the first Ptolemaic monarch to do so), and a philosopher educated in Alexandria. Her alliances with Caesar and Antony were not love — they were political calculations in a desperate game to preserve Egypt's independence against Rome's ever-overshadowing power. She tried to use Rome's military power to make Egypt the dominant power in the eastern Mediterranean. It failed — but it was an audacious attempt.",
      tr: "VII. Kleopatra, tarihin en yanlış temsil edilen tarihi figürlerinden biridir. Popüler kültür onu romantik bir nesneye indirgedi — Elizabeth Taylor'ın kohllu gözleri ve duyusal güzelliği.",
    },
    reforms: {
      sv: [
        "Lärde sig egyptiska — den förste ptolemaiska monarken att tala det",
        "Presenterade sig för egyptiska undersåtar som Isis inkarnation",
        "Skapade ett strategiskt allianssystem med Rom",
        "Expanderade Egyptens ekonomiska territorium med caesarisk hjälp",
        "Stärkte Alexandrias position som handelsnav",
        "Finansierade och stödde egyptisk religion och tempel",
        "Etablerade diplomatiska relationer med Armenien, Parthien och Arabien",
      ],
      en: [
        "Learned Egyptian — the first Ptolemaic monarch to speak it",
        "Presented herself to Egyptian subjects as the incarnation of Isis",
        "Created a strategic alliance system with Rome",
        "Expanded Egypt's economic territory with Caesarian assistance",
        "Strengthened Alexandria's position as a trade hub",
        "Financed and supported Egyptian religion and temples",
        "Established diplomatic relations with Armenia, Parthia, and Arabia",
      ],
      tr: [
        "Mısırca öğrendi — bunu yapan ilk Ptolemaios hükümdarı",
        "Kendini Mısırlı tebaaya İsis'in enkarnasyonu olarak tanıttı",
        "Roma ile stratejik bir ittifak sistemi kurdu",
        "Sezar yardımıyla Mısır'ın ekonomik topraklarını genişletti",
        "İskenderiye'nin ticaret merkezi konumunu güçlendirdi",
      ],
    },
    campaigns: {
      sv: [
        "Allians med Julius Caesar (49–44 f.Kr.)",
        "Militärt samarbete med Marcus Antonius (41–30 f.Kr.)",
        "Aktium-kampanjen mot Octavianus (31 f.Kr.) — den avgörande förlusten",
        "Expansionen av Egyptens territorium med Antonius' hjälp",
      ],
      en: [
        "Alliance with Julius Caesar (49–44 BC)",
        "Military collaboration with Marcus Antony (41–30 BC)",
        "The Actium campaign against Octavian (31 BC) — the decisive defeat",
        "Expansion of Egypt's territory with Antony's assistance",
      ],
      tr: [
        "Julius Caesar ile ittifak (MÖ 49-44)",
        "Marcus Antonius ile askeri işbirliği (MÖ 41-30)",
        "Octavianus'a karşı Actium kampanyası (MÖ 31) — kesin yenilgi",
      ],
    },
    leadershipStyle: {
      sv: "Kleopatra var inte en romantisk hjältinna utan en kall-räknande maktspelare. Hon förstod att Egyptens överlevnad krävde en mäktig romersk allierad, och hon använde sin intellektuella charm, politiska intelligens och sexuella attraktion som diplomatiska verktyg. Det är viktigt att poängtera att Caesar och Antonius — mäktiga män i ett samhälle där makt var maskulin — inte 'föll' för Kleopatra av svaghet. De valde allianser med henne av politiska och strategiska skäl, vilket vittnar om hennes reella makt och kompetens.",
      en: "Cleopatra was not a romantic heroine but a cold-calculating power player. She understood that Egypt's survival required a powerful Roman ally, and she used her intellectual charm, political intelligence, and sexual attraction as diplomatic tools. It is important to note that Caesar and Antony — powerful men in a society where power was masculine — did not 'fall' for Cleopatra out of weakness. They chose alliances with her for political and strategic reasons, which testifies to her real power and competence.",
      tr: "Kleopatra romantik bir kahraman değil, soğuk kanlı bir güç oyuncusuydu.",
    },
    criticalPerspectives: {
      sv: "Kleopatras liv är ett av historiens mest manipulerade biografier. Romersk propaganda — skriven av hennes fiender, inklusive Augustus och hans historieskrivare — skildrade henne som en osedlig orientalisk drottning som korrumperade ädla romare. Denna bild dominerade västerländsk historiesyn i 2 000 år. Modern feministisk historieskrivning har återupprättat henne som en extraordinär politisk ledare vars fall berodde på geopolitiska omständigheter utom hennes kontroll. Det mest fascinerande faktum: vi vet inte hur hon såg ut. Ingen avbildning av henne gjord under hennes livstid överensstämmer med Elizabeths Taylors ikoniska version. Mynt och samtida skulpturer visar en kvinna med starka drag, men inte den konventionella skönheten populärkulturen förväntar sig.",
      en: "Cleopatra's life is one of history's most manipulated biographies. Roman propaganda — written by her enemies, including Augustus and his historians — depicted her as an immoral Oriental queen who corrupted noble Romans. This image dominated Western historical perspective for 2,000 years. Modern feminist historiography has restored her as an extraordinary political leader whose fall was due to geopolitical circumstances beyond her control. The most fascinating fact: we don't know what she looked like. No depiction of her made during her lifetime matches Elizabeth Taylor's iconic version. Coins and contemporary sculptures show a woman with strong features, but not the conventional beauty popular culture expects.",
      tr: "Kleopatra'nın hayatı tarihin en manipüle edilmiş biyografilerinden biridir.",
    },
  },
];

// =============================================================================
// QUIZ QUESTIONS
// =============================================================================

const egyptQuizQuestions: QuizQuestion[] = [
  {
    id: "eq1",
    topic: "culture",
    difficulty: "easy",
    question: {
      sv: "Vem uppförde den Stora Pyramiden i Giza?",
      en: "Who built the Great Pyramid at Giza?",
      tr: "Giza'daki Büyük Piramit'i kim inşa etti?",
    },
    options: {
      sv: ["Ramesses II", "Khufu (Cheops)", "Khafre", "Djoser"],
      en: ["Ramesses II", "Khufu (Cheops)", "Khafre", "Djoser"],
      tr: ["Ramses II", "Keops (Khufu)", "Kefren", "Djoser"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Khufu (Cheops) uppförde den Stora Pyramiden i Giza ca 2560 f.Kr. Den är 146,5 meter hög och består av ca 2,3 miljoner stenblock — det enda av de sju antikens underverk som fortfarande existerar.",
      en: "Khufu (Cheops) built the Great Pyramid at Giza around 2560 BC. It is 146.5 meters tall and consists of approximately 2.3 million stone blocks — the only one of the Seven Wonders of the Ancient World still existing.",
      tr: "Keops (Khufu), MÖ yaklaşık 2560'ta Giza'daki Büyük Piramit'i inşa etti. 146,5 metre yüksekliğinde ve yaklaşık 2,3 milyon taş bloktan oluşuyor.",
    },
  },
  {
    id: "eq2",
    topic: "politics",
    difficulty: "easy",
    question: {
      sv: "Vem enade Övre och Nedre Egypten för första gången?",
      en: "Who first united Upper and Lower Egypt?",
      tr: "Yukarı ve Aşağı Mısır'ı ilk kez kim birleştirdi?",
    },
    options: {
      sv: ["Ramesses II", "Hatshepsut", "Narmer (Menes)", "Ahmose I"],
      en: ["Ramesses II", "Hatshepsut", "Narmer (Menes)", "Ahmose I"],
      tr: ["Ramses II", "Hatşepsut", "Narmer (Menes)", "Ahmose I"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Narmer (även känd som Menes) enade Övre och Nedre Egypten ca 3100 f.Kr. och grundade den 1:a dynastin. Narmers paletten, hittad i Hierakonpolis, skildrar denna erövrande.",
      en: "Narmer (also known as Menes) united Upper and Lower Egypt around 3100 BC and founded the 1st dynasty. The Narmer Palette, found at Hierakonpolis, depicts this conquest.",
      tr: "Narmer (Menes olarak da bilinir), MÖ yaklaşık 3100'de Yukarı ve Aşağı Mısır'ı birleştirerek 1. hanedanı kurdu.",
    },
  },
  {
    id: "eq3",
    topic: "culture",
    difficulty: "easy",
    question: {
      sv: "Vad heter det egyptiska skriftsystemet med bildtecken?",
      en: "What is the Egyptian writing system using pictographic signs called?",
      tr: "Resimsel işaretler kullanan Mısır yazı sisteminin adı nedir?",
    },
    options: {
      sv: ["Kilskrift", "Hieroglyfer", "Demotisk skrift", "Koptiska"],
      en: ["Cuneiform", "Hieroglyphs", "Demotic script", "Coptic"],
      tr: ["Çivi yazısı", "Hiyeroglif", "Demotik yazı", "Kıptice"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Hieroglyfer (från det grekiska 'heieroglyphikos' — 'heligt ristande') var det egyptiska skriftsystemet som användes från ca 3200 f.Kr. till ca 394 e.Kr. Rosettastenen, hittad 1799, möjliggjorde för Champollion att dekryptera skriften 1822.",
      en: "Hieroglyphs (from the Greek 'hieroglyphikos' — 'sacred carving') were the Egyptian writing system used from approximately 3200 BC to approximately 394 AD. The Rosetta Stone, found in 1799, enabled Champollion to decrypt the script in 1822.",
      tr: "Hiyeroglifler (Yunanca 'hieroglyphikos' — 'kutsal oyma'dan), yaklaşık MÖ 3200'den yaklaşık MS 394'e kadar kullanılan Mısır yazı sistemiydi.",
    },
  },
  {
    id: "eq4",
    topic: "politics",
    difficulty: "medium",
    question: {
      sv: "Vilken farao genomförde en religiös revolution och instiftade dyrkan av en enda gud?",
      en: "Which pharaoh carried out a religious revolution and instituted worship of a single god?",
      tr: "Hangi firavun dini bir devrim gerçekleştirdi ve tek bir tanrıya tapınmayı kurdu?",
    },
    options: {
      sv: ["Ramesses II", "Thutmosis III", "Akhenaten", "Tutankhamun"],
      en: ["Ramesses II", "Thutmose III", "Akhenaten", "Tutankhamun"],
      tr: ["Ramses II", "III. Thutmose", "Akhenaten", "Tutankhamun"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Akhenaten (tidigare Amenhotep IV) avskaffade Egyptens polyteism och instiftade dyrkan av Aten — solskivan — som den enda guden. Han grundade den nya huvudstaden Akhetaten (Tell el-Amarna) och stängde Amuns tempel. Hans revolution kollapsade vid hans död.",
      en: "Akhenaten (formerly Amenhotep IV) abolished Egypt's polytheism and instituted worship of Aten — the sun disk — as the single god. He founded the new capital Akhetaten (Tell el-Amarna) and closed Amun's temples. His revolution collapsed at his death.",
      tr: "Akhenaten (eski adıyla IV. Amenhotep), Mısır'ın çok tanrıcılığını kaldırdı ve güneş diski Aten'e tek tanrı olarak tapınmayı kurdu.",
    },
  },
  {
    id: "eq5",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Vad är det äldsta kända fredsavtalet i världen?",
      en: "What is the oldest known peace treaty in the world?",
      tr: "Dünyanın bilinen en eski barış antlaşması hangisidir?",
    },
    options: {
      sv: ["Westfaliska freden", "Kadesh-fördraget", "Amarna-breven", "Versaillesfördraget"],
      en: ["Peace of Westphalia", "Treaty of Kadesh", "Amarna Letters", "Treaty of Versailles"],
      tr: ["Vestfalya Antlaşması", "Kadeş Antlaşması", "Amarna Mektupları", "Versay Antlaşması"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Kadesh-fördraget, slutet mellan Ramesses II och den hettitiske kungen Hattusili III ca 1259 f.Kr., är det äldsta kända bevarade fredsavtalet i världen. En kopia finns idag på FN:s högkvarter i New York.",
      en: "The Treaty of Kadesh, concluded between Ramesses II and the Hittite king Hattusili III around 1259 BC, is the oldest known surviving peace treaty in the world. A copy is displayed today at the UN headquarters in New York.",
      tr: "Ramses II ile Hitit Kralı III. Hattusili arasında yaklaşık MÖ 1259'da imzalanan Kadeş Antlaşması, dünyada bilinen en eski barış antlaşmasıdır.",
    },
  },
  {
    id: "eq6",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vilken arkeolog öppnade Tutankhamuns orörda grav 1922?",
      en: "Which archaeologist opened Tutankhamun's untouched tomb in 1922?",
      tr: "Hangi arkeolog 1922'de Tutankhamun'un dokunulmamış mezarını açtı?",
    },
    options: {
      sv: ["Heinrich Schliemann", "Howard Carter", "Flinders Petrie", "Jean-François Champollion"],
      en: ["Heinrich Schliemann", "Howard Carter", "Flinders Petrie", "Jean-François Champollion"],
      tr: ["Heinrich Schliemann", "Howard Carter", "Flinders Petrie", "Jean-François Champollion"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Howard Carter öppnade Tutankhamuns grav (KV62) i Konungarnas dal den 4 november 1922 efter år av grävande finansierat av Lord Carnarvon. Graven innehöll 5 398 föremål av enastående skönhet, inklusive den berömda gyllene dödmasken.",
      en: "Howard Carter opened Tutankhamun's tomb (KV62) in the Valley of the Kings on November 4, 1922, after years of excavation funded by Lord Carnarvon. The tomb contained 5,398 objects of outstanding beauty, including the famous golden death mask.",
      tr: "Howard Carter, Lord Carnarvon tarafından finanse edilen yıllarca süren kazının ardından 4 Kasım 1922'de Konular Vadisi'ndeki Tutankhamun'un mezarını (KV62) açtı.",
    },
  },
  {
    id: "eq7",
    topic: "politics",
    difficulty: "medium",
    question: {
      sv: "Vad hette det folk som invaderade och kontrollerade norra Egypten ca 1650-1550 f.Kr.?",
      en: "What was the name of the people who invaded and controlled northern Egypt around 1650-1550 BC?",
      tr: "MÖ yaklaşık 1650-1550'de kuzey Mısır'ı işgal eden ve kontrol eden halkın adı neydi?",
    },
    options: {
      sv: ["Assyrierna", "Hyksos", "Hethiterna", "Perserna"],
      en: ["Assyrians", "Hyksos", "Hittites", "Persians"],
      tr: ["Asurlular", "Hiksos", "Hititler", "Persler"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Hyksos — ett folk av semitiskt ursprung från Levanten — erövrade norra Egypten och etablerade Avaris som sin huvudstad under den Andra Mellantiden. De introducerade hästar, stridsvagnar och kompositbågar till Egypten. Ahmose I fördrev dem ca 1550 f.Kr.",
      en: "The Hyksos — a people of Semitic origin from the Levant — conquered northern Egypt and established Avaris as their capital during the Second Intermediate Period. They introduced horses, chariots, and composite bows to Egypt. Ahmose I expelled them around 1550 BC.",
      tr: "Hiksos — Levant'tan Sami kökenli bir halk — İkinci Ara Dönem'de kuzey Mısır'ı fethederek Avaris'i başkent olarak kurdu.",
    },
  },
  {
    id: "eq8",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vem var arkitekten bakom Djosers stegpyramid — historiens förste kände arkitekt?",
      en: "Who was the architect behind Djoser's Step Pyramid — history's first known architect?",
      tr: "Djoser'in Basamaklı Piramidi'nin mimarı — tarihin ilk bilinen mimarı — kimdi?",
    },
    options: {
      sv: ["Senenmut", "Hemiunu", "Imhotep", "Kha"],
      en: ["Senenmut", "Hemiunu", "Imhotep", "Kha"],
      tr: ["Senenmut", "Hemiunu", "İmhotep", "Kha"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Imhotep var Djosers geniala arkitekt, läkare och statsmannen. Han uppförde Stegpyramiden i Saqqara — historiens första stenmonument. Han gudomliggjordes efter sin död och dyrkades som en läkegud. Han är historiens förste kände individ med ett yrke.",
      en: "Imhotep was Djoser's brilliant architect, physician, and statesman. He erected the Step Pyramid at Saqqara — history's first stone monument. He was deified after his death and worshipped as a healing god. He is history's first known individual with a profession.",
      tr: "İmhotep, Djoser'in parlak mimarı, hekimi ve devlet adamıydı. Tarihin ilk taş anıtı olan Saqqara'daki Basamaklı Piramit'i inşa etti.",
    },
  },
  {
    id: "eq9",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Vilket slag ca 1457 f.Kr. anses vara det första slag i historien som dokumenterats i detalj?",
      en: "Which battle around 1457 BC is considered the first battle in history documented in detail?",
      tr: "MÖ yaklaşık 1457'deki hangi savaş tarihteki ilk ayrıntılı olarak belgelenen savaş olarak kabul edilir?",
    },
    options: {
      sv: ["Slaget vid Kadesh", "Slaget vid Megiddo", "Slaget vid Aktium", "Slaget vid Karkemish"],
      en: ["Battle of Kadesh", "Battle of Megiddo", "Battle of Actium", "Battle of Carchemish"],
      tr: ["Kadeş Muharebesi", "Megiddo Muharebesi", "Actium Muharebesi", "Karkamış Muharebesi"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Slaget vid Megiddo (ca 1457 f.Kr.), lett av Thutmosis III mot en kanaaneisk koalition, är det första slag i historien som dokumenterats i detalj. Thutmosis III:s annaler på Karnaks tempelmurar beskriver taktik, truppstyrkor och resultat.",
      en: "The Battle of Megiddo (c. 1457 BC), led by Thutmose III against a Canaanite coalition, is the first battle in history documented in detail. Thutmose III's annals on Karnak's temple walls describe tactics, troop strengths, and results.",
      tr: "III. Thutmose'nin bir Kenan koalisyonuna karşı yönettiği Megiddo Muharebesi (yaklaşık MÖ 1457), tarihte ayrıntılı olarak belgelenen ilk savaştır.",
    },
  },
  {
    id: "eq10",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad heter den religiösa text som anvisar den döde faraons resa genom dödsriket, hittad i Konungarnas dal?",
      en: "What is the religious text guiding the dead pharaoh's journey through the underworld, found in the Valley of the Kings?",
      tr: "Konular Vadisi'nde bulunan, ölü firavunun yeraltı dünyasındaki yolculuğunu anlatan dini metnin adı nedir?",
    },
    options: {
      sv: ["Dödsboken", "Amduat", "Pyramidtexterna", "Koffintualisterna"],
      en: ["Book of the Dead", "Amduat", "Pyramid Texts", "Coffin Texts"],
      tr: ["Ölüler Kitabı", "Amduat", "Piramit Metinleri", "Tabut Metinleri"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Amduat ('Det som är i underjorden') är en religiös text hittad i kung gravarna i Konungarnas dal, och avbildar faraons nattliga resa med solguden Ra genom de tolv timmarna av natten. Thutmosis III:s grav innehåller ett av de vackraste exemplen.",
      en: "The Amduat ('That which is in the underworld') is a religious text found in royal tombs in the Valley of the Kings, depicting the pharaoh's nocturnal journey with the sun god Ra through the twelve hours of the night. Thutmose III's tomb contains one of the most beautiful examples.",
      tr: "Amduat ('Yeraltı dünyasındakiler'), Konular Vadisi'ndeki kraliyet mezarlarında bulunan, firavunun güneş tanrısı Ra ile gecenin on iki saatindeki gece yolculuğunu anlatan dini bir metindir.",
    },
  },
  {
    id: "eq11",
    topic: "religion",
    difficulty: "easy",
    question: {
      sv: "Vilken egyptisk gud är förknippad med dödsriket och uppståndelsen?",
      en: "Which Egyptian god is associated with the underworld and resurrection?",
      tr: "Hangi Mısır tanrısı yeraltı dünyası ve diriliş ile ilişkilendirilir?",
    },
    options: {
      sv: ["Ra", "Osiris", "Horus", "Thot"],
      en: ["Ra", "Osiris", "Horus", "Thoth"],
      tr: ["Ra", "Osiris", "Horus", "Thot"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Osiris var den egyptiske guden för dödsriket, uppståndelsen och det eviga livet. Enligt myten mördades han av sin bror Seth, styckades och återuppväcktes av sin hustru Isis. Hans öde var paradigmatiskt för alla egyptiers hopp om livet efter döden.",
      en: "Osiris was the Egyptian god of the underworld, resurrection, and eternal life. According to myth, he was murdered by his brother Seth, dismembered, and resurrected by his wife Isis. His fate was paradigmatic for all Egyptians' hopes for life after death.",
      tr: "Osiris, yeraltı dünyasının, dirilişin ve sonsuz yaşamın Mısır tanrısıydı. Efsaneye göre kardeşi Seth tarafından öldürüldü, parçalandı ve eşi İsis tarafından yeniden dirildi.",
    },
  },
  {
    id: "eq12",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vilket egyptiskt monument hjälpte Jean-François Champollion att dechiffrera hieroglyferna 1822?",
      en: "Which Egyptian monument helped Jean-François Champollion decipher hieroglyphs in 1822?",
      tr: "Hangi Mısır anıtı Jean-François Champollion'un 1822'de hiyeroglifleri deşifre etmesine yardımcı oldu?",
    },
    options: {
      sv: ["Narmers paletten", "Rosettastenen", "Amarna-breven", "Ebers-papyrusen"],
      en: ["Narmer Palette", "Rosetta Stone", "Amarna Letters", "Ebers Papyrus"],
      tr: ["Narmer Paleti", "Rozet Taşı", "Amarna Mektupları", "Ebers Papirüsü"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Rosettastenen, hittad av franska soldater under Napoleons egyptiska expedition 1799, bär samma text på tre skriftspråk: hieroglyfer, demotisk skrift och klassisk grekiska. Jean-François Champollion använde den för att dechiffrera hieroglyferna 1822.",
      en: "The Rosetta Stone, found by French soldiers during Napoleon's Egyptian expedition in 1799, bears the same text in three scripts: hieroglyphs, demotic script, and classical Greek. Jean-François Champollion used it to decipher hieroglyphs in 1822.",
      tr: "Napoléon'un Mısır seferi sırasında 1799'da Fransız askerler tarafından bulunan Rozet Taşı, üç yazıda aynı metni taşıyor: hiyeroglif, demotik yazı ve klasik Yunanca.",
    },
  },
  {
    id: "eq13",
    topic: "politics",
    difficulty: "medium",
    question: {
      sv: "Vilket folk besegrade den egyptiske faraon Ramesses III i Nildeltats närheten ca 1175 f.Kr.?",
      en: "Which people did the Egyptian pharaoh Ramesses III defeat near the Nile Delta around 1175 BC?",
      tr: "MÖ yaklaşık 1175'te Mısır Firavunu III. Ramses Nil Deltası yakınında hangi halkı yendi?",
    },
    options: {
      sv: ["Hethiterna", "Assyrierna", "Sjöfolken (Sea Peoples)", "Babylonierna"],
      en: ["Hittites", "Assyrians", "Sea Peoples", "Babylonians"],
      tr: ["Hititler", "Asurlular", "Deniz Kavimleri", "Babilliler"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Ramesses III besegrade sjöfolken (Sea Peoples) — mystiska migrerande stammar som terroriserade det östra Medelhavsområdet — i land- och sjöslag ca 1175 f.Kr. Dessa slag skildras på murarna av Medinet Habu-templet i Luxor.",
      en: "Ramesses III defeated the Sea Peoples — mysterious migrating tribes that terrorized the eastern Mediterranean — in land and sea battles around 1175 BC. These battles are depicted on the walls of the Medinet Habu temple in Luxor.",
      tr: "III. Ramses, doğu Akdeniz'i terörize eden gizemli göç eden kabileler olan Deniz Kavimleri'ni yaklaşık MÖ 1175'te kara ve deniz savaşlarında yendi.",
    },
  },
  {
    id: "eq14",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas de religiösa texterna skrivna på gravkistor under Mellersta Riket — en demokratisering av livet efter döden?",
      en: "What are the religious texts written on coffins during the Middle Kingdom called — a democratization of the afterlife?",
      tr: "Orta Krallık döneminde tabutlara yazılan dini metinlere — öte dünyanın demokratikleşmesi — ne denir?",
    },
    options: {
      sv: ["Dödsboken", "Koffintexterna (Coffin Texts)", "Pyramidtexterna", "Amduat"],
      en: ["Book of the Dead", "Coffin Texts", "Pyramid Texts", "Amduat"],
      tr: ["Ölüler Kitabı", "Tabut Metinleri", "Piramit Metinleri", "Amduat"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Koffintexterna (Coffin Texts) var religiösa texter skrivna direkt på trägravkistor under Mellersta Riket (ca 2055–1650 f.Kr.). De var en demokratisering av de äldre Pyramidtexterna som bara faraoner hade tillgång till — nu kunde även icke-kungliga sträva efter det eviga livet.",
      en: "The Coffin Texts were religious texts written directly on wooden coffins during the Middle Kingdom (c. 2055–1650 BC). They represented a democratization of the older Pyramid Texts that only pharaohs had access to — now non-royals could also strive for eternal life.",
      tr: "Tabut Metinleri, Orta Krallık döneminde (yaklaşık MÖ 2055-1650) doğrudan ahşap tabutlara yazılan dini metinlerdi. Yalnızca firavunların erişebildiği eski Piramit Metinleri'nin demokratikleşmesini temsil ediyorlardı.",
    },
  },
  {
    id: "eq15",
    topic: "religion",
    difficulty: "medium",
    question: {
      sv: "Vilken egyptisk gud representerades med ett falkenhuvud och förknippades med faraon?",
      en: "Which Egyptian god was represented with a falcon head and associated with the pharaoh?",
      tr: "Hangi Mısır tanrısı şahin başıyla temsil edildi ve firavunla ilişkilendirildi?",
    },
    options: {
      sv: ["Anubis", "Seth", "Thot", "Horus"],
      en: ["Anubis", "Seth", "Thoth", "Horus"],
      tr: ["Anubis", "Seth", "Thot", "Horus"],
    },
    correctIndex: 3,
    explanation: {
      sv: "Horus, falken-guden, var en av de viktigaste gudarna i det egyptiska panteon. Han representerade kungamakten och identifierades med den levande faraon. Hans kampe mot Seth — berättelsen om Osiris son som hämnas sin fars mord — var en central skapelsemyt om ordning mot kaos.",
      en: "Horus, the falcon god, was one of the most important gods in the Egyptian pantheon. He represented royal power and was identified with the living pharaoh. His struggle against Seth — the story of Osiris's son avenging his father's murder — was a central creation myth about order versus chaos.",
      tr: "Şahin tanrısı Horus, Mısır panteonunun en önemli tanrılarından biriydi. Kraliyet iktidarını temsil etti ve yaşayan firavunla özdeşleştirildi.",
    },
  },
  {
    id: "eq16",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas den egyptiska processen att bevara ett lik för evigheten?",
      en: "What is the Egyptian process of preserving a body for eternity called?",
      tr: "Bir bedeni sonsuzluk için koruma amacıyla kullanılan Mısır sürecine ne denir?",
    },
    options: {
      sv: ["Kanoser", "Mumifiering", "Nekropolis", "Shabtization"],
      en: ["Canopics", "Mummification", "Necropolis", "Shabtization"],
      tr: ["Kanopik", "Mumyalama", "Nekropolis", "Shabti"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Mumifiering var den egyptiska processen för att bevara kroppen för det eviga livet. Processen tog 70 dagar och inkluderade avlägsnande av de inre organen (förvarade i kanopekrukor), torkning av kroppen med natron-salt, och omslagning med linnebandage. Hjärnan drogs ut genom näsan med en krok.",
      en: "Mummification was the Egyptian process for preserving the body for eternal life. The process took 70 days and included removal of internal organs (stored in canopic jars), drying the body with natron salt, and wrapping in linen bandages. The brain was extracted through the nose with a hook.",
      tr: "Mumyalama, bedeni sonsuz yaşam için korumanın Mısır süreciydi. Süreç 70 gün sürdü ve iç organların çıkarılmasını (kanik kaplarda saklandı), natron tuzu ile bedenin kurutulmasını ve keten bandajla sarılmayı içeriyordu.",
    },
  },
  {
    id: "eq17",
    topic: "expansion",
    difficulty: "medium",
    question: {
      sv: "Vilken exotisk destination skickade Hatshepsut sina handelssexpeditioner till?",
      en: "What exotic destination did Hatshepsut send her trading expeditions to?",
      tr: "Hatşepsut ticaret seferlerini hangi egzotik hedefe gönderdi?",
    },
    options: {
      sv: ["Mesopotamien", "Indien", "Punt", "Kartago"],
      en: ["Mesopotamia", "India", "Punt", "Carthage"],
      tr: ["Mezopotamya", "Hindistan", "Punt", "Kartaca"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Hatshepsuts expedition till Punt (troligen nutidens Somalia/Eritrea) var en av historiens mest framgångsrika handelsexpeditioner. De hemförde myrra, ebenholz, elefantben, guld och levande myrraträd. Expeditionen skildras i detalj på väggarna av hennes mortuarietempel i Deir el-Bahari.",
      en: "Hatshepsut's expedition to Punt (likely modern-day Somalia/Eritrea) was one of history's most successful trading expeditions. They brought back myrrh, ebony, ivory, gold, and living myrrh trees. The expedition is depicted in detail on the walls of her mortuary temple at Deir el-Bahari.",
      tr: "Hatşepsut'un Punt'a (muhtemelen günümüz Somali/Eritresi) düzenlediği sefer, tarihin en başarılı ticaret seferlerinden biriydi.",
    },
  },
  {
    id: "eq18",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas den egyptiska religionens lära om det moraliska domslutet vid döden?",
      en: "What is the Egyptian religion's doctrine about the moral judgment at death called?",
      tr: "Ölümdeki ahlaki yargılama hakkındaki Mısır dini öğretisine ne ad verilir?",
    },
    options: {
      sv: ["Osiris-rättegången", "Hjärtats vägning", "Ma'at-domslutet", "Anubis-ceremoni"],
      en: ["The Osiris Trial", "The Weighing of the Heart", "The Ma'at Judgment", "The Anubis Ceremony"],
      tr: ["Osiris Davası", "Kalbin Tartılması", "Ma'at Yargılaması", "Anubis Töreni"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Hjärtats vägning var den centrala ceremonin i den egyptiska dödsreligionen. Enligt tron vägdes den dödes hjärta mot ma'ats fjäder (rättvisa och sanning) av guden Anubis. Om hjärtat var lättare än fjädern uppnådde den döde evigt liv; om det var tyngre svaldes det av monstret Ammit.",
      en: "The Weighing of the Heart was the central ceremony in Egyptian death religion. According to belief, the deceased's heart was weighed against the feather of Ma'at (justice and truth) by the god Anubis. If the heart was lighter than the feather, the deceased achieved eternal life; if heavier, it was swallowed by the monster Ammit.",
      tr: "Kalbin Tartılması, Mısır ölüm dininin merkezi töreniydi. İnanca göre, ölenin kalbi Anubis tanrısı tarafından Ma'at'ın tüyüne (adalet ve gerçek) karşı tartıldı.",
    },
  },
  {
    id: "eq19",
    topic: "politics",
    difficulty: "advanced",
    question: {
      sv: "Vilken nubisk farao nämns i Bibeln (2 Kungaboken) och kämpade mot det assyriska hotet?",
      en: "Which Nubian pharaoh is mentioned in the Bible (2 Kings) and fought against the Assyrian threat?",
      tr: "İncil'de (2. Krallar) bahsedilen ve Asur tehdidine karşı savaşan Nubian firavun kimdi?",
    },
    options: {
      sv: ["Piye", "Shabaka", "Taharqa", "Tantamani"],
      en: ["Piye", "Shabaka", "Taharqa", "Tantamani"],
      tr: ["Piye", "Şabaka", "Taharqa", "Tantamani"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Taharqa, den mäktigaste av den nubiska 25:e dynastins faraoner, nämns i 2 Kungaboken 19:9 som 'Tirhaka, kungen av Etiopien' i samband med Assyriens belägring av Jerusalem. Han byggde enorma monument och förstärkte Karnak-templet.",
      en: "Taharqa, the most powerful pharaoh of the Nubian 25th dynasty, is mentioned in 2 Kings 19:9 as 'Tirhakah, king of Ethiopia' in connection with Assyria's siege of Jerusalem. He built enormous monuments and reinforced the Karnak temple.",
      tr: "Nubian 25. hanedanın en güçlü firavunu Taharqa, Asur'un Kudüs'ü kuşatmasıyla bağlantılı olarak 2. Krallar 19:9'da 'Tiraka, Etiyopya Kralı' olarak geçer.",
    },
  },
  {
    id: "eq20",
    topic: "culture",
    difficulty: "advanced",
    question: {
      sv: "Vad kallas den egyptiska lagen om kosmisk ordning, rättvisa och sanning som genomsyrar all egyptisk teologi?",
      en: "What is the Egyptian concept of cosmic order, justice, and truth that permeates all Egyptian theology called?",
      tr: "Tüm Mısır teolojisine işlemiş kozmik düzen, adalet ve gerçek Mısır kavramına ne denir?",
    },
    options: {
      sv: ["Ka", "Ba", "Ma'at", "Akh"],
      en: ["Ka", "Ba", "Ma'at", "Akh"],
      tr: ["Ka", "Ba", "Ma'at", "Akh"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Ma'at var det egyptiska konceptet för kosmisk ordning, rättvisa, sanning och harmoni. Det personifierades som en gudinna med en fjäder. Alla faraoner regerade 'i ma'ats namn' — att upprätthålla kosmisk ordning var deras centrala religiösa och politiska uppdrag. Utan ma'at skulle universum falla i kaos.",
      en: "Ma'at was the Egyptian concept of cosmic order, justice, truth, and harmony. It was personified as a goddess with a feather. All pharaohs ruled 'in the name of ma'at' — maintaining cosmic order was their central religious and political mission. Without ma'at, the universe would fall into chaos.",
      tr: "Ma'at, kozmik düzen, adalet, gerçek ve uyumun Mısır kavramıydı. Bir tüyle tanrıça olarak kişileştirildi. Tüm firavunlar 'Ma'at adına' hüküm sürdü.",
    },
  },
];

// =============================================================================
// BADGES
// =============================================================================

const egyptBadges: Badge[] = [
  {
    id: "apprentice-scribe",
    name: {
      sv: "Lärlingsskriven",
      en: "Apprentice Scribe",
      tr: "Çırak Kâtip",
    },
    icon: "📜",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor — som en ung skrivarlärling i Egyptens Per-Ankh (Livets hus).",
      en: "Answer 3 questions correctly — like a young scribal apprentice in Egypt's Per-Ankh (House of Life).",
      tr: "3 soruyu doğru yanıtlayın — Mısır'ın Per-Ankh'ındaki (Yaşam Evi) genç bir kâtip çırağı gibi.",
    },
  },
  {
    id: "temple-priest",
    name: {
      sv: "Tempelprästen",
      en: "Temple Priest",
      tr: "Tapınak Rahibi",
    },
    icon: "⚱️",
    requiredScore: 7,
    description: {
      sv: "Svara rätt på 7 frågor — som en präst i Amuns stora tempel i Karnak.",
      en: "Answer 7 questions correctly — like a priest in Amun's great temple at Karnak.",
      tr: "7 soruyu doğru yanıtlayın — Karnak'ta Amun'un büyük tapınağındaki bir rahip gibi.",
    },
  },
  {
    id: "royal-vizier",
    name: {
      sv: "Kunglig Vezir",
      en: "Royal Vizier",
      tr: "Kraliyet Veziri",
    },
    icon: "🦅",
    requiredScore: 12,
    description: {
      sv: "Svara rätt på 12 frågor — som faraonens vise vezir, Egyptens mäktigaste ämbetsman.",
      en: "Answer 12 questions correctly — like the pharaoh's wise vizier, Egypt's most powerful official.",
      tr: "12 soruyu doğru yanıtlayın — Mısır'ın en güçlü görevlisi olan firavunun bilge veziri gibi.",
    },
  },
  {
    id: "living-god",
    name: {
      sv: "Den levande guden",
      en: "The Living God",
      tr: "Yaşayan Tanrı",
    },
    icon: "☀️",
    requiredScore: 18,
    description: {
      sv: "Svara rätt på alla 18 frågor — som faraon själv, Ra:s son och Egyptens levande gudomlighet.",
      en: "Answer all 18 questions correctly — like the pharaoh himself, son of Ra and Egypt's living divinity.",
      tr: "Tüm 18 soruyu doğru yanıtlayın — Ra'nın oğlu ve Mısır'ın yaşayan tanrısı olan firavunun kendisi gibi.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const egyptTerritories: TerritoryPeriod[] = [
  {
    yearStart: -3100,
    yearEnd: -2181,
    label: {
      sv: "Det Gamla Riket — Egyptens kärna",
      en: "The Old Kingdom — Egypt's Core",
      tr: "Eski Krallık — Mısır'ın Çekirdeği",
    },
    color: "#C8860A",
    polygon: [[
      [31.5, 25.0], [31.5, 35.0], [27.0, 37.0], [22.0, 37.0],
      [20.0, 36.0], [22.0, 33.0], [24.0, 32.0], [26.0, 30.0],
      [28.0, 28.0], [29.0, 26.0], [30.0, 25.0], [31.5, 25.0],
    ]],
  },
  {
    yearStart: -1550,
    yearEnd: -1069,
    label: {
      sv: "Det Nya Riket — Imperiets maximum",
      en: "The New Kingdom — Maximum Empire",
      tr: "Yeni Krallık — Maksimum İmparatorluk",
    },
    color: "#D4A017",
    polygon: [[
      [37.0, 26.0], [37.0, 30.0], [35.0, 34.0], [32.0, 37.0],
      [31.0, 35.5], [30.5, 33.0], [29.5, 32.0], [29.0, 30.5],
      [28.0, 29.0], [26.0, 30.0], [24.0, 32.0], [22.0, 33.0],
      [18.0, 33.0], [15.0, 32.0], [13.0, 30.0], [14.0, 28.0],
      [17.0, 26.0], [20.0, 24.0], [23.0, 23.0], [26.0, 22.0],
      [29.0, 22.0], [31.0, 23.0], [33.0, 24.0], [35.0, 25.0],
      [37.0, 26.0],
    ]],
  },
  {
    yearStart: -51,
    yearEnd: -30,
    label: {
      sv: "Ptolemaiska Egypten — Sista dynastin",
      en: "Ptolemaic Egypt — Last Dynasty",
      tr: "Ptolemaios Mısırı — Son Hanedan",
    },
    color: "#8B6914",
    polygon: [[
      [31.5, 25.0], [31.5, 35.5], [28.0, 35.5], [24.0, 33.0],
      [22.0, 33.0], [20.0, 31.0], [22.0, 28.0], [24.0, 26.0],
      [27.0, 25.0], [29.0, 24.0], [31.5, 25.0],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const egyptTradeRoutes: TradeRouteGeo[] = [
  {
    id: "nile-trade-route",
    name: {
      sv: "Nilens handelsväg — Egyptens livlina",
      en: "The Nile Trade Route — Egypt's Lifeline",
      tr: "Nil Ticaret Yolu — Mısır'ın Can Damarı",
    },
    yearActive: -2000,
    path: [
      [31.2, 30.0], [30.5, 31.2], [30.0, 32.5],
      [29.5, 33.5], [28.0, 32.0], [26.0, 32.5],
      [24.0, 32.7], [22.0, 32.9], [19.0, 33.2],
      [15.7, 32.5],
    ],
  },
  {
    id: "punt-expedition-route",
    name: {
      sv: "Punt-expeditionsvägen — Hatshepsuts legendariska rutt",
      en: "The Punt Expedition Route — Hatshepsut's Legendary Route",
      tr: "Punt Sefer Yolu — Hatşepsut'un Efsanevi Güzergahı",
    },
    yearActive: -1470,
    path: [
      [30.0, 32.5], [27.0, 34.0], [24.0, 36.0],
      [20.0, 38.0], [15.0, 40.0], [11.0, 42.0],
      [8.0, 43.0], [5.0, 44.0],
    ],
  },
  {
    id: "sinai-mining-route",
    name: {
      sv: "Sinaihalvöns gruvrutter — Turkos och koppar",
      en: "Sinai Peninsula Mining Routes — Turquoise and Copper",
      tr: "Sina Yarımadası Madencilik Güzergahları — Turkuaz ve Bakır",
    },
    yearActive: -2500,
    path: [
      [30.0, 31.2], [29.5, 32.0], [29.0, 32.5],
      [28.5, 33.2], [28.0, 33.8], [29.0, 34.5],
      [29.5, 34.9],
    ],
  },
  {
    id: "levant-trade-route",
    name: {
      sv: "Levanthandeln — Egypten möter Mesopotamien",
      en: "The Levant Trade Route — Egypt Meets Mesopotamia",
      tr: "Levant Ticaret Yolu — Mısır Mezopotamya ile Buluşuyor",
    },
    yearActive: -1400,
    path: [
      [30.0, 31.0], [31.0, 32.0], [31.5, 33.0],
      [32.0, 33.5], [33.0, 35.0], [34.0, 36.0],
      [35.0, 37.0], [36.0, 38.0],
    ],
  },
  {
    id: "nubia-gold-route",
    name: {
      sv: "Nubias guldrutt — Egyptens skattkammare",
      en: "The Nubia Gold Route — Egypt's Treasury",
      tr: "Nubya Altın Yolu — Mısır'ın Hazinesi",
    },
    yearActive: -1500,
    path: [
      [26.0, 32.5], [22.0, 32.9], [18.0, 33.2],
      [15.7, 32.5], [14.0, 31.5], [12.0, 30.5],
      [10.0, 29.5],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const egyptEmpire: EmpireConfig = {
  id: "ancient_egypt",
  name: {
    sv: "Forntida Egypten",
    en: "Ancient Egypt",
    tr: "Antik Mısır",
  },
  theme: "egypt",
  appTitle: "Ancient Egyptian Intelligence",
  crestImage: egyptLogo,
  backgroundImage: egyptBackground,
  leaderTitle: { sv: "Farao", en: "Pharaoh", tr: "Firavun" },
  dynastyTitle: {
    sv: "Egyptisk Dynasti",
    en: "Egyptian Dynasty",
    tr: "Mısır Hanedanı",
  },
  timeline: egyptTimeline,
  leaders: egyptLeaders,
  profiles: egyptProfiles,
  figures: [],
  quizQuestions: egyptQuizQuestions,
  badges: egyptBadges,
  territories: egyptTerritories,
  tradeRoutes: egyptTradeRoutes,
  mapCenter: [26, 30],
  mapZoom: 5,
  yearRange: [-3100, -30],
  yearDefault: -1279,
  chatSystemContext:
    "the Ancient Egyptian Civilization (3100–30 BC). You are a world-class expert on ancient Egyptian history covering the unification under Narmer, the Old Kingdom and pyramids, the Middle Kingdom renaissance, the New Kingdom imperial expansion, great pharaohs including Khufu, Hatshepsut, Thutmose III, Akhenaten, Tutankhamun, and Ramesses II, Egyptian religion and mythology including Ra, Osiris, Isis, Horus, and Ma'at, the hieroglyphic writing system, mummification practices, the Valley of the Kings, Egyptian art and architecture including the Great Pyramid and Sphinx, the Amarna period's religious revolution, the Ptolemaic period and Cleopatra VII, and the 3,000-year legacy of one of history's greatest civilizations. Treat this history with profound depth, scholarly precision, and immense respect for the extraordinary achievement of Egyptian civilization.",
  chatPlaceholders: {
    sv: "Ställ en fråga om Forntida Egypten...",
    en: "Ask a question about Ancient Egypt...",
    tr: "Antik Mısır hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Hur byggdes verkligen Stora pyramiden i Giza?",
      "Vad var Akhenatens religiösa revolution och var det monoteism?",
      "Vem var Kleopatra VII egentligen — bortom myten?",
    ],
    en: [
      "How was the Great Pyramid of Giza actually built?",
      "What was Akhenaten's religious revolution and was it monotheism?",
      "Who was Cleopatra VII really — beyond the myth?",
    ],
    tr: [
      "Giza'daki Büyük Piramit gerçekte nasıl inşa edildi?",
      "Akhenaten'in dini devrimi neydi ve tektanrıcılık mıydı?",
      "VII. Kleopatra efsanenin ötesinde gerçekte kimdi?",
    ],
  },
  homeDescription: {
    sv: "Utforska Forntida Egyptens 3000-åriga historia (3100–30 f.Kr.) — från Narmers enande av Nilens land till den siste faraonen Kleopatra VII — med AI-driven analys, faraonernas tidslinje, kartor och quiz.",
    en: "Explore Ancient Egypt's 3,000-year history (3100–30 BC) — from Narmer's unification of the Nile's land to the last pharaoh Cleopatra VII — with AI-driven analysis, pharaoh timelines, maps and quiz.",
    tr: "Antik Mısır'ın 3.000 yıllık tarihini (MÖ 3100–30) — Narmer'in Nil topraklarını birleştirmesinden son firavun VII. Kleopatra'ya — yapay zeka destekli analiz, firavun zaman çizelgeleri, haritalar ve quiz ile keşfedin.",
  },
  mapTitle: {
    sv: "Forntida Egyptens territorium och handelsvägar",
    en: "Ancient Egypt's Territory and Trade Routes",
    tr: "Antik Mısır'ın Toprakları ve Ticaret Yolları",
  },
};
