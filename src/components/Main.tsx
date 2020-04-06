import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import { Route, Redirect, Switch } from 'react-router-dom';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';
import Login from './Login';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexGrow: 1,
        }
    }),
)

type TProps = {}

const Main: React.FC<TProps> = () => {
    const classes = useStyles()
    return (
        <>
            <Switch>
                <Route path='/profile/:id?' component={Profile} />
                <Route path='/messages/:id?' component={Dialogs} />
                <Route path='/login' component={Login} />
                <Redirect to='/' />
            </Switch>
        </>
    )
};

export default Main;
