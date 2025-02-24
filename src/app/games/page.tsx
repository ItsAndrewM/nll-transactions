import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Metadata } from "next";
import { getSchedule } from "@/server/schedule";
import { OutgoingMatch } from "@/types/schedule";
import { AndaHeader } from "@/components/anda-header";
import { getStandings } from "@/server/standings";
import { LiveGamesTrigger } from "@/components/live/live-games-trigger";
import { LiveGamesTabContent } from "@/components/live/live-games-tab-content";
import { LiveGamesAllGames } from "@/components/live/live-games-all-games";
import { ScheduleTabsViewListContent } from "@/components/scheduled/schedule-tabs-view-list-content";
import { ScheduleTabsViewListContentAll } from "@/components/scheduled/schedule-tabs-view-list-content-all";

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
						<LiveGamesTrigger />
					</TabsList>
				</div>
				<TabsContent value="completed" className="space-y-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
						<ScheduleTabsViewListContent
							games={completedGames}
							standings={standings}
							title="Completed"
						/>
					</div>
				</TabsContent>
				<TabsContent value="scheduled">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
						<ScheduleTabsViewListContent
							games={scheduledGames}
							standings={standings}
							title="Completed"
						/>
					</div>
				</TabsContent>
				<TabsContent value="all">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm md:px-6 pb-16">
						<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center md:px-6">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Games
							</span>
						</h3>
						<LiveGamesAllGames standings={standings} liveGames={liveGames} />
						<ScheduleTabsViewListContentAll
							games={allGames}
							standings={standings}
						/>
					</div>
				</TabsContent>
				<LiveGamesTabContent standings={standings} liveGames={liveGames} />
			</Tabs>
		</div>
	);
}
