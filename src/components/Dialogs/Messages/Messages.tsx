import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {TMessages} from '../../../types/dialogs'
import { List } from '@material-ui/core';
import MessageItem from './MessageItem'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    }),
)


type TProps = {
    messages?: TMessages
}

const Messages: React.FC<TProps> = ({ messages = [] }) => {
    const classes = useStyles()
    return (
        <List className={classes.root}>
            {
                messages.map(({id, body, recipientId}) => <MessageItem key={id} id={recipientId} text={body}/>)
            }
        </List>
    )
};

export default Messages;
