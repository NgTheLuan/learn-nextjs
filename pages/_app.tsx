import { Auth } from '@/components/common/auth'
import { EmptyLayout } from '@/components/layout'
import { AppPropsWithLayout } from '@/models/common'
import { createEmotionCache, theme } from '@/utils/index'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import axiosClient from 'api-client/axios-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { SWRConfig } from 'swr'
import '../styles/globals.css'
import '../styles/prism.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp({
	Component,
	pageProps,
	emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) {
	const Layout = Component.Layout ?? EmptyLayout

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ToastContainer />
				<SWRConfig value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}>
					<Layout>
						<Auth requireLogin={Component.requireLogin ?? false}>
							<Component {...pageProps} />
						</Auth>
					</Layout>
				</SWRConfig>
			</ThemeProvider>
		</CacheProvider>
	)
}
export default MyApp
