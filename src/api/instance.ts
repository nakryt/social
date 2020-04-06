import axios from 'axios'

const APIKEY = process.env.REACT_APP_APIKEY

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": APIKEY
    }
})

export default instance
