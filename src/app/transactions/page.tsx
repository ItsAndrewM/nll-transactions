import TransactionsPage from "@/components/transactions-page";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const order =
		typeof searchParams.order === "string" ? searchParams.order : "dsc";
	const team = typeof searchParams.team === "string" ? searchParams.team : "";
	const [teamsList, allTransactions, standings] = await Promise.all([
		getListOfTeams(),
		getAllTransactions(order, team),
		getStandings(),
	]);
	return (
		<TransactionsPage
			teamsList={teamsList}
			allTransactions={allTransactions}
			standings={standings}
		/>
	);
}
