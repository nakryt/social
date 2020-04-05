import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {postsSelector} from '../../redux/selectors/profileSelectors'
import {addPost} from '../../redux/profileActions'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import mainPicture from './main.jpg'
import Posts from './Posts/Posts'
import TextFieldWithButton from '../UI/TextFieldWithButton'

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
        posts: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    })
)

type TProps = {

}

const Profile: React.FC<TProps> = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const posts = useSelector(postsSelector)
    const addPostHandler = (value: string) => {
        dispatch(addPost(value))
    }
    return (
        <div>
            <div className={classes.imgWrapper}>
                <img className={classes.backPicture} src={mainPicture} alt="back"/>
            </div>
            <h1>Profile</h1>
            <Posts posts={posts}/>
            <div className={classes.posts}>
                <TextFieldWithButton onClick={addPostHandler} buttonName='add post'/>
            </div>
        </div>
    )
};

export default Profile
