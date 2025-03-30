import { AndaHeader } from "@/components/anda-header";
import { PreGameSkeleton } from "@/components/summary/skeleton-pre-game-info";
import { Suspense } from "react";

export default function Loading() {
	return (
		<div className="container mx-auto py-10">
			<AndaHeader />
			<PreGameSkeleton />
		</div>
	);
}
