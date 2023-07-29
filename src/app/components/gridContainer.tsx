"use client"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import GridCell from "./gridCell";
import { useEffect, useState } from "react";
import { DecrementX, IncrementX, IncrementY, handleWordGuessed, reset, setBoard, setCurrentAxis, setGuessedWord, setHasChar, setMessage, setRandomWord, setValues, setWordsGuessed } from "../redux/boardSlice";
import axios, { AxiosError } from "axios";
import { resetCanEnter, setCanEnter } from "../redux/eventSlice";
import GetRandomWord from "../utils/randomWord";
import HandleGame from "../utils/gameFunctionality";
import { resetGame } from "../redux/gameSlice";
import Gameboard from "../factorys/Game";


export default function GridContainer() {
    const board = useSelector((state: RootState) => state.board.board);
    const currentX = useSelector((state: RootState) => state.board.currentX);
    const currentY = useSelector((state: RootState) => state.board.currentY);
    const wordsGuessed = useSelector((state: RootState) => state.board.wordsGuessed)
    let currentGuessedWord = useSelector((state: RootState) => state.board.guessedWord);
    const message = useSelector((state: RootState) => state.board.message);
    const canEnter = useSelector((state: RootState) => state.events.canEnter);
    const randomWord = useSelector((state: RootState) => state.board.randomWord)
    const dispatch = useDispatch();

    async function getRandomWord() {
      const response = await axios.get("https://random-word-api.vercel.app/api?words=1&length=5")
      dispatch(setRandomWord(response.data[0]))
      //alert(response.data)
  }

  useEffect(() => {
    getRandomWord()
  }, [])
   

    return (
      <>
      <HandleGame />
      <dialog id="message_modal" className="modal modal-bottom sm:modal-middle">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">{message}</p>
  </form>
</dialog>
<dialog id="gameover_modal" className="modal modal-bottom sm:modal-middle">
  <form method="dialog" className="modal-box">
    <h3 className="font-bold text-lg">Hello!</h3>
    <div className="bg-gray-500 p-4 flex justify-center items-center">
    <p className="">{randomWord}</p>
    </div>
    <p className="py-4">{message}</p>
    <div className="modal-action">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn bg-green-500" onClick={() => {
        dispatch(resetGame())
        dispatch(resetCanEnter())
        dispatch(reset())
        getRandomWord()
        const initBoard = Gameboard().init({ rows: 5, cols: 6 })
        dispatch(setBoard(initBoard))
      }}>New Game</button>
      <button className="btn">Close</button>
    </div>
  </form>
</dialog>
      <div className="grid grid-cols-5 gap-2 place-content-center">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-rows-1 gap-2">
            {row.map((cell, colIndex) => (
              <GridCell key={colIndex} pos={{ x: rowIndex, y: colIndex }} board={board} currentY={currentY} currentX={currentX} />
            ))}
          </div>
        ))}
      </div>
      </>
    );
  };