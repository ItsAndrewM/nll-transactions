import { notFound } from "next/navigation";
import { PlayerHero } from "@/components/players/player-hero";
import { PlayerDetails } from "@/components/players/player-details";
import { PlayerTeamInfo } from "@/components/players/player-team-info";
import { PlayerBio } from "@/components/players/player-bio";
import { PlayerSocials } from "@/components/players/player-socials";
import { getPlayer } from "@/server/players";
import { AndaHeader } from "@/components/anda-header";
import { getPlayerStats } from "@/server/stats";
import { StatsDataTable } from "@/components/data-table/stats-data-table";
import { allRunnerColumns } from "@/components/data-table/all-runners-columns";
import { Player } from "@/types/players";
import { allGoalieColumns } from "@/components/data-table/all-goalie-columns";

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const [player, playerStats] = await Promise.all([
		getPlayer(params.id),
		getPlayerStats(params.id),
	]);
	if (!player || !playerStats) {
		notFound();
	}
	const { bio, position } = (player as Player) || {};
	return (
		<div className="container mx-auto px-4 py-8 pb-20">
			<AndaHeader />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<PlayerHero player={player} />
				<PlayerDetails player={player} />
				<PlayerTeamInfo player={player} />
				{bio ? <PlayerBio player={player} /> : null}
			</div>

			{/* Social Media Links */}
			<PlayerSocials player={player} />
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex-col flex gap-4">
				<h3 className="text-xl font-semibold ">
					2024-25 {position === "G" ? "Goalie" : "Player"} Stats
				</h3>
				<StatsDataTable
					data={[playerStats]}
					columns={position !== "G" ? allRunnerColumns : allGoalieColumns}
				/>
			</div>
		</div>
	);
}
