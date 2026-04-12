import maliBg from "@/assets/mali.jpg";
import maliLogo from "@/assets/mali2.jpg";
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
// TIMELINE — Mali Empire (1235–1600 AD) — 45+ events
// =============================================================================

const maliTimeline: TimelineEvent[] = [
  {
    year: 1230,
    title: {
      sv: "Sundiata Keitas uppgång — Legenden om lejonkungen börjar",
      en: "Sundiata Keita's Rise — The Legend of the Lion King Begins",
      tr: "Sundiata Keita'nın Yükselişi — Aslan Kral Efsanesi Başlıyor",
    },
    summary: {
      sv: "Sundiata Keita, son till Nare Maghann Konaté av Mandeklingens Keita-clan, föds enligt legenden med ett ödesbestämt syfte. Han tillbringar sin barndom i exil i Mema efter att hans folk Mandinka tvingats underkasta sig det mäktiga Sosso-riket under den brutale Sumanguru Kanté. Legenden berättar att Sundiata var lam som barn men reste sig och gick för att svinga ett järnspjut — ett mirakel som varslade om hans storhet. I exil samlade han allierade, studerade krigskonst och byggde upp en koalition av Mandinka-klaner och grannfolk som förberedelse för återerövringsfelttåget.",
      en: "Sundiata Keita, son of Nare Maghann Konaté of the Mande Keita clan, is born according to legend with a destined purpose. He spends his childhood in exile in Mema after his Mandinka people were subjugated by the mighty Sosso kingdom under the brutal Sumanguru Kanté. Legend tells that Sundiata was lame as a child but rose and walked to brandish an iron spear — a miracle foretelling his greatness. In exile he gathered allies, studied the art of war and built a coalition of Mandinka clans and neighbouring peoples in preparation for the reconquest campaign.",
      tr: "Sundiata Keita, Mande Keita klanından Nare Maghann Konaté'nin oğlu, efsaneye göre belirlenmiş bir amaçla doğar. Çocukluğunu sürgünde geçirir ve zamanını müttefik toplamak, savaş sanatını öğrenmek ve yeniden fetih seferine hazırlık yapmak için harcar.",
    },
    figures: ["Sundiata Keita", "Sumanguru Kanté", "Nare Maghann Konaté"],
    consequences: {
      sv: "Grunden för Malis framtida imperium börjar läggas i exilens skola.",
      en: "The foundation for Mali's future empire begins to be laid in the school of exile.",
      tr: "Mali'nin gelecekteki imparatorluğunun temeli sürgün okulunda atılmaya başlar.",
    },
    impact: {
      sv: "Sundiatas ledarskapslegend formar Mandinka-identiteten för generationer.",
      en: "Sundiata's leadership legend shapes Mandinka identity for generations.",
      tr: "Sundiata'nın liderlik efsanesi, Mandinka kimliğini nesiller boyunca şekillendirir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1235,
    title: {
      sv: "Slaget vid Kirina — Malis födelseögonblick",
      en: "Battle of Kirina — Mali's Birth Moment",
      tr: "Kirina Savaşı — Mali'nin Doğum Anı",
    },
    summary: {
      sv: "I det avgörande slaget vid Kirina möter Sundiata Keitas armé den fruktade Sumanguru Kanté av Sosso-riket. Enligt legenden var Sumanguru en mäktig trollkarl vars kraft kom från en magisk balafon och vars kropp var skyddat mot alla vapen — utom en sporr gjord av en vit tupp. Sundiatas halvbror Fakoli Kourouma, som defekterat från Sosso, använder den magiska tungan av en vit tupp på en pilspets. Pilen träffar Sumanguru och bryter hans magiska skydd. Sosso-armén splittras och Sundiata vinner en definitiv seger. Mali-imperiet föds.",
      en: "In the decisive Battle of Kirina, Sundiata Keita's army faces the feared Sumanguru Kanté of the Sosso kingdom. According to legend Sumanguru was a powerful sorcerer whose power came from a magical balafon and whose body was protected against all weapons — except a spur made from a white cockerel. Sundiata's half-brother Fakoli Kourouma, who had defected from Sosso, uses the magical spur on an arrow tip. The arrow strikes Sumanguru and breaks his magical protection. The Sosso army disintegrates and Sundiata wins a decisive victory. The Mali Empire is born.",
      tr: "Kirina Savaşı'nda Sundiata Keita'nın ordusu, Sosso krallığının korkulan Sumanguru Kanté'siyle karşılaşır. Efsaneye göre Sumanguru güçlü bir büyücüydü. Sundiata'nın üvey kardeşi Fakoli sihirli tetiği kullanır ve Sumanguru yenilir. Mali İmparatorluğu doğar.",
    },
    figures: ["Sundiata Keita", "Sumanguru Kanté", "Fakoli Kourouma"],
    consequences: {
      sv: "Sosso-riket krossas. Mandinka-folket befrias. Mali-imperiet grundas.",
      en: "Sosso kingdom crushed. Mandinka people liberated. Mali Empire founded.",
      tr: "Sosso krallığı ezilir. Mandinka halkı özgürleştirilir. Mali İmparatorluğu kurulur.",
    },
    impact: {
      sv: "Kirina är Västafrikas mest symboliska slag — Malis födelsedag.",
      en: "Kirina is West Africa's most symbolic battle — Mali's birthday.",
      tr: "Kirina, Batı Afrika'nın en sembolik savaşıdır — Mali'nin doğum günü.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1240,
    title: {
      sv: "Ghana-rikets fall och Malis första expansion",
      en: "Fall of Ghana Kingdom and Mali's First Expansion",
      tr: "Gana Krallığı'nın Düşüşü ve Mali'nin İlk Genişlemesi",
    },
    summary: {
      sv: "Sundiata Keita erövrar Kumbi Saleh — det gamla Ghana-rikets huvudstad — och inlemmar hela det tidigare Ghana-territoriet i det nya Mali-imperiet. Guldhandelsrutterna som tidigare kontrollerades av Ghana övergår nu till Mali. Sundiata förstår att Sahara-handeln är nyckeln till rikedom och makt — han etablerar Mali som den nya mellanhanden mellan guldrika södra regioner och de nordafrikanska handelsstäderna. Imperiet börjar sin snabba geografiska och ekonomiska expansion.",
      en: "Sundiata Keita conquers Kumbi Saleh — the old Ghana kingdom's capital — and incorporates the entire former Ghana territory into the new Mali Empire. The gold trade routes previously controlled by Ghana now pass to Mali. Sundiata understands that Saharan trade is the key to wealth and power — he establishes Mali as the new intermediary between gold-rich southern regions and the North African trading cities. The empire begins its rapid geographic and economic expansion.",
      tr: "Sundiata Keita, eski Gana krallığının başkenti Kumbi Saleh'i fetheder ve tüm eski Gana topraklarını Mali İmparatorluğu'na dahil eder. Altın ticaret yolları artık Mali'nin kontrolüne geçer.",
    },
    figures: ["Sundiata Keita"],
    consequences: {
      sv: "Mali tar kontroll över Västafrikas guldhandel.",
      en: "Mali takes control of West Africa's gold trade.",
      tr: "Mali, Batı Afrika'nın altın ticaretinin kontrolünü alır.",
    },
    impact: {
      sv: "Malis ekonomiska dominans i Sahel-regionen etableras.",
      en: "Mali's economic dominance in the Sahel region is established.",
      tr: "Mali'nin Sahel bölgesindeki ekonomik hakimiyeti kurulur.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1255,
    title: {
      sv: "Sundiata Keitas död — Legenden fördjupas",
      en: "Death of Sundiata Keita — The Legend Deepens",
      tr: "Sundiata Keita'nın Ölümü — Efsane Derinleşiyor",
    },
    summary: {
      sv: "Sundiata Keita dör under oklara omständigheter — traditioner varierar: några säger han drunknade i Sankarani-floden, andra att han dog i strid eller av sjukdom. Hans dödsögonblick förvandlas omedelbart till myt. Grioten (historieberättarna) börjar bevara och elaborera hans saga i det episka verket Sundiata: ett epos om Gamla Mali — ett av de mest enastående muntliga epos i världshistorien. Imperiet fortsätter under hans söner men hans arv som Mansa (kejsare) och grundare formas omedelbart.",
      en: "Sundiata Keita dies under unclear circumstances — traditions vary: some say he drowned in the Sankarani River, others that he died in battle or from illness. His moment of death is immediately transformed into myth. The griots (storytellers) begin preserving and elaborating his saga in the epic work Sundiata: An Epic of Old Mali — one of the most extraordinary oral epics in world history. The empire continues under his sons but his legacy as Mansa (emperor) and founder is immediately formed.",
      tr: "Sundiata Keita belirsiz koşullar altında ölür. Ölüm anı hemen mite dönüşür. Griotlar (hikaye anlatıcıları) destansı eserinde onun destanını korumaya ve geliştirmeye başlar.",
    },
    figures: ["Sundiata Keita", "Mansa Uli I", "Griots of Mali"],
    consequences: {
      sv: "Mali fortsätter att expandera under Sundiatas arvtagare.",
      en: "Mali continues expanding under Sundiata's successors.",
      tr: "Mali, Sundiata'nın haleflerinin liderliğinde genişlemeye devam eder.",
    },
    impact: {
      sv: "Sundiata-eposet blir Västafrikas mest betydelsefulla litterära verk.",
      en: "The Sundiata epic becomes West Africa's most significant literary work.",
      tr: "Sundiata destanı, Batı Afrika'nın en önemli edebi eseri haline gelir.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1260,
    title: {
      sv: "Mansa Uli I — Den første valfärden till Mekka",
      en: "Mansa Uli I — The First Pilgrimage to Mecca",
      tr: "Mansa Uli I — Mekke'ye İlk Hac",
    },
    summary: {
      sv: "Sundiatas son, Mansa Uli I (även känd som Yerelinkon), genomför Malis första kända kungliga hajj till Mekka. Denna pilgrimage är djupt symbolisk — den signalerar Malis position som ett muslimskt imperium i Västafrika, öppnar diplomatiska kanaler med Nordafrika och Mellanöstern och etablerar Mali på den internationella världskartan som en legitim islamisk stat. Mansa Ulis hajj följs av generationer av Mali-kungar som upprepade pilgrimsfärden.",
      en: "Sundiata's son, Mansa Uli I (also known as Yerelinkon), performs Mali's first known royal hajj to Mecca. This pilgrimage is deeply symbolic — it signals Mali's position as a Muslim empire in West Africa, opens diplomatic channels with North Africa and the Middle East and establishes Mali on the international world map as a legitimate Islamic state. Mansa Uli's hajj is followed by generations of Mali kings repeating the pilgrimage.",
      tr: "Sundiata'nın oğlu Mansa Uli I, Mali'nin bilinen ilk kraliyet haccını gerçekleştirir. Bu hac, Mali'nin Batı Afrika'daki Müslüman imparatorluk konumunu simgeler ve Kuzey Afrika ile Orta Doğu ile diplomatik kanallar açar.",
    },
    figures: ["Mansa Uli I"],
    consequences: {
      sv: "Mali erkänns internationellt som ett islamiskt imperium.",
      en: "Mali is internationally recognised as an Islamic empire.",
      tr: "Mali, uluslararası alanda bir İslam imparatorluğu olarak tanınır.",
    },
    impact: {
      sv: "Hajj-traditionen etableras som en central del av Mali-kungarnas legitimitet.",
      en: "The hajj tradition is established as a central part of Mali kings' legitimacy.",
      tr: "Hac geleneği, Mali krallarının meşruiyetinin merkezi bir parçası olarak yerleşir.",
    },
    category: "religion",
    importance: "medium",
  },
  {
    year: 1285,
    title: {
      sv: "Sakoura — Slavsoldaten som erövrade imperiet",
      en: "Sakoura — The Slave Soldier Who Conquered an Empire",
      tr: "Sakoura — İmparatorluğu Fetheden Köle Asker",
    },
    summary: {
      sv: "I en av Västafrikas mest dramatiska maktskiften tar den frigjorde slaven och militärbefälhavaren Sakoura kontrollen över Mali-imperiet. Han är inte av kunglig börd men hans militära briljans och karisma ger honom makt. Under hans styre utvidgar Mali sina gränser avsevärt — han erövrar Gao och utvidgar imperiets kontroll längs Nigerfloden österut. Hans framgång visar att meritokrati och militär förtjänst kunde öppna de högsta positionerna i Mali, oavsett börd.",
      en: "In one of West Africa's most dramatic power shifts, the freed slave and military commander Sakoura seizes control of the Mali Empire. He is not of royal birth but his military brilliance and charisma give him power. Under his rule Mali expands its borders significantly — he conquers Gao and extends imperial control along the Niger River eastward. His success shows that meritocracy and military merit could open the highest positions in Mali regardless of birth.",
      tr: "Batı Afrika'nın en dramatik iktidar değişikliklerinden birinde, özgürleştirilmiş köle ve askeri komutan Sakoura, Mali İmparatorluğu'nun kontrolünü ele geçirir. Askeri dehası ve karizması ona güç verir.",
    },
    figures: ["Sakoura", "Mansa Abu Bakr"],
    consequences: {
      sv: "Mali expanderar österut och erövrar Gao.",
      en: "Mali expands eastward and conquers Gao.",
      tr: "Mali doğuya genişler ve Gao'yu fetheder.",
    },
    impact: {
      sv: "Sakouras styre visar att Mali var ett meritokratiskt imperium.",
      en: "Sakoura's rule shows that Mali was a meritocratic empire.",
      tr: "Sakoura'nın yönetimi, Mali'nin liyakate dayalı bir imparatorluk olduğunu gösterir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1300,
    title: {
      sv: "Timbuktu växer — Kunskapens stad grundas",
      en: "Timbuktu Grows — The City of Knowledge is Founded",
      tr: "Timbuktu Büyüyor — Bilgi Şehri Kuruluyor",
    },
    summary: {
      sv: "Timbuktu, grundat som en säsongsläger av Tuareg-nomader vid 1100-talets slut, transformeras under Mali-väldet till en av världens mest framstående intellektuella, kommersiella och religiösa centra. Sankore-moskén och dess madrasah (islamisk skola) lockar lärde från hela den islamiska världen. Bibliotek med hundratusentals manuskript om astronomi, matematik, medicin, historia och islamisk teologi samlas här. Timbuktu blir synonymt med lärdom och rikedom i den medievala världen.",
      en: "Timbuktu, founded as a seasonal camp by Tuareg nomads in the late 11th century, transforms under Mali rule into one of the world's most prominent intellectual, commercial and religious centres. The Sankore Mosque and its madrasah (Islamic school) attract scholars from across the Islamic world. Libraries with hundreds of thousands of manuscripts on astronomy, mathematics, medicine, history and Islamic theology are gathered here. Timbuktu becomes synonymous with learning and wealth in the medieval world.",
      tr: "Timbuktu, Mali yönetimi altında dünyanın en önemli entelektüel, ticari ve dini merkezlerinden birine dönüşür. Sankore Camii'nin medresesi, İslam dünyasının her yerinden alimleri çeker.",
    },
    figures: ["Scholars of Sankore", "Mansa Musa (later patron)"],
    consequences: {
      sv: "Timbuktu etableras som ett globalt centrum för islamisk lärdom.",
      en: "Timbuktu established as a global centre of Islamic learning.",
      tr: "Timbuktu, İslami bilimin küresel merkezi olarak yerleşir.",
    },
    impact: {
      sv: "Timbuktu-manuskripten bevarar förlorad kunskap för hela mänskligheten.",
      en: "The Timbuktu manuscripts preserve lost knowledge for all humanity.",
      tr: "Timbuktu el yazmaları, tüm insanlık için kaybolmuş bilgiyi korur.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1307,
    title: {
      sv: "Mansa Musa I bestiger tronen — Världens rikaste man föds",
      en: "Mansa Musa I Ascends the Throne — The World's Richest Man is Born",
      tr: "Mansa Musa I Tahta Çıkıyor — Dünyanın En Zengin Adamı Doğuyor",
    },
    summary: {
      sv: "Mansa Musa I — i dag erkänd som troligen den rikaste personen i hela världshistorien med en förmögenhet uppskattad till 400 miljarder dollar i moderna pengar — bestiger Mali-imperiet tronen. Han är son till Faga Leye, bror till Mansa Abu Bakr II som lämnade imperiet på en mystisk atlantisk expedition. Under hans 25-åriga regeringstid når Mali sin absoluta zenith — som territorium, ekonomisk makt, kulturell blomstring och internationell prestige. Inget afrikanskt imperium före eller efter har uppnått vad Mansa Musa byggde.",
      en: "Mansa Musa I — today recognised as probably the richest person in all of world history with a fortune estimated at 400 billion dollars in modern money — ascends the Mali Empire throne. He is son of Faga Leye, brother of Mansa Abu Bakr II who left the empire on a mysterious Atlantic expedition. During his 25-year reign Mali reaches its absolute zenith — in territory, economic power, cultural flowering and international prestige. No African empire before or after has achieved what Mansa Musa built.",
      tr: "Mansa Musa I — bugün modern parayla 400 milyar dolar olarak tahmin edilen serveti ile muhtemelen tüm dünya tarihinin en zengin kişisi olarak tanınan — Mali İmparatorluğu tahtına çıkar. 25 yıllık hükümdarlığı döneminde Mali mutlak zirvesine ulaşır.",
    },
    figures: ["Mansa Musa I", "Mansa Abu Bakr II"],
    consequences: {
      sv: "Mali inleder sin guldålder under världshistoriens rikaste härskare.",
      en: "Mali begins its golden age under the richest ruler in world history.",
      tr: "Mali, dünya tarihinin en zengin hükümdarı altında altın çağına başlar.",
    },
    impact: {
      sv: "Mansa Musas arv formar hur Afrika uppfattas av omvärlden i 700 år.",
      en: "Mansa Musa's legacy shapes how Africa is perceived by the outside world for 700 years.",
      tr: "Mansa Musa'nın mirası, Afrika'nın dış dünya tarafından 700 yıl boyunca nasıl algılandığını şekillendirir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1311,
    title: {
      sv: "Mansa Abu Bakr IIs atlantiska expedition — Afrikas Columbus",
      en: "Mansa Abu Bakr II's Atlantic Expedition — Africa's Columbus",
      tr: "Mansa Abu Bakr II'nin Atlantik Seferi — Afrika'nın Kolomb'u",
    },
    summary: {
      sv: "En av historiens mest fascinerande mysterier: Mansa Abu Bakr II, Malis härskare, samlar enligt arabiska krönikörer 2000 kanoter och 1000 reservbåtar fyllda med guld, vatten och proviant. Han överlämnar tronen till sin bror Musa och seglar ut på Atlanten för att utforska vad som finns 'på andra sidan det stora havet.' Inga av båtarna återvänder. Expeditionen är historiskt känd men det finns spekulationer om att afrikanska navigatörer kan ha nått Amerika mer än 180 år före Kolumbus — en teori som fortfarande debatteras av historiker.",
      en: "One of history's most fascinating mysteries: Mansa Abu Bakr II, Mali's ruler, according to Arab chroniclers assembles 2,000 canoes and 1,000 reserve boats filled with gold, water and provisions. He hands the throne to his brother Musa and sails out onto the Atlantic to explore what lies 'on the other side of the great sea.' None of the boats return. The expedition is historically attested but there is speculation that African navigators may have reached the Americas more than 180 years before Columbus — a theory still debated by historians.",
      tr: "Tarihinin en büyüleyici gizemlerinden biri: Mansa Abu Bakr II, Arap kroniklerine göre altın, su ve erzakla dolu 2000 kano toplar. Tahti kardeşi Musa'ya devreder ve Atlantik'e açılır. Teknelerden hiçbiri geri dönmez.",
    },
    figures: ["Mansa Abu Bakr II", "Mansa Musa I"],
    consequences: {
      sv: "Mansa Musa tar över imperiet. Atlantexpeditionen förblir ett historiskt mysterium.",
      en: "Mansa Musa takes over the empire. The Atlantic expedition remains a historical mystery.",
      tr: "Mansa Musa imparatorluğu devralır. Atlantik seferi tarihsel bir gizem olarak kalır.",
    },
    impact: {
      sv: "Spekulationer om Afrikas transatlantiska kontakt före Kolumbus inspirerar modern forskning.",
      en: "Speculation about Africa's transatlantic contact before Columbus inspires modern research.",
      tr: "Kolomb öncesi Afrika'nın transatlantik temasına ilişkin spekülasyonlar modern araştırmaları ilham alır.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1324,
    title: {
      sv: "Mansa Musas hajj — Världens dyraste pilgrimsfärd",
      en: "Mansa Musa's Hajj — The World's Most Expensive Pilgrimage",
      tr: "Mansa Musa'nın Haccı — Dünyanın En Pahalı Haccı",
    },
    summary: {
      sv: "Den 17 juli 1324 lämnar Mansa Musa Mali med ett följe som chockar hela världen: 60 000 man, 12 000 slavar vardera bärande 1,8 kg guldstavar, 80 kameler bärande 136 kg guld vardera, hästar, hemlighetsmakar och rikedomar utan motstycke. Resan går genom Kairo och vidare till Mekka. I Kairo spenderar Mansa Musa så mycket guld att han kollapsar den egyptiska guldmarknaden — inflationen varar i 12 år. Europeiska kartografer ritar om världskartan för att inkludera den afrikanska konungens rike. Malis existens når hela världens medvetande.",
      en: "On 17 July 1324 Mansa Musa leaves Mali with an entourage that shocks the entire world: 60,000 men, 12,000 slaves each carrying 1.8 kg of gold bars, 80 camels each carrying 136 kg of gold, horses, secretaries and wealth without precedent. The journey passes through Cairo and on to Mecca. In Cairo Mansa Musa spends so much gold that he collapses the Egyptian gold market — the inflation lasts 12 years. European cartographers redraw the world map to include the African king's realm. Mali's existence reaches the awareness of the entire world.",
      tr: "Mansa Musa, 60.000 kişilik ve her biri 1,8 kg altın taşıyan 12.000 köleden oluşan, dünyayı şoke eden bir maiyet ile Mali'den ayrılır. Kahire'de o kadar çok altın harcar ki Mısır altın piyasasını çökertr — enflasyon 12 yıl sürer.",
    },
    figures: ["Mansa Musa I", "Sultan of Egypt Al-Nasir Muhammad", "Abu Ishaq al-Sahili"],
    consequences: {
      sv: "Egyptens guldmarknad kollapsar. Europa ritar om världskartan.",
      en: "Egypt's gold market collapses. Europe redraws the world map.",
      tr: "Mısır'ın altın piyasası çöker. Avrupa dünya haritasını yeniden çizer.",
    },
    impact: {
      sv: "Mansa Musas hajj är det ögonblick Afrika träder in på den globala scenen.",
      en: "Mansa Musa's hajj is the moment Africa steps onto the global stage.",
      tr: "Mansa Musa'nın haccı, Afrika'nın küresel sahneye çıktığı andır.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: 1325,
    title: {
      sv: "Timbuktu och Gao erövras — Imperiets storhet fullbordas",
      en: "Timbuktu and Gao Conquered — The Empire's Greatness Completed",
      tr: "Timbuktu ve Gao Fethedildi — İmparatorluğun Büyüklüğü Tamamlandı",
    },
    summary: {
      sv: "På återvägen från Mekka erövrar Mansa Musa de strategiska handelsstäderna Timbuktu och Gao — platser av enorm ekonomisk och kulturell betydelse. Med dessa städer under sin kontroll kontrollerar Mali nu hela Saharahandeln, saltgruvorna vid Taghaza och guldflödena från Bambuk och Bure. Mansa Musa tar med sig den andalusiske arkitekten Abu Ishaq al-Sahili tillbaka till Mali som en present från hajen — Sahili bygger sedan imperiets mest ikoniska byggnader.",
      en: "On the return journey from Mecca, Mansa Musa conquers the strategic trading cities of Timbuktu and Gao — places of enormous economic and cultural significance. With these cities under his control Mali now controls the entire Saharan trade, the salt mines at Taghaza and the gold flows from Bambuk and Bure. Mansa Musa brings the Andalusian architect Abu Ishaq al-Sahili back to Mali as a gift from the hajj — Sahili then builds the empire's most iconic buildings.",
      tr: "Mansa Musa, Mekke'den dönüş yolunda stratejik ticaret şehirleri Timbuktu ve Gao'yu fetheder. Endülüslü mimar Abu Ishaq al-Sahili'yi Mali'ye geri getirir.",
    },
    figures: ["Mansa Musa I", "Abu Ishaq al-Sahili"],
    consequences: {
      sv: "Mali kontrollerar nu hela Saharahandeln.",
      en: "Mali now controls the entire Saharan trade.",
      tr: "Mali artık tüm Sahra ticaretini kontrol eder.",
    },
    impact: {
      sv: "Timbuktu under Mali-välde blir ett av medeltidens viktigaste intellektuella centra.",
      en: "Timbuktu under Mali rule becomes one of the medieval world's most important intellectual centres.",
      tr: "Mali yönetimi altında Timbuktu, ortaçağ dünyasının en önemli entelektüel merkezlerinden biri haline gelir.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1327,
    title: {
      sv: "Djinguereber-moskén byggs — Afrikas arkitektoniska mästerverk",
      en: "Djinguereber Mosque Built — Africa's Architectural Masterpiece",
      tr: "Djinguereber Camii İnşa Edildi — Afrika'nın Mimari Şaheseri",
    },
    summary: {
      sv: "Med Abu Ishaq al-Sahili som arkitekt uppförs Djinguereber-moskén i Timbuktu — ett av Västafrikas mest ikoniska och bestående byggnader. Moskén är byggd i den karakteristiska Sudano-saheliska arkitekturstilen med leradobe och organiska former som sticker ut mot den afrikanska himlen. Den rymmer mer än 2000 bedjande och är en del av ett komplex av islamisk lärdom som gör Timbuktu till det 'södra Mekka.' Djinguereber-moskén står fortfarande idag och är ett UNESCO-världsarv.",
      en: "With Abu Ishaq al-Sahili as architect the Djinguereber Mosque is built in Timbuktu — one of West Africa's most iconic and enduring buildings. The mosque is built in the characteristic Sudano-Sahelian architectural style with mud adobe and organic forms jutting against the African sky. It accommodates more than 2,000 worshippers and is part of a complex of Islamic learning that makes Timbuktu the 'southern Mecca.' The Djinguereber Mosque still stands today and is a UNESCO World Heritage site.",
      tr: "Abu Ishaq al-Sahili'nin mimarı olduğu Djinguereber Camii, Timbuktu'da inşa edilir. Bugün hâlâ ayakta duran cami, UNESCO Dünya Mirası alanıdır.",
    },
    figures: ["Mansa Musa I", "Abu Ishaq al-Sahili"],
    consequences: {
      sv: "Timbuktu etableras som ett islamiskt arkitektoniskt och religiöst centrum.",
      en: "Timbuktu established as an Islamic architectural and religious centre.",
      tr: "Timbuktu, İslami mimari ve dini bir merkez olarak yerleşir.",
    },
    impact: {
      sv: "Djinguereber-moskén symboliserar Malis arv i hela världen.",
      en: "Djinguereber Mosque symbolises Mali's heritage throughout the world.",
      tr: "Djinguereber Camii, dünya genelinde Mali'nin mirasını simgeler.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1330,
    title: {
      sv: "Sankore-universitetet — Afrikas Oxford grundas",
      en: "Sankore University — Africa's Oxford is Founded",
      tr: "Sankore Üniversitesi — Afrika'nın Oxford'u Kuruluyor",
    },
    summary: {
      sv: "Under Mansa Musas patronage omvandlas Sankore-moskén i Timbuktu till ett fullt universitetslärosäte med upp till 25 000 studenter — en av medeltidens största intellektuella institutioner. Ämnen som undervisas inkluderar koranstudier, islamisk rätt (fiqh), astronomi, matematik, historia, botanik och läkekonst. Lärde från hela Nordafrika, Arabien, Andalusien och Persien reser till Timbuktu för att undervisa och studera. Biblioteken rymmer uppemot 700 000 manuskript.",
      en: "Under Mansa Musa's patronage the Sankore Mosque in Timbuktu is transformed into a full university with up to 25,000 students — one of the medieval world's largest intellectual institutions. Subjects taught include Koranic studies, Islamic law (fiqh), astronomy, mathematics, history, botany and medicine. Scholars from across North Africa, Arabia, Andalusia and Persia travel to Timbuktu to teach and study. The libraries hold up to 700,000 manuscripts.",
      tr: "Mansa Musa'nın himayesinde Timbuktu'daki Sankore Camii, 25.000 öğrenciye kadar kapasiteli bir üniversiteye dönüştürülür. Kütüphaneler 700.000 el yazmasına kadar barındırır.",
    },
    figures: ["Mansa Musa I", "Scholars of Sankore"],
    consequences: {
      sv: "Timbuktu blir ett av medeltidens ledande universitetscentra.",
      en: "Timbuktu becomes one of the medieval world's leading university centres.",
      tr: "Timbuktu, ortaçağ dünyasının önde gelen üniversite merkezlerinden biri haline gelir.",
    },
    impact: {
      sv: "Timbuktu-manuskripten är Afrikas mest värdefulla intellektuella arv.",
      en: "The Timbuktu manuscripts are Africa's most valuable intellectual heritage.",
      tr: "Timbuktu el yazmaları, Afrika'nın en değerli entelektüel mirasıdır.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1337,
    title: {
      sv: "Mansa Musas död — Den gyllene ärens slut",
      en: "Death of Mansa Musa — End of the Golden Glory",
      tr: "Mansa Musa'nın Ölümü — Altın İhtişamın Sonu",
    },
    summary: {
      sv: "Mansa Musa I dör och lämnar efter sig ett imperium som sträcker sig från Atlanten i väster till Gao i öster, och från Saharas södra rand i norr till den tropiska skogsgränsen i söder — ett territorium lika stort som Västeuropa. Han lämnar enorma rikedomar, 25 000 studenter i Timbuktu, och ett diplomatiskt nätverk som når från Marocko till Egypten och Arabiska halvön. Men imperiet inleder nu en gradvis nedgång — hans arvtagare saknar hans kombination av militär, ekonomisk och diplomatisk briljans.",
      en: "Mansa Musa I dies leaving behind an empire stretching from the Atlantic in the west to Gao in the east, and from the southern edge of the Sahara in the north to the tropical forest border in the south — a territory as large as Western Europe. He leaves enormous wealth, 25,000 students in Timbuktu, and a diplomatic network reaching from Morocco to Egypt and the Arabian Peninsula. But the empire now begins a gradual decline — his successors lack his combination of military, economic and diplomatic brilliance.",
      tr: "Mansa Musa I, batıda Atlantik'ten doğuda Gao'ya uzanan, Batı Avrupa büyüklüğünde bir imparatorluk bırakarak ölür. İmparatorluk şimdi yavaş bir gerilemeye başlar.",
    },
    figures: ["Mansa Musa I", "Mansa Maghan I"],
    consequences: {
      sv: "Malis guldålder börjar gradvis avta.",
      en: "Mali's golden age begins to gradually fade.",
      tr: "Mali'nin altın çağı yavaş yavaş sönmeye başlar.",
    },
    impact: {
      sv: "Mansa Musas arv präglar Västafrika i århundraden.",
      en: "Mansa Musa's legacy marks West Africa for centuries.",
      tr: "Mansa Musa'nın mirası, yüzyıllarca Batı Afrika'yı damgalar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1340,
    title: {
      sv: "Mansa Maghan I — Det första steget i nedgången",
      en: "Mansa Maghan I — The First Step of Decline",
      tr: "Mansa Maghan I — Gerilemenin İlk Adımı",
    },
    summary: {
      sv: "Mansa Maghan I, son till Mansa Musa, visar sig vara en svag härskare jämfört med sin legendare far. Under hans korta styre börjar interna spänningar öka. Mossi-folket gör räder mot Timbuktu och bränner delar av staden — ett tecken på att den militära kapaciteten att skydda imperiet har försvagats. Maghan lyckas inte bevara faderns diplomatiska allianser och imperial prestige börjar erodera.",
      en: "Mansa Maghan I, son of Mansa Musa, proves a weak ruler compared to his legendary father. During his short rule internal tensions increase. The Mossi people raid Timbuktu and burn parts of the city — a sign that the military capacity to protect the empire has weakened. Maghan fails to preserve his father's diplomatic alliances and imperial prestige begins to erode.",
      tr: "Mansa Maghan I, efsanevi babasına kıyasla zayıf bir hükümdar olduğunu kanıtlar. Mossi halkı Timbuktu'ya akın eder ve şehrin bir bölümünü yakar.",
    },
    figures: ["Mansa Maghan I"],
    consequences: {
      sv: "Malis perifera territorier börjar bli instabila.",
      en: "Mali's peripheral territories begin becoming unstable.",
      tr: "Mali'nin çevre toprakları istikrarsızlaşmaya başlar.",
    },
    impact: {
      sv: "Mossi-räden visar att Mali inte längre kan skydda alla sina gränser.",
      en: "The Mossi raids show that Mali can no longer protect all its borders.",
      tr: "Mossi akınları, Mali'nin artık tüm sınırlarını koruyamadığını gösterir.",
    },
    category: "war",
    importance: "medium",
  },
  {
    year: 1360,
    title: {
      sv: "Mansa Suleyman — Den diplomatiske administratören",
      en: "Mansa Suleyman — The Diplomatic Administrator",
      tr: "Mansa Süleyman — Diplomatik Yönetici",
    },
    summary: {
      sv: "Mansa Suleyman, bror till Mansa Musa, regerar 1341–1360 och är den siste store Mali-kungen. Han genomför en hajj till Mekka, underhåller diplomatiska relationer med Marocko och Egypt, och de arabiske resenären Ibn Battuta besöker Mali under hans styre och lämnar den mest detaljerade europeisk-arabiska beskrivningen av Mali-imperiet. Ibn Battuta är imponerad av ordning, rättvisa och välstånd men kritiserar vad han uppfattar som brist på islamisk renhet i hovkulturen.",
      en: "Mansa Suleyman, brother of Mansa Musa, reigns 1341–1360 and is the last great Mali king. He performs a hajj to Mecca, maintains diplomatic relations with Morocco and Egypt, and the Arab traveller Ibn Battuta visits Mali during his rule and leaves the most detailed Arab description of the Mali Empire. Ibn Battuta is impressed by order, justice and prosperity but criticises what he perceives as a lack of Islamic purity in court culture.",
      tr: "Mansa Süleyman, 1341–1360 arasında hüküm sürer ve son büyük Mali kralıdır. Arap gezgin İbn Battuta, hükümdarlığı sırasında Mali'yi ziyaret eder ve en ayrıntılı Mali İmparatorluğu betimlemesini bırakır.",
    },
    figures: ["Mansa Suleyman", "Ibn Battuta"],
    consequences: {
      sv: "Ibn Battutas beskrivning bevarar Mali för eftervärlden.",
      en: "Ibn Battuta's description preserves Mali for posterity.",
      tr: "İbn Battuta'nın betimlemesi Mali'yi gelecek nesiller için korur.",
    },
    impact: {
      sv: "Ibn Battutas Mali-rapport är den viktigaste primärkällan för imperiets historia.",
      en: "Ibn Battuta's Mali report is the most important primary source for the empire's history.",
      tr: "İbn Battuta'nın Mali raporu, imparatorluğun tarihi için en önemli birincil kaynaktır.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1375,
    title: {
      sv: "Malis expansion når sin geografiska topp",
      en: "Mali's Expansion Reaches Its Geographic Peak",
      tr: "Mali'nin Genişlemesi Coğrafi Zirvesine Ulaşıyor",
    },
    summary: {
      sv: "Vid sin geografiska topp i mitten av 1300-talet kontrollerar Mali-imperiet ett territorium på mer än 1,2 miljoner kvadratkilometer — från Atlanten och Senegambias kust i väster till Nigerböjens städer i öster, och från Saharas södra rand i norr till skogsgränsen i söder. Imperiet inkluderar nuvarande Mali, Senegal, Gambia, Guinea, Guinea-Bissau, delar av Mauretanien, Niger, Burkina Faso och Elfenbenskusten. Det är tidernas i särklass mäktigaste afrikanska imperium.",
      en: "At its geographic peak in the mid-14th century the Mali Empire controls a territory of more than 1.2 million square kilometres — from the Atlantic and Senegambia coast in the west to the Niger Bend cities in the east, and from the Sahara's southern edge in the north to the forest border in the south. The empire includes present-day Mali, Senegal, Gambia, Guinea, Guinea-Bissau, parts of Mauritania, Niger, Burkina Faso and Ivory Coast. It is by far the most powerful African empire of all time.",
      tr: "Coğrafi zirvesinde Mali İmparatorluğu, 1,2 milyondan fazla kilometre karelik bir alanı kontrol eder. Bugünkü Mali, Senegal, Gambiya, Gine ve daha birçok ülkeyi kapsar.",
    },
    figures: ["Mansa of Mali"],
    consequences: {
      sv: "Mali kontrollerar mer av Västafrika än något annat imperium i historien.",
      en: "Mali controls more of West Africa than any other empire in history.",
      tr: "Mali, tarihte herhangi bir imparatorluktan daha fazla Batı Afrika'yı kontrol eder.",
    },
    impact: {
      sv: "Malis gränser och handelsnätverk definierar Sahel-regionens politiska geografi.",
      en: "Mali's borders and trade networks define the Sahel region's political geography.",
      tr: "Mali'nin sınırları ve ticaret ağları, Sahel bölgesinin siyasi coğrafyasını tanımlar.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1400,
    title: {
      sv: "Intern splittring — Prinsar kämpar om tronen",
      en: "Internal Fragmentation — Princes Fight for the Throne",
      tr: "İç Parçalanma — Prensler Taht İçin Savaşıyor",
    },
    summary: {
      sv: "Det sena 1300-talet och tidiga 1400-talet präglas av bitter tronkonflikt inom Mali-dynastin. Mansa Maghan II, Mansa Sandaki, Mansa Mari Jata II och andra tronpretendenter kämpar om makten i en serie av palatskupper och kortvariga regentskap. Den centrala auktoriteten försvagas drastiskt. Provinser och underlydande stater ser sin chans att göra uppror eller lösgöra sig från Mali-väldet. Imperiet börjar fysiskt krympa.",
      en: "The late 14th century and early 15th century are marked by bitter succession conflicts within the Mali dynasty. Mansa Maghan II, Mansa Sandaki, Mansa Mari Jata II and other pretenders fight for power in a series of palace coups and short-lived regencies. Central authority weakens drastically. Provinces and vassal states see their chance to rebel or break free from Mali rule. The empire begins physically shrinking.",
      tr: "Geç 14. yüzyıl ve erken 15. yüzyıl, Mali hanedanı içindeki acı taht çatışmalarıyla karakterize edilir. Merkezi otorite büyük ölçüde zayıflar.",
    },
    figures: ["Mansa Maghan II", "Mansa Mari Jata II"],
    consequences: {
      sv: "Mali-imperiet börjar fragmenteras och förlora territorier.",
      en: "Mali Empire begins fragmenting and losing territories.",
      tr: "Mali İmparatorluğu parçalanmaya ve toprak kaybetmeye başlar.",
    },
    impact: {
      sv: "Den dynastiska krisen öppnar dörren för Songhai-rikets uppgång.",
      en: "The dynastic crisis opens the door for the Songhai Empire's rise.",
      tr: "Hanedanlar arası kriz, Songhai İmparatorluğu'nun yükselişinin kapısını açar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1433,
    title: {
      sv: "Tuaregerna erövrar Timbuktu",
      en: "Tuaregs Conquer Timbuktu",
      tr: "Tuaregler Timbuktu'yu Fethediyor",
    },
    summary: {
      sv: "Tuareg-nomader under ledning av Ag-Ogalu erövrar Timbuktu — den pärla som Mansa Musa byggt upp som Västafrikas intellektuella centrum. Timbuktu passerar ur Malis kontroll och blir en stridighetspunkt mellan Tuareger, Mali och Songhai under de kommande decennierna. Förlusten av Timbuktu är symbolisk — det är Mali-imperiet som definierats av sin kontroll över handelsstäder och lärdomscentra, och utan Timbuktu börjar imperiet förlora sin identitet.",
      en: "Tuareg nomads under the leadership of Ag-Ogalu conquer Timbuktu — the jewel that Mansa Musa built as West Africa's intellectual centre. Timbuktu passes out of Mali's control and becomes a contested point between Tuaregs, Mali and Songhai over the following decades. The loss of Timbuktu is symbolic — it is the Mali Empire that defined itself by control over trading cities and centres of learning, and without Timbuktu the empire begins losing its identity.",
      tr: "Tuareg göçebeler Timbuktu'yu fetheder. Timbuktu'nun kaybı sembolik — Mali, kimliğini tanımlayan ticaret şehirleri üzerindeki kontrolü kaybediyor.",
    },
    figures: ["Ag-Ogalu of Tuareg"],
    consequences: {
      sv: "Mali förlorar Timbuktu — imperiet börjar definitivt krympa.",
      en: "Mali loses Timbuktu — the empire definitively begins shrinking.",
      tr: "Mali, Timbuktu'yu kaybeder — imparatorluk kesin olarak küçülmeye başlar.",
    },
    impact: {
      sv: "Timbuktu-förlusten accelererar Malis nedgång och Songhais uppgång.",
      en: "The Timbuktu loss accelerates Mali's decline and Songhai's rise.",
      tr: "Timbuktu'nun kaybı, Mali'nin gerilimesini ve Songhai'nın yükselişini hızlandırır.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1460,
    title: {
      sv: "Songhai-rikets uppgång hotar Mali",
      en: "Songhai Empire's Rise Threatens Mali",
      tr: "Songhai İmparatorluğu'nun Yükselişi Mali'yi Tehdit Ediyor",
    },
    summary: {
      sv: "Sunni Ali Ber av Songhai-riket börjar sin expansiva kampanj och utmanar direkt Mali-imperiet om kontrollen över Nigerböjens städer. Songhai var tidigare en underordnad stat under Mali men utnyttjar nu Malis svaghet. Handelsrutterna och städerna som en gång definierade Mali — Gao, Timbuktu, Djenné — övergår gradvis till Songhais kontroll. Mali trycks tillbaka mot sitt kärnterritorium i Manden-regionen.",
      en: "Sunni Ali Ber of the Songhai Empire begins his expansive campaign and directly challenges the Mali Empire for control of the Niger Bend cities. Songhai was previously a vassal state under Mali but now exploits Mali's weakness. The trade routes and cities that once defined Mali — Gao, Timbuktu, Djenné — gradually pass to Songhai's control. Mali is pushed back toward its core territory in the Manden region.",
      tr: "Songhai İmparatorluğu'ndan Sunni Ali Ber genişleme kampanyasına başlar ve Mali İmparatorluğu'na meydan okur. Ticaret yolları ve şehirler yavaş yavaş Songhai kontrolüne geçer.",
    },
    figures: ["Sunni Ali Ber", "Mansa of Mali"],
    consequences: {
      sv: "Mali reduceras till ett regionalt rike snarare än ett imperium.",
      en: "Mali is reduced to a regional kingdom rather than an empire.",
      tr: "Mali, bir imparatorluktan çok bölgesel bir krallığa indirgenir.",
    },
    impact: {
      sv: "Songhai ersätter Mali som Västafrikas dominerande makt.",
      en: "Songhai replaces Mali as West Africa's dominant power.",
      tr: "Songhai, Mali'nin yerine Batı Afrika'nın baskın gücü olarak geçer.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1480,
    title: {
      sv: "Mansa Mahmud II — Det sista motanfallet",
      en: "Mansa Mahmud II — The Last Counterattack",
      tr: "Mansa Mahmud II — Son Karşı Saldırı",
    },
    summary: {
      sv: "Mansa Mahmud II försöker återvinna Malis förlorade prestige och territorier i ett sista storskaligt militärt initiativ. Han för krig mot Songhai-riket och de tuaregiska stammarna och uppnår några temporära framgångar. Men Malis militära kapacitet har försvagats för allvarligt — man saknar kavalleri, infanteri och resurser för en storskalig kampanj. Mahmud IIs offensiv misslyckas och Mali hamnar i defensivt läge permanent.",
      en: "Mansa Mahmud II attempts to regain Mali's lost prestige and territories in a last large-scale military initiative. He wages war against the Songhai Empire and Tuareg tribes and achieves some temporary successes. But Mali's military capacity has been weakened too severely — lacking cavalry, infantry and resources for a large-scale campaign. Mahmud II's offensive fails and Mali enters a permanently defensive position.",
      tr: "Mansa Mahmud II, Mali'nin kayıp prestijini ve topraklarını geri kazanmak için son büyük çaplı askeri girişimde bulunur. Ancak başarısız olur ve Mali kalıcı olarak savunmaya geçer.",
    },
    figures: ["Mansa Mahmud II"],
    consequences: {
      sv: "Malis sista militära offensiv misslyckas.",
      en: "Mali's last military offensive fails.",
      tr: "Mali'nin son askeri taarruzu başarısız olur.",
    },
    impact: {
      sv: "Mali accepterar sin roll som ett litet regionalt rike i Manden.",
      en: "Mali accepts its role as a small regional kingdom in Manden.",
      tr: "Mali, Manden'deki küçük bölgesel bir krallık rolünü kabul eder.",
    },
    category: "war",
    importance: "medium",
  },
  {
    year: 1500,
    title: {
      sv: "Songhais fullständiga seger — Mali begränsas till Manden",
      en: "Songhai's Complete Victory — Mali Confined to Manden",
      tr: "Songhai'nın Tam Zaferi — Mali Manden ile Sınırlandırılıyor",
    },
    summary: {
      sv: "Vid 1500-talets inledning är Mali-imperiet en skugga av sin forna storhet. Det kontrollerar nu bara sitt kärnterritorium i Manden-regionen — det land som Sundiata ursprungligen enade. Songhai kontrollerar Timbuktu, Gao, Djenné och all Saharahandel. Portugisiska sjöfarare har dessutom etablerat handelskontrakt längs Västafrikas kust, kringgående Saharahandeln och ytterligare underminerar Malis ekonomiska position. Mali är effektivt avslutat som en imperialmakt.",
      en: "At the beginning of the 16th century the Mali Empire is a shadow of its former greatness. It now controls only its core territory in the Manden region — the land Sundiata originally unified. Songhai controls Timbuktu, Gao, Djenné and all Saharan trade. Portuguese sailors have moreover established trade contracts along West Africa's coast, bypassing Saharan trade and further undermining Mali's economic position. Mali is effectively finished as an imperial power.",
      tr: "16. yüzyılın başında Mali İmparatorluğu, eski büyüklüğünün gölgesidir. Artık yalnızca Manden bölgesindeki ana topraklarını kontrol eder. Mali, bir imparatorluk gücü olarak fiilen sona ermiştir.",
    },
    figures: ["Mansa of Mali", "Askia Muhammad of Songhai"],
    consequences: {
      sv: "Mali reduceras till ett litet rike. Songhai dominerar Västafrika.",
      en: "Mali is reduced to a small kingdom. Songhai dominates West Africa.",
      tr: "Mali küçük bir krallığa indirgenir. Songhai Batı Afrika'ya egemen olur.",
    },
    impact: {
      sv: "Malis roll som handelsmäklare i Sahara övergår permanent till Songhai.",
      en: "Mali's role as Saharan trade broker passes permanently to Songhai.",
      tr: "Mali'nin Sahra ticaret aracısı rolü kalıcı olarak Songhai'ya geçer.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1545,
    title: {
      sv: "Mansa Mahmud III — Sista ansträngningen för nytt Mali",
      en: "Mansa Mahmud III — Last Effort for a New Mali",
      tr: "Mansa Mahmud III — Yeni Mali İçin Son Çaba",
    },
    summary: {
      sv: "Mansa Mahmud III gör ett sista försök att revitalisera det krympande Mali-riket. Han för krig mot Fula-folket och deras Denianke-dynasti i Futa Toro och mot Songhai-imperiet. Trots begränsad framgång i Futa lyckas han inte återfå de förlorade handelsstäderna. Efter Songhais fall för marockanska styrkor 1591 hoppas Mali på en återkomst, men det visar sig vara omöjligt. Mali-riket lever vidare som ett lokalt rike utan internationell makt.",
      en: "Mansa Mahmud III makes a last attempt to revitalise the shrinking Mali kingdom. He wages war against the Fula people and their Denianke dynasty in Futa Toro and against the Songhai Empire. Despite limited success in Futa he fails to recapture the lost trading cities. After Songhai's fall to Moroccan forces in 1591 Mali hopes for a comeback, but this proves impossible. The Mali kingdom survives as a local kingdom without international power.",
      tr: "Mansa Mahmud III, küçülen Mali krallığını yeniden canlandırmak için son bir girişimde bulunur. Songhai'nın 1591'de Faslı güçler tarafından çökertilmesinin ardından Mali bir geri dönüş umar, ancak bu imkansız olduğu kanıtlanır.",
    },
    figures: ["Mansa Mahmud III"],
    consequences: {
      sv: "Mali lever vidare som ett lokalt rike utan regionala ambitioner.",
      en: "Mali survives as a local kingdom without regional ambitions.",
      tr: "Mali, bölgesel hırsları olmayan yerel bir krallık olarak ayakta kalmaya devam eder.",
    },
    impact: {
      sv: "Malis imperiala era är slutgiltigt avslutad.",
      en: "Mali's imperial era is definitively concluded.",
      tr: "Mali'nin imparatorluk dönemi kesin olarak sona ermiştir.",
    },
    category: "politics",
    importance: "medium",
  },
  {
    year: 1591,
    title: {
      sv: "Songhai faller — Mali hoppas förgäves",
      en: "Songhai Falls — Mali Hopes in Vain",
      tr: "Songhai Düşüyor — Mali Boş Umutlarla Bekliyor",
    },
    summary: {
      sv: "Marockanska styrkor under Ahmad al-Mansur erövrar Songhai-imperiet i ett chockerande snabbt fälttåg. Saadinska marockaner med kruttsteknologi besegrar Songhais numerärt överlägsna arméer vid Tondibi. Västafrikas maktstruktur kollapsar. Mali hoppas att detta skapar ett vakuum de kan fylla — men de marockanska Pashalik av Timbuktu tar kontroll och Mali saknar styrkan att driva ut dem. Malis sista möjlighet till återkomst som regional makt försvinner.",
      en: "Moroccan forces under Ahmad al-Mansur conquer the Songhai Empire in a shockingly rapid campaign. Saadian Moroccans with gunpowder technology defeat Songhai's numerically superior armies at Tondibi. West Africa's power structure collapses. Mali hopes this creates a vacuum they can fill — but the Moroccan Pashalik of Timbuktu takes control and Mali lacks the strength to drive them out. Mali's last opportunity for return as a regional power disappears.",
      tr: "Fas kuvvetleri Songhai İmparatorluğu'nu çarpıcı biçimde hızlı bir seferle fetheder. Mali bir güç boşluğu umut eder ama bölgesel güç olarak geri dönme son fırsatı kaybolur.",
    },
    figures: ["Ahmad al-Mansur of Morocco", "Askia Ishaq II of Songhai"],
    consequences: {
      sv: "Västafrika domineras av marockanska militärguvernörer.",
      en: "West Africa is dominated by Moroccan military governors.",
      tr: "Batı Afrika, Fas askeri valileri tarafından yönetilir.",
    },
    impact: {
      sv: "Malis sista chans till regionalt inflytande försvinner för alltid.",
      en: "Mali's last chance at regional influence disappears forever.",
      tr: "Mali'nin bölgesel nüfuz için son şansı sonsuza dek kaybolur.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1600,
    title: {
      sv: "Mali-rikets sista kapitel — Imperiet upplöses",
      en: "Mali Kingdom's Final Chapter — The Empire Dissolves",
      tr: "Mali Krallığı'nın Son Bölümü — İmparatorluk Çözülüyor",
    },
    summary: {
      sv: "Vid 1600-talets inledning har det som en gång var ett av världens mäktigaste imperier reducerats till ett litet lokalt rike i Manden-regionen med minimal internationell relevans. Bambara-folket och Fula-staterna pressar Mali från alla håll. Europeiska slavhandlare längs kusterna destabiliserar hela regionens politiska strukturer. Det imperium som Sundiata Keita byggde 365 år tidigare upplöses gradvis utan ett enda dramatiskt slut — det försvinner i tidens dimma.",
      en: "At the beginning of the 17th century what was once one of the world's most powerful empires has been reduced to a small local kingdom in the Manden region with minimal international relevance. The Bambara people and Fula states press Mali from all sides. European slave traders along the coasts destabilise the entire region's political structures. The empire that Sundiata Keita built 365 years earlier gradually dissolves without a single dramatic ending — it disappears into the mist of time.",
      tr: "17. yüzyılın başında, bir zamanlar dünyanın en güçlü imparatorluklarından biri olan devlet, Manden bölgesinde küçük bir yerel krallığa indirgenir. Sundiata Keita'nın 365 yıl önce kurduğu imparatorluk dramatik bir son olmaksızın yavaş yavaş çözülür.",
    },
    figures: ["Last Mansa of Mali"],
    consequences: {
      sv: "Mali-imperiet upphör existera som en politisk enhet.",
      en: "Mali Empire ceases to exist as a political entity.",
      tr: "Mali İmparatorluğu, siyasi bir varlık olarak var olmaya son verir.",
    },
    impact: {
      sv: "Malis kulturella och religiösa arv lever vidare i Mandinka-folkets traditioner.",
      en: "Mali's cultural and religious heritage lives on in Mandinka people's traditions.",
      tr: "Mali'nin kültürel ve dini mirası, Mandinka halkının geleneklerinde yaşamaya devam eder.",
    },
    category: "politics",
    importance: "high",
  },
];

// =============================================================================
// LEADERS (Mansas) — All with profile pages
// =============================================================================

const maliLeaders: Sultan[] = [
  { id: "sundiata-keita", name: "Sundiata Keita", reignStart: 1235, reignEnd: 1255, parentId: null, generation: 1, title: { sv: "Grundaren — Lejonkungen", en: "The Founder — The Lion King", tr: "Kurucu — Aslan Kral" }, profileId: "sundiata-keita" },
  { id: "mansa-uli-i", name: "Mansa Uli I", reignStart: 1255, reignEnd: 1270, parentId: "sundiata-keita", generation: 2, title: { sv: "Pilgrimskungen", en: "The Pilgrim King", tr: "Hacı Kral" }, profileId: "mansa-uli-i" },
  { id: "mansa-wati", name: "Mansa Wati", reignStart: 1270, reignEnd: 1274, parentId: "sundiata-keita", generation: 2, title: { sv: "Den kortlivade", en: "The Short-Lived", tr: "Kısa Ömürlü" }, profileId: "mansa-wati" },
  { id: "mansa-khalifa", name: "Mansa Khalifa", reignStart: 1274, reignEnd: 1275, parentId: "sundiata-keita", generation: 2, title: { sv: "Den avsatte tyrannens", en: "The Deposed Tyrant", tr: "Devrilmiş Tiran" }, profileId: "mansa-khalifa" },
  { id: "abu-bakr-i", name: "Mansa Abu Bakr I", reignStart: 1275, reignEnd: 1285, parentId: null, generation: 3, title: { sv: "Stabilitetens kung", en: "King of Stability", tr: "İstikrar Kralı" }, profileId: "abu-bakr-i" },
  { id: "sakoura", name: "Mansa Sakoura", reignStart: 1285, reignEnd: 1300, parentId: null, generation: 3, title: { sv: "Slavkonungen — Erövrarens", en: "The Slave King — The Conqueror", tr: "Köle Kral — Fatih" }, profileId: "sakoura" },
  { id: "gao", name: "Mansa Gao", reignStart: 1300, reignEnd: 1305, parentId: "mansa-uli-i", generation: 3, title: { sv: "Återställaren", en: "The Restorer", tr: "Yenileyici" }, profileId: "gao" },
  { id: "mohammed-ibn-gao", name: "Mansa Mohammed ibn Gao", reignStart: 1305, reignEnd: 1307, parentId: "gao", generation: 4, title: { sv: "Övergångskungen", en: "The Transitional King", tr: "Geçiş Kralı" }, profileId: "mohammed-ibn-gao" },
  { id: "abu-bakr-ii", name: "Mansa Abu Bakr II", reignStart: 1307, reignEnd: 1307, parentId: null, generation: 4, title: { sv: "Atlantfararen", en: "The Atlantic Explorer", tr: "Atlantik Kaşifi" }, profileId: "abu-bakr-ii" },
  { id: "mansa-musa-i", name: "Mansa Musa I", reignStart: 1307, reignEnd: 1337, parentId: null, generation: 4, title: { sv: "Guldkejsaren — Världens rikaste man", en: "The Golden Emperor — World's Richest Man", tr: "Altın İmparator — Dünyanın En Zengin Adamı" }, profileId: "mansa-musa-i" },
  { id: "mansa-maghan-i", name: "Mansa Maghan I", reignStart: 1337, reignEnd: 1341, parentId: "mansa-musa-i", generation: 5, title: { sv: "Den svage sonen", en: "The Weak Son", tr: "Zayıf Oğul" }, profileId: "mansa-maghan-i" },
  { id: "mansa-suleyman", name: "Mansa Suleyman", reignStart: 1341, reignEnd: 1360, parentId: null, generation: 4, title: { sv: "Den diplomatiske administratören", en: "The Diplomatic Administrator", tr: "Diplomatik Yönetici" }, profileId: "mansa-suleyman" },
  { id: "mansa-qasa", name: "Mansa Qasa (Camba)", reignStart: 1360, reignEnd: 1360, parentId: "mansa-suleyman", generation: 5, title: { sv: "Månadskonungen", en: "The Month-Long King", tr: "Aylık Kral" }, profileId: "mansa-qasa" },
  { id: "mansa-mari-jata-ii", name: "Mansa Mari Jata II", reignStart: 1360, reignEnd: 1374, parentId: "mansa-maghan-i", generation: 5, title: { sv: "Den sjuke och ödslande", en: "The Sick and Wasteful", tr: "Hasta ve İsrafçı" }, profileId: "mansa-mari-jata-ii" },
  { id: "mansa-musa-ii", name: "Mansa Musa II", reignStart: 1374, reignEnd: 1387, parentId: "mansa-mari-jata-ii", generation: 6, title: { sv: "Skattemästarens kung", en: "King of the Treasurer", tr: "Haznedar Kralı" }, profileId: "mansa-musa-ii" },
  { id: "mansa-maghan-ii", name: "Mansa Maghan II", reignStart: 1387, reignEnd: 1387, parentId: "mansa-musa-ii", generation: 6, title: { sv: "Den kortregerade", en: "The Briefly Reigning", tr: "Kısa Süre Hüküm Süren" }, profileId: "mansa-maghan-ii" },
  { id: "mansa-sandaki", name: "Mansa Sandaki", reignStart: 1387, reignEnd: 1388, parentId: null, generation: 6, title: { sv: "Usurpatorn", en: "The Usurper", tr: "Gasıp" }, profileId: "mansa-sandaki" },
  { id: "mansa-maghan-iii", name: "Mansa Maghan III", reignStart: 1388, reignEnd: 1390, parentId: "mansa-musa-ii", generation: 6, title: { sv: "Återupprättarens kung", en: "King of the Restorer", tr: "Onarıcı Kral" }, profileId: "mansa-maghan-iii" },
  { id: "mansa-musa-iii", name: "Mansa Musa III", reignStart: 1390, reignEnd: 1400, parentId: null, generation: 6, title: { sv: "Den siste store", en: "The Last Great One", tr: "Son Büyük" }, profileId: "mansa-musa-iii" },
  { id: "mansa-mahmud-i", name: "Mansa Mahmud I", reignStart: 1400, reignEnd: 1420, parentId: null, generation: 7, title: { sv: "Nedgångstiden kung", en: "King of the Decline Age", tr: "Gerileme Çağının Kralı" }, profileId: "mansa-mahmud-i" },
  { id: "mansa-mahmud-ii", name: "Mansa Mahmud II", reignStart: 1480, reignEnd: 1496, parentId: null, generation: 8, title: { sv: "Det sista motanfallet", en: "The Last Counterattack", tr: "Son Karşı Saldırı" }, profileId: "mansa-mahmud-ii" },
  { id: "mansa-mahmud-iii", name: "Mansa Mahmud III", reignStart: 1496, reignEnd: 1559, parentId: "mansa-mahmud-ii", generation: 9, title: { sv: "Sista ansträngningens kung", en: "King of the Last Effort", tr: "Son Çabanın Kralı" }, profileId: "mansa-mahmud-iii" },
  { id: "mansa-mahmud-iv", name: "Mansa Mahmud IV", reignStart: 1559, reignEnd: 1600, parentId: "mansa-mahmud-iii", generation: 10, title: { sv: "Den siste Mansa", en: "The Last Mansa", tr: "Son Mansa" }, profileId: "mansa-mahmud-iv" },
];

// =============================================================================
// QUIZ — Empty structure (questions added via Admin Dashboard)
// =============================================================================

const maliQuizQuestions: QuizQuestion[] = [];

// =============================================================================
// BADGES
// =============================================================================

const maliBadges: Badge[] = [
  {
    id: "griot",
    name: { sv: "Griot — Berättarens röst", en: "Griot — Voice of the Storyteller", tr: "Griot — Hikaye Anlatıcısının Sesi" },
    icon: "🥁",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor och börja bära griots heliga minne.",
      en: "Answer 3 questions correctly and begin carrying the griot's sacred memory.",
      tr: "3 soruyu doğru yanıtlayın ve griot'un kutsal belleğini taşımaya başlayın.",
    },
  },
  {
    id: "mandinka",
    name: { sv: "Mandinka-krigare", en: "Mandinka Warrior", tr: "Mandinka Savaşçısı" },
    icon: "⚔️",
    requiredScore: 5,
    description: {
      sv: "Svara rätt på 5 frågor — du bär nu Sundiatas anda.",
      en: "Answer 5 questions correctly — you now carry Sundiata's spirit.",
      tr: "5 soruyu doğru yanıtlayın — artık Sundiata'nın ruhunu taşıyorsunuz.",
    },
  },
  {
    id: "mansa",
    name: { sv: "Mansa — Imperiets härskare", en: "Mansa — Ruler of the Empire", tr: "Mansa — İmparatorluğun Hükümdarı" },
    icon: "👑",
    requiredScore: 8,
    description: {
      sv: "Svara rätt på 8 frågor — Manden böjer knä inför dig.",
      en: "Answer 8 questions correctly — Manden bows before you.",
      tr: "8 soruyu doğru yanıtlayın — Manden önünüzde eğilir.",
    },
  },
  {
    id: "mansa-musa",
    name: { sv: "Mansa Musa — Guldens mästare", en: "Mansa Musa — Master of Gold", tr: "Mansa Musa — Altının Ustası" },
    icon: "🌟",
    requiredScore: 12,
    description: {
      sv: "Svara rätt på 12 frågor — du är rikare i kunskap än Mansa Musa var i guld.",
      en: "Answer 12 questions correctly — you are richer in knowledge than Mansa Musa was in gold.",
      tr: "12 soruyu doğru yanıtlayın — Mansa Musa'nın altın bakımından zengin olduğu gibi siz de bilgi bakımından zenginsiniz.",
    },
  },
];

// =============================================================================
// PROFILES — All Mansas with detailed pages
// =============================================================================

const maliProfiles: HistoricalProfile[] = [
  {
    id: "sundiata-keita",
    name: "Sundiata Keita",
    years: "ca. 1217–1255",
    title: { sv: "Grundaren — Lejonkungen", en: "The Founder — The Lion King", tr: "Kurucu — Aslan Kral" },
    portrait: "🦁",
    bio: {
      sv: "Sundiata Keita är Västafrikas mest ikoniska historiska hjälte och grundaren av Mali-imperiet. Född som son till Nare Maghann Konaté, den nionde kungen av Mandeklingens Keita-clan, fick han en legendomspunnen uppväxt präglad av prövningar. Enligt den muntliga traditionen bevarad av griots var han lam som barn — en svaghet som fick rivaliserande klanmedlemmar att förakta honom. Men vid ungefär sju års ålder reste han sig, tog ett järnspjut och gick — ett mirakel som förutspådde hans storhet. Han tvingades leva i exil under Sosso-riket under Sumanguru Kantés grymma herravälde, men samlade i exilens skola allierade, resurser och en brinnande beslutsamhet att befria sitt folk.",
      en: "Sundiata Keita is West Africa's most iconic historical hero and the founder of the Mali Empire. Born as son of Nare Maghann Konaté, the ninth king of the Mande Keita clan, he had a legendary upbringing marked by trials. According to oral tradition preserved by griots he was lame as a child — a weakness that caused rival clan members to despise him. But at around seven years old he rose, took an iron spear and walked — a miracle foretelling his greatness. He was forced to live in exile during the Sosso kingdom's cruel dominance under Sumanguru Kanté, but in exile's school gathered allies, resources and a burning determination to liberate his people.",
      tr: "Sundiata Keita, Batı Afrika'nın en ikonik tarihsel kahramanı ve Mali İmparatorluğu'nun kurucusudur. Griotların koruduğu sözlü geleneğe göre çocukken kötürümdü ama yaklaşık yedi yaşında bir demir mızrağı alıp yürüdü — bu mucize onun büyüklüğünü haber veriyordu. Sürgünde müttefik topladı ve halkını özgürleştirme kararlılığıyla dolup taştı.",
    },
    reforms: {
      sv: ["Grundandet av Mali-imperiet (1235)", "Etablerandet av Gbara — Malis rådsförsamling", "Skapandet av ett administrativt system för det nya imperiet", "Erövringen av Ghana-rikets territorier och handelsnätverk", "Skyddet av Saharahandeln och guldrutterna"],
      en: ["Founding of the Mali Empire (1235)", "Establishment of Gbara — Mali's council assembly", "Creation of an administrative system for the new empire", "Conquest of Ghana kingdom's territories and trade networks", "Protection of Saharan trade and gold routes"],
      tr: ["Mali İmparatorluğu'nun kurulması (1235)", "Gbara'nın kurulması — Mali'nin meclis kurulu", "Yeni imparatorluk için idari sistem oluşturulması", "Gana krallığının toprakları ve ticaret ağlarının fethi"],
    },
    campaigns: {
      sv: ["Befrielsekampanjen mot Sosso (1234–1235)", "Slaget vid Kirina (1235) — Sumanguru Kanté besegras", "Erövringen av Kumbi Saleh och Ghana-territoriet (1240)", "Kampanjen längs Nigerfloden för att säkra handelsvägar"],
      en: ["Liberation campaign against Sosso (1234–1235)", "Battle of Kirina (1235) — Sumanguru Kanté defeated", "Conquest of Kumbi Saleh and Ghana territory (1240)", "Campaign along the Niger River to secure trade routes"],
      tr: ["Sosso'ya karşı kurtuluş seferi (1234–1235)", "Kirina Savaşı (1235) — Sumanguru Kanté yenilir", "Kumbi Saleh ve Gana topraklarının fethi (1240)"],
    },
    leadershipStyle: {
      sv: "Sundiata kombinerade militärt geni med politisk visdom och karismatisk auktoritet. Han förstod att enbart militär kraft inte räckte — han byggde koalitioner, respekterade lokala sedvänjor och skapade ett system där besegrade folk inkorporerades som allierade snarare än kuvade undersåtar. Hans ledarstil var inkluderande och pragmatisk — egenskaper som lade grunden för ett stabilt imperium snarare än en kortlivad erövrarmakt.",
      en: "Sundiata combined military genius with political wisdom and charismatic authority. He understood that military force alone was not enough — he built coalitions, respected local customs and created a system where defeated peoples were incorporated as allies rather than subjugated subjects. His leadership style was inclusive and pragmatic — qualities that laid the foundation for a stable empire rather than a short-lived conquering power.",
      tr: "Sundiata, askeri dehasını siyasi bilgelik ve karizmatik otoriteyle birleştirdi. Yalnızca askeri gücün yeterli olmadığını anlayarak koalisyonlar kurdu, yerel geleneklere saygı gösterdi ve yenilen halkları köleleştirmek yerine müttefik olarak kapsadı.",
    },
    criticalPerspectives: {
      sv: "Sundiata-eposet är en av historiens mest kraftfulla muntliga traditioner, men det är viktigt att skilja mellan den historiske Sundiata och den mytologiske lejonkungen. Moderna historiker debatterar vilka delar av berättelsen som är historiska fakta och vilka som är mytologisk utsmyckning tillagd av generationer av griots. Den magiska dimensionen — Sundiatas mirakulösa helande och Sumanguru Kantés övernaturliga krafter — reflekterar mer en afrikansk andlig världsbild än historisk dokumentation.",
      en: "The Sundiata epic is one of history's most powerful oral traditions, but it is important to distinguish between the historical Sundiata and the mythological lion king. Modern historians debate which parts of the story are historical fact and which are mythological embellishment added by generations of griots. The magical dimension — Sundiata's miraculous healing and Sumanguru Kanté's supernatural powers — reflects more an African spiritual worldview than historical documentation.",
      tr: "Sundiata destanı, tarihin en güçlü sözlü geleneklerinden biridir, ancak tarihsel Sundiata ile mitolojik aslan kral arasında ayrım yapmak önemlidir. Modern tarihçiler, destanın hangi bölümlerinin tarihsel gerçek, hangilerinin mitolojik süsleme olduğunu tartışır.",
    },
  },
  {
    id: "mansa-uli-i",
    name: "Mansa Uli I (Yerelinkon)",
    years: "ca. 1255–1270",
    title: { sv: "Pilgrimskungen", en: "The Pilgrim King", tr: "Hacı Kral" },
    portrait: "🕌",
    bio: {
      sv: "Mansa Uli I, äldste son till Sundiata Keita, regerade Mali-imperiet i femton år efter sin fars död. Han konsoliderade det imperium fadern skapat och etablerade den viktiga traditionens hajj — den islamiska pilgrimsfärden till Mekka — som en central del av Mali-kungadömets legitimitet. Hans pilgrimsfärd signalerade till den islamiska världen att Mali var en seriös muslimsk stat vars härskare tog religionen på allvar.",
      en: "Mansa Uli I, eldest son of Sundiata Keita, ruled the Mali Empire for fifteen years after his father's death. He consolidated the empire his father created and established the important tradition of hajj — the Islamic pilgrimage to Mecca — as a central part of Mali royal legitimacy. His pilgrimage signalled to the Islamic world that Mali was a serious Muslim state whose rulers took religion seriously.",
      tr: "Mansa Uli I, Sundiata Keita'nın en büyük oğlu, babasının ölümünün ardından on beş yıl Mali İmparatorluğu'nu yönetti. Babasının kurduğu imparatorluğu pekiştirdi ve hac geleneğini Mali kraliyet meşruiyetinin merkezi bir parçası olarak yerleştirdi.",
    },
    reforms: {
      sv: ["Konsolideringen av Sundiatas imperium", "Etablerandet av hajj-traditionen för Mali-kungar", "Stärkandet av handelsrelationer med Nordafrika"],
      en: ["Consolidation of Sundiata's empire", "Establishment of hajj tradition for Mali kings", "Strengthening trade relations with North Africa"],
      tr: ["Sundiata'nın imparatorluğunun pekiştirilmesi", "Mali kralları için hac geleneğinin kurulması", "Kuzey Afrika ile ticaret ilişkilerinin güçlendirilmesi"],
    },
    campaigns: {
      sv: ["Militärkampanjer för att säkra gränserna mot Wolof-riket i väster"],
      en: ["Military campaigns to secure borders against the Wolof kingdom in the west"],
      tr: ["Batıdaki Wolof krallığına karşı sınırları güvence altına almak için askeri seferler"],
    },
    leadershipStyle: {
      sv: "Uli I var en konsoliderande snarare än expansiv härskare — han förstod att det unga imperiets viktigaste behov var stabilitet och legitimitet, inte ytterligare erövring.",
      en: "Uli I was a consolidating rather than expansive ruler — he understood that the young empire's most important need was stability and legitimacy, not further conquest.",
      tr: "Uli I, genişlemeci değil pekiştirici bir hükümdardı — genç imparatorluğun en önemli ihtiyacının daha fazla fetih değil, istikrar ve meşruiyet olduğunu anladı.",
    },
    criticalPerspectives: {
      sv: "Mansa Uli Is styre är dåligt dokumenterat i historiska källor. Det mesta vi vet om honom kommer från arabiska geografi och kroniker som ger knapphändiga beskrivningar.",
      en: "Mansa Uli I's rule is poorly documented in historical sources. Most of what we know about him comes from Arab geographies and chronicles that give sparse descriptions.",
      tr: "Mansa Uli I'nin yönetimi, tarihsel kaynaklarda yetersiz belgelenmiştir.",
    },
  },
  {
    id: "mansa-wati",
    name: "Mansa Wati",
    years: "ca. 1270–1274",
    title: { sv: "Den kortlivade", en: "The Short-Lived", tr: "Kısa Ömürlü" },
    portrait: "⚡",
    bio: {
      sv: "Mansa Wati, son till Sundiata Keita, regerade i mycket kort tid efter Mansa Uli. Arabiska historiker noterar hans kortvariga styre utan att ge detaljer om hans politiska bedrifter. Hans korta regeringstid var förmodligen präglad av interna successionsstrider bland Sundiatas söner — ett mönster som skulle återkomma flera gånger under Malis historia.",
      en: "Mansa Wati, son of Sundiata Keita, ruled for a very short time after Mansa Uli. Arab historians note his brief reign without giving details of his political achievements. His short reign was probably marked by internal succession struggles among Sundiata's sons — a pattern that would recur several times in Mali's history.",
      tr: "Mansa Wati, Mansa Uli'den sonra çok kısa bir süre hüküm sürdü. Kısa saltanatı muhtemelen Sundiata'nın oğulları arasındaki iç veraset mücadeleleriyle geçti.",
    },
    reforms: {
      sv: ["Inga kända reformer under det korta styret"],
      en: ["No known reforms during the brief reign"],
      tr: ["Kısa saltanat döneminde bilinen reform yok"],
    },
    campaigns: {
      sv: ["Inga kända kampanjer"],
      en: ["No known campaigns"],
      tr: ["Bilinen sefer yok"],
    },
    leadershipStyle: {
      sv: "Otillräcklig information finns tillgänglig för en analys av hans ledarstil.",
      en: "Insufficient information is available for an analysis of his leadership style.",
      tr: "Liderlik tarzı analizi için yeterli bilgi mevcut değil.",
    },
    criticalPerspectives: {
      sv: "Mansa Wati är ett av de dåligast dokumenterade namnen i Mali-dynastin — hans styre glider nästan igenom historien utan att lämna spår.",
      en: "Mansa Wati is one of the most poorly documented names in the Mali dynasty — his rule almost slips through history without leaving traces.",
      tr: "Mansa Wati, Mali hanedanında en kötü belgelenmiş isimlerden biridir.",
    },
  },
  {
    id: "mansa-khalifa",
    name: "Mansa Khalifa",
    years: "ca. 1274–1275",
    title: { sv: "Den avsatte tyrannens", en: "The Deposed Tyrant", tr: "Devrilmiş Tiran" },
    portrait: "🏹",
    bio: {
      sv: "Mansa Khalifa, den tredje sonen till Sundiata, sticker ut i Mali-dynastins historia som en tyrann som störtades av sitt eget folk. Arabiske historikern Ibn Khaldun berättar att Khalifa roade sig med att skjuta pilar mot sina egna undersåtar och dödade folk för nöjes skull. Hans ondska var så uppenbar att Mali-folket reste sig och dödade honom — en av de få gångerna i Malis historia då folket avsatte en härskare.",
      en: "Mansa Khalifa, the third son of Sundiata, stands out in Mali dynasty history as a tyrant overthrown by his own people. Arab historian Ibn Khaldun tells that Khalifa amused himself by shooting arrows at his own subjects and killed people for pleasure. His wickedness was so obvious that the Mali people rose up and killed him — one of the few times in Mali's history when the people deposed a ruler.",
      tr: "Mansa Khalifa, Sundiata'nın üçüncü oğlu, Mali hanedanlık tarihinde kendi halkı tarafından devrilen bir tiran olarak öne çıkar. Arap tarihçi İbn Haldun, Khalifa'nın kendi tebaasına ok atarak eğlendiğini aktarır. Mali halkı ayaklandı ve onu öldürdü.",
    },
    reforms: {
      sv: ["Inga reformer — hans styre var präglat av kaos och tyranni"],
      en: ["No reforms — his reign was marked by chaos and tyranny"],
      tr: ["Reform yok — saltanatı kaos ve tiranlıkla geçti"],
    },
    campaigns: {
      sv: ["Inga känd militär aktivitet"],
      en: ["No known military activity"],
      tr: ["Bilinen askeri faaliyet yok"],
    },
    leadershipStyle: {
      sv: "Khalifas 'ledarstil' var ren tyranni och sadism — han ansågs som ett monstrum av sina samtida och eliminerades av folket självt.",
      en: "Khalifa's 'leadership style' was pure tyranny and sadism — he was regarded as a monster by his contemporaries and eliminated by the people themselves.",
      tr: "Khalifa'nın 'liderlik tarzı' saf tiranlık ve sadizmdi — çağdaşları tarafından canavar olarak görüldü ve halkın kendisi tarafından ortadan kaldırıldı.",
    },
    criticalPerspectives: {
      sv: "Khalifas tyranniska rykte är nästan uteslutande baserat på Ibn Khalduns andrahandskälla. Det är möjligt att bilden är överdrivet negativ — han kan ha avsatts av politiska rivaler som sedan demoniserade hans minne.",
      en: "Khalifa's tyrannical reputation is almost exclusively based on Ibn Khaldun's secondary source. It is possible that the image is exaggeratedly negative — he may have been deposed by political rivals who then demonised his memory.",
      tr: "Khalifa'nın tiran itibarı neredeyse yalnızca İbn Haldun'un ikincil kaynağına dayanır. Bu imgenin abartılmış olması mümkündür.",
    },
  },
  {
    id: "abu-bakr-i",
    name: "Mansa Abu Bakr I",
    years: "ca. 1275–1285",
    title: { sv: "Stabilitetens kung", en: "King of Stability", tr: "İstikrar Kralı" },
    portrait: "⚖️",
    bio: {
      sv: "Mansa Abu Bakr I efterträdde den tyranniske Khalifa och återställde ordning och stabilitet i imperiet. Inte av Sundiatas direkta linje utan av en sidogren av Keita-klanen, han representerar den viktiga rollen som stabilisatorer i dynastier som periodvis genomgår interna kriser. Arabiska källor är sparsamma om hans styre men antyder att han återinförde rättvisa administration och respekt för imperiet grundlagar.",
      en: "Mansa Abu Bakr I succeeded the tyrannical Khalifa and restored order and stability to the empire. Not of Sundiata's direct line but of a side branch of the Keita clan, he represents the important role of stabilisers in dynasties that periodically undergo internal crises. Arab sources are sparse about his reign but suggest he restored just administration and respect for the empire's foundational laws.",
      tr: "Mansa Abu Bakr I, tiran Khalifa'nın ardından tahta geçerek imparatorluğa düzen ve istikrar getirdi. Keita klanının yan kolundan geliyordu. Arap kaynakları, hükümdarlığı hakkında seyrek bilgi verir.",
    },
    reforms: {
      sv: ["Återupprättandet av rättvisa i administrationen efter Khalifas tyranni", "Konsolideringen av dynastins stabilitet"],
      en: ["Restoration of justice in administration after Khalifa's tyranny", "Consolidation of dynastic stability"],
      tr: ["Khalifa'nın tiranlığından sonra yönetimde adaletin yeniden tesisi", "Hanedanlık istikrarının pekiştirilmesi"],
    },
    campaigns: {
      sv: ["Inga kända expansiva kampanjer"],
      en: ["No known expansive campaigns"],
      tr: ["Bilinen genişleme seferi yok"],
    },
    leadershipStyle: {
      sv: "Abu Bakr I var en konservativ och stabiliserande härskare — hans viktigaste bidrag var att bevara vad hans föregångare byggt snarare än att skapa nytt.",
      en: "Abu Bakr I was a conservative and stabilising ruler — his most important contribution was preserving what his predecessors had built rather than creating new.",
      tr: "Abu Bakr I, muhafazakar ve istikrar sağlayan bir hükümdardı — en önemli katkısı yenisini yaratmak yerine öncekilerinin kurduklarını korumaktı.",
    },
    criticalPerspectives: {
      sv: "Abu Bakr Is styre är extremt dåligt dokumenterat. Vi vet mer om vad han kom efter (tyrannen Khalifa) än om vad han faktiskt åstadkom.",
      en: "Abu Bakr I's reign is extremely poorly documented. We know more about what he came after (the tyrant Khalifa) than about what he actually accomplished.",
      tr: "Abu Bakr I'nin saltanatı son derece yetersiz belgelenmiştir.",
    },
  },
  {
    id: "sakoura",
    name: "Mansa Sakoura",
    years: "ca. 1285–1300",
    title: { sv: "Slavkonungen — Erövrarens", en: "The Slave King — The Conqueror", tr: "Köle Kral — Fatih" },
    portrait: "⚔️",
    bio: {
      sv: "Mansa Sakoura är en av de mest fascinerande och dramatiska figurerna i Mali-dynastins historia. En frigjord slav — en manumis — som tjänade vid Mali-hovet och sakta steg i graderna tack vare sin militära briljans och politiska intelligens. Han grep makten i ett palatsosteri kring 1285 i strid med den legitima Keita-dynastin. Trots sin icke-kungliga börd visade sig Sakoura vara en av Malis mest effektiva härskare — han expanderade imperiet avsevärt österut och erövrade Gao och Nilbøjens städer längs Niger.",
      en: "Mansa Sakoura is one of the most fascinating and dramatic figures in Mali dynasty history. A freed slave — a manumis — who served at the Mali court and slowly rose through the ranks thanks to his military brilliance and political intelligence. He seized power in a palace coup around 1285 in conflict with the legitimate Keita dynasty. Despite his non-royal birth Sakoura proved one of Mali's most effective rulers — he expanded the empire significantly eastward and conquered Gao and the Niger Bend cities along the Niger.",
      tr: "Mansa Sakoura, Mali hanedanlık tarihinin en büyüleyici ve dramatik figürlerinden biridir. Mali sarayında görev yapan ve askeri dehası ile siyasi zekası sayesinde rütbelerini yavaşça yükselten özgürleştirilmiş bir köleydi. Sarayda bir darbeyle iktidarı ele geçirdi.",
    },
    reforms: {
      sv: ["Militär reorganisation av Malis arméer", "Östlig expansion — erövringen av Gao", "Utvidgning av handelsrelationer längs Niger-rutten"],
      en: ["Military reorganisation of Mali's armies", "Eastern expansion — conquest of Gao", "Extension of trade relations along the Niger route"],
      tr: ["Mali ordularının askeri yeniden örgütlenmesi", "Doğuya genişleme — Gao'nun fethi", "Niger güzergahı boyunca ticaret ilişkilerinin genişletilmesi"],
    },
    campaigns: {
      sv: ["Erövringen av Gao och Niger-böjens städer (ca. 1285–1300)", "Kampanjer mot Tekrur i väster", "Hajj till Mekka — dödad på återvägen av banditer i östra Afrika"],
      en: ["Conquest of Gao and Niger Bend cities (ca. 1285–1300)", "Campaigns against Tekrur in the west", "Hajj to Mecca — killed on the return journey by bandits in East Africa"],
      tr: ["Gao ve Niger kıvrımı şehirlerinin fethi (yakl. 1285–1300)", "Batıdaki Tekrur'a karşı seferler", "Mekke'ye hac — dönüş yolunda Doğu Afrika'da eşkıya tarafından öldürüldü"],
    },
    leadershipStyle: {
      sv: "Sakoura var en militär autokrat med personlig karisma och briljans. Han visade att förtjänst, inte börd, kunde definiera ledarskapet i Mali — ett radikalt koncept i ett dynastiskt system. Hans styre var effektivt men byggde på personlig makt snarare än institutionell legitimitet.",
      en: "Sakoura was a military autocrat with personal charisma and brilliance. He showed that merit, not birth, could define leadership in Mali — a radical concept in a dynastic system. His rule was effective but built on personal power rather than institutional legitimacy.",
      tr: "Sakoura, kişisel karizması ve dehası olan askeri bir otokrattı. Liyakatin, doğum soyunun değil, Mali'deki liderliği tanımlayabileceğini gösterdi.",
    },
    criticalPerspectives: {
      sv: "Sakouras usurpation av tronen skapade ett prejudikat för icke-dynastiska maktövertaganden i Mali — ett prejudikat som bidrog till imperiets senare instabilitet. Hans framgångsrika styre visade att kompetens trumfar börd, men det underminerade också den dynastiska stabiliteten.",
      en: "Sakoura's usurpation of the throne created a precedent for non-dynastic power seizures in Mali — a precedent that contributed to the empire's later instability. His successful rule showed that competence trumps birth, but it also undermined dynastic stability.",
      tr: "Sakoura'nın tahtı ele geçirmesi, Mali'de hanedanlık dışı iktidar el koymaları için bir emsal oluşturdu — bu emsal imparatorluğun sonraki istikrarsızlığına katkıda bulundu.",
    },
  },
  {
    id: "gao",
    name: "Mansa Gao",
    years: "ca. 1300–1305",
    title: { sv: "Återställaren", en: "The Restorer", tr: "Yenileyici" },
    portrait: "🔄",
    bio: {
      sv: "Mansa Gao, son till Mansa Uli I och legitim arvtagare till Keita-dynastin, återställde den legitima dynastiska ordningen efter Sakouras icke-dynastiska styre och Sakouras död. Hans styre representerade en återgång till Sundiatas linje och en återupprättning av den dynastiska legitimitetens princip. Han regerade utan känt dramatik men stabiliserade imperiet inför det kommande briljanta Mansa Musa-styret.",
      en: "Mansa Gao, son of Mansa Uli I and legitimate heir to the Keita dynasty, restored the legitimate dynastic order after Sakoura's non-dynastic rule and Sakoura's death. His reign represented a return to Sundiata's line and a restoration of the dynastic legitimacy principle. He ruled without known drama but stabilised the empire before the coming brilliant Mansa Musa reign.",
      tr: "Mansa Gao, Mansa Uli I'nin oğlu ve Keita hanedanının meşru varisi, Sakoura'nın hanedanlık dışı yönetimi ve ölümünün ardından meşru hanedanlık düzenini geri getirdi.",
    },
    reforms: {
      sv: ["Återupprättandet av Keita-dynastins legitimitet efter Sakouras styre"],
      en: ["Restoration of Keita dynasty legitimacy after Sakoura's reign"],
      tr: ["Sakoura'nın saltanatından sonra Keita hanedanlığı meşruiyetinin yeniden tesisi"],
    },
    campaigns: {
      sv: ["Konsolideringen av de territorier Sakoura erövrat"],
      en: ["Consolidation of the territories Sakoura had conquered"],
      tr: ["Sakoura'nın fethettiği toprakların pekiştirilmesi"],
    },
    leadershipStyle: {
      sv: "Gao var en legitimitetsbaserad snarare än prestationsbaserad härskare — hans viktigaste roll var att återupprätta dynastisk ordning.",
      en: "Gao was a legitimacy-based rather than achievement-based ruler — his most important role was restoring dynastic order.",
      tr: "Gao, başarı tabanlı değil meşruiyet tabanlı bir hükümdardı — en önemli rolü hanedanlık düzenini yeniden sağlamaktı.",
    },
    criticalPerspectives: {
      sv: "Mansa Gaos styre är historiskt nästan osynligt. Hans viktigaste funktion var dynastisk snarare än politisk.",
      en: "Mansa Gao's reign is historically almost invisible. His most important function was dynastic rather than political.",
      tr: "Mansa Gao'nun saltanatı tarihsel olarak neredeyse görünmezdir.",
    },
  },
  {
    id: "mohammed-ibn-gao",
    name: "Mansa Mohammed ibn Gao",
    years: "ca. 1305–1307",
    title: { sv: "Övergångskungen", en: "The Transitional King", tr: "Geçiş Kralı" },
    portrait: "🌉",
    bio: {
      sv: "Mohammed ibn Gao, son till Mansa Gao, regerade i ungefär två år och var övergångshärskaren som förberedde imperiet för Mansa Musas extraordinära era. Historiska källor är minimala om hans styre. Han representerar det dynastiska kedjelänk mellan de konsoliderande styrena efter Sundiata och den briljanta toppen under Mansa Musa.",
      en: "Mohammed ibn Gao, son of Mansa Gao, ruled for approximately two years and was the transitional ruler who prepared the empire for Mansa Musa's extraordinary era. Historical sources are minimal about his reign. He represents the dynastic link between the consolidating reigns after Sundiata and the brilliant peak under Mansa Musa.",
      tr: "Mohammed ibn Gao, Mansa Gao'nun oğlu, yaklaşık iki yıl hüküm sürdü ve imparatorluğu Mansa Musa'nın olağanüstü dönemine hazırlayan geçiş hükümdarıydı.",
    },
    reforms: { sv: ["Inga kända reformer"], en: ["No known reforms"], tr: ["Bilinen reform yok"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: {
      sv: "För lite är känt för en meningsfull analys.",
      en: "Too little is known for meaningful analysis.",
      tr: "Anlamlı bir analiz için çok az şey bilinmektedir.",
    },
    criticalPerspectives: {
      sv: "Mohammed ibn Gao är historiskt nästan osynlig — hans styre glider förbi utan dokumenterade spår.",
      en: "Mohammed ibn Gao is historically almost invisible — his reign passes by without documented traces.",
      tr: "Mohammed ibn Gao tarihsel olarak neredeyse görünmezdir.",
    },
  },
  {
    id: "abu-bakr-ii",
    name: "Mansa Abu Bakr II",
    years: "ca. ?–1311",
    title: { sv: "Atlantfararen — Västerledsgåtan", en: "The Atlantic Explorer — The Westward Mystery", tr: "Atlantik Kaşifi — Batıya Doğru Gizem" },
    portrait: "🌊",
    bio: {
      sv: "Mansa Abu Bakr II är en av historiens mest gåtfulla och fascinerande figurer. Han regerade Mali-imperiet tills han 1311 bestämde sig för att överlämna tronen till sin bror Musa och leda den mest ambitiösa atlantiska utforskningsexpeditionen i förmodern tid. Enligt arabiske historikern al-Umari, som citerar Mansa Musa, samlade Abu Bakr II 2000 kanoter och 1000 reservbåtar fyllda med mat, vatten och guld. Hans mål: att segla västerut och utforska vad som finns på andra sidan Atlanten. Inget skepp återvände.",
      en: "Mansa Abu Bakr II is one of history's most mysterious and fascinating figures. He ruled the Mali Empire until in 1311 he decided to hand the throne to his brother Musa and lead the most ambitious Atlantic exploration expedition in pre-modern times. According to Arab historian al-Umari, citing Mansa Musa, Abu Bakr II assembled 2,000 canoes and 1,000 reserve boats filled with food, water and gold. His goal: to sail westward and explore what lies on the other side of the Atlantic. No vessel returned.",
      tr: "Mansa Abu Bakr II, tarihin en gizemli ve büyüleyici figürlerinden biridir. 1311'de tahtı kardeşi Musa'ya devrederek modern öncesi dönemin en iddialı Atlantik keşif seferine önderlik etti. 2000 kano ve 1000 yedek tekne topladı. Hiçbir gemi geri dönmedi.",
    },
    reforms: {
      sv: ["Frivillig abdikation för att leda atlantisk utforskningsexpedition", "Fredsam maktöverlåtelse till Mansa Musa"],
      en: ["Voluntary abdication to lead Atlantic exploration expedition", "Peaceful transfer of power to Mansa Musa"],
      tr: ["Atlantik keşif seferine önderlik etmek için gönüllü feragat", "Mansa Musa'ya barışçıl iktidar devri"],
    },
    campaigns: {
      sv: ["Den atlantiska expeditionen (1311) — Malis Atlantresa", "Möjlig transatlantisk kontakt med Amerika (historiskt debatterat)"],
      en: ["The Atlantic expedition (1311) — Mali's Atlantic voyage", "Possible transatlantic contact with the Americas (historically debated)"],
      tr: ["Atlantik seferi (1311) — Mali'nin Atlantik yolculuğu", "Amerika ile olası transatlantik temas (tarihsel olarak tartışmalı)"],
    },
    leadershipStyle: {
      sv: "Abu Bakr II var en visionär utforskare driven av nyfikenhet snarare än erövringslust — han överlämnade frivilligt ett av världens mäktigaste imperier för en okänd resa. Hans beslut reflekterar en extraordinär personlighet som värderade kunskap och utforskning över makt och trygghet.",
      en: "Abu Bakr II was a visionary explorer driven by curiosity rather than conquest — he voluntarily surrendered one of the world's most powerful empires for an unknown journey. His decision reflects an extraordinary personality who valued knowledge and exploration over power and security.",
      tr: "Abu Bakr II, fetih arzusundan değil meraktan yönlendirilen vizyoner bir kaşifti — dünyanın en güçlü imparatorluklarından birini gönüllü olarak bilinmezliğe giden bir yolculuk için terk etti.",
    },
    criticalPerspectives: {
      sv: "Abu Bakr IIs expedition är historiskt belagd men dess utfall förblir ett mysterium. Teorin att malinesiska navigatörer nådde Amerika före Kolumbus — framförd bland annat av Ivan Van Sertima i 'They Came Before Columbus' — är omtvistad och har inte accepterats av akademiska konsensus. Arkeologiska fynd som ibland åberopas är inte entydigt kopplade till afrikansk kontakt.",
      en: "Abu Bakr II's expedition is historically attested but its outcome remains a mystery. The theory that Malian navigators reached the Americas before Columbus — put forward among others by Ivan Van Sertima in 'They Came Before Columbus' — is contested and has not been accepted by academic consensus. Archaeological finds sometimes cited are not unambiguously linked to African contact.",
      tr: "Abu Bakr II'nin seferi tarihsel olarak belgelenmiştir, ancak sonucu bir gizem olarak kalmaktadır. Maliili denizcilerin Kolomb'dan önce Amerika'ya ulaştığı teorisi, akademik konsensüs tarafından kabul görmemiştir.",
    },
  },
  {
    id: "mansa-musa-i",
    name: "Mansa Musa I (Musa Keita I)",
    years: "ca. 1280–1337",
    title: { sv: "Guldkejsaren — Världens rikaste man", en: "The Golden Emperor — World's Richest Man", tr: "Altın İmparator — Dünyanın En Zengin Adamı" },
    portrait: "👑",
    bio: {
      sv: "Mansa Musa I är det mest kände afrikanska historiska ledarskapet och med stor sannolikhet den rikaste personen som någonsin levat — hans förmögenhet uppskattad till mellan 300 och 400 miljarder dollar i moderna pengar. Han var son till Faga Leye, brorson till Sundiata Keita, och övertog tronen 1307 när Mansa Abu Bakr II seglade västerut på sin mystiska expedition och aldrig återvände. Under hans 25-åriga styre nådde Mali-imperiet sin absoluta zenith i alla dimensioner: geografisk storlek, ekonomisk makt, diplomatisk prestige och kulturell blomstring.",
      en: "Mansa Musa I is the most famous African historical leader and in all probability the richest person who ever lived — his fortune estimated at between 300 and 400 billion dollars in modern money. He was son of Faga Leye, nephew of Sundiata Keita, and took the throne in 1307 when Mansa Abu Bakr II sailed westward on his mysterious expedition and never returned. During his 25-year reign the Mali Empire reached its absolute zenith in all dimensions: geographic size, economic power, diplomatic prestige and cultural flowering.",
      tr: "Mansa Musa I, en ünlü Afrikalı tarihsel lider ve muhtemelen yaşamış en zengin kişidir — serveti modern parayla 300 ile 400 milyar dolar arasında tahmin edilir. 25 yıllık saltanatı boyunca Mali İmparatorluğu tüm boyutlarda mutlak zirvesine ulaştı.",
    },
    reforms: {
      sv: ["Massiva investeringar i Timbuktu som intellektuellt centrum", "Byggandet av Djinguereber-moskén och Sankore-universitetet", "Etablerandet av ett standardiserat monetärt system baserat på guld", "Diplomatiska relationer med Marocko, Egypten och Arabien", "Reformering av statsadministrationen längs islamiska linjer", "Stöd för islamisk lärdom och arabiska litterära traditioner"],
      en: ["Massive investments in Timbuktu as intellectual centre", "Building of Djinguereber Mosque and Sankore University", "Establishment of a standardised monetary system based on gold", "Diplomatic relations with Morocco, Egypt and Arabia", "Reform of state administration along Islamic lines", "Support for Islamic scholarship and Arabic literary traditions"],
      tr: ["Timbuktu'ya entelektüel merkez olarak büyük yatırımlar", "Djinguereber Camii ve Sankore Üniversitesi'nin inşası", "Altın bazlı standart para sistemi kurulması", "Fas, Mısır ve Arabistan ile diplomatik ilişkiler", "İslami ilim ve Arapça edebi geleneklere destek"],
    },
    campaigns: {
      sv: ["Erövringen av Timbuktu och Gao på återvägen från Mekka (1325)", "Konsolideringen av Malis kontroll över Sahara-handeln", "Militärkampanjer för att säkra guldgruvorna i Bambuk och Bure"],
      en: ["Conquest of Timbuktu and Gao on the return from Mecca (1325)", "Consolidation of Mali's control over Saharan trade", "Military campaigns to secure gold mines in Bambuk and Bure"],
      tr: ["Mekke'den dönüşte Timbuktu ve Gao'nun fethi (1325)", "Mali'nin Sahra ticareti üzerindeki kontrolünün pekiştirilmesi", "Bambuk ve Bure'deki altın madenlerini güvence altına almak için askeri seferler"],
    },
    leadershipStyle: {
      sv: "Mansa Musa kombinerade militär styrka med diplomatisk briljans och kulturell generositet. Hans hajj var inte bara en religiös plikt utan ett mästerslag i offentlig diplomati — han visade hela den islamiska världen Malis rikedom och makt. Hans investeringar i utbildning och arkitektur visar att han förstod att ett imperiets storhet mäts i mer än territorium och guld.",
      en: "Mansa Musa combined military strength with diplomatic brilliance and cultural generosity. His hajj was not just a religious duty but a masterpiece of public diplomacy — he showed the entire Islamic world Mali's wealth and power. His investments in education and architecture show that he understood that an empire's greatness is measured in more than territory and gold.",
      tr: "Mansa Musa, askeri gücü diplomatik zeka ve kültürel cömertlikle birleştirdi. Haccı yalnızca dini bir görev değil, tüm İslam dünyasına Mali'nin zenginliğini ve gücünü gösteren bir kamuoyu diplomasisi şaheseri gibiydi.",
    },
    criticalPerspectives: {
      sv: "Mansa Musas hajj, trots dess enorma diplomatiska framgång, hade oavsiktliga negativa konsekvenser. Genom att spendera så mycket guld i Kairo kollapsade han den egyptiska ekonomin och skapade en inflation som varade i 12 år och skadade tusentals vanliga egyptier. Vidare: Malis rikedom byggde på slaveri — guldgruvorna drevs med slavarbete och slavhandeln var ett centralt element i Malis ekonomi. Mansa Musas storhet är real men bör inte romantiseras.",
      en: "Mansa Musa's hajj, despite its enormous diplomatic success, had unintended negative consequences. By spending so much gold in Cairo he collapsed the Egyptian economy and created an inflation lasting 12 years that harmed thousands of ordinary Egyptians. Furthermore: Mali's wealth was built on slavery — the gold mines were operated with slave labour and the slave trade was a central element of Mali's economy. Mansa Musa's greatness is real but should not be romanticised.",
      tr: "Mansa Musa'nın haccı, diplomatik başarısına rağmen, istem dışı olumsuz sonuçlar doğurdu. Kahire'de bu kadar çok altın harcayarak Mısır ekonomisini çökertti ve 12 yıl süren bir enflasyon yarattı. Ayrıca: Mali'nin serveti kölelik üzerine kuruluydu. Mansa Musa'nın büyüklüğü gerçekdir ancak romantize edilmemeli.",
    },
  },
  {
    id: "mansa-maghan-i",
    name: "Mansa Maghan I",
    years: "ca. 1337–1341",
    title: { sv: "Den svage sonen", en: "The Weak Son", tr: "Zayıf Oğul" },
    portrait: "📉",
    bio: {
      sv: "Mansa Maghan I, son till Mansa Musa, ärvde ett av världens rikaste och mäktigaste imperier — men visade sig oförmögen att bevara det. Han saknade faderns diplomatiska skicklighet, militära disciplin och politiska visdom. Under hans korta styre (1337–1341) genomförde Mossi-folket räder mot Timbuktu och lyckades bränna delar av staden — en ödmjukelse som Mansa Musa aldrig skulle ha tillåtit. Hans styre markerar tydligt starten på Malis gradvis nedgång.",
      en: "Mansa Maghan I, son of Mansa Musa, inherited one of the world's richest and most powerful empires — but proved unable to preserve it. He lacked his father's diplomatic skill, military discipline and political wisdom. During his short reign (1337–1341) the Mossi people raided Timbuktu and managed to burn parts of the city — a humiliation Mansa Musa would never have permitted. His reign clearly marks the start of Mali's gradual decline.",
      tr: "Mansa Maghan I, Mansa Musa'nın oğlu, dünyanın en zengin ve en güçlü imparatorluklarından birini miras aldı — ancak onu koruyamadı. Babasının diplomatik becerisi, askeri disiplini ve siyasi bilgeliğinden yoksundu. Kısa saltanatı, Mali'nin giderek gerilimesinin başlangıcını açıkça işaret eder.",
    },
    reforms: {
      sv: ["Inga kända positiva reformer under det korta styret"],
      en: ["No known positive reforms during the brief reign"],
      tr: ["Kısa saltanat döneminde bilinen olumlu reform yok"],
    },
    campaigns: {
      sv: ["Misslyckades att försvara Timbuktu mot Mossi-räder"],
      en: ["Failed to defend Timbuktu against Mossi raids"],
      tr: ["Mossi akınlarına karşı Timbuktu'yu savunmayı başaramadı"],
    },
    leadershipStyle: {
      sv: "Maghan I representerar det klassiska problemet med dynastisk succession: den store ledarens son saknar ofta faderns extraordinära egenskaper. Han regerade med kompetens snarare än briljans och det räckte inte i ett imperium som krävde exceptionellt ledarskap.",
      en: "Maghan I represents the classic problem of dynastic succession: the great leader's son often lacks the father's extraordinary qualities. He ruled with competence rather than brilliance and it was not enough in an empire that required exceptional leadership.",
      tr: "Maghan I, hanedanlık verasetinin klasik sorununu temsil eder: büyük liderin oğlu genellikle babanın olağanüstü niteliklerinden yoksundur.",
    },
    criticalPerspectives: {
      sv: "Att döma Maghan I som 'svag' är delvis orättvist — han ärvde ett enormt imperium vid en historisk topp som var svårt att uppehålla. Ingen härskare kunde ha upprepat Mansa Musas exceptionella kombination av rikedom, karisma och diplomatisk timing.",
      en: "Judging Maghan I as 'weak' is partly unfair — he inherited an enormous empire at a historical peak that was difficult to maintain. No ruler could have repeated Mansa Musa's exceptional combination of wealth, charisma and diplomatic timing.",
      tr: "Maghan I'yi 'zayıf' olarak yargılamak kısmen adaletsizdir — korumak güç olan tarihsel bir zirvedeki devasa bir imparatorluğu miras aldı.",
    },
  },
  {
    id: "mansa-suleyman",
    name: "Mansa Suleyman",
    years: "ca. 1341–1360",
    title: { sv: "Den diplomatiske administratören", en: "The Diplomatic Administrator", tr: "Diplomatik Yönetici" },
    portrait: "📜",
    bio: {
      sv: "Mansa Suleyman, bror till Mansa Musa, regerade Mali-imperiet i nästan 20 år och är den siste store Mali-kungen. Han är den mest dokumenterade Mali-härskaren tack vare den arabiske resenären Ibn Battutas besök under hans styre — Ibn Battutas resedagbok ger oss den mest detaljerade och levande beskrivningen av Mali vi har. Suleyman genomförde en hajj till Mekka, upprätthöll diplomatiska relationer med sultanerna i Marocko och Egypten och lyckades bevara imperiet i en period av ökande press.",
      en: "Mansa Suleyman, brother of Mansa Musa, ruled the Mali Empire for almost 20 years and is the last great Mali king. He is the most documented Mali ruler thanks to the Arab traveller Ibn Battuta's visit during his reign — Ibn Battuta's travel diary gives us the most detailed and vivid description of Mali we have. Suleyman performed a hajj to Mecca, maintained diplomatic relations with the sultans of Morocco and Egypt and managed to preserve the empire in a period of increasing pressure.",
      tr: "Mansa Süleyman, Mansa Musa'nın kardeşi, yaklaşık 20 yıl Mali İmparatorluğu'nu yönetti ve son büyük Mali kralıdır. İbn Battuta'nın ziyareti sayesinde en çok belgelenen Mali hükümdarıdır.",
    },
    reforms: {
      sv: ["Upprätthållandet av Timbuktu-universitetet och intellektuellt centrum", "Diplomatisk aktivitet mot Marocko och Egypten", "Fortsatt beskydd av islamisk lärdom"],
      en: ["Maintenance of Timbuktu university and intellectual centre", "Diplomatic activity toward Morocco and Egypt", "Continued patronage of Islamic scholarship"],
      tr: ["Timbuktu üniversitesi ve entelektüel merkezin sürdürülmesi", "Fas ve Mısır'a yönelik diplomatik faaliyet", "İslami ilme desteğin sürdürülmesi"],
    },
    campaigns: {
      sv: ["Defensiva kampanjer mot Mossi och Tuareg-trycket", "Hajj till Mekka — diplomatisk kontakt med islamiska stormakter"],
      en: ["Defensive campaigns against Mossi and Tuareg pressure", "Hajj to Mecca — diplomatic contact with Islamic great powers"],
      tr: ["Mossi ve Tuareg baskısına karşı savunma seferleri", "Mekke'ye hac — İslam büyük güçleriyle diplomatik temas"],
    },
    leadershipStyle: {
      sv: "Suleyman var en pragmatisk och metodisk härskare — administrativt kompetent om än utan den charismatiska storslagna gesten av Mansa Musa. Ibn Battuta beskriver honom som rättvis och ordningsam men inte spektakulär.",
      en: "Suleyman was a pragmatic and methodical ruler — administratively competent though without Mansa Musa's charismatic grand gesture. Ibn Battuta describes him as just and orderly but not spectacular.",
      tr: "Süleyman, pragmatik ve metodik bir hükümdardı — idari olarak yetkin, ancak Mansa Musa'nın karizmatik büyük jestinden yoksundu. İbn Battuta onu adil ve düzenli ama görkemli olmayan biri olarak tanımlar.",
    },
    criticalPerspectives: {
      sv: "Ibn Battutas besök under Suleymanns styre är en välsignelse för historikerna men ger oss en utifrånperspektiv präglad av Ibn Battutas egna fördomar. Han kritiserar exempelvis den relativt frihet som malinesiska kvinnor har jämfört med arabisk sedvänja — en kritik som avslöjar mer om Ibn Battutas kulturella bias än om Malis bristande islamiska fromhet.",
      en: "Ibn Battuta's visit during Suleyman's reign is a blessing for historians but gives us an outsider's perspective coloured by Ibn Battuta's own biases. He criticises for example the relative freedom that Malian women have compared to Arab custom — a criticism that reveals more about Ibn Battuta's cultural bias than about Mali's lack of Islamic piety.",
      tr: "İbn Battuta'nın Süleyman'ın saltanatı sırasındaki ziyareti tarihçiler için bir nimet olsa da bize İbn Battuta'nın kendi önyargılarıyla renklendirilen bir dış bakış açısı sunar.",
    },
  },
  {
    id: "mansa-qasa",
    name: "Mansa Qasa (Camba)",
    years: "1360",
    title: { sv: "Månadskonungen", en: "The Month-Long King", tr: "Aylık Kral" },
    portrait: "⏱️",
    bio: {
      sv: "Mansa Qasa, son till Mansa Suleyman, regerade i allt endast några månader år 1360 — ett av de kortaste kungastyren i Malis historia. Hans styre hann knappt börja innan det avbröts, antingen av sjukdom eller av palatspolitik. Hans korta styre illustrerar den dynastiska instabilitet som började prägla Mali under den post-Musa-eran.",
      en: "Mansa Qasa, son of Mansa Suleyman, ruled for only a few months in 1360 — one of the shortest royal reigns in Mali's history. His reign barely began before it was cut short, either by illness or palace politics. His brief reign illustrates the dynastic instability that began marking Mali in the post-Musa era.",
      tr: "Mansa Qasa, Mansa Süleyman'ın oğlu, 1360'ta yalnızca birkaç ay hüküm sürdü — Mali tarihinin en kısa kraliyet saltanatlarından biri. Kısa saltanatı, Musa sonrası dönemde Mali'yi belirleyen hanedanlık istikrarsızlığını örnekler.",
    },
    reforms: { sv: ["Inga kända reformer — för kort styre"], en: ["No known reforms — too brief a reign"], tr: ["Bilinen reform yok — çok kısa saltanat"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: { sv: "För lite känt för en analys.", en: "Too little known for analysis.", tr: "Analiz için çok az şey bilinmektedir." },
    criticalPerspectives: {
      sv: "Qasas kortvariga styre är ett symptom på den dynastiska kris som drabbade Mali under det sena 1300-talet.",
      en: "Qasa's brief reign is a symptom of the dynastic crisis that struck Mali in the late 14th century.",
      tr: "Qasa'nın kısa saltanatı, Mali'yi geç 14. yüzyılda vuran hanedanlık krizinin bir belirtisidir.",
    },
  },
  {
    id: "mansa-mari-jata-ii",
    name: "Mansa Mari Jata II",
    years: "ca. 1360–1374",
    title: { sv: "Den sjuke och ödslande", en: "The Sick and Wasteful", tr: "Hasta ve İsrafçı" },
    portrait: "💸",
    bio: {
      sv: "Mansa Mari Jata II regerade i 14 år men historiska källor — framförallt Ibn Khaldun — ger en dyster bild av hans styre. Han beskrivs som sjuk (troligen av sömnsjuka) och oförmögen att styra effektivt under stor del av sin regeringstid. Han ska dessutom ha slösat enormt på Timbuktu-bibliotekets skatter — sålde manuskript och konstföremål för att finansiera utsvävningar. Hans styre accelererade Malis kulturella och ekonomiska nedgång avsevärt.",
      en: "Mansa Mari Jata II ruled for 14 years but historical sources — principally Ibn Khaldun — paint a bleak picture of his reign. He is described as ill (probably with sleeping sickness) and unable to govern effectively for much of his reign. He is also said to have wasted enormous amounts of Timbuktu library's treasures — selling manuscripts and artworks to finance extravagances. His reign significantly accelerated Mali's cultural and economic decline.",
      tr: "Mansa Mari Jata II 14 yıl hüküm sürdü, ancak tarihsel kaynaklar — ağırlıklı olarak İbn Haldun — hükümdarlığının kasvetli bir resmini çizer. Uyku hastalığından muzdarip olduğu ve saltanatının büyük bölümünde etkili biçimde yönetemediği aktarılır. Timbuktu kütüphanesinin hazinelerini israf ettiği de söylenir.",
    },
    reforms: {
      sv: ["Inga positiva reformer — styre präglat av svaghet och slöseri"],
      en: ["No positive reforms — reign marked by weakness and waste"],
      tr: ["Olumlu reform yok — saltanat zayıflık ve israfla geçti"],
    },
    campaigns: {
      sv: ["Inga kända framgångsrika militära kampanjer under hans styre"],
      en: ["No known successful military campaigns during his reign"],
      tr: ["Saltanatı döneminde bilinen başarılı askeri sefer yok"],
    },
    leadershipStyle: {
      sv: "Mari Jata IIs styre präglades av passivitet, sjukdom och slöseri — han var i praktiken oförmögen att leda imperiet och hans styre accelererade Malis nedgång.",
      en: "Mari Jata II's reign was marked by passivity, illness and waste — he was in practice unable to lead the empire and his reign accelerated Mali's decline.",
      tr: "Mari Jata II'nin saltanatı pasiflik, hastalık ve israfla geçti — pratikte imparatorluğu yönetemedi ve saltanatı Mali'nin gerilimesini hızlandırdı.",
    },
    criticalPerspectives: {
      sv: "Ibn Khalduns portätt av Mari Jata II kan vara överdrivet negativt — arabiske historiker tenderade att fokusera på dramatiska failings och ignorera vardaglig administration. Det är möjligt att hans faktiska styre var mer nyanserat än den bevarade bilden antyder.",
      en: "Ibn Khaldun's portrait of Mari Jata II may be exaggeratedly negative — Arab historians tended to focus on dramatic failings and ignore everyday administration. It is possible that his actual rule was more nuanced than the preserved image suggests.",
      tr: "İbn Haldun'un Mari Jata II portesi abartılı biçimde olumsuz olabilir — Arap tarihçiler dramatik başarısızlıklara odaklanma ve gündelik yönetimi görmezden gelme eğilimindeydi.",
    },
  },
  {
    id: "mansa-musa-ii",
    name: "Mansa Musa II",
    years: "ca. 1374–1387",
    title: { sv: "Skattemästarens kung", en: "King of the Treasurer", tr: "Haznedar Kralı" },
    portrait: "🏛️",
    bio: {
      sv: "Mansa Musa II regerade formellt men verklig makt låg hos hans skattemästare och minister Mari Jata — ett tecken på hur djupt den centrala auktoriteten hade eroderat i Mali. Imperiet fortlevde som statsstruktur men de verkliga besluten fattades av administratörer och ministrar snarare än av Mansa. Trots sin svaga personliga makt lyckades Musa II upprätthålla imperiets form och förhindra dess fullständiga kollaps.",
      en: "Mansa Musa II ruled formally but real power lay with his treasurer and minister Mari Jata — a sign of how deeply central authority had eroded in Mali. The empire survived as a state structure but real decisions were made by administrators and ministers rather than by the Mansa. Despite his weak personal power Musa II managed to maintain the empire's form and prevent its complete collapse.",
      tr: "Mansa Musa II resmi olarak hüküm sürdü, ancak gerçek güç haznedar ve bakan Mari Jata'nın elindeydi — Mali'deki merkezi otoritenin ne kadar derinden aşındığının işareti. İmparatorluk bir devlet yapısı olarak var olmaya devam etti.",
    },
    reforms: {
      sv: ["Inga kända självständiga reformer — begränsad verklig makt"],
      en: ["No known independent reforms — limited real power"],
      tr: ["Bilinen bağımsız reform yok — sınırlı gerçek güç"],
    },
    campaigns: {
      sv: ["Defensiva operationer mot ökande press från kringliggande folk"],
      en: ["Defensive operations against increasing pressure from surrounding peoples"],
      tr: ["Çevre halklardan artan baskıya karşı savunma operasyonları"],
    },
    leadershipStyle: {
      sv: "Musa II var en ceremonikung snarare än en verklig regent — imperiets verkliga styrning sköttes av hans minister Mari Jata.",
      en: "Musa II was a ceremonial king rather than a real regent — the empire's actual governance was handled by his minister Mari Jata.",
      tr: "Musa II, gerçek bir kral yerine törensel bir kraldı — imparatorluğun fiili yönetimi bakanı Mari Jata tarafından üstlenildi.",
    },
    criticalPerspectives: {
      sv: "Musa IIs styre illustrerar ett klassiskt imperial nedgångsmönster: det formella rikets symboler överlever men verklig makt fragmenteras och delegeras till administrativa aktörer.",
      en: "Musa II's reign illustrates a classic imperial decline pattern: the formal kingdom's symbols survive but real power is fragmented and delegated to administrative actors.",
      tr: "Musa II'nin saltanatı, klasik bir imparatorluk gerileme modelini örnekler: biçimsel krallığın sembolleri hayatta kalır ancak gerçek güç parçalanır ve idari aktörlere devredilir.",
    },
  },
  {
    id: "mansa-maghan-ii",
    name: "Mansa Maghan II",
    years: "1387",
    title: { sv: "Den kortregerade", en: "The Briefly Reigning", tr: "Kısa Süre Hüküm Süren" },
    portrait: "⚡",
    bio: {
      sv: "Mansa Maghan II regerade i ytterst kort tid år 1387 — hans styre mäts i månader snarare än år. Historiska källor är extremt sparsamma. Han avsattes troligen i ett palatkupp av Mansa Sandaki.",
      en: "Mansa Maghan II ruled for an extremely short time in 1387 — his reign measured in months rather than years. Historical sources are extremely sparse. He was probably deposed in a palace coup by Mansa Sandaki.",
      tr: "Mansa Maghan II 1387'de son derece kısa bir süre hüküm sürdü — saltanatı yıl değil aylarla ölçülür. Tarihsel kaynaklar son derece seyrek.",
    },
    reforms: { sv: ["Inga kända reformer"], en: ["No known reforms"], tr: ["Bilinen reform yok"] },
    campaigns: { sv: ["Inga kända kampanjer"], en: ["No known campaigns"], tr: ["Bilinen sefer yok"] },
    leadershipStyle: { sv: "Otillräcklig information.", en: "Insufficient information.", tr: "Yetersiz bilgi." },
    criticalPerspectives: {
      sv: "Maghan IIs kortvariga styre är ytterligare ett tecken på Malis djupa dynastiska instabilitet under det sena 1300-talet.",
      en: "Maghan II's brief reign is yet another sign of Mali's deep dynastic instability in the late 14th century.",
      tr: "Maghan II'nin kısa saltanatı, Mali'nin geç 14. yüzyıldaki derin hanedanlık istikrarsızlığının bir başka işaretidir.",
    },
  },
  {
    id: "mansa-sandaki",
    name: "Mansa Sandaki",
    years: "1387–1388",
    title: { sv: "Usurpatorn", en: "The Usurper", tr: "Gasıp" },
    portrait: "🗡️",
    bio: {
      sv: "Mansa Sandaki är en annan usurpator i Mali-dynastins historia — inte av Keita-klanen utan en minister som grep makten i ett palatkupp. Hans styre varade i ungefär ett år innan han störtades av Mansa Maghan III av den legitima Keita-linjen. Sandakis korta styre illustrerar hur söndersmulad den centrala dynastiska auktoriteten hade blivit under det sena 1300-talets Mali.",
      en: "Mansa Sandaki is another usurper in Mali dynasty history — not of the Keita clan but a minister who seized power in a palace coup. His reign lasted around a year before he was overthrown by Mansa Maghan III of the legitimate Keita line. Sandaki's brief reign illustrates how crumbled the central dynastic authority had become in late 14th century Mali.",
      tr: "Mansa Sandaki, Mali hanedanlık tarihindeki başka bir gasıptır — Keita klanından değil, bir darbede iktidarı ele geçiren bir bakandır. Yaklaşık bir yıl süren saltanatı, meşru Keita soyundan Mansa Maghan III tarafından devrilmesiyle sona erdi.",
    },
    reforms: { sv: ["Inga kända reformer under det korta usurpationsstyret"], en: ["No known reforms during the brief usurpation"], tr: ["Kısa gaspat döneminde bilinen reform yok"] },
    campaigns: { sv: ["Interna kamper för att konsolidera makten"], en: ["Internal struggles to consolidate power"], tr: ["İktidarı pekiştirmek için iç mücadeleler"] },
    leadershipStyle: {
      sv: "Sandaki var en opportunistisk maktsökare utan dynastisk legitimitet — hans styre byggde uteslutande på personlig makt och militärt stöd.",
      en: "Sandaki was an opportunistic power-seeker without dynastic legitimacy — his rule was built exclusively on personal power and military support.",
      tr: "Sandaki, hanedanlık meşruiyeti olmayan fırsatçı bir iktidar arayıcısıydı — yönetimi yalnızca kişisel güç ve askeri destek üzerine kuruluydu.",
    },
    criticalPerspectives: {
      sv: "Sandakis usurpation visar att Mali-dynastin hade tappat sin absoluta legitimitet — att en minister kunde greppa tronen och hålla den i ett år är ett tecken på imperiets djupa strukturella kris.",
      en: "Sandaki's usurpation shows that the Mali dynasty had lost its absolute legitimacy — that a minister could seize the throne and hold it for a year is a sign of the empire's deep structural crisis.",
      tr: "Sandaki'nin gaspı, Mali hanedanlığının mutlak meşruiyetini kaybettiğini gösterir.",
    },
  },
  {
    id: "mansa-maghan-iii",
    name: "Mansa Maghan III",
    years: "ca. 1388–1390",
    title: { sv: "Återupprättarens kung", en: "King of the Restorer", tr: "Onarıcı Kral" },
    portrait: "🔰",
    bio: {
      sv: "Mansa Maghan III återställde den legitima Keita-dynastins kontroll efter Sandakis usurpation. Hans styre var kort men representerar en sista ansträngning att återupprättar dynastisk ordning i ett imperium som gradvis fragmenterades. Historiska källor är minimala om hans specifika politiska bedrifter.",
      en: "Mansa Maghan III restored the legitimate Keita dynasty's control after Sandaki's usurpation. His reign was short but represents a last effort to restore dynastic order in an empire gradually fragmenting. Historical sources are minimal about his specific political achievements.",
      tr: "Mansa Maghan III, Sandaki'nin gaspının ardından meşru Keita hanedanlığının kontrolünü yeniden sağladı. Kısa saltanatı, yavaş yavaş parçalanan bir imparatorlukta hanedanlık düzenini yeniden sağlamak için son bir çabayı temsil eder.",
    },
    reforms: { sv: ["Återupprättandet av Keita-dynastins legitimitet"], en: ["Restoration of Keita dynasty legitimacy"], tr: ["Keita hanedanlığı meşruiyetinin yeniden tesisi"] },
    campaigns: { sv: ["Störtandet av Sandakis usurpationsregim"], en: ["Overthrow of Sandaki's usurpation regime"], tr: ["Sandaki'nin gasap rejiminin devrilmesi"] },
    leadershipStyle: { sv: "Legitimitetsorienterad men begränsad av imperiets ökande svaghet.", en: "Legitimacy-oriented but limited by the empire's increasing weakness.", tr: "Meşruiyet odaklı ancak imparatorluğun artan zayıflığıyla sınırlı." },
    criticalPerspectives: {
      sv: "Maghan IIIs styre är historiskt nästan osynligt utöver hans roll som dynastisk återupprättare.",
      en: "Maghan III's reign is historically almost invisible beyond his role as dynastic restorer.",
      tr: "Maghan III'ün saltanatı, hanedanlık onarıcısı rolünün ötesinde tarihsel olarak neredeyse görünmezdir.",
    },
  },
  {
    id: "mansa-musa-iii",
    name: "Mansa Musa III",
    years: "ca. 1390–1400",
    title: { sv: "Den siste store", en: "The Last Great One", tr: "Son Büyük" },
    portrait: "🌅",
    bio: {
      sv: "Mansa Musa III representerar ett sista försök att stabilisera imperiet inför en mörkare era. Hans styre markerar slutet på 1300-talets Mali — ett sekel som börjat med Mansa Musas oerhörda storhet och slutar med dynastisk kris och territorial tillbakagång. Han lyckades temporärt stabilisera dynastin men kunde inte vända de strukturella tendenserna mot nedgång.",
      en: "Mansa Musa III represents a last attempt to stabilise the empire before a darker era. His reign marks the end of 14th-century Mali — a century that began with Mansa Musa's extraordinary greatness and ends with dynastic crisis and territorial retreat. He managed to temporarily stabilise the dynasty but could not reverse the structural trends toward decline.",
      tr: "Mansa Musa III, daha karanlık bir dönemden önce imparatorluğu istikrara kavuşturmak için son bir girişimi temsil eder. Saltanatı, 14. yüzyıl Mali'sinin sonunu işaret eder.",
    },
    reforms: { sv: ["Temporär stabilisering av dynastin"], en: ["Temporary stabilisation of the dynasty"], tr: ["Hanedanlığın geçici istikrarı"] },
    campaigns: { sv: ["Defensiva operationer mot tilltagande yttre hot"], en: ["Defensive operations against increasing external threats"], tr: ["Artan dış tehditlere karşı savunma operasyonları"] },
    leadershipStyle: { sv: "Konservativ och defensiv — försökte bevara vad som fanns kvar av imperiet.", en: "Conservative and defensive — tried to preserve what remained of the empire.", tr: "Muhafazakar ve savunmacı — imparatorluktan geri kalanları korumaya çalıştı." },
    criticalPerspectives: {
      sv: "Musa IIIs styre är historiskt nästan odokumenterat — han regerade i skuggan av sin store namne och i skymningen av ett imperium på väg mot upplösning.",
      en: "Musa III's reign is historically almost undocumented — he ruled in the shadow of his great namesake and in the twilight of an empire heading toward dissolution.",
      tr: "Musa III'ün saltanatı tarihsel olarak neredeyse belgelenmemiştir.",
    },
  },
  {
    id: "mansa-mahmud-i",
    name: "Mansa Mahmud I",
    years: "ca. 1400–1420",
    title: { sv: "Nedgångstiden kung", en: "King of the Decline Age", tr: "Gerileme Çağının Kralı" },
    portrait: "🌆",
    bio: {
      sv: "Mansa Mahmud I regerade Mali under de tidiga 1400-talets ökande press från Songhai i öster och Tuareger i norr. Förlusten av Timbuktu 1433 inträffade under den övergripande nedgångperioden han presiderade. Han representerar den generation av Mali-kungar som styrde ett imperium som gradvis förlorade sina handelsstäder, handelsnätverk och internationella prestige.",
      en: "Mansa Mahmud I ruled Mali during the early 15th century's increasing pressure from Songhai in the east and Tuaregs in the north. The loss of Timbuktu in 1433 occurred during the overall decline period he presided over. He represents the generation of Mali kings who ruled an empire gradually losing its trading cities, trade networks and international prestige.",
      tr: "Mansa Mahmud I, doğudan Songhai ve kuzeyden Tuareglerin artan baskısı altında erken 15. yüzyılda Mali'yi yönetti. Ticaret şehirlerini, ağlarını ve uluslararası prestijini yavaş yavaş kaybeden bir imparatorluğu yöneten Mali kralları kuşağını temsil eder.",
    },
    reforms: { sv: ["Inga kända positiva reformer — defensivt styre"], en: ["No known positive reforms — defensive reign"], tr: ["Bilinen olumlu reform yok — savunmacı saltanat"] },
    campaigns: { sv: ["Defensiva operationer mot Songhai och Tuareg-räder"], en: ["Defensive operations against Songhai and Tuareg raids"], tr: ["Songhai ve Tuareg akınlarına karşı savunma operasyonları"] },
    leadershipStyle: { sv: "Defensiv och reaktiv — saknade resurser för proaktiv imperialism.", en: "Defensive and reactive — lacked resources for proactive imperialism.", tr: "Savunmacı ve reaktif — proaktif emperyalizm için kaynaklardan yoksundu." },
    criticalPerspectives: {
      sv: "Mahmud Is styre är historiskt sparsamt dokumenterat. Han regerade i en period då Mali förlorade sin roll som en aktör av global betydelse.",
      en: "Mahmud I's reign is historically sparsely documented. He ruled in a period when Mali was losing its role as an actor of global significance.",
      tr: "Mahmud I'nin saltanatı tarihsel olarak yetersiz belgelenmiştir.",
    },
  },
  {
    id: "mansa-mahmud-ii",
    name: "Mansa Mahmud II",
    years: "ca. 1480–1496",
    title: { sv: "Det sista motanfallet", en: "The Last Counterattack", tr: "Son Karşı Saldırı" },
    portrait: "⚔️",
    bio: {
      sv: "Mansa Mahmud II gjorde ett sista storskaligt försök att återvinna Malis förlorade storhet. Han förde krig mot Songhai-riket och Fula-folket och uppnådde vissa temporära framgångar. Men Malis militär- och ekonomiska kapacitet hade reducerats för dramatiskt för att en varaktig återhämtning skulle vara möjlig. Hans offensiv misslyckades och Mali hamnade i permanent defensivt läge.",
      en: "Mansa Mahmud II made a last large-scale attempt to regain Mali's lost greatness. He waged war against the Songhai Empire and the Fula people and achieved some temporary successes. But Mali's military and economic capacity had been reduced too dramatically for a lasting recovery to be possible. His offensive failed and Mali entered a permanently defensive position.",
      tr: "Mansa Mahmud II, Mali'nin kayıp büyüklüğünü geri kazanmak için son büyük çaplı bir girişimde bulundu. Songhai İmparatorluğu ve Fula halkıyla savaştı ve bazı geçici başarılar elde etti, ancak taarruzu başarısız oldu.",
    },
    reforms: { sv: ["Försök att militärt återvinna förlorade territorier"], en: ["Attempts to militarily reclaim lost territories"], tr: ["Kayıp toprakları askeri olarak geri kazanma girişimleri"] },
    campaigns: {
      sv: ["Krig mot Songhai-riket (ca. 1480s)", "Kampanjer mot Fula-folket i Futa Toro", "Militär offensiv för att återvinna Timbuktu — misslyckades"],
      en: ["War against the Songhai Empire (ca. 1480s)", "Campaigns against the Fula people in Futa Toro", "Military offensive to reclaim Timbuktu — failed"],
      tr: ["Songhai İmparatorluğuna karşı savaş (yakl. 1480'ler)", "Futa Toro'daki Fula halkına karşı seferler", "Timbuktu'yu geri almak için askeri taarruz — başarısız"],
    },
    leadershipStyle: {
      sv: "Mahmud II var en aktiv och ambitiös ledare som försökte vända imperiets nedgång genom offensiv militär aktion — men hans ambitioner översteg hans resurser.",
      en: "Mahmud II was an active and ambitious leader who tried to reverse the empire's decline through offensive military action — but his ambitions exceeded his resources.",
      tr: "Mahmud II, imparatorluğun gerilimesini saldırgan askeri eylemle tersine çevirmeye çalışan aktif ve hırslı bir liderdi — ancak hırsları kaynaklarını aştı.",
    },
    criticalPerspectives: {
      sv: "Mahmud IIs offensiva strategi kan kritiseras som illusionistisk — att försöka återta förlorade handelsstäder med en militär som var skuggan av Mansa Musas var dömt att misslyckas.",
      en: "Mahmud II's offensive strategy can be criticised as illusionistic — attempting to retake lost trading cities with a military that was a shadow of Mansa Musa's was doomed to fail.",
      tr: "Mahmud II'nin saldırgan stratejisi yanılsamacı olarak eleştirilebilir — Mansa Musa'nın ordusunun gölgesi olan bir orduyla kayıp ticaret şehirlerini geri almaya çalışmak başarısızlığa mahkumdu.",
    },
  },
  {
    id: "mansa-mahmud-iii",
    name: "Mansa Mahmud III",
    years: "ca. 1496–1559",
    title: { sv: "Sista ansträngningens kung", en: "King of the Last Effort", tr: "Son Çabanın Kralı" },
    portrait: "🕯️",
    bio: {
      sv: "Mansa Mahmud III regerade under den längsta perioden av den sena Mali-dynastin — mer än 60 år. Hans långa styre är anmärkningsvärt i sig i en era av instabilitet och kortvariga regentskap. Han förde krig mot Fula-staternas Denianke-dynasti i Futa Toro och mot Songhai-imperiet. Han var fortfarande en aktiv regent när Songhai föll för Marockanska krafter 1591, men hoppades förgäves på att fylla det uppkomna vakuumet.",
      en: "Mansa Mahmud III ruled during the longest period of the late Mali dynasty — more than 60 years. His long reign is remarkable in itself in an era of instability and short-lived regencies. He waged war against the Fula states' Denianke dynasty in Futa Toro and against the Songhai Empire. He was still an active regent when Songhai fell to Moroccan forces in 1591, but hoped in vain to fill the resulting vacuum.",
      tr: "Mansa Mahmud III, geç Mali hanedanlığının en uzun döneminde — 60 yıldan fazla — hüküm sürdü. Uzun saltanatı, istikrarsızlık ve kısa süreli saltanatlar çağında başlı başına dikkat çekicidir.",
    },
    reforms: { sv: ["Upprätthållandet av Mali som en erkänd politisk enhet under 60 år"], en: ["Maintenance of Mali as a recognised political entity for 60 years"], tr: ["Mali'nin 60 yıl boyunca tanınmış siyasi bir varlık olarak sürdürülmesi"] },
    campaigns: {
      sv: ["Krig mot Denianke-dynastin i Futa Toro", "Kampanjer mot Songhai-imperiet", "Diplomatiska kontakter med marockanska Saadinska dynastin"],
      en: ["War against the Denianke dynasty in Futa Toro", "Campaigns against the Songhai Empire", "Diplomatic contacts with the Moroccan Saadian dynasty"],
      tr: ["Futa Toro'daki Denianke hanedanlığına karşı savaş", "Songhai İmparatorluğuna karşı seferler", "Fas Saadi hanedanlığıyla diplomatik temaslar"],
    },
    leadershipStyle: {
      sv: "Mahmud III var en uthållig och pragmatisk ledare — hans viktigaste bedrift var att hålla Mali vid liv som politisk enhet under ett halvt sekel av tilltagande press.",
      en: "Mahmud III was a resilient and pragmatic leader — his most important achievement was keeping Mali alive as a political entity through half a century of increasing pressure.",
      tr: "Mahmud III, dayanıklı ve pragmatik bir liderdi — en önemli başarısı yarım asırlık artan baskı boyunca Mali'yi siyasi bir varlık olarak ayakta tutmaktı.",
    },
    criticalPerspectives: {
      sv: "Mahmud IIIs långa styre bevarar Mali men kan inte vända dess nedgång. Frågan är om ett mer aggressivt ledarskap hade kunnat förändra imperiets öde — eller om det strukturella förfallet var oundvikligt.",
      en: "Mahmud III's long reign preserves Mali but cannot reverse its decline. The question is whether more aggressive leadership could have changed the empire's fate — or whether the structural decay was inevitable.",
      tr: "Mahmud III'ün uzun saltanatı Mali'yi korur ancak gerilimesini tersine çeviremez. Soru şu: daha agresif bir liderlik imparatorluğun kaderini değiştirebilir miydi?",
    },
  },
  {
    id: "mansa-mahmud-iv",
    name: "Mansa Mahmud IV (Mansa Mama Maghan)",
    years: "ca. 1559–1600",
    title: { sv: "Den siste Mansa", en: "The Last Mansa", tr: "Son Mansa" },
    portrait: "🌇",
    bio: {
      sv: "Mansa Mahmud IV är den siste kände Mansa av Mali-imperiet — den siste bäraren av den titel som Sundiata Keita skapade 365 år tidigare. Under hans styre reduceras Mali definitivt till ett litet lokalt rike i Manden-regionen utan möjlighet till återkomst som stormakt. Han bevittnar Songhais fall för marockanska styrkor 1591 och hoppas förgäves att det skapar ett nytt utrymme för Mali. Hans styre markerar det stilla, nästan osynliga slutet på ett av medeltidens mäktigaste imperier.",
      en: "Mansa Mahmud IV is the last known Mansa of the Mali Empire — the last bearer of the title that Sundiata Keita created 365 years earlier. During his reign Mali is definitively reduced to a small local kingdom in the Manden region with no possibility of return as a great power. He witnesses Songhai's fall to Moroccan forces in 1591 and hopes in vain that it creates new space for Mali. His reign marks the quiet, almost invisible end of one of the medieval world's most powerful empires.",
      tr: "Mansa Mahmud IV, Mali İmparatorluğu'nun son bilinen Mansa'sı — Sundiata Keita'nın 365 yıl önce yarattığı unvanın son taşıyıcısı. Saltanatı, ortaçağ dünyasının en güçlü imparatorluklarından birinin sessiz, neredeyse görünmez sonunu işaret eder.",
    },
    reforms: { sv: ["Inga kända reformer — ett rike i slutfasen"], en: ["No known reforms — a kingdom in its final phase"], tr: ["Bilinen reform yok — son aşamasındaki bir krallık"] },
    campaigns: {
      sv: ["Diplomatiska försök att utnyttja Songhais fall (1591)", "Defensiva operationer mot Bambara och Fula-expansionen"],
      en: ["Diplomatic attempts to exploit Songhai's fall (1591)", "Defensive operations against Bambara and Fula expansion"],
      tr: ["Songhai'nın düşüşünü (1591) istismar etmek için diplomatik girişimler", "Bambara ve Fula genişlemesine karşı savunma operasyonları"],
    },
    leadershipStyle: {
      sv: "Mahmud IV styrde ett rike i terminal nedgång med värdighet och uthållighet — han bevarade Malis dynastiska kontinuitet till det sista men saknade resurser och strategiska möjligheter för en återhämtning.",
      en: "Mahmud IV ruled a kingdom in terminal decline with dignity and resilience — he preserved Mali's dynastic continuity to the last but lacked the resources and strategic opportunities for a recovery.",
      tr: "Mahmud IV, onur ve dayanıklılıkla son gerileme aşamasındaki bir krallığı yönetti — Mali'nin hanedanlık sürekliliğini sonuna kadar korudu ancak bir toparlanma için kaynaklardan ve stratejik fırsatlardan yoksundu.",
    },
    criticalPerspectives: {
      sv: "Mahmud IVs styre är historiskt nästan osynligt — det sista skimret av ett imperium som flämtar ut. Hans personliga ansvar för imperiets sista nedgång är minimal — han ärvde en strukturell kris som hade pågått i mer än 200 år sedan Mansa Musas död.",
      en: "Mahmud IV's reign is historically almost invisible — the last glimmer of an empire guttering out. His personal responsibility for the empire's final decline is minimal — he inherited a structural crisis that had been ongoing for more than 200 years since Mansa Musa's death.",
      tr: "Mahmud IV'ün saltanatı tarihsel olarak neredeyse görünmezdir — sönen bir imparatorluğun son parıltısı. İmparatorluğun nihai gerilemesindeki kişisel sorumluluğu minimumdur.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const maliTerritories: TerritoryPeriod[] = [
  {
    yearStart: 1235,
    yearEnd: 1300,
    label: { sv: "Mali — Tidig expansion", en: "Mali — Early Expansion", tr: "Mali — Erken Genişleme" },
    color: "#8B6914",
    polygon: [[
      [15.0, -12.0], [14.0, -10.0], [12.0, -8.0], [10.0, -8.0],
      [9.0, -10.0], [10.0, -13.0], [12.0, -15.0], [14.0, -14.0],
      [15.0, -12.0],
    ]],
  },
  {
    yearStart: 1300,
    yearEnd: 1400,
    label: { sv: "Mali — Guldålderns imperiet", en: "Mali — Golden Age Empire", tr: "Mali — Altın Çağı İmparatorluğu" },
    color: "#D4AF37",
    polygon: [[
      [20.0, -17.0], [18.0, -16.5], [16.0, -17.0], [15.0, -15.0],
      [14.0, -12.0], [13.0, -8.0], [12.0, -4.0], [11.0, -2.0],
      [10.0, 1.0], [9.0, 2.0], [10.0, 4.0], [12.0, 4.0],
      [14.0, 2.0], [16.0, 0.0], [17.0, 1.0], [18.0, 3.0],
      [20.0, 2.0], [21.0, 0.0], [22.0, -2.0], [22.0, -5.0],
      [21.0, -8.0], [20.0, -10.0], [21.0, -12.0], [22.0, -14.0],
      [21.0, -16.0], [20.0, -17.0],
    ]],
  },
  {
    yearStart: 1400,
    yearEnd: 1500,
    label: { sv: "Mali — Kärnteritoiet under nedgång", en: "Mali — Core Territory in Decline", tr: "Mali — Gerileme Döneminde Ana Toprak" },
    color: "#8B6914",
    polygon: [[
      [16.0, -14.0], [14.0, -12.0], [12.0, -10.0], [11.0, -8.0],
      [12.0, -6.0], [14.0, -4.0], [15.0, -4.0], [16.0, -6.0],
      [17.0, -8.0], [17.0, -10.0], [16.0, -12.0], [16.0, -14.0],
    ]],
  },
  {
    yearStart: 1500,
    yearEnd: 1600,
    label: { sv: "Mali — Sista Manden-kärnan", en: "Mali — Final Manden Core", tr: "Mali — Son Manden Çekirdeği" },
    color: "#6B4F0A",
    polygon: [[
      [13.5, -11.5], [12.5, -10.5], [11.5, -9.5], [12.0, -8.0],
      [13.0, -7.5], [14.0, -8.0], [14.5, -9.5], [14.0, -11.0],
      [13.5, -11.5],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const maliTradeRoutes: TradeRouteGeo[] = [
  {
    id: "gold-salt-route",
    name: { sv: "Guld-saltvägen — Afrikas rikaste handelsled", en: "Gold-Salt Route — Africa's Richest Trade Route", tr: "Altın-Tuz Yolu — Afrika'nın En Zengin Ticaret Yolu" },
    yearActive: 1300,
    path: [
      [12.0, -8.0], [14.0, -5.0], [16.0, -2.0],
      [18.0, 2.0], [20.0, 5.0], [22.0, 8.0],
      [24.0, 10.0], [27.0, 13.0],
    ],
  },
  {
    id: "trans-sahara-route",
    name: { sv: "Trans-Sahara-rutten — Mali till Marocko", en: "Trans-Saharan Route — Mali to Morocco", tr: "Trans-Sahra Güzergahı — Mali'den Fas'a" },
    yearActive: 1307,
    path: [
      [13.0, -8.0], [16.0, -5.0], [18.0, -2.0],
      [21.0, 0.0], [24.0, -2.0], [27.0, -5.0],
      [30.0, -7.0], [32.0, -8.0], [34.0, -5.0],
      [35.0, -3.0],
    ],
  },
  {
    id: "mali-egypt-route",
    name: { sv: "Mali–Egypten pilgrimsrutten", en: "Mali–Egypt Pilgrimage Route", tr: "Mali–Mısır Hac Güzergahı" },
    yearActive: 1324,
    path: [
      [12.0, -8.0], [14.0, -2.0], [16.0, 5.0],
      [18.0, 10.0], [20.0, 15.0], [22.0, 22.0],
      [24.0, 28.0], [26.0, 30.0], [30.0, 31.0],
    ],
  },
  {
    id: "niger-river-route",
    name: { sv: "Nigerfloden — Imperiets ryggrad", en: "Niger River — Empire's Backbone", tr: "Niger Nehri — İmparatorluğun Omurgası" },
    yearActive: 1250,
    path: [
      [9.5, -13.7], [11.0, -12.0], [12.0, -10.0],
      [13.0, -7.0], [14.5, -4.0], [15.5, -1.0],
      [16.0, 2.0], [17.0, 4.0], [17.5, 7.0],
      [16.5, 10.0], [15.0, 13.0],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const maliEmpire: EmpireConfig = {
  id: "mali_empire",
  name: {
    sv: "Mali-imperiet",
    en: "Mali Empire",
    tr: "Mali İmparatorluğu",
  },
  theme: "ottoman",
  appTitle: "Mali Empire Intelligence",
  crestImage: maliLogo,
  backgroundImage: maliBg,
  leaderTitle: { sv: "Mansa", en: "Mansa", tr: "Mansa" },
  dynastyTitle: {
    sv: "Keita-dynastin",
    en: "Keita Dynasty",
    tr: "Keita Hanedanlığı",
  },
  timeline: maliTimeline,
  leaders: maliLeaders,
  profiles: maliProfiles,
  figures: [],
  quizQuestions: maliQuizQuestions,
  badges: maliBadges,
  territories: maliTerritories,
  tradeRoutes: maliTradeRoutes,
  mapCenter: [13.0, -8.0],
  mapZoom: 5,
  yearRange: [1235, 1600],
  yearDefault: 1324,
  chatSystemContext:
    "the Mali Empire (1235–1600 AD). You are an expert on Mali imperial history covering the legendary founding by Sundiata Keita at the Battle of Kirina, the consolidation under early Mansas, the extraordinary golden age under Mansa Musa I — the richest person in world history — the flourishing of Timbuktu as a centre of Islamic learning, the trans-Saharan gold and salt trade, the mysterious Atlantic expedition of Mansa Abu Bakr II, and the gradual decline as Songhai rose to dominance. Treat all Mansas and historical figures with respect and historical accuracy. Draw on Ibn Battuta's accounts, Arab chronicles, and the oral traditions preserved by griots.",
  chatPlaceholders: {
    sv: "Ställ en fråga om Mali-imperiet...",
    en: "Ask a question about the Mali Empire...",
    tr: "Mali İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Varför anses Mansa Musa vara historiens rikaste person?",
      "Berätta om Sundiata Keitas resa från exil till kejsare",
      "Vad hände när Mansa Abu Bakr II seglade ut på Atlanten?",
    ],
    en: [
      "Why is Mansa Musa considered history's richest person?",
      "Tell me about Sundiata Keita's journey from exile to emperor",
      "What happened when Mansa Abu Bakr II sailed out onto the Atlantic?",
    ],
    tr: [
      "Mansa Musa neden tarihin en zengin kişisi olarak kabul edilir?",
      "Sundiata Keita'nın sürgünden imparatora uzanan yolculuğunu anlatın",
      "Mansa Abu Bakr II Atlantik'e açıldığında ne oldu?",
    ],
  },
  homeDescription: {
    sv: "Utforska Västafrikas mäktigaste imperium (1235–1600) — från Sundiata Keitas legende och Mansa Musas gyllene hajj till Timbuktu som kunskapens stad och mysteriet med Atlantexpeditionen.",
    en: "Explore West Africa's most powerful empire (1235–1600) — from Sundiata Keita's legend and Mansa Musa's golden hajj to Timbuktu as the city of knowledge and the mystery of the Atlantic expedition.",
    tr: "Batı Afrika'nın en güçlü imparatorluğunu keşfedin (1235–1600) — Sundiata Keita'nın efsanesinden ve Mansa Musa'nın altın haccından Timbuktu'nun bilgi şehrine ve Atlantik seferinin gizemlerine.",
  },
  mapTitle: {
    sv: "Mali-imperiets territorium",
    en: "Mali Empire Territory",
    tr: "Mali İmparatorluğu Toprakları",
  },
};
