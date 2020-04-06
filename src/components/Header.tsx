import React, {useState} from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {ExitToAppOutlined, LockOpen} from '@material-ui/icons'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import {NavLink, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {isAuthSelector, loginSelector} from '../redux/selectors/authSelectors'
import {logout} from '../redux/authActions'

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
        },
        log: {
            textTransform: 'none',
            marginRight: theme.spacing(1)
        },
        login: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.1rem'
        }
    }),
);

type TProps = {}

const Header: React.FC<TProps> = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const login = useSelector(loginSelector)
    const [isRedirect, setIsRedirect] = useState(false)
    const handleLogout = async () => {
        const res = await dispatch(logout())
        if (!res) {
            setIsRedirect(true)
        }
    }
    return (
        <AppBar position="static" className={classes.root}>
            {isRedirect && <Redirect to='/login' />}
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Logo
                </Typography>

                {
                    isAuth ?
                        <>
                            <span className={classes.log}>Hello, {login}</span>
                            <Button color="inherit" onClick={handleLogout}>
                                <ExitToAppOutlined />
                            </Button>
                        </> :
                        <Button color="inherit">
                            <NavLink to='/login' className={classes.login}>
                                <span className={classes.log}>SignIn</span>
                                <LockOpen />
                            </NavLink>
                        </Button>
                }
            </Toolbar>
        </AppBar>
    )
};

export default Header;
