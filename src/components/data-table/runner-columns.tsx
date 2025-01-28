"use client";

import { RunnerStat } from "@/types/games";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const runnerColumns: ColumnDef<RunnerStat>[] = [
	{
		accessorKey: "number",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					#
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-6">{row.getValue("number")}</div>,
	},
	{
		accessorKey: "name",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					Name
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("name")}</div>,
	},
	{
		accessorKey: "g",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					G
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("g")}</div>,
	},
	{
		accessorKey: "a",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					A
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("a")}</div>,
	},
	{
		accessorKey: "pts",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					PTS
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("pts")}</div>,
	},
	{
		accessorKey: "sog",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					SOG
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("sog")}</div>,
	},
	{
		accessorKey: "lb",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					LB
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("lb")}</div>,
	},
	{
		accessorKey: "to",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					TO
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("to")}</div>,
	},
	{
		accessorKey: "cto",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					CTO
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("cto")}</div>,
	},
	{
		accessorKey: "pim",
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className={cn(
						column.getIsSorted() !== false
							? "font-medium text-black bg-accent"
							: null,
						"flex items-center gap-2 justify-start text-left"
					)}
				>
					PIM
					{column.getIsSorted() === false ? (
						<ArrowUpDown />
					) : column.getIsSorted() === "desc" ? (
						<ArrowUp />
					) : (
						<ArrowDown />
					)}
				</Button>
			);
		},
		cell: ({ row }) => <div className="pl-4">{row.getValue("pim")}</div>,
	},
];
