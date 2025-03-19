import { getGameIds } from "@/server/games";
import { getAllPlayers } from "@/server/players";
import { getStandings } from "@/server/standings";
import { Player } from "@/types/players";
import { Standing } from "@/types/standings";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [gameIds, teams, players] = await Promise.all([
		getGameIds(),
		getStandings(),
		getAllPlayers(),
	]);

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

		...players?.players?.map((player: Player) => ({
			url: `https://nlltracker.com/players/${player?.personId}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		})),
		...gameIds?.map((gameId: number) => ({
			url: `https://nlltracker.com/games/${gameId}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		})),
		...teams?.map((team: Standing) => ({
			url: `https://nlltracker.com/teams/${team?.team_id}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		})),
	];
}
