import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scoring, ScoringGoal } from "@/types/games";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface ScoringDetailsProps {
	scoring: Scoring;
}

export function ScoringDetails({ scoring }: ScoringDetailsProps) {
	const quarters = [
		"First Quarter",
		"Second Quarter",
		"Third Quarter",
		"Fourth Quarter",
	];

	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Scoring Details</CardTitle>
			</CardHeader>
			<CardContent>
				{quarters.map((quarter) => (
					<div key={quarter} className="mb-4">
						<h3 className="text-lg font-semibold mb-2">{quarter}</h3>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead aria-label="Logo"></TableHead>
									<TableHead>Time</TableHead>
									<TableHead
										aria-label="Power Play"
										className="w-14"
									></TableHead>
									<TableHead>Scorer</TableHead>
									<TableHead>Assists</TableHead>
									<TableHead>Team</TableHead>
									<TableHead>Score</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{scoring[quarter as keyof Scoring]?.map(
									(goal: ScoringGoal, index: number) => (
										<TableRow key={index}>
											<TableCell className="w-14">
												<Image
													src={goal.logo}
													alt={goal.team}
													width={32}
													height={32}
												/>
											</TableCell>
											<TableCell className="w-14">{goal.time}</TableCell>
											<TableCell className="w-14">
												{goal.powerPlay ? <Badge>PP</Badge> : null}
											</TableCell>
											<TableCell>{goal.scorer}</TableCell>
											<TableCell>{goal.assists.join(", ")}</TableCell>
											<TableCell>{goal.team}</TableCell>
											<TableCell>
												{goal.awayScore} - {goal.homeScore}
											</TableCell>
										</TableRow>
									)
								)}
							</TableBody>
						</Table>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
