import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'

interface AuthProps {
	children: any
	requireLogin?: boolean
}

export function Auth({ children, requireLogin = false }: AuthProps) {
	const { data, firstLoading } = useAuth()

	const router = useRouter()

	useEffect(() => {
		if (!requireLogin) return

		if (!firstLoading && !data) {
			router.replace('/login')
		}
	}, [router, data, firstLoading, requireLogin])

	if (requireLogin && !data) return <p>Loading...</p>

	return (
		<Fragment>
			{children}
			{data && <p style={{ padding: '0 40px' }}>{JSON.stringify(data, null, 2)}</p>}
		</Fragment>
	)
}
