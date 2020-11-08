import { createStyles, makeStyles, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        logo: {
            width: theme.spacing(12.5),
            height: theme.spacing(6.25),
        },
        navbar: {
            backgroundColor: '#fff',
            height: theme.spacing(10),
        },
        navbarItems: {
            padding: theme.spacing(2),
            display: 'inline-flex',
            gridGap: theme.spacing(2),
            alignItems: 'center',
        },
        querySearch: {
            width: theme.spacing(62.5),
        },
    })
)

export default useStyles
