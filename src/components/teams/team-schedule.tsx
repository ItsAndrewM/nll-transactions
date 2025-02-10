import { OutgoingMatch } from "@/types/schedule";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveIndicator from "../live/live-indicator";
import GamesList from "../games/games-list";
import LiveGamesList from "../live/live-games-list";

export default function TeamSchedule({
	schedule,
}: {
	schedule: OutgoingMatch[];
}) {
	const liveGames =
		schedule.filter((game) => game.status.typeName === "Live") || [];

	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
					Team Schedule
				</h2>
			</CardHeader>
			<CardContent className="space-y-4">
				<Tabs defaultValue="all" className="w-full mx-auto">
					<TabsList>
						<TabsTrigger value="all" className="text-xs  flex xl:gap-1">
							<span>All</span> <span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger value="completed" className="text-xs  flex xl:gap-1">
							<span>Completed</span>
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger value="scheduled" className="text-xs  flex xl:gap-1">
							<span>Scheduled</span>{" "}
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
						{liveGames.length > 0 ? (
							<TabsTrigger value="live" className="text-xs flex xl:gap-1">
								<span>Live</span>{" "}
								<LiveIndicator className="ml-2 block xl:hidden" />
								<span className="hidden xl:block">Games</span>
								<LiveIndicator className="ml-2 hidden xl:block" />
							</TabsTrigger>
						) : null}
					</TabsList>
					<TabsContent value="completed">
						<h3 className="text-lg font-semibold mt-4 mb-2">Completed Games</h3>
						<GamesList
							schedule={schedule.filter(
								(match) => match.status.name === "Complete"
							)}
							selected={""}
							filtered={schedule.filter(
								(match) => match.status.name === "Complete"
							)}
							isHomePage={null}
							className="bg-background"
						/>
					</TabsContent>
					<TabsContent value="scheduled">
						<h3 className="text-lg font-semibold mt-4 mb-2">Scheduled Games</h3>
						<GamesList
							schedule={schedule.filter(
								(match) => match.status.name === "Scheduled"
							)}
							selected={""}
							filtered={schedule.filter(
								(match) => match.status.name === "Scheduled"
							)}
							isHomePage={null}
							className="bg-background"
						/>
					</TabsContent>
					<TabsContent value="all">
						<h3 className="text-lg font-semibold mt-4 mb-2">All Games</h3>
						<GamesList
							schedule={schedule}
							selected={""}
							filtered={schedule}
							isHomePage={null}
							className="bg-background"
						/>
					</TabsContent>
					<TabsContent value="live">
						<h3 className="text-lg font-semibold mt-4 mb-2">Live Games</h3>
						<LiveGamesList
							schedule={liveGames}
							selected={""}
							filtered={liveGames}
							isHomePage={null}
							className="bg-background"
						/>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
