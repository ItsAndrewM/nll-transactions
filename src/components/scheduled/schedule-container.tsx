import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import ScheduleTabsViewList from "./schedule-tabs-view-list";

export const revalidate = 3600;

export async function ScheduleContainer() {
	const [schedule, standings] = await Promise.all([
		getSchedule(),
		getStandings(),
	]);
	return <ScheduleTabsViewList schedule={schedule} standings={standings} />;
}
