import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { imageUrls } from "@/data/image-urls";
import { cn, getPosition } from "@/lib/utils";
import { Player } from "@/types/players";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { backgroundColorMap, textColorMap } from "@/data/color-maps";

export function PlayerTeamInfo({ player }: { player: Player }) {
	console.log("player", player);
	const { imageUrl, name } =
		imageUrls.find((url) => url.name.includes(player.team_name)) || {};
	const [primaryColor] = backgroundColorMap[player.team_code];
	const [, secondaryColor] = textColorMap[player.team_code];
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Information</CardTitle>
			</CardHeader>
			<CardContent>
				<Image
					src={imageUrl || "/placeholder.svg"}
					alt={player.team_name}
					width={32}
					height={32}
					className="w-6 h-6 object-contain"
				/>
				<div className="flex gap-4">
					<p>Team: </p>
					<Badge
						variant="secondary"
						className={cn(primaryColor, secondaryColor)}
					>
						{name}
					</Badge>
				</div>
				<div className="flex gap-4">
					<p>Position: </p>
					<div>
						<Badge
							variant="secondary"
							className={cn(primaryColor, secondaryColor)}
						>
							{getPosition(player.position)}
						</Badge>
					</div>
				</div>
				<div className="flex gap-4">
					<p>Number: </p>
					<div>
						<Badge
							variant="secondary"
							className={cn(primaryColor, secondaryColor)}
						>
							{`#${player.jerseyNumber}` || "-"}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
