import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/mobile-layout";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NLL Tracker by andamonium",
	description: "NLL Transactions, Stats & Updates",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<meta charSet="UTF-8" />

				{/* <!-- Primary Meta Tags --> */}
				<meta name="title" content="NLL Tracker by andamonium" />
				<meta name="description" content="NLL Transactions, Stats & Updates" />

				{/* <!-- DNS prefetch for socials --> */}
				<link rel="dns-prefetch" href="https://github.com" />

				{/* <!-- Preconnect --> */}
				<link
					rel="preconnect"
					href="https://nll-transactions-server.fly.dev/api"
					crossOrigin="anonymous"
				/>

				{/* <!-- Open Graph / Facebook --> */}
				<meta property="og:title" content="NLL Tracker by andamonium" />
				<meta
					property="og:description"
					content="NLL Transactions, Stats & Updates"
				/>
				<meta
					property="og:image"
					content="https://nlltracker.com/og/facebook-og-image.png"
				/>
				<meta property="og:url" content="https://nlltracker.com" />
				<meta property="og:type" content="website" />
				<meta property="twitter:card" content="summary" />
				<meta property="twitter:url" content="https://nlltracker.com" />
				<meta property="twitter:title" content="@andamonium_dev" />
				<meta
					property="twitter:description"
					content="NLL Transactions, Stats & Updates"
				/>
				<meta
					property="twitter:image"
					content="https://nlltracker.com/og/twitter-og-image.png"
				/>
				<meta name="theme-color" content="#242424" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
				/>
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black" />
				<meta httpEquiv="X-Content-Type-Options" content="nosniff" />
				<link rel="icon" type="image/svg+xml" href="/robotman.jpg" />
				<link
					rel="preload"
					as="image"
					href="https://nlltracker.com/og/facebook-og-image.png"
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<main className="w-screen h-screen max-h-screen flex flex-col gap-8 row-start-2 items-center sm:items-start relative">
					<MobileLayout>{children}</MobileLayout>
				</main>
				<Analytics />
			</body>
		</html>
	);
}
