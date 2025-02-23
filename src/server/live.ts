import { env } from "@/env";
import { OutgoingMatch } from "@/types/schedule";

import "server-only";

export const preload = (id: string) => {
	void Promise.all([
		getRecrawlById(id),
		isLiveFetcher([
			`${env.NEXT_PUBLIC_API_URL}/schedule`,
			env.NEXT_PUBLIC_API_KEY,
		]),
	]);
};

export async function getRecrawlById(id: string) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/live/${id}`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch game");
		}
		const data = await response.json();
		return data.success;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function isLiveFetcher([url, apiKey]: [string, string]) {
	try {
		const response = await fetch(url, {
			headers: {
				"x-api-key": apiKey,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch schedule");
		}
		const data = await response.json();
		if (data.success === false) {
			throw new Error("Failed to fetch schedule");
		}
		return !!data.schedule.filter(
			(game: OutgoingMatch) => game?.status?.typeName === "Live"
		).length;
	} catch (error) {
		console.error(error);
		return [];
	}
}
