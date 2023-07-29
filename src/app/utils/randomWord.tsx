import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect } from "react";
import axios from "axios";
import { setRandomWord } from "../redux/boardSlice";


export default function GetRandomWord() {
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

    return null;
}