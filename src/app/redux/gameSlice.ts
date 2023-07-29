import { createSlice } from "@reduxjs/toolkit";


const gameSlice = createSlice({
    name: "game",
    initialState: {
        isGameOver: false,
        didWin: false
    },
    reducers: {
        handleGameOver(state, action) {
            return action.payload;
        },

        resetGame(state) {
            state.isGameOver = false;
            state.didWin = false;
        }
    }
})

export const { handleGameOver, resetGame } = gameSlice.actions;
export default gameSlice.reducer;