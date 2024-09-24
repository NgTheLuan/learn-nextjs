import { TextField, TextFieldProps } from '@mui/material'
import { Control, useController } from 'react-hook-form'

type InputFieldProps = TextFieldProps & {
	name: string
	control: Control<any>
}

export default function InputField({
	label,
	name,
	control,
	value: externalValue, // not-overwrite
	ref: externalRef, // not-overwrite
	onBlur: externalOnBlur, // not-overwrite
	onChange: externalOnChange, // not-overwrite
	...rest
}: InputFieldProps) {
	const {
		fieldState: { error },
		field: { onChange, value, ref, onBlur },
	} = useController({
		name,
		control,
	})

	return (
		<TextField
			fullWidth
			name={name}
			label={label}
			size="small"
			margin="normal"
			value={value}
			inputRef={ref}
			onBlur={onBlur}
			onChange={onChange}
			{...rest}
		/>
	)
}
