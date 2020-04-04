import React from 'react'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {TMessages} from '../../../redux/dialogsReducer'
import { List } from '@material-ui/core';
import MessageItem from './MessageItem'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    }),
)


type TProps = {
    messages: TMessages
}

const Messages: React.FC<TProps> = ({ messages }) => {
    const classes = useStyles()
    messages = messages.slice().sort((a, b) => +b.id - +a.id)
    return (
        <List className={classes.root}>
            {
                messages.map(({id, text, type}) => <MessageItem key={id} text={text} type={type} />)
            }
        </List>
    )
};

export default Messages;
