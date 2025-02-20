import { env } from "@/env";
import "server-only";

export const preload = () => {
	void getStandings();
};

export const getStandings = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/standings`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch standings");
		}
		const data = await response.json();
		return data.standings;
	} catch (error) {
		console.error(error);
		return [];
	}
};
