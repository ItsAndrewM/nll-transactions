import { DataTable } from "../data-table/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PreGameData } from "@/types/games";
import { gameInfoColumns } from "../data-table/pre-game-info-columns";
import { teamStatsColumns } from "../data-table/pre-game-team-stats-columns";
import { GameHeader } from "../games/game-header";

export function PreGameInfo({ data }: { data: PreGameData }) {
	const { game_info, team_stats } = data || {};
	const gameInfoData = [game_info];
	const teamStatsData = [
		{
			...team_stats.away,
			team: game_info.away.title,
			logo: game_info.away.logo,
		},
		{
			...team_stats.home,
			team: game_info.home.title,
			logo: game_info.home.logo,
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-8">
				<GameHeader gameInfo={game_info} />
				<Card>
					<CardHeader>
						<CardTitle>Game Information</CardTitle>
					</CardHeader>
					<CardContent>
						<DataTable columns={gameInfoColumns} data={gameInfoData} />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Team Statistics</CardTitle>
					</CardHeader>
					<CardContent>
						<DataTable columns={teamStatsColumns} data={teamStatsData} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
