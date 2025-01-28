import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GlossaryItem {
	abbr: string;
	description: string;
}

interface GlossaryProps {
	title?: string;
}

export default function Glossary({
	title = "Statistics Glossary",
}: GlossaryProps) {
	const runnerStats: GlossaryItem[] = [
		{ abbr: "P", description: "Position" },
		{ abbr: "GP", description: "Games Played" },
		{ abbr: "G", description: "Goals" },
		{ abbr: "A", description: "Assists" },
		{ abbr: "PTS", description: "Points" },
		{ abbr: "PIM", description: "Penalty Minutes" },
		{ abbr: "PPG", description: "Power Play Goals" },
		{ abbr: "PPA", description: "Power Play Assists" },
		{ abbr: "SHG", description: "Short Handed Goals" },
		{ abbr: "LB", description: "Loose Ball Recoveries" },
		{ abbr: "TO", description: "Turnovers" },
		{ abbr: "CTO", description: "Caused Turnovers" },
		{ abbr: "BLK", description: "Blocked Shots" },
		{ abbr: "SOG", description: "Shots on Goal" },
		{ abbr: "FO", description: "Faceoff Wins/Faceoffs Taken" },
		{ abbr: "FO%", description: "Faceoff Win Percentage" },
	];

	const goaltenderStats: GlossaryItem[] = [
		{ abbr: "P", description: "Position" },
		{ abbr: "GP", description: "Games Played" },
		{ abbr: "MIN", description: "Minutes Played" },
		{ abbr: "W", description: "Wins" },
		{ abbr: "L", description: "Losses" },
		{ abbr: "GA", description: "Goals Allowed" },
		{ abbr: "GAA", description: "Goals Allowed Average" },
		{ abbr: "SV", description: "Saves" },
		{ abbr: "SV%", description: "Save Percentage" },
	];

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold text-center mb-8">{title}</h1>
			<div className="grid md:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-bold tracking-tight">
							RUNNER STATS:
						</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-4">
							{runnerStats.map((stat) => (
								<div key={stat.abbr} className="flex gap-2">
									<dt className="font-bold min-w-[60px]">{stat.abbr}</dt>
									<dd className="text-muted-foreground">
										– {stat.description}
									</dd>
								</div>
							))}
						</dl>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-xl font-bold tracking-tight">
							GOALTENDER STATS:
						</CardTitle>
					</CardHeader>
					<CardContent>
						<dl className="space-y-4">
							{goaltenderStats.map((stat) => (
								<div key={stat.abbr} className="flex gap-2">
									<dt className="font-bold min-w-[60px]">{stat.abbr}</dt>
									<dd className="text-muted-foreground">
										– {stat.description}
									</dd>
								</div>
							))}
						</dl>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
