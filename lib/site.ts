export const site = {
  name: "WMT Manufacturing Co.",
  shortName: "WMT",
  tradeName: "Winding Machinery Traders",
  tagline: "Shape the future of winding",
  url: "https://www.wmt-india.com",
  description:
    "WMT Manufacturing Co. (Winding Machinery Traders), Byculla, Mumbai — manufacturer of precision cone & cheese winding machines, ceramic yarn guides, ceramic/carbide cutting blades and spare parts for ring frames, autoconers, TFOs and assembly winders.",
  motto:
    "Quality is never an accident; it is a result of planning, team work and commitment to excellence.",
  owner: "Kumar C. Patel",
  address: {
    line1: "B-120, Sussex Industrial Estate",
    line2: "D.K. Cross Marg, Byculla (East)",
    landmark: "Near Rani Baug",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400027",
    country: "India",
  },
  emails: ["jigar@wmt-india.com", "wmt120@gmail.com"],
  phones: [
    { label: "Tel", display: "+91 22 2372 3837", href: "tel:+912223723837" },
    { label: "Tel", display: "+91 22 2372 2318", href: "tel:+912223722318" },
    { label: "Mobile", display: "+91 98200 04055", href: "tel:+919820004055" },
  ],
  fax: "+91 22 2374 6877",
  mapQuery: "Sussex Industrial Estate, D.K. Cross Marg, Byculla East, Mumbai 400027",
} as const;

