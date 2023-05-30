import { axiosWithoutAuth } from '../../api/api.interceptor'
import { getAuthUrl } from '../../config/api.config'
import { IAuthResponse, IEmailPassword } from '../../store/user/user.interface'

import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(type: 'login' | 'register', data: IEmailPassword) {
		const response = await axiosWithoutAuth<IAuthResponse>({
			url: getAuthUrl(`${type}`),
			method: 'POST',
			data,
		})
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response.data
	},
	async refresh() {
		const response = await axiosWithoutAuth<IAuthResponse>({
			url: getAuthUrl('refresh'),
			method: 'POST',
			withCredentials: true,
		})
		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
}
