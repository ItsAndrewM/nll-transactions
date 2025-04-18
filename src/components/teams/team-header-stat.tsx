export default function Stat({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className="text-center">
			<p className="text-sm text-gray-500">{label}</p>
			<p className="font-semibold">{value}</p>
		</div>
	);
}
