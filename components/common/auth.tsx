import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface AuthProps {
	children: any
}

export function Auth({ children }: AuthProps) {
	const { data, firstLoading } = useAuth()

	const router = useRouter()

	useEffect(() => {
		if (!firstLoading && !data) {
			router.push('/login')
		}
	}, [router, data, firstLoading])

	if (firstLoading || !data) return <p>Loading...</p>

	return (
		<div style={{ margin: 40 }}>
			{data && <p style={{ padding: '0 40px' }}>{JSON.stringify(data, null, 2)}</p>}
			{children}
		</div>
	)
}
