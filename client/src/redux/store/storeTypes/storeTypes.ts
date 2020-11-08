import { SerializedError } from '@reduxjs/toolkit'
import * as globalTypes from '../../../common/globalTypes/globalTypes'
export type chuckState = {
    joke: {
        data: globalTypes.Joke
        isLoading: boolean
        queryJokes: globalTypes.JokeQueryRes
        error: SerializedError | undefined
    }
    categories: {
        data: string[]
        isLoading: boolean
        error: SerializedError | undefined
    }
}
