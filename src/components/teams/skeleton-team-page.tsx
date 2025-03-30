// components/skeletons/team-page-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function TeamPageSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8 flex flex-col gap-8">
			<div className="flex flex-col gap-4">
				<TeamHeaderSkeleton />
				<div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 w-full">
					<div>
						<TeamScheduleSkeleton />
					</div>
					<div>
						<TeamRosterSkeleton />
					</div>
				</div>
			</div>
		</div>
	);
}

export function TeamHeaderSkeleton() {
	return (
		<Card className="w-full">
			<CardContent className="p-6">
				<div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
					<Skeleton className="w-[150px] h-[150px]" />
					<div className="flex-grow text-center md:text-left">
						<Skeleton className="h-9 w-64 mx-auto md:mx-0 mb-2" />
						<Skeleton className="h-7 w-40 mx-auto md:mx-0 mb-4" />
						<div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<div key={i} className="text-center">
									<Skeleton className="h-4 w-20 mx-auto md:mx-0 mb-1" />
									<Skeleton className="h-5 w-16 mx-auto md:mx-0" />
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function TeamScheduleSkeleton() {
	return (
		<Card className="w-full">
			<CardHeader>
				<h2 className="text-2xl font-bold mb-4 text-center lg:text-left">
					Team Schedule
				</h2>
			</CardHeader>
			<CardContent className="space-y-4">
				<Tabs defaultValue="all" className="w-full mx-auto">
					<TabsList>
						<TabsTrigger value="all" className="text-xs flex xl:gap-1">
							<span>All</span> <span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger value="completed" className="text-xs flex xl:gap-1">
							<span>Completed</span>
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
						<TabsTrigger value="scheduled" className="text-xs flex xl:gap-1">
							<span>Scheduled</span>{" "}
							<span className="hidden xl:block">Games</span>
						</TabsTrigger>
					</TabsList>

					<TabsContent value="all">
						<h3 className="text-lg font-semibold mt-4 mb-2">All Games</h3>
						<ul className="w-full text-left list-inside px-2 flex flex-col gap-4 max-h-full pb-24">
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className="rounded-xl border text-card-foreground shadow px-4 py-6 flex sm:flex-row flex-col justify-between items-center relative hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out bg-background"
								>
									<div className="flex justify-center items-between gap-2 w-fit flex-col">
										<div className="flex justify-between items-center gap-2 w-fit">
											<Skeleton className="w-7 h-7 rounded-full" />
											<Skeleton className="h-4 w-32" />
											<Skeleton className="w-7 h-7 rounded-full" />
										</div>
										<div className="md:flex flex-end gap-2 text-sm hidden">
											<Skeleton className="h-4 w-16" />
											<span>-</span>
											<Skeleton className="h-4 w-24" />
										</div>
									</div>
									<div className="flex flex-end gap-2 text-sm">
										<Skeleton className="h-4 w-12" />
										<Skeleton className="h-4 w-6" />
										<span>-</span>
										<Skeleton className="h-4 w-6" />
									</div>
								</div>
							))}
						</ul>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}

export function TeamRosterSkeleton() {
	return (
		<Card className="w-full">
			<CardHeader className="flex justify-start items-center mb-4 w-full lg:flex-row">
				<h2 className="text-2xl font-bold text-left">Team Roster</h2>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border bg-background">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>NAME</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>POS</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>GP</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>G</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>A</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>PTS</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>SOG</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>LB</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>TO</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>CTO</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>PIM</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>PPG</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>PPA</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>SHG</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>BS</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>FO</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
								<TableHead>
									<div className="flex items-center gap-2">
										<span>FO%</span>
										<Skeleton className="h-4 w-4" />
									</div>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 20 }).map((_, i) => (
								<TableRow key={i}>
									<TableCell>
										<div className="pl-4 text-left text-nowrap">
											<Skeleton className="h-4 w-32" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-6" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-12" />
										</div>
									</TableCell>
									<TableCell>
										<div className="pl-4">
											<Skeleton className="h-4 w-8" />
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	);
}
