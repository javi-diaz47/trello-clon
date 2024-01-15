import { useBoards } from '@/Hooks/useBoards'
import { CloseIcon } from '@/icons/CloseIcon'
import { PlusIcon } from '@/icons/PlusIcon'
import { useState } from 'react'

function ButtonAddList({ boardId }: { boardId: string }) {
  const { addList } = useBoards()

  const handleAddList = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const { listName } = Object.fromEntries(new FormData(ev.currentTarget)) as {
      listName: string
    }

    if (!listName) return

    toggleOnAdd()
    addList({ boardId, listName })
  }

  const toggleOnAdd = () => {
    setOnAddList(!onAddList)
  }

  const [onAddList, setOnAddList] = useState(false)

  return (
    <div className="w-full max-w-xs h-fit flex justify-between bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700">
      {onAddList ? (
        <form
          onSubmit={handleAddList}
          className="flex flex-col gap-2 px-4 py-2 w-full">
          <label>Name</label>
          <input
            type="text"
            name="listName"
            className="bg-dark-gray rounded-lg px-2 py-1"
            autoFocus
          />
          <div className="flex items-center gap-4">
            <button className="rounded-lg p-2 bg-cyan-900 bg-opacity-75 text-sky-400">
              Add list
            </button>
            <button onClick={toggleOnAdd} className="w-fit h-fit">
              <CloseIcon />
            </button>
          </div>
        </form>
      ) : (
        <button onClick={toggleOnAdd} className="w-full flex gap-4 px-6 py-4">
          <PlusIcon />
          Add another list
        </button>
      )}
    </div>
  )
}

export { ButtonAddList }
