import type { List as TList } from '@/types/app'
import { Card } from '../Card'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortableProvider } from '@/Hooks/useSortableProvider'
import { ButtonAddCard } from '../ButtonAddCard'

interface ListProps {
  list: TList
}

function DragListOverlay({ list }: ListProps) {
  const { attributes, isDragging, listeners, setNodeRef, style } =
    useSortableProvider(list.id, 'list', 'list', list)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex flex-col  border rounded-3xl border-neutral-700 w-full  min-h-full min-w-[20rem] max-w-xs ">
      <header
        {...attributes}
        {...listeners}
        className="relative px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0 cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-white rounded-full"></div>
          <h2 className="text-lg font-bold">{list.title}</h2>
        </div>
        <div className="flex gap-4 ">
          <button>
            <DotsIcon />
          </button>
          <button>
            <PlusIcon />
          </button>
        </div>
      </header>
      <div className="h-full">
        <ul className="px-7 py-4 h-full flex flex-col gap-4">
          {list.cards.map((card) => (
            <li key={card.id} className="list-none  ">
              <Card card={card} />
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute bottom-0 w-full rounded-b-3xl">
        <ButtonAddCard boardId={''} listId={list.id} />
      </div>
    </div>
  )
}

export { DragListOverlay }
