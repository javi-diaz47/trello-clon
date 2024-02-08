import { COLORS } from '@/utils/constant'
import { Board, Boards } from '../types/app'

const BOARD_1: Board = {
  id: 'f3a1b02d-069d-4ef4-b5f9-215c5d88f1f3',
  title: 'To do App',
  lists: {
    '7ef3471b-f6fb-43c3-8bc2-04b9f1dcba58': {
      id: '7ef3471b-f6fb-43c3-8bc2-04b9f1dcba58',
      title: 'To do',
      cards: {
        '92870f3c-412b-4272-aa43-02a8ebe6affb': {
          id: '92870f3c-412b-4272-aa43-02a8ebe6affb',
          title: 'Do Laundry',
          desc: 'Seek the clothes, and wash them   Seek the clothes, and wash them  Seek the clothes, and wash them  Seek the clothes, and wash them  ',
          labels: ['0-0-0-0-0'],
          activity: [],
        },

        '6839cb73-5d87-4a78-a2c8-3ae15f48daaa': {
          id: '6839cb73-5d87-4a78-a2c8-3ae15f48daaa',
          title: 'DB Migration',
          desc: 'To migrate the DB',
          labels: ['0-0-0-0-1', '0-0-0-1-0'],
          activity: [
            {
              member: 'me',
              action: 'moved this card from Doing to To Do',
              date: 'yesterday at 5:05 PM',
            },
          ],
        },

        '53d889cc-9df3-467d-bb3d-43bfb9faed87': {
          id: '53d889cc-9df3-467d-bb3d-43bfb9faed87',
          title: 'DB design',
          desc: 'To migrate the DB',
          labels: ['0-0-0-0-1', '0-0-0-1-0'],
          activity: [
            {
              member: 'me',
              action: 'moved this card from Doing to To Do',
              date: 'yesterday at 5:05 PM',
            },
          ],
        },
      },
      cardsOrder: [
        '92870f3c-412b-4272-aa43-02a8ebe6affb',
        '6839cb73-5d87-4a78-a2c8-3ae15f48daaa',
        '53d889cc-9df3-467d-bb3d-43bfb9faed87',
      ],
    },
    'd4d1110f-3a65-4133-b6b5-65f425d4de37': {
      id: 'd4d1110f-3a65-4133-b6b5-65f425d4de37',
      title: 'Done',
      cards: {
        'a1a70691-b089-46b6-99c9-35d5933e7b1e': {
          id: 'a1a70691-b089-46b6-99c9-35d5933e7b1e',
          title: 'DB Migration',
          desc: 'To migrate the DB',
          labels: ['0-0-0-0-1', '0-0-0-1-0'],
          activity: [
            {
              member: 'me',
              action: 'moved this card from Doing to To Do',
              date: 'yesterday at 5:05 PM',
            },
          ],
        },
      },
      cardsOrder: ['a1a70691-b089-46b6-99c9-35d5933e7b1e'],
    },
  },
  listsOrder: [
    '7ef3471b-f6fb-43c3-8bc2-04b9f1dcba58',
    'd4d1110f-3a65-4133-b6b5-65f425d4de37',
  ],
  labels: {
    '0-0-0-0-0': { id: '0-0-0-0-0', color: COLORS.cyan, title: 'home' },
    '0-0-0-0-1': { id: '0-0-0-0-1', color: COLORS.emerald, title: 'backend' },
    '0-0-0-1-0': { id: '0-0-0-1-0', color: COLORS.pink, title: 'work' },
  },
}

const BOARD_2: Board = {
  id: '6df21c62-8479-4ea6-9994-5df76e722aa5',
  title: 'Updated To Do App',
  lists: {
    '5d777710-cc60-47dd-8bc9-cc61e3fa8d28': {
      id: '5d777710-cc60-47dd-8bc9-cc61e3fa8d28',
      title: 'Doing',
      cards: {
        'e554a9cd-2250-4709-b7cc-8ef450f63d0e': {
          id: 'e554a9cd-2250-4709-b7cc-8ef450f63d0e',
          title: 'Write Code',
          desc: 'Start coding for the new feature',
          labels: [],
          activity: [
            {
              member: 'you',
              action: 'created this card',
              date: 'today at 10:30 AM',
            },
          ],
        },
      },
      cardsOrder: ['e554a9cd-2250-4709-b7cc-8ef450f63d0e'],
    },
    '27aea1ad-3b38-4db0-80c4-59f9325532f4': {
      id: '27aea1ad-3b38-4db0-80c4-59f9325532f4',
      title: 'Review',
      cards: {
        '5ceb7ce8-4c74-4bb5-9cef-4f709669d115': {
          id: '5ceb7ce8-4c74-4bb5-9cef-4f709669d115',
          title: 'Code Review',
          desc: 'Review the code changes for QA',
          labels: [],
          activity: [
            {
              member: 'you',
              action: 'created this card',
              date: 'today at 2:45 PM',
            },
          ],
        },
      },
      cardsOrder: ['5ceb7ce8-4c74-4bb5-9cef-4f709669d115'],
    },
  },
  listsOrder: [
    '5d777710-cc60-47dd-8bc9-cc61e3fa8d28',
    '27aea1ad-3b38-4db0-80c4-59f9325532f4',
  ],
  labels: {
    '0-0-0-0-0': { id: '0-0-0-0-0', color: COLORS.cyan, title: 'home' },
    '0-0-0-0-1': { id: '0-0-0-0-1', color: COLORS.emerald, title: 'backend' },
    '0-0-0-1-0': { id: '0-0-0-1-0', color: COLORS.pink, title: 'work' },
  },
}

export const BOARDS: Boards = {
  boards: {
    'f3a1b02d-069d-4ef4-b5f9-215c5d88f1f3': BOARD_1,
    '6df21c62-8479-4ea6-9994-5df76e722aa5': BOARD_2,
  },
  boardsOrder: [
    'f3a1b02d-069d-4ef4-b5f9-215c5d88f1f3',
    '6df21c62-8479-4ea6-9994-5df76e722aa5',
  ],
}
