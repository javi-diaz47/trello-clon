import { UUID } from 'crypto'

export const genUUID = (): UUID => crypto.randomUUID() as UUID
