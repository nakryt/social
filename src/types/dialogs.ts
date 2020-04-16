export type TMessage = {
    addedAt: string
    body: string
    id: string
    recipientId: number
    senderId: number
    senderName: string
    translatedBody: null | string
    viewed: boolean
}

export type TMessages = Array<TMessage>
export type TDialog = {
    hasNewMessages: boolean
    id: number
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: {small: null | string, large: null | string}
    userName: string
    messages: TMessages
}
export type TDialogs = Array<TDialog>