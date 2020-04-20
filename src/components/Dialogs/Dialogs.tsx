import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RouteComponentProps, Redirect } from 'react-router-dom'

import { List, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'
import {
    root as dialogsRootSelector,
    dialogs as dialogsSelector,
    messages as messagesSelector,
} from '../../redux/selectors/dialogsSelectors'
import { isAuthSelector } from '../../redux/selectors/authSelectors'
import { getDialogs, getMessages, sendMessage } from '../../redux/dialogsActions'

import DialogItem from './DialogItem/DialogItem'
import Messages from './Messages/Messages'
import TextFieldWithButton from '../UI/TextFieldWithButton'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogsWrapper: {
            marginBottom: theme.spacing(2)
        },
        dialogs: {
            flexDirection: 'column',
            padding: 0,
            margin: 0,
            '& li': {
                margin: 0,
                padding: 0
            },
        },
        messages: {
            height: '62vh',
            overflow: 'auto',
        },
        input: {
            justifyContent: 'flex-end'
        }
    }),
)

type TProps = {}

const Dialogs: React.SFC<TProps & RouteComponentProps<{ id: string }>> = ({match}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const dialogs = useSelector(dialogsSelector)
    const dialogsRoot = useSelector(dialogsRootSelector)
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

    const sendHandler = async (value: string) => {
        if (dialogsRoot.selectedDialog) {
            await dispatch(sendMessage(dialogsRoot.selectedDialog, value))
            return ResultCode.Success
        }
        return ResultCode.Error
    }
    return (
        <Grid container>
            { !isAuth && <Redirect to='/' />}
            <Grid item container className={classes.dialogsWrapper}>
                <Grid item sm={4}>
                    <List className={classes.dialogs}>
                        {
                            dialogs.map(({id, userName, photos:{small}, newMessagesCount}) =>
                                <DialogItem
                                    key={id}
                                    name={userName}
                                    avatar={small}
                                    onClick={() => {
                                        dispatch(getMessages(id))
                                    }}
                                    newMessagesCount={newMessagesCount}
                                    selected={dialogsRoot.selectedDialog === id}
                                />)
                        }
                    </List>
                </Grid>
                <Grid item sm={8} className={classes.messages}>
                    {
                        <Messages messages={messages}/>
                    }
                </Grid>
            </Grid>
            <Grid item container className={classes.input}>
                <TextFieldWithButton onClick={sendHandler} buttonName='send' />
            </Grid>
        </Grid>
    )
};

export default Dialogs;
