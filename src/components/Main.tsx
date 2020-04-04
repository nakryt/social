import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import { Route } from 'react-router-dom';
import Profile from './Profile/Profile';
import Dialogs from './Dialogs/Dialogs';

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
        <div className={classes.root}>
            <Route path='/profile/:id?' component={Profile} />
            <Route path='/messages/:id?' component={Dialogs} />
        </div>
    )
};

export default Main;
