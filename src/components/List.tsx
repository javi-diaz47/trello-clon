import type { List as TList } from '@/types/app'
import { Card } from './Card'
import { useBoards } from '@/Hooks/useBoards'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { ElementRef, FormEvent, useMemo, useRef, useState } from 'react'
import { ButtonAddCard } from './ButtonAddCard'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { UniqueIdentifier } from '@dnd-kit/core'
import { Droppable } from './Droppable'
import { genUUID } from '@/utils/genUUID'

interface ListProps {
  list: TList
  boardId: UniqueIdentifier
}

function List({ list, boardId }: ListProps) {
  const { removeList, updateListById } = useBoards()

  const cardsIds = useMemo(() => list.cards.map(({ id }) => id), [list.cards])

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: list.id,
    data: {
      type: 'list',
      list,
      attributes: {
        role: 'list',
      },
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleRemoveList = () => {
    removeList(list.id)
  }

  const [onMenu, setOnMenu] = useState(false)
  const [isChangeTitle, setIsChangeTitle] = useState(false)

  const onChangeTitle = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const { title } = Object.fromEntries(new FormData(ev.currentTarget)) as {
      title: string
    }

    if (title.length) {
      const newList = { ...list, title: title.trim() }

      updateListById(list.id, newList)
    }
    setIsChangeTitle(false)
  }

  const handleOnMenu = () => {
    setOnMenu(!onMenu)
  }

  const onBlur = (ev: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsChangeTitle(false)
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" border-2 rounded-3xl border-sky-400 w-full min-h-full max-w-xs opacity-40"
      />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative border rounded-3xl border-neutral-700 w-full min-h-full max-w-xs ">
      <header
        {...attributes}
        {...listeners}
        className=" px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0 cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-white rounded-full"></div>
          {isChangeTitle ? (
            <form onSubmit={onChangeTitle}>
              <input
                placeholder={list.title}
                type="text"
                name="title"
                onBlur={onBlur}
                autoFocus
                className="w-full bg-gray-800"
              />
            </form>
          ) : (
            <h2
              onClick={() => setIsChangeTitle(true)}
              className="text-lg font-bold cursor-pointer">
              {list.title}
            </h2>
          )}
        </div>
        <div className="flex gap-4 ">
          <button aria-label="toggle menu" onClick={handleOnMenu}>
            <DotsIcon />
          </button>
          <button aria-label="add new card">
            <PlusIcon />
          </button>
        </div>

        <div
          className={`list-menu ${
            onMenu ? 'visible' : 'hidden'
          } absolute bg-dark-gray rounded-lg p-4 z-10 top-10 right-16`}>
          <ul className="list-none grid gap-2">
            <li className="hover:bg-light-gray px-2 rounded-md">
              <button aria-label="remove list" onClick={handleRemoveList}>
                Remove
              </button>
            </li>
            <li className="hover:bg-light-gray px-2 rounded-md">
              <button aria-label="sort cards by date">Sort by date</button>
            </li>
          </ul>
        </div>
      </header>

      <Droppable id={list.id} disabled={!!list.cards.length}>
        <ul className="px-4 py-4 h-full flex flex-col gap-4">
          <SortableContext items={cardsIds}>
            {list.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </SortableContext>
          <li>
            <ButtonAddCard boardId={boardId} listId={list.id} />
          </li>
        </ul>
      </Droppable>
    </div>
  )
}

export { List }
