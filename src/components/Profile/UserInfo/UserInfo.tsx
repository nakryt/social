import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { userProfile, status, loadingData } from '../../../redux/selectors/profileSelectors'
import { isOwner as isOwnerSelector } from '../../../redux/selectors/authSelectors'
import { setStatus, setProfileInfo } from '../../../redux/profileActions'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Collapse, Button } from '@material-ui/core'
import { CheckCircleOutline, NotInterestedOutlined, ChevronRight, ExpandMore } from '@material-ui/icons'

import UserAvatar from './UserAvatar'
import InputWithEditC from '../../UI/InputWithEditOnClick'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            marginBottom: theme.spacing(2),
        },
        avatarWrap: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        buttonsWrap: {
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 24,
            '& button': {
                minWidth: 0,
                padding: '2px 8px',
                marginTop: theme.spacing(1)
            }
        },
        info: {
            display: 'flex',
            flexDirection: 'column',
            paddingTop: theme.spacing(2)
        },
        infoDescription: {
            display: 'flex',
            flexDirection: 'column',
        },
        status: {
            minHeight: 25,
            margin: 0,
            '& input': {
                position: 'relative',
                top: 0,
                marginTop: -4,
                marginBottom: 0
            },
            '& span': {
                top: -2
            }
        },
        name: {
            fontSize: '1.4rem',
            fontWeight: 500,
            minHeight: 30,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            '& input': {
                top: -1
            }
        },
        infoItem: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            minHeight: 25,
            margin: 0,
            marginBottom: theme.spacing(1),
            '& button': {
                minWidth: 24,
                padding: 0
            }
        },
        contactsWrap: {
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: theme.spacing(1)
        },
        contacts: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        contactItem: {
            display: 'flex',
            alignItems: 'center',
            minHeight: 25,
            paddingLeft: theme.spacing(4),
            '& input': {
                marginBottom: 0
            }
        }
    })
)

const UserInfo:React.FC = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const profile = useSelector(userProfile)
    const loading = useSelector(loadingData)
    const isOwner = useSelector(isOwnerSelector)
    const userStatus = useSelector(status)
    const [openContacts, setOpenContacts] = useState(false)
    const {fullName, aboutMe, lookingForAJobDescription, contacts} = profile
    const saveStatusHandler = (status: string) => {
        dispatch(setStatus(status))
    }
    const saveInfoHandler = (value: string, inputName: string | null) => {
        inputName && dispatch(setProfileInfo({...profile, [inputName]: value}))
    }
    const saveLookingForAJobHandler = (value: boolean) => {
        dispatch(setProfileInfo({...profile, lookingForAJob: value}))
    }
    const saveInfoContactsHandler = (value: string, inputName: string | null) => {
        inputName && dispatch(setProfileInfo({...profile, contacts: {...contacts, [inputName]: value} }))
    }
    
    return (
        <div className={classes.root}>

            <div className={classes.avatarWrap}>
                <UserAvatar />
                {
                    !isOwner &&
                        <div className={classes.buttonsWrap}>
                            <Button variant='contained' color='primary'>follow</Button>
                            <Button variant='contained' color='primary'>send message</Button>
                        </div>
                }
            </div>
            <div className={classes.info}>
                <p className={classes.status}>
                    <InputWithEditC
                        inputName={null}
                        onSave={saveStatusHandler}
                        text={userStatus ? userStatus : 'No status'}
                        canEdit={isOwner}
                    />
                </p>

                <p className={classes.name}>
                    <InputWithEditC
                        inputName={'fullName'}
                        onSave={saveInfoHandler}
                        text={fullName}
                        canEdit={isOwner}
                    />
                </p>
                <div className={classes.infoDescription}>
                    <p className={classes.infoItem}>
                        <strong>About Me:&nbsp;</strong>
                        <InputWithEditC
                            inputName={'aboutMe'}
                            onSave={saveInfoHandler}
                            text={aboutMe}
                            canEdit={isOwner}
                        />
                    </p>
                    <div className={classes.infoItem}>
                        <strong>Looking For A Job:</strong>&nbsp;
                        {
                            isOwner ?
                                <Button disableRipple disabled={loading}>
                                    {
                                        profile.lookingForAJob ?
                                            <CheckCircleOutline style={{color: 'green'}}
                                                onClick={() => saveLookingForAJobHandler(false)}
                                            /> :
                                            <NotInterestedOutlined color='error'
                                                onClick={() => saveLookingForAJobHandler(true)}
                                            />
                                    }
                                </Button> :
                                <div>
                                    {
                                        profile.lookingForAJob ?
                                            <CheckCircleOutline style={{color: 'green'}} /> :
                                            <NotInterestedOutlined color='error' />
                                    }
                                </div>
                        }
                    
                    </div>
                    <p className={classes.infoItem}>
                        <strong>Job Description:&nbsp;</strong>
                        <InputWithEditC
                            inputName={'lookingForAJobDescription'}
                            onSave={saveInfoHandler}
                            text={lookingForAJobDescription}
                            canEdit={isOwner}
                        />
                    </p>
                    
                    <div className={classes.contactsWrap}>
                        <strong className={classes.contacts}
                            onClick={() => setOpenContacts(!openContacts)}
                        >
                            {openContacts ? <ExpandMore /> : <ChevronRight />}
                            Contacts: {!openContacts && '...'}    
                        </strong>
    
                        <Collapse in={openContacts}>
                            <>
                                {
                                    Object.entries(profile.contacts).map(([title, value], index) => {
                                        return (
                                            <div key={index} className={classes.contactItem}>
                                                <strong>{title}:&nbsp;</strong>
                                                <InputWithEditC
                                                    inputName={title}
                                                    onSave={saveInfoContactsHandler}
                                                    text={value}
                                                    canEdit={isOwner}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </>  
                        </Collapse>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default UserInfo