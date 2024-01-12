export interface List {
  id: string
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
  id: string
  title: string
  def: string
  labels: Label[]
  activity: Activity[]
}
