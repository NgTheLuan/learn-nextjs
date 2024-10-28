import { WorkFilters, WorkList } from '@/components/work'
import { useAuth } from '@/hooks'
import useWorkListInfinity from '@/hooks/use-work-list-infinity'
import { ListParams, WorkFiltersPayload } from '@/models'
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

	const { data: dataWork, isLoading } = useWorkListInfinity({
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

	console.log('dataWork', dataWork)

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

				<WorkList workList={[]} loading={!router.isReady || isLoading} />
			</Container>
		</Box>
	)
}
