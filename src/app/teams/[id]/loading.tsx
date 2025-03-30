import { AndaHeader } from "@/components/anda-header";
import { TeamPageSkeleton } from "@/components/teams/skeleton-team-page";

export default function Loading() {
	return (
		<div className="container mx-auto py-10">
			<AndaHeader />
			<TeamPageSkeleton />
		</div>
	);
}
