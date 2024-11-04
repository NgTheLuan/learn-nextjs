import { StorageKey } from '@/constants'
import { LoginPayload, UserProfile } from '@/models'
import authApi from 'api-client/auth-api'
import useSWR from 'swr'
import { SWRConfiguration } from 'swr/_internal'

export function useAuth(options?: Partial<SWRConfiguration>) {
	const getUserInfo = () => {
		try {
			return JSON.parse(localStorage.getItem(StorageKey.USER_INFO) || '')
		} catch (error) {
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
		onError: () => {
			logout()
		},
	})

	const firstLoading = data === undefined && error

	async function login(payload: LoginPayload) {
		await authApi.login({
			username: payload.username,
			password: payload.password,
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
		isLoggedIn: Boolean(data?.username),
	}
}
