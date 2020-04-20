import dialogsAPI from '../api/dialogsAPI'
import { ThunkAction } from 'redux-thunk'
import formatText from '../utils/formatText'
import { TStore } from './store'
import { ActionTypes } from '../types/app'
import { TDialogs, TMessages, TMessage } from '../types/dialogs'
import { ResultCode } from '../types/resultCodes'

export const SET_DIALOGS = 'DIALOGS/SET_DIALOGS'
export const SET_ACTIVE_DIALOG = 'DIALOGS/SET_ACTIVE_DIALOG'
export const ADD_MESSAGE = 'DIALOGS/ADD_MESSAGE'
export const SET_MESSAGES = 'DIALOGS/SET_MESSAGES'
export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'
export const SET_NEW_MESSAGES = 'DIALOGS/SET_NEW_MESSAGES'
export const RESET_NEW_MESSAGES = 'DIALOGS/RESET_NEW_MESSAGES'

const actions = {
    setDialogs: (data: TDialogs = []) => ({type: SET_DIALOGS, payload: data} as const),
    setDialog: (id:number | null) => ({ type: SET_ACTIVE_DIALOG, payload: id } as const),
    addMessage: (userId: number, message: TMessage) => ({ type: ADD_MESSAGE, payload: { userId, message } } as const),
    setMessages: (userId: number, messages: TMessages = []) => ({ type: SET_MESSAGES, payload: {userId, messages}} as const),
    sendMessageAC: (message:TMessage) => ({ type: SEND_MESSAGE, payload: message } as const),
    setNewMessages: (count: number) => ({ type: SET_NEW_MESSAGES, payload: count } as const),
    resetNewMessages: (userId: number) => ({ type: RESET_NEW_MESSAGES, payload: userId} as const)
}

export type TDialogsActions = ActionTypes<typeof actions>
type TThunkResult<R> = ThunkAction<R, TStore, null, TDialogsActions>

export const getDialogs = (): TThunkResult<Promise<number>> => async (dispatch, getState) => {
    try {
        dispatch(actions.setDialog(null))
        const isAuth = getState().auth.isAuth
        if (isAuth) {
            const responce = await dialogsAPI.getAllDialogs()
            dispatch(actions.setDialogs(responce))
            const newMessages = responce?.reduce((acc, item) => {
                acc = acc + item.newMessagesCount
                return acc
            }, 0)
            typeof newMessages === 'number' && dispatch(actions.setNewMessages(newMessages))
            return ResultCode.Success
        }
        return ResultCode.Error
    } catch (e) {
        console.log(e.message)
        return ResultCode.Error
    }
}
export const getMessages = (userId: number):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const responce = await dialogsAPI.getMessages(userId)
        dispatch(actions.setMessages(userId, responce))
        dispatch(actions.setDialog(userId))
        dispatch(actions.resetNewMessages(userId))
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
export default actions