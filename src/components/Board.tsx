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
    <div className="flex flex-col w-full pr-8 gap-4 overflow-hidden">
      <div className="w-full min-h-[6rem]">
        <button onClick={handleClick}>Add list</button>
      </div>
      <div className="w-full h-full bg-light-gray rounded-3xl mr-16 mb-8">
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}>
          <SortableContext items={listsIds}>
            <section className="h-full flex overflow-scroll relative rounded-2xl p-8 gap-12">
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
      </div>
    </div>
  )
}
