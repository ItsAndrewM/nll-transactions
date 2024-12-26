"use client";
import { useState } from "react";
import Panel from "./panel";
import { cn } from "@/lib/utils";
import { SelectTeams } from "./select-team";

export default function Panels({
	teamsList,
	allTransactions,
	allTeams,
}: {
	teamsList: string[];
	allTransactions: any[];
	allTeams: any[];
}) {
	const [selected, setSelected] = useState("");
	const [content, setContent] = useState([]);
	return (
		<div className="w-full h-full flex">
			<div className={"w-full grid border-red-50 grid-cols-3"}>
				<div className="px-8 py-4">
					<h3 className="text-xl font-bold">{selected}</h3>
					<SelectTeams teams={teamsList} setSelected={setSelected} />
					{/* <Panel title={"Teams"} content={teamsList} /> */}
				</div>
				<Panel title="Transactions" content={allTransactions} border={true} />
				<Panel title="Date" content={allTeams} />
			</div>
		</div>
	);
}
