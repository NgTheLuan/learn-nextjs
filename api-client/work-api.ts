import axiosClient from '@/api-client/axios-client'
import { ListParams, ListResponse, Work } from '@/models'

const workApi = {
	getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
		return axiosClient.get(`/works`, { params })
	},

	get(id: string): Promise<Work> {
		return axiosClient.get(`/works/${id}`)
	},
}

export default workApi
