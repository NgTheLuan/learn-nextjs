import { useAuth } from '@/hooks/use-auth'
import { Typography } from '@mui/material'
import authApi from 'api-client/auth-api'
import { useRouter } from 'next/router'

export default function LoginPage() {
	const router = useRouter()
	const { login, logout } = useAuth({ revalidateOnMount: false })

	async function handleLoginClick() {
		try {
			await login()
			router.push('/about')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	async function handleLogoutClick() {
		try {
			await logout()
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	async function handleGetProfileClick() {
		try {
			try {
				await authApi.getProfile()
			} catch (error) {
				console.log('failed to get profile', error)
			}
		} catch (error) {}
	}

	function goToAbout() {
		router.push('/about')
	}
	function goToHome() {
		router.push('/')
	}

	return (
		<div style={{ margin: 40 }}>
			<Typography variant="h5">Login Page</Typography>
			<div style={{ display: 'flex', gap: 10 }}>
				<button onClick={handleLoginClick}>Login</button>
				<button onClick={handleLogoutClick}>Logout</button>
				<button onClick={handleGetProfileClick}>Get profile</button>
				<button onClick={goToAbout}>Go to About</button>
				<button onClick={goToHome}>Go to Home</button>
			</div>
		</div>
	)
}
