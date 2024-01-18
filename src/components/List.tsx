import type { List as TList } from '@/types/app'
import { Card } from './Card'
import { useBoards } from '@/Hooks/useBoards'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { useMemo, useState } from 'react'
import { ButtonAddCard } from './ButtonAddCard'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'

interface ListProps {
  list: TList
  boardId: UniqueIdentifier
}

function List({ list, boardId }: ListProps) {
  const { removeList } = useBoards()

  const cardsIds = useMemo(() => list.cards.map(({ id }) => id), [list.cards])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { type: 'list', list } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemoveList = () => {
    removeList(list.id)
  }

  const [onMenu, setOnMenu] = useState(false)

  const handleOnMenu = () => {
    setOnMenu(!onMenu)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" border-2 rounded-3xl border-sky-400 w-full min-h-full max-w-xs opacity-40"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative border rounded-3xl border-neutral-700 w-full min-h-full max-w-xs ">
      <header
        {...attributes}
        {...listeners}
        className=" px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0 cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-white rounded-full"></div>
          <h2 className="text-lg font-bold">{list.title}</h2>
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
        <SortableContext items={cardsIds}>
          {list.cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </SortableContext>
        <li>
          <ButtonAddCard boardId={boardId} listId={list.id} />
        </li>
      </ul>
    </div>
  )
}

export { List }
