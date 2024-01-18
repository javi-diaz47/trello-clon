'use client'

import { useBoards } from '@/Hooks/useBoards'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { List } from './List'
import { getIndex } from '@/utils/genUUID'
import { useMemo, useState } from 'react'
import { Card, List as TList } from '@/types/app'
import { createPortal } from 'react-dom'
import { DragListOverlay } from './DragListOverlay'
import { DragCardOverlay } from './DragCardOverlay'

function Board() {
  const { board, addList, updateBoardLists } = useBoards()

  const listsIds = useMemo(() => board.lists.map(({ id }) => id), [board])

  const [activeList, setActiveList] = useState<TList | null>(null)
  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const onDragStart = (ev: DragStartEvent) => {
    const curr = ev.active.data.current

    if (!curr) return
    if (curr.type === 'list') {
      setActiveList(curr.list)
      return
    }

    if (curr.type === 'card') {
      setActiveCard(curr.card)
      return
    }
  }

  const onDragEnd = (ev: DragEndEvent) => {
    setActiveList(null)
    setActiveCard(null)

    if (ev.active.data.current?.type !== 'list') return

    const { active, over } = ev

    if (!over || !active) return

    if (active.id === over.id) return

    const fromIndex = getIndex(board.lists, active.id)

    const toIndex = getIndex(board.lists, over.id)

    const newLists = arrayMove(board.lists, fromIndex, toIndex)

    updateBoardLists(newLists)
  }

  const handleClick = () => {
    addList('new')
  }

  return (
    <>
      <button onClick={handleClick}>Add list</button>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}>
        <SortableContext items={listsIds}>
          <section className="h-full relative min-h-screen rounded-2xl p-12 bg-dark-white  dark:bg-light-gray flex gap-12">
            {board.lists.map((list) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </section>
          {createPortal(
            <DragOverlay>
              {activeList && <DragListOverlay list={activeList} />}
            </DragOverlay>,
            document.body
          )}
        </SortableContext>
      </DndContext>
    </>
  )
}

export { Board }
