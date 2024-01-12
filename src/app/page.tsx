import { Board } from '@/components/Board'
import { List } from '@/components/List'

export default function Home() {
  return (
    <main className="min-h-screen pl-8 bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <h2 className="text-4xl font-bold  ">Trello-Clon</h2>

      <Board>
        <List id="0" name="To Do" />
        <List id="0" name="To Do" />
      </Board>
    </main>
  )
}
