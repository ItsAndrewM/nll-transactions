import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player } from "@/types/players";
import { CalendarDays, MapPin, Ruler, Weight } from "lucide-react";

export function PlayerDetails({ player }: { player: Player }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Player Details</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2">
					<li className="flex items-center">
						<CalendarDays className="mr-2 h-4 w-4" />
						<span>
							Born: {new Date(player.dateOfBirth).toLocaleDateString()}
						</span>
					</li>
					<li className="flex items-center">
						<MapPin className="mr-2 h-4 w-4" />
						<span>Hometown: {player.hometown}</span>
					</li>
					<li className="flex items-center">
						<Ruler className="mr-2 h-4 w-4" />
						<span>Height: {player.height}</span>
					</li>
					<li className="flex items-center">
						<Weight className="mr-2 h-4 w-4" />
						<span>Weight: {player.weight} lbs</span>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}
