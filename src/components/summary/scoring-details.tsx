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
import { Badge } from "../ui/badge";

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
						<div className="overflow-x-auto">
							<Table className="relative w-full">
								<TableHeader>
									<TableRow className="w-full grid grid-cols-5 gap-20 sm:gap-4">
										<TableHead className="min-w-0">Score</TableHead>
										<TableHead className="min-w-0">Time</TableHead>
										<TableHead aria-label="Logo" className="min-w-0">
											Team
										</TableHead>
										<TableHead className="min-w-0">Scorer</TableHead>
										<TableHead className="min-w-0">Assists</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{!scoring
										? null
										: scoring[quarter as keyof Scoring]?.map(
												(goal: ScoringGoal, index: number) => {
													const assist = goal.assists.join(", ");
													const mobileAssist = goal.assists
														.map((a) => a.split(". ")[1])
														.join(", ");
													return (
														<TableRow
															key={index}
															className="w-full grid grid-cols-5 gap-20 sm:gap-4"
														>
															<TableCell className="min-w-0 flex items-center gap-2 ">
																<span className="text-nowrap">
																	{goal.awayScore} - {goal.homeScore}
																</span>
																{goal.powerPlay ? (
																	<Badge className="shrink-0">PP</Badge>
																) : null}
															</TableCell>
															<TableCell className="min-w-0">
																<span className="">{goal.time}</span>
															</TableCell>
															<TableCell className="flex items-center relative flex-nowrap gap-2 pr-10 sm:pr-0 min-w-0">
																<Image
																	src={goal.logo}
																	alt={goal.team}
																	width={32}
																	height={32}
																	loading="lazy"
																	decoding="async"
																	className="flex-none w-8 h-8 shrink-0 min-w-8 min-h-8"
																/>
																<span className="hidden sm:block">
																	{goal.team}
																</span>
															</TableCell>

															<TableCell className="min-w-0">
																<span className="block sm:hidden">
																	{goal.scorer.split(". ")[1]}
																</span>
																<span className="hidden sm:block">
																	{goal.scorer}
																</span>
															</TableCell>
															<TableCell className="min-w-0">
																<span className="block sm:hidden">
																	{mobileAssist}
																</span>
																<span className="hidden sm:block">
																	{assist}
																</span>
															</TableCell>
														</TableRow>
													);
												}
										  )}
								</TableBody>
							</Table>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
