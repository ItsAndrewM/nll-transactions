import { getStandings } from "@/server/standings";
import { StatsDataTable } from "./stats-data-table";
import { teamsColumns } from "./teams-columns";

export const revalidate = 3600;

export async function StatsDataTableContainer() {
	const standings = await getStandings();
	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4">
			<StatsDataTable
				columns={teamsColumns}
				data={standings}
				defaultSort="position"
				defaultSortDirection="asc"
			/>
		</div>
	);
}
