import { OutgoingMatch } from "@/types/schedule";

export default function ScheduleList({
	schedule,
}: {
	schedule: OutgoingMatch[];
}) {
	console.log(schedule);
	return <div>Schedule List</div>;
}
