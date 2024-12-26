import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SetStateAction } from "react";

export function SelectTeams({
	teams,
	setSelected,
}: {
	teams: string[];
	setSelected: React.Dispatch<SetStateAction<string>>;
}) {
	return (
		<Select onValueChange={(value) => setSelected(value)}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select a team" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Teams</SelectLabel>
					{teams.map((team) => (
						<SelectItem key={team} value={team}>
							{team}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
