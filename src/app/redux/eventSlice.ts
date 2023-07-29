import { createSlice } from "@reduxjs/toolkit";


const eventSlice = createSlice({
    name: "handleEvents",
    initialState: {
        canEnter: true,
    },
    reducers: {
        setCanEnter(state) {
            state.canEnter ? state.canEnter = false : state.canEnter = true;
        },

        resetCanEnter(state) {
            state.canEnter = true;
        }
    }
})

export const { setCanEnter, resetCanEnter } = eventSlice.actions;

export default eventSlice.reducer;