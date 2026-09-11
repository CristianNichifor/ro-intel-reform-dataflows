import { MarkerType, type Edge, type Node, type XYPosition } from '@xyflow/react'
import { currentActors, resolveActorColor, targetActors } from '../data/actors'
import { currentFlows, targetFlows } from '../data/flows'
import type { ActorNodeData, Flow } from '../data/types'
import { pick, type Language } from '../i18n/messages'

export type GraphMode = 'current' | 'target'

const CURRENT_POSITIONS: Record<string, XYPosition> = {
  PRES: { x: 440, y: 0 },
  CSAT: { x: 180, y: 0 },
  STS: { x: 20, y: 170 },
  SRI: { x: 330, y: 170 },
  SIE: { x: 640, y: 170 },
  JPC: { x: 180, y: 360 },
  DIICOT: { x: 640, y: 360 },
  ICCJ: { x: 880, y: 360 },
  ANSPDCP: { x: 20, y: 540 },
  OMB: { x: 280, y: 540 },
  DNSC: { x: 640, y: 540 },
  PUB: { x: 880, y: 540 },
}

const TARGET_POSITIONS: Record<string, XYPosition> = {
  CSAT: { x: 40, y: 0 },
  PRES: { x: 240, y: 0 },
  SSC: { x: 700, y: 0 },
  SRI: { x: 200, y: 220 },
  IADE: { x: 700, y: 220 },
  SIE: { x: 1200, y: 220 },
  DNSC: { x: 40, y: 470 },
  DIICOT: { x: 1060, y: 470 },
  ICCJ: { x: 1300, y: 470 },
  IG: { x: 700, y: 470 },
  JPC: { x: 460, y: 680 },
  ITAP: { x: 250, y: 680 },
  ANSPDCP: { x: 900, y: 680 },
  OMB: { x: 40, y: 680 },
}

export function edgeColor(flow: Flow): string {
  if (flow.category === 'current') {
    const audit = flow.audit ? pick(flow.audit, 'en') : 'Low'
    if (audit === 'Very low' || audit === 'None') return '#ef4444'
    if (audit === 'Low') return '#f59e0b'
    return '#facc15'
  }
  if (flow.id === 'W1' || flow.id === 'W2') return '#4ade80'
  if (flow.source === 'IADE' || flow.target === 'IADE') return '#60a5fa'
  if (
    flow.source === 'IG' ||
    flow.source === 'JPC' ||
    flow.source === 'ITAP' ||
    flow.source === 'OMB' ||
    flow.target === 'IG' ||
    flow.target === 'JPC' ||
    flow.target === 'ANSPDCP'
  ) {
    return '#f472b6'
  }
  if (flow.source === 'DNSC' || flow.target === 'DNSC') return '#2dd4bf'
  if (flow.source === 'DIICOT' || flow.target === 'DIICOT' || flow.target === 'ICCJ') return '#c084fc'
  if (
    flow.source === 'CSAT' ||
    flow.target === 'CSAT' ||
    flow.target === 'PRES' ||
    flow.source === 'PRES'
  ) {
    return '#94a3b8'
  }
  return '#60a5fa'
}

export function buildGraph(
  mode: GraphMode,
  lang: Language,
): { nodes: Node<ActorNodeData>[]; edges: Edge[] } {
  const actors = mode === 'current' ? currentActors : targetActors
  const flows = mode === 'current' ? currentFlows : targetFlows
  const positions = mode === 'current' ? CURRENT_POSITIONS : TARGET_POSITIONS

  const nodes: Node<ActorNodeData>[] = actors.map((actor) => ({
    id: `${mode}:${actor.id}`,
    type: 'actor',
    position: positions[actor.id] ?? { x: 0, y: 0 },
    data: {
      label: pick(actor.name, lang),
      role: pick(actor.role, lang),
      category: actor.category,
      color: resolveActorColor(actor, mode),
      note: actor.note ? pick(actor.note, lang) : undefined,
    },
  }))

  const edges: Edge[] = flows.map((flow) => {
    const color = edgeColor(flow)
    return {
      id: `${mode}:${flow.id}`,
      source: `${mode}:${flow.source}`,
      target: `${mode}:${flow.target}`,
      label: flow.id,
      data: { flow },
      style: { stroke: color, strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color },
      labelStyle: { fill: '#cbd5e1', fontSize: 9, fontWeight: 700 },
      labelBgStyle: { fill: '#0b1220', fillOpacity: 0.92 },
      labelBgPadding: [4, 2] as [number, number],
      labelBgBorderRadius: 3,
    }
  })

  return { nodes, edges }
}
