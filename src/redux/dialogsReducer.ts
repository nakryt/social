import {TDialogsActions, SET_DIALOGS, SET_ACTIVE_DIALOG, SET_MESSAGES, SEND_MESSAGE} from './dialogsActions'
import {TDialogs} from '../types/dialogs'
// export type TTypeMessage = 'incoming' | 'send'
export enum TTypeMessage {
    recived,
    send
}


const initialState = {
    data: [] as TDialogs,
    selectedDialog: null as null | number
}

export type TDialogsState = typeof initialState

const dialogsReducer = (state = initialState, action: TDialogsActions): TDialogsState => {
    switch (action.type) {
        case SET_DIALOGS:
            return {...state, data: action.payload}
        case SET_ACTIVE_DIALOG:
            return {...state, selectedDialog: action.payload}
        case SET_MESSAGES:
            return {
                ...state,
                data: state.data.map(i => {
                    if (i.id === action.payload.userId) {
                        return {...i, messages: action.payload.messages}
                    }
                    return i
                })
            }
        case SEND_MESSAGE:
            return state
        default:
            return state
    }
}

export default dialogsReducer
