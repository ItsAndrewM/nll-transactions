import { Calendar1, FileText } from "lucide-react";
import Link from "next/link";

export default function MobileMenu() {
	return (
		<div className="absolute bottom-0 border-t-2 border-gray-500 w-full flex justify-center items-center bg-white">
			<nav className="flex flex-col gap-4 w-full py-4">
				<ul className="flex w-full gap-4 justify-evenly">
					<li>
						<Link
							href="/transactions"
							className="flex justify center items-center flex-col"
						>
							<FileText />
							<span>Transactions</span>
						</Link>
					</li>
					<li>
						<Link
							href="/schedule"
							className="flex justify center items-center flex-col"
						>
							<Calendar1 />
							<span>Schedule</span>
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
