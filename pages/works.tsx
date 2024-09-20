import { MainLayout } from '@/components/layout'
import { Box, Container, Stack, Typography } from '@mui/material'

export interface WorksPageProps {}

export default function WorksPage({}: WorksPageProps) {
	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>

					{/* {isLoggedIn && (
						<Button variant="contained" onClick={() => router.push('/works/add')}>
							Add new work
						</Button>
					)} */}
				</Stack>
			</Container>
		</Box>
	)
}

WorksPage.Layout = MainLayout
