import { BoxScore } from "./box-score";
import { PenaltySummary } from "./penalty-summary";
import { PlayerStats } from "../stats/player-stats";
import { GameData, TeamStats as TeamStatsType } from "@/types/games";
import { GameHeader } from "../games/game-header";
import { TeamStats } from "./team-stats";
import { ScoringDetails } from "./scoring-details";
import { GameLeaders } from "../games/game-leaders";

export function PostGameSummary({ gameData }: { gameData: GameData }) {
	const {
		game_info,
		box_score,
		team_stats,
		scoring,
		penalties,
		player_stats,
		game_leaders,
	} = gameData;

	return (
		<div className="container mx-auto px-4 py-8">
			<GameHeader gameInfo={game_info} />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
				<BoxScore boxScore={box_score} gameInfo={game_info} />
				{"fo" in team_stats.home && "fo" in team_stats.away && (
					<TeamStats
						home={team_stats.home as TeamStatsType}
						away={team_stats.away as TeamStatsType}
						gameInfo={game_info}
					/>
				)}
			</div>
			<ScoringDetails scoring={scoring} />
			<PenaltySummary penalties={penalties} />
			<PlayerStats playerStats={player_stats} />
			<GameLeaders gameLeaders={game_leaders} />
		</div>
	);
}
