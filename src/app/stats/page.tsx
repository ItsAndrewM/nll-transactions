import { allRunnerColumns } from "@/components/data-table/all-runners-columns";
import { StatsDataTable } from "@/components/data-table/stats-data-table";
import { getGoalieStats, getStats } from "@/server/stats";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Glossary from "@/components/glossary";

import { Metadata } from "next";
import { AndaHeader } from "@/components/anda-header";
import { allGoalieColumns } from "@/components/data-table/all-goalie-columns";
import { getStandings } from "@/server/standings";
import Standings from "@/components/standings/standings";

export const metadata: Metadata = {
	title: "NLL Stats | Player and Goalie Statistics | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season game statistics, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title:
			"NLL Stats | Player and Goalie Statistics | NLL Tracker by andamonium",
		description:
			"Complete statistics of National Lacrosse League regular season players and goalies.",
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
		title:
			"NLL Stats | Player and Goalie Statistics | NLL Tracker by andamonium",
		description:
			"Complete statistics of National Lacrosse League regular season players and goalies.",
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
		canonical: "/stats",
	},
	keywords:
		"NLL, National Lacrosse League, Box Lacrosse, Game Schedule, Lacrosse Scores, Game Results, Box Scores, Live Scores, Upcoming Games, Stats, Player Stats, Goalie Stats",
	robots: {
		index: true,
		follow: true,
	},
};

export const revalidate = 3600;

export default async function StatsPage() {
	const [allStats, goalieStats, standings] = await Promise.all([
		getStats(),
		getGoalieStats(),
		getStandings(),
	]);

	return (
		<div className="container mx-auto px-4 py-8 pb-20">
			<AndaHeader />
			<h1 className="text-3xl font-bold mb-6 text-center">Player Statistics</h1>

			<Tabs defaultValue="stats" className="space-y-4 ">
				<TabsList>
					<TabsTrigger value="stats">All Player Stats</TabsTrigger>
					<TabsTrigger value="glossary">Stats Glossary</TabsTrigger>
				</TabsList>
				<TabsContent value="stats" className="space-y-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
						<h3 className="text-xl font-semibold mt-4 mb-2">All Positions</h3>
						<div>
							<StatsDataTable
								data={allStats.players}
								columns={allRunnerColumns}
								paginate={true}
								filter={true}
							/>
						</div>
					</div>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
						<h3 className="text-xl font-semibold mt-4 mb-2">Goalies</h3>
						<div>
							<StatsDataTable
								data={goalieStats}
								columns={allGoalieColumns}
								paginate={true}
								filter={true}
								defaultSort="wins"
								defaultSortDirection="desc"
							/>
						</div>
					</div>
				</TabsContent>
				<TabsContent value="glossary">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="p-6">
							<Glossary title="Statistics Glossary" />
						</div>
					</div>
				</TabsContent>
			</Tabs>
			<Standings standings={standings} />
		</div>
	);
}
