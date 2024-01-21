'use client'

import { useBoards } from '@/Hooks/useBoards'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import { List } from './List'
import { getIndex } from '@/utils/genUUID'
import { useEffect, useMemo, useState } from 'react'
import { Card, List as TList } from '@/types/app'
import { createPortal } from 'react-dom'
import { DragListOverlay } from './DragListOverlay'
import { DragCardOverlay } from './DragCardOverlay'

export default function Board() {
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

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

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

    if (!ev.over) return

    let overId = ev.over.id.toString()

    // Move a card to an empty list

    if (overId.includes('Droppable')) {
      overId = overId.slice('Droppable-'.length)

      const { active, over } = ev

      if (!over || !active) return

      if (active.id === over.id) return // place the card in its same position

      // Find the index of the active card in the list
      // and the index of the list that has the active card in the board

      const from = board.lists
        .map((list, i) => {
          const cardIndex = getIndex(list.cards, active.id)
          return { listIndex: i, cardIndex }
        })
        .find(({ cardIndex }) => cardIndex !== -1)

      const toListIndex = getIndex(board.lists, overId)

      if (!!from) {
        // card dropped in another list
        if (from.listIndex !== toListIndex && activeCard) {
          const newCards = [activeCard]

          const newLists = board.lists
          newLists[from.listIndex].cards.splice(from.cardIndex, 1)

          newLists[toListIndex].cards = newCards

          updateBoardLists(newLists)
          return
        }
      }
    }

    // Move The Lists

    if (ev.active.data.current?.type === 'card') return

    const { active, over } = ev

    if (!over || !active) return

    if (active.id === over.id) return

    const fromIndex = getIndex(board.lists, active.id)

    const toIndex = getIndex(board.lists, overId)

    const newLists = arrayMove(board.lists, fromIndex, toIndex)

    updateBoardLists(newLists)
  }

  const onDragOver = (ev: DragOverEvent) => {
    if (ev.active.data.current?.type !== 'card') return

    const { active, over } = ev

    if (!over || !active) return

    if (active.id === over.id) return // place the card in its same position

    // Find the index of the active card in the list
    // and the index of the list that has the active card in the board

    const from = board.lists
      .map((list, i) => {
        const cardIndex = getIndex(list.cards, active.id)
        return { listIndex: i, cardIndex }
      })
      .find(({ cardIndex }) => cardIndex !== -1)

    const to = board.lists
      .map((list, i) => {
        const cardIndex = getIndex(list.cards, over.id)
        return { listIndex: i, cardIndex }
      })
      .find(({ cardIndex }) => cardIndex !== -1)

    if (!!from && !!to) {
      // card dropped in the same list
      if (from.listIndex === to.listIndex) {
        const newCards = arrayMove(
          board.lists[from.listIndex].cards,
          from.cardIndex,
          to.cardIndex
        )

        const newLists = board.lists
        newLists[from.listIndex].cards = newCards

        updateBoardLists(newLists)
        return
      }
      // card dropped in another list
      if (from.listIndex !== to.listIndex && activeCard) {
        const help = [activeCard, ...board.lists[to.listIndex].cards]
        const newCards = arrayMove(help, to.cardIndex, to.cardIndex)

        const newLists = board.lists
        newLists[from.listIndex].cards.splice(from.cardIndex, 1)

        newLists[to.listIndex].cards = newCards

        updateBoardLists(newLists)
        return
      }
    }
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
