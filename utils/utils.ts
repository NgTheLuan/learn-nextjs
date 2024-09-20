export interface Route {
	label: string
	path: string
	requireLogin?: boolean
}

export const ROUTE_LIST: Route[] = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Works',
		path: '/works?_page=1&_limit=3',
	},
	{
		label: 'Blog',
		path: '/blog',
	},
]

export function encodeUrl(str: string): string {
	const base64 =
		typeof window !== 'undefined' ? window.btoa(str) : Buffer.from(str).toString('base64')
	return encodeURIComponent(base64)
}

export function decodeUrl(str: string): string {
	const base64 = decodeURIComponent(str)
	return typeof window !== 'undefined'
		? window.atob(base64)
		: Buffer.from(base64, 'base64').toString()
}
