/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: [
			'images.unsplash.com',
			'placehold.co',
			'js-post-api.herokuapp.com',
			'res.cloudinary.com',
			'unsplash-assets.imgix.net',
		],
	},
	webpack(config) {
		config.resolve.fallback = {
			// if you miss it, all the other options in fallback, specified
			// by next.js will be dropped.
			...config.resolve.fallback,
			fs: false, // the solution
		}
		return config
	},
}
