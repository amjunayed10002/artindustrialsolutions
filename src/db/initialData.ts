import {
  SiteSettings,
  Banner,
  AboutSection,
  CoreValue,
  WhyChooseReason,
  CompanyDocument,
  ProductCategory,
  Product,
  EngineeringService,
  Industry,
  VendorDocument,
  RFQ,
  ContactMessage,
  SocialLink,
  AdminUser
} from '../types';

export const initialSiteSettings: SiteSettings = {
  id: 1,
  company_name: "ART Industrial Solutions",
  tagline: "Your Trusted Industrial Supply & Engineering Partner",
  domain: "artindustrialsolutions.com",
  logo_url: "", // Handled by corporate SVG mark if empty
  favicon_url: "",
  phone: "+880 1711-234567",
  secondary_phone: "+880 1819-876543",
  email: "info@artindustrialsolutions.com",
  sales_email: "sales@artindustrialsolutions.com",
  whatsapp: "+8801711234567",
  whatsapp_message: "Hello ART Industrial Solutions, I would like to inquire about your industrial products and engineering services.",
  address: "Plot 42, Road 7, Sector 3, Industrial Area, Uttara, Dhaka-1230, Bangladesh",
  office_hours: "Saturday - Thursday: 9:00 AM - 6:00 PM (Friday Closed)",
  google_map_embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.5133644084126!2d90.395456!3d23.871321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c4172f3e8f85%3A0xbcf046cb20358896!2sUttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd",
  website_title: "ART Industrial Solutions | Industrial Supply & Mechanical Engineering",
  meta_description: "Leading industrial supplier of bearings, welding consumables, PPE, valves, spare parts, and turnkey mechanical maintenance services.",
  footer_text: "ART Industrial Solutions is an established industrial procurement firm and mechanical engineering contractor providing certified supplies to cement, steel, power, and manufacturing facilities across Bangladesh.",
  copyright_text: "© 2026 ART Industrial Solutions. All rights reserved."
};

export const initialBanners: Banner[] = [
  {
    id: 1,
    title: "Your Trusted Industrial Supply Partner",
    subtitle: "Precision Engineering & Certified Procurement",
    description: "Extensive inventory of heavy-duty bearings, low-hydrogen welding consumables, industrial valves, and mechanical spares with genuine OEM certificates.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    button_text: "Request a Quotation",
    button_url: "/rfq",
    is_button_visible: true,
    order: 1,
    is_active: true
  },
  {
    id: 2,
    title: "Turnkey Plant Maintenance & Fabrication",
    subtitle: "Mechanical Overhaul & Shutdown Support",
    description: "Certified shutdown maintenance teams, structural steel fabrication, laser shaft alignment, and 24/7 on-call emergency industrial support.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    button_text: "Explore Services",
    button_url: "/services",
    is_button_visible: true,
    order: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Enlisted Vendor for Heavy Manufacturing",
    subtitle: "Power, Cement, Steel, Chemical & Pharma Sectors",
    description: "Complete compliance readiness with verified Trade License, BIN, TIN, IRC, and audited corporate documentation for rapid procurement enlistment.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    button_text: "Vendor Enlistment",
    button_url: "/vendor-enlistment",
    is_button_visible: true,
    order: 3,
    is_active: true
  }
];

export const initialAboutSection: AboutSection = {
  history_heading: "Over a Decade of Engineering Integrity",
  history_text: "Founded in 2012, ART Industrial Solutions emerged to address the acute requirement of manufacturing plants for authentic, traceable mechanical spares and responsive engineering interventions. What started as a focused distributorship for high-precision roller bearings has grown into a comprehensive multi-sector procurement enterprise. Today, ART supports over 180 continuous-process industrial plants with inventory spanning 12,000+ distinct SKUs and field engineering crews capable of managing critical shutdown overhauls.",
  history_image: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
  mission_heading: "Our Corporate Mission",
  mission_text: "To empower manufacturing and process industries by providing verified, superior-grade mechanical supplies and turnkey engineering services that eliminate unplanned downtime, elevate occupational safety standards, and deliver lowest lifecycle procurement costs.",
  vision_heading: "Our Strategic Vision",
  vision_text: "To stand as the most dependable and technically proficient industrial supply house in South Asia, benchmarked for relentless authenticity, transparent commercial ethics, and rapid logistical responsiveness.",
  proprietor_name: "Engr. A. R. Talukder",
  proprietor_designation: "Managing Proprietor & Chief Technical Officer",
  proprietor_photo: "/src/assets/images/proprietor_managing_director_1790260763384.jpg",
  proprietor_message: "In continuous industrial manufacturing, every hour of unscheduled stoppage directly erodes profitability and factory morale. When ART Industrial Solutions was established, our core doctrine was clear: never compromise on product authenticity and always stand squarely behind the engineering we provide. Over the years, our clients have trusted us through demanding plant expansions, urgent shutdown overhauls, and specialized component sourcing. We pledge our continued technical dedication to your factory's seamless operation.",
  proprietor_signature: "A. R. Talukder, P.Eng."
};

