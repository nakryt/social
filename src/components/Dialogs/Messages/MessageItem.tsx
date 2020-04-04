import React from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {TTypeMessage} from '../../../redux/dialogsReducer'
import {Avatar, ListItem} from '@material-ui/core'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginBottom: theme.spacing(1)
        },
        textWrapper: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(1),
            border: '1px solid #ccc',
            borderRadius: 5,
        },
        text: {
            marginLeft: '0.5rem',
            marginRight: '0.5rem'
        }
    }),
)

type TProps = {
    text: string
    type: TTypeMessage
}

const MessageItem: React.FC<TProps> = ({text, type}) => {
    const classes = useStyles()
    const send = type === TTypeMessage.send
    return (
        <ListItem dense className={classes.root} style={{justifyContent: send ? 'flex-end' : 'flex-start'}}>
            <div className={classes.textWrapper}>
                <Avatar variant='circle' style={{order: send ? 1 : 0}}/>
                <span className={classes.text}>{text}</span>
            </div>
        </ListItem>
    )
}

export default MessageItem
