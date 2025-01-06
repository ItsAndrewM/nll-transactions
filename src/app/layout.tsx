import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/mobile-layout";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "NLL Transactions, Schedule, and Standings",
	description: "NLL Transactions, Schedule, and Standings",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<main className="w-screen h-screen max-h-screen flex flex-col gap-8 row-start-2 items-center sm:items-start relative">
					<MobileLayout>{children}</MobileLayout>
				</main>
			</body>
		</html>
	);
}
