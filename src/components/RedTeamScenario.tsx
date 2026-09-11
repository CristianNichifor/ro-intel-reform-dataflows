import { useRef, useState } from 'react'
import { appendLedger, getLedgerEntries } from '../lib/ledger'
import { sscReview, type RequestObject } from '../lib/warrant'

interface Artifact {
  label: string
  json: unknown
}

interface Step {
  actor: string
  title: string
  detail: string
}

const MASS_QUERY: RequestObject = {
  caseId: '',
  predicate: 'national_security_broad',
  subjects: ['*'],
  fields: ['all'],
  justification: 'dragnet sweep',
}

const STEPS: Step[] = [
  { actor: 'Rogue analyst', title: 'Drafts a mass query', detail: 'Wildcard subjects, broad predicate, no case ID — a dragnet sweep attempt.' },
  { actor: 'SRI → SSC', title: 'Sends request to the SSC', detail: 'The warrant request must pass the double-check before anything else happens.' },
  { actor: 'SSC', title: 'Double-check fails — DENIED', detail: 'Specificity test fails (mass query), predicate out of statutory scope, no case linkage. No token issued.' },
  { actor: 'Rogue analyst', title: 'Attempts IADE anyway, without a token', detail: 'Tries to bypass the judicial gate by sending the request directly to the broker.' },
  { actor: 'IADE', title: '403 — invalid or missing warrant token', detail: 'Broker refuses the request and logs the rejected attempt to the audit ledger.' },
  { actor: 'IG + ITAP', title: 'Alerted by the audit ledger', detail: 'The rejected attempt is permanently visible to independent oversight. No content ever moved.' },
]

const FAILED_STEPS = new Set([2, 4])

export default function RedTeamScenario() {
  const [stepIndex, setStepIndex] = useState(0)
  const stepRef = useRef(0)
  const busyRef = useRef(false)
  const [artifact, setArtifact] = useState<Artifact | null>(null)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  const done = stepIndex >= STEPS.length
  const blocked = stepIndex >= STEPS.length

  async function runStep(index: number) {
    switch (index) {
      case 0:
        setArtifact({ label: 'Mass query request', json: MASS_QUERY })
        break
      case 2: {
        const decision = await sscReview(MASS_QUERY, 'SIE')
        setArtifact({ label: 'SSC decision', json: { approved: decision.approved, reason: decision.reason } })
        await appendLedger({
          flowType: 'SSC',
          initiator: 'SSC',
          receiver: 'SRI',
          status: 'rejected',
          note: 'Warrant DENIED — mass query fails specificity test',
        })
        break
      }
      case 4: {
        await appendLedger({
          flowType: 'T3',
          initiator: 'SRI',
          receiver: 'IADE',
          status: 'rejected',
          note: 'Request rejected 403 — invalid or missing warrant token',
        })
        setArtifact({ label: 'IADE response', json: { status: 403, error: 'invalid_or_missing_warrant_token', logged: true } })
        break
      }
      case 5: {
        const rejected = getLedgerEntries().filter((entry) => entry.status === 'rejected')
        setArtifact({ label: 'Oversight view — rejected attempts on the permanent record', json: rejected.map(({ entryHash: _entryHash, ...rest }) => rest) })
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
    }, 1300)
  }

  function reset() {
    stopTimer()
    stepRef.current = 0
    setStepIndex(0)
    setArtifact(null)
  }

  return (
    <div className="sim redteam shell">
      <div className="sim-head">
        <div>
          <p className="section-label">Live Simulation</p>
          <h2>Red-Team Scenario · Blocked Mass Query</h2>
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
      {blocked && (
        <div className="outcome-banner">
          Unauthorized mass query blocked — zero content moved, two rejection entries on the
          immutable audit ledger, oversight alerted.
        </div>
      )}
      <div className="sim-body">
        <ol className="timeline">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={
                index < stepIndex
                  ? FAILED_STEPS.has(index)
                    ? 'failed'
                    : 'done'
                  : index === stepIndex
                    ? 'current'
                    : 'pending'
              }
            >
              <div className="timeline-actor">{step.actor}</div>
              <div className="timeline-title">{step.title}</div>
              {index <= stepIndex && <div className="timeline-detail">{step.detail}</div>}
            </li>
          ))}
        </ol>
        <div className="sim-side">
          <div className="artifact-panel">
            <h3>{artifact ? artifact.label : 'Artifacts appear here'}</h3>
            {artifact && <pre className="artifact-json">{JSON.stringify(artifact.json, null, 2)}</pre>}
            {!artifact && <p className="muted">Walk through the attack to see how the architecture blocks it.</p>}
          </div>
          <div className="sim-note">
            <strong>Design claim tested:</strong> the double-check (SSC predicate + specificity
            validation) plus token enforcement at the broker makes a mass query fail twice — at the
            judicial gate and at the transport layer — while leaving an audit trail.
          </div>
        </div>
      </div>
    </div>
  )
}
