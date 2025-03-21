import { getAllTransactions } from "@/server/transactions";
import { TransactionsFrontPage } from "./transactions-front-page";

export const revalidate = 3600;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function TransactionContainer({
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
	return <TransactionsFrontPage transactions={allTransactions} />;
}
