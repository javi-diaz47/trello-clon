import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useState } from 'react'
import { Board, Card, List as TList } from '@/types/app'
import { getIndex, getIndexFromCollection } from '@/utils/getIndex'

export const useKanbanBoard = (
  board: Board,
  updateBoardLists: (lists: TList[]) => void
) => {
  const [activeList, setActiveList] = useState<TList | null>(null)
  const [activeCard, setActiveCard] = useState<Card | null>(null)

  const onDragStart = (ev: DragStartEvent) => {
    const curr = ev.active.data.current

    if (!curr) return
    if (curr.type === 'list') {
      setActiveList(curr.data)
      return
    }

    if (curr.type === 'card') {
      setActiveCard(curr.data)
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

      const from = getIndexFromCollection(board.lists, active.id)

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

    const from = getIndexFromCollection(board.lists, active.id)

    const to = getIndexFromCollection(board.lists, over.id)

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

  return {
    activeList,
    activeCard,
    onDragStart,
    onDragOver,
    onDragEnd,
  }
}
