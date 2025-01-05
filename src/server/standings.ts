export const getStandings = async () => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/standings`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch standings");
		}
		const data = await response.json();
		return data.standings;
	} catch (error) {
		console.error(error);
		return [];
	}
};
