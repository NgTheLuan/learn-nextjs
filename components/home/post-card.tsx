import { Post } from '@/models/post'
import { Card, CardContent } from '@mui/material'
import { PostItem } from '../blog'

interface PostCardProps {
	post: Post
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<Card>
			<CardContent>
				<PostItem post={post} />
			</CardContent>
		</Card>
	)
}
