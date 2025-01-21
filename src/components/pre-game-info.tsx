"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { GameInfo, PreGameData, PreGameTeamStats } from "@/types/games";

const gameInfoColumns: ColumnDef<GameInfo>[] = [
	{ accessorKey: "date", header: "Date" },
	{
		accessorKey: "awayTeam",
		header: "Away Team",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2">
				<Image
					src={row.original.away.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.away.title} logo`}
					width={32}
					height={32}
					className="rounded-full"
				/>
				<span>{row.original.away.title}</span>
			</div>
		),
	},
	{
		accessorKey: "homeTeam",
		header: "Home Team",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2">
				<Image
					src={row.original.home.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.home.title} logo`}
					width={32}
					height={32}
					className="rounded-full"
				/>
				<span>{row.original.home.title}</span>
			</div>
		),
	},
	{ accessorKey: "location", header: "Location" },
];

const teamStatsColumns: ColumnDef<
	PreGameTeamStats & { team: string; logo: string }
>[] = [
	{
		accessorKey: "team",
		header: "Team",
		cell: ({ row }) => (
			<div className="flex items-center space-x-2">
				<Image
					src={row.original.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.team} logo`}
					width={32}
					height={32}
					className="rounded-full"
				/>
				<span>{row.original.team}</span>
			</div>
		),
	},
	{ accessorKey: "gp", header: "GP" },
	{ accessorKey: "wins", header: "W" },
	{ accessorKey: "losses", header: "L" },
	{ accessorKey: "winPerc", header: "Win %" },
	{ accessorKey: "gf", header: "GF" },
	{ accessorKey: "ga", header: "GA" },
	{ accessorKey: "gd", header: "GD" },
	{ accessorKey: "gpg", header: "GPG" },
	{ accessorKey: "gapg", header: "GAPG" },
];

export function PreGameInfo({ data }: { data: PreGameData }) {
	const gameInfoData = [data.game_info];
	const teamStatsData = [
		{
			...data.team_stats.away,
			team: data.game_info.away.title,
			logo: data.game_info.away.logo,
		},
		{
			...data.team_stats.home,
			team: data.game_info.home.title,
			logo: data.game_info.home.logo,
		},
	];

	return (
		<div className="space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Game Information</CardTitle>
				</CardHeader>
				<CardContent>
					<DataTable columns={gameInfoColumns} data={gameInfoData} />
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Team Statistics</CardTitle>
				</CardHeader>
				<CardContent>
					<DataTable columns={teamStatsColumns} data={teamStatsData} />
				</CardContent>
			</Card>
		</div>
	);
}
