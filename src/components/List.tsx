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
        className="min-w-[20rem] border-2 rounded-3xl border-sky-400 w-full min-h-full max-w-xs opacity-40"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex flex-col  border rounded-3xl border-neutral-700 w-full min-h-96 max-h-full min-w-[20rem] max-w-xs grid-rows-12">
      <header className="row-span-1" {...attributes} {...listeners}>
        <ListHeader list={list} />
      </header>
      <Droppable id={list.id} disabled={!!list.cards.length}>
        <div className=" h-full ">
          <ul className="px-7 py-4 h-full flex flex-col gap-4 ">
            <SortableContext items={cardsIds}>
              {list.cards.map((card) => (
                <Card key={card.id} card={card} />
              ))}
            </SortableContext>
          </ul>
        </div>
      </Droppable>
      <div className="row-span-12 w-full rounded-b-3xl">
        <ButtonAddCard boardId={boardId} listId={list.id} />
      </div>
    </div>
  )
}

export { List }
