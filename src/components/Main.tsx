import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Profile from './Profile/Profile'
import Dialogs from './Dialogs/Dialogs'
import Login from './Login'
import Users from './Users/UsersContainer'

type TProps = {}

const Main: React.FC<TProps> = () => {
    return (
        <Switch>
            <Route path='/profile/:id?' component={Profile} />
            <Route path='/messages/:id?' component={Dialogs} />
            <Route path='/users' component={Users} />
            <Route path='/login' component={Login} />
            <Route path='/' exact component={Login} />
            <Redirect to='/' />
        </Switch>
    )
};

export default Main
