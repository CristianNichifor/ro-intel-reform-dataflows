import { useEffect, useState } from 'react'
import { shortHash } from '../lib/crypto'
import { clearLedger, useLedger, verifyLedgerIntegrity } from '../lib/ledger'

export default function LedgerViewer() {
  const ledger = useLedger()
  const [integrity, setIntegrity] = useState<{ valid: boolean; brokenAt: number | null } | null>(null)

  useEffect(() => {
    void verifyLedgerIntegrity().then(setIntegrity)
  }, [ledger])

  return (
    <div className="ledger-viewer shell">
      <div className="sim-head">
        <div>
          <p className="section-label">Immutable Record</p>
          <h2>IADE Audit Ledger · append-only hash chain</h2>
        </div>
        <div className="sim-actions">
          <span className={`integrity-pill ${integrity?.valid === false ? 'bad' : 'ok'}`}>
            {integrity ? (integrity.valid ? 'Chain intact' : `Chain broken at entry ${integrity.brokenAt}`) : 'Verifying…'}
          </span>
          <button className="btn btn-ghost" onClick={clearLedger}>
            Clear ledger
          </button>
        </div>
      </div>
      {ledger.length === 0 && <p className="muted">The ledger is empty. Run the handshake or red-team scenario.</p>}
      {ledger.length > 0 && (
        <div className="table-scroll">
          <table className="ledger-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Time</th>
              <th>Flow</th>
              <th>From</th>
              <th>To</th>
              <th>Token</th>
              <th>Status</th>
              <th>Note</th>
              <th>Entry hash</th>
            </tr>
          </thead>
          <tbody>
            {[...ledger].reverse().map((entry) => (
              <tr key={entry.id} className={entry.status === 'rejected' ? 'row-rejected' : undefined}>
                <td>{entry.seq}</td>
                <td>{new Date(entry.timestamp).toLocaleTimeString()}</td>
                <td><strong>{entry.flowType}</strong></td>
                <td>{entry.initiator}</td>
                <td>{entry.receiver}</td>
                <td className="mono">{entry.tokenId ?? '—'}</td>
                <td>
                  <span className={`status-pill ${entry.status}`}>{entry.status}</span>
                </td>
                <td>{entry.note}</td>
                <td className="mono">{shortHash(entry.entryHash)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  )
}
