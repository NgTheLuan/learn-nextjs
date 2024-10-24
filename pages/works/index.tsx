import { WorkList } from '@/components/work'
import { useAuth } from '@/hooks'
import useWorkList from '@/hooks/use-work-list'
import { ListParams } from '@/models'
import { Box, Button, Container, Pagination, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'

export interface WorksPageProps {}

export default function WorksPage({}: WorksPageProps) {
	const router = useRouter()
	const [filter, setFilter] = useState<Partial<ListParams>>({ _page: 1, _limit: 3 })
	const { data: dataWork, isLoading } = useWorkList({ params: filter })

	const { data } = useAuth()
	const isLoggedIn = Boolean(data?.username)

	const { _limit, _totalRows, _page } = dataWork?.pagination || {}
	const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows! / _limit!) : 0

	console.log('totalPages', totalPages)

	function handlePagination(event: React.ChangeEvent<unknown>, value: number) {
		setFilter((previous) => ({
			...previous,
			_page: value,
		}))
	}

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						Work
					</Typography>

					{isLoggedIn && (
						<Button variant="contained" onClick={() => router.push('/works/add')}>
							Add new work
						</Button>
					)}
				</Stack>

				<WorkList workList={dataWork?.data || []} loading={!router.isReady || isLoading} />

				<Stack alignItems="center">
					<Pagination count={totalPages} page={_page} onChange={handlePagination} />
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
