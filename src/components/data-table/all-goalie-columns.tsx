"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AllGoalieStats } from "@/types/games";
import ColumnHeader from "./column-header";
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "@/data/image-urls";

export const allGoalieColumns: ColumnDef<AllGoalieStats>[] = [
	{
		id: "team",
		accessorFn: (row) => ({
			name: row.team.name,
			logo: row.team.logo,
		}),
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="TEAM" sort={false} />
		),
		cell: ({ row }) => {
			const team = row.getValue("team") as { name: string; logo: string };
			return (
				<div className="flex justify-center items-center w-full ">
					<Link
						href={`/teams/${
							imageUrls.find((url) =>
								url?.name?.toLowerCase().includes(team?.name?.toLowerCase())
							)?.id
						}`}
						className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
					>
						<Image src={team.logo} alt={team.name} width={32} height={32} />
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "name",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="NAME" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("name")}</div>
		),
	},
	{
		accessorKey: "gp",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="GP" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("gp")}</div>
		),
	},
	{
		accessorKey: "wins",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="WINS" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("wins")}</div>
		),
	},
	{
		accessorKey: "losses",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="LOSSES" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("losses")}</div>
		),
	},
	{
		accessorKey: "mins",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="MINS" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("mins")}</div>
		),
	},

	{
		accessorKey: "goals_against",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="GA" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("goals_against")}
			</div>
		),
	},
	{
		accessorKey: "goals_against_average",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="GA/A" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("goals_against_average")}
			</div>
		),
	},
	{
		accessorKey: "save_percentage",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="SAVE %" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("save_percentage")}
			</div>
		),
	},
	{
		accessorKey: "saves",
		header: ({ column }) => (
			<ColumnHeader<AllGoalieStats> column={column} text="SAVES" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">{row.getValue("saves")}</div>
		),
	},
];
