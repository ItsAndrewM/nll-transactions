import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, convertESTtoLocal } from "@/lib/utils";
import { GameInfo } from "@/types/games";

export function GameHeader({ gameInfo }: { gameInfo: GameInfo }) {
	const {
		finalScore,
		away: awayTeam,
		home: homeTeam,
		location,
		time,
		date,
	} = gameInfo || {};

	const { logo: awayLogo, title: awayTitle } = awayTeam || {};
	const { logo: homeLogo, title: homeTitle } = homeTeam || {};

	const { home, away } = finalScore || {};

	const homeScoreColor =
		home && away && home > away ? "text-black-500" : "text-slate-500";
	const awayScoreColor =
		home && away && away > home ? "text-black-500" : "text-slate-500";
	return (
		<Card>
			<CardHeader>
				<CardTitle className=" font-bold text-center">
					<h2 className="text-3xl font-bold text-center text-card-foreground mb-6">
						{!finalScore ? "Pre-Game Information" : "Post-Game Summary"}
					</h2>
					<h3 className="text-2xl">
						{awayTitle} vs {homeTitle}
					</h3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="justify-center md:gap-8 flex items-center">
					<div className="flex flex-col items-center">
						<Image
							src={awayLogo || "/placeholder.svg"}
							alt={awayTitle}
							width={100}
							height={100}
							loading="eager"
							decoding="sync"
						/>
					</div>
					<div className="text-center">
						<div className="text-xl font-semibold">{date}</div>
						<div className="text-lg">{location}</div>
						<div className="flex gap-2 md:gap-16 justify-center">
							<span className={cn(awayScoreColor, "text-3xl font-bold mt-2")}>
								{away}
							</span>
							<span className="text-3xl font-bold mt-2">
								{convertESTtoLocal(time)}
							</span>
							<span className={cn(homeScoreColor, "text-3xl font-bold mt-2")}>
								{home}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<Image
							src={homeLogo || "/placeholder.svg"}
							alt={homeTitle}
							width={100}
							height={100}
							loading="eager"
							decoding="sync"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
