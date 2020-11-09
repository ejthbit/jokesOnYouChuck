import { Box, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import SpinningChuck from '../buildingBlocks/SpinningChuck/SpinningChuck'
import useStyles from './ChuckContent.styles'

const ChuckContent = (): JSX.Element => {
    const { data: jokeApiData, error: jokeError, isLoading: jokeIsLoading } = useSelector((state: RootState) => state.chuck.joke)
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <SpinningChuck />
            <Box className={classes.content}>
                {!jokeIsLoading ? (
                    <Typography className={classes.fadeIn} color={!jokeError ? 'inherit' : 'error'}>
                        {!jokeError ? jokeApiData.value : 'Chuck is tired today, please try it later.'}
                    </Typography>
                ) : (
                    <CircularProgress data-testid="loadingIndicator" size={20} />
                )}
            </Box>
        </Box>
    )
}
export default ChuckContent
