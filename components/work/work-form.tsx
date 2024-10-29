import { useTagList } from '@/hooks'
import { WorkPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { InputField } from '../form'

export interface WorkFormProps {
	initialValues?: Partial<WorkPayload>
	onSubmit?: (payload: Partial<WorkPayload>) => void
}

export default function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		shortDescription: yup.string().required('Short description is required'),
	})

	const { data } = useTagList()
	const tagList = data?.data || []

	async function handleLoginSubmit(payload: WorkPayload) {
		if (!payload) return

		// payload.tagList_like = payload.selectedTagList?.join('|') || ''
		// delete payload.selectedTagList
		// await onSubmit?.(payload)
	}

	const { control, handleSubmit } = useForm<WorkPayload>({
		defaultValues: {
			title: '',
			shortDescription: '',
			...initialValues,
		},
		resolver: yupResolver(schema),
	})

	return (
		<Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
			<InputField label="Title" name="title" placeholder="Input title" control={control} />

			<InputField
				label="Short description"
				name="shortDescription"
				placeholder="Input short description"
				control={control}
				InputProps={{ multiline: true, rows: 4 }}
			/>

			<Box textAlign="center" margin={2}>
				<Button type="submit" variant="contained">
					{initialValues?.id ? 'Update' : 'Create'}
				</Button>
			</Box>
		</Box>
	)
}
