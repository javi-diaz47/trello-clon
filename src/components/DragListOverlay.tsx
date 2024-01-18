import type { List as TList } from '@/types/app'
import { Button } from './Button'
import { Card } from './Card'
import { useBoards } from '@/Hooks/useBoards'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { useState } from 'react'
import { ButtonAddCard } from './ButtonAddCard'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'

interface DragListOverlay {
  list: TList
}

function DragListOverlay({ list }: DragListOverlay) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: list.id,
    data: { type: 'list', list },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="border-2 rounded-3xl border-sky-400 w-full min-h-full max-w-xs opacity-40"
      />
    )
  }
}

export { DragListOverlay }
