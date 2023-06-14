import axios from 'axios'

import { API_URL } from '../config/api.config'
import { getAccessToken, removeTokenFromStorage } from '../services/auth/auth.helper'
import { AuthService } from '../services/auth/auth.service'

import { errorCatch, getContentType } from './api.helper'

const axiosOptions = {
	baseURL: API_URL,
	headers: getContentType(),
}

export const axiosWithoutAuth = axios.create(axiosOptions)

export const axiosWithAuth = axios.create(axiosOptions)

axiosWithAuth.defaults.withCredentials = true

axiosWithAuth.interceptors.request.use((config) => {
	const accessToken = getAccessToken()
	if (config && config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosWithAuth.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config
		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.refresh()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') {
					removeTokenFromStorage()
				}
			}
		}
	},
)
