import { useEffect, useState } from 'react'
import FlowExplorer from './components/FlowExplorer'
import HandshakeSim from './components/HandshakeSim'
import LedgerViewer from './components/LedgerViewer'
import OversightDashboard from './components/OversightDashboard'
import RedTeamScenario from './components/RedTeamScenario'
import { currentActors, targetActors } from './data/actors'
import { currentFlows, targetFlows } from './data/flows'
import GlossedText from './components/GlossedText'
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

function parseHash(): View {
  const view = window.location.hash.replace(/^#\/?/, '') as View
  return NAV.some((item) => item.id === view) ? view : 'overview'
}

function Overview() {
  return (
    <div className="shell">
      <section className="card accent-left">
        <p className="section-label">Mission</p>
        <h2>Romanian Intelligence Reform — Data-Flow Architecture</h2>
        <p>
          <GlossedText text="Interactive demo of the current and target-state information data flows between Romania's intelligence, oversight, judicial and civilian institutions — built as a technical companion to the reform blueprint for public debate." />
        </p>
        <p className="muted">
          <GlossedText text="Everything runs in the browser. Warrant tokens use a mock HMAC-SHA-256 signature as a stand-in for the spec's Ed25519, and the audit ledger is a real append-only hash chain, verifiable on the Oversight tab." />{' '}
          The full specification lives in <code>docs/</code>.
        </p>
      </section>

      <div className="stat-row">
        <div className="stat">
          <div className="stat-value">{currentActors.length}</div>
          <div className="stat-label">Current actors</div>
        </div>
        <div className="stat">
          <div className="stat-value">{currentFlows.length}</div>
          <div className="stat-label">Current flows</div>
        </div>
        <div className="stat">
          <div className="stat-value">{targetActors.length}</div>
          <div className="stat-label">Target actors</div>
        </div>
        <div className="stat">
          <div className="stat-value">{targetFlows.length}</div>
          <div className="stat-label">Target flows</div>
        </div>
        <div className="stat">
          <div className="stat-value ok">{currentFlows.filter((f) => f.audit === 'Very low' || f.audit === 'None').length}</div>
          <div className="stat-label">Baseline high-risk flows</div>
        </div>
      </div>

      <section className="card">
        <p className="section-label">Principles</p>
        <h3>Design principles</h3>
        <div className="table-scroll">
          <table className="kv-table wide">
            <thead>
              <tr><th>Principle</th><th>Implication for data flows</th></tr>
            </thead>
            <tbody>
              {PRINCIPLES.map(([principle, implication]) => (
                <tr key={principle}>
                  <td><strong><GlossedText text={principle} /></strong></td>
                  <td><GlossedText text={implication} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="dash-grid">
        <section className="card">
          <p className="section-label">Baseline</p>
          <h3>Current state (pre-reform)</h3>
          <ul className="plain-list">
            <li><GlossedText text="SRI receives, stores and correlates data without a unified warrant ledger" /></li>
            <li><GlossedText text="CSAT coordinates with limited transparency" /></li>
            <li><GlossedText text="Parliament receives filtered briefings, not verifiable data" /></li>
            <li><GlossedText text="Prosecutors receive referrals, not traceable evidence chains" /></li>
            <li><GlossedText text="No independent audit trail linking data to a legal predicate" /></li>
          </ul>
        </section>
        <section className="card">
          <p className="section-label">Reform</p>
          <h3>Target state (post-reform)</h3>
          <ul className="plain-list">
            <li><GlossedText text="Hub-and-spoke: agency case vaults around a stateless IADE broker" /></li>
            <li><GlossedText text="SSC warrant tokens gate every content transfer" /></li>
            <li><GlossedText text="Append-only, cryptographically verifiable audit ledger" /></li>
            <li><GlossedText text="IG / JPC / ITAP oversight without operational access" /></li>
            <li><GlossedText text="DNSC handles civilian cyber defense, separated from intelligence" /></li>
          </ul>
        </section>
      </div>

      <section className="card">
        <p className="section-label">Tour</p>
        <h3>Suggested route through the demo</h3>
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
  const [view, setView] = useState<View>(parseHash)

  useEffect(() => {
    void seedLedger()
    const onHash = () => setView(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function navigate(next: View) {
    window.location.assign(`#/${next}`)
    setView(next)
  }

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
      <div className="class-strip">
        <span className="live-dot" />
        <span>DEMO // UNCLASSIFIED</span>
        <span className="spacer" />
        <span>SIMULATED DATA — NO REAL SYSTEMS</span>
      </div>
      <header className="app-header">
        <div className="header-row">
          <div className="app-title">
            <div className="kicker">RO · Intel Reform</div>
            <h1>Information Data Flows</h1>
          </div>
          <span className="header-meta">v0.1 · in-browser simulation · MIT</span>
        </div>
        <nav className="app-nav">
          {NAV.map((item, index) => (
            <button
              key={item.id}
              className={view === item.id ? 'nav-btn active' : 'nav-btn'}
              onClick={() => navigate(item.id)}
            >
              <span className="idx">{String(index).padStart(2, '0')}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">{content}</main>
      <footer className="app-footer">
        <span>ro-intel-reform-dataflows</span>
        <a href="https://github.com/CristianNichifor/ro-intel-reform-dataflows" target="_blank" rel="noreferrer">
          source ↗
        </a>
        <span>no real data · no real systems · no legal advice</span>
      </footer>
    </div>
  )
}
