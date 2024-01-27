const PREFIXES = {
  board: 'Board',
  list: 'List',
  card: 'Card',
} as const

type Prefixes = (typeof PREFIXES)[keyof typeof PREFIXES]

type Id<P extends Prefixes> = `${P}-${string}`

type BoardId = Id<'Board'>
type ListId = Id<'List'>
type CardId = Id<'Card'>

export interface Boards {
  boards: Record<BoardId, Board>
  boardsOrder: BoardId[]
}

export interface Board {
  id: BoardId
  title: string
  lists: Record<ListId, List>
  listsOrder: ListId[]
}

export interface List {
  id: ListId
  title: string
  cards: Record<CardId, Card>
  cardsOrder: CardId[]
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
  id: CardId
  title: string
  def?: string
  labels?: Label[]
  activity?: Activity[]
}

export interface Icon {
  className?: string
}

export type PartialWithId<T extends { id: Id<Prefixes> }> = Partial<T> & {
  id: T.id
}
