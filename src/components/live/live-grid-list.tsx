"use client";

import { OutgoingMatch } from "@/types/schedule";
import LiveIndicator from "./live-indicator";
import { ScheduleTabsViewListCard } from "../scheduled/schedule-tabs-view-list-card";
import { Standing } from "@/types/standings";
import { Separator } from "../ui/separator";

export function LiveGridList({
	liveGames,
	standings,
	isLoading,
}: {
	liveGames: OutgoingMatch[];
	standings: Standing[];
	isLoading: boolean;
}) {
	return isLoading ? (
		<></>
	) : (
		liveGames.map((game: OutgoingMatch) => (
			<>
				<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
					<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
						Live Games
					</span>
					<LiveIndicator />
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
					<ScheduleTabsViewListCard
						game={game}
						standings={standings}
						key={game.id}
					/>
				</div>
				<Separator className="my-4" />
			</>
		))
	);
}
