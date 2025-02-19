import { env } from "@/env";

import "server-only";
import { getScheduleGameById } from "./schedule";
import { getRecrawlById } from "./live";
import { revalidatePath } from "next/cache";

export const preload = (id: string) => {
	void Promise.all([getGames(), getGame(id), getGameIds(), syncGames(id)]);
};

export const getGames = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
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
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games/${id}`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
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
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/games/list`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
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
			return { game_summary: game, live_game: scheduledGame };
		}

		if (gameStatus?.toLowerCase() !== scheduledStatus?.name?.toLowerCase()) {
			console.log("wrong status");
			getRecrawlById(id);
			revalidatePath(`/games/${id}`);
		}
		return { game_summary: game, live_game: scheduledGame };
	} catch (error) {
		console.error(error);
		return {};
	}
}
