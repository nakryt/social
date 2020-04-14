import {ThunkAction} from 'redux-thunk'
import {TUser} from '../types/users'
import {TStore} from './store'
import usersAPI from '../api/usersAPI'
import {ResultCode} from '../types/resultCodes'

export const LOADING_DATA = 'USERS/LOADING_DATA'
export const SET_USERS = 'USERS/SET_USERS'
export const SET_PAGE_NUMBER = 'USERS/SET_PAGE_NUMBER'
export const SET_PAGE_SIZE = 'USERS/SET_PAGE_SIZE'
export const SET_TOTAL_COUNT = 'USERS/SET_TOTAL_COUNT'
export const SET_ERROR = 'USERS/SET_ERROR'
export const SET_IS_FOLLOW = 'USER/SET_IS_FOLLOW'
export const SET_FOLLOWING_IN_PROGRESS = 'USER/SET_FOLLOWING_IN_PROGRESS'

type TLoadingData = {
    type: typeof LOADING_DATA
    payload: boolean
}
type TSetUsers = {
    type: typeof SET_USERS
    payload: Array<TUser>
}
type TSetPageNumber = {
    type: typeof SET_PAGE_NUMBER
    payload: number
}
type TSetPageSize = {
    type: typeof SET_PAGE_SIZE
    payload: number
}
type TSetTotalCount = {
    type: typeof SET_TOTAL_COUNT
    payload: number
}
type TSetError = {
    type: typeof SET_ERROR
    payload: Array<string>
}
type TSetIsFollow = {
    type: typeof SET_IS_FOLLOW
    payload: {
        userId: number
        value: boolean
    }
}
type TSetFollowingInProgress = {
    type: typeof SET_FOLLOWING_IN_PROGRESS
    payload: {
        userId: number
        type: 'start' | 'end'
    }
}
export type TUsersActions = TLoadingData | TSetUsers | TSetPageNumber |
    TSetPageSize | TSetTotalCount | TSetError | TSetIsFollow | TSetFollowingInProgress
type TThunkResult<R> = ThunkAction<R, TStore, null, TUsersActions>

export const setLoading = (value: boolean) :TLoadingData => ({type: LOADING_DATA, payload: value}) 
export const setUsersItems = (value: Array<TUser>) :TSetUsers => ({type: SET_USERS, payload: value}) 
export const setPageNumber = (value: number) :TSetPageNumber => ({type: SET_PAGE_NUMBER, payload: value})
export const setPageSize = (value: number) :TSetPageSize => ({type: SET_PAGE_SIZE, payload: value})
export const setTotalCount = (value: number): TSetTotalCount => ({type: SET_TOTAL_COUNT, payload: value})
export const setError = (value: Array<string>): TSetError => ({type: SET_ERROR, payload: value})
export const setIsFollow = (userId: number, value: boolean): TSetIsFollow => ({type: SET_IS_FOLLOW, payload: {userId, value}})

export const setNextPage = (): TThunkResult<void> => (dispatch, getState) => {
    const {pageNumber: page, pageSize} = getState().users
    dispatch(setPageNumber(page + 1))
    dispatch(getUsers(page + 1, pageSize))
} 
export const followingInProgres = (userId: number, type: 'start' | 'end'): TSetFollowingInProgress => ({
    type: SET_FOLLOWING_IN_PROGRESS, payload: { userId, type }
})

export const setFollowing = (userId: number): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const {items} = getState().users
        if (items) {
            dispatch(followingInProgres(userId, 'start'))
            if (items.find(i => i.id === userId)?.followed) {
                const response = await usersAPI.unfollow(userId)
                if (response === ResultCode.Success) {
                    dispatch(setIsFollow(userId, false))
                }
            } else {
                const response = await usersAPI.follow(userId)
                if (response === ResultCode.Success) {
                    dispatch(setIsFollow(userId, true))
                }
            }
            dispatch(followingInProgres(userId, 'end'))
        }
    } catch (e) {

    }
}

export const getUsers = (pageNumber: number, pageSize: number = 8) :TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const {loading} = getState().users
        if (!loading) {
            const res = await usersAPI.getUsers(pageSize, pageNumber)
            if (typeof res !== 'number') {
                dispatch(setUsersItems(res.items))
                dispatch(setTotalCount(res.totalCount))
                dispatch(setError(res.error))
            } 
        }
    } catch (e) {

    }
}

export const initialization = (): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    const pageSize = getState().users.pageSize    
    // dispatch(setLoading(true))
    await dispatch(getUsers(1, pageSize))
    dispatch(setLoading(false))
}