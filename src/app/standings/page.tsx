import { AndaHeader } from "@/components/anda-header";
import { StatsDataTable } from "@/components/data-table/stats-data-table";
import { teamsColumns } from "@/components/data-table/teams-columns";
import Standings from "@/components/standings/standings";
import { getStandings } from "@/server/standings";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "NLL Standings | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season standings, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title: "NLL Standings | NLL Tracker by andamonium",
		description:
			"Complete standings of National Lacrosse League regular season teams.",
		type: "website",
		images: [
			{
				url: "/og/facebook-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Team Standings",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "NLL Standings | NLL Tracker by andamonium",
		description:
			"Complete standings of National Lacrosse League regular season teams.",
		images: [
			{
				url: "/og/twitter-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Team Standings",
			},
		],
	},
	alternates: {
		canonical: "/standings",
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
	const standings = await getStandings();
	return (
		<div className="mx-auto px-4 py-8 pb-20 flex flex-col gap-4 items-center">
			<AndaHeader />

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="flex flex-col gap-4 justify-start w-full">
					{" "}
					<h2
						className="uppercase text-4xl font-bold md:text-left text-center w-full px-6"
						id="standings"
					>
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Standings
						</span>
					</h2>
					<Standings standings={standings} />
				</div>
				<div className="flex flex-col gap-4 justify-start w-full">
					<h2
						className="uppercase text-4xl font-bold md:text-left text-center w-full "
						id="standings"
					>
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Team Stats
						</span>
					</h2>
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
