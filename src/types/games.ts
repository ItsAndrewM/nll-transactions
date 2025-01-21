interface GameInfo {
	date: string;
	home: GameInfoTeam;
	away: GameInfoTeam;
	location: string;
	time: string;
	finalScore?: {
		away: number;
		home: number;
	};
}

type GameInfoTeam = {
	logo: string;
	title: string;
};

interface PreGameTeamStats {
	ga: string;
	gd: string;
	gf: string;
	gp: number;
	gpg: string;
	gapg: string;
	wins: number;
	losses: number;
	winPerc: string;
}

interface PreGameData {
	id: string;
	status: string;
	game_info: GameInfo;
	team_stats: {
		away: PreGameTeamStats;
		home: PreGameTeamStats;
	};
	box_score?: unknown | null;
	scoring?: unknown | null;
	penalties?: unknown | null;
	type: string;
	season_id: number;
	game_leaders?: unknown | null;
	player_stats?: unknown | null;
}

interface GameData {
	id: string;
	status: string;
	game_info: GameInfo;
	team_stats: {
		away: TeamStats;
		home: TeamStats;
	};
	box_score: Boxscore;
	scoring: Scoring;
	penalties: Penalty;
	type: string;
	season_id: number;
	game_leaders: GameLeaders;
	player_stats: PlayerStats;
	created_at: string;
	updated_at: string;
}

interface Boxscore {
	away: number[];
	home: number[];
}

interface TeamStats {
	away: { fo: string; pp: string; pim: number; sog: number };
	home: { fo: string; pp: string; pim: number; sog: number };
}

interface Scoring {
	"First Quarter": ScoringGoal[];
	"Second Quarter": ScoringGoal[];
	"Third Quarter": ScoringGoal[];
	"Fourth Quarter": ScoringGoal[];
}

interface ScoringGoal {
	time: string;
	team: string;
	scorer: string;
	powerPlay: boolean;
	awayScore: number;
	homeScore: number;
	assists: string[];
	logo: string;
}

interface Penalty {
	"First Quarter": PenaltyEvent[];
	"Second Quarter": PenaltyEvent[];
	"Third Quarter": PenaltyEvent[];
	"Fourth Quarter": PenaltyEvent[];
}

interface PenaltyEvent {
	time: string;
	team: string;
	player: string;
	duration: string;
	infraction: string;
	logo: string;
}

interface PlayerStats {
	away: {
		goalies: GoalieStat[];
		runners: RunnerStat[];
	};
	home: {
		goalies: GoalieStat[];
		runners: RunnerStat[];
	};
}

interface GoalieStat {
	ga: number;
	min: string;
	win: number;
	loss: number;
	name: string;
	number: string;
	saves: number;
}

interface RunnerStat {
	name: string;
	number: string;
	a: number;
	g: number;
	lb: number;
	pim: number;
	sog: number;
	blk: number;
	to: number;
	cto: number;
	pts: number;
}

type GameLeaders = GameLeader[];

interface GameLeader {
	stat: string;
	awayPlayer: GameLeaderPlayer;
	homePlayer: GameLeaderPlayer;
}

interface GameLeaderPlayer {
	name: string;
	team: string;
	value: string;
	number: string;
	imageUrl: string;
	playerId: string;
}

export type {
	PreGameTeamStats,
	GameInfo,
	TeamStats,
	PreGameData,
	GameData,
	Boxscore,
	Scoring,
	ScoringGoal,
	GoalieStat,
	RunnerStat,
	PenaltyEvent,
	Penalty,
	PlayerStats,
	GameLeaders,
};
