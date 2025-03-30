import { Skeleton } from "../ui/skeleton";
import { PlayerCardSkeleton } from "./skeleton-player-card";

export function PlayerCardContainerSkeleton() {
	return (
		<div className="flex flex-col w-full gap-6">
			<h3 className="text-lg font-semibold mt-4 mb-2">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Player View
				</span>{" "}
			</h3>
			<div className="flex items-center gap-2">
				<Skeleton className="h-9 w-[180px] rounded-md" />
				<Skeleton className="h-9 w-[220px] rounded-md" />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{Array.from({ length: 12 }).map((_, index) => (
					<PlayerCardSkeleton key={index} />
				))}
			</div>
			<div className="mx-auto flex w-full justify-center mt-4">
				<Skeleton className="h-9 w-64 rounded-md" />
			</div>
		</div>
	);
}
