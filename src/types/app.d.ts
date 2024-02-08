import { UUID } from 'crypto'

export interface Boards {
  boards: Record<UUID, Board>
  boardsOrder: UUID[]
}

export interface Board {
  id: UUID
  title: string
  lists: Record<UUID, List>
  listsOrder: UUID[]
  labels: Record<UUID, Label>
}

export interface List {
  id: UUID
  title: string
  cards: Record<UUID, Card>
  cardsOrder: UUID[]
}

export interface Label {
  id: UUID
  color: string
  title: string
}

export interface Activity {
  member: string
  action: string
  date: string
}

export interface Card {
  id: UUID
  title: string
  desc?: string
  labels?: UUID[]
  activity?: Activity[]
}

export interface Icon {
  className?: string
}

export type PartialWithId<T> = Partial<T> & {
  id: UUID
}

export interface NavbarIcon {
  isActive: boolean
}
