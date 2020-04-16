import { ThunkAction } from 'redux-thunk'
import { TStore } from './store'

import { PropsType } from '../types/app'
import { ResultCode } from '../types/resultCodes'
import { ProfileType } from '../types/profile'

import {auth} from './authActions'
import {getProfile} from './profileActions'


export const SET_INITILIZATION = 'APP/SET_INITILIZATION'

export type TAppActions = ReturnType<PropsType<typeof actions>>
export type TThunkResult<R> = ThunkAction<R, TStore, null, TAppActions>

export const initialization = ():TThunkResult<Promise<void>> => async (dispatch, getState) => {
    const response = await dispatch(auth())
    if (response === ResultCode.Success) {
        const userId = getState().auth.userId
        userId && await dispatch(getProfile(userId, ProfileType.Owner))
    }
    dispatch(actions.setInitialization(false))
}

const actions = {
    setInitialization: (value: boolean) => ({ type: SET_INITILIZATION, payload: {value}} as const)
}

export default actions