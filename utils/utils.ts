import { Post } from '@/models'
import path from 'path'

const BLOG_FOLDER = path.join(process.cwd(), 'blog')

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

export async function getPostList(): Promise<Post[]> {
	// read all markdown files
	// const fileNameList = fs.readdirSync(BLOG_FOLDER)

	const postList: Post[] = []
	// for (const fileName of fileNameList) {
	// 	const filePath = path.join(BLOG_FOLDER, fileName)
	// 	const fileContents = fs.readFileSync(filePath, 'utf8')
	// 	const { data, excerpt, content } = matter(fileContents, {
	// 		excerpt_separator: '<!-- truncate-->',
	// 	})

	// 	postList.push({
	// 		id: fileName,
	// 		slug: data.slug,
	// 		title: data.title,
	// 		thumbnailUrl: data.image || null,
	// 		author: {
	// 			name: data.author,
	// 			title: data.author_title,
	// 			profileUrl: data.author_url,
	// 			avatarUrl: data.author_image_url,
	// 		},
	// 		tagList: data.tags,
	// 		publishedDate: data.date,
	// 		description: excerpt || '',
	// 		mdContent: content,
	// 	})
	// }

	return postList
}
