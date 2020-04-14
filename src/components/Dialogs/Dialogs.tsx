import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {RouteComponentProps, Redirect} from 'react-router-dom'
import {activeDialogsSelector} from '../../redux/selectors/dialogsSelectors'
import {isAuthSelector} from '../../redux/selectors/authSelectors'
import {sendMessage, setActiveDialog} from '../../redux/dialogsActions'
import {List, Grid} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
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
    const activeDialogs = useSelector(activeDialogsSelector)
    const selectedDialogId = match.params.id

    const activeMessages = activeDialogs.find(i => i.id === selectedDialogId)
    const messages = (activeMessages && activeMessages.messages) || []

    useEffect(() => {
        dispatch(setActiveDialog(selectedDialogId))
    }, [selectedDialogId, dispatch]);

    const sendHandler = (value: string) => {
        dispatch(sendMessage(value))
    }
    return (
        <Grid container>
            { !isAuth && <Redirect to='/' />}
            <Grid item container className={classes.dialogsWrapper}>
                <Grid item sm={4}>
                    <List className={classes.dialogs}>
                        {
                            activeDialogs.map(({id, name}) => <DialogItem key={id} id={id} name={name}/>)
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
