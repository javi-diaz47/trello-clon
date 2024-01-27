import type { List as TList } from '@/types/app'
import { Card } from './Card'
import { ButtonAddCard } from './ButtonAddCard'
import {
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd'
import { ListHeader } from './ListHeader'

interface ListProps {
  list: TList
  isDragging: boolean
  providedDragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

function List({ list, isDragging, providedDragHandleProps }: ListProps) {
  return (
    <div
      className={`${isDragging ? 'border-blue-500' : 'border-neutral-700'}
    relative flex flex-col  border rounded-3xl  w-full max-h-full min-w-[20rem] max-w-xs grid-rows-12
    `}>
      <header {...providedDragHandleProps} className="row-span-1">
        <ListHeader list={list} />
      </header>
      <div className="min-h-24 max-h-[calc(90vh-20rem)] overflow-y-scroll">
        <Droppable droppableId={list.id} type="Card">
          {(provided, snapshot) => (
            <section
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${
                snapshot.isDraggingOver ? 'border border-blue-500' : ''
              } px-7 py-4  `}>
              {list.cardsOrder.map((id, i) => (
                <Draggable key={id} draggableId={id} index={i}>
                  {(provided) => (
                    <article
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="mb-4">
                      <Card card={list.cards[id]} />
                    </article>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </div>
      <div className=" w-full rounded-b-3xl">
        <ButtonAddCard listId={list.id} />
      </div>
    </div>
  )
}

export { List }
