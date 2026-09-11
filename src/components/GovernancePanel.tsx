import { useEffect, useState } from 'react'
import MarkdownIt from 'markdown-it'
import mermaid from 'mermaid'
import { useI18n } from '../i18n/useI18n'
import type { MessageKey } from '../i18n/messages'

import doc14 from '../../docs/14-leadership-appointment.md?raw'
import doc15 from '../../docs/15-conflict-of-interest.md?raw'
import doc16 from '../../docs/16-cooling-off-regime.md?raw'
import doc17 from '../../docs/17-civil-society-oversight.md?raw'
import doc18 from '../../docs/18-internal-control.md?raw'
import doc19 from '../../docs/19-dcaf-references.md?raw'

import diagAppointment from '../../diagrams/leadership-appointment.mmd?raw'
import diagLayering from '../../diagrams/oversight-layering.mmd?raw'
import diagCoolingOff from '../../diagrams/cooling-off-enforcement.mmd?raw'
import diagConflict from '../../diagrams/conflict-of-interest-cycle.mmd?raw'

const md = new MarkdownIt({ html: false, linkify: true })

const DOCS: Array<{ key: string; source: string }> = [
  { key: '14 · Leadership Appointment', source: doc14 },
  { key: '15 · Conflict of Interest', source: doc15 },
  { key: '16 · Cooling-Off Regime', source: doc16 },
  { key: '17 · Civil Society Oversight', source: doc17 },
  { key: '18 · Internal Control', source: doc18 },
  { key: '19 · DCAF References', source: doc19 },
]

const DIAGRAMS: Array<{ id: string; titleKey: MessageKey; source: string }> = [
  { id: 'gov-mm-appointment', titleKey: 'gov.diagram.appointment', source: diagAppointment },
  { id: 'gov-mm-layering', titleKey: 'gov.diagram.layering', source: diagLayering },
  { id: 'gov-mm-coolingoff', titleKey: 'gov.diagram.coolingoff', source: diagCoolingOff },
  { id: 'gov-mm-conflict', titleKey: 'gov.diagram.conflict', source: diagConflict },
]

function MermaidDiagram({ id, code }: { id: string; code: string }) {
  const [svg, setSvg] = useState('')
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' })
    mermaid
      .render(id, code)
      .then((result) => {
        if (!cancelled) setSvg(result.svg)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [id, code])

  if (failed) return <div className="mermaid-error">diagram failed to render</div>
  return <div className="mermaid-box" dangerouslySetInnerHTML={{ __html: svg }} />
}

export default function GovernancePanel() {
  const { t } = useI18n()

  return (
    <div className="shell">
      <section className="card accent-left">
        <p className="section-label">{t('nav.governance')}</p>
        <h2>{t('gov.title')}</h2>
        <p>{t('gov.subtitle')}</p>
        <p className="muted">{t('gov.intro')}</p>
        <p className="muted">{t('gov.langNote')}</p>
      </section>

      <section className="card">
        <p className="section-label">{t('gov.section.diagrams')}</p>
        <h3>{t('gov.section.diagrams')}</h3>
        <div className="gov-grid">
          {DIAGRAMS.map((diagram) => (
            <div className="gov-diagram-card" key={diagram.id}>
              <div className="gov-diagram-title">{t(diagram.titleKey)}</div>
              <MermaidDiagram id={diagram.id} code={diagram.source} />
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <p className="section-label">{t('gov.section.docs')}</p>
        <h3>{t('gov.section.docs')}</h3>
        <div className="gov-docs">
          {DOCS.map((doc) => (
            <article className="gov-md" key={doc.key}>
              <div className="gov-doc-key">{doc.key}</div>
              <div dangerouslySetInnerHTML={{ __html: md.render(doc.source) }} />
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
