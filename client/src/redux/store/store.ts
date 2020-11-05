import { configureStore, getDefaultMiddleware, ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { useDispatch } from 'react-redux'
import chuckReducer from '../slices/chuckSlice'

const rootReducer = combineReducers({
    chuck: chuckReducer,
})
export type RootState = ReturnType<typeof rootReducer>
export const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = (): ThunkDispatch<{}, {}, AnyAction> => useDispatch<AppDispatch>()
