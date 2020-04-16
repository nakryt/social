import {ThunkAction} from 'redux-thunk'
import {TStore} from './store'
import {TProfile} from '../types/profile'
import profileAPI from '../api/profileAPI'
import {ResultCode} from '../types/resultCodes'
import {TProfileType, ProfileType} from '../types/profile'
import utils from '../utils/formatText'

export const ADD_POST = 'PROFILE/ADD_POST'
export const CHANGE_POST = 'PROFILE/CHANGE_POST'
export const DELETE_POST = 'PROFILE/DELETE_POST'
export const SET_PROFILE = 'PROFILE/SET_PROFILE'
export const SET_STATUS = 'PROFILE/SET_STATUS'
export const LOADING_DATA = 'PROFILE/LOAD_DATA'

export type TAddPost = {
    type: typeof ADD_POST
    payload: string
}
export type TChangePost = {
    type: typeof CHANGE_POST
    payload: {
        id: string
        text: string
    }
}
export type TDeletePost = {
    type: typeof DELETE_POST
    payload: string
}
export type TSetProfile = {
    type: typeof SET_PROFILE
    payload: {
        profile:TProfile
        typeProfile: ProfileType
    }
}
export type TSetStatus = {
    type: typeof SET_STATUS
    payload: string | null
}
export type TLoadingData = {
    type: typeof LOADING_DATA
    payload: boolean
}


export type TProfileActions = TAddPost | TChangePost | TDeletePost | TSetProfile | TSetStatus | TLoadingData
type TThunkResult<R> = ThunkAction<R, TStore, null, TProfileActions>

export const addPost = (text: string):TAddPost => ({ type: ADD_POST, payload: text })
export const changePost = (id: string, text: string):TChangePost => ({ type: CHANGE_POST, payload: {id, text} })
export const deletePost = (id: string):TDeletePost => ({ type: DELETE_POST, payload: id })

export const setProfile = (profile: TProfile, typeProfile: TProfileType = ProfileType.Other):TSetProfile =>
                        ({ type: SET_PROFILE, payload: {profile, typeProfile} })
export const getProfile = (userId: number, typeProfile: TProfileType = ProfileType.Other):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const {profile: {userProfile, ownerProfile}} = getState()
        if (userProfile.userId !== userId) {
            if (ownerProfile.userId === userId) {
                dispatch(setProfile(ownerProfile))
            } else {
                const res = await profileAPI.getProfile(userId)
                typeof res !== 'number' &&
                    dispatch(setProfile( utils.changeEmptyValues(res) as TProfile, typeProfile ))
            }
        }
    } catch (e) {

    }
}
export const setProfileInfo = (data: TProfile): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        dispatch(setLoadingData(true))
        const res = await profileAPI.setProfileInfo(data)
        if (res === ResultCode.Success) {
            dispatch(setProfile(data))
        }
        dispatch(setLoadingData(false))
    } catch (e) {

    }
}
export const setStatusToState = (status: string | null):TSetStatus => ({ type: SET_STATUS, payload: status })
export const getStatus = (userId: number):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const res = await profileAPI.getStatus(userId)
        typeof res !== 'number' && dispatch(setStatusToState(res))
        
    } catch (e) {

    }
}
export const setStatus = (status: string):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const res = await profileAPI.setStatus(status)
        if (res === ResultCode.Success) {
            dispatch(setStatusToState(status))
        }
    } catch (e) {

    }
}
export const setLoadingData = (value: boolean): TLoadingData => ({type: LOADING_DATA, payload: value})