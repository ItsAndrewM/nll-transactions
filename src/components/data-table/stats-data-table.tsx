"use client";

import {
	type ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

interface FilterConfig {
	path?: string; // Optional path to nested property (e.g., 'name' for player.name)
}

export function StatsDataTable<TData>({
	columns,
	data,
	paginate = false,
	filter = false,
	defaultSort = "pts",
	defaultSortDirection = "desc",
	filterValue = "name",
	filterConfig,
}: {
	columns: ColumnDef<TData>[];
	data: TData[];
	paginate?: boolean;
	filter?: boolean;
	defaultSort?: string;
	defaultSortDirection?: "asc" | "desc";
	filterValue?: string;
	filterConfig?: FilterConfig;
}) {
	const [sorting, setSorting] = useState<SortingState>([
		{ id: defaultSort || "pts", desc: defaultSortDirection === "desc" },
	]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getNestedValue = (obj: any, path?: string) => {
		if (!path) return obj;
		const value = path.split(".").reduce((acc, part) => acc?.[part], obj);
		return value ?? obj;
	};

	const columnsWithFilter = columns.map((col) => {
		if (col.id === filterValue) {
			return {
				...col,
				enableColumnFilter: true,
				filterFn: (
					row: { getValue: (id: string) => unknown },
					columnId: string,
					filterValue: string
				) => {
					const value = row.getValue(columnId);
					const searchValue = getNestedValue(value, filterConfig?.path);

					if (searchValue === null || searchValue === undefined) return false;

					return String(searchValue)
						.toLowerCase()
						.includes(String(filterValue).toLowerCase());
				},
			};
		}
		return col;
	});

	const table = useReactTable({
		data,
		columns: columnsWithFilter,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		sortDescFirst: true,
		getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
		onColumnFiltersChange: filter ? setColumnFilters : undefined,
		getFilteredRowModel: filter ? getFilteredRowModel() : undefined,
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className="rounded-md border bg-background">
			{filter ? (
				<div className="sm:flex grid grid-cols-2 sm:flex-row gap-2 items-center p-4">
					<Input
						placeholder={`Filter by ${filterValue}...`}
						value={
							(table
								.getColumn(filterValue || "name")
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn(filterValue || "name")
								?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" className="ml-auto">
								Columns <ChevronDown />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			) : null}
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

			{paginate ? <DataTablePagination table={table} /> : null}
		</div>
	);
}
