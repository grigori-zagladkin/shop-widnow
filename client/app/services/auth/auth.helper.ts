import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '../../store/user/user.interface'

export const getAccessToken = () => Cookies.get('accessToken')

export const getRefreshToken = () => Cookies.get('refreshToken')

export const getUserFromStorage = () => JSON.parse(localStorage.getItem('user') || '{}')

export const saveTokenStorage = ({ accessToken, refreshToken }: ITokens) => {
	Cookies.set('accessToken', accessToken, {
		expires: 10000000000,
	})
	Cookies.set('refreshToken', refreshToken)
}

export const removeTokenFromStorage = () => {
	Cookies.remove('refreshToken')
}

export const removeFromStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
	localStorage.removeItem('user')
}

export const saveToStorage = ({ accessToken, refreshToken, user }: IAuthResponse) => {
	saveTokenStorage({ accessToken, refreshToken })
	localStorage.setItem('user', JSON.stringify(user))
}
