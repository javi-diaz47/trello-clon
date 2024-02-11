import { useBoards } from '@/Hooks/useBoards'
import { Button } from './ui/button'
import { genUUID } from '@/utils/genUUID'
import { UUID } from 'crypto'
import type { Label as TLabel } from '@/types/app'
import { useState } from 'react'
import { CardLabelMenu } from './CardLabelMenu'

interface CardLabel {
  listId: UUID
  cardId: UUID
  labels: UUID[] | undefined
}

export function CardAddLabel({ listId, cardId, labels }: CardLabel) {
  const { dispatcher } = useBoards()

  const onAddLabel = (label: TLabel) => {
    const id = genUUID()
    const newLabel: TLabel = { ...label, id }

    const newLabelsId: UUID[] = Array.from(labels || [])
    newLabelsId.push(id)

    dispatcher({
      type: 'update card',
      payload: {
        listId,
        card: {
          id: cardId,
          labels: newLabelsId,
        },
      },
    })

    dispatcher({
      type: 'add label to board',
      payload: {
        newLabel,
      },
    })

    setOnAdd(false)
  }

  const [onAdd, setOnAdd] = useState(false)

  const onChangeOpen = (open: boolean) => {
    setOnAdd(open)
  }

  return (
    <CardLabelMenu
      open={onAdd}
      onChangeOpen={onChangeOpen}
      onCardLabel={onAddLabel}>
      <Button variant="outline" size="icon">
        +
      </Button>
    </CardLabelMenu>
  )
}
