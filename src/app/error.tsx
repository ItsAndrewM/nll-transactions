"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
		<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-[#fdf8f6]">
			<div className="max-w-md w-full text-center space-y-6">
				<div className="relative w-24 h-24 mx-auto">
					<Image
						src="/global-error.png"
						alt="Official with NLL Player"
						fill
						className="object-contain"
						priority
					/>
				</div>

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
					<button
						onClick={reset}
						className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-[#ff6934] rounded-md hover:bg-[#e55a2b] transition-colors"
					>
						Try Again
					</button>
					<Link
						href="/"
						className="inline-flex items-center justify-center px-6 py-3 text-base font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					>
						Return Home
					</Link>
				</div>

				{process.env.NODE_ENV === "development" && (
					<div className="mt-4 p-4 bg-gray-100 rounded-md text-left">
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
			</div>
		</div>
	);
}
