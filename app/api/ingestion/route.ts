import { NextRequest, NextResponse } from 'next/server';
import { SEED_INGESTION_RUNS, SEED_DEDUP_QUEUE, DeduplicationCandidate } from '@/lib/data/ingestion';

let currentRuns = [...SEED_INGESTION_RUNS];
let currentQueue: DeduplicationCandidate[] = [...SEED_DEDUP_QUEUE];

export async function GET() {
  return NextResponse.json({
    runs: currentRuns,
    queue: currentQueue,
    stats: {
      totalDiscovered: currentRuns.reduce((acc, r) => acc + r.recordsDiscovered, 0),
      totalAccepted: currentRuns.reduce((acc, r) => acc + r.recordsAccepted, 0),
      quarantineCount: currentRuns.reduce((acc, r) => acc + r.quarantinedCount, 0),
      pendingDedupReviews: currentQueue.filter((q) => q.status === 'Pending Review').length,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, candidateId, resolution } = body;

    if (action === 'trigger_ingestion') {
      const newRun = {
        id: `run-${Date.now()}`,
        sourceName: body.sourceName || 'International Ag Chamber Feed',
        sourceType: (body.sourceType || 'Government Registry') as any,
        recordsDiscovered: 48,
        recordsAccepted: 46,
        duplicateCount: 2,
        quarantinedCount: 0,
        runDate: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        status: 'Verified Success' as const,
        auditHash: `sha256-${Math.random().toString(16).substring(2, 10)}`,
      };
      currentRuns = [newRun, ...currentRuns];
      return NextResponse.json({ success: true, run: newRun });
    }

    if (action === 'resolve_dedup') {
      currentQueue = currentQueue.map((q) =>
        q.id === candidateId ? { ...q, status: resolution || 'Merged' } : q
      );
      return NextResponse.json({ success: true, queue: currentQueue });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
