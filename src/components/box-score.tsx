import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Boxscore, GameInfo } from "@/types/games";
import Image from "next/image";

export function BoxScore({
	boxScore,
	gameInfo,
}: {
	boxScore: Boxscore;
	gameInfo: GameInfo;
}) {
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
							<TableCell className="flex flex-nowrap items-center gap-2">
								<Image
									src={gameInfo.away.logo}
									alt={gameInfo.away.title}
									width={32}
									height={32}
									loading="eager"
									decoding="sync"
								/>
								Away
							</TableCell>
							{boxScore.away.map((score: number, index: number) => (
								<TableCell key={index}>{score}</TableCell>
							))}
						</TableRow>
						<TableRow>
							<TableCell className="flex flex-nowrap items-center gap-2">
								<Image
									src={gameInfo.home.logo}
									alt={gameInfo.home.title}
									width={32}
									height={32}
									loading="eager"
									decoding="sync"
								/>
								Home
							</TableCell>
							{boxScore.home.map((score: number, index: number) => (
								<TableCell key={index}>{score}</TableCell>
							))}
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
