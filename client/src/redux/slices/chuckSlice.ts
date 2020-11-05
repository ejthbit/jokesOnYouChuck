/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { fetchJokeCategories, fetchRandomJoke } from '../actions/jokesActions'
import * as storeTypes from '../store/storeTypes/storeTypes'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const chuckInitialState: storeTypes.chuckState = {
    joke: { data: undefined, isLoading: undefined, error: undefined },
    categories: {
        data: [],
        isLoading: undefined,
        error: undefined,
    },
}
const chuckSlice = createSlice({
    name: 'chuck',
    initialState: chuckInitialState,
    reducers: {
        clearJoke: (state) => {
            state.joke.data = undefined // Action for clearing joke state.
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomJoke.pending, (state) => {
            state.joke.isLoading = true
            state.joke.error = undefined
        })
        builder.addCase(fetchRandomJoke.fulfilled, (state, action) => {
            state.joke.isLoading = false
            state.joke.data = action.payload
        })
        builder.addCase(fetchRandomJoke.rejected, (state, action) => {
            state.joke.isLoading = false
            state.joke.error = action.error
        })
        builder.addCase(fetchJokeCategories.pending, (state) => {
            state.categories.isLoading = true
            state.categories.error = undefined // Reset errors from previous call.
        })
        builder.addCase(fetchJokeCategories.fulfilled, (state, action) => {
            state.categories.isLoading = false
            state.categories.data = action.payload
        })
        builder.addCase(fetchJokeCategories.rejected, (state, action) => {
            state.categories.isLoading = false
            state.categories.error = action.error
        })
    },
})

export const { clearJoke } = chuckSlice.actions
export default chuckSlice.reducer
