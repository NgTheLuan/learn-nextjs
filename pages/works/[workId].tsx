import { WorkForm } from '@/components/work'
import useWorkDetail from '@/hooks/use-work-detail'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export interface AddEditWorksPageProps {}

export default function AddEditWorksPage({}: AddEditWorksPageProps) {
	const router = useRouter()
	const { workId } = router.query
	const isAddMode = workId === 'add'

	const {
		data: workDetail,
		isLoading,
		error,
	} = useWorkDetail({
		workId: String(workId),
		enabled: router.isReady && !isAddMode,
	})

	console.log('workDetail', workDetail)

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						{isAddMode ? 'Add Work' : 'Edit Work'}
					</Typography>
				</Stack>

				{(workDetail || Boolean(isAddMode)) && (
					<WorkForm initialValues={workDetail} onSubmit={() => {}} />
				)}
			</Container>
		</Box>
	)
}
