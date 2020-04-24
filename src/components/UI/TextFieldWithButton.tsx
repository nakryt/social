import React, { useState } from 'react'
import { Button, OutlinedInput, Grid } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { ResultCode } from '../../types/resultCodes'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 700
        },
        form: {
            width: '100%'
        },
        input: {
            width: '100%',
            marginBottom: theme.spacing(1)
        },
        button: {
            display: 'flex',
            justifyContent: 'flex-end',
            '& button': {
                marginRight: theme.spacing(2)
            }
        }
    }),
)

type TProps = {
    onClick: (value: string) => ResultCode
    buttonName: string
}

const TextFieldWithButton: React.FC<TProps> = ({ onClick, buttonName }) => {
    const classes = useStyles()
    const [value, setValue] = useState('')
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onClickHandler = async () => {
        if (value.length) {
            const res = await onClick(value)            
            res === ResultCode.Success && setValue('')
        }
    }
    return (
        <Grid container className={classes.root}>
            <form className={classes.form}>
                <Grid container item>
                    <OutlinedInput className={classes.input} rows={2} value={value} required multiline onChange={changeHandler} />
                </Grid>
                <Grid item className={classes.button}>
                    <Button variant='contained' color='primary' onClick={onClickHandler}>{buttonName}</Button>
                </Grid>
            </form>
        </Grid>
    )
};

export default TextFieldWithButton
