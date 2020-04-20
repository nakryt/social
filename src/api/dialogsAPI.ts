import instance from './instance'
import {TDialogs, TMessage, TMessages} from '../types/dialogs'

const getAllDialogs = async () => {
    try {
        const response:TDialogs = (await instance.get(`dialogs`)).data
        return response
    } catch (e) {
        console.log(e.message)
    }
}

type TSendMessageResponse = {
    data: {message: TMessage}
    messages: Array<string>
    resultCode: number
}
const sendMessage = async (userId: number, text: string) => {
    try {
        const response:TSendMessageResponse = (await instance.post(`dialogs/${userId}/messages`, {body: text})).data
        return response
    } catch (e) {
        console.log(e.message)
    }
}
type TGetMessages = {
    error: null | string[]
    items: TMessages
    totalCount: number
}
const getMessages = async (userId: number) => {
    try {
        const response: TGetMessages = (await instance.get(`dialogs/${userId}/messages`)).data
        return response.items
    } catch (e) {
        console.log(e.message)
        return []
    }
}
export default {
    getAllDialogs,
    getMessages,
    sendMessage
}