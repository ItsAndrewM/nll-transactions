"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats as PlayerStatsType } from "@/types/games";

import { StatsDataTable } from "./stats-data-table";
import { GoalieDataTable } from "./goalie-data-table";
import { runnerColumns } from "./data-table/runner-columns";
import { goalieColumns } from "./data-table/goalie-columns";

export function PlayerStats({ playerStats }: { playerStats: PlayerStatsType }) {
	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Player Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="away" className="w-full">
					<TabsList>
						<TabsTrigger value="away">Away Team</TabsTrigger>
						<TabsTrigger value="home">Home Team</TabsTrigger>
					</TabsList>
					<TabsContent value="away">
						<h3 className="text-lg font-semibold mb-2">Runners</h3>
						<StatsDataTable
							columns={runnerColumns}
							data={playerStats.away.runners}
						/>
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						<GoalieDataTable
							columns={goalieColumns}
							data={playerStats.away.goalies}
						/>
					</TabsContent>
					<TabsContent value="home">
						<h3 className="text-lg font-semibold mb-2">Runners</h3>
						<StatsDataTable
							columns={runnerColumns}
							data={playerStats.home.runners}
						/>
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						<GoalieDataTable
							columns={goalieColumns}
							data={playerStats.home.goalies}
						/>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
