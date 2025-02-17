import { AndaHeader } from "@/components/anda-header";
import TransactionsPage from "@/components/transactions/transactions-page";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";
import { Suspense } from "react";
import { TransactionsLoading } from "../page";
// import { TransactionIcon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

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
		<div className="container mx-auto px-4 py-8 max-w-3xl pb-20 flex flex-col">
			<AndaHeader />
			{/* <div className="max-w-md w-full mx-auto rounded-lg border bg-card text-card-foreground shadow-sm ">
				<h1 className="text-3xl font-bold text-center p-8 flex items-center justify-center gap-2">
					<HugeiconsIcon icon={TransactionIcon} size={20} strokeWidth={0.5} />
					Transactions
				</h1>
			</div> */}
			<Suspense fallback={<TransactionsLoading />}>
				<TransactionsPage
					teamsList={teamsList}
					allTransactions={allTransactions}
					standings={standings}
				/>
			</Suspense>
		</div>
	);
}
