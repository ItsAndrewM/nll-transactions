import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "./ui/separator";

interface GameLeader {
	stat: string;
	awayPlayer: {
		name: string;
		team: string;
		value: string;
		number: string;
		imageUrl: string;
	};
	homePlayer: {
		name: string;
		team: string;
		value: string;
		number: string;
		imageUrl: string;
	};
}

export function GameLeaders({ gameLeaders }: { gameLeaders: GameLeader[] }) {
	return (
		<Card className="mt-8">
			<CardHeader>
				<CardTitle>Game Leaders</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{gameLeaders.map((leader, index) => {
						const { awayPlayer, homePlayer } = leader;
						const [awayPlayerFirstName, ...restOfName] =
							awayPlayer.name.split(" ");
						const [homePlayerFirstName, ...restOfName2] =
							homePlayer.name.split(" ");

						const awayLastName = restOfName.join(" ");
						const homeLastName = restOfName2.join(" ");
						return (
							<Card key={index}>
								<CardHeader className="bg-black text-white h-10 flex flex-col items-center justify-center rounded-t-xl">
									<CardTitle className="text-lg text-center">
										{leader.stat}
									</CardTitle>
								</CardHeader>
								<CardContent className="grid grid-cols-2 gap-4 p-4 relative">
									<div className="flex justify-end md:justify-between items-center">
										<div className="grid grid-cols-2 gap-6">
											<div className="flex items-center flex-col justify-center">
												<Image
													src={leader.awayPlayer.imageUrl || "/placeholder.svg"}
													alt={leader.awayPlayer.name}
													width={64}
													height={64}
													className="rounded-full border-2 border-slate-50 w-16 h-16 object-cover object-top"
													loading="lazy"
													decoding="async"
												/>
												<span className="text-xs sm:hidden font-bold text-center">
													#{leader.awayPlayer.number}
												</span>
											</div>
											<div className="flex flex-col items-end justify-start w-full">
												<p className="font-semibold text-xl">
													{leader.awayPlayer.value}
												</p>

												<p className="text-xs font-semibold">
													{awayPlayerFirstName}
												</p>
												<p className="text-xs font-semibold">{awayLastName}</p>
												<p className="sm:text-xs hidden sm:block">
													{leader.awayPlayer.team} - #{leader.awayPlayer.number}
												</p>
											</div>
										</div>
									</div>
									<div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2">
										<Separator orientation="vertical" className="h-full" />
									</div>
									<div className="flex justify-start md:justify-between items-center">
										<div className="grid grid-cols-2 gap-6">
											<div className="flex flex-col items-start justify-start w-full">
												<p className="font-semibold text-xl">
													{leader.homePlayer.value}
												</p>

												<p className="text-xs font-semibold">
													{homePlayerFirstName}
												</p>
												<p className="text-xs font-semibold">{homeLastName}</p>
												<p className="sm:text-xs hidden sm:block">
													{leader.homePlayer.team} - #{leader.homePlayer.number}
												</p>
											</div>
											<div className="flex items-center flex-col justify-center">
												<Image
													src={leader.homePlayer.imageUrl || "/placeholder.svg"}
													alt={leader.homePlayer.name}
													width={64}
													height={64}
													className="rounded-full border-2 border-slate-50 w-16 h-16 object-cover object-top"
													loading="lazy"
													decoding="async"
												/>
												<span className="text-xs sm:hidden font-bold text-center">
													#{leader.homePlayer.number}
												</span>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
}
