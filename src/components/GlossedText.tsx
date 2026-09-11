import { useMemo } from 'react'
import { GLOSSARY } from '../data/glossary'
import Term from './Term'

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PATTERN = (() => {
  const keys = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length)
  return new RegExp(`\\b(${keys.map(escapeRegExp).join('|')})\\b`, 'gi')
})()

interface Part {
  text: string
  term: boolean
}

export default function GlossedText({ text }: { text: string }) {
  const parts = useMemo<Part[]>(() => {
    const result: Part[] = []
    let last = 0
    for (const match of text.matchAll(PATTERN)) {
      const index = match.index ?? 0
      if (index > last) result.push({ text: text.slice(last, index), term: false })
      result.push({ text: match[0], term: true })
      last = index + match[0].length
    }
    if (last < text.length) result.push({ text: text.slice(last), term: false })
    return result
  }, [text])

  if (parts.length === 0) return <>{text}</>

  return (
    <>
      {parts.map((part, index) =>
        part.term ? (
          <Term key={index} term={part.text}>
            {part.text}
          </Term>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </>
  )
}
