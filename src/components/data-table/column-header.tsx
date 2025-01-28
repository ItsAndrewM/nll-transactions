import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

interface ColumnHeaderProps<TData> {
	column: Column<TData, unknown>;
	text: string;
	sort?: boolean;
}

export default function ColumnHeader<TData>({
	column,
	text,
	sort = true,
}: ColumnHeaderProps<TData>) {
	if (!sort) {
		return (
			<div className="flex items-center gap-2 justify-center text-left">
				{text}
			</div>
		);
	}
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
			{text}
			{column.getIsSorted() === false ? (
				<ArrowUpDown />
			) : column.getIsSorted() === "desc" ? (
				<ArrowUp />
			) : (
				<ArrowDown />
			)}
		</Button>
	);
}
