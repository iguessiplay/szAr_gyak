const QUESTION_BANK = [
  {
    id: "control-flow-firing",
    topic: "Vezérlésáramlás",
    type: "truefalse",
    title: "Mikor hajtható végre egy művelet a vezérlésáramlásos modellben?",
    prompt: "Jelöld az igaz állításokat.",
    statements: [
      { text: "Amikor odaér az egyik vezérlő token, feltéve hogy több vezérlő token van.", answer: false },
      { text: "Amikor az összes vezérlő token odaér, feltéve hogy több vezérlő token van.", answer: true },
      { text: "Amikor legalább egy operandusa rendelkezésre áll, feltéve hogy több operandusa van.", answer: false },
      { text: "Amikor minden operandusa rendelkezésre áll, feltéve hogy több operandusa van.", answer: true }
    ],
    explanation: "A vezérlésáramlásos modellben a művelet akkor indulhat, ha a szükséges vezérlési feltétel és az összes szükséges operandus rendelkezésre áll."
  },
  {
    id: "pcie-properties",
    topic: "Periféria illesztés",
    type: "truefalse",
    title: "Mely tulajdonságok jellemzik a PCI Express-t?",
    prompt: "Válaszd ki az igaz/hamis értékeket.",
    statements: [
      { text: "Soros átvitelt használ.", answer: true },
      { text: "Rejtett, párhuzamos arbitrációt használ.", answer: false },
      { text: "Osztott közeg, busz alapú átvitelt használ.", answer: false },
      { text: "A PCI Express perifériák képesek interruptot kiváltani.", answer: true }
    ],
    explanation: "A PCIe pont-pont, soros összeköttetésekre épül, nem klasszikus osztott buszra. Interrupt továbbítására természetesen képes."
  },
  {
    id: "dram-basic",
    topic: "Memória",
    type: "truefalse",
    title: "Mely állítások igazak a DRAM memóriára?",
    prompt: "Jelöld az igaz állításokat.",
    statements: [
      { text: "Tartalmát rendszeresen frissíteni kell.", answer: true },
      { text: "A tápellátás megszűnésével a tárolt adatok elvesznek.", answer: true },
      { text: "Az SRAM-hoz képest gyorsabb az írás és olvasás művelete.", answer: false },
      { text: "A cache memória alapja.", answer: false }
    ],
    explanation: "A DRAM kondenzátorokban tárol, ezért frissítést igényel és volatilis. A cache tipikusan SRAM-ból épül."
  },
  {
    id: "tlb-hardware-managed",
    topic: "Virtuális memória / TLB",
    type: "truefalse",
    title: "Hardver által menedzselt TLB esetén mi a hardver feladata?",
    prompt: "Jelöld az igaz állításokat.",
    statements: [
      { text: "A TLB hiba feloldása a laptábla bejárásával.", answer: true },
      { text: "Az érintett lap betöltése háttértárról, ha lapcsere szükséges.", answer: false },
      { text: "Áldozatválasztás a fizikai memóriában tárolt lapok közül, ha lapcsere szükséges.", answer: false },
      { text: "A virtuális címből a fizikai cím előállítása.", answer: true }
    ],
    explanation: "A hardver bejárhatja a laptáblát és elvégezheti a címfordítást. A háttértáras lapcsere és áldozatválasztás az operációs rendszer feladata."
  },
  {
    id: "bus-point-matrix",
    topic: "Periféria illesztés",
    type: "matrix",
    title: "Busz alapú és pont-pont periféria illesztés",
    prompt: "Döntsd el, melyik állítás melyik illesztésre igaz.",
    columns: ["Busz alapú", "Pont-pont"],
    rows: [
      { label: "Üzenetszórás hatékonyan megvalósítható", answers: [true, false] },
      { label: "Könnyen bővíthető", answers: [true, false] },
      { label: "Arbitráció szükséges", answers: [true, false] },
      { label: "Új eszköz illesztésével nem változik a többi sávszélessége", answers: [false, true] }
    ],
    explanation: "Busznál az osztott közeg miatt egyszerű a broadcast és kell arbitráció. Pont-pont kapcsolatoknál egy új eszköz kevésbé veszi el mások közvetlen sávszélességét."
  },
  {
    id: "cache-vivt-pipt",
    topic: "Cache",
    type: "matrix",
    title: "Virtuálisan indexelt/tagelt és fizikailag indexelt/tagelt cache",
    prompt: "A két cache-szervezés tulajdonságait jelöld.",
    columns: ["Fizikai index, fizikai tag", "Virtuális index, virtuális tag"],
    rows: [
      { label: "Nagyobb méretű fizikai memória használatát támogatja", answers: [true, true] },
      { label: "A címfordítás bizonyos esetekben elhagyható", answers: [false, true] },
      { label: "Tipikusan hosszabbak a cache tag-ek", answers: [false, true] }
    ],
    explanation: "Virtuális cache-nél a hozzáféréshez nem mindig kell előbb fizikai cím, viszont a virtuális címterek miatt a tagek tipikusan hosszabbak/problémásabbak lehetnek."
  },
  {
    id: "raid-parity",
    topic: "RAID",
    type: "number",
    title: "RAID paritásadatok",
    prompt: "Egy 8 lemezből álló RAID tömbben hány lemez tárol paritásadatokat?",
    fields: [
      { label: "RAID 1, kétszeres redundanciával", answer: 0, suffix: "lemez" },
      { label: "RAID 0", answer: 0, suffix: "lemez" }
    ],
    explanation: "A RAID 0 nem redundáns. A RAID 1 tükrözést használ, nem paritást, ezért paritáslemezek száma 0."
  },
  {
    id: "nand-transistors",
    topic: "SSD / NAND",
    type: "number",
    title: "NAND flash cellák",
    prompt: "Hány tranzisztor szükséges 24 bit tárolásához SLC, MLC és QLC esetén?",
    fields: [
      { label: "SLC", answer: 24, suffix: "tranzisztor" },
      { label: "MLC", answer: 12, suffix: "tranzisztor" },
      { label: "QLC", answer: 6, suffix: "tranzisztor" }
    ],
    explanation: "SLC: 1 bit/cella, MLC: 2 bit/cella, QLC: 4 bit/cella. Egy cellát itt egy tranzisztorként kezelünk."
  },
  {
    id: "page-size-arguments",
    topic: "Virtuális memória",
    type: "text",
    title: "Érvek nagyobb és kisebb lapméret mellett",
    prompt: "Írj külön sort a nagyobb és a kisebb lapméret melletti érvekre.",
    keywords: {
      requiredGroups: [
        ["nagyobb", "tlb", "kevesebb", "lapbejegyzés"],
        ["kisebb", "fragmentáció", "pazarlás", "finomabb"]
      ]
    },
    sample: "Nagyobb lapméret: kevesebb laptábla-bejegyzés kell és nagyobb a TLB lefedettsége, ezért kisebb lehet a TLB/laptábla terhelése.\n\nKisebb lapméret: kisebb a belső fragmentáció és kevesebb feleslegesen betöltött adat kerül a memóriába.",
    explanation: "Nagy lap: jobb TLB-lefedettség, kisebb laptábla-overhead. Kis lap: kevesebb belső fragmentáció, pontosabb memóriakezelés."
  },
  {
    id: "dram-fr-fcfs-commands",
    topic: "DRAM",
    type: "dramCommands",
    title: "DRAM FR-FCFS parancssor",
    prompt: "Kezdetben minden sor zárt. Kérések: (12,48), (3,8), (12,8). Add meg a parancsokat sorrendben.",
    expected: [
      ["ACTIVATE", "12"],
      ["READ", "48"],
      ["READ", "8"],
      ["PRECHARGE", ""],
      ["ACTIVATE", "3"],
      ["READ", "8"],
      ["PRECHARGE", ""]
    ],
    explanation: "FR-FCFS először a már nyitott sort használja ki: 12-es sor aktiválása után a két 12-es sorra vonatkozó READ jöhet, majd sorzárás, 3-as sor aktiválása és olvasása."
  },
  {
    id: "dram-ddr3-calc",
    topic: "DRAM",
    type: "number",
    title: "DDR3-1800 számolás",
    prompt: "64 bites adategység, burst méret: 8 adategység, tRP=7, tRCD=7, tCAS=6.",
    fields: [
      { label: "Hanyadik külső órajelben jelenik meg az első adat?", answer: 13, suffix: ". órajel" },
      { label: "Adatátviteli sebesség burst átvitelekor", answer: 14400, suffix: "MB/s" },
      { label: "Belső órajel frekvenciája", answer: 225, suffix: "MHz" }
    ],
    explanation: "Az első adatnál ACTIVATE után tRCD, majd READ után tCAS késleltetés számít: 7+6=13. DDR3-1800 effektív órajel × 8 bájt = 14400 MB/s. Prefetch 8 miatt belső frekvencia 1800/8 = 225 MHz."
  },
  {
    id: "vm-size-calc",
    topic: "Virtuális memória / TLB",
    type: "number",
    title: "Virtuális és fizikai memória mérete",
    prompt: "16 bites virtuális cím, 15 bites fizikai cím, lapméret 4096 bájt.",
    fields: [
      { label: "Virtuális memória mérete", answer: 64, suffix: "kB" },
      { label: "Fizikai memória mérete", answer: 32, suffix: "kB" },
      { label: "4 bejegyzéses TLB lefedettsége", answer: 16384, suffix: "byte" }
    ],
    explanation: "2^16 byte = 64 kB, 2^15 byte = 32 kB. A TLB lefedettség: bejegyzések száma × lapméret = 4 × 4096 = 16384 byte."
  },
  {
    id: "dram-timing-extra",
    topic: "DRAM",
    type: "number",
    title: "DRAM időzítések (kiegészítő)",
    prompt: "tRP=7, tRCD=7, tCAS=6. Hányadik külső órajelben jelenik meg az első adat? Mekkora a burst adatátvitel sebessége? Mekkora a belső órajel?",
    fields: [
      { label: "Első adat megjelenése", answer: 13, suffix: ". órajel" },
      { label: "Adatátviteli sebesség", answer: 14400, suffix: "MB/s" },
      { label: "Belső órajel", answer: 225, suffix: "MHz" }
    ],
    explanation: "ACTIVATE után tRCD, majd READ után tCAS: 7+6=13 ciklus. DDR3-1800 → 1800 MT/s × 8 byte = 14400 MB/s. Prefetch 8 → 1800/8 = 225 MHz belső órajel."
  },
  {
    id: "vm-tlb-advanced",
    topic: "Virtuális memória / TLB",
    type: "text",
    title: "TLB és laptábla állapotváltozás",
    prompt: "Adja meg a TLB és a másodszintű laptáblák állapotváltozását a 4-es és 11-es lapokra történő hivatkozás után (LRU, lapcsere, invalidálás figyelembevételével)!",
    keywords: {
      requiredGroups: [
        ["tlb", "bejegyzés", "frissül", "lru", "csere"],
        ["lapcsere", "invalid", "memória", "áldozat"]
      ]
    },
    sample: "TLB: a hivatkozott lap bekerül vagy frissül, LRU szerint frissítve.\nLaptábla: szükség esetén lapcsere történik, az áldozat lap invalidálódik, és az új lap bejegyzése érvényes lesz.",
    explanation: "TLB esetén LRU alapján történik a csere. Ha lapcsere történik a fizikai memóriában, a hozzá tartozó TLB bejegyzést invalidálni kell."
  },
  {
    id: "dram-fr-fcfs-commands-v2",
    topic: "DRAM",
    type: "dramCommands",
    title: "DRAM FR-FCFS parancssor (nyitott sorral)",
    prompt: "Kezdetben a 8-as sor nyitott. Kérések: (9,24), (8,16), (12,8). Add meg a parancsokat FR-FCFS szerint, az utolsó után ne zárd a sort.",
    expected: [
      ["READ", "16"],
      ["PRECHARGE", ""],
      ["ACTIVATE", "9"],
      ["READ", "24"],
      ["PRECHARGE", ""],
      ["ACTIVATE", "12"],
      ["READ", "8"]
    ],
    explanation: "Először a nyitott 8-as sorból szolgálunk ki (READ 16), majd sorzárás, 9 aktiválása és olvasása, majd 12-es sor. Az utolsó után nem zárunk."
  },
  {
    id: "truefalse-models-alt",
    topic: "Architektúra modellek",
    type: "truefalse",
    title: "Adatáramlásos és igényvezérelt modell (variáns)",
    prompt: "Jelöld az igaz állításokat.",
    statements: [
      { text: "Az igényvezérelt modell az egyes műveleteket a programozó által megadott sorrendben hajtja végre", answer: false },
      { text: "Az igényvezérelt modell csak a szükséges műveleteket hajtja végre", answer: true },
      { text: "Az adatáramlásos modell nem feltétlenül a programozó által megadott sorrendben hajt végre", answer: true },
      { text: "Mindkettő jól alkalmazható párhuzamos feladatokra", answer: true }
    ],
    explanation: "Demand-driven: csak a szükséges részeket értékeli ki. Dataflow: adatok rendelkezésre állásakor fut, nem fix sorrendben."
  },
  {
    id: "write-policy-matrix-alt",
    topic: "Cache",
    type: "matrix",
    title: "Write through vs Write back (variáns)",
    prompt: "Jelöld, melyik állítás melyik politikára igaz.",
    columns: ["Write through", "Write back"],
    rows: [
      { label: "A cache minden változást azonnal átvezet a memóriába", answers: [true, false] },
      { label: "Írási műveletekhez nem használja a cache-t", answers: [false, false] },
      { label: "A módosított blokk csak kilökéskor íródik vissza", answers: [false, true] }
    ],
    explanation: "Write-through: azonnali memóriaírás. Write-back: dirty blokk kilökéskor íródik vissza."
  },
  {
    id: "throughput-ddr3-2400",
    topic: "DRAM",
    type: "number",
    title: "DDR3-2400 átvitel számolás",
    prompt: "64 bites busz, burst=8. Add meg az elméleti átviteli sebességet.",
    fields: [
      { label: "Átviteli sebesség", answer: 19200, suffix: "MB/s" }
    ],
    explanation: "2400 MT/s × 8 byte = 19200 MB/s."
  },
  {
    id: "vm-size-calc-alt",
    topic: "Virtuális memória / TLB",
    type: "number",
    title: "Virtuális memória számolás (variáns)",
    prompt: "17 bites virtuális cím, 16 bites fizikai cím, lapméret 8192 bájt. Számold ki.",
    fields: [
      { label: "Virtuális memória", answer: 128, suffix: "kB" },
      { label: "Fizikai memória", answer: 64, suffix: "kB" },
      { label: "TLB lefedettség (4 bejegyzés)", answer: 32768, suffix: "byte" }
    ],
    explanation: "2^17=128kB, 2^16=64kB, 4×8192=32768B."
  },
  {
    id: "distributed-arbitration-alt",
    topic: "Periféria illesztés",
    type: "text",
    title: "Elosztott arbitráció – előny",
    prompt: "Mi az elosztott arbitráció előnye a centralizált megoldással szemben?",
    keywords: {
      requiredGroups: [
        ["nincs központ", "hiba", "skálázható"],
        ["elosztott", "párhuzamos"]
      ]
    },
    sample: "Nincs központi vezérlő, ezért nincs egyetlen hibapont és jobban skálázható.",
    explanation: "Elosztott: nincs single point of failure, jobb skálázás."
  }
  ,
  {
    id: "dataflow-properties-alt-2",
    topic: "Architektúra modellek",
    type: "truefalse",
    title: "Adatáramlásos információfeldolgozási modell tulajdonságai",
    prompt: "Az alábbiak közül mely tulajdonságok teljesülnek az adatáramlásos információfeldolgozási modellre?",
    statements: [
      { text: "A párhuzamos műveletek leírására a FORK-JOIN primitíveket használja", answer: false },
      { text: "A C programozási nyelv erre a modellre épít", answer: false },
      { text: "Nem hajt végre utasítást addig, amíg az eredményére szükség nem lesz", answer: false },
      { text: "A problémát egy precedenciagráf bejárásával oldja meg", answer: true }
    ],
    explanation: "Az adatáramlásos modellben a végrehajtást az adatok rendelkezésre állása és a műveletek közötti függőségek határozzák meg. Nem C-szerű szekvenciális vezérlés, és nem az igényvezérelt modellre jellemző 'csak akkor, ha szükség lesz az eredményre' elvet követi."
  },
  {
    id: "usb-peripheral-initiates-transfer",
    topic: "USB",
    type: "truefalse",
    title: "USB periféria által kezdeményezhető adatátvitel",
    prompt: "Egy USB periféria a számítógép mely szereplője/szereplői felé kezdeményezhet adatátvitelt?",
    statements: [
      { text: "A CPU felé", answer: false },
      { text: "A memória felé", answer: false },
      { text: "Egy másik USB periféria felé", answer: false },
      { text: "A root hub felé", answer: true }
    ],
    explanation: "USB-ben a kommunikációt a host/root hub oldala ütemezi és kezdeményezi, a periféria önállóan nem indít adatátvitelt sem a CPU, sem a memória, sem másik USB periféria felé."
  },
  {
    id: "dram-properties-alt-2",
    topic: "Memória",
    type: "truefalse",
    title: "DRAM memória tulajdonságai (variáns)",
    prompt: "Mely állítások igazak a DRAM memóriára?",
    statements: [
      { text: "Egy bit tárolásához 6 kondenzátor és 1 tranzisztor szükséges", answer: false },
      { text: "Az SRAM-hoz képest kisebb a teljesítményfelvétele", answer: true },
      { text: "Az SRAM-hoz képest gyorsabb az írás és olvasás művelete", answer: false },
      { text: "Az SRAM-hoz képest kisebb a tárolási kapacitása", answer: false }
    ],
    explanation: "A DRAM cella tipikusan 1 tranzisztorból és 1 kondenzátorból áll. Az SRAM gyorsabb, de nagyobb cellaméretű és általában nagyobb fogyasztású; a DRAM nagyobb kapacitássűrűséget ad."
  },
  {
    id: "cache-vivt-pipt-alt-2",
    topic: "Cache",
    type: "matrix",
    title: "Virtuális index/tag és fizikai index/tag cache-ek",
    prompt: "Mely tulajdonságok igazak a virtuálisan indexelt, virtuális tag-eket használó, valamint a fizikailag indexelt, fizikai tag-eket használó cache-ekre?",
    columns: ["fizikai index, fizikai tag", "virtuális index, virtuális tag"],
    rows: [
      { label: "Nagyobb méretű fizikai memória használatát támogatja", answers: [true, true] },
      { label: "A címfordítás bizonyos esetekben elhagyható", answers: [false, true] },
      { label: "Hosszabbak a cache tag-ek (feltéve, hogy nincs PAE)", answers: [false, true] }
    ],
    explanation: "Virtuális index/tag esetén a cache-kereséshez bizonyos esetekben nem kell előbb fizikai címre fordítani. A virtuális tag hossza a virtuális címből származik, ezért tipikusan hosszabb lehet."
  },
  {
    id: "hdd-capacity-alt-2",
    topic: "Háttértár",
    type: "number",
    title: "Merevlemez kapacitás számítása",
    prompt: "Egy merevlemez 2 db lemezt tartalmaz, melyek mindkét oldalán van adathordozó réteg. Minden adathordozó rétegen 120000 sáv található, minden sávban 1500 szektorral. A szektorok mérete 500 bájt. Add meg a merevlemez kapacitását bájtban!",
    fields: [
      { label: "Méret", answer: 360, suffix: "· 10^9 byte" }
    ],
    explanation: "2 lemez × 2 oldal × 120000 sáv × 1500 szektor × 500 byte = 360000000000 byte = 360 · 10^9 byte."
  },
  {
    id: "nand-floating-gate-bits-alt-2",
    topic: "SSD / NAND",
    type: "number",
    title: "Lebegő gate-es tranzisztorok tárolókapacitása",
    prompt: "Ha van 12 lebegő gate-es tranzisztorunk, hány bitet tudunk tárolni velük egy SLC-t, MLC-t, illetve TLC-t használó NAND flash alapú SSD meghajtón?",
    fields: [
      { label: "SLC esetben", answer: 12, suffix: "bit" },
      { label: "MLC esetben", answer: 24, suffix: "bit" },
      { label: "TLC esetben", answer: 36, suffix: "bit" }
    ],
    explanation: "SLC: 1 bit/cella, MLC: 2 bit/cella, TLC: 3 bit/cella. 12 cellával rendre 12, 24, illetve 36 bit tárolható."
  },
  {
    id: "two-level-interrupt-handling-alt-2",
    topic: "Megszakításkezelés",
    type: "text",
    title: "Kétszintű interrupt kezelés 4 processzoros rendszerben",
    prompt: "Van egy 4 processzoros rendszerünk, mely kétszintű interrupt kezelést támogat. Az első sorba írd le, hogy mi a perifériák felől beérkező megszakítást első szinten feldolgozó egység neve, valamint hogy mennyi van belőlük a teljes rendszerben. A második sorba pedig azt, hogy mi a megszakítást második szinten feldolgozó eszköz neve, és hány van belőlük a teljes rendszerben.",
    keywords: {
      requiredGroups: [
        ["pic", "4"],
        ["processzor", "4"]
      ]
    },
    sample: "PIC 4\nprocesszor 4",
    explanation: "Kétszintű megszakításkezelésnél az első szinten a PIC-ek gyűjtik/kezelik a perifériák megszakításait, majd a processzorok felé továbbítják. 4 processzoros rendszerben a feladat Moodle-megoldása szerint 4 PIC és 4 processzor szerepel."
  },
  {
    id: "drone-polling-load-alt-2",
    topic: "Processzor / Polling",
    type: "number",
    title: "Kvadrokopter polling terhelés számítása",
    prompt: "Egy kvadrokopter vezérlője 200 MHz órajelfrekvenciával működik. A vezérlőciklus 16 kHz, a szenzorok egyszeri lekérdezése 800 órajelet vesz igénybe. A rotorok vezérlőjelének kiszámítása ciklusonként 10000 órajelet igényel.",
    fields: [
      { label: "Hány mikrosecundumonként kérdezi le a szenzorokat?", answer: 62.5, suffix: "µs" },
      { label: "Polling relatív terhelése", answer: 6.4, suffix: "%" },
      { label: "Rotorvezérlésre fordított órajelek másodpercenként", answer: 160, suffix: "·10^6 órajel" },
      { label: "Legfeljebb hány szenzor kezelése fér bele?", answer: 3, suffix: "szenzor" }
    ],
    explanation: "16 kHz periódusideje 1/16000 s = 62,5 µs. Polling: 16000 × 800 = 12,8 millió ciklus/s, ez 200 millióhoz képest 6,4%. Rotorvezérlés: 16000 × 10000 = 160 millió ciklus/s. Marad 40 millió ciklus/s, egy szenzor pollingja 12,8 millió ciklus/s, ezért legfeljebb 3 szenzor fér bele."
  },
  {
    id: "vm-tlb-advanced-alt-2",
    topic: "Virtuális memória / TLB",
    type: "number",
    title: "Virtuális tárkezelés és TLB számolás (17/15 bit)",
    prompt: "Egy virtuális tárkezelésre képes processzor 17 bites virtuális és 15 bites fizikai címeket támogat. A lapméret 8192 bájt (=2^13). A címfordításhoz kétszintű laptáblát használ, valamint egy 2 bejegyzéses, LRU algoritmussal menedzselt teljesen asszociatív TLB-t.",
    fields: [
      { label: "Virtuális memória mérete", answer: 128, suffix: "kB" },
      { label: "Fizikai memória mérete", answer: 32, suffix: "kB" },
      { label: "TLB lefedettség", answer: 16384, suffix: "byte" }
    ],
    explanation: "17 bites virtuális címtér: 2^17 byte = 128 kB. 15 bites fizikai címtér: 2^15 byte = 32 kB. 2 TLB bejegyzés × 8192 byte = 16384 byte."
  }
  ,
  {
    id: "raid5-properties-alt-3",
    topic: "RAID",
    type: "truefalse",
    title: "RAID-5 tulajdonságai",
    prompt: "Mely állítások igazak a RAID-5-re?",
    statements: [
      { text: "N diszknyi adatot N+2 diszken tárolunk", answer: false },
      { text: "Kellően nagy mennyiségű adatra vonatkozó olvasási művelet gyorsabb vele, mint egyetlen diszkkel", answer: true },
      { text: "Az írási és olvasási műveletek sebessége azonos", answer: false },
      { text: "Visszaállítás közben fellépő újabb hiba ellen nem véd", answer: true }
    ],
    explanation: "RAID-5 elosztott paritást használ, egy lemezhibát visel el. Nagyobb olvasásoknál párhuzamosan több diszkről olvashat, ezért gyorsabb lehet. Nem N+2 diszken tárol N diszknyi adatot, és rebuild közben egy újabb hiba már adatvesztést okozhat."
  },
  {
    id: "cisc-properties-alt-3",
    topic: "Utasításkészletek",
    type: "truefalse",
    title: "CISC utasításkészletek jellemzői",
    prompt: "Az alábbiak közül melyek a CISC utasításkészletek jellemzői?",
    statements: [
      { text: "Túlságosan nagy méretű futtatható (bináris) file-ok", answer: false },
      { text: "Nagy számú, alacsony szinten kényelmesen használható utasítás", answer: true },
      { text: "Nagy számú, különféle típusú regiszter", answer: false },
      { text: "Redundanciamentesség", answer: false }
    ],
    explanation: "CISC-nél jellemző a sok, komplex és alacsony szinten kényelmes utasítás. Nem a redundanciamentes, kevés és egyszerű utasításkészlet a lényeg, és nem a sokféle regiszter a fő jellemző."
  },
  {
    id: "usb-isochronous-alt-3",
    topic: "USB",
    type: "truefalse",
    title: "USB izokron adatátvitel",
    prompt: "Mely állítások teljesülnek az USB izokron adatátviteli módjára?",
    statements: [
      { text: "Az USB rendszer garantálja a hibamentes átvitelt", answer: false },
      { text: "Az adatok minden keretben garantáltan helyet kapnak a keret méretének 90%-áig", answer: true },
      { text: "Az adatok minden keretben garantáltan helyet kapnak a keret méretének 10%-áig", answer: false },
      { text: "Csak kimeneti irányultsága lehet", answer: false }
    ],
    explanation: "Az izokron USB átvitel időzítést/sávszélességet garantál, de hibamentességet nem. Nem csak kimeneti irányú lehet."
  },
  {
    id: "n-way-set-associative-cache-alt-3",
    topic: "Cache",
    type: "truefalse",
    title: "n-utas asszociatív cache szervezés",
    prompt: "Mely állítások igazak az n-utas asszociatív cache szervezésre?",
    statements: [
      { text: "n db azonos indexű blokkot tud tárolni", answer: true },
      { text: "n féle különböző indexet különböztet meg", answer: false },
      { text: "A cache tag-ek rövidebbek, mint a direkt leképzés esetén", answer: false },
      { text: "Kereséskor n komparátor működik egyszerre", answer: true }
    ],
    explanation: "n-utas asszociatív cache-ben egy indexhez n lehetséges way tartozik, ezért az adott setben n blokk lehet, és kereséskor ezek tagjeit párhuzamosan, n komparátorral hasonlítjuk."
  },
  {
    id: "daisy-chain-pic-interrupt-alt-3",
    topic: "Megszakításkezelés",
    type: "matrix",
    title: "Daisy chain és PIC alapú interrupt kezelés",
    prompt: "Mely állítások igazak a Daisy chain alapú és a PIC (programozható interrupt vezérlő) alapú interrupt kezelésre?",
    columns: ["Daisy chain alapú interrupt kezelés", "PIC alapú interrupt kezelés"],
    rows: [
      { label: "Körbenforgó interrupt kiszolgálás megvalósítható", answers: [false, true] },
      { label: "Az eszközök prioritása nem változtatható", answers: [true, false] },
      { label: "Tetszőlegesen bővíthető", answers: [true, false] },
      { label: "Nem működik, ha egyidejűleg több eszköz is jelez interruptot", answers: [false, false] }
    ],
    explanation: "Daisy chain esetén a fizikai sorrend adja a prioritást, ezért az nem rugalmasan változtatható. PIC esetén programozható prioritás és körbenforgó kiszolgálás is megvalósítható."
  },
  {
    id: "parallel-parts-marking-alt-3",
    topic: "Architektúra modellek",
    type: "matrix",
    title: "Párhuzamosítható részek jelzése programban",
    prompt: "Hogyan kell jelezni a programban a párhuzamosítható részeket?",
    columns: ["Vezérlésáramlásos modell", "Adatáramlásos modell", "Igényvezérelt modell"],
    rows: [
      { label: "A programot leíró precedenciagráfban a programozó megjelöli, hogy mely csomópontokhoz tartozó műveletek hajthatók végre párhuzamosan", answers: [false, false, false] },
      { label: "Explicit FORK/JOIN primitívekkel", answers: [true, false, false] },
      { label: "Sehogy nem kell jelezni", answers: [false, true, true] }
    ],
    explanation: "Vezérlésáramlásos modellben explicit fork/join jelölés szükséges. Adatáramlásos és igényvezérelt modellben a függőségek/igények alapján adódik a párhuzamosság."
  },
  {
    id: "transistor-storage-bits-alt-3",
    topic: "Memória",
    type: "number",
    title: "Hány bit tárolható 8 tranzisztorral?",
    prompt: "Hány bitet tudunk tárolni 8 tranzisztor segítségével?",
    fields: [
      { label: "DDR-SDRAM esetén", answer: 8, suffix: "bit" },
      { label: "DDR3-SDRAM esetén", answer: 8, suffix: "bit" },
      { label: "2 bites MLC flash memória", answer: 16, suffix: "bit" }
    ],
    explanation: "DRAM/SDRAM esetén itt 1 tranzisztorhoz 1 bitet veszünk. 2 bites MLC flash esetén egy cella 2 bitet tárol, ezért 8 tranzisztorral 16 bit tárolható."
  },
  {
    id: "conditional-jump-instruction-count-alt-3",
    topic: "Utasításkészletek",
    type: "number",
    title: "Feltételes ugrás leírásához szükséges utasítások",
    prompt: "A programunk ugrani szeretne, ha R1>0. Hány utasítás kell ennek leírására, ha az utasításkészlet architektúra külön kezeli a feltétel kiértékelést és az ugrást?",
    fields: [
      { label: "Feltétel kódot beállít", answer: 2, suffix: "utasítás" },
      { label: "Feltétel regisztereket használ", answer: 2, suffix: "utasítás" },
      { label: "Összehasonlít & ugrik utasítást tartalmaz", answer: 1, suffix: "utasítás" }
    ],
    explanation: "Ha külön kell összehasonlítani és külön ugrani, akkor 2 utasítás kell. Ha van compare-and-branch jellegű utasítás, akkor egyetlen utasítás is elég."
  },
  {
    id: "write-amplification-alt-3",
    topic: "SSD / NAND",
    type: "text",
    title: "Write amplification jelentése",
    prompt: "Mit jelent a NAND flash alapú SSD meghajtókban a 'write amplification' (többletírás) jelensége?",
    keywords: {
      requiredGroups: [
        ["több", "írás", "fizikai"],
        ["logikai", "ssd", "nand"]
      ]
    },
    sample: "Azt jelenti, hogy a vezérlőnek több fizikai adatot kell kiírnia a NAND flashre, mint amennyi logikai adatot a felhasználó vagy az operációs rendszer írni szeretne.",
    explanation: "NAND flashnél törlési blokkok, garbage collection és wear leveling miatt egy kis logikai írás több belső fizikai írást okozhat."
  },
  {
    id: "disk-service-time-alt-3",
    topic: "Háttértár",
    type: "number",
    title: "Merevlemez kiszolgálási idő és átviteli sebesség",
    prompt: "Egy merevlemez 3 db kétoldalas lemezt tartalmaz, mindegyiken 80000 sáv található, minden sávban 1500 szektorral. A szektorok mérete 500 bájt, ZBR nincs. Forgási sebesség 5000 RPM. Parancsfeldolgozási idő 0,416 ms, átlagos seek idő 9,5 ms, interfészsebesség 125·10^6 bájt/s.",
    fields: [
      { label: "Forgási sebesség", answer: 5000, suffix: "RPM" },
      { label: "5000 bájtos kérés átlagos kiszolgálási ideje", answer: 16, suffix: "ms" },
      { label: "Diszk átviteli sebessége", answer: 62500000, suffix: "bájt/s" }
    ],
    explanation: "A forgási késleltetés átlaga fél fordulat. 5000 RPM esetén egy fordulat 12 ms, átlagosan 6 ms. 0,416+9,5+6+átviteli idő ≈ 16 ms. A diszk átviteli sebessége: 750000 × 83.333 = 62 500 000 byte/s."
  },
  {
    id: "virtual-memory-hierarchical-alt-3",
    topic: "Virtuális memória / TLB",
    type: "number",
    title: "Hierarchikus laptábla számolások",
    prompt: "Legyenek a virtuális címek 20 bitesek, a fizikai címek 15 bitesek, a lapméret 2^11=2kB. Használjunk 3 szintű hierarchikus laptáblát, ahol a laptáblák mérete minden szinten egyforma, a laptábla bejegyzések 16 bitesek.",
    fields: [
      { label: "Hány lapból áll a virtuális memória", answer: 512, suffix: "lap" },
      { label: "Hány keretből áll a fizikai memória", answer: 16, suffix: "keret" },
      { label: "Hány bejegyzést tartalmaz egy másodszintű laptábla", answer: 8, suffix: "bejegyzés" },
      { label: "TLB hiba esetén memóriaművelet legrosszabb esetben", answer: 3, suffix: "művelet" },
      { label: "TLB hiba esetén memóriaművelet legjobb esetben", answer: 3, suffix: "művelet" },
      { label: "Összes laptábla összegzett mérete", answer: 1168, suffix: "bájt" },
      { label: "Optimális körülmények között minimális laptábla memória", answer: 48, suffix: "bájt" },
      { label: "3. szintű helyett egyszintű laptábla mérete", answer: 1024, suffix: "bájt" },
      { label: "4 bejegyzéses TLB lefedettsége", answer: 8192, suffix: "bájt" }
    ],
    explanation: "Virtuális lapok: 2^20 / 2^11 = 512. Fizikai keretek: 2^15 / 2^11 = 16. Egy bejegyzés 2 bájt, a Moodle-megoldás szerinti további eredmények: 8 bejegyzés/laptábla, 1168 bájt összesen, minimum 48 bájt, egyszintűként 1024 bájt, TLB lefedettség 4×2kB=8192 bájt."
  }
  ,
  {
    id: "sram-properties-alt-5",
    topic: "Memória",
    type: "truefalse",
    title: "SRAM memória tulajdonságai (variáns)",
    prompt: "Mely állítások igazak az SRAM memóriára?",
    statements: [
      { text: "Egy bit tárolásához 6 kondenzátor szükséges", answer: false },
      { text: "A cache memória alapja", answer: true },
      { text: "A tápellátás megszűnésével a tárolt adatok elvesznek", answer: true },
      { text: "Tartalmát periodikusan frissíteni kell", answer: false }
    ],
    explanation: "Az SRAM tipikusan 6 tranzisztoros cellákból épül, kondenzátoros tárolást és periodikus frissítést nem igényel. Volatilis, ezért táp nélkül elveszti a tartalmát, és gyorsasága miatt cache alapja."
  },
  {
    id: "pci-arbitration-types-alt-5",
    topic: "Periféria illesztés",
    type: "truefalse",
    title: "PCI arbitrációs eljárások",
    prompt: "Milyen arbitrációt használ a PCI?",
    statements: [
      { text: "Centralizált arbitrációt", answer: true },
      { text: "Párhuzamos arbitrációt", answer: true },
      { text: "Önkiválasztó arbitrációt", answer: false },
      { text: "Ütközésdetektáláson alapuló arbitrációt", answer: false }
    ],
    explanation: "A PCI buszhoz központi buszarbiter tartozik, a felsorolt megfogalmazások közül a Moodle-válasz szerint csak 2 igaz ebben a formában."
  },
  {
    id: "cache-prefetch-goal-alt-5",
    topic: "Cache",
    type: "truefalse",
    title: "Memóriablokkok idő előtti cache-be töltésének célja",
    prompt: "Mi a memóriablokkok idő előtti cache-be töltésének célja?",
    statements: [
      { text: "A cache hibák számának csökkentése", answer: true },
      { text: "Hogy egy memória blokkot a rendszermemória megkerülésével tudjunk a cache-be betölteni", answer: false },
      { text: "Hogy a blokk még azelőtt a cache memóriába kerüljön, mielőtt először meghivatkoznánk", answer: true },
      { text: "Hogy ne kerülhessen a cache-be olyan blokk, amit betöltése után sohasem hivatkoznak", answer: false }
    ],
    explanation: "A prefetch célja, hogy a várhatóan később használt blokk már a tényleges hivatkozás előtt cache-ben legyen, így csökkenhet a cache miss-ek száma."
  },
  {
    id: "raid5-properties-alt-5",
    topic: "RAID",
    type: "truefalse",
    title: "RAID-5 tulajdonságai (variáns)",
    prompt: "Mely állítások igazak a RAID-5-re?",
    statements: [
      { text: "N diszknyi adatot N+1 diszken tárolunk", answer: true },
      { text: "Az írási és olvasási műveletek sebessége azonos", answer: false },
      { text: "Kellően nagy mennyiségű adatra vonatkozó olvasási művelet gyorsabb vele, mint egyetlen diszkkel", answer: true },
      { text: "Visszaállítás közben fellépő újabb hiba ellen is véd", answer: false }
    ],
    explanation: "RAID-5 egy paritásnyi redundanciát használ, ezért N adatdiszknyi kapacitáshoz N+1 diszk kell. Olvasás párhuzamosítható, de rebuild közbeni második hiba ellen nem véd."
  },
  {
    id: "pipeline-store-mul-alt-5",
    topic: "Processzor / Pipeline",
    type: "matrix",
    title: "Store és Mul utasítás fázisai pipeline-ban",
    prompt: "A tanult 5 fázisú pipeline-ban mely fázisok nem végeznek tényleges munkát a Store és a Mul utasítás végrehajtásakor?",
    columns: ["Store", "Mul"],
    rows: [
      { label: "ID", answers: [false, false] },
      { label: "MEM", answers: [false, true] },
      { label: "WB", answers: [true, false] },
      { label: "EX", answers: [false, false] }
    ],
    explanation: "Store esetén nincs regiszter-visszaírás, ezért WB nem végez érdemi munkát. Mul esetén a klasszikus pipeline-modellben nincs memóriahozzáférés, ezért MEM nem végez érdemi munkát."
  },
  {
    id: "architecture-comparison-alt-5",
    topic: "Architektúra modellek",
    type: "matrix",
    title: "Neumann, Harvard és módosított Harvard architektúra",
    prompt: "Mely tulajdonság mely architektúrára jellemző?",
    columns: ["Neumann architektúra", "Harvard architektúra", "Módosított Harvard architektúra"],
    rows: [
      { label: "Az adatok és az utasítások külön memóriában vannak", answers: [false, true, true] },
      { label: "Az adatmemória tartalma a programból módosítható", answers: [true, true, true] },
      { label: "Egy adat kiolvasása közben, azzal egy időben a következő utasítást is ki tudja olvasni", answers: [false, true, true] }
    ],
    explanation: "Neumann architektúrában közös memória/busz van, Harvard és módosított Harvard esetén az utasítás- és adatút különválhat, így párhuzamos hozzáférés lehetséges."
  },
  {
    id: "parallel-bus-frequency-alt-5",
    topic: "Periféria illesztés",
    type: "text",
    title: "Párhuzamos busz korlátozott frekvenciája",
    prompt: "Mi az oka annak, hogy nagyon nagy órajel frekvencia mellett a párhuzamos busz kevésbé alkalmas adatátvitelre, mint a soros?",
    keywords: {
      requiredGroups: [
        ["eltérés", "skew", "időzítés", "vezeték"],
        ["nagy", "frekvencia", "párhuzamos"]
      ]
    },
    sample: "Nagy frekvencián a párhuzamos vezetékeken a jelek kicsit eltérő késleltetéssel érkeznek meg (skew), ezért nehéz őket egyszerre, hibamentesen mintavételezni. Soros átvitelnél kevesebb jelvonalat kell összehangolni.",
    explanation: "Párhuzamos busznál sok jelvezeték időzítését kell egyszerre tartani; nagy frekvencián a vezetékek közötti késleltetéskülönbség problémássá válik."
  },
  {
    id: "tlb-coverage-2kb-128-alt-5",
    topic: "Virtuális memória / TLB",
    type: "number",
    title: "TLB lefedettség 2 kB lapmérettel",
    prompt: "Mekkora a TLB lefedettség 2 kB-os lapméret és 128 bejegyzéses TLB esetén?",
    fields: [
      { label: "A TLB lefedettség", answer: 256, suffix: "kB" }
    ],
    explanation: "128 × 2 kB = 256 kB."
  },
  {
    id: "usb-transfer-types-guaranteed-alt-5",
    topic: "USB",
    type: "text",
    title: "USB hibamentes adatátvitelt garantáló módjai",
    prompt: "Sorolja fel az USB azon adatátviteli módjait, melyekre a rendszer hibamentes adatátvitelt garantál!",
    keywords: {
      requiredGroups: [
        ["bulk"],
        ["interrupt"],
        ["control", "vezérlő", "kontroll"]
      ]
    },
    sample: "bulk\ninterrupt\ncontrol",
    explanation: "USB-ben a control, bulk és interrupt transzferek megbízhatóak. Az isochronous mód sávszélességet/időzítést ad, de nem garantál hibamentes átvitelt."
  },
  {
    id: "dram-ddr-calc-alt-5",
    topic: "DRAM",
    type: "number",
    title: "DDR3/DDR4 órajel és átviteli sebesség számolás",
    prompt: "DRAM technológiai feladat: 64 bites adategység, burst méret 8 adategység. Add meg a hiányzó frekvenciákat és az adatátviteli sebességet.",
    fields: [
      { label: "Belső órajel frekvenciája", answer: 350, suffix: "MHz" },
      { label: "Belső órajel periódusideje", answer: 1, suffix: "órajelperiódus" },
      { label: "Adatátviteli sebesség", answer: 22400, suffix: "MB/s" }
    ],
    explanation: "A Moodle-megoldás szerint a belső frekvencia 350 MHz, az adatátvitel 22400 MB/s. 64 bites egység = 8 byte, ezért 2800 MT/s × 8 byte = 22400 MB/s."
  },
  {
    id: "dram-commands-fcfs-frfcfs-alt-5",
    topic: "DRAM",
    type: "text",
    title: "DRAM FCFS és FR-FCFS parancssor",
    prompt: "Kezdetben a 4-es sor van nyitva. Kérések: (2,16), (4,32), (2,0). Add meg az FCFS és FR-FCFS DRAM parancssorokat, az utolsó parancs után zárd a nyitott sort.",
    keywords: {
      requiredGroups: [
        ["fcfs", "precharge", "activate", "read"],
        ["fr-fcfs", "read", "32"]
      ]
    },
    sample: "FCFS: PRECHARGE; ACTIVATE 2; READ 16; PRECHARGE; ACTIVATE 4; READ 32; PRECHARGE; ACTIVATE 2; READ 0; PRECHARGE",
    explanation: "FR-FCFS először a már nyitott 4-es sor találatát szolgálja ki (READ 32), majd zárja a sort és aktiválja a 2-es sort. FCFS a beérkezési sorrendet követi."
  },
  {
    id: "dram-timing-table-alt-5",
    topic: "DRAM",
    type: "number",
    title: "DRAM késleltetés táblázat",
    prompt: "FCFS ütemezést feltételezve add meg, mennyi idő után jelenik meg a (2. sor, 16. oszlop) kérésre érkező első adat. A késleltetések TCAS-TRCD-TRP formátumban vannak megadva.",
    fields: [
      { label: "DDR2-1000, 6-7-7: órajel", answer: 20, suffix: "órajel" },
      { label: "DDR2-1000, 6-7-7: idő", answer: 40, suffix: "ns" },
      { label: "DDR3-1800, 7-10-10: órajel", answer: 27, suffix: "órajel" },
      { label: "DDR3-1800, 7-10-10: idő", answer: 30, suffix: "ns" },
      { label: "DDR3-3200, 10-12-12: órajel", answer: 34, suffix: "órajel" },
      { label: "DDR3-3200, 10-12-12: idő", answer: 21.25, suffix: "ns" }
    ],
    explanation: "A zárt/nyitott sor állapot és FCFS sorrend miatt a Moodle-megoldás szerinti válaszok: 20 órajel/40 ns, 27 órajel/30 ns, 34 órajel/21,25 ns."
  },
  {
    id: "disk-service-time-alt-5",
    topic: "Háttértár",
    type: "number",
    title: "Merevlemez kiszolgálási idő számolás (variáns)",
    prompt: "Egy merevlemez 4 db kétoldalas lemezt tartalmaz, mindegyiken 200000 sávval, minden sávban 1500 szektorral. Szektorméret: 500 byte, ZBR nincs. Számold ki a megadott mennyiségeket.",
    fields: [
      { label: "Forgási sebesség", answer: 9600, suffix: "RPM" },
      { label: "50000 bájtos kérés átlagos kiszolgálási ideje", answer: 13, suffix: "ms" },
      { label: "IO sebesség", answer: 40, suffix: "IOPS" },
      { label: "Diszk átviteli sebessége", answer: 120000000, suffix: "bájt/s" }
    ],
    explanation: "A Moodle-megoldás szerint a fordulatszám 9600 RPM, az átlagos kiszolgálási idő 13 ms, az IO-sebesség 40 IOPS, az átviteli sebesség pedig 750000 × 160 = 120000000 byte/s."
  },
  {
    id: "two-operand-instructions-alt-5",
    topic: "Utasításkészletek",
    type: "truefalse",
    title: "Kétoperandusú utasítások felismerése",
    prompt: "Az alábbi utasítások közül melyik 2 operandusú?",
    statements: [
      { text: "R1 ← R2 + R3", answer: false },
      { text: "R1 ← R1 + R3", answer: true },
      { text: "ADD R1", answer: false },
      { text: "JUMP -42", answer: false }
    ],
    explanation: "Kétoperandusú műveletnél az egyik operandus gyakran célregiszter is. R1 ← R1 + R3 két forrás/cél operandust használ."
  },
  {
    id: "pcie-properties-alt-5",
    topic: "Periféria illesztés",
    type: "truefalse",
    title: "PCI Express tulajdonságai (variáns)",
    prompt: "Mely tulajdonságok jellemzik a PCI Express-t?",
    statements: [
      { text: "Perifériakezelő utasításokkal nem rendelkező rendszerekben nem megvalósítható", answer: false },
      { text: "Rejtett, párhuzamos arbitrációt használ", answer: false },
      { text: "A PCI Express perifériák képesek közvetlenül a memóriába adatot írni", answer: true },
      { text: "A PCI Express perifériák képesek interruptot kiváltani", answer: true }
    ],
    explanation: "A PCIe nem klasszikus párhuzamos busz, hanem soros pont-pont összeköttetés. Perifériái DMA-val memóriát írhatnak és interruptot is kiválthatnak."
  },
  {
    id: "daisy-chain-interrupt-alt-5",
    topic: "Megszakításkezelés",
    type: "truefalse",
    title: "Daisy chain alapú interrupt kezelés",
    prompt: "Mely állítások igazak a daisy chain alapú interrupt kezelésre?",
    statements: [
      { text: "Körbenforgó interrupt kiszolgálás megvalósítható", answer: false },
      { text: "Az eszközök prioritása nem változtatható", answer: true },
      { text: "Nem működik, ha egyidejűleg több eszköz is jelez interruptot", answer: false },
      { text: "Elvben tetszőlegesen bővíthető", answer: true }
    ],
    explanation: "Daisy chain esetén az eszközök fizikai sorrendje határozza meg a prioritást, ezért az nem változtatható rugalmasan. Több egyidejű interrupt esetén a lánc sorrendje dönt."
  },
  {
    id: "raid-capacity-5disk-alt-5",
    topic: "RAID",
    type: "number",
    title: "RAID 0 és RAID 6 használható kapacitás",
    prompt: "Mennyi egy 5 db 1 TB kapacitású diszkből álló RAID tömb teljes, felhasználó által hasznosítható tárolási kapacitása?",
    fields: [
      { label: "RAID 0 esetén", answer: 5, suffix: "TB" },
      { label: "RAID 6 esetén", answer: 3, suffix: "TB" }
    ],
    explanation: "RAID 0 minden diszket felhasznál: 5 TB. RAID 6 két diszknyi paritáskapacitást vesz el: 5-2 = 3 TB."
  },
  {
    id: "usb-reliable-transfer-types-alt-5",
    topic: "USB",
    type: "text",
    title: "USB hibamentes átviteli módok",
    prompt: "Sorolja fel az USB azon adatátviteli módjait, melyekre a rendszer hibamentes adatátvitelt garantál!",
    keywords: {
      requiredGroups: [
        ["bulk"],
        ["interrupt"],
        ["control", "vezérlő", "kontroll"]
      ]
    },
    sample: "bulk\ninterrupt\ncontrol",
    explanation: "A hibamentességet garantáló USB átviteli módok: control, bulk és interrupt."
  },
  {
    id: "pipeline-id-exceptions-alt-5",
    topic: "Processzor / Pipeline",
    type: "truefalse",
    title: "ID fázisban előforduló kivételek",
    prompt: "Mely kivételek fordulhatnak elő az ID fázisban?",
    statements: [
      { text: "Aritmetikai hiba", answer: false },
      { text: "Laphiba", answer: false },
      { text: "Érvénytelen utasítás", answer: true },
      { text: "Védelmi hiba", answer: false }
    ],
    explanation: "ID (instruction decode) fázisban az utasítás dekódolása történik, ezért tipikus kivétel az érvénytelen utasítás. Aritmetikai hiba EX-ben, laphiba memóriacímzéskor jelentkezhet."
  },
  {
    id: "info-processing-model-comparison-alt-5",
    topic: "Architektúra modellek",
    type: "matrix",
    title: "Információfeldolgozási modellek összehasonlítása",
    prompt: "Hasonlítsa össze a három tanult információfeldolgozási modellt!",
    columns: ["Vezérlésáramlásos modell", "Adatáramlásos modell", "Igényvezérelt modell"],
    rows: [
      { label: "A műveletek mindig a programozó által megszabott sorrendben hajtódnak végre", answers: [true, false, false] },
      { label: "A problémát egy precedenciagráf segítségével lehet leírni", answers: [false, true, true] },
      { label: "Nagy párhuzamos rendszerek esetében nem hatékony", answers: [true, false, false] }
    ],
    explanation: "Vezérlésáramlásos modellben a programozó által megadott sorrend dominál. Adatáramlásos és igényvezérelt modellben a függőségi/prece­denciagráf alkalmas leírásra, és ezek jobban párhuzamosíthatók."
  },
  {
    id: "software-managed-tlb-tasks-alt-5",
    topic: "Virtuális memória / TLB",
    type: "matrix",
    title: "Szoftver által menedzselt TLB feladatmegosztás",
    prompt: "A megfelelő összekötésekkel jelezze a hardver és az operációs rendszer feladatait szoftver által menedzselt TLB esetén!",
    columns: ["Az operációs rendszer", "Hardver (MMU) feladata"],
    rows: [
      { label: "Az érintett lap betöltése a háttértárról, ha lapcsere szükséges", answers: [true, false] },
      { label: "A TLB hiba feloldása a laptábla bejárásával", answers: [true, false] },
      { label: "Áldozatválasztás a fizikai memóriában tárolt lapok közül, ha lapcsere szükséges", answers: [true, false] },
      { label: "A virtuális címből a fizikai cím előállítása", answers: [false, true] }
    ],
    explanation: "Szoftveresen menedzselt TLB-nél a TLB miss kezelése és laptábla bejárása OS-feladat. A tényleges címfordítást találat esetén az MMU végzi."
  }
  ,
  {
    id: "two-operand-instructions-alt-6",
    topic: "Utasításkészletek",
    type: "truefalse",
    title: "Kétoperandusú utasítások felismerése (variáns)",
    prompt: "Az alábbi utasítások közül melyik 2 operandusú?",
    statements: [
      { text: "R1 ← R2 + R3", answer: false },
      { text: "R1 ← R1 + R3", answer: true },
      { text: "ADD R1", answer: false },
      { text: "JUMP -42", answer: false }
    ],
    explanation: "A 2 operandusú műveletben az egyik operandus gyakran célként is szerepel. Az R1 ← R1 + R3 kétoperandusú, mert R1 egyszerre forrás és cél. A JUMP -42 nem aritmetikai 2 operandusú utasítás."
  },
  {
    id: "pcie-properties-alt-6",
    topic: "Periféria illesztés",
    type: "truefalse",
    title: "PCI Express tulajdonságai (variáns 2)",
    prompt: "Mely tulajdonságok jellemzik a PCI Express-t?",
    statements: [
      { text: "Perifériakezelő utasításokkal nem rendelkező rendszerekben nem megvalósítható", answer: false },
      { text: "Rejtett, párhuzamos arbitrációt használ", answer: false },
      { text: "A PCI Express perifériák képesek közvetlenül a memóriába adatot írni", answer: true },
      { text: "A PCI Express perifériák képesek interruptot kiváltani", answer: true }
    ],
    explanation: "A PCI Express pont-pont, soros összeköttetésű rendszer, nem rejtett párhuzamos arbitrációs busz. A PCIe eszközök DMA-val memóriába írhatnak és interruptot is kiválthatnak."
  },
  {
    id: "daisy-chain-interrupt-alt-6",
    topic: "Megszakításkezelés",
    type: "truefalse",
    title: "Daisy chain alapú interrupt kezelés (variáns)",
    prompt: "Mely állítások igazak a daisy chain alapú interrupt kezelésre?",
    statements: [
      { text: "Körbenforgó interrupt kiszolgálás megvalósítható", answer: false },
      { text: "Az eszközök prioritása nem változtatható", answer: true },
      { text: "Nem működik, ha egyidejűleg több eszköz is jelez interruptot", answer: false },
      { text: "Elvben tetszőlegesen bővíthető", answer: true }
    ],
    explanation: "Daisy chain esetén a prioritást az eszközök láncbeli sorrendje adja, ezért az nem változtatható szabadon. Több egyidejű kérés esetén a lánc sorrendje dönt, tehát ettől még működhet."
  },
  {
    id: "pipeline-id-exceptions-alt-6",
    topic: "Processzor / Pipeline",
    type: "truefalse",
    title: "ID fázisban előforduló kivételek (variáns)",
    prompt: "Mely kivételek fordulhatnak elő az ID fázisban?",
    statements: [
      { text: "Aritmetikai hiba", answer: false },
      { text: "Laphiba", answer: false },
      { text: "Érvénytelen utasítás", answer: true },
      { text: "Védelmi hiba", answer: false }
    ],
    explanation: "Az ID fázis az utasítás dekódolásáról szól, ezért itt az érvénytelen utasítás észlelhető. Aritmetikai hiba végrehajtáskor, laphiba pedig memóriahozzáférés/címfordítás során jellemző."
  },
  {
    id: "info-processing-model-comparison-alt-6",
    topic: "Architektúra modellek",
    type: "matrix",
    title: "Információfeldolgozási modellek összehasonlítása (variáns)",
    prompt: "Hasonlítsa össze a három tanult információfeldolgozási modellt!",
    columns: ["Vezérlésáramlásos modell", "Adatáramlásos modell", "Igényvezérelt modell"],
    rows: [
      { label: "A műveletek mindig a programozó által megszabott sorrendben hajtódnak végre", answers: [true, false, false] },
      { label: "A problémát egy precedenciagráf segítségével lehet leírni", answers: [false, true, true] },
      { label: "Nagy párhuzamos rendszerek esetében nem hatékony", answers: [true, false, false] }
    ],
    explanation: "Vezérlésáramlásos modellben a programozó által előírt sorrend dominál. Adatáramlásos és igényvezérelt modellnél a függőségek/prece­denciagráf alapján természetesebb a párhuzamosság."
  },
  {
    id: "software-managed-tlb-tasks-alt-6",
    topic: "Virtuális memória / TLB",
    type: "matrix",
    title: "Szoftver által menedzselt TLB feladatmegosztás (variáns)",
    prompt: "A megfelelő összekötésekkel jelezze a hardver és az operációs rendszer feladatait szoftver által menedzselt TLB esetén!",
    columns: ["Az operációs rendszer", "Hardver (MMU) feladata"],
    rows: [
      { label: "Az érintett lap betöltése a háttértárról, ha lapcsere szükséges", answers: [true, false] },
      { label: "A TLB hiba feloldása a laptábla bejárásával", answers: [true, false] },
      { label: "Áldozatválasztás a fizikai memóriában tárolt lapok közül, ha lapcsere szükséges", answers: [true, false] },
      { label: "A virtuális címből a fizikai cím előállítása", answers: [false, true] }
    ],
    explanation: "Szoftveresen menedzselt TLB esetén a TLB miss kezelése, a laptábla bejárása, a lapcsere és az áldozatválasztás OS-feladat. A tényleges címfordítást TLB-találat esetén az MMU végzi."
  },
  {
    id: "nand-transistors-24bit-alt-6",
    topic: "SSD / NAND",
    type: "number",
    title: "NAND flash tranzisztorszám 24 bithez (variáns)",
    prompt: "Hány tranzisztor szükséges 24 bit tárolásához egy SLC-t, MLC-t, ill. QLC-t használó NAND flash alapú SSD meghajtón?",
    fields: [
      { label: "SLC esetben", answer: 24, suffix: "tranzisztor" },
      { label: "MLC esetben", answer: 12, suffix: "tranzisztor" },
      { label: "QLC esetben", answer: 6, suffix: "tranzisztor" }
    ],
    explanation: "SLC 1 bitet, MLC 2 bitet, QLC 4 bitet tárol cellánként. Ezért 24 bithez rendre 24, 12 és 6 cella/tranzisztor szükséges."
  },
  {
    id: "raid-capacity-5disk-alt-6",
    topic: "RAID",
    type: "number",
    title: "RAID 0 és RAID 6 kapacitás 5 diszkkel (variáns)",
    prompt: "Mennyi egy 5 db 1 TB kapacitású diszkből álló RAID tömb teljes, felhasználó által hasznosítható tárolási kapacitása?",
    fields: [
      { label: "RAID 0 esetén", answer: 5, suffix: "TB" },
      { label: "RAID 6 esetén", answer: 3, suffix: "TB" }
    ],
    explanation: "RAID 0 esetén minden kapacitás használható: 5 TB. RAID 6 két diszknyi redundanciát használ, ezért 5 - 2 = 3 TB marad."
  },
  {
    id: "usb-reliable-transfer-types-alt-6",
    topic: "USB",
    type: "text",
    title: "USB hibamentes átviteli módok (variáns)",
    prompt: "Sorolja fel az USB azon adatátviteli módjait, melyekre a rendszer hibamentes adatátvitelt garantál!",
    keywords: {
      requiredGroups: [
        ["control", "kontroll", "vezérlő"],
        ["bulk"],
        ["interrupt"]
      ]
    },
    sample: "control\nbulk\ninterrupt",
    explanation: "Az USB control, bulk és interrupt átvitelnél biztosít hibamentes adatátvitelt. Az isochronous mód időzítést/sávszélességet garantál, de hibamentességet nem."
  },
  {
    id: "dram-commands-fcfs-frfcfs-alt-6",
    topic: "DRAM",
    type: "text",
    title: "DRAM FCFS és FR-FCFS parancssor (3-as sor nyitva)",
    prompt: "Add meg a memória vezérlő által kiadott DRAM parancsokat FCFS és FR-FCFS ütemezés szerint. Kezdetben a 3-as sor van nyitva. Az utolsó parancs után a memóriavezérlő zárja le a nyitott sort.\n(2, 16), (3, 32), (2, 0)",
    keywords: {
      requiredGroups: [
        ["fcfs", "precharge", "activate", "read"],
        ["fr-fcfs", "read", "32"]
      ]
    },
    sample: "FCFS: PRECHARGE; ACTIVATE 2; READ 16; PRECHARGE; ACTIVATE 3; READ 32; PRECHARGE; ACTIVATE 2; READ 0; PRECHARGE",
    explanation: "FR-FCFS először a nyitott sorban lévő találatot szolgálja ki, ezért READ 32 kerül előre. FCFS a kérések eredeti sorrendjét követi, ezért előbb át kell váltani a 2-es sorra."
  },
  {
    id: "dram-timing-table-alt-6",
    topic: "DRAM",
    type: "number",
    title: "DRAM késleltetés táblázat (variáns)",
    prompt: "Az alábbi DRAM technológiák mellett, FCFS ütemezést feltételezve, mennyi idő elteltével jelenik meg a (2. sor, 16. oszlop) kérésre érkező első adat a memóriamodul adatbuszán órajelben és ns-ban?",
    fields: [
      { label: "DDR2-1000, 6-7-7: órajel", answer: 20, suffix: "órajel" },
      { label: "DDR2-1000, 6-7-7: idő", answer: 40, suffix: "ns" },
      { label: "DDR3-1800, 7-10-10: órajel", answer: 27, suffix: "órajel" },
      { label: "DDR3-1800, 7-10-10: idő", answer: 30, suffix: "ns" },
      { label: "DDR3-3200, 10-12-12: órajel", answer: 34, suffix: "órajel" },
      { label: "DDR3-3200, 10-12-12: idő", answer: 21.25, suffix: "ns" }
    ],
    explanation: "A Moodle-megoldás szerint a válaszok: DDR2-1000: 20 órajel és 40 ns; DDR3-1800: 27 órajel és 30 ns; DDR3-3200: 34 órajel és 21,25 ns."
  },
  {
    id: "ssd-write-dedup-alt",
    topic: "SSD / NAND",
    type: "truefalse",
    title: "SSD wear leveling és deduplikáció",
    prompt: "Mely állítások igazak?",
    statements: [
      { text: "Wear leveling csökkenti az egyes cellák elhasználódását", answer: true },
      { text: "Deduplikáció csökkenti a fizikai írások számát", answer: true },
      { text: "Wear leveling növeli a hibaarányt", answer: false },
      { text: "Deduplikáció mindig több írást eredményez", answer: false }
    ],
    explanation: "Wear leveling egyenletesen osztja el az írásokat, deduplikáció pedig csökkenti a redundáns írásokat."
  },
  {
    id: "polling-vs-interrupt-alt",
    topic: "Processzor / IO",
    type: "matrix",
    title: "Polling vs Interrupt",
    prompt: "Döntsd el melyik állítás melyik módszerre igaz.",
    columns: ["Polling", "Interrupt"],
    rows: [
      { label: "Csak akkor terheli a processzort, ha esemény történik", answers: [false, true] },
      { label: "Folyamatosan vizsgálja az eszközt", answers: [true, false] },
      { label: "Hatékonyabb CPU használat", answers: [false, true] }
    ],
    explanation: "Polling folyamatosan kérdez, interrupt eseményvezérelt és hatékonyabb."
  },
  {
    id: "usb-transfer-types-alt-extra",
    topic: "USB",
    type: "text",
    title: "USB adatátviteli módok",
    prompt: "Sorold fel az USB adatátviteli módjait!",
    keywords: {
      requiredGroups: [
        ["control"],
        ["bulk"],
        ["interrupt"],
        ["isochronous"]
      ]
    },
    sample: "control\nbulk\ninterrupt\nisochronous",
    explanation: "USB 4 alap módot használ: control, bulk, interrupt, isochronous."
  },
  {
    id: "raid1-capacity-alt-extra",
    topic: "RAID",
    type: "number",
    title: "RAID 1 kapacitás",
    prompt: "4 darab 1 TB-os lemez RAID1-ben mennyi használható kapacitást ad?",
    fields: [
      { label: "Kapacitás", answer: 1, suffix: "TB" }
    ],
    explanation: "RAID1-nél minden egyes lemez tartalma azonos a többivel, tehát csak 1 TB a felhasználható kapacitás."
  },
  {
    id: "tlb-basic-alt-extra",
    topic: "Virtuális memória / TLB",
    type: "truefalse",
    title: "TLB alapok",
    prompt: "Jelöld az igaz állításokat.",
    statements: [
      { text: "TLB gyorsítja a címfordítást", answer: true },
      { text: "TLB minden memóriaműveletnél kötelező", answer: false },
      { text: "TLB cache-szerű struktúra", answer: true },
      { text: "TLB csak szoftveresen valósítható meg", answer: false }
    ],
    explanation: "TLB egy gyorsítótár a lapcímfordításhoz, tipikusan hardverben implementálva."
  },
  {
    id: "tlb-page-table-state-image-style",
    topic: "Virtuális memória / TLB",
    type: "tlbScenario",
    title: "TLB és laptábla állapotváltozás (képes feladat stílus)",
    prompt: "Töltsd ki a TLB és a másodszintű laptáblák új állapotát a két külön hivatkozásra.",
    context: "16 bites virtuális és 15 bites fizikai cím, lapméret 4096 byte, 4 bejegyzéses teljesen asszociatív TLB (LRU).\nHa az OS új lapot helyez be és lapot kell kilökni, a következő áldozat a 3-as lap.\nHa egy kilökött laphoz TLB bejegyzés tartozik, azt invalidálni kell.",
    initial: {
      firstLevel: [
        { v: 1, ptr: 0 },
        { v: 1, ptr: 1 },
        { v: 1, ptr: 2 },
        { v: 1, ptr: 3 }
      ],
      secondLevel: [
        [
          { v: 1, frame: 5 },
          { v: 0, frame: "?" },
          { v: 0, frame: "?" },
          { v: 1, frame: 0 }
        ],
        [
          { v: 1, frame: 7 },
          { v: 0, frame: "?" },
          { v: 1, frame: 6 },
          { v: 0, frame: "?" }
        ],
        [
          { v: 1, frame: 1 },
          { v: 1, frame: 3 },
          { v: 0, frame: "?" },
          { v: 0, frame: "?" }
        ],
        [
          { v: 1, frame: 4 },
          { v: 0, frame: "?" },
          { v: 0, frame: "?" },
          { v: 0, frame: "?" }
        ]
      ],
      tlb: [
        { valid: 1, page: 8, frame: 1, age: 1 },
        { valid: 1, page: 9, frame: 3, age: 3 },
        { valid: 1, page: 0, frame: 5, age: 4 },
        { valid: 1, page: 3, frame: 0, age: 2 }
      ]
    },
    scenarios: [
      {
        title: "A 4-es lap meghivatkozása (kiindulás: kezdeti állapot)",
        expected: {
          tlb: [
            { valid: 1, page: 8, frame: 1, age: 2 },
            { valid: 1, page: 9, frame: 3, age: 4 },
            { valid: 1, page: 4, frame: 7, age: 1 },
            { valid: 1, page: 3, frame: 0, age: 3 }
          ],
          secondLevel: [
            [
              { v: 1, frame: 5 },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" },
              { v: 1, frame: 0 }
            ],
            [
              { v: 1, frame: 7 },
              { v: 0, frame: "?" },
              { v: 1, frame: 6 },
              { v: 0, frame: "?" }
            ],
            [
              { v: 1, frame: 1 },
              { v: 1, frame: 3 },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" }
            ],
            [
              { v: 1, frame: 4 },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" }
            ]
          ]
        }
      },
      {
        title: "A 11-es lap meghivatkozása (kiindulás: kezdeti állapot)",
        expected: {
          tlb: [
            { valid: 1, page: 8, frame: 1, age: 2 },
            { valid: 1, page: 9, frame: 3, age: 4 },
            { valid: 1, page: 0, frame: 5, age: 3 },
            { valid: 1, page: 11, frame: 0, age: 1 }
          ],
          secondLevel: [
            [
              { v: 1, frame: 5 },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" },
              { v: 0, frame: 0 }
            ],
            [
              { v: 1, frame: 7 },
              { v: 0, frame: "?" },
              { v: 1, frame: 6 },
              { v: 0, frame: "?" }
            ],
            [
              { v: 1, frame: 1 },
              { v: 1, frame: 3 },
              { v: 0, frame: "?" },
              { v: 1, frame: 0 }
            ],
            [
              { v: 1, frame: 4 },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" },
              { v: 0, frame: "?" }
            ]
          ]
        }
      }
    ],
    explanation: "A két részfeladat egymástól független: mindkettő a kezdeti állapotból indul. 4-es lapnál laptábla-találat van, 11-es lapnál laphiba és 3-as lap kilökése történik, TLB-invalidálással."
  },
// Appended shortanswer items from data.js (deduplicated)
// Begin appended block
  {
    id: "asd-1",
    topic: "Háttértárak (RAID)",
    type: "shortanswer",
    title: "5 db 1 TB-os diszk hasznos kapacitása RAID 0 esetén",
    prompt: "5 db 1 TB-os diszk hasznos kapacitása RAID 0 esetén",
    answer: "5 TB",
    explanation: "A RAID 0 (stripping) a merevlemezek kapacitását redundancia nélkül, összefűzve kínálja fel a felhasználónak. Ebben az esetben egyetlen diszk sem tárol paritás- vagy tükrözött adatot, így a teljes kapacitás összeadódik: 5 * 1 TB = 5 TB.",
    monkeyExplanation: "Képzeld el, hogy van 5 db 1 literes vödröd. RAID 0 esetén egyszerűen egymás mellé teszed őket, így összesen 5 liter vizet tudsz beléjük tölteni. Biztonsági mentés nincs."},
  {
    id: "asd-2",
    topic: "Háttértárak (RAID)",
    type: "shortanswer",
    title: "5 db 1 TB-os diszk hasznos kapacitása RAID 6 esetén",
    prompt: "5 db 1 TB-os diszk hasznos kapacitása RAID 6 esetén",
    answer: "3 TB",
    explanation: "A RAID 6 egy blokk-szintű csíkozásos adattárolás, mely két külön paritásblokkot használ. Ez azt jelenti, hogy 2 diszknyi (N-2) terület veszik el a redundancia miatt, így a rendszer egyszerre akár 2 lemez meghibásodását is túléli adatvesztés nélkül. Ebben a példában 5-2 = 3 lemeznyi hasznos tárterület marad: 3 TB.",
    monkeyExplanation: "Szintén 5 db vödröd van, de RAID 6-nál 2 vödröt mindig fenntartunk arra az esetre, ha eltörne valamelyik. Így az 5 vödörből csak 3-at tudsz használni víz tárolására, ezért 3."},
  {
    id: "asd-3",
    topic: "Virtuális Memória",
    type: "shortanswer",
    title: "5-ös lap hivatkozása utáni TLB állapot (LRU esetén)",
    prompt: "5-ös lap hivatkozása utáni TLB állapot (LRU esetén)",
    answer: "A legidősebb (4-es korú) bejegyzés helyére kerül, kora 1 lesz",
    explanation: "A TLB (Translation Lookaside Buffer) a laptábla bejegyzéseit (keretszámokat) gyorsítótárazza. Ha betelik, az LRU (Least Recently Used - Legrégebben Használt) stratégia azt a bejegyzést dobja el, amit a legrégebben hivatkoztak. Mivel most bekerül a friss 5-ös lap, a kora 1 lesz, míg a többieké öregszik.",
    monkeyExplanation: "A TLB olyan, mint egy nagyon rövid emlékezet. Ha jön egy új adat, és már tele van az eszed, elfelejted azt a dolgot, amire a legrégebben gondoltál (LRU), és annak a helyére beteszed az újat."},
  {
    id: "asd-6",
    topic: "Virtuális Memória",
    type: "shortanswer",
    title: "8-as lap hivatkozása utáni TLB bejegyzés (Lap: 8)",
    prompt: "8-as lap hivatkozása utáni TLB bejegyzés (Lap: 8)",
    answer: "Keret: 1, Kor: 1",
    explanation: "Ez egy szimulációs példa részlete a jegyzetből: a memóriahivatkozás (Laphiba vagy TLB hiba után) új bejegyzést hoz létre a TLB-ben. Mivel a lap a fizikai memória 1-es keretébe került letöltésre, a keretszám 1 lesz, kor pedig LRU algoritmusnál 1, mert ő a legfrissebb bejegyzés.",
    monkeyExplanation: "Mint amikor felhívnak egy új számról: beírod a telefonkönyvedbe, és ez lesz a legújabb kapcsolatod, ezért kapja az 1-es kort (első)."},
  {
    id: "asd-7",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A \\\"Daisy chain-re alapozott arbitráció\\\" centralizált eljárás? (Igaz/Hamis)",
    prompt: "A \\\"Daisy chain-re alapozott arbitráció\\\" centralizált eljárás? (Igaz/Hamis)",
    answer: true,
    explanation: "A Daisy chain (láncbafűzött) arbitráció egy centralizált buszhozzáférési mód. Egy központi arbiter kapja a kéréseket, aki a buszhasználati jogot (BUSGRANT) egyetlen láncon indítja el a perifériák felé, ahol az egyes eszközök eldönthetik, hogy visszatartják-e azt maguknak vagy továbbadják.",
    monkeyExplanation: "A Daisy chain olyan suttogós játék óvodában. Egy tanár (központ) elindítja a suttogást az első gyereken keresztül. Egy tanár indítja, ezért centralizált."},
  {
    id: "asd-8",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A \\\"Párhuzamos arbitráció\\\" centralizált eljárás? (Igaz/Hamis)",
    prompt: "A \\\"Párhuzamos arbitráció\\\" centralizált eljárás? (Igaz/Hamis)",
    answer: true,
    explanation: "Igen. Minden eszköz (master) külön kérés (REQ) és engedélyező (GNT) vonallal rendelkezik, amelyek mind egyetlen, központi döntőbíró (arbiter) egységbe futnak be. Az arbiter mérlegeli a bejövő kérőjeleket és valamelyik masternek odaadja a vonalat.",
    monkeyExplanation: "Itt nem sorban suttognak tovább a gyerekek, hanem mindegyiküknek van egy póráza a tanárhoz. A tanár dönti el, kit hallgat meg. Központosított."},
  {
    id: "asd-9",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A centralizált arbitráció előnye a nagy hibatűrés. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "Épp ellenkezőleg. A centralizált arbitrációnak egy közös, központi erőforrása van (az arbiter egység), ami ha meghibásodik, a teljes buszrendszer leáll (Single Point of Failure). Nagy hibatűrése az elosztott arbitrációnak van.",
    monkeyExplanation: "Erre gondolj: ha egyetlen tanár irányítja a tesi órát, és ő lebetegszik, teljes anarchia lesz, senki nem mozog. Így a hibatűrés a lehető legrosszabb."},
  {
    id: "asd-10",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A centralizált arbitráció előnye, hogy olcsóbb, mivel csak egy központi arbiteregység szükséges. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "Valóban, mivel az elfogadás és a prioritás döntéseinek komplex logikája egyetlen kis lapkán/modulon (az arbiterben) van megvalósítva, a végponti (kliens) perifériák elektronikája nagyon egyszerű és olcsó lehet.",
    monkeyExplanation: "Természetesen! Ha csak egy okos (és drága) tanárt kell megfizetned a suliban, és a rostadon lévő diákok csak simán hallgatnak rá, az sokkal olcsóbb."},
  {
    id: "asd-11",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A centralizált arbitráció során a perifériák egyetlen központi vezérlőhöz csatlakoznak. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "Ez pontosan az eljárás definíciója. Létezik még elosztott arbitráció, ahol minden eszköz látja a buszon jelentkező igényeket, és egy megosztott algoritmus szerint saját maguk döntenek a kiengedésről.",
    monkeyExplanation: "Pontosan ez az értelme: az összes periféria (diák) oda van drótozva ahhoz az egy gazdához."},
  {
    id: "asd-12",
    topic: "Utasításkészletek (CISC/RISC)",
    type: "booleanAnswer",
    title: "A CISC utasításkészlet-architektúrára jellemző, hogy az utasítások dekódolása összetettebb feladat. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "A CISC (Complex Instruction Set Computer) változó hosszúságú (pl. x86 esetén 1-17 bájt) és rendkívül bonyolult utasításokkal dolgozik. A dekódoló egységnek így meg kell határoznia az utasítás végét és a benne foglalt összetett (akár memóriát is hivatkozó) műveleteket, ami komplex hardvert igényel.",
    monkeyExplanation: "A CISC olyan, mint a hatalmas, készre szerelt legó idomok. Egyetlen darab, de mire a gép kibogozza, miket takar, megizzad vele."},
  {
    id: "asd-13",
    topic: "Utasításkészletek (CISC/RISC)",
    type: "booleanAnswer",
    title: "A CISC utasításkészlet-architektúrára jellemző, hogy könnyebb alacsony szinten programozni. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "Igaz, mert a CISC utasítások „erőteljesebbek”. Egyetlen utasítás elvégezhet akár egy memóriából olvasást, majd ahhoz egy regiszter hozzáadását is. Az assembler nyelv így közelebb áll a magas szintű gondolkodáshoz, és rövidebb kódot eredményez, mint a RISC, ahol ezeket mind külön apró utasításokra kéne bontani.",
    monkeyExplanation: "Könnyebb benne kódot írni emberként, mert olyan mintha egyből meg tudnád parancsolni a gépnek hogy 'építs házat', míg RISC alatt csavaronként kellene mondanod."},
  {
    id: "asd-14",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A Daisy chain alapú interrupt kezelés nem működik, ha egyidejűleg több eszköz is jelez interruptot. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "Működik, sőt épp a konfliktus feloldására lett kitalálva. Az arbiter (vagy processzor) INTA nyugtázó jelet küld, ami a lánc mentén halad. Minél közelebb van logikailag a periféria a CPU-hoz, annál magasabb a prioritása: a hozzáférést igénylő periféria egyszerűen megfogja s nem engedi tovább a vett jelet a láncon, így lekezelve a kollíziót.",
    monkeyExplanation: "Működik, mert a suttogós láncolatban ha két gyerek is jelentkezik, az lesz a nyertes, aki közelebb ül a tanárhoz, szóval letiltja a mögötte lévőket."},
  {
    id: "asd-15",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A Daisy chain alapú interrupt kezelés tetszőlegesen bővíthető. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "Ennek topológiás oka van: amennyiben új eszközt szeretnénk használni, csak „befűzzük” a láncba. Nem igényel dedikált kiépített vezetékpárt minden egyes új eszköznek az arbiterből (mint ahogy például a párhuzamos arbitrációnál lenne), hanem csak az előző és következő eszközzel van huzalozva.",
    monkeyExplanation: "Igen, ha bedobsz egy új egeret a sorba, be tud csatlakozni (bedugod a másikba), nem kell egy külön kábelt visszahúzni a gép legtetejéig."},
  {
    id: "asd-16",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A Daisy chain alapú interrupt kezelésnél körbenforgó interrupt kiszolgálás megvalósítható. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "Nem lehet körbenforgó (round-robin/fair) stratégiát megvalósítani. A daisy chain-ben a fizikai bekötési sorrend feltartóztathatatlanul rögzíti a prioritásokat. Az a periféria kapja meg a jogot, aki közelebb van forrásponthoz, így egy leterhelő, magas prioritású első eszköz egyértelműen kiszoríthatná a lánc végi eszközöket a hozzáférésből.",
    monkeyExplanation: "Nem lehet, mert a sor elején ülő gyerek mindig monopolizálni tudja a szót, a sor végén lévők pedig sosem kerülnének sorra, ha agresszív az első."},
  {
    id: "asd-20",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlő alkalmazása csökkenti a CPU terhelését. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "A DMA (Direct Memory Access) pontosan erre való! Amikor a periféria a hálózaton keresztül nagy méretű adatblokkot küld, a CPU utasításonkénti végighajtása nagyon lassú volna. Helyette a CPU csak felprogramozza a hardveres DMA vezérlőt (ez az ide, eddig az hosszan mettől hova elvetve), mely aztán a processzor beavatkozása nélkül végzi el a másolást a háttértár és memória között, csak a végen jelezve azt egy megszakítással (interrupt).",
    monkeyExplanation: "A DMA vezérlő a szorgos kisöcsi. Te (CPU) olvasol, és megkéred a kisöcsit, hogy cipekedjen (hozza a biteket). Így neked nem kell felállnod."},
  {
    id: "asd-21",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlő célja a processzor tehermentesítése az I/O műveletek során. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: true,
    explanation: "Igen, a DMA végzi az adatmozgatást a periféria és a memória között közvetlenül, így a processzor amíg ő ezt csinálja, foglalkozhat más programok, kódok futtatásával ameddig nincs szüksége magára az adatra.",
    monkeyExplanation: "Képzeld el, hogy a memória (RAM) egy óriási raktár, a periféria (mondjuk egy merevlemez) pedig egy teherautó. A processzor a raktárvezető. Megkérheti a raktárvezető a targoncás fiút (a DMA vezérlőt), hogy ő maga pakolja be a dobozokat a teherautóról a raktárba. Így a raktárvezetőnek (a processzornak) nem kell minden egyes doboznál (bájtnál) otthagynia a papírmunkát, hanem csinálhat valami fontosabbat, és ezzel tehermentesítve van az I/O (Input/Output, azaz pakolási) művelet alatt."},
  {
    id: "asd-22",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlő minden bájt sikeres átvitelét interrupttal jelzi a processzornak. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "Ha így tenne, elvészne a technológia minden haszna! DMA esetében az adatblokk (vagy az előre meghatározott méretű chunk) utolsó bájtjának sikeres átvitele után történik az értesítés egyetlen megszakítással.",
    monkeyExplanation: "Folytatva a targoncás példát: Ha a targoncás (DMA vezérlő) minden egyes doboz megszerzése után odarohanna a raktárvezetőhöz (processzorhoz), hogy 'Főnök, becipeltem egy dobozt!' (ez az interrupt/megszakítás), azzal folyamatosan zavarná a munkájában. Ehelyett a DMA csak akkor szól (küld interruptot), amikor egy egész raklapnyi (blokknyi) árut sikeresen behozott."},
  {
    id: "asd-23",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlő saját utasításkészlettel rendelkezik. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "Az I/O processzorra jellemző (mint pl a fejlett mainframe-ekben), hogy önálló programokat vagy utasításkészletet használ, a klasszikus PC architektúra DMA vezérlője csak állapot és cím-regiszterekkel rendelkezik.",
    monkeyExplanation: "A DMA vezérlő egy célszerszám, mint maga a targonca. Nagyon ügyesen tud dobozokat rakodni 'A' pontból 'B' pontba, de nem tud matekfeladatokat megoldani vagy döntéseket hozni (mint egy processzor). Nincsenek 'saját utasításai' vagy programkódja, egyszerű kis memóriafiókjai (regiszterei) vannak, ahol fel van írva, hogy HONNAN, HOVÁ és MENNYI adatot kell cipelnie."},
  {
    id: "asd-24",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlő vagy az I/O processzor célja a buszért zajló verseny eldöntése. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "A buszért folyó verseny eldöntése (hogy melyik egység kaphatja azt meg) a buszvezérlő (Arbiter) feladata, nem a DMA-é. A DMA vezérlő csupán egy Masterként lép fel a buszon a rengeteg eszköz között.",
    monkeyExplanation: "Képzelj el egy forgalmas csomópontot, ahol csak egy autó (adat) haladhat át egyszerre (ez a busz). A cél az, hogy a DMA is használhassa az utat. De az, hogy ki mehet először, a rendőr (az Arbiter, avagy buszvezérlő) dolga eldönteni, aki irányítja a forgalmat! A DMA vezérlő itt olyan, mint egy mentőautó: csak egy a résztvevők közül, aki zöld utat kér a rendőrtől, nem ő maga dönt a versenyről."},
  {
    id: "asd-26",
    topic: "Perifériák és Buszrendszerek",
    type: "booleanAnswer",
    title: "A DMA vezérlőt a periféria programozza fel. (Igaz/Hamis)",
    prompt: "Döntsd el, igaz vagy hamis az állítás.",
    answer: false,
    explanation: "A DMA vezérlőt a processzor (CPU) - pontosabbr... (truncated)",
    monkeyExplanation: ""}
// End appended block
];
