import { AndaHeader } from "@/components/anda-header";
import { PlayerCardContainer } from "@/components/players/player-card-container";
import { getAllPlayers } from "@/server/players";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { StatsDataTable } from "@/components/data-table/stats-data-table";

export default async function Page() {
	const allPlayers = await getAllPlayers();

	if (!allPlayers) return notFound();

	const { players, total } = allPlayers || {};
	return (
		<div className="container mx-auto px-4 py-8">
			<AndaHeader />

			<h1 className="text-3xl font-bold mb-6 text-center">Players</h1>
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
						<PlayerCardContainer players={players} total={total} />
					</div>
				</TabsContent>
				<TabsContent value="roster">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16">
						{/* <StatsDataTable /> */}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
