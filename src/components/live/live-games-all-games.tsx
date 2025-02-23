"use client";

import { Standing } from "@/types/standings";
import { Separator } from "../ui/separator";
import { OutgoingMatch } from "@/types/schedule";
import { LiveGridList } from "./live-grid-list";
import useSWR from "swr";
import { env } from "@/env";
import { liveGamesFetcher } from "@/lib/utils";

export function LiveGamesAllGames({
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
		<>
			<LiveGridList
				standings={standings}
				liveGames={realTimeLiveGames}
				isLoading={isLoading}
			/>
			<Separator className="my-4" />
		</>
	);
}