export const initialCoreValues: CoreValue[] = [
  {
    id: 1,
    title: "100% Genuine Authenticity",
    description: "Every item is sourced directly from OEM authorized channels with mill test certificates and traceable batch documentation.",
    icon_name: "ShieldCheck",
    order: 1
  },
  {
    id: 2,
    title: "Engineering Precision",
    description: "Our in-house technical personnel conduct on-site dimension checks, load calculations, and laser alignment before handoff.",
    icon_name: "Wrench",
    order: 2
  },
  {
    id: 3,
    title: "Rapid Dispatch Logistics",
    description: "Centralized warehousing in Dhaka with express regional freight partnerships enabling 24-hour emergency delivery for plant breakdowns.",
    icon_name: "Truck",
    order: 3
  },
  {
    id: 4,
    title: "Compliance & Transparency",
    description: "Zero ambiguity in taxation, customs clearance, and banking guarantees with full compliance across national regulatory bodies.",
    icon_name: "FileCheck",
    order: 4
  }
];

export const initialWhyChooseReasons: WhyChooseReason[] = [
  {
    id: 1,
    title: "Certified OEM Supply Chain",
    description: "Direct partnerships with tier-one global brands including SKF, ESAB, Spirax Sarco, KSB, Rexnord, and Festo.",
    icon_name: "Award",
    order: 1,
    is_active: true
  },
  {
    id: 2,
    title: "Ready Buffer Inventory",
    description: "Over 12,000 SKUs held in our modern racked warehouse for immediate dispatch without import wait times.",
    icon_name: "Package",
    order: 2,
    is_active: true
  },
  {
    id: 3,
    title: "Experienced Field Engineers",
    description: "Mechanical engineers and certified welding inspectors ready to deploy for shutdown maintenance and emergency repairs.",
    icon_name: "Users",
    order: 3,
    is_active: true
  },
  {
    id: 4,
    title: "Competitive Bulk Pricing",
    description: "Direct-from-factory volume agreements passing quantifiable cost efficiencies to our corporate procurement partners.",
    icon_name: "TrendingDown",
    order: 4,
    is_active: true
  },
  {
    id: 5,
    title: "Flawless Legal & Bank Standing",
    description: "Full regulatory clearance, corporate membership in DCCI, and clean bank solvency backing high-value contracts.",
    icon_name: "CheckCircle",
    order: 5,
    is_active: true
  }
];

export const initialCompanyDocuments: CompanyDocument[] = [
  {
    id: 1,
    title: "Trade License (DNCC)",
    category: "Legal",
    document_number: "TRAD/DNCC/024819/2021",
    issuing_authority: "Dhaka North City Corporation",
    description: "Valid commercial operating license for general industrial supply, import, and engineering contracting.",
    file_url: "#",
    order: 1,
    is_active: true,
    updated_at: "2026-01-15"
  },
  {
    id: 2,
    title: "Business Identification Number (BIN / VAT)",
    category: "Tax",
    document_number: "002948172-0102",
    issuing_authority: "Customs, Excise & VAT Commissionerate, NBR",
    description: "13-digit Central Value Added Tax registration certificate in full compliance with National Board of Revenue.",
    file_url: "#",
    order: 2,
    is_active: true,
    updated_at: "2026-02-01"
  },
  {
    id: 3,
    title: "Taxpayer's Identification Number (e-TIN)",
    category: "Tax",
    document_number: "481928471920 / Circle 110",
    issuing_authority: "Taxes Zone 06, Dhaka",
    description: "Electronic Tax Identification Number certificate with regular corporate income tax assessment clearance.",
    file_url: "#",
    order: 3,
    is_active: true,
    updated_at: "2025-11-20"
  },
  {
    id: 4,
    title: "Import Registration Certificate (IRC)",
    category: "Legal",
    document_number: "IRC No: 2603910294",
    issuing_authority: "Office of the Chief Controller of Imports & Exports",
    description: "Authorized commercial importer certification for industrial spare parts, mechanical equipment, and raw materials.",
    file_url: "#",
    order: 4,
    is_active: true,
    updated_at: "2025-12-10"
  },
  {
    id: 5,
    title: "Export Registration Certificate (ERC)",
    category: "Legal",
    document_number: "ERC No: 180294719",
    issuing_authority: "Office of the Chief Controller of Imports & Exports",
    description: "Official registration permitting cross-border industrial equipment return and international trade transactions.",
    file_url: "#",
    order: 5,
    is_active: true,
    updated_at: "2025-12-10"
  },
  {
    id: 6,
    title: "DCCI Corporate Membership",
    category: "Membership",
    document_number: "Member ID: M-8491",
    issuing_authority: "Dhaka Chamber of Commerce & Industry",
    description: "Registered corporate member of the largest and oldest trade chamber in Bangladesh.",
    file_url: "#",
    order: 6,
    is_active: true,
    updated_at: "2026-01-05"
  },
  {
    id: 7,
    title: "Bank Solvency Certificate",
    category: "Financial",
    document_number: "PBL/CORP/SOLV/2026/0419",
    issuing_authority: "Prime Bank Limited, Corporate Branch",
    description: "Formal bank confirmation of satisfactory account operations, creditworthiness, and high financial liquidity.",
    file_url: "#",
    order: 7,
    is_active: true,
    updated_at: "2026-03-01"
  }
];

