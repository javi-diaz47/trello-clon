import { twMerge } from 'tailwind-merge'
import type { Label } from '@/types/app'

interface CardLabel {
  label: Label
}

export function CardLabelPill({ label }: CardLabel) {
  return (
    <span
      className={twMerge(
        label.color,
        'flex items-center gap-2 capitalize text-primary-foreground rounded-full px-2 py-1 text-sm h-9 transition-all duration-200 ease-in-out'
      )}>
      {label.title}
    </span>
  )
}
