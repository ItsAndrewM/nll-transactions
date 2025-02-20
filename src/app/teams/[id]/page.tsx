import { AndaHeader } from "@/components/anda-header";
import TeamHeader from "@/components/teams/team-header";
import TeamRoster from "@/components/teams/team-roster";
import TeamSchedule from "@/components/teams/team-schedule";
import { getStandings } from "@/server/standings";
import { getTeamRoster, getTeamWithSchedule } from "@/server/team";
import { Standing } from "@/types/standings";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = (await params).id;
	const team = await getTeamWithSchedule(id);

	const title = `${team.displayName} | NLL Tracker Team Profile`;
	const description = `NLL Tracker team profile of the ${team.displayName}. View team information, schedule, roster, and more.`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			url: `https://nlltracker.com/teams/${team.code.toLowerCase()}`,
			images: [
				{
					url: team.team_logo.url,
					alt: team.displayName,
					width: 300,
					height: 300,
				},
			],
			siteName: "NLL Tracker by andamonium",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [team.team_logo.url],
			site: "@NLLTracker",
			creator: "@andamonium_dev",
		},
		robots: {
			index: true,
			follow: true,
			nocache: true,
			googleBot: {
				index: true,
				follow: true,
				"max-image-preview": "large",
			},
		},
		alternates: {
			canonical: `/teams/${team.code.toLowerCase()}`,
		},
		keywords: `${team.displayName}, ${team.team_city}, NLL, National Lacrosse League, Box Lacrosse, Professional Lacrosse, ${team.name}`,
		category: "sports",
		other: {
			"apple-mobile-web-app-capable": "yes",
			"mobile-web-app-capable": "yes",
			"apple-mobile-web-app-title": team.displayName,
		},
	};
}

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export default async function TeamPage(props: { params: Params }) {
	const params = await props.params;

	const [teamData, standings] = await Promise.all([
		getTeamWithSchedule(params.id),
		getStandings(),
	]);
	const rosterData = await getTeamRoster(teamData?.name?.toLowerCase());

	if (!teamData || !rosterData) {
		notFound();
	}

	const teamStandings = standings.find(
		(standing: Standing) => standing.team_id === Number(params.id)
	);

	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<AndaHeader />
			<TeamHeader team={teamData} standings={teamStandings} />
			<div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full">
				<div>
					<TeamSchedule schedule={teamData.schedule} />
				</div>
				<div>
					<TeamRoster players={rosterData} />
				</div>
			</div>
		</div>
	);
}
