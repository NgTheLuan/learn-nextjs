import { LayoutProps } from '@/models/index'
import Link from 'next/link'
import { useEffect } from 'react'

export function MainLayout({ children }: LayoutProps) {
	useEffect(() => {
		console.log('MainLayout mounting')

		return () => console.log('MainLayout unmounting')
	}, [])

	return (
		<div style={{ margin: 40 }}>
			<h1>Learn NextJS</h1>

			<div style={{ display: 'flex', gap: 10 }}>
				<Link href="/login">
					<a>Login</a>
				</Link>

				<div>
					<Link href="/about">
						<a>About</a>
					</Link>
				</div>
			</div>

			<div>{children}</div>
		</div>
	)
}
