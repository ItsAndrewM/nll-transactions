import { AndaHeader } from "@/components/anda-header";
import { ScheduleLoading } from "@/components/scheduled/schedule-loading";
import SchedulePage from "@/components/scheduled/schedule-page";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";
// import { Calendar01Icon } from "@hugeicons/core-free-icons";
// import { HugeiconsIcon } from "@hugeicons/react";

import { Metadata } from "next";
import { Suspense } from "react";

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
	// const [schedule, teams, standings] = await Promise.all([
	// 	getSchedule(),
	// 	getListOfTeams(),
	// 	getStandings(),
	// ]);
	const schedule = await getSchedule();
	const teams = await getListOfTeams();
	const standings = await getStandings();

	return (
		<div className="container mx-auto px-4 py-8 pb-20 max-w-3xl flex flex-col">
			<AndaHeader />
			{/* <div className="max-w-md w-full mx-auto rounded-lg border bg-card text-card-foreground shadow-sm ">
				<h1 className="text-3xl font-bold text-center p-8 flex items-center justify-center gap-2">
					<HugeiconsIcon icon={Calendar01Icon} size={30} strokeWidth={0.5} />
					Schedule
				</h1>
			</div> */}
			<Suspense fallback={<ScheduleLoading />}>
				<SchedulePage
					schedule={schedule}
					teamsList={teams}
					standings={standings}
				/>
			</Suspense>
		</div>
	);
}
