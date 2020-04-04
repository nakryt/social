import {TStore} from '../store'
import {TDialogsState} from '../dialogsReducer'
import {createSelector} from 'reselect'

export const dialogs = (state: TStore):TDialogsState => state.dialogs
export const activeDialogsSelector = createSelector(dialogs, dialogs => dialogs.activeDilogs)
export const selectedDialogSelector = createSelector(dialogs, dialogs => dialogs.selectedDialog)
