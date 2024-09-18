import StudentDetail from '@/components/swr/student-detail'

function swr() {
	return (
		<div style={{ padding: 20 }}>
			<h4>SWR Playground</h4>
			<StudentDetail studentid="aqbbx1vj1lqrtv3y0" />
			<StudentDetail studentid="aqbbx1vj1lqrtv3y1" />
			<StudentDetail studentid="aqbbx1vj1lqrtv3y2" />
		</div>
	)
}

export default swr
