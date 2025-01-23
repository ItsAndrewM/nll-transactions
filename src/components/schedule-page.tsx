"use client";

import { useState } from "react";
import { SelectTeams } from "./select-team";
import { OutgoingMatch } from "@/types/schedule";
import { Standing } from "@/types/standings";
import SelectedTitle from "./selected-title";
// import MobileScheduleList from "./mobile-schedule-list";
import ScheduleList from "./schedule-list";

export default function SchedulePage({
	teamsList,
	schedule,
	standings,
}: {
	teamsList: string[];
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const [selected, setSelected] = useState("");

	return (
		<div className="flex flex-col gap-4 items-center justify-center w-full mx-auto p-8 max-w-3xl">
			<h1 className="text-xl font-bold text-left w-full">
				Regular Season Schedule
			</h1>
			{selected ? (
				<SelectedTitle selected={selected} standings={standings} />
			) : null}
			<SelectTeams
				teams={teamsList}
				setSelected={setSelected}
				selected={selected}
			/>
			<ScheduleList schedule={schedule} selected={selected} />
		</div>
	);
}
