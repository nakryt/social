import React from 'react'
import {ListItem} from '@material-ui/core'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            cursor: 'pointer'
        },
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
    id: number
    name: string
    onClick: () => void
}

const DialogItem: React.FC<TProps> = ({id, name, onClick}) => {
    const classes = useStyles()
    return (
        <ListItem onClick={onClick} className={classes.root} >
            {name}
        </ListItem>
    )
};

export default DialogItem;
