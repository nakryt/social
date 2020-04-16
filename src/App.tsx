import React, {useEffect} from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'

import {Provider, useSelector, useDispatch} from 'react-redux'
import store from './redux/store'
import {initialization as initSelector} from './redux/selectors/appSelectors'
import {initialization as init} from './redux/appActions'

import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Container, Grid, CircularProgress} from '@material-ui/core'

import Header from './components/Header'
import Navbar from './components/Navbar'
import Main from './components/Main'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: '100vh'
        },
        main: {
            padding: theme.spacing(2),
            marginTop: 0,
            '& .mainContent': {
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 0,
                paddingBottom: 0,
                paddingRight: 0,
            }
        },
        navbar: {
            backgroundColor: theme.palette.primary.main,
        }
    }),
)

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const initialization = useSelector(initSelector)

    useEffect(() => {
        dispatch(init())
    }, [dispatch])

    return (
        <div className="App">
            <Router>
                {
                    initialization ? <CircularProgress size={120} /> :
                    <Container className={classes.root}>
                        <Header/>
                        <Grid container className={classes.main} spacing={4}>
                            <Grid container xs={4} sm={3} md={2} item className={classes.navbar} spacing={0}>
                                <Navbar/>
                            </Grid>
                            <Grid container xs={8} sm={9} md={10} item className={'mainContent'} spacing={0}>
                                <Main/>
                            </Grid>
                        </Grid>
                    </Container>
                }

            </Router>
        </div>
    );
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default AppContainer
