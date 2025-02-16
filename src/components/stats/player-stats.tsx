"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlayerStats as PlayerStatsType } from "@/types/games";

import { StatsDataTable } from "../data-table/stats-data-table";
import { runnerColumns } from "../data-table/runner-columns";
import { goalieColumns } from "../data-table/goalie-columns";

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
						{playerStats?.away ? (
							<StatsDataTable
								columns={runnerColumns}
								data={playerStats.away.runners}
							/>
						) : null}
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						{playerStats?.away ? (
							<StatsDataTable
								columns={goalieColumns}
								data={playerStats.away.goalies}
								defaultSort="min"
								defaultSortDirection="desc"
							/>
						) : null}
					</TabsContent>
					<TabsContent value="home">
						<h3 className="text-lg font-semibold mb-2">Runners</h3>
						{playerStats?.home ? (
							<StatsDataTable
								columns={runnerColumns}
								data={playerStats.home.runners}
							/>
						) : null}
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						{playerStats?.home ? (
							<StatsDataTable
								columns={goalieColumns}
								data={playerStats.home.goalies}
								defaultSort="min"
								defaultSortDirection="desc"
							/>
						) : null}
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
