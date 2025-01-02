"use client";

import { useState } from "react";
import { SelectTeams } from "./select-team";
import ScheduleList from "./schedule-list";
import { OutgoingMatch } from "@/types/schedule";

export default function SchedulePage({
	teamsList,
	schedule,
}: {
	teamsList: string[];
	schedule: OutgoingMatch[];
}) {
	const [selected, setSelected] = useState("");

	return (
		<div className="flex flex-col gap-4 items-center justify-center w-full mx-auto p-8">
			<h1 className="text-xl font-bold text-left w-full">
				Regular Season Schedule
			</h1>
			<SelectTeams
				teams={teamsList}
				setSelected={setSelected}
				selected={selected}
			/>
			<ScheduleList schedule={schedule} selected={selected} />
		</div>
	);
}
