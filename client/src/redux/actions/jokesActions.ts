import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosInstanceChuckNorris } from '../../api/apiConfig'
import * as globalTypes from '../../common/globalTypes/globalTypes'

/**
 * @desc fetches random joke by Chuck Norris
 * @param {string | undefined=} [category](optional) - string
 * @returns {object} Joke - object as globalTypes.Joke
 */
export const fetchRandomJoke = createAsyncThunk('chuck/fetchRandomJokeByCategory', async (category?: string) => {
    const URL = category ? `random?category=${category}` : `random`
    const res = await axiosInstanceChuckNorris.get(URL)
    return res.data as globalTypes.Joke
})

/**
 * @desc fetches Chuck Norris joke categories
 * @returns {string[]} array of joke categories
 */
export const fetchJokeCategories = createAsyncThunk<string[]>('chuck/fetchJokeCategories', async () => {
    const res = await axiosInstanceChuckNorris.get(`categories`)
    return res.data
})
export const fetchJokesByQuery = createAsyncThunk('chuck/fetchJokesByQuery', async (query: string) => {
    const res = await axiosInstanceChuckNorris.get(`search?query=${query}`)
    return res.data as globalTypes.JokeQueryRes
})
