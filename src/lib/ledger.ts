import { useSyncExternalStore } from 'react'
import { sha256Hex, uuid } from './crypto'

export interface LedgerEntry {
  id: string
  seq: number
  timestamp: string
  flowType: string
  initiator: string
  receiver: string
  tokenId: string | null
  metadataHash: string
  prevHash: string
  entryHash: string
  status: 'accepted' | 'rejected'
  note: string
}

export interface LedgerDraft {
  flowType: string
  initiator: string
  receiver: string
  tokenId?: string | null
  status?: 'accepted' | 'rejected'
  note: string
}

const GENESIS_HASH = '0'.repeat(64)

let entries: LedgerEntry[] = []
let seqCounter = 0
let seeded = false
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): LedgerEntry[] {
  return entries
}

export function useLedger(): LedgerEntry[] {
  return useSyncExternalStore(subscribe, getSnapshot)
}

export function getLedgerEntries(): LedgerEntry[] {
  return entries
}

export function clearLedger() {
  entries = []
  seqCounter = 0
  seeded = false
  emit()
}

async function computeEntry(draft: LedgerDraft): Promise<LedgerEntry> {
  seqCounter += 1
  const seq = seqCounter
  const id = uuid()
  const timestamp = new Date().toISOString()
  const tokenId = draft.tokenId ?? null
  const prevHash = entries.length > 0 ? entries[entries.length - 1].entryHash : GENESIS_HASH
  const metadata = {
    flowType: draft.flowType,
    initiator: draft.initiator,
    receiver: draft.receiver,
    tokenId,
    status: draft.status ?? 'accepted',
    note: draft.note,
  }
  const metadataHash = await sha256Hex(JSON.stringify(metadata))
  const entryHash = await sha256Hex([seq, timestamp, metadataHash, prevHash].join('|'))
  return { id, seq, timestamp, flowType: draft.flowType, initiator: draft.initiator, receiver: draft.receiver, tokenId, metadataHash, prevHash, entryHash, status: draft.status ?? 'accepted', note: draft.note }
}

export async function appendLedger(draft: LedgerDraft): Promise<LedgerEntry> {
  const entry = await computeEntry(draft)
  entries = [...entries, entry]
  emit()
  return entry
}

export async function verifyLedgerIntegrity(): Promise<{ valid: boolean; brokenAt: number | null }> {
  let prevHash = GENESIS_HASH
  for (const entry of entries) {
    if (entry.prevHash !== prevHash) {
      return { valid: false, brokenAt: entry.seq }
    }
    const expected = await sha256Hex([entry.seq, entry.timestamp, entry.metadataHash, entry.prevHash].join('|'))
    if (expected !== entry.entryHash) {
      return { valid: false, brokenAt: entry.seq }
    }
    prevHash = entry.entryHash
  }
  return { valid: true, brokenAt: null }
}

export async function seedLedger(): Promise<void> {
  if (seeded) return
  seeded = true
  const samples: LedgerDraft[] = [
    { flowType: 'T1', initiator: 'SRI', receiver: 'SRI vault', tokenId: 'wt-7c41-…', note: 'SIGINT collection filed to case vault (case C-2026-0312)' },
    { flowType: 'T2', initiator: 'SIE', receiver: 'SIE vault', tokenId: 'wt-2f19-…', note: 'Foreign intel filed to case vault (case C-2026-0312)' },
    { flowType: 'T3', initiator: 'SRI', receiver: 'IADE', tokenId: 'wt-8a3d-…', note: 'Cross-agency request for SIE-held data (case C-2026-0312)' },
    { flowType: 'T4', initiator: 'IADE', receiver: 'SIE', tokenId: 'wt-8a3d-…', note: 'Token signature validated; request routed' },
    { flowType: 'T5', initiator: 'SIE', receiver: 'IADE', tokenId: 'wt-8a3d-…', note: 'Minimized response package (3 fields, 14 KB)' },
    { flowType: 'T6', initiator: 'IADE', receiver: 'SRI', tokenId: 'wt-8a3d-…', note: 'Response routed to requester' },
    { flowType: 'T7', initiator: 'SRI', receiver: 'DNSC', tokenId: null, note: 'C2 infrastructure indicators shared under MOU (no personal data)' },
    { flowType: 'T8', initiator: 'DNSC', receiver: 'SIE', tokenId: null, note: 'APT-28 indicators escalated (beyond civilian response capacity)' },
    { flowType: 'T9', initiator: 'SRI', receiver: 'DIICOT', tokenId: 'wt-8a3d-…', note: 'Warranted evidence package with chain-of-custody hash' },
    { flowType: 'T11', initiator: 'SRI', receiver: 'IG', tokenId: null, note: 'Quarterly audit log export (metadata only)' },
    { flowType: 'T12', initiator: 'IG', receiver: 'JPC', tokenId: null, note: 'Audit findings report filed' },
    { flowType: 'T14', initiator: 'SIE', receiver: 'ANSPDCP', tokenId: null, note: 'High-risk processing notification (DPIA attached)' },
    { flowType: 'T15', initiator: 'SRI', receiver: 'CSAT', tokenId: null, note: 'Aggregated threat assessment (no raw data)' },
  ]
  for (const sample of samples) {
    await appendLedger(sample)
  }
}
