import { useTagList } from '@/hooks'
import { WorkPayload } from '@/models'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button } from '@mui/material'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { AutocompleteField, EditorField, InputField, PhotoField } from '../form'

export interface WorkFormProps {
	initialValues?: Partial<WorkPayload>
	onSubmit?: (payload: FormData) => void
}

export default function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
	const modeUpdate = initialValues?.id
	const { data } = useTagList()
	const tagList = data?.data || []

	const schema = yup.object().shape({
		title: yup.string().required('Title is required'),
		shortDescription: yup.string().required('Short description is required'),
		tagList: yup.array().of(yup.string()).min(1, 'Tag list is required'),
		thumbnail: yup
			.object()
			.nullable()
			.test((value, context) => {
				//require when add, optional when edit
				if (Boolean(initialValues?.id) || Boolean(value?.file)) return true
				return context.createError({
					message: 'Please select image.',
				})
			})
			.test('test-size', 'Size too large ! Please choose image less than 3MB', (value) => {
				const MAX_FILE_SIZE = 3 * 1024 * 1024 //limit size to 3MB
				const fileSize = value?.file?.['size'] || 0
				return fileSize <= MAX_FILE_SIZE
			}),
	})

	const { control, handleSubmit } = useForm<WorkPayload>({
		defaultValues: {
			title: '',
			shortDescription: '',
			tagList: [],
			thumbnail: modeUpdate ? { file: null, previewUrl: initialValues.thumbnailUrl } : null,
			...initialValues,
		},
		resolver: yupResolver(schema),
	})

	async function handleUpdateSubmit(formValues: Partial<WorkPayload>) {
		if (!formValues) return

		const formData = new FormData()
		//id
		if (formValues.id) {
			formData.set('id', formValues.id)
		}
		//thumbnail
		if (formValues.thumbnail) {
			formData.set('thumbnail', formValues.thumbnail.file as Blob)
		}
		//tagList
		formValues.tagList?.forEach((item) => {
			formData.append('tagList', item) // when data type array use append
		})
		//title, shortDescription, fullDescription
		const keyList: Array<keyof Partial<WorkPayload>> = [
			'title',
			'shortDescription',
			'fullDescription',
		]
		keyList.forEach((item) => {
			if (initialValues?.[item] !== formValues[item]) {
				formData.set(item, formValues[item] as string)
			}
		})

		await onSubmit?.(formData)
	}

	return (
		<Box component="form" onSubmit={handleSubmit(handleUpdateSubmit)}>
			<InputField label="Title" name="title" placeholder="Input title" control={control} />

			<InputField
				label="Short description"
				name="shortDescription"
				placeholder="Input short description"
				control={control}
				InputProps={{ multiline: true, rows: 4 }}
			/>

			<AutocompleteField
				label="Tag list"
				name="tagList"
				control={control}
				options={tagList}
				getOptionLabel={(option) => option}
				isOptionEqualToValue={(option, value) => option === value}
			/>

			<PhotoField name="thumbnail" control={control} />

			<EditorField name="fullDescription" control={control} />

			<Box textAlign="center" margin={2}>
				<Button type="submit" variant="outlined">
					{modeUpdate ? 'Update' : 'Create'}
				</Button>
			</Box>
		</Box>
	)
}
