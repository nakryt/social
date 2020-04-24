import dialogsAPI from '../api/dialogsAPI'
import profileAPI from '../api/profileAPI'
import { ThunkAction } from 'redux-thunk'
import formatText from '../utils/formatText'
import { TStore } from './store'
import { ActionTypes } from '../types/app'
import { TDialogs, TMessages, TMessage } from '../types/dialogs'
import { ResultCode } from '../types/resultCodes'
import { TProfile } from '../types/profile'

export const SET_DIALOGS = 'DIALOGS/SET_DIALOGS'
export const SET_PROFILE = 'DIALOGS/SET_PROFILE'
export const SET_ACTIVE_DIALOG = 'DIALOGS/SET_ACTIVE_DIALOG'
export const ADD_MESSAGE = 'DIALOGS/ADD_MESSAGE'
export const SET_MESSAGES = 'DIALOGS/SET_MESSAGES'
export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'
export const SET_NEW_MESSAGES = 'DIALOGS/SET_NEW_MESSAGES'
export const RESET_NEW_MESSAGES = 'DIALOGS/RESET_NEW_MESSAGES'
export const LOADING_DIALOGS = 'DIALOGS/LOADING_DIALOGS'
export const LOADING_MESSAGES = 'DIALOGS/LOADING_MESSAGES'

const actions = {
    setDialogs: (data: TDialogs = []) => ({type: SET_DIALOGS, payload: data} as const),
    setActiveDialog: (id:number | null) => ({ type: SET_ACTIVE_DIALOG, payload: id } as const),
    setProfile: (id:number, profile: TProfile) => ({ type: SET_PROFILE, payload: {id, profile} } as const),
    addMessage: (userId: number, message: TMessage) => ({ type: ADD_MESSAGE, payload: { userId, message } } as const),
    setMessages: (userId: number, messages: TMessages = []) => ({ type: SET_MESSAGES, payload: {userId, messages}} as const),
    sendMessageAC: (message:TMessage) => ({ type: SEND_MESSAGE, payload: message } as const),
    setNewMessages: (count: number) => ({ type: SET_NEW_MESSAGES, payload: count } as const),
    resetNewMessages: (userId: number) => ({ type: RESET_NEW_MESSAGES, payload: userId} as const),
    loadingDialogs: (loading: boolean) => ({ type: LOADING_DIALOGS, payload: loading} as const),
    loadingMessages: (loading: boolean) => ({ type: LOADING_MESSAGES, payload: loading} as const)
}

export type TDialogsActions = ActionTypes<typeof actions>
type TThunkResult<R> = ThunkAction<R, TStore, null, TDialogsActions>

export const getDialogs = (): TThunkResult<Promise<number>> => async (dispatch, getState) => {
    try {
        dispatch(actions.setActiveDialog(null))
        const isAuth = getState().auth.isAuth
        if (isAuth) {
            dispatch(actions.loadingDialogs(true))
            const responce = await dialogsAPI.getAllDialogs()
            dispatch(actions.setDialogs(responce))
            responce?.map(async (item) => {
                const res = await profileAPI.getProfile(item.id)
                if (!(res instanceof Error)) {
                    dispatch(actions.setProfile(item.id, res))
                }
            })
            const newMessages = responce?.reduce((acc, item) => {
                acc = acc + item.newMessagesCount
                return acc
            }, 0)
            typeof newMessages === 'number' && dispatch(actions.setNewMessages(newMessages))
            dispatch(actions.loadingDialogs(false))
            return ResultCode.Success
        }
        return ResultCode.Error
    } catch (e) {
        console.log(e.message)
        return ResultCode.Error
    }
}
export const getProfile = (id: number): TThunkResult<void> => async (dispatch) => {
    try {
        const res = await profileAPI.getProfile(id)
        if (!(res instanceof Error)) {
            dispatch(actions.setProfile(id, res))
        }
        
    } catch (e) {
        console.log(e.message)
    }
}
export const getMessages = (userId: number):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        dispatch(actions.loadingMessages(true))
        const responce = await dialogsAPI.getMessages(userId)
        dispatch(actions.setMessages(userId, responce))
        dispatch(actions.setActiveDialog(userId))
        dispatch(actions.resetNewMessages(userId))
        dispatch(actions.loadingMessages(false))
    } catch (e) {
        console.log(e.message)
    }
}
export const sendMessage = (userId: number, text: string):TThunkResult<Promise<number>> => async (dispatch) => {
    try {
        const response = await dialogsAPI.sendMessage(userId, formatText.shielding(text))
        if (response?.resultCode === ResultCode.Success) {
            dispatch(actions.addMessage(userId, response.data.message))
            return ResultCode.Success
        }
        return ResultCode.Error
    } catch (e) {
        console.log(e.message)
        return ResultCode.Error
    }
}
export const unmount = (): TThunkResult<void> => (dispatch) => {
    dispatch(actions.setDialogs([]))
    dispatch(actions.setActiveDialog(null))
    dispatch(actions.setNewMessages(0))
}
export default actions