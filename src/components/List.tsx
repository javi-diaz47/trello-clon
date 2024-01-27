import type { List as TList } from '@/types/app'
import { Card } from './Card'
import { ButtonAddCard } from './ButtonAddCard'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { ListHeader } from './ListHeader'

interface ListProps {
  list: TList
}

function List({ list }: ListProps) {
  return (
    <div className="relative flex flex-col  border rounded-3xl border-neutral-700 w-full min-h-96 max-h-full min-w-[20rem] max-w-xs grid-rows-12">
      <header className="row-span-1">
        <ListHeader list={list} />
      </header>
      <div className="h-full">
        <Droppable droppableId={list.id}>
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="px-7 py-4 h-full  ">
              {list.cardsOrder.map((id, i) => (
                <Draggable key={id} draggableId={id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="mb-4">
                      <Card card={list.cards[id]} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
      <div className="row-span-12 w-full rounded-b-3xl">
        <ButtonAddCard listId={list.id} />
      </div>
    </div>
  )
}

export { List }
