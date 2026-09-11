import { useRef, useState } from 'react'
import { appendLedger, getLedgerEntries } from '../lib/ledger'
import { shortHash } from '../lib/crypto'
import { sscReview, type RequestObject, type WarrantToken } from '../lib/warrant'

interface Artifact {
  label: string
  json: unknown
}

interface Step {
  actor: string
  title: string
  detail: string
}

const REQUEST: RequestObject = {
  caseId: 'C-2026-0417',
  predicate: 'foreign_state_espionage',
  subjects: ['SUBJ-8812', 'SUBJ-8813'],
  fields: ['travel_records', 'comms_metadata', 'financial_links'],
  justification:
    'SIE holds foreign travel records relevant to an ongoing domestic espionage case.',
}

const STEPS: Step[] = [
  { actor: 'SRI analyst', title: 'Creates Request Object', detail: 'Case ID, legal predicate, minimized subjects, requested fields, justification.' },
  { actor: 'SRI → SSC', title: 'Requests cross-agency warrant token', detail: 'Request Object sent to the Specialized Surveillance Court.' },
  { actor: 'SSC', title: 'Validates predicate + specificity', detail: 'Double-check: predicate in statutory scope, not a fishing expedition, no less intrusive means.' },
  { actor: 'SSC', title: 'Issues cryptographic warrant token', detail: 'Token bound to the request hash: case ID, predicate, subjects, time window, receiving agency.' },
  { actor: 'SRI → IADE', title: 'Sends Request + Token', detail: 'Request Object travels with its warrant token to the broker.' },
  { actor: 'IADE', title: 'Validates token signature, logs, routes', detail: 'Transaction logged (request ID, timestamp, agencies, token ID, predicate — not content).' },
  { actor: 'SIE', title: 'Validates token, retrieves data, minimizes', detail: 'Matching data pulled from the vault, minimization filter applied.' },
  { actor: 'SIE → IADE', title: 'Returns response package', detail: 'Token-bound, minimized response package.' },
  { actor: 'IADE', title: 'Logs response metadata, routes to SRI', detail: 'Size, fields, token ID recorded. Content never stored.' },
  { actor: 'SRI', title: 'Attaches to case file', detail: 'Response decrypted, attached to case file, token ID logged locally.' },
  { actor: 'IG', title: 'Queries audit ledger by case ID', detail: 'Gets transaction records — no raw content. Oversight visibility without operational access.' },
]

export default function HandshakeSim() {
  const [stepIndex, setStepIndex] = useState(0)
  const stepRef = useRef(0)
  const busyRef = useRef(false)
  const tokenRef = useRef<WarrantToken | null>(null)
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const done = stepIndex >= STEPS.length

  async function runStep(index: number) {
    switch (index) {
      case 0:
        setArtifact({ label: 'Request Object', json: REQUEST })
        break
      case 2: {
        const decision = await sscReview(REQUEST, 'SIE')
        if (decision.approved) {
          tokenRef.current = decision.token
          setArtifact({ label: 'Warrant Token (signed)', json: decision.token })
        }
        break
      }
      case 3:
        await appendLedger({
          flowType: 'SSC',
          initiator: 'SSC',
          receiver: 'SRI',
          tokenId: tokenRef.current?.tokenId ?? null,
          note: 'Warrant token issued (double-check passed)',
        })
        break
      case 4:
        await appendLedger({
          flowType: 'T3',
          initiator: 'SRI',
          receiver: 'IADE',
          tokenId: tokenRef.current?.tokenId ?? null,
          note: 'Case-linked request + token (case C-2026-0417)',
        })
        break
      case 5:
        await appendLedger({
          flowType: 'T4',
          initiator: 'IADE',
          receiver: 'SIE',
          tokenId: tokenRef.current?.tokenId ?? null,
          note: 'Token signature valid — request routed',
        })
        break
      case 7:
        await appendLedger({
          flowType: 'T5',
          initiator: 'SIE',
          receiver: 'IADE',
          tokenId: tokenRef.current?.tokenId ?? null,
          note: 'Minimized response package (3 fields, 14 KB)',
        })
        break
      case 8:
        await appendLedger({
          flowType: 'T6',
          initiator: 'IADE',
          receiver: 'SRI',
          tokenId: tokenRef.current?.tokenId ?? null,
          note: 'Response metadata logged and routed (no content stored)',
        })
        break
      case 10: {
        const caseEntries = getLedgerEntries().filter(
          (entry) => entry.tokenId === tokenRef.current?.tokenId,
        )
        setArtifact({ label: 'IG audit query → transaction records (no raw content)', json: caseEntries.map(({ entryHash, ...rest }) => ({ ...rest, entryHash: shortHash(entryHash) })) })
        break
      }
      default:
        break
    }
  }

  async function next() {
    if (done || busyRef.current) return
    busyRef.current = true
    await runStep(stepRef.current)
    stepRef.current += 1
    setStepIndex(stepRef.current)
    busyRef.current = false
  }

  function stopTimer() {
    if (timerRef.current !== null) window.clearInterval(timerRef.current)
    timerRef.current = null
    setRunning(false)
  }

  function autoRun() {
    if (running) {
      stopTimer()
      return
    }
    setRunning(true)
    timerRef.current = window.setInterval(() => {
      if (busyRef.current) return
      if (stepRef.current >= STEPS.length) {
        stopTimer()
        return
      }
      busyRef.current = true
      void runStep(stepRef.current).then(() => {
        stepRef.current += 1
        setStepIndex(stepRef.current)
        busyRef.current = false
        if (stepRef.current >= STEPS.length) stopTimer()
      })
    }, 1100)
  }

  function reset() {
    stopTimer()
    stepRef.current = 0
    setStepIndex(0)
    tokenRef.current = null
    setArtifact(null)
  }

  return (
    <div className="sim shell">
      <div className="sim-head">
        <div>
          <p className="section-label">Live Simulation</p>
          <h2>Flow T3–T6 · Cross-Agency Data Handshake</h2>
        </div>
        <div className="sim-actions">
          <span className="sim-progress">
            STEP {String(Math.min(stepIndex + 1, STEPS.length)).padStart(2, '0')}/{String(STEPS.length).padStart(2, '0')}
          </span>
          <button className="btn" onClick={next} disabled={done || running}>
            Next step
          </button>
          <button className="btn" onClick={autoRun} disabled={done && !running}>
            {running ? 'Stop' : 'Auto run'}
          </button>
          <button className="btn btn-ghost" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${(stepIndex / STEPS.length) * 100}%` }} />
      </div>
      <div className="sim-body">
        <ol className="timeline">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={
                index < stepIndex ? 'done' : index === stepIndex ? 'current' : 'pending'
              }
            >
              <div className="timeline-actor">{step.actor}</div>
              <div className="timeline-title">{step.title}</div>
              {index < stepIndex && <div className="timeline-detail">{step.detail}</div>}
              {index === stepIndex && <div className="timeline-detail">{step.detail}</div>}
            </li>
          ))}
        </ol>
        <div className="sim-side">
          <div className="artifact-panel">
            <h3>{artifact ? artifact.label : 'Artifacts appear here'}</h3>
            {artifact && <pre className="artifact-json">{JSON.stringify(artifact.json, null, 2)}</pre>}
            {!artifact && <p className="muted">Run the handshake to see request objects, warrant tokens and audit queries.</p>}
          </div>
          <div className="sim-note">
            <strong>Why this matters:</strong> content moves only with a warrant token; the broker
            sees metadata only; every hop lands on the immutable audit ledger; oversight bodies
            query the ledger without touching raw content.
          </div>
        </div>
      </div>
    </div>
  )
}
