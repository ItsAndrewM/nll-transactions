"use client";
import { OutgoingMatch } from "@/types/schedule";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import GamesList from "./games-list";
import LiveIndicator from "./live-indicator";
import LiveGamesList from "./live-games-list";

export default function ScheduleList({
	schedule,
	selected,
}: {
	schedule: OutgoingMatch[];
	selected: string;
}) {
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const pathname = usePathname();
	const filtered = schedule.filter(
		(match) =>
			match.squads.away.displayName === selected ||
			match.squads.home.displayName === selected
	);

	const homePageStyles = {
		div: "md:max-h-[90vh] md:overflow-scroll",
		ul: "max-w-md md:max-w-full",
	};

	const isHomePage = !pathname.includes("schedule") ? homePageStyles : null;

	const liveGames =
		schedule.filter((game) => game.status.typeName === "Live") || [];
	console.log(liveGames);

	const filteredLiveGames = liveGames.filter(
		(match) =>
			match.squads.away.displayName === selected ||
			match.squads.home.displayName === selected
	);

	return (
		<div
			className={cn(
				"flex flex-col gap-6 items-center justify-start py-6 w-full max-h-full overflow-visible",
				isHomePage?.div
			)}
			ref={scrollContainerRef}
		>
			<div className="w-full flex justify-between items-center">
				<Tabs defaultValue="all" className="w-full max-w-md mx-auto">
					<TabsList>
						<TabsTrigger
							value="all"
							className="text-xs lg:text-sm flex xl:gap-1"
						>
							<span>All</span> <span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger
							value="completed"
							className="text-xs md:text-sm flex xl:gap-1"
						>
							<span>Completed</span>
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger
							value="scheduled"
							className="text-xs md:text-sm flex xl:gap-1"
						>
							<span>Scheduled</span>{" "}
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
						{liveGames.length > 0 ? (
							<TabsTrigger
								value="live"
								className="text-xs md:text-sm flex xl:gap-1"
							>
								<span>Live</span>{" "}
								<LiveIndicator className="ml-2 block xl:hidden" />
								<span className="hidden xl:block">Games</span>
								<LiveIndicator className="ml-2 hidden xl:block" />
							</TabsTrigger>
						) : null}
					</TabsList>
					<TabsContent value="completed">
						<h3 className="text-lg font-semibold mt-4 mb-2">Completed Games</h3>
						<GamesList
							schedule={schedule.filter(
								(match) => match.status.name === "Complete"
							)}
							selected={selected}
							filtered={filtered.filter(
								(match) => match.status.name === "Complete"
							)}
							isHomePage={isHomePage}
						/>
					</TabsContent>
					<TabsContent value="scheduled">
						<h3 className="text-lg font-semibold mt-4 mb-2">Scheduled Games</h3>
						<GamesList
							schedule={schedule.filter(
								(match) => match.status.name === "Scheduled"
							)}
							selected={selected}
							filtered={filtered.filter(
								(match) => match.status.name === "Scheduled"
							)}
							isHomePage={isHomePage}
						/>
					</TabsContent>
					<TabsContent value="all">
						<h3 className="text-lg font-semibold mt-4 mb-2">All Games</h3>
						<GamesList
							schedule={schedule}
							selected={selected}
							filtered={filtered}
							isHomePage={isHomePage}
						/>
					</TabsContent>
					<TabsContent value="live">
						<h3 className="text-lg font-semibold mt-4 mb-2">Live Games</h3>
						<LiveGamesList
							schedule={liveGames}
							selected={selected}
							filtered={filteredLiveGames}
							isHomePage={isHomePage}
						/>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
