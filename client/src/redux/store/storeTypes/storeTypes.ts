import { SerializedError } from '@reduxjs/toolkit'
import * as globalTypes from '../../../common/globalTypes/globalTypes'
export type chuckState = {
    joke: { data: globalTypes.Joke | undefined; isLoading: boolean | undefined; error: SerializedError | undefined }
    categories: {
        data: string[]
        isLoading: boolean | undefined
        error: SerializedError | undefined
    }
}
