"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PlayerCard } from "./player-card";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from "@/hooks/usePagination";
import { cn, createFallbackName } from "@/lib/utils";
import { Player } from "@/types/players";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { imageUrls } from "@/data/image-urls";
import Image from "next/image";

export function PlayerCardContainer({
	players,
	total,
}: {
	players: Player[];
	total: number;
}) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const pageQuery = searchParams.get("page");
	const limitQuery = searchParams.get("limit");
	const teamQuery = searchParams.get("team");
	const team = teamQuery !== "all" ? Number(teamQuery) : null;
	const filteredPlayers = team
		? players.filter((player) => Number(player.team_id) === Number(team))
		: players;
	const currentPage = Number(pageQuery) || 1;
	const limit =
		limitQuery !== "all"
			? Number(limitQuery) || 12
			: Number(filteredPlayers.length) || Number(total);
	const totalPages =
		filteredPlayers.length === total
			? Math.ceil(total / limit)
			: Math.ceil(filteredPlayers.length / limit);

	const startIndex = (currentPage - 1) * limit;
	const endIndex = startIndex + limit;

	const slicedPlayers = filteredPlayers.slice(startIndex, endIndex);

	const pageNumbers = usePagination(totalPages, currentPage);

	return (
		<div className="flex flex-col w-full gap-6">
			<h3 className="text-lg font-semibold mt-4 mb-2">Player View</h3>
			<div className="flex items-center gap-2">
				<Select
					onValueChange={(value) =>
						router.push(`/players?limit=${value}${team ? "&team=" + team : ""}`)
					}
					defaultValue={String(limit)}
					value={String(limit)}
				>
					<SelectTrigger className="w-[180px] bg-background border-muted py-1 px-3">
						<SelectValue placeholder="Select a limit" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Limit</SelectLabel>
							<SelectItem value="12">12</SelectItem>
							<SelectItem value="24">24</SelectItem>
							<SelectItem value="50">50</SelectItem>
							<SelectItem value="100">100</SelectItem>
							<SelectItem value="all">All</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Select
					onValueChange={(value) =>
						router.push(
							`/players?team=${value}${limit ? "&limit=" + limit : ""}`
						)
					}
					value={team ? String(team) : ""}
				>
					<SelectTrigger className="w-[220px] bg-background border-muted py-1 px-3">
						<SelectValue placeholder="Select a Team" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Team</SelectLabel>
							{imageUrls
								.filter((url) => url.id !== 0)
								.map((imageUrl) => (
									<SelectItem key={imageUrl.name} value={String(imageUrl.id)}>
										<div className="w-full flex justify-between items-center gap-4">
											<Image
												className="w-7 h-7 object-contain"
												src={imageUrl.imageUrl}
												alt={createFallbackName(imageUrl.name)}
												decoding="async"
												loading="lazy"
												width={28}
												height={28}
											/>
											{imageUrl.name}
										</div>
									</SelectItem>
								))}
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
										decoding="async"
										loading="lazy"
									/>
									<span className="">All</span>
								</div>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{slicedPlayers.map((player) => (
					<PlayerCard key={player.id} player={player} />
				))}
			</div>
			<Pagination>
				<PaginationContent>
					{currentPage > 1 ? (
						<PaginationItem>
							<PaginationPrevious
								href={`/players?page=${currentPage - 1}${
									team ? "&team=" + team : ""
								}${limit ? "&limit=" + limit : ""}`}
								className={cn(
									currentPage === 1
										? "pointer-events-none"
										: "pointer-events-auto"
								)}
								prefetch
							/>
						</PaginationItem>
					) : null}
					{pageNumbers.map((pageNumber, index) => (
						<PaginationItem key={index}>
							{pageNumber === "..." ? (
								<PaginationEllipsis />
							) : (
								<PaginationLink
									href={`/players?page=${pageNumber}${
										team ? "&team=" + team : ""
									}${limit ? "&limit=" + limit : ""}`}
									isActive={currentPage === Number(pageNumber)}
									prefetch
								>
									{pageNumber}
								</PaginationLink>
							)}
						</PaginationItem>
					))}
					{currentPage < totalPages ? (
						<PaginationItem>
							<PaginationNext
								href={`/players?page=${currentPage + 1}${
									team ? "&team=" + team : ""
								}${limit ? "&limit=" + limit : ""}`}
								className={cn(
									currentPage === totalPages
										? "pointer-events-none"
										: "pointer-events-auto"
								)}
								prefetch
							/>
						</PaginationItem>
					) : null}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
