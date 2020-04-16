import dialogsAPI from '../api/dialogsAPI'
import {ThunkAction} from 'redux-thunk'
import {TStore} from './store'
import {PropsType} from '../types/app'
import {TDialogs, TMessages, TMessage} from '../types/dialogs'

export const SET_DIALOGS = 'DIALOGS/SET_DIALOGS'
export const SET_ACTIVE_DIALOG = 'DIALOGS/SET_ACTIVE_DIALOG'
export const SET_MESSAGES = 'DIALOGS/SET_MESSAGES'
export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'


const actions = {
    setDialogs: (data: TDialogs = []) => ({type: SET_DIALOGS, payload: data} as const),
    setActiveDialog: (id:number) => ({ type: SET_ACTIVE_DIALOG, payload: id } as const),
    setMessages: (userId: number, messages: TMessages = []) => ({ type: SET_MESSAGES, payload: {userId, messages}} as const),
    sendMessageAC: (message:TMessage) => ({ type: SEND_MESSAGE, payload: message } as const)
}

export type TDialogsActions = ReturnType<PropsType<typeof actions>>
type TThunkResult<R> = ThunkAction<R, TStore, null, TDialogsActions>

export const getDialogs = (): TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const responce = await dialogsAPI.getAllDialogs()
        dispatch(actions.setDialogs(responce))

    } catch (e) {
        console.log(e.message)
    }
}
export const getMessages = (userId: number):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const responce = await dialogsAPI.getMessages(userId)
        dispatch(actions.setMessages(userId, responce))
    } catch (e) {

    }
}
export const sendMessage = (userId: number, text: string):TThunkResult<Promise<void>> => async (dispatch) => {
    try {
        const response = await dialogsAPI.sendMessage(userId, text)
        debugger
        return response
    } catch (e) {

    }
}
export default actions