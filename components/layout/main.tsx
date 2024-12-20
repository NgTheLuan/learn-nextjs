import { LayoutProps } from '@/models'
import { Box, Stack } from '@mui/material'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/common/header'), {
	ssr: false,
})
const Footer = dynamic(() => import('@/components/common/footer'), {
	ssr: false,
})

export function MainLayout({ children }: LayoutProps) {
	return (
		<Stack minHeight="100vh">
			<Header />
			<Box component="main" flexGrow={1}>
				{children}
			</Box>
			<Footer />
		</Stack>
	)
}
