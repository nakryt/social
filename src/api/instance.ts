import axios from 'axios'

const APIKEY = process.env.REACT_APP_APIKEY

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "ad7e529b-b312-482f-835e-3d849d7f1d3a"
    }
})

export default instance
