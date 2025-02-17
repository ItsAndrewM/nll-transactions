"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "@/data/image-urls";
import { HistoricalPlayerStats } from "@/types/stats";

export const historicalGoalieColumns: ColumnDef<HistoricalPlayerStats>[] = [
	{
		id: "team",
		accessorFn: (row) => ({
			name: row.team,
			logo:
				row.team !== ""
					? imageUrls.find((url) =>
							url?.name?.toLowerCase().includes(row?.team?.toLowerCase())
					  )?.imageUrl
					: null,
		}),
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats>
				column={column}
				text="TEAM"
				sort={false}
			/>
		),
		cell: ({ row }) => {
			const team = row.getValue("team") as { name: string; logo: string };
			return (
				<div className="flex justify-center items-center w-full">
					<Link
						href={`/teams/${
							imageUrls.find((url) =>
								url?.name?.toLowerCase().includes(team?.name?.toLowerCase())
							)?.id
						}`}
						className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
					>
						{!team.name ||
						!imageUrls.find((url) => url.name.includes(team.name)) ? (
							<div className="pl-4">{team.name}</div>
						) : (
							<Image src={team.logo} alt={team.name} width={32} height={32} />
						)}
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "year",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="YEAR" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("year")}</div>,
	},
	{
		accessorKey: "minutes",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="MINS" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("minutes")}
			</div>
		),
	},
	{
		accessorKey: "gp",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="GP" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("gp")}</div>
		),
	},
	{
		accessorKey: "wins",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="WINS" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("wins")}</div>
		),
	},
	{
		accessorKey: "losses",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="LOSSES" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("losses")}</div>
		),
	},
	{
		accessorKey: "ga",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="GA" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("ga")}</div>
		),
	},
	{
		accessorKey: "gaa",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="GA/A" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("gaa")}</div>
		),
	},
	{
		accessorKey: "savePerc",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="SAVE %" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("savePerc")}
			</div>
		),
	},
	{
		accessorKey: "saves",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="SAVES" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("saves")}</div>
		),
	},
];
