export interface Transactions {
	order: string;
	total: number;
	transactions: Record<string, Record<string, string[]>>;
}
