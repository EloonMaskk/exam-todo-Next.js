'use client'

import axios from 'axios'
import { API } from './config'

const axiosRequest = axios.create({
	baseURL: API,
})

export { axiosRequest }
