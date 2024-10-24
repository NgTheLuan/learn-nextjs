import useWorkList from '@/hooks/use-work-list'
import { ListParams } from '@/models'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage({}: WorksPageProps) {
	const [filter, setFilter] = useState<Partial<ListParams>>({ _page: 1, _limit: 10 })
	const { data, isLoading } = useWorkList({ params: filter })

	function handleNextPage() {
		setFilter((previous) => ({
			...previous,
			_page: (previous._page || 0) + 1,
		}))
	}

	console.log({ data, isLoading })

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>

					<Box>
						<Button variant="contained" onClick={handleNextPage}>
							Next
						</Button>
					</Box>

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
