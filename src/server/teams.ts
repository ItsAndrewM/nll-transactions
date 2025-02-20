import { env } from "@/env";
import "server-only";

export const preload = () => {
	void Promise.all([getListOfTeams(), getAllTeamsTransactions()]);
};

export const getAllTeamsTransactions = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/teams`);
		if (!response.ok) {
			throw new Error("Failed to fetch teams");
		}
		const data = await response.json();
		return data.teams;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getListOfTeams = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/teams/list`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch teams");
		}
		const data = await response.json();
		return data.teams;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getTeamTransactions = async (teamName: string) => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/teams/${teamName}`,
			{
				headers: {
					"x-api-key": env.NEXT_PUBLIC_API_KEY,
				},
			}
		);
		if (!response.ok) {
			throw new Error("Failed to fetch teams");
		}
		const data = await response.json();
		return data.team;
	} catch (error) {
		console.error(error);
		return [];
	}
};
