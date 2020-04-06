export const SET_ACTIVE_DIALOG = 'DIALOGS/SET_ACTIVE_DIALOG'
export const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE'

export type TSetActiveDialog = {
    type: typeof SET_ACTIVE_DIALOG
    payload: string
}
export type TSendMessage = {
    type: typeof SEND_MESSAGE
    payload: string
}

export type TDialogsActions = TSetActiveDialog | TSendMessage

export const setActiveDialog = (id:string):TSetActiveDialog => ({ type: SET_ACTIVE_DIALOG, payload: id })
export const sendMessage = (text:string):TSendMessage => ({ type: SEND_MESSAGE, payload: text })
