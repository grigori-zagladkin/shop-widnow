import { createAsyncThunk } from '@reduxjs/toolkit'

import { errorCatch } from '../../api/api.helper'
import { getAuthUrl } from '../../config/api.config'
import { removeFromStorage } from '../../services/auth/auth.helper'
import { AuthService } from '../../services/auth/auth.service'

import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	getAuthUrl('registration'),
	async (data, thunkApi) => {
		try {
			return await AuthService.main('register', data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	},
)

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(getAuthUrl(`login`), async (data, thunkApi) => {
	try {
		return await AuthService.main('login', data)
	} catch (error) {
		return thunkApi.rejectWithValue(error)
	}
})

export const logout = createAsyncThunk(getAuthUrl(`logout`), async () => {
	removeFromStorage()
})

export const checkAuth = createAsyncThunk<IAuthResponse>(getAuthUrl('refresh'), async (_, thunkApi) => {
	try {
		return (await AuthService.refresh()).data
	} catch (error) {
		if (errorCatch(error) === 'jwt expired') {
			thunkApi.dispatch(logout())
		}
		return thunkApi.rejectWithValue(error)
	}
})
