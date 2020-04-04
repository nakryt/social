import React from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {ListItem} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {setActiveDialog} from '../../../redux/dialogsActions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            marginBottom: theme.spacing(2),
            textDecoration: 'none',
            color: '#000',
            fontSize: '1.1rem',
            letterSpacing: 1
        },
        activeLink: {
            color: 'blue'
        }
    }),
)

type TProps = {
    id: string
    name: string
}

const DialogItem: React.FC<TProps> = ({id, name}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    return (
        <ListItem>
            <NavLink
                className={classes.link}
                activeClassName={classes.activeLink}
                to={`/messages/${id}`}
                onClick={() => dispatch(setActiveDialog(id))}
            >{`${name[0].toUpperCase()}${name.slice(1)}`}</NavLink>
        </ListItem>
    )
};

export default DialogItem;
