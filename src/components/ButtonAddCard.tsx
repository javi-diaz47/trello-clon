'use client'

import { useBoards } from '@/Hooks/useBoards'
import { CloseIcon } from '@/icons/CloseIcon'
import { PlusIcon } from '@/icons/PlusIcon'
import { ListId } from '@/types/app'
import { useState } from 'react'

interface ButtonAddCard {
  listId: ListId
}

function ButtonAddCard({ listId }: ButtonAddCard) {
  const { dispatcher } = useBoards()

  const handleAddCard = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const { cardTitle } = Object.fromEntries(
      new FormData(ev.currentTarget)
    ) as {
      cardTitle: string
    }

    if (!cardTitle) return

    dispatcher({ type: 'add card', payload: { listId, title: cardTitle } })
    toggleonAdd()
  }

  const toggleonAdd = () => {
    setOnAdd(!onAdd)
  }

  const [onAdd, setOnAdd] = useState(false)

  const DEFAULT_STYLES =
    'hover:bg-gray-300 hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-sm hover:bg-opacity-15 hover:border-neutral-700'
  const ON_ADD_STYLES =
    'bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-neutral-700'

  return (
    <div
      className={`w-full max-w-xs flex justify-between rounded-b-3xl border-2 border-transparent ${
        onAdd ? ON_ADD_STYLES : DEFAULT_STYLES
      }`}>
      {onAdd ? (
        <form
          onSubmit={handleAddCard}
          className="flex flex-col gap-2 px-4 py-2 w-full">
          <label>Title</label>
          <input
            type="text"
            name="cardTitle"
            className="bg-dark-gray rounded-lg px-2 py-1"
            autoFocus
          />
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 bg-cyan-900 bg-opacity-75 text-sky-400">
              Add card
            </button>
            <button onClick={toggleonAdd} className="w-fit h-fit">
              <CloseIcon />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={toggleonAdd}
          className="w-full flex justify-center items-center gap-2  py-4">
          <PlusIcon className="w-4" />
          Add Card
        </button>
      )}
    </div>
  )
}

export { ButtonAddCard }
