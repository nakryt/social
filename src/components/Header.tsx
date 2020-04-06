import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {isAuthSelector, loginSelector} from '../redux/selectors/authSelectors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& a': {
                textDecoration: 'none',
                color: '#fff'
            }
        },
        title: {
            flexGrow: 1
        }
    }),
);

type TProps = {}

const Header: React.FC<TProps> = () => {
    const classes = useStyles()
    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(loginSelector)
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Logo
                </Typography>

                {
                    isAuth ?
                        <span>{login}</span> :
                        <Button color="inherit">
                            <NavLink to='/login'>Login</NavLink>
                        </Button>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Header;
