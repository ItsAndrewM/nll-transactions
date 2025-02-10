import { cn } from "@/lib/utils";

export default function LiveIndicator({ className }: { className?: string }) {
	return (
		<div className={cn("relative inline-flex", className)}>
			<span className="relative flex size-2">
				<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
				<span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
			</span>
		</div>
	);
}
