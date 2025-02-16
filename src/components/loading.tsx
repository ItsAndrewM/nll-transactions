export default function Loading() {
	return (
		<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 ">
			<div className="space-y-4 text-center">
				<div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
				<p className="text-gray-600">Loading play...</p>
			</div>
		</div>
	);
}
