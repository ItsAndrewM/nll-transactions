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
import { teamsColumns } from "@/components/data-table/teams-columns";

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
		<div className="container mx-auto px-4 py-8 pb-20 flex flex-col gap-8">
			<AndaHeader />
			<h2
				className="uppercase text-4xl font-bold md:text-left text-center w-full"
				id="standings"
			>
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Player Stats
				</span>
			</h2>

			<Tabs defaultValue="stats" className="space-y-4 ">
				<TabsList>
					<TabsTrigger value="stats">All Player Stats</TabsTrigger>
					<TabsTrigger value="glossary">Stats Glossary</TabsTrigger>
				</TabsList>
				<TabsContent value="stats" className="space-y-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
						<h3 className="text-xl font-semibold mt-4 mb-2">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								All Positions
							</span>
						</h3>
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
						<h3 className="text-xl font-semibold mt-4 mb-2">
							<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
								Goalies
							</span>
						</h3>
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
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4 justify-start w-full">
					{" "}
					<h3 className="text-xl font-semibold mt-4 mb-2">
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Standings
						</span>
					</h3>
					<Standings standings={standings} />
				</div>
				<div className="flex flex-col gap-4 justify-start w-full">
					<h3 className="text-xl font-semibold mt-4 mb-2">
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Team Stats
						</span>
					</h3>
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4">
						<StatsDataTable
							columns={teamsColumns}
							data={standings}
							defaultSort="position"
							defaultSortDirection="asc"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
