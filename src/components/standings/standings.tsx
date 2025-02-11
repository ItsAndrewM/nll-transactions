"use client";

import { calculateGamesBack, cn } from "@/lib/utils";
import { Standing } from "@/types/standings";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";

export default function Standings({ standings }: { standings: Standing[] }) {
	const pathname = usePathname();
	const isHomePage =
		!pathname.includes("standings") && !pathname.includes("stats")
			? "bg-background border-none"
			: "bg-card";
	return (
		<Card
			className={cn(
				"w-full flex flex-col items-center justify-start text-center relative px-6 pb-24 md:pb-0 max-w-3xl mx-auto",
				isHomePage
			)}
		>
			<CardHeader className="flex gap-4 items-center justify-between w-full py-4 relative flex-nowrap flex-col">
				<h2 className="text-xl text-center font-bold w-full">
					2024-25 Standings
				</h2>
			</CardHeader>
			<Separator className="mb-4" />
			<div className="w-full flex flex-col gap-4 items-center justify-center">
				<ul className="w-full text-left list-inside px-2 flex flex-col gap-2">
					<li className="w-full flex justify-between items-center">
						<p className="font-bold text-center">Team</p>
						<p className="font-bold text-center">GB</p>
					</li>
					{standings.map((team) => (
						<li
							key={team.team_id}
							className="w-full flex justify-between items-center px-0 py-2 border-b border-secondary last:my-4 last:border-b-0 dark:border-gray-800"
						>
							<Link
								href={`/teams/${team.team_id}`}
								className="flex flex-row justify-between gap-2 hover:text-primary transition-colors duration-300 ease-in-out"
							>
								<p className="font-bold">{team.position}</p>
								<Image
									className="w-7 h-7"
									src={team.logo_url}
									alt={team.name}
									width={28}
									height={28}
									loading="lazy"
									decoding="async"
								/>
								<p className="font-bold">{team.name}</p>
								<span className="text-slate-400">
									({team.wins}-{team.losses})
								</span>
							</Link>
							<p>
								{calculateGamesBack(
									standings[0].wins + "-" + standings[0].losses,
									team.wins + "-" + team.losses
								)}
							</p>
						</li>
					))}
				</ul>
			</div>
		</Card>
	);
}
