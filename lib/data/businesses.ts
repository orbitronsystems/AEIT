import { AgriBusiness } from '../types';

export const SEED_BUSINESSES: AgriBusiness[] = [
  {
    id: 'biz-hzpc-nl',
    name: 'HZPC Holland B.V.',
    arm: 'ARM_A_SUPPLIERS',
    subCategory: 'Certified Seed Potatoes & Breeding Genetics',
    country: 'Netherlands',
    city: 'Joure',
    website: 'https://www.hzpc.com',
    contactEmail: 'trade-export@hzpc.com',
    phone: '+31 513 483 483',
    overview: 'Global market leader in potato breeding, seed potato production, and international crop development. Specializes in disease-resistant seed potato varieties for warm Mediterranean and North African climates (e.g., Spunta, Arizona, Panamera).',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'Seed Potatoes (Variety: Spunta, Class A/Elite)',
      'Seed Potatoes (Variety: Arizona, high heat tolerance)',
      'Seed Potatoes (Variety: Panamera)',
      'Agronomic crop management blueprints'
    ],
    certifications: ['NAK Certified (Dutch General Inspection Service)', 'GlobalGAP', 'EU Seed Passport Directive 2002/56/EC'],
    annualCapacity: '950,000 Metric Tonnes across contracted EU growers',
    minOrderQty: '25 Metric Tonnes (1 standard reefer container 40ft)',
    incoterms: ['FOB Rotterdam', 'CIF Alexandria', 'CIF Port Said', 'CFR Damietta'],
    exportDestinations: ['Egypt', 'Algeria', 'Morocco', 'Saudi Arabia', 'Turkey', 'United Kingdom', 'Spain'],
    sourceProvenance: {
      sourceName: 'Netherlands Chamber of Commerce (KvK #01048680) & NAK Inspection Registry',
      sourceUrl: 'https://www.nak.nl/registers',
      retrievalDate: '2026-09-14',
      evidenceType: 'officially_sourced',
      notes: 'Official phytosanitary and certification registration confirmed through NAK inspection lot register.'
    }
  },
  {
    id: 'biz-saltire-scot',
    name: 'Caledonian Seed & Scottish Potato Producers Ltd.',
    arm: 'ARM_A_SUPPLIERS',
    subCategory: 'High-Health Seed Potato Specialist',
    country: 'United Kingdom',
    city: 'Perth, Scotland',
    website: 'https://www.scottishseedpotatoes.example.org',
    contactEmail: 'exports@caledonian-seed.co.uk',
    phone: '+44 1738 620 119',
    overview: 'Scottish high-grade seed potato producer operating under Scotland’s renowned aphid-free cool maritime conditions. Direct exporter of certified Super Elite and Pre-Basic grades to North Africa and the Middle East.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'Certified Seed Potatoes (Variety: Spunta, Grade Super Elite 1/2)',
      'Certified Seed Potatoes (Variety: Hermes, crisping variety)',
      'Certified Seed Potatoes (Variety: Lady Rosetta)'
    ],
    certifications: ['SASA (Science and Advice for Scottish Agriculture) Seed Potato Classification Scheme', 'GlobalGAP', 'British Potato Trade Association Member'],
    annualCapacity: '65,000 Metric Tonnes',
    minOrderQty: '27 Metric Tonnes (40ft Ventilated Reefer Container)',
    incoterms: ['FOB Grangemouth', 'CIF Alexandria', 'CIF Casablanca'],
    exportDestinations: ['Egypt', 'Morocco', 'Israel', 'Thailand', 'Spain'],
    sourceProvenance: {
      sourceName: 'SASA Scottish Seed Potato Classification Scheme Register (SPCS 2026)',
      sourceUrl: 'https://www.sasa.gov.uk/seed-potatoes',
      retrievalDate: '2026-08-30',
      evidenceType: 'officially_sourced',
      notes: 'Scottish phytosanitary clean stock testing verified for bacterial ring rot, brown rot, and PSTVd.'
    }
  },
  {
    id: 'biz-agrico-nl',
    name: 'Agrico Cooperative U.A.',
    arm: 'ARM_C_TRADE',
    subCategory: 'Cooperative Seed & Ware Potato Exporter',
    country: 'Netherlands',
    city: 'Emmeloord',
    website: 'https://www.agrico.nl',
    contactEmail: 'international-desk@agrico.nl',
    phone: '+31 527 639 911',
    overview: 'Farmer-owned cooperative with over 800 member growers in the Flevoland polder. Specializes in organic and conventional seed potatoes, refrigerated logistics, and turnkey export consignments.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'Seed Potatoes (Variety: Rudolph, red skinned)',
      'Seed Potatoes (Variety: Fontane, processing)',
      'Organic Certified Seed Potatoes (Skal NL-BIO-01)'
    ],
    certifications: ['NAK Standard', 'Skal Organic Certification', 'ISO 9001:2015', 'GlobalGAP CoC'],
    annualCapacity: '480,000 Metric Tonnes',
    minOrderQty: '50 Metric Tonnes (2 x 40ft reefers)',
    incoterms: ['FOB Amsterdam', 'CIF Alexandria', 'DAP European Terminal'],
    exportDestinations: ['Egypt', 'Italy', 'Germany', 'Jordan', 'Iraq'],
    sourceProvenance: {
      sourceName: 'NAK Certified Lots & Dutch Trade Directory',
      sourceUrl: 'https://www.nak.nl',
      retrievalDate: '2026-09-02',
      evidenceType: 'independently_corroborated'
    }
  },
  {
    id: 'biz-netafim-precision',
    name: 'Netafim Precision Irrigation (Orbia Agri)',
    arm: 'ARM_A_SUPPLIERS',
    subCategory: 'Drip Irrigation & Automated Fertigation Systems',
    country: 'Israel',
    city: 'Tel Aviv',
    website: 'https://www.netafim.com',
    contactEmail: 'commercial-emea@netafim.com',
    phone: '+972 3 625 7222',
    overview: 'Pioneer of precision drip irrigation and digital farming technology. Produces pressure-compensating drippers, filtration units, solar-driven smart fertigation systems, and turnkey orchard/greenhouse irrigation systems.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'UniRam™ Pressure Compensating Heavy-Wall Drip Line',
      'NetBeat™ Cloud-Controlled Irrigation Automation Unit',
      'Sand Media & Disc Filtration Banks',
      'Solar-Powered Variable Frequency Pump Controllers'
    ],
    certifications: ['ISO 14001', 'ISO 9001', 'CE Conformity Marking', 'WaterSense Partner'],
    annualCapacity: 'Over 2.5 Billion meters of dripline annually',
    minOrderQty: '10,000 meters / or 1 standard container equivalent',
    incoterms: ['FOB Haifa', 'CIF Mombasa', 'CIF Alexandria', 'DAP Agadir'],
    exportDestinations: ['Kenya', 'Egypt', 'Morocco', 'India', 'Brazil', 'Spain', 'USA'],
    sourceProvenance: {
      sourceName: 'Official Corporate Registry & Manufacturer Documentation',
      sourceUrl: 'https://www.netafim.com/en/certifications/',
      retrievalDate: '2026-07-15',
      evidenceType: 'officially_sourced'
    }
  },
  {
    id: 'biz-nile-reclamation',
    name: 'Nile Delta Agro Cooperative & Land Reclamation',
    arm: 'ARM_B_PRODUCERS',
    subCategory: 'Commercial Grower, Co-op & Contract Farming',
    country: 'Egypt',
    city: 'Beheira Governorate',
    website: 'https://www.nile-delta-agro.example.eg',
    contactEmail: 'operations@nile-delta-agro.example.eg',
    phone: '+20 45 321 9801',
    overview: 'Agricultural cooperative managing 3,200 feddans (approx. 1,350 ha) of modern desert reclamation cropland. Primary crops include processing potatoes, onions, Valencia oranges, and winter wheat under center-pivot irrigation.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: false,
      overallLevel: 'Conditionally Verified',
    },
    products: [
      'Fresh Table Potatoes (Spunta / Cara varieties)',
      'Fresh Yellow Onions (Grade 1, 50-70mm mesh bagged)',
      'Valencia Citrus (Waxed & graded for Gulf/EU export)',
      'Contract Farming Partnerships (Outgrower agreements)'
    ],
    certifications: ['GlobalGAP IFA v6.0', 'TNC (Tesco Nurture Choice)', 'Egyptian CAPQ Registered Export Farm #EG-904'],
    annualCapacity: '42,000 MT Fresh Produce',
    minOrderQty: '25 Metric Tonnes',
    incoterms: ['FOB Alexandria', 'FOB Damietta'],
    exportDestinations: ['United Arab Emirates', 'Saudi Arabia', 'Russia', 'Greece', 'Netherlands'],
    sourceProvenance: {
      sourceName: 'Central Administration of Plant Quarantine (CAPQ) Certified Farm Registry',
      sourceUrl: 'https://www.capq.gov.eg/approved-farms',
      retrievalDate: '2026-09-10',
      evidenceType: 'officially_sourced'
    }
  },
  {
    id: 'biz-buhaira-land-opp',
    name: 'Al-Buhaira Desert Bloom Ag Leaseholding',
    arm: 'ARM_B_PRODUCERS',
    subCategory: 'Agricultural Land Lease & Development Opportunity',
    country: 'Egypt',
    city: 'Wadi El Natrun, Beheira',
    website: 'https://www.albuhaira-agriland.example.eg',
    contactEmail: 'land-desk@albuhaira-agriland.example.eg',
    phone: '+20 2 2795 4400',
    overview: '450 Hectare titled agricultural parcel with permitted deep Nubian Sandstone aquifer extraction wells (salinity < 550 ppm). Equipped with 6 operational Lindsay pivots, gravel access road, and 3-phase grid electricity connection.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: false,
      tradeHistory: false,
      overallLevel: 'Conditionally Verified',
    },
    products: [
      'Agricultural Land Lease (450 Hectares, 15-year renewable lease)',
      'Permitted Deep Well Water Extraction Rights (6 wells operational)',
      'Pre-installed Center Pivot Infrastructure'
    ],
    certifications: ['Egyptian Ministry of Agriculture Land Ownership Deed Ref #2019/884', 'Ministry of Water Resources & Irrigation Well Permit #W-4412'],
    annualCapacity: '450 Hectares (Arable and irrigated)',
    minOrderQty: 'Minimum parcel divisible: 75 Hectares',
    incoterms: ['Local Lease Agreement governed by Egyptian Commercial Code'],
    exportDestinations: ['Local production designated for Alexandria Port re-export'],
    landDetails: {
      totalAreaHa: 450,
      leaseTermYears: 15,
      waterAccess: '6 deep wells, 550 ppm TDS, tested flow rate 180 m3/hr each',
      soilType: 'Sandy loam with low salinity (EC < 2.0 dS/m), suitable for potatoes, citrus, and alfalfa',
      dueDiligenceStatus: 'Titled deed and water extraction permits inspected; environmental due diligence report available on request.'
    },
    sourceProvenance: {
      sourceName: 'Egyptian General Authority for Reconstruction Projects and Agricultural Development (GARPAD)',
      sourceUrl: 'https://garpad.gov.eg/cadastre',
      retrievalDate: '2026-08-18',
      evidenceType: 'source_reported',
      notes: 'Water test certificates submitted by owner; independent hydrological lab audit recommended prior to signing lease.'
    }
  },
  {
    id: 'biz-grimme-machinery',
    name: 'GRIMME Landmaschinenfabrik GmbH & Co. KG',
    arm: 'ARM_A_SUPPLIERS',
    subCategory: 'Root Crop Harvesting & Sorting Machinery',
    country: 'Germany',
    city: 'Damme',
    website: 'https://www.grimme.com',
    contactEmail: 'info@grimme.de',
    phone: '+49 5491 666-0',
    overview: 'World-renowned German engineering specialist for potato, beet, and onion planting, harvesting, and handling technology. Manufactures trailed and self-propelled potato harvesters, stone separators, and high-capacity grading lines.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'GRIMME EVO 290 2-row Potato Harvester with AirSep separator',
      'GRIMME GL 420 4-row Cup Planter with fertilizer placement',
      'RH 24-60 Combi Receiving Hopper & Pre-Grading System',
      'Original OEM Spare Parts & Field Tech Support'
    ],
    certifications: ['ISO 9001:2015', 'CE Machinery Directive', 'DLG Tested Excellence'],
    annualCapacity: 'Over 4,500 machines produced annually',
    minOrderQty: '1 Unit',
    incoterms: ['FOB Hamburg', 'CIF Alexandria', 'CIF Santos', 'DAP European dealer'],
    exportDestinations: ['Global distribution across 120+ countries including Egypt, South Africa, Turkey, Poland, USA'],
    sourceProvenance: {
      sourceName: 'German Commercial Register (Amtsgericht Oldenburg HRA 110292)',
      sourceUrl: 'https://www.handelsregister.de',
      retrievalDate: '2026-09-01',
      evidenceType: 'officially_sourced'
    }
  },
  {
    id: 'biz-outeniqua-citrus',
    name: 'Outeniqua Citrus & Fruit Exporters',
    arm: 'ARM_C_TRADE',
    subCategory: 'Fresh Citrus, Table Grapes & Stone Fruit Exporter',
    country: 'South Africa',
    city: 'Citrusdal, Western Cape',
    website: 'https://www.outeniqua-fruit.example.za',
    contactEmail: 'trade@outeniqua-fruit.example.za',
    phone: '+27 22 921 2100',
    overview: 'Specialist southern hemisphere exporter of fresh citrus (Midknight Valencia, Star Ruby Grapefruit, Clementines) and table grapes. Complete integrated cold-chain from on-farm packing shed to Port of Cape Town container terminals.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'Valencia Oranges (Count 48/56/64/72, Telescopic carton 15kg)',
      'Star Ruby Grapefruit (Class 1)',
      'Midnight Beauty Seedless Black Table Grapes (4.5kg punnets)'
    ],
    certifications: ['PPECB Export Quality Certified (Perishable Products Export Control Board)', 'GlobalGAP', 'SMETA 4-Pillar Ethical Trade Audit'],
    annualCapacity: '1,800,000 standard 15kg export cartons per season',
    minOrderQty: '20 Metric Tonnes (1 x 40ft High Cube Reefer)',
    incoterms: ['FOB Cape Town', 'FOB Durban', 'CIF Rotterdam', 'CIF Jebel Ali'],
    exportDestinations: ['Netherlands', 'United Kingdom', 'United Arab Emirates', 'China', 'Saudi Arabia'],
    sourceProvenance: {
      sourceName: 'PPECB South Africa Accredited Cold Chain & Export Registry',
      sourceUrl: 'https://ppecb.com',
      retrievalDate: '2026-09-18',
      evidenceType: 'officially_sourced'
    }
  },
  {
    id: 'biz-rijk-zwaan',
    name: 'Rijk Zwaan Zaadteelt en Zaadhandel B.V.',
    arm: 'ARM_A_SUPPLIERS',
    subCategory: 'Vegetable Seed Breeding & Hydroponic Genetics',
    country: 'Netherlands',
    city: 'De Lier',
    website: 'https://www.rijkzwaan.com',
    contactEmail: 'seeds-export@rijkzwaan.com',
    phone: '+31 174 532 300',
    overview: 'Global vegetable breeding company developing high-yielding, pest-resistant seeds for open field, high-tech glasshouse, and vertical farming setups. Over 1,500 active varieties including Salanova® lettuce, sweet peppers, and rootstocks.',
    verifiedStatus: {
      identity: true,
      businessRegistration: true,
      contactVerified: true,
      certification: true,
      tradeHistory: true,
      overallLevel: 'Fully Verified',
    },
    products: [
      'Salanova® Multi-leaf Lettuce Hybrid Seeds',
      'Tomatoes for Protected Cultivation (Resistant to ToBRFV)',
      'Cucumber and Sweet Bell Pepper Seeds',
      'Bio-pelleted seed treatments for organic precision seeding'
    ],
    certifications: ['ISTA Accredited Testing Lab', 'NAL (Naktuinbouw Authorized Laboratories)', 'EU Plant Health Directive'],
    annualCapacity: 'Global distribution network covering >100 countries',
    minOrderQty: '1,000 seeds / or 1 standard packaging pouch',
    incoterms: ['CIP Destination Airport', 'CPT Courier Airfreight', 'FOB Schiphol Amsterdam'],
    exportDestinations: ['Worldwide: Middle East, North Africa, Americas, Asia, Europe'],
    sourceProvenance: {
      sourceName: 'Naktuinbouw Elite Seed Certification Registry',
      sourceUrl: 'https://www.naktuinbouw.com',
      retrievalDate: '2026-09-05',
      evidenceType: 'officially_sourced'
    }
  }
];
