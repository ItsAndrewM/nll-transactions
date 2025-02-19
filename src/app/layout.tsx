import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavLayout from "@/components/mobile-layout";
import { Analytics } from "@/components/analytics";
// import { Suspense } from "react";
// import Loading from "@/components/loading";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./error";

const adumuRegular = localFont({
	src: "../fonts/Adumu.ttf",
	style: "normal",
	variable: "--font-adumu-regular",
});

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://nlltracker.com"),
	title: "NLL Tracker by andamonium",
	description: "NLL Transactions, Stats & Updates",
	alternates: {
		canonical: "/",
		languages: {
			"en-US": "/en-US",
		},
	},
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
				<meta property="og:site_name" content="https://nlltracker.com"></meta>
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
				className={`${geistSans.variable} ${geistMono.variable} ${adumuRegular.variable} antialiased`}
			>
				<ErrorBoundary FallbackComponent={ErrorFallback}>
					{/* <Suspense fallback={<Loading />}> */}
					<main className="w-screen h-screen max-h-screen flex flex-col gap-8 row-start-2 items-center sm:items-start relative">
						<NavLayout>{children}</NavLayout>
					</main>
					<Analytics />
					{/* </Suspense> */}
				</ErrorBoundary>
			</body>
		</html>
	);
}
