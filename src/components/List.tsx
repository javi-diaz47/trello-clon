import { type List } from '@/types/app'
import { Button } from './Button'
import { Card } from './Card'
import { useBoards } from '@/Hooks/useBoards'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { useState } from 'react'
import { ButtonAddCard } from './ButtonAddCard'

interface ListWithBoard extends List {
  boardId: string
}

function List({ id, name, cards, boardId }: ListWithBoard) {
  const { removeList } = useBoards()

  const handleRemoveList = () => {
    removeList({ boardId, listId: id })
  }

  const [onMenu, setOnMenu] = useState(false)

  const handleOnMenu = () => {
    setOnMenu(!onMenu)
  }

  return (
    <div className="border rounded-3xl  border-neutral-700 w-full max-w-xs min-h-48">
      <header className="relative px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0  ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-white rounded-full"></div>
          <h2 className="text-lg font-bold">{name}</h2>
        </div>
        <div className="flex gap-4 ">
          <button onClick={handleOnMenu}>
            <DotsIcon />
          </button>
          <button>
            <PlusIcon />
          </button>
        </div>

        <div
          className={`list-menu ${
            onMenu ? 'visible' : 'hidden'
          } absolute bg-dark-gray rounded-lg p-4 z-10 top-10 right-16`}>
          <ul className="list-none grid gap-2">
            <li className="hover:bg-light-gray px-2 rounded-md">
              <button onClick={handleRemoveList}>Remove</button>
            </li>
            <li className="hover:bg-light-gray px-2 rounded-md">
              <button>Sort by date</button>
            </li>
          </ul>
        </div>
      </header>
      <ul className="px-4 py-4 h-full flex flex-col gap-4">
        {cards.map((card) => (
          <li key={card.id} className="list-none  ">
            <Card {...card} />
          </li>
        ))}
        <li>
          <ButtonAddCard boardId={boardId} listId={id} />
        </li>
      </ul>
    </div>
  )
}

export { List }
