import Image from "next/image";

export function AndaHeader() {
	return (
		<div className="flex justify-between items-center mb-8 px-6">
			<div className="flex items-center gap-4">
				<Image
					src="/robotman.jpg"
					alt="Andamonium"
					width={50}
					height={50}
					className="rounded-full border-2 border-primary"
				/>
				<div>
					<h1 className="text-4xl font-bold text-foreground">NLL Tracker</h1>
					<p className="text-sm text-muted-foreground">by andamonium</p>
				</div>
			</div>
		</div>
	);
}
