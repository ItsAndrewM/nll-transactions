import { OutgoingMatch } from "./schedule";

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

export type TeamDetailed = {
	id: number;
	code: string;
	name: string;
	nickname: string;
	displayName: string;
	champion_data_id: string;
	team_city: string;
	team_logo: {
		ID: number;
		id: number;
		title: string;
		filename: string;
		filesize: number;
		url: string;
		link: string;
		alt: string;
		author: string;
		description: string;
		caption: string;
		name: string;
		status: string;
		uploaded_to: number;
		date: string;
		modified: string;
		menu_order: number;
		mime_type: string;
		type: string;
		subtype: string;
		icon: string;
		width: number;
		height: number;
		sizes: {
			thumbnail: string;
			"thumbnail-width": number;
			"thumbnail-height": number;
			medium: string;
			"medium-width": number;
			"medium-height": number;
			medium_large: string;
			"medium_large-width": number;
			"medium_large-height": number;
			large: string;
			"large-width": number;
			"large-height": number;
			player_headshot: string;
			"player_headshot-width": number;
			"player_headshot-height": number;
			player_headshot_small: string;
			"player_headshot_small-width": number;
			"player_headshot_small-height": number;
		};
	};
	team_website_url: string;
	clinch_text: string;
	first_season: string;
};

export type TeamWithSchedule = TeamDetailed & {
	schedule: OutgoingMatch[];
};
