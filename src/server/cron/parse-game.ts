import * as cheerio from "cheerio";

interface Player {
	name: string;
	number: string;
	team: string;
	value: string;
	imageUrl: string;
	playerId: string;
}

interface GameLeader {
	homePlayer: Player;
	awayPlayer: Player;
	stat: string;
}

export const cleanText = (text: string) => {
	const t = text.replace(/\s+/g, " ").trim();
	return addSpacesToCamelCase(t);
};

const addSpacesToCamelCase = (text: string): string =>
	text.replace(/(?<!^|\s)(?=[A-Z])/g, " ").trim();

function parsePreGame(html: string) {
	const parsePreGameTeamStats = () => {
		const parseRow = (row: cheerio.Element) => ({
			wins: parseInt($(row).find(".data.wins").text().trim()),
			losses: parseInt($(row).find(".data.losses").text().trim()),
			gp: parseInt($(row).find(".data.games_played").text().trim()),
			winPerc: $(row).find(".data.win_percentage").text().trim(),
			gf: cleanText($(row).find(".data.goals_for").text()),
			ga: cleanText($(row).find(".data.goals_against").text()),
			gd: cleanText($(row).find(".data.goal_diff").text()),
			gpg: $(row).find(".data.goals_for_avg").text().trim(),
			gapg: $(row).find(".data.goals_against_avg").text().trim(),
		});

		return {
			home: parseRow($("#team_stats_table tbody tr:last-child").get(0)),
			away: parseRow($("#team_stats_table tbody tr:first-child").get(0)),
		};
	};
	const $ = cheerio.load(html);
	const preGame = {
		gameInfo: {
			date: cleanText($(".date").text()),
			location: cleanText($("div.top_summary").find(".location").text()),
			time: cleanText($(".nll_time").data("time")),
			home: {
				title: cleanText($(".home_team .team").text()),
				logo:
					$(".home_team").find("img").attr("data-lazy-src") ||
					$(".home_team").find("img").attr("src"),
			},
			away: {
				title: cleanText($(".away_team .team").text()),
				logo:
					$(".away_team").find("img").attr("data-lazy-src") ||
					$(".away_team").find("img").attr("src"),
			},
		},
		teamStats: parsePreGameTeamStats(),
	};

	return preGame;
}

