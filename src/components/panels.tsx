"use client";
import { useState } from "react";
import Panel from "./panel";
import { cn } from "@/lib/utils";

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
			<div
				className={cn(
					!selected ? "grid-cols-3" : "grid-cols-2",
					"w-full grid border-red-50"
				)}
			>
				<Panel title={"Teams"} content={teamsList} />
				<Panel title="Transactions" content={allTransactions} border={true} />
				<Panel title="Date" content={allTeams} />
			</div>
		</div>
	);
}
