import { MainLayout } from '@/components/layout'
import { NextPageWithLayout } from '@/models/common'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'

const Home: NextPageWithLayout = () => {
	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h5">Home Page</Typography>
			<Link href="/login">
				<a>Login</a>
			</Link>
		</Box>
	)
}

Home.Layout = MainLayout

export default Home
