import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, getIANATimezone, getLocalDate, getLocalTime } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import { imageUrls } from "@/data/image-urls";
import { Standing } from "@/types/standings";
export function ScheduleTabsViewListCard({
	game,
	standings,
}: {
	game: OutgoingMatch;
	standings: Standing[];
}) {
	console.log(game);
	const { squads, date: matchDate, status, id, venue } = game || {};
	const { away: awayTeam, home: homeTeam } = squads || {};
	const { name, typeName } = status || {};
	const { startDate, utcMatchStart } = matchDate || {};
	const awayLogo = imageUrls.find(
		(img) => img.name === awayTeam.displayName
	)?.imageUrl;
	const homeLogo = imageUrls.find(
		(img) => img.name === homeTeam.displayName
	)?.imageUrl;
	const awayTitle = awayTeam.displayName;
	const homeTitle = homeTeam.displayName;
	const { score: awayScore, id: awayId } = awayTeam || {};
	const { score: homeScore, id: homeId } = homeTeam || {};
	const { score: awayScoreGoals } = awayScore || {};
	const { score: homeScoreGoals } = homeScore || {};

	const awayStanding = standings?.find(
		(standing) => standing.team_id === awayId
	);
	const homeStanding = standings?.find(
		(standing) => standing.team_id === homeId
	);

	const { wins: awayWins, losses: awayLosses } = awayStanding || {};
	const { wins: homeWins, losses: homeLosses } = homeStanding || {};

	// Map venue timezone to valid IANA format
	const venueTimezone = getIANATimezone(venue?.timeZone);

	// Get user's local time
	const localTime = getLocalTime(utcMatchStart, venueTimezone);
	const date = getLocalDate(utcMatchStart, venueTimezone);

	return (
		<Card
			key={id}
			className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative bg-background"
		>
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-center flex flex-col gap-2">
					<span>{date}</span>
					<span>{localTime}</span>
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
						{name === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({awayWins}-{awayLosses})
							</span>
						) : null}
					</div>
					{name === "Complete" || typeName === "Live" ? (
						<div className="flex items-center gap-2 text-xl font-bold">
							<div
								className={cn(
									(awayScoreGoals ?? 0) > (homeScoreGoals ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{awayScoreGoals}
							</div>
							<div>-</div>
							<div
								className={cn(
									(homeScoreGoals ?? 0) > (awayScoreGoals ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{homeScoreGoals}
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
						{name === "Scheduled" ? (
							<span className="text-xs text-gray-500">
								({homeWins}-{homeLosses})
							</span>
						) : null}
					</div>
				</div>
				<div className="text-center text-sm text-gray-600 mb-2">
					{venue.name}
				</div>
				<div className="flex justify-center">
					<Badge variant={name === "Scheduled" ? "secondary" : "default"}>
						{name}
					</Badge>
				</div>
			</CardContent>
			<Link
				href={`/games/${id}`}
				className="absolute inset-0 z-[1] cursor-pointer"
				aria-label={`New tab link to ${awayTitle} vs ${homeTitle}`}
				prefetch
			/>
		</Card>
	);
}
