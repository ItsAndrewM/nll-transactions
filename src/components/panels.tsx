"use client";
import { useState } from "react";
import Panel from "./panel";
import { SelectTeams } from "./select-team";
import TransactionsPanel from "./transactions-panel.tsx";
import { Transactions } from "@/types/transactions";
import { OutgoingMatch } from "@/types/schedule";
import ScheduleList from "./schedule-list";

export default function Panels({
	teamsList,
	allTransactions,
	allTeams,
	schedule,
}: {
	teamsList: string[];
	allTransactions: Transactions;
	allTeams: Record<string, Record<string, string[]>>;
	schedule: OutgoingMatch[];
}) {
	const [selected, setSelected] = useState("");
	return (
		<div className="w-full h-full flex ">
			<div className={"w-full grid border-red-50 grid-cols-3"}>
				<div className="px-8 py-4 flex flex-col gap-4">
					<SelectTeams
						teams={teamsList}
						setSelected={setSelected}
						selected={selected}
					/>
					<ScheduleList schedule={schedule} selected={selected} />
				</div>
				<TransactionsPanel content={allTransactions} selected={selected} />
				<Panel title="Date" content={allTeams} />
			</div>
		</div>
	);
}
