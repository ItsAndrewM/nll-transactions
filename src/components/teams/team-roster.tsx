import { AllStats } from "@/types/games";
import { Card, CardContent, CardHeader } from "../ui/card";
import { StatsDataTable } from "../data-table/stats-data-table";
import { teamRunnerColumns } from "../data-table/team-runners-columns";

export default function TeamRoster({ players }: { players: AllStats[] }) {
	return (
		<Card className="w-full">
			<CardHeader className="flex justify-start items-center mb-4 w-full lg:flex-row">
				<h2 className="text-2xl font-bold text-left">Team Roster</h2>
			</CardHeader>
			<CardContent>
				<StatsDataTable
					data={players}
					columns={teamRunnerColumns}
					paginate={false}
					filter={false}
				/>
			</CardContent>
		</Card>
	);
}
