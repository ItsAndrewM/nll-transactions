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
	return <Standings standings={standings} />;
}
