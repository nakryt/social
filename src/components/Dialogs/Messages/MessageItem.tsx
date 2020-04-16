import React from 'react'
import {useSelector} from 'react-redux'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {Avatar, ListItem} from '@material-ui/core'

import {userIdSelector} from '../../../redux/selectors/authSelectors'
import {TTypeMessage} from '../../../redux/dialogsReducer'


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
    id: number
    text: string
    type?: TTypeMessage
}

const MessageItem: React.FC<TProps> = ({text, type, id}) => {
    const classes = useStyles()
    const userId = useSelector(userIdSelector)
    const recipient = userId === id
    return (
        <ListItem dense className={classes.root} style={{justifyContent: !recipient ? 'flex-end' : 'flex-start'}}>
            <div className={classes.textWrapper}>
                <Avatar variant='circle' style={{order: !recipient ? 1 : 0}}/>
                <span className={classes.text}>{text}</span>
            </div>
        </ListItem>
    )
}

export default MessageItem
