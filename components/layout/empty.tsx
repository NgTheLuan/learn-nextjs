import { Footer, Header } from '@/components/common'
import { LayoutProps } from '@/models/index'

export function EmptyLayout({ children }: LayoutProps) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
