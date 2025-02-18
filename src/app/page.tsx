import ScheduleList from "@/components/scheduled/schedule-list";
import ScheduleNext from "@/components/scheduled/schedule-next";
import { SelectTeams } from "@/components/select-team";
import SelectedTitle from "@/components/selected-title";
import { Spinner } from "@/components/spinner";
import Standings from "@/components/standings/standings";
import TransactionsPanel from "@/components/transactions/transactions-panel";
import { getFrontPage } from "@/server/front-page";
import { Suspense } from "react";

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
	const selected =
		typeof searchParams.selected === "string" ? searchParams.selected : "";

	const {
		data: allTransactions,
		teams: teamsList,
		schedule,
		standings,
	} = await getFrontPage(order, team);
	return (
		<>
			<div className="w-full h-full flex max-h-screen overflow-y-hidden">
				<div className="w-full hidden md:grid border-red-50 grid-cols-2 lg:grid-cols-3">
					<div className="px-8 py-4 flex flex-col gap-4">
						{selected ? (
							<>
								<SelectedTitle standings={standings} />
								<ScheduleNext schedule={schedule} standings={standings} />
							</>
						) : null}
						<Suspense fallback={<ScheduleLoading />}>
							<SelectTeams teams={teamsList} />
						</Suspense>
						<Suspense fallback={<ScheduleLoading />}>
							<ScheduleList schedule={schedule} />
						</Suspense>
					</div>
					<Suspense fallback={<TransactionsLoading />}>
						<TransactionsPanel content={allTransactions} />
					</Suspense>
					<Suspense fallback={<StandingsLoading />}>
						<Standings standings={standings} />
					</Suspense>
				</div>
				{/* Mobile layout */}
				<div className="w-full flex border-red-50 flex-col md:hidden max-w-lg mx-auto relative pt-6 p-8 md:px-0">
					{selected ? (
						<>
							<SelectedTitle standings={standings} />
							<ScheduleNext schedule={schedule} standings={standings} />
						</>
					) : null}
					<Suspense fallback={<ScheduleLoading />}>
						<SelectTeams teams={teamsList} />
					</Suspense>
					<Suspense fallback={<ScheduleLoading />}>
						<ScheduleList schedule={schedule} />
					</Suspense>
				</div>
			</div>
		</>
	);
}
