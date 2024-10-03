import { LayoutProps } from '@/models'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('@/components/common/header'), {
	ssr: false,
})
const Footer = dynamic(() => import('@/components/common/footer'), {
	ssr: false,
})

export function EmptyLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
