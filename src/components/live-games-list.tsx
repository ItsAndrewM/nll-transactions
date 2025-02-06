import { cn } from "@/lib/utils";
import { OutgoingMatch } from "@/types/schedule";
import LiveGameCard from "./live-game-card";
import { Separator } from "./ui/separator";

type GamesListProps = {
	schedule: OutgoingMatch[];
	selected: string;
	isHomePage: {
		div: string;
		ul: string;
	} | null;
	filtered: OutgoingMatch[];
};

export default function LiveGamesList({
	schedule,
	selected,
	isHomePage,
	filtered,
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
					<LiveGameCard match={match} selected={selected} key={match.id} />
				))
			) : filtered.length > 0 ? (
				filtered.map((match) => (
					<LiveGameCard match={match} selected={selected} key={match.id} />
				))
			) : (
				<>
					<li>
						No live games for the <span>{selected}</span>
					</li>
					<Separator />
					{schedule.map((match) => (
						<LiveGameCard match={match} selected={selected} key={match.id} />
					))}
				</>
			)}
		</ul>
	);
}
