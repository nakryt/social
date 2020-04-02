import React from 'react'
import './App.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
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
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        navbar: {
            width: 200,
            backgroundColor: theme.palette.primary.main,
            marginRight: theme.spacing(2)
        },
        mainContent: {
            width: '70%',
            flexGrow: 1
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
                    <Grid container className={classes.main}>
                        <Grid item className={classes.navbar}>
                            <Navbar/>
                        </Grid>
                        <Grid item className={classes.mainContent}>
                            <Main />
                        </Grid>
                    </Grid>
                </Container>
            </Router>
        </div>
    );
}

export default App
