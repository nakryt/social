import React from 'react'
import { List, Grid, CircularProgress } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'
import { TDialogs, TMessages } from '../../types/dialogs'

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

type TProps = {
    dialogs: TDialogs
    loadingMessages: boolean
    messages: TMessages
    selectedDialog: number | null
    getMessages: (id: number) => void
    sendHandler: (value: string) => ResultCode
}

const Dialogs: React.SFC<TProps> = ({ dialogs, selectedDialog, loadingMessages, messages, sendHandler, getMessages }) => {
    const classes = useStyles()
    const loadingMessagesStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <Grid container>
            <Grid item container className={classes.dialogsWrapper}>
                <Grid item sm={4}>
                    <List className={classes.dialogs}>
                        {
                            dialogs.map(({id, userName, profile, photos:{small}, newMessagesCount}) =>
                                <DialogItem
                                    key={id}
                                    name={profile && profile.fullName ? profile.fullName : userName}
                                    avatar={small}
                                    onClick={() => getMessages(id) }
                                    newMessagesCount={newMessagesCount}
                                    selected={selectedDialog === id}
                                />)
                        }
                    </List>
                </Grid>
                <Grid item sm={8}
                    className={classes.messages}
                    style={loadingMessages ? loadingMessagesStyle : undefined}
                >
                    {
                        loadingMessages ? <CircularProgress size={80} /> :
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
