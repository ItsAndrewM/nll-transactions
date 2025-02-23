"use client";

import { OutgoingMatch } from "@/types/schedule";
import LiveIndicator from "./live-indicator";
import { ScheduleTabsViewListCard } from "../scheduled/schedule-tabs-view-list-card";
import { Standing } from "@/types/standings";
import useSWR from "swr";
import { env } from "@/env";
import { liveGamesFetcher } from "@/lib/utils";
import { Spinner } from "../spinner";

export function LiveGridList({
	fallBackData,
	standings,
}: {
	fallBackData: OutgoingMatch[];
	standings: Standing[];
}) {
	const { data: liveGames, isLoading } = useSWR(
		[`${env.NEXT_PUBLIC_API_URL}/schedule`, env.NEXT_PUBLIC_API_KEY],
		liveGamesFetcher,
		{
			refreshInterval: 5000, // Refresh every 5 seconds
			fallbackData: fallBackData,
			revalidateOnFocus: true,
		}
	);
	return (
		<>
			<h3 className="text-lg font-semibold mt-4 mb-2 flex items-center gap-2">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Live Games
				</span>
				<LiveIndicator />
			</h3>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
				{isLoading ? (
					<div className="flex justify-center items-center">
						<div className="animate-pulse rounded-lg bg-card text-card-foreground shadow-sm px-6 pb-16">
							<Spinner />
						</div>
					</div>
				) : (
					liveGames.map((game: OutgoingMatch) => (
						<ScheduleTabsViewListCard
							game={game}
							standings={standings}
							key={game.id}
						/>
					))
				)}
			</div>
		</>
	);
}
