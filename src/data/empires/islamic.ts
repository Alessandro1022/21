import islamicBackground from "@/assets/islamic.jpg";
import islamicLogo from "@/assets/mecca.png";
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

const islamicTimeline: TimelineEvent[] = [
  {
    year: 610,
    title: {
      sv: "Profetens första uppenbarelse",
      en: "The Prophet's First Revelation",
      tr: "Peygamber'in İlk Vahyi",
    },
    summary: {
      sv: "I grottan Hira nära Mecka fick Profeten Muhammad ﷺ den gudomliga uppenbarelsen av ängeln Jibril (Gabriel). Orden 'Läs i din Herres namn' (Iqra) inledde en ny era för mänskligheten. Hans trofasta hustru Khadijah (ra) var den första att tro på honom och stöttade honom med hela sin själ.",
      en: "In the cave of Hira near Mecca, the Prophet Muhammad ﷺ received the divine revelation through the angel Jibreel (Gabriel). The words 'Read in the name of your Lord' (Iqra) opened a new era for humanity. His devoted wife Khadijah (ra) was the first to believe in him and supported him with her entire soul.",
      tr: "Mekke yakınlarındaki Hira mağarasında Hz. Muhammed ﷺ, Cebrail aracılığıyla ilahi vahyi aldı. 'Yaratan Rabbinin adıyla oku' (İkra) sözleri insanlık için yeni bir çağ açtı. Sadık eşi Hz. Hatice (ra) ona ilk inanan ve tüm kalbiyle destekleyen oldu.",
    },
    figures: ["Muhammad ﷺ", "Khadijah (ra)", "Abu Bakr al-Siddiq (ra)"],
    consequences: {
      sv: "En gudagiven vägledning för hela mänskligheten uppenbaras.",
      en: "A divine guidance for all of humanity is revealed.",
      tr: "Tüm insanlık için ilahi bir rehberlik vahyedilir.",
    },
    impact: {
      sv: "Grunden läggs för en civilisation som skulle lysa upp världen.",
      en: "The foundation is laid for a civilization that would illuminate the world.",
      tr: "Dünyayı aydınlatacak bir medeniyetin temeli atılır.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: 622,
    title: {
      sv: "Hijra — Den välsignade vandringen till Medina",
      en: "The Hijra — The Blessed Migration to Medina",
      tr: "Hicret — Medine'ye Kutlu Göç",
    },
    summary: {
      sv: "Profeten Muhammad ﷺ och hans lojala följeslagare lämnade Mecka för Medina. Abu Bakr al-Siddiq (ra), Profetens närmaste vän och följeslagare, delade denna historiska resa. Folket i Medina — Ansar, 'hjälparna' — tog emot dem med kärlek och öppenhet. Denna händelse är så central att den markerar år 1 i den islamiska kalendern.",
      en: "The Prophet Muhammad ﷺ and his loyal companions left Mecca for Medina. Abu Bakr al-Siddiq (ra), the Prophet's closest companion, shared this historic journey. The people of Medina — the Ansar, 'the helpers' — welcomed them with love and open arms. This event is so central it marks year 1 of the Islamic calendar.",
      tr: "Hz. Muhammed ﷺ ve sadık sahabeleri Mekke'den Medine'ye göç etti. Peygamberin en yakın dostu Hz. Ebu Bekir (ra) bu tarihi yolculuğu paylaştı. Medine halkı — Ensar, 'yardımcılar' — onları sevgi ve açık yüreklilikle karşıladı.",
    },
    figures: ["Muhammad ﷺ", "Abu Bakr al-Siddiq (ra)", "Ali ibn Abi Talib (ra)"],
    consequences: {
      sv: "Den första islamiska staten grundas i Medina.",
      en: "The first Islamic state is established in Medina.",
      tr: "Medine'de ilk İslam devleti kurulur.",
    },
    impact: {
      sv: "En ny era av rättvisa, broderskap och gudsfruktan tar sin början.",
      en: "A new era of justice, brotherhood and God-consciousness begins.",
      tr: "Adalet, kardeşlik ve takvanın yeni bir çağı başlar.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: 624,
    title: {
      sv: "Slaget vid Badr — En gudomlig seger",
      en: "Battle of Badr — A Divine Victory",
      tr: "Bedir Savaşı — İlahi Bir Zafer",
    },
    summary: {
      sv: "Med 313 muslimer mot en mycket överlägsen meckaansk armé vann Profeten ﷺ och hans följeslagare en mirakulös seger vid Badr. Koranen beskriver detta som en seger med änglarnas hjälp. Khalid ibn al-Walid (ra) och Umar ibn al-Khattab (ra) visade enastående mod.",
      en: "With 313 Muslims against a vastly superior Meccan army, the Prophet ﷺ and his companions won a miraculous victory at Badr. The Quran describes this as a victory aided by angels. The companions showed extraordinary courage and faith.",
      tr: "313 Müslüman ile çok daha güçlü Mekke ordusuna karşı Hz. Peygamber ﷺ ve sahabeleri Bedir'de mucizevi bir zafer kazandı. Kur'an bu zaferi meleklerin yardımıyla kazanılan bir zafer olarak anlatır.",
    },
    figures: ["Muhammad ﷺ", "Umar ibn al-Khattab (ra)", "Ali ibn Abi Talib (ra)", "Hamza ibn Abd al-Muttalib (ra)"],
    consequences: {
      sv: "Islam stärks och muslimernas tro fördjupas.",
      en: "Islam is strengthened and the believers' faith deepens.",
      tr: "İslam güçlenir ve Müslümanların imanı derinleşir.",
    },
    impact: {
      sv: "Visar att sanning och tro övervinner övermakt.",
      en: "Shows that truth and faith overcome overwhelming force.",
      tr: "Hakikat ve imanın ezici güce karşı zafer kazandığını gösterir.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 630,
    title: {
      sv: "Den fredliga erövringen av Mecka",
      en: "The Peaceful Conquest of Mecca",
      tr: "Mekke'nin Fethi",
    },
    summary: {
      sv: "Profeten Muhammad ﷺ återvände till Mecka i spetsen för 10 000 muslimer. Erövringen skedde nästan utan blodsutgjutelse — ett unikt exempel på nåd och förlåtelse i historien. Profeten ﷺ utlyste en allmän amnesti och förklarade: 'Gå — ni är fria.' Kaaban rensades från avgudabilder och återvigdes till tillbedjan av Gud Allena.",
      en: "The Prophet Muhammad ﷺ returned to Mecca leading 10,000 Muslims. The conquest occurred almost without bloodshed — a unique example of mercy and forgiveness in history. The Prophet ﷺ declared a general amnesty: 'Go — you are all free.' The Kaaba was cleansed of idols and rededicated to the worship of God Alone.",
      tr: "Hz. Muhammed ﷺ, 10.000 Müslüman'ın başında Mekke'ye döndü. Fetih neredeyse kansız gerçekleşti — tarihte benzersiz bir merhamet ve af örneği. Hz. Peygamber ﷺ genel af ilan etti: 'Gidin — hepiniz özgürsünüz.' Kabe putlardan temizlendi ve yalnızca Allah'a ibadete yeniden adandı.",
    },
    figures: ["Muhammad ﷺ", "Khalid ibn al-Walid (ra)", "Abu Sufyan (ra)", "Bilal ibn Rabah (ra)"],
    consequences: {
      sv: "Arabien enat under islam. Kaaban återinvigd.",
      en: "Arabia united under Islam. The Kaaba rededicated.",
      tr: "Arabistan İslam altında birleşir. Kabe yeniden adanır.",
    },
    impact: {
      sv: "Profetens nåd och karaktär lyser som ett evigt föredöme.",
      en: "The Prophet's mercy and character shine as an eternal example.",
      tr: "Peygamberin merhameti ve karakteri ebedi bir örnek olarak parlar.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 632,
    title: {
      sv: "Profeten ﷺ avslutar sin mission — Abu Bakr al-Siddiq (ra) blir kalif",
      en: "The Prophet ﷺ Completes His Mission — Abu Bakr al-Siddiq (ra) Becomes Caliph",
      tr: "Hz. Peygamber ﷺ Misyonunu Tamamlar — Hz. Ebu Bekir (ra) Halife Olur",
    },
    summary: {
      sv: "Profeten Muhammad ﷺ avled i Medina efter att ha fullbordat sin gudomliga mission. Hans sista predikan vid Arafat manade till broderskap, rättvisa och Guds enhet. Abu Bakr al-Siddiq (ra) — Profetens närmaste vän, den trofast som 'sanningsbekräftaren' — valdes enhälligt till den förste kalifen. Hans ledarskap höll umman samlad i en kritisk tid.",
      en: "The Prophet Muhammad ﷺ passed away in Medina having completed his divine mission. His final sermon at Arafat called for brotherhood, justice and the Oneness of God. Abu Bakr al-Siddiq (ra) — the Prophet's closest companion, 'the Truthful' — was unanimously chosen as the first caliph. His leadership kept the ummah united in a critical time.",
      tr: "Hz. Muhammed ﷺ ilahi misyonunu tamamlayarak Medine'de vefat etti. Arafat'taki son hutbesi kardeşliği, adaleti ve Allah'ın birliğini çağırdı. Peygamberin en yakın dostu Hz. Ebu Bekir (ra) — 'Sıddık' — oy birliğiyle ilk halife seçildi.",
    },
    figures: ["Abu Bakr al-Siddiq (ra)", "Umar ibn al-Khattab (ra)", "Uthman ibn Affan (ra)", "Ali ibn Abi Talib (ra)"],
    consequences: {
      sv: "Rashidunska kalifatet grundas. Umman förblir enad.",
      en: "The Rashidun Caliphate is founded. The Ummah remains united.",
      tr: "Raşidun Halifeliği kurulur. Ümmet birliğini korur.",
    },
    impact: {
      sv: "Abu Bakrs (ra) mod och visdom räddade islams framtid.",
      en: "Abu Bakr's (ra) courage and wisdom saved Islam's future.",
      tr: "Hz. Ebu Bekir'in (ra) cesareti ve hikmeti İslam'ın geleceğini kurtardı.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 634,
    title: {
      sv: "Umar ibn al-Khattab (ra) — Den rättvise kalifen",
      en: "Umar ibn al-Khattab (ra) — The Just Caliph",
      tr: "Hz. Ömer (ra) — Adaletli Halife",
    },
    summary: {
      sv: "Umar ibn al-Khattab (ra), känd som 'Al-Faruq' — den som skiljer sanning från falskhet — blir den andre rättledde kalifen. Under hans tio år expanderade det islamiska riket med enastående hastighet till Persien, Syrien och Egypten. Han var känd för sin extraordinära rättvisa — han gick själv ut på natten för att kontrollera att folket hade det bra.",
      en: "Umar ibn al-Khattab (ra), known as 'Al-Farouq' — the one who distinguishes truth from falsehood — becomes the second Rightly Guided Caliph. During his ten years the Islamic empire expanded with remarkable speed into Persia, Syria and Egypt. He was renowned for his extraordinary justice — personally patrolling at night to ensure people's wellbeing.",
      tr: "Hz. Ömer ibn el-Hattab (ra), 'el-Faruk' — hakkı batıldan ayıran — sıfatıyla ikinci Raşid Halife olur. On yılı boyunca İslam imparatorluğu Pers, Suriye ve Mısır'a olağanüstü hızla genişledi. Olağanüstü adaleti ile tanınırdı — halkın iyiliğini bizzat kontrol etmek için geceleri dolaşırdı.",
    },
    figures: ["Umar ibn al-Khattab (ra)", "Khalid ibn al-Walid (ra)", "Amr ibn al-As (ra)", "Saad ibn Abi Waqqas (ra)"],
    consequences: {
      sv: "Islamisk rätt och administration formaliseras.",
      en: "Islamic law and administration are formalized.",
      tr: "İslam hukuku ve yönetimi resmileşir.",
    },
    impact: {
      sv: "Umars rättvisa är ett evigt föredöme för alla ledare.",
      en: "Umar's justice is an eternal example for all leaders.",
      tr: "Hz. Ömer'in adaleti tüm liderler için ebedi bir örnektir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 636,
    title: {
      sv: "Slaget vid Yarmouk — Syriens befrielse",
      en: "Battle of Yarmouk — Liberation of Syria",
      tr: "Yermük Savaşı — Suriye'nin Kurtuluşu",
    },
    summary: {
      sv: "Khalid ibn al-Walid (ra) — 'Guds svärd', en av historiens mest briljanta militära befälhavare — ledde de muslimska styrkorna mot det mäktiga Bysantinska riket vid Yarmoukfloden. Trots numerärt underläge vann muslimerna en avgörande seger. Syrien och Palestina öppnades för islam.",
      en: "Khalid ibn al-Walid (ra) — 'Sword of God', one of history's most brilliant military commanders — led the Muslim forces against the powerful Byzantine Empire at the Yarmouk River. Despite being outnumbered, the Muslims won a decisive victory. Syria and Palestine were opened to Islam.",
      tr: "Halid ibn Velid (ra) — 'Allah'ın Kılıcı', tarihin en parlak komutanlarından biri — Yermük Nehri'nde güçlü Bizans İmparatorluğuna karşı Müslüman kuvvetleri yönetti. Sayıca az olmalarına rağmen Müslümanlar kesin bir zafer kazandı.",
    },
    figures: ["Khalid ibn al-Walid (ra)", "Abu Ubayda ibn al-Jarrah (ra)", "Umar ibn al-Khattab (ra)"],
    consequences: {
      sv: "Bysantinerna drivs ut ur Syrien och Palestina.",
      en: "The Byzantines are driven from Syria and Palestine.",
      tr: "Bizanslılar Suriye ve Filistin'den çekilir.",
    },
    impact: {
      sv: "Det islamiska riket etableras som en stormakt.",
      en: "The Islamic empire establishes itself as a major power.",
      tr: "İslam imparatorluğu büyük bir güç olarak yerini alır.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 637,
    title: {
      sv: "Jerusalem öppnar sina portar",
      en: "Jerusalem Opens Its Gates",
      tr: "Kudüs Kapılarını Açıyor",
    },
    summary: {
      sv: "Kalif Umar ibn al-Khattab (ra) reste personligen till Jerusalem för att ta emot stadens överlämnande. Hans inträde i den heliga staden skedde i full ödmjukhet — han gick till fots och delade kamel med sin tjänare. Han utfärdade ett historiskt brev som garanterade alla invånares säkerhet och religionsfrihet oavsett tro.",
      en: "Caliph Umar ibn al-Khattab (ra) personally traveled to Jerusalem to receive the city's surrender. His entry into the holy city was in full humility — he walked on foot and shared his camel with his servant. He issued a historic letter guaranteeing the safety and religious freedom of all inhabitants regardless of faith.",
      tr: "Halife Hz. Ömer (ra), şehrin teslimini kabul etmek için bizzat Kudüs'e gitti. Kutsal şehre girişi tam bir tevazuyla oldu — yaya yürüdü ve devesini hizmetkarıyla paylaştı. İnancından bağımsız olarak tüm sakinlerin güvenliğini ve din özgürlüğünü garanti eden tarihi bir mektup yayımladı.",
    },
    figures: ["Umar ibn al-Khattab (ra)", "Abu Ubayda ibn al-Jarrah (ra)"],
    consequences: {
      sv: "Jerusalem under islamiskt styre med full religionsfrihet.",
      en: "Jerusalem under Islamic rule with full religious freedom.",
      tr: "Kudüs tam din özgürlüğüyle İslam yönetiminde.",
    },
    impact: {
      sv: "Umars brev om religionsfrihet är ett historiskt mästerverk av rättvisa.",
      en: "Umar's letter on religious freedom is a historic masterpiece of justice.",
      tr: "Hz. Ömer'in din özgürlüğüne ilişkin mektubu, tarihi bir adalet başyapıtıdır.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 644,
    title: {
      sv: "Uthman ibn Affan (ra) — Koranens bevarare",
      en: "Uthman ibn Affan (ra) — Preserver of the Quran",
      tr: "Hz. Osman (ra) — Kur'an'ın Koruyucusu",
    },
    summary: {
      sv: "Uthman ibn Affan (ra), känd som 'Dhul-Nurayn' (den med två ljus) för att han gifte sig med två av Profetens ﷺ döttrar, blir den tredje rättledde kalifen. Hans viktigaste gärning var sammanställningen av den standardiserade Korantexten — ett arbete som säkrade Guds ord för alla generationer.",
      en: "Uthman ibn Affan (ra), known as 'Dhul-Nurayn' (the one with two lights) for marrying two of the Prophet's ﷺ daughters, becomes the third Rightly Guided Caliph. His most important act was compiling the standardized Quran — a work that preserved God's word for all generations.",
      tr: "Hz. Peygamber'in ﷺ iki kızıyla evlendiği için 'Zü'n-Nureyn' (iki nur sahibi) lakaplı Hz. Osman (ra), üçüncü Raşid Halife olur. En önemli eseri, standart Kur'an metnini derledi — bu çalışma Allah'ın sözünü tüm nesiller için korudu.",
    },
    figures: ["Uthman ibn Affan (ra)", "Zayd ibn Thabit (ra)"],
    consequences: {
      sv: "Koranen standardiseras och bevaras för evigheten.",
      en: "The Quran is standardized and preserved for eternity.",
      tr: "Kur'an standartlaştırılır ve ebediyet için korunur.",
    },
    impact: {
      sv: "Uthmans (ra) arv lever i varje Koranexemplar världen över.",
      en: "Uthman's (ra) legacy lives in every Quran copy worldwide.",
      tr: "Hz. Osman'ın (ra) mirası dünya genelindeki her Kur'an nüshasında yaşar.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 656,
    title: {
      sv: "Ali ibn Abi Talib (ra) — Lejonets kalif",
      en: "Ali ibn Abi Talib (ra) — The Lion Caliph",
      tr: "Hz. Ali (ra) — Aslan Halife",
    },
    summary: {
      sv: "Ali ibn Abi Talib (ra) — Profetens ﷺ kusin och svärson, uppfostrad i Profetens hem sedan barnsben — blir den fjärde och siste rättledde kalifen. Känd för sin extraordinära tapperhet, visdom och rättvisa. Profeten ﷺ sade om honom: 'Jag är visdomens stad och Ali är dess port.'",
      en: "Ali ibn Abi Talib (ra) — the Prophet's ﷺ cousin and son-in-law, raised in the Prophet's household from childhood — becomes the fourth and final Rightly Guided Caliph. Known for his extraordinary courage, wisdom and justice. The Prophet ﷺ said of him: 'I am the city of knowledge and Ali is its gate.'",
      tr: "Hz. Ali ibn Ebi Talib (ra) — Peygamberin ﷺ amcaoğlu ve damadı, çocukluğundan beri Peygamberin evinde büyüdü — dördüncü ve son Raşid Halife olur. Olağanüstü cesareti, hikmeti ve adaleti ile tanınır. Hz. Peygamber ﷺ onun için şöyle buyurdu: 'Ben ilmin şehriyim, Ali ise kapısıdır.'",
    },
    figures: ["Ali ibn Abi Talib (ra)", "Hasan ibn Ali (ra)", "Husayn ibn Ali (ra)"],
    consequences: {
      sv: "Den rättledde kalif-eran avslutas. Umans enhet prövas.",
      en: "The Rightly Guided Caliph era ends. The Ummah's unity is tested.",
      tr: "Raşid Halifeler dönemi sona erer. Ümmetin birliği sınanır.",
    },
    impact: {
      sv: "Alis (ra) visdom och mod är ett evigt ljus för islam.",
      en: "Ali's (ra) wisdom and courage are an eternal light for Islam.",
      tr: "Hz. Ali'nin (ra) hikmeti ve cesareti İslam için ebedi bir ışıktır.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 661,
    title: {
      sv: "Umayyadkalifatets grundande — Damaskus som centrum",
      en: "Umayyad Caliphate Founded — Damascus as Center",
      tr: "Emevi Halifeliğinin Kuruluşu — Merkez Şam",
    },
    summary: {
      sv: "Muawiya ibn Abi Sufyan grundar Umayyadkalifatet med Damaskus som huvudstad. Riket fortsätter att expandera dramatiskt — österut till Centralasien och västerut längs Nordafrika. Det islamiska imperiet växer till ett av historiens största.",
      en: "Muawiya ibn Abi Sufyan founds the Umayyad Caliphate with Damascus as capital. The empire continues to expand dramatically — eastward to Central Asia and westward along North Africa. The Islamic empire grows into one of history's largest.",
      tr: "Muaviye ibn Ebi Süfyan, Şam'ı başkent olarak Emevi Halifeliğini kurar. İmparatorluk doğuda Orta Asya'ya ve batıda Kuzey Afrika boyunca dramatik biçimde genişlemeye devam eder.",
    },
    figures: ["Muawiya ibn Abi Sufyan", "Khalid ibn al-Walid (ra)", "Amr ibn al-As (ra)"],
    consequences: {
      sv: "Islamisk expansion till tre kontinenter.",
      en: "Islamic expansion to three continents.",
      tr: "İslam'ın üç kıtaya yayılması.",
    },
    impact: {
      sv: "Det islamiska imperiet blir en världsmakt.",
      en: "The Islamic empire becomes a world power.",
      tr: "İslam imparatorluğu bir dünya gücü haline gelir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 711,
    title: {
      sv: "Tariq ibn Ziyad erövrar Andalusien",
      en: "Tariq ibn Ziyad Conquers Andalusia",
      tr: "Tarık ibn Ziyad Endülüs'ü Fetheder",
    },
    summary: {
      sv: "Den legendariske befälhavaren Tariq ibn Ziyad korsar Gibraltar med 7 000 man och besegrar det Visigotiska riket. Han brände sina skepp och höll sitt berömda tal: 'Havet är bakom er, fienden är framför er.' Andalusien under islamskt styre blev ett av mänsklighetens kulturella höjdpunkter.",
      en: "The legendary commander Tariq ibn Ziyad crosses Gibraltar with 7,000 men and defeats the Visigothic Kingdom. He burned his ships and delivered his famous speech: 'The sea is behind you, the enemy is before you.' Andalusia under Islamic rule became one of humanity's cultural peaks.",
      tr: "Efsanevi komutan Tarık ibn Ziyad, 7.000 askerle Cebelitarık'ı geçer ve Vizigot Krallığını yener. Gemilerini yaktı ve ünlü konuşmasını yaptı: 'Arkanda deniz var, önünde düşman.' İslam yönetimindeki Endülüs, insanlığın kültürel zirvelerinden biri oldu.",
    },
    figures: ["Tariq ibn Ziyad", "Musa ibn Nusayr"],
    consequences: {
      sv: "Islam når Europa. Andalusien grundas.",
      en: "Islam reaches Europe. Al-Andalus is founded.",
      tr: "İslam Avrupa'ya ulaşır. Endülüs kurulur.",
    },
    impact: {
      sv: "Islamisk vetenskap och kultur berör Europa direkt.",
      en: "Islamic science and culture directly touches Europe.",
      tr: "İslam bilimi ve kültürü Avrupa'ya doğrudan dokunur.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 750,
    title: {
      sv: "Abbasidkalifatets grundande — Bagdads guldålder börjar",
      en: "Abbasid Caliphate Founded — Baghdad's Golden Age Begins",
      tr: "Abbasi Halifeliğinin Kuruluşu — Bağdat'ın Altın Çağı Başlıyor",
    },
    summary: {
      sv: "Abbasiderna tar makten och grundar ett nytt kalifat med fokus på kunskap, vetenskap och kultur. Bagdad byggs som världens mest lysande stad. Lärde från hela världen samlas — perser, greker, indier — och deras verk översätts och vidareutvecklas av muslimska vetenskapsmän.",
      en: "The Abbasids take power and found a new caliphate focused on knowledge, science and culture. Baghdad is built as the world's most brilliant city. Scholars from across the world gather — Persians, Greeks, Indians — and their works are translated and developed by Muslim scientists.",
      tr: "Abbasiler iktidarı ele geçirir ve bilgi, bilim ve kültüre odaklanan yeni bir halifelik kurar. Bağdat dünyanın en parlak şehri olarak inşa edilir. Farslar, Rumlar, Hintliler — dünyanın dört bir yanından alimler toplanır.",
    },
    figures: ["Abu al-Abbas al-Saffah", "Al-Mansur", "Harun al-Rashid", "Al-Mamun"],
    consequences: {
      sv: "Bagdad blir världens intellektuella centrum.",
      en: "Baghdad becomes the intellectual center of the world.",
      tr: "Bağdat dünyanın entelektüel merkezi olur.",
    },
    impact: {
      sv: "Islamisk vetenskap räddar och vidareför antikens kunskaper.",
      en: "Islamic science saves and transmits the knowledge of antiquity.",
      tr: "İslam bilimi antik çağın bilgisini kurtarır ve aktarır.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 786,
    title: {
      sv: "Harun al-Rashid — Guldålderns lysande kalif",
      en: "Harun al-Rashid — The Brilliant Caliph of the Golden Age",
      tr: "Harun Reşid — Altın Çağın Parlak Halifesi",
    },
    summary: {
      sv: "Harun al-Rashid styr ett imperium som sträcker sig från Atlantkusten till Centralasien. Hans hov i Bagdad lockar filosofer, poeter, vetenskapsmän och konstnärer. Tusen och en natt speglar denna epoks prakt. Han korresponderade med Karl den store och hans imperium var vida beundrat världen över.",
      en: "Harun al-Rashid rules an empire stretching from the Atlantic coast to Central Asia. His court in Baghdad attracts philosophers, poets, scientists and artists. The Thousand and One Nights reflects this era's splendor. He corresponded with Charlemagne and his empire was widely admired worldwide.",
      tr: "Harun Reşid, Atlantik kıyısından Orta Asya'ya uzanan bir imparatorluğu yönetir. Bağdat'taki sarayı filozofları, şairleri, bilim insanlarını ve sanatçıları çeker. Binbir Gece Masalları bu dönemin ihtişamını yansıtır.",
    },
    figures: ["Harun al-Rashid", "Yahya al-Barmaki", "Ibrahim al-Mawsili"],
    consequences: {
      sv: "Bagdad når sin glansperiod. Världshandel blomstrar.",
      en: "Baghdad reaches its peak. World trade flourishes.",
      tr: "Bağdat zirve noktasına ulaşır. Dünya ticareti gelişir.",
    },
    impact: {
      sv: "En era vars glans historien minns med beundran.",
      en: "An era whose brilliance history remembers with admiration.",
      tr: "Tarihin hayranlıkla andığı bir çağ.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 830,
    title: {
      sv: "Visdomens hus — Al-Bayt al-Hikmah",
      en: "The House of Wisdom — Al-Bayt al-Hikmah",
      tr: "Bilgelik Evi — Beytü'l-Hikme",
    },
    summary: {
      sv: "Kalif al-Mamun grundar Visdomens hus i Bagdad — ett av historiens mest extraordinära intellektuella institutioner. Här översätts och bevaras grekiska, persiska, indiska och syriska verk. Al-Khwarizmi uppfinner algebran. Ibn Sina utvecklar medicinen. Al-Farabi utforskar filosofin. Islamisk vetenskap lyser upp en värld i mörker.",
      en: "Caliph al-Mamun establishes the House of Wisdom in Baghdad — one of history's most extraordinary intellectual institutions. Here Greek, Persian, Indian and Syriac works are translated and preserved. Al-Khwarizmi invents algebra. Ibn Sina advances medicine. Al-Farabi explores philosophy. Islamic science illuminates a world in darkness.",
      tr: "Halife el-Memun, Bağdat'ta tarihinin en olağanüstü entelektüel kurumlarından biri olan Beytü'l-Hikme'yi kurar. Burada Rum, Fars, Hint ve Süryani eserler tercüme edilip korunur. El-Harezmî cebri icat eder. İbn Sina tıbbı ilerletir.",
    },
    figures: ["Al-Mamun", "Al-Khwarizmi", "Al-Kindi", "Hunayn ibn Ishaq"],
    consequences: {
      sv: "Antikens vetande bevaras och utökas.",
      en: "Ancient knowledge is preserved and expanded.",
      tr: "Antik bilgi korunur ve genişletilir.",
    },
    impact: {
      sv: "Grunden för modern matematik, medicin och astronomi läggs.",
      en: "The foundation of modern mathematics, medicine and astronomy is laid.",
      tr: "Modern matematik, tıp ve astronominin temeli atılır.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1258,
    title: {
      sv: "Bagdads fall — Mongolernas invasion",
      en: "Fall of Baghdad — The Mongol Invasion",
      tr: "Bağdat'ın Düşüşü — Moğol İstilası",
    },
    summary: {
      sv: "Hülegü Khans mongolska arméer anfaller och förstör Bagdad. Tigris flödar av bläck från förstörda böcker ur Visdomens hus. Det Abbasidiska kalifatet avslutas formellt. Det är en av historiens mest förödande katastrofer för islamisk civilisation — men islams anda överlever och återuppstår.",
      en: "Hulagu Khan's Mongol armies attack and destroy Baghdad. The Tigris flows with ink from destroyed books from the House of Wisdom. The Abbasid Caliphate formally ends. It is one of history's most devastating catastrophes for Islamic civilization — but Islam's spirit survives and rises again.",
      tr: "Hülagü Han'ın Moğol orduları Bağdat'ı saldırır ve yok eder. Dicle, Bilgelik Evi'nden yok edilen kitapların mürekkebiyle akar. Abbasi Halifeliği resmen sona erer. İslam medeniyeti için tarihin en yıkıcı felaketlerinden biri — ancak İslam'ın ruhu hayatta kalır ve yeniden yükselir.",
    },
    figures: ["Hulagu Khan", "Al-Mustasim Billah"],
    consequences: {
      sv: "Abbasidkalifatet avslutas. Enorma kunskapsskatter förstörs.",
      en: "The Abbasid Caliphate ends. Enormous treasuries of knowledge are destroyed.",
      tr: "Abbasi Halifeliği sona erer. Muazzam bilgi hazineleri yok edilir.",
    },
    impact: {
      sv: "Islam och muslimerna överlever och bygger upp igen — som alltid.",
      en: "Islam and the Muslims survive and rebuild — as always.",
      tr: "İslam ve Müslümanlar her zaman olduğu gibi hayatta kalır ve yeniden inşa eder.",
    },
    category: "war",
    importance: "high",
  },
];

// =============================================================================
// LEADERS (DE FYRA RÄTTLEDDA KALIFERNA + STORA HÄRSKARE)
// =============================================================================

const islamicLeaders: Sultan[] = [
  {
    id: "abu-bakr",
    name: "Abu Bakr al-Siddiq (ra)",
    reignStart: 632,
    reignEnd: 634,
    parentId: null,
    generation: 1,
    title: { sv: "Den Sanne, Profetens närmaste vän", en: "The Truthful, The Prophet's Closest Companion", tr: "Sıddık, Peygamberin En Yakın Dostu" },
  },
  {
    id: "umar",
    name: "Umar ibn al-Khattab (ra)",
    reignStart: 634,
    reignEnd: 644,
    parentId: null,
    generation: 1,
    title: { sv: "Al-Faruq — Den rättvise", en: "Al-Farouq — The Just", tr: "el-Faruk — Adaletli" },
  },
  {
    id: "uthman",
    name: "Uthman ibn Affan (ra)",
    reignStart: 644,
    reignEnd: 656,
    parentId: null,
    generation: 1,
    title: { sv: "Dhul-Nurayn — Koranens bevarare", en: "Dhul-Nurayn — Preserver of the Quran", tr: "Zü'n-Nureyn — Kur'an'ın Koruyucusu" },
  },
  {
    id: "ali",
    name: "Ali ibn Abi Talib (ra)",
    reignStart: 656,
    reignEnd: 661,
    parentId: null,
    generation: 1,
    title: { sv: "Lejonets kalif, Visdomens port", en: "The Lion Caliph, Gate of Wisdom", tr: "Aslan Halife, Hikmetin Kapısı" },
  },
  {
    id: "muawiya",
    name: "Muawiya ibn Abi Sufyan",
    reignStart: 661,
    reignEnd: 680,
    parentId: null,
    generation: 2,
    title: { sv: "Umayyadkalifatets grundare", en: "Founder of the Umayyad Caliphate", tr: "Emevi Halifeliğinin Kurucusu" },
  },
  {
    id: "abd-al-malik",
    name: "Abd al-Malik ibn Marwan",
    reignStart: 685,
    reignEnd: 705,
    parentId: "muawiya",
    generation: 3,
    title: { sv: "Administratörn och byggaren", en: "The Administrator and Builder", tr: "Yönetici ve İnşaatçı" },
  },
  {
    id: "al-walid",
    name: "Al-Walid ibn Abd al-Malik",
    reignStart: 705,
    reignEnd: 715,
    parentId: "abd-al-malik",
    generation: 4,
    title: { sv: "Rikets guldtid", en: "The Empire's Golden Period", tr: "İmparatorluğun Altın Dönemi" },
  },
  {
    id: "harun",
    name: "Harun al-Rashid",
    reignStart: 786,
    reignEnd: 809,
    parentId: null,
    generation: 5,
    title: { sv: "Guldålderns kalif", en: "Caliph of the Golden Age", tr: "Altın Çağın Halifesi" },
    profileId: "harun-al-rashid",
  },
  {
    id: "al-mamun",
    name: "Al-Mamun",
    reignStart: 813,
    reignEnd: 833,
    parentId: "harun",
    generation: 6,
    title: { sv: "Vetenskapens beskyddare", en: "Patron of Science", tr: "Bilimin Hamisi" },
    profileId: "al-mamun",
  },
];

// =============================================================================
// QUIZ QUESTIONS
// =============================================================================

const islamicQuizQuestions: QuizQuestion[] = [
  {
    id: "iq1",
    topic: "religion",
    difficulty: "easy",
    question: {
      sv: "I vilken grotta fick Profeten Muhammad ﷺ sin första uppenbarelse?",
      en: "In which cave did Prophet Muhammad ﷺ receive his first revelation?",
      tr: "Hz. Muhammed ﷺ ilk vahyi hangi mağarada aldı?",
    },
    options: {
      sv: ["Grotten Thawr", "Grotten Hira", "Grotten Uhud", "Grotten Badr"],
      en: ["Cave of Thawr", "Cave of Hira", "Cave of Uhud", "Cave of Badr"],
      tr: ["Sevr Mağarası", "Hira Mağarası", "Uhud Mağarası", "Bedir Mağarası"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Profeten Muhammad ﷺ fick sin första uppenbarelse i grottan Hira på berget Nour nära Mecka år 610 e.Kr.",
      en: "Prophet Muhammad ﷺ received his first revelation in the Cave of Hira on Mount Nour near Mecca in 610 AD.",
      tr: "Hz. Muhammed ﷺ ilk vahyi MS 610'da Mekke yakınlarındaki Nur Dağı'ndaki Hira mağarasında aldı.",
    },
  },
  {
    id: "iq2",
    topic: "religion",
    difficulty: "easy",
    question: {
      sv: "Vem var den förste rättledde kalifen efter Profeten ﷺ?",
      en: "Who was the first Rightly Guided Caliph after the Prophet ﷺ?",
      tr: "Hz. Peygamber'den ﷺ sonra ilk Raşid Halife kimdi?",
    },
    options: {
      sv: ["Umar ibn al-Khattab", "Ali ibn Abi Talib", "Abu Bakr al-Siddiq", "Uthman ibn Affan"],
      en: ["Umar ibn al-Khattab", "Ali ibn Abi Talib", "Abu Bakr al-Siddiq", "Uthman ibn Affan"],
      tr: ["Hz. Ömer ibn Hattab", "Hz. Ali ibn Ebi Talib", "Hz. Ebu Bekir el-Sıddık", "Hz. Osman ibn Affan"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Abu Bakr al-Siddiq (ra) — Profetens ﷺ närmaste vän och 'den sanne' — valdes till den förste rättledde kalifen år 632 e.Kr.",
      en: "Abu Bakr al-Siddiq (ra) — the Prophet's ﷺ closest companion and 'the Truthful' — was chosen as the first Rightly Guided Caliph in 632 AD.",
      tr: "Hz. Ebu Bekir el-Sıddık (ra) — Peygamberin ﷺ en yakın dostu — MS 632'de ilk Raşid Halife seçildi.",
    },
  },
  {
    id: "iq3",
    topic: "military",
    difficulty: "medium",
    question: {
      sv: "Vilket smeknamn fick Khalid ibn al-Walid (ra) av Profeten ﷺ?",
      en: "What nickname did the Prophet ﷺ give to Khalid ibn al-Walid (ra)?",
      tr: "Hz. Peygamber ﷺ Halid ibn Velid'e (ra) ne lakap verdi?",
    },
    options: {
      sv: ["Guds lejon", "Islams svärd", "Guds svärd", "Trons hjälte"],
      en: ["Lion of God", "Sword of Islam", "Sword of God", "Hero of Faith"],
      tr: ["Allah'ın Aslanı", "İslam'ın Kılıcı", "Allah'ın Kılıcı", "İmanın Kahramanı"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Profeten Muhammad ﷺ gav Khalid ibn al-Walid (ra) hedersnamnet 'Sayf Allah' — Guds svärd — som erkännande av hans extraordinära militära gåvor.",
      en: "Prophet Muhammad ﷺ gave Khalid ibn al-Walid (ra) the honorary title 'Sayf Allah' — Sword of God — in recognition of his extraordinary military gifts.",
      tr: "Hz. Muhammed ﷺ, Halid ibn Velid'e (ra) olağanüstü askeri yeteneklerini kabul ederek 'Seyfullah' — Allah'ın Kılıcı — onur unvanını verdi.",
    },
  },
  {
    id: "iq4",
    topic: "culture",
    difficulty: "medium",
    question: {
      sv: "Vad hette den berömda institutionen för vetenskap som grundades i Bagdad?",
      en: "What was the name of the famous institution of science founded in Baghdad?",
      tr: "Bağdat'ta kurulan ünlü bilim kurumunun adı neydi?",
    },
    options: {
      sv: ["Kunskapens palats", "Visdomens hus", "Lärdomens tempel", "Vetenskapens akademi"],
      en: ["Palace of Knowledge", "House of Wisdom", "Temple of Learning", "Academy of Science"],
      tr: ["Bilgi Sarayı", "Bilgelik Evi", "Öğrenim Tapınağı", "Bilim Akademisi"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Visdomens hus (Bayt al-Hikma) grundades i Bagdad under kalif al-Mamun och blev världens ledande centrum för vetenskap, filosofi och översättning.",
      en: "The House of Wisdom (Bayt al-Hikma) was founded in Baghdad under Caliph al-Mamun and became the world's leading center for science, philosophy and translation.",
      tr: "Bilgelik Evi (Beytü'l-Hikme) Halife el-Memun döneminde Bağdat'ta kuruldu ve dünyanın önde gelen bilim, felsefe ve tercüme merkezi oldu.",
    },
  },
  {
    id: "iq5",
    topic: "expansion",
    difficulty: "medium",
    question: {
      sv: "Vilken muslimsk befälhavare erövrade Spanien (Andalusien) år 711?",
      en: "Which Muslim commander conquered Spain (Andalusia) in 711?",
      tr: "Hangi Müslüman komutan 711'de İspanya'yı (Endülüs) fethetti?",
    },
    options: {
      sv: ["Amr ibn al-As", "Khalid ibn al-Walid", "Tariq ibn Ziyad", "Musa ibn Nusayr"],
      en: ["Amr ibn al-As", "Khalid ibn al-Walid", "Tariq ibn Ziyad", "Musa ibn Nusayr"],
      tr: ["Amr ibn As", "Halid ibn Velid", "Tarık ibn Ziyad", "Musa ibn Nusayr"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Tariq ibn Ziyad korsade sundet vid Gibraltar (som uppkallades efter honom — Jabal al-Tariq) med 7 000 man och besegrade det Visigotiska riket år 711.",
      en: "Tariq ibn Ziyad crossed the strait at Gibraltar (named after him — Jabal al-Tariq) with 7,000 men and defeated the Visigothic Kingdom in 711.",
      tr: "Tarık ibn Ziyad, 711'de 7.000 askerle Cebelitarık'ı (onun adına göre Cebel-i Tarık) geçerek Vizigot Krallığını yendi.",
    },
  },
  {
    id: "iq6",
    topic: "culture",
    difficulty: "easy",
    question: {
      sv: "Vilken muslimsk matematiker anses vara algebrans fader?",
      en: "Which Muslim mathematician is considered the father of algebra?",
      tr: "Hangi Müslüman matematikçi cebirin babası olarak kabul edilir?",
    },
    options: {
      sv: ["Ibn Sina", "Al-Biruni", "Al-Khwarizmi", "Al-Kindi"],
      en: ["Ibn Sina", "Al-Biruni", "Al-Khwarizmi", "Al-Kindi"],
      tr: ["İbn Sina", "el-Biruni", "el-Harezmî", "el-Kindi"],
    },
    correctIndex: 2,
    explanation: {
      sv: "Al-Khwarizmi (ca 780–850) var en persisk matematiker verksam i Bagdad vars verk 'Al-Kitab al-mukhtasar fi hisab al-jabr' gav algebra dess namn.",
      en: "Al-Khwarizmi (c. 780–850) was a Persian mathematician working in Baghdad whose work 'Al-Kitab al-mukhtasar fi hisab al-jabr' gave algebra its name.",
      tr: "El-Harezmî (yaklaşık 780–850), Bağdat'ta çalışan Farsli bir matematikçiydi ve 'el-Kitabü'l-muhtasar fi hisabi'l-cebr' adlı eseri cebire adını verdi.",
    },
  },
  {
    id: "iq7",
    topic: "religion",
    difficulty: "easy",
    question: {
      sv: "Vilket år markerar start på den islamiska kalendern och varför?",
      en: "What year marks the start of the Islamic calendar and why?",
      tr: "İslam takvimi hangi yılda başlar ve neden?",
    },
    options: {
      sv: ["610 e.Kr. — Profetens uppenbarelse", "622 e.Kr. — Hijra till Medina", "630 e.Kr. — Erövringen av Mecka", "632 e.Kr. — Profetens bortgång"],
      en: ["610 AD — The Prophet's revelation", "622 AD — The Hijra to Medina", "630 AD — Conquest of Mecca", "632 AD — The Prophet's passing"],
      tr: ["MS 610 — Peygamberin vahyi", "MS 622 — Medine'ye Hicret", "MS 630 — Mekke'nin Fethi", "MS 632 — Peygamberin vefatı"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Hijra år 622 e.Kr. — Profetens ﷺ vandring från Mecka till Medina — markerar år 1 i den islamiska (hijri) kalendern, eftersom det var när den muslimska gemenskapen etablerades som ett statssamhälle.",
      en: "The Hijra in 622 AD — the Prophet's ﷺ migration from Mecca to Medina — marks year 1 of the Islamic (Hijri) calendar, as it was when the Muslim community established itself as a polity.",
      tr: "MS 622'deki Hicret — Hz. Peygamber'in ﷺ Mekke'den Medine'ye göçü — İslami (Hicri) takvimin 1. yılını işaretler.",
    },
  },
  {
    id: "iq8",
    topic: "military",
    difficulty: "advanced",
    question: {
      sv: "Vilket slag år 636 avgjorde Syriens öde och drev Bysantinerna ut ur regionen?",
      en: "Which battle in 636 decided Syria's fate and drove the Byzantines from the region?",
      tr: "636 yılında Suriye'nin kaderini belirleyen ve Bizanslıları bölgeden çıkaran savaş hangisidir?",
    },
    options: {
      sv: ["Slaget vid Badr", "Slaget vid Yarmouk", "Slaget vid Qadisiyya", "Slaget vid Uhud"],
      en: ["Battle of Badr", "Battle of Yarmouk", "Battle of al-Qadisiyyah", "Battle of Uhud"],
      tr: ["Bedir Savaşı", "Yermük Savaşı", "Kadisiye Savaşı", "Uhud Savaşı"],
    },
    correctIndex: 1,
    explanation: {
      sv: "Slaget vid Yarmouk (636 e.Kr.) var en avgörande muslimsk seger mot Bysantinska riket. Khalid ibn al-Walid (ra) ledde styrkorna med briljant taktik och Syrien öppnades för islam.",
      en: "The Battle of Yarmouk (636 AD) was a decisive Muslim victory against the Byzantine Empire. Khalid ibn al-Walid (ra) led the forces with brilliant tactics and Syria was opened to Islam.",
      tr: "Yermük Savaşı (MS 636), Bizans İmparatorluğuna karşı belirleyici bir Müslüman zaferiydi. Halid ibn Velid (ra) parlak taktiklerle kuvvetleri yönetti.",
    },
  },
];

// =============================================================================
// BADGES
// =============================================================================

const islamicBadges: Badge[] = [
  {
    id: "seeker",
    name: { sv: "Kunskapssökaren", en: "Seeker of Knowledge", tr: "Bilgi Arayan" },
    icon: "📖",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor — Profeten ﷺ sade: 'Sök kunskap från vaggan till graven.'",
      en: "Answer 3 questions correctly — The Prophet ﷺ said: 'Seek knowledge from the cradle to the grave.'",
      tr: "3 soruyu doğru yanıtlayın — Peygamber ﷺ buyurdu: 'Beşikten mezara kadar ilim öğrenin.'",
    },
  },
  {
    id: "companion",
    name: { sv: "Sahaba-andan", en: "Spirit of the Companions", tr: "Sahabe Ruhu" },
    icon: "⭐",
    requiredScore: 5,
    description: {
      sv: "Svara rätt på 5 frågor — Hedra minnet av Profetens ﷺ ärade följeslagare.",
      en: "Answer 5 questions correctly — Honor the memory of the Prophet's ﷺ noble companions.",
      tr: "5 soruyu doğru yanıtlayın — Hz. Peygamber'in ﷺ değerli sahabelerinin anısını onurlandırın.",
    },
  },
  {
    id: "scholar",
    name: { sv: "Visdomens väktare", en: "Guardian of Wisdom", tr: "Hikmetin Bekçisi" },
    icon: "🌟",
    requiredScore: 8,
    description: {
      sv: "Svara rätt på 8 frågor — Som lärde i Visdomens hus i Bagdad.",
      en: "Answer 8 questions correctly — Like the scholars of the House of Wisdom in Baghdad.",
      tr: "8 soruyu doğru yanıtlayın — Bağdat'taki Bilgelik Evi'nin alimleri gibi.",
    },
  },
];

// =============================================================================
// PROFILES
// =============================================================================

const islamicProfiles: HistoricalProfile[] = [
  {
    id: "harun-al-rashid",
    name: "Harun al-Rashid",
    years: "763–809 e.Kr.",
    title: {
      sv: "Guldålderns kalif",
      en: "Caliph of the Golden Age",
      tr: "Altın Çağın Halifesi",
    },
    portrait: "🌙",
    bio: {
      sv: "Harun al-Rashid var den femte Abbasidiska kalifen och styrde imperiet vid dess absoluta höjdpunkt. Hans hov i Bagdad var världens mest lysande — filosofer, poeter, musikanter och vetenskapsmän samlades från hela den kända världen. Han korresponderade med Karl den store och sände exotiska gåvor inklusive en elefant till det Frankiska hovet.",
      en: "Harun al-Rashid was the fifth Abbasid Caliph and ruled the empire at its absolute peak. His court in Baghdad was the world's most brilliant — philosophers, poets, musicians and scientists gathered from across the known world. He corresponded with Charlemagne and sent exotic gifts including an elephant to the Frankish court.",
      tr: "Harun Reşid, beşinci Abbasi Halifesiydi ve imparatorluğu mutlak zirvesinde yönetti. Bağdat'taki sarayı dünyanın en parlak sarayıydı — bilinen dünyanın dört bir yanından filozoflar, şairler, müzisyenler ve bilim insanları toplandı.",
    },
    reforms: {
      sv: ["Patronage av vetenskap och konst", "Utvidgning av handelsvägar", "Diplomatiska relationer med Europa och Kina", "Stöd till Visdomens hus"],
      en: ["Patronage of science and arts", "Expansion of trade routes", "Diplomatic relations with Europe and China", "Support of the House of Wisdom"],
      tr: ["Bilim ve sanata destek", "Ticaret yollarının genişletilmesi", "Avrupa ve Çin ile diplomatik ilişkiler", "Bilgelik Evi'ne destek"],
    },
    campaigns: {
      sv: ["Kampanjer mot Bysantinerna", "Befästning av nordgränserna", "Upprätthållande av rikets enhet"],
      en: ["Campaigns against the Byzantines", "Fortification of northern borders", "Maintaining the empire's unity"],
      tr: ["Bizanslılara karşı seferler", "Kuzey sınırlarının tahkimi", "İmparatorluğun birliğinin korunması"],
    },
    leadershipStyle: {
      sv: "Harun al-Rashid kombinerade kunglig prakt med personlig fromhet. Han ska ha utfört pilgrimage till fots flera gånger. Hans styre präglades av generositet mot lärde och konstnärer och en genuin kärlek till kunskap.",
      en: "Harun al-Rashid combined royal splendor with personal piety. He is said to have performed the pilgrimage on foot several times. His rule was characterized by generosity toward scholars and artists and a genuine love of knowledge.",
      tr: "Harun Reşid, kraliyet ihtişamını kişisel takvayla birleştirdi. Birkaç kez yürüyerek hac yaptığı söylenir. Yönetimi, alimlere ve sanatçılara cömertlik ve gerçek bir bilgi sevgisi ile karakterize edildi.",
    },
    criticalPerspectives: {
      sv: "Hans styre såg också interna maktkamper, inklusive fallet för den mäktiga Barmakid-familjen som han avsatte år 803. Imperiet visade tecken på sprickor mot slutet av hans styre.",
      en: "His reign also saw internal power struggles, including the fall of the powerful Barmakid family whom he dismissed in 803. The empire showed signs of fracture toward the end of his rule.",
      tr: "Saltanatı aynı zamanda 803'te görevden aldığı güçlü Bermekî ailesinin çöküşü de dahil olmak üzere iç güç mücadelelerine sahne oldu.",
    },
  },
  {
    id: "al-mamun",
    name: "Al-Mamun",
    years: "786–833 e.Kr.",
    title: {
      sv: "Vetenskapens kalif",
      en: "The Caliph of Science",
      tr: "Bilimin Halifesi",
    },
    portrait: "🔭",
    bio: {
      sv: "Al-Mamun var en av historiens mest intellektuellt extraordinära härskare. Han grundade och utvidgade Visdomens hus i Bagdad, finansierade översättning av grekiska, persiska och indiska verk till arabiska, och samlade de yppersta lärde i sin tid. Under hans styre lades grunderna för modern matematik, astronomi och medicin.",
      en: "Al-Mamun was one of history's most intellectually extraordinary rulers. He founded and expanded the House of Wisdom in Baghdad, financed translation of Greek, Persian and Indian works into Arabic, and gathered the finest scholars of his time. Under his rule the foundations of modern mathematics, astronomy and medicine were laid.",
      tr: "El-Memun, tarihin en entelektüel açıdan olağanüstü yöneticilerinden biriydi. Bağdat'taki Bilgelik Evi'ni kurdu ve genişletti, Rum, Fars ve Hint eserlerinin Arapçaya çevrilmesini finanse etti ve zamanının en seçkin alimlerini bir araya getirdi.",
    },
    reforms: {
      sv: ["Grundandet av Visdomens hus", "Finansiering av massiva översättningsprojekt", "Statlig finansiering av vetenskaplig forskning", "Astronomiska observationer och kartografi"],
      en: ["Founding of the House of Wisdom", "Financing of massive translation projects", "State funding of scientific research", "Astronomical observations and cartography"],
      tr: ["Bilgelik Evi'nin kurulması", "Büyük çeviri projelerinin finansmanı", "Bilimsel araştırmaların devlet tarafından desteklenmesi", "Astronomik gözlemler ve kartografya"],
    },
    campaigns: {
      sv: ["Segern i inbördeskriget mot brodern al-Amin", "Kampanjer mot Bysantinerna"],
      en: ["Victory in the civil war against his brother al-Amin", "Campaigns against the Byzantines"],
      tr: ["Kardeşi el-Emin'e karşı iç savaşta zafer", "Bizanslılara karşı seferler"],
    },
    leadershipStyle: {
      sv: "Al-Mamun var djupt intellektuell och engagerade sig personligen i teologiska och filosofiska debatter. Han finansierade forskning med statliga medel på ett sätt som inte hade någon motsvarighet i dåtidens värld.",
      en: "Al-Mamun was deeply intellectual and personally engaged in theological and philosophical debates. He funded research with state resources in a way that had no parallel in the world of his time.",
      tr: "El-Memun derin bir entelektüeldi ve ilahiyat ve felsefe tartışmalarına bizzat katılırdı. Zamanının dünyasında eşi görülmemiş biçimde devlet kaynaklarıyla araştırmaları finanse etti.",
    },
    criticalPerspectives: {
      sv: "Al-Mamun påtvingade den teologiska doktrinen om Koranens skapadhet (Mutazilism) och förföljde lärde som Ibn Hanbal som vägrade acceptera detta. Denna period, känd som Mihna, är en mörk del av hans arv.",
      en: "Al-Mamun imposed the theological doctrine of the created Quran (Mutazilism) and persecuted scholars like Ibn Hanbal who refused to accept this. This period, known as the Mihna, is a dark part of his legacy.",
      tr: "El-Memun, Kur'an'ın yaratılmışlığı (Mutezile) teolojik doktrinini zorla kabul ettirdi ve bunu kabul etmeyi reddeden İbn Hanbel gibi alimleri zulme uğrattı.",
    },
  },
];

// =============================================================================
// TERRITORIES
// =============================================================================

const islamicTerritories: TerritoryPeriod[] = [
  {
    yearStart: 622,
    yearEnd: 632,
    label: { sv: "Medina — Den första islamiska staten", en: "Medina — First Islamic State", tr: "Medine — İlk İslam Devleti" },
    color: "#1a5c38",
    polygon: [[
      [25.0, 38.5], [24.8, 39.2], [24.5, 39.8], [24.2, 39.5],
      [24.0, 39.0], [24.2, 38.3], [24.5, 38.0], [24.8, 38.2], [25.0, 38.5],
    ]],
  },
  {
    yearStart: 632,
    yearEnd: 661,
    label: { sv: "Rashidunska kalifatet", en: "Rashidun Caliphate", tr: "Raşidun Halifeliği" },
    color: "#1a7a4a",
    polygon: [[
      [37.0, 36.5], [36.5, 37.5], [36.0, 39.0], [35.0, 41.0],
      [33.0, 44.0], [30.0, 47.5], [28.0, 48.5], [24.0, 51.0],
      [22.0, 51.5], [20.0, 50.0], [18.0, 46.0], [15.0, 42.0],
      [13.0, 43.5], [11.5, 43.5], [11.0, 42.5], [12.0, 41.0],
      [15.0, 38.0], [17.0, 36.0], [18.0, 34.0], [20.0, 33.0],
      [22.0, 32.0], [24.0, 32.5], [26.0, 32.0], [28.0, 33.0],
      [29.5, 32.5], [30.0, 32.5], [31.5, 34.0], [33.0, 35.0],
      [34.5, 36.0], [35.5, 36.2], [36.2, 36.2], [36.8, 36.2], [37.0, 36.5],
    ]],
  },
  {
    yearStart: 661,
    yearEnd: 750,
    label: { sv: "Umayyadkalifatet — Historiens största expansion", en: "Umayyad Caliphate — History's Greatest Expansion", tr: "Emevi Halifeliği — Tarihin En Büyük Genişlemesi" },
    color: "#2d8c5a",
    polygon: [[
      [43.5, -9.0], [38.0, -9.0], [36.0, -6.0], [36.0, -3.0],
      [36.5, -2.0], [37.0, 0.0],  [37.0, 3.0],  [36.8, 6.0],
      [36.5, 9.0],  [36.8, 10.5], [32.0, 14.5], [30.0, 18.0],
      [25.0, 22.0], [22.0, 25.0], [22.0, 32.0], [24.0, 32.5],
      [28.0, 33.0], [30.0, 32.5], [31.5, 34.0], [33.5, 35.5],
      [35.0, 36.2], [37.0, 36.5], [36.5, 38.0], [35.0, 41.0],
      [33.0, 44.0], [30.0, 47.5], [25.0, 50.0], [22.0, 51.5],
      [22.0, 57.0], [23.0, 59.0], [24.0, 60.0], [25.0, 61.5],
      [28.0, 63.0], [32.0, 65.0], [35.0, 66.0], [37.5, 67.0],
      [38.0, 70.0], [40.5, 72.0], [41.0, 70.0], [40.5, 68.0],
      [39.0, 65.0], [38.0, 62.0], [37.5, 60.0], [38.0, 57.0],
      [37.5, 55.0], [35.0, 50.5], [33.0, 48.5], [34.0, 46.0],
      [35.0, 43.5], [36.0, 41.0], [37.0, 38.0], [37.5, 36.5],
      [38.5, 36.0], [39.5, 38.0], [40.5, 40.0], [41.0, 42.0],
      [41.5, 44.0], [41.0, 46.0], [40.0, 48.0], [40.5, 50.0],
      [41.5, 52.0], [38.0, 55.0], [37.0, 57.5], [36.5, 60.0],
      [35.5, 62.5], [34.5, 65.0], [32.0, 66.5], [30.0, 65.0],
      [28.0, 63.5], [25.0, 62.0], [22.5, 60.0], [20.0, 57.0],
      [20.0, 54.0], [18.5, 51.0], [16.0, 46.5], [13.0, 43.5],
      [11.0, 42.5], [11.5, 40.0], [14.0, 37.0], [17.0, 34.0],
      [20.0, 32.0], [22.0, 32.0], [22.0, 28.0], [25.0, 25.0],
      [28.0, 25.0], [30.0, 25.0], [31.5, 25.0], [31.0, 30.0],
      [31.5, 32.0], [30.0, 33.5], [28.5, 34.5],
      [36.0, 35.0], [36.8, 36.2], [37.0, 35.0],
      [35.0, 30.0], [33.5, 27.0], [33.5, 25.0], [35.0, 22.0],
      [37.0, 18.0], [40.0, 14.0], [43.0, 12.0], [43.5, 10.0],
      [42.0, 8.0],  [40.0, 7.0],  [38.5, 5.5],  [37.0, 5.0],
      [35.0, 4.0],  [33.0, 3.0],  [31.0, 2.0],  [30.0, 2.5],
      [32.0, 5.0],  [33.0, 8.0],  [31.0, 10.5], [30.0, 12.0],
      [28.0, 13.0], [25.0, 14.0], [22.0, 14.0], [18.0, 14.0],
      [15.0, 13.0], [13.0, 14.5], [10.0, 14.0], [8.0, 13.5],
      [5.0, 13.5],  [3.0, 12.5],  [1.0, 12.0],  [0.0, 13.0],
      [-2.0, 13.5], [-4.0, 14.0], [-5.0, 15.0], [-6.0, 16.5],
      [-7.0, 18.0], [-8.5, 20.0], [-10.0, 22.0],[-12.0, 24.0],
      [-14.0, 25.0],[-15.0, 27.0],[-16.0, 29.0],[-16.0, 32.0],
      [-15.0, 34.0],[-13.0, 35.0],[-10.0, 35.5],[-8.0, 35.8],
      [-6.0, 36.0], [-5.0, 36.0], [-2.0, 36.5], [0.0, 37.5],
      [2.0, 38.0],  [3.0, 38.5],  [4.0, 38.8],
      [4.5, 40.5],  [5.0, 42.0],  [5.5, 43.0],
      [7.5, 44.0],  [9.0, 44.5],  [11.0, 44.0],
      [13.5, 43.5], [14.0, 43.0],
      [14.0, 41.5], [15.0, 39.5], [16.0, 38.0], [17.0, 36.5],
      [18.0, 35.5], [18.5, 34.0], [18.0, 32.0], [16.0, 30.0],
      [13.0, 27.5], [10.0, 25.0], [8.0, 22.5],  [7.0, 20.0],
      [8.0, 17.5],  [10.0, 15.5], [13.0, 14.5],
      [40.5, 10.5], [42.5, 11.0], [43.5, -9.0],
    ]],
  },
  {
    yearStart: 750,
    yearEnd: 1258,
    label: { sv: "Abbasidkalifatet — Guldåldern", en: "Abbasid Caliphate — The Golden Age", tr: "Abbasi Halifeliği — Altın Çağ" },
    color: "#1d6b45",
    polygon: [[
      [37.0, 36.5], [36.5, 38.0], [35.5, 40.5], [34.0, 42.5],
      [33.0, 44.5], [31.5, 46.0], [30.5, 47.8], [28.0, 49.0],
      [24.0, 51.5], [22.0, 51.5], [20.0, 50.0], [18.0, 46.0],
      [15.0, 42.0], [13.0, 43.5], [11.0, 42.5], [12.0, 40.0],
      [15.0, 37.0], [17.0, 34.0], [20.0, 32.0], [22.0, 32.0],
      [22.0, 25.0], [25.0, 22.0], [28.0, 22.0], [30.0, 25.0],
      [31.5, 25.0], [31.0, 30.0], [30.0, 32.5], [31.5, 34.0],
      [33.0, 35.0], [35.0, 36.2], [36.8, 36.2], [37.0, 36.5],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const islamicTradeRoutes: TradeRouteGeo[] = [
  {
    id: "silk-road-islamic",
    name: { sv: "Sidenvägen — Bagdad till Kina", en: "Silk Road — Baghdad to China", tr: "İpek Yolu — Bağdat'tan Çin'e" },
    yearActive: 750,
    path: [
      [33.3, 44.4], [35.0, 48.0], [37.5, 55.0],
      [38.5, 59.0], [40.0, 64.0], [40.5, 70.0],
    ],
  },
  {
    id: "indian-ocean-route",
    name: { sv: "Indiska oceanen — Handel med Indien", en: "Indian Ocean — Trade with India", tr: "Hint Okyanusu — Hindistan Ticareti" },
    yearActive: 700,
    path: [
      [24.0, 51.5], [20.0, 57.0], [15.0, 60.0],
      [12.0, 62.0], [10.0, 65.0], [8.0, 72.0],
    ],
  },
  {
    id: "mediterranean-islamic",
    name: { sv: "Medelhavshandeln", en: "Mediterranean Trade", tr: "Akdeniz Ticareti" },
    yearActive: 700,
    path: [
      [33.3, 44.4], [35.0, 36.0], [37.0, 28.0],
      [38.0, 20.0], [37.0, 10.0], [36.5, 3.0],
      [36.0, -4.0], [36.5, -6.0],
    ],
  },
  {
    id: "trans-sahara",
    name: { sv: "Trans-Sahara handelsvägen", en: "Trans-Sahara Trade Route", tr: "Trans-Sahra Ticaret Yolu" },
    yearActive: 750,
    path: [
      [30.0, 18.0], [25.0, 17.0], [20.0, 16.0],
      [15.0, 15.0], [10.0, 14.0], [5.0, 13.5],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const islamicEmpire: EmpireConfig = {
  id: "islamic_caliphate",
  name: {
    sv: "Islamiska Kalifatet",
    en: "Islamic Caliphate",
    tr: "İslam Halifeliği",
  },
  theme: "ottoman",
  appTitle: "Islamic Caliphate Intelligence",
  crestImage: islamicCrest,           // ✅ ändrad
  backgroundImage: islamicBackground, // ✅ ändrad
  leaderTitle: { sv: "Kalif", en: "Caliph", tr: "Halife" },
  dynastyTitle: {
    sv: "Islamisk Dynasti",
    en: "Islamic Dynasty",
    tr: "İslam Hanedanı",
  },
  timeline: islamicTimeline,
  leaders: islamicLeaders,
  profiles: islamicProfiles,
  figures: [],
  quizQuestions: islamicQuizQuestions,
  badges: islamicBadges,
  territories: islamicTerritories,
  tradeRoutes: islamicTradeRoutes,
  mapCenter: [30, 40],
  mapZoom: 3,
  yearRange: [610, 1258],
  yearDefault: 800,
  chatSystemContext:
    "the Islamic Caliphate (610–1258 AD). You are an expert on Islamic history covering the life of Prophet Muhammad ﷺ and his noble companions, the Rightly Guided Caliphs (Abu Bakr, Umar, Uthman and Ali — may God be pleased with them all), the Umayyad and Abbasid caliphates, the Islamic Golden Age, the House of Wisdom in Baghdad, and the great scholars like Al-Khwarizmi, Ibn Sina and Al-Farabi. Always treat the Prophet ﷺ and his companions with the highest respect and honor.",
  chatPlaceholders: {
    sv: "Ställ en fråga om det islamiska kalifatet...",
    en: "Ask a question about the Islamic Caliphate...",
    tr: "İslam Halifeliği hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Berätta om Profeten Muhammads ﷺ liv och mission",
      "Vilka var de fyra rättledda kaliferna och deras arv?",
      "Hur lyste Bagdad som världens kunskapscentrum?",
    ],
    en: [
      "Tell me about Prophet Muhammad's ﷺ life and mission",
      "Who were the four Rightly Guided Caliphs and their legacy?",
      "How did Baghdad shine as the world's center of knowledge?",
    ],
    tr: [
      "Hz. Muhammed'in ﷺ hayatı ve misyonu hakkında bilgi verin",
      "Dört Raşid Halife kimlerdi ve mirası neydi?",
      "Bağdat nasıl dünyanın bilgi merkezi olarak parladı?",
    ],
  },
  homeDescription: {
    sv: "Utforska det islamiska kalifatets historia (610–1258 e.Kr.) — från Profeten Muhammads ﷺ uppenbarelse till Bagdads guldålder.",
    en: "Explore Islamic Caliphate history (610–1258 AD) — from Prophet Muhammad's ﷺ revelation to Baghdad's Golden Age.",
    tr: "İslam Halifeliği tarihini (MS 610–1258) keşfedin.",
  },
  mapTitle: {
    sv: "Islamiska kalifatets territorium",
    en: "Islamic Caliphate Territory",
    tr: "İslam Halifeliği Toprakları",
  },
};
