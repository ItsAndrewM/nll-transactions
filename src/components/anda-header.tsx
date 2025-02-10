import Image from "next/image";
import Link from "next/link";

export function AndaHeader() {
	return (
		<div className="flex justify-between items-center mb-8 px-6">
			<div className="flex items-center gap-4">
				<Link
					href={"https://github.com/itsandrewm/"}
					className="hover:opacity-80 transition-opacity duration-300 ease-in-out"
				>
					<Image
						src="/robotman.jpg"
						alt="Andamonium"
						width={50}
						height={50}
						className="rounded-full border-2 border-primary"
					/>
				</Link>
				<div>
					<Link
						href={"/"}
						className="hover:text-slate-500 transition-colors duration-300 ease-in-out text-foreground"
					>
						<h1 className="text-4xl font-bold ">NLL Tracker</h1>
					</Link>
					<Link
						href={"https://andamonium.dev"}
						className="text-muted-foreground hover:text-black transition-colors duration-300 ease-in-out"
					>
						<p className="text-sm ">by andamonium</p>
					</Link>
				</div>
			</div>
		</div>
	);
}
