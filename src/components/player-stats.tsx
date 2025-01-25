"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	GoalieStat,
	PlayerStats as PlayerStatsType,
	RunnerStat,
} from "@/types/games";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const runnerColumns: ColumnDef<RunnerStat>[] = [
	{
		accessorKey: "number",
		header: ({ column }) => {
			console.log(column.getIsSorted());
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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

const goalieColumns: ColumnDef<GoalieStat>[] = [
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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
					) : column.getIsSorted() === "asc" ? (
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

function DataTable<TData>({
	columns,
	data,
}: {
	columns: ColumnDef<TData>[];
	data: TData[];
}) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		state: {
			sorting,
		},
	});

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id} className="">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}

export function PlayerStats({ playerStats }: { playerStats: PlayerStatsType }) {
	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Player Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="away" className="w-full">
					<TabsList>
						<TabsTrigger value="away">Away Team</TabsTrigger>
						<TabsTrigger value="home">Home Team</TabsTrigger>
					</TabsList>
					<TabsContent value="away">
						<h3 className="text-lg font-semibold mb-2">Runners</h3>
						<DataTable
							columns={runnerColumns}
							data={playerStats.away.runners}
						/>
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						<DataTable
							columns={goalieColumns}
							data={playerStats.away.goalies}
						/>
					</TabsContent>
					<TabsContent value="home">
						<h3 className="text-lg font-semibold mb-2">Runners</h3>
						<DataTable
							columns={runnerColumns}
							data={playerStats.home.runners}
						/>
						<h3 className="text-lg font-semibold mt-4 mb-2">Goalies</h3>
						<DataTable
							columns={goalieColumns}
							data={playerStats.home.goalies}
						/>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
