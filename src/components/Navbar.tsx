import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { List, ListItem, Badge } from '@material-ui/core'
import { makeStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles'

import { newMessages as newMessagesSelector } from '../redux/selectors/dialogsSelectors'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        list: {
            paddingTop: theme.spacing(4),
        },
        link: {
            marginBottom: theme.spacing(2),
            textDecoration: 'none',
            color: '#fff',
            fontSize: '1.1rem',
            letterSpacing: 1
        },
        activeLink: {
            color: 'yellow'
        }
    }),
)


const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            right: -15,
            top: 10,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }),
)(Badge)


type TProps = {}
const template = [
    {id: 1, to: '/profile', label: 'profile'},
    {id: 2, to: '/messages', label: 'messages'},
    {id: 3, to: '/music', label: 'music'},
    {id: 4, to: '/users', label: 'users'},
]
const Navbar: React.FC<TProps> = () => {
    const classes = useStyles()
    const newMessages = useSelector(newMessagesSelector)
    return (
        <nav>
            <List className={classes.list} aria-label="main-navbar">
                {
                    template.map(({to, label, id}) =>
                        <ListItem key={id}>
                            <NavLink
                                className={classes.link}
                                activeClassName={classes.activeLink}
                                to={to}
                            >
                                {
                                    label === 'messages' ?
                                        <StyledBadge badgeContent={newMessages} color="secondary" max={100} >
                                            {`${label[0].toUpperCase()}${label.slice(1)}`}
                                        </StyledBadge> :
                                        `${label[0].toUpperCase()}${label.slice(1)}`
                                }
                                
                            </NavLink>
                        </ListItem>
                    )
                }
            </List>
        </nav>
    )
};

export default Navbar;
