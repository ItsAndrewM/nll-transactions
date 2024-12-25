import Panels from "@/components/panels";
import { getAllTeamsTransactions, getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";

export default async function Home() {
	const [teamsList, allTransactions, allTeams] = await Promise.all([
		getListOfTeams(),
		getAllTransactions(),
		getAllTeamsTransactions(),
	]);
	return (
		<Panels
			teamsList={teamsList}
			allTransactions={allTransactions}
			allTeams={allTeams}
		/>
	);
}
