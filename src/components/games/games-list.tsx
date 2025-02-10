import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import ScheduleGameCard from "../scheduled/schedule-game-card";

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

export default function GamesList({
	schedule,
	selected,
	isHomePage,
	filtered,
	className,
}: GamesListProps) {
	return (
		<ul
			className={cn(
				"w-full text-left list-inside px-2 flex flex-col gap-4 max-h-full pb-24",
				isHomePage?.ul
			)}
		>
			{!selected || selected === "all"
				? schedule.map((match) => (
						<ScheduleGameCard
							match={match}
							selected={selected}
							key={match.id}
							className={className}
						/>
				  ))
				: filtered.map((match) => (
						<ScheduleGameCard
							match={match}
							selected={selected}
							key={match.id}
							className={className}
						/>
				  ))}
		</ul>
	);
}
