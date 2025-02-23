"use client";

import { TabsTrigger } from "@/components/ui/tabs";
import { liveGamesFetcher } from "@/lib/utils";
import { env } from "@/env";
import useSWR from "swr";
import LiveIndicator from "./live-indicator";

export function LiveGamesTrigger() {
	const { data: liveGames } = useSWR(
		[`${env.NEXT_PUBLIC_API_URL}/schedule`, env.NEXT_PUBLIC_API_KEY],
		liveGamesFetcher,
		{
			refreshInterval: 5000, // Refresh every 5 seconds
			revalidateOnFocus: true,
		}
	);
	return !liveGames?.length ? null : (
		<TabsTrigger value="live" className="text-xs md:text-sm flex xl:gap-1">
			<span>Live</span> <LiveIndicator className="ml-2 block xl:hidden" />
			<span className="hidden xl:block">Games</span>
			<LiveIndicator className="ml-2 hidden xl:block" />
		</TabsTrigger>
	);
}