export function parseGame(html: string) {
	const $ = cheerio.load(html);

	// Parse game info
	const parseGameInfo = () => {
		const gameInfo = {
			date: cleanText($(".date").text()),
			location: cleanText($("div.top_summary").find(".location").text()),
			time: "FINAL",
			home: {
				title: cleanText($(".home_team .team").text()),
				logo:
					$(".home_team").find("img").attr("data-lazy-src") ||
					$(".home_team").find("img").attr("src"),
			},
			away: {
				title: cleanText($(".away_team .team").text()),
				logo:
					$(".away_team").find("img").attr("data-lazy-src") ||
					$(".away_team").find("img").attr("src"),
			},
			finalScore: {
				home: parseInt($(".home_team .score").first().text().trim()),
				away: parseInt($(".away_team .score").first().text().trim()),
			},
		};
		return gameInfo;
	};

	if (!parseGameInfo().finalScore.home && !parseGameInfo().finalScore.away) {
		return parsePreGame(html);
	}

	// Parse box score
	const parseBoxScore = () => {
		// const quarters = ["Q1", "Q2", "Q3", "Q4", "Total"];
		const home: number[] = [];
		const away: number[] = [];

		$("#team_stats_table tbody tr").each((i, row) => {
			$(row)
				.find("td.data")
				.each((_, cell) => {
					const score = parseInt($(cell).text().trim());
					if (i === 0) away.push(score);
					if (i === 1) home.push(score);
				});
		});

		return { home, away };
	};

	// Parse team stats
	const parseTeamStats = () => {
		const parseRow = (row: cheerio.Element) => ({
			sog: parseInt($(row).find(".SHOT_ON_GOAL").text().trim()),
			fo: cleanText($(row).find(".faceoff_record").text()),
			pp: cleanText($(row).find(".power_play_record").text()),
			pim: parseInt($(row).find(".PENALTY_MINUTES").text().trim()),
		});

		return {
			home: parseRow($("#game_stats_table tbody tr:last-child").get(0)),
			away: parseRow($("#game_stats_table tbody tr:first-child").get(0)),
		};
	};

	// Parse scoring summary
	const parseScoringPlays = () => {
		const scoringPlays: { [key: string]: unknown[] } = {};

		$(".penalty_scoring_summary.scoring .accordion-item").each(
			(_, quarterSection) => {
				const quarter = $(quarterSection).find(".quarter").text().trim();
				const goals: unknown[] = [];

				$(quarterSection)
					.find(".summary_item")
					.each((_, play) => {
						const teamLogo =
							$(play).find("img").attr("data-lazy-src") ||
							$(play).find("img").attr("src");
						const teamTitle = $(play).find("img").attr("alt")?.split(" ")[2];
						const scorerText = cleanText($(play).find(".player").text() || "");
						// Parse scorer and assists
						const [scorer, ...assisters] = scorerText.split("(");
						const assists = assisters.length
							? assisters[0]
									.replace(")", "")
									.split(",")
									.map((a) => cleanText(a))
							: [];
						const homeScore = parseInt(
							$(play).find(".home_score").text().trim()
						);
						const awayScore = parseInt(
							$(play).find(".away_score").text().trim()
						);

						goals.push({
							time: $(play).find(".time").text().trim().split("PP")[0].trim(),
							logo: teamLogo,
							team: teamTitle,
							scorer: cleanText(scorer),
							assists,
							powerPlay: $(play).find(".pp").length > 0,
							homeScore: homeScore,
							awayScore: awayScore,
						});
					});

				scoringPlays[quarter] = goals;
			}
		);

		return scoringPlays;
	};

	// Parse penalties
	const parsePenalties = () => {
		const penalties: { [key: string]: unknown[] } = {};

		$(".penalty_scoring_summary.penalty .accordion-item").each(
			(_, quarterSection) => {
				const quarter = $(quarterSection)
					.find(".accordion-title")
					.text()
					.trim();
				const periodPenalties: unknown[] = [];

				$(quarterSection)
					.find(".summary_item")
					.each((_, penalty) => {
						const teamLogo =
							$(penalty).find("img").attr("data-lazy-src") ||
							$(penalty).find("img").attr("src");
						const teamTitle = $(penalty).find("img").attr("alt")?.split(" ")[0];
						periodPenalties.push({
							time: $(penalty).find(".time").text().trim(),
							team: teamTitle,
							player: cleanText($(penalty).find(".player strong").text()),
							infraction: cleanText($(penalty).find(".penalty_name").text()),
							duration: cleanText($(penalty).find(".penalty_time").text()),
							logo: teamLogo,
						});
					});

				penalties[quarter] = periodPenalties;
			}
		);

		return penalties;
	};

	// Parse player stats
	const parsePlayerStats = () => {
		const parseRunners = (table: cheerio.Element) => {
			const runners: unknown[] = [];

			$(table)
				.find("tbody tr")
				.each((_, row) => {
					const cols = $(row).find("td");
					runners.push({
						number: $(cols[0]).find(".number").text().trim(),
						name: cleanText($(cols[0]).find(".player_name").text()),
						g: parseInt($(cols.get(1)).text().trim()),
						a: parseInt($(cols.get(2)).text().trim()),
						pts: parseInt($(cols.get(3)).text().trim()),
						pim: parseInt($(cols.get(4)).text().trim()),
						sog: parseInt($(cols.get(5)).text().trim()),
						lb: parseInt($(cols.get(6)).text().trim()),
						blk: parseInt($(cols.get(7)).text().trim()),
						to: parseInt($(cols.get(8)).text().trim()),
						cto: parseInt($(cols.get(9)).text().trim()),
					});
				});

			return runners;
		};

		const parseGoalies = (table: cheerio.Element) => {
			const goalies: unknown[] = [];

			$(table)
				.find("tbody tr")
				.each((_, row) => {
					const cols = $(row).find("td");
					goalies.push({
						number: $(cols[0]).find(".number").text().trim(),
						name: cleanText($(cols[0]).find(".player_name").text()),
						win: parseInt($(cols.get(1)).text().trim()) || 0,
						loss: parseInt($(cols.get(2)).text().trim()) || 0,
						ga: parseInt($(cols.get(3)).text().trim()) || 0,
						saves: parseInt($(cols.get(4)).text().trim()) || 0,
						min: cleanText($(cols.get(5)).text()),
					});
				});

			return goalies;
		};

		const playerStats = {
			home: {
				runners: parseRunners($("#home_team #home_player_stats").get(0)),
				goalies: parseGoalies($("#home_team #home_goalie_stats").get(0)),
			},
			away: {
				runners: parseRunners($("#away_team #away_player_stats").get(0)),
				goalies: parseGoalies($("#away_team #away_goalie_stats").get(0)),
			},
		};

		return playerStats;
	};

	const parseGameLeaders = () => {
		const leaders: GameLeader[] = [];

		$(".stat").each((_, statElement) => {
			const stat = $(statElement).find(".label").text();

			// Parse away player
			const awayPlayer: Player = {
				name: $(statElement).find(".away_player .name a").text(),
				number: $(statElement)
					.find(".away_player .jersey_team")
					.text()
					.split("•")[0]
					.trim()
					.replace("#", ""),
				team: $(statElement)
					.find(".away_player .jersey_team")
					.text()
					.split("•")[1]
					.trim(),
				value: $(statElement).find(".away_player .stats .num").text(),
				imageUrl:
					$(statElement)
						.find(".away_player")
						.find(".img")
						.find("img")
						.data("lazy-src") || "",
				playerId:
					$(statElement)
						.find(".away_player .name a")
						.attr("href")
						?.split("/")[2] || "",
			};

			// Parse home player
			const homePlayer: Player = {
				name: $(statElement).find(".home_player .name a").text(),
				number: $(statElement)
					.find(".home_player .jersey_team")
					.text()
					.split("•")[0]
					.trim()
					.replace("#", ""),
				team: $(statElement)
					.find(".home_player .jersey_team")
					.text()
					.split("•")[1]
					.trim(),
				value: $(statElement).find(".home_player .stats .num").text(),
				imageUrl:
					$(statElement)
						.find(".home_player")
						.find(".img")
						.find("img")
						.data("lazy-src") || "",
				playerId:
					$(statElement)
						.find(".home_player .name a")
						.attr("href")
						?.split("/")[2] || "",
			};

			leaders.push({
				stat,
				awayPlayer,
				homePlayer,
			});
		});

		return leaders;
	};

	// Combine all parsed data
	return {
		gameInfo: parseGameInfo(),
		boxScore: parseBoxScore(),
		teamStats: parseTeamStats(),
		scoring: parseScoringPlays(),
		penalties: parsePenalties(),
		playerStats: parsePlayerStats(),
		gameLeaders: parseGameLeaders(),
	};
}
