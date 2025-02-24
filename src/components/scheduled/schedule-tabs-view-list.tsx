import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutgoingMatch } from "@/types/schedule";
import { ScrollArea } from "../ui/scroll-area";
import { Standing } from "@/types/standings";
import { LiveGamesAllGames } from "../live/live-games-all-games";
import { LiveGamesTabContent } from "../live/live-games-tab-content";
import { LiveGamesTrigger } from "../live/live-games-trigger";
import { ScheduleTabsViewListContentAll } from "./schedule-tabs-view-list-content-all";
import { ScheduleTabsViewListContentScroll } from "./schedule-tabs-view-list-content-scroll";

export default function ScheduleTabsViewList({
	schedule,
	standings,
}: {
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const liveGames =
		schedule.filter((game) => game?.status?.typeName === "Live") || [];

	const completedGames = schedule.filter(
		(game) => game?.status?.name === "Complete"
	);

	const scheduledGames = schedule.filter(
		(game) => game?.status?.name === "Scheduled"
	);

	const allGames = schedule;

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
					<LiveGamesTrigger />
				</TabsList>
			</div>
			<TabsContent value="completed" className="space-y-4">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScheduleTabsViewListContentScroll
						games={completedGames}
						standings={standings}
						title="Completed"
					/>
				</div>
			</TabsContent>
			<TabsContent value="scheduled">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScheduleTabsViewListContentScroll
						games={scheduledGames}
						standings={standings}
						title="Scheduled"
					/>
				</div>
			</TabsContent>
			<TabsContent value="all">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScrollArea className="h-[75vh]">
						<LiveGamesAllGames standings={standings} liveGames={allGames} />
						<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Games
							</span>
						</h3>
						<ScheduleTabsViewListContentAll
							games={allGames}
							standings={standings}
						/>
					</ScrollArea>
				</div>
			</TabsContent>
			<LiveGamesTabContent standings={standings} liveGames={liveGames} />
		</Tabs>
	);
}