export const initialCategories: ProductCategory[] = [
  {
    id: 1,
    name: "Welding Consumables",
    slug: "welding-consumables",
    description: "AWS grade low-hydrogen electrodes, MIG/MAG wires, TIG rods, submerged arc fluxes, and ceramic nozzles.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    order: 1,
    is_active: true
  },
  {
    id: 2,
    name: "PPE & Safety",
    slug: "ppe-and-safety",
    description: "EN/OSHA approved industrial safety gear including respirators, flame-resistant suits, fall arrest harnesses, and helmets.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    order: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Bearings",
    slug: "bearings",
    description: "Precision deep groove ball, spherical roller, tapered roller bearings, and heavy-duty plummer blocks from SKF & NSK.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    order: 3,
    is_active: true
  },
  {
    id: 4,
    name: "Mechanical Spare Parts",
    slug: "mechanical-spare-parts",
    description: "Flexible tire and grid couplings, conveyor chains, sprockets, timing pulleys, and mechanical shaft seals.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    order: 4,
    is_active: true
  },
  {
    id: 5,
    name: "Electrical Items",
    slug: "electrical-items",
    description: "Heavy-duty contactors, thermal overloads, variable frequency drives, circuit breakers, and industrial busbar trunking.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    order: 5,
    is_active: true
  },
  {
    id: 6,
    name: "Hardware",
    slug: "hardware",
    description: "Certified alloy bow shackles, turnbuckles, wire rope slings, eye bolts, and heavy-duty lifting clamps.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    order: 6,
    is_active: true
  },
  {
    id: 7,
    name: "Fasteners",
    slug: "fasteners",
    description: "High-tensile Grade 8.8, 10.9 & 12.9 structural hex bolts, DIN 975 threaded rods, and SS316 flange studs.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    order: 7,
    is_active: true
  },
  {
    id: 8,
    name: "Valves",
    slug: "valves",
    description: "ANSI Class 150/300/600 cast steel gate, globe, check, butterfly, and pneumatic actuated ball valves.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    order: 8,
    is_active: true
  },
  {
    id: 9,
    name: "Pipes & Fittings",
    slug: "pipes-and-fittings",
    description: "ASTM A106 Grade B seamless carbon steel pipes, butt-weld elbows, concentric reducers, and ASME B16.5 flanges.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    order: 9,
    is_active: true
  },
  {
    id: 10,
    name: "Tools",
    slug: "tools",
    description: "Heavy industrial pneumatic torque wrenches, hydraulic pullers, socket sets, and digital precision instruments.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    order: 10,
    is_active: true
  },
  {
    id: 11,
    name: "Industrial Chemicals",
    slug: "industrial-chemicals",
    description: "Biodegradable industrial degreasers, rust converters, cooling water scale inhibitors, and ultrasonic wash solvents.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    order: 11,
    is_active: true
  },
  {
    id: 12,
    name: "Lubricants",
    slug: "lubricants",
    description: "Synthetic gear oils ISO VG 220/320/460, anti-wear hydraulic oils, and high-temp lithium complex greases.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    order: 12,
    is_active: true
  },
  {
    id: 13,
    name: "MRO Products",
    slug: "mro-products",
    description: "Non-asbestos compressed gasket sheets, PTFE thread seal tapes, Loctite anaerobic threadlockers, and silicone adhesives.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    order: 13,
    is_active: true
  }
];

