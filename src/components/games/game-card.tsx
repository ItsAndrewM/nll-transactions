import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameState } from "@/types/games";
import Link from "next/link";
import { cn, convertESTtoLocal } from "@/lib/utils";

export function GameCard({ game }: { game: GameState }) {
	const { game_info, team_stats, status, id } = game || {};
	const {
		away: awayTeam,
		home: homeTeam,
		date,
		time,
		finalScore,
		location,
	} = game_info || {};
	const { home: finalHomeScore, away: finalAwayScore } = finalScore || {};
	const { logo: awayLogo, title: awayTitle } = awayTeam || {};
	const { logo: homeLogo, title: homeTitle } = homeTeam || {};
	const { away: awayScore, home: homeScore } = team_stats || {};
	const { wins: awayWins, losses: awayLosses } = awayScore || {};
	const { wins: homeWins, losses: homeLosses } = homeScore || {};
	return (
		<Card className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative bg-background">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-center flex flex-col gap-2">
					<span>{date}</span>
					<span>{convertESTtoLocal(time)}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col items-center w-1/3">
						<Image
							src={awayLogo || "/placeholder.svg"}
							alt={awayTitle}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">{awayTitle}</span>
						{game.status === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({awayWins}-{awayLosses})
							</span>
						) : null}
					</div>
					{game.status === "Complete" ? (
						<div className="flex items-center gap-2 text-xl font-bold">
							<div
								className={cn(
									(finalAwayScore ?? 0) > (finalHomeScore ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{finalAwayScore}
							</div>
							<div>-</div>
							<div
								className={cn(
									(finalHomeScore ?? 0) > (finalAwayScore ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{finalHomeScore}
							</div>
						</div>
					) : (
						<div className="text-xl font-bold">VS</div>
					)}

					<div className="flex flex-col items-center w-1/3">
						<Image
							src={homeLogo || "/placeholder.svg"}
							alt={homeTitle}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">{homeTitle}</span>
						{game.status === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({homeWins}-{homeLosses})
							</span>
						) : null}
					</div>
				</div>
				<div className="text-center text-sm text-gray-600 mb-2">{location}</div>
				<div className="flex justify-center">
					<Badge variant={status === "Scheduled" ? "secondary" : "default"}>
						{status}
					</Badge>
				</div>
			</CardContent>
			<Link
				href={`/games/${id}`}
				className="absolute inset-0 z-1 cursor-pointer"
				aria-label={`New tab link to ${awayTitle} vs ${homeTitle}`}
				prefetch
			/>
		</Card>
	);
}
