import { canonicalize, hmacSign, SSC_SIGNING_KEY, uuid } from './crypto'
import { translate, type Language } from '../i18n/messages'

export interface RequestObject {
  caseId: string
  predicate: string
  subjects: string[]
  fields: string[]
  justification: string
}

export interface WarrantToken {
  tokenId: string
  caseId: string
  issuingCourt: 'SSC'
  predicate: string
  subjects: string[]
  timeWindow: { start: string; end: string }
  receivingAgency: string
  signature: string
}

export type SscDecision =
  | { approved: true; token: WarrantToken; reason: string }
  | { approved: false; token: null; reason: string }

export const PREDICATES = [
  'foreign_state_espionage',
  'terrorism',
  'cyber_state_actor',
  'proliferation',
  'critical_infrastructure_attack',
]

export async function sscReview(
  request: RequestObject,
  receivingAgency: string,
  lang: Language,
): Promise<SscDecision> {
  const failures: string[] = []
  if (!PREDICATES.includes(request.predicate)) {
    failures.push(translate('warrant.predicateOut', lang, { p: request.predicate }))
  }
  if (
    request.subjects.length === 0 ||
    request.subjects.includes('*') ||
    request.subjects.length > 50
  ) {
    failures.push(translate('warrant.specificity', lang))
  }
  if (!request.caseId) {
    failures.push(translate('warrant.noCase', lang))
  }
  if (request.justification.trim().length < 20) {
    failures.push(translate('warrant.noJustification', lang))
  }
  if (failures.length > 0) {
    return { approved: false, token: null, reason: failures.join('; ') }
  }

  const tokenId = `wt-${uuid().slice(0, 8)}`
  const unsigned = {
    tokenId,
    caseId: request.caseId,
    issuingCourt: 'SSC' as const,
    predicate: request.predicate,
    subjects: request.subjects,
    timeWindow: {
      start: new Date().toISOString(),
      end: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
    },
    receivingAgency,
  }
  const signature = await hmacSign(SSC_SIGNING_KEY, canonicalize(unsigned))
  return {
    approved: true,
    token: { ...unsigned, signature },
    reason: translate('warrant.approved', lang),
  }
}
