"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "@/data/image-urls";
import { Player } from "@/types/players";

export const allRunnerColumns: ColumnDef<Player>[] = [
	{
		id: "team",
		accessorFn: (row) => ({
			name: row.team_name,
			logo: imageUrls.find(
				(url) => url.name.toLowerCase() === row.team_name.toLowerCase()
			)?.imageUrl,
		}),
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="TEAM" sort={false} />
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
						<Image src={team.logo} alt={team.name} width={32} height={32} />
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "fullName",
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="NAME" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("fullName")}
			</div>
		),
	},
	{
		accessorKey: "g",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="G" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("g")}</div>,
	},
	{
		accessorKey: "a",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="A" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("a")}</div>,
	},
	{
		accessorKey: "pts",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="PTS" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("pts")}</div>,
	},
	{
		accessorKey: "sog",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="SOG" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("sog")}</div>,
	},
	{
		accessorKey: "lb",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="LB" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("lb")}</div>,
	},
	{
		accessorKey: "to",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="TO" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("to")}</div>,
	},
	{
		accessorKey: "cto",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="CTO" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("cto")}</div>,
	},
	{
		accessorKey: "pims",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="PIM" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("pims")}</div>,
	},
	{
		accessorKey: "ppg",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="PPG" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppg")}</div>,
	},
	{
		accessorKey: "ppa",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="PPA" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppa")}</div>,
	},
	{
		accessorKey: "shg",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="SHG" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("shg")}</div>,
	},
	{
		accessorKey: "bs",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="BS" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("bs")}</div>,
	},
];
