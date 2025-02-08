"use client";

import { GameData } from "@/types/games";
import { GameCard } from "./game-card";
import ReverseToggle from "./reverse-toggle";
import { useState } from "react";

export default function GamesCardList({
	gamesList,
	title,
}: {
	gamesList: GameData[];
	title: string;
}) {
	const [checked, setChecked] = useState(false);

	const list = !checked ? [...gamesList].reverse() : gamesList;

	return (
		<>
			<h3 className="text-lg font-semibold mt-4 mb-2">{title} Games</h3>
			<ReverseToggle setChecked={setChecked} checked={checked} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{list.map((game: GameData) => (
					<GameCard key={game.id} game={game} />
				))}
			</div>
		</>
	);
}
