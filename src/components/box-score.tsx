import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxscore } from "@/types/games";

export function BoxScore({ boxScore }: { boxScore: Boxscore }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Box Score</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Team</TableHead>
							<TableHead>1st</TableHead>
							<TableHead>2nd</TableHead>
							<TableHead>3rd</TableHead>
							<TableHead>4th</TableHead>
							<TableHead>Final</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Away</TableCell>
							{boxScore.away.map((score: number, index: number) => (
								<TableCell key={index}>{score}</TableCell>
							))}
							<TableCell>{boxScore.away.reduce((a, b) => a + b, 0)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Home</TableCell>
							{boxScore.home.map((score: number, index: number) => (
								<TableCell key={index}>{score}</TableCell>
							))}
							<TableCell>{boxScore.home.reduce((a, b) => a + b, 0)}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
