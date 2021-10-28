import { createSlice } from '@reduxjs/toolkit'
import env from 'react-dotenv'

import useApi from '../../hooks'

export const { api, loginUser, getUser, spin, registerUser } = useApi('userSlice', env.LOCAL_URL)

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		status: 'idle',
		response: undefined,
		user: undefined,
	},
	reducers: {
		logout(state) {
			state.response = undefined
			state.user = undefined
		},
		clearResponse(state) {
			state.response = undefined
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.response = action.payload
			})
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.response = action.payload

				api.defaults.headers.common = { Authorization: `bearer ${action.payload.token}` }
			})
			.addCase(loginUser.rejected, (state) => {
				state.status = 'idle'
			})
			.addCase(getUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.status = 'idle'
				state.user = action.payload
			})
			.addCase(getUser.rejected, (state) => {
				state.status = 'fail'
			})
			.addCase(spin.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(spin.fulfilled, (state, action) => {
				state.status = 'idle'
				state.response = action.payload
			})
			.addCase(spin.rejected, (state) => {
				state.status = 'idle'
			})
	},
})
export const { logout, clearResponse } = userSlice.actions
export default userSlice.reducer
