import React, {useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {DoneTwoTone, Close} from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative'
        },
        postEdit: {
            position: 'relative',
            width: 200,
            left: -10,
            font: 'inherit',
            padding: '3px 50px 3px 8px'
        },
        icons: {
            position: 'absolute',
            top: 3,
            right: 11
        }
    })
)

type TProps = {
    text: string
    editCancel: () => void
    onSave: (value: string) => void
}

const InputWithEdit: React.FC<TProps> = ({text, editCancel, onSave}) => {
    const classes = useStyles()
    const [value, setValue] = useState(text)
    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    return (
        <div className={classes.root}>
            <input className={classes.postEdit} value={value} onChange={changeHandler}/>
            <div className={classes.icons}>
                <DoneTwoTone style={{color: 'green', cursor: 'pointer'}} onClick={() => onSave(value)}/>
                <Close style={{color: 'red', cursor: 'pointer'}} onClick={editCancel} />
            </div>
        </div>
    )
};

export default InputWithEdit;
