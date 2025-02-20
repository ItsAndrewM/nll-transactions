import { AndaHeader } from "@/components/anda-header";
import { TransactionsPage } from "@/components/transactions/transactions-page";
import { getAllTransactions } from "@/server/transactions";
import { Suspense } from "react";
import { getStandings } from "@/server/standings";
import Standings from "@/components/standings/standings";
import { TransactionsLoading } from "@/components/transactions/transactions-loading";
import { StandingsLoading } from "@/components/standings/standings-loading";
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
	const [allTransactions, standings] = await Promise.all([
		getAllTransactions(order, team),
		getStandings(),
	]);

	return (
		<div className="mx-auto px-4 py-8 pb-20 flex flex-col items-center">
			<AndaHeader />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Suspense fallback={<TransactionsLoading />}>
					<TransactionsPage transactions={allTransactions} />
				</Suspense>
				<div className="flex flex-col gap-4 items-center justify-start w-full">
					<h2
						className="uppercase text-4xl font-bold md:text-left text-center w-full md:ml-16"
						id="transactions"
					>
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							Standings
						</span>
					</h2>
					<Suspense fallback={<StandingsLoading />}>
						<Standings standings={standings} />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
