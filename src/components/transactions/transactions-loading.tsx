import {
	ArrowUpCircle,
	Calendar,
	ChevronDown,
	Filter,
	Search,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

export const LoadingSkeleton = () => {
	return (
		<>
			<div className="flex flex-col gap-6">
				{/* Header with title and controls */}
				<div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
					<h2
						className="uppercase text-4xl font-bold md:text-left text-center"
						id="transactions"
					>
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Transactions
						</span>
					</h2>
					<div className="flex gap-2 w-full md:w-auto">
						<Button
							variant="outline"
							className="flex h-9 items-center justify-between md:w-[250px] w-full bg-card"
						>
							<span style={{ pointerEvents: "none" }}>Select team</span>
							<ChevronDown className="h-4 w-4 opacity-50" />
						</Button>
						<Button variant="outline" size="icon" className="h-9 w-9 bg-card">
							<Filter className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Search input */}
				<div className="relative">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm pl-10 bg-card"
						placeholder="Search transactions..."
					/>
				</div>
			</div>

			{/* Transactions scroll area */}
			<ScrollArea className="h-[600px] rounded-lg border p-4 relative py-6 bg-card">
				<div className="flex flex-col gap-6">
					{/* Repeat this for each date group */}
					{[1, 2, 3, 4, 5].map((dateGroup) => (
						<div key={dateGroup} className="flex flex-col gap-4">
							<div className="sticky top-0 z-10 flex items-center gap-2 py-2 bg-card">
								<Calendar className="h-5 w-5 text-orange-500" />
								<h2 className="text-lg font-semibold">
									<Skeleton className="h-6 w-32" />
								</h2>
							</div>

							{/* Repeat this for team cards within each date */}
							{Array(Math.floor(Math.random() * 3) + 1)
								.fill(0)
								.map((_, teamIdx) => (
									<Card key={teamIdx} className="bg-background">
										<CardHeader className="flex flex-row items-center gap-4 pb-2">
											<div className="flex w-fit gap-2">
												<Skeleton className="w-7 h-7 rounded-full" />
												<Skeleton className="h-5 w-32" />
											</div>
										</CardHeader>
										<CardContent>
											<ul className="ml-4 list-disc space-y-1 text-sm">
												{Array(Math.floor(Math.random() * 4) + 1)
													.fill(0)
													.map((_, moveIdx) => (
														<li key={moveIdx}>
															<Skeleton className="h-4 w-full" />
														</li>
													))}
											</ul>
										</CardContent>
									</Card>
								))}
						</div>
					))}
				</div>

				{/* Load more controls */}
				<div className="flex md:flex-row flex-col justify-center items-center gap-4 w-full p-6">
					<Button>
						<Skeleton className="h-4 w-32" />
					</Button>
					<div className="text-sm text-gray-500">
						<Skeleton className="h-4 w-40" />
					</div>
				</div>
			</ScrollArea>

			{/* Back to top button */}
			<Button
				variant="outline"
				size="sm"
				className="mx-auto flex items-center gap-2"
			>
				<ArrowUpCircle className="h-4 w-4" />
				Back to Top
			</Button>
		</>
	);
};
