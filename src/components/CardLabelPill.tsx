import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import { useState } from 'react'
import { COLORS, INPUT_STYLE } from '@/utils/constant'
import type { Label as TLabel } from '@/types/app'
import { useBoards } from '@/Hooks/useBoards'
import { XIcons } from '@/icons/XIcons'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface CardLabel {
  initLabel: TLabel
}

export function CardLabelPill({ initLabel }: CardLabel) {
  const { board, dispatcher } = useBoards()

  const [label, setLabel] = useState<TLabel>(initLabel)

  const onChangeBg = (newBg: string) => {
    const newLabel: TLabel = { ...label, color: newBg }

    dispatcher({
      type: 'udpate labels',
      payload: {
        newLabel: {
          ...label,
          color: newBg,
        },
      },
    })

    setLabel(newLabel)
  }

  const onChangeLabel = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newLabel: TLabel = { ...label, title: ev.currentTarget.value }
    setLabel(newLabel)
  }

  const onAddLabel = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={twMerge(
            label.color,
            'group flex items-center gap-2 capitalize text-primary-foreground rounded-full px-2 py-1 text-sm h-9 transition-all duration-200 ease-in-out'
          )}>
          {label.title}
          <Button
            size="icon"
            variant="ghost"
            className="bg-transparent hover:transparent sr-only group-hover:not-sr-only transition-all duration-200 ease-in-out">
            <XIcons />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 p-4">
        <DropdownMenuLabel>Label</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form onSubmit={onAddLabel} className="">
          <Label className="sr-only">Title</Label>
          <Input
            autoFocus
            type="text"
            placeholder="New label"
            name="title"
            value={label.title}
            onChange={onChangeLabel}
          />
        </form>

        <DropdownMenuLabel>Colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid grid-cols-6 justify-center w-full gap-2 ">
          {Object.entries(COLORS).map(([name, bg]) => (
            <DropdownMenuItem
              onClick={() => onChangeBg(bg)}
              key={`${name}-${bg}`}
              className={twMerge(bg, 'w-8 aspect-square  rounded-full')}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
