/* eslint-disable camelcase */
import { nanoid } from '@reduxjs/toolkit'
import * as globalTypes from '../../common/globalTypes/globalTypes'

export const getJokeInitState = (): globalTypes.Joke => {
    return {
        categories: [],
        created_at: Date.now().toString(),
        icon_url: '',
        id: nanoid(),
        updated_at: Date.now().toString(),
        url: '',
        value: '',
    }
}

export const getJokeQueryInitState = (): globalTypes.JokeQueryRes => {
    return { total: -1, result: [getJokeInitState()] }
}
export const jokeByQueryNotFound = (): globalTypes.Joke => {
    return { ...getJokeInitState(), value: 'Sorry, joke for this query was not found :(' }
}
