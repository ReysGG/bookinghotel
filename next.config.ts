import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async headers(){
  //   return[
  //     {
  //       source: '/api/payment/notification/:path',
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Origin", value: '*'
  //         }
  //       ]
  //     }
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https', //karna menggunakan image dari google
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'jipnfvj2fx5d2sec.public.blob.vercel-storage.com',
      }
    ]
  }
};

export default nextConfig;
