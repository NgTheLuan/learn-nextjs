import { StorageKey } from '@/constants'
import { UserProfile } from '@/models'
import authApi from 'api-client/auth-api'
import useSWR from 'swr'
import { SWRConfiguration } from 'swr/_internal'

export function useAuth(options?: Partial<SWRConfiguration>) {
	const getUserInfo = () => {
		try {
			return JSON.parse(localStorage.getItem(StorageKey.USER_INFO) || '')
		} catch (error) {
			console.log(error)
			return null
		}
	}

	const { data, error, mutate } = useSWR<UserProfile | null>('/profile', {
		dedupingInterval: 60 * 60 * 1000, // 1hour
		revalidateOnFocus: false, // jump other tab and back not call API
		revalidateOnMount: true, // auto call API when first load page
		...options,
		fallbackData: getUserInfo(), // cache logged in user info
		onSuccess: (data) => {
			localStorage.setItem(StorageKey.USER_INFO, JSON.stringify(data))
		},
		onError: (error) => {
			logout()
			console.log(error)
		},
	})

	const firstLoading = data === undefined && error

	async function login(username: string, password: string) {
		await authApi.login({
			username: username,
			password: password,
		})

		await mutate()
	}

	async function logout() {
		await authApi.logout()
		mutate(null, false) // clear data & not call API again
		localStorage.removeItem(StorageKey.USER_INFO)
	}

	return {
		data,
		error,
		firstLoading,
		mutate,
		login,
		logout,
	}
}
