import Panels from "@/components/panels";
import { Spinner } from "@/components/spinner";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getAllTeamsTransactions, getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";
import { Suspense } from "react";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const order =
		typeof searchParams.order === "string" ? searchParams.order : "dsc";
	const team = typeof searchParams.team === "string" ? searchParams.team : "";
	const [teamsList, allTransactions, allTeams, schedule, standings] =
		await Promise.all([
			getListOfTeams(),
			getAllTransactions(order, team),
			getAllTeamsTransactions(),
			getSchedule(),
			getStandings(),
		]);
	return (
		<Suspense
			fallback={
				<div className="w-full h-full flex ">
					<div className="w-full flex justify-center items-center gap-4 p-8">
						<Spinner size="large" />
					</div>
				</div>
			}
		>
			<Panels
				teamsList={teamsList}
				allTransactions={allTransactions}
				allTeams={allTeams}
				schedule={schedule}
				standings={standings}
			/>
		</Suspense>
	);
}
