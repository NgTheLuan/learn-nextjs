import { ROUTE_LIST } from '@/utils/utils'
import { Box, Link as MuiLink, Stack } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Header() {
	const router = useRouter()

	return (
		<>
			{/* Header Desktop */}
			<Box display={{ xs: 'none', lg: 'block' }} py={2}>
				<Stack direction="row" justifyContent="flex-end">
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
				</Stack>
			</Box>

			{/* Header Mobile */}
			<Box display={{ xs: 'block', lg: 'none' }}>Header Mobile</Box>
		</>
	)
}
