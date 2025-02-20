"use client";

import { ArrowUpCircle, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Transactions } from "@/types/transactions";
import Image from "next/image";
import { imageUrls } from "@/data/image-urls";
import { TransactionsFrontPageSelect } from "./transactions-front-page-select";
import Link from "next/link";
import { filterTransactionsByTeam, searchTransactions } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function TransactionsFrontPage({
	transactions,
}: {
	transactions: Transactions;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const scrollToTop = () => {
		const scrollArea = scrollContainerRef.current;
		if (scrollArea) {
			const viewport = scrollArea.querySelector(
				"[data-radix-scroll-area-viewport]"
			);
			viewport?.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const selected = searchParams.get("selected") || "";

	const searchQuery = searchParams.get("search") || "";

	const selectedTeam = filterTransactionsByTeam({
		data: transactions,
		teamName: selected,
	});

	const searchedTeam = searchTransactions({
		search: searchQuery,
		transactionData: selectedTeam,
	});

	const content: Record<
		string,
		Record<string, string[]>
	> = searchedTeam.transactions;

	const totalEntries = searchedTeam.total;

	const offset = searchParams.get("offset") || "10";

	const handleShowMore = () => {
		const newLimit = Math.min(Number(offset) + 10, totalEntries);
		const params = new URLSearchParams(window.location.search);
		params.set("offset", newLimit.toString());
		window.history.pushState({}, "", `${pathname}?${params.toString()}`);
	};

	return (
		<>
			<TransactionsFrontPageSelect />
			<ScrollArea
				className="h-[600px] rounded-lg border bg-white p-4 relative py-6 bg-card"
				ref={scrollContainerRef}
			>
				<div className="flex flex-col gap-6">
					{Object.keys(content)
						.slice(0, Number(offset))
						.map((day, idx) => (
							<div key={idx} className="flex flex-col gap-4">
								<div className="sticky top-0 z-10 flex items-center gap-2 py-2 bg-card">
									<Calendar className="h-5 w-5 text-orange-500" />
									<h2 className="text-lg font-semibold">
										<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
											{day}
										</span>
									</h2>
								</div>
								{Object.keys(content[day]).map((team, teamIdx) => (
									<Card key={teamIdx} className=" bg-background">
										<CardHeader className="flex flex-row items-center gap-4 pb-2">
											<Link
												href={`/teams/${
													imageUrls.find((img) => img.name === team)?.id
												}`}
												className="flex w-fit gap-2 hover:text-primary transition-colors duration-300 ease-in-out"
											>
												<Image
													className="w-7 h-7"
													src={
														imageUrls.find((img) => img.name === team)
															?.imageUrl || "/placeholder.svg"
													}
													alt={team}
													width={28}
													height={28}
													loading="lazy"
													decoding="async"
												/>
												<CardTitle className="font-bold flex items-center">
													{team}:
												</CardTitle>
											</Link>
										</CardHeader>
										<CardContent>
											<ul className="ml-4 list-disc space-y-1 text-sm">
												{content[day][team].map((move, moveIdx) => (
													<li key={moveIdx}>{move}</li>
												))}
											</ul>
										</CardContent>
									</Card>
								))}
							</div>
						))}
				</div>
				<div className="flex md:flex-row flex-col justify-center items-center gap-4 w-full p-6">
					<Button onClick={handleShowMore}>
						Show More ({Math.min(totalEntries - Number(offset), 10)} more)
					</Button>
					<div className="text-sm text-gray-500 ">
						Showing {Object.keys(content).slice(0, Number(offset)).length} of{" "}
						{totalEntries} entries
					</div>
				</div>
			</ScrollArea>
			<Button
				variant="outline"
				size="sm"
				className="mx-auto flex items-center gap-2"
				onClick={scrollToTop}
			>
				<ArrowUpCircle className="h-4 w-4" />
				Back to Top
			</Button>
		</>
	);
}
