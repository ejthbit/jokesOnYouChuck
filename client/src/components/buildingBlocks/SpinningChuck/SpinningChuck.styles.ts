import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imgSpin: {
            width: theme.spacing(25),
            height: theme.spacing(25),
            pointerEvents: 'none',
            animation: `$img-spin infinite 10s linear`,
        },
        '@keyframes img-spin': {
            from: {
                transform: 'rotateY(0deg)',
            },
            to: {
                transform: 'rotateY(350deg)',
            },
        },
    })
)

export default useStyles
