import { getGameIds } from "@/server/games";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const gameIds = await getGameIds();

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
		...gameIds.map((gameId: number) => ({
			url: `https://nlltracker.com/games/${gameId}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		})),
	];
}
