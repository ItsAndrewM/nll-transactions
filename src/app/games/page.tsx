import { getGames } from "@/server/games";
import { GameData } from "@/types/games";

export default async function Page() {
	const games = await getGames();
	return (
		<div>
			Games:
			<ul>
				{games.map((game: GameData) => (
					<li key={game.id}>{game.id}</li>
				))}
			</ul>
		</div>
	);
}
