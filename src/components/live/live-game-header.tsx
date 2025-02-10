import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import { imageUrls } from "@/data/image-urls";

export function LiveGameHeader({ gameInfo }: { gameInfo: OutgoingMatch }) {
	const { date: matchDate, id, squads, status, venue } = gameInfo || {};

	const { utcMatchStart } = matchDate || {};
	const date = new Date(utcMatchStart).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const time = new Date(utcMatchStart).toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
		timeZoneName: "short",
	});

	return (
		<Card key={id}>
			<CardHeader>
				<CardTitle className=" font-bold text-center">
					<h3 className="text-2xl">
						{squads?.away?.displayName} vs {squads?.home?.displayName}
					</h3>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="justify-center md:gap-8 flex items-center">
					<div className="flex flex-col items-center">
						<Image
							src={
								imageUrls.find((img) => img.name === squads?.away?.displayName)
									?.imageUrl || squads?.away?.displayName
							}
							alt={squads?.away?.displayName}
							width={100}
							height={100}
							loading="eager"
							decoding="sync"
						/>
					</div>
					<div className="text-center">
						<div className="text-xl font-semibold">{date}</div>
						<span className="text-3xl font-bold mt-2">{time}</span>
						<div className="text-lg">{venue.name}</div>
						<div className="flex gap-2 md:gap-16 justify-center">
							<span
								className={cn(
									(squads.away.score?.score ?? 0) >
										(squads.home.score?.score ?? 0)
										? "text-green-500"
										: "text-red-500",
									(squads.home.score?.score ?? 0) ===
										(squads.away.score?.score ?? 0)
										? "text-primary"
										: "text-primary",
									"text-3xl font-bold mt-2"
								)}
							>
								{squads.away.score?.score ?? 0}
							</span>
							<span className="text-3xl font-bold mt-2">
								{status.remainingDisplay}
							</span>
							<span
								className={cn(
									(squads.home.score?.score ?? 0) >
										(squads.away.score?.score ?? 0)
										? "text-green-500"
										: "text-red-500",
									(squads.home.score?.score ?? 0) ===
										(squads.away.score?.score ?? 0)
										? "text-primary"
										: "text-primary",
									"text-3xl font-bold mt-2"
								)}
							>
								{squads.home.score?.score ?? 0}
							</span>
						</div>
					</div>
					<div className="flex flex-col items-center">
						<Image
							src={
								imageUrls.find((img) => img.name === squads?.home?.displayName)
									?.imageUrl || squads?.home?.displayName
							}
							alt={squads?.home?.displayName}
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
