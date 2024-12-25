import { env } from "@/env";

export const getAllTransactions = async () => {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/transactions`);
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
