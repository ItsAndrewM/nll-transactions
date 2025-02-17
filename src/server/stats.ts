import { env } from "@/env";

import "server-only";

export const preload = (id: string) => {
	void Promise.all([
		getStats(),
		getGoalieStats(),
		getPlayerStats(id),
		getHistoricalStats(id),
	]);
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

export const getPlayerStats = async (playerId: string) => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/stats/players/${playerId}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch stats");
		}
		const data = await response.json();
		return data.player;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getGoalieStats = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats/goalies`);
		if (!response.ok) {
			throw new Error("Failed to fetch goalies");
		}
		const data = await response.json();
		return data.goalies;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getHistoricalStats = async (fullname: string) => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/stats/historical/${fullname}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch historical stats");
		}
		const data = await response.json();
		return data.historical_stats;
	} catch (error) {
		console.error(error);
		return [];
	}
};
