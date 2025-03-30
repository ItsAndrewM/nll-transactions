import { AndaHeader } from "@/components/anda-header";
import { PlayerPageSkeleton } from "@/components/players/skeleton-player-page";
export default function Loading() {
	return (
		<div className="container mx-auto py-10">
			<AndaHeader />
			<PlayerPageSkeleton />
		</div>
	);
}
