import { useAuth } from '@/hooks/use-auth'
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

	return (
		<div>
			<h1>Login Page</h1>
			<button onClick={handleLoginClick}>Login</button>
			<button onClick={handleGetProfileClick}>Get profile</button>
			<button onClick={goToAbout}>Go to About</button>
			<button onClick={handleLogoutClick}>Logout</button>
		</div>
	)
}
