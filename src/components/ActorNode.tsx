import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { ActorNodeData } from '../data/types'

export default function ActorNode({ data }: NodeProps<Node<ActorNodeData>>) {
  return (
    <div className="actor-node" style={{ borderColor: data.color }}>
      <div className="actor-node-bar" style={{ background: data.color }} />
      <div className="actor-node-label">{data.label}</div>
      <div className="actor-node-role">{data.role}</div>
      <Handle type="target" position={Position.Left} style={{ background: data.color }} />
      <Handle type="source" position={Position.Right} style={{ background: data.color }} />
    </div>
  )
}
