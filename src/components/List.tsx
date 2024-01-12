import { Button } from './Button'

interface List {
  id: string
  name: string
}

function List({ id, name }: List) {
  return (
    <div className="border rounded-3xl  border-gray-600 w-full max-w-sm min-h-48">
      <header className="px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0  ">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-light-white rounded-full"></div>
          <h2 className="text-lg font-bold">{name}</h2>
        </div>
        <div className="flex gap-4">
          <Button>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            </svg>
          </Button>
          <Button>
            <svg
              className="rounded-full bg-cyan-900 bg-opacity-75 text-sky-400"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </Button>
        </div>
      </header>
      <div className="px-4 py-4"></div>
    </div>
  )
}

export { List }
