import { OutgoingMatch } from "@/types/schedule";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const CORRECT_TEAM_NAMES = [
	"Rochester Knighthawks",
	"Saskatchewan Rush",
	"Halifax Thunderbirds",
	"Las Vegas Desert Dogs",
	"Buffalo Bandits",
	"Georgia Swarm",
	"Philadelphia Wings",
	"San Diego Seals",
	"Ottawa Black Bears",
	"Albany FireWolves",
	"Colorado Mammoth",
	"Vancouver Warriors",
	"Toronto Rock",
	"Calgary Roughnecks",
	"Panther City Lacrosse Club",
	"New York Riptide",
];

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

interface SearchTransactions {
	transactionData: {
		transactions: {
			[date: string]: {
				[teamName: string]: string[];
			};
		};
		order: string;
		total: number;
	};
	search: string;
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

export function searchTransactions({
	search,
	transactionData,
}: SearchTransactions) {
	if (!search.trim()) return transactionData;
	const checkedTeamNames = CORRECT_TEAM_NAMES.find((team) =>
		team.toLowerCase().includes(search.toLowerCase())
	);

	if (checkedTeamNames) {
		return filterTransactionsByTeam({
			data: transactionData,
			teamName: checkedTeamNames,
		});
	}

	const filteredTransactions = {} as typeof transactionData.transactions;

	Object.entries(transactionData.transactions).forEach(([date, teams]) => {
		const filteredTeams = Object.entries(teams).reduce(
			(acc, [teamName, transactions]) => {
				const found = transactions.filter((item) =>
					item.toLowerCase().includes(search.toLowerCase())
				);

				if (found.length > 0) {
					acc[teamName] = found;
				}
				return acc;
			},
			{} as { [teamName: string]: string[] }
		);

		// Only add the date if there are teams with matching transactions
		if (Object.keys(filteredTeams).length > 0) {
			filteredTransactions[date] = filteredTeams;
		}
	});

	return {
		...transactionData,
		total: Object.keys(filteredTransactions).length,
		transactions: filteredTransactions,
	};
}

export function generateGameUrl(match: OutgoingMatch) {
	const date = match.date.startDate;
	const id = match.id;
	const away = match.squads.away.displayName.replaceAll(" ", "-");
	const home = match.squads.home.displayName.replaceAll(" ", "-");
	return `https://www.nll.com/game/${id}/${away}-vs-${home}/${date}`.toLowerCase();
}
export function shareToFacebook(url: string) {
	const encodedUrl = encodeURIComponent(url);
	return `https://www.facebook.com/sharer.php?u=${encodedUrl}`;
}

export function shareToX(url: string) {
	const encodedUrl = encodeURIComponent(url);
	return `https://twitter.com/intent/tweet?url=${encodedUrl}`;
}

export function shareToInstagram() {
	window.location.href = `instagram://story-camera`;
}

export function reformatTransaction(transaction: string): string {
	const parts = transaction.replace("The ", "").split(" ");

	const teamNameEndIndex = parts.indexOf("have");

	const transactionWithoutTeam = parts.slice(teamNameEndIndex + 1).join(" ");

	if (transactionWithoutTeam.includes("signed")) {
		const [, firstName, lastName, ...rest] = transactionWithoutTeam.split(" ");
		const destination = rest.join(" ");
		return trimPeriods(`${firstName} ${lastName} signed ${destination}.`);
	} else if (transactionWithoutTeam.includes("released")) {
		const [, firstName, lastName, ...rest] = transactionWithoutTeam.split(" ");
		const source = rest.join(" ");
		return trimPeriods(`${firstName} ${lastName} released ${source}.`);
	} else if (transactionWithoutTeam.includes("placed")) {
		const [players, destination] = removePlaced(transactionWithoutTeam).split(
			" on "
		);
		return trimPeriods(`${players} placed on ${destination}.`);
	} else if (transactionWithoutTeam.includes("removed")) {
		const [, ...rest] = transactionWithoutTeam.split("removed the ");
		const [player, destination] = rest.join(" ").split(" and have ");
		return trimPeriods(`${player} removed and ${destination}.`);
	} else {
		return transaction;
	}
}

export const trimPeriods = (text: string): string => {
	return text.replace(/\.{2,}/g, ".");
};

export const removePlaced = (text: string): string => {
	return text
		.replace(/\bplaced\b/gi, "")
		.replace(/\s+/g, " ")
		.trim();
};

export function convertESTtoLocal(estTime: string): string {
	const [hours, minutes] = estTime.split(":").map(Number);
	if (hours < 0 || minutes < 0) return estTime;
	const gmtHours = hours + 5 - 24;
	const gmtMinutes = minutes;
	const utcDate = new Date(Date.UTC(0, 0, 0, gmtHours, gmtMinutes));

	const time = utcDate.toLocaleTimeString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});
	const offset = new Date().getTimezoneOffset();

	// Map common US timezone offsets to abbreviations
	const timezoneMap: Record<number, string> = {
		420: "PDT", // -7 hours
		480: "PST", // -8 hours
		360: "CDT", // -6 hours
		300: "EDT", // -5 hours
		240: "EDT", // -4 hours
	};

	return `${time} ${timezoneMap[offset] || `GMT${offset / -60}`}`;
}
