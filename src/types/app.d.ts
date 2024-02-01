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
}

export interface List {
  id: UUID
  title: string
  cards: Record<UUID, Card>
  cardsOrder: UUID[]
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
  id: UUID
  title: string
  desc?: string
  labels?: Label[]
  activity?: Activity[]
}

export interface Icon {
  className?: string
}

export type PartialWithId<T extends { id: UUID }> = Partial<T> & {
  id: T.id
}

export interface NavbarIcon {
  isActive: boolean
}
