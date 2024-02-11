import { CardLabelMenu } from './CardLabelMenu'
import { useState } from 'react'
import type { Label } from '@/types/app'
import { UUID } from 'crypto'
import { useBoards } from '@/Hooks/useBoards'

interface CardUpdateLabel {
  listId: UUID
  cardId: UUID
  label: Label
  children: React.ReactNode
}

export function CardUpdateLabel({
  listId,
  cardId,
  label,
  children,
}: CardUpdateLabel) {
  const { board, dispatcher } = useBoards()

  // const [label, setLabel] = useState<TLabel>(initLabel)

  // const onChangeBg = (newBg: string) => {
  //   const newLabel: TLabel = { ...label, color: newBg }

  //   dispatcher({
  //     type: 'udpate labels',
  //     payload: {
  //       newLabel: {
  //         ...label,
  //         color: newBg,
  //       },
  //     },
  //   })

  //   setLabel(newLabel)
  // }

  // const onChangeLabel = (ev: React.ChangeEvent<HTMLInputElement>) => {
  //   const newLabel: TLabel = { ...label, title: ev.currentTarget.value }
  //   setLabel(newLabel)
  // }

  // const onAddLabel = (ev: React.FormEvent<HTMLFormElement>) => {
  //   ev.preventDefault()
  // }

  const [onEdit, setOnEdit] = useState(false)

  const onChangeOpen = (open: boolean) => {
    setOnEdit(open)
  }

  const onEditLabel = (updatedLabel: Label) => {
    const newLabel = {
      ...updatedLabel,
      id: label.id,
    }

    dispatcher({
      type: 'udpate labels',
      payload: {
        newLabel,
      },
    })

    setOnEdit(false)
  }

  return (
    <CardLabelMenu
      open={onEdit}
      onChangeOpen={onChangeOpen}
      onCardLabel={onEditLabel}
      initLabel={label}>
      {children}
    </CardLabelMenu>
  )
}
