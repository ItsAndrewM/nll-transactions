import { AndaHeader } from "@/components/anda-header";
import { StatsDataTable } from "@/components/data-table/stats-data-table";
import { teamsColumns } from "@/components/data-table/teams-columns";
import ChampionIcon from "@/components/icons/champion-icon";
import SecondPlaceIcon from "@/components/icons/second-place-icon";
import ThirdPlaceIcon from "@/components/icons/third-place-icon";
import { TeamCard } from "@/components/teams/team-card";
import { Separator } from "@/components/ui/separator";
import { calculateTeamRankings } from "@/lib/utils";
import { getStandings } from "@/server/standings";
import { Standing } from "@/types/standings";

export default async function TeamPage() {
	const teams = await getStandings();
	const sortedTeams = teams.sort(
		(a: Standing, b: Standing) => a.position - b.position
	);
	const rankings = calculateTeamRankings(teams);
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-4  pb-20">
			<AndaHeader />
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16 flex flex-col gap-4">
				<div className="w-full flex flex-col sm:flex-row justify-between items-center pt-2">
					<h1 className="text-4xl font-semibold mt-4 mb-2">NLL Teams</h1>
					<Separator className="my-4 sm:hidden" />
					<div className="flex flex-col gap-2 justify-center items-start">
						<h3 className="font-semibold text-center">Glossary</h3>
						<div className="flex gap-2 items-center">
							<div className="flex gap-2 items-center">
								<div className="text-white rounded-full p-2 shadow-lg bg-[#d4af37]">
									<ChampionIcon />
								</div>
								<small className="text-slate-500 font-semibold">1st</small>
							</div>
							<div className="flex gap-2 items-center">
								<div className="text-white rounded-full p-2 shadow-lg bg-gray-400">
									<SecondPlaceIcon />
								</div>
								<small className="text-slate-500 font-semibold">2nd</small>
							</div>
							<div className="flex gap-2 items-center">
								<div className="text-white rounded-full p-2 shadow-lg bg-amber-600">
									<ThirdPlaceIcon />
								</div>
								<small className="text-slate-500 font-semibold">3rd</small>
							</div>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{sortedTeams.map((team: Standing) => (
						<TeamCard
							key={team.team_id}
							team={team}
							goalsForRank={rankings.goalsForRanking.get(team.team_id)}
							goalsAgainstRank={rankings.goalsAgainstRanking.get(team.team_id)}
							goalsForAvgRank={rankings.goalsForAvgRanking.get(team.team_id)}
							goalsAgainstAvgRank={rankings.goalsAgainstAvgRanking.get(
								team.team_id
							)}
							goalDiffRank={rankings.goalDiffRanking.get(team.team_id)}
							goalDiffAvgRank={rankings.goalDiffAvgRanking.get(team.team_id)}
						/>
					))}
				</div>
			</div>
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm px-6 pb-16 flex flex-col gap-4">
				<h1 className="text-4xl font-semibold mt-4 mb-2">Team Stats</h1>
				<div className="w-full">
					<StatsDataTable
						columns={teamsColumns}
						data={sortedTeams}
						defaultSort="position"
						defaultSortDirection="asc"
					/>
				</div>
			</div>
		</div>
	);
}
