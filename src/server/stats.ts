import { env } from "@/env";

import "server-only";

export const preload = () => {
	void getStats();
};

export const getStats = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats`);
		if (!response.ok) {
			throw new Error("Failed to fetch stats");
		}
		const data = await response.json();
		return data.all_player_stats;
	} catch (error) {
		console.error(error);
		return [];
	}
};
