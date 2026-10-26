import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { TradeReadinessResult } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { commodity, origin, destination, intendedUse } = body as {
      commodity?: string;
      origin?: string;
      destination?: string;
      intendedUse?: string;
    };

    const comm = commodity || 'Seed Potatoes (Solanum tuberosum)';
    const orig = origin || 'Netherlands';
    const dest = destination || 'Egypt';
    const use = intendedUse || 'Planting / Seed Propagation';

    const ai = getGeminiClient();

    if (ai) {
      try {
        const systemInstruction = `You are the AEIT Trade-Readiness Intelligence Officer.
Adhere strictly to AEIT Operating Principles:
- Treat agricultural trade as a regulated, multi-stage commercial process.
- Distinguish seeds intended for planting from goods intended for direct consumption or processing.
- Identify relevant competent authorities, required documentation, phytosanitary quarantine hazards, and customs questions.
- Never guarantee customs clearance or import approval; always recommend verification with official authorities.
- Output JSON strictly matching the specified schema.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `Analyze trade readiness for:
Commodity: ${comm}
Intended Use: ${use}
Origin Country: ${orig}
Destination Country: ${dest}

Return JSON formatted as:
{
  "commodity": "${comm}",
  "origin": "${orig}",
  "destination": "${dest}",
  "intendedUse": "${use}",
  "hsCodeEstimated": "string (e.g. 0701.10 for seed potatoes)",
  "competentAuthorities": [
    {
      "name": "string",
      "jurisdiction": "string",
      "role": "string",
      "officialUrl": "string"
    }
  ],
  "documentationChecklist": [
    {
      "documentName": "string",
      "issuer": "string",
      "mandatory": true,
      "description": "string"
    }
  ],
  "phytosanitaryRules": ["string"],
  "tariffsAndCustomsWatchouts": ["string"],
  "unresolvedQuestions": ["string"],
  "recommendedNextSteps": ["string"]
}`,
          config: {
            systemInstruction,
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const raw = response.text?.trim() || '{}';
        const parsed: TradeReadinessResult = JSON.parse(raw);
        return NextResponse.json(parsed);
      } catch (geminiError: any) {
        console.warn('Gemini trade-readiness call failed, falling back to deterministic analyzer:', geminiError?.message);
      }
    }

    // Deterministic Trade-Readiness Fallback
    const fallback = getDeterministicTradeReadiness(comm, orig, dest, use);
    return NextResponse.json(fallback);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Error processing trade readiness' },
      { status: 500 }
    );
  }
}

function getDeterministicTradeReadiness(
  commodity: string,
  origin: string,
  destination: string,
  intendedUse: string
): TradeReadinessResult {
  const isEgypt = destination.toLowerCase().includes('egypt');
  const isSeedPotato = commodity.toLowerCase().includes('potato') || commodity.toLowerCase().includes('seed');

  if (isEgypt && isSeedPotato) {
    return {
      commodity: 'Certified Seed Potatoes (Solanum tuberosum)',
      origin: origin || 'Netherlands / Scotland',
      destination: 'Egypt (Port of Alexandria / Port Said)',
      intendedUse: intendedUse || 'Planting / Seed Propagation',
      hsCodeEstimated: '0701.10.00 (Seed Potatoes)',
      competentAuthorities: [
        {
          name: 'CAPQ — Central Administration of Plant Quarantine',
          jurisdiction: 'Egypt (Ministry of Agriculture and Land Reclamation)',
          role: 'Issues import permits, conducts pre-clearance sampling at port of arrival, and regulates quarantine pests.',
          officialUrl: 'https://www.capq.gov.eg'
        },
        {
          name: 'NVWA — Netherlands Food and Consumer Product Safety Authority (or SASA in UK)',
          jurisdiction: 'Origin Country',
          role: 'Conducts field inspections, laboratory PCR testing, and issues the official Phytosanitary Certificate.',
          officialUrl: 'https://www.nvwa.nl'
        },
        {
          name: 'GOEIC — General Organization for Export and Import Control',
          jurisdiction: 'Egypt',
          role: 'Mandatory commercial inspection, packaging verification, and customs clearance clearance oversight.',
          officialUrl: 'https://www.goeic.gov.eg'
        }
      ],
      documentationChecklist: [
        {
          documentName: 'Advance Import Permit (CAPQ License)',
          issuer: 'Egyptian Ministry of Agriculture',
          mandatory: true,
          description: 'Must be issued in the importer’s name prior to vessel departure from the European loading port.'
        },
        {
          documentName: 'Official Phytosanitary Certificate (Model IPPC)',
          issuer: 'NVWA (Netherlands) or SASA / APHA (United Kingdom)',
          mandatory: true,
          description: 'Must contain specific additional declarations attesting freedom from Brown Rot (Ralstonia solanacearum) and Ring Rot (Clavibacter sepedonicus).'
        },
        {
          documentName: 'Official Seed Classification Certificate (NAK or SASA SPCS)',
          issuer: 'Official Seed Testing Station',
          mandatory: true,
          description: 'Certifies class (Class A / Super Elite), sizing (28-55mm), and tuber purity.'
        },
        {
          documentName: 'Certificate of Origin (EUR.1 or Chamber of Commerce)',
          issuer: 'Export Chamber of Commerce',
          mandatory: true,
          description: 'Required for preferential tariff rate under the EU-Egypt Association Agreement.'
        },
        {
          documentName: 'Continuous Reefer Temperature Data Log',
          issuer: 'Ocean Carrier / Reefer Technician',
          mandatory: true,
          description: 'Verification that transit temperatures remained between +3.0°C and +5.0°C without condensation.'
        }
      ],
      phytosanitaryRules: [
        'Zero tolerance for Ralstonia solanacearum (Brown rot); any positive PCR sample results in mandatory rejection or re-export of the entire lot.',
        'Zero tolerance for potato cyst nematodes (Globodera rostochiensis, Globodera pallida) in soil residue (maximum permissible adhering soil < 1.0% by weight).',
        'Tuber calibration strictly enforced: between 28mm and 55mm square mesh screen sizing.'
      ],
      tariffsAndCustomsWatchouts: [
        'Seed potatoes benefit from 0% customs duty under agricultural development concessions, but are subject to GOEIC inspection and CAPQ laboratory assay fees.',
        'Advance Cargo Information (Nafeza ACID number): The Egyptian importer must generate a 19-digit ACID code at least 48 hours prior to vessel departure, and it must appear on all shipping documents.'
      ],
      unresolvedQuestions: [
        'Has the Egyptian buyer already secured their annual seed import quota allocation for the current season?',
        'Does the chosen shipping line provide dual NIST-calibrated electronic temperature loggers in the reefer container?'
      ],
      recommendedNextSteps: [
        'Request proforma invoice and obtain ACID filing reference from Egyptian customs portal (Nafeza).',
        'Have the supplier transmit draft phytosanitary wording to CAPQ for pre-departure verification.',
        'Arrange payment terms via Irrevocable Confirmed Letter of Credit payable against shipping documents.'
      ]
    };
  }

  // General agricultural trade corridor
  return {
    commodity: commodity,
    origin: origin || 'Origin Country',
    destination: destination || 'Destination Country',
    intendedUse: intendedUse || 'Commercial B2B Trade',
    hsCodeEstimated: 'Chapter 07 / 08 / 84 (Agricultural Products or Machinery)',
    competentAuthorities: [
      {
        name: 'National Plant Protection Organization (NPPO)',
        jurisdiction: destination,
        role: 'Regulates biosecurity, pest risk assessments, and import permitting.',
        officialUrl: 'https://www.ippc.int'
      },
      {
        name: 'National Customs & Revenue Authority',
        jurisdiction: destination,
        role: 'Tariff classification, VAT collection, and clearance processing.',
        officialUrl: 'https://www.wcoomd.org'
      }
    ],
    documentationChecklist: [
      {
        documentName: 'Commercial Invoice & Detailed Packing List',
        issuer: 'Exporter / Seller',
        mandatory: true,
        description: 'Specifies HS codes, net/gross weights, batch numbers, and Incoterms.'
      },
      {
        documentName: 'Bill of Lading / Air Waybill',
        issuer: 'Ocean Freight Carrier or Air Carrier',
        mandatory: true,
        description: 'Clean on-board document establishing legal title and transport terms.'
      },
      {
        documentName: 'Phytosanitary Certificate or Conformity Assessment',
        issuer: 'Competent Authority at Origin',
        mandatory: true,
        description: 'Attests to biosecurity compliance or machinery CE/electrical safety.'
      }
    ],
    phytosanitaryRules: [
      'Commodity must be free of regulated quarantine pests according to the destination country’s plant health schedules.',
      'Wood packaging material (pallets, dunnage) must comply with ISPM 15 heat treatment and debarking stamps.'
    ],
    tariffsAndCustomsWatchouts: [
      'Check applicable Most Favored Nation (MFN) tariff rates vs Bilateral Free Trade Agreements.',
      'Port storage demurrage and detention charges apply if clearance documentation is delayed.'
    ],
    unresolvedQuestions: [
      'Are import permits required prior to loading or prior to customs arrival?',
      'Is third-party pre-shipment quality inspection (e.g. SGS, Bureau Veritas) demanded by the buyer’s bank?'
    ],
    recommendedNextSteps: [
      'Verify import requirements with the destination country’s official agricultural ministry.',
      'Engage an accredited customs clearing agent at the arrival port before releasing cargo.',
      'Ensure Incoterms (e.g. CIF, FOB, DAP) are clearly documented in the sales contract.'
    ]
  };
}