export const initialProducts: Product[] = [
  {
    id: 1,
    category_id: 3,
    name: "SKF Explorer Spherical Roller Bearing 22220 EK",
    slug: "skf-explorer-spherical-roller-bearing-22220-ek",
    sku: "BRG-SKF-22220EK",
    brand: "SKF",
    model: "22220 EK / C3",
    short_description: "Premium self-aligning spherical roller bearing engineered for heavy radial loads and harsh vibrating industrial environments.",
    full_description: "The SKF Explorer 22220 EK features a tapered bore (1:12) with optimized internal geometry capable of handling high dynamic shock loads, shaft deflection, and angular misalignment in cement kilns, vibrating screens, and heavy drive assemblies.",
    specifications: {
      "Bore Diameter": "100 mm",
      "Outer Diameter": "180 mm",
      "Width": "46 mm",
      "Dynamic Load Rating": "440 kN",
      "Static Load Rating": "530 kN",
      "Limiting Speed": "4300 r/min",
      "Material": "High-carbon chromium bearing steel"
    },
    main_image: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    additional_images: [],
    is_featured: true,
    is_active: true,
    created_at: "2026-01-10"
  },
  {
    id: 2,
    category_id: 1,
    name: "ESAB OK 48.00 Low-Hydrogen Welding Electrodes (E7018)",
    slug: "esab-ok-4800-low-hydrogen-welding-electrodes-e7018",
    sku: "WLD-ESAB-OK48-32",
    brand: "ESAB",
    model: "OK 48.00 3.25mm",
    short_description: "All-position, basic-coated LMA electrode delivering crack-resistant weld metal for structural steel and pressure vessels.",
    full_description: "ESAB OK 48.00 is a reliable, general-purpose basic low-hydrogen electrode for unalloyed and low-alloy steels. It provides exceptionally high impact toughness at temperatures down to -40°C, clean slag detachability, and smooth arc transfer.",
    specifications: {
      "Diameter": "3.25 mm",
      "Length": "450 mm",
      "Classification": "AWS A5.1 / ASME SFA 5.1: E7018",
      "Welding Current": "AC, DC+ (110 - 150 A)",
      "Yield Strength": "475 MPa",
      "Tensile Strength": "565 MPa",
      "Packaging": "Vacuum-sealed VacPac 4.2 kg"
    },
    main_image: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    additional_images: [],
    is_featured: true,
    is_active: true,
    created_at: "2026-01-12"
  },
  {
    id: 3,
    category_id: 8,
    name: "KSB Cast Steel Flanged Gate Valve Class 300",
    slug: "ksb-cast-steel-flanged-gate-valve-class-300",
    sku: "VLV-KSB-CS300-DN100",
    brand: "KSB",
    model: "ZVA Class 300 DN100",
    short_description: "Heavy-duty bolted bonnet outside screw & yoke (OS&Y) gate valve for high-temperature steam and petroleum piping.",
    full_description: "Engineered in accordance with API 600 standards, this valve features a flexible wedge design, stellited seating faces for extended wear resistance, and graphite stem packing to prevent fugitive emissions under demanding thermal cycles.",
    specifications: {
      "Nominal Size": "DN100 (4 Inch)",
      "Pressure Class": "ASME Class 300 (51 bar)",
      "Body Material": "ASTM A216 WCB",
      "Trim": "Trim 8 (API Stellite / 13% Cr)",
      "End Connection": "Raised Face (RF) ASME B16.5",
      "Testing Standard": "API 598"
    },
    main_image: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    additional_images: [],
    is_featured: true,
    is_active: true,
    created_at: "2026-01-15"
  },
  {
    id: 4,
    category_id: 2,
    name: "3M 6800 Reusable Full Facepiece Respirator Kit",
    slug: "3m-6800-reusable-full-facepiece-respirator-kit",
    sku: "PPE-3M-6800-KIT",
    brand: "3M",
    model: "6800 Medium Series",
    short_description: "Lightweight, balanced full-face respirator offering wide field of vision and respiratory protection in chemical plants.",
    full_description: "Meets NIOSH and EN 136 Class 1 standards. The silicone faceseal delivers superior comfort and durability during prolonged shifts in toxic gas, ammonia, particulate, or solvent vapor atmospheres.",
    specifications: {
      "Facepiece Type": "Full Facepiece Reusable",
      "Harness Type": "4-point suspension",
      "Lens Material": "High-impact Polycarbonate",
      "Filter Connection": "3M Bayonet Attachment",
      "Standard": "NIOSH 42 CFR 84 / EN 136"
    },
    main_image: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    additional_images: [],
    is_featured: true,
    is_active: true,
    created_at: "2026-01-18"
  },
  {
    id: 5,
    category_id: 4,
    name: "Rexnord Omega Elastomeric Flexible Coupling E20",
    slug: "rexnord-omega-elastomeric-flexible-coupling-e20",
    sku: "MEC-REX-OMEGA-E20",
    brand: "Rexnord",
    model: "Omega E20 Standard",
    short_description: "Non-lubricated split-in-half flexible polyurethane tire coupling designed for pumps, compressors, and electric motor shafts.",
    full_description: "The unique split-in-half flex element minimizes downtime by allowing element replacement without disturbing hubs or connected equipment alignment. Excellent damping characteristics protect connected machinery from torsional vibrations.",
    specifications: {
      "Torque Capacity": "260 Nm",
      "Max Bore": "60 mm",
      "Max Speed": "4800 RPM",
      "Misalignment Tolerance": "Angular up to 4°, Parallel up to 1.6 mm",
      "Element Material": "Specially formulated Polyurethane"
    },
    main_image: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    additional_images: [],
    is_featured: false,
    is_active: true,
    created_at: "2026-01-22"
  },
  {
    id: 6,
    category_id: 12,
    name: "Mobilgear 600 XP 220 Industrial Enclosed Gear Oil",
    slug: "mobilgear-600-xp-220-industrial-enclosed-gear-oil",
    sku: "LUB-MOB-600XP-220-208L",
    brand: "Mobil",
    model: "Mobilgear 600 XP 220 (208L Drum)",
    short_description: "Extra high-performance industrial gear oil featuring advanced extreme-pressure additives and micropitting resistance.",
    full_description: "Specially formulated to protect spur, helical, bevel, and steel-on-steel worm gears. Demonstrates superior demulsibility, thermal oxidation stability, and protects sensitive bronze and copper alloy components in industrial gearboxes.",
    specifications: {
      "ISO Viscosity Grade": "220",
      "Viscosity Index": "97",
      "Flash Point": "240°C",
      "Pour Point": "-24°C",
      "FZG Scuffing Failure Stage": "> 12+",
      "Volume": "208 Liters Drum"
    },
    main_image: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    additional_images: [],
    is_featured: true,
    is_active: true,
    created_at: "2026-01-25"
  },
  {
    id: 7,
    category_id: 7,
    name: "High-Tensile Grade 10.9 Structural Hex Bolts & Nuts M24 x 120",
    slug: "high-tensile-grade-109-structural-hex-bolts-and-nuts-m24-x-120",
    sku: "FST-HT109-M24-120",
    brand: "Unbrako / Standard Industrial",
    model: "DIN 931 / ISO 4014 Grade 10.9",
    short_description: "Heavy-duty quenched and tempered alloy steel structural fasteners with black oxide finish for steel framing and crane rails.",
    full_description: "Certified to withstand high dynamic shear stresses and pretension loads. Supplied complete with heavy matching Grade 10 hex nuts and hardened structural washers.",
    specifications: {
      "Thread Size": "M24 (Pitch 3.0 mm)",
      "Total Length": "120 mm",
      "Strength Class": "Grade 10.9",
      "Tensile Strength": "1040 MPa minimum",
      "Proof Load Stress": "830 MPa",
      "Standard": "DIN 931 / EN 14399"
    },
    main_image: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    additional_images: [],
    is_featured: false,
    is_active: true,
    created_at: "2026-01-28"
  },
  {
    id: 8,
    category_id: 9,
    name: "ASTM A106 Grade B Seamless Carbon Steel Pipe (6 Inch Sch 40)",
    slug: "astm-a106-grade-b-seamless-carbon-steel-pipe-6-inch-sch-40",
    sku: "PIP-A106B-6IN-SCH40",
    brand: "Jindal / MSL",
    model: "ASTM A106 Gr. B Seamless",
    short_description: "High-temperature seamless carbon steel pressure pipe for power plant steam lines, refineries, and boiler feed lines.",
    full_description: "Manufactured through hot-finishing processes and 100% hydrostatic and non-destructive eddy-current tested. Suitable for bending, flanging, and similar forming operations.",
    specifications: {
      "Nominal Diameter": "6 Inch (168.3 mm OD)",
      "Wall Thickness": "7.11 mm (Schedule 40)",
      "Standard": "ASTM A106 / ASME SA106",
      "Length": "Standard 6 Meter Double Random",
      "Tensile Strength": "415 MPa",
      "Yield Strength": "240 MPa"
    },
    main_image: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    additional_images: [],
    is_featured: false,
    is_active: true,
    created_at: "2026-02-02"
  }
];

