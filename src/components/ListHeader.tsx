'use client'

import { useBoards } from '@/Hooks/useBoards'
import { DotsIcon } from '@/icons/Dots'
import { PlusIcon } from '@/icons/PlusIcon'
import { List, PartialWithId } from '@/types/app'
import { FormEvent, useState } from 'react'

interface ListHeader {
  list: List
}

export function ListHeader({ list }: ListHeader) {
  const { dispatcher } = useBoards()

  const [onMenu, setOnMenu] = useState(false)
  const [isChangeTitle, setIsChangeTitle] = useState(false)

  const onChangeTitle = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const { title } = Object.fromEntries(new FormData(ev.currentTarget)) as {
      title: string
    }

    if (title.length) {
      const newList: PartialWithId<List> = { id: list.id, title: title.trim() }

      dispatcher({
        type: 'update list',
        payload: { newList },
      })
    }
    setIsChangeTitle(false)
  }

  const handleOnMenu = () => {
    setOnMenu(!onMenu)
  }

  const onBlur = (ev: React.FocusEvent<HTMLInputElement, Element>) => {
    setIsChangeTitle(false)
  }

  const handleRemoveList = () => {
    dispatcher({
      type: 'remove list',
      payload: {
        listId: list.id,
      },
    })
  }

  return (
    <div className=" px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0 cursor-grabbing">
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
        <section className="list-none grid gap-2">
          <article className="hover:bg-light-gray px-2 rounded-md">
            <button aria-label="remove list" onClick={handleRemoveList}>
              Remove
            </button>
          </article>
          <article className="hover:bg-light-gray px-2 rounded-md">
            <button aria-label="sort cards by date">Sort by date</button>
          </article>
        </section>
      </div>
    </div>
  )
}
