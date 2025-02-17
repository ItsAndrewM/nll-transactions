"use client";

import { GameData, TeamStats as TeamStatsType } from "@/types/games";
import useSWR from "swr";
import { LiveGameData, OutgoingMatch } from "@/types/schedule";
import { env } from "@/env";
import { liveGameFetcher, recrawledFetcher } from "@/lib/utils";
import { BoxScore } from "../summary/box-score";
import { TeamStats } from "../summary/team-stats";
import { ScoringDetails } from "../summary/scoring-details";
import { PenaltySummary } from "../summary/penalty-summary";
import { PlayerStats } from "../stats/player-stats";
import { GameLeaders } from "../games/game-leaders";
import { LiveGameHeader } from "./live-game-header";
import { Standing } from "@/types/standings";

export default function LiveGameSummary({
	gameData,
	liveGame,
	teams,
}: {
	gameData: GameData;
	liveGame: OutgoingMatch;
	teams: { home: Standing; away: Standing };
}) {
	const { data: liveMatch, isLoading: isLiveLoading } = useSWR<OutgoingMatch>(
		`${env.NEXT_PUBLIC_API_URL}/schedule/${gameData.id}`,
		liveGameFetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			fallbackData: liveGame,
			revalidateOnFocus: true,
		}
	);

	console.log(liveMatch?.status?.typeName);
	// trigger recrawl depending on status
	const { data: recrawledData, isLoading: isRecrawlLoading } = useSWR<GameData>(
		`${env.NEXT_PUBLIC_API_URL}/live/${gameData.id}`,
		recrawledFetcher,
		{
			refreshInterval: 10000, // Refresh every 10 seconds
			fallbackData: gameData,
			revalidateOnFocus: true,
		}
	);

	console.log(`${env.NEXT_PUBLIC_API_URL}/live/${gameData.id}`);

	if (isLiveLoading || isRecrawlLoading) {
		return <div>Loading...</div>;
	}

	const liveBoxscore = recrawledData as unknown as LiveGameData;

	console.log("liveBoxscore", liveBoxscore);

	const {
		gameInfo: game_info,
		boxScore: box_score,
		teamStats: team_stats,
		scoring,
		penalties,
		playerStats: player_stats,
		gameLeaders: game_leaders,
	} = liveBoxscore || {};

	const currentMatch = liveMatch || liveGame;

	return (
		<div className="container mx-auto px-4 py-8">
			<LiveGameHeader gameInfo={currentMatch} teams={teams} />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
				{box_score ? (
					<BoxScore boxScore={box_score} gameInfo={game_info} />
				) : null}
				{team_stats && "fo" in team_stats?.home && "fo" in team_stats?.away && (
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
