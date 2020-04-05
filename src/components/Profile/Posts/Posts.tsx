import React from 'react'
import {TPosts} from '../../../redux/profileReducer'
import {List} from '@material-ui/core'
import PostItem from './PostItem'

type TProps = {
    posts: TPosts
}

const Posts: React.FC<TProps> = ({ posts }) => {

    return (
        <List>
            { posts.map(({id, text}) => <PostItem key={id} id={id} post={text}/>) }
        </List>
    )
};

export default Posts
