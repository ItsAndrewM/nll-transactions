import SchedulePage from "@/components/schedule-page";
import { liveGame } from "@/data/live-game";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";

import { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"NLL Schedule | List of Schedule and Results | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season games, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title:
			"NLL Schedule | List of Schedule and Results | NLL Tracker by andamonium",
		description:
			"Complete schedule of National Lacrosse League regular season games, including scores, statistics, and upcoming matches.",
		type: "website",
		images: [
			{
				url: "/og/facebook-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Games Schedule and Results",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "NLL Games | Schedule and Results | NLL Tracker by andamonium",
		description:
			"Complete schedule of National Lacrosse League regular season games, including scores, statistics, and upcoming matches.",
		images: [
			{
				url: "/og/twitter-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Games Schedule and Results",
			},
		],
	},
	alternates: {
		canonical: "/schedule",
	},
	keywords:
		"NLL, National Lacrosse League, Box Lacrosse, Game Schedule, Lacrosse Scores, Game Results, Box Scores, Live Scores, Upcoming Games",
	robots: {
		index: true,
		follow: true,
	},
};

export const revalidate = 3600;

export default async function Page() {
	const [schedule, teams, standings] = await Promise.all([
		getSchedule(),
		getListOfTeams(),
		getStandings(),
	]);
	const { id } = liveGame;
	const gameIndex = schedule.findIndex(
		(game: { id: number }) => game.id === id
	);
	const scheduleWithLiveGame = [
		...schedule.slice(0, gameIndex),
		...schedule.slice(gameIndex + 1),
		liveGame,
	];
	return (
		<SchedulePage
			schedule={scheduleWithLiveGame}
			teamsList={teams}
			standings={standings}
		/>
	);
}
