import { env } from "@/env";
import { filterTransactionsByTeam } from "@/lib/utils";

import "server-only";

export const preload = () => {
	void getFrontPage("dsc", "all");
};

export async function getFrontPage(order: string, team: string) {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/front-page?order=${order}`,
			{
				headers: {
					"x-api-key": env.NEXT_PUBLIC_API_KEY,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to fetch front page");
		}
		const data = await response.json();
		if (team !== "") {
			const filteredData = filterTransactionsByTeam({
				data: data.data,
				teamName: team,
			});

			return { ...data, data: filteredData };
		}
		return data;
	} catch (error) {
		console.error(error);
		return {};
	}
}
