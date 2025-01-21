"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
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

const runnerColumns: ColumnDef<RunnerStat>[] = [
	{ accessorKey: "number", header: "#" },
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "g", header: "G" },
	{ accessorKey: "a", header: "A" },
	{ accessorKey: "pts", header: "PTS" },
	{ accessorKey: "sog", header: "SOG" },
	{ accessorKey: "lb", header: "LB" },
	{ accessorKey: "to", header: "TO" },
	{ accessorKey: "cto", header: "CTO" },
	{ accessorKey: "pim", header: "PIM" },
];

const goalieColumns: ColumnDef<GoalieStat>[] = [
	{ accessorKey: "number", header: "#" },
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "min", header: "MIN" },
	{ accessorKey: "ga", header: "GA" },
	{ accessorKey: "saves", header: "Saves" },
];

function DataTable<TData>({
	columns,
	data,
}: {
	columns: ColumnDef<TData>[];
	data: TData[];
}) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
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
									<TableCell key={cell.id}>
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
