import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex',
            gridGap: theme.spacing(1.25),
            alignItems: 'center',
        },
        selectLabel: {
            fontSize: theme.spacing(2),
        },
        select: {
            width: theme.spacing(30),
        },
        btn: {
            height: theme.spacing(7),
            color: '#FFF',
            backgroundColor: '#000',
            outlineColor: '#000',
            '&:hover': {
                outlineColor: '#000',
                color: '#000',
                backgroundColor: 'transparent',
                borderColor: '#000',
            },
        },
    })
)

export default useStyles
