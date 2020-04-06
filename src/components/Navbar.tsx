import React from 'react'
import { List, ListItem } from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        list: {
            // padding: theme.spacing(2),
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

type TProps = {}
const template = [
    {id: 1, to: '/profile', label: 'profile'},
    {id: 2, to: '/messages', label: 'messages'},
    {id: 3, to: '/news', label: 'news'},
    {id: 4, to: '/music', label: 'music'},
    {id: 5, to: '/settings', label: 'settings'},
]
const Navbar: React.FC<TProps> = () => {
    const classes = useStyles()
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
                            >{`${label[0].toUpperCase()}${label.slice(1)}`}</NavLink>
                        </ListItem>
                    )
                }
            </List>
        </nav>
    )
};

export default Navbar;
