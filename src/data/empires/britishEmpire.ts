import britishBackground from "@/assets/brittish.jpg";
import britishLogo from "@/assets/brlogo.jpg";
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
// TIMELINE — British Empire (1497–1997)
// =============================================================================

const britishTimeline: TimelineEvent[] = [
  {
    year: 1497,
    title: {
      sv: "John Cabots resa — Nordamerika nås",
      en: "John Cabot's Voyage — North America Reached",
      tr: "John Cabot'un Seyahati — Kuzey Amerika'ya Ulaşıldı",
    },
    summary: {
      sv: "Under kung Henrik VII:s flagg seglade John Cabot från Bristol och landade i Nordamerika — det första officiella engelska anspråket på den nya världen. Resan öppnade dörren till ett imperium som skulle täcka en fjärdedel av jordklotet.",
      en: "Under King Henry VII's flag, John Cabot sailed from Bristol and landed in North America — the first official English claim in the New World. The voyage opened the door to an empire that would cover a quarter of the globe.",
      tr: "Kral VII. Henry'nin bayrağı altında John Cabot, Bristol'dan yelken açarak Kuzey Amerika'ya indi — Yeni Dünya'daki ilk resmi İngiliz iddiası. Seyahat, dünyanın dörtte birini kaplayacak bir imparatorluğun kapısını araladı.",
    },
    figures: ["John Cabot", "King Henry VII"],
    consequences: {
      sv: "England gör anspråk på Nordamerika och lägger grunden för framtida kolonisering.",
      en: "England claims North America, laying the foundation for future colonisation.",
      tr: "İngiltere, Kuzey Amerika üzerinde hak iddia ederek gelecekteki sömürgeleşmenin temelini attı.",
    },
    impact: {
      sv: "Startskottet för ett imperium som förändrade världen.",
      en: "The starting gun for an empire that would change the world.",
      tr: "Dünyayı değiştirecek bir imparatorluğun fitilini yaktı.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1534,
    title: {
      sv: "Henrik VIII bryter med Rom — Engelska kyrkan grundas",
      en: "Henry VIII Breaks with Rome — Church of England Founded",
      tr: "VIII. Henry Roma'dan Kopuyor — İngiltere Kilisesi Kuruluyor",
    },
    summary: {
      sv: "Kung Henrik VIII:s brottning med påven omskapade inte bara England religiöst — det gjorde den engelska kronan suverän i alla avseenden. Suprematsakten 1534 förklarade kungen som Kyrkans överhuvud och skapade en nationell identitet som skiljde England från det katolska Europa. Det var ett djärvt politiskt drag som formade brittisk kultur i århundraden.",
      en: "King Henry VIII's break with the Pope didn't just reshape England religiously — it made the English Crown sovereign in every sense. The Act of Supremacy 1534 declared the King head of the Church and forged a national identity separating England from Catholic Europe. A bold political stroke shaping British culture for centuries.",
      tr: "Kral VIII. Henry'nin Papa ile kopuşu, İngiltere'yi yalnızca dini açıdan yeniden şekillendirmedi — İngiliz Tahtını her anlamda egemen kıldı. 1534 tarihli Yüksek Egemenlik Yasası, Kilise'nin başı olarak Kral'ı ilan etti.",
    },
    figures: ["King Henry VIII", "Thomas Cromwell", "Thomas Cranmer", "Anne Boleyn"],
    consequences: {
      sv: "England bryter med katolicismen. En ny nationell kyrka grundas.",
      en: "England breaks with Catholicism. A new national church is founded.",
      tr: "İngiltere Katoliklikle bağını koparır. Yeni bir ulusal kilise kurulur.",
    },
    impact: {
      sv: "Englands oberoende stärks — politiskt och spirituellt.",
      en: "England's independence is cemented — politically and spiritually.",
      tr: "İngiltere'nin bağımsızlığı siyasi ve ruhani açıdan pekiştirilir.",
    },
    category: "religion",
    importance: "high",
  },
  {
    year: 1558,
    title: {
      sv: "Drottning Elizabeth I bestiger tronen — Den gyllene eran börjar",
      en: "Queen Elizabeth I Ascends the Throne — The Golden Era Begins",
      tr: "Kraliçe I. Elizabeth Tahta Çıkıyor — Altın Çağ Başlıyor",
    },
    summary: {
      sv: "Elizabeth I — 'Jungfrudrottningen' — bestiger Englands tron och inleder en av landets mest lysande epoker. Under hennes 45-åriga regeringstid blomstrade konst, teater och utforskning. Shakespeare skriver sina mästerverk, Francis Drake seglar runt jordklotet och den engelska flottans rykte skapar skräck hos fiender. Elizabeth styrde med järnhand i silkeshandske — en kvinna som aldrig gifte sig men älskade sitt folk.",
      en: "Elizabeth I — the 'Virgin Queen' — ascends England's throne and begins one of the country's most brilliant eras. During her 45-year reign art, theatre and exploration flourished. Shakespeare writes his masterworks, Francis Drake circumnavigates the globe and the English navy's reputation strikes fear into enemies. Elizabeth ruled with an iron hand in a velvet glove — a woman who never married but loved her people.",
      tr: "I. Elizabeth — 'Bakire Kraliçe' — İngiltere tahtına çıkar ve ülkenin en parlak dönemlerinden birini başlatır. 45 yıllık saltanatı boyunca sanat, tiyatro ve keşif gelişti.",
    },
    figures: ["Queen Elizabeth I", "William Cecil", "Francis Drake", "Walter Raleigh"],
    consequences: {
      sv: "England blir en europeisk stormakt inom konst, handel och sjöfart.",
      en: "England becomes a European great power in arts, trade and naval might.",
      tr: "İngiltere, sanat, ticaret ve deniz gücünde Avrupa'nın büyük güçlerinden biri haline gelir.",
    },
    impact: {
      sv: "Den elizabethanska eran formar den engelska nationella identiteten för alltid.",
      en: "The Elizabethan era shapes the English national identity forever.",
      tr: "Elizabe dönemi, İngiliz ulusal kimliğini sonsuza dek şekillendirir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1577,
    title: {
      sv: "Francis Drake seglar runt jordklotet",
      en: "Francis Drake Circumnavigates the Globe",
      tr: "Francis Drake Dünyayı Dolaşıyor",
    },
    summary: {
      sv: "Sir Francis Drake avseglade 1577 och återvände 1580 som den förste engelsman att segla runt hela jordklotet — en bedrift som bara Magellan/Elcano tidigare lyckats med. Han plundrade spanska hamnar längs vägen och hemförde enormt byte. Elizabeth I adlade honom ombord på The Golden Hind. Drake blev en nationell hjälte och symbol för engelsk djärvhet på haven.",
      en: "Sir Francis Drake set out in 1577 and returned in 1580 as the first Englishman to circumnavigate the entire globe — a feat only Magellan/Elcano had previously achieved. He raided Spanish ports along the way and brought home enormous plunder. Elizabeth I knighted him aboard The Golden Hind. Drake became a national hero and symbol of English boldness on the seas.",
      tr: "Sir Francis Drake, 1577'de yola çıktı ve 1580'de dünyayı dolaşan ilk İngiliz olarak döndü.",
    },
    figures: ["Sir Francis Drake", "Queen Elizabeth I"],
    consequences: {
      sv: "England bekräftar sin ställning som sjömakt. Spanska riket utmanas.",
      en: "England confirms its status as a naval power. The Spanish empire is challenged.",
      tr: "İngiltere, deniz gücü olarak konumunu pekiştirir. İspanya İmparatorluğu meydan okumayla karşılaşır.",
    },
    impact: {
      sv: "Brittisk havsherravälde börjar ta form.",
      en: "British naval supremacy begins to take shape.",
      tr: "İngiliz deniz üstünlüğü şekillenmeye başlar.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1588,
    title: {
      sv: "Den spanska armadans undergång — England härskar på haven",
      en: "Defeat of the Spanish Armada — England Rules the Seas",
      tr: "İspanya Armadası'nın Yenilgisi — İngiltere Denizlere Hükmediyor",
    },
    summary: {
      sv: "Filip II av Spanien sände 130 fartyg och 27 000 man för att erövra England och avsätta den kätterska Elizabeth. Den brittiska flottan under lord Howard och Francis Drake, kombinerat med en katastrofal storm, krossade armadan fullständigt. Elizabeth höll sitt berömda tal vid Tilbury: 'Jag har hjärtat och magen av en kung.' Det var den stund England trädde in på världsscenen som obestridlig sjömakt.",
      en: "Philip II of Spain sent 130 ships and 27,000 men to conquer England and depose the heretical Elizabeth. The British fleet under Lord Howard and Francis Drake, combined with a catastrophic storm, utterly crushed the Armada. Elizabeth delivered her famous Tilbury speech: 'I have the heart and stomach of a king.' The moment England stepped onto the world stage as an undisputed naval power.",
      tr: "İspanya Kralı II. Felipe, sapkın Elizabeth'i tahttan indirmek için 130 gemi ve 27.000 asker gönderdi. Lord Howard ve Francis Drake komutasındaki İngiliz donanması, yıkıcı bir fırtınayla birleşerek Armada'yı tamamen ezdi.",
    },
    figures: ["Queen Elizabeth I", "Lord Howard", "Sir Francis Drake", "King Philip II of Spain"],
    consequences: {
      sv: "Spanskt sjöherravälde krossas. England blir Europas ledande sjömakt.",
      en: "Spanish naval dominance is shattered. England becomes Europe's leading naval power.",
      tr: "İspanya'nın deniz egemenliği çöküyor. İngiltere, Avrupa'nın önde gelen deniz gücü haline geliyor.",
    },
    impact: {
      sv: "England lägger grunden för ett globalt imperium.",
      en: "England lays the foundation for a global empire.",
      tr: "İngiltere, küresel bir imparatorluğun temelini atıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1600,
    title: {
      sv: "Ostindiska kompaniet grundas — Handelsväldet börjar",
      en: "East India Company Founded — The Trading Empire Begins",
      tr: "Doğu Hindistan Şirketi Kuruluyor — Ticaret İmparatorluğu Başlıyor",
    },
    summary: {
      sv: "Den 31 december 1600 beviljade Elizabeth I en kunglig stadga till 'Guvernörer och köpmän i London som handlar med Ostindien.' Ostindiska kompaniet — EIC — skulle bli världshistoriens mäktigaste handelskorporation. Det byggde en privat armé, styrde hela subkontinenter och genererade rikedomar som formade det moderna världssystemet. Från kryddor till opium — EIC var imperiet i bolagsform.",
      en: "On 31 December 1600 Elizabeth I granted a royal charter to the 'Governor and Company of Merchants of London trading into the East Indies.' The East India Company — EIC — would become the most powerful trading corporation in world history. It built a private army, governed entire subcontinents and generated wealth that shaped the modern world system. From spices to opium — the EIC was empire in corporate form.",
      tr: "31 Aralık 1600'de I. Elizabeth, 'Doğu Hindistan'a Ticaret Yapan Londra Tüccarları Şirketi'ne kraliyet tüzüğü verdi. Doğu Hindistan Şirketi, dünya tarihinin en güçlü ticaret şirketi oldu.",
    },
    figures: ["Queen Elizabeth I", "Thomas Smythe", "Robert Clive (later)"],
    consequences: {
      sv: "England etablerar ett handelsnätverk som täcker hela Asien.",
      en: "England establishes a trading network covering all of Asia.",
      tr: "İngiltere, tüm Asya'yı kapsayan bir ticaret ağı oluşturuyor.",
    },
    impact: {
      sv: "Grunden för brittiskt herravälde i Indien och Asien läggs.",
      en: "The foundation for British dominance in India and Asia is laid.",
      tr: "Hindistan ve Asya'daki İngiliz egemenliğinin temeli atılıyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1607,
    title: {
      sv: "Jamestown grundas — Brittisk kolonisering av Amerika börjar",
      en: "Jamestown Founded — British Colonisation of America Begins",
      tr: "Jamestown Kuruluyor — Amerika'nın İngiliz Sömürgeleştirilmesi Başlıyor",
    },
    summary: {
      sv: "Den 14 maj 1607 grundade 104 engelska kolonisatörer Jamestown i Virginia — den första permanenta engelska bosättningen i Amerika. Det var en brutal start: svält, sjukdomar och konflikter med ursprungsbefolkningen decimerade kolonin nästan till noll. Men den överlevde — och med den planterades fröet till ett USA som en dag skulle växa ur det brittiska imperiet.",
      en: "On 14 May 1607, 104 English colonists established Jamestown, Virginia — the first permanent English settlement in America. It was a brutal beginning: starvation, disease and conflict with indigenous peoples nearly wiped the colony out entirely. But it survived — and with it the seed of a United States that would one day grow from the British Empire.",
      tr: "14 Mayıs 1607'de 104 İngiliz kolonici, Virginia'da Jamestown'u kurdu — Amerika'daki ilk kalıcı İngiliz yerleşimi. Açlık, hastalık ve yerli halklarla çatışmalar koloniyi neredeyse yok etti.",
    },
    figures: ["Captain John Smith", "King James I", "Pocahontas"],
    consequences: {
      sv: "Engelska kolonier i Nordamerika etableras permanent.",
      en: "English colonies in North America are permanently established.",
      tr: "Kuzey Amerika'daki İngiliz kolonileri kalıcı olarak kurulur.",
    },
    impact: {
      sv: "Fröet till vad som ska bli USA planteras i brittisk jord.",
      en: "The seed of what will become the USA is planted in British soil.",
      tr: "ABD olacak yapının tohumu İngiliz toprağına ekilir.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1620,
    title: {
      sv: "Mayflower — Pilgrimsfäderna anländer till Plymouth Rock",
      en: "Mayflower — The Pilgrims Arrive at Plymouth Rock",
      tr: "Mayflower — Hacılar Plymouth Kayalığı'na Ulaşıyor",
    },
    summary: {
      sv: "Den 21 november 1620 ankrade Mayflower utanför Plymouth, Massachusetts. Ombord: 102 passagerare som flydde religiöst förtryck i England. De undertecknade Mayflower Compact — ett av historiens första demokratiska samhällskontrakt. Deras kamp och deras idealism om religiös frihet skulle forma det framtida Amerikas själ och skilja kolonisterna från moderlandet.",
      en: "On 21 November 1620 the Mayflower anchored off Plymouth, Massachusetts. Aboard: 102 passengers fleeing religious persecution in England. They signed the Mayflower Compact — one of history's first democratic social contracts. Their struggle and their idealism about religious freedom would shape the future American soul and ultimately separate the colonists from the mother country.",
      tr: "21 Kasım 1620'de Mayflower, Massachusetts Plymouth açıklarında demir attı. Gemide: İngiltere'deki dini zulümden kaçan 102 yolcu vardı. Mayflower Anlaşması'nı imzaladılar.",
    },
    figures: ["William Bradford", "Captain Miles Standish", "King James I"],
    consequences: {
      sv: "Nya England kolonier grundas med stark religiös och demokratisk grund.",
      en: "New England colonies are founded with a strong religious and democratic foundation.",
      tr: "Yeni İngiltere kolonileri güçlü dini ve demokratik bir temel üzerinde kuruluyor.",
    },
    impact: {
      sv: "Frihetsidealerna som delar USA från imperiet börjar gro.",
      en: "The freedom ideals that will separate the USA from the empire begin to germinate.",
      tr: "ABD'yi imparatorluktan ayıracak özgürlük idealleri filizlenmeye başlıyor.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1649,
    title: {
      sv: "Karl I avrättas — Republiken utropas",
      en: "Charles I Executed — The Republic is Proclaimed",
      tr: "I. Charles İdam Ediliyor — Cumhuriyet İlan Ediliyor",
    },
    summary: {
      sv: "Den 30 januari 1649 avrättades kung Karl I av England utanför Banqueting House i London — den förste europeiska monarken att offentligt avrättas av sina egna undersåtar. Oliver Cromwell, parlaments ledare och militärbefälhavare, utropade Samväldet — ett England utan kung. Det var en chockartad brytning med tusen år av kunglig tradition och skickade rysningar genom hela det europeiska kungahuset.",
      en: "On 30 January 1649 King Charles I of England was executed outside the Banqueting House in London — the first European monarch to be publicly executed by his own subjects. Oliver Cromwell, parliamentary leader and military commander, proclaimed the Commonwealth — an England without a king. A shocking break with a thousand years of royal tradition that sent tremors through every European royal house.",
      tr: "30 Ocak 1649'da Kral I. Charles, Londra'daki Banqueting House önünde idam edildi — kendi tebaası tarafından alenen idam edilen ilk Avrupalı monark.",
    },
    figures: ["King Charles I", "Oliver Cromwell", "Thomas Fairfax", "John Pym"],
    consequences: {
      sv: "England blir en republik under Cromwells protektorat.",
      en: "England becomes a republic under Cromwell's Protectorate.",
      tr: "İngiltere, Cromwell'in Himayesi altında cumhuriyet olur.",
    },
    impact: {
      sv: "Parlamentets makt över kronan etableras för alltid.",
      en: "Parliament's power over the Crown is established forever.",
      tr: "Parlamentonun Taç üzerindeki gücü sonsuza dek tesis edilir.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1660,
    title: {
      sv: "Restaurationen — Karl II återtar tronen",
      en: "The Restoration — Charles II Reclaims the Throne",
      tr: "Restorasyon — II. Charles Tahtı Geri Alıyor",
    },
    summary: {
      sv: "Efter Cromwells död och republikens kollaps inbjöds Karl II att återvända från exil. Han red in i London den 29 maj 1660 — hans 30-årsdag — bland jublande folkmassor. Restaurationen återinförde kungadömet men nu med en starkare parlamentarisk kontroll. Det var också en kulturell renässans: teatrar öppnades igen, konst blomstrade och det kungliga hovet lystes upp av stil och raffinemang.",
      en: "After Cromwell's death and the republic's collapse, Charles II was invited to return from exile. He rode into London on 29 May 1660 — his 30th birthday — among jubilant crowds. The Restoration reinstated the monarchy but now with stronger parliamentary control. It was also a cultural renaissance: theatres reopened, art flourished and the royal court blazed with style and sophistication.",
      tr: "Cromwell'in ölümü ve cumhuriyetin çöküşünün ardından II. Charles sürgünden dönmeye davet edildi.",
    },
    figures: ["King Charles II", "George Monck", "Samuel Pepys"],
    consequences: {
      sv: "Monarkin återupprättas med stärkt parlamentarisk kontroll.",
      en: "The monarchy is restored with strengthened parliamentary control.",
      tr: "Monarşi, güçlendirilmiş parlamenter kontrol ile yeniden tesis ediliyor.",
    },
    impact: {
      sv: "Den moderna brittiska konstitutionella balansen börjar ta form.",
      en: "The modern British constitutional balance begins to take shape.",
      tr: "Modern İngiliz anayasal dengesi şekillenmeye başlıyor.",
    },
    category: "politics",
    importance: "medium",
  },
  {
    year: 1688,
    title: {
      sv: "Den ärorika revolutionen — Parlamentarisk demokrati triumferar",
      en: "The Glorious Revolution — Parliamentary Democracy Triumphs",
      tr: "Şanlı Devrim — Parlamenter Demokrasi Zafer Kazanıyor",
    },
    summary: {
      sv: "Utan ett enda slag avsattes kung Jakob II och ersattes av Wilhelm III av Oranien och hans hustru Mary II. Rättighetsdeklarationen 1689 inskränkte kungamakten och etablerade parlamentets suveränitet — en revolution som förändrade brittisk politik för evigt. Det är grunden för den moderna konstitutionella monarkin och inspirerade upplysningstänkare världen över, inklusive de amerikanska grundarna.",
      en: "Without a single battle, King James II was deposed and replaced by William III of Orange and his wife Mary II. The Bill of Rights 1689 curtailed royal power and established parliamentary sovereignty — a revolution that changed British politics forever. It is the foundation of the modern constitutional monarchy and inspired Enlightenment thinkers worldwide, including the American Founding Fathers.",
      tr: "Tek bir savaş bile yaşanmadan Kral II. James tahttan indirildi ve yerine Orangeli III. William ve eşi II. Mary getirildi. 1689 tarihli Haklar Bildirgesi kraliyet yetkisini kısıtladı.",
    },
    figures: ["William III", "Queen Mary II", "King James II", "John Locke"],
    consequences: {
      sv: "Parlamentarisk suveränitet inskrives i lag. Kungamakten begränsas.",
      en: "Parliamentary sovereignty is enshrined in law. Royal power is limited.",
      tr: "Parlamenter egemenlik yasaya giriyor. Kraliyet gücü sınırlandırılıyor.",
    },
    impact: {
      sv: "Det moderna demokratiska Britain föds.",
      en: "Modern democratic Britain is born.",
      tr: "Modern demokratik İngiltere doğuyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1707,
    title: {
      sv: "Unionsakt — Storbritannien bildas",
      en: "Acts of Union — Great Britain is Formed",
      tr: "Birleşme Yasaları — Büyük Britanya Kuruluyor",
    },
    summary: {
      sv: "Den 1 maj 1707 trädde Unionsakterna i kraft och förenade kungadömena England och Skottland till ett enda Konungariket Storbritannien. Det skotska parlamentet upplöstes och Skottland fick 45 platser i det brittiska underhuset. Den nya nationen — med Union Jack som symbol — var redo att dominera världen. En stat, en flotta, ett handelssystem.",
      en: "On 1 May 1707 the Acts of Union came into force, uniting the kingdoms of England and Scotland into a single Kingdom of Great Britain. The Scottish Parliament was dissolved and Scotland received 45 seats in the British House of Commons. The new nation — with the Union Jack as its symbol — was ready to dominate the world. One state, one navy, one trading system.",
      tr: "1 Mayıs 1707'de Birleşme Yasaları yürürlüğe girerek İngiltere ve İskoçya krallıklarını tek bir Büyük Britanya Krallığı'nda birleştirdi.",
    },
    figures: ["Queen Anne", "Duke of Queensberry", "Earl of Seafield"],
    consequences: {
      sv: "England och Skottland smälter samman till ett enda mäktigt kungarike.",
      en: "England and Scotland merge into a single powerful kingdom.",
      tr: "İngiltere ve İskoçya tek bir güçlü krallıkta birleşiyor.",
    },
    impact: {
      sv: "Storbritanniens globala dominans accelereras dramatiskt.",
      en: "Britain's global dominance accelerates dramatically.",
      tr: "Britanya'nın küresel egemenliği çarpıcı biçimde hızlanıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1757,
    title: {
      sv: "Slaget vid Plassey — Indien faller under brittiskt styre",
      en: "Battle of Plassey — India Falls Under British Rule",
      tr: "Plassey Savaşı — Hindistan İngiliz Yönetimine Giriyor",
    },
    summary: {
      sv: "Den 23 juni 1757 besegrade Robert Clive och Ostindiska kompaniet Nawaben av Bengal vid Plassey. Med förräderi, mutor och militär skicklighet lade Clive grunden för brittiskt herravälde i Indien — ett subkontinent med 150 miljoner invånare. Bengals rikedomar plundrades systematiskt. Clive kallades 'Indiens grundare' hemma men beskrevs som hänsynslös plundrare av sina offer.",
      en: "On 23 June 1757 Robert Clive and the East India Company defeated the Nawab of Bengal at Plassey. Through treachery, bribery and military skill, Clive laid the foundation for British dominance in India — a subcontinent of 150 million people. Bengal's wealth was systematically plundered. Clive was called 'the founder of India' at home but described as a ruthless plunderer by his victims.",
      tr: "23 Haziran 1757'de Robert Clive ve Doğu Hindistan Şirketi, Plassey'de Bengal Nabab'ını yendi.",
    },
    figures: ["Robert Clive", "Mir Jafar", "Siraj ud-Daulah"],
    consequences: {
      sv: "Ostindiska kompaniet tar kontroll över Bengal och östra Indien.",
      en: "The East India Company takes control of Bengal and eastern India.",
      tr: "Doğu Hindistan Şirketi Bengal ve doğu Hindistan'ın kontrolünü ele geçiriyor.",
    },
    impact: {
      sv: "Grunden läggs för det brittiska Raj — ett sekel av indiskt styre.",
      en: "The foundation is laid for the British Raj — a century of Indian rule.",
      tr: "İngiliz Racı'nın temeli atılıyor — bir asırlık Hindistan yönetimi.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1759,
    title: {
      sv: "Det mirakulösa året — Brittiska segrar på alla fronter",
      en: "The Year of Miracles — British Victories on All Fronts",
      tr: "Mucizeler Yılı — Tüm Cephelerde İngiliz Zaferleri",
    },
    summary: {
      sv: "1759 är det år då brittiskt imperialism verkligen tog fart. Segrar i Quebec (Kanada), Lagos (Afrika), Minden (Europa) och på Filippinerna. General Wolfe dog hjältedöden på Abrahamslätten utanför Quebec och vann Kanada från Frankrike. Pitt den äldre, som krigsminister, dirigerade en global strategi av storslagen ambition. Brittanien regerade verkligen vågorna detta år.",
      en: "1759 is the year British imperialism truly took flight. Victories at Quebec (Canada), Lagos (Africa), Minden (Europe) and the Philippines. General Wolfe died a hero's death on the Plains of Abraham outside Quebec, winning Canada from France. Pitt the Elder, as war minister, orchestrated a global strategy of breathtaking ambition. Britannia truly ruled the waves this year.",
      tr: "1759, İngiliz emperyalizminin gerçekten yükselişe geçtiği yıldır. Quebec (Kanada), Lagos (Afrika), Minden (Avrupa) ve Filipinler'de zaferler kazanıldı.",
    },
    figures: ["General James Wolfe", "William Pitt the Elder", "Admiral Edward Boscawen"],
    consequences: {
      sv: "Frankrike förlorar Kanada och sitt nordamerikanska imperium till Britannien.",
      en: "France loses Canada and its North American empire to Britain.",
      tr: "Fransa, Kanada'yı ve Kuzey Amerika imparatorluğunu Britanya'ya kaptırıyor.",
    },
    impact: {
      sv: "Britannien cementerar sin ställning som världens ledande kolonialmakt.",
      en: "Britain cements its position as the world's leading colonial power.",
      tr: "Britanya, dünyanın önde gelen sömürge gücü olarak konumunu pekiştiriyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1769,
    title: {
      sv: "James Cook kartlägger Australien och Nya Zeeland",
      en: "James Cook Charts Australia and New Zealand",
      tr: "James Cook Avustralya ve Yeni Zelanda'yı Haritalıyor",
    },
    summary: {
      sv: "Kapten James Cook seglade HMS Endeavour och kartlade Australiens östkust och Nya Zeelands kuster med enastående precision. Hans möte med Aboriginska Australiensare och Maorifolket förändrade västvärldens förståelse av södra halvklotet. Cook gjorde anspråk på Australien åt Britannien — en kontinent som ingen europeisk makt dittills kontrollerat. Hans voyager är bland historiens mest djärva utforskningsresor.",
      en: "Captain James Cook sailed HMS Endeavour and charted Australia's east coast and New Zealand's shores with extraordinary precision. His encounter with Aboriginal Australians and Māori people changed the Western world's understanding of the southern hemisphere. Cook claimed Australia for Britain — a continent no European power had yet controlled. His voyages rank among history's most daring feats of exploration.",
      tr: "Kaptan James Cook, HMS Endeavour ile Avustralya'nın doğu kıyısını ve Yeni Zelanda kıyılarını olağanüstü bir hassasiyetle haritaladı.",
    },
    figures: ["Captain James Cook", "Joseph Banks", "King George III"],
    consequences: {
      sv: "Australien och Nya Zeeland görs till brittiska territorier.",
      en: "Australia and New Zealand are claimed as British territories.",
      tr: "Avustralya ve Yeni Zelanda İngiliz toprakları olarak ilan ediliyor.",
    },
    impact: {
      sv: "Det brittiska imperiet expanderar till det södra stillahavs- och indiska havet.",
      en: "The British Empire expands into the southern Pacific and Indian Oceans.",
      tr: "İngiliz İmparatorluğu güney Pasifik ve Hint Okyanuslarına yayılıyor.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1776,
    title: {
      sv: "Amerikanska självständighetsförklaringen — Imperiet sprickar",
      en: "American Declaration of Independence — The Empire Fractures",
      tr: "Amerikan Bağımsızlık Bildirisi — İmparatorluk Çatlıyor",
    },
    summary: {
      sv: "Den 4 juli 1776 förklarade de tretton brittiska kolonierna i Nordamerika sig oberoende. Thomas Jefferson, Benjamin Franklin och John Adams utformade ett dokument som hänvisade till naturliga rättigheter och folkets suveränitet — idéer direkt hämtade från brittisk filosofi. Det var den störste koloniala revolten mot imperiet, och en stor förlust för George III. Men USA grundades på brittiska idéer om frihet och lag.",
      en: "On 4 July 1776 the thirteen British colonies in North America declared independence. Thomas Jefferson, Benjamin Franklin and John Adams crafted a document citing natural rights and popular sovereignty — ideas drawn directly from British philosophy. It was the greatest colonial revolt against the empire, a massive loss for George III. But the USA was founded on British ideas of liberty and law.",
      tr: "4 Temmuz 1776'da Kuzey Amerika'daki on üç İngiliz kolonisi bağımsızlığını ilan etti.",
    },
    figures: ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "King George III"],
    consequences: {
      sv: "USA grundas. Britannien förlorar sina viktigaste nordamerikanska kolonier.",
      en: "The USA is founded. Britain loses its most important North American colonies.",
      tr: "ABD kurulur. Britanya, en önemli Kuzey Amerika kolonilerini kaybeder.",
    },
    impact: {
      sv: "Det brittiska imperiet omformas — men expanderar vidare i Asien och Afrika.",
      en: "The British Empire is reshaped — but continues expanding in Asia and Africa.",
      tr: "İngiliz İmparatorluğu yeniden şekilleniyor — ancak Asya ve Afrika'da genişlemeye devam ediyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1783,
    title: {
      sv: "William Pitt den yngre — En ny era av brittisk storhet",
      en: "William Pitt the Younger — A New Era of British Greatness",
      tr: "Genç William Pitt — İngiliz Büyüklüğünün Yeni Bir Çağı",
    },
    summary: {
      sv: "24 år gammal blev William Pitt den yngre Storbritanniens yngste premiärminister i historien. Hans 17-åriga styre reformerade brittiska finanser, moderniserade administrationen och förberedde nationen för de napoleonska krigen. En intellektuell titan som älskade landet men krossades av dess bördor — han dog vid 46 efter att ha fört Britannien till kanten av ett globalt krig.",
      en: "At 24 years old, William Pitt the Younger became Britain's youngest Prime Minister in history. His 17-year tenure reformed British finances, modernised administration and prepared the nation for the Napoleonic Wars. An intellectual titan who loved his country but was crushed by its burdens — he died at 46 having led Britain to the edge of a global war.",
      tr: "24 yaşında William Pitt, tarihteki en genç İngiliz Başbakanı oldu. 17 yıllık iktidarı boyunca İngiliz maliyesini reform etti ve idareyi modernize etti.",
    },
    figures: ["William Pitt the Younger", "King George III", "Charles James Fox"],
    consequences: {
      sv: "Brittiska finanser stabiliseras. Imperiet konsolideras efter förlusten av Amerika.",
      en: "British finances are stabilised. The empire consolidates after the loss of America.",
      tr: "İngiliz maliyesi istikrara kavuşuyor. İmparatorluk, Amerika'nın kaybından sonra pekişiyor.",
    },
    impact: {
      sv: "Britannien rustar för en generation av krig och global expansion.",
      en: "Britain prepares for a generation of war and global expansion.",
      tr: "Britanya, bir nesil sürecek savaş ve küresel genişleme için hazırlanıyor.",
    },
    category: "politics",
    importance: "medium",
  },
  {
    year: 1805,
    title: {
      sv: "Slaget vid Trafalgar — Lord Nelson och brittisk sjöherravälde",
      en: "Battle of Trafalgar — Lord Nelson and British Naval Supremacy",
      tr: "Trafalgar Savaşı — Lord Nelson ve İngiliz Deniz Üstünlüğü",
    },
    summary: {
      sv: "Den 21 oktober 1805 krossade viceamiral Horatio Nelson den kombinerade franska och spanska flottan vid Trafalgar utanför den spanska kusten. Nelson dog av en gevärskula under slagets gång — hans sista ord ska ha varit 'Gud och mitt land.' HMS Victory, hans flaggskepp, bär fortfarande hans flagg i Portsmouth. Trafalgar gav Britannien ett sekel av obestridligt herravälde på haven.",
      en: "On 21 October 1805 Vice Admiral Horatio Nelson crushed the combined French and Spanish fleet at Trafalgar off the Spanish coast. Nelson was killed by a musket ball during the battle — his last words reportedly 'God and my country.' HMS Victory, his flagship, still flies his flag at Portsmouth. Trafalgar gave Britain a century of unchallenged mastery of the seas.",
      tr: "21 Ekim 1805'te Viceamiral Horatio Nelson, İspanya kıyılarındaki Trafalgar'da birleşik Fransız ve İspanyol donanmasını ezdi. Nelson, muharebe sırasında musket kurşunuyla hayatını kaybetti.",
    },
    figures: ["Vice Admiral Horatio Nelson", "Admiral Villeneuve", "Captain Thomas Hardy"],
    consequences: {
      sv: "Napoleons planer på att invadera England krossas för gott.",
      en: "Napoleon's plans to invade England are crushed for good.",
      tr: "Napolyon'un İngiltere'yi işgal etme planları kesinlikle suya düşüyor.",
    },
    impact: {
      sv: "Pax Britannica — ett sekel av brittisk fred och herravälde — börjar.",
      en: "Pax Britannica — a century of British peace and dominance — begins.",
      tr: "Pax Britannica — bir asırlık İngiliz barışı ve egemenliği — başlıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1807,
    title: {
      sv: "Slavhandeln avskaffas — Britannien leder moralisk förändring",
      en: "Slave Trade Abolished — Britain Leads Moral Change",
      tr: "Köle Ticareti Kaldırılıyor — Britanya Ahlaki Değişime Öncülük Ediyor",
    },
    summary: {
      sv: "Den 25 mars 1807 avskaffade det brittiska parlamentet slavhandeln i hela imperiet — en monumental seger för William Wilberforce och den abolitionistiska rörelsen efter 20 år av kamp. Royal Navy fick i uppdrag att patrullera Atlantkusten och stoppa slavfartyg. Britannien — som hade tjänat enorma rikedomar på slavhandeln — blev nu dess aktivaste motståndare. 1833 avskaffades slaveriet helt i det brittiska imperiet.",
      en: "On 25 March 1807 the British Parliament abolished the slave trade across the empire — a monumental victory for William Wilberforce and the abolitionist movement after 20 years of struggle. The Royal Navy was tasked with patrolling the Atlantic coast to stop slave ships. Britain — which had made enormous fortunes from the slave trade — became its most active opponent. In 1833 slavery was abolished entirely in the British Empire.",
      tr: "25 Mart 1807'de İngiliz Parlamentosu, 20 yıllık mücadelenin ardından William Wilberforce ve abolisyonist hareket için büyük bir zafer olan köle ticaretini tüm imparatorlukta kaldırdı.",
    },
    figures: ["William Wilberforce", "Thomas Clarkson", "King George III", "Prime Minister Grenville"],
    consequences: {
      sv: "Slavhandeln förbjuds. Royal Navy patrullerar Atlanten mot slavfartyg.",
      en: "The slave trade is banned. The Royal Navy patrols the Atlantic against slave ships.",
      tr: "Köle ticareti yasaklanıyor. Kraliyet Donanması, köle gemilerine karşı Atlantik'i devriye geziyor.",
    },
    impact: {
      sv: "Britannien omdefinierar sig som en moralisk kraft i världspolitiken.",
      en: "Britain redefines itself as a moral force in world politics.",
      tr: "Britanya, dünya siyasetinde ahlaki bir güç olarak kendini yeniden tanımlıyor.",
    },
    category: "culture",
    importance: "high",
  },
  {
    year: 1815,
    title: {
      sv: "Slaget vid Waterloo — Napoleon besegras, Pax Britannica säkras",
      en: "Battle of Waterloo — Napoleon Defeated, Pax Britannica Secured",
      tr: "Waterloo Savaşı — Napolyon Yenildi, Pax Britannica Güvence Altında",
    },
    summary: {
      sv: "Den 18 juni 1815 besegrade hertig Wellington och fältmarskalk Blücher Napoleon Bonaparte vid Waterloo i nuvarande Belgien. Det var en av historiens mest avgörande slag — Napoleons sista och Storbritanniens största militära triumph. Wellington kallade det 'the nearest run thing you ever saw in your life.' Napoleon landsförvisades till S:t Helena och det brittiska imperiet trädde in i sin gyllene era.",
      en: "On 18 June 1815 the Duke of Wellington and Field Marshal Blücher defeated Napoleon Bonaparte at Waterloo in modern Belgium. One of history's most decisive battles — Napoleon's last and Britain's greatest military triumph. Wellington called it 'the nearest run thing you ever saw in your life.' Napoleon was exiled to Saint Helena and the British Empire entered its golden era.",
      tr: "18 Haziran 1815'te Wellington Dükü ve Feldmareşal Blücher, günümüz Belçikası'ndaki Waterloo'da Napolyon Bonapart'ı yendi.",
    },
    figures: ["Duke of Wellington", "Field Marshal Blücher", "Napoleon Bonaparte", "King George IV"],
    consequences: {
      sv: "Napoleon exileras. Europa omorganiseras vid Wienerkongressen.",
      en: "Napoleon is exiled. Europe is reorganised at the Congress of Vienna.",
      tr: "Napolyon sürgüne gönderiliyor. Avrupa, Viyana Kongresi'nde yeniden örgütleniyor.",
    },
    impact: {
      sv: "Pax Britannica — ett sekel av relativ global fred — börjar formellt.",
      en: "Pax Britannica — a century of relative global peace — formally begins.",
      tr: "Pax Britannica — görece küresel barışın bir asrı — resmen başlıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1819,
    title: {
      sv: "Singapore grundas — Porten till Asien öppnas",
      en: "Singapore Founded — The Gateway to Asia Opened",
      tr: "Singapur Kuruluyor — Asya'ya Kapı Açılıyor",
    },
    summary: {
      sv: "Sir Stamford Raffles grundade Singapore den 28 januari 1819 som en fri handelshamn under brittisk kontroll. Strategiskt beläget vid södra spetsen av Malackahalvön blev Singapore snabbt en av världens viktigaste handelsnoder. Raffles visionära plan om en öppen hamn utan tullar lockade handelsmän från hela Asien och gjorde Singapore till en knutpunkt för handel mellan öst och väst.",
      en: "Sir Stamford Raffles founded Singapore on 28 January 1819 as a free trade port under British control. Strategically located at the southern tip of the Malay Peninsula, Singapore rapidly became one of the world's most important trading hubs. Raffles' visionary plan for an open port without tariffs attracted merchants from across Asia, making Singapore a nexus of trade between East and West.",
      tr: "Sir Stamford Raffles, 28 Ocak 1819'da İngiliz kontrolü altında bir serbest ticaret limanı olarak Singapur'u kurdu.",
    },
    figures: ["Sir Stamford Raffles", "William Farquhar"],
    consequences: {
      sv: "Singapore blir en av världens viktigaste handelsstäder.",
      en: "Singapore becomes one of the world's most important trading cities.",
      tr: "Singapur, dünyanın en önemli ticaret şehirlerinden biri haline geliyor.",
    },
    impact: {
      sv: "Brittisk kontroll över den strategiska leden mellan Indiska oceanen och Stilla havet.",
      en: "British control over the strategic passage between the Indian and Pacific Oceans.",
      tr: "Hint Okyanusu ile Pasifik arasındaki stratejik geçiş üzerinde İngiliz kontrolü.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1837,
    title: {
      sv: "Drottning Victorias tronbestigning — Det victoriska England föds",
      en: "Queen Victoria Ascends the Throne — Victorian England is Born",
      tr: "Kraliçe Victoria Tahta Çıkıyor — Viktorya İngiltere'si Doğuyor",
    },
    summary: {
      sv: "Den 20 juni 1837, blott 18 år gammal, besteg Victoria det brittiska tronen och inledde ett 63-årigt styre — det längsta i brittisk historia fram till Elizabeth II. Under henne industrialiserades Britannien, imperiet nådde sin absoluta topp och Englands kultur, moral och estetik dominerade världen. Hon kallades 'Europas farmor' och hennes ättlingar satt på tronerna i Ryssland, Preussen, Spanien och Sverige.",
      en: "On 20 June 1837, just 18 years old, Victoria ascended the British throne and began a 63-year reign — the longest in British history until Elizabeth II. Under her Britain industrialised, the empire reached its absolute peak and England's culture, morality and aesthetics dominated the world. She was called 'the grandmother of Europe' and her descendants sat on the thrones of Russia, Prussia, Spain and Sweden.",
      tr: "20 Haziran 1837'de, yalnızca 18 yaşındaki Victoria, İngiliz tahtına çıktı ve II. Elizabeth'e kadar İngiliz tarihinin en uzun saltanatı olan 63 yıllık bir hükümdarlık başlattı.",
    },
    figures: ["Queen Victoria", "Prince Albert", "Prime Minister Melbourne", "Benjamin Disraeli"],
    consequences: {
      sv: "Den victoriska eran inleds. Det brittiska imperiets gyllene ålder börjar.",
      en: "The Victorian era begins. The golden age of the British Empire commences.",
      tr: "Viktorya dönemi başlıyor. İngiliz İmparatorluğu'nun altın çağı başlıyor.",
    },
    impact: {
      sv: "Britannien dominerar 19-talets världspolitik, handel och kultur.",
      en: "Britain dominates 19th-century world politics, trade and culture.",
      tr: "Britanya, 19. yüzyılın dünya siyasetini, ticaretini ve kültürünü domine ediyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1840,
    title: {
      sv: "Opiumkriget — Kina tvingas öppna sina portar",
      en: "The Opium War — China Forced to Open Its Doors",
      tr: "Afyon Savaşı — Çin Kapılarını Açmaya Zorlanıyor",
    },
    summary: {
      sv: "När Kina försökte stoppa den brittiska opiumhandeln svarade Britannien med militärt våld. De brittiska styrkorna krossade den kinesiska flottan och armén med modern teknik. Nanjingfördraget 1842 tvingade Kina att öppna fem hamnstäder, betala enorma krigsskadestånd och avträda Hongkong till Britannien. Det var en djupt traumatisk händelse för Kina — 'den hundraåriga förödmjukelsens' startpunkt.",
      en: "When China tried to stop the British opium trade, Britain responded with military force. British forces crushed the Chinese navy and army with modern technology. The Treaty of Nanjing 1842 forced China to open five ports, pay enormous war reparations and cede Hong Kong to Britain. It was a deeply traumatic event for China — the starting point of the 'century of humiliation'.",
      tr: "Çin, İngiliz afyon ticaretini durdurmaya çalışınca Britanya askeri güçle karşılık verdi. İngiliz kuvvetleri, modern teknolojiyle Çin donanma ve ordusunu ezdi.",
    },
    figures: ["Queen Victoria", "Captain Charles Elliot", "Lin Zexu", "Emperor Daoguang"],
    consequences: {
      sv: "Hongkong blir brittiskt. Kina tvingas öppna sina hamnar.",
      en: "Hong Kong becomes British. China is forced to open its ports.",
      tr: "Hong Kong İngiliz oluyor. Çin, limanlarını açmaya zorlanıyor.",
    },
    impact: {
      sv: "Brittisk ekonomisk imperialism tvingar Asiens stormakter att underkasta sig.",
      en: "British economic imperialism forces Asia's major powers to submit.",
      tr: "İngiliz ekonomik emperyalizmi, Asya'nın büyük güçlerini boyun eğmeye zorluyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1851,
    title: {
      sv: "Världsutställningen i Crystal Palace — Imperiet visar sin makt",
      en: "Great Exhibition at Crystal Palace — The Empire Displays Its Power",
      tr: "Crystal Palace'da Dünya Fuarı — İmparatorluk Gücünü Sergiliyor",
    },
    summary: {
      sv: "Den 1 maj 1851 öppnade Prins Albert Världsutställningen i det spektakulära Crystal Palace i Londons Hyde Park. Sex miljoner besökare strömmade in för att se produkter och uppfinningar från hela världen — men framför allt brittisk industriell överlägsenhet. Det var en performance av imperiell storhet: ångmaskiner, textilier, vapen, smycken från kolonier. Ber ännu kände sig som centrum av civilisationen.",
      en: "On 1 May 1851 Prince Albert opened the Great Exhibition inside the spectacular Crystal Palace in London's Hyde Park. Six million visitors flocked to see products and inventions from across the world — but above all British industrial superiority. A performance of imperial grandeur: steam engines, textiles, weapons, jewels from colonies. Britain had never felt more like the centre of civilisation.",
      tr: "1 Mayıs 1851'de Prens Albert, Londra'nın Hyde Park'ındaki muhteşem Crystal Palace'da Büyük Sergi'yi açtı. Altı milyon ziyaretçi, dünyanın dört bir yanından ürünleri görmek için akın etti.",
    },
    figures: ["Queen Victoria", "Prince Albert", "Joseph Paxton"],
    consequences: {
      sv: "Britannien presenterar sig som världens industriella och kulturella ledare.",
      en: "Britain presents itself as the world's industrial and cultural leader.",
      tr: "Britanya, kendini dünyanın endüstriyel ve kültürel lideri olarak sunuyor.",
    },
    impact: {
      sv: "Det victoriska imperiet vid sin mest glansperiod.",
      en: "The Victorian empire at its most brilliant peak.",
      tr: "Viktorya İmparatorluğu en parlak zirvesinde.",
    },
    category: "culture",
    importance: "medium",
  },
  {
    year: 1857,
    title: {
      sv: "Det indiska upproret — Raj ersätter kompaniet",
      en: "The Indian Uprising — Crown Rule Replaces the Company",
      tr: "Hint Ayaklanması — Taç Yönetimi Şirketi Devre Dışı Bırakıyor",
    },
    summary: {
      sv: "1857 exploderade ett massivt uppror mot Ostindiska kompaniets styre i Indien — sipoyernas revolt. Orsakerna var djupa: religiöst förtryck, ekonomisk utarmning, och förakt för indisk kultur. Upproret krossades brutalt av brittiska styrkor men förändrade historien: Ostindiska kompaniet upplöstes och British Raj inrättades under direktstyre av den brittiska kronan. Indien styrdes nu direkt av London.",
      en: "In 1857 a massive uprising exploded against East India Company rule in India — the Sepoy Mutiny. The causes ran deep: religious oppression, economic impoverishment and contempt for Indian culture. The uprising was brutally suppressed by British forces but changed history: the East India Company was dissolved and the British Raj was established under direct rule by the British Crown. India was now governed directly from London.",
      tr: "1857'de Hindistan'da Doğu Hindistan Şirketi yönetimine karşı büyük bir isyan patlak verdi — Sipahi Ayaklanması. Nedenleri derindir: dini baskı, ekonomik yoksullaşma ve Hint kültürüne duyulan küçümseme.",
    },
    figures: ["Queen Victoria", "Lord Canning", "Mangal Pandey", "Rani of Jhansi"],
    consequences: {
      sv: "Ostindiska kompaniet upplöses. British Raj inrättas.",
      en: "The East India Company is dissolved. The British Raj is established.",
      tr: "Doğu Hindistan Şirketi feshediliyor. İngiliz Racı kurulur.",
    },
    impact: {
      sv: "Brittiskt styre i Indien professionaliseras — men motstånd fortsätter att gro.",
      en: "British rule in India professionalises — but resistance continues to grow.",
      tr: "Hindistan'daki İngiliz yönetimi profesyonelleşiyor — ancak direniş büyümeye devam ediyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1876,
    title: {
      sv: "Victoria utropas till kejsarinna av Indien — Imperiet på toppen",
      en: "Victoria Proclaimed Empress of India — Empire at its Zenith",
      tr: "Victoria, Hindistan İmparatoriçesi İlan Ediliyor — İmparatorluk Zirvesinde",
    },
    summary: {
      sv: "Den 1 januari 1877 utropades drottning Victoria till kejsarinna av Indien vid en storartad ceremoni i Delhi. Det var Benjamin Disraelis idé — 'Imperiet' som den brittiska identitetens kronjuvel. Imperiet täckte nu 23% av jordens yta och 400 miljoner människor styrdes från London. Solen gick aldrig ned över det brittiska imperiet. Det var dess absoluta höjdpunkt.",
      en: "On 1 January 1877 Queen Victoria was proclaimed Empress of India at a grand ceremony in Delhi. Benjamin Disraeli's idea — 'the Empire' as the crown jewel of British identity. The empire now covered 23% of Earth's surface and 400 million people were governed from London. The sun never set on the British Empire. This was its absolute zenith.",
      tr: "1 Ocak 1877'de Delhi'de görkemli bir törenle Kraliçe Victoria, Hindistan İmparatoriçesi ilan edildi. Bu, Benjamin Disraeli'nin fikriydi.",
    },
    figures: ["Queen Victoria", "Benjamin Disraeli", "Lord Lytton"],
    consequences: {
      sv: "Det brittiska imperiet vid sin geografiska och politiska topp — 23% av jordens yta.",
      en: "The British Empire at its geographic and political peak — 23% of Earth's surface.",
      tr: "İngiliz İmparatorluğu coğrafi ve siyasi zirvesinde — Dünya yüzeyinin %23'ü.",
    },
    impact: {
      sv: "'The sun never sets on the British Empire' — en sanning, inte bara ett slagord.",
      en: "'The sun never sets on the British Empire' — a truth, not just a slogan.",
      tr: "'İngiliz İmparatorluğu'nda güneş hiç batmaz' — bir slogan değil, bir gerçek.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1884,
    title: {
      sv: "Kapplöpningen om Afrika — Imperiet delar en kontinent",
      en: "Scramble for Africa — The Empire Divides a Continent",
      tr: "Afrika'yı Paylaşma Yarışı — İmparatorluk Bir Kıtayı Bölüyor",
    },
    summary: {
      sv: "Berlinkonferensen 1884–85 samlade Europas makter för att dela Afrika utan representation av ett enda afrikanskt folk. Britannien tog den största biten: Egypten, Sudan, Nigeria, Ghana, Kenya, Uganda, Rhodesia, Sydafrika och mer. Inom 30 år kontrollerade Europa 90% av Afrika. Cecil Rhodes drömde om ett engelskt territorium från Kairo till Kapstaden — 'Cape to Cairo'-visionen.",
      en: "The Berlin Conference 1884–85 gathered European powers to divide Africa without a single African people being represented. Britain took the largest share: Egypt, Sudan, Nigeria, Ghana, Kenya, Uganda, Rhodesia, South Africa and more. Within 30 years Europe controlled 90% of Africa. Cecil Rhodes dreamed of an English territory from Cairo to Cape Town — the 'Cape to Cairo' vision.",
      tr: "1884–85 Berlin Konferansı, tek bir Afrika halkının temsil edilmediği bir ortamda Avrupa güçlerini Afrika'yı bölmek üzere bir araya getirdi.",
    },
    figures: ["Cecil Rhodes", "Queen Victoria", "Lord Salisbury", "King Leopold II of Belgium"],
    consequences: {
      sv: "Britannien kontrollerar enorma delar av Afrika och dess resurser.",
      en: "Britain controls vast swathes of Africa and its resources.",
      tr: "Britanya, Afrika'nın büyük bölümlerini ve kaynaklarını kontrol ediyor.",
    },
    impact: {
      sv: "Afrikas moderna gränser — ritade av Europa utan hänsyn till folkgrupper — skapar konflikter som varar till idag.",
      en: "Africa's modern borders — drawn by Europe without regard to peoples — create conflicts lasting to this day.",
      tr: "Halklara aldırış etmeden Avrupa tarafından çizilen Afrika'nın modern sınırları, bugüne kadar süren çatışmalar yaratıyor.",
    },
    category: "expansion",
    importance: "high",
  },
  {
    year: 1899,
    title: {
      sv: "Boerkriget — Imperiets brutalitet exponeras",
      en: "The Boer War — The Empire's Brutality Exposed",
      tr: "Boer Savaşı — İmparatorluğun Vahşeti Gün Yüzüne Çıkıyor",
    },
    summary: {
      sv: "Kriget mot de holländska boererna i Sydafrika exponerade det brittiska imperiets mörkare sida. Lord Kitchener införde koncentrationsläger där 26 000 boerkvinnor och -barn dog av sjukdomar och svält. Emily Hobhouse avslöjade förhållandena och skapade en internationell skandal. Kriget vanns men till ett enormt pris — för imperial moral och nationellt rykte.",
      en: "The war against the Dutch Boers in South Africa exposed the darker side of the British Empire. Lord Kitchener introduced concentration camps where 26,000 Boer women and children died of disease and starvation. Emily Hobhouse exposed the conditions and created an international scandal. The war was won but at enormous cost — to imperial morality and national reputation.",
      tr: "Güney Afrika'daki Hollandalı Boerlarla yapılan savaş, İngiliz İmparatorluğu'nun karanlık yüzünü ortaya çıkardı. Lord Kitchener, 26.000 Boer kadın ve çocuğunun hastalık ve açlıktan öldüğü toplama kampları kurdu.",
    },
    figures: ["Lord Kitchener", "Queen Victoria", "Emily Hobhouse", "General Botha"],
    consequences: {
      sv: "Sydafrika säkras men imperial opinion vänder sig mot imperiet hemma.",
      en: "South Africa is secured but imperial opinion turns against the empire at home.",
      tr: "Güney Afrika güvence altına alınıyor ancak imparatorluk kamuoyu evde imparatorluğa karşı çevrilmeye başlıyor.",
    },
    impact: {
      sv: "Det brittiska imperiet börjar ifrågasättas moraliskt — hemma och utomlands.",
      en: "The British Empire begins to be questioned morally — at home and abroad.",
      tr: "İngiliz İmparatorluğu, hem yurtta hem de yurtdışında ahlaki açıdan sorgulanmaya başlanıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1914,
    title: {
      sv: "Första världskriget — Imperiet i krig",
      en: "First World War — The Empire at War",
      tr: "Birinci Dünya Savaşı — İmparatorluk Savaşta",
    },
    summary: {
      sv: "Den 4 augusti 1914 förklarade Britannien krig mot Tyskland efter invasionen av Belgien. Hela imperiet mobiliserades: Indien, Australien, Kanada, Sydafrika, Nya Zeeland, Nigeria sände miljoner soldater. ANZACs dog vid Gallipoli, indiska regimenter slogs i Mesopotamien, kanadensare vid Vimy Ridge. Over 700 000 brittiska soldater dog. Imperiet vann — men var djupt försvagat.",
      en: "On 4 August 1914 Britain declared war on Germany following the invasion of Belgium. The entire empire was mobilised: India, Australia, Canada, South Africa, New Zealand, Nigeria sent millions of soldiers. ANZACs died at Gallipoli, Indian regiments fought in Mesopotamia, Canadians at Vimy Ridge. Over 700,000 British soldiers died. The empire won — but was profoundly weakened.",
      tr: "4 Ağustos 1914'te Britanya, Belçika'nın işgalinin ardından Almanya'ya savaş ilan etti. Tüm imparatorluk seferber edildi.",
    },
    figures: ["King George V", "Lord Kitchener", "Field Marshal Haig", "Winston Churchill"],
    consequences: {
      sv: "Ottomanska, Habsburgska och Tyska imperierna faller. Britannien territoriellt på topp.",
      en: "Ottoman, Habsburg and German empires fall. Britain territorially at peak.",
      tr: "Osmanlı, Habsburg ve Alman imparatorlukları çöküyor. Britanya toprak olarak zirvede.",
    },
    impact: {
      sv: "Det brittiska imperiet territorellt på sin topp — men ekonomiskt och demografiskt försvagat.",
      en: "The British Empire territorially at its peak — but economically and demographically weakened.",
      tr: "İngiliz İmparatorluğu toprak açısından zirvesinde — ancak ekonomik ve demografik olarak zayıflamış.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1919,
    title: {
      sv: "Versaillesfreden — Det brittiska imperiet territorellt på sin absoluta topp",
      en: "Treaty of Versailles — British Empire Territorially at Absolute Peak",
      tr: "Versay Antlaşması — İngiliz İmparatorluğu Toprak Olarak Mutlak Zirvesinde",
    },
    summary: {
      sv: "Efter Första världskrigets slut fick Britannien ytterligare territorier: Palestina, Irak, Transjordanien från ottomanska riket; Tanganyika från Tyskland. Det brittiska imperiet var nu på sin geografiska topp: 35,5 miljoner kvadratkilometer — en fjärdedel av jordens yta. Men ekonomin var förödad, skulder till USA enorme och nationalrörelser i Indien och Irland accelererade.",
      en: "After the First World War's end, Britain gained further territories: Palestine, Iraq, Transjordan from the Ottoman Empire; Tanganyika from Germany. The British Empire was now at its geographic peak: 35.5 million square kilometres — a quarter of Earth's surface. But the economy was devastated, debts to the USA enormous and national movements in India and Ireland accelerated.",
      tr: "Birinci Dünya Savaşı'nın sona ermesinin ardından Britanya ek topraklar kazandı: Osmanlı İmparatorluğu'ndan Filistin, Irak, Ürdün; Almanya'dan Tanganyika.",
    },
    figures: ["Prime Minister Lloyd George", "King George V", "Lord Balfour"],
    consequences: {
      sv: "Imperiet på sin geografiska topp men imperiala nedgången börjar.",
      en: "Empire at geographic peak but imperial decline begins.",
      tr: "İmparatorluk coğrafi zirvesinde ancak imperial gerileme başlıyor.",
    },
    impact: {
      sv: "Frön till avkolonialisering sås i Indien, Irland och Mellanöstern.",
      en: "Seeds of decolonisation are sown in India, Ireland and the Middle East.",
      tr: "Sömürge karşıtlığının tohumları Hindistan, İrlanda ve Orta Doğu'da atılıyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1940,
    title: {
      sv: "Churchills timma — Britannien ensamt mot Hitler",
      en: "Churchill's Finest Hour — Britain Alone Against Hitler",
      tr: "Churchill'in En Büyük Saati — Britanya Tek Başına Hitler'e Karşı",
    },
    summary: {
      sv: "Efter Frankrikes fall i juni 1940 stod Britannien ensamt mot Nazityskland. Winston Churchill, ny premiärminister, nekade att förhandla och valde att kämpa. Hans tal enar nationen: 'We shall fight on the beaches... we shall never surrender.' Luftslaget om England utkämpades i himlen över södra England — RAF mot Luftwaffe. Hitlers invasionsplaner skjuts upp, sedan avbryts. Britannien klarade av sin mörkaste stund.",
      en: "After France's fall in June 1940 Britain stood alone against Nazi Germany. Winston Churchill, new Prime Minister, refused to negotiate and chose to fight. His speeches united the nation: 'We shall fight on the beaches... we shall never surrender.' The Battle of Britain was fought in the skies over southern England — RAF vs Luftwaffe. Hitler's invasion plans were postponed then cancelled. Britain survived its darkest hour.",
      tr: "Haziran 1940'ta Fransa'nın çöküşünün ardından Britanya Nazi Almanyası'na karşı yalnız kaldı. Yeni Başbakan Winston Churchill müzakereyi reddetti ve savaşmayı seçti.",
    },
    figures: ["Winston Churchill", "King George VI", "Air Marshal Dowding", "Adolf Hitler"],
    consequences: {
      sv: "Britannien överlever. Hitler kan inte ockupera brittiska öarna.",
      en: "Britain survives. Hitler cannot occupy the British Isles.",
      tr: "Britanya hayatta kalıyor. Hitler İngiliz Adaları'nı işgal edemiyor.",
    },
    impact: {
      sv: "Churchills ledarskap och brittisk uthållighet räddar europeisk frihet.",
      en: "Churchill's leadership and British resolve save European freedom.",
      tr: "Churchill'in liderliği ve İngiliz azmi, Avrupa özgürlüğünü kurtarıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1945,
    title: {
      sv: "Andra världskriget slutar — Imperiet segrar men är utmattat",
      en: "Second World War Ends — Empire Victorious But Exhausted",
      tr: "İkinci Dünya Savaşı Sona Eriyor — İmparatorluk Galip Ama Tükenmiş",
    },
    summary: {
      sv: "Britannien framstod som segrare i det mest förödande kriget i historien — men till ett enormt pris. Ekonomin var ruinerad, skulder till USA historiska, kolonier krävde självständighet och folket valde bort Churchill till förmån för Attlee och Labour. Välfärdsstaten skapades — National Health Service, folkpension, barnbidrag. Men det brittiska imperiet inledde nu sin slutliga nedgång.",
      en: "Britain emerged victorious in the most devastating war in history — but at an enormous price. The economy was ruined, debts to the USA were historic, colonies demanded independence and the people voted out Churchill in favour of Attlee and Labour. The welfare state was created — National Health Service, state pension, child benefit. But the British Empire now began its final decline.",
      tr: "Britanya, tarihin en yıkıcı savaşından galip çıktı — ancak büyük bir bedelle. Ekonomi mahvolmuştu, ABD'ye olan borçlar tarihi boyutlardaydı, koloniler bağımsızlık talep ediyordu.",
    },
    figures: ["Winston Churchill", "Clement Attlee", "King George VI", "Franklin D. Roosevelt"],
    consequences: {
      sv: "Brittisk välfärdsstat skapas. Imperiet inleder avkolonialiseringsprocessen.",
      en: "British welfare state is created. The empire begins the decolonisation process.",
      tr: "İngiliz refah devleti kuruluyor. İmparatorluk sömürgelikten çıkış sürecine başlıyor.",
    },
    impact: {
      sv: "Storbritanniens roll i världen omdefinieras — från empire till nation.",
      en: "Britain's role in the world is redefined — from empire to nation.",
      tr: "Britanya'nın dünyadaki rolü yeniden tanımlanıyor — imparatorluktan ulusa.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1947,
    title: {
      sv: "Indiens självständighet — Imperiet börjar demonteras",
      en: "Indian Independence — The Empire Begins to Dismantle",
      tr: "Hindistan'ın Bağımsızlığı — İmparatorluk Sökülmeye Başlıyor",
    },
    summary: {
      sv: "Den 15 augusti 1947 blev Indien självständigt efter 200 år av brittiskt styre. Det var resultatet av Gandhi och nationalisternas decennielånga kamp men också brittisk utmattning efter kriget. Delningen av Indien och Pakistan skapade en av historiens blodigaste massmigration — en miljon dog och 15 miljoner fördrevs. Jawaharlal Nehru höll sitt berömda 'Tryst with destiny'-tal vid midnatt.",
      en: "On 15 August 1947 India became independent after 200 years of British rule. The result of Gandhi and the nationalists' decades-long struggle but also British exhaustion after the war. The partition into India and Pakistan created one of history's bloodiest mass migrations — one million died and 15 million were displaced. Jawaharlal Nehru delivered his famous 'Tryst with Destiny' speech at midnight.",
      tr: "15 Ağustos 1947'de Hindistan, 200 yıllık İngiliz yönetiminin ardından bağımsız oldu. Gandhi ve milliyetçilerin onlarca yıllık mücadelesinin ve savaş sonrası İngiliz yorgunluğunun bir sonucuydu.",
    },
    figures: ["Mahatma Gandhi", "Jawaharlal Nehru", "Muhammad Ali Jinnah", "Lord Mountbatten"],
    consequences: {
      sv: "Indien och Pakistan självständiga. Det brittiska imperiets avkolonialisering accelererar.",
      en: "India and Pakistan independent. British Empire's decolonisation accelerates.",
      tr: "Hindistan ve Pakistan bağımsız. İngiliz İmparatorluğu'nun sömürgeden çıkışı hız kazanıyor.",
    },
    impact: {
      sv: "Det viktigaste dominot i imperiet faller — resten följer snart.",
      en: "The most important domino of the empire falls — the rest soon follow.",
      tr: "İmparatorluğun en önemli dominosu düşüyor — geri kalanlar yakında takip ediyor.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1952,
    title: {
      sv: "Drottning Elizabeth II bestiger tronen — Ny Elizabethansk era",
      en: "Queen Elizabeth II Ascends the Throne — New Elizabethan Era",
      tr: "Kraliçe II. Elizabeth Tahta Çıkıyor — Yeni Elizabeth Dönemi",
    },
    summary: {
      sv: "Den 6 februari 1952 avled kung George VI och hans dotter Elizabeth besteg tronen — 25 år gammal. Hennes kröning den 2 juni 1953 sändes på television för första gången i historien och 27 miljoner britter tittade. Hon styrde i 70 år — bevittnade imperiet omvandlas till ett Commonwealth, den kalla krigets era, Thatcher, Blair och Brexit. Hennes lugna närvaro blev ett ankare i en nation i ständig förändring.",
      en: "On 6 February 1952 King George VI died and his daughter Elizabeth ascended the throne — aged 25. Her coronation on 2 June 1953 was broadcast on television for the first time in history and 27 million Britons watched. She reigned for 70 years — witnessing the empire transform into a Commonwealth, the Cold War era, Thatcher, Blair and Brexit. Her calm presence became an anchor for a nation in constant change.",
      tr: "6 Şubat 1952'de Kral VI. George öldü ve kızı Elizabeth 25 yaşında tahta çıktı. 2 Haziran 1953'teki taç giyme töreni tarihte ilk kez televizyonda yayınlandı.",
    },
    figures: ["Queen Elizabeth II", "Prince Philip", "Prime Minister Churchill", "Archbishop of Canterbury"],
    consequences: {
      sv: "En ny monark för ett Britannien i djup förändring. Imperiet ger plats för Commonwealth.",
      en: "A new monarch for a Britain in profound change. Empire gives way to Commonwealth.",
      tr: "Derin değişim içindeki bir Britanya için yeni bir hükümdar. İmparatorluk Milletler Topluluğu'na yerini bırakıyor.",
    },
    impact: {
      sv: "70 år av kontinuitet och stabilitet i en föränderlig värld.",
      en: "70 years of continuity and stability in a changing world.",
      tr: "Değişen bir dünyada 70 yıllık süreklilik ve istikrar.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1956,
    title: {
      sv: "Suezkrisen — Imperiets makt bryts",
      en: "Suez Crisis — The Empire's Power is Broken",
      tr: "Süveyş Krizi — İmparatorluğun Gücü Kırılıyor",
    },
    summary: {
      sv: "När Egyptens president Nasser nationaliserade Suezkanalen angrep Britannien, Frankrike och Israel Egypten i hemlighet. USA:s president Eisenhower krävde brittiskt tillbakadragande och hotade med ekonomiska sanktioner. Premierminister Eden, förödmjukad, tvingades kapitulera. Det var ögonblicket världen insåg att Britannien inte längre var en supermakt. USA och USSR dikterade nu världsordningen.",
      en: "When Egypt's President Nasser nationalised the Suez Canal, Britain, France and Israel attacked Egypt secretly. US President Eisenhower demanded British withdrawal and threatened economic sanctions. Prime Minister Eden, humiliated, was forced to capitulate. It was the moment the world realised Britain was no longer a superpower. The US and USSR now dictated the world order.",
      tr: "Mısır Cumhurbaşkanı Nasser, Süveyş Kanalı'nı millileştirince Britanya, Fransa ve İsrail gizlice Mısır'a saldırdı. ABD Başkanı Eisenhower, İngiliz çekilmesini talep etti.",
    },
    figures: ["Prime Minister Anthony Eden", "President Nasser", "President Eisenhower", "Queen Elizabeth II"],
    consequences: {
      sv: "Britannien tvingas retirera. USA bekräftas som den ledande västmakten.",
      en: "Britain is forced to retreat. The USA is confirmed as the leading Western power.",
      tr: "Britanya geri çekilmek zorunda kalıyor. ABD, önde gelen Batı gücü olarak doğrulanıyor.",
    },
    impact: {
      sv: "Det brittiska imperiets ner fall till medelstormakt bekräftas.",
      en: "Britain's decline to a middle power is confirmed.",
      tr: "Britanya'nın orta güce düşüşü doğrulanıyor.",
    },
    category: "war",
    importance: "high",
  },
  {
    year: 1960,
    title: {
      sv: "Avkolonialiseringens decennium — Afrika befriar sig",
      en: "The Decade of Decolonisation — Africa Frees Itself",
      tr: "Sömürgeden Çıkış On Yılı — Afrika Kendini Özgürleştiriyor",
      
    },
    summary: {
      sv: "1960 kallades 'Afrikas år' — 17 afrikanska länder uppnådde självständighet, varav många från det brittiska imperiet. Premiärminister Macmillan höll sitt berömda 'Wind of Change'-tal inför det sydafrikanska parlamentet och erkände att brittisk kolonialism var ohållbar. Nigeria, Kenya, Tanzania, Uganda, Sierra Leone — en efter annan reste brittiska kolonier nationella flaggor. Imperiet avvecklades med anmärkningsvärd hastighet.",
      en: "1960 was called 'The Year of Africa' — 17 African nations achieved independence, many from the British Empire. Prime Minister Macmillan delivered his famous 'Wind of Change' speech to the South African Parliament, acknowledging that British colonialism was unsustainable. Nigeria, Kenya, Tanzania, Uganda, Sierra Leone — one by one British colonies raised national flags. The empire was dismantled with remarkable speed.",
      tr: "1960, 'Afrika Yılı' olarak anıldı — 17 Afrika ülkesi bağımsızlığına kavuştu, birçoğu İngiliz İmparatorluğu'ndan.",
    },
    figures: ["Prime Minister Harold Macmillan", "Queen Elizabeth II", "Kwame Nkrumah", "Jomo Kenyatta"],
    consequences: {
      sv: "Det brittiska imperiet i Afrika demonteras. Commonwealth bildas.",
      en: "The British Empire in Africa is dismantled. The Commonwealth is formed.",
      tr: "Afrika'daki İngiliz İmparatorluğu söküluyor. Milletler Topluluğu kuruluyor.",
    },
    impact: {
      sv: "Britannien omdefinierar sin globala roll — partner snarare än herre.",
      en: "Britain redefines its global role — partner rather than master.",
      tr: "Britanya, küresel rolünü yeniden tanımlıyor — efendi yerine ortak.",
    },
    category: "politics",
    importance: "high",
  },
  {
    year: 1982,
    title: {
      sv: "Falklandskriget — Thatcher och imperiets sista eko",
      en: "The Falklands War — Thatcher and the Empire's Last Echo",
      tr: "Falkland Savaşı — Thatcher ve İmparatorluğun Son Yankısı",
    },
    summary: {
      sv: "Den 2 april 1982 invaderade Argentina Falklandsöarna — ett brittiskt territorium i Sydatlanten. Premiärminister Margaret Thatcher skickade en flotta på 100 fartyg och 28 000 soldater till den avlägsna ögruppen. Kriget varade 74 dagar. 255 brittiska soldater och 649 argentinska dog. Ön återerövrades och Thatchers popularitet sköt i höjden. Det var den sista brittiska militäroperationen i kejserlig tradition.",
      en: "On 2 April 1982 Argentina invaded the Falkland Islands — a British territory in the South Atlantic. Prime Minister Margaret Thatcher sent a fleet of 100 ships and 28,000 soldiers to the remote archipelago. The war lasted 74 days. 255 British and 649 Argentine soldiers died. The islands were recaptured and Thatcher's popularity soared. It was the last British military operation in imperial tradition.",
      tr: "2 Nisan 1982'de Arjantin, Güney Atlantik'teki bir İngiliz toprağı olan Falkland Adaları'nı işgal etti. Başbakan Margaret Thatcher, uzak takımadalara 100 gemiden oluşan bir filo ve 28.000 asker gönderdi.",
    },
    figures: ["Prime Minister Margaret Thatcher", "Queen Elizabeth II", "General Galtieri", "Admiral Woodward"],
    consequences: {
      sv: "Argentina tvingas retirera. Brittisk suveränitet över Falkland bekräftas.",
      en: "Argentina is forced to retreat. British sovereignty over the Falklands is confirmed.",
      tr: "Arjantin geri çekilmek zorunda kalıyor. Falklandlar üzerindeki İngiliz egemenliği doğrulanıyor.",
    },
    impact: {
      sv: "Thatchers mandatperiod förstärks. Brittisk nationalism upplever en comeback.",
      en: "Thatcher's mandate is strengthened. British nationalism experiences a comeback.",
      tr: "Thatcher'ın yetkisi güçleniyor. İngiliz milliyetçiliği geri dönüş yaşıyor.",
    },
    category: "war",
    importance: "medium",
  },
  {
    year: 1997,
    title: {
      sv: "Hongkongs återlämnande — Solen går slutligen ned",
      en: "Hong Kong Handover — The Sun Finally Sets",
      tr: "Hong Kong'un Devredilmesi — Güneş Sonunda Batıyor",
    },
    summary: {
      sv: "Den 1 juli 1997 lämnade Britannien Hongkong till Folkrepubliken Kina efter 156 år av brittiskt styre. Prins Charles bevittnade ceremonin, brittiska flaggan sänktes och den kinesiska hissades. Det var slutet på det brittiska imperiets sista stora koloni och symboliskt slutet på en 500-årig era av brittisk global expansion. 'The sun has finally set on the British Empire' — journalister världen över.",
      en: "On 1 July 1997 Britain handed Hong Kong to the People's Republic of China after 156 years of British rule. Prince Charles witnessed the ceremony, the British flag was lowered and the Chinese raised. It was the end of the British Empire's last great colony and symbolically the end of a 500-year era of British global expansion. 'The sun has finally set on the British Empire' — journalists worldwide.",
      tr: "1 Temmuz 1997'de Britanya, 156 yıllık İngiliz yönetiminin ardından Hong Kong'u Çin Halk Cumhuriyeti'ne devretti. Prens Charles törene tanıklık etti, İngiliz bayrağı indirildi ve Çin bayrağı çekildi.",
    },
    figures: ["Prince Charles", "Prime Minister Tony Blair", "Chris Patten", "Jiang Zemin"],
    consequences: {
      sv: "Hongkong återlämnas till Kina. Det brittiska imperiet formellt avslutat.",
      en: "Hong Kong is returned to China. The British Empire formally concluded.",
      tr: "Hong Kong Çin'e iade ediliyor. İngiliz İmparatorluğu resmen sona eriyor.",
    },
    impact: {
      sv: "Slutet på 500 år av brittisk global expansion — och arvets fortsatta ekande.",
      en: "The end of 500 years of British global expansion — and the legacy's continuing echo.",
      tr: "500 yıllık İngiliz küresel genişlemesinin sonu — ve mirasın süregelen yankısı.",
    },
    category: "politics",
    importance: "high",
  },
];

// =============================================================================
// MONARCHS & PRIME MINISTERS
// =============================================================================

const britishLeaders: Sultan[] = [
  {
    id: "henry-vii",
    name: "King Henry VII",
    reignStart: 1485,
    reignEnd: 1509,
    parentId: null,
    generation: 1,
    title: { sv: "Tudordynastins grundare", en: "Founder of the Tudor Dynasty", tr: "Tudor Hanedanının Kurucusu" },
  },
  {
    id: "henry-viii",
    name: "King Henry VIII",
    reignStart: 1509,
    reignEnd: 1547,
    parentId: "henry-vii",
    generation: 2,
    title: { sv: "Den brutale reformatorn", en: "The Bold Reformer", tr: "Cesur Reformcu" },
  },
  {
    id: "elizabeth-i",
    name: "Queen Elizabeth I",
    reignStart: 1558,
    reignEnd: 1603,
    parentId: "henry-viii",
    generation: 3,
    title: { sv: "Jungfrudrottningen", en: "The Virgin Queen", tr: "Bakire Kraliçe" },
    profileId: "elizabeth-i",
  },
  {
    id: "james-i",
    name: "King James I",
    reignStart: 1603,
    reignEnd: 1625,
    parentId: null,
    generation: 4,
    title: { sv: "Bibelns kung", en: "The Bible King", tr: "Kutsal Kitap Kralı" },
  },
  {
    id: "charles-i",
    name: "King Charles I",
    reignStart: 1625,
    reignEnd: 1649,
    parentId: "james-i",
    generation: 5,
    title: { sv: "Den avrättade kungen", en: "The Executed King", tr: "İdam Edilen Kral" },
  },
  {
    id: "cromwell",
    name: "Oliver Cromwell",
    reignStart: 1653,
    reignEnd: 1658,
    parentId: null,
    generation: 5,
    title: { sv: "Lord Protektor", en: "Lord Protector", tr: "Lord Protektor" },
    profileId: "oliver-cromwell",
  },
  {
    id: "charles-ii",
    name: "King Charles II",
    reignStart: 1660,
    reignEnd: 1685,
    parentId: "charles-i",
    generation: 6,
    title: { sv: "Den restaurerade kungen", en: "The Restored King", tr: "Restore Edilen Kral" },
  },
  {
    id: "william-iii",
    name: "King William III",
    reignStart: 1689,
    reignEnd: 1702,
    parentId: null,
    generation: 7,
    title: { sv: "Oranjen — den ärorike", en: "William of Orange — The Glorious", tr: "Orangeli William — Şanlı" },
  },
  {
    id: "queen-anne",
    name: "Queen Anne",
    reignStart: 1702,
    reignEnd: 1714,
    parentId: "james-i",
    generation: 8,
    title: { sv: "Unionsmonarken", en: "The Union Monarch", tr: "Birleşme Monarşi" },
  },
  {
    id: "george-iii",
    name: "King George III",
    reignStart: 1760,
    reignEnd: 1820,
    parentId: null,
    generation: 9,
    title: { sv: "Kungen som förlorade Amerika", en: "The King Who Lost America", tr: "Amerika'yı Kaybeden Kral" },
  },
  {
    id: "victoria",
    name: "Queen Victoria",
    reignStart: 1837,
    reignEnd: 1901,
    parentId: null,
    generation: 10,
    title: { sv: "Imperiets kejsarinna", en: "Empress of the Empire", tr: "İmparatorluğun İmparatoriçesi" },
    profileId: "queen-victoria",
  },
  {
    id: "edward-vii",
    name: "King Edward VII",
    reignStart: 1901,
    reignEnd: 1910,
    parentId: "victoria",
    generation: 11,
    title: { sv: "Fredens kung", en: "The Peacemaker King", tr: "Barış Sağlayan Kral" },
  },
  {
    id: "george-v",
    name: "King George V",
    reignStart: 1910,
    reignEnd: 1936,
    parentId: "edward-vii",
    generation: 12,
    title: { sv: "Krigets kung", en: "The War King", tr: "Savaş Kralı" },
  },
  {
    id: "george-vi",
    name: "King George VI",
    reignStart: 1936,
    reignEnd: 1952,
    parentId: "george-v",
    generation: 13,
    title: { sv: "Den stamande hjälten", en: "The Stuttering Hero", tr: "Kekeme Kahraman" },
  },
  {
    id: "elizabeth-ii",
    name: "Queen Elizabeth II",
    reignStart: 1952,
    reignEnd: 2022,
    parentId: "george-vi",
    generation: 14,
    title: { sv: "Nationens ankare", en: "The Nation's Anchor", tr: "Milletin Çapası" },
    profileId: "elizabeth-ii",
  },
  {
    id: "charles-iii",
    name: "King Charles III",
    reignStart: 2022,
    reignEnd: 9999,
    parentId: "elizabeth-ii",
    generation: 15,
    title: { sv: "Modernitetens kung", en: "The Modernising King", tr: "Modernleştirici Kral" },
  },
];

// =============================================================================
// QUIZ — STRUCTURE ONLY (questions added via admin dashboard)
// =============================================================================

const britishQuizQuestions: QuizQuestion[] = [];

// =============================================================================
// BADGES
// =============================================================================

const britishBadges: Badge[] = [
  {
    id: "apprentice",
    name: { sv: "Imperiets lärling", en: "Apprentice of the Empire", tr: "İmparatorluğun Çırağı" },
    icon: "🎖️",
    requiredScore: 3,
    description: {
      sv: "Svara rätt på 3 frågor och ta dina första steg in i imperiets historia.",
      en: "Answer 3 questions correctly and take your first steps into the empire's history.",
      tr: "3 soruyu doğru yanıtlayın ve imparatorluğun tarihine ilk adımlarınızı atın.",
    },
  },
  {
    id: "knight",
    name: { sv: "Riddare av imperiet", en: "Knight of the Empire", tr: "İmparatorluğun Şövalyesi" },
    icon: "⚔️",
    requiredScore: 5,
    description: {
      sv: "Svara rätt på 5 frågor — värdig en riddardubbning av kronan.",
      en: "Answer 5 questions correctly — worthy of a knighthood from the Crown.",
      tr: "5 soruyu doğru yanıtlayın — Taç'tan bir şövalyeliğe layık.",
    },
  },
  {
    id: "lord",
    name: { sv: "Lord av imperiet", en: "Lord of the Empire", tr: "İmparatorluğun Lordu" },
    icon: "👑",
    requiredScore: 8,
    description: {
      sv: "Svara rätt på 8 frågor — ta plats i överhusets bänkar.",
      en: "Answer 8 questions correctly — take your seat in the House of Lords.",
      tr: "8 soruyu doğru yanıtlayın — Lordlar Kamarası'ndaki yerinizi alın.",
    },
  },
  {
    id: "empire-master",
    name: { sv: "Imperiets mästare", en: "Master of the Empire", tr: "İmparatorluğun Ustası" },
    icon: "🌍",
    requiredScore: 12,
    description: {
      sv: "Svara rätt på 12 frågor — du behärskar ett rike där solen aldrig gick ned.",
      en: "Answer 12 questions correctly — you command an empire where the sun never set.",
      tr: "12 soruyu doğru yanıtlayın — güneşin hiç batmadığı bir imparatorluğa komuta ediyorsunuz.",
    },
  },
];

// =============================================================================
// PROFILES (populated via admin dashboard / separate file)
// =============================================================================

const britishProfiles: HistoricalProfile[] = [
  {
    id: "elizabeth-i",
    name: "Queen Elizabeth I",
    years: "1533–1603",
    title: {
      sv: "Jungfrudrottningen",
      en: "The Virgin Queen",
      tr: "Bakire Kraliçe",
    },
    portrait: "👑",
    bio: {
      sv: "Elizabeth I regerade England 1558–1603 och förde landet till en av dess mest lysande epoker. Dotter till Henrik VIII och Anne Boleyn, hon navigerade en farlig politisk värld med skärpa, charm och järnvilja. Hon gifte sig aldrig — 'jag är gift med England' — och höll europeiska makter i schack genom diplomatiska äktenskapsförhandlingar i decennier. Under henne blomstrade Shakespeare, Drake segrade på haven och England trädde in på den globala scenen.",
      en: "Elizabeth I ruled England 1558–1603 and brought the country to one of its most brilliant eras. Daughter of Henry VIII and Anne Boleyn, she navigated a dangerous political world with acuity, charm and iron will. She never married — 'I am married to England' — and kept European powers at bay through diplomatic marriage negotiations for decades. Under her Shakespeare flourished, Drake triumphed on the seas and England stepped onto the global stage.",
      tr: "I. Elizabeth, 1558–1603 yılları arasında İngiltere'yi yönetti ve ülkeyi en parlak dönemlerinden birine taşıdı. VIII. Henry ve Anne Boleyn'in kızı olan Elizabeth, tehlikeli siyasi dünyayı keskinlik, çekicilik ve demir irade ile aştı.",
    },
    reforms: {
      sv: ["Elizabethansk religiös bosättning — en protestantisk medelväg", "Stärkande av Royal Navy", "Östindiska kompaniets grundande (1600)", "Patronage av Shakespeare och det engelska teatern"],
      en: ["Elizabethan Religious Settlement — a Protestant middle way", "Strengthening of the Royal Navy", "Founding of the East India Company (1600)", "Patronage of Shakespeare and the English theatre"],
      tr: ["Elizabethan Dini Uzlaşması — Protestan bir orta yol", "Kraliyet Donanması'nın güçlendirilmesi", "Doğu Hindistan Şirketi'nin kurulması (1600)", "Shakespeare ve İngiliz tiyatrosuna destek"],
    },
    campaigns: {
      sv: ["Spanska armadans förstörelse (1588)", "Irländska kampanjer", "Stöd till holländska protestanter mot Spanien"],
      en: ["Defeat of the Spanish Armada (1588)", "Irish campaigns", "Support for Dutch Protestants against Spain"],
      tr: ["İspanya Armadası'nın yenilgisi (1588)", "İrlanda seferleri", "İspanya'ya karşı Hollandalı Protestanlara destek"],
    },
    leadershipStyle: {
      sv: "Elizabeth var en mästare av politisk image-making — hon spelade rollen av den evigt unga, gudomliga drottningen. Hon var djupt intelligent, flerspråkig och manipulativ i den bästa bemärkelsen. Hon kunde inspirera lojalitet genom charm men var hänsynslös när hennes makt hotades.",
      en: "Elizabeth was a master of political image-making — she played the role of the eternally young, divine queen. She was deeply intelligent, multilingual and manipulative in the finest sense. She could inspire loyalty through charm but was ruthless when her power was threatened.",
      tr: "Elizabeth, siyasi imaj yaratmanın ustasıydı — sonsuza dek genç, ilahi kraliçe rolünü oynadı. Derin zekası, çok dilliği ve en iyi anlamda manipülatif kişiliğiyle öne çıktı.",
    },
    criticalPerspectives: {
      sv: "Elizabeths styre inkluderade hård undertryckande av irländska katoliker och inledde kolonialiseringen av Irland som lämnade bestående sår. Hennes sena regeringstid präglades av ökande enväldighet och svårigheter att acceptera ett eventuellt tronarv.",
      en: "Elizabeth's rule included harsh suppression of Irish Catholics and began the colonisation of Ireland that left lasting wounds. Her later reign was marked by increasing autocracy and difficulties accepting a potential succession to the throne.",
      tr: "Elizabeth'in yönetimi, İrlandalı Katoliklerin sert bastırılmasını ve kalıcı yaralar bırakan İrlanda'nın sömürgeleştirilmesinin başlangıcını kapsadı.",
    },
  },
  {
    id: "queen-victoria",
    name: "Queen Victoria",
    years: "1819–1901",
    title: {
      sv: "Imperiets kejsarinna",
      en: "Empress of the Empire",
      tr: "İmparatorluğun İmparatoriçesi",
    },
    portrait: "💎",
    bio: {
      sv: "Victoria besteg tronen 18 år gammal och styrde i 63 år — det längsta brittiska monarkstyret dittills. Under henne industrialiserades Britannien fullständigt, imperiet nådde sin absoluta topp och brittisk kultur, moral och estetik dominerade världen. Djupt bedrövad av prins Alberts död 1861 tillbringade hon år i halvpensionering, men hennes symboliska vikt var omätlig. Hennes ättlingar var bokstavligen talat Europas kungar och drottningar.",
      en: "Victoria ascended the throne at 18 and ruled for 63 years — the longest British monarchical reign until that point. Under her Britain fully industrialised, the empire reached its absolute peak and British culture, morality and aesthetics dominated the world. Deeply grieved by Prince Albert's death in 1861, she spent years in semi-retirement but her symbolic weight was immeasurable. Her descendants were quite literally Europe's kings and queens.",
      tr: "Victoria, 18 yaşında tahta çıktı ve 63 yıl hüküm sürdü — o zamana kadar en uzun İngiliz monarşi saltanatı. Onun döneminde Britanya tamamen sanayileşti, imparatorluk mutlak zirvesine ulaştı.",
    },
    reforms: {
      sv: ["Industriell revolution och modernisering av Britannien", "Slaveriets totala avskaffande i imperiet (1833 under föregångare, men hennes era fördjupade det)", "Reform Acts som utvidgade rösträtten", "Utbyggnad av järnvägsnätet"],
      en: ["Industrial revolution and modernisation of Britain", "Complete abolition of slavery in the empire", "Reform Acts expanding the right to vote", "Expansion of the railway network"],
      tr: ["Sanayi devrimi ve Britanya'nın modernleştirilmesi", "İmparatorlukta köleliğin tamamen kaldırılması", "Oy hakkını genişleten Reform Yasaları", "Demiryolu ağının genişletilmesi"],
    },
    campaigns: {
      sv: ["Det indiska upproret 1857 och British Raj:s grundande", "Krimkriget (1853–56)", "Kapplöpningen om Afrika", "Boerkriget"],
      en: ["The Indian Uprising 1857 and founding of the British Raj", "The Crimean War (1853–56)", "The Scramble for Africa", "The Boer War"],
      tr: ["1857 Hint Ayaklanması ve İngiliz Racı'nın kuruluşu", "Kırım Savaşı (1853–56)", "Afrika Paylaşımı", "Boer Savaşı"],
    },
    leadershipStyle: {
      sv: "Victoria var djupt konservativ men inte okänslig för social reform. Hennes äktenskap med prins Albert var ett sant kärlekspar och hans förtida död 1861 förändrade henne fundamentalt. Hon var en mäktig symbolisk kraft — en mamma och kejsarinna i ett, vars närvaro gav imperiet mänsklig legitimitet.",
      en: "Victoria was deeply conservative but not insensitive to social reform. Her marriage to Prince Albert was a true love match and his early death in 1861 fundamentally changed her. She was a powerful symbolic force — a mother and empress in one, whose presence gave the empire human legitimacy.",
      tr: "Victoria, derin muhafazakardı ancak sosyal reforma duyarsız değildi. Prens Albert ile evliliği gerçek bir aşk eşleşmesiydi ve onun 1861'deki erken ölümü onu temelden değiştirdi.",
    },
    criticalPerspectives: {
      sv: "Victorias styre sammanföll med de mest brutala aspekterna av brittisk kolonialism: bengalisk hungersnöd, irländsk hungersnöd (med brittisk passivitet), opiumkrigen och boerkrigets koncentrationsläger. Hennes roll som nationens mor kontrasterade skarpare med imperiets verkligheter för koloniala undersåtar.",
      en: "Victoria's reign coincided with the most brutal aspects of British colonialism: Bengal famines, the Irish famine (with British passivity), the Opium Wars and the Boer War's concentration camps. Her role as the nation's mother contrasted sharply with the empire's realities for colonial subjects.",
      tr: "Victoria'nın saltanatı, İngiliz sömürgeciliğinin en vahşi yönleriyle çakıştı: Bengal kıtlıkları, İrlanda kıtlığı (İngiliz pasifliğiyle), Afyon Savaşları ve Boer Savaşı'nın toplama kampları.",
    },
  },
  {
    id: "elizabeth-ii",
    name: "Queen Elizabeth II",
    years: "1926–2022",
    title: {
      sv: "Nationens ankare",
      en: "The Nation's Anchor",
      tr: "Milletin Çapası",
    },
    portrait: "🌸",
    bio: {
      sv: "Elizabeth II besteg tronen 1952, 25 år gammal, och styrde i 70 år — det längsta i brittisk historia. Hon bevittnade imperiets transformation till ett Commonwealth, den kalla krigets era och globalisering. Hennes lugna, plikttrogna närvaro gav kontinuitet i en nation som genomgick djup förändring. Femton premiärministrar tjänade under henne — från Churchill till Truss. Hon dog i september 2022, djupt sörjd av nationen.",
      en: "Elizabeth II ascended the throne in 1952 at 25 and ruled for 70 years — the longest in British history. She witnessed the empire's transformation into a Commonwealth, the Cold War era and globalisation. Her calm, dutiful presence provided continuity for a nation undergoing profound change. Fifteen Prime Ministers served under her — from Churchill to Truss. She died in September 2022, deeply mourned by the nation.",
      tr: "II. Elizabeth, 1952'de 25 yaşında tahta çıktı ve 70 yıl hüküm sürdü — İngiliz tarihinin en uzun saltanatı. İmparatorluğun Milletler Topluluğu'na dönüşümüne, Soğuk Savaş dönemine ve küreselleşmeye tanıklık etti.",
    },
    reforms: {
      sv: ["Modernisering av monarkin för TV-eran", "Hantering av Commonwealths transformation", "Upprätthållande av monarkins relevans under 70 år av förändring"],
      en: ["Modernisation of the monarchy for the television age", "Management of the Commonwealth's transformation", "Maintaining the monarchy's relevance through 70 years of change"],
      tr: ["Monarşinin televizyon çağına modernleştirilmesi", "Milletler Topluluğu'nun dönüşümünün yönetimi", "70 yıllık değişim boyunca monarşinin güncelliğinin korunması"],
    },
    campaigns: {
      sv: ["Diplomatiska relationer med 170+ länder", "Commonwealth summits och relationer", "Suezkrisen, Falklandskriget, Irak-krisen — alla under hennes styre"],
      en: ["Diplomatic relations with 170+ countries", "Commonwealth summits and relations", "Suez Crisis, Falklands War, Iraq Crisis — all during her reign"],
      tr: ["170'ten fazla ülkeyle diplomatik ilişkiler", "Milletler Topluluğu zirveleri ve ilişkileri", "Süveyş Krizi, Falkland Savaşı, Irak Krizi — hepsi onun saltanatı döneminde"],
    },
    leadershipStyle: {
      sv: "Elizabeth II var plikttrogen till en grad som knappt är mänsklig — hon mottog sin sista premiärminister (Liz Truss) blott dagar innan sin död. Hennes styrka låg i vad hon inte sa — hon var apolitisk, opartisk och omsorgsfull. Hennes kroppsspråk och närvaro kommunicerade stabilitet i tider av kris.",
      en: "Elizabeth II was dutiful to an almost superhuman degree — she received her last Prime Minister (Liz Truss) just days before her death. Her strength lay in what she did not say — she was apolitical, impartial and careful. Her body language and presence communicated stability in times of crisis.",
      tr: "II. Elizabeth, neredeyse insanüstü bir özveriyle görevine bağlıydı — son Başbakan'ı (Liz Truss) ölümünden yalnızca günler önce kabul etti. Gücü, söylemediği şeylerde yatıyordu — siyaset dışı, tarafsız ve temkinliydi.",
    },
    criticalPerspectives: {
      sv: "Elizabeth II styrdes ett Britannien som genomgick imperiets avveckling, inklusive händelser av brittiskt kolonialvåld i Kenya och Malaysia. Hennes val att inte formellt ursäkta imperialismens övergrepp kritiserades av dem som sökte erkännande och gottgörelse.",
      en: "Elizabeth II presided over a Britain undergoing imperial dismantlement, including events of British colonial violence in Kenya and Malaysia. Her choice not to formally apologise for imperialism's abuses was criticised by those seeking acknowledgement and reparation.",
      tr: "II. Elizabeth, Kenya ve Malezya'daki İngiliz sömürge şiddeti olayları dahil imparatorluğun parçalanmasını yaşayan bir Britanya'ya başkanlık etti.",
    },
  },
  {
    id: "oliver-cromwell",
    name: "Oliver Cromwell",
    years: "1599–1658",
    title: {
      sv: "Lord Protektor",
      en: "Lord Protector",
      tr: "Lord Protektor",
    },
    portrait: "⚔️",
    bio: {
      sv: "Oliver Cromwell var den enda icke-kungliga ledaren i brittisk historia — en bondeadelsman från Huntingdon som ledde parlamentets arméer, avrättade en kung och styrde Britannien med järnhand i fem år. Hans New Model Army revolutionerade brittisk krigskonst. Han var djupt religiös — en puritanisk kalvinist som trodde sig uppfylla Guds vilja. Men hans styre var ofta tyranniskt, framför allt mot irländare.",
      en: "Oliver Cromwell was the only non-royal leader in British history — a country gentleman from Huntingdon who led Parliament's armies, executed a king and ruled Britain with an iron hand for five years. His New Model Army revolutionised British warfare. He was deeply religious — a Puritan Calvinist who believed himself fulfilling God's will. But his rule was often tyrannical, especially toward the Irish.",
      tr: "Oliver Cromwell, İngiliz tarihindeki tek kraliyet dışı liderdi — Parlamento'nun ordularına komuta eden, bir kralı idam eden ve beş yıl boyunca Britanya'yı demir yumrukla yöneten Huntingdon'dan bir taşra beyi.",
    },
    reforms: {
      sv: ["New Model Army — en professionell, disciplinerad militär", "Religiös tolerans för puritaner och judar (men inte katoliker)", "Navigation Acts som stärkte brittisk handel"],
      en: ["New Model Army — a professional, disciplined military", "Religious tolerance for Puritans and Jews (but not Catholics)", "Navigation Acts strengthening British trade"],
      tr: ["Yeni Model Ordu — profesyonel, disiplinli bir askeri güç", "Püritenler ve Yahudiler için dini hoşgörü (ancak Katolikler için değil)", "İngiliz ticaretini güçlendiren Denizcilik Yasaları"],
    },
    campaigns: {
      sv: ["Slagen vid Marston Moor och Naseby — avgörande parlamentariska segrar", "Irländska kampanjen — massakern i Drogheda", "Skotska kampanjen"],
      en: ["Battles of Marston Moor and Naseby — decisive Parliamentary victories", "Irish campaign — the Massacre of Drogheda", "Scottish campaign"],
      tr: ["Marston Moor ve Naseby Savaşları — belirleyici Parlamento zaferleri", "İrlanda seferi — Drogheda Katliamı", "İskoçya seferi"],
    },
    leadershipStyle: {
      sv: "Cromwell var en paradox — en äkta demokrat som upplöste parlamentet när det inte lydde honom; en religiös man som massakrerade irer; en republikan som tillfrågades om kronan men vägrade. Hans ledarskap var karismatiskt, militärt briljant men politiskt inkonsekvent.",
      en: "Cromwell was a paradox — a genuine democrat who dissolved Parliament when it disobeyed him; a religious man who massacred the Irish; a republican who was offered the Crown but refused. His leadership was charismatic, militarily brilliant but politically inconsistent.",
      tr: "Cromwell bir paradokstu — ona itaat etmediğinde Parlamentoyu fesheden gerçek bir demokrat; İrlandalıları katleden dindar bir adam; kendisine Taç teklif edilmesine rağmen reddeden bir cumhuriyetçi.",
    },
    criticalPerspectives: {
      sv: "Cromwells irländska kampanj 1649–53 resulterade i massakrer, massfördrivning och Irlands demografiska kollaps. Drogheda-massakern — där civiler och soldater dödades urskillningslöst — är ett av de mörkaste kapitlen i brittisk historia och dess ärr lever kvar i irländskt kollektivt minne.",
      en: "Cromwell's Irish campaign 1649–53 resulted in massacres, mass displacement and Ireland's demographic collapse. The Drogheda Massacre — where civilians and soldiers were killed indiscriminately — is one of the darkest chapters in British history and its scars live on in Irish collective memory.",
      tr: "Cromwell'in 1649–53 İrlanda seferi, katliamlarla, toplu yerinden edilmeyle ve İrlanda'nın demografik çöküşüyle sonuçlandı.",
    },
  },
];

// =============================================================================
// TERRITORIES (approximate polygons — geo updated via GitHub)
// =============================================================================

const britishTerritories: TerritoryPeriod[] = [
  {
    yearStart: 1588,
    yearEnd: 1650,
    label: { sv: "Tidigt engelska imperium — Nordamerika & Karibien", en: "Early English Empire — North America & Caribbean", tr: "Erken İngiliz İmparatorluğu — Kuzey Amerika ve Karayipler" },
    color: "#C8102E",
    polygon: [[
      [45.0, -75.0], [42.0, -70.0], [35.0, -77.0], [30.0, -81.0],
      [25.0, -80.0], [20.0, -72.0], [17.0, -62.0], [16.0, -62.0],
      [18.0, -65.0], [20.0, -75.0], [25.0, -78.0], [30.0, -82.0],
      [35.0, -78.0], [40.0, -73.0], [45.0, -75.0],
    ]],
  },
  {
    yearStart: 1750,
    yearEnd: 1815,
    label: { sv: "Det andra brittiska imperiet — Indien & Kanada", en: "Second British Empire — India & Canada", tr: "İkinci İngiliz İmparatorluğu — Hindistan ve Kanada" },
    color: "#C8102E",
    polygon: [[
      [37.0, 68.0], [35.0, 72.0], [30.0, 73.0], [25.0, 68.0],
      [20.0, 72.0], [15.0, 75.0], [10.0, 78.0], [8.0, 77.0],
      [10.0, 76.0], [12.0, 80.0], [20.0, 85.0], [25.0, 87.0],
      [27.0, 90.0], [25.0, 92.0], [22.0, 88.0], [20.0, 87.0],
      [15.0, 80.0], [12.0, 80.0], [10.0, 78.0], [8.0, 77.5],
      [8.5, 76.8], [10.0, 76.0], [12.0, 75.5], [15.0, 73.5],
      [18.0, 73.0], [20.0, 73.0], [22.0, 70.0], [25.0, 65.0],
      [28.0, 63.5], [30.0, 66.0], [33.0, 68.0], [37.0, 68.0],
    ]],
  },
  {
    yearStart: 1815,
    yearEnd: 1914,
    label: { sv: "Det victoriska imperiet — Global dominans", en: "The Victorian Empire — Global Dominance", tr: "Viktorya İmparatorluğu — Küresel Egemenlik" },
    color: "#C8102E",
    polygon: [[
      [55.0, -130.0], [49.0, -125.0], [49.0, -95.0], [45.0, -75.0],
      [42.0, -70.0], [35.0, -75.0], [25.0, -77.0], [20.0, -72.0],
      [17.0, -62.0], [10.0, -61.0], [6.0, -14.0],  [5.0, -3.0],
      [5.0, 1.0],   [6.0, 3.0],   [4.0, 6.0],   [4.0, 9.0],
      [7.0, 5.0],   [10.0, 7.0],  [13.0, 5.0],  [10.0, 12.0],
      [12.0, 15.0], [14.0, 17.0], [12.0, 37.0], [15.0, 40.0],
      [20.0, 37.0], [22.0, 37.0], [25.0, 35.0], [26.0, 32.0],
      [30.0, 32.0], [31.0, 28.5], [30.0, 32.5], [31.0, 34.0],
      [-1.0, 36.8], [-4.0, 39.7], [-7.0, 39.5], [-11.0, 34.5],
      [-17.0, 14.5],[-15.0, 3.5], [-10.0, -14.0],[0.0, -18.0],
      [5.0, -13.0], [7.0, -5.0],  [8.0, 1.0],
      [20.0, 25.0], [25.0, 30.0], [30.0, 32.0],
      [37.0, 68.0], [30.0, 73.0], [25.0, 68.0], [10.0, 78.0],
      [-10.0, 122.0],[-20.0, 115.0],[-35.0, 117.0],[-38.0, 145.0],
      [-20.0, 148.0],[-15.0, 145.0],[-10.0, 142.0],
      [-36.0, 175.0],[-40.0, 175.0],[-46.0, 168.0],[-46.0, 170.0],
      [-34.0, 18.5], [-29.0, 17.5],[-25.0, 14.0], [-20.0, 14.5],
      [-17.0, 12.0], [-8.0, 13.5], [-6.0, 15.0],
      [25.0, 57.0],  [24.0, 51.5], [15.0, 42.0], [12.0, 43.0],
      [51.0, -0.5],
    ]],
  },
  {
    yearStart: 1919,
    yearEnd: 1947,
    label: { sv: "Imperiet på sin topp — 35 miljoner km²", en: "Empire at its Peak — 35 million km²", tr: "İmparatorluk Zirvesinde — 35 milyon km²" },
    color: "#B22222",
    polygon: [[
      [55.0, -130.0], [49.0, -125.0], [49.0, -95.0], [45.0, -75.0],
      [35.0, -75.0], [17.0, -62.0], [6.0, -14.0], [5.0, 3.0],
      [-35.0, 18.0], [-10.0, 40.0], [12.0, 37.0], [30.0, 32.0],
      [33.0, 44.0], [30.0, 58.0], [37.0, 68.0], [25.0, 68.0],
      [10.0, 78.0], [-10.0, 122.0], [-38.0, 145.0], [-40.0, 175.0],
      [51.0, -0.5],
    ]],
  },
];

// =============================================================================
// TRADE ROUTES
// =============================================================================

const britishTradeRoutes: TradeRouteGeo[] = [
  {
    id: "spice-route",
    name: { sv: "Kryddrutten — London till Indien", en: "Spice Route — London to India", tr: "Baharat Yolu — Londra'dan Hindistan'a" },
    yearActive: 1600,
    path: [
      [51.5, -0.1], [38.0, -9.0], [35.5, -6.0], [20.0, -17.0],
      [0.0, -5.0], [-34.0, 18.0], [20.0, 57.0], [22.0, 60.0],
      [20.0, 73.0], [18.8, 72.8],
    ],
  },
  {
    id: "triangular-trade",
    name: { sv: "Den triangulära handeln — London, Afrika, Amerika", en: "Triangular Trade — London, Africa, Americas", tr: "Üçgen Ticaret — Londra, Afrika, Amerika" },
    yearActive: 1650,
    path: [
      [51.5, -0.1], [38.0, -9.0], [14.7, -17.5], [5.0, -1.0],
      [14.0, -17.0], [25.0, -77.0], [40.0, -73.0], [51.5, -0.1],
    ],
  },
  {
    id: "tea-route",
    name: { sv: "Teklipper rutten — London till Kina", en: "Tea Clipper Route — London to China", tr: "Çay Kliperi Yolu — Londra'dan Çin'e" },
    yearActive: 1750,
    path: [
      [51.5, -0.1], [35.5, -6.0], [-34.0, 18.5], [0.0, 60.0],
      [22.0, 88.0], [22.5, 114.0],
    ],
  },
  {
    id: "pacific-route",
    name: { sv: "Stillahavsrutten — London till Australien", en: "Pacific Route — London to Australia", tr: "Pasifik Yolu — Londra'dan Avustralya'ya" },
    yearActive: 1800,
    path: [
      [51.5, -0.1], [35.5, -6.0], [-34.0, 18.5], [-20.0, 57.5],
      [-10.0, 110.0], [-35.0, 138.0],
    ],
  },
  {
    id: "suez-route",
    name: { sv: "Suezkanalen — Den kortaste vägen till Östern", en: "Suez Canal — The Short Cut to the East", tr: "Süveyş Kanalı — Doğu'ya Kısa Yol" },
    yearActive: 1869,
    path: [
      [51.5, -0.1], [43.0, 6.0], [38.0, 14.0], [30.0, 32.5],
      [27.0, 34.0], [22.0, 38.0], [12.0, 43.0], [20.0, 57.0],
      [18.8, 72.8],
    ],
  },
];

// =============================================================================
// EMPIRE CONFIG
// =============================================================================

export const britishEmpire: EmpireConfig = {
  id: "british_empire",
  name: {
    sv: "Det Brittiska Imperiet",
    en: "The British Empire",
    tr: "İngiliz İmparatorluğu",
  },
  theme: "british",
  appTitle: "British Empire Intelligence",
  crestImage: britishLogo,
  backgroundImage: britishBackground,
  leaderTitle: { sv: "Monark", en: "Monarch", tr: "Hükümdar" },
  dynastyTitle: {
    sv: "Brittisk Dynasti",
    en: "British Dynasty",
    tr: "İngiliz Hanedanı",
  },
  timeline: britishTimeline,
  leaders: britishLeaders,
  profiles: britishProfiles,
  figures: [],
  quizQuestions: britishQuizQuestions,
  badges: britishBadges,
  territories: britishTerritories,
  tradeRoutes: britishTradeRoutes,
  mapCenter: [20, 0],
  mapZoom: 2,
  yearRange: [1497, 1997],
  yearDefault: 1850,
  chatSystemContext:
    "the British Empire (1497–1997). You are an expert on British imperial history covering the Tudor monarchs, the Elizabethan golden age, the English Civil War, the Glorious Revolution, the East India Company, the Industrial Revolution, the Victorian era, the two World Wars, Indian independence and the empire's final dissolution in 1997. Always treat historical figures with scholarly accuracy and acknowledge both the empire's achievements and its profound harms.",
  chatPlaceholders: {
    sv: "Ställ en fråga om det brittiska imperiet...",
    en: "Ask a question about the British Empire...",
    tr: "İngiliz İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: [
      "Varför lyckades det brittiska imperiet dominera en fjärdedel av världen?",
      "Vilken roll spelade Ostindiska kompaniet i imperiet?",
      "Hur avvecklades det brittiska imperiet efter 1945?",
    ],
    en: [
      "Why did the British Empire manage to dominate a quarter of the world?",
      "What role did the East India Company play in the empire?",
      "How was the British Empire dismantled after 1945?",
    ],
    tr: [
      "İngiliz İmparatorluğu dünyanın dörtte birini neden domine edebildi?",
      "Doğu Hindistan Şirketi imparatorlukta ne rol oynadı?",
      "İngiliz İmparatorluğu 1945 sonrasında nasıl çözüldü?",
    ],
  },
  homeDescription: {
    sv: "Utforska det brittiska imperiets historia (1497–1997) — från Tudors till Hongkongs återlämnande, ett imperium där solen aldrig gick ned.",
    en: "Explore British Empire history (1497–1997) — from the Tudors to the Hong Kong handover, an empire where the sun never set.",
    tr: "İngiliz İmparatorluğu tarihini (1497–1997) keşfedin — Tudorlar'dan Hong Kong devrine, güneşin hiç batmadığı bir imparatorluk.",
  },
  mapTitle: {
    sv: "Det brittiska imperiets territorium",
    en: "British Empire Territory",
    tr: "İngiliz İmparatorluğu Toprakları",
  },
};
