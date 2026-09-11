import { useEffect, useMemo, useState } from 'react'
import {
  Background,
  BackgroundVariant,
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
import type { Actor, ActorCategory, ActorNodeData, Flow } from '../data/types'

const nodeTypes = { actor: ActorNode }

const CATEGORY_FILTERS: Array<{ id: ActorCategory; label: string }> = [
  { id: 'agency', label: 'Agencies' },
  { id: 'executive', label: 'Executive' },
  { id: 'oversight', label: 'Oversight' },
  { id: 'justice', label: 'Justice' },
  { id: 'judicial', label: 'Judicial' },
  { id: 'civilian', label: 'Civilian' },
  { id: 'broker', label: 'Broker' },
  { id: 'public', label: 'Public' },
]

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
          <h3>FLOW {flow.id}</h3>
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
        <h3>{actor.name.toUpperCase()}</h3>
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
  const [open, setOpen] = useState(false)
  const items =
    mode === 'current'
      ? [
          ['#ef4444', 'Agencies — concentrated, unaudited data power'],
          ['#facc15', 'Oversight — limited access'],
          ['#c084fc', 'Justice'],
          ['#94a3b8', 'Executive / public'],
          ['#f59e0b', 'Edge = auditability (red = none)'],
        ]
      : [
          ['#60a5fa', 'IADE — stateless broker'],
          ['#4ade80', 'SSC — judicial gate'],
          ['#f472b6', 'Oversight'],
          ['#c084fc', 'Justice'],
          ['#2dd4bf', 'Civilian'],
          ['#475569', 'Civilianized agencies'],
        ]
  return (
    <div className="legend">
      <button className="legend-toggle" onClick={() => setOpen((value) => !value)}>
        <span>{open ? '▾' : '▸'}</span> Legend
      </button>
      {open && (
        <div className="legend-items">
          {items.map(([color, label]) => (
            <span key={label}>
              <i style={{ background: color }} />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function FlowExplorer({ mode }: { mode: GraphMode }) {
  const graph = useMemo(() => buildGraph(mode), [mode])
  const actors = mode === 'current' ? currentActors : targetActors

  const [query, setQuery] = useState('')
  const [showLabels, setShowLabels] = useState(true)
  const [hiddenCats, setHiddenCats] = useState<Set<ActorCategory>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selection, setSelection] = useState<Selection>(null)
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelection(null)
        setSelectedEdgeId(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const visibleActorIds = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return new Set(
      actors
        .filter((actor) => !hiddenCats.has(actor.category))
        .filter(
          (actor) =>
            !normalized ||
            actor.name.toLowerCase().includes(normalized) ||
            actor.role.toLowerCase().includes(normalized),
        )
        .map((actor) => actor.id),
    )
  }, [actors, hiddenCats, query])

  const { nodes, edges } = useMemo(() => {
    const prefix = `${mode}:`
    const visibleNodes = graph.nodes.filter((node) =>
      visibleActorIds.has(node.id.slice(prefix.length)),
    )
    const visibleNodeIds = new Set(visibleNodes.map((node) => node.id))
    const visibleEdges = graph.edges
      .filter((edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target))
      .map((edge) => ({
        ...edge,
        label: showLabels ? (edge.label as string) : undefined,
        selected: edge.id === selectedEdgeId,
      }))

    if (hoveredId) {
      const neighbors = new Set<string>([hoveredId])
      for (const edge of visibleEdges) {
        if (edge.source === hoveredId) neighbors.add(edge.target)
        if (edge.target === hoveredId) neighbors.add(edge.source)
      }
      const dimmedNodes = visibleNodes.map((node) =>
        neighbors.has(node.id) ? node : { ...node, className: 'dimmed' },
      )
      const dimmedEdges = visibleEdges.map((edge) =>
        edge.source === hoveredId || edge.target === hoveredId
          ? edge
          : { ...edge, className: 'dimmed' },
      )
      return { nodes: dimmedNodes, edges: dimmedEdges }
    }
    return { nodes: visibleNodes, edges: visibleEdges }
  }, [graph, hoveredId, mode, selectedEdgeId, showLabels, visibleActorIds])

  const onEdgeClick = (_event: React.MouseEvent, edge: Edge) => {
    const flow = (edge.data as { flow: Flow } | undefined)?.flow
    if (flow) {
      setSelection({ kind: 'flow', flow })
      setSelectedEdgeId(edge.id)
    }
  }

  const onNodeClick = (_event: React.MouseEvent, node: Node) => {
    const actor = actors.find((candidate) => candidate.id === node.id.split(':')[1])
    if (actor) setSelection({ kind: 'actor', actor })
  }

  const toggleCategory = (category: ActorCategory) => {
    setHiddenCats((current) => {
      const next = new Set(current)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  return (
    <div className="explorer">
      <Legend mode={mode} />
      <div className="explorer-toolbar">
        <input
          className="explorer-search"
          type="search"
          placeholder="filter actors…  (esc to clear)"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setQuery('')
          }}
        />
        <div className="filter-chips">
          {CATEGORY_FILTERS.filter((filter) =>
            actors.some((actor) => actor.category === filter.id),
          ).map((filter) => (
            <button
              key={filter.id}
              className={`chip ${hiddenCats.has(filter.id) ? 'off' : 'on'}`}
              onClick={() => toggleCategory(filter.id)}
            >
              {filter.label}
            </button>
          ))}
          <button
            className={`chip ${showLabels ? 'on' : 'off'}`}
            onClick={() => setShowLabels((value) => !value)}
            title="Toggle flow labels"
          >
            Labels
          </button>
        </div>
      </div>
      <div className="explorer-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onEdgeClick={onEdgeClick}
          onNodeClick={onNodeClick}
          onNodeMouseEnter={(_event, node) => setHoveredId(node.id)}
          onNodeMouseLeave={() => setHoveredId(null)}
          onPaneClick={() => {
            setSelection(null)
            setSelectedEdgeId(null)
          }}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.3}
        >
          <Background variant={BackgroundVariant.Dots} gap={22} size={1.2} color="#16233c" />
          <Controls />
          <MiniMap
            pannable
            zoomable
            nodeColor={(node) => (node.data as ActorNodeData).color}
            maskColor="rgba(2, 6, 14, 0.78)"
          />
        </ReactFlow>
      </div>
      <DetailPanel selection={selection} onClose={() => setSelection(null)} />
    </div>
  )
}
