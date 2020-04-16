import dialogsAPI from '../api/dialogsAPI'
import {ThunkAction} from 'redux-thunk'
import {TStore} from './store'
import {TDialogs, TMessages} from '../types/dialogs'

export const SET_DIALOGS = 'DIALOGS/SET_DIALOGS'
export const SET_ACTIVE_DIALOG = 'DIALOGS/SET_ACTIVE_DIALOG'
export const SET_MESSAGES = 'DIALOGS/SET_MESSAGES'
export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

export type TSetDialogs = {
    type: typeof SET_DIALOGS
    payload: TDialogs
}
export type TSetActiveDialog = {
    type: typeof SET_ACTIVE_DIALOG
    payload: number
}
export type TSetMessages = {
    type: typeof SET_MESSAGES
    payload: {
        userId: number
        messages: TMessages
    }
}
export type TSendMessage = {
    type: typeof SEND_MESSAGE
    payload: object
}

export type TDialogsActions = TSetDialogs | TSetActiveDialog | TSendMessage | TSetMessages

const setDialogs = (data: TDialogs = []):TSetDialogs => ({type: SET_DIALOGS, payload: data})
export const setActiveDialog = (id:number):TSetActiveDialog => ({ type: SET_ACTIVE_DIALOG, payload: id })
export const setMessages = (userId: number, messages: TMessages = []):TSetMessages => ({ type: SET_MESSAGES, payload: {userId, messages}})
export const sendMessageAC = (message:object):TSendMessage => ({ type: SEND_MESSAGE, payload: message })

type TThunkResult<R> = ThunkAction<R, TStore, null, TDialogsActions>


export const getDialogs = (): TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const responce = await dialogsAPI.getAllDialogs()
        dispatch(setDialogs(responce))

    } catch (e) {
        console.log(e.message)
    }
}
export const getMessages = (userId: number):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const responce = await dialogsAPI.getMessages(userId)
        dispatch(setMessages(userId, responce))
    } catch (e) {

    }
}
export const sendMessage = (userId: number, text: string):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const response = await dialogsAPI.sendMessage(userId, text)
        debugger
    } catch (e) {

    }
}