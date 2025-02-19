"use client";

import { useSearchParams } from "next/navigation";
import SelectedTitle from "./selected-title";
import ScheduleNext from "./scheduled/schedule-next";
import { OutgoingMatch } from "@/types/schedule";
import { Standing } from "@/types/standings";
import { Card } from "./ui/card";
import { Separator } from "./ui/separator";

export function ScheduleSelectedTeam({
	standings,
	schedule,
}: {
	standings: Standing[];
	schedule: OutgoingMatch[];
}) {
	const selected = useSearchParams().get("selected") || "";
	return selected ? (
		<Card className="p-4 flex flex-col gap-2">
			<SelectedTitle standings={standings} />
			<Separator />
			<ScheduleNext schedule={schedule} standings={standings} />
		</Card>
	) : null;
}
