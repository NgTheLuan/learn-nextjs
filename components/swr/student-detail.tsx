import useSWR from 'swr'

interface IStudentDetail {
	studentid: string
}

function StudentDetail({ studentid }: IStudentDetail) {
	const { data, error, mutate, isValidating } = useSWR(`/students/${studentid}`, {
		revalidateOnFocus: false,
	})
	return (
		<div>
			{data?.name || '--'} - {data?.gender || ''} - {data?.age || '--'}
		</div>
	)
}

export default StudentDetail
