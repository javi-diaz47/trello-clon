import { genUUID } from '@/utils/genUUID'
import { Board, Card, List } from '../types/app'

const CARDS: Card[] = [
  {
    id: '2',
    title: 'Do Laundry',
    def: 'Seek the clothes, and wash them',
    labels: [{ color: 'blue', title: 'home' }],
    activity: [],
  },
  {
    id: '1',
    title: 'DB Migration',
    def: 'To migrate the DB',
    labels: [{ color: 'red', title: 'backend' }],
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
    labels: [{ color: 'blue', title: 'home' }],
    activity: [],
  },
]

const LISTS: List[] = [
  { id: 'bf2e7985-acc3-42af-8ab6-937738cdcd7a', cards: CARDS, title: 'To Do' },

  {
    id: '81d634c0-54ff-472c-8a69-3e0451169383',
    cards: CARDS_DONE,
    title: 'Done',
  },
]

export const BOARDS: Board[] = [
  // { id: crypto.randomUUID(), title: 'To Do APP', lists: LISTS },
  {
    id: '69797b37-26a3-49a7-a5d1-9b295f8587f0',
    title: 'To Do APP',
    lists: LISTS,
  },
]
