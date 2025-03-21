import { ArrowDownIcon, ArrowUpDownIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export const LoadingSkeleton = () => {
	// Define static column headers for skeleton
	const columnHeaders = [
		{ text: "TEAM", sort: false },
		{ text: "NAME", sort: true },
		{ text: "POS", sort: true },
		{ text: "WINS", sort: true },
		{ text: "LOSSES", sort: true },
		{ text: "GP", sort: true },
		{ text: "WIN %", sort: true },
		{ text: "GF", sort: true },
		{ text: "GA", sort: true },
		{ text: "GF/G", sort: true },
		{ text: "GA/G", sort: true },
		{ text: "GD", sort: true },
		{ text: "GD/G", sort: true },
	];

	// Generate rows for the skeleton table (14 teams)
	const skeletonRows = Array(14).fill(null);

	return (
		<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4">
			<div className="rounded-md border bg-background">
				<div className="relative w-full overflow-auto">
					<Table className="w-full caption-bottom text-sm relative">
						<TableHeader>
							<TableRow>
								{columnHeaders.map((column, index) => (
									<TableHead
										key={index}
										className="h-10 px-2 text-left align-middle font-medium text-muted-foreground"
									>
										{column.sort ? (
											<button className="whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 flex items-center gap-2 justify-start text-left">
												{column.text}
												<ArrowUpDownIcon className="h-4 w-4" />
											</button>
										) : (
											<div className="flex items-center gap-2 justify-center text-left">
												{column.text}
											</div>
										)}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{skeletonRows.map((_, rowIndex) => (
								<TableRow
									key={rowIndex}
									className="border-b transition-colors hover:bg-muted/50"
								>
									{/* Team logo cell */}
									<TableCell className="p-2 align-middle">
										<div className="flex justify-center items-center w-full">
											<Skeleton className="h-8 w-8 rounded-full" />
										</div>
									</TableCell>

									{/* Team name cell */}
									<TableCell className="p-2 align-middle">
										<div className="pl-4 text-left">
											<Skeleton className="h-4 w-32" />
										</div>
									</TableCell>

									{/* Generate skeleton cells for all the data columns */}
									{Array(11)
										.fill(null)
										.map((_, cellIndex) => (
											<TableCell key={cellIndex} className="p-2 align-middle">
												<div className="pl-4">
													<Skeleton className="h-4 w-12" />
												</div>
											</TableCell>
										))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};
