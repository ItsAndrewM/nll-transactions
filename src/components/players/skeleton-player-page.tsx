import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Ruler, Weight } from "lucide-react";

export function PlayerPageSkeleton() {
	return (
		<div className="container mx-auto px-4 py-8 pb-20">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<PlayerHeroSkeleton />
				<PlayerDetailsSkeleton />
				<PlayerTeamInfoSkeleton />
				<PlayerBioSkeleton />
			</div>
			<PlayerSocialsSkeleton />
		</div>
	);
}

export function PlayerHeroSkeleton() {
	return (
		<div className="col-span-1 md:col-span-3 relative overflow-hidden rounded-lg">
			<div className="w-full h-96 relative">
				<Skeleton className="w-full h-full" />

				<div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-start p-6">
					<Skeleton className="w-48 h-48 rounded-full border-4 border-white shadow-lg" />

					<div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
						<Skeleton className="h-9 w-64 mb-2" />
						<Skeleton className="h-6 w-40 mb-2" />
						<Skeleton className="h-6 w-32 rounded-md mt-2" />
					</div>
				</div>
			</div>
		</div>
	);
}

export function PlayerDetailsSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Player Details</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2">
					<li className="flex items-center">
						<CalendarDays className="mr-2 h-4 w-4" />
						<Skeleton className="h-4 w-40" />
					</li>
					<li className="flex items-center">
						<MapPin className="mr-2 h-4 w-4" />
						<Skeleton className="h-4 w-32" />
					</li>
					<li className="flex items-center">
						<Ruler className="mr-2 h-4 w-4" />
						<Skeleton className="h-4 w-16" />
					</li>
					<li className="flex items-center">
						<Weight className="mr-2 h-4 w-4" />
						<Skeleton className="h-4 w-24" />
					</li>
				</ul>
			</CardContent>
		</Card>
	);
}

export function PlayerTeamInfoSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Team Information</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="w-6 h-6 rounded-md mb-2" />

				<div className="flex gap-4 mb-2">
					<p>Team: </p>
					<Skeleton className="h-6 w-40 rounded-md" />
				</div>

				<div className="flex gap-4 mb-2">
					<p>Position: </p>
					<div>
						<Skeleton className="h-6 w-24 rounded-md" />
					</div>
				</div>

				<div className="flex gap-4">
					<p>Number: </p>
					<div>
						<Skeleton className="h-6 w-12 rounded-md" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function PlayerBioSkeleton() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Player Bio</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-5/6 mb-2" />
				<Skeleton className="h-4 w-full mb-4" />

				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-4/5" />
			</CardContent>
		</Card>
	);
}

export function PlayerSocialsSkeleton() {
	return (
		<div className="mt-8 flex justify-center space-x-4">
			<Skeleton className="h-6 w-6 rounded-full" />
			<Skeleton className="h-6 w-6 rounded-full" />
			<Skeleton className="h-6 w-6 rounded-full" />
		</div>
	);
}
