import { StatsDataTableContainer } from "@/components/data-table/stats-data-table-container";
import { ScheduleContainer } from "@/components/scheduled/schedule-container";
import { TransactionContainer } from "@/components/transactions/transaction-container";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Home(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	return (
		<main className="w-full mx-auto flex flex-col">
			<section className="relative h-screen md:h-[85vh] w-full md:px-4 md:py-16 sm:px-6 lg:px-8 mx-auto">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat contrast-[.75] brightness-[.8]"
					style={{
						backgroundImage: `url('https://www.sealslax.com/_nuxt/img/seals_team_lax.018584e.webp')`,
					}}
				></div>
				<div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
					<div className="flex justify-between items-center mb-8 px-6">
						<div className="flex items-center gap-4">
							<div className="hidden md:flex flex-col items-center gap-6">
								<div className="flex items-center gap-4 ">
									<Link
										href={"/"}
										className="hover:scale-105 transition-all duration-300 ease-in-out text-foreground"
									>
										<div className="relative z-10">
											<p
												className="absolute -z-10 -top-1 -left-0.5 text-black text-8xl font-bold font-adumu uppercase tracking-[.025em] text-[6.8rem] text-nowrap"
												style={{
													WebkitTextStroke: "1px #000000",
												}}
											>
												NLL Tracker
											</p>
											<p
												className={`text-8xl font-bold font-adumu text-primary uppercase tracking-widest`}
											>
												NLL Tracker
											</p>
										</div>
									</Link>
								</div>
								<div className="w-full flex justify-start items-center gap-4">
									<Link
										href={"https://github.com/itsandrewm/"}
										className="hover:scale-110 transition-all duration-300 ease-in-out flex items-center"
									>
										<Image
											src="/robotman.jpg"
											alt="Andamonium"
											width={50}
											height={50}
											className="rounded-full border-2 border-primary"
										/>
									</Link>
									<Link
										href={"https://andamonium.dev"}
										className=" hover:text-slate-500 transition-colors duration-300 ease-in-out font-semibold text-card"
									>
										<p className="text-lg ">by andamonium</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<h3 className="mb-6 text-2xl font-bold tracking-wider lg:text-3xl text-card">
						<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
							NLL Transactions, Stats & Updates
						</span>
					</h3>
					<p className="mx-auto mb-8 max-w-3xl text-base sm:text-lg md:text-xl text-card font-medium">
						Stay up-to-date with the latest National Lacrosse League news,
						player movements, and game schedules.
					</p>
					<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
						<Button asChild className="hover:bg-[#a2451f] hover:text-white">
							<Link href="/#transactions">View Transactions</Link>
						</Button>
						<Button asChild variant="secondary" className="hover:bg-card">
							<Link href="/#schedule">Check Schedule</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className="relative w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 gap-8">
				<Suspense fallback={<div>Loading...</div>}>
					<TransactionContainer searchParams={props.searchParams} />
				</Suspense>
			</section>
			<section className="relative w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 gap-8 ">
				<Suspense fallback={<div>Loading...</div>}>
					<ScheduleContainer />
				</Suspense>
			</section>
			<section className="relative w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto grid grid-cols-1 gap-8 pb-20">
				<Suspense fallback={<div>Loading...</div>}>
					<StatsDataTableContainer />
				</Suspense>
			</section>
		</main>
	);
}
