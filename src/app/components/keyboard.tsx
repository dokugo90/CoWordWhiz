import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { DecrementX, IncrementX, IncrementY, setCurrentAxis, setGuessedWord, setHasChar, setMessage, setValues, setWordsGuessed } from '../redux/boardSlice';
import axios from 'axios';
import { setCanEnter } from '../redux/eventSlice';

const Keyboard = () => {
  const board = useSelector((state: RootState) => state.board.board);
  const currentX = useSelector((state: RootState) => state.board.currentX);
  const currentY = useSelector((state: RootState) => state.board.currentY);
  const wordsGuessed = useSelector((state: RootState) => state.board.wordsGuessed)
  let currentGuessedWord = useSelector((state: RootState) => state.board.guessedWord);
  const message = useSelector((state: RootState) => state.board.message);
  const canEnter = useSelector((state: RootState) => state.events.canEnter);
  const randomWord = useSelector((state: RootState) => state.board.randomWord)
  const gameover = useSelector((state: RootState) => state.game.isGameOver)
  const dispatch = useDispatch();

      const firstLine = 'qwertyuiop';
    const secondLine = 'asdfghjkl';
    const thirdLine = ["delete", "z", "x", "c", "v", "b", "n", "m", "Enter"];

    function handleModal() {
      const modal: any = document.getElementById("message_modal")
      modal?.showModal()
      setTimeout(() => {
        modal.close()
        dispatch(setCanEnter())
      }, 1500)
    }

  async function handleKeyPress(letter: string) {
      if (letter == "delete" && currentX > 0 && !gameover && currentY < 6) {
          dispatch(DecrementX())
          handleDelete()
          return
      }

      if (letter == "Enter" && currentX == 5 && canEnter && !gameover && currentY < 6) {
        dispatch(setCanEnter())
            try {
              const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuessedWord}`)
              .then((_) => {
                dispatch(setWordsGuessed(currentGuessedWord));
          dispatch(setCurrentAxis({
              x: 0
          }))
          for (let i = 0; i <= 4; i++) {
            dispatch(setHasChar({
              x: i,
              hasChar: true
            }))
          }
          dispatch(IncrementY())
          dispatch(setCanEnter())
          return dispatch(setGuessedWord(""))
              });
              
          } catch (error: any) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              if (error.response.status === 404) {
                //alert("Word not found");
               // setMessage("Word not found")
               dispatch(setMessage("Word not found"))
                handleModal()
                return
              } else {
                //setMessage("Error occurred. Please try again.")
                dispatch(setMessage("Error occurred. Please try again."))
                handleModal()
                return;
              }
            } else if (error.request) {
              // The request was made, but no response was received
             // setMessage("Network Error, please check internet connection.")
             dispatch(setMessage("Network Error, please check internet connection."))
                handleModal()
              return;
            } else {
              // Something else happened in making the request that triggered an error
              //setMessage("Error occurred. Please try again.")
              dispatch(setMessage("Error occurred. Please try again."))
                handleModal()
              //alert("Error occurred. Please try again.");
              return;
            }
          }


         
          // const words: string[] = [];
          // for (let i = 0; i <= 4; i++) {
          //     words.push(board[i][currentY].char);
          // }
          
      }

      if (/^[a-zA-Z]$/.test(letter) && currentX < 5 && currentY < 6 && !gameover) {
          // Alert the pressed letter
          dispatch(setValues({
            char: letter
          }))

          
            dispatch(IncrementX())
            dispatch(setGuessedWord(currentGuessedWord += letter))
          
        } else {
          return
        }
      // Check if the pressed key is a letter
      
    };

    function handleDelete() {
      dispatch(setValues({
          char: ""
        }))
      //  setCurrentGuessedWord((prev) => prev.substring(0, prev.length - 1))
        dispatch(setGuessedWord(currentGuessedWord.substring(0, currentGuessedWord.length - 1)))
    }

   
      






  return (
    <div className=" flex justify-center gap-2 flex-col rounded-lg">
      <div className="grid grid-cols-10 gap-1 md:gap-2">
        {firstLine.split('').map((letter, index) => (
          <button
            key={index}
            onClick={() => handleKeyPress(letter)}
            className="w-6 h-12 md:w-14 flex items-center justify-center rounded-lg bg-keyboard text-keyboard-text font-extrabold transition-all duration-150 active:bg-gray-500 hover:bg-gray-300"
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-9 gap-1 md:gap-2">
        {secondLine.split('').map((letter, index) => (
          <button
            key={index}
            onClick={() => handleKeyPress(letter)}
            className="w-8 h-12 md:w-16 flex items-center justify-center rounded-lg bg-keyboard text-keyboard-text font-extrabold transition-all duration-150 active:bg-gray-500 hover:bg-gray-300"
          >
            {letter.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-9 gap-1 md:gap-2">
        {thirdLine.map((letter, index) => (
          letter == "delete" ?
          <button
            key={index}
            onClick={() => handleKeyPress(letter)}
            className="w-8 h-12 md:w-16 flex items-center justify-center rounded-lg bg-keyboard text-keyboard-text font-extrabold transition-all duration-150 active:bg-gray-500 hover:bg-gray-300"
          >
            <svg className="feather feather-delete" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"/><line x1="18" x2="12" y1="9" y2="15"/><line x1="12" x2="18" y1="9" y2="15"/></svg>
          </button>
          : letter == "Enter" ?
          <button
            key={index}
            onClick={() => handleKeyPress(letter)}
            className="w-8 h-12 md:w-16 flex items-center justify-center rounded-lg bg-keyboard text-keyboard-text font-extrabold transition-all duration-150 active:bg-gray-500 hover:bg-gray-300"
          >
            <p className='text-[10px] md:text-sm font-extrabold'>{letter}</p>
          </button>
          : <button
          key={index}
          onClick={() => handleKeyPress(letter)}
          className="w-8 h-12 md:w-16 flex items-center justify-center rounded-lg bg-keyboard text-keyboard-text font-extrabold transition-all duration-150 active:bg-gray-500 hover:bg-gray-300"
        >
          {letter.toUpperCase()}
        </button>
        ))}
      </div>
    </div>
  );
};

export default Keyboard;
