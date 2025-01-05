import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

interface FilterData {
	data: {
		transactions: {
			[date: string]: {
				[teamName: string]: string[];
			};
		};
		order: string;
		total: number;
	};
	teamName: string;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const createFallbackName = (str: string): string => {
	return (
		str.split(" ")[0].charAt(0).toUpperCase() +
		str.split(" ")[1].charAt(0).toUpperCase()
	);
};

export function filterTransactionsByTeam({ data, teamName }: FilterData) {
	const filtered = {
		transactions: {},
		order: data.order,
		total: data.total,
	};

	if (!teamName || teamName.toLowerCase() === "all") return data;

	Object.entries(data.transactions).forEach(([date, teams]) => {
		if (teams[teamName]) {
			(filtered.transactions as Record<string, Record<string, string[]>>)[
				date
			] = {
				[teamName]: teams[teamName],
			};
		}
	});

	filtered.total = Object.keys(filtered.transactions).length;

	return filtered;
}

export const calculateGamesBack = (
	firstPlace: string,
	teamRecord: string
): string => {
	const [firstPlaceWins, firstPlaceLosses] = firstPlace.split("-");
	const [teamWins, teamLosses] = teamRecord.split("-");

	const gamesBack =
		(Number(firstPlaceWins) -
			Number(teamWins) +
			(Number(teamLosses) - Number(firstPlaceLosses))) /
		2;
	if (gamesBack === 0) return "-";

	if (gamesBack % 1 === 0) return gamesBack.toString();

	return gamesBack.toFixed(1);
};
