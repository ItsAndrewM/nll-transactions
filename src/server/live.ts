import { env } from "@/env";

import "server-only";

export const preload = (id: string) => {
	void getRecrawlById(id);
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
