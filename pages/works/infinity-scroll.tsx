import { WorkFilters, WorkList } from '@/components/work'
import { useAuth } from '@/hooks'
import useWorkListInfinity from '@/hooks/use-work-list-infinity'
import { ListParams, ListResponse, Work, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Skeleton, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface InfinityScrollProps {}

export default function InfinityScrollPage({}: InfinityScrollProps) {
	const router = useRouter()

	const { data } = useAuth()
	const isLoggedIn = Boolean(data?.username)

	const filters: Partial<ListParams> = {
		_page: 1,
		_limit: 3,
		...router.query,
	}
	const initFiltersPayload: WorkFiltersPayload = {
		search: filters.title_like || '',
		selectedTagList: filters.tagList_like?.split('|') || [],
	}

	const {
		data: dataWork,
		isLoading,
		isValidating,
		size,
		setSize,
	} = useWorkListInfinity({
		params: filters,
		enabled: router.isReady,
	})

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		router.push(
			{
				pathname: router.pathname,
				query: {
					...filters,
					_page: 1,
					title_like: newFilters.search,
					tagList_like: newFilters.tagList_like,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	/*
	 * data = [ responsePage1, responsePage2, ...]
	 * responsePage1 : { data, pagination }
	 * workList = [...data1,...data2,...dataN ]
	 */
	const workList =
		dataWork?.reduce((result: Work[], currentPage: ListResponse<Work>) => {
			result.push(...currentPage.data)
			return result
		}, []) || []

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

				<WorkList workList={workList} loading={!router.isReady || isLoading} />

				<Button variant="contained" onClick={() => setSize(size + 1)}>
					Xem thêm
				</Button>
			</Container>
		</Box>
	)
}
