import Header from '@/components/common/header'
import { AdminLayout } from '@/components/layout'
import { useAuth } from '@/hooks/use-auth'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export interface AboutPageProps {}

export default function AboutPage(props: AboutPageProps) {
	const [postList, setPostList] = useState([])
	const router = useRouter()
	const { mutate } = useAuth()

	// console.log('About query: ', router.query)
	const page = router.query?.page

	useEffect(() => {
		if (!page) return
		;(async () => {
			const response = await fetch(`https://js-post-api.herokuapp.com/api/posts?_page=${page}`)
			const data = await response.json()

			setPostList(data.data)
		})()
	}, [page])

	function handleNextClick() {
		router.push(
			{
				pathname: '/about',
				query: {
					page: (Number(page) || 1) + 1,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	function handleMutateProfile() {
		mutate(
			{
				username: 'test1',
				city: 'South Cleveville',
				email: 'keagan.hammes@ena.biz',
			},
			true
		)
	}

	return (
		<Box>
			<Typography variant="h3" component="h1" color={'primary'}>
				About Page
			</Typography>

			<Header />

			<ul className="post-list">
				{postList.map((post: any) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>

			<button onClick={handleNextClick}>Next page</button>
			<button onClick={handleMutateProfile}>mutate profile</button>
		</Box>
	)
}

AboutPage.Layout = AdminLayout

export async function getStaticProps() {
	console.log('get static props')

	return {
		props: {},
	}
}
