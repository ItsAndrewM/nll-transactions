import { Metadata } from "next";
import { AndaHeader } from "@/components/anda-header";
import { Suspense } from "react";
import { SchedulePageContainer } from "@/components/scheduled/schedule-page-container";
import { LoadingSkeleton as SchedulePageContainerLoadingSkeleton } from "@/components/scheduled/skeleton-schedule-container";

export const metadata: Metadata = {
	title: "NLL Games | Schedule and Results | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season games, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title: "NLL Games | Schedule and Results",
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
		canonical: "/games",
	},
	keywords:
		"NLL, National Lacrosse League, Box Lacrosse, Game Schedule, Lacrosse Scores, Game Results, Box Scores, Live Scores, Upcoming Games",
	robots: {
		index: true,
		follow: true,
	},
};

export default function Page() {
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<AndaHeader />
			<h2 className="uppercase text-4xl font-bold md:text-left text-center">
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Scheduled, Live, and Completed Games
				</span>
			</h2>
			<Suspense fallback={<SchedulePageContainerLoadingSkeleton />}>
				<SchedulePageContainer />
			</Suspense>
		</div>
	);
}
