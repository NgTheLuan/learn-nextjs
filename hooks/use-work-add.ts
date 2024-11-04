import workApi from '@/api-client/work-api'
import { QueryKey } from '@/constants'
import { toast } from 'react-toastify'
import { Arguments, useSWRConfig } from 'swr'

const useWorkAdd = () => {
	const { mutate } = useSWRConfig()

	async function addWork(payload: FormData) {
		try {
			const newWork = await workApi.add(payload)
			//mute work list if add success
			mutate(
				(key: Arguments) => Array.isArray(key) && key.includes(QueryKey.GET_WORK_LIST),
				undefined,
				{
					revalidate: true,
				}
			)
			return newWork
		} catch (error) {
			toast.error('Failed to add work')
		}
	}
	return addWork
}

export default useWorkAdd
