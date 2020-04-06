import React, {useState} from 'react'
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
    FormHelperText,
    Button
} from '@material-ui/core'
import {EmailTwoTone, Visibility, VisibilityOff} from '@material-ui/icons'
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'
import {useForm, Controller} from 'react-hook-form'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {isAuthSelector} from '../redux/selectors/authSelectors'
import {login} from '../redux/authActions'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            '& .MuiFormHelperText-root': {
                position: 'absolute',
                bottom: -20,
                paddingLeft: 5,
                color: '#f00'
            }
        },
        marginBottom: {
            marginBottom: theme.spacing(3)
        },
        emailIcon: {
            padding: 12
        },
        buttonsWrap: {
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: theme.spacing(2)
        }
    })
)

type TFormData = {
    email: string
    password: string
    rememberMe: boolean
}
type TProps = {}

const Login: React.FC<TProps> = () => {
    const classes = useStyles()
    const {handleSubmit, control, reset, errors} = useForm<TFormData>()
    const [showPassword, setShowPassword] = useState(false)
    const isAuth = useSelector(isAuthSelector)
    const dispatch = useDispatch()
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    const [isLogin, setIsLogin] = useState(false)
    const onSubmit = ({email, password, rememberMe}: TFormData) => {
        if (isLogin) {
            dispatch(login(email, password, rememberMe))
            reset()
        } else {
            // console.log('SignUp:', data)
        }
    }

    return (
        <>
            {isAuth && <Redirect to='/profile'/>}
            <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.marginBottom}>
                    <InputLabel>Email</InputLabel>
                    <Controller
                        name='email'
                        defaultValue=''
                        as={<Input
                            type='text'
                            endAdornment={
                                <InputAdornment className={classes.emailIcon} position="end">
                                    <EmailTwoTone/>
                                </InputAdornment>
                            }
                        />}
                        control={control}
                        rules={{
                            required: {value: true, message: 'The field is required'},
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
                                message: 'Enter correctly email'
                            }
                        }}
                    />
                    {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
                <FormControl className={classes.marginBottom}>
                    <InputLabel>Password</InputLabel>
                    <Controller
                        name='password'
                        defaultValue=''
                        as={<Input
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />}
                        control={control}
                        rules={{
                            required: {value: true, message: 'The field is requared'},
                            minLength: {value: 6, message: 'Min length is 6 symbols'}
                        }}
                    />
                    {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
                </FormControl>
                <FormControlLabel
                    control={
                        <Controller
                            name='rememberMe'
                            control={control}
                            defaultValue={false}
                            as={
                                <Checkbox
                                    color="primary"
                                />}
                        />
                    }
                    label="Remember Me"
                />
                <div className={classes.buttonsWrap}>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={() => setIsLogin(true)}
                    >Sign In</Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        onClick={() => setIsLogin(false)}
                    >Sign Up</Button>
                </div>
            </form>
        </>
    )
};

export default Login;
