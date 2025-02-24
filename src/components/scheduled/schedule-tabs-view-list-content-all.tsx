"use client";
import { OutgoingMatch } from "@/types/schedule";
import { ScheduleTabsViewListCard } from "./schedule-tabs-view-list-card";
import ReverseToggle from "../reverse-toggle";
import { useState } from "react";
import { Standing } from "@/types/standings";

export function ScheduleTabsViewListContentAll({
	games,
	standings,
}: {
	games: OutgoingMatch[];
	standings: Standing[];
}) {
	const [checked, setChecked] = useState(false);
	const list = !checked ? [...games].reverse() : games;
	return (
		<>
			<ReverseToggle setChecked={setChecked} checked={checked} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
				{list.map((game: OutgoingMatch) => (
					<ScheduleTabsViewListCard
						game={game}
						standings={standings}
						key={game.id}
					/>
				))}
			</div>
		</>
	);
}
