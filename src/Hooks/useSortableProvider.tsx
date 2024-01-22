import { UniqueIdentifier } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const useSortableProvider = <T,>(
  id: UniqueIdentifier,
  type: string,
  role: string,
  data: T
) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type,
      data,
      attributes: {
        role,
      },
    },

    // id: id,
    // data: {
    //   type,
    //   data,
    //   attributes: {
    //     role,
    //   },
    // },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    style,
  }
}
