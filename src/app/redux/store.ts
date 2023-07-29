import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./boardSlice";
import eventSlice from "./eventSlice";
import gameSlice from "./gameSlice";


const store = configureStore({
    reducer: {
        board: boardSlice,
        events: eventSlice,
        game: gameSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;