export const initialServices: EngineeringService[] = [
  {
    id: 1,
    title: "Mechanical Maintenance",
    slug: "mechanical-maintenance",
    short_description: "Preventative, predictive, and corrective maintenance programs for heavy rotating equipment, industrial pumps, gearboxes, and fans.",
    full_description: "Our certified mechanical engineers deploy specialized vibration analysis tools, laser alignment units, and thermal imaging equipment to audit industrial machinery. We develop tailored scheduled maintenance regimes that avert catastrophic breakdowns and maintain optimum machinery tolerance.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    icon_name: "Wrench",
    deliverables: [
      "Precision laser shaft and pulley alignment",
      "Dynamic on-site rotor and impeller balancing",
      "Gearbox teardown, bearing replacement & backlash resetting",
      "Centrifugal and slurry pump overhaul and gland repacking",
      "Vibration baseline logging and failure analysis reports"
    ],
    order: 1,
    is_active: true,
    is_featured: true
  },
  {
    id: 2,
    title: "Shutdown Maintenance",
    slug: "shutdown-maintenance",
    short_description: "Turnkey plant turnaround and shutdown management with 24/7 dedicated multi-shift mechanical and welding crews.",
    full_description: "Planned turnaround maintenance requires meticulous timeline planning and rigorous safety enforcement. ART Industrial Solutions executes comprehensive plant overhauls during scheduled outages for cement kilns, steel furnaces, power turbines, and chemical reactors.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    icon_name: "Calendar",
    deliverables: [
      "Turnaround timeline planning and critical path Gantt scheduling",
      "Kiln shell, tire, and roller alignment & replacement",
      "Conveyor belt replacement, vulcanizing, and idler reconditioning",
      "Boiler tube inspection, header replacement, and hydro-testing",
      "Rapid post-turnaround commissioning and load testing"
    ],
    order: 2,
    is_active: true,
    is_featured: true
  },
  {
    id: 3,
    title: "Steel Fabrication",
    slug: "steel-fabrication",
    short_description: "Custom workshop fabrication of industrial chutes, hoppers, pressure vessels, ducting, and wear-resistant liners.",
    full_description: "Our ASME-qualified welders and fabrication engineers fabricate bespoke industrial equipment from Hardox wear plates, stainless steel 304/316, and structural carbon steel with strict dimensional tolerances and NDT dye-penetrant inspection.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    icon_name: "Hammer",
    deliverables: [
      "Bespoke aggregate chutes and cyclone hoppers",
      "Hardox 450/500 abrasion-resistant liner replacement",
      "Industrial dust collection ducting and ventilation manifolds",
      "Pressure vessel repairs and nozzle re-welding per ASME Sec VIII",
      "NDT ultrasonic and radiographic testing documentation"
    ],
    order: 3,
    is_active: true,
    is_featured: true
  },
  {
    id: 4,
    title: "Structural Fabrication",
    slug: "structural-fabrication",
    short_description: "Heavy structural steel framing, pipe racks, industrial mezzanine sheds, and crane runway girder installations.",
    full_description: "Complete design, fabrication, and erection of industrial steel structures tailored to high dead loads and seismic specifications for manufacturing factories, bulk material warehouses, and process plant expansions.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    icon_name: "Building2",
    deliverables: [
      "Heavy I-beam and built-up plate girder fabrication",
      "Overhead bridge crane runway girder alignment",
      "High-elevation pipe rack modules and walkways",
      "Industrial shed pre-engineered structure erection",
      "Hot-dip galvanizing and protective epoxy marine coating"
    ],
    order: 4,
    is_active: true,
    is_featured: true
  },
  {
    id: 5,
    title: "Installation & Commissioning",
    slug: "installation-and-commissioning",
    short_description: "Precision installation, foundation grouting, and trial commissioning for production machinery and pump skids.",
    full_description: "Turnkey mechanical installation of imported machinery lines. We handle offloading, high-precision leveling, high-strength non-shrink epoxy grouting, piping tie-ins, and controlled electrical no-load and full-load trial commissioning.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    icon_name: "Cog",
    deliverables: [
      "Rigging and heavy machinery indoor positioning",
      "Optical and laser leveling to sub-millimeter tolerances",
      "Foundation anchor bolting and Sikadur epoxy grouting",
      "Utility piping tie-in (steam, cooling water, compressed air)",
      "Joint commissioning with OEM foreign technical reps"
    ],
    order: 5,
    is_active: true,
    is_featured: false
  },
  {
    id: 6,
    title: "Project Supply",
    slug: "project-supply",
    short_description: "End-to-end BOM material supply management for greenfield factory projects and industrial capacity expansions.",
    full_description: "Consolidated procurement services for project owners and EPC contractors. We supply complete bills of materials—from structural fasteners to valves, pipes, cable trays, and safety systems—under a single transparent contract with staggered milestone delivery.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    icon_name: "Truck",
    deliverables: [
      "BOM review, item cross-referencing, and technical specification matching",
      "Consolidated international freight forwarding and customs clearance",
      "Buffer warehousing and just-in-time site dispatch",
      "Full manufacturer warranty preservation and test pack certificates"
    ],
    order: 6,
    is_active: true,
    is_featured: false
  },
  {
    id: 7,
    title: "Industrial Consultancy",
    slug: "industrial-consultancy",
    short_description: "Root-cause failure analysis, plant energy optimization, lubrication management, and spares standardization audits.",
    full_description: "Experienced mechanical specialists evaluate repetitive plant breakdowns, review lubrication schedules, and standardize interchangeable bearing and seal inventories across plant divisions to dramatically minimize stockholding costs.",
    image_url: "/src/assets/images/proprietor_managing_director_1790260763384.jpg",
    icon_name: "Compass",
    deliverables: [
      "Metallurgical failure root-cause analysis on fractured shafts and gears",
      "Plant-wide lubricant rationalization and standardization surveys",
      "Steam trap efficiency audits and thermal energy loss reports",
      "MRO warehouse inventory optimization and obsolescence elimination"
    ],
    order: 7,
    is_active: true,
    is_featured: false
  }
];

