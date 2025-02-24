"use client";
import { OutgoingMatch } from "@/types/schedule";
import { ScheduleTabsViewListCard } from "./schedule-tabs-view-list-card";
import ReverseToggle from "../reverse-toggle";
import { useState } from "react";
import { Standing } from "@/types/standings";

export function ScheduleTabsViewListContent({
	games,
	standings,
	title,
}: {
	games: OutgoingMatch[];
	standings: Standing[];
	title: string;
}) {
	const [checked, setChecked] = useState(false);
	const list = !checked ? [...games].reverse() : games;
	return (
		<>
			<h3 className="text-lg font-semibold mt-4 mb-2 md:text-left text-center md:px-6">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					{title} Games
				</span>
			</h3>
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
