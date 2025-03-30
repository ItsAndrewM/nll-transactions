import { Skeleton } from "../ui/skeleton";

export function RosterViewSkeleton() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold mt-4 mb-2">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Roster View
				</span>{" "}
			</h3>
			<div className="rounded-md border bg-background">
				<div className="sm:flex grid grid-cols-2 sm:flex-row gap-2 items-center p-4">
					<Skeleton className="h-10 w-[300px] rounded-md" />
					<Skeleton className="h-10 w-24 ml-auto rounded-md" />
				</div>
				<div className="overflow-hidden">
					<Skeleton className="h-12 w-full" />
					{Array.from({ length: 8 }).map((_, index) => (
						<Skeleton key={index} className="h-14 w-full mt-1" />
					))}
				</div>
				<div className="p-4">
					<Skeleton className="h-9 w-full max-w-lg mx-auto rounded-md" />
				</div>
			</div>
		</div>
	);
}
