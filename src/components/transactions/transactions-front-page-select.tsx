"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useSearchParams } from "next/navigation";
import { useUpdateSearchParams } from "@/hooks/useUpdateSearchParams";
import { imageUrls } from "@/data/image-urls";
import Image from "next/image";
export function TransactionsFrontPageSelect() {
	const pathname = usePathname();

	const { searchQuery, handleSearchChange } = useUpdateSearchParams();

	const handleValueChange = (value: string) => {
		const params = new URLSearchParams(window.location.search);
		params.set("selected", value);
		window.history.pushState({}, "", `${pathname}?${params.toString()}`);
	};
	const selected = useSearchParams().get("selected") || "";

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
				<h2
					className="uppercase text-4xl font-bold md:text-left text-center"
					id="transactions"
				>
					<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
						Transactions
					</span>
				</h2>
				<div className="flex gap-2 w-full md:w-auto">
					<Select onValueChange={handleValueChange} value={selected}>
						<SelectTrigger className="md:w-[250px] w-full bg-card">
							<SelectValue placeholder="Select team" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">
								<div className="w-full flex justify-between items-center gap-4">
									<Image
										src={
											"https://www.nll.com/wp-content/uploads/2021/12/NLL-Shield-Logo.png"
										}
										alt="NLL Logo"
										width={20}
										height={24}
										className="w-6 h-6 object-contain"
										loading="lazy"
										decoding="async"
									/>
									<span className="">All Teams</span>
								</div>
							</SelectItem>
							{imageUrls.map((img) => (
								<SelectItem key={img.name} value={img.name}>
									<div className="w-full flex justify-between items-center gap-4">
										<Image
											src={img?.imageUrl}
											alt={img?.name}
											width={28}
											height={28}
											loading="lazy"
											decoding="async"
										/>
										<span className="">{img.name}</span>
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="icon" className="bg-card">
								<ListFilter className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem>Show All</DropdownMenuItem>
							<DropdownMenuItem>Active Roster Only</DropdownMenuItem>
							<DropdownMenuItem>Practice Squad Only</DropdownMenuItem>
							<DropdownMenuItem>Injured Reserve Only</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search transactions..."
					className="pl-10 bg-card"
					value={searchQuery}
					onChange={(e) => {
						handleSearchChange(e.target.value, pathname);
					}}
				/>
			</div>
		</div>
	);
}
