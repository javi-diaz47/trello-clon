import type { List as TList } from '@/types/app'
import { Card } from './Card'
import { useMemo } from 'react'
import { ButtonAddCard } from './ButtonAddCard'
import { SortableContext } from '@dnd-kit/sortable'
import { UniqueIdentifier } from '@dnd-kit/core'
import { Droppable } from './Droppable'
import { useSortableProvider } from '@/Hooks/useSortableProvider'
import { ListHeader } from './ListHeader'

interface ListProps {
  list: TList
  boardId: UniqueIdentifier
}

function List({ list, boardId }: ListProps) {
  const cardsIds = useMemo(() => list.cards.map(({ id }) => id), [list.cards])

  const { attributes, isDragging, listeners, setNodeRef, style } =
    useSortableProvider(list.id, 'list', 'list', list)

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
      <header {...attributes} {...listeners}>
        <ListHeader list={list} />
      </header>
      <Droppable id={list.id} disabled={!!list.cards.length}>
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
      </Droppable>
    </div>
  )
}

export { List }
