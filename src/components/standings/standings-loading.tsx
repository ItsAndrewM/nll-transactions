import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
	// Create an array of 14 items to represent the teams
	const teams = Array(14).fill(null);

	return (
		<Card className="w-full flex flex-col items-center justify-start text-center relative px-6 pb-24 md:pb-0 max-w-3xl mx-auto bg-card">
			<CardHeader className="flex gap-4 items-center justify-between w-full py-4 relative flex-nowrap flex-col">
				<h2 className="text-xl text-center font-bold w-full">
					2024-25 Standings
				</h2>
			</CardHeader>
			<Separator className="mb-4" />
			<div className="w-full flex flex-col gap-4 items-center justify-center">
				<ul className="w-full text-left list-inside px-2 flex flex-col gap-2">
					<li className="w-full flex justify-between items-center">
						<p className="font-bold text-center">Team</p>
						<p className="font-bold text-center">GB</p>
					</li>

					{teams.map((_, index) => (
						<li
							key={index}
							className="w-full flex justify-between items-center px-0 py-2 border-b border-secondary last:my-4 last:border-b-0 dark:border-gray-800"
						>
							<div className="flex flex-row justify-between gap-2 w-full">
								<p className="font-bold">
									<Skeleton className="h-5 w-5" />
								</p>
								<Skeleton className="w-7 h-7 rounded-full" />
								<div className="flex flex-col gap-1">
									<Skeleton className="h-5 w-32" />
								</div>
								<Skeleton className="h-5 w-16" />
							</div>
							<Skeleton className="h-5 w-8 ml-4" />
						</li>
					))}
				</ul>
			</div>
		</Card>
	);
}
