import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface AuthProps {
	children: any
}

export function Auth({ children }: AuthProps) {
	const { data, loading } = useAuth()

	const router = useRouter()

	useEffect(() => {
		if (!loading && data === undefined) {
			router.push('/login')
		}
	}, [data, loading, router])

	if (loading || data === undefined) return <p>Loading...</p>

	return (
		<div>
			{data && <p>{JSON.stringify(data, null, 2)}</p>}
			{children}
		</div>
	)
}
