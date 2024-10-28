import workApi from '@/api-client/work-api'
import { QueryKey } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkListProp {
	params: Partial<ListParams>
	options?: SWRConfiguration
	enabled?: boolean
}

const useWorkList = ({ params, options, enabled }: UseWorkListProp) => {
	const swrResponse = useSWR(
		enabled ? [QueryKey.GET_WORK_LIST, params] : false,
		() => workApi.getAll(params),
		{
			options,
			dedupingInterval: 60 * 1000, //30s
			keepPreviousData: true, //keep old value when fetching
			fallbackData: {
				data: [],
				pagination: {
					_page: 1,
					_limit: 10,
					_totalRows: 0,
				},
			},
		}
	)
	return swrResponse
}

export default useWorkList
