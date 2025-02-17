"use client";

import { OutgoingMatch } from "@/types/schedule";
import { Standing } from "@/types/standings";
import ScheduleList from "./schedule-list";
import SelectedTitle from "../selected-title";
import { SelectTeams } from "../select-team";
import { useSearchParams } from "next/navigation";

export default function SchedulePage({
	teamsList,
	schedule,
	standings,
}: {
	teamsList: string[];
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const selected = useSearchParams().get("selected") || "";

	return (
		<div className="flex flex-col gap-4 items-center justify-center w-full mx-auto p-8 ">
			<h1 className="text-xl font-bold text-left w-full">
				Regular Season Schedule
			</h1>
			{selected ? <SelectedTitle standings={standings} /> : null}
			<SelectTeams teams={teamsList} />
			<ScheduleList schedule={schedule} />
		</div>
	);
}
