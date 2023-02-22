import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
    name: 'userDetails',
    initialState: {
        details: {},
        coinbase: {},
        isPending: false,
        error: null
    },
    reducers:{
        getUserData(state, action){
            const data = action.payload;
            state.details = data.details;
            state.coinbase = data.coinbase;
            state.isPending = data.pending;
            state.error = null;
        }
    }
})

export const userDetailsAction = userDetails.actions;