import { getAllTransactions } from "@/server/transactions";
import { TransactionsFrontPage } from "./transactions-front-page";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function TransactionContainer({
	params,
	searchParams,
}: {
	params: Params;
	searchParams: SearchParams;
}) {
	const order = await searchParams.then((params) =>
		typeof params.order === "string" ? params.order : "dsc"
	);
	const team = await searchParams.then((params) =>
		typeof params.team === "string" ? params.team : ""
	);

	const allTransactions = await getAllTransactions(order, team);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<TransactionsFrontPage transactions={allTransactions} />
		</Suspense>
	);
}
