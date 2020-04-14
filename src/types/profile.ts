export type TContacts = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type TPhotos = {
    small: string | null
    large: string | null
}
export type TProfile = {
    userId: number | null
    aboutMe: string | null
    lookingForAJob: boolean | null
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: TContacts
    photos: TPhotos
}

export type TPost = {
    id: string
    text: string
    likes: number
}
export type TPosts = Array<TPost>
export enum ProfileType {
    Owner = 0,
    Other = 1
}
export type TProfileType = ProfileType.Owner | ProfileType.Other