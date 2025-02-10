import { parseGame } from "../cron/parse-game";

export async function getGame(gameId: string) {
	try {
		const response = await fetch(
			// "https://www.nll.com/game/703168801/vancouver-warriors-vs-ottawa-black-bears/2025-01-17/"
			`https://www.nll.com/game/${gameId}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch game data");
		}
		const html = await response.text();
		const data = parseGame(html);

		if (!data) {
			throw new Error("Failed to parse game data");
		}
		return { id: gameId, ...data };
	} catch (error) {
		console.error(error);
	}
}
