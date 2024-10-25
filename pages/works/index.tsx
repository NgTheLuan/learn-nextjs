import { WorkFilters, WorkList } from '@/components/work'
import { useAuth } from '@/hooks'
import useWorkList from '@/hooks/use-work-list'
import { ListParams, WorkFiltersPayload } from '@/models'
import { Box, Button, Container, Pagination, Skeleton, Stack, Typography } from '@mui/material'
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

	const filters: Partial<ListParams> = {
		_page: 1,
		_limit: 3,
		...router.query,
	}
	const initFiltersPayload: WorkFiltersPayload = {
		search: filters.title_like || '',
		selectedTagList: filters.tagList_like?.split('|') || [],
	}

	function handlePagination(event: React.ChangeEvent<unknown>, value: number) {
		setFilter((previous) => ({
			...previous,
			_page: value,
		}))
	}

	function handleFiltersChange(newFilters: WorkFiltersPayload) {
		// router.push(
		// 	{
		// 		pathname: router.pathname,
		// 		query: {
		// 			...filters,
		// 			_page: 1,
		// 			title_like: newFilters.search,
		// 			tagList_like: newFilters.tagList_like,
		// 		},
		// 	},
		// 	undefined,
		// 	{ shallow: true }
		// )

		setFilter({
			...filters,
			_page: 1,
			title_like: newFilters.search,
			tagList_like: newFilters.tagList_like,
		})
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
