import { imageUrls } from "@/data/image-urls";
import { OutgoingMatch } from "@/types/schedule";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { env } from "@/env";
import { liveGameFetcher } from "@/lib/utils";

export default function LiveGameCard({
	match,
	selected,
}: {
	match: OutgoingMatch;
	selected: string;
}) {
	const { data: liveMatch } = useSWR<OutgoingMatch>(
		match.status.typeName === "Live"
			? `${env.NEXT_PUBLIC_API_URL}/schedule/${match.id}`
			: null,
		liveGameFetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			fallbackData: match, // Use initial data while loading
			revalidateOnFocus: true,
		}
	);

	const currentMatch = liveMatch || match;
	return (
		<li key={currentMatch.id} className="relative">
			<div className="absolute inset-0 rounded-lg animate-pulse border border-primary" />
			<div className="px-4 py-6 rounded-md flex sm:flex-row flex-col justify-between items-center relative hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">
				<div className="flex justify-center items-between gap-2 w-fit flex-col">
					<div className="flex justify-between items-center gap-2 w-fit">
						<Image
							className="w-7 h-7"
							src={
								imageUrls.find(
									(img) => img.name === currentMatch.squads.away.displayName
								)?.imageUrl || currentMatch.squads.away.displayName
							}
							alt={currentMatch.squads.away.displayName}
							width={28}
							height={28}
							loading="lazy"
							decoding="async"
						/>
						<p className="font-bold  text-xs">
							{currentMatch.squads.away.name}{" "}
							{currentMatch.squads.away.displayName === selected ? "@" : "vs"}{" "}
							{currentMatch.squads.home.name}
						</p>
						<Image
							className="w-7 h-7"
							src={
								imageUrls.find(
									(img) => img.name === currentMatch.squads.home.displayName
								)?.imageUrl || currentMatch.squads.home.displayName
							}
							alt={currentMatch.squads.away.displayName}
							width={28}
							height={28}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<div className="flex flex-end gap-2 text-sm font-bold">
						<span>Score:</span>
						<span className="text-primary">
							{currentMatch.squads.away.score?.score}
						</span>
						<span>-</span>
						<span className="text-primary">
							{currentMatch.squads.home.score?.score}
						</span>
					</div>
					<div className="text-sm flex items-center justify-center sm:justify-end text-slate-500 font-medium">
						<span>{currentMatch.status.remainingDisplay}</span>
					</div>
				</div>
				<Link
					href={`https://nll.com/game/${currentMatch.id}`}
					target="_blank"
					className="absolute inset-0 z-[1] cursor-pointer"
					aria-label={`New tab link to ${currentMatch.squads.away.displayName} vs ${currentMatch.squads.home.displayName}`}
				/>
			</div>
		</li>
	);
}
