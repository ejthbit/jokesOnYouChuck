import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: theme.spacing(9),
            backgroundColor: '#282c34',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'calc(10px + 2vmin)',
            color: '#FFF',
        },
        fadeIn: {
            height: theme.spacing(2.5),
            fontFamily: 'monospace',
            margin: '0 auto',
            letterSpacing: '0.15em',
            opacity: 1,
            animation: `$fadeInOpacity 1s 1 ease-in`,
        },
        '@keyframes fadeInOpacity': {
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
        },
        content: {
            height: theme.spacing(12.5),
            width: '80%',
            margin: theme.spacing(0.75),
            padding: theme.spacing(6.25),
            display: 'flex',
            justifyContent: 'center',
        },
    })
)

export default useStyles
