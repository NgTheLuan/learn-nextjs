import { WorkForm } from '@/components/work'
import useWorkDetail from '@/hooks/use-work-detail'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'

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

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						{isAddMode ? 'Create Work' : 'Update Work'}
					</Typography>
				</Stack>

				{(workDetail || Boolean(isAddMode)) && <WorkForm initialValues={workDetail} />}
			</Container>

			<Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
		</Box>
	)
}
