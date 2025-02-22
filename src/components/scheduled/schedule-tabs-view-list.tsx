import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveIndicator from "../live/live-indicator";
import { OutgoingMatch } from "@/types/schedule";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ScheduleTabsViewListCard } from "./schedule-tabs-view-list-card";
import { Standing } from "@/types/standings";
import { LiveGridList } from "../live/live-grid-list";

export default function ScheduleTabsViewList({
	schedule,
	standings,
}: {
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	console.log(schedule);
	const liveGames =
		schedule.filter((game) => game?.status?.typeName === "Live") || [];

	const completedGames = schedule.filter(
		(game) => game?.status?.name === "Complete"
	);

	const scheduledGames = schedule.filter(
		(game) => game?.status?.name === "Scheduled"
	);

	console.log(liveGames);

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
					{liveGames.length > 0 ? (
						<TabsTrigger
							value="live"
							className="text-xs md:text-sm flex xl:gap-1"
						>
							<span>Live</span>{" "}
							<LiveIndicator className="ml-2 block xl:hidden" />
							<span className="hidden xl:block">Games</span>
							<LiveIndicator className="ml-2 hidden xl:block" />
						</TabsTrigger>
					) : null}
				</TabsList>
			</div>
			<TabsContent value="completed" className="space-y-4">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Completed Games
						</span>
					</h3>
					<ScrollArea className="h-[75vh]">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{completedGames.map((game) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</TabsContent>
			<TabsContent value="scheduled">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Scheduled Games
						</span>
					</h3>
					<ScrollArea className="h-[75vh]">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{scheduledGames.map((game) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</TabsContent>
			<TabsContent value="all">
				<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
					<ScrollArea className="h-[75vh]">
						{liveGames.length > 0 ? (
							<>
								<LiveGridList standings={standings} fallBackData={liveGames} />
								<Separator className="my-4" />
							</>
						) : null}
						<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Games
							</span>
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{allGames.map((game) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</ScrollArea>
				</div>
			</TabsContent>
			{liveGames.length > 0 ? (
				<TabsContent value="live">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16">
						<LiveGridList standings={standings} fallBackData={liveGames} />
					</div>
				</TabsContent>
			) : null}
		</Tabs>
	);
}
