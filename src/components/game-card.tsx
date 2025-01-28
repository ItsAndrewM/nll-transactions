import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameState } from "@/types/games";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function GameCard({ game }: { game: GameState }) {
	return (
		<Card className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-center">
					{game.game_info.date} - {game.game_info.time}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col items-center w-1/3">
						<Image
							src={game.game_info.away.logo || "/placeholder.svg"}
							alt={game.game_info.away.title}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">
							{game.game_info.away.title}
						</span>
						{game.status === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({game.team_stats.away.wins}-{game.team_stats.away.losses})
							</span>
						) : null}
					</div>
					{game.status === "Complete" ? (
						<div className="flex items-center gap-2 text-xl font-bold">
							<div
								className={cn(
									(game.game_info.finalScore?.away ?? 0) >
										(game.game_info.finalScore?.home ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{game.game_info.finalScore?.away}
							</div>
							<div>-</div>
							<div
								className={cn(
									(game.game_info.finalScore?.home ?? 0) >
										(game.game_info.finalScore?.away ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{game.game_info.finalScore?.home}
							</div>
						</div>
					) : (
						<div className="text-xl font-bold">VS</div>
					)}

					<div className="flex flex-col items-center w-1/3">
						<Image
							src={game.game_info.home.logo || "/placeholder.svg"}
							alt={game.game_info.home.title}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">
							{game.game_info.home.title}
						</span>
						{game.status === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({game.team_stats.home.wins}-{game.team_stats.home.losses})
							</span>
						) : null}
					</div>
				</div>
				<div className="text-center text-sm text-gray-600 mb-2">
					{game.game_info.location}
				</div>
				<div className="flex justify-center">
					<Badge
						variant={game.status === "Scheduled" ? "secondary" : "default"}
					>
						{game.status}
					</Badge>
				</div>
			</CardContent>
			<Link
				href={`/games/${game.id}`}
				className="absolute inset-0 z-[1] cursor-pointer hover:"
				aria-label={`New tab link to ${game.game_info.away.title} vs ${game.game_info.home.title}`}
				prefetch
			/>
		</Card>
	);
}
