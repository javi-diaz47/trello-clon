import { UniqueIdentifier } from '@/types/utils'
import { useDroppable } from '@dnd-kit/core'
import { RSC_ACTION_ENCRYPTION_ALIAS } from 'next/dist/lib/constants'
import React, { useEffect, useState } from 'react'

interface Droppable {
  id: UniqueIdentifier
  children: React.ReactNode
  disabled: boolean
}

export function Droppable({ id, children, disabled }: Droppable) {
  const { isOver, setNodeRef, active } = useDroppable({
    id: `Droppable-${id}`,
    data: {
      listId: id,
    },
    disabled,
  })

  const [cardOver, setCardOver] = useState(false)

  useEffect(() => {
    if (active?.data.current?.type === 'list') return

    setCardOver(isOver)
  }, [active, isOver])

  return (
    <div
      ref={setNodeRef}
      className={`${
        cardOver ? 'ring-sky-500' : 'ring-transparent'
      }   w-full h-full   ring-2 rounded-b-lg`}>
      {children}
    </div>
  )
}
