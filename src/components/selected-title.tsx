"use client";
import { getSuffix } from "@/lib/utils";
import { Standing } from "@/types/standings";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SelectedTitle({
	standings,
}: {
	standings: Standing[];
}) {
	const selected = useSearchParams().get("selected") || "";
	const team = standings?.find((team) => team.name === selected);

	const { logo_url, position, wins, losses } = team || {};
	const length = standings?.length;

	if (selected === "all") {
		return null;
	}
	return (
		<div className="flex items-center justify-between md:justify-center w-full">
			<div className="flex justify-start items-center gap-2 w-full">
				<Image
					width={28}
					height={28}
					src={logo_url || selected}
					alt={selected}
					loading="lazy"
					decoding="async"
				/>
				<small className="text-slate-400 font-bold">{position}</small>
				<h2 className="text-xs md:text-xl text-left font-bold w-full text-nowrap">
					{selected}
				</h2>
			</div>
			<div className="flex justify-end items-center gap-2 w-full">
				<p>
					{wins}-{losses}
				</p>
				<span> • </span>
				<p>
					{getSuffix(Number(position))}/{length}
				</p>
			</div>
		</div>
	);
}
