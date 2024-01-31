import { Board, BoardId } from '@/types/app'

export const navbarIconStyle = (isActive: boolean) =>
  `${isActive ? 'nav-icon-active' : ''} nav-icon`

export const DEFAULT_BOARD = (id: BoardId): Board => {
  return {
    id,
    title: '',
    lists: {
      'List-1': {
        id: 'List-1',
        title: 'List',
        cards: {
          'Card-1': {
            id: 'Card-1',
            title: 'Card',
          },
        },
        cardsOrder: ['Card-1'],
      },
    },
    listsOrder: ['List-1'],
  }
}
