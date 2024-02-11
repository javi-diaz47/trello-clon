import { twMerge } from 'tailwind-merge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { COLORS } from '@/utils/constant'
import { useState } from 'react'
import type { Label as TLabel } from '@/types/app'

interface CardLabelMenu {
  children: React.ReactNode
  open: boolean
  onChangeOpen: (open: boolean) => void
  onCardLabel: (label: TLabel) => void
  initLabel?: TLabel
}

export function CardLabelMenu({
  children,
  onCardLabel,
  open,
  onChangeOpen,
  initLabel,
}: CardLabelMenu) {
  console.log(initLabel?.color)

  const [color, setColor] = useState(
    initLabel?.color ? initLabel.color : COLORS.slate
  )

  console.log(color)

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const data = new FormData(ev.currentTarget)

    const { title } = Object.fromEntries(data) as {
      title: string
    }

    if (!title) return

    const label: TLabel = {
      id: '0-0-0-0-0',
      title,
      color,
    }

    onCardLabel(label)

    onChangeOpen(false)
    setColor(COLORS.slate)
  }

  return (
    <DropdownMenu open={open} onOpenChange={(open) => onChangeOpen(open)}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 p-4">
        <form onSubmit={onSubmit} className="grid gap-4">
          <fieldset>
            <DropdownMenuLabel>Title</DropdownMenuLabel>
            <Label className="sr-only">Title</Label>
            <Input
              autoFocus
              type="text"
              placeholder="New label"
              name="title"
              defaultValue={initLabel?.title || ''}
            />
          </fieldset>
          <fieldset className="grid gap-2">
            <DropdownMenuLabel className="py-0">Color</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-6 justify-center w-full gap-2 group/daddy">
              {Object.entries(COLORS).map(([name, bg]) => (
                <div
                  key={`${name}-${bg}`}
                  className={twMerge(
                    'w-8 h-8 rounded-full grid place-content-center',
                    color === bg && bg
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
                      onClick={() => setColor(bg)}
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
