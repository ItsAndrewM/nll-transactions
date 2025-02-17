"use client";

import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Image from "next/image";
import Link from "next/link";
import { imageUrls } from "@/data/image-urls";
import { Player } from "@/types/players";
import { createFallbackName, getPosition } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const allPlayersColumns: ColumnDef<Player>[] = [
	{
		id: "team",
		accessorFn: (row) => ({
			name: row.team_name,
			logo:
				row.team_name !== ""
					? imageUrls.find((url) =>
							url?.name?.toLowerCase().includes(row?.team_name?.toLowerCase())
					  )?.imageUrl
					: null,
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
		id: "player",
		accessorFn: (row) => ({
			name: row.fullname,
			logo: row.headshot?.sizes?.thumbnail,
			id: row.id,
		}),
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="NAME" />
		),
		cell: ({ row }) => {
			const player = row.getValue("player") as {
				name: string;
				logo: string;
				id: string;
			};
			return (
				<div className="flex justify-center items-center w-full">
					<Link
						href={`/players/${player.id}`}
						className="flex justify-start items-center w-full"
					>
						<Avatar>
							<AvatarImage
								src={player.logo || "/placeholder.svg"}
								alt={player.name}
								width={32}
								height={32}
							/>
							<AvatarFallback>{createFallbackName(player.name)}</AvatarFallback>
						</Avatar>
						<div className="pl-4 text-left text-nowrap">{player.name}</div>
					</Link>
				</div>
			);
		},
	},
	{
		accessorKey: "jerseyNumber",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="#" />,
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				{row.getValue("jerseyNumber")}
			</div>
		),
	},
	{
		accessorKey: "position",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="POS" />,
		cell: ({ row }) => (
			<div className="pl-4">{getPosition(row.getValue("position"))}</div>
		),
	},
	{
		accessorKey: "height",
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="Height" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("height")}</div>,
	},
	{
		accessorKey: "weight",
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="WEIGHT" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("weight")}</div>,
	},
	{
		accessorKey: "ageYear",
		header: ({ column }) => <ColumnHeader<Player> column={column} text="AGE" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("ageYear")}</div>,
	},
	{
		accessorKey: "hometown",
		header: ({ column }) => (
			<ColumnHeader<Player> column={column} text="HOMETOWN" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("hometown")}</div>,
	},
];
