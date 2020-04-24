import {
    TDialogsActions,
    SET_PROFILE,
    SET_DIALOGS,
    SET_ACTIVE_DIALOG,
    ADD_MESSAGE, SET_MESSAGES,
    SET_NEW_MESSAGES,
    RESET_NEW_MESSAGES,
    LOADING_DIALOGS,
    LOADING_MESSAGES
} from './dialogsActions'
import {TDialogs} from '../types/dialogs'

const initialState = {
    data: [] as TDialogs,
    newMessages: 0,
    selectedDialog: null as null | number,
    loadingDialogs: false,
    loadingMessages: false
}

export type TDialogsState = typeof initialState

const dialogsReducer = (state = initialState, action: TDialogsActions): TDialogsState => {
    switch (action.type) {
        case SET_DIALOGS:
            return {...state, data: action.payload}
        case SET_PROFILE:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, profile: action.payload.profile }
                    }
                    return item
                })
            }
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
        case SET_NEW_MESSAGES: 
            return {
                ...state, 
                newMessages: action.payload
            }
        case ADD_MESSAGE:
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === action.payload.userId) {
                        return {...item, messages: [...item.messages, action.payload.message]}
                    }
                    return item
                })
            }
        case RESET_NEW_MESSAGES: 
            let newMessagesCount = 0
            return {
                ...state,
                data: state.data.map(item => {
                            if (item.id === action.payload) {
                                newMessagesCount = item.newMessagesCount
                                return {...item, newMessagesCount: 0, hasNewMessages: false}
                            }
                            return item
                        }),
                newMessages: state.newMessages - newMessagesCount
                
            }
        case LOADING_DIALOGS:
            return { ...state, loadingDialogs: action.payload }
        case LOADING_MESSAGES:
            return { ...state, loadingMessages: action.payload }
        default:
            return state
    }
}

export default dialogsReducer
