import workApi from '@/api-client/work-api'
import { QueryKeysKey } from '@/constants'
import { ListParams } from '@/models'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkListProp {
	params: Partial<ListParams>
	options?: SWRConfiguration
}

const useWorkList = ({ params, options }: UseWorkListProp) => {
	const swrResponse = useSWR([QueryKeysKey.GET_WORK_LIST, params], () => workApi.getAll(params), {
		dedupingInterval: 60 * 1000, //30s
		fallbackData: {
			data: [],
			pagination: {
				_page: 1,
				_limit: 10,
				_total: 0,
			},
		},
		keepPreviousData: true, //keep old value when fetching
		options,
	})
	return swrResponse
}

export default useWorkList
