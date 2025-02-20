import { env } from "@/env";

import "server-only";

export const preload = (id: string) => {
	void Promise.all([getAllPlayers(), getPlayer(id)]);
};

export async function getAllPlayers() {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/players`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch players");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getPlayer(id: string) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/players/${id}`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch player");
		}
		const data = await response.json();
		return { ...data.player, id };
	} catch (error) {
		console.error(error);
		return [];
	}
}
