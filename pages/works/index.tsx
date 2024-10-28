import { WorkFilters, WorkList } from '@/components/work'
import { useAuth } from '@/hooks'
import useWorkList from '@/hooks/use-work-list'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface WorksPageProps {}

export default function WorksPage({}: WorksPageProps) {
	const router = useRouter()
	const filters: Partial<ListParams> = {
		_page: 1,
		_limit: 3,
		...router.query,
	}
	const initFiltersPayload: WorkFiltersPayload = {
		search: filters.title_like || '',
		selectedTagList: filters.tagList_like?.split('|') || [],
	}

	const { data: dataWork, isLoading } = useWorkList({ params: filters, enabled: router.isReady })

	const { data } = useAuth()
	const isLoggedIn = Boolean(data?.username)

	const { _limit, _totalRows, _page } = dataWork?.pagination || {}
	const totalPages = Boolean(_totalRows) ? Math.ceil(_totalRows! / _limit!) : 0

	function handlePagination(event: React.ChangeEvent<unknown>, value: number) {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
					_page: value,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
					_page: 1,
					title_like: newFilters.search,
				},
			},
			undefined,
			{ shallow: true }
		)
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

				{router.isReady ? (
					<WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
				) : (
					<Skeleton
						variant="rectangular"
						height={40}
						sx={{
							display: 'inline-block',
							width: '100%',
							mt: 2,
							mb: 1,
							verticalAlign: 'middle',
						}}
					/>
				)}

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
