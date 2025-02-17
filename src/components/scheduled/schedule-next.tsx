"use client";
import { OutgoingMatch } from "@/types/schedule";
import { Standing } from "@/types/standings";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function ScheduleNext({
	schedule,
	standings,
}: {
	schedule: OutgoingMatch[];
	standings: Standing[];
}) {
	const selected = useSearchParams().get("selected") || "";
	if (selected === "all") {
		return null;
	}
	const next = schedule
		.filter((match) => match.status.typeName === "Upcoming")
		.filter(
			(match) =>
				match.squads.away.displayName === selected ||
				match.squads.home.displayName === selected
		)[0];

	const opponent =
		next.squads.away.displayName !== selected
			? next.squads.away.displayName
			: next.squads.home.displayName;

	const opponentStanding = standings.find((team) => team.name === opponent);
	const { position, logo_url, name } = opponentStanding || {};

	const date = new Date(next.date.utcMatchStart);
	const today = new Date();

	const gameTime = new Date(next.date.utcMatchStart).toLocaleTimeString(
		"en-US",
		{
			hour: "numeric",
			minute: "numeric",
			hour12: true,
			timeZoneName: "short",
		}
	);

	let day = "";
	switch (true) {
		case date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear():
			day = "Today";
			break;
		case date.getDate() === today.getDate() + 1 &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear():
			day = "Tomorrow";
			break;
		default:
			day = `${date.getDate()}/${date.getMonth() + 1}`;
	}

	return (
		<div className="flex flex-wrap w-full items-center justify-center text-sm">
			<p className="w-full font-bold">Next</p>
			<div className="w-full flex justify-between items-center">
				<div className="flex justify-start items-center gap-2 w-fit">
					<Image
						className="w-7 h-7"
						src={logo_url || "nll-favicon-1.png"}
						alt="NLL Logo"
						width={28}
						height={28}
						loading="lazy"
						decoding="async"
					/>
					<small className="text-slate-400 font-bold">{position}</small>
					<p>{name}</p>
				</div>
				<div className="flex justify-end items-center gap-2 w-fit">
					<p>{day}</p>
					<span>-</span>
					<p>{gameTime}</p>
				</div>
			</div>
		</div>
	);
}
