"use client";
import { OutgoingMatch } from "@/types/schedule";
import { useRef } from "react";
import { imageUrls } from "@/data/image-urls";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function ScheduleList({
	schedule,
	selected,
}: {
	schedule: OutgoingMatch[];
	selected: string;
}) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const filtered = schedule.filter(
		(match) =>
			match.squads.away.displayName === selected ||
			match.squads.home.displayName === selected
	);
	return (
		<div
			className={cn(
				"flex flex-col gap-4 items-center justify-center py-6 w-full max-h-full overflow-visible md:max-h-[90vh] md:overflow-scroll "
			)}
			ref={scrollContainerRef}
		>
			<ul
				className={cn(
					"w-full text-left list-inside px-2 flex flex-col gap-4 max-h-full max-w-md md:max-w-full"
				)}
			>
				{!selected || selected === "all"
					? schedule.map((match) => (
							<li
								key={match.id}
								className="border px-4 py-6 rounded-md flex justify-between items-center"
							>
								<div className="flex justify-between items-center gap-2 w-fit">
									<Image
										className="w-7 h-7"
										src={
											imageUrls.find(
												(img) => img.name === match.squads.away.displayName
											)?.imageUrl || match.squads.away.displayName
										}
										alt={match.squads.away.displayName}
										width={28}
										height={28}
									/>
									<p className="font-bold  text-xs">
										{match.squads.away.name}{" "}
										{match.squads.away.displayName === selected ? "@" : "vs"}{" "}
										{match.squads.home.name}
									</p>
									<Image
										className="w-7 h-7"
										src={
											imageUrls.find(
												(img) => img.name === match.squads.home.displayName
											)?.imageUrl || match.squads.home.displayName
										}
										alt={match.squads.away.displayName}
										width={28}
										height={28}
									/>
								</div>
								{match.status.typeName === "Complete" ? (
									<div className="flex flex-end gap-2 text-sm">
										<span>Score:</span>
										<span>{match.squads.away.score?.score}</span>
										<span>-</span>
										<span>{match.squads.home.score?.score}</span>
									</div>
								) : (
									<div className="flex flex-end gap-2 text-sm">
										{Number(match.date.startDate.split("-")[2]).toString() +
											"/" +
											Number(match.date.startDate.split("-")[1]).toString()}
										<span>-</span>
										<span>
											{new Date(match.date.utcMatchStart).toLocaleTimeString(
												"en-US",
												{
													hour: "numeric",
													minute: "numeric",
													hour12: true,
													timeZoneName: "short",
												}
											)}
										</span>
									</div>
								)}
							</li>
					  ))
					: filtered.map((match) => (
							<li
								key={match.id}
								className="border px-4 py-6 rounded-md flex justify-between items-center"
							>
								{match.squads.away.displayName === selected ? (
									<div className="flex justify-between items-center gap-2 w-fit">
										<Image
											className="w-7 h-7"
											src={
												imageUrls.find(
													(img) => img.name === match.squads.away.displayName
												)?.imageUrl || match.squads.away.displayName
											}
											alt={match.squads.away.displayName}
											width={28}
											height={28}
										/>
										<p className="font-bold  text-xs">
											{match.squads.away.name}{" "}
											{match.squads.away.displayName === selected ? "@" : "vs"}{" "}
											{match.squads.home.name}
										</p>
										<Image
											className="w-7 h-7"
											src={
												imageUrls.find(
													(img) => img.name === match.squads.home.displayName
												)?.imageUrl || match.squads.home.displayName
											}
											alt={match.squads.away.displayName}
											width={28}
											height={28}
										/>
									</div>
								) : (
									<div className="flex justify-between items-center gap-2 w-fit">
										<Image
											className="w-7 h-7"
											src={
												imageUrls.find(
													(img) => img.name === match.squads.home.displayName
												)?.imageUrl || match.squads.home.displayName
											}
											alt={match.squads.away.displayName}
											width={28}
											height={28}
										/>
										<p className="font-bold  text-xs">
											{match.squads.home.name}{" "}
											{match.squads.away.displayName === selected ? "@" : "vs"}{" "}
											{match.squads.away.name}
										</p>
										<Image
											className="w-7 h-7"
											src={
												imageUrls.find(
													(img) => img.name === match.squads.away.displayName
												)?.imageUrl || match.squads.away.displayName
											}
											alt={match.squads.away.displayName}
											width={28}
											height={28}
										/>
									</div>
								)}
								{match.status.typeName === "Complete" ? (
									match.squads.away.displayName === selected ? (
										<div className="flex flex-end gap-2 text-sm">
											<span>{match.squads.away.score?.score}</span>
											<span>-</span>
											<span>{match.squads.home.score?.score}</span>
											<span
												className={cn(
													Number(match.squads.away.score?.score) >
														Number(match.squads.home.score?.score)
														? "text-green-500"
														: "text-red-500",
													"font-bold"
												)}
											>
												{Number(match.squads.away.score?.score) >
												Number(match.squads.home.score?.score)
													? "W"
													: "L"}
											</span>
										</div>
									) : (
										<div className="flex flex-end gap-2 text-sm">
											<span>{match.squads.home.score?.score}</span>
											<span>-</span>
											<span>{match.squads.away.score?.score}</span>
											<span
												className={cn(
													Number(match.squads.home.score?.score) >
														Number(match.squads.away.score?.score)
														? "text-green-500"
														: "text-red-500",
													"font-bold"
												)}
											>
												{Number(match.squads.home.score?.score) >
												Number(match.squads.away.score?.score)
													? "W"
													: "L"}
											</span>
										</div>
									)
								) : (
									<div className="flex flex-end gap-2 text-sm">
										{Number(match.date.startDate.split("-")[2]).toString() +
											"/" +
											Number(match.date.startDate.split("-")[1]).toString()}
										<span>-</span>
										<span>
											{new Date(match.date.utcMatchStart).toLocaleTimeString(
												"en-US",
												{
													hour: "numeric",
													minute: "numeric",
													hour12: true,
													timeZoneName: "short",
												}
											)}
										</span>
									</div>
								)}
							</li>
					  ))}
			</ul>
		</div>
	);
}
