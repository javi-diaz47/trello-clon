import { Board } from '@/components/Board'
import { Card } from '@/components/Card'
import { List } from '@/components/List'

export default function Home() {
  const todoCards: Card[] = [
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

  return (
    <main className="min-h-screen pl-8 bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <h2 className="text-4xl font-bold  ">Trello-Clon</h2>

      <Board>
        <List id="0" name="To Do" cards={todoCards}></List>
        {/* <List id="0" name="Doing" /> */}
      </Board>
    </main>
  )
}
