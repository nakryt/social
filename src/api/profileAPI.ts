import instance from './instance'
import {TProfile} from '../types/profile'
import {ResultCode} from '../types/resultCodes'



const getProfile = async (userId: number): Promise<TProfile | number> => {
    try {
        return (await instance.get(`profile/${userId}`)).data        
    } catch (e) {
        return ResultCode.Error
    }
}

const getStatus = async (userId: number): Promise<string | number> => {
    try {
        return (await instance.get(`profile/status/${userId}`)).data
    } catch (e) {
        return ResultCode.Error
    }
}
type TResposeStatus = {
    resultCode: number
    messages: Array<string>
    data: object
}
const setStatus = async (status: string): Promise<number | string> => {
    try {
        const response: TResposeStatus = (await instance.put(`profile/status`, {status})).data
        if (response.resultCode === 0) {
            return ResultCode.Success
        }
        return response.messages[0]
    } catch (e) {
        return ResultCode.Error
    }
}
const setProfileInfo = async (data: TProfile): Promise<number> => {
    try {
        const response = await instance.put('profile', data)
        
        return ResultCode.Success
    } catch (e) {
        return ResultCode.Error
    }
}

export default {
    getProfile,
    getStatus,
    setStatus,
    setProfileInfo
}
