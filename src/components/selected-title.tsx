import { Standing } from "@/types/standings";
import Image from "next/image";

export default function SelectedTitle({
	selected,
	standings,
}: {
	selected: string;
	standings: Standing[];
}) {
	const team = standings.find((team) => team.name === selected);
	return (
		<div className="flex flex-col items-start justify-center w-full">
			<div className="flex justify-start items-center gap-2 w-full">
				<Image
					width={28}
					height={28}
					src={team?.logo_url || selected}
					alt={selected}
				/>
				<small className="text-slate-400 font-bold">{team?.position}</small>
				<h2 className="text-xl text-left font-bold w-full">{selected}</h2>
			</div>
			<div className="flex justify-start items-center gap-2 w-full">
				<p>
					{team?.wins}-{team?.losses}
				</p>
				<span> • </span>
				<p>
					{team?.position}/{standings.length}
				</p>
			</div>
		</div>
	);
}
