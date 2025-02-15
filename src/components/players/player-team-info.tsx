import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player } from "@/types/players";

export function PlayerTeamInfo({ player }: { player: Player }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Information</CardTitle>
			</CardHeader>
			<CardContent>
				<p>Team: {player.team_name}</p>
				<p>Position: {player.position}</p>
				<p>Jersey Number: {player.jerseyNumber}</p>
				<p>Matches this season: {player.matches.season}</p>
			</CardContent>
		</Card>
	);
}
