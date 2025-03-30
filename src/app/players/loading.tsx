import { AndaHeader } from "@/components/anda-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlayerCardContainerSkeleton } from "@/components/players/skeleton-player-card-container";
import { RosterViewSkeleton } from "@/components/players/skeleton-roster-view";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<AndaHeader />

			<h1 className="text-3xl font-bold text-center md:text-left gap-2">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Players
				</span>
			</h1>
			<Tabs defaultValue="player" className="space-y-4">
				<div className="w-full flex justify-center md:justify-start items-center">
					<TabsList>
						<TabsTrigger
							value="player"
							className="text-xs lg:text-sm flex xl:gap-1"
						>
							<span>Player</span> <span className="hidden xl:block">View</span>
						</TabsTrigger>
						<TabsTrigger
							value="roster"
							className="text-xs md:text-sm flex xl:gap-1"
						>
							<span>Roster</span>
							<span className="hidden xl:block">View</span>
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="player" className="space-y-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 pb-16">
						<PlayerCardContainerSkeleton />
					</div>
				</TabsContent>
				<TabsContent value="roster">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 pb-16">
						<RosterViewSkeleton />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
