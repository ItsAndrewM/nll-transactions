import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoalieStat } from "@/types/games";

export const goalieColumns: ColumnDef<GoalieStat>[] = [
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
		cell: ({ row }) => <div className="pl-4">{row.getValue("number")}</div>,
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
		accessorKey: "min",
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
					MIN
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
		cell: ({ row }) => <div className="pl-4">{row.getValue("min")}</div>,
	},
	{
		accessorKey: "ga",
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
					GA
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
		cell: ({ row }) => <div className="pl-4">{row.getValue("ga")}</div>,
	},
	{
		accessorKey: "saves",
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
					SAVES
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
		cell: ({ row }) => <div className="pl-4">{row.getValue("saves")}</div>,
	},
];
