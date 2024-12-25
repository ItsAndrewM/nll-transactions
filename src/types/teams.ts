export type TeamDate = {
	[date: string]: string[];
};

export type Team = {
	[teamName: string]: TeamDate;
};

export type Teams = {
	success: boolean;
	teams: Team;
};
