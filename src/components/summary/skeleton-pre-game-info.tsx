import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function PreGameSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				{/* Game Header Skeleton */}
				<GameHeaderSkeleton />

				{/* Game Information Skeleton */}
				<Card>
					<CardHeader>
						<CardTitle>Game Information</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<Skeleton className="h-4 w-16" />
										</TableHead>
										<TableHead>
											<div className="flex items-center space-x-2 flex-nowrap">
												<Skeleton className="h-4 w-24" />
											</div>
										</TableHead>
										<TableHead>
											<div className="flex items-center space-x-2 flex-nowrap">
												<Skeleton className="h-4 w-24" />
											</div>
										</TableHead>
										<TableHead>
											<div className="flex items-center space-x-2 text-nowrap">
												<Skeleton className="h-4 w-20" />
											</div>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<Skeleton className="h-4 w-24" />
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2 flex-nowrap">
												<Skeleton className="h-8 w-8 rounded-full" />
												<Skeleton className="h-4 w-32" />
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center space-x-2 flex-nowrap">
												<Skeleton className="h-8 w-8 rounded-full" />
												<Skeleton className="h-4 w-32" />
											</div>
										</TableCell>
										<TableCell>
											<Skeleton className="h-4 w-40" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>

				{/* Team Statistics Skeleton */}
				<Card>
					<CardHeader>
						<CardTitle>Team Statistics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>
											<div className="flex items-center space-x-2 flex-nowrap">
												<Skeleton className="h-4 w-16" />
											</div>
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-8" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-6" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-6" />
										</TableHead>
										<TableHead>
											<div className="flex items-center space-x-2 text-nowrap">
												<Skeleton className="h-4 w-14" />
											</div>
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-8" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-8" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-8" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-12" />
										</TableHead>
										<TableHead>
											<Skeleton className="h-4 w-14" />
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{/* Two rows for the two teams */}
									{Array.from({ length: 2 }).map((_, index) => (
										<TableRow key={index}>
											<TableCell>
												<div className="flex items-center space-x-2 flex-nowrap">
													<Skeleton className="h-8 w-8 rounded-full" />
													<Skeleton className="h-4 w-32" />
												</div>
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-12" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-6" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-10" />
											</TableCell>
											<TableCell>
												<Skeleton className="h-4 w-12" />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

// Game Header Skeleton Component
function GameHeaderSkeleton() {
	return (
		<div className="rounded-xl border bg-card text-card-foreground shadow">
			<div className="flex flex-col space-y-1.5 p-6">
				<div className="leading-none tracking-tight font-bold text-center">
					<h2 className="text-3xl font-bold text-center text-card-foreground mb-6">
						<Skeleton className="h-10 w-64 mx-auto" />
					</h2>
					<h3 className="text-2xl">
						<div className="flex items-center justify-center gap-2">
							<Skeleton className="h-6 w-40" />
							<span className="px-2">vs</span>
							<Skeleton className="h-6 w-40" />
						</div>
					</h3>
				</div>
			</div>
			<div className="p-6 pt-0">
				<div className="justify-center md:gap-8 flex items-center">
					{/* Away Team Logo */}
					<div className="flex flex-col items-center">
						<Skeleton className="h-24 w-24 rounded-full" />
					</div>

					{/* Game Details */}
					<div className="text-center">
						<div className="text-xl font-semibold">
							<Skeleton className="h-6 w-48 mx-auto mb-2" />
						</div>
						<div className="text-lg">
							<Skeleton className="h-5 w-32 mx-auto mb-2" />
						</div>
						<div className="flex gap-2 md:gap-8 justify-center">
							<Skeleton className="h-8 w-16" />
							<Skeleton className="h-8 w-32" />
							<Skeleton className="h-8 w-16" />
						</div>
					</div>

					{/* Home Team Logo */}
					<div className="flex flex-col items-center">
						<Skeleton className="h-24 w-24 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
