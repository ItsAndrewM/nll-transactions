"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ChartBarBigIcon, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import { shareToFacebook, shareToX } from "@/lib/utils";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Calendar01Icon,
	Facebook02Icon,
	InstagramIcon,
	NewTwitterIcon,
	RankingIcon,
	TransactionIcon,
	UserGroupIcon,
	UserIcon,
	VersusIcon,
} from "@hugeicons/core-free-icons";

export function NavMenu() {
	const pathname = usePathname();
	const location = "https://nlltracker.com" + pathname;

	const handleInstagramShare = () => {
		window.location.href = `instagram://story-camera`;
	};
	return (
		<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ">
			<div className="bg-background rounded-full shadow-lg p-2 flex items-center gap-2 space-x-2 px-4 justify-center">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground"
							>
								<Link href="/transactions" prefetch>
									<HugeiconsIcon
										icon={TransactionIcon}
										size={20}
										strokeWidth={0.5}
									/>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Transactions</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground"
							>
								<Link
									href="/schedule"
									className="text-slate-600 hover:text-black"
									prefetch
								>
									<HugeiconsIcon
										icon={Calendar01Icon}
										size={20}
										strokeWidth={0.5}
									/>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Schedule</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground"
							>
								<Link
									href="/standings"
									className="text-slate-600 hover:text-black"
									prefetch
								>
									<HugeiconsIcon
										icon={RankingIcon}
										size={20}
										strokeWidth={0.5}
									/>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Standings</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground hidden sm:block"
							>
								<Link
									href="/stats"
									className="text-slate-600 hover:text-black"
									prefetch
								>
									<ChartBarBigIcon />
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Stats</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground hidden sm:block"
							>
								<Link href="/teams" className="" prefetch>
									<HugeiconsIcon
										icon={UserGroupIcon}
										size={20}
										strokeWidth={0.5}
									/>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Teams</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button
								asChild
								variant="secondary"
								className="bg-card text-slate-600 hover:text-card-foreground hidden sm:block"
							>
								<Link href="/games" className="" prefetch>
									<HugeiconsIcon
										icon={VersusIcon}
										size={20}
										strokeWidth={0.5}
									/>
								</Link>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							<p>Games</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<Sheet key={"left"}>
					<SheetTrigger asChild className="flex items-center ">
						<Button
							variant="secondary"
							className="hover:text-card-foreground bg-card hover:cursor-pointer"
						>
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"}>
						<SheetHeader>
							<SheetTitle className="flex items-center justify-between gap-2 mt-2">
								<div className="flex flex-col">
									<SheetClose asChild>
										<Link
											href={"/"}
											className="hover:text-slate-500 transition-colors duration-300 ease-in-out"
										>
											<span>NLLTracker.com</span>{" "}
										</Link>
									</SheetClose>
									<Link
										href={"https://andamonium.dev"}
										className="text-slate-500 hover:text-black transition-colors duration-300 ease-in-out"
									>
										<small>by andamonium</small>
									</Link>
								</div>
								<Link
									href={"https://github.com/itsandrewm/"}
									className="hover:opacity-80 transition-opacity duration-300 ease-in-out"
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
										<HugeiconsIcon
											icon={TransactionIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Transactions</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/transactions"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to Transactions"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<HugeiconsIcon
											icon={Calendar01Icon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Schedule</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/schedule"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to Schedule"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<HugeiconsIcon
											icon={RankingIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Standings</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/standings"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to Standings"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<HugeiconsIcon
											icon={VersusIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Games</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/games"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to Games"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<ChartBarBigIcon />
										<span>Stats</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/stats"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to stats"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<HugeiconsIcon
											icon={UserGroupIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Teams</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/teams"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to stats"
										/>
									</SheetClose>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2">
										<HugeiconsIcon
											icon={UserIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<span>Players</span>
									</div>
									<SheetClose asChild>
										<Link
											href="/players"
											className="absolute inset-0 z-1"
											prefetch
											aria-label="Go to stats"
										/>
									</SheetClose>
								</li>
							</ul>
						</div>
						<Separator className="my-4" />
						<SheetFooter className="w-full">
							<ul className="flex w-full gap-4 justify-evenly">
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<HugeiconsIcon
											icon={Facebook02Icon}
											size={20}
											strokeWidth={0.5}
										/>
										<small className="text-center text-nowrap hidden md:block">
											Share to Facebook
										</small>
									</div>
									<Link
										href={shareToFacebook(location)}
										className="absolute inset-0 z-1"
										prefetch
										aria-label="Share to Facebook"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<HugeiconsIcon
											icon={NewTwitterIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<small className="text-center text-nowrap hidden md:block">
											Share to X
										</small>
									</div>
									<Link
										href={shareToX(location)}
										className="absolute inset-0 z-1"
										prefetch
										aria-label="Share to X"
									/>
								</li>
								<li className="relative text-slate-500 hover:text-black transition-colors">
									<div className="flex justify-center items-center gap-2 flex-col">
										<HugeiconsIcon
											icon={InstagramIcon}
											size={20}
											strokeWidth={0.5}
										/>
										<small className="text-center text-nowrap hidden md:block">
											Share to Instagram
										</small>
									</div>
									<Button
										variant={"link"}
										className="absolute inset-0 z-1"
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
