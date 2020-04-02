import React from 'react'
import {List, Grid} from '@material-ui/core';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import DialogItem from './DialogItem/DialogItem'
import Messages from './Messages/Messages'


const template = [
    {id: 1, name: 'Sasha'},
    {id: 2, name: 'Serega'},
    {id: 3, name: 'Alena'},
    {id: 4, name: 'Vitaliy'},
    {id: 5, name: 'Sveta'},
    {id: 6, name: 'Dimuch'},
]

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            flexDirection: 'column',
            padding: theme.spacing(2),
            paddingTop: theme.spacing(4),
        }
    }),
)

type TProps = {}

const Dialogs: React.FC<TProps> = () => {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item sm={4}>
            <List className={classes.list} aria-label="main-navbar">
                {
                    template.map(({id, name}) => <DialogItem key={id} id={id} name={name}/>)
                }
            </List>
            </Grid>
            <Grid item sm={8}>
                <Messages />
            </Grid>
        </Grid>
    )
};

export default Dialogs;
