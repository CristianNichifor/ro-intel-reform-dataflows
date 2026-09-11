import { useEffect, useState } from 'react'
import FlowExplorer from './components/FlowExplorer'
import HandshakeSim from './components/HandshakeSim'
import LedgerViewer from './components/LedgerViewer'
import OversightDashboard from './components/OversightDashboard'
import RedTeamScenario from './components/RedTeamScenario'
import { currentActors, targetActors } from './data/actors'
import { currentFlows, targetFlows } from './data/flows'
import type { GraphMode } from './lib/graph'
import { seedLedger } from './lib/ledger'

type View =
  | 'overview'
  | 'current'
  | 'target'
  | 'handshake'
  | 'redteam'
  | 'dashboard'
  | 'ledger'

const NAV: Array<{ id: View; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'current', label: 'Current State' },
  { id: 'target', label: 'Target State' },
  { id: 'handshake', label: 'Handshake T3–T6' },
  { id: 'redteam', label: 'Red Team' },
  { id: 'dashboard', label: 'Oversight' },
  { id: 'ledger', label: 'Audit Ledger' },
]

const PRINCIPLES: Array<[string, string]> = [
  ['No single mass database', 'Data stays at source; sharing is event-driven, not warehouse-driven'],
  ['Purpose limitation', 'Every flow is bound to a legal predicate (threat category + warrant ID)'],
  ['Case-by-case handshake', 'Cross-agency access requires an audited, logged request–approval transaction'],
  ['Judicial gate', 'Surveillance content flows only through a warrant token issued by the specialized court'],
  ['Oversight visibility ≠ operational access', 'Oversight bodies see metadata and audit logs, not raw operational content'],
  ['De-militarized civilian agencies', 'Flows terminate in civilian authority chains (Government / Parliament / Justice)'],
]

function Overview() {
  return (
    <div className="overview">
      <section className="card">
        <h2>Romanian Intelligence Reform — Data-Flow Architecture</h2>
        <p>
          Interactive demo of the <strong>current</strong> and <strong>target-state</strong>{' '}
          information data flows between Romania&apos;s intelligence, oversight, judicial and
          civilian institutions. Based on the technical architecture specification in{' '}
          <code>docs/</code>.
        </p>
        <p className="muted">
          Everything runs in the browser. Warrant tokens use a mock HMAC-SHA-256 signature as a
          stand-in for the spec&apos;s Ed25519, and the audit ledger is a real append-only
          hash-chain (SHA-256, verifiable on the Oversight tab).
        </p>
      </section>

      <section className="card">
        <h3>Design principles</h3>
        <table className="kv-table wide">
          <thead>
            <tr><th>Principle</th><th>Implication for data flows</th></tr>
          </thead>
          <tbody>
            {PRINCIPLES.map(([principle, implication]) => (
              <tr key={principle}><td><strong>{principle}</strong></td><td>{implication}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="dash-grid">
        <section className="card">
          <h3>Current state (pre-reform)</h3>
          <p>{currentActors.length} actors · {currentFlows.length} flows</p>
          <ul className="plain-list">
            <li>SRI receives, stores and correlates data without a unified warrant ledger</li>
            <li>CSAT coordinates with limited transparency</li>
            <li>Parliament receives filtered briefings, not verifiable data</li>
            <li>Prosecutors receive referrals, not traceable evidence chains</li>
            <li>No independent audit trail linking data to a legal predicate</li>
          </ul>
        </section>
        <section className="card">
          <h3>Target state (post-reform)</h3>
          <p>{targetActors.length} actors · {targetFlows.length} flows</p>
          <ul className="plain-list">
            <li>Hub-and-spoke: agency case vaults around a stateless IADE broker</li>
            <li>SSC warrant tokens gate every content transfer</li>
            <li>Append-only, cryptographically verifiable audit ledger</li>
            <li>IG / JPC / ITAP oversight without operational access</li>
            <li>DNSC handles civilian cyber defense, separated from intelligence</li>
          </ul>
        </section>
      </div>

      <section className="card">
        <h3>How to explore</h3>
        <ol className="plain-list">
          <li><strong>Current State</strong> — click nodes and edges to inspect the baseline pathologies.</li>
          <li><strong>Target State</strong> — the hub-and-spoke architecture with warrant tokens.</li>
          <li><strong>Handshake T3–T6</strong> — step through a legal cross-agency data request.</li>
          <li><strong>Red Team</strong> — watch an unauthorized mass query get blocked twice and logged.</li>
          <li><strong>Oversight</strong> — aggregated metrics and hash-chain integrity from the audit ledger.</li>
        </ol>
      </section>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<View>('overview')

  useEffect(() => {
    void seedLedger()
  }, [])

  let content: React.ReactNode
  switch (view) {
    case 'current':
      content = <FlowExplorer mode={'current' satisfies GraphMode} key="current" />
      break
    case 'target':
      content = <FlowExplorer mode={'target' satisfies GraphMode} key="target" />
      break
    case 'handshake':
      content = <HandshakeSim />
      break
    case 'redteam':
      content = <RedTeamScenario />
      break
    case 'dashboard':
      content = <OversightDashboard />
      break
    case 'ledger':
      content = <LedgerViewer />
      break
    default:
      content = <Overview />
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <h1>RO Intel Reform · Data Flows</h1>
          <span className="muted">demo — no real data</span>
        </div>
        <nav className="app-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              className={view === item.id ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">{content}</main>
    </div>
  )
}
