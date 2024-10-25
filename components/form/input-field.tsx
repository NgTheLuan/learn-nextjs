import { TextField, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
	name: Path<T>
	control: Control<T>
}

export default function InputField<T extends FieldValues>({
	label,
	name,
	control,
	value: externalValue, // not-overwrite
	ref: externalRef, // not-overwrite
	onBlur: externalOnBlur, // not-overwrite
	onChange: externalOnChange, // not-overwrite
	...rest
}: InputFieldProps<T>) {
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
			onChange={(event: ChangeEvent<HTMLInputElement>) => {
				onChange(event)
				externalOnChange?.(event)
			}}
			error={!!error}
			helperText={error?.message}
			{...rest}
		/>
	)
}
