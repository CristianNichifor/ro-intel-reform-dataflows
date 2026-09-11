import { useEffect, useMemo, useState } from 'react'
import { shortHash } from '../lib/crypto'
import { useLedger, verifyLedgerIntegrity } from '../lib/ledger'

export default function OversightDashboard() {
  const ledger = useLedger()
  const [integrity, setIntegrity] = useState<{ valid: boolean; brokenAt: number | null } | null>(null)

  useEffect(() => {
    let cancelled = false
    void verifyLedgerIntegrity().then((result) => {
      if (!cancelled) setIntegrity(result)
    })
    return () => {
      cancelled = true
    }
  }, [ledger])

  const metrics = useMemo(() => {
    const byFlow = new Map<string, number>()
    let accepted = 0
    let rejected = 0
    const tokens = new Set<string>()
    for (const entry of ledger) {
      byFlow.set(entry.flowType, (byFlow.get(entry.flowType) ?? 0) + 1)
      if (entry.status === 'accepted') accepted += 1
      else rejected += 1
      if (entry.tokenId) tokens.add(entry.tokenId)
    }
    const flowBars = [...byFlow.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    return { byFlow, accepted, rejected, tokenCount: tokens.size, flowBars, max: Math.max(1, ...byFlow.values()) }
  }, [ledger])

  const rejectedEntries = ledger.filter((entry) => entry.status === 'rejected')

  return (
    <div className="dashboard shell">
      <div className="sim-head">
        <div>
          <p className="section-label">Oversight View</p>
          <h2>Aggregated Metrics · IADE Audit Ledger</h2>
        </div>
      </div>
      <div className="stat-row">
        <div className="stat">
          <div className="stat-value">{ledger.length}</div>
          <div className="stat-label">Ledger entries</div>
        </div>
        <div className="stat">
          <div className="stat-value ok">{metrics.accepted}</div>
          <div className="stat-label">Accepted</div>
        </div>
        <div className="stat">
          <div className="stat-value bad">{metrics.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
        <div className="stat">
          <div className="stat-value">{metrics.tokenCount}</div>
          <div className="stat-label">Warrant tokens</div>
        </div>
        <div className="stat">
          <div className={`stat-value ${integrity?.valid === false ? 'bad' : 'ok'}`}>
            {integrity ? (integrity.valid ? 'INTACT' : `BROKEN@${integrity.brokenAt}`) : '…'}
          </div>
          <div className="stat-label">Hash-chain integrity</div>
        </div>
      </div>

      <div className="dash-grid">
        <section className="card">
          <p className="section-label">Volume</p>
          <h3>Transactions by flow type</h3>
          {metrics.flowBars.map(([flow, count]) => (
            <div className="bar-row" key={flow}>
              <span className="bar-label">{flow}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(count / metrics.max) * 100}%` }} />
              </div>
              <span className="bar-count">{count}</span>
            </div>
          ))}
        </section>

        <section className="card">
          <p className="section-label">Anomalies</p>
          <h3>Rejection events</h3>
          {rejectedEntries.length === 0 && <p className="muted">No rejected transactions on the ledger.</p>}
          {rejectedEntries.map((entry) => (
            <div className="rejection" key={entry.id}>
              <div>
                <strong>{entry.flowType}</strong> · {entry.initiator} → {entry.receiver}
              </div>
              <div className="muted">{entry.note}</div>
              <div className="mono">entry {shortHash(entry.entryHash)} · {new Date(entry.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
        </section>
      </div>

      <section className="card">
        <p className="section-label">Access Model</p>
        <h3>Oversight access matrix</h3>
        <div className="table-scroll">
          <table className="kv-table wide">
          <thead>
            <tr>
              <th>Body</th>
              <th>Sees</th>
              <th>Does not see</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Inspector General</td><td>Full audit-log access (metadata + transactions)</td><td>Raw content (without separate warrant)</td></tr>
            <tr><td>JPC</td><td>Aggregated metrics + subpoenaed files</td><td>Operational raw data</td></tr>
            <tr><td>ITAP</td><td>System access for technical validation</td><td>Case content</td></tr>
            <tr><td>ANSPDCP</td><td>High-risk processing notifications</td><td>Operational data</td></tr>
            <tr><td>Ombudsman</td><td>Complaints → trigger IG reviews</td><td>Direct case access</td></tr>
          </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
