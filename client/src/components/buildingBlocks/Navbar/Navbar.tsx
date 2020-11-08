import * as React from 'react'
import { AppBar, Box, createStyles, makeStyles, Toolbar, Typography } from '@material-ui/core'

type NavbarProps = {
    title?: string | JSX.Element
    children?: React.ReactNode
    logo?: string | JSX.Element
    className?: string
}

const useStyles = makeStyles(() =>
    createStyles({
        toolbar: {
            paddingRight: 0,
            paddingLeft: 0,
        },
    })
)

export const Navbar: React.FC<NavbarProps> = ({ title, children, logo, className }) => {
    const classes = useStyles()

    return (
        <React.Fragment>
            <AppBar className={className} position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Box flexGrow={1}>
                        {typeof logo === 'string' ? (
                            <Typography variant="h2" noWrap>
                                {logo}
                            </Typography>
                        ) : (
                            logo
                        )}
                    </Box>
                    {children}
                    <Box marginLeft={2}>
                        <Typography variant="h6" noWrap>
                            {typeof title === 'string' ? (
                                title
                            ) : (
                                <Box height={48} alignItems="center" display="flex">
                                    {title}
                                </Box>
                            )}
                        </Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}
