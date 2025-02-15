import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player } from "@/types/players";

export function PlayerBio({ player }: { player: Player }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Player Bio</CardTitle>
			</CardHeader>
			<CardContent>
				<div dangerouslySetInnerHTML={{ __html: player.bio }} />
			</CardContent>
		</Card>
	);
}
