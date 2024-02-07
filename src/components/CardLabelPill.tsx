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
import { COLORS } from '@/utils/constant'

interface CardLabel {
  initialBg: string
  title: string
}

export function CardLabelPill({ initialBg, title }: CardLabel) {
  const [bg, setBg] = useState(initialBg)

  const onChangeBg = (bg: string) => {
    console.log(bg)
    setBg(bg)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className={twMerge(bg, 'rounded-full px-2 py-1 text-sm')}>
          {title}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Colors</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-wrap max-w-52 gap-2 p-2">
          {Object.entries(COLORS).map(([name, bg]) => (
            <DropdownMenuItem
              onClick={() => onChangeBg(bg)}
              key={`${name}-${bg}`}
              className={twMerge(bg, 'w-8 h-8 rounded-full')}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
