import Panels from "@/components/panels";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getAllTeamsTransactions, getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const order =
		typeof searchParams.order === "string" ? searchParams.order : "dsc";
	const team = typeof searchParams.team === "string" ? searchParams.team : "";
	const [teamsList, allTransactions, allTeams, schedule, standings] =
		await Promise.all([
			getListOfTeams(),
			getAllTransactions(order, team),
			getAllTeamsTransactions(),
			getSchedule(),
			getStandings(),
		]);
	return (
		<Panels
			teamsList={teamsList}
			allTransactions={allTransactions}
			allTeams={allTeams}
			schedule={schedule}
			standings={standings}
		/>
	);
}
