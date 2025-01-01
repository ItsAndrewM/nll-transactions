import { env } from "@/env";

export const getSchedule = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/schedule`);
		if (!response.ok) {
			throw new Error("Failed to fetch schedule");
		}
		const data = await response.json();
		if (data.success === false) {
			throw new Error("Failed to fetch schedule");
		}
		return data.schedule;
	} catch (error) {
		console.error(error);
		return [];
	}
};
