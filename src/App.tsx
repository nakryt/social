import React from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Provider} from 'react-redux'
import store from './redux/store'
import {Container, Grid} from '@material-ui/core'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Main from './components/Main'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        main: {
            padding: theme.spacing(2),
            marginTop: 0,
            '& .mainContent': {
                flexGrow: 1,
                justifyContent: 'center',
                paddingTop: 0,
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
    return (
        <div className="App">
            <Router>

                <Container>

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
