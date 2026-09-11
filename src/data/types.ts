import type { Localized } from '../i18n/messages'

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
  name: Localized
  role: Localized
  category: ActorCategory
  note?: Localized
}

export interface Flow {
  id: string
  source: string
  target: string
  label: Localized
  dataType: Localized
  legal: Localized
  audit?: Localized
  oversight?: Localized
  risk?: Localized
  category: 'current' | 'target'
  description?: Localized
}

export interface ActorNodeData extends Record<string, unknown> {
  label: string
  role: string
  category: ActorCategory
  color: string
  note?: string
}
