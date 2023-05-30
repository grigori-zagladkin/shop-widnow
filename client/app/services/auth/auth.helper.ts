import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '../../store/user/user.interface'

export const getAccessToken = () => Cookies.get('accessToken') || null

export const getRefreshToken = () => Cookies.get('refreshToken') || null

export const getUserFromStorage = () => JSON.parse(localStorage.getItem('user') || '{}')

export const saveTokenStorage = (data: ITokens) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}

export const removeTokenFromStorage = () => {
	Cookies.remove('accessToken')
}

export const removeFromStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
	localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokenStorage(data)
	localStorage.setItem('user', JSON.stringify(data.user))
}
