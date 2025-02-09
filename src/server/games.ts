import { env } from "@/env";

import "server-only";
import { getScheduleGameById } from "./schedule";
import { getRecrawlById } from "./live";
import { revalidatePath } from "next/cache";

export const preload = (id: string) => {
	void getGames();
	void getGame(id);
	void getGameIds();
	void syncGames(id);
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

export async function syncGames(id: string) {
	try {
		const [game, scheduledGame] = await Promise.all([
			getGame(id),
			getScheduleGameById(id),
		]);
		const { status: gameStatus } = game || {};
		const { status: scheduledStatus } = scheduledGame || {};

		if (scheduledStatus.typeName.toLowerCase() === "live") {
			return { ...game, status: scheduledStatus.name };
		}

		if (gameStatus?.toLowerCase() !== scheduledStatus?.name?.toLowerCase()) {
			console.log("wrong status");
			getRecrawlById(id);
			revalidatePath(`/games/${id}`);
		}
		return game;
	} catch (error) {
		console.error(error);
		return {};
	}
}
