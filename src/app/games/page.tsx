import { getGames } from "@/server/games";
import { GameData } from "@/types/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { getSchedule } from "@/server/schedule";
import { OutgoingMatch } from "@/types/schedule";
import LiveIndicator from "@/components/live/live-indicator";
import LiveGamesGameCard from "@/components/live/live-games-game-card";
import { Separator } from "@/components/ui/separator";
import GamesCardList from "@/components/games/games-card-list";

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
	const [games, schedule] = await Promise.all([getGames(), getSchedule()]);

	const liveGames =
		schedule.filter((game: OutgoingMatch) => game.status.typeName === "Live") ||
		[];
	const completedGames = games.filter(
		(game: GameData) =>
			game.status === "Complete" &&
			!liveGames.some(
				(liveGame: OutgoingMatch) => Number(liveGame.id) === Number(game.id)
			)
	);
	const scheduledGames = games.filter(
		(game: GameData) =>
			game.status === "Scheduled" &&
			!liveGames.some(
				(liveGame: OutgoingMatch) => Number(liveGame.id) === Number(game.id)
			)
	);
	const allGames = games.filter(
		(game: GameData) =>
			!liveGames.some(
				(liveGame: OutgoingMatch) => Number(liveGame.id) === Number(game.id)
			)
	);

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6 text-center">
				Upcoming and Completed Regular Season Games
			</h1>
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
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						<GamesCardList gamesList={completedGames} title="Completed" />
					</div>
				</TabsContent>
				<TabsContent value="scheduled">
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						<GamesCardList gamesList={scheduledGames} title="Scheduled" />
					</div>
				</TabsContent>
				<TabsContent value="all">
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						{liveGames.length > 0 ? (
							<>
								<h3 className="text-lg font-semibold mt-4 mb-2">
									Live <LiveIndicator />
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{liveGames.map((game: OutgoingMatch) => (
										<LiveGamesGameCard key={game.id} game={game} />
									))}
								</div>
								<Separator className="my-4" />
							</>
						) : null}
						<GamesCardList gamesList={allGames} title="All" />
					</div>
				</TabsContent>
				{liveGames.length > 0 ? (
					<TabsContent value="live">
						<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
							<h3 className="text-lg font-semibold mt-4 mb-2">Live Games</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{liveGames.map((game: OutgoingMatch) => (
									<LiveGamesGameCard key={game.id} game={game} />
								))}
							</div>
						</div>
					</TabsContent>
				) : null}
			</Tabs>
		</div>
	);
}
