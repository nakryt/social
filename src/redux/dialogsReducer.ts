import {TDialogsActions, SET_ACTIVE_DIALOG, SEND_MESSAGE} from './dialogsActions'

// export type TTypeMessage = 'incoming' | 'send'
export enum TTypeMessage {
    'incoming',
    'send'
}
export type TMessage = {
    id: string
    text: string
    type: TTypeMessage
}
export type TMessages = Array<TMessage>
export type TDialog = {
    id: string
    name: string
    messages: TMessages
}

const initialState = {
    activeDilogs: [
        {id: '1', name: 'Sasha', messages: [
                {id: '1', text: 'Hello there', type: TTypeMessage.incoming},
                {id: '2', text: 'Hi...', type: TTypeMessage.send},
                {id: '3', text: 'How are you?', type: TTypeMessage.incoming},
                {id: '4', text: 'Good..!', type: TTypeMessage.send},
                {id: '5', text: 'Life is wonderful!', type: TTypeMessage.send},
                {id: '6', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta dolores maxime ut. Blanditiis nihil odio odit reiciendis rem, tenetur.', type: TTypeMessage.incoming},
                {id: '7', text: 'Everithing fine?', type: TTypeMessage.incoming},
                {id: '8', text: 'Almost SUPPER... )', type: TTypeMessage.send},
                {id: '9', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur dicta dolores maxime ut. Blanditiis nihil odio odit reiciendis rem, tenetur.', type: TTypeMessage.send},
            ]
        },
        {id: '2', name: 'Serega', messages: [
            {id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', type: TTypeMessage.incoming},
            {id: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', type: TTypeMessage.send}
            ]},
        {id: '3', name: 'Alena', messages: [
            {id: '1', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', type: TTypeMessage.incoming},
            {id: '2', text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.', type: TTypeMessage.send}
            ]},
    ] as Array<TDialog>,
    selectedDialog: null as null | string
}

export type TDialogsState = typeof initialState

const dialogsReducer = (state = initialState, action: TDialogsActions): TDialogsState => {
    switch (action.type) {
        case SET_ACTIVE_DIALOG:
            return {...state, selectedDialog: action.payload}
        case SEND_MESSAGE:
            const newMessage = { id: Number(new Date()).toString(), type: TTypeMessage.send, text: action.payload }
            return { ...state, activeDilogs: state.activeDilogs.map(i => {
                    if (i.id === state.selectedDialog) {
                        return {...i, messages: [...i.messages, newMessage]}
                    }
                    return i
                })
            }

        default:
            return state
    }
}

export default dialogsReducer
