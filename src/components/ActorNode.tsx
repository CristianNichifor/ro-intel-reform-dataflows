import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { ActorCategory, ActorNodeData } from '../data/types'

const GLYPHS: Record<ActorCategory, string> = {
  executive: '▲',
  agency: '◆',
  judicial: '§',
  oversight: '●',
  civilian: '◇',
  broker: '▦',
  justice: '¶',
  public: '◎',
}

export default function ActorNode({ data }: NodeProps<Node<ActorNodeData>>) {
  return (
    <div className="actor-node" style={{ borderColor: data.color }}>
      <div className="actor-node-bar" style={{ background: data.color }} />
      <div className="actor-node-top">
        <span className="actor-node-glyph" style={{ color: data.color }}>
          {GLYPHS[data.category]}
        </span>
        <span className="actor-node-label">{data.label}</span>
      </div>
      <div className="actor-node-role">{data.role}</div>
      <Handle type="target" position={Position.Left} style={{ background: data.color, width: 7, height: 7 }} />
      <Handle type="source" position={Position.Right} style={{ background: data.color, width: 7, height: 7 }} />
    </div>
  )
}
