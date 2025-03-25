import { getStandings } from "@/server/standings";
import Standings from "./standings";

export const revalidate = 3600;

export async function StandingsContainer() {
	const standings = await getStandings();
	return <Standings standings={standings} />;
}
