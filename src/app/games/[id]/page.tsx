import { AndaHeader } from "@/components/anda-header";
import LiveGameSummary from "@/components/live/live-game-summary";
import { PostGameSummary } from "@/components/summary/post-game-summary";
import { PreGameInfo } from "@/components/summary/pre-game-info";
import { syncGames } from "@/server/games";
import type { Metadata } from "next";
import { Suspense } from "react";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = (await params).id;
	const data = await syncGames(id);

	const { game_summary: game } = data || {};

	const { status } = game || {};

	if (status !== "Scheduled") {
		const { away, home, finalScore, date, location } = game.game_info;

		const title = `${away.title} ${finalScore.away} at ${home.title} ${finalScore.home} | NLL Game Recap`;
		const description = `Full game recap and stats from ${away.title} (${finalScore.away}) at ${home.title} (${finalScore.home}) played on ${date} at ${location}. View box score, game leaders, and complete team statistics.`;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
				type: "article",
				publishedTime: game.created_at,
				modifiedTime: game.updated_at,
				images: [
					{
						url: home.logo,
						alt: home.title,
						width: 300,
						height: 300,
					},
					{
						url: away.logo,
						alt: away.title,
						width: 300,
						height: 300,
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title,
				description,
				images: [home.logo, away.logo],
			},
			robots: {
				index: true,
				follow: true,
			},
			alternates: {
				canonical: `/games/${id}`,
			},
			keywords: `${away.title}, ${home.title}, NLL, National Lacrosse League, Box Lacrosse, ${location}, Game Recap, Box Score`,
		};
	} else {
		const { away, home, date, time, location } = game.game_info;
		const { team_stats } = game;

		const title = `${away.title} (${team_stats.away.wins}-${team_stats.away.losses}) at ${home.title} (${team_stats.home.wins}-${team_stats.home.losses}) | NLL Game Preview`;
		const description = `${away.title} visits ${home.title} on ${date} at ${time} at ${location}. Vancouver (${team_stats.away.wins}-${team_stats.away.losses}) averaging ${team_stats.away.gpg} goals per game while Halifax (${team_stats.home.wins}-${team_stats.home.losses}) scoring ${team_stats.home.gpg} per game.`;

		return {
			title,
			description,
			openGraph: {
				title,
				description,
				type: "article",
				publishedTime: game.created_at,
				modifiedTime: game.updated_at,
				images: [
					{
						url: home.logo,
						alt: home.title,
						width: 300,
						height: 300,
					},
					{
						url: away.logo,
						alt: away.title,
						width: 300,
						height: 300,
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title,
				description,
				images: [home.logo, away.logo],
			},
			robots: {
				index: true,
				follow: true,
			},
			alternates: {
				canonical: `/games/${id}`,
			},
			keywords: `${away.title}, ${home.title}, NLL, National Lacrosse League, Box Lacrosse, ${location}, Game Preview, Upcoming Game`,
		};
	}
}

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;

	const data = await syncGames(params.id);

	const { game_summary: game, live_game: liveGame } = data || {};

	const { status } = game || {};

	if (status?.toLowerCase() === "live") {
		return (
			<div className="container mx-auto py-10">
				<AndaHeader />
				<Suspense fallback={<div>Loading...</div>}>
					<LiveGameSummary gameData={game} liveGame={liveGame} />{" "}
				</Suspense>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-10">
			<AndaHeader />
			<Suspense fallback={<div>Loading...</div>}>
				{status === "Scheduled" ? (
					<PreGameInfo data={game} />
				) : (
					<PostGameSummary gameData={game} />
				)}
			</Suspense>
		</div>
	);
}
