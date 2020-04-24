import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNextPage } from '../../redux/usersActions'
import { TUser } from '../../types/users'

import { CircularProgress, Grid } from '@material-ui/core' 
import { DoubleArrow } from '@material-ui/icons' 
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles' 

import UserItem from './UserItem'

const useStyles = (makeStyles((theme: Theme) => 
        createStyles({
            root: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            },
            loading: {
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(3),
            },
            arrow: {
                position: 'fixed',
                bottom: 60,
                left: 60,
                transform: 'rotate(-90deg)',
                cursor: 'pointer'
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
    const [showArrow, setShowArrow] = useState(false)
    
    const scrollHandler = useCallback( () => {
            if (!loading) {
                const { current } = mainRef
                if (current &&
                        current.offsetHeight <= Number(window.scrollY) + 750) {
                    dispatch(setNextPage())
                }
            }
        }, [mainRef, dispatch, loading])
    useEffect(() => {
        window.addEventListener('scroll', scrollHandler)
        return () => {window.removeEventListener('scroll', scrollHandler)}
    }, [dispatch, loading, scrollHandler])

    const scrollUpHandler = useCallback( () => {
        if (window.scrollY > 500) {
            setShowArrow(true)
        } else {
            setShowArrow(false)
        }
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', scrollUpHandler)
        return () => {
            window.removeEventListener('scroll', scrollUpHandler)
        }
    }, [scrollUpHandler])
    const scrollUpClickHandler = () => {
        window.scrollTo({top: 0})
    }

    return (
        <div ref={mainRef} className={classes.root}>
            { showArrow && <DoubleArrow
                                fontSize='large'
                                color='primary'
                                className={classes.arrow}
                                onClick={scrollUpClickHandler}
                            /> }
            {
                !users?.length ? 
                    <CircularProgress size={120} /> :
                    <Grid container>                        
                        {
                            users?.map(({name, status, photos: {small}, uniqueUrlName, id, followed}) => {
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
                        <div className={classes.loading}>
                            { loading && <CircularProgress size={50} /> }
                        </div>
                    </Grid>
            }
        </div>
    )
}

export default Users