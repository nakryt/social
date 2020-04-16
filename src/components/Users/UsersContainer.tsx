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
        let isCancel = false
        const fetchData = async () => {
            if (!isCancel && !usersItems) {
                await dispatch(initialization())
            }
            setLoading(false)
        }
        fetchData()
        usersItems && setUsers(usersItems)
        return () => {isCancel = true}
    }, [usersItems, dispatch])
    
    
    return (
        <Users loading={loading} users={users} />
    )
}

export default UsersContainer