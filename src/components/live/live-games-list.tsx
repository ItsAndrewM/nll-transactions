import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import LiveGameCard from "./live-game-card";
import { Separator } from "../ui/separator";

type GamesListProps = {
	schedule: OutgoingMatch[];
	selected: string;
	isHomePage: {
		div: string;
		ul: string;
	} | null;
	filtered: OutgoingMatch[];
	className?: string;
};

export default function LiveGamesList({
	schedule,
	selected,
	isHomePage,
	filtered,
	className,
}: GamesListProps) {
	return (
		<ul
			className={cn(
				"w-full text-left list-inside px-2 flex flex-col gap-4 max-h-full pb-24 ",
				isHomePage?.ul
			)}
		>
			{!selected || selected === "all" ? (
				schedule.map((match) => (
					<LiveGameCard
						match={match}
						selected={selected}
						key={match.id}
						className={className}
					/>
				))
			) : filtered.length > 0 ? (
				filtered.map((match) => (
					<LiveGameCard
						match={match}
						selected={selected}
						key={match.id}
						className={className}
					/>
				))
			) : (
				<>
					<li>
						No live games for the <span>{selected}</span>
					</li>
					<Separator />
					{schedule.map((match) => (
						<LiveGameCard
							match={match}
							selected={selected}
							key={match.id}
							className={className}
						/>
					))}
				</>
			)}
		</ul>
	);
}