export const initialIndustries: Industry[] = [
  {
    id: 1,
    name: "Cement Manufacturing",
    slug: "cement-manufacturing",
    description: "Heavy-duty spherical bearings for clinker crushers, raw mills, rotary kiln roller assemblies, and high-abrasion Hardox chutes.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    supplied_equipment: ["Crusher Bearings", "Kiln Rollers", "Wear Plates", "Heavy Conveyor Chains"],
    order: 1,
    is_active: true
  },
  {
    id: 2,
    name: "Steel Mills & Re-Rolling",
    slug: "steel-mills-and-re-rolling",
    description: "Four-row cylindrical roller bearings for roughing stands, high-temperature greases, Grade 10.9 foundation bolts, and cooling water valves.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    supplied_equipment: ["Roll Neck Bearings", "Universal Spindles", "High-Temp Greases", "Hydraulic Cylinders"],
    order: 2,
    is_active: true
  },
  {
    id: 3,
    name: "Power Generation Plants",
    slug: "power-generation-plants",
    description: "ANSI Class 600 forged valves, seamless ASTM A106 steam piping, boiler gaskets, and certified safety harnesses for thermal and combined-cycle plants.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    supplied_equipment: ["High-Pressure Steam Valves", "Boiler Tubes", "Turbine Oil", "Insulation Materials"],
    order: 3,
    is_active: true
  },
  {
    id: 4,
    name: "Natural Gas & Processing",
    slug: "natural-gas-and-processing",
    description: "API 6D ball valves, stainless steel 316 instrument tubings, flare piping fittings, and explosion-proof electrical hardware.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    supplied_equipment: ["API Gas Valves", "SS Instrumentation Tube", "Spark-Proof Hand Tools", "Gas Gas Leak Detectors"],
    order: 4,
    is_active: true
  },
  {
    id: 5,
    name: "LPG Bottling & Storage",
    slug: "lpg-bottling-and-storage",
    description: "Cryogenic rated valves, pneumatic emergency shutdown valves, hydrostatic test pumps, and non-sparking copper beryllium tools.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    supplied_equipment: ["LPG Transfer Hoses", "ESD Valves", "Brass Tools", "Cylinder Filling Carousel Spares"],
    order: 5,
    is_active: true
  },
  {
    id: 6,
    name: "Pharmaceuticals & Cleanrooms",
    slug: "pharmaceuticals-and-cleanrooms",
    description: "Sanitary SS316L tri-clamp diaphragm valves, food-grade NSF H1 lubricants, HEPA filter housings, and sterile cleanroom PPE.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    supplied_equipment: ["Sanitary Diaphragm Valves", "NSF H1 Greases", "SS316L Fittings", "Cleanroom Garments"],
    order: 6,
    is_active: true
  },
  {
    id: 7,
    name: "Textile & Garment Dyeing",
    slug: "textile-and-garment-dyeing",
    description: "Corrosion-resistant chemical metering pumps, steam traps, Teflon bellows, and stainless stenter machine chain bearings.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    supplied_equipment: ["Steam Traps", "Acid Pumps", "Stenter Clip Bearings", "Silicone Sealants"],
    order: 7,
    is_active: true
  },
  {
    id: 8,
    name: "Ceramic & Tile Manufacturing",
    slug: "ceramic-and-tile-manufacturing",
    description: "Kiln roller bearings with C4 internal clearance, hydraulic press seals, vibrating sieve screens, and glazing line consumables.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    supplied_equipment: ["Kiln Bearings", "Press Hydraulic Seals", "Glaze Diaphragm Pumps", "Suction Cups"],
    order: 8,
    is_active: true
  },
  {
    id: 9,
    name: "Chemical & Fertilizer",
    slug: "chemical-and-fertilizer",
    description: "PTFE-lined butterfly valves, titanium pump impellers, acid-resistant protective clothing, and specialized pipe gaskets.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    supplied_equipment: ["PTFE Lined Valves", "Acid Resistant Suits", "FRP Ducting", "Flange Insulation Kits"],
    order: 9,
    is_active: true
  },
  {
    id: 10,
    name: "Food & Beverage Processing",
    slug: "food-and-beverage-processing",
    description: "FDA-compliant conveyor belting, stainless steel motor drives, washdown-rated pillow blocks, and water filtration consumables.",
    image_url: "/src/assets/images/industrial_engineering_service_1790260740648.jpg",
    supplied_equipment: ["Food Grade Bearings", "Stainless Motors", "FDA Modular Belts", "Sanitary Pumps"],
    order: 10,
    is_active: true
  },
  {
    id: 11,
    name: "Pulp & Paper Mills",
    slug: "pulp-and-paper-mills",
    description: "Dryer cylinder spherical roller bearings, refiner plate fasteners, steam rotary joints, and heavy suction roll packings.",
    image_url: "/src/assets/images/hero_industrial_warehouse_1790260728838.jpg",
    supplied_equipment: ["Dryer Roll Bearings", "Rotary Steam Joints", "Refiner Bolts", "Slitter Knives"],
    order: 11,
    is_active: true
  },
  {
    id: 12,
    name: "Packaging & Corrugation",
    slug: "packaging-and-corrugation",
    description: "High-speed timing belts, vacuum cups, pneumatic actuators, hot-melt adhesive equipment parts, and carton slitting blades.",
    image_url: "/src/assets/images/industrial_manufacturing_plant_1790260752764.jpg",
    supplied_equipment: ["Corrugator Belts", "Pneumatic Cylinders", "Rotary Unions", "Tungsten Slitter Blades"],
    order: 12,
    is_active: true
  }
];

