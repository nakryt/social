import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RouteComponentProps, Redirect} from 'react-router-dom'
import {List, Grid} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'

import {root as dialogsRootSelector, dialogs as dialogsSelector, messages as messagesSelector} from '../../redux/selectors/dialogsSelectors'
import {isAuthSelector} from '../../redux/selectors/authSelectors'
import {getDialogs, getMessages, sendMessage, setActiveDialog} from '../../redux/dialogsActions'

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
            padding: theme.spacing(2),
            paddingTop: theme.spacing(4),
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
    const selectedDialogId = match.params.id

    useEffect(() => {
        // dispatch(setActiveDialog(selectedDialogId))
    }, [selectedDialogId, dispatch]);
    useEffect(() => {
        let isCancel = false
        const fetchData = async () => {
            if (!isCancel) {
                await dispatch(getDialogs())
            }
        }
        fetchData()
        return () => {isCancel = true}
    }, [getDialogs, dispatch])

    const sendHandler = (value: string) => {
        dialogsRoot.selectedDialog && dispatch(sendMessage(dialogsRoot.selectedDialog, value))
    }
    return (
        <Grid container>
            { !isAuth && <Redirect to='/' />}
            <Grid item container className={classes.dialogsWrapper}>
                <Grid item sm={4}>
                    <List className={classes.dialogs}>
                        {
                            dialogs.map(({id, userName}) =>
                                <DialogItem
                                    key={id}
                                    id={id}
                                    name={userName}
                                    onClick={() => {
                                        dispatch(getMessages(id))
                                        dispatch(setActiveDialog(id))
                                    }}
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
