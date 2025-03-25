import { AndaHeader } from "@/components/anda-header";
import { Suspense } from "react";
import { LoadingSkeleton as TransactionLoadingSkeleton } from "@/components/transactions/skeleton-transactions-page-container";
import { LoadingSkeleton as StandingsLoading } from "@/components/standings/standings-loading";
import { TransactionsPageContainer } from "@/components/transactions/transactions-page-container";
import { StandingsContainer } from "@/components/standings/standings-container";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	return (
		<div className="mx-auto px-4 py-8 pb-20 flex flex-col items-center container">
			<AndaHeader />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Suspense fallback={<TransactionLoadingSkeleton />}>
					<TransactionsPageContainer searchParams={props.searchParams} />
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
						<StandingsContainer />
					</Suspense>
				</div>
			</div>
		</div>
	);
}
