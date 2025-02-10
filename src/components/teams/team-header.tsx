import { Standing } from "@/types/standings";
import { TeamWithSchedule } from "@/types/teams";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Stat from "./team-header-stat";

export default function TeamHeader({
	team,
	standings,
}: {
	team: TeamWithSchedule;
	standings: Standing;
}) {
	return (
		<Card className="w-full">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
					<Image
						src={team.team_logo.url || "/placeholder.svg"}
						alt={team.displayName}
						width={150}
						height={150}
					/>
					<div className="flex-grow text-center md:text-left">
						<h1 className="text-3xl font-bold">{team.displayName}</h1>
						<p className="text-xl text-gray-600">{team.team_city}</p>
						<div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
							<Stat
								label="Record"
								value={`${standings.wins}-${standings.losses}`}
							/>
							<Stat
								label="Win %"
								value={`${(parseFloat(standings.win_percentage) * 100).toFixed(
									1
								)}%`}
							/>
							<Stat label="Position" value={`#${standings.position}`} />
							<Stat label="GF/G" value={standings.goals_for_avg} />
							<Stat label="GA/G" value={standings.goals_against_avg} />
						</div>
					</div>
				</div>
				{team.clinch_text && (
					<p className="mt-4 text-center md:text-left text-green-600 font-semibold">
						{team.clinch_text}
					</p>
				)}
			</CardContent>
		</Card>
	);
}
