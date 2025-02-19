import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Test() {
	return (
		<main className="w-full mx-auto flex flex-col">
			<section className="relative h-screen md:h-[85vh] w-full md:px-4 md:py-16 sm:px-6 lg:px-8 mx-auto">
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat contrast-[.75] "
					style={{
						backgroundImage: `url('https://www.sealslax.com/_nuxt/img/seals_team_lax.018584e.webp')`,
					}}
				></div>
				<div className="relative flex h-full flex-col items-center justify-center px-4 text-center text-cream">
					<h1 className="mb-6 text-4xl font-bold tracking-wider sm:text-5xl md:text-6xl lg:text-7xl"></h1>
					{/* <p className="mx-auto mb-8 max-w-3xl text-base sm:text-lg md:text-xl lg:text-2xl"></p> */}

					<div className="flex justify-between items-center mb-8 px-6">
						<div className="flex items-center gap-4">
							<div className="flex flex-col items-center gap-6">
								<div className="flex items-center gap-4">
									<Link
										href={"/"}
										className="hover:scale-105 transition-all duration-300 ease-in-out text-foreground"
									>
										{/* <h1 className="text-4xl font-bold ">NLL Tracker</h1> */}
										<div className="relative z-10">
											<p
												className="absolute -z-10 -top-1 -left-0.5 text-black text-8xl font-bold font-adumu uppercase tracking-[.025em] text-[6.8rem] text-nowrap"
												style={{
													WebkitTextStroke: "1px #000000",
												}}
											>
												NLL Tracker
											</p>

											{/* Main text */}
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
										className=" hover:text-slate-500 transition-colors duration-300 ease-in-out font-semibold"
									>
										<p className="text-lg ">by andamonium</p>
									</Link>
								</div>
							</div>
						</div>
					</div>
					{/* Play Button */}
					{/* <button
					className="mb-8 rounded-full border-2 border-white p-4 transition-transform hover:scale-110"
					aria-label="Play video"
				>
					<Play className="h-8 w-8 md:h-12 md:w-12" />
				</button> */}

					<div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
						<Button asChild>
							<Link href={"#"}>Button</Link>
						</Button>
						<Button asChild variant="secondary">
							<Link href={"#"}>Button</Link>
						</Button>
					</div>
				</div>
			</section>
			<section className="relative max-w-3xl w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto">
				<div className="relative">
					<p
						className="absolute -top-1.5 -left-1.5 -z-10 text-black text-8xl"
						style={{
							WebkitTextStroke: "2px #FF29ED",
						}}
					>
						{"Andrew"}
					</p>

					{/* Main text */}
					<p className={`text-white text-8xl font-bold `}>{"Andrew"}</p>
				</div>
			</section>
			<section className="relative max-w-3xl w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto">
				This is another section
			</section>
			<section className="relative max-w-3xl w-full px-4 py-16 sm:px-6 lg:px-8 mx-auto">
				This is another section
			</section>
		</main>
	);
}
