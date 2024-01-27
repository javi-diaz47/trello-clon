import { Board } from '../types/app'

export const BOARDS: Board = {
  id: 'Board-1',
  title: 'To do App',
  lists: {
    'List-1': {
      id: 'List-1',
      title: 'To do',
      cards: {
        'Card-1': {
          id: 'Card-1',
          title: 'Do Laundry',
          def: 'Seek the clothes, and wash them   Seek the clothes, and wash them  Seek the clothes, and wash them  Seek the clothes, and wash them  ',
          labels: [{ color: 'blue', title: 'home' }],
          activity: [],
        },

        'Card-2': {
          id: 'Card-2',
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

        'Card-3': {
          id: 'Card-3',
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
      },
      cardsOrder: ['Card-1', 'Card-2', 'Card-3'],
    },
    'List-2': {
      id: 'List-2',
      title: 'Done',
      cards: {
        'Card-4': {
          id: 'Card-4',
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
      },
      cardsOrder: ['Card-4'],
    },
  },
  listsOrder: ['List-1', 'List-2'],
}
