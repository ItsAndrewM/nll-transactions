export type Player = {
	id: string;
	isCurrent: boolean;
	dateOfBirth: string;
	ageToday: number;
	ageSeason: number;
	ageYear: number;
	height: string;
	heightValue: number;
	weight: number;
	position: string;
	jerseyNumber: string;
	role: string;
	matches: {
		season: number;
	};
	personId: number;
	firstname: string;
	surname: string;
	fullname: string;
	displayName: string;
	team_id: number;
	team_code: string;
	team_name: string;
	cta: string;
	champion_data_id: string;
	headshot: {
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
	background_image: boolean;
	bio: string;
	hometown: string;
	shoots: string;
	awards_achievements: string;
	twitter_url: string;
	instagram_url: string;
	youtube_url: string;
	player_image_html: string;
	team_html: string;
};

export type AllPlayers = {
	players: Player[];
	total: number;
};
