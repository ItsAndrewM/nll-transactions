import { env } from "@/env";
import "server-only";
import { getStandings } from "./standings";
import { Standing } from "@/types/standings";

export const preload = (id: string) => {
	void getTeamWithSchedule(id);
	// void getTeamRoster(team);
};

export async function getTeamWithSchedule(id: string) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/team/${id}`);
		// const response = await fetch(`http://localhost:8080/api/team/${id}`);
		if (!response.ok) {
			throw new Error("Failed to fetch teams");
		}
		const data = await response.json();
		return data.team;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getTeamRoster(team: string) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/stats/${team}`);
		// const response = await fetch(`http://localhost:8080/api/stats/${team}`);
		if (!response.ok) {
			throw new Error("Failed to fetch teams");
		}
		const data = await response.json();
		return data.players;
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getVsTeamsWithoutId(homeName: string, awayName: string) {
	if (!homeName || !awayName) {
		throw new Error("Home and away names are required");
	}
	try {
		const response = await getStandings();
		if (!response.length) {
			throw new Error("Failed to fetch standings");
		}
		const home = response.find((team: Standing) =>
			team?.name?.toLowerCase().includes(homeName?.toLowerCase())
		);
		const away = response.find((team: Standing) =>
			team?.name?.toLowerCase().includes(awayName?.toLowerCase())
		);

		return { home: home || {}, away: away || {} };
	} catch (error) {
		console.error(error);
		return { home: {}, away: {} };
	}
}
