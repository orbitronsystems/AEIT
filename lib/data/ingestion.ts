import { IngestionRun } from '../types';

export const SEED_INGESTION_RUNS: IngestionRun[] = [
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
    primaryEntity: 'HZPC Holland B.V. (Joure, Netherlands)',
    incomingEntity: 'HZPC France SAS (La Guerche-de-Bretagne, France)',
    similarityScore: 0.88,
    conflictingField: 'Corporate Entity & Seed Certification Jurisdiction',
    primaryValue: 'Dutch NAK Registry #01048680',
    incomingValue: 'French GNIS / SEMAE Registry #FR-35125',
    status: 'Pending Review'
  },
  {
    id: 'dedup-02',
    primaryEntity: 'Agrico Cooperative U.A. (Emmeloord)',
    incomingEntity: 'Agrico Trade Sp. z o.o. (Poland)',
    similarityScore: 0.82,
    conflictingField: 'Operating License & Tax Jurisdiction',
    primaryValue: 'Netherlands KvK 39014164',
    incomingValue: 'Poland KRS 0000184421',
    status: 'Pending Review'
  }
];
