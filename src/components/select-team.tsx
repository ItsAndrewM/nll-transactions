"use client";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createFallbackName } from "@/lib/utils";
import { imageUrls } from "@/data/image-urls";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

export function SelectTeams({ teams }: { teams: string[] }) {
	const pathname = usePathname();
	const handleValueChange = (value: string) => {
		const params = new URLSearchParams(window.location.search);
		params.set("selected", value);
		window.history.pushState({}, "", `${pathname}?${params.toString()}`);
	};
	const selected = useSearchParams().get("selected") || "";

	const removedNonScheduledTeams = teams.filter(
		(team) =>
			!team.toLowerCase().includes("new york riptide") &&
			!team.toLowerCase().includes("panther")
	);

	return (
		<Select onValueChange={handleValueChange} value={selected}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select a team" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Teams</SelectLabel>
					<SelectItem value="all">
						<div className="w-full flex justify-between items-center gap-4">
							<Image
								src={
									"https://www.nll.com/wp-content/uploads/2021/12/NLL-Shield-Logo.png"
								}
								alt="NLL Logo"
								width={20}
								height={24}
								className="w-6 h-6 object-contain"
								decoding="async"
								loading="lazy"
							/>
							<span className="">All</span>
						</div>
					</SelectItem>
					{removedNonScheduledTeams.map((team) => (
						<SelectItem key={team} value={team}>
							<div className="w-full flex justify-between items-center gap-4">
								<Avatar className="w-7 h-7">
									<AvatarImage
										src={
											imageUrls.find((img) => img.name === team)?.imageUrl ||
											team
										}
									/>
									<AvatarFallback>
										{createFallbackName(
											imageUrls.find((img) => img.name === team)?.name || team
										)}
									</AvatarFallback>
								</Avatar>
								{team}
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
