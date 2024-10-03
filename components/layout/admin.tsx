import { Auth } from '@/components/common/auth'
import { useAuth } from '@/hooks/use-auth'
import { LayoutProps } from '@/models'
import Link from 'next/link'
import router from 'next/router'

import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/common/header'), {
	ssr: false,
})
const Footer = dynamic(() => import('@/components/common/footer'), {
	ssr: false,
})

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
			<Header />
			<div style={{ margin: 40 }}>
				<h1>Admin Layout</h1>

				<div style={{ display: 'flex', gap: 10 }}>
					<Link href="/">
						<a>Home</a>
					</Link>

					<Link href="/about">
						<a>About</a>
					</Link>
				</div>

				<div>{children}</div>
			</div>
			<Footer />
		</Auth>
	)
}
