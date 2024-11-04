import workApi from '@/api-client/work-api'
import { QueryKey } from '@/constants'
import useSWR, { SWRConfiguration } from 'swr'

export interface UseWorkDetailProp {
	workId: string
	options?: SWRConfiguration
	enabled?: boolean
}

const useWorkDetail = ({ workId, options, enabled }: UseWorkDetailProp) => {
	const swrResponse = useSWR(
		enabled ? [QueryKey.GET_WORK_DETAIL, workId] : false,
		() => workApi.get(workId),
		{
			options,
			dedupingInterval: 30 * 1000, //30s
			keepPreviousData: true, //keep old value when fetching
			fallbackData: null,
			...options,
		}
	)

	async function updateWork(payload: FormData) {
		const data = await workApi.update(payload)
		swrResponse.mutate(data) // when update success and auto fech data
	}
	return { ...swrResponse, updateWork }
}

export default useWorkDetail
