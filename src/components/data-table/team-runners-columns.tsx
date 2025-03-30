"use client";

import { AllStats } from "@/types/games";
import { ColumnDef } from "@tanstack/react-table";
import ColumnHeader from "./column-header";
import Link from "next/link";
export const teamRunnerColumns: ColumnDef<AllStats>[] = [
	{
		accessorKey: "name",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="NAME" />
		),
		cell: ({ row }) => (
			<div className="pl-4 text-left text-nowrap">
				<Link href={`/players/${row.original.id}`} prefetch>
					{row.getValue("name")}
				</Link>
			</div>
		),
	},
	{
		accessorKey: "position",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="POS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("position")}</div>,
	},
	{
		accessorKey: "gp",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="GP" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("gp")}</div>,
	},
	{
		accessorKey: "g",
		header: ({ column }) => <ColumnHeader<AllStats> column={column} text="G" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("g")}</div>,
	},
	{
		accessorKey: "a",
		header: ({ column }) => <ColumnHeader<AllStats> column={column} text="A" />,
		cell: ({ row }) => <div className="pl-4">{row.getValue("a")}</div>,
	},
	{
		accessorKey: "pts",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="PTS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("pts")}</div>,
	},
	{
		accessorKey: "sog",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="SOG" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("sog")}</div>,
	},
	{
		accessorKey: "lb",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="LB" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("lb")}</div>,
	},
	{
		accessorKey: "to",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="TO" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("to")}</div>,
	},
	{
		accessorKey: "cto",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="CTO" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("cto")}</div>,
	},
	{
		accessorKey: "pims",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="PIM" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("pims")}</div>,
	},
	{
		accessorKey: "ppg",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="PPG" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppg")}</div>,
	},
	{
		accessorKey: "ppa",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="PPA" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("ppa")}</div>,
	},
	{
		accessorKey: "shg",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="SHG" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("shg")}</div>,
	},
	{
		accessorKey: "bs",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="BS" />
		),
		cell: ({ row }) => <div className="pl-4">{row.getValue("bs")}</div>,
	},
	{
		id: "foRatio", // Since we're using multiple values, we need a custom id
		accessorFn: (row) => ({ wins: row.fo.wins, attempts: row.fo.attempts }),
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="FO" />
		),
		cell: ({ row }) => {
			const data = row.getValue("foRatio") as {
				wins: number;
				attempts: number;
			};
			return (
				<div className="pl-4">
					{data.wins}/{data.attempts}
				</div>
			);
		},
	},
	{
		accessorKey: "foPercent",
		header: ({ column }) => (
			<ColumnHeader<AllStats> column={column} text="FO%" />
		),
		cell: ({ row }) => (
			<div className="pl-4">{row.getValue("foPercent") + "%"}</div>
		),
	},
];
