import { useAuth } from '@/hooks'
import { encodeUrl, ROUTE_LIST } from '@/utils/index'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Header() {
	const router = useRouter()
	const { data, logout } = useAuth()
	const isLoggedIn = Boolean(data?.username)

	/************** Fix : issue text content did not match  **************/
	const [routeList, setRouteList] = useState(ROUTE_LIST.filter((route) => !route.requireLogin))
	useEffect(() => {
		/*
		 *** server render menu not require login (A)
		 *** client - first render menu not require login (B)
		 *** client - check (A)(B) and UseEffect render menu second-time
		 */
		setRouteList(ROUTE_LIST.filter((route) => !route.requireLogin) || isLoggedIn)
	}, [isLoggedIn])

	return (
		<>
			{/* Header Desktop */}
			<Box display={{ xs: 'none', lg: 'block' }} py={2}>
				<Stack direction="row" justifyContent="flex-end" paddingX={4}>
					{routeList.map((item) => {
						return (
							<Link key={item.path} href={item.path}>
								<MuiLink
									sx={{ mx: 2, fontWeight: 'medium' }}
									className={clsx({ active: router.pathname === item.path })}
								>
									{item.label}
								</MuiLink>
							</Link>
						)
					})}

					{!isLoggedIn && (
						<Link href={`/login?back_to=${encodeUrl(router.asPath)}`} passHref>
							<MuiLink sx={{ ml: 2, fontWeight: 'medium' }}>Login</MuiLink>
						</Link>
					)}

					{isLoggedIn && (
						<MuiLink sx={{ ml: 2, fontWeight: 'medium', cursor: 'pointer' }} onClick={logout}>
							Logout
						</MuiLink>
					)}
				</Stack>

				{isLoggedIn && (
					<Stack direction="row" justifyContent="flex-start" paddingX={4}>
						<Typography variant="h6" fontWeight="medium">
							Hi {data?.username} !
						</Typography>
					</Stack>
				)}
			</Box>

			{/* Header Mobile */}
			<Box display={{ xs: 'block', lg: 'none' }}>Header Mobile</Box>
		</>
	)
}
