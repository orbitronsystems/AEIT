export type TradeArm =
  | 'ARM_A_SUPPLIERS' // Machinery, irrigation, seeds, inputs, cold chain
  | 'ARM_B_PRODUCERS' // Farms, co-ops, nurseries, agricultural land leases
  | 'ARM_C_TRADE'     // Exporters, importers, traders, commodity brokers
  | 'ARM_D_EVENTS';   // Expos, conferences, trade delegations

export type EvidenceClassification =
  | 'officially_sourced'
  | 'independently_corroborated'
  | 'source_reported'
  | 'inferred'
  | 'unverified'
  | 'conflicting'
  | 'stale';

export interface VerificationStatus {
  identity: boolean;
  businessRegistration: boolean;
  contactVerified: boolean;
  certification: boolean;
  tradeHistory: boolean;
  overallLevel: 'Fully Verified' | 'Conditionally Verified' | 'Under Review' | 'Unverified';
}

export interface SourceProvenance {
  sourceName: string;
  sourceUrl: string;
  retrievalDate: string;
  evidenceType: EvidenceClassification;
  notes?: string;
}

export interface AgriBusiness {
  id: string;
  name: string;
  arm: TradeArm;
  subCategory: string; // e.g. "Seed Producer & Breeding", "Drip Irrigation & Solar Pumps", "Grain & Citrus Exporter"
  country: string;
  city: string;
  website: string;
  contactEmail: string;
  phone?: string;
  overview: string;
  verifiedStatus: VerificationStatus;
  products: string[];
  certifications: string[]; // GlobalGAP, NAK Certified, SASA Elite, ISO 22000, organic
  annualCapacity: string;
  minOrderQty: string;
  incoterms: string[]; // FOB, CIF, DAP, EXW
  exportDestinations: string[];
  sourceProvenance: SourceProvenance;
  landDetails?: {
    totalAreaHa: number;
    leaseTermYears: number;
    waterAccess: string;
    soilType: string;
    dueDiligenceStatus: string;
  };
}

export interface AgriEvent {
  id: string;
  name: string;
  category: string; // "Machinery Expo", "Horticulture Trade Fair", "B2B Grain Summit", "AgTech Convention"
  organizer: string;
  country: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  format: 'In-Person' | 'Virtual' | 'Hybrid';
  description: string;
  officialUrl: string;
  registrationUrl: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Postponed' | 'Cancelled' | 'Unconfirmed';
  confidence: 'High' | 'Medium' | 'Low';
  lastChecked: string;
  topics: string[];
  featuredExhibitors?: string[];
}

export interface SourcingQuery {
  commodity: string;
  variety?: string;
  intendedUse?: 'Planting / Seed' | 'Processing / Industrial' | 'Direct Consumption / Retail' | 'Machinery Deployment';
  quantity: number;
  unit: string;
  origin?: string;
  destination: string;
  deliveryPeriod?: string;
  targetCertifications?: string[];
  specifications?: string;
}

export interface MatchCandidate {
  businessId: string;
  businessName: string;
  country: string;
  subCategory: string;
  matchScore: number; // 0 - 100
  matchRationale: string;
  satisfiedRequirements: string[];
  missingInformation: string[];
  riskFlags: string[];
  suggestedQuestions: string[];
  nextAction: string;
  verifiedLevel: VerificationStatus['overallLevel'];
}

export interface MatchResult {
  query: SourcingQuery;
  candidates: MatchCandidate[];
  extractedIntent: string;
  reasoningEngine: 'Gemini 3.8 Flash' | 'Deterministic Fallback Engine';
  timestamp: string;
}

export interface TradeReadinessResult {
  commodity: string;
  origin: string;
  destination: string;
  intendedUse: string;
  hsCodeEstimated?: string;
  competentAuthorities: {
    name: string;
    jurisdiction: string;
    role: string;
    officialUrl: string;
  }[];
  documentationChecklist: {
    documentName: string;
    issuer: string;
    mandatory: boolean;
    description: string;
  }[];
  phytosanitaryRules: string[];
  tariffsAndCustomsWatchouts: string[];
  unresolvedQuestions: string[];
  recommendedNextSteps: string[];
}

export interface WorkspaceLead {
  id: string;
  title: string;
  category: 'business' | 'event' | 'sourcing_rfq';
  country: string;
  stage: 'Identified' | 'Contacted' | 'In Review' | 'Qualified' | 'Inquiry Sent';
  notes: string;
  savedAt: string;
  details: Record<string, any>;
}

export interface IngestionRun {
  id: string;
  sourceName: string;
  sourceType: 'Government Registry' | 'Official Trade Fair Organizer' | 'Accredited Lab / Certifier' | 'Industry Association';
  recordsDiscovered: number;
  recordsAccepted: number;
  duplicateCount: number;
  quarantinedCount: number;
  runDate: string;
  status: 'Verified Success' | 'Pending Review' | 'Flagged Warnings';
  auditHash: string;
}
