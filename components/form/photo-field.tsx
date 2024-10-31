import { Common } from '@/constants'
import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material'
import Image from 'next/image'
import { ChangeEvent } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

export type PhotoFieldProps<T extends FieldValues> = TextFieldProps & {
	name: Path<T>
	control: Control<T>
}

export default function PhotoField<T extends FieldValues>({
	label,
	name,
	control,
	...rest
}: PhotoFieldProps<T>) {
	const {
		fieldState: { error },
		field: { onChange, value, ref, onBlur },
	} = useController({
		name,
		control,
	})

	const previewUrl = value?.['previewUrl'] || Common.DEFAULT_THUMBNAIL
	const inputField = `photo-field-${name}`

	function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]
		if (!file) return

		const url = URL.createObjectURL(file)
		onChange({ file, previewUrl: url })
	}

	return (
		<Box sx={{ py: 2 }}>
			<Typography variant="body2">{label}</Typography>
			<Box component="label" htmlFor={inputField} ref={ref} sx={{ cursor: 'pointer' }}>
				<Image src={previewUrl} width={246} height={180} layout="fixed" alt="work thumbnail" />
				<FormHelperText error={!!error}>{error?.message}</FormHelperText>
				<Box
					id={inputField}
					component="input"
					type="file"
					accept="image/*"
					onChange={handleFileChange}
				/>
			</Box>
		</Box>
	)
}
