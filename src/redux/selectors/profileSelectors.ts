import {TStore} from '../store'
import {TProfileState} from '../profileReducer'
import {createSelector} from 'reselect'

export const profile = (state:TStore):TProfileState => state.profile
export const ownerProfile = createSelector(profile, p => p.ownerProfile)
export const ownerAvatar = createSelector(ownerProfile, p => p.photos.small)
export const userProfile = createSelector(profile, p => p.userProfile)
export const avatarSmall = createSelector(userProfile, p => p.photos.small)
export const avatarLarge = createSelector(userProfile, p => p.photos.large)
export const status = createSelector(profile, p => p.status)
export const postsSelector = createSelector(profile, p => p.posts)
export const loadingData = createSelector(profile, p => p.loading)
