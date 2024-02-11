import { useBoards } from '@/Hooks/useBoards'
import { UUID } from 'crypto'
import { CardLabelPill } from './CardLabelPill'
import { Button } from './ui/button'

import { CardAddLabel } from './CardAddLabel'
import { CardUpdateLabel } from './CardUpdateLabel'

interface CardLabel {
  listId: UUID
  cardId: UUID
  labels: UUID[] | undefined
}

export function CardLabel({ labels, cardId, listId }: CardLabel) {
  const { board, dispatcher } = useBoards()

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {labels?.map((id, i) => {
        const label = board.labels[id]
        return (
          <CardUpdateLabel
            listId={listId}
            cardId={cardId}
            label={label}
            key={`${label.color}-${label.title}-${i}`}>
            <Button className="h-fit bg-transparent p-0 hover:bg-transparent">
              <CardLabelPill label={label} />
            </Button>
          </CardUpdateLabel>
        )
      })}

      <CardAddLabel listId={listId} cardId={cardId} labels={labels} />
    </div>
  )
}
