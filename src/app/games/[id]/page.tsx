import { PostGameSummary } from "@/components/post-game-summary";
import { PreGameInfo } from "@/components/pre-game-info";
import { getGame } from "@/server/games";

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
	const params = await props.params;
	const game = await getGame(params.id);

	const { status } = game;

	return (
		<div className="container mx-auto py-10">
			{status === "Scheduled" ? (
				<>
					<h1 className="text-3xl font-bold mb-8">Pre-Game Information</h1>
					<PreGameInfo data={game} />{" "}
				</>
			) : (
				<>
					<h1 className="text-3xl font-bold mb-8">Post Game Summary</h1>
					<PostGameSummary gameData={game} />
				</>
			)}
		</div>
	);
}
