import { GameCard } from "@/components/game-card";
import { getGames } from "@/server/games";
import { GameData } from "@/types/games";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";

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

export default async function Page() {
	const games = await getGames();
	const completedGames = games
		.filter((game: GameData) => game.status === "Complete")
		.reverse();
	const scheduledGames = games
		.filter((game: GameData) => game.status === "Scheduled")
		.reverse();
	const allGames = games.reverse();
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
					</TabsList>
				</div>
				<TabsContent value="completed" className="space-y-4">
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2">Completed Games</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{completedGames.map((game: GameData) => (
								<GameCard key={game.id} game={game} />
							))}
						</div>
					</div>
				</TabsContent>
				<TabsContent value="scheduled">
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2">Scheduled Games</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{scheduledGames.map((game: GameData) => (
								<GameCard key={game.id} game={game} />
							))}
						</div>
					</div>
				</TabsContent>
				<TabsContent value="all">
					<div className="rounded-lg md:border md:bg-card md:text-card-foreground md:shadow-sm px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2">All Games</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{allGames.map((game: GameData) => (
								<GameCard key={game.id} game={game} />
							))}
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
