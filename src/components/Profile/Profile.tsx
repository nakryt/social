import React from 'react'
import mainPicture from './main.jpg'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        imgWrapper: {
            width: '100%',
            marginBottom: theme.spacing(2)
        },
        backPicture: {
            width: '100%',
            height: 'auto'
        },
    }),
)

type TProps = {

}

const Profile: React.FC<TProps> = () => {
    const classes = useStyles()
    return (
        <div>
            <div className={classes.imgWrapper}>
                <img className={classes.backPicture} src={mainPicture} alt="back"/>
            </div>
            <h1>Profile</h1>
        </div>
    )
};

export default Profile;
