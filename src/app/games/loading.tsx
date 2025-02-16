import { SkeletonGameCard } from "@/components/games/skeleton-game-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Loading() {
	return (
		<Tabs defaultValue="all" className="space-y-4">
			<TabsContent value="completed" className="space-y-4">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16">
					<Skeleton className="h-7 w-44 rounded-md" />
					<Skeleton className="h-7 w-44 rounded-md" />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
						<SkeletonGameCard />
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
