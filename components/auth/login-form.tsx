import { InputField } from '@/components/form'
import { LoginPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

interface LoginFormProps {
	OnSubmit: (payload: LoginPayload) => void
}

export default function LoginForm({ OnSubmit }: LoginFormProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const schemaForm = yup.object().shape({
		username: yup
			.string()
			.required('Please input your username')
			.min(4, 'Username must be at least 4 characters'),
		password: yup
			.string()
			.required('Please input your password')
			.min(6, 'Password must be at least 6 characters'),
	})

	const { control, handleSubmit } = useForm<LoginPayload>({
		defaultValues: {
			username: '',
			password: '',
		},
		resolver: yupResolver(schemaForm),
	})

	return (
		<Box component="form" onSubmit={handleSubmit(OnSubmit)}>
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
				fullWidth
				sx={{
					my: 1,
				}}
			>
				Login
			</Button>
		</Box>
	)
}
