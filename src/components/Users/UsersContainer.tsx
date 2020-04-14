import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {TUser} from '../../types/users'
import {usersItems as usersItemsSelector, loadingSelector} from '../../redux/selectors/usersSelectors'
import {initialization} from '../../redux/usersActions'

import Users from './Users'

const UsersContainer: React.FC = () => {
    const dispatch = useDispatch()
    const usersItems = useSelector(usersItemsSelector)
    const loadingState = useSelector(loadingSelector)
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<Array<TUser>>([])

    useEffect(() => {
        if (!usersItems) {
            dispatch(initialization())
        } 
        usersItems && setUsers(usersItems)
        setLoading(false)
    }, [usersItems, dispatch])
    
    
    return (
        <Users loading={loadingState || loading} users={users} />
    )
}

export default UsersContainer