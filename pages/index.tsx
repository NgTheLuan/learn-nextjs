import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'

const Home: NextPageWithLayout = () => {
	return (
		<div>
			<title>Learn NextJS</title>
			<meta name="description" content="Learn NextJS + Typescript with fun :P" />
			<link rel="icon" href="/favicon.ico" />
		</div>
	)
}

Home.Layout = MainLayout

export default Home
