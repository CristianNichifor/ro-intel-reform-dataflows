import { useEffect, useRef, useState } from 'react'
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

const MIN_ZOOM = 0.4
const MAX_ZOOM = 4

function clampZoom(zoom: number): number {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom))
}

function MermaidDiagram({ id, code, title }: { id: string; code: string; title: string }) {
  const [svg, setSvg] = useState('')
  const [failed, setFailed] = useState(false)
  const [view, setView] = useState({ zoom: 1, x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

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

  function zoomAt(cx: number, cy: number, factor: number) {
    setView((prev) => {
      const zoom = clampZoom(prev.zoom * factor)
      const px = (cx - prev.x) / prev.zoom
      const py = (cy - prev.y) / prev.zoom
      return { zoom, x: cx - px * zoom, y: cy - py * zoom }
    })
  }

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return
      event.preventDefault()
      const rect = box.getBoundingClientRect()
      zoomAt(event.clientX - rect.left, event.clientY - rect.top, event.deltaY < 0 ? 1.12 : 0.89)
    }
    box.addEventListener('wheel', onWheel, { passive: false })
    return () => box.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function zoomButtons(factor: number) {
    const box = boxRef.current
    if (!box) {
      setView((prev) => ({ ...prev, zoom: clampZoom(prev.zoom * factor) }))
      return
    }
    const rect = box.getBoundingClientRect()
    zoomAt(rect.width / 2, rect.height / 2, factor)
  }

  function reset() {
    setView({ zoom: 1, x: 0, y: 0 })
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (view.zoom <= 1) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { startX: event.clientX, startY: event.clientY, originX: view.x, originY: view.y }
    setDragging(true)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag) return
    setView((prev) => ({
      ...prev,
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    }))
  }

  function onPointerUp() {
    dragRef.current = null
    setDragging(false)
  }

  if (failed) return <div className="mermaid-error">diagram failed to render</div>

  return (
    <div className="gov-diagram-card">
      <div className="gov-diagram-head">
        <div className="gov-diagram-title">{title}</div>
        <div className="gov-diagram-controls">
          <button type="button" onClick={() => zoomButtons(1 / 1.25)} aria-label="zoom out">
            −
          </button>
          <span className="gov-zoom-value">{Math.round(view.zoom * 100)}%</span>
          <button type="button" onClick={() => zoomButtons(1.25)} aria-label="zoom in">
            +
          </button>
          <button type="button" onClick={reset} aria-label="reset view">
            ⤢
          </button>
        </div>
      </div>
      <div
        ref={boxRef}
        className="mermaid-box"
        style={{ cursor: view.zoom > 1 ? (dragging ? 'grabbing' : 'grab') : 'default' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="mermaid-zoomable"
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}
        >
          <div dangerouslySetInnerHTML={{ __html: svg }} />
        </div>
      </div>
    </div>
  )
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
        <p className="muted">{t('gov.hint')}</p>
        <div className="gov-grid">
          {DIAGRAMS.map((diagram) => (
            <MermaidDiagram
              key={diagram.id}
              id={diagram.id}
              code={diagram.source}
              title={t(diagram.titleKey)}
            />
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
