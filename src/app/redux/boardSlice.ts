import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../types/interfaces";


const boardSlice = createSlice({
    name: "wordboard",
    initialState: {
        board: <IBoard[][]>[],
        wordsGuessed: <string[]>[],
        randomWord: "",
        guessedWord: "",
        message: "",
        currentX: 0,
        currentY: 0
    },
    reducers: {
        reset(state) {
            state.board = [];
            state.wordsGuessed = [];
            state.currentX = 0,
            state.currentY = 0;
            state.randomWord = "",
            state.message = "";
            state.guessedWord = "";
        },

        handleWordGuessed(state, action) {
            state.board[action.payload.x][action.payload.y].isCorrectPosition = action.payload.isCorrect;
            state.board[action.payload.x][action.payload.y].isInWord = action.payload.isInWord;
        },

        setMessage(state, action) {
            state.message = action.payload;
        },

        setGuessedWord(state, action) {
            state.guessedWord = action.payload;
        },

        setRandomWord(state, action) {
            state.randomWord = action.payload;
        },

        setBoard(state, action) {
            state.board = action.payload;
        },

        setWordsGuessed(state, action) {
            state.wordsGuessed.push(action.payload)
        },

        DecrementX(state) {
            state.currentX --;
        },

        IncrementX(state) {
            state.currentX ++;
        },

        IncrementY(state) {
            state.currentY ++;
        },

        setCurrentAxis(state, action) {
            state.currentX = action.payload.x;
        },

        setValues(state, action) {
            state.board[state.currentX][state.currentY].char = action.payload.char;
        },

        setHasChar(state, action) {
            state.board[action.payload.x][state.currentY].hasChar = action.payload.hasChar;
        }
    }
})

export const { reset , setHasChar, setBoard, setGuessedWord, setWordsGuessed, setCurrentAxis, setValues, handleWordGuessed, IncrementX, IncrementY, DecrementX, setRandomWord, setMessage } = boardSlice.actions;

export default boardSlice.reducer;