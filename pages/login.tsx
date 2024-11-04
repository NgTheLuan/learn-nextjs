import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks/use-auth'
import { LoginPayload } from '@/models'
import { decodeUrl, getErrorMessage } from '@/utils'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function LoginPage() {
	const router = useRouter()
	const { login } = useAuth({ revalidateOnMount: false })

	async function handleLogin(payload: LoginPayload) {
		try {
			await login(payload)
			const backTo = router?.query?.back_to ? decodeUrl(router?.query?.back_to as string) : '/'
			router.push(backTo)
		} catch (error: unknown) {
			const message = getErrorMessage(error) as any
			console.log('message', message)
			toast.error(message)
		}
	}

	return (
		<Box>
			<Paper
				elevation={4}
				sx={{
					m: 'auto',
					marginTop: 8,
					marginBottom: 8,
					padding: 4,
					maxWidth: 500,
					textAlign: 'center',
				}}
			>
				<Typography component="h1" variant="h5">
					Login Page
				</Typography>
				<LoginForm OnSubmit={handleLogin} />
			</Paper>
		</Box>
	)
}
