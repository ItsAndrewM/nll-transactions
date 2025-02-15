import { notFound } from "next/navigation";
import { PlayerHero } from "@/components/players/player-hero";
import { PlayerDetails } from "@/components/players/player-details";
import { PlayerTeamInfo } from "@/components/players/player-team-info";
import { PlayerBio } from "@/components/players/player-bio";
import { PlayerSocials } from "@/components/players/player-socials";
import { getPlayer } from "@/server/players";
import { AndaHeader } from "@/components/anda-header";

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const player = await getPlayer(params.id);
	if (!player) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<AndaHeader />
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<PlayerHero player={player} />
				<PlayerDetails player={player} />
				<PlayerTeamInfo player={player} />
				<PlayerBio player={player} />
			</div>

			{/* Social Media Links */}
			<PlayerSocials player={player} />
		</div>
	);
}
