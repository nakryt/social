import { ThunkAction } from 'redux-thunk';
import { TStore } from './store';
import {auth} from './authActions'
import { ResultCode } from '../api/authAPI';

export const SET_INITILIZATION = 'APP/SET_INITILIZATION'

export type TSetInitialization = {
    type: typeof SET_INITILIZATION
    payload: {
        value: boolean
    }
}

export type TAppActions = TSetInitialization

export type TThunkResult<R> = ThunkAction<R, TStore, null, TAppActions>

export const setInitialization = (value: boolean):TSetInitialization => ({ type: SET_INITILIZATION, payload: {value}})
export const initialization = ():TThunkResult<Promise<void>> => async (dispatch) => {
    const response = await dispatch(auth())
    if (response === ResultCode.Success) {
        dispatch(setInitialization(false))
    }
}
