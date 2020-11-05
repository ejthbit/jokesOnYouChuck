import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchRandomJoke } from '../redux/actions/jokesActions'
import { RootState, useAppDispatch } from '../redux/store/store'
import './App.css'

const App = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const { data: jokeApiData, error: jokeError, isLoading: jokeIsLoading } = useSelector((state: RootState) => state.chuck.joke)

    useEffect(() => {
        dispatch(fetchRandomJoke())
    }, [dispatch])

    return (
        <div className="App">
            <header className="App-header">
                <Box style={{ maxHeight: 100, margin: 5, padding: 50 }}>
                    {/* Inline styling will be removed in according commit */}
                    {!jokeIsLoading ? (
                        <Typography>{!jokeError ? jokeApiData?.value : jokeError.message}</Typography>
                    ) : (
                        <CircularProgress size={20} />
                    )}
                </Box>
                <Button variant="outlined" color="primary" onClick={() => dispatch(fetchRandomJoke())}>
                    Get random joke
                </Button>
            </header>
        </div>
    )
}

export default App
