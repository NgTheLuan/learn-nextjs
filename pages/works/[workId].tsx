import { MainLayout } from '@/components/layout'
import { WorkForm } from '@/components/work'
import useWorkAdd from '@/hooks/use-work-add'
import useWorkDetail from '@/hooks/use-work-detail'
import { ROUTE_LIST } from '@/utils'
import { Box, Container, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { toast } from 'react-toastify'

export default function AddEditWorksPage() {
	const router = useRouter()
	const { workId } = router.query
	const isAddMode = workId === 'add'

	const addWork = useWorkAdd()
	const { data: workDetail, updateWork } = useWorkDetail({
		workId: String(workId),
		enabled: router.isReady && !isAddMode,
	})

	async function handleUpdateSubmit(payload: FormData) {
		let response = null
		try {
			if (isAddMode) {
				response = await addWork(payload)
				toast.success(`Add Work successfully, ID: ${response?.id}`)
			} else {
				await updateWork(payload)
				toast.success('Work updated successfully')
			}

			//response.id -> navigate to detail page
			router.push(ROUTE_LIST[1].path) //page work list
		} catch (error) {
			toast.error(error)
		}
	}

	if (!router.isReady) return null

	return (
		<Box>
			<Container>
				<Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
					<Typography component="h1" variant="h3" fontWeight="bold">
						{isAddMode ? 'Create Work' : 'Update Work'}
					</Typography>
				</Stack>

				{(workDetail || Boolean(isAddMode)) && (
					<WorkForm initialValues={workDetail} onSubmit={handleUpdateSubmit} />
				)}
			</Container>

			<Script src="https://widget.cloudinary.com/v2.0/global/all.js" strategy="afterInteractive" />
		</Box>
	)
}

AddEditWorksPage.Layout = MainLayout
AddEditWorksPage.requireLogin = MainLayout
