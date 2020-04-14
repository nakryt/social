import {ThunkAction} from 'redux-thunk'
import {TStore} from './store'
import authAPI from '../api/authAPI'
import {getProfile} from './profileActions'
import { ResultCode, ResultCodeForCaptcha } from '../types/resultCodes'
import {ProfileType} from '../types/profile'

export const SET_IS_AUTH = 'AUTH/SET_IS_AUTH'
export const SET_USER_DATA = 'AUTH/SET_USER_DATA'
export const SET_CAPTCHA_URL = 'AUTH/SET_CAPTCHA_URL'

type TSetIsAuth = {
    type: typeof SET_IS_AUTH
    payload: boolean
}
type TUserData = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type TSetUserData = {
    type: typeof SET_USER_DATA
    payload: TUserData
}
type TSetCaptchaUrl = {
    type: typeof SET_CAPTCHA_URL
    payload: {url: string | null}
}

export type TAuthActions = TSetIsAuth | TSetUserData | TSetCaptchaUrl
export type TThunkResult<R> = ThunkAction<R, TStore, null, TAuthActions>

export const setIsAuth = (value: boolean):TSetIsAuth => ({ type: SET_IS_AUTH, payload: value })
export const auth = ():TThunkResult<Promise<number>> => async (dispatch) => {
    try {
        const response = await authAPI.me()
        if (response.resultCode === ResultCode.Error) {
            return ResultCode.Error
        } else {
            const {data: {id, email, login}} = response
            dispatch(setUserData(id, email, login, true))
            dispatch(getProfile(id, ProfileType.Owner))
            return ResultCode.Success
        }
    } catch (e) {
        return ResultCode.Error
    }
}
export const setUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean):TSetUserData =>
    ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth} })
export const login = (email: string, password: string, rememberMe: boolean = false, captcha: null | string = null):TThunkResult<Promise<number | string>> =>
    async (dispatch, getState) => {
        try {
            const { auth: {captchaUrl} } = getState()
            const response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.resultCode === ResultCode.Success) {
                await dispatch(auth())
                captchaUrl && dispatch(setCaptchaUrlAC(null))
                return ResultCode.Success
            } else if (response.resultCode === ResultCodeForCaptcha.Captcha) {
                await dispatch(setCaptchaUrl())
            }
            return response.messages[0]

        } catch (e) {
            return ResultCode.Error
        }
    }
export const logout = ():TThunkResult<Promise<number>> => async (dispatch) => {
    try {
        const response = await authAPI.logout()
        if (response.resultCode === ResultCode.Success) {
            dispatch(setUserData(null, null, null, false))
            return ResultCode.Success
        }
        return ResultCode.Error
    } catch (e) {
        return ResultCode.Error
    }
}
export const setCaptchaUrlAC = (url: string | null):TSetCaptchaUrl => ({ type: SET_CAPTCHA_URL, payload: {url} })
export const setCaptchaUrl = ():TThunkResult<Promise<void>> => async (dispatch) => {
    const res = await authAPI.getCaptcha()
    dispatch(setCaptchaUrlAC(res.data.url))
}
