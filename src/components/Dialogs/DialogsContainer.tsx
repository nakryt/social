import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { CircularProgress } from '@material-ui/core'
import { ResultCode } from '../../types/resultCodes'
import {
    root as dialogsRootSelector,
    dialogs as dialogsSelector,
    loadingDialogs as loadingDialogsSelector,
    messages as messagesSelector,
    loadingMessages as loadingMessagesSelector,
} from '../../redux/selectors/dialogsSelectors'
import { isAuthSelector } from '../../redux/selectors/authSelectors'
import { getDialogs, getMessages, sendMessage } from '../../redux/dialogsActions'

import Dialogs from './Dialogs'

const DialogsContainer: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const loadingDialogs = useSelector(loadingDialogsSelector)
    const dialogs = useSelector(dialogsSelector)
    const dialogsRoot = useSelector(dialogsRootSelector)
    const loadingMessages = useSelector(loadingMessagesSelector)
    const messages = useSelector(messagesSelector)
    
    useEffect(() => {
        let isCancel = false
        const fetchData = async () => {
            if (!isCancel) {
                dispatch(getDialogs())
            }
        }
        fetchData()     
        return () => { isCancel = true }
    }, [dispatch])
    const getMessagesHandler = (id: number) => {
        dispatch(getMessages(id))
    }
    const sendHandler = (value: string) => {
        if (dialogsRoot.selectedDialog) {
            dispatch(sendMessage(dialogsRoot.selectedDialog, value))
            return ResultCode.Success
        }
        return ResultCode.Error
    }
    return (
        <>
        { !isAuth && <Redirect to='/' />}
        {
            loadingDialogs ? <CircularProgress size={120} /> :
                <Dialogs
                    dialogs={dialogs}
                    messages={messages ? messages : []}
                    loadingMessages={loadingMessages}
                    sendHandler={sendHandler}
                    getMessages={getMessagesHandler}
                    selectedDialog={dialogsRoot.selectedDialog}
                />
        }
        </>
    )
};

export default DialogsContainer;
