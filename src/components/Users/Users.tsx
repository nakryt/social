import React, {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {setNextPage} from '../../redux/usersActions'
import {TUser} from '../../types/users'

import {CircularProgress, Grid} from '@material-ui/core' 
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles' 

import UserItem from './UserItem'

const useStyles = (makeStyles((theme: Theme) => 
        createStyles({
            root: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }
        })
    )
)

type TProps = {
    loading: boolean
    users: Array<TUser>
}

const Users:React.FC<TProps> = ({loading, users}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const mainRef = useRef<HTMLDivElement | null>(null)
    
    
    useEffect(() => {

        const scrollHandler = () => {
            if (!loading) {
                if (mainRef.current &&
                    (mainRef.current.offsetHeight > 200 &&
                        mainRef.current.offsetHeight <= Number(window.scrollY) + 550)) {
                    dispatch(setNextPage())
                }
            }
        }
        window.addEventListener('scroll', scrollHandler)
        return () => {window.removeEventListener('scroll', scrollHandler)}
    }, [dispatch, loading])
    return (
        <div ref={mainRef} className={classes.root}>
            {
                loading ? 
                    <CircularProgress size={120} /> :
                    <Grid container>                        
                        {
                            users && users.map(({name, status, photos: {small}, uniqueUrlName, id, followed}) => {
                                return (
                                    <Grid item xs={12} sm={12} md={6} key={id}> 
                                        <UserItem
                                            userId={id}
                                            name={name}
                                            status={status}
                                            avatar={small}
                                            uniqueUrlName={uniqueUrlName}
                                            followed={followed}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
            }
            
        </div>
    )
}

export default Users