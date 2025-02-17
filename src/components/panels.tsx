import { SelectTeams } from "./select-team";
import { Transactions } from "@/types/transactions";
import { OutgoingMatch } from "@/types/schedule";
import Standings from "./standings/standings";
import { Standing } from "@/types/standings";
import SelectedTitle from "./selected-title";
import ScheduleNext from "./scheduled/schedule-next";
import ScheduleList from "./scheduled/schedule-list";
import TransactionsPanel from "./transactions/transactions-panel";
import { useSearchParams } from "next/navigation";

export default function Panels({
	teamsList,
	allTransactions,
	schedule,
	standings,
}: {
	teamsList: string[];
	allTransactions: Transactions;
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const selected = useSearchParams().get("selected") || "";
	return (
		<div className="w-full h-full flex ">
			<div className="w-full hidden md:grid border-red-50 grid-cols-2 lg:grid-cols-3">
				<div className="px-8 py-4 flex flex-col gap-4">
					{selected ? (
						<>
							<SelectedTitle standings={standings} />
							<ScheduleNext schedule={schedule} standings={standings} />
						</>
					) : null}
					<SelectTeams teams={teamsList} />
					<ScheduleList schedule={schedule} />
				</div>
				<TransactionsPanel content={allTransactions} />
				<Standings standings={standings} />
			</div>
			{/* Mobile layout */}
			<div className="w-full flex border-red-50 flex-col md:hidden max-w-lg mx-auto relative pt-6 p-8 md:px-0">
				{selected ? (
					<>
						<SelectedTitle standings={standings} />
						<ScheduleNext schedule={schedule} standings={standings} />
					</>
				) : null}
				<SelectTeams teams={teamsList} />
				<ScheduleList schedule={schedule} />
			</div>
		</div>
	);
}
