import Standings from "@/components/standings";
import { getStandings } from "@/server/standings";

export const revalidate = 3600;

export default async function Page() {
	const standings = await getStandings();
	return <Standings standings={standings} />;
}
