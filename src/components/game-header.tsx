import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GameInfo } from "@/types/games";

export function GameHeader({ gameInfo }: { gameInfo: GameInfo }) {
	const { finalScore } = gameInfo || {};
	const { home = 0, away = 0 } = finalScore || {};

	const homeScoreColor = home > away ? "text-black-500" : "text-slate-500";
	const awayScoreColor = away > home ? "text-black-500" : "text-slate-500";
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl font-bold text-center">
					{gameInfo.away.title} vs {gameInfo.home.title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center">
					<div className="flex flex-col items-center">
						<Image
							src={gameInfo.away.logo || "/placeholder.svg"}
							alt={gameInfo.away.title}
							width={100}
							height={100}
						/>
					</div>
					<div className="text-center">
						<div className="text-xl font-semibold">{gameInfo.date}</div>
						<div className="text-lg">{gameInfo.location}</div>
						<div className="flex gap-2 md:gap-16 justify-center">
							<span className={cn(awayScoreColor, "text-3xl font-bold mt-2")}>
								{away}
							</span>
							<span className="text-3xl font-bold mt-2">{gameInfo.time}</span>
							<span className={cn(homeScoreColor, "text-3xl font-bold mt-2")}>
								{home}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<Image
							src={gameInfo.home.logo || "/placeholder.svg"}
							alt={gameInfo.home.title}
							width={100}
							height={100}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
