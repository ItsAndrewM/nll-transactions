"use client";

import { useState } from "react";
import { SelectTeams } from "./select-team";
import TransactionsPanel from "./transactions-panel";
import { Transactions } from "@/types/transactions";
import { OutgoingMatch } from "@/types/schedule";
import ScheduleList from "./schedule-list";
import Standings from "./standings";
import { Standing } from "@/types/standings";
import SelectedTitle from "./selected-title";
import ScheduleNext from "./schedule-next";

export default function Panels({
	teamsList,
	allTransactions,
	schedule,
	standings,
}: {
	teamsList: string[];
	allTransactions: Transactions;
	allTeams: Record<string, Record<string, string[]>>;
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const [selected, setSelected] = useState("");
	return (
		<div className="w-full h-full flex ">
			<div className="w-full hidden md:grid border-red-50 grid-cols-2 lg:grid-cols-3">
				<div className="px-8 py-4 flex flex-col gap-4">
					{selected ? (
						<>
							<SelectedTitle selected={selected} standings={standings} />
							<ScheduleNext
								schedule={schedule}
								selected={selected}
								standings={standings}
							/>
						</>
					) : null}
					<SelectTeams
						teams={teamsList}
						setSelected={setSelected}
						selected={selected}
					/>
					<ScheduleList schedule={schedule} selected={selected} />
				</div>
				<TransactionsPanel content={allTransactions} selected={selected} />
				<Standings standings={standings} />
			</div>
			{/* Mobile layout */}
			<div className="w-full flex border-red-50 flex-col md:hidden max-w-lg mx-auto relative pt-6 p-8 md:px-0">
				{selected ? (
					<>
						<SelectedTitle selected={selected} standings={standings} />
						<ScheduleNext
							schedule={schedule}
							selected={selected}
							standings={standings}
						/>
					</>
				) : null}
				<SelectTeams
					teams={teamsList}
					setSelected={setSelected}
					selected={selected}
				/>
				<ScheduleList schedule={schedule} selected={selected} />
			</div>
		</div>
	);
}
