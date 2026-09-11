import { useMemo, useState } from 'react'
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  type Edge,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import ActorNode from './ActorNode'
import { buildGraph, type GraphMode } from '../lib/graph'
import { currentActors, targetActors } from '../data/actors'
import type { Actor, ActorNodeData, Flow } from '../data/types'

const nodeTypes = { actor: ActorNode }

type Selection =
  | { kind: 'flow'; flow: Flow }
  | { kind: 'actor'; actor: Actor }
  | null

function DetailPanel({ selection, onClose }: { selection: Selection; onClose: () => void }) {
  if (!selection) return null
  if (selection.kind === 'flow') {
    const flow = selection.flow
    const rows: Array<[string, string]> = [
      ['Flow', flow.id],
      ['Source', flow.source],
      ['Destination', flow.target],
      ['Data type', flow.dataType],
      [flow.category === 'current' ? 'Legal basis' : 'Legal gate', flow.legal],
      [flow.category === 'current' ? 'Auditability' : 'Audit ledger entry', flow.audit ?? '—'],
    ]
    if (flow.category === 'current' && flow.risk) rows.push(['Risk', flow.risk])
    if (flow.category === 'target' && flow.oversight) rows.push(['Oversight visibility', flow.oversight])
    return (
      <div className="detail-panel">
        <div className="detail-header">
          <h3>Flow {flow.id}</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <table className="kv-table">
          <tbody>
            {rows.map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {flow.description && <p className="detail-desc">{flow.description}</p>}
      </div>
    )
  }
  const actor = selection.actor
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <h3>{actor.name}</h3>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <table className="kv-table">
        <tbody>
          <tr>
            <td>Role</td>
            <td>{actor.role}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{actor.category}</td>
          </tr>
        </tbody>
      </table>
      {actor.note && <p className="detail-desc">{actor.note}</p>}
    </div>
  )
}

function Legend({ mode }: { mode: GraphMode }) {
  if (mode === 'current') {
    return (
      <div className="legend">
        <span><i style={{ background: '#ef4444' }} />Agencies — concentrated, unaudited data power</span>
        <span><i style={{ background: '#facc15' }} />Oversight — limited access</span>
        <span><i style={{ background: '#c084fc' }} />Justice</span>
        <span><i style={{ background: '#94a3b8' }} />Executive / public</span>
        <span>Edge color = auditability (red = none/very low)</span>
      </div>
    )
  }
  return (
    <div className="legend">
      <span><i style={{ background: '#60a5fa' }} />IADE — stateless broker</span>
      <span><i style={{ background: '#4ade80' }} />SSC — judicial gate</span>
      <span><i style={{ background: '#f472b6' }} />Oversight</span>
      <span><i style={{ background: '#c084fc' }} />Justice</span>
      <span><i style={{ background: '#2dd4bf' }} />Civilian</span>
      <span><i style={{ background: '#475569' }} />Civilianized agencies</span>
    </div>
  )
}

export default function FlowExplorer({ mode }: { mode: GraphMode }) {
  const graph = useMemo(() => buildGraph(mode), [mode])
  const [nodes] = useState<Node[]>(graph.nodes)
  const [edges] = useState<Edge[]>(graph.edges)
  const [selection, setSelection] = useState<Selection>(null)

  const actors = mode === 'current' ? currentActors : targetActors

  const onEdgeClick = (_event: React.MouseEvent, edge: Edge) => {
    const flow = (edge.data as { flow: Flow } | undefined)?.flow
    if (flow) setSelection({ kind: 'flow', flow })
  }

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    const actor = actors.find((candidate) => candidate.id === node.id.split(':')[1])
    if (actor) setSelection({ kind: 'actor', actor })
  }

  return (
    <div className="explorer">
      <Legend mode={mode} />
      <div className="explorer-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
        >
          <Background gap={18} color="#1e293b" />
          <Controls />
          <MiniMap
            pannable
            zoomable
            nodeColor={(node) => (node.data as ActorNodeData).color}
            maskColor="rgba(2, 6, 23, 0.75)"
          />
        </ReactFlow>
      </div>
      <DetailPanel selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}
