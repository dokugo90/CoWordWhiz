import { useEffect } from "react";
import { DecrementX, IncrementX, IncrementY, handleWordGuessed, setCurrentAxis, setGuessedWord, setHasChar, setMessage, setValues, setWordsGuessed } from "../redux/boardSlice";
import { setCanEnter } from "../redux/eventSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { handleGameOver } from "../redux/gameSlice";


export default function HandleGame() {
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

    function handleModal() {
      const modal: any = document.getElementById("message_modal")
      modal?.showModal()
      setTimeout(() => {
        modal.close()
        dispatch(setCanEnter())
      }, 1500)
    }

    function handleGameOverModal() {
       const modal: any = document.getElementById("gameover_modal");
       modal.showModal()
    }

    async function handleKeyPress(event: KeyboardEvent) {
        if (event.key == "Backspace" && currentX > 0 && !gameover && currentY < 6) {
            dispatch(DecrementX())
            handleDelete()
            return
        }

        if (event.key == "Enter" && currentX == 5 && canEnter && !gameover && currentY < 6) {
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

        if (/^[a-zA-Z]$/.test(event.key) && currentX < 5 && currentY < 6 && !gameover) {
            // Alert the pressed letter
            dispatch(setValues({
              char: event.key
            }))
  
            
              dispatch(IncrementX())
              dispatch(setGuessedWord(currentGuessedWord += event.key))
            
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

    useEffect(() => {
    
        // Add the event listener when the component mounts
        document.addEventListener('keydown', handleKeyPress);
    
        // Remove the event listener when the component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
        
      }, [currentX, wordsGuessed, canEnter]);

      useEffect(() => {

        board.map((row, rowIndex) => {
            row.map((col, colIndex) => {
                const matchingIndices = [];
  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i] === col.char) {
      matchingIndices.push(i);
    }
  }
  
  if (matchingIndices.length > 0) {
    if (matchingIndices.includes(rowIndex)) {
      dispatch(handleWordGuessed({
        isCorrect: true,
        isInWord: true,
        x: rowIndex,
        y: colIndex
      }));
    } else {
      dispatch(handleWordGuessed({
        isCorrect: false,
        isInWord: true,
        x: rowIndex,
        y: colIndex
      }));
    }
  }
            })
          })

        wordsGuessed.map((word, index) => {
            if (word == randomWord && wordsGuessed.length <= 6) {
                dispatch(handleGameOver({
                   isGameOver: true,
                   didWin: true 
                }))
                dispatch(setMessage("You Won"))
                handleGameOverModal()
            } else if (word != randomWord && wordsGuessed.length == 6) {
                dispatch(handleGameOver({
                    isGameOver: true,
                    didWin: false 
                 }))
                 dispatch(setMessage("You Lost"))
                 handleGameOverModal()
            }
        })

        

       // alert(randomWord)


      }, [wordsGuessed, randomWord])

      return null;
}