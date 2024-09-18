import authApi from 'api-client/auth-api'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'

export function useAuth(options?: Partial<PublicConfiguration>) {
	const { data, error, mutate } = useSWR('/profile', {
		dedupingInterval: 60 * 60 * 1000, // 1hour
		revalidateOnFocus: false, // jump other tab and back not call API
		revalidateOnMount: true, // auto call API when first load page
		...options,
	})

	const loading = !data && !error

	async function login() {
		await authApi.login({
			username: 'luan_dev',
			password: '123123',
		})

		await mutate(null, true)
	}

	async function logout() {
		await authApi.logout()
		mutate({}, false) // clear data & not call API again
	}

	return {
		data,
		error,
		loading: loading,
		mutate,
		login,
		logout,
	}
}
