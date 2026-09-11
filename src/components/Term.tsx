import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { GLOSSARY } from '../data/glossary'

const TIP_WIDTH = 290
const MARGIN = 10
const SHOW_DELAY = 220

export default function Term({ term, children }: { term: string; children: ReactNode }) {
  const definition = GLOSSARY[term.toLowerCase()]
  const [tip, setTip] = useState<{ x: number; y: number; above: boolean } | null>(null)
  const ref = useRef<HTMLSpanElement>(null)
  const timerRef = useRef<number | null>(null)

  const hide = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = null
    setTip(null)
  }

  const show = () => {
    if (!definition) return
    timerRef.current = window.setTimeout(() => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      let x = rect.left + rect.width / 2 - TIP_WIDTH / 2
      x = Math.max(MARGIN, Math.min(x, window.innerWidth - TIP_WIDTH - MARGIN))
      const above = rect.top > 150
      setTip({ x, y: above ? rect.top - MARGIN : rect.bottom + MARGIN, above })
    }, SHOW_DELAY)
  }

  useEffect(() => {
    const onScroll = () => setTip(null)
    window.addEventListener('scroll', onScroll, true)
    return () => {
      window.removeEventListener('scroll', onScroll, true)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  if (!definition) return <>{children}</>

  return (
    <span
      ref={ref}
      className="term"
      tabIndex={0}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {tip &&
        createPortal(
          <span
            className={tip.above ? 'term-tip term-tip-above' : 'term-tip term-tip-below'}
            style={{ left: tip.x, top: tip.y }}
            role="tooltip"
          >
            {definition}
          </span>,
          document.body,
        )}
    </span>
  )
}
