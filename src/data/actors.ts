import type { Actor, ActorCategory } from './types'

export const currentActors: Actor[] = [
  {
    id: 'PRES',
    name: 'Presidency',
    role: 'Presidential Administration',
    category: 'executive',
  },
  {
    id: 'CSAT',
    name: 'CSAT',
    role: 'Supreme Council of National Defence',
    category: 'executive',
    note: 'Coordination node with limited transparency',
  },
  {
    id: 'SRI',
    name: 'SRI',
    role: 'Domestic intelligence (military)',
    category: 'agency',
    note: 'Receives, stores and correlates data without a unified warrant ledger',
  },
  {
    id: 'SIE',
    name: 'SIE',
    role: 'Foreign intelligence (military)',
    category: 'agency',
    note: 'Foreign ops with no domestic oversight',
  },
  {
    id: 'STS',
    name: 'STS',
    role: 'Telecom / IT technical intercepts',
    category: 'agency',
    note: 'Shared infrastructure, unclear separation from SRI',
  },
  {
    id: 'DIICOT',
    name: 'DIICOT / PICCJ',
    role: 'Prosecutors',
    category: 'justice',
    note: 'Receives referrals, not traceable evidence chains',
  },
  {
    id: 'ICCJ',
    name: 'ICCJ',
    role: 'High Court of Cassation',
    category: 'judicial',
  },
  {
    id: 'JPC',
    name: 'Joint Parliamentary Committee',
    role: 'SRI/SIE oversight',
    category: 'oversight',
    note: 'Receives filtered briefings, not verifiable data; no subpoena power',
  },
  {
    id: 'ANSPDCP',
    name: 'ANSPDCP',
    role: 'Data Protection Authority',
    category: 'oversight',
  },
  {
    id: 'OMB',
    name: 'Ombudsman',
    role: 'Civil rights oversight',
    category: 'oversight',
  },
  {
    id: 'DNSC',
    name: 'DNSC',
    role: 'Civilian cyber defense',
    category: 'civilian',
  },
  {
    id: 'PUB',
    name: 'Public / Media',
    role: 'Recipients of narratives',
    category: 'public',
    note: 'Target of unattributed disinformation ops',
  },
]

export const targetActors: Actor[] = [
  {
    id: 'PRES',
    name: 'Presidency',
    role: 'Receives strategic summaries',
    category: 'executive',
  },
  {
    id: 'CSAT',
    name: 'CSAT',
    role: 'Strategic coordination',
    category: 'executive',
    note: 'Receives threat assessments; no direct operational data',
  },
  {
    id: 'SRI',
    name: 'SRI (civilianized)',
    role: 'Domestic intelligence · case vault',
    category: 'agency',
    note: 'Holds its own encrypted, purpose-bound case files',
  },
  {
    id: 'SIE',
    name: 'SIE (civilianized)',
    role: 'Foreign intelligence · case vault',
    category: 'agency',
    note: 'Holds its own encrypted, purpose-bound case files',
  },
  {
    id: 'SSC',
    name: 'SSC',
    role: 'Specialized Surveillance Court · warrant token registry',
    category: 'judicial',
    note: 'Issues/denies warrant tokens; holds warrant registry',
  },
  {
    id: 'IADE',
    name: 'IADE',
    role: 'Inter-Agency Data Exchange · stateless broker + audit ledger',
    category: 'broker',
    note: 'Does not store content; routes requests/responses; logs every transaction',
  },
  {
    id: 'IG',
    name: 'Inspector General',
    role: 'Independent statutory oversight',
    category: 'oversight',
    note: 'Full audit-log access; no raw content unless warranted',
  },
  {
    id: 'JPC',
    name: 'Joint Parliamentary Committee',
    role: 'Legislative oversight',
    category: 'oversight',
    note: 'Aggregated metrics + subpoena power for specific files',
  },
  {
    id: 'ITAP',
    name: 'ITAP',
    role: 'Independent Technical Advisory Panel',
    category: 'oversight',
    note: 'Validates technical claims; audits systems',
  },
  {
    id: 'ANSPDCP',
    name: 'ANSPDCP',
    role: 'Data Protection Authority',
    category: 'oversight',
    note: 'Receives notification of high-risk processing',
  },
  {
    id: 'OMB',
    name: 'Ombudsman',
    role: 'Civil rights oversight',
    category: 'oversight',
    note: 'Receives complaints; can trigger IG review',
  },
  {
    id: 'DNSC',
    name: 'DNSC',
    role: 'Civilian cyber defense',
    category: 'civilian',
    note: 'National cyber incident response; receives threat indicators',
  },
  {
    id: 'DIICOT',
    name: 'DIICOT / PICCJ',
    role: 'Prosecutors',
    category: 'justice',
    note: 'Receives warranted evidence packages with chain-of-custody',
  },
  {
    id: 'ICCJ',
    name: 'ICCJ',
    role: 'High Court of Cassation',
    category: 'judicial',
  },
]

export const categoryColors: Record<ActorCategory, string> = {
  executive: '#94a3b8',
  agency: '#f87171',
  judicial: '#4ade80',
  oversight: '#f472b6',
  civilian: '#2dd4bf',
  broker: '#60a5fa',
  justice: '#c084fc',
  public: '#94a3b8',
}

export const currentStateOverrides: Partial<Record<ActorCategory, string>> = {
  agency: '#ef4444',
  oversight: '#facc15',
  judicial: '#c084fc',
}

export function resolveActorColor(actor: Actor, mode: 'current' | 'target'): string {
  if (mode === 'current' && actor.category in currentStateOverrides) {
    return currentStateOverrides[actor.category] as string
  }
  return categoryColors[actor.category]
}
