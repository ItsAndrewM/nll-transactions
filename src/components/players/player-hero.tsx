import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DynamicBackground } from "./player-dynamic-bg";
import { Player } from "@/types/players";
export function PlayerHero({ player }: { player: Player }) {
	return (
		<div className="col-span-1 md:col-span-3 relative overflow-hidden rounded-lg">
			<div className="w-full h-64 md:h-96 relative">
				{player.background_image ? (
					<div
						className="w-full h-full bg-cover bg-center"
						style={{ backgroundImage: `url(${player.background_image})` }}
					/>
				) : (
					<DynamicBackground player={player} />
				)}

				<div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-start p-6">
					<Avatar className="w-48 h-48 border-4 border-white shadow-lg">
						<AvatarImage
							src={player.headshot.url}
							alt={player.fullname}
							className="object-cover"
						/>
						<AvatarFallback>
							{player.firstname[0]}
							{player.surname[0]}
						</AvatarFallback>
					</Avatar>
					<div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
						<h1 className="text-4xl font-bold text-white">{player.fullname}</h1>
						<p className="text-xl text-white opacity-80">
							{player.position} | #{player.jerseyNumber}
						</p>
						<Badge variant="secondary" className="mt-2">
							{player.team_name}
						</Badge>
					</div>
				</div>
			</div>
		</div>
	);
}
