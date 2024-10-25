import { EmotionCache } from '@emotion/react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'

export interface LayoutProps {
	children: ReactNode
}

export type NextPageWithLayout = NextPage & {
	Layout?: (props: LayoutProps) => ReactElement
	requireLogin?: boolean
}

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
	emotionCache?: EmotionCache
}

export interface Pagination {
	_page: number
	_limit: number
	_totalRows: number
}

export interface ListResponse<T> {
	data: Array<T>
	pagination: Pagination
}

export interface ListParams {
	_page: number
	_limit: number
	title_like: string
	tagList_like: string
}
