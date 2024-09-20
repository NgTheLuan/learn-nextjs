import { FeatureWorks, HeroSection, RecentPost } from '@/components/home'
import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Box } from '@mui/material'

const Home: NextPageWithLayout = () => {
	return (
		<Box display="flex" flexDirection="column">
			<HeroSection />
			<RecentPost />
			<FeatureWorks />
		</Box>
	)
}

Home.Layout = MainLayout

export default Home
