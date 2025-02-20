import { Spinner } from "../spinner";

export function StandingsLoading() {
	return (
		<div className="h-96 flex items-center justify-center">
			<Spinner />
		</div>
	);
}
