"use client";

import { GameData } from "@/types/games";
import { PostGameSummary } from "./post-game-summary";
import useSWR from "swr";
import { OutgoingMatch } from "@/types/schedule";
import { fetcher } from "./live-game-card";
import { env } from "@/env";

export default function LiveGameSummary({ gameData }: { gameData: GameData }) {
	const { data: liveMatch } = useSWR<OutgoingMatch>(
		gameData.status === "Live"
			? `${env.NEXT_PUBLIC_API_URL}/schedule/${gameData.id}`
			: null,
		fetcher,
		{
			refreshInterval: 5000, // Refresh every 10 seconds
			revalidateOnFocus: true,
		}
	);
	console.log(liveMatch);
	return <PostGameSummary gameData={gameData} />;
}
