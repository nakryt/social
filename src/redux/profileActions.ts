export const ADD_POST = 'PROFILE/ADD_POST'
export const CHANGE_POST = 'PROFILE/CHANGE_POST'
export const DELETE_POST = 'PROFILE/DELETE_POST'

export type TAddPost = {
    type: typeof ADD_POST
    payload: string
}
export type TChangePost = {
    type: typeof CHANGE_POST
    payload: {
        id: string
        text: string
    }
}
export type TDeletePost = {
    type: typeof DELETE_POST
    payload: string
}
export type TProfileActions = TAddPost | TChangePost | TDeletePost

export const addPost = (text: string) => ({ type: ADD_POST, payload: text })
export const changePost = (id: string, text: string) => ({ type: CHANGE_POST, payload: {id, text} })
export const deletePost = (id: string) => ({ type: DELETE_POST, payload: id })
