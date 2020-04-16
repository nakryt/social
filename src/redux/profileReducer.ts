import {SET_PROFILE, SET_STATUS, ADD_POST, CHANGE_POST, TProfileActions, DELETE_POST, LOADING_DATA} from './profileActions'
import {TProfile, TPosts} from '../types/profile'
import {ProfileType} from '../types/profile'


const initialState = {
    loading: false,
    userProfile: {
        userId: null as null | number,
        aboutMe: null as null | string,
        lookingForAJob: null as null | boolean,
        lookingForAJobDescription: null as null | string,
        fullName: null as null | string,
        contacts: {
            facebook: null as null | string,
            vk: null as null | string,
            github: null as null | string,
            youtube: null as null | string,
            instagram: null as null | string,
            mainLink: null as null | string,
            twitter: null as null | string,
            website: null as null | string
        },
        photos: {
            small: null as null | string,
            large: null as null | string
        }
    } as TProfile,
    ownerProfile: {
        userId: null as null | number,
        aboutMe: null as null | string,
        lookingForAJob: null as null | boolean,
        lookingForAJobDescription: null as null | string,
        fullName: null as null | string,
        contacts: {
            facebook: null as null | string,
            vk: null as null | string,
            github: null as null | string,
            youtube: null as null | string,
            instagram: null as null | string,
            mainLink: null as null | string,
            twitter: null as null | string,
            website: null as null | string
        },
        photos: {
            small: null as null | string,
            large: null as null | string
        }
    } as TProfile,
    status: null as null | string,
    posts: [
        {id: '1', text: 'Life is beautiful', likes: 3},
        {id: '2', text: 'Today we start a new life...', likes: 7},
        {id: '3', text: 'This will be a great moment', likes: 0},
    ] as TPosts
}

export type TProfileState = typeof initialState

const profileReducer = (state = initialState, action: TProfileActions): TProfileState => {
    switch (action.type) {
        case SET_PROFILE:
            if (action.payload.typeProfile === ProfileType.Owner) {
                return { ...state, ownerProfile: action.payload.profile }
            } else {
                return { ...state, userProfile: action.payload.profile }
            }
            
        case SET_STATUS: 
            return {
                ...state,
                status: action.payload
            }
        case ADD_POST:
            const newPost = { id: Number(new Date()).toString(), text: action.payload, likes: 0 }
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
        case LOADING_DATA: 
            return {
                ...state,
                loading: action.payload
            }
        
        default:
            return state
    }
}

export default profileReducer
