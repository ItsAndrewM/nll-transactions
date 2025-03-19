import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import ScheduleTabsViewList from "./schedule-tabs-view-list";
import { Suspense } from "react";

export const revalidate = 3600;

export async function ScheduleContainer() {
	const [schedule, standings] = await Promise.all([
		getSchedule(),
		getStandings(),
	]);
	return (
		<>
			<h2
				className="uppercase text-4xl font-bold md:text-left text-center"
				id="schedule"
			>
				<span className="inline bg-gradient-to-t from-primary/85 from-45% to-transparent to-45% bg-no-repeat bg-[length:100%] transition-all duration-500 ease-in-out">
					Schedule
				</span>
			</h2>
			<Suspense fallback={<div>Loading...</div>}>
				<ScheduleTabsViewList schedule={schedule} standings={standings} />
			</Suspense>
		</>
	);
}
