import { OutgoingMatch } from "@/types/schedule";
import { Standing } from "@/types/standings";
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

interface TeamRankings {
	goalsForRanking: Map<number, number>; // teamId -> rank
	goalsAgainstRanking: Map<number, number>; // teamId -> rank
	goalsForAvgRanking: Map<number, number>; // teamId -> rank
	goalsAgainstAvgRanking: Map<number, number>; // teamId -> rank
	goalDiffRanking: Map<number, number>; // teamId -> rank
	goalDiffAvgRanking: Map<number, number>; // teamId -> rank
}

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
		str?.split(" ")[0]?.charAt(0)?.toUpperCase() +
		str?.split(" ")[1]?.charAt(0)?.toUpperCase()
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
	if (hours === undefined || minutes === undefined) return estTime;
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

export const liveGameFetcher = async ([url, apiKey]: [string, string]) => {
	try {
		const res = await fetch(url, {
			headers: {
				"x-api-key": apiKey,
			},
		});
		if (!res.ok) throw new Error("Failed to fetch game data");
		const data = await res.json();
		if (!data.success) throw new Error("Failed to fetch game data");
		return data.scheduleById;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const liveGamesFetcher = async ([url, apiKey]: [string, string]) => {
	try {
		const res = await fetch(url, {
			headers: {
				"x-api-key": apiKey,
			},
		});

		if (!res.ok)
			throw new Error(
				`Failed to fetch game data: ${res.status} ${res.statusText}`
			);

		const data = await res.json();
		if (!data.success) throw new Error("API returned success: false");

		const liveGames = data.schedule.filter(
			(game: OutgoingMatch) => game?.status?.typeName === "Live"
		);

		return liveGames;
	} catch (error) {
		console.error("Error fetching live games:", error);
		return null;
	}
};
export const recrawledFetcher = async ([url, apiKey]: [string, string]) => {
	try {
		const res = await fetch(url, {
			headers: {
				"x-api-key": apiKey,
			},
		});
		if (!res.ok) throw new Error("Failed to fetch game data");
		const data = await res.json();
		if (!data.success) throw new Error("Failed to fetch game data");
		return data.data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export function calculateTeamRankings(teams: Standing[]): TeamRankings {
	function assignRankings(
		sortedTeams: Standing[],
		getValue: (team: Standing) => number
	): Map<number, number> {
		const rankings = new Map<number, number>();
		let currentRank = 1;
		let currentValue = getValue(sortedTeams[0]);
		let sameRankCount = 0;

		sortedTeams.forEach((team) => {
			const value = getValue(team);

			if (value === currentValue) {
				// Same value as previous team, use same rank
				sameRankCount++;
			} else {
				// Different value, update rank to skip tied positions
				currentRank += sameRankCount;
				currentValue = value;
				sameRankCount = 1;
			}

			rankings.set(team.team_id, currentRank);
		});

		return rankings;
	}

	const sortedByGoalsFor = [...teams].sort((a, b) => b.goals_for - a.goals_for);

	const sortedByGoalsAgainst = [...teams].sort(
		(a, b) => a.goals_against - b.goals_against
	);

	const sortedByGoalsForAvg = [...teams].sort(
		(a, b) =>
			Number.parseFloat(b.goals_for_avg) - Number.parseFloat(a.goals_for_avg)
	);

	const sortedByGoalsAgainstAvg = [...teams].sort(
		(a, b) =>
			Number.parseFloat(a.goals_against_avg) -
			Number.parseFloat(b.goals_against_avg)
	);

	const sortedByGoalDiff = [...teams].sort((a, b) => b.goal_diff - a.goal_diff);

	const sortedByGoalDiffAvg = [...teams].sort(
		(a, b) => b.goal_diff_avg - a.goal_diff_avg
	);

	return {
		goalsForRanking: assignRankings(sortedByGoalsFor, (team) =>
			Number.parseFloat(team.goals_for.toString())
		),
		goalsAgainstRanking: assignRankings(sortedByGoalsAgainst, (team) =>
			Number.parseFloat(team.goals_against.toString())
		),
		goalsForAvgRanking: assignRankings(sortedByGoalsForAvg, (team) =>
			Number.parseFloat(team.goals_for_avg)
		),
		goalsAgainstAvgRanking: assignRankings(sortedByGoalsAgainstAvg, (team) =>
			Number.parseFloat(team.goals_against_avg)
		),
		goalDiffRanking: assignRankings(sortedByGoalDiff, (team) => team.goal_diff),
		goalDiffAvgRanking: assignRankings(
			sortedByGoalDiffAvg,
			(team) => team.goal_diff_avg
		),
	};
}

export const getTeamColors = (teamCode: string) => {
	const colorMap: { [key: string]: [string, string] } = {
		BUF: ["hsl(19, 96%, 55%)", "hsl(267, 100%, 30%)"],
		SAS: ["hsl(101, 48%, 52%)", "hsl(0, 0%, 0%)"],
		CGY: ["hsl(220, 3%, 83%)", "hsl(345, 6%, 13%)"],
		COL: ["hsl(352, 59%, 34%)", "hsl(0, 0%, 0%)"],
		PHI: ["hsl(48, 36%, 47%)", "hsl(192, 3%, 34%)"],
		GA: ["hsl(35, 98%, 64%)", "hsl(214, 52%, 19%)"],
		OBB: ["hsl(350, 85%, 42%)", "hsl(34, 8%, 16%)"],
		HFX: ["hsl(16, 100%, 60%)", "hsl(268, 46%, 36%)"],
		VAN: ["hsl(41, 29%, 48%)", "hsl(0, 0%, 0%)"],
		SD: ["hsl(270, 61%, 38%)", "hsl(42, 99%, 50%)"],
		ROC: ["hsl(78, 31%, 27%)", "hsl(38, 41%, 56%)"],
		TOR: ["hsl(218, 100%, 32%)", "hsl(3, 82%, 49%)"],
		LV: ["hsl(0, 0%, 0%)", "hsl(0, 0%, 100%)"],
		ALB: ["hsl(348, 44%, 33%)", "hsl(0, 0%, 100%)"],
	};
	return colorMap[teamCode] || ["hsl(215, 16%, 47%)", "hsl(217, 19%, 27%)"]; // Default colors
};

export function getPosition(position: string) {
	switch (position) {
		case "F":
			return "Forward";
		case "T":
			return "Transition";
		case "G":
			return "Goalie";
		case "D":
			return "Defense";
		default:
			return "Unknown";
	}
}

export const getTeamBackgroundColors = (teamCode: string) => {
	const colorMap: { [key: string]: [string, string] } = {
		BUF: ["bg-buffalo", "bg-buffalo-secondary"], // Buffalo Bandits
		SAS: ["bg-saskatchewan", "bg-saskatchewan-secondary"], // Saskatchewan Rush
		CGY: ["bg-calgary", "bg-calgary-secondary"], // Calgary Roughnecks
		COL: ["bg-colorado", "bg-colorado-secondary"], // Colorado Mammoth
		PHI: ["bg-philadelphia", "bg-philadelphia-secondary"], // Philadelphia Wings
		GA: ["bg-georgia", "bg-georgia-secondary"], // Georgia Swarm
		OBB: ["bg-ottawa", "bg-ottawa-secondary"], // Ottawa Black Bears
		HFX: ["bg-halifax", "bg-halifax-secondary"], // Halifax Thunderbirds
		VAN: ["bg-vancouver", "bg-vancouver-secondary"], // Vancouver Warriors
		SD: ["bg-sandiego", "bg-sandiego-secondary"], // San Diego Seals
		ROC: ["bg-rochester", "bg-rochester-secondary"], // Rochester Knighthawks
		TOR: ["bg-toronto", "bg-toronto-secondary"], // Toronto Rock
		LV: ["bg-lasvegas", "bg-lasvegas-secondary"], // Las Vegas Desert Dogs
		ALB: ["bg-albany", "bg-albany-secondary"], // Albany FireWolves
	};
	return colorMap[teamCode] || ["bg-buffalo", "bg-buffalo-secondary"]; // Default colors if team not found
};

export function getSuffix(position: number): string {
	switch (position) {
		case 1:
			return "1st";
		case 2:
			return "2nd";
		case 3:
			return "3rd";
		default:
			return `${position}th`;
	}
}

export const getIANATimezone = (timezoneStr: string | undefined): string => {
	if (!timezoneStr) return "America/New_York"; // Default fallback

	// Handle specific Canadian timezone mappings
	const canadianTimezones: Record<string, string> = {
		"Canada/Eastern": "America/Toronto",
		"Canada/Central": "America/Winnipeg",
		"Canada/Mountain": "America/Edmonton",
		"Canada/Pacific": "America/Vancouver",
		"Canada/Atlantic": "America/Halifax",
		"Canada/Newfoundland": "America/St_Johns",
		"Canada/Saskatchewan": "America/Regina",
		Saskatchewan: "America/Regina", // Handle Saskatchewan directly
		Eastern: "America/New_York",
		Central: "America/Chicago",
		Mountain: "America/Denver",
		Pacific: "America/Los_Angeles",
		Atlantic: "America/Halifax",
	};

	// Check if we have a specific mapping
	if (canadianTimezones[timezoneStr]) {
		return canadianTimezones[timezoneStr];
	}

	// If it's already a valid IANA timezone, return it directly
	try {
		// Quick test to see if the timezone is valid
		Intl.DateTimeFormat("en-US", { timeZone: timezoneStr });
		return timezoneStr;
	} catch (e) {
		console.warn(`Invalid timezone: ${e}, falling back to America/New_York`);
		return "America/New_York"; // Default if invalid
	}
};

export const getLocalTime = (utcMatchStart: string) => {
	try {
		// Format time in user's local timezone (no timeZone parameter)
		const userLocalTime = new Date(utcMatchStart).toLocaleTimeString("en-US", {
			hour: "numeric" as const,
			minute: "numeric" as const,
			hour12: true,
		});

		// Get user's timezone abbreviation
		const userTimeZone =
			new Date()
				.toLocaleTimeString("en-US", {
					timeZoneName: "short" as const,
				})
				.split(" ")
				.pop() || "";

		return `${userLocalTime} ${userTimeZone}`;
	} catch (e) {
		console.error(`Error formatting local time: ${e}`);
		return new Date(utcMatchStart).toLocaleTimeString("en-US");
	}
};

export function getLocalDate(utcMatchStart: string, venueTimezone: string) {
	try {
		return new Date(utcMatchStart).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			timeZone: venueTimezone, // Use venue timezone for the date too
		});
	} catch (e) {
		console.error(`Error formatting date: ${e}`);
		// Fallback to a simple date format
		return new Date(utcMatchStart).toLocaleDateString("en-US");
	}
}
