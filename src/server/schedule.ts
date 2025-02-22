import { env } from "@/env";

import "server-only";

export const preload = (id: string) => {
	void Promise.all([getSchedule(), getScheduleGameById(id)]);
};

export const getSchedule = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/schedule`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
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

export const getScheduleGameById = async (id: string) => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/schedule/${id}`, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_API_KEY,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to fetch schedule");
		}
		const data = await response.json();
		if (data.success === false) {
			throw new Error("Failed to fetch schedule");
		}
		return data.scheduleById;
	} catch (error) {
		console.error(error);
		return [];
	}
};
