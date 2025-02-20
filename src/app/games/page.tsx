import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { getSchedule } from "@/server/schedule";
import { OutgoingMatch } from "@/types/schedule";
import LiveIndicator from "@/components/live/live-indicator";
import { Separator } from "@/components/ui/separator";
import { AndaHeader } from "@/components/anda-header";
import { ScheduleTabsViewListCard } from "@/components/scheduled/schedule-tabs-view-list-card";
import { getStandings } from "@/server/standings";
import LiveGamesGameCard from "@/components/live/live-games-game-card";

export const metadata: Metadata = {
	title: "NLL Games | Schedule and Results | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season games, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title: "NLL Games | Schedule and Results",
		description:
			"Complete schedule of National Lacrosse League regular season games, including scores, statistics, and upcoming matches.",
		type: "website",
		images: [
			{
				url: "/og/facebook-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Games Schedule and Results",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "NLL Games | Schedule and Results | NLL Tracker by andamonium",
		description:
			"Complete schedule of National Lacrosse League regular season games, including scores, statistics, and upcoming matches.",
		images: [
			{
				url: "/og/twitter-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Games Schedule and Results",
			},
		],
	},
	alternates: {
		canonical: "/games",
	},
	keywords:
		"NLL, National Lacrosse League, Box Lacrosse, Game Schedule, Lacrosse Scores, Game Results, Box Scores, Live Scores, Upcoming Games",
	robots: {
		index: true,
		follow: true,
	},
};

export const revalidate = 3600;

export default async function Page() {
	const [standings, schedule] = await Promise.all([
		getStandings(),
		getSchedule(),
	]);

	const liveGames: OutgoingMatch[] =
		schedule.filter(
			(game: OutgoingMatch) => game?.status?.typeName === "Live"
		) || [];

	const completedGames: OutgoingMatch[] = schedule.filter(
		(game: OutgoingMatch) => game?.status?.name === "Complete"
	);

	const scheduledGames: OutgoingMatch[] = schedule.filter(
		(game: OutgoingMatch) => game?.status?.name === "Scheduled"
	);

	const allGames: OutgoingMatch[] = schedule;

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<AndaHeader />
			<h2 className="uppercase text-4xl font-bold md:text-left text-center">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Scheduled, Live, and Completed Games
				</span>
			</h2>
			<Tabs defaultValue="all" className="space-y-4">
				<div className="w-full flex justify-center md:justify-start items-center">
					<TabsList>
						<TabsTrigger
							value="all"
							className="text-xs lg:text-sm flex xl:gap-1"
						>
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
						<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center md:px-6">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								Completed Games
							</span>
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{completedGames.map((game: OutgoingMatch) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</div>
				</TabsContent>
				<TabsContent value="scheduled">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center md:px-6">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								Scheduled Games
							</span>
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{scheduledGames.map((game: OutgoingMatch) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</div>
				</TabsContent>
				<TabsContent value="all">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center md:px-6">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Games
							</span>
						</h3>
						{liveGames.length > 0 ? (
							<>
								<h3 className="text-lg font-semibold mt-4 mb-2">
									Live <LiveIndicator />
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
									{liveGames.map((game: OutgoingMatch) => (
										<LiveGamesGameCard game={game} key={game.id} />
									))}
								</div>
								<Separator className="my-4" />
							</>
						) : null}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
							{allGames.map((game: OutgoingMatch) => (
								<ScheduleTabsViewListCard
									game={game}
									standings={standings}
									key={game.id}
								/>
							))}
						</div>
					</div>
				</TabsContent>
				{liveGames.length > 0 ? (
					<TabsContent value="live">
						<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16">
							<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center">
								<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
									Live Games
								</span>
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{liveGames.map((game: OutgoingMatch) => (
									<LiveGamesGameCard game={game} key={game.id} />
								))}
							</div>
						</div>
					</TabsContent>
				) : null}
			</Tabs>
		</div>
	);
}
