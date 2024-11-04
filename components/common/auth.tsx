import { useAuth } from '@/hooks/use-auth'
import { encodeUrl } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
			router.replace(`/login?back_to=${encodeUrl(router.asPath)}`)
		}
	}, [router, data, firstLoading, requireLogin])

	if (requireLogin && !data) return <p>Loading...</p>

	return <div>{children}</div>
}
