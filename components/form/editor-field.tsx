import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export type EditorFieldProps<T extends FieldValues> = TextFieldProps & {
	name: Path<T>
	control: Control<T>
}

export default function EditorField<T extends FieldValues>({
	label,
	name,
	control,
	...rest
}: EditorFieldProps<T>) {
	const {
		fieldState: { error },
		field: { onChange, value, ref, onBlur },
	} = useController({
		name,
		control,
	})

	return (
		<Box sx={{ py: 2 }}>
			<Typography variant="body2">{label}</Typography>
			<Box>
				<ReactQuill theme="snow" value={value} onChange={onChange} />
				<FormHelperText error={!!error}>{error?.message}</FormHelperText>
			</Box>
		</Box>
	)
}
