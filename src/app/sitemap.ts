import { getGameIds } from "@/server/games";
import { getAllPlayers } from "@/server/players";
import { getStandings } from "@/server/standings";
import { Player } from "@/types/players";
import { Standing } from "@/types/standings";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	let gameIds: number[] = [];
	let teams: Standing[] = [];
	let players: { players: Player[] } = { players: [] };

	try {
		[gameIds, teams, players] = await Promise.all([
			getGameIds(),
			getStandings(),
			getAllPlayers(),
		]);
	} catch (error) {
		console.error("Error fetching data for sitemap:", error);
	}

	return [
		{
			url: "https://nlltracker.com",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: "https://nlltracker.com/standings",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://nlltracker.com/schedule",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://nlltracker.com/games",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: "https://nlltracker.com/transactions",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: "https://nlltracker.com/teams",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: "https://nlltracker.com/players",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://nlltracker.com/stats",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},

		...(players?.players
			? players.players.map((player: Player) => ({
					url: `https://nlltracker.com/players/${player?.personId}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.5,
			  }))
			: []),
		...(Array.isArray(gameIds)
			? gameIds.map((gameId: number) => ({
					url: `https://nlltracker.com/games/${gameId}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.5,
			  }))
			: []),
		...(Array.isArray(teams)
			? teams.map((team: Standing) => ({
					url: `https://nlltracker.com/teams/${team?.team_id}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.5,
			  }))
			: []),
	];
}
