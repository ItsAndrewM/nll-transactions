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
								<TableRow>
									<TableHead aria-label="Logo"></TableHead>
									<TableHead>Time</TableHead>
									<TableHead className="w-14"></TableHead>
									<TableHead>Player</TableHead>
									<TableHead>Team</TableHead>
									<TableHead>Duration</TableHead>
									<TableHead>Infraction</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{penalties[quarter as keyof Penalty]?.map(
									(penalty: PenaltyEvent, index: number) => (
										<TableRow key={index}>
											<TableCell className="w-14">
												<Image
													src={penalty.logo}
													alt={penalty.team}
													width={32}
													height={32}
												/>
											</TableCell>
											<TableCell className="w-14">{penalty.time}</TableCell>
											<TableCell className="w-14"></TableCell>
											<TableCell>{penalty.player}</TableCell>
											<TableCell>{penalty.team}</TableCell>
											<TableCell>{penalty.duration}</TableCell>
											<TableCell>{penalty.infraction}</TableCell>
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
