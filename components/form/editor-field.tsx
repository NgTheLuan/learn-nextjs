import { Box, FormHelperText, TextFieldProps, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { LegacyRef, useCallback, useEffect, useRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'
import ReactQuill, { ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ReactQuillWallperProps extends ReactQuillProps {
	forwardedRef: LegacyRef<ReactQuill>
}

const ReactQuillWrapper = dynamic(
	async () => {
		const { default: RG } = await import('react-quill')
		const Component = ({ forwardedRef, ...props }: ReactQuillWallperProps) => {
			return <RG ref={forwardedRef} {...props} />
		}
		return Component
	},
	{ ssr: false }
)

export type EditorFieldProps<T extends FieldValues> = TextFieldProps & {
	name: Path<T>
	control: Control<T>
}

interface CloudinaryWidget {
	open: () => void
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

	const cloudinaryWidgetRef = useRef<CloudinaryWidget | null>(null)
	const editorRef = useRef(null)

	useEffect(() => {
		function initCloudinaryWidget() {
			// check and retry if cloudinary not ready
			// @ts-ignore
			if (!window.cloudinary) {
				console.log('cloudinary not ready, trigger retry in 500ms')
				setTimeout(initCloudinaryWidget, 500)
				return
			}
			console.log('cloudinary is ready')

			// @ts-ignore no type def support yet
			const widget = window.cloudinary?.createUploadWidget(
				{
					cloudName: 'ngtheluan',
					uploadPreset: 'learn-nextjs',
					multiple: false, // restrict upload to a single file
					clientAllowedFormats: ['image'], //restrict uploading to image files only
					maxImageFileSize: 2000000, //restrict file size to less than 2MB
				},

				// @ts-ignore no type support yet
				(error, result) => {
					if (!error && result && result.event === 'success') {
						const quill = editorRef.current // get value
						// @ts-ignore
						const range = quill?.getEditorSelection?.() // get position of cursor

						if (quill && range) {
							// @ts-ignore
							quill.getEditor()?.insertEmbed?.(range.index, 'image', result.info?.secure_url)
						}
					}
				}
			)
			cloudinaryWidgetRef.current = widget
		}
		initCloudinaryWidget()
	}, [])

	const imageHandler = useCallback(() => {
		// ats-ignore no type supl
		if (cloudinaryWidgetRef.current) cloudinaryWidgetRef.current.open?.()
	}, [])

	const modules = {
		toolbar: {
			container: [
				[{ header: [1, 2, 3, 4, 5, false] }],
				[{ color: [] }, { background: [] }],
				['bold', 'italic', 'underline', 'strike', 'blockquote'],
				[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
				['link', 'image'],
				['clean'],
			],
			handlers: {
				image: imageHandler,
			},
		},
	}

	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
		'color',
		'background',
	]

	return (
		<Box sx={{ py: 2 }}>
			<Typography variant="body2">{label}</Typography>
			<Box>
				<ReactQuillWrapper
					forwardedRef={editorRef}
					theme="snow"
					value={value}
					modules={modules}
					formats={formats}
					onChange={(content) => onChange(content)}
				/>
				<FormHelperText error={!!error}>{error?.message}</FormHelperText>
			</Box>
		</Box>
	)
}
