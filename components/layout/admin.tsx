import { Auth } from '@/components/common/auth'
import { useAuth } from '@/hooks/use-auth'
import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import router from 'next/router'

export function AdminLayout({ children }: LayoutProps) {
	const { logout } = useAuth()

	async function handleLogout() {
		try {
			await logout()
			router.push('/login')
		} catch (error) {
			console.log('failed to logout', error)
		}
	}

	return (
		<Auth>
			<div style={{ margin: 40 }}>
				<h1>Admin Layout</h1>

				<div style={{ display: 'flex', gap: 10 }}>
					<Link href="/">
						<a>Home</a>
					</Link>

					<Link href="/about">
						<a>About</a>
					</Link>

					<button onClick={handleLogout}>Logout</button>
				</div>

				<div>{children}</div>
			</div>
		</Auth>
	)
}
