export interface Standing {
	team_id: number;
	name: string;
	city: string;
	nickname: string;
	clinch_text: string;
	logo_url: string;
	wins: number;
	losses: number;
	games_played: number;
	win_percentage: string;
	goals_for: number;
	goals_for_avg: string;
	goals_against: number;
	goals_against_avg: string;
	goal_diff: number;
	goal_diff_avg: number;
	position: number;
	team_cell_data: string;
}
