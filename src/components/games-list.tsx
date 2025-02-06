import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import ScheduleGameCard from "./schedule-game-card";

type GamesListProps = {
	schedule: OutgoingMatch[];
	selected: string;
	isHomePage: {
		div: string;
		ul: string;
	} | null;
	filtered: OutgoingMatch[];
};

export default function GamesList({
	schedule,
	selected,
	isHomePage,
	filtered,
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
						/>
				  ))
				: filtered.map((match) => (
						<ScheduleGameCard
							match={match}
							selected={selected}
							key={match.id}
						/>
				  ))}
		</ul>
	);
}
