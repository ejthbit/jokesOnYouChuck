/* eslint-disable camelcase */
import { createSlice } from '@reduxjs/toolkit'
import { fetchJokeCategories, fetchJokesByQuery, fetchRandomJoke } from '../actions/jokesActions'
import * as storeTypes from '../store/storeTypes/storeTypes'
import * as globalTypes from '../../common/globalTypes/globalTypes'
import _ from 'lodash'
import * as chuckSliceHelpers from '../helpers/chuckSliceHelpers'

/* RTK uses on background Immer library.
This means you can write code that "mutates" the state inside the reducer,
and Immer will safely return a correct immutably updated result. */

const chuckInitialState: storeTypes.chuckState = {
    joke: {
        data: chuckSliceHelpers.getJokeInitState(),
        queryJokes: chuckSliceHelpers.getJokeQueryInitState(),
        isLoading: false,
        error: undefined,
    },
    categories: {
        data: [],
        isLoading: false,
        error: undefined,
    },
}
const chuckSlice = createSlice({
    name: 'chuck',
    initialState: chuckInitialState,
    reducers: {
        clearJoke: (state) => {
            state.joke.data = chuckSliceHelpers.getJokeInitState() // Action for clearing joke state.
        },
        setRandomJoke: (state, action) => {
            state.joke.data = action.payload as globalTypes.Joke
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
        builder.addCase(fetchJokesByQuery.pending, (state) => {
            state.joke.isLoading = true
            state.joke.error = undefined // Reset errors from previous call.
        })
        builder.addCase(fetchJokesByQuery.fulfilled, (state, action) => {
            state.joke.isLoading = false
            state.joke.queryJokes = action.payload
            state.joke.data =
                action.payload.total > 0
                    ? (_.sample(action.payload.result) as globalTypes.Joke)
                    : chuckSliceHelpers.jokeByQueryNotFound()
        })
        builder.addCase(fetchJokesByQuery.rejected, (state, action) => {
            state.joke.isLoading = false
            state.joke.error = action.error
        })
    },
})

export const { clearJoke, setRandomJoke } = chuckSlice.actions
export default chuckSlice.reducer
