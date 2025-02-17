"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
	cn,
	filterTransactionsByTeam,
	reformatTransaction,
	searchTransactions,
} from "@/lib/utils";
import { Transactions } from "@/types/transactions";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { imageUrls } from "@/data/image-urls";
import { Card } from "../ui/card";

export interface TransactionsPanelProps {
	content: Transactions;
}

export default function MobileTransactions({
	content,
}: TransactionsPanelProps) {
	const searchParams = useSearchParams();
	const selected = searchParams.get("selected") || "";
	const router = useRouter();
	const pathname = usePathname();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const [limit, setLimit] = useState(10);
	const [showAll, setShowAll] = useState(false);
	const [newlyLoadedCount, setNewlyLoadedCount] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = useDebounce((value: string) => {
		setSearchTerm(value);
	}, 300);

	const selectedTeam = filterTransactionsByTeam({
		data: content,
		teamName: selected,
	});

	const searchedTeam = searchTransactions({
		search: searchTerm,
		transactionData: selectedTeam,
	});

	const allEntries = Object.entries(searchedTeam.transactions);

	const totalEntries = searchedTeam.total;

	const handleShowMore = () => {
		const newLimit = Math.min(limit + 10, totalEntries);
		setNewlyLoadedCount(newLimit - limit);
		router.push(`${pathname}#${limit}`, { scroll: true });
		setLimit(newLimit);
	};

	const handleShowAll = () => {
		setShowAll(true);
		setLimit(totalEntries);
	};

	const visibleEntries = showAll ? allEntries : allEntries.slice(0, limit);

	useEffect(() => {
		if (newlyLoadedCount > 0) {
			const timer = setTimeout(() => setNewlyLoadedCount(0), 2000);
			return () => clearTimeout(timer);
		}
	}, [newlyLoadedCount]);

	const scrollToTop = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div className="w-full flex flex-col items-center justify-start text-center relative gap-4  pb-24 lg:pb-0">
			<div className="flex gap-4 items-center justify-between w-full py-4 relative flex-nowrap flex-col">
				<h2 className="text-xl text-center font-bold w-full">Transactions</h2>
				<div className="flex justify-center items-center gap-4 w-full">
					<Button onClick={handleShowAll} disabled={showAll} size={"sm"}>
						Show All
					</Button>
					<Button variant={"outline"} size={"sm"} onClick={scrollToTop}>
						Back to Top
					</Button>
					<Button asChild size={"sm"}>
						<Link
							href={`/?order=${
								searchParams.get("order") === "desc" ||
								!searchParams.get("order")
									? "asc"
									: "desc"
							}`}
						>
							{" "}
							<span className="font-bold">Date:</span>{" "}
							{searchParams.get("order") === "desc" ||
							!searchParams.get("order") ? (
								<ArrowDown />
							) : (
								<ArrowUp />
							)}
						</Link>
					</Button>
				</div>
				<div className="flex justify-center items-center gap-4 w-full">
					<Input
						type="text"
						placeholder="Search transactions"
						className="max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
						onChange={(e) => handleSearch(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSearch(searchTerm);
							}
						}}
					/>
				</div>
			</div>
			<div
				className="flex flex-col gap-4 items-center justify-center "
				ref={scrollContainerRef}
			>
				<ul className="w-full text-left list-inside px-2 flex flex-col gap-4 max-h-full">
					<AnimatePresence>
						{visibleEntries.map(([key, value], index) => (
							<Card id={String(index)} key={key}>
								<motion.li
									initial={
										index >= visibleEntries.length - newlyLoadedCount
											? { opacity: 0, y: 20 }
											: false
									}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className={cn(
										"p-6",
										index >= visibleEntries.length - newlyLoadedCount
											? "bg-blue-50"
											: ""
									)}
								>
									<h4 className="font-bold underline">{key}</h4>
									<ul className="w-full text-left flex flex-col gap-2">
										{Object.entries(value as Record<string, string[]>).map(
											([subKey, subValue]) => (
												<li key={subKey} className="ml-4">
													<Link
														href={`/teams/${
															imageUrls.find((img) => img.name === subKey)?.id
														}`}
														className="flex w-fit gap-2 hover:text-primary transition-colors duration-300 ease-in-out"
													>
														<Image
															className="w-7 h-7"
															src={
																imageUrls.find((img) => img.name === subKey)
																	?.imageUrl || "/placeholder.svg"
															}
															alt={subKey}
															width={28}
															height={28}
															loading="lazy"
															decoding="async"
														/>
														<span className="font-bold">{subKey}:</span>
													</Link>
													<ul className="list-disc w-full list-inside ml-4">
														{subValue.map((transaction: string) => (
															<li key={transaction}>
																{reformatTransaction(transaction)}
															</li>
														))}
													</ul>
												</li>
											)
										)}
									</ul>
								</motion.li>
							</Card>
						))}
					</AnimatePresence>
				</ul>
			</div>
			<div className="flex justify-between items-start w-full gap-4 border-t-2 border-input pt-2">
				{!showAll && limit < totalEntries && (
					<div className="text-center">
						<Button onClick={handleShowMore}>
							Show More ({Math.min(totalEntries - limit, 10)} more)
						</Button>
					</div>
				)}

				<div className="text-sm text-gray-500 ">
					Showing {visibleEntries.length} of {totalEntries} entries
				</div>
			</div>
		</div>
	);
}
