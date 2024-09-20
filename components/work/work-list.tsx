import { WorkCard, WorkSkeleton } from '@/components/work'
import { Work } from '@/models'
import { Box, Divider, Typography } from '@mui/material'
import Image from 'next/image'
import { Fragment } from 'react'

export interface WorkListProps {
	workList: Work[]
	loading?: boolean
}

export default function WorkList({ workList, loading }: WorkListProps) {
	if (loading)
		return (
			<Box>
				{Array.from({ length: 3 }).map((_, index) => (
					<Fragment key={index}>
						<WorkSkeleton />
						<Divider sx={{ my: 3 }} />
					</Fragment>
				))}
			</Box>
		)

	if (workList.length === 0)
		return (
			<Box textAlign="center" mt={8}>
				<Image
					src={
						'https://images.unsplash.com/photo-1725476479171-4728f92dfa9c?q=80&w=500&h=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					}
					width={150}
					height={150}
					layout="fixed"
					alt="no data"
				/>

				<Typography>No data</Typography>
			</Box>
		)

	return (
		<Box>
			{workList.map((work) => (
				<Fragment key={work.id}>
					<WorkCard work={work} />
					<Divider sx={{ my: 3 }} />
				</Fragment>
			))}
		</Box>
	)
}
