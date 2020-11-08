import { Box } from '@material-ui/core'
import React from 'react'
import ChuckView from '../containers/ChuckView/ChuckView'
import useStyles from './App.styles'

const App = (): JSX.Element => {
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <ChuckView />
        </Box>
    )
}

export default App
