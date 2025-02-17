import { AndaHeader } from "@/components/anda-header";
import { PlayerCardContainer } from "@/components/players/player-card-container";
import { getAllPlayers } from "@/server/players";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Metadata } from "next";
import { StatsDataTable } from "@/components/data-table/stats-data-table";
import { allPlayersColumns } from "@/components/data-table/all-players-columns";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserIcon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
	title:
		"NLL Players | Team Rosters & Player Stats | NLL Tracker by andamonium",
	description:
		"Browse National Lacrosse League player profiles, including stats, team affiliations, and career information for all active NLL players. View complete team rosters and player details for every NLL franchise.",
	openGraph: {
		title: "NLL Players | Team Rosters & Player Stats",
		description:
			"Complete player directory for all National Lacrosse League teams, featuring detailed player profiles, statistics, and roster information.",
		type: "website",
		images: [
			{
				url: "/og/facebook-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Players and Team Rosters",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title:
			"NLL Players | Team Rosters & Player Stats | NLL Tracker by andamonium",
		description:
			"Complete player directory for all National Lacrosse League teams, featuring detailed player profiles, statistics, and roster information.",
		images: [
			{
				url: "/og/twitter-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Players and Team Rosters",
			},
		],
	},
	alternates: {
		canonical: "/players",
	},
	keywords:
		"NLL Players, National Lacrosse League Rosters, Box Lacrosse Players, Team Rosters, Player Statistics, Player Profiles, NLL Athletes, Professional Lacrosse Players, Box Lacrosse Athletes, NLL Team Members",
	robots: {
		index: true,
		follow: true,
	},
};

export default async function Page() {
	const allPlayers = await getAllPlayers();

	if (!allPlayers) return notFound();

	const { players, total } = allPlayers || {};
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<AndaHeader />

			<div className="max-w-md w-full mx-auto rounded-lg border bg-card text-card-foreground shadow-sm ">
				<h1 className="text-3xl font-bold text-center p-8 flex justify-center items-center gap-2">
					<HugeiconsIcon icon={UserIcon} size={30} strokeWidth={0.5} />
					Players
				</h1>
			</div>

			<Tabs defaultValue="player" className="space-y-4">
				<div className="w-full flex justify-center md:justify-start items-center">
					<TabsList>
						<TabsTrigger
							value="player"
							className="text-xs lg:text-sm flex xl:gap-1"
						>
							<span>Player</span> <span className="hidden xl:block">View</span>
						</TabsTrigger>
						<TabsTrigger
							value="roster"
							className="text-xs md:text-sm flex xl:gap-1"
						>
							<span>Roster</span>
							<span className="hidden xl:block">View</span>
						</TabsTrigger>
					</TabsList>
				</div>
				<TabsContent value="player" className="space-y-4">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 pb-16">
						<Suspense fallback={<div>Loading...</div>}>
							<PlayerCardContainer players={players} total={total} />
						</Suspense>
					</div>
				</TabsContent>
				<TabsContent value="roster">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 pb-16">
						<StatsDataTable
							data={players}
							columns={allPlayersColumns}
							paginate={true}
							filter={true}
							defaultSort="player"
							defaultSortDirection="desc"
							filterValue="player"
							filterConfig={{ path: "name" }}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
