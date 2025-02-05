import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameInfo, TeamStats as TeamStatsType } from "@/types/games";
import Image from "next/image";

interface TeamStatsProps {
	home: TeamStatsType;
	away: TeamStatsType;
	gameInfo: GameInfo;
}

export function TeamStats({ home, away, gameInfo }: TeamStatsProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Stats</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow className="w-full grid grid-cols-3 gap-2">
							<TableHead>Stat</TableHead>
							<TableHead className="flex flex-nowrap items-center gap-2">
								<Image
									src={gameInfo.away.logo}
									alt={gameInfo.away.title}
									width={32}
									height={32}
									loading="eager"
									decoding="sync"
								/>
								Away
							</TableHead>
							<TableHead className="flex flex-nowrap items-center gap-2">
								<Image
									src={gameInfo.home.logo}
									alt={gameInfo.home.title}
									width={32}
									height={32}
									loading="eager"
									decoding="sync"
								/>
								Home
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow className="w-full grid grid-cols-3 gap-2">
							<TableCell>Face-offs</TableCell>
							<TableCell>{away.fo}</TableCell>
							<TableCell>{home.fo}</TableCell>
						</TableRow>
						<TableRow className="w-full grid grid-cols-3 gap-2">
							<TableCell>Power Plays</TableCell>
							<TableCell>{away.pp}</TableCell>
							<TableCell>{home.pp}</TableCell>
						</TableRow>
						<TableRow className="w-full grid grid-cols-3 gap-2">
							<TableCell>Penalty Minutes</TableCell>
							<TableCell>{away.pim}</TableCell>
							<TableCell>{home.pim}</TableCell>
						</TableRow>
						<TableRow className="w-full grid grid-cols-3 gap-2">
							<TableCell>Shots on Goal</TableCell>
							<TableCell>{away.sog}</TableCell>
							<TableCell>{home.sog}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
