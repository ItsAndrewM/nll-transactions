"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "@/data/image-urls";
import { HistoricalPlayerStats } from "@/types/stats";

export const historicalRunnerColumns: ColumnDef<HistoricalPlayerStats>[] = [
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
		accessorKey: "gp",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="GP" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("gp")}</div>
		),
	},
	{
		accessorKey: "g",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="G" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("g")}</div>,
	},
	{
		accessorKey: "a",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="A" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("a")}</div>,
	},
	{
		accessorKey: "pts",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="PTS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("pts")}</div>,
	},
	{
		accessorKey: "lb",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="LB" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("lb")}</div>,
	},
	{
		accessorKey: "to",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="TO" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("to")}</div>,
	},
	{
		accessorKey: "cto",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="CTO" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("cto")}</div>,
	},
	{
		accessorKey: "pims",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="PIM" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("pims")}</div>,
	},
	{
		accessorKey: "ppg",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="PPG" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppg")}</div>,
	},
	{
		accessorKey: "ppa",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="PPA" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppa")}</div>,
	},
	{
		accessorKey: "bs",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="BS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("bs")}</div>,
	},
	{
		accessorKey: "fow",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="FOW" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("fow")}</div>,
	},
	{
		accessorKey: "foa",
		header: ({ column }) => (
			<ColumnHeader<HistoricalPlayerStats> column={column} text="FOA" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("foa")}</div>,
	},
];
