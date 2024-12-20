import { AuthKey } from '@/constants'
import Cookies from 'cookies'
import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise(() => {
		// convert cookies to header Authorization
		const cookies = new Cookies(req, res)
		const accessToken = cookies.get(AuthKey.ACCESS_TOKEN)
		if (accessToken) {
			req.headers.Authorization = `Bearer ${accessToken}`
		}

		// don't send cookies to API server
		req.headers.cookie = ''

		// API_URL = https://js-post-api.herokuapp.com
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		})
	})
}
