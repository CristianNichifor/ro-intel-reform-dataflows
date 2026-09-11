export type ActorCategory =
  | 'executive'
  | 'agency'
  | 'judicial'
  | 'oversight'
  | 'civilian'
  | 'broker'
  | 'justice'
  | 'public'

export interface Actor {
  id: string
  name: string
  role: string
  category: ActorCategory
  note?: string
}

export interface Flow {
  id: string
  source: string
  target: string
  label: string
  dataType: string
  legal: string
  audit?: string
  oversight?: string
  risk?: string
  category: 'current' | 'target'
  description?: string
}

export interface ActorNodeData extends Record<string, unknown> {
  label: string
  role: string
  category: ActorCategory
  color: string
  note?: string
}
