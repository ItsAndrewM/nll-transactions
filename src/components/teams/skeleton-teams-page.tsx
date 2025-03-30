import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeamsLoadingSkeleton() {
	const cardSkeletons = Array.from({ length: 8 }, (_, i) => i);

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-4 pb-20">
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16 flex flex-col gap-4">
				<div className="w-full flex flex-col sm:flex-row justify-between items-center pt-2">
					{/* Title skeleton */}
					<Skeleton className="h-12 w-48 mt-4 mb-2" />

					<Separator className="my-4 sm:hidden" />

					{/* Glossary skeleton */}
					<div className="flex flex-col gap-2 justify-center items-start">
						<Skeleton className="h-6 w-24 mb-2" />
						<div className="flex gap-2 items-center">
							<div className="flex gap-2 items-center">
								<Skeleton className="h-9 w-9 rounded-full" />
								<Skeleton className="h-4 w-10" />
							</div>
							<div className="flex gap-2 items-center">
								<Skeleton className="h-9 w-9 rounded-full" />
								<Skeleton className="h-4 w-10" />
							</div>
							<div className="flex gap-2 items-center">
								<Skeleton className="h-9 w-9 rounded-full" />
								<Skeleton className="h-4 w-10" />
							</div>
						</div>
					</div>
				</div>

				{/* Team cards grid skeleton */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{cardSkeletons.map((index) => (
						<div
							key={index}
							className="rounded-xl border shadow w-full max-w-md mx-auto transition-all duration-300 ease-in-out relative bg-background p-6"
						>
							{/* Badge skeleton */}
							<Skeleton className="absolute -top-3 -right-3 h-9 w-9 rounded-full" />

							{/* Team header skeleton */}
							<div className="flex justify-between items-center mb-6">
								<Skeleton className="h-20 w-20 rounded-md" />
								<div className="text-right">
									<Skeleton className="h-8 w-32 mb-2" />
									<Skeleton className="h-4 w-20" />
								</div>
							</div>

							{/* Team stats skeleton */}
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<div className="flex items-center gap-2">
										<Skeleton className="h-6 w-20" />
										<Skeleton className="h-5 w-5 rounded-full" />
									</div>
									<div className="flex items-center gap-2">
										<Skeleton className="h-6 w-16" />
									</div>
								</div>

								{/* Stats grid skeleton */}
								<div className="grid grid-cols-3 gap-4">
									{Array.from({ length: 6 }, (_, statIndex) => (
										<div
											key={statIndex}
											className="p-3 rounded-lg bg-gray-50/80 relative"
										>
											<div>
												<Skeleton className="h-4 w-10 mb-2" />
												<Skeleton className="h-6 w-14" />
											</div>
											{statIndex < 3 && (
												<Skeleton className="rounded-full h-9 w-9 absolute -top-3 -right-3" />
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
