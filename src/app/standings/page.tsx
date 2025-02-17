import { AndaHeader } from "@/components/anda-header";
import Standings from "@/components/standings/standings";
import { getStandings } from "@/server/standings";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "NLL Standings | NLL Tracker by andamonium",
	description:
		"View all National Lacrosse League regular season standings, including completed game results and upcoming scheduled matches. Filter between completed and upcoming games with live scores, game previews, and post-game recaps.",
	openGraph: {
		title: "NLL Standings | NLL Tracker by andamonium",
		description:
			"Complete standings of National Lacrosse League regular season teams.",
		type: "website",
		images: [
			{
				url: "/og/facebook-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Team Standings",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "NLL Standings | NLL Tracker by andamonium",
		description:
			"Complete standings of National Lacrosse League regular season teams.",
		images: [
			{
				url: "/og/twitter-og-image.png",
				width: 1200,
				height: 630,
				alt: "NLL Team Standings",
			},
		],
	},
	alternates: {
		canonical: "/standings",
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
	const standings = await getStandings();
	return (
		<div className="container mx-auto px-4 py-8 max-w-3xl pb-20 flex flex-col gap-8">
			<AndaHeader />
			{/* <div className="max-w-md w-full mx-auto rounded-lg border bg-card text-card-foreground shadow-sm ">
				<h1 className="text-3xl font-bold text-center p-8">Standings</h1>
			</div> */}
			<Standings standings={standings} />
		</div>
	);
}
