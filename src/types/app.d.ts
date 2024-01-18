import { UniqueIdentifier } from '@dnd-kit/core'

export interface Board {
  id: UniqueIdentifier
  title: string
  lists: List[]
}

export interface List {
  id: UniqueIdentifier
  title: string
  cards: Card[]
}

export interface Label {
  color: string
  title: string
}

export interface Activity {
  member: string
  action: string
  date: string
}

export interface Card {
  id: UniqueIdentifier
  title: string
  def?: string
  labels?: Label[]
  activity?: Activity[]
}

export interface Icon {
  className?: string
}
