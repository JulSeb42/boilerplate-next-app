/*
    Create API link
*/

import { axios } from "lib"

const BASE_API_URL = `${process.env.NEXT_PUBLIC_URL}/api`

export const http = axios.create({
	baseURL: BASE_API_URL,
	headers: {
		"Content-type": "application/json",
	},
	withCredentials: true,
})
