import { useBoards } from '@/Hooks/useBoards'
import type { Label as TLabel } from '@/types/app'
import { COLORS, INPUT_STYLE } from '@/utils/constant'
import { UUID } from 'crypto'
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { twMerge } from 'tailwind-merge'
import { CardLabelPill } from './CardLabelPill'

interface CardLabel {
  listId: UUID
  cardId: UUID
  labels: TLabel[] | undefined
}

export function CardLabel({ labels, cardId, listId }: CardLabel) {
  const { dispatcher } = useBoards()

  const [label, setLabel] = useState('')

  const onChangeLabel = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel = ev.currentTarget.value
    setLabel(newLabel)
  }

  const onAddLabel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const newLabels: TLabel[] = Array.from(labels || [])

    newLabels.push({ color: COLORS.blue, title: label })

    dispatcher({
      type: 'update card',
      payload: {
        listId,
        card: {
          id: cardId,
          labels: newLabels,
        },
      },
    })
  }

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {labels?.map(({ color, title }, i) => (
        <CardLabelPill
          key={`${color}-${title}-${i}`}
          title={title}
          initialBg={color}
        />
      ))}
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
