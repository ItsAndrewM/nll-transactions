import { getHistoricalStats } from "@/server/stats";
import { historicalRunnerColumns } from "../data-table/historical-runners-columns";
import { StatsDataTable } from "../data-table/stats-data-table";
import { historicalGoalieColumns } from "../data-table/historical-goalie-columns";

export async function PlayerHistoricalStats({
	fullname,
	position,
}: {
	fullname: string;
	position: string;
}) {
	const lastNameFirst = fullname.split(" ").reverse().join(" ");
	const historicalStats = await getHistoricalStats(lastNameFirst);
	const columns =
		position !== "G" ? historicalRunnerColumns : historicalGoalieColumns;

	return (
		<>
			{/* Regular Season */}
			<h3 className="text-xl font-semibold">Regular Season</h3>
			<StatsDataTable
				data={historicalStats?.regularSeason}
				columns={columns}
				defaultSort="year"
				defaultSortDirection="asc"
			/>
			{/* Playoffs */}
			{!historicalStats?.playoffs?.length ? null : (
				<>
					<h3 className="text-xl font-semibold">Playoffs</h3>
					<StatsDataTable
						data={historicalStats?.playoffs}
						columns={columns}
						defaultSort="year"
						defaultSortDirection="asc"
					/>
				</>
			)}
		</>
	);
}
