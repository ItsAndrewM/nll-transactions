import { Spinner } from "../spinner";

export function ScheduleLoading() {
	return (
		<div className="h-64 flex items-center justify-center">
			<Spinner />
		</div>
	);
}
