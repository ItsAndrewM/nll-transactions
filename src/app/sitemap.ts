import { getGameIds } from "@/server/games";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const gameIds = await getGameIds();

	return [
		{
			url: "https://nll-transactions.vercel.app",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: "https://nll-transactions.vercel.app/standings",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://nll-transactions.vercel.app/schedule",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8,
		},
		{
			url: "https://nll-transactions.vercel.app/games",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: "https://nll-transactions.vercel.app/transactions",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		...gameIds.map((gameId: number) => ({
			url: `https://nll-transactions.vercel.app/games/${gameId}`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		})),
	];
}
