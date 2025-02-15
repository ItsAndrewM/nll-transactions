import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Player } from "@/types/players";
import { cn, getPosition } from "@/lib/utils";
import { backgroundColorMap, borderColorMap } from "@/data/color-maps";

export function PlayerCard({ player }: { player: Player }) {
	const [primaryColor] = backgroundColorMap[player.team_code];
	const [secondaryColor] = borderColorMap[player.team_code];

	return (
		<Link href={`/players/${player.id}`} prefetch>
			<div className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-xl">
				<div
					className={cn(
						player.team_code === "CGY" ? "text-black" : "text-white",
						primaryColor,
						secondaryColor,
						"absolute left-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-lg text-2xl font-bold"
					)}
				>
					{player.jerseyNumber || "-"}
				</div>

				<div className="relative h-full w-full">
					<Image
						src={player.headshot.url || "/placeholder.svg"}
						alt={player.fullname}
						fill
						className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						loading="lazy"
						decoding="async"
					/>

					<div
						className={cn(
							`to-black/80`,
							"absolute inset-0 bg-gradient-to-b from-transparent via-transparent"
						)}
					/>
				</div>

				<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
					<Badge
						variant="outline"
						className={cn(
							"mb-2  transition-colors duration-300 text-white",
							player.team_code === "CGY" ? "text-black" : "text-white",
							primaryColor,
							secondaryColor
						)}
					>
						{player.team_name}
					</Badge>
					<h2 className="text-2xl font-bold uppercase tracking-wider flex flex-col">
						<span>{player.firstname}</span>
						<span>{player.surname}</span>
					</h2>
					<div className="w-full flex justify-center items-center">
						<Badge
							variant="outline"
							className="mt-1 text-sm font-semibold tracking-wider text-white/80 border-none backdrop-blur-sm"
						>
							{getPosition(player.position)}
						</Badge>
					</div>
				</div>
			</div>
		</Link>
	);
}
