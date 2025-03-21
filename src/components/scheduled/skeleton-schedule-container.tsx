import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ArrowDown } from "lucide-react";

export const LoadingSkeleton = () => {
	return (
		<Tabs defaultValue="all" className="space-y-4">
			<div className="w-full flex justify-center md:justify-start items-center">
				<TabsList>
					<TabsTrigger value="all" className="text-xs lg:text-sm flex xl:gap-1">
						<span>All</span> <span className="hidden xl:block">Games</span>
					</TabsTrigger>
					<TabsTrigger
						value="completed"
						className="text-xs md:text-sm flex xl:gap-1"
					>
						<span>Completed</span>
						<span className="hidden xl:block">Games</span>
					</TabsTrigger>
					<TabsTrigger
						value="scheduled"
						className="text-xs md:text-sm flex xl:gap-1"
					>
						<span>Scheduled</span>{" "}
						<span className="hidden xl:block">Games</span>
					</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value="completed" className="space-y-4">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScrollArea className="h-[75vh]">
						<SkeletonGamesList count={5} />
					</ScrollArea>
				</div>
			</TabsContent>

			<TabsContent value="scheduled">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScrollArea className="h-[75vh]">
						<SkeletonGamesList count={5} />
					</ScrollArea>
				</div>
			</TabsContent>

			<TabsContent value="all">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScrollArea className="h-[75vh]">
						<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Games
							</span>
						</h3>

						<div className="flex items-center space-x-2 my-4 md:px-6">
							<Switch id="recent" />
							<Label
								htmlFor="recent"
								className="flex items-center justify-center gap-2"
							>
								Recent <ArrowDown size={24} />
							</Label>
						</div>

						<SkeletonGamesList count={10} />
					</ScrollArea>
				</div>
			</TabsContent>
		</Tabs>
	);
};

const SkeletonGamesList = ({ count = 5 }: { count?: number }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
			{Array(count)
				.fill(null)
				.map((_, index) => (
					<SkeletonGameCard key={index} />
				))}
		</div>
	);
};

const SkeletonGameCard = () => {
	return (
		<div className="rounded-xl border text-card-foreground shadow w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:shadow-lg relative bg-background">
			<div className="flex flex-col space-y-1.5 p-6">
				<div className="tracking-tight text-lg font-semibold text-center flex flex-col gap-2">
					<Skeleton className="h-6 w-full" />
					<Skeleton className="h-6 w-32 mx-auto" />
				</div>
			</div>
			<div className="p-6 pt-0">
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col items-center w-1/3">
						<Skeleton className="w-16 h-16 rounded-full mb-2" />
						<Skeleton className="h-4 w-24 mb-1" />
						<Skeleton className="h-3 w-16" />
					</div>
					<div className="text-xl font-bold">
						<Skeleton className="h-6 w-10" />
					</div>
					<div className="flex flex-col items-center w-1/3">
						<Skeleton className="w-16 h-16 rounded-full mb-2" />
						<Skeleton className="h-4 w-24 mb-1" />
						<Skeleton className="h-3 w-16" />
					</div>
				</div>
				<div className="text-center mb-2">
					<Skeleton className="h-4 w-32 mx-auto" />
				</div>
				<div className="flex justify-center">
					<Skeleton className="h-6 w-24" />
				</div>
			</div>
		</div>
	);
};
