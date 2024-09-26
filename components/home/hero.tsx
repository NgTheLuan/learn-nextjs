import avatar from '@/images/avatar.jpg'
import { Avatar, Box, Button, Container, Stack, Typography } from '@mui/material'

export default function HeroSection() {
	return (
		<Box>
			<Container>
				<Stack
					spacing={8}
					direction={{ xs: 'column-reverse', md: 'row' }}
					alignItems={{ xs: 'center', md: 'flex-start' }}
					textAlign={{ xs: 'center', md: 'left' }}
				>
					<Box component="section" pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
						<Typography component="h1" variant="h3" fontWeight="bold" mb={{ xs: 3.5, md: 5 }}>
							Hi, I am Shiba, <br />
							Web Developer
						</Typography>

						<Typography mb={{ xs: 3.5, md: 5 }}>
							Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit
							officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud
							amet.
						</Typography>

						<Button variant="contained" size="large">
							Download Resume
						</Button>
					</Box>

					<Box
						sx={{
							minWidth: '240px',
							boxShadow: '-5px 13px',
							color: 'secondary.light',
							borderRadius: '50%',
						}}
					>
						<Avatar
							alt="avatar"
							src={avatar.src}
							sx={{ borderRadius: '50%', width: 240, height: 240 }}
						/>
					</Box>
				</Stack>
			</Container>
		</Box>
	)
}
