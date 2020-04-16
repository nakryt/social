import instance from './instance'
import {TDialogs, TMessages} from '../types/dialogs'

const getAllDialogs = async () => {
    try {
        const response:TDialogs = (await instance.get(`dialogs`)).data
        return response
    } catch (e) {
        console.log(e.message)
    }
}

// const getDialog = async (userId: number) => {
//     try {
//         const response = (await instance.get(`dialogs/${userId}`))
//         debugger 
//         return response
//     } catch (e) {

// //     }
// // }

// enum Method {
//     post = 'post',
//     get = 'get',
//     delete = 'delete',
//     put = 'put'
// }


// const withTryCatch = async (method:Method, url: string, data: object) => {
//     try {
//         const response = await instance[method](url, data)
//         debugger
//         return response.data
//     } catch (e) {

//     }
    
// }

const sendMessage = async (userId: number, text: string) => {
    try {
        // const res = await instance.put(`dialogs/${userId}`)
        const response = (await instance.post(`dialogs/${userId}/messages`, {body: text}))
        debugger
        return response.data
    } catch (e) {
        debugger
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