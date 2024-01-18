import { UniqueIdentifier, WithId } from '@/types/utils'

export const genUUID = () => crypto.randomUUID()

export const getIndex = <T extends WithId>(
  items: T[],
  id: UniqueIdentifier
): number => {
  return items.findIndex((item) => item.id === id)
}
