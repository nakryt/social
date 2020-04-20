import {TStore} from '../store'
// import {T}
import {TDialogsState} from '../dialogsReducer'
import {createSelector} from 'reselect'

export const root = (state: TStore):TDialogsState => state.dialogs
export const dialogs = createSelector(root, dialogs => dialogs.data)
export const selectedDialog = createSelector(root, dialogs => dialogs.selectedDialog)

export const dialogAvatar = createSelector(dialogs, selectedDialog, (dlg, selDlg) => 
            dlg.find(i => i.id === selDlg)?.photos.small)
export const messages = createSelector(dialogs, selectedDialog, (dlg, selDlg) => 
            dlg.find(i => i.id === selDlg)?.messages)
export const newMessages = createSelector(root, d => d.newMessages)