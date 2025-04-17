/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions:{
        // includePaths: ['./src'],
        prependData: `@import "./src/assets/scss/_var.scss";`
    }
};

export default nextConfig;
