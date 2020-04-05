import {TStore} from '../store'
import {TProfileState} from '../profileReducer'
import {createSelector} from 'reselect'

export const profile = (state:TStore):TProfileState => state.profile
export const postsSelector = createSelector(profile, p => p.posts)
