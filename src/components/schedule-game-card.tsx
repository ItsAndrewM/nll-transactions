import { imageUrls } from "@/data/image-urls";
import { OutgoingMatch } from "@/types/schedule";
import Image from "next/image";
import Link from "next/link";

export default function ScheduleGameCard({
	match,
	selected,
}: {
	match: OutgoingMatch;
	selected: string;
}) {
	return (
		<li
			key={match.id}
			className="border px-4 py-6 rounded-md flex sm:flex-row flex-col justify-between items-center relative hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
		>
			<div className="flex justify-center items-between gap-2 w-fit flex-col">
				<div className="flex justify-between items-center gap-2 w-fit">
					<Image
						className="w-7 h-7"
						src={
							imageUrls.find(
								(img) => img.name === match.squads.away.displayName
							)?.imageUrl || match.squads.away.displayName
						}
						alt={match.squads.away.displayName}
						width={28}
						height={28}
						loading="lazy"
						decoding="async"
					/>
					<p className="font-bold sm:text-xs text-[0.65rem] text-nowrap">
						{match.squads.away.name}{" "}
						{match.squads.away.displayName === selected ? "@" : "vs"}{" "}
						{match.squads.home.name}
					</p>
					<Image
						className="w-7 h-7"
						src={
							imageUrls.find(
								(img) => img.name === match.squads.home.displayName
							)?.imageUrl || match.squads.home.displayName
						}
						alt={match.squads.away.displayName}
						width={28}
						height={28}
						loading="lazy"
						decoding="async"
					/>
				</div>
				{match.status.typeName === "Complete" ? (
					<div className="md:flex flex-end gap-2 text-sm hidden">
						{Number(match.date.startDate.split("-")[2]).toString() +
							"/" +
							Number(match.date.startDate.split("-")[1]).toString()}
						<span>-</span>
						<span>
							{new Date(match.date.utcMatchStart).toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
								hour12: true,
								timeZoneName: "short",
							})}
						</span>
					</div>
				) : null}
			</div>
			{match.status.typeName === "Complete" ? (
				<div className="flex flex-end gap-2 text-sm">
					<span>Score:</span>
					<span>{match.squads.away.score?.score}</span>
					<span>-</span>
					<span>{match.squads.home.score?.score}</span>
				</div>
			) : (
				<div className="flex flex-end gap-2 text-sm">
					{Number(match.date.startDate.split("-")[2]).toString() +
						"/" +
						Number(match.date.startDate.split("-")[1]).toString()}
					<span>-</span>
					<span>
						{new Date(match.date.utcMatchStart).toLocaleTimeString("en-US", {
							hour: "numeric",
							minute: "numeric",
							hour12: true,
							timeZoneName: "short",
						})}
					</span>
				</div>
			)}
			<Link
				href={`/games/${match.id}`}
				className="absolute inset-0 z-[1] cursor-pointer"
				aria-label={`New tab link to ${match.squads.away.displayName} vs ${match.squads.home.displayName}`}
				prefetch
			/>
		</li>
	);
}
