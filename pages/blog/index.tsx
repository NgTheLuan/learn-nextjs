import { PostItem } from '@/components/blog'
import { Box, Container, Divider } from '@mui/material'
import Link from 'next/link'

export default function BlogListPage() {
	return (
		<Box>
			<Container>
				<h1>Blog</h1>

				<Box component="ul" sx={{ listStyleType: 'none', p: 0 }}>
					{[].map((post: any) => (
						<li key={post.id}>
							<Link href={`/blog/${post.slug}`}>
								<a>
									<PostItem post={post} />
								</a>
							</Link>

							<Divider sx={{ my: 3 }} />
						</li>
					))}
				</Box>
			</Container>
		</Box>
	)
}
