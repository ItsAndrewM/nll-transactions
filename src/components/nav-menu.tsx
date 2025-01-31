"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Calendar1,
	ChartBarBigIcon,
	Facebook,
	FileText,
	Instagram,
	Menu,
	Swords,
	Trophy,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { shareToFacebook, shareToX } from "@/lib/utils";
import XIcon from "./icons/x-icon";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

export function NavMenu() {
	const pathname = usePathname();
	const location = "https://nlltracker.com" + pathname;

	const handleInstagramShare = () => {
		window.location.href = `instagram://story-camera`;
	};
	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ">
			<div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-4 space-x-2 px-4">
				<Link
					href="/transactions"
					className="text-slate-600 hover:text-black"
					prefetch
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 flex items-center p-2">
									<FileText size={20} />
								</div>
							</TooltipTrigger>
							<TooltipContent className="bg-black">
								<p>Standings</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Link>
				<Link
					href="/schedule"
					className="text-slate-600 hover:text-black"
					prefetch
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 flex items-center p-2">
									<Calendar1 size={20} />
								</div>
							</TooltipTrigger>
							<TooltipContent className="bg-black">
								<p>Schedule</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Link>
				<Link
					href="/standings"
					className="text-slate-600 hover:text-black"
					prefetch
				>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<div className="justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 flex items-center p-2">
									<Trophy size={20} />
								</div>
							</TooltipTrigger>
							<TooltipContent className="bg-black">
								<p>Standings</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</Link>
				<Sheet key={"left"}>
					<SheetTrigger asChild className="flex items-center ">
						<Button variant="outline" className="p-2">
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"}>
						<SheetHeader>
							<SheetTitle className="flex items-center justify-between gap-2 mt-2">
								<div className="flex flex-col">
									<Link
										href={"https://nlltracker.com"}
										className="hover:text-slate-500 transition-colors"
									>
										<span>NLLTracker.com</span>{" "}
									</Link>
									<Link
										href={"https://andamonium.dev"}
										className="text-slate-500 hover:text-black transition-colors"
									>
										<small>by andamonium</small>
									</Link>
								</div>
								<Link
									href={"https://github.com/itsandrewm/"}
									className="hover:opacity-80 transition-opacity"
								>
									<Avatar className="h-12 w-12">
										<AvatarImage
											src={"https://github.com/itsandrewm.png"}
											alt={"andamonium"}
											loading="lazy"
											decoding="async"
										/>
										<AvatarFallback>AM</AvatarFallback>
									</Avatar>
								</Link>
							</SheetTitle>
						</SheetHeader>
						<Separator className="my-4" />
						<div className="grid gap-4 py-4">
							<ul className="flex flex-col w-full gap-4 justify-center items-start">
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<FileText />
										<span>Transactions</span>
									</div>
									<Link
										href="/transactions"
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Go to Transactions"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<Calendar1 />
										<span>Schedule</span>
									</div>
									<Link
										href="/schedule"
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Go to Schedule"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<Trophy />
										<span>Standings</span>
									</div>
									<Link
										href="/standings"
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Go to Standings"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<Swords />
										<span>Games</span>
									</div>
									<Link
										href="/games"
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Go to Games"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<ChartBarBigIcon />
										<span>Stats</span>
									</div>
									<Link
										href="/stats"
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Go to stats"
									/>
								</li>
							</ul>
						</div>
						<Separator className="my-4" />
						<SheetFooter className="w-full">
							<ul className="flex w-full gap-4 justify-evenly">
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<Facebook />
										<small className="text-center text-nowrap">
											Share to Facebook
										</small>
									</div>
									<Link
										href={shareToFacebook(location)}
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Share to Facebook"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<XIcon className="h-6 w-6 p-0" />
										<small className="text-center text-nowrap">
											Share to X
										</small>
									</div>
									<Link
										href={shareToX(location)}
										className="absolute inset-0 z-[1]"
										prefetch
										aria-label="Share to X"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<Instagram />
										<small className="text-center text-nowrap">
											Share to Instagram
										</small>
									</div>
									<Button
										variant={"link"}
										className="absolute inset-0 z-[1]"
										aria-label="Share to Instagram"
										onClick={handleInstagramShare}
									/>
								</li>
							</ul>
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}
