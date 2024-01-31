import { Board } from '@/types/app'

export const navbarIconStyle = (isActive: boolean) =>
  `${isActive ? 'nav-icon-active' : ''} nav-icon`

export const DEFAULT_BOARD: Board = {
  id: 'Board-',
  title: '',
  lists: {
    'List-1': {
      id: 'List-1',
      title: 'new',
      cards: {
        'Card-1': {
          id: 'Card-1',
          title: '',
        },
      },
      cardsOrder: [],
    },
  },
  listsOrder: ['List-1'],
}
