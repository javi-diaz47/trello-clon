'use client'
import { BoardContextProvider } from '@/Context/BoardContext'
import React from 'react'
import Board from './Board'

export default function BoardWrapper() {
  return (
    <BoardContextProvider id={'Board-1'}>
      <Board />
    </BoardContextProvider>
  )
}
