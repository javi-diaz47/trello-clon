import type { List as TList } from '@/types/app'
import { Card } from '../Card'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useSortableProvider } from '@/Hooks/useSortableProvider'

interface ListProps {
  list: TList
}

function DragListOverlay({ list }: ListProps) {
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({
  //     id: list.id,
  //     data: {
  //       type: 'list',
  //       list,
  //       attributes: {
  //         role: 'list',
  //       },
  //     },
  //   })

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // }

  const { attributes, isDragging, listeners, setNodeRef, style } =
    useSortableProvider(list.id, 'list', 'list', list)

  const [onMenu, setOnMenu] = useState(false)

  const handleOnMenu = () => {
    setOnMenu(!onMenu)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-3xl border-neutral-700 w-full min-h-full max-w-xs ">
      <header
        {...attributes}
        {...listeners}
        className="relative px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0 cursor-grabbing">
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
            <li className="hover:bg-light-gray px-2 rounded-md"></li>
            <li className="hover:bg-light-gray px-2 rounded-md">
              <button>Sort by date</button>
            </li>
          </ul>
        </div>
      </header>
      <ul className="px-4 py-4 h-full flex flex-col gap-4">
        {list.cards.map((card) => (
          <li key={card.id} className="list-none  ">
            <Card card={card} />
          </li>
        ))}
        <li></li>
      </ul>
    </div>
  )
}

export { DragListOverlay }
