import { useBoards } from '@/Hooks/useBoards'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { genUUID } from '@/utils/genUUID'
import { UUID } from 'crypto'
import { COLORS } from '@/utils/constant'
import { twMerge } from 'tailwind-merge'
import type { Label as TLabel } from '@/types/app'
import { useState } from 'react'

interface CardLabel {
  listId: UUID
  cardId: UUID
  labels: UUID[] | undefined
}

export function CardAddLabel({ listId, cardId, labels }: CardLabel) {
  const { dispatcher } = useBoards()

  const [onAdd, setOnAdd] = useState(false)

  const onAddLabel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const data = new FormData(ev.currentTarget)

    const { title, color } = Object.fromEntries(data) as {
      title: string
      color: string
    }

    if (!title) return

    const id = genUUID()
    const newLabel: TLabel = { id, title, color }

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

  const [b, setB] = useState('')

  return (
    <DropdownMenu open={onAdd} onOpenChange={(open) => setOnAdd(open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          +
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 p-4">
        <form onSubmit={onAddLabel} className="grid gap-4">
          <fieldset>
            <DropdownMenuLabel>Label</DropdownMenuLabel>
            <Label className="sr-only">Title</Label>
            <Input autoFocus type="text" placeholder="New label" name="title" />
          </fieldset>
          <fieldset className="grid gap-2">
            <DropdownMenuLabel className="py-0">Colors</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-6 justify-center w-full gap-2 group/daddy">
              {Object.entries(COLORS).map(([name, bg]) => (
                <div
                  key={`${name}-${bg}`}
                  className={twMerge(
                    'w-8 h-8 rounded-full grid place-content-center',
                    b === bg && bg
                  )}>
                  <div
                    className={twMerge(
                      bg,
                      'w-5 h-5 ring-background ring-4 aspect-square rounded-full grid place-content-center'
                    )}>
                    <Label className="sr-only">{name}</Label>
                    <Input
                      type="radio"
                      key={`${name}-${bg}`}
                      name="color"
                      value={bg}
                      onClick={() => setB(bg)}
                      className="w-8 bg-transparent opacity-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
