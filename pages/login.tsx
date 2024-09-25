import { LoginForm } from '@/components/auth'
import { useAuth } from '@/hooks/use-auth'
import { LoginPayload } from '@/models'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'

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

	async function handleLogin(e: LoginPayload) {
		try {
			await login(e.username, e.password)
			router.push('/about')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	return (
		<div style={{ margin: 40 }}>
			<Typography variant="h5">Login Page</Typography>
			<LoginForm OnSubmit={handleLogin} />
		</div>
	)
}
