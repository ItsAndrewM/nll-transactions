import { Skeleton } from "@/components/ui/skeleton";

export function PlayerCardSkeleton() {
	return (
		<div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
			<div className="text-white absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold">
				<Skeleton className="h-12 w-12 rounded-lg" />
			</div>
			<div className="relative h-full w-full">
				<Skeleton className="h-full w-full absolute inset-0" />
				<div className="to-black/80 absolute inset-0 bg-gradient-to-b from-transparent via-transparent"></div>
			</div>
			<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
				<Skeleton className="h-6 w-24 mb-2 rounded-md" />
				<div className="space-y-2">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-8 w-40" />
				</div>
				<div className="w-full flex justify-center items-center mt-2">
					<Skeleton className="h-6 w-20 rounded-md" />
				</div>
			</div>
		</div>
	);
}
