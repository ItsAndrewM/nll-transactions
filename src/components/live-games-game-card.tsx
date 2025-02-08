"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
// import useSWR from "swr";
import { env } from "@/env";
import useSWR from "swr";
import { imageUrls } from "@/data/image-urls";

export const fetcher = async (url: string) => {
	const res = await fetch(url);
	if (!res.ok) throw new Error("Failed to fetch game data");
	const data = await res.json();
	return data.scheduleById;
};

export default function LiveGamesGameCard({ game }: { game: OutgoingMatch }) {
	const { data: liveMatch } = useSWR<OutgoingMatch>(
		game.status.typeName === "Live"
			? `${env.NEXT_PUBLIC_API_URL}/schedule/${game.id}`
			: null,
		fetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			fallbackData: game, // Use initial data while loading
			revalidateOnFocus: true,
		}
	);

	const currentMatch = liveMatch || game;

	const { date: matchDate, id, squads, status, venue } = currentMatch || {};

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
		<Card className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative">
			<CardHeader>
				<CardTitle className="text-lg font-semibold text-center flex flex-col gap-2">
					<span>{date}</span>
					<span>{time}</span>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col items-center w-1/3">
						<Image
							src={
								imageUrls.find((img) => img.name === squads.away.displayName)
									?.imageUrl || squads.away.displayName
							}
							alt={squads.away.displayName}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">
							{squads.away.displayName}
						</span>
					</div>
					<div className="flex flex-col items-center justify-center w-1/3">
						<div className="flex items-center gap-2 text-xl font-bold">
							<div
								className={cn(
									(squads.away.score?.score ?? 0) >
										(squads.home.score?.score ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{squads.away.score?.score}
							</div>
							<div>-</div>
							<div
								className={cn(
									(squads.home.score?.score ?? 0) >
										(squads.away.score?.score ?? 0)
										? "text-green-500"
										: "text-red-500"
								)}
							>
								{squads.home.score?.score}
							</div>
						</div>
						<div className="flex flex-col items-center text-sm text-slate-500">
							<span>{status.remainingDisplay}</span>
						</div>
					</div>

					<div className="flex flex-col items-center w-1/3">
						<Image
							src={
								imageUrls.find((img) => img.name === squads.home.displayName)
									?.imageUrl || squads.home.displayName
							}
							alt={squads.home.displayName}
							width={64}
							height={64}
							className="mb-2"
						/>
						<span className="text-sm font-medium text-center">
							{squads.home.displayName}
						</span>
					</div>
				</div>
				<div className="text-center text-sm text-gray-600 mb-2">
					{venue.name}
				</div>
				<div className="flex justify-center">
					<Badge variant={"live"}>{status.typeName}</Badge>
				</div>
			</CardContent>
			<Link
				href={`/games/${id}`}
				className="absolute inset-0 z-[1] cursor-pointer"
				aria-label={`New tab link to ${squads.away.displayName} vs ${squads.home.displayName}`}
				prefetch
			/>
		</Card>
	);
}
