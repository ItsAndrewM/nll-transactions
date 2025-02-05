"use client";

import { GameInfo } from "@/types/games";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const gameInfoColumns: ColumnDef<GameInfo>[] = [
	{ accessorKey: "date", header: "Date" },
	{
		accessorKey: "awayTeam",
		header: () => (
			<div className="flex items-center space-x-2 flex-nowrap">Away Team</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 flex-nowrap">
				<Image
					src={row.original.away.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.away.title} logo`}
					width={32}
					height={32}
					loading="eager"
					decoding="sync"
				/>
				<span className="pr-6 sm:pr-0">{row.original.away.title}</span>
			</div>
		),
	},
	{
		accessorKey: "homeTeam",
		header: () => (
			<div className="flex items-center space-x-2 flex-nowrap">Home Team</div>
		),
		cell: ({ row }) => (
			<div className="flex items-center space-x-2 flex-nowrap">
				<Image
					src={row.original.home.logo || `/placeholder.svg?height=32&width=32`}
					alt={`${row.original.home.title} logo`}
					width={32}
					height={32}
					loading="eager"
					decoding="sync"
				/>
				<span className="pr-6 sm:pr-0">{row.original.home.title}</span>
			</div>
		),
	},
	{
		accessorKey: "location",
		header: () => (
			<div className="flex items-center space-x-2 text-nowrap">Location</div>
		),
	},
];
