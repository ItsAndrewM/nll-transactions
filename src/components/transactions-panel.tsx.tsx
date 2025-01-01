"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn, filterTransactionsByTeam } from "@/lib/utils";
import { Transactions } from "@/types/transactions";

interface TransactionsPanelProps {
	selected: string;
	content: Transactions;
}

export default function TransactionsPanel({
	content,
	selected,
}: TransactionsPanelProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const [limit, setLimit] = useState(10);
	const [showAll, setShowAll] = useState(false);
	const [newlyLoadedCount, setNewlyLoadedCount] = useState(0);
	const selectedTeam = filterTransactionsByTeam({
		data: content,
		teamName: selected,
	});
	const allEntries = Object.entries(selectedTeam.transactions);

	const totalEntries = content.total;

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
		<div className="border-l-2 border-r-2 w-full flex flex-col items-center justify-start text-center relative gap-4 px-6">
			<div className="flex gap-4 items-center justify-between w-full py-4 relative flex-nowrap border-b-2 border-input">
				<h2 className="text-xl text-left font-bold w-full">Transactions</h2>
				<div className="flex justify-end items-center gap-4 w-full">
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
			</div>
			<div
				className="flex flex-col gap-4 items-center justify-center max-h-[480px] overflow-scroll "
				ref={scrollContainerRef}
			>
				<ul className="w-full text-left list-inside max-w-md px-2 flex flex-col gap-4 max-h-full">
					<AnimatePresence>
						{visibleEntries.map(([key, value], index) => (
							<div id={String(index)} key={key}>
								<motion.li
									initial={
										index >= visibleEntries.length - newlyLoadedCount
											? { opacity: 0, y: 20 }
											: false
									}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className={cn(
										"border p-4 rounded-md",
										index >= visibleEntries.length - newlyLoadedCount
											? "bg-blue-50"
											: ""
									)}
								>
									<h4 className="font-bold underline">{key}</h4>
									<ul className="w-full text-left flex flex-col gap-2">
										{Object.entries(value).map(([subKey, subValue]) => (
											<li key={subKey} className="ml-4">
												<span className="font-bold">{subKey}:</span>{" "}
												<ul className="list-disc w-full list-inside ml-4">
													{subValue.map((transaction: string) => (
														<li key={transaction}>{transaction}</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</motion.li>
							</div>
						))}
					</AnimatePresence>
				</ul>
			</div>
			<div className="flex flex-col w-full gap-4 border-t-2 border-input pt-6">
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
