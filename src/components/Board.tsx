'use client'

import { useBoards } from '@/Hooks/useBoards'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { List } from './List'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { DragListOverlay } from './dragOverlays/DragListOverlay'
import { DragCardOverlay } from './dragOverlays/DragCardOverlay'
import { useKanbanBoard } from '@/Hooks/useKanbanBoard'

export default function Board() {
  const { board, addList, updateBoardLists } = useBoards()

  const listsIds = useMemo(() => board.lists.map(({ id }) => id), [board])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  )

  const { activeCard, activeList, onDragEnd, onDragOver, onDragStart } =
    useKanbanBoard(board, updateBoardLists)

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleClick = () => {
    addList('new')
  }

  return (
    <>
      <button onClick={handleClick}>Add list</button>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        <SortableContext items={listsIds}>
          <section className="h-full relative min-h-screen rounded-2xl p-12 bg-dark-white  dark:bg-light-gray flex gap-12">
            {board.lists.map((list) => (
              <List key={list.id} list={list} boardId={board.id} />
            ))}
          </section>
          {typeof window === 'object' &&
            createPortal(
              <DragOverlay>
                {activeList && <DragListOverlay list={activeList} />}
                {activeCard && <DragCardOverlay card={activeCard} />}
              </DragOverlay>,
              document.body
            )}
        </SortableContext>
      </DndContext>
    </>
  )
}
