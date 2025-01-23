"use client";

import { useState } from "react";
import { SelectTeams } from "./select-team";
import { Transactions } from "@/types/transactions";
import MobileTransactions from "./mobile-transactions";
import { Standing } from "@/types/standings";
import SelectedTitle from "./selected-title";

export default function TransactionsPage({
	teamsList,
	allTransactions,
	standings,
}: {
	teamsList: string[];
	allTransactions: Transactions;
	standings: Standing[];
}) {
	const [selected, setSelected] = useState("");
	return (
		<div className="w-full h-full flex max-w-3xl mx-auto">
			<div className="px-8 py-4 flex flex-col gap-4 mx-auto">
				{selected ? (
					<SelectedTitle selected={selected} standings={standings} />
				) : null}
				<SelectTeams
					teams={teamsList}
					setSelected={setSelected}
					selected={selected}
				/>
				<MobileTransactions content={allTransactions} selected={selected} />
			</div>
		</div>
	);
}
