import SchedulePage from "@/components/schedule-page";
import { getSchedule } from "@/server/schedule";
import { getListOfTeams } from "@/server/teams";

export default async function Page() {
	const [schedule, teams] = await Promise.all([
		getSchedule(),
		getListOfTeams(),
	]);
	return <SchedulePage schedule={schedule} teamsList={teams} />;
}