export const initialVendorDocuments: VendorDocument[] = [
  {
    id: 1,
    title: "Official Corporate Company Profile 2026",
    document_code: "ART-DOC-CP2026",
    description: "Comprehensive 28-page company profile detailing organizational structure, management, warehouse capacities, and engineering credentials.",
    file_format: "PDF",
    file_size: "4.8 MB",
    file_url: "#",
    order: 1,
    is_active: true,
    updated_at: "2026-02-15"
  },
  {
    id: 2,
    title: "Procurement Capability Statement",
    document_code: "ART-DOC-CAP-01",
    description: "Audited statement of logistics infrastructure, rapid emergency dispatch readiness, and credit facility capabilities.",
    file_format: "PDF",
    file_size: "2.1 MB",
    file_url: "#",
    order: 2,
    is_active: true,
    updated_at: "2026-01-20"
  },
  {
    id: 3,
    title: "Current Trade License (DNCC Certified)",
    document_code: "ART-DOC-TL-2026",
    description: "Verified certified copy of up-to-date Trade License issued by Dhaka North City Corporation.",
    file_format: "PDF",
    file_size: "1.4 MB",
    file_url: "#",
    order: 3,
    is_active: true,
    updated_at: "2026-01-15"
  },
  {
    id: 4,
    title: "13-Digit BIN / VAT Certificate",
    document_code: "ART-DOC-BIN-NBR",
    description: "National Board of Revenue Central Value Added Tax registration certificate with active filing status.",
    file_format: "PDF",
    file_size: "1.1 MB",
    file_url: "#",
    order: 4,
    is_active: true,
    updated_at: "2026-02-01"
  },
  {
    id: 5,
    title: "Corporate e-TIN & Tax Clearance Certificate",
    document_code: "ART-DOC-TIN-CLR",
    description: "Official Electronic Taxpayer Identification Certificate and latest fiscal year income tax acknowledgement slip.",
    file_format: "PDF",
    file_size: "1.2 MB",
    file_url: "#",
    order: 5,
    is_active: true,
    updated_at: "2025-11-20"
  },
  {
    id: 6,
    title: "Master Product & Technical Catalog 2026",
    document_code: "ART-CAT-2026",
    description: "Complete B2B product catalog covering all 13 categories with engineering dimensional tables and ordering part numbers.",
    file_format: "PDF",
    file_size: "12.4 MB",
    file_url: "#",
    order: 6,
    is_active: true,
    updated_at: "2026-03-01"
  },
  {
    id: 7,
    title: "OEM Authorization & Quality Certificates Pack",
    document_code: "ART-DOC-OEM-CERT",
    description: "Consolidated distributor authorization letters, ISO 9001 compliance statement, and manufacturer warranty declarations.",
    file_format: "PDF",
    file_size: "3.6 MB",
    file_url: "#",
    order: 7,
    is_active: true,
    updated_at: "2026-01-30"
  }
];

