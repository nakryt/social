import {ADD_POST, CHANGE_POST, TProfileActions, DELETE_POST} from './profileActions'

export type TPost = {
    id: string
    text: string
}
export type TPosts = Array<TPost>

const initialState = {
    posts: [
        {id: '1', text: 'Life is beautiful'},
        {id: '2', text: 'Today we start a new life...'},
        {id: '3', text: 'This will be a great moment'},
        ] as TPosts
}

export type TProfileState = typeof initialState

const profileReducer = (state = initialState, action: TProfileActions): TProfileState => {
    switch (action.type) {
        case ADD_POST:
            const newPost = { id: Number(new Date()).toString(), text: action.payload }
            return {...state, posts: [newPost, ...state.posts]}
        case CHANGE_POST:
            return {
                ...state,
                posts: state.posts.map(item => {
                        if (item.id === action.payload.id) {
                            return {...item, text: action.payload.text}
                        }
                        return item
                    })
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(item => item.id !== action.payload)
            }
        default:
            return state
    }
}

export default profileReducer
