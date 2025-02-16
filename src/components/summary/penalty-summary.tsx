import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Penalty, PenaltyEvent } from "@/types/games";
import Image from "next/image";

export function PenaltySummary({ penalties }: { penalties: Penalty }) {
	const quarters = [
		"First Quarter",
		"Second Quarter",
		"Third Quarter",
		"Fourth Quarter",
	];

	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Penalty Summary</CardTitle>
			</CardHeader>
			<CardContent>
				{quarters.map((quarter) => (
					<div key={quarter} className="mb-4">
						<h3 className="text-lg font-semibold mb-2">{quarter}</h3>
						<Table>
							<TableHeader>
								<TableRow className="w-full grid grid-cols-5 gap-20 sm:gap-4">
									<TableHead aria-label="Logo">Team</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Player</TableHead>
									<TableHead>Duration</TableHead>
									<TableHead>Infraction</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{penalties
									? penalties[quarter as keyof Penalty]?.map(
											(penalty: PenaltyEvent, index: number) => (
												<TableRow
													key={index}
													className="w-full grid grid-cols-5 gap-20 sm:gap-4"
												>
													<TableCell className="flex items-center relative flex-nowrap gap-2 pr-10 sm:pr-0 min-w-0">
														<Image
															src={penalty.logo}
															alt={penalty.team}
															width={32}
															height={32}
															loading="lazy"
															decoding="async"
															className="flex-none w-8 h-8 shrink-0 min-w-8 min-h-8"
														/>

														<span className="hidden sm:block">
															{penalty.team}
														</span>
													</TableCell>
													<TableCell className="w-14">{penalty.time}</TableCell>
													<TableCell>{penalty.player}</TableCell>
													<TableCell>{penalty.duration}</TableCell>
													<TableCell>{penalty.infraction}</TableCell>
												</TableRow>
											)
									  )
									: null}
							</TableBody>
						</Table>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
