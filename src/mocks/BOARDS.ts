import { genUUID } from '@/utils/genUUID'
import { Board, Card, List } from '../types/app'

const CARDS: Card[] = [
  {
    id: '0',
    title: 'Do Laundry',
    def: 'Seek the clothes, and wash them',
    labels: [{ color: 'blue', name: 'home' }],
    activity: [],
  },
  {
    id: '1',
    title: 'DB Migration',
    def: 'To migrate the DB',
    labels: [{ color: 'red', name: 'backend' }],
    activity: [
      {
        member: 'me',
        action: 'moved this card from Doing to To Do',
        date: 'yesterday at 5:05 PM',
      },
    ],
  },
]

const CARDS_DONE = [
  {
    id: '4',
    title: 'Learn Japanese',
    def: '',
    labels: [{ color: 'blue', name: 'home' }],
    activity: [],
  },
]

const LISTS: List[] = [
  { id: genUUID(), cards: CARDS, name: 'To Do' },

  { id: genUUID(), cards: CARDS_DONE, name: 'Done' },
]

export const BOARDS: Board[] = [
  // { id: crypto.randomUUID(), name: 'To Do APP', lists: LISTS },
  { id: genUUID(), name: 'To Do APP', lists: LISTS },
]
