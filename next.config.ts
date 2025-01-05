import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "www.nll.com",
				port: "",
				pathname: "/wp-content/uploads/**",
			},
			{
				protocol: "https",
				hostname: "nllmetaserver.aordev.com",
				port: "",
				pathname: "/wp-content/uploads/**",
			},
		],
	},
};

export default nextConfig;
