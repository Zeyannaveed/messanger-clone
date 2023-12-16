/** @type {import('next').NextConfig} */
const nextConfig = {
images:{
    remotePatterns:[
        {
            hostname:"res.cloudinary.com",
        },
        {
            hostname:"avatars.githubcontent.com",
        },
        {
            hostname:"lh3.googleusercontent.com"
        }
    ]
}
}

module.exports = nextConfig
