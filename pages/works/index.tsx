import workApi from '@/api-client/work-api'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export interface WorksPageProps {}

export default function WorksPage({}: WorksPageProps) {
	useEffect(() => {
		;(async () => {
			try {
				const response = await workApi.getAll({})
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

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

export async function getStaticProps() {
	return {
		props: {},
	}
}
