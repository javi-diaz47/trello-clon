import { Board, BoardId, Boards } from '../types/app'

const BOARD_1: Board = {
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

const BOARD_2: Board = {
  id: 'Board-2',
  title: 'Updated To Do App',
  lists: {
    'List-3': {
      id: 'List-3',
      title: 'Doing',
      cards: {
        'Card-5': {
          id: 'Card-5',
          title: 'Write Code',
          def: 'Start coding for the new feature',
          labels: [{ color: 'green', title: 'frontend' }],
          activity: [
            {
              member: 'you',
              action: 'created this card',
              date: 'today at 10:30 AM',
            },
          ],
        },
      },
      cardsOrder: ['Card-5'],
    },
    'List-4': {
      id: 'List-4',
      title: 'Review',
      cards: {
        'Card-6': {
          id: 'Card-6',
          title: 'Code Review',
          def: 'Review the code changes for QA',
          labels: [{ color: 'purple', title: 'QA' }],
          activity: [
            {
              member: 'you',
              action: 'created this card',
              date: 'today at 2:45 PM',
            },
          ],
        },
      },
      cardsOrder: ['Card-6'],
    },
  },
  listsOrder: ['List-3', 'List-4'],
}

export const BOARDS: Boards = {
  boards: {
    'Board-1': BOARD_1,
    'Board-2': BOARD_2,
  },
  boardsOrder: ['Board-1', 'Board-2'],
}
