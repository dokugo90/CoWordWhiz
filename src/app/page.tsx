"use client"
import Image from 'next/image'
import GridContainer from './components/gridContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setBoard } from './redux/boardSlice';
import Gameboard from './factorys/Game';
import Keyboard from './components/keyboard';
import GetRandomWord from './utils/randomWord';
import { RootState } from './redux/store';

export default function Home() {

  //const message = useSelector((state: RootState) => state.board.message)
  const dispatch = useDispatch();

  useEffect(() => {
    const initBoard = Gameboard().init({ rows: 5, cols: 6 })
    dispatch(setBoard(initBoard))
  })

  return (
   <>
      <main className='w-screen h-screen flex items-center justify-center flex-col gap-4'>
      <GridContainer />
      <Keyboard />
      </main>
   </>
  )
}
