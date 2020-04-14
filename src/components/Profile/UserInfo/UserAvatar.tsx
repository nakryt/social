import React from 'react'
import {useSelector} from 'react-redux'
import {avatarLarge} from '../../../redux/selectors/profileSelectors'
import {Avatar} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {ReactComponent as DefaultAvatar} from '../../../assets/man.svg'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex',
            width: 160,
            height: 160,
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(2),
        }
    })
)

const UserAvatar:React.FC = () => {
    const classes = useStyles()
    const avatar = useSelector(avatarLarge)    
    
    return <Avatar src={avatar ? avatar : undefined} alt='Avatar' className={classes.root} variant='rounded'>
                <DefaultAvatar />
            </Avatar>
}

export default UserAvatar