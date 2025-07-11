import { axiosRequest } from '@/utils/axios'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getData = createAsyncThunk('todos/getData', async () => {
	try {
		let { data } = await axiosRequest.get()
		console.log('DATA: ', data.data)
		return data.data
	} catch (error) {
		console.log(error)
	}
})

export const delFunc = createAsyncThunk(
	'todos/delFunc',
	async (id, { dispatch }) => {
		try {
			await axiosRequest.delete(`?id=${id}`)
			dispatch(getData())
		} catch (error) {
			console.log(error)
		}
	}
)

export const editFunc = createAsyncThunk(
	'todos/editFunc',
	async (todo, { dispatch }) => {
		try {
			await axios.put('https://to-dos-api.softclub.tj/api/categories', todo)
			dispatch(getData())
		} catch (error) {
			console.log(error)
		}
	}
)

export const addFunc = createAsyncThunk(
	'todos/addFunc',
	async (todo, { dispatch }) => {
		try {
			let { data } = await axios.post(
				'https://to-dos-api.softclub.tj/api/categories',
				todo
			)
			dispatch(getData(data.data))
		} catch (error) {
			console.log(error)
		}
	}
)

export const byId = createAsyncThunk('todos/byid', async id => {
	try {
		let { data } = await axiosRequest.get(`/${id}`)
		// console.log('byId: ', data.data)
		return data.data
	} catch (error) {
		console.log(error)
	}
})

export const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		data: [],
		info: {},
	},
	reducers: {},
	extraReducers: bulder => {
		bulder
			.addCase(getData.fulfilled, (state, action) => {
				state.data = action.payload
			})
			.addCase(byId.fulfilled, (state, action) => {
				state.info = action.payload
			})
	},
})

export default todoSlice.reducer
export const {} = todoSlice.actions
