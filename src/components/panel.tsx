import { cn } from "@/lib/utils";

export default function Panel({
	title,
	border,
}: {
	title: string;
	border?: boolean;
}) {
	return (
		<div
			className={cn(
				border ? "border-l-2 border-r-2" : null,
				"w-full flex flex-col gap-8 items- justify-start text-center h-screen"
			)}
		>
			<h3>{title}</h3>
			<div className="flex flex-col gap-4 items-center justify-center"></div>
		</div>
	);
}
