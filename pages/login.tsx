import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks/use-auth'
import { LoginPayload } from '@/models'
import { getErrorMessage } from '@/utils'
import { Box, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function LoginPage() {
	const router = useRouter()
	const { login, logout } = useAuth({ revalidateOnMount: false })

	// async function handleLoginClick() {
	// 	try {
	// 		await login()
	// 		router.push('/about')
	// 	} catch (error) {
	// 		console.log('failed to login', error)
	// 	}
	// }

	// async function handleLogoutClick() {
	// 	try {
	// 		await logout()
	// 	} catch (error) {
	// 		console.log('failed to logout', error)
	// 	}
	// }

	// async function handleGetProfileClick() {
	// 	try {
	// 		try {
	// 			await authApi.getProfile()
	// 		} catch (error) {
	// 			console.log('failed to get profile', error)
	// 		}
	// 	} catch (error) {}
	// }

	async function handleLogin(payload: LoginPayload) {
		try {
			await login(payload)
			router.push('/about')
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
