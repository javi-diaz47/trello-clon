import { type Card as TCard } from '@/types/app'
import { Card, CardContent, CardHeader } from './ui/card'
import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@radix-ui/react-dialog'
import { Dialog, DialogFooter, DialogHeader } from './ui/dialog'
import { useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { useBoards } from '@/Hooks/useBoards'
import { UUID } from 'crypto'
import { EditIcon } from '@/icons/EditIcon'
import { TextIcon } from '@/icons/TextIcon'
import { HeadingIcon } from '@/icons/HeadingIcon'

interface CardProps {
  card: TCard
  listId: UUID
}

function KanbanCard({ card, listId }: CardProps) {
  const [edit, setEdit] = useState(false)

  const { dispatcher } = useBoards()

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    const newCard = Object.fromEntries(data) as Partial<TCard>

    dispatcher({
      type: 'update card',
      payload: {
        listId,
        card: {
          id: card.id,
          ...newCard,
        },
      },
    })

    console.log('ne')
    setEdit(false)
  }

  const formStyle =
    'text-lg border-0 bg-transparent focus-visible:ring-2 focus-visible:bg-background focus-visible:outline-none px-1'

  return (
    <Card className="w-full bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 ring-ring">
      <CardHeader className="grid grid-flow-col items-center justify-between py-4 space-y-0">
        <h2 className="text-xl font-bold">{card.title}</h2>
        <Dialog open={edit} onOpenChange={() => setEdit(!edit)}>
          <DialogTrigger>
            <Button variant="ghost" size="icon">
              <EditIcon />
              <span className="sr-only">Edit card</span>
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogOverlay
              className={twJoin(
                'bg-black/75 fixed inset-0 ease-in',
                edit && 'animate-in',
                !edit && 'animate-out'
              )}
            />
            <DialogContent className="sm:max-w-md max-h-96 flex w-full h-full bg-accent fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-md grid gap-2">
              {/* <DialogHeader></DialogHeader> */}
              <form className="grid gap-4" onSubmit={onSubmit}>
                <div className="grid grid-cols-[2rem_1fr] items-center gap-2">
                  <HeadingIcon />
                  <div>
                    <Label className="sr-only">Title</Label>
                    <Input
                      type="text"
                      defaultValue={card.title}
                      name="title"
                      className={formStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[2rem_1fr] items-start gap-2">
                  <TextIcon />
                  <div className="w-full grid gap-1">
                    <Label>Description</Label>
                    <Textarea
                      name="desc"
                      defaultValue={card.desc}
                      className={`${formStyle} h-32  resize-none`}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant={'ghost'}>cancel</Button>
                  </DialogClose>
                  <Button type="submit">save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </CardHeader>
      <CardContent>
        <p>{card.desc}</p>
      </CardContent>
    </Card>
  )
}

export { KanbanCard }
