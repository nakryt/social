import { ThunkAction } from 'redux-thunk'
import { TStore } from './store'
import { TProfile } from '../types/profile'
import profileAPI from '../api/profileAPI'
import { ResultCode } from '../types/resultCodes'
import { PropsType } from '../types/app'
import { TProfileType, ProfileType } from '../types/profile'
import utils from '../utils/formatText'

export const ADD_POST = 'PROFILE/ADD_POST'
export const CHANGE_POST = 'PROFILE/CHANGE_POST'
export const DELETE_POST = 'PROFILE/DELETE_POST'
export const SET_PROFILE = 'PROFILE/SET_PROFILE'
export const SET_STATUS = 'PROFILE/SET_STATUS'
export const LOADING_DATA = 'PROFILE/LOAD_DATA'

const actions = {
    addPost: (text: string) => ({ type: ADD_POST, payload: text } as const),
    changePost: (id: string, text: string) => ({ type: CHANGE_POST, payload: {id, text} } as const),
    deletePost: (id: string) => ({ type: DELETE_POST, payload: id } as const),
    setProfile: (profile: TProfile, typeProfile: TProfileType = ProfileType.Other) =>
                        ({ type: SET_PROFILE, payload: {profile, typeProfile} } as const),
    setStatusToState: (status: string | null) => ({ type: SET_STATUS, payload: status } as const),
    setLoadingData: (value: boolean) => ({type: LOADING_DATA, payload: value} as const)
}

export type TProfileActions = ReturnType<PropsType<typeof actions>>
type TThunkResult<R> = ThunkAction<R, TStore, null, TProfileActions>

export const getProfile = (userId: number, typeProfile: TProfileType = ProfileType.Other):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const {profile: {userProfile, ownerProfile}} = getState()
        if (userProfile.userId !== userId) {
            if (ownerProfile.userId === userId) {
                dispatch(actions.setProfile(ownerProfile))
            } else {
                const res = await profileAPI.getProfile(userId)
                typeof res !== 'number' &&
                    dispatch(actions.setProfile( utils.changeEmptyValues(res) as TProfile, typeProfile ))
            }
        }
    } catch (e) {

    }
}
export const setProfileInfo = (data: TProfile): TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        dispatch(actions.setLoadingData(true))
        const res = await profileAPI.setProfileInfo(data)
        if (res === ResultCode.Success) {
            dispatch(actions.setProfile(data))
        }
        dispatch(actions.setLoadingData(false))
    } catch (e) {

    }
}

export const getStatus = (userId: number):TThunkResult<Promise<void>> => async (dispatch, getState) => {
    try {
        const res = await profileAPI.getStatus(userId)
        typeof res !== 'number' && dispatch(actions.setStatusToState(res))        
    } catch (e) {

    }
}
export const setStatus = (status: string):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const res = await profileAPI.setStatus(status)
        if (res === ResultCode.Success) {
            dispatch(actions.setStatusToState(status))
        }
    } catch (e) {

    }
}

export default actions