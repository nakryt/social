export type TPost = {
    id: string
    text: string
}
export type TPosts = Array<TPost>

const initialState = {
    posts: [
        {id: '1', text: 'Live is beautiful'},
        {id: '2', text: 'Today we start a new life...'},
        {id: '3', text: 'This will be a great moment'},
        ] as TPosts
}

type TProfileState = typeof initialState

const profileReducer = (state = initialState, action: any): TProfileState => {
    switch (action.type) {

        default:
            return state
    }
}

export default profileReducer
