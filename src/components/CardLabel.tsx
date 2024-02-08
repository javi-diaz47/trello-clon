import { useBoards } from '@/Hooks/useBoards'
import type { Board, Label as TLabel } from '@/types/app'
import { COLORS, INPUT_STYLE } from '@/utils/constant'
import { UUID } from 'crypto'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { twMerge } from 'tailwind-merge'
import { CardLabelPill } from './CardLabelPill'
import { genUUID } from '@/utils/genUUID'

/*
  *********************
  NOTE:
  Adds labels to the BOARD as another array
   1. MODIFY the data structure of a board --
   2. ADD an ID to the Label type
   3. REFERENCE the label id inside the cards that has a label0w
  **********************
*/

interface CardLabel {
  listId: UUID
  cardId: UUID
  labels: UUID[] | undefined
}

export function CardLabel({ labels, cardId, listId }: CardLabel) {
  const { board, dispatcher } = useBoards()

  const [label, setLabel] = useState('')

  const onChangeLabel = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = ev.currentTarget.value
    setLabel(newLabel)
  }

  const onAddLabel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const id = genUUID()
    const newLabel: TLabel = { id, title: label, color: COLORS.blue }

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
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {labels?.map((id, i) => {
        const label = board.labels[id]

        return (
          <CardLabelPill
            key={`${label.color}-${label.title}-${i}`}
            label={label}
          />
        )
      })}
      <form onSubmit={onAddLabel}>
        <Label className="sr-only">Title</Label>
        <Input
          type="text"
          placeholder="New label"
          name="title"
          value={label}
          onChange={onChangeLabel}
          className={twMerge(INPUT_STYLE, 'text-sm h-fit py-1')}
        />
      </form>
    </div>
  )
}
