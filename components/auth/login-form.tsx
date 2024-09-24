import { InputField } from '@/components/form'
import { useAuth } from '@/hooks'
import { LoginPayload } from '@/models'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
	const router = useRouter()
	const { login, logout } = useAuth({ revalidateOnMount: false })
	const { control, handleSubmit } = useForm({
		defaultValues: {
			username: '',
			password: '',
		},
	})

	async function handleLogin(e: LoginPayload) {
		try {
			await login(e.username, e.password)
			router.push('/about')
		} catch (error) {
			console.log('failed to login', error)
		}
	}

	const [showPassword, setShowPassword] = useState<boolean>(false)

	return (
		<Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ height: '100vh' }}>
			<InputField
				label="Username"
				name="username"
				control={control}
				type="text"
				placeholder="Input your username"
			/>
			<InputField
				label="Password"
				name="password"
				type={showPassword ? 'text' : 'password'}
				control={control}
				placeholder="Input your password"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword((show) => !show)}
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Button
				type="submit"
				variant="contained"
				sx={{
					my: 1,
				}}
			>
				Login
			</Button>
		</Box>
	)
}
