"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AndaHeader } from "@/components/anda-header";

export default function ErrorFallback({ error }: { error: Error }) {
	return <Error error={error} reset={() => window.location.reload()} />;
}

function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Application error:", error);
	}, [error]);

	return (
		<div className="min-h-[calc(100vh-4rem)] flex flex-col items-start justify-center p-4 w-full max-w-3xl mx-auto">
			<AndaHeader />
			<Card className="container px-4 py-8 text-center ">
				<div className="space-y-3">
					<h1 className="text-4xl font-bold text-gray-900">
						Penalty on the Play!
					</h1>
					<p className="text-lg text-gray-600">
						We&apos;ve hit an unexpected obstacle. Our officials are reviewing
						the situation.
					</p>
				</div>

				<div className="flex items-center justify-center gap-4">
					<Button onClick={reset}>Try Again</Button>
					<Button asChild variant="secondary">
						<Link
							href="/"
							className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
						>
							Return Home
						</Link>
					</Button>
				</div>

				{process.env.NODE_ENV === "development" && (
					<div className="mt-4 p-4 bg-gray-100 rounded-md text-left max-w-md mx-auto">
						<p className="text-sm font-mono text-gray-700 break-all">
							{error.message}
						</p>
						{error.digest && (
							<p className="text-xs text-gray-500 mt-2">
								Error ID: {error.digest}
							</p>
						)}
					</div>
				)}
			</Card>
		</div>
	);
}
