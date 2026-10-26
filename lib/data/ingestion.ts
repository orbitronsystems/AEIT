import { IngestionRun } from '../types';

export const SEED_INGESTION_RUNS: IngestionRun[] = [
  {
    id: 'run-usda-fgis-2026',
    sourceName: 'USDA Federal Grain Inspection Service (FGIS Export Terminals)',
    sourceType: 'Government Registry',
    recordsDiscovered: 1420,
    recordsAccepted: 1395,
    duplicateCount: 18,
    quarantinedCount: 7,
    runDate: '2026-10-25 18:40 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-a9f821d37482910bc472a10e'
  },
  {
    id: 'run-maff-japan-2026',
    sourceName: 'Japan MAFF Ministry Plant Protection & Machinery Registry',
    sourceType: 'Government Registry',
    recordsDiscovered: 650,
    recordsAccepted: 642,
    duplicateCount: 6,
    quarantinedCount: 2,
    runDate: '2026-10-24 12:10 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-f8101a938c71b02130e94811'
  },
  {
    id: 'run-nak-2026-10',
    sourceName: 'NAK Dutch General Inspection Service — Seed Potato Class Lots',
    sourceType: 'Accredited Lab / Certifier',
    recordsDiscovered: 412,
    recordsAccepted: 405,
    duplicateCount: 5,
    quarantinedCount: 2,
    runDate: '2026-10-24 03:15 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-e9c8b731f24d08a0491761b0'
  },
  {
    id: 'run-kephis-kenya-2026',
    sourceName: 'KEPHIS Kenya Plant Health Inspectorate Service (Avocado & Fresh Produce)',
    sourceType: 'Government Registry',
    recordsDiscovered: 285,
    recordsAccepted: 278,
    duplicateCount: 4,
    quarantinedCount: 3,
    runDate: '2026-10-23 09:15 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-c774b9101e48f821901a8842'
  },
  {
    id: 'run-sasa-2026-10',
    sourceName: 'SASA Scottish Seed Potato Classification Register',
    sourceType: 'Government Registry',
    recordsDiscovered: 184,
    recordsAccepted: 182,
    duplicateCount: 2,
    quarantinedCount: 0,
    runDate: '2026-10-22 08:30 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-42d87e14a199bcf821e84711'
  },
  {
    id: 'run-dlg-agritechnica',
    sourceName: 'DLG Trade Fair Exhibitor Registry (Hannover Messegelände)',
    sourceType: 'Official Trade Fair Organizer',
    recordsDiscovered: 890,
    recordsAccepted: 864,
    duplicateCount: 18,
    quarantinedCount: 8,
    runDate: '2026-10-20 14:00 UTC',
    status: 'Verified Success',
    auditHash: 'sha256-3b99471f0088cbda9e312a0f'
  },
  {
    id: 'run-capq-egypt',
    sourceName: 'CAPQ Egyptian Central Administration of Plant Quarantine (Export Registries)',
    sourceType: 'Government Registry',
    recordsDiscovered: 320,
    recordsAccepted: 298,
    duplicateCount: 14,
    quarantinedCount: 8,
    runDate: '2026-10-18 11:45 UTC',
    status: 'Flagged Warnings',
    auditHash: 'sha256-8a716bc53e7f910419d88301'
  }
];

export interface DeduplicationCandidate {
  id: string;
  primaryEntity: string;
  incomingEntity: string;
  similarityScore: number;
  conflictingField: string;
  primaryValue: string;
  incomingValue: string;
  status: 'Pending Review' | 'Merged' | 'Separated';
}

export const SEED_DEDUP_QUEUE: DeduplicationCandidate[] = [
  {
    id: 'dedup-01',
    primaryEntity: 'Deere & Company (Moline, IL, USA)',
    incomingEntity: 'John Deere Brasil Ltda (Indaiatuba, Brazil)',
    similarityScore: 0.91,
    conflictingField: 'Regional OEM Division & Tax Jurisdiction',
    primaryValue: 'US SEC EDGAR CIK #0000315189',
    incomingValue: 'Brazil CNPJ #61.402.096/0001-08',
    status: 'Pending Review'
  },
  {
    id: 'dedup-02',
    primaryEntity: 'Kubota Corporation (Osaka, Japan)',
    incomingEntity: 'Kubota Agricultural Machinery India Pvt Ltd (Chennai, India)',
    similarityScore: 0.89,
    conflictingField: 'Regional Assembly & Export Import Code',
    primaryValue: 'Japan Corporate #4120001037785',
    incomingValue: 'India IEC #0408018320',
    status: 'Pending Review'
  },
  {
    id: 'dedup-03',
    primaryEntity: 'HZPC Holland B.V. (Joure, Netherlands)',
    incomingEntity: 'HZPC France SAS (La Guerche-de-Bretagne, France)',
    similarityScore: 0.88,
    conflictingField: 'Corporate Entity & Seed Certification Jurisdiction',
    primaryValue: 'Dutch NAK Registry #01048680',
    incomingValue: 'French GNIS / SEMAE Registry #FR-35125',
    status: 'Pending Review'
  }
];
