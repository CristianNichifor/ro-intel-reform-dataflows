import { useSyncExternalStore } from 'react'
import { sha256Hex, uuid } from './crypto'
import { translate, type Language, type MessageKey } from '../i18n/messages'

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

export async function seedLedger(lang: Language): Promise<void> {
  if (seeded) return
  seeded = true
  const noteKeys: MessageKey[] = [
    'seed.n1',
    'seed.n2',
    'seed.n3',
    'seed.n4',
    'seed.n5',
    'seed.n6',
    'seed.n7',
    'seed.n8',
    'seed.n9',
    'seed.n10',
    'seed.n11',
    'seed.n12',
    'seed.n13',
  ]
  const samples: Array<Omit<LedgerDraft, 'note'>> = [
    { flowType: 'T1', initiator: 'SRI', receiver: 'SRI vault', tokenId: 'wt-7c41-…' },
    { flowType: 'T2', initiator: 'SIE', receiver: 'SIE vault', tokenId: 'wt-2f19-…' },
    { flowType: 'T3', initiator: 'SRI', receiver: 'IADE', tokenId: 'wt-8a3d-…' },
    { flowType: 'T4', initiator: 'IADE', receiver: 'SIE', tokenId: 'wt-8a3d-…' },
    { flowType: 'T5', initiator: 'SIE', receiver: 'IADE', tokenId: 'wt-8a3d-…' },
    { flowType: 'T6', initiator: 'IADE', receiver: 'SRI', tokenId: 'wt-8a3d-…' },
    { flowType: 'T7', initiator: 'SRI', receiver: 'DNSC', tokenId: null },
    { flowType: 'T8', initiator: 'DNSC', receiver: 'SIE', tokenId: null },
    { flowType: 'T9', initiator: 'SRI', receiver: 'DIICOT', tokenId: 'wt-8a3d-…' },
    { flowType: 'T11', initiator: 'SRI', receiver: 'IG', tokenId: null },
    { flowType: 'T12', initiator: 'IG', receiver: 'JPC', tokenId: null },
    { flowType: 'T14', initiator: 'SIE', receiver: 'ANSPDCP', tokenId: null },
    { flowType: 'T15', initiator: 'SRI', receiver: 'CSAT', tokenId: null },
  ]
  for (let index = 0; index < samples.length; index += 1) {
    await appendLedger({ ...samples[index], note: translate(noteKeys[index], lang) })
  }
}
