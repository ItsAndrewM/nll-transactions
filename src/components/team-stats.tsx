import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamStatsTeam } from "@/types/games";

interface TeamStatsProps {
	home: TeamStatsTeam;
	away: TeamStatsTeam;
}

export function TeamStats({ home, away }: TeamStatsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Stat</TableHead>
							<TableHead>Away</TableHead>
							<TableHead>Home</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Face-offs</TableCell>
							<TableCell>{away.fo}</TableCell>
							<TableCell>{home.fo}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Power Plays</TableCell>
							<TableCell>{away.pp}</TableCell>
							<TableCell>{home.pp}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Penalty Minutes</TableCell>
							<TableCell>{away.pim}</TableCell>
							<TableCell>{home.pim}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Shots on Goal</TableCell>
							<TableCell>{away.sog}</TableCell>
							<TableCell>{home.sog}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
