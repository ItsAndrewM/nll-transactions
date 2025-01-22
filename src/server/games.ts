import { env } from "@/env";

import "server-only";

export const preload = (id: string) => {
	void getGames();
	void getGame(id);
	void getGameIds();
};

export const getGames = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games`);
		if (!response.ok) {
			throw new Error("Failed to fetch games");
		}
		const data = await response.json();
		return data.games;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getGame = async (id: string) => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch game");
		}
		const data = await response.json();
		return data.game;
	} catch (error) {
		console.error(error);
		return {};
	}
};

export const getGameIds = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games/list`);
		if (!response.ok) {
			throw new Error("Failed to fetch game ids");
		}
		const data = await response.json();
		return data.gameIds;
	} catch (error) {
		console.error(error);
		return [];
	}
};
