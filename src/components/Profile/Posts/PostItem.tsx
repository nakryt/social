import React, {useState} from 'react'
import './PostItem.css'
import {useDispatch} from 'react-redux'
import {changePost, deletePost} from '../../../redux/profileActions'
import {ListItem} from '@material-ui/core'
import {FavoriteTwoTone, DeleteForeverTwoTone, EditTwoTone} from '@material-ui/icons'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import InputWithEdit from '../../UI/InputWithEdit'

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
        },
        like: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        }
    })
)

type TProps = {
    id: string
    post: string
}

const PostItem: React.FC<TProps> = ({ id, post }) => {
    const classes = useStyles()
    const dispath = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const savePostHandler = (text: string) => {
        dispath(changePost(id, text))
        setIsEdit(false)
    }
    return (
        <ListItem className='postWrapper'>
            <div className={`${classes.postWrapper}`} >

                {
                    isEdit ?
                        <InputWithEdit
                            text={post}
                            editCancel={() => setIsEdit(false)}
                            onSave={savePostHandler}
                        />  :
                        <span>{post}</span>
                }
                <span className={classes.like}>
                    <FavoriteTwoTone style={{color: 'red', cursor: 'pointer'}} />
                </span>
                <div className='iconsWrapper'>
                    <EditTwoTone style={{marginRight: 8, color: 'blue', cursor: 'pointer'}} onClick={() => setIsEdit(true)}/>
                    <DeleteForeverTwoTone style={{color: 'red', cursor: 'pointer'}} onClick={() => dispath(deletePost(id))}/>
                </div>
            </div>
        </ListItem>
    )
};

export default PostItem
