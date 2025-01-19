import { env } from "@/env";
import { filterTransactionsByTeam } from "@/lib/utils";

import "server-only";

export const preload = () => {
	void Promise.all([getAllTransactions("dsc", "all")]);
};

export const getAllTransactions = async (order: string, team: string) => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/transactions?order=${order}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch transactions");
		}
		const data = await response.json();
		// let filteredData = data.data;
		if (team !== "") {
			const filteredData = filterTransactionsByTeam({
				data: data,
				teamName: team,
			});

			return filteredData;
		}

		return data.data;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getListOfTransactionsByDate = async () => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/transactions/list`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch transactions");
		}
		const data = await response.json();
		return data.transactions;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getTransactionsByDate = async (date: string) => {
	try {
		const response = await fetch(
			`${env.NEXT_PUBLIC_API_URL}/transactions/${date}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch transactions");
		}
		const data = await response.json();
		return data.transactions;
	} catch (error) {
		console.error(error);
		return [];
	}
};
