import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Profile from './Profile/Profile'
import Dialogs from './Dialogs/DialogsContainer'
import Login from './Login'
import Users from './Users/UsersContainer'

const Main: React.FC = () => {
    return (
        <Switch>
            <Route path='/profile/:id?' component={Profile} />
            <Route path='/messages' component={Dialogs} />
            <Route path='/users' component={Users} />
            <Route path='/login' component={Login} />
            <Route path='/' exact component={Login} />
            <Redirect to='/' />
        </Switch>
    )
};

export default Main
