import { GameHeader } from "./game-header";
import { BoxScore } from "./box-score";
import { TeamStats } from "./team-stats";
import { ScoringDetails } from "./scoring-details";
import { PenaltySummary } from "./penalty-summary";
import { PlayerStats } from "./player-stats";
import { GameLeaders } from "./game-leaders";
import { GameData } from "@/types/games";

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
				<BoxScore boxScore={box_score} />
				<TeamStats home={team_stats.home} away={team_stats.away} />
			</div>
			<ScoringDetails scoring={scoring} />
			<PenaltySummary penalties={penalties} />
			<PlayerStats playerStats={player_stats} />
			<GameLeaders gameLeaders={game_leaders} />
		</div>
	);
}
