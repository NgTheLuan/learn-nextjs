import { Post } from '@/models'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

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

const BLOG_FOLDER = path.join(process.cwd(), 'markdown')
export async function getPostList(): Promise<Post[]> {
	// read all markdown files
	const fileNameList = fs.readdirSync(BLOG_FOLDER)

	const postList: Post[] = []
	for (const fileName of fileNameList) {
		const filePath = path.join(BLOG_FOLDER, fileName)
		const fileContents = fs.readFileSync(filePath, 'utf8')
		const { data, excerpt, content } = matter(fileContents, {
			excerpt_separator: '<!-- truncate-->',
		})

		postList.push({
			id: fileName,
			slug: data.slug,
			title: data.title,
			thumbnailUrl: data.image || null,
			author: {
				name: data.author,
				title: data.author_title,
				profileUrl: data.author_url,
				avatarUrl: data.author_image_url,
			},
			tagList: data.tags,
			publishedDate: data.date,
			description: excerpt || '',
			mdContent: content,
		})
	}

	return postList
}

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
		path: '/works',
		requireLogin: true,
	},
	{
		label: 'Blog',
		path: '/blog',
	},
]

type ErrorWithMessage = {
	message: string
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
	return (
		typeof error === 'object' &&
		error !== null &&
		'message' in error &&
		typeof (error as Record<string, unknown>).message === 'string'
	)
}

function toErrorWithMessage(maybeError: unknown): ErrorWithMessage {
	if (isErrorWithMessage(maybeError)) return maybeError

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

export function getErrorMessage(error: unknown) {
	return toErrorWithMessage(error).message
}
