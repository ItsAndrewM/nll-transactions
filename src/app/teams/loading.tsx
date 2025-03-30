import { AndaHeader } from "@/components/anda-header";
import TeamsLoadingSkeleton from "@/components/teams/skeleton-teams-page";

export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-4  pb-20">
			<AndaHeader />
			<TeamsLoadingSkeleton />
		</div>
	);
}
