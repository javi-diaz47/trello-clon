import { List } from '@/types/app'
import { UniqueIdentifier, WithId } from '@/types/utils'

export const getIndex = <T extends WithId>(
  items: T[],
  id: UniqueIdentifier
): number => {
  return items.findIndex((item) => item.id === id)
}

export const getIndexFromCollection = (
  collection: List[],
  id: UniqueIdentifier
) => {
  return collection
    .map((list, i) => {
      const cardIndex = getIndex(list.cards, id)
      return { listIndex: i, cardIndex }
    })
    .find(({ cardIndex }) => cardIndex !== -1)
}
