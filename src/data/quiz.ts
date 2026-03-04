export interface QuizQuestion {
  id: string;
  topic: "expansion" | "administration" | "military" | "decline";
  difficulty: "easy" | "medium" | "advanced";
  question: Record<string, string>;
  options: Record<string, string[]>;
  correctIndex: number;
  explanation: Record<string, string>;
}

export interface Badge {
  id: string;
  name: Record<string, string>;
  icon: string;
  requiredScore: number;
  description: Record<string, string>;
}

export const badges: Badge[] = [
  {
    id: "janissary",
    name: { sv: "Janitsjar", en: "Janissary", tr: "Yeniçeri" },
    icon: "⚔️",
    requiredScore: 3,
    description: { sv: "Klara 3 frågor rätt", en: "Answer 3 questions correctly", tr: "3 soruyu doğru cevaplayın" },
  },
  {
    id: "vizier",
    name: { sv: "Vesir", en: "Vizier", tr: "Vezir" },
    icon: "📜",
    requiredScore: 7,
    description: { sv: "Klara 7 frågor rätt", en: "Answer 7 questions correctly", tr: "7 soruyu doğru cevaplayın" },
  },
  {
    id: "sultan",
    name: { sv: "Sultan", en: "Sultan", tr: "Sultan" },
    icon: "👑",
    requiredScore: 12,
    description: { sv: "Klara 12 frågor rätt", en: "Answer 12 questions correctly", tr: "12 soruyu doğru cevaplayın" },
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    topic: "expansion",
    difficulty: "easy",
    question: {
      sv: "Vilket år föll Konstantinopel till osmanerna?",
      en: "In what year did Constantinople fall to the Ottomans?",
      tr: "Konstantinopolis hangi yıl Osmanlılara düştü?",
    },
    options: {
      sv: ["1389", "1453", "1517", "1529"],
      en: ["1389", "1453", "1517", "1529"],
      tr: ["1389", "1453", "1517", "1529"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Konstantinopel föll den 29 maj 1453 efter en 53 dagar lång belägring ledd av Sultan Mehmed II.",
      en: "Constantinople fell on May 29, 1453 after a 53-day siege led by Sultan Mehmed II.",
      tr: "Konstantinopolis, Sultan II. Mehmed'in yönettiği 53 günlük bir kuşatmanın ardından 29 Mayıs 1453'te düştü.",
    },
  },
  {
    id: "q2",
    topic: "administration",
    difficulty: "easy",
    question: {
      sv: "Vad kallades systemet för tvångsrekrytering av kristna pojkar?",
      en: "What was the system of forced recruitment of Christian boys called?",
      tr: "Hristiyan çocukların zorla alınması sistemine ne denirdi?",
    },
    options: {
      sv: ["Millet-systemet", "Devshirme", "Timar-systemet", "Jizya"],
      en: ["Millet system", "Devshirme", "Timar system", "Jizya"],
      tr: ["Millet sistemi", "Devşirme", "Timar sistemi", "Cizye"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Devshirme var ett system där kristna pojkar rekryterades, konverterades till islam och utbildades för tjänst i sultanens armé eller administration.",
      en: "Devshirme was a system where Christian boys were recruited, converted to Islam, and trained for service in the Sultan's army or administration.",
      tr: "Devşirme, Hristiyan çocukların alınıp İslam'a döndürüldüğü ve sultanın ordusu veya yönetiminde hizmet için yetiştirildiği bir sistemdi.",
    },
  },
  {
    id: "q3",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Vilken sultan ledde osmanskt armé vid slaget vid Mohács 1526?",
      en: "Which sultan led the Ottoman army at the Battle of Mohács in 1526?",
      tr: "1526 Mohaç Muharebesi'nde Osmanlı ordusunu hangi sultan yönetti?",
    },
    options: {
      sv: ["Selim I", "Süleyman I", "Mehmed II", "Bayezid II"],
      en: ["Selim I", "Suleiman I", "Mehmed II", "Bayezid II"],
      tr: ["Yavuz Sultan Selim", "Kanuni Sultan Süleyman", "Fatih Sultan Mehmed", "II. Bayezid"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Süleyman I ledde den osmanska armén till en avgörande seger vid Mohács, vilket öppnade vägen för osmanskt herravälde i Ungern.",
      en: "Suleiman I led the Ottoman army to a decisive victory at Mohács, opening the way for Ottoman dominance in Hungary.",
      tr: "Kanuni Sultan Süleyman, Osmanlı ordusunu Mohaç'ta kesin bir zafere yönelterek Osmanlı'nın Macaristan'daki hakimiyetine yol açtı.",
    },
  },
  {
    id: "q4",
    topic: "decline",
    difficulty: "medium",
    question: {
      sv: "Vilket fördrag efter nederlaget vid Wien 1683 markerade första stora osmanska territorialförlusten?",
      en: "Which treaty after the 1683 Vienna defeat marked the first major Ottoman territorial loss?",
      tr: "1683 Viyana yenilgisinden sonra hangi antlaşma ilk büyük Osmanlı toprak kaybını işaret etti?",
    },
    options: {
      sv: ["Sèvresfördraget", "Lausannefördraget", "Karlowitzfördraget", "Parisfördraget"],
      en: ["Treaty of Sèvres", "Treaty of Lausanne", "Treaty of Karlowitz", "Treaty of Paris"],
      tr: ["Sevr Antlaşması", "Lozan Antlaşması", "Karlofça Antlaşması", "Paris Antlaşması"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Fördraget i Karlowitz (1699) var det första fredsfördraget som innebar stora osmanska territoriella förluster, med avträdelser till Habsburgarna, Venedig och Polen.",
      en: "The Treaty of Karlowitz (1699) was the first peace treaty involving major Ottoman territorial losses, with cessions to the Habsburgs, Venice, and Poland.",
      tr: "Karlofça Antlaşması (1699), Habsburglara, Venedik'e ve Polonya'ya toprak devirleriyle büyük Osmanlı toprak kayıplarını içeren ilk barış antlaşmasıydı.",
    },
  },
  {
    id: "q5",
    topic: "expansion",
    difficulty: "advanced",
    question: {
      sv: "Vilken historisk titel antog Sultan Selim I efter erövringen av Egypten 1517?",
      en: "What historical title did Sultan Selim I assume after the conquest of Egypt in 1517?",
      tr: "Yavuz Sultan Selim 1517'de Mısır'ın fethinden sonra hangi tarihi unvanı aldı?",
    },
    options: {
      sv: ["Kejsare", "Kalif", "Shah", "Khan"],
      en: ["Emperor", "Caliph", "Shah", "Khan"],
      tr: ["İmparator", "Halife", "Şah", "Han"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Selim I antog titeln kalif efter att ha besegrat Mamluksultanatet. Kalifatet överfördes från den siste abbasidiska kalifen, Al-Mutawakkil III.",
      en: "Selim I assumed the title of Caliph after defeating the Mamluk Sultanate. The Caliphate was transferred from the last Abbasid caliph, Al-Mutawakkil III.",
      tr: "Yavuz Sultan Selim, Memlük Sultanlığı'nı yendikten sonra halife unvanını aldı. Halifelik son Abbasi halifesi III. Mütevekkil'den devralındı.",
    },
  },
  {
    id: "q6",
    topic: "administration",
    difficulty: "advanced",
    question: {
      sv: "Vad var 'Millet-systemets' huvudsakliga funktion i Osmanska riket?",
      en: "What was the main function of the 'Millet system' in the Ottoman Empire?",
      tr: "Osmanlı İmparatorluğu'nda 'Millet sistemi'nin temel işlevi neydi?",
    },
    options: {
      sv: ["Militär organisation", "Religiös autonomi för icke-muslimer", "Skatteindrivning", "Diplomatisk representation"],
      en: ["Military organization", "Religious autonomy for non-Muslims", "Tax collection", "Diplomatic representation"],
      tr: ["Askeri organizasyon", "Gayrimüslimlere dini özerklik", "Vergi toplama", "Diplomatik temsil"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Millet-systemet tillät religiösa minoriteter (kristna, judar m.fl.) att styra sig själva i juridiska och religiösa frågor under sina egna ledare.",
      en: "The Millet system allowed religious minorities (Christians, Jews, etc.) to govern themselves in legal and religious matters under their own leaders.",
      tr: "Millet sistemi, dini azınlıkların (Hristiyanlar, Yahudiler vb.) kendi liderleri altında hukuki ve dini konularda kendilerini yönetmelerine izin veriyordu.",
    },
  },
  {
    id: "q7",
    topic: "military",
    difficulty: "easy",
    question: {
      sv: "Vad hette den osmanska elitinfanteristyrkan?",
      en: "What was the Ottoman elite infantry force called?",
      tr: "Osmanlı elit piyade kuvvetinin adı neydi?",
    },
    options: {
      sv: ["Sipahi", "Janitsjarer", "Akıncı", "Azab"],
      en: ["Sipahi", "Janissaries", "Akıncı", "Azab"],
      tr: ["Sipahi", "Yeniçeriler", "Akıncılar", "Azaplar"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Janitsjarerna var sultanens personliga elitinfanteri, rekryterade genom devshirme-systemet och kända för sin disciplin och lojalitet.",
      en: "The Janissaries were the Sultan's personal elite infantry, recruited through the devshirme system and known for their discipline and loyalty.",
      tr: "Yeniçeriler, devşirme sistemiyle alınan, disiplin ve sadakatleriyle tanınan sultanın kişisel elit piyadeleriydi.",
    },
  },
  {
    id: "q8",
    topic: "decline",
    difficulty: "easy",
    question: {
      sv: "Vilket krig ledde direkt till Osmanska rikets upplösning?",
      en: "Which war directly led to the dissolution of the Ottoman Empire?",
      tr: "Hangi savaş doğrudan Osmanlı İmparatorluğu'nun çözülmesine yol açtı?",
    },
    options: {
      sv: ["Krimkriget", "Balkankriget", "Första världskriget", "Rysk-turkiska kriget"],
      en: ["Crimean War", "Balkan Wars", "World War I", "Russo-Turkish War"],
      tr: ["Kırım Savaşı", "Balkan Savaşları", "Birinci Dünya Savaşı", "Osmanlı-Rus Savaşı"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Osmanska rikets deltagande i första världskriget på centralmakternas sida ledde till nederlag och vapenstilleståndet i Mudros 1918, vilket effektivt avslutade riket.",
      en: "The Ottoman Empire's participation in WWI on the Central Powers' side led to defeat and the Armistice of Mudros in 1918, which effectively ended the empire.",
      tr: "Osmanlı İmparatorluğu'nun İttifak Devletleri safında I. Dünya Savaşı'na katılması yenilgiye ve 1918'de imparatorluğu fiilen sona erdiren Mondros Mütarekesi'ne yol açtı.",
    },
  },
  {
    id: "q9",
    topic: "administration",
    difficulty: "medium",
    question: {
      sv: "Vilken arkitekt designade Süleymaniyemoskén i Istanbul?",
      en: "Which architect designed the Süleymaniye Mosque in Istanbul?",
      tr: "İstanbul'daki Süleymaniye Camii'ni hangi mimar tasarladı?",
    },
    options: {
      sv: ["Mimar Hayrettin", "Mimar Sinan", "Mimar Kemalettin", "Mimar Davud"],
      en: ["Mimar Hayrettin", "Mimar Sinan", "Mimar Kemalettin", "Mimar Davud"],
      tr: ["Mimar Hayrettin", "Mimar Sinan", "Mimar Kemalettin", "Mimar Davud"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Mimar Sinan, Osmanska rikets störste arkitekt, designade Süleymaniyemoskén som sitt mästerverk mellan 1550–1557.",
      en: "Mimar Sinan, the greatest Ottoman architect, designed the Süleymaniye Mosque as his masterpiece between 1550–1557.",
      tr: "Osmanlı'nın en büyük mimarı Mimar Sinan, 1550–1557 yılları arasında başyapıtı olarak Süleymaniye Camii'ni tasarladı.",
    },
  },
  {
    id: "q10",
    topic: "expansion",
    difficulty: "medium",
    question: {
      sv: "Vilken sultan grundade Osmanska riket 1299?",
      en: "Which sultan founded the Ottoman Empire in 1299?",
      tr: "Osmanlı İmparatorluğu'nu 1299'da hangi sultan kurdu?",
    },
    options: {
      sv: ["Orhan I", "Osman I", "Murad I", "Bayezid I"],
      en: ["Orhan I", "Osman I", "Murad I", "Bayezid I"],
      tr: ["Orhan Gazi", "Osman Gazi", "I. Murad", "Yıldırım Bayezid"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Osman I (Osman Gazi) grundade Osmanska riket som ett litet beylik i nordvästra Anatolien. Riket tog sitt namn efter honom.",
      en: "Osman I (Osman Gazi) founded the Ottoman Empire as a small beylik in northwestern Anatolia. The empire took its name from him.",
      tr: "Osman Gazi, Osmanlı İmparatorluğu'nu kuzeybatı Anadolu'da küçük bir beylik olarak kurdu. İmparatorluk adını ondan aldı.",
    },
  },
  {
    id: "q11",
    topic: "decline",
    difficulty: "advanced",
    question: {
      sv: "Vad var Tanzimat-reformen (1839)?",
      en: "What was the Tanzimat reform (1839)?",
      tr: "Tanzimat reformu (1839) neydi?",
    },
    options: {
      sv: ["En militär reorganisation", "Moderniseringsreformer för jämlikhet och rättsstat", "Avskaffande av kalifatet", "En ny skattelag"],
      en: ["A military reorganization", "Modernization reforms for equality and rule of law", "Abolition of the caliphate", "A new tax law"],
      tr: ["Askeri reorganizasyon", "Eşitlik ve hukukun üstünlüğü için modernleşme reformları", "Halifeliğin kaldırılması", "Yeni vergi kanunu"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Tanzimat var en serie moderniseringsreformer som syftade till att skapa juridisk jämlikhet oavsett religion, modernisera statsapparaten och förhindra rikets sönderfall.",
      en: "The Tanzimat was a series of modernization reforms aimed at creating legal equality regardless of religion, modernizing state apparatus, and preventing the empire's disintegration.",
      tr: "Tanzimat, dine bakılmaksızın hukuki eşitlik yaratmayı, devlet aparatını modernize etmeyi ve imparatorluğun dağılmasını önlemeyi amaçlayan bir dizi modernleşme reformuydu.",
    },
  },
  {
    id: "q12",
    topic: "military",
    difficulty: "advanced",
    question: {
      sv: "Vad var den osmanska flottans roll i slaget vid Lepanto 1571?",
      en: "What was the role of the Ottoman fleet at the Battle of Lepanto in 1571?",
      tr: "1571 İnebahtı Muharebesi'nde Osmanlı donanmasının rolü neydi?",
    },
    options: {
      sv: ["Avgörande seger för osmanerna", "Osmanernas största marina nederlag", "Osmanerna deltog inte", "En framgångsrik blockad"],
      en: ["Decisive Ottoman victory", "The Ottomans' greatest naval defeat", "The Ottomans didn't participate", "A successful blockade"],
      tr: ["Kesin Osmanlı zaferi", "Osmanlıların en büyük deniz yenilgisi", "Osmanlılar katılmadı", "Başarılı bir abluka"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Lepanto var ett avgörande nederlag för den osmanska flottan mot den Heliga ligan. Dock återuppbyggde osmanerna sin flotta inom ett år.",
      en: "Lepanto was a decisive defeat for the Ottoman fleet against the Holy League. However, the Ottomans rebuilt their fleet within a year.",
      tr: "İnebahtı, Osmanlı donanmasının Kutsal İttifak'a karşı kesin bir yenilgisiydi. Ancak Osmanlılar donanmalarını bir yıl içinde yeniden inşa etti.",
    },
  },
];
