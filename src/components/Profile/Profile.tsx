import React, {useEffect} from 'react'
import {RouteComponentProps, Redirect} from 'react-router-dom'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {useSelector, useDispatch} from 'react-redux'
import {postsSelector} from '../../redux/selectors/profileSelectors'
import {addPost} from '../../redux/profileActions'
import {userIdSelector} from '../../redux/selectors/authSelectors'
import {getProfile, getStatus} from '../../redux/profileActions'
import {auth} from '../../redux/authActions'

import mainPicture from './main.jpg'
import UserInfo from './UserInfo/UserInfo/UserInfo'
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
            justifyContent: 'center'
        }
    })
)

interface MatchProps {
    id: string 
}
interface TProps extends RouteComponentProps<MatchProps> {
    
}

const Profile: React.FC<TProps> = ({match: {params}}) => {
    
    const classes = useStyles()
    const dispatch = useDispatch()
    const id = useSelector(userIdSelector)
    const userId = Number(params.id) || id 
    const posts = useSelector(postsSelector)
    const addPostHandler = (value: string) => {
        dispatch(addPost(value))
    }

    useEffect(() => {
        dispatch(auth())
        if (userId) {
            dispatch(getProfile(userId))
            dispatch(getStatus(userId))
        }

    }, [dispatch, userId])

    return (
        <div>
            {!userId && <Redirect to='/' />}
            <div className={classes.imgWrapper}>
                <img className={classes.backPicture} src={mainPicture} alt="back"/>
            </div>
            <UserInfo />
            <Posts posts={posts}/>
            <div className={classes.posts}>
                <TextFieldWithButton onClick={addPostHandler} buttonName='add post'/>
            </div>
        </div>
    )
};

export default Profile
