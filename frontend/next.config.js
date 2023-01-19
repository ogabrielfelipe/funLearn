/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  }, 
  images : {
    domains : ['localhost'] // <== Domain name
  }
}

module.exports = nextConfig
