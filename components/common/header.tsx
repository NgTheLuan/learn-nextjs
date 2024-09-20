import { useAuth } from '@/hooks'
import { encodeUrl, ROUTE_LIST } from '@/utils/index'
import { Box, Link as MuiLink, Stack, Typography } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
	const router = useRouter()
	const { data, logout } = useAuth()
	const isLoggedIn = Boolean(data?.username)

	return (
		<>
			{/* Header Desktop */}
			<Box display={{ xs: 'none', lg: 'block' }} py={2}>
				<Stack direction="row" justifyContent="flex-end" paddingX={4}>
					{ROUTE_LIST.map((item) => {
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
