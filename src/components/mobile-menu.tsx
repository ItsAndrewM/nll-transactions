import { Calendar1, FileText, Trophy } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
	return (
		<div className="fixed md:hidden bottom-0 border-t-2 border-gray-500 w-full flex justify-center items-center bg-white z-10">
			<nav className="flex flex-col gap-4 w-full py-4">
				<ul className="flex w-full gap-4 justify-evenly">
					<li className="relative">
						<div className="flex justify-center items-center flex-col">
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
					<li className="relative">
						<div className="flex justify-center items-center flex-col">
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
					<li className="relative">
						<div className="flex justify-center items-center flex-col">
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
				</ul>
			</nav>
		</div>
	);
}
