"use client";

import { PreGameTeamStats } from "@/types/games";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const teamStatsColumns: ColumnDef<
	PreGameTeamStats & { team: string; logo: string }
>[] = [
	{
		accessorKey: "team",
		header: () => (
			<div className="flex items-center space-x-2 flex-nowrap">Team</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 flex-nowrap">
				<Image
					src={row.original.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.team} logo`}
					width={32}
					height={32}
				/>
				<span className="pr-6 sm:pr-0">{row.original.team}</span>
			</div>
		),
	},
	{ accessorKey: "gp", header: "GP" },
	{ accessorKey: "wins", header: "W" },
	{ accessorKey: "losses", header: "L" },
	{
		accessorKey: "winPerc",
		header: () => (
			<div className="flex items-center space-x-2 text-nowrap">Win %</div>
		),
	},
	{ accessorKey: "gf", header: "GF" },
	{ accessorKey: "ga", header: "GA" },
	{ accessorKey: "gd", header: "GD" },
	{ accessorKey: "gpg", header: "GPG" },
	{ accessorKey: "gapg", header: "GAPG" },
];
