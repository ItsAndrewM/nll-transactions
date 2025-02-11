"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Image from "next/image";
import { Standing } from "@/types/standings";

export const teamsColumns: ColumnDef<Standing>[] = [
	{
		id: "team",
		accessorFn: (row) => ({
			name: row.name,
			logo: row.logo_url,
		}),
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="TEAM" sort={false} />
		),
		cell: ({ row }) => {
			const team = row.getValue("team") as { name: string; logo: string };
			return (
				<div className="flex justify-center items-center w-full">
					<Image src={team.logo} alt={team.name} width={32} height={32} />
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="NAME" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "position",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="POS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("position")}</div>,
	},
	{
		accessorKey: "wins",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="WINS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("wins")}</div>,
	},
	{
		accessorKey: "losses",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="LOSSES" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("losses")}</div>,
	},
	{
		accessorKey: "games_played",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GP" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("games_played")}</div>
		),
	},
	{
		accessorKey: "win_percentage",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="WIN %" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("win_percentage")}</div>
		),
	},
	{
		accessorKey: "goals_for",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GF" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("goals_for")}</div>,
	},
	{
		accessorKey: "goals_against",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GA" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("goals_against")}</div>
		),
	},
	{
		accessorKey: "goals_for_avg",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GF/G" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("goals_for_avg")}</div>
		),
	},
	{
		accessorKey: "goals_against_avg",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GA/G" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("goals_against_avg")}</div>
		),
	},
	{
		accessorKey: "goal_diff",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GD" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("goal_diff")}</div>,
	},
	{
		accessorKey: "goal_diff_avg",
		header: ({ column }) => (
			<ColumnHeader<Standing> column={column} text="GD/G" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("goal_diff_avg")}</div>
		),
	},
];
