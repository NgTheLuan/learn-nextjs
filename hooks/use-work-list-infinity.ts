import axiosClient from '@/api-client/axios-client'
import { ListParams, ListResponse, Work } from '@/models'
import qs from 'qs'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

export interface UseWorkListInfinityProp {
	params: Partial<ListParams>
	options?: SWRInfiniteConfiguration
	enabled?: boolean
}

const useWorkListInfinity = ({ params, options, enabled = true }: UseWorkListInfinityProp) => {
	const swrResponse = useSWRInfinite<ListResponse<Work>>(
		(index: number, previousData: ListResponse<Work>) => {
			if (!enabled) return null // void case call api not params

			// index start at 0
			const page = index + 1
			const query: Partial<ListParams> = {
				...params,
				_page: page,
				_limit: 5,
			}

			//return null in case page > totalPages
			if (previousData) {
				const { _limit, _totalRows } = previousData.pagination || { _limit: 5, _totalRows: 0 }
				const totalPages = Math.ceil(_totalRows! / _limit!) //1.2 -> 2
				if (page > totalPages) return null
			}

			return `/works?${qs.stringify(query)}`
		},
		(url: string) => axiosClient.get(url),
		{
			revalidateFirstPage: false,
			...options,
		}
	)
	return swrResponse
}

export default useWorkListInfinity
