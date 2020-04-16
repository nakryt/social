import {TStore} from '../store'
// import {T}
import {TDialogsState} from '../dialogsReducer'
import {createSelector} from 'reselect'

export const root = (state: TStore):TDialogsState => state.dialogs
export const dialogs = createSelector(root, dialogs => dialogs.data)
export const selectedDialog = createSelector(root, dialogs => dialogs.selectedDialog)
export const messages = createSelector(dialogs, selectedDialog, (d, selDlg) => 
            d.find(i => i.id === selDlg)?.messages)