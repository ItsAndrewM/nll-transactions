"use client";
import { Transactions } from "@/types/transactions";
import { Standing } from "@/types/standings";
import SelectedTitle from "../selected-title";
import { SelectTeams } from "../select-team";
import MobileTransactions from "./mobile-transactions";
import { useSearchParams } from "next/navigation";

export default function TransactionsPage({
	teamsList,
	allTransactions,
	standings,
}: {
	teamsList: string[];
	allTransactions: Transactions;
	standings: Standing[];
}) {
	const selected = useSearchParams().get("selected") || "";
	return (
		<div className="w-full h-full flex max-w-3xl mx-auto">
			<div className="px-8 py-4 flex flex-col gap-4 mx-auto">
				{selected ? <SelectedTitle standings={standings} /> : null}
				<SelectTeams teams={teamsList} />
				<MobileTransactions content={allTransactions} />
			</div>
		</div>
	);
}
