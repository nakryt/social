import React from 'react'
import { useSelector } from 'react-redux'
import formatText from '../../../utils/formatText'

import { TMessages } from '../../../types/dialogs'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { List } from '@material-ui/core'

import { userIdSelector } from '../../../redux/selectors/authSelectors'

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
    const ownerId = useSelector(userIdSelector)

    const sortMessages = messages.slice().sort((a,b) => b.addedAt > a.addedAt ? 1 : -1)
    return (
        <List className={classes.root}>
            {
                sortMessages.map(({id, body, recipientId, addedAt, viewed}, index, arr) => {
                    let newDay = true
                    
                    if (index > 0) {
                        newDay = (new Date(arr[index - 1].addedAt)).toLocaleString('en-GB', {day: '2-digit'}) > (new Date(arr[index].addedAt)).toLocaleString('en-GB', {day: '2-digit'})
                    }
                    return (
                        <MessageItem
                            key={id}
                            ownerId={ownerId as number}
                            recipientId={recipientId}
                            text={formatText.unshielding(body)}
                            addedAt={addedAt}
                            viewed={viewed}
                            newDay={newDay}
                    />)
                })
            }
        </List>
    )
};

export default Messages;