export const fullAddress = `${site.address.line1}, ${site.address.line2}, ${site.address.city} – ${site.address.postalCode}, ${site.address.country}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company Profile" },
  { href: "/products", label: "Products" },
  { href: "/spare-parts", label: "Spare Parts" },
  { href: "/contact", label: "Contact" },
];

export type Img = { src: string; alt: string; w: number; h: number };

export type Machine = {
  slug: string;
  name: string;
  model: string;
  summary: string;
  intro: string;
  image: Img;
  specs: { label: string; value: string }[];
  basicFeatures?: string[];
  optionalFeatures?: string[];
  mainFeatures?: { title: string; text?: string }[];
};

export const machines: Machine[] = [
  {
    slug: "wmt-pcp-08-precision-winder",
    name: "WMT Precision Winder",
    model: "WMT-PCP-08",
    summary:
      "Six-spindle precision winder for soft dye packages, rewinding and 2-ply / 3-ply package winding — with thread break sensor, gate tensioner, diameter stop motion, self-threading yarn guide and slub catcher.",
    intro:
      "A precision winder for soft dye packages, rewinding and 2-ply / 3-ply package winding. Winds all types of spun, filament and fancy yarn.",
    image: {
      src: "/images/machines/wmt-pcp-08-precision-winder.jpg",
      alt: "WMT-PCP-08 precision winding machine with four winding heads and cone packages",
      w: 561,
      h: 600,
    },
    specs: [
      { label: "Application", value: "Soft dye package, rewinder, 2-ply / 3-ply package winder" },
      { label: "Winding", value: "Precision driving mechanism — winds all types of spun, filament & fancy yarn" },
      { label: "Traverse", value: "Adjustable from 150 mm (6″) to 200 mm (8″) by one cam box only" },
      { label: "Package", value: "Available in square or taper end" },
      { label: "Spindles per frame", value: "6 (six)" },
      { label: "Drive", value: "Individual 0.25 HP motor per spindle with VLT Micro Drive (inverter) for constant linear speed control" },
      { label: "Speed", value: "Up to 1000 m/min depending on wind & count of the yarn" },
      { label: "Gauge", value: "350 mm for single yarn, 430 mm for 2–3 ply" },
      { label: "Tubes", value: "Cylindrical or conical, up to 4°20′" },
      {
        label: "Full package size",
        value: "Square end, 6″ & 8″ traverse — Ø175 mm · Taper end, 6″ traverse — Ø175 mm · Taper end, 8″ traverse — Ø190 mm",
      },
    ],
    basicFeatures: [
      "Thread break sensor",
      "Gate tensioner",
      "Diameter stop motion",
      "Self-threading yarn guide",
      "Slub catcher",
    ],
    optionalFeatures: [
      "Bottle oiling device",
      "Wax attachment",
      "Length measuring device",
      "Cutter",
    ],
  },
  {
    slug: "wmt-50-cone-cheese-winder",
    name: "WMT-50 Cone & Cheese Winder",
    model: "WMT-50",
    summary:
      "A smooth and easy-operating cheese / cone / spool winder — the first machine of its kind manufactured indigenously.",
    intro:
      "The first machine of its kind manufactured indigenously. Thousands of WMT precision cheese, cone and spool winders are working in rayon, nylon and sewing thread plants, winding all kinds of threads in any count to suitable shapes for warping, knitting, dyeing and sewing.",
    image: {
      src: "/images/machines/wmt-50-cone-winder.jpg",
      alt: "WMT-50 cone and cheese winding machine with multiple spindles",
      w: 203,
      h: 206,
    },
    specs: [
      { label: "Yarn range", value: "All natural & spun synthetic" },
      { label: "Supply packages", value: "3°30′, 5°57′, 9°15′" },
      { label: "Tension", value: "Grill type & disc type" },
      { label: "Traverse", value: "2″, 3″, 4″, 5″ & 6″" },
      { label: "Winding speed", value: "200 to 450 metres per minute" },
    ],
    mainFeatures: [
      {
        title: "Auto stop motion",
        text: "Each spindle is fitted with a sizing attachment and runs automatically and individually on two ball bearings, stopping automatically as the yarn breaks.",
      },
      {
        title: "Hard-chrome yarn guides",
        text: "All guides and tension grills coming in contact with the yarn are duly hard chrome plated.",
      },
      { title: "Automatic tension control" },
      { title: "Waxing attachment for sewing thread" },
      { title: "Pineapple cone attachment" },
      {
        title: "Gainer system",
        text: "Gear gain for honeycomb or open-comb winding, and belt gain for close winding of sewing thread.",
      },
      {
        title: "Modified upper drive system",
        text: "Introduced to increase the life of the driving belt while decreasing the load on the motor.",
      },
    ],
  },
];

export const pcpFeatureGallery: (Img & { title: string })[] = [
  { title: "Multipurpose winding", src: "/images/features/multipurpose-winding.jpg", alt: "WMT-PCP-08 multipurpose winding heads with filament packages", w: 800, h: 536 },
  { title: "Gate tensioner with thread break sensor", src: "/images/features/gate-tensioner-thread-break-sensor.jpg", alt: "Gate tensioner with thread break sensor on WMT precision winder", w: 534, h: 625 },
  { title: "Oil emulsion device", src: "/images/features/oil-emulsion-device.jpg", alt: "Oil emulsion bottle oiling device on WMT winder", w: 402, h: 600 },
  { title: "Pineapple cone", src: "/images/features/pineapple-cone-attachment.jpg", alt: "Pineapple cone package wound on WMT precision winder", w: 800, h: 536 },
  { title: "Wax attachment", src: "/images/features/wax-attachment.jpg", alt: "Wax attachment for sewing thread on WMT winding machine", w: 800, h: 536 },
  { title: "Self-threading yarn guide", src: "/images/features/self-threading-yarn-guide.jpg", alt: "Self-threading yarn guide traverse on WMT precision winder", w: 800, h: 536 },
];

export const wmt50Power = [
  { spindles: 6, power: "0.5 HP", floor: "2,400 × 600 × 1,600" },
  { spindles: 12, power: "1.0 HP", floor: "4,000 × 600 × 1,000" },
];

export const gainerImages: (Img & { title: string })[] = [
  { title: "Standard head", src: "/images/features/gainer-standard-head.jpg", alt: "WMT-50 standard winding head", w: 148, h: 126 },
  { title: "Gear gain", src: "/images/features/gear-gain.jpg", alt: "Gear gain mechanism for honeycomb winding", w: 72, h: 140 },
  { title: "Belt gain", src: "/images/features/belt-gain.jpg", alt: "Belt gain mechanism for close winding", w: 72, h: 181 },
];

/** Standard specification for various purposes (WMT-50), transcribed from the original chart. */
export const standardSpec = [
  { yarn: "Synthetic yarn (nylon, Tetoron)", shape: "Cone", lift: "6″", taper: "3°30′", dia: "125", winding: "Open", wind: "3½", speed: "350" },
  { yarn: "Synthetic yarn (acetate, rayon)", shape: "Cone", lift: "6″", taper: "3°30′", dia: "180", winding: "Open", wind: "2¾", speed: "400" },
  { yarn: "Worsted woollen", shape: "Cone", lift: "6″", taper: "9°15′ / 5°57′ / 3°30′", dia: "180", winding: "Close", wind: "2½", speed: "320" },
  { yarn: "Dyeing cheese for woollen or rayon", shape: "Cheese", lift: "6″, 5″, 3″", taper: "0°", dia: "180", winding: "Honeycomb open", wind: "2¼", speed: "320" },
  { yarn: "Sewing thread", shape: "Double spool", lift: "3″, 2½″, 2″", taper: "0°", dia: "125", winding: "Close", wind: "3, 2½", speed: "250" },
  { yarn: "Sewing thread", shape: "Triple spool", lift: "2″, 1½″, 1″", taper: "0°", dia: "100", winding: "Close", wind: "2½, 2", speed: "250" },
];

export type Component = {
  slug: string;
  name: string;
  summary: string;
  body: string;
  points: string[];
  image: Img;
};

export const components: Component[] = [
  {
    slug: "ceramic-guides",
    name: "Ceramic Yarn Guides",
    summary:
      "Special high-tech alloys combined to make ceramic guides the best solution to problems in guiding threads, forming and modifying the yarn path.",
    body: "Special high-tech alloys have been combined to make ceramic guides the best solution to problems in guiding threads, forming and modifying the yarn path — producing superior textured yarn and reducing filament damage in spinning and textile machines.",
    points: ["Superior textured yarn", "Reduced filament damage in spinning and textile machines"],
    image: {
      src: "/images/products/ceramic-yarn-guides.jpg",
      alt: "Assorted ceramic yarn guides, eyelets, rollers and thread guides in white, pink and maroon ceramic",
      w: 797,
      h: 467,
    },
  },
  {
    slug: "cutters",
    name: "Ceramic / Carbide Cutting Blades",
    summary:
      "Ceramic / carbide cutting blades with remarkably high edge strength — faster cutting, no corrosion and smooth running without lubrication.",
    body: "Having remarkably high edge strength, thereby ensuring:",
    points: [
      "Faster cutting rates with consistent good quality",
      "No corrosion & smooth running without lubrication",
      "Universal cleaning possibilities using acids, alkalis and organic solutions",
    ],
    image: {
      src: "/images/products/ceramic-carbide-cutting-blades.jpg",
      alt: "Ceramic and carbide yarn cutting blades and cutter assemblies for textile machines",
      w: 797,
      h: 464,
    },
  },
];

export type SpareItem = Img & { title: string };
export type SpareCategory = {
  slug: string;
  name: string;
  short: string;
  /** Page <title> (before the " | WMT Manufacturing Co." template suffix). */
  seoTitle: string;
  machines: string[];
  summary: string;
  image: Img;
  items: SpareItem[];
};

export const spareCategories: SpareCategory[] = [
  {
    slug: "ring-frame",
    name: "Ring Frame Spares",
    short: "Ring Frame",
    seoTitle: "Ring Frame Spares: Zinser, Toyoda & more",
    machines: ["Zinser", "Toyoda", "Howa", "Rieter", "LR-6", "Marzoli"],
    summary:
      "Ring frame spares for Zinser, Toyoda, Howa, Rieter, LR-6 and Marzoli.",
    image: { src: "/images/spares/ring-frame/outer-grippers.jpg", alt: "Ring frame outer grippers", w: 798, h: 562 },
    items: [
      { title: "ABC Rings & Holders", src: "/images/spares/ring-frame/abc-rings-holders.jpg", alt: "ABC rings and ring holders for spinning ring frames", w: 800, h: 578 },
      { title: "Snail Wire & Lappets", src: "/images/spares/ring-frame/snail-wire-lappets.jpg", alt: "Snail wires, thread guides and lappets for ring spinning frames", w: 800, h: 517 },
      { title: "Outer Grippers", src: "/images/spares/ring-frame/outer-grippers.jpg", alt: "Outer grippers for ring frame spindles", w: 798, h: 562 },
      { title: "Spindle Brakes", src: "/images/spares/ring-frame/spindle-brakes.jpg", alt: "Spindle brakes (knee brakes) for ring frames", w: 798, h: 562 },
      { title: "Suction Tubes with Holders", src: "/images/spares/ring-frame/suction-tubes-holders.jpg", alt: "Pneumafil suction tubes with holders for ring frames", w: 798, h: 562 },
      { title: "Pegs & Peg Trays", src: "/images/spares/ring-frame/pegs-peg-trays.jpg", alt: "Bobbin pegs and peg trays for ring spinning", w: 799, h: 549 },
      { title: "Roving Guides", src: "/images/spares/ring-frame/roving-guides.jpg", alt: "Roving guides and traverse guides for ring frames", w: 796, h: 548 },
      { title: "Separators", src: "/images/spares/ring-frame/separators.jpg", alt: "Ring frame separator plates", w: 800, h: 578 },
    ],
  },
  {
    slug: "auto-winding",
    name: "Auto Winding Spares",
    short: "Auto Winding",
    seoTitle: "Autoconer Spares: Schlafhorst, Murata & Savio",
    machines: ["Schlafhorst 238", "Schlafhorst 338", "Murata Mach Coner 7-II", "Murata Mach Coner 7-VSS", "Savio Espero", "Savio Orion"],
    summary:
      "Auto winding spares for Schlafhorst 238 & 338, Murata Mach Coner 7-II & 7-VSS and Savio Espero & Orion.",
    image: { src: "/images/spares/auto-winding/schlafhorst-238.jpg", alt: "Schlafhorst 238 autoconer spares", w: 800, h: 578 },
    items: [
      { title: "Schlafhorst 238", src: "/images/spares/auto-winding/schlafhorst-238.jpg", alt: "Spare parts for Schlafhorst Autoconer 238", w: 800, h: 578 },
      { title: "Schlafhorst 338", src: "/images/spares/auto-winding/schlafhorst-338.jpg", alt: "Spare parts for Schlafhorst Autoconer 338", w: 800, h: 578 },
      { title: "Mach Coner 7-II", src: "/images/spares/auto-winding/murata-mach-coner-7-ii.jpg", alt: "Spare parts for Murata Mach Coner 7-II", w: 800, h: 578 },
      { title: "Mach Coner 7-VSS", src: "/images/spares/auto-winding/murata-mach-coner-7-vss.jpg", alt: "Spare parts for Murata Mach Coner 7-VSS", w: 800, h: 578 },
      { title: "Savio Espero", src: "/images/spares/auto-winding/savio-espero.jpg", alt: "Spare parts for Savio Espero automatic winder", w: 800, h: 578 },
      { title: "Savio Orion", src: "/images/spares/auto-winding/savio-orion.jpg", alt: "Spare parts for Savio Orion automatic winder", w: 800, h: 578 },
    ],
  },
  {
    slug: "tfo",
    name: "TFO Spares",
    short: "TFO",
    seoTitle: "TFO Spares: Volkmann, Murata, Savio & more",
    machines: ["V. Lakshmi", "Prerna", "Leehwa", "Murata", "Volkmann", "Savio"],
    summary:
      "TFO spares for V. Lakshmi, Prerna, Leehwa, Murata, Volkmann and Savio.",
    image: { src: "/images/spares/tfo/tfo-spindle-parts.jpg", alt: "TFO spindle parts", w: 800, h: 578 },
    items: [
      { title: "TFO Spares", src: "/images/spares/tfo/tfo-spares-tension-components.jpg", alt: "Assorted TFO twister spare parts", w: 800, h: 578 },
      { title: "TFO Spares", src: "/images/spares/tfo/tfo-spares-cradle-assembly.jpg", alt: "TFO twister spare parts", w: 800, h: 578 },
      { title: "TFO Spares", src: "/images/spares/tfo/tfo-spindle-parts.jpg", alt: "TFO spindle spare parts", w: 800, h: 578 },
    ],
  },
  {
    slug: "cheese-assembly-winder",
    name: "Cheese & Assembly Winder Spares",
    short: "Cheese & Assembly Winder",
    seoTitle: "Cheese & Assembly Winder Spares: SSM & more",
    machines: ["Textool", "PS Mettler", "SSM", "Kamitsu", "Murata"],
    summary:
      "Assembly winder spares for Textool, PS Mettler, SSM, Kamitsu and Murata.",
    image: { src: "/images/spares/cheese-winder/cheese-assembly-winder-spares.jpg", alt: "Cheese and assembly winder spares", w: 800, h: 578 },
    items: [
      { title: "Cheese & Assembly Winder Spares", src: "/images/spares/cheese-winder/cheese-assembly-winder-spares.jpg", alt: "Cheese and assembly winder spare parts", w: 800, h: 578 },
    ],
  },
];

export const faqs = [
  {
    q: "What does WMT Manufacturing Co. make?",
    a: "WMT Manufacturing Co. (Winding Machinery Traders) in Byculla, Mumbai manufactures precision cone and cheese winding machines (WMT-PCP-08 and WMT-50), ceramic yarn guides, ceramic/carbide cutting blades, and spare parts for ring frames, automatic cone winders, TFO twisters and cheese/assembly winders.",
  },
  {
    q: "Where is WMT Manufacturing Co. located?",
    a: "B-120, Sussex Industrial Estate, D.K. Cross Marg, Byculla (East), near Rani Baug, Mumbai – 400027, India.",
  },
  {
    q: "Which ring frame makes do you supply spares for?",
    a: "Zinser, Toyoda, Howa, Rieter, LR-6 and Marzoli — including ABC rings & holders, snail wires & lappets, outer grippers, spindle brakes, suction tubes, pegs & peg trays, roving guides and separators.",
  },
  {
    q: "Do you supply autoconer spares for Schlafhorst, Murata and Savio?",
    a: "Yes — for Schlafhorst 238 and 338, Murata Mach Coner 7-II and 7-VSS, and Savio Espero and Orion.",
  },
  {
    q: "What is the WMT-PCP-08 precision winder used for?",
    a: "Soft dye packages, rewinding and 2-ply / 3-ply package winding. It has 6 spindles per frame, a 150–200 mm traverse and runs at up to 1000 m/min depending on the yarn.",
  },
  {
    q: "How can I request a quotation?",
    a: "Email jigar@wmt-india.com or wmt120@gmail.com, call +91 98200 04055 or +91 22 2372 3837, or use the enquiry form on the Contact page.",
  },
];

export const allBrands = [
  "Schlafhorst", "Murata", "Savio", "Zinser", "Toyoda", "Howa", "Rieter", "LMW", "Marzoli",
  "Volkmann", "V. Lakshmi", "Prerna", "Leehwa", "SSM", "PS Mettler", "Textool", "Kamitsu",
];
