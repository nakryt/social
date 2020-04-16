import axios from 'axios'

// const APIKEY = process.env.REACT_APP_APIKEY
const APIKEY = '899faf1e-8103-4326-83eb-26b0efce15f9'
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": APIKEY
    }
})

export default instance
