import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Standing } from "@/types/standings";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { RankingIcon } from "@hugeicons/core-free-icons";
import SecondPlaceIcon from "../icons/second-place-icon";
import ThirdPlaceIcon from "../icons/third-place-icon";
import ChampionIcon from "../icons/champion-icon";

interface RankingProps {
	goalsForRank?: number;
	goalsAgainstRank?: number;
	goalsForAvgRank?: number;
	goalsAgainstAvgRank?: number;
	goalDiffRank?: number;
	goalDiffAvgRank?: number;
}

export function TeamCard({
	team,
	goalsForRank,
	goalsAgainstRank,
	goalsForAvgRank,
	goalsAgainstAvgRank,
	goalDiffRank,
	goalDiffAvgRank,
}: { team: Standing } & RankingProps) {
	const winPercentage = Number.parseFloat(team.win_percentage) * 100;

	return (
		<Card className="w-full max-w-md mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg relative bg-background">
			{team.position > 3 ? (
				<Badge
					variant="secondary"
					className="absolute -top-3 -right-3 text-white rounded-full shadow-lg size-9 text-center"
				>
					#{team.position}
				</Badge>
			) : null}
			{team.position <= 3 ? (
				<div
					className={cn(
						"absolute -top-3 -right-3 text-white rounded-full p-2 shadow-lg",
						{
							"bg-[#d4af37]": team.position === 1,
							"bg-gray-400": team.position === 2,
							"bg-amber-600": team.position === 3,
						}
					)}
				>
					{team.position === 1 ? (
						<ChampionIcon />
					) : team.position === 2 ? (
						<SecondPlaceIcon />
					) : (
						<ThirdPlaceIcon />
					)}
				</div>
			) : null}

			<CardContent className="pt-6">
				<div className="flex justify-between items-center mb-6">
					<Image
						src={team.logo_url || "/placeholder.svg"}
						alt={`${team.name} logo`}
						width={80}
						height={80}
					/>
					<div className="text-right">
						<h2 className="text-xl sm:text-2xl font-bold">{team.name}</h2>
						<p className="text-gray-500">{team.city}</p>
					</div>
				</div>

				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2 text-gray-500">
							<span className="text-lg font-semibold">Record</span>
							<HugeiconsIcon
								icon={RankingIcon}
								className="text-gray-500"
								size={20}
							/>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-lg font-bold">
								{team.wins}-{team.losses}
							</span>
							<span className="text-sm text-gray-500">
								({winPercentage.toFixed(1)}%)
							</span>
						</div>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<StatBox
							label="GF/G"
							value={team.goals_for_avg}
							rank={goalsForAvgRank}
						/>
						<StatBox
							label="GA/G"
							value={team.goals_against_avg}
							rank={goalsAgainstAvgRank}
						/>
						<StatBox label="GF" value={team.goals_for} rank={goalsForRank} />
						<StatBox
							label="GA"
							value={team.goals_against}
							rank={goalsAgainstRank}
						/>
						<StatBox label="GD" value={team.goal_diff} rank={goalDiffRank} />
						<StatBox
							label="GD/G"
							value={team.goal_diff_avg}
							rank={goalDiffAvgRank}
						/>
					</div>
				</div>
			</CardContent>
			{team.clinch_text && (
				<CardFooter className="bg-orange-100/50 justify-between py-3">
					<span className="text-sm text-green-600 font-medium">
						{team.clinch_text}
					</span>
				</CardFooter>
			)}

			<Link
				href={`/teams/${team.team_id}`}
				className="absolute inset-0 z-10"
				aria-label={`View ${team.name} details`}
			/>
		</Card>
	);
}

function StatBox({
	label,
	value,
	rank,
}: {
	label: string;
	value: string | number;
	rank?: number;
}) {
	return (
		<div
			className={cn(
				"flex items-center justify-between p-3 rounded-lg",
				"bg-gray-50/80 relative"
			)}
		>
			<div>
				<p className="text-sm text-gray-500">{label}</p>
				<p className="text-lg font-bold">{value}</p>
			</div>
			{rank && rank <= 3 && (
				<div
					className={cn("rounded-full p-2 absolute -top-3 -right-3", {
						"bg-[#d4af37]": rank === 1,
						"bg-gray-400": rank === 2,
						"bg-amber-600": rank === 3,
					})}
				>
					{rank === 1 ? (
						<ChampionIcon />
					) : rank === 2 ? (
						<SecondPlaceIcon />
					) : (
						<ThirdPlaceIcon />
					)}
				</div>
			)}
		</div>
	);
}
