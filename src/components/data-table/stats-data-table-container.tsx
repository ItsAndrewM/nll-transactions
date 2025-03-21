import { getStandings } from "@/server/standings";
import { StatsDataTable } from "./stats-data-table";
import { teamsColumns } from "./teams-columns";

export const revalidate = 3600;

export async function StatsDataTableContainer() {
	const standings = await getStandings();
	return (
		<>
			<h2
				className="uppercase text-4xl font-bold md:text-left text-center"
				id="standings"
			>
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Standings
				</span>
			</h2>
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4">
				<StatsDataTable
					columns={teamsColumns}
					data={standings}
					defaultSort="position"
					defaultSortDirection="asc"
				/>
			</div>
		</>
	);
}
