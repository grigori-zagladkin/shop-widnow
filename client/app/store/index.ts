import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { reducer as toastrReducer } from 'react-redux-toastr'

import * as userActions from './user/user.actions'
import { userSlice } from './user/user.slice'

export const actions = {
	...userActions,
}

const rootReducer = combineReducers({
	user: userSlice.reducer,
	toastr: toastrReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
