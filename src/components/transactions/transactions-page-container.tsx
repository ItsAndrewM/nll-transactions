import { getAllTransactions } from "@/server/transactions";
import { TransactionsPage } from "./transactions-page";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function TransactionsPageContainer({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const order = await searchParams.then((params) =>
		typeof params.order === "string" ? params.order : "dsc"
	);
	const team = await searchParams.then((params) =>
		typeof params.team === "string" ? params.team : ""
	);
	const allTransactions = await getAllTransactions(order, team);
	return <TransactionsPage transactions={allTransactions} />;
}
