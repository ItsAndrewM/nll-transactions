"use client";

import { GameData, TeamStats as TeamStatsType } from "@/types/games";
import useSWR from "swr";
import { OutgoingMatch } from "@/types/schedule";
import { env } from "@/env";
import { liveGameFetcher, recrawledFetcher } from "@/lib/utils";
import { BoxScore } from "../summary/box-score";
import { TeamStats } from "../summary/team-stats";
import { ScoringDetails } from "../summary/scoring-details";
import { PenaltySummary } from "../summary/penalty-summary";
import { PlayerStats } from "../stats/player-stats";
import { GameLeaders } from "../games/game-leaders";
import { LiveGameHeader } from "./live-game-header";

export default function LiveGameSummary({
	gameData,
	liveGame,
}: {
	gameData: GameData;
	liveGame: OutgoingMatch;
}) {
	const { data: liveMatch } = useSWR<OutgoingMatch>(
		gameData?.status?.toLowerCase() === "live"
			? `${env.NEXT_PUBLIC_API_URL}/schedule/${gameData.id}`
			: null,
		liveGameFetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			fallbackData: liveGame,
			revalidateOnFocus: true,
		}
	);
	// trigger recrawl depending on status
	const { data: recrawledData } = useSWR<GameData>(
		liveMatch?.status?.typeName === "live"
			? `${env.NEXT_PUBLIC_API_URL}/live/${gameData.id}`
			: null,
		recrawledFetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			fallbackData: gameData,
			revalidateOnFocus: true,
		}
	);

	const liveBoxscore = recrawledData || gameData;

	const {
		game_info,
		box_score,
		team_stats,
		scoring,
		penalties,
		player_stats,
		game_leaders,
	} = liveBoxscore || {};

	const currentMatch = liveMatch || liveGame;

	return (
		<div className="container mx-auto px-4 py-8">
			<LiveGameHeader gameInfo={currentMatch} />
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
