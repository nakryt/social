import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1
        }
    }),
);

type TProps = {}

const Header: React.FC<TProps> = () => {
    const classes = useStyles()
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Logo
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
};

export default Header;
