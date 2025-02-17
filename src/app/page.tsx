// import Panels from "@/components/panels";
// import ScheduleList from "@/components/scheduled/schedule-list";
// import ScheduleNext from "@/components/scheduled/schedule-next";
// import { SelectTeams } from "@/components/select-team";
// import SelectedTitle from "@/components/selected-title";
// import { Spinner } from "@/components/spinner";
// import Standings from "@/components/standings/standings";
// import TransactionsPanel from "@/components/transactions/transactions-panel";
// import { getSchedule } from "@/server/schedule";
// import { getStandings } from "@/server/standings";
// import { getAllTeamsTransactions, getListOfTeams } from "@/server/teams";
// import { getAllTransactions } from "@/server/transactions";
// import { Suspense } from "react";

// export const revalidate = 3600;

// type Params = Promise<{ slug: string }>;
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// export default async function Home(props: {
// 	params: Params;
// 	searchParams: SearchParams;
// }) {
// 	const searchParams = await props.searchParams;
// 	const order =
// 		typeof searchParams.order === "string" ? searchParams.order : "dsc";
// 	const team = typeof searchParams.team === "string" ? searchParams.team : "";
// 	const selected =
// 		typeof searchParams.selected === "string" ? searchParams.selected : "";
// 	const [teamsList, allTransactions, schedule, standings] = await Promise.all([
// 		getListOfTeams(),
// 		getAllTransactions(order, team),
// 		getSchedule(),
// 		getStandings(),
// 	]);
// 	return (
// 		<>
// 			<div className="w-full h-full flex max-h-screen overflow-y-hidden">
// 				<div className="w-full hidden md:grid border-red-50 grid-cols-2 lg:grid-cols-3">
// 					<div className="px-8 py-4 flex flex-col gap-4">
// 						{selected ? (
// 							<>
// 								<SelectedTitle standings={standings} />
// 								<ScheduleNext schedule={schedule} standings={standings} />
// 							</>
// 						) : null}
// 						<SelectTeams teams={teamsList} />
// 						<ScheduleList schedule={schedule} />
// 					</div>
// 					<TransactionsPanel content={allTransactions} />
// 					<Standings standings={standings} />
// 				</div>
// 				{/* Mobile layout */}
// 				<div className="w-full flex border-red-50 flex-col md:hidden max-w-lg mx-auto relative pt-6 p-8 md:px-0">
// 					{selected ? (
// 						<>
// 							<SelectedTitle standings={standings} />
// 							<ScheduleNext schedule={schedule} standings={standings} />
// 						</>
// 					) : null}
// 					<SelectTeams teams={teamsList} />
// 					<ScheduleList schedule={schedule} />
// 				</div>
// 			</div>
// 		</>
// 	);
// }
// app/page.tsx
import ScheduleList from "@/components/scheduled/schedule-list";
import ScheduleNext from "@/components/scheduled/schedule-next";
import { SelectTeams } from "@/components/select-team";
import SelectedTitle from "@/components/selected-title";
import { Spinner } from "@/components/spinner";
import Standings from "@/components/standings/standings";
import TransactionsPanel from "@/components/transactions/transactions-panel";
import { getSchedule } from "@/server/schedule";
import { getStandings } from "@/server/standings";
import { getListOfTeams } from "@/server/teams";
import { getAllTransactions } from "@/server/transactions";
import { Suspense } from "react";

export const revalidate = 3600;

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Create separate loading components
export function ScheduleLoading() {
	return (
		<div className="h-64 flex items-center justify-center">
			<Spinner />
		</div>
	);
}

export function TransactionsLoading() {
	return (
		<div className="h-96 flex items-center justify-center">
			<Spinner />
		</div>
	);
}

export function StandingsLoading() {
	return (
		<div className="h-96 flex items-center justify-center">
			<Spinner />
		</div>
	);
}

// Create wrapper components for async data
async function ScheduleSection({
	schedule,
	standings,
	selected,
}: {
	schedule: Awaited<ReturnType<typeof getSchedule>>;
	standings: Awaited<ReturnType<typeof getStandings>>;
	selected: string;
}) {
	return (
		<>
			{selected ? (
				<>
					<SelectedTitle standings={standings} />
					<ScheduleNext schedule={schedule} standings={standings} />
				</>
			) : null}
			<ScheduleList schedule={schedule} />
		</>
	);
}

async function TransactionsSection({
	order,
	team,
}: {
	order: string;
	team: string;
}) {
	const transactions = await getAllTransactions(order, team);
	return <TransactionsPanel content={transactions} />;
}

async function StandingsSection() {
	const standings = await getStandings();
	return <Standings standings={standings} />;
}

export default async function Home(props: {
	params: Params;
	searchParams: SearchParams;
}) {
	const searchParams = await props.searchParams;
	const order =
		typeof searchParams.order === "string" ? searchParams.order : "dsc";
	const team = typeof searchParams.team === "string" ? searchParams.team : "";
	const selected =
		typeof searchParams.selected === "string" ? searchParams.selected : "";

	// Only fetch initial data needed for the page
	const [teamsList, schedule, standings] = await Promise.all([
		getListOfTeams(),
		getSchedule(),
		getStandings(),
	]);

	return (
		<div className="w-full h-full flex md:max-h-screen md:overflow-y-hidden">
			<div className="w-full hidden md:grid border-red-50 grid-cols-2 lg:grid-cols-3">
				<div className="px-8 py-4 flex flex-col gap-4">
					<SelectTeams teams={teamsList} />
					<Suspense fallback={<ScheduleLoading />}>
						<ScheduleSection
							schedule={schedule}
							standings={standings}
							selected={selected}
						/>
					</Suspense>
				</div>

				<Suspense fallback={<TransactionsLoading />}>
					<TransactionsSection order={order} team={team} />
				</Suspense>

				<Suspense fallback={<StandingsLoading />}>
					<StandingsSection />
				</Suspense>
			</div>

			{/* Mobile layout */}
			<div className="w-full flex border-red-50 flex-col md:hidden max-w-lg mx-auto relative pt-6 p-8 md:px-0">
				<SelectTeams teams={teamsList} />
				<Suspense fallback={<ScheduleLoading />}>
					<ScheduleSection
						schedule={schedule}
						standings={standings}
						selected={selected}
					/>
				</Suspense>
			</div>
		</div>
	);
}
