import SchedulePage from "@/components/schedule-page";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";

export default async function Page() {
	const [schedule, teams, standings] = await Promise.all([
		getSchedule(),
		getListOfTeams(),
		getStandings(),
	]);
	return (
		<SchedulePage schedule={schedule} teamsList={teams} standings={standings} />
	);
}
