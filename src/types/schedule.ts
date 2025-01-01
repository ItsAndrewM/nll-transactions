export interface Match {
	id: number;
	number: number;
	phaseNumber: number;
	code: string;
	name: string;
	squads: {
		away: Squad;
		home: Squad;
	};
	date: {
		startDate: string;
		startTime: string;
		utcMatchStart: string;
	};
	status: {
		id: number;
		name: string;
		code: string;
		typeId: number;
		typeName: string;
	};
	type: {
		id: number;
		name: string;
		code: string;
	};
	venue: {
		id: number;
		code: string;
		name: string;
		timeZone: string;
	};
}

export interface OutgoingMatch extends Match {
	week: Week;
}

export interface Week {
	id: number;
	code: string;
	name: string;
	number: number;
	phaseNumber: number;
	season_id: number;
}

export interface Squad {
	score: {
		goals: number;
		score: number;
	};
	id: number;
	code: string;
	name: string;
	nickname: string;
	displayName: string;
}