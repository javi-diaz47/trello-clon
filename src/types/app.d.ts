import { UniqueIdentifier } from '@dnd-kit/core'

export interface Board {
  id: UniqueIdentifier
  name: string
  lists: List[]
}

export interface List {
  id: UniqueIdentifier
  name: string
  cards: Card[]
}

export interface Label {
  color: string
  name: string
}

export interface Activity {
  member: string
  action: string
  date: string
}

export interface Card {
  id?: UniqueIdentifier
  title: string
  def?: string
  labels?: Label[]
  activity?: Activity[]
}

export interface Icon {
  className?: string
}