export const initialRFQs: RFQ[] = [
  {
    id: 1,
    reference_no: "RFQ-2026-0101",
    customer_name: "Engr. Mahmudul Hassan",
    company_name: "Meghna Cement Mills Ltd.",
    email: "m.hassan@meghnagroup.biz",
    phone: "+880 1819-293847",
    product_id: 1,
    product_name: "SKF Explorer Spherical Roller Bearing 22220 EK",
    quantity: "24 Units",
    requirement: "Urgent delivery required for planned clinker cooler overhaul scheduled for next month. Must include SKF manufacturer test certificate.",
    message: "Please quote with door delivery to our Mongla plant and specify current stock readiness.",
    attachment_name: "cement_overhaul_bom.pdf",
    attachment_url: "#",
    status: "New",
    admin_notes: "Initial quote requested. Stock is confirmed in warehouse rack 4B.",
    created_at: "2026-09-22 10:15"
  },
  {
    id: 2,
    reference_no: "RFQ-2026-0102",
    customer_name: "Kamrul Islam",
    company_name: "BSRM Steels Limited",
    email: "procurement@bsrm.com",
    phone: "+880 1713-948271",
    product_id: 2,
    product_name: "ESAB OK 48.00 Low-Hydrogen Welding Electrodes (E7018)",
    quantity: "150 VacPacs (3.25mm)",
    requirement: "Monthly supply contract for rolling mill fabrication department.",
    message: "Looking for tiered quarterly pricing with delivery in Mirsharai plant.",
    attachment_name: "",
    attachment_url: "",
    status: "Contacted",
    admin_notes: "Spoke with procurement officer on phone. Preparing quarterly discount matrix.",
    created_at: "2026-09-20 14:30"
  },
  {
    id: 3,
    reference_no: "RFQ-2026-0103",
    customer_name: "Tanvir Ahmed",
    company_name: "Summit Power International",
    email: "t.ahmed@summitpower.com",
    phone: "+880 1912-384729",
    product_id: 3,
    product_name: "KSB Cast Steel Flanged Gate Valve Class 300",
    quantity: "8 Units",
    requirement: "Class 300 DN100 gate valves with mill hydrostatic test certs.",
    message: "Requires MTR for Bibiyana power plant steam auxiliary lines.",
    attachment_name: "valve_spec_sheet.pdf",
    attachment_url: "#",
    status: "Quotation Sent",
    admin_notes: "Formal quotation ART-QT-849 sent via email with 30-day price validity.",
    created_at: "2026-09-18 11:00"
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 1,
    name: "Dr. Nazmul Karim",
    company: "Square Pharmaceuticals Ltd.",
    email: "nazmul.karim@squarepharma.com.bd",
    phone: "+880 1712-482910",
    subject: "Inquiry on Food-Grade Lubricants and Sanitary Valves",
    message: "Good day. We are expanding our sterile liquid manufacturing line in Kaliakoir and need to inspect your stock of NSF H1 synthetic greases and sanitary valves. Can your technical team visit our engineering office?",
    is_read: false,
    admin_notes: "",
    created_at: "2026-09-23 16:45"
  },
  {
    id: 2,
    name: "Engr. Rafiqul Alam",
    company: "Shah Cement Industries Ltd.",
    email: "rafiqul.alam@shahcement.com",
    phone: "+880 1814-554433",
    subject: "Emergency Shutdown Support for Ball Mill #2",
    message: "We experienced unexpected roller bearing seizure on our raw mill drive pinion. We need an on-site engineer to assess housing damage and deliver a replacement 23226 CCK bearing today.",
    is_read: true,
    admin_notes: "Dispatched Senior Field Engineer Engr. Saiful Islam with replacement unit.",
    created_at: "2026-09-21 09:20"
  }
];

export const initialSocialLinks: SocialLink[] = [
  {
    id: 1,
    platform: "linkedin",
    label: "LinkedIn",
    url: "https://www.linkedin.com/company/artindustrialsolutions",
    order: 1,
    is_active: true
  },
  {
    id: 2,
    platform: "facebook",
    label: "Facebook",
    url: "https://www.facebook.com/artindustrialsolutions",
    order: 2,
    is_active: true
  },
  {
    id: 3,
    platform: "youtube",
    label: "YouTube",
    url: "https://www.youtube.com/@artindustrialsolutions",
    order: 3,
    is_active: true
  }
];

export const initialAdminUsers: AdminUser[] = [
  {
    id: 1,
    username: "admin",
    name: "Engr. A. R. Talukder",
    email: "admin@artindustrialsolutions.com",
    role: "Super Admin",
    last_login: "2026-09-24 07:30",
    permissions: [
      'settings',
      'banners',
      'about',
      'categories',
      'products',
      'services',
      'industries',
      'company-docs',
      'vendor-docs',
      'rfqs',
      'messages',
      'users',
      'backup'
    ]
  },
  {
    id: 2,
    username: "content_manager",
    name: "Tanzeem Haque",
    email: "content@artindustrialsolutions.com",
    role: "Content Manager",
    last_login: "2026-09-23 14:15",
    permissions: [
      'banners',
      'about',
      'company-docs',
      'vendor-docs',
      'categories',
      'products',
      'services',
      'industries'
    ]
  },
  {
    id: 3,
    username: "inquiry_manager",
    name: "Farhana Yasmin",
    email: "sales@artindustrialsolutions.com",
    role: "Inquiry Manager",
    last_login: "2026-09-24 06:50",
    permissions: [
      'rfqs',
      'messages'
    ]
  }
];
