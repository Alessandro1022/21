export interface HistoricalProfile {
  id: string;
  name: string;
  years: string;
  title: Record<string, string>;
  portrait: string; // emoji placeholder — can be replaced with real images
  bio: Record<string, string>;
  reforms: Record<string, string[]>;
  campaigns: Record<string, string[]>;
  leadershipStyle: Record<string, string>;
  criticalPerspectives: Record<string, string>;
}

export const profiles: HistoricalProfile[] = [
  {
    id: "mehmed-ii",
    name: "Mehmed II",
    years: "1432–1481",
    title: { sv: "Erövraren", en: "The Conqueror", tr: "Fatih" },
    portrait: "⚔️",
    bio: {
      sv: "Mehmed II, känd som Fatih (Erövraren), blev sultan vid 19 års ålder och erövrade Konstantinopel 1453. Han omvandlade Istanbul till rikets huvudstad och lade grunden för Osmanska rikets storhetstid. Han var även en lärd man med intresse för vetenskap, filosofi och konst.",
      en: "Mehmed II, known as Fatih (the Conqueror), became sultan at age 19 and conquered Constantinople in 1453. He transformed Istanbul into the empire's capital and laid the foundations for the Ottoman golden age. He was also a learned man with interests in science, philosophy, and art.",
      tr: "Fatih Sultan Mehmed, 19 yaşında sultan oldu ve 1453'te Konstantinopolis'i fethetti. İstanbul'u imparatorluğun başkentine dönüştürdü ve Osmanlı altın çağının temellerini attı. Bilim, felsefe ve sanata ilgi duyan bilgili bir insandı.",
    },
    reforms: {
      sv: ["Kanunname – första osmanska lagsamlingen", "Omorganisering av devshirme-systemet", "Stadsplanering av Istanbul", "Grundande av universitet och bibliotek"],
      en: ["Kanunname – first Ottoman legal code", "Reorganization of the devshirme system", "Urban planning of Istanbul", "Founding of universities and libraries"],
      tr: ["Kanunname – ilk Osmanlı kanun derlemesi", "Devşirme sisteminin yeniden düzenlenmesi", "İstanbul'un şehir planlaması", "Üniversite ve kütüphanelerin kurulması"],
    },
    campaigns: {
      sv: ["Erövringen av Konstantinopel (1453)", "Belgrad-kampanjen (1456)", "Erövringen av Trabzon (1461)", "Otranto-kampanjen (1480)"],
      en: ["Conquest of Constantinople (1453)", "Belgrade campaign (1456)", "Conquest of Trabzon (1461)", "Otranto campaign (1480)"],
      tr: ["İstanbul'un Fethi (1453)", "Belgrad seferi (1456)", "Trabzon'un fethi (1461)", "Otranto seferi (1480)"],
    },
    leadershipStyle: {
      sv: "Mehmed II var en visionär ledare som kombinerade militär briljans med intellektuell nyfikenhet. Han talade sex språk och använde meritokrati inom administrationen. Hans ledarstil präglades av centralisering av makten.",
      en: "Mehmed II was a visionary leader who combined military brilliance with intellectual curiosity. He spoke six languages and used meritocracy in administration. His leadership style was characterized by centralization of power.",
      tr: "Fatih Sultan Mehmed, askeri dehayı entelektüel merakla birleştiren vizyoner bir liderdi. Altı dil konuşuyor ve yönetimde meritokrasiyi kullanıyordu. Liderlik tarzı güç merkezileşmesiyle karakterize edildi.",
    },
    criticalPerspectives: {
      sv: "Kritiker pekar på hans brutala behandling av besegrade folk och den strikta centraliseringen som underminerade lokal autonomi. Devshirme-systemet, även om det var meritokratiskt, innebar tvångsrekrytering av kristna pojkar.",
      en: "Critics point to his brutal treatment of defeated peoples and the strict centralization that undermined local autonomy. The devshirme system, while meritocratic, involved forced recruitment of Christian boys.",
      tr: "Eleştirmenler yenilen halkların sert muamelesine ve yerel özerkliği baltalayan katı merkezileşmeye dikkat çeker. Devşirme sistemi meritokratik olsa da Hristiyan çocukların zorla alınmasını içeriyordu.",
    },
  },
  {
    id: "suleiman",
    name: "Süleyman I",
    years: "1494–1566",
    title: { sv: "Den magnifike", en: "The Magnificent", tr: "Kanuni" },
    portrait: "👑",
    bio: {
      sv: "Süleyman I regerade 1520–1566 och anses vara Osmanska rikets mäktigaste sultan. Under hans styre nådde riket sin maximala geografiska utsträckning. Han var känd för sin lagstiftning (kallades Kanuni, 'Lagstiftaren') och sitt kulturella beskydd.",
      en: "Suleiman I reigned 1520–1566 and is considered the most powerful Ottoman sultan. Under his rule, the empire reached its maximum geographical extent. He was known for his legislation (called Kanuni, 'The Lawgiver') and cultural patronage.",
      tr: "Kanuni Sultan Süleyman 1520–1566 yılları arasında hüküm sürdü ve en güçlü Osmanlı sultanı olarak kabul edilir. Onun yönetiminde imparatorluk maksimum coğrafi genişliğine ulaştı. Yasama (Kanuni lakabı) ve kültürel himayesiyle tanındı.",
    },
    reforms: {
      sv: ["Omfattande rättsreformer (Kanun-i Osmani)", "Reform av skattesystemet", "Kodifiering av millet-systemet", "Arkitektoniskt program under Mimar Sinan"],
      en: ["Comprehensive legal reforms (Kanun-i Osmani)", "Tax system reform", "Codification of the millet system", "Architectural program under Mimar Sinan"],
      tr: ["Kapsamlı hukuk reformları (Kanun-i Osmani)", "Vergi sistemi reformu", "Millet sisteminin kodifikasyonu", "Mimar Sinan döneminde mimari program"],
    },
    campaigns: {
      sv: ["Erövringen av Belgrad (1521)", "Slaget vid Mohács (1526)", "Belägringen av Wien (1529)", "Kampanjer i Persien och Nordafrika"],
      en: ["Conquest of Belgrade (1521)", "Battle of Mohács (1526)", "Siege of Vienna (1529)", "Campaigns in Persia and North Africa"],
      tr: ["Belgrad'ın Fethi (1521)", "Mohaç Muharebesi (1526)", "Viyana Kuşatması (1529)", "İran ve Kuzey Afrika seferleri"],
    },
    leadershipStyle: {
      sv: "Süleyman kombinerade militär aggression med juridisk sofistikation. Han delegerade militärt ledarskap till kompetenta vizierer medan han fokuserade på lagstiftning och kultur. Hans partnerskap med Hürrem Sultan var unikt för sin tid.",
      en: "Suleiman combined military aggression with legal sophistication. He delegated military leadership to competent viziers while focusing on legislation and culture. His partnership with Hürrem Sultan was unique for its time.",
      tr: "Kanuni, askeri saldırganlığı hukuki incelikle birleştirdi. Yasama ve kültüre odaklanırken askeri liderliği yetkin vezirlere devretti. Hürrem Sultan ile ortaklığı dönemine göre benzersizdi.",
    },
    criticalPerspectives: {
      sv: "Under hans långa styre planterades frön till framtida problem: överdriven expansion, beroende av erövring för ekonomi, och konflikter i dynastin. Mordet på hans son Mustafa ses som en personlig tragedi med statskonsekvenser.",
      en: "During his long reign, seeds of future problems were planted: overexpansion, dependence on conquest for economics, and dynastic conflicts. The murder of his son Mustafa is seen as a personal tragedy with state consequences.",
      tr: "Uzun hükümdarlığı döneminde gelecekteki sorunların tohumları ekildi: aşırı genişleme, ekonomi için fetihlere bağımlılık ve hanedanlık çatışmaları. Oğlu Şehzade Mustafa'nın öldürülmesi devlet sonuçları olan kişisel bir trajedi olarak görülür.",
    },
  },
  {
    id: "abdulhamid-ii",
    name: "Abdülhamid II",
    years: "1842–1918",
    title: { sv: "Den siste envåldshärskaren", en: "The Last Autocrat", tr: "Ulu Hakan" },
    portrait: "🏛️",
    bio: {
      sv: "Abdülhamid II regerade 1876–1909 under en av Osmanska rikets mest turbulenta perioder. Han upphävde konstitutionen och styrde autokratiskt, men moderniserade samtidigt infrastruktur, utbildning och kommunikationer. Hans tid präglas av paradoxen mellan repression och modernisering.",
      en: "Abdulhamid II reigned 1876–1909 during one of the Ottoman Empire's most turbulent periods. He suspended the constitution and ruled autocratically, while simultaneously modernizing infrastructure, education, and communications. His era is characterized by the paradox between repression and modernization.",
      tr: "II. Abdülhamid, Osmanlı İmparatorluğu'nun en çalkantılı dönemlerinden birinde 1876–1909 yılları arasında hüküm sürdü. Anayasayı askıya aldı ve otokratik olarak yönetti, ancak aynı zamanda altyapı, eğitim ve iletişimi modernize etti. Dönemi baskı ve modernleşme arasındaki paradoksla karakterize edilir.",
    },
    reforms: {
      sv: ["Hejaz-järnvägen (Istanbul–Medina)", "Modernisering av skolsystemet", "Telegrafnätverkets utbyggnad", "Reformer inom militär utbildning"],
      en: ["Hejaz Railway (Istanbul–Medina)", "Modernization of the school system", "Telegraph network expansion", "Military education reforms"],
      tr: ["Hicaz Demiryolu (İstanbul–Medine)", "Okul sisteminin modernizasyonu", "Telgraf ağının genişletilmesi", "Askeri eğitim reformları"],
    },
    campaigns: {
      sv: ["Rysk-turkiska kriget (1877–1878)", "Konflikter i Balkan", "Armeniska frågan", "Libyska motståndsrörelsen"],
      en: ["Russo-Turkish War (1877–1878)", "Balkan conflicts", "Armenian Question", "Libyan resistance"],
      tr: ["Osmanlı-Rus Savaşı (1877–1878)", "Balkan çatışmaları", "Ermeni Meselesi", "Libya direniş hareketi"],
    },
    leadershipStyle: {
      sv: "Abdülhamid II var en master av realpolitik och balansgång mellan stormakterna. Han använde pan-islamism som politiskt verktyg och byggde ett omfattande spionnätverk. Hans ledarskap var präglat av paranoia men också av genuin moderniseringsvilja.",
      en: "Abdulhamid II was a master of realpolitik and balancing between great powers. He used pan-Islamism as a political tool and built an extensive spy network. His leadership was marked by paranoia but also genuine modernization ambition.",
      tr: "II. Abdülhamid, büyük güçler arasında denge kurma ve realpolitik ustasıydı. Pan-İslamizmi siyasi araç olarak kullandı ve kapsamlı bir istihbarat ağı kurdu. Liderliği paranoya ama aynı zamanda gerçek modernleşme hırsıyla damgalandı.",
    },
    criticalPerspectives: {
      sv: "Högt kontroversiell: för några en visionär reformator som höll samman ett döende rike, för andra en tyrann som kväste demokrati och pressade minoriteter. Den historiska bedömningen varierar dramatiskt beroende på politisk ståndpunkt.",
      en: "Highly controversial: for some a visionary reformer who held a dying empire together, for others a tyrant who suppressed democracy and oppressed minorities. Historical assessment varies dramatically depending on political stance.",
      tr: "Son derece tartışmalı: bazıları için ölmekte olan bir imparatorluğu bir arada tutan vizyoner bir reformcu, diğerleri için demokrasiyi bastıran ve azınlıklara baskı yapan bir tiran. Tarihsel değerlendirme siyasi duruşa göre dramatik şekilde değişir.",
    },
  },
];
