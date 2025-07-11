import todoSlice from '@/reducers/todoSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		todos: todoSlice,
	},
})
