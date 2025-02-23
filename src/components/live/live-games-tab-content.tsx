"use client";

import { Standing } from "@/types/standings";
import { TabsContent } from "../ui/tabs";
import { LiveGridList } from "./live-grid-list";
import { OutgoingMatch } from "@/types/schedule";
import { liveGamesFetcher } from "@/lib/utils";
import useSWR from "swr";
import { env } from "@/env";

export function LiveGamesTabContent({
	standings,
	liveGames,
}: {
	standings: Standing[];
	liveGames: OutgoingMatch[];
}) {
	const { data: realTimeLiveGames, isLoading } = useSWR(
		[`${env.NEXT_PUBLIC_API_URL}/schedule`, env.NEXT_PUBLIC_API_KEY],
		liveGamesFetcher,
		{
			refreshInterval: 5000, // Refresh every 5 seconds
			fallbackData: liveGames,
			revalidateOnFocus: true,
		}
	);
	return !realTimeLiveGames?.length ? null : (
		<TabsContent value="live">
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16">
				<LiveGridList
					standings={standings}
					liveGames={realTimeLiveGames}
					isLoading={isLoading}
				/>
			</div>
		</TabsContent>
	);
}
