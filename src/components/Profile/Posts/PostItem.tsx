import React, {useState} from 'react'
import './PostItem.css'
import {useDispatch} from 'react-redux'
import {changePost, deletePost} from '../../../redux/profileActions'
import {ListItem} from '@material-ui/core'
import {DeleteForeverTwoTone, EditTwoTone} from '@material-ui/icons'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import InputWithEdit from '../../UI/InputWithEdit'
import LikeWithBadge from "../../UI/LikeWithBadge";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        postWrapper: {
            display: 'flex',
            alignItems: 'center'
        },
        post: {
            marginRight: theme.spacing(1)
        }
    })
)

type TProps = {
    id: string
    text: string
    likes: number
}

const PostItem: React.FC<TProps> = ({ id, text, likes }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const savePostHandler = (text: string) => {
        dispatch(changePost(id, text))
        setIsEdit(false)
    }
    return (
        <ListItem className='postWrapper'>
            <div className={`${classes.postWrapper}`} >

                {
                    isEdit ?
                        <InputWithEdit
                            text={text}
                            editCancel={() => setIsEdit(false)}
                            onSave={savePostHandler}
                        />  :
                        <span>{text}</span>
                }

                <LikeWithBadge numLikes={likes}/>

                <div className='iconsWrapper'>
                    <EditTwoTone style={{marginRight: 8, color: 'blue', cursor: 'pointer'}} onClick={() => setIsEdit(true)}/>
                    <DeleteForeverTwoTone style={{color: 'red', cursor: 'pointer'}} onClick={() => dispatch(deletePost(id))}/>
                </div>
            </div>
        </ListItem>
    )
};

export default PostItem
