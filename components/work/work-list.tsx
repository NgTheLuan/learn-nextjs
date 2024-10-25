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
			<Box marginY={4}>
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
			<Box textAlign="center" marginY={4}>
				<Image
					src={
						'https://unsplash-assets.imgix.net/empty-states/photos.png?auto=format&fit=crop&q=60'
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
		<Box marginY={4}>
			{workList.map((work) => (
				<Fragment key={work.id}>
					<WorkCard work={work} />
					<Divider sx={{ my: 3 }} />
				</Fragment>
			))}
		</Box>
	)
}
