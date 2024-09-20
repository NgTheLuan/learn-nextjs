import { Seo } from '@/components/common'
import { FeatureWorks, HeroSection, RecentPost } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Box } from '@mui/material'

const Home: NextPageWithLayout = () => {
	return (
		<Box display="flex" flexDirection="column">
			<Seo
				data={{
					title: 'NextJS Tutorials | Luan',
					description:
						'Step by step tutorials to build a full CRUD website using NextJS for beginners',
					url: 'https://learn-nextjs-git-main-ngtheluans-projects.vercel.app',
					thumbnailUrl:
						'https://cdn.getshifter.co/caa65008efb706a8bfc6f7e4045d6a018420c3df/uploads/2020/11/nextjs.png',
				}}
			/>
			<HeroSection />
			<RecentPost />
			<FeatureWorks />
		</Box>
	)
}

Home.Layout = MainLayout

export default Home